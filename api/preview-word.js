export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });
  const { roomId, secretToken } = req.body;

  const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
  const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

  try {
    // 1. Verify Host Security
    const authCheck = await fetch(REDIS_URL, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${REDIS_TOKEN}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(["GET", `imposter_auth_${secretToken}`])
    });
    const authData = await authCheck.json();
    const callerAuth = JSON.parse(authData.result);
    if (!callerAuth || !callerAuth.isHost || callerAuth.roomId !== roomId) return res.status(403).json({ error: 'Unauthorized' });

    // 2. Fetch Banned Words
    const historyRes = await fetch(`${SUPABASE_URL}/rest/v1/imposter_global_word_history?select=crew_word,imposter_word&order=created_at.desc&limit=150`, {
      headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
    });
    const historyData = await historyRes.json();
    const bannedWordsList = historyData ? historyData.flatMap(row => [row.crew_word, row.imposter_word]).join(', ') : '';

    // 3. Ask Gemini
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;
    let prompt = `Generate a random category, a 'normal_word' belonging to that category, and an 'imposter_word' belonging to that same category. The 'imposter_word' MUST be very closely related to the 'normal_word' so that vague hints apply to both. CRITICAL RULE: The 'imposter_word' CANNOT be a subset, parent, or type of the 'normal_word'.`;
    if (bannedWordsList.length > 0) prompt += `\n\nABSOLUTELY DO NOT USE ANY OF THESE RECENTLY PLAYED WORDS: ${bannedWordsList}`;
    prompt += `\n\nReturn ONLY a JSON object: {"category": "Space", "normal_word": "Comet", "imposter_word": "Meteor"}`;

    const geminiRes = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    });
    const geminiData = await geminiRes.json();
    const textOutput = geminiData.candidates[0].content.parts[0].text;
    const cleanJsonString = textOutput.replace(/```json/g, '').replace(/```/g, '').trim();
    const generated = JSON.parse(cleanJsonString);

    // RETURN TO FRONTEND (DO NOT SAVE TO DB YET!)
    return res.status(200).json({ success: true, wordPair: generated });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}