export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });
  const { roomId, secretToken, approvedWord } = req.body;

  const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;
  const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
  const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

  try {
    const authCheck = await fetch(REDIS_URL, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${REDIS_TOKEN}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(["GET", `imposter_auth_${secretToken}`])
    });
    const authData = await authCheck.json();
    const callerAuth = JSON.parse(authData.result);
    if (!callerAuth || !callerAuth.isHost || callerAuth.roomId !== roomId) return res.status(403).json({ error: 'Unauthorized' });

    const playersRes = await fetch(`${SUPABASE_URL}/rest/v1/imposter_players?room_id=eq.${roomId}`, {
      headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
    });
    const players = await playersRes.json();

    // EXCLUDE THE HOST FROM BEING AN IMPOSTER
    const playablePlayers = players.filter(p => !p.is_host);
    if (playablePlayers.length < 3) return res.status(400).json({ error: 'Need at least 3 active players (excluding Host) to start in Observer mode!' });

    const imposterIndex = Math.floor(Math.random() * playablePlayers.length);
    const imposterId = playablePlayers[imposterIndex].id;

    // Save to Redis
    await fetch(REDIS_URL, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${REDIS_TOKEN}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(["SET", `imposter_game_${roomId}`, JSON.stringify({ ...approvedWord, imposter_id: imposterId }), "EX", 86400])
    });

    // Save to Global History 
    if (approvedWord.normal_word && approvedWord.imposter_word) {
       await fetch(`${SUPABASE_URL}/rest/v1/imposter_global_word_history`, {
         method: 'POST',
         headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}`, 'Content-Type': 'application/json' },
         body: JSON.stringify({ category: approvedWord.category, crew_word: approvedWord.normal_word, imposter_word: approvedWord.imposter_word })
       });
    }

    // Start Game
    await fetch(`${SUPABASE_URL}/rest/v1/imposter_rooms?id=eq.${roomId}`, {
      method: 'PATCH',
      headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}`, 'Content-Type': 'application/json', 'Prefer': 'return=representation' },
      body: JSON.stringify({ status: 'playing', category: approvedWord.category })
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}