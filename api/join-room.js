export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  const { roomCode, playerName, playerId, secretToken, isCreating, maxPlayers } = req.body;
  
  if (!playerName || !playerId || !secretToken) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;
  const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
  const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

  const headers = { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}`, 'Content-Type': 'application/json' };

  try {
    let room = null;
    let isHost = false;

    if (isCreating) {
      // 1. Create Room Logic
      for (let attempt = 0; attempt < 3; attempt++) {
        const code = Array.from({length: 4}).map(() => 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.charAt(Math.floor(Math.random() * 26))).join('');
        
        const roomRes = await fetch(`${SUPABASE_URL}/rest/v1/imposter_rooms`, {
          method: 'POST',
          headers: { ...headers, 'Prefer': 'return=representation' },
          body: JSON.stringify({ room_code: code, host_id: playerId, max_players: parseInt(maxPlayers) || 16 })
        });
        
        if (roomRes.ok) {
          const roomData = await roomRes.json();
          room = roomData[0];
          break;
        }
      }
      if (!room) return res.status(500).json({ error: 'Failed to generate unique room code', debug_url: SUPABASE_URL });
      isHost = true;
    } else {
      // 2. Join Room Logic
      const roomRes = await fetch(`${SUPABASE_URL}/rest/v1/imposter_rooms?room_code=eq.${roomCode.toUpperCase()}`, { headers });
      const roomData = await roomRes.json();
      if (!roomData.length) return res.status(404).json({ error: 'Room not found' });
      room = roomData[0];

      // Check capacity
      const playersRes = await fetch(`${SUPABASE_URL}/rest/v1/imposter_players?room_id=eq.${room.id}&select=player_id`, { headers });
      const players = await playersRes.json();
      
      const existing = players.find(p => p.player_id === playerId);
      if (!existing && players.length >= (room.max_players || 16)) {
        return res.status(403).json({ error: 'Room is full' });
      }

      isHost = (room.host_id === playerId);
    }

    // 3. Upsert Player into Supabase
    // Using ON CONFLICT to update name if they rejoin
    await fetch(`${SUPABASE_URL}/rest/v1/imposter_players?on_conflict=room_id,player_id`, {
      method: 'POST',
      headers: { ...headers, 'Prefer': 'resolution=merge-duplicates' },
      body: JSON.stringify({ room_id: room.id, player_id: playerId, name: playerName, is_host: isHost })
    });

    // 4. Secure Authentication via Redis (Prevents Spoofing)
    // We store the secret token tied to their public player_id and is_host status
    await fetch(REDIS_URL, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${REDIS_TOKEN}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(["SET", `imposter_auth_${secretToken}`, JSON.stringify({ playerId, isHost, roomId: room.id }), "EX", 86400])
    });

    return res.status(200).json({ room, isHost });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}
