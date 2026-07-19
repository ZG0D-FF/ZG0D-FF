export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  const { roomId, secretToken } = req.body;
  const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;
  const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
  const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

  try {
    // Verify Host
    const authCheck = await fetch(REDIS_URL, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${REDIS_TOKEN}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(["GET", `imposter_auth_${secretToken}`])
    });
    const authData = await authCheck.json();
    if (!authData.result) return res.status(403).json({ error: 'Invalid auth token' });
    
    const callerAuth = JSON.parse(authData.result);
    if (!callerAuth.isHost || callerAuth.roomId !== roomId) {
      return res.status(403).json({ error: 'Only the host can start voting' });
    }

    // Clear any old votes for this room in Redis
    await fetch(REDIS_URL, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${REDIS_TOKEN}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(["DEL", `votes_${roomId}`])
    });

    // Update Room Status to Voting
    const updateRes = await fetch(`${SUPABASE_URL}/rest/v1/imposter_rooms?id=eq.${roomId}`, {
      method: 'PATCH',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status: 'voting' })
    });

    if (!updateRes.ok) throw new Error('Failed to start voting');

    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}