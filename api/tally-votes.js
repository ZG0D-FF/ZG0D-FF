export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });
  const { roomId, secretToken } = req.body;
  
  const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;
  const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
  const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

  try {
    // 1. Verify Host via Redis
    const authCheck = await fetch(REDIS_URL, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${REDIS_TOKEN}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(["GET", `imposter_auth_${secretToken}`])
    });
    const authData = await authCheck.json();
    if (!authData.result) return res.status(403).json({ error: 'Invalid auth' });

    // 2. Fetch all votes from Redis Hash
    const votesRes = await fetch(REDIS_URL, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${REDIS_TOKEN}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(["HGETALL", `votes_${roomId}`])
    });
    const votesData = await votesRes.json();
    const votesArray = votesData.result || [];
    
    // Count them up
    const counts = {};
    let totalVotesCast = 0;
    for (let i = 1; i < votesArray.length; i += 2) {
       const target = votesArray[i];
       counts[target] = (counts[target] || 0) + 1;
       totalVotesCast++;
    }

    // 3. Find the player with the most votes
    let maxVotes = 0;
    let eliminatedId = null;
    let tie = false;
    for (const [target, count] of Object.entries(counts)) {
       if (count > maxVotes) {
          maxVotes = count;
          eliminatedId = target;
          tie = false;
       } else if (count === maxVotes) {
          tie = true;
       }
    }

    // 4. Get active players from Supabase to check the 50% rule
    const playersRes = await fetch(`${SUPABASE_URL}/rest/v1/imposter_players?room_id=eq.${roomId}&is_alive=eq.true`, {
      headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
    });
    const activePlayers = await playersRes.json();
    
    let newRoomStatus = 'playing'; // Default: game continues to next round (Stalemate)

    // >50% Rule: A player must get MORE than half the votes of living players to be ejected
    if (!tie && eliminatedId !== 'SKIP' && maxVotes > (activePlayers.length / 2)) {
       // Eliminate the player in Supabase
       await fetch(`${SUPABASE_URL}/rest/v1/imposter_players?id=eq.${eliminatedId}`, {
         method: 'PATCH',
         headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}`, 'Content-Type': 'application/json' },
         body: JSON.stringify({ is_alive: false })
       });

       // Check Win Conditions
       const redisGameRes = await fetch(REDIS_URL, {
         method: 'POST',
         headers: { 'Authorization': `Bearer ${REDIS_TOKEN}`, 'Content-Type': 'application/json' },
         body: JSON.stringify(["GET", `imposter_game_${roomId}`])
       });
       const redisGameData = await redisGameRes.json();
       const secretGameState = JSON.parse(redisGameData.result);

       if (eliminatedId === secretGameState.imposter_id) {
         newRoomStatus = 'crew_win'; // They caught the imposter!
       } else if (activePlayers.length - 1 <= 2) {
         newRoomStatus = 'imposter_win'; // Only 1 crew and 1 imposter left!
       }
    }

    // Update Room Status (Starts next round, or ends game)
    await fetch(`${SUPABASE_URL}/rest/v1/imposter_rooms?id=eq.${roomId}`, {
      method: 'PATCH',
      headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newRoomStatus })
    });

    return res.status(200).json({ success: true, eliminatedId, newRoomStatus });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}