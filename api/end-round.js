export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  const { roomId, action, secretToken } = req.body;
  if (!roomId || !action || !secretToken) {
    return res.status(400).json({ error: 'roomId, action, and secretToken are required' });
  }

  const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;
  const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
  const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

  try {
    // 1. Verify caller is actually a host in this room via Secure Redis Token
    const authCheck = await fetch(REDIS_URL, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${REDIS_TOKEN}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(["GET", `imposter_auth_${secretToken}`])
    });
    const authData = await authCheck.json();
    if (!authData.result) return res.status(403).json({ error: 'Invalid auth token' });
    
    const callerAuth = JSON.parse(authData.result);
    if (!callerAuth.isHost || callerAuth.roomId !== roomId) {
      return res.status(403).json({ error: 'Only the host can perform this action' });
    }

    // 2. Always invalidate Redis cache
    await fetch(REDIS_URL, {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${REDIS_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(["DEL", `imposter_game_${roomId}`])
    });

    // 3. Perform action on Supabase
    if (action === 'delete-room') {
      await fetch(`${SUPABASE_URL}/rest/v1/imposter_rooms?id=eq.${roomId}`, {
        method: 'DELETE',
        headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
      });
      return res.status(200).json({ message: 'Room deleted' });
    } else {
      // Just end the round, reset to lobby
      const updateRes = await fetch(`${SUPABASE_URL}/rest/v1/imposter_rooms?id=eq.${roomId}`, {
        method: 'PATCH',
        headers: { 
          'apikey': SUPABASE_KEY, 
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=representation'
        },
        body: JSON.stringify({ status: 'lobby', category: null })
      });
      
      if (!updateRes.ok) throw new Error('Failed to reset room: ' + await updateRes.text());
      return res.status(200).json({ message: 'Round ended' });
    }

  } catch (err) {
    console.error('Error:', err);
    return res.status(500).json({ error: err.message });
  }
}