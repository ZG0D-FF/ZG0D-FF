export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { roomId, secretToken } = req.body;
  if (!roomId || !secretToken) {
    return res.status(400).json({ error: 'roomId and secretToken required' });
  }

  const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
  const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!SUPABASE_URL || !SUPABASE_KEY || !GEMINI_API_KEY || !REDIS_URL || !REDIS_TOKEN) {
    return res.status(500).json({ 
      error: 'Missing environment variables',
      details: {
        hasSupabaseUrl: !!SUPABASE_URL,
        hasSupabaseKey: !!SUPABASE_KEY,
        hasGeminiKey: !!GEMINI_API_KEY,
        hasRedisUrl: !!REDIS_URL,
        hasRedisToken: !!REDIS_TOKEN
      }
    });
  }

  try {
    // 0. Rate limit: 1 game start per room per 15 seconds
    const rateLimitKey = `rate_limit_${roomId}`;
    const rlCheck = await fetch(REDIS_URL, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${REDIS_TOKEN}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(["GET", rateLimitKey])
    });
    const rlData = await rlCheck.json();
    if (rlData.result) {
      return res.status(429).json({ error: 'Slow down! Wait a few seconds before starting another round.' });
    }
    // Set rate limit flag with 15s TTL
    await fetch(REDIS_URL, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${REDIS_TOKEN}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(["SET", rateLimitKey, "1", "EX", 15])
    });

    // 1. Get players in the room
    const playersRes = await fetch(`${SUPABASE_URL}/rest/v1/imposter_players?room_id=eq.${roomId}`, {
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`
      }
    });
    
    if (!playersRes.ok) throw new Error('Failed to fetch players: ' + await playersRes.text());
    const players = await playersRes.json();

    // 1b. Verify caller is the host using Secure Redis Token
    const authCheck = await fetch(REDIS_URL, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${REDIS_TOKEN}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(["GET", `imposter_auth_${secretToken}`])
    });
    const authData = await authCheck.json();
    if (!authData.result) return res.status(403).json({ error: 'Invalid auth token' });
    
    const callerAuth = JSON.parse(authData.result);
    if (!callerAuth.isHost || callerAuth.roomId !== roomId) {
      return res.status(403).json({ error: 'Only the host can start the game' });
    }

    if (players.length < 2) {
      return res.status(400).json({ error: 'Not enough players to start' });
    }

    // 2. Select an imposter
    const imposterIndex = Math.floor(Math.random() * players.length);
    const imposterId = players[imposterIndex].id;

    // 3. Generate category, normal word, and imposter word via Gemini
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;
    const prompt = `Generate a random category, a 'normal_word' belonging to that category, and an 'imposter_word' belonging to that same category. The 'imposter_word' MUST be very closely related to the 'normal_word' so that vague hints apply to both (e.g., Comet and Meteor). CRITICAL RULE: The 'imposter_word' CANNOT be a subset, parent, or type of the 'normal_word' (e.g., if normal is Doctor, imposter cannot be Surgeon. Doctor and Nurse is acceptable). Return ONLY a JSON object: {"category": "Space", "normal_word": "Comet", "imposter_word": "Meteor"}`;
    
    const geminiBody = {
      contents: [{ parts: [{ text: prompt }] }]
    };

    const geminiRes = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(geminiBody)
    });

    if (!geminiRes.ok) throw new Error('Gemini API call failed: ' + await geminiRes.text());
    const geminiData = await geminiRes.json();
    const textOutput = geminiData.candidates[0].content.parts[0].text;
    const tokenUsage = geminiData.usageMetadata;
    
    // Parse the JSON output from Gemini
    const cleanJsonString = textOutput.replace(/```json/g, '').replace(/```/g, '').trim();
    const generated = JSON.parse(cleanJsonString);

    // 4. Store the secret words in Upstash Redis (Expires in 24 hours)
    const redisRes = await fetch(REDIS_URL, {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${REDIS_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(["SET", `imposter_game_${roomId}`, JSON.stringify({ ...generated, imposter_id: imposterId }), "EX", 86400])
    });

    if (!redisRes.ok) throw new Error('Failed to save to Redis: ' + await redisRes.text());

    // 5. Update the room in Supabase (Notice: we no longer save the secret word here!)
    const updateRes = await fetch(`${SUPABASE_URL}/rest/v1/imposter_rooms?id=eq.${roomId}`, {
      method: 'PATCH',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      },
      body: JSON.stringify({
        status: 'playing',
        category: generated.category
      })
    });

    if (!updateRes.ok) throw new Error('Failed to update room: ' + await updateRes.text());

    // 6. Send the token usage back to the frontend to log in the console
    return res.status(200).json({ success: true, tokenUsage });
  } catch (err) {
    console.error('Error generating game state:', err);
    return res.status(500).json({ error: err.message });
  }
}
