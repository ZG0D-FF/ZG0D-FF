export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { roomId, playerRowId } = req.query;
  if (!roomId || !playerRowId) {
    return res.status(400).json({ error: 'roomId and playerRowId required' });
  }

  const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;
  const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
  const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!SUPABASE_URL || !REDIS_URL) {
    return res.status(500).json({ error: 'Missing environment variables' });
  }

  try {
    // 1. Fetch words + imposter_id from Redis (all secrets live here now)
    const redisRes = await fetch(REDIS_URL, {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${REDIS_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(["GET", `imposter_game_${roomId}`])
    });
    
    if (!redisRes.ok) throw new Error('Failed to fetch from Redis');
    const redisData = await redisRes.json();
    
    if (!redisData.result) {
      return res.status(404).json({ error: 'Secret words have expired or missing in Redis' });
    }
    
    const words = JSON.parse(redisData.result);
    
    // 2. Check identity securely — imposter_id is now in Redis, not Supabase
    if (playerRowId === words.imposter_id) {
      return res.status(200).json({ word: words.imposter_word, isImposter: true });
    } else {
      return res.status(200).json({ word: words.normal_word, isImposter: false });
    }

  } catch (err) {
    console.error('Error fetching word:', err);
    return res.status(500).json({ error: err.message });
  }
}
