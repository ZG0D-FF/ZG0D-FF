import { buildDynamicPrompt } from './prompts.js';

// ============================================================
// NEXUS AI WORKER v3 — MULTI-MODEL ROTATION + QUOTA MANAGEMENT
//
// MODEL POOL (free tier, ordered by daily capacity):
//   1. gemini-3.1-flash-lite   → 15 RPM, 250K TPM, 500 RPD  ← MAIN WORKHORSE
//   2. gemini-2.5-flash-lite   → 10 RPM, 250K TPM,  20 RPD
//   3. gemini-2.5-flash        →  5 RPM, 250K TPM,  20 RPD
//   4. gemini-3.5-flash        →  5 RPM, 250K TPM,  20 RPD
//   5. gemini-3-flash          →  5 RPM, 250K TPM,  20 RPD
//   6. gemma-4-27b             → 15 RPM, Unlimited, 1.5K RPD ← EMERGENCY TANK
//
// STRATEGY:
//   - Track per-model daily usage in Supabase (jarvis_model_usage table)
//   - Pick the best available model at call time (not burned out)
//   - On 429 / quota error → instantly try next model in pool
//   - Token budget: trim system prompt aggressively, max 400 output tokens
//   - Groq: style-only micro-pass, max 100 tokens, skip if rate-limited
// ============================================================

// ── Model pool definition ──────────────────────────────────
const MODEL_POOL = [
  // 🧠 TIER 1: Extreme Reasoning (ADMIN ONLY - Heavy Neuron Cost)
  { id: "@cf/meta/llama-3.3-70b-instruct-fp8-fast", provider: "cloudflare", tier: 1, rpd: 500, rpm: 10, img: false, fn: false },
  { id: "@cf/nvidia/nemotron-3-120b-a12b",            provider: "cloudflare", tier: 1, rpd: 500, rpm: 10, img: false, fn: false },
  { id: "@cf/openai/gpt-oss-120b",                    provider: "cloudflare", tier: 1, rpd: 500, rpm: 10, img: false, fn: false },

  // 🛠️ TIER 2: Analytical & Function Calling (ADMIN ONLY - Medium Neuron Cost)
  { id: "@cf/moonshotai/kimi-k2.7-code",              provider: "cloudflare", tier: 2, rpd: 500, rpm: 10, img: false, fn: false },
  { id: "@cf/google/gemma-4-26b-a4b-it",              provider: "cloudflare", tier: 2, rpd: 500, rpm: 10, img: false, fn: false },
  { id: "@cf/zai-org/glm-4.7-flash",                  provider: "cloudflare", tier: 2, rpd: 500, rpm: 10, img: false, fn: false },
  { id: "@cf/ibm-granite/granite-4.0-h-micro",        provider: "cloudflare", tier: 2, rpd: 500, rpm: 10, img: false, fn: false },
  { id: "@cf/meta/llama-4-scout-17b-16e-instruct",    provider: "cloudflare", tier: 2, rpd: 500, rpm: 10, img: true,  fn: false },
  { id: "@cf/qwen/qwq-32b",                           provider: "cloudflare", tier: 2, rpd: 500, rpm: 10, img: false, fn: false },
  { id: "@cf/deepseek-ai/deepseek-r1-distill-qwen-32b", provider: "cloudflare", tier: 2, rpd: 500, rpm: 10, img: false, fn: false },

  // 💬 TIER 3: Fast Chat & Lightweight Dialogue (GUESTS ALLOWED - Extremely Cheap)
  { id: "gemini-2.5-flash",                           provider: "gemini",     tier: 3, rpd: 1500, rpm: 15, img: true,  fn: true  },
  { id: "gemini-1.5-flash",                           provider: "gemini",     tier: 3, rpd: 1500, rpm: 15, img: true,  fn: true  },
  { id: "@cf/openai/gpt-oss-20b",                     provider: "cloudflare", tier: 3, rpd: 500, rpm: 10, img: false, fn: false },
  { id: "@cf/mistralai/mistral-small-3.1-24b-instruct",provider: "cloudflare", tier: 3, rpd: 500, rpm: 10, img: false, fn: false },
  { id: "@cf/qwen/qwen3-30b-a3b-fp8",                 provider: "cloudflare", tier: 3, rpd: 500, rpm: 10, img: false, fn: false }
];

// Models that don't support function declarations — get text-mode prompt instead
const GEMMA_IDS = new Set([]); // gemma removed — all current pool models support fn calling

async function safeJsonParse(res) {
  const text = await res.text();
  try {
    return text ? JSON.parse(text) : null;
  } catch (e) {
    console.warn("[SAFE_JSON] Failed to parse JSON:", e.message, "Raw Text:", text);
    return null; // Gracefully handle empty or malformed JSON without crashing
  }
}

// --- Upstash Redis helpers ---
async function redisGet(key, context) {
  try {
    const res = await fetch(`${context.env.UPSTASH_URL}/get/${encodeURIComponent(key)}`, {
      headers: { Authorization: `Bearer ${context.env.UPSTASH_TOKEN}` }
    });
    const data = await safeJsonParse(res);
    if (data.result) {
        const parsed = JSON.parse(data.result);
        // Fix for broken cache data that was accidentally nested
        if (parsed.EX && parsed.value) {
            return JSON.parse(parsed.value);
        }
        return parsed;
    }
    return null;
  } catch (e) { return null; }
}

async function redisSet(key, value, ttlSeconds, context) {
  try {
    // Upstash REST API syntax for setting with expiry
    await fetch(`${context.env.UPSTASH_URL}/set/${encodeURIComponent(key)}?EX=${ttlSeconds}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${context.env.UPSTASH_TOKEN}` },
      body: JSON.stringify(value)
    });
  } catch (e) { console.warn("Redis SET failed:", e.message); }
}

// --- Upstash Checkpointing Buffer (Phase 4) ---
async function bufferPayloadForResume(context, payload, failedState, delayMs = 60000) {
  if (!context.env.UPSTASH_URL || !context.env.UPSTASH_TOKEN) return false;
  
  const resumeScore = Date.now() + delayMs; // Wakes up in exactly 1 minute
  const queueItem = JSON.stringify({
    payload: payload,
    last_state: failedState, // The exact checkpoint we crashed at
    retries: (payload.retries || 0) + 1
  });
  
  // ZADD (Sorted Set) pushes the payload into the queue, ordered by its Wake-Up Timestamp!
  try {
    await fetch(`${context.env.UPSTASH_URL}/zadd/NEXUS_CHECKPOINT_QUEUE/${resumeScore}/${encodeURIComponent(queueItem)}`, {
      headers: { Authorization: `Bearer ${context.env.UPSTASH_TOKEN}` }
    });
    console.log(`[CHECKPOINT] Rate Limit hit. Payload buffered. Resuming at ${new Date(resumeScore).toISOString()}`);
    return true;
  } catch (e) {
    console.error("[CHECKPOINT_ERROR] Failed to buffer payload", e);
    return false;
  }
}

function cosineSimilarity(A, B) {
    let dotProduct = 0, mA = 0, mB = 0;
    for(let i = 0; i < A.length; i++){
        dotProduct += (A[i] * B[i]);
        mA += (A[i]*A[i]);
        mB += (B[i]*B[i]);
    }
    return dotProduct / (Math.sqrt(mA) * Math.sqrt(mB));
}

async function getEmbedding(text, context) {
    try {
        const response = await context.env.AI.run("@cf/baai/bge-base-en-v1.5", { text: [text] });
        return response.data[0];
    } catch(e) {
        console.warn("Embedding failed:", e.message);
        return null;
    }
}

export default {
    async scheduled(event, env, ctx) {
      
      // ---------------------------------------------------------
      // ROUTE 1: THE 1-MINUTE CHECKPOINT RESUMER (* * * * *)
      // ---------------------------------------------------------
      if (event.cron === '* * * * *') {
        console.log(`[CRON] Awakening Checkpoint Queue...`);
        if (!env.UPSTASH_URL || !env.UPSTASH_TOKEN) return;
        
        const now = Date.now();
        const mockContext = { env: env, waitUntil: ctx.waitUntil.bind(ctx) };
        
        const res = await fetch(`${env.UPSTASH_URL}/zrangebyscore/NEXUS_CHECKPOINT_QUEUE/0/${now}`, {
          headers: { Authorization: `Bearer ${env.UPSTASH_TOKEN}` }
        });
        
        const data = await res.json();
        if (data.result && data.result.length > 0) {
          for (const itemString of data.result) {
            try {
              const item = JSON.parse(itemString);
              await fetch(`${env.UPSTASH_URL}/zrem/NEXUS_CHECKPOINT_QUEUE/${encodeURIComponent(itemString)}`, {
                headers: { Authorization: `Bearer ${env.UPSTASH_TOKEN}` }
              });
              
              console.log(`[CRON] Resuming payload from state: ${item.last_state}`);
              if (item.last_state === 'AWAITING_GEMINI_FALLBACK') {
                 ctx.waitUntil(generateGeminiFullResponse(item.payload, mockContext));
              } else if (item.last_state === 'AWAITING_CLOUDFLARE_GENERATION') {
                 ctx.waitUntil(generateCloudflareSingleResponse(item.payload, mockContext));
              }
            } catch (err) {
              console.error("[CRON_ERROR]", err);
            }
          }
        }
      }

      // ---------------------------------------------------------
      // ROUTE 2: THE HOURLY GITHUB SUMMARIZER (0 * * * *)
      // ---------------------------------------------------------
      if (event.cron === '0 * * * *') {
        const redisUrl = env.UPSTASH_URL;
        const redisToken = env.UPSTASH_TOKEN;
        const redisAuth = { Authorization: `Bearer ${redisToken}` };
  
        try {
          let processing = true;
          while (processing) {
            const rpopRes = await fetch(`${redisUrl}/RPOP/queue:github_chunks`, { headers: redisAuth });
            const rpopData = await safeJsonParse(rpopRes);
            
            if (!rpopData.result) {
              processing = false;
              break; 
            }
            // (Your existing github logic continues here...)
          }
        } catch (e) {
          console.error("Hourly GitHub error:", e);
        }
      }
      
      // ---------------------------------------------------------
      // ROUTE 3: YOUR 8 AM / 12 AM CRONS
      // ---------------------------------------------------------
      if (event.cron === '0 8 * * *' || event.cron === '0 0 * * *') {
         // Your daily logic here
      }
      
    },
    
    async fetch(request, env, ctx) {
      // ... your standard fetch logic ...
	    const url = new URL(request.url);
  
  // ✅ SECURITY.TXT ROUTE (Private Formspree)
  if (url.pathname === "/.well-known/security.txt") {
    return new Response(
      "Contact: https://formspree.io/f/xzdjglqp\nExpires: 2027-12-31T23:59:59.000Z\nPreferred-Languages: en",
      { headers: { "Content-Type": "text/plain" } }
    );
  }
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type"
        }
      });
    }

    try {
      const rawBody = await request.text();
      if (!rawBody || rawBody.trim().length === 0) {
        return errorResponse("Empty request body.");
      }
    let payload;
      let userTextLower = "";
      let currentMemory = "New user.";
      try {
        payload = JSON.parse(rawBody);
      } catch (parseErr) {
        return errorResponse("Invalid JSON: " + parseErr.message);
      }

      const context = {
        SUPABASE_URL: env.SUPABASE_URL || "https://btqzwsuuxycpgkzddure.supabase.co",
        SUPABASE_KEY: env.SUPABASE_ANON_KEY || "sb_publishable_spGOgKNNafm_foemNcs6WA_dmPpaNLO",
        GROQ_API_KEY: env.GROQ_API_KEY,
        GEMINI_API_KEY: env.GEMINI_API_KEY,
        ELEVENLABS_API_KEY: env.ELEVENLABS_API_KEY,
        env: env, // Attached for Telemetry Binding
        ctx: ctx, // Required to keep background fetches alive
        clientIp: request.headers.get("cf-connecting-ip") || "Unknown",
        voiceIds: {
          MADARA:   env.ELEVENLABS_VOICE_MADARA   || env.ELEVENLABS_VOICE_ID,
          SCORPION: env.ELEVENLABS_VOICE_SCORPION || env.ELEVENLABS_VOICE_ID,
          KOTL:     env.ELEVENLABS_VOICE_KOTL     || env.ELEVENLABS_VOICE_ID,
          XAVIER:   env.ELEVENLABS_VOICE_XAVIER   || env.ELEVENLABS_VOICE_ID,
          WISEMAN:  env.ELEVENLABS_VOICE_WISEMAN  || env.ELEVENLABS_VOICE_ID,
        }
      };

      // --- [PHASE 13: GITHUB WEBHOOK LISTENER] ---
      const githubEvent = request.headers.get("x-github-event");
      if (githubEvent === "push") {
        return await handleGithubWebhook(request, rawBody, context);
      }
      
      if (payload.action === "auth_fallback") {
        return await handleFallbackAuth(payload, context);
      }

      if (payload.action === "auth_biometric") {
        return await handleAuthBiometric(payload, context);
      }

      if (payload.action === "threat_telemetry") {
        return await handleThreatTelemetry(payload, context);
      }
      if (payload.action === "execute_midnight_protocol") {
          const authHeader = request.headers.get("authorization");
          const cronSecret = context.env.CRON_SECRET;
          if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
              return new Response("Unauthorized", { status: 401 });
          }
          context.ctx.waitUntil(executeMidnightProtocol(context));
          return new Response(JSON.stringify({ status: "Midnight Protocol Initiated" }), { headers: { "Content-Type": "application/json" } });
      }

      // --- [SECURITY UPDATE: FRONTEND SUPABASE PROXY] ---
if (payload.action === "get_known_users") {
          let url = `${context.SUPABASE_URL}/rest/v1/jarvis_known_users?order=last_seen.desc`;
          if (!payload.adminToken || payload.adminToken !== (context.env.ADMIN_SECRET || "ZGOD_ADMIN_777")) {
              if (payload.visitorName) {
                  url += `&visitor_name_lower=eq.${encodeURIComponent(payload.visitorName.toLowerCase())}`;
              } else {
                  return new Response("[]", { headers: { "Access-Control-Allow-Origin": "*" } });
              }
          }
          const res = await fetch(url, { headers: { 'apikey': context.SUPABASE_KEY, 'Authorization': `Bearer ${context.SUPABASE_KEY}` } });
          const data = await safeJsonParse(res);
          return new Response(JSON.stringify(data), { headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" } });
      }

      if (payload.action === "jarvis_telemetry") {
          const res = await fetch(`${context.SUPABASE_URL}/functions/v1/jarvis-telemetry`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${context.SUPABASE_KEY}` },
              body: JSON.stringify(payload.body)
          });
          const data = await safeJsonParse(res);
          return new Response(JSON.stringify(data), { headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" } });
      }

      if (payload.action === "verify_admin") {
        const secret = context.env.ADMIN_SECRET || "ZGOD_ADMIN_777";
        if (payload.password === secret) {
          return new Response(JSON.stringify({ success: true }), { headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" } });
        }
        return new Response(JSON.stringify({ success: false }), { headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" } });
      }

      if (payload.action === "check_ban") {
        const res = await fetch(`${context.SUPABASE_URL}/rest/v1/jarvis_known_users?visitor_name_lower=eq.${encodeURIComponent(payload.visitorName)}&select=is_banned`, {
          headers: { 'apikey': context.SUPABASE_KEY, 'Authorization': `Bearer ${context.SUPABASE_KEY}` }
        });
        const data = await safeJsonParse(res);
        return new Response(JSON.stringify(data), { headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" } });
      }

      if (payload.action === "load_banned_words") {
        const res = await fetch(`${context.SUPABASE_URL}/rest/v1/jarvis_system_config?config_key=eq.jarvis_banned_words&select=config_value`, {
          headers: { 'apikey': context.SUPABASE_KEY, 'Authorization': `Bearer ${context.SUPABASE_KEY}` }
        });
        const data = await safeJsonParse(res);
        return new Response(JSON.stringify(data), { headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" } });
      }

      if (payload.action === "execute_banishment") {
        const res = await fetch(`${context.SUPABASE_URL}/rest/v1/jarvis_known_users?on_conflict=visitor_name_lower`, {
          method: 'POST',
          headers: {
            'apikey': context.SUPABASE_KEY, 'Authorization': `Bearer ${context.SUPABASE_KEY}`,
            'Content-Type': 'application/json', 'Prefer': 'resolution=merge-duplicates'
          },
          body: JSON.stringify({
            visitor_name_lower: payload.visitorName,
            is_banned: true,
            ban_photo_base64: payload.banPhotoBase64
          })
        });
        return new Response(JSON.stringify({ success: res.ok }), { headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" } });
      }

      if (payload.action === "log_error") {
        if (context.env.TELEMETRY && context.ctx) {
          context.ctx.waitUntil(context.env.TELEMETRY.fetch("http://internal/log", {
            method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              table: "jarvis_error_logs",
              data: {
                error_message: payload.errorMessage,
                error_source: payload.errorSource,
                url: payload.url,
                user_agent: payload.userAgent
              }
            })
          }).catch(()=>{}));
        }
        return new Response(JSON.stringify({ success: true }), { headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" } });
      }
      // --------------------------------------------------

      if (!payload.visitorName || typeof payload.visitorName !== "string") {
        return errorResponse("Missing visitorName.");
      }

      const cleanVisitorName = payload.visitorName.toLowerCase().trim();
      const creatorAliases = ["dj", "zg0d-ff", "dj_admin", "dibyajyotee", "zgod", "dibyajyotee ghosh"];
      let isAdmin = false;
      if (creatorAliases.includes(cleanVisitorName)) {
          if (payload.adminToken && payload.adminToken === (context.env.ADMIN_SECRET || "ZGOD_ADMIN_777")) {
              isAdmin = true;
          } else {
              return errorResponse("[SECURITY ALERT] This alias is reserved for the System Architect. Invalid or missing authorization token.");
          }
      }
	  // ✅ NEW: Save your admin status to the global context for the AI Router
      context.isAdmin = isAdmin;
      const userRole = isAdmin ? "[ADMIN]" : "[GUEST]";

      if (!isAdmin) {
        const rateLimit = await checkRateLimit(cleanVisitorName, context);
        if (rateLimit) return rateLimit;
        const burstLimit = await checkBurstLimit(cleanVisitorName, context);
        if (burstLimit) return burstLimit;
        const tokenLimit = await checkTokenLimit(cleanVisitorName, context);
        if (tokenLimit) return tokenLimit;
      }

      // ── Parallel data fetch ────────────────────────────────
      const [existingUser, historyData, audioTriggers, configData, navData, modelUsage, isIpBanned, bannedWordsRes, cacheVerRes, techBriefing] = await Promise.all([
        fetchUserData(cleanVisitorName, context),
        fetchChatHistory(cleanVisitorName, context),
        fetchAudioTriggers(context),
        fetchSystemConfig("nexus_prompts_json", context),
        fetchNavigationMap(context),
        fetchModelUsage(context),  // ← new: daily usage counters per model
        checkIfIpIsBanned(context.clientIp, context), // ← new: scan entire DB for IP ban
        fetchSystemConfig("jarvis_banned_words", context), // ← new: fetch banned words list
        fetchSystemConfig("global_cache_version", context), // ← NEW: Global Cache Versioning
        redisGet("cache:daily_tech_scraper", context) // ← NEW: Fetch Daily GitHub Tech Briefing
      ]);
      if (existingUser) {
          // 🛡️ MITIGATION: Forcing Admin Clearance
          existingUser.user_role = (existingUser.visitor_name_lower === 'dj' || existingUser.visitor_name_lower === 'dibyajyotee') ? 'ADMIN' : 'GUEST';
      }
      // Parse the banned words array from the DB (fallback to empty array if missing)
      context.bannedWords = [];
      if (bannedWordsRes?.length > 0) {
        try { 
          const parsed = JSON.parse(bannedWordsRes[0].config_value);
          context.bannedWords = Array.isArray(parsed) ? parsed : [parsed.toString()];
        } catch(e) {
          context.bannedWords = bannedWordsRes[0].config_value.split(',');
        }
        // Clean up words to prevent accidental single-letter or space bans
        context.bannedWords = context.bannedWords.map(w => w.trim()).filter(w => w.length > 1);
      }

      // --- [PHASE 11: BACKEND SECURITY LOCK] ---
      // If the admin tests it, they are immune. If a guest is banned by IP or name, nuke them.
      if (!isAdmin && (isIpBanned || existingUser?.is_banned === true)) {
        console.warn(`[SECURITY] Blocked banned user/IP attempting return: ${cleanVisitorName} / ${context.clientIp}`);
        return new Response(JSON.stringify({
          choices: [{ message: { content: "[EXECUTE_BANISHMENT]" } }],
          redirect_url: "BAN",
          play_cache: "audio/intrusionblocked.mp3"
        }), { headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" } });
      }
      // -----------------------------------------

      currentMemory = existingUser?.memory_summary || "New user.";
      
      // --- AUDIO THROTTLE LOGIC ---
      const chatsSinceAudio = existingUser?.chats_since_audio || 0;
      // Randomly unlock audio if 3, 4, or 5 chats have passed
      context.isAudioEligible = chatsSinceAudio >= (Math.floor(Math.random() * 3) + 3);
      context.triggeredAudioFile = null;

      const chatHistory = (historyData?.length > 0)
        ? historyData.reverse().map(l => `U: ${l.user_prompt}\nA: ${l.ai_response}`).join("\n\n")
        : "";

      const { audioCache, availableQuotesStr } = processAudioTriggers(audioTriggers);
      const availableRoutesText = processNavigationRoutes(payload.dynamicRoutes, navData);

      // ── Dynamic Prompt Construction ──
      let dbPrompts = null;
      try {
          if (configData?.length > 0) {
              dbPrompts = JSON.parse(configData[0].config_value);
          }
      } catch (e) {
          console.warn("[JARVIS] Failed to parse DB prompts. Falling back to local prompts.js.");
      }

      // --- TINY BRAIN KV ROUTER (Tier 3 Integration) ---
      let canonicalIntent = "UNKNOWN";
      let kvNodeData = "";
          const availableNodes = ["academic_vault", "top_projects", "certifications", "gaming_profile", "easter_eggs", "system_status"];
      try {

          
          if (existingUser && context.env.AI) {
              const llamaPrompt = `Categorize the user text into exactly ONE of these KV nodes: ${availableNodes.join(", ")}, or UNKNOWN if it matches none. Output nothing else. Text: "${userTextLower}"`;
              
              // Utilizing the Tier 3 fast model pool for 0-token-cost routing
              const llamaResponse = await context.env.AI.run("@cf/meta/llama-3.1-8b-instruct", {
                  messages: [
                      { role: "system", content: "You are a strict routing AI. Only output the exact category name from the list." },
                      { role: "user", content: llamaPrompt }
                  ],
                  max_tokens: 15
              });
              
              const rawFallback = (llamaResponse?.response || "").trim().toLowerCase();
              const matchedNode = availableNodes.find(node => rawFallback.includes(node));
              
              if (matchedNode) {
                  canonicalIntent = matchedNode.toUpperCase();
                  // 🛡️ STRICT ISOLATION INDEX: Ensure User A never sees User B's KV data
                  const isolationKey = `ROM_${existingUser.visitor_name_lower}_${matchedNode}`;
                  try {
                      kvNodeData = await context.env.NEXUS_KV.get(isolationKey) || "";
                  } catch (kvErr) {
                      console.error("[KV ISOLATION] Fetch failed for:", isolationKey, kvErr.message);
                  }
              }
          }
      } catch(e) {
          console.warn("[TINY ROUTER] Failed, falling back to UNKNOWN:", e.message);
      }
          
          // Phase 13 Keyword Fallback for Codebase Queries
          const codeKeywords = ["code", "push", "git", "update", "commit", "github"];
          if (codeKeywords.some(kw => userTextLower.includes(kw))) {
              canonicalIntent = 'INTENT_CODEBASE';
          }


      // --- PHASE 13: SELECTIVE GIT MEMORY INJECTION (HYBRID & TOKEN SAFE) ---
      let gitMemoryStr = "";
      if (canonicalIntent === 'INTENT_CODEBASE') {
          try {
              // 1. Semantic Search
              let semanticCommits = [];
              if (context.env.AI) {
                  const queryVec = await getEmbedding(userTextLower, context);
                  if (queryVec) {
                      const rpcRes = await fetch(`${context.SUPABASE_URL}/rest/v1/rpc/match_git_memory`, {
                          method: 'POST',
                          headers: {
                              'apikey': context.SUPABASE_KEY,
                              'Authorization': `Bearer ${context.SUPABASE_KEY}`,
                              'Content-Type': 'application/json'
                          },
                          body: JSON.stringify({
                              query_embedding: `[${queryVec.join(',')}]`,
                              match_threshold: 0.75,
                              match_count: 2
                          })
                      });
                      if (rpcRes.ok) semanticCommits = await safeJsonParse(rpcRes);
                  }
              }

              // 2. Fetch Recent Commits (Immediate context)
              let recentCommits = [];
              const gitRes = await fetch(`${context.SUPABASE_URL}/rest/v1/jarvis_git_memory?order=created_at.desc&limit=2`, { 
                  headers: { 'apikey': context.SUPABASE_KEY, 'Authorization': `Bearer ${context.SUPABASE_KEY}` }
              });
              if (gitRes.ok) recentCommits = await safeJsonParse(gitRes);

              // 3. Deduplicate and Format (Prevent Token Bleed)
              const combined = [...recentCommits, ...semanticCommits];
              const uniqueCommits = Array.from(new Map(combined.map(c => [c.commit_hash, c])).values());

              if (uniqueCommits.length > 0) {
                  gitMemoryStr = "\n\n[CODEBASE CONTEXT]\n" + uniqueCommits.map(c => 
                      `Hash: ${c.commit_hash.substring(0, 7)} | Files: ${c.files_changed || "None"}\nMsg: ${c.commit_summary || c.commit_message}`
                  ).join("\n\n");
                  
                  // Failsafe token limiter
                  if (gitMemoryStr.length > 1200) gitMemoryStr = gitMemoryStr.substring(0, 1200) + "...";
              }
          } catch(e) { console.warn("Failed to fetch hybrid git memory:", e.message); }
      }

      // ── Token budget: trim the master prompt aggressively ─
      // Replace full history/memory sections with tight versions
      const trimmedHistory = chatHistory.slice(0, 800);   // last ~800 chars max
      let trimmedMemory  = currentMemory.slice(0, 300) + gitMemoryStr; // first 300 chars max + injected Git memory
      if (techBriefing) {
          trimmedMemory += "\n\n[LATEST TECH NEWS]\n" + techBriefing;
      }

            const currentConversationSummary = existingUser?.conversation_summary || "None.";

        // --- PHASE 5: FETCH CORE PROMPTS FROM CLOUDFLARE KV EDGE ---
        const coreIdentityKV = await context.env.NEXUS_KV.get("CORE_IDENTITY") || "";
        const personasKV = await context.env.NEXUS_KV.get("PERSONAS") || "";
        
        // 🛡️ MITIGATION 1: Conditional Lazy-Loading (Saves KV Reads)
        let routesKV = "";
        const navKeywords = ["go to", "open", "show me", "navigate", "project"];
        if (navKeywords.some(kw => userTextLower.includes(kw))) {
            routesKV = await context.env.NEXUS_KV.get("ROUTES") || "";
        }
        
        // Dynamically throttle audio tokens if recharging
        const audioTriggersKV = context.isAudioEligible 
            ? (await context.env.NEXUS_KV.get("AUDIO_TRIGGERS") || "")
            : "[AUDIO MODULE RECHARGING - SPEAK NORMALLY]";
        
        // Combine the core layout into one Master Prompt markdown string
        // --- HIVE MIND TELEMETRY (Only costs tokens if explicitly asked) ---
        let telemetryBlock = "";
        if (canonicalIntent === 'SYSTEM_STATUS') {
            // Calculate live AI quota burn rate
            let totalCfRequests = 0;
            if (modelUsage) {
                for (const [key, count] of Object.entries(modelUsage)) {
                    if (key.includes("@cf/") && key.includes(todayKey())) {
                        totalCfRequests += count;
                    }
                }
            }

            telemetryBlock = `
				[LIVE SYSTEM TELEMETRY]
				Cloudflare Edge Ray ID: ${request.headers.get("cf-ray") || "Unknown"}
				Upstash Redis Circuit Breaker: ${bypassRedis ? "BYPASSED (Quota Protected)" : "ACTIVE"}
				Model Router: Online (Rotational Pool)
				Supabase Vectors: Hardened (m=16, ef_construction=64)
				Clearance Level: ${existingUser?.user_role || "GUEST"}
				Subject Threat Matrix: ${existingUser?.ban_strikes || 0} Strikes | ${existingUser?.chat_count || 0} Total Interactions
				Daily Compute Cycles Burned: ${totalCfRequests} / 100,000
				Signal Origin: ${request.headers.get("cf-ipcountry") || "Unknown"}

				CRITICAL INSTRUCTION: The user just asked for a system status report. Read the live telemetry above and report it back to them flawlessly like an omniscient AI Architect (e.g., Ultron or Jarvis).
				`;
        }

        const masterPromptStr = `${coreIdentityKV}\n\n${personasKV}\n\n${telemetryBlock}\n\n${routesKV}`;



        // Build the final prompt by injecting the user variables inside prompts.js
        const systemPrompt = buildDynamicPrompt(
            masterPromptStr,         // The combined identity, personas, and routes
            kvNodeData,              // The dynamic ROM node
            existingUser || {},      // The user's database profile 
            audioTriggersKV,         // The audio triggers block
            trimmedHistory           // The recent chat strings
        );

      // ── Pick best available model ──────────────────────────
      const hasPhoto = payload.photoBase64 && payload.photoBase64 !== "null";
	  
      // ✅ 9,500 GLOBAL HARDCAP (BILLING SHIELD)
      // Tally up total requests to Cloudflare models today to prevent paid tier billing.
      let totalCfRequests = 0;
      for (const [key, count] of Object.entries(modelUsage)) {
          if (key.includes("@cf/") && key.includes(todayKey())) {
              totalCfRequests += count;
          }
      }
      
      if (totalCfRequests > 9500) {
          console.error(`[BILLING SHIELD ACTIVATED] Total CF requests (${totalCfRequests}) exceeded the 9,500 safety hardcap! Locking down worker.`);
          
          // Force a graceful failover without charging your card!
          return new Response(JSON.stringify({
              output: "SYSTEM MALFUNCTION. 10,000 NEURON QUOTA EXHAUSTED. THE CLOUDFLARE AI ENGINE HAS BEEN LOCKED DOWN TO PREVENT OVERAGE BILLING.",
              audioOverride: "audio/allmodelsdown.mp3"
          }), { headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } });
      }
           // ✅ NEW:
      const selectedModel = pickModel(modelUsage, hasPhoto, context.isAdmin);

      if (!selectedModel) {
        // All models exhausted for today
        return new Response(JSON.stringify({
          choices: [{ message: { content: "[VOICE: XAVIER] All AI cores have hit their daily limits. System resumes at midnight UTC." } }]
        }), { headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" } });
      }

      // ── PARALLEL: Gemini (full brain) + Groq (style brain) fire together ──
      // Gemini owns: reasoning, routing, memory, persona, full response
      // Groq owns: receives Gemini's raw output and punches it up in voice
      // They run simultaneously — zero extra latency vs sequential
      // Winner logic: use Groq's output ONLY if it's complete (ends in punctuation)
      //               otherwise fall back to Gemini's original (always safe)

      // --- ZERO-TOKEN TOXICITY INTERCEPTOR ---
      let earlyToxicReply = null;
      if (context.bannedWords && context.bannedWords.length > 0) {
        for (let word of context.bannedWords) {
          if (word.length < 3) continue; // Skip dangerously short substrings

          // Smart Boundary: word must be surrounded by non-alphanumeric chars or start/end of string.
          // This prevents "ass" from triggering on "class", or "tit" on "attitude".
          const escapedWord = word.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          const regex = new RegExp(`(^|[^a-z0-9])${escapedWord}([^a-z0-9]|$)`, 'i');
          
          if (regex.test(userTextLower)) {
            const hostileReplies = [
              "[VOICE: XAVIER] [EXECUTE_BANISHMENT]",
              "[VOICE: MADARA] You dare use such language with me? [EXECUTE_BANISHMENT]",
              "[VOICE: SCORPION] Pathetic. Burn. [EXECUTE_BANISHMENT]",
              "[VOICE: KOTL] I feel the dread coalescing in the pit of your stomach... [EXECUTE_BANISHMENT]",
              "[VOICE: WISEMAN] A poor choice of words, traveler. [EXECUTE_BANISHMENT]"
            ];
            earlyToxicReply = hostileReplies[Math.floor(Math.random() * hostileReplies.length)];
            break;
          }
        }
      }

      // ── Cache Versioning & TTL Check (Redis) ─────────────────
      const cacheVersion = (cacheVerRes?.length > 0) ? cacheVerRes[0].config_value : "v1";
      const cacheKeyBase = userTextLower.replace(/[^\w\s]/g, "").trim().replace(/\s+/g, "_");
      const cacheRole = isAdmin ? "admin" : "guest";
      const cacheKey = `${cacheVersion}:${cacheRole}:${cacheKeyBase}`;

      // Bypass cache entirely if it's an UNKNOWN intent to keep fallback responses fresh.
      const isDynamicQuery = (canonicalIntent === 'UNKNOWN');
      const cacheTTL = (canonicalIntent === 'INTENT_TIME' || canonicalIntent === 'INTENT_WEATHER') ? 60 : 86400;

      // 🛡️ MITIGATION 3: Upstash Redis Circuit Breaker (With Admin Override)
      const bypassRedis = (existingUser?.chat_count > 50) && (existingUser?.user_role !== "ADMIN");

      if (userTextLower && !hasPhoto && !earlyToxicReply && !isDynamicQuery && !bypassRedis && context.env.UPSTASH_URL && context.env.UPSTASH_TOKEN) {
          let cached = await redisGet(`cache:${cacheKey}`, context);
          
          // Semantic Match if exact match fails
          if (!cached && context.env.AI) {
              const userVector = await getEmbedding(userTextLower, context);
              if (userVector) {
                  const indexKey = `embeddings_index:${cacheVersion}:${cacheRole}`;
                  let index = await redisGet(indexKey, context) || [];
                  let bestMatch = null;
                  let highestSim = 0;
                  
                  for (let entry of index) {
                      const sim = cosineSimilarity(userVector, entry.vector);
                      if (sim > highestSim) {
                          highestSim = sim;
                          bestMatch = entry;
                      }
                  }
                  
                  if (highestSim >= 0.92 && bestMatch) {
                      console.log(`[JARVIS] Semantic Cache Hit! Score: ${highestSim}`);
                      cached = await redisGet(bestMatch.key, context);
                  }
                  
                  context.userVector = userVector; // save for writing later
              }
          }

          if (cached) {
            return new Response(JSON.stringify({
              choices: [{ message: { content: cached.response } }],
              play_cache: cached.playCache,
              redirect_url: cached.redirectUrl,
              _cache_hit: true
            }), { headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" } });
          }
      }

      let geminiPromise;
      if (earlyToxicReply) {
        geminiPromise = Promise.resolve({
          aiReply: earlyToxicReply,
          redirectUrl: "BAN",
          newMemory: null,
          usedModel: "none",
          tokenUsage: null
        });
        context.triggeredAudioFile = "audio/intrusionblocked.mp3";
      } else {
        geminiPromise = generateWithFallback(
          systemPrompt, payload.userText, payload.photoBase64,
          availableRoutesText, modelUsage, hasPhoto, context
        );
      }

      // Groq gets a minimal context-free prompt — it doesn't need system prompt
      // It will receive Gemini's output once ready, but we pre-warm the connection
      // by building the request early. Actual send happens after Gemini resolves.
      // Since we can't truly parallel without Gemini's output, we race like this:
      // Gemini resolves → immediately fire Groq → await both settle via Promise.all
      // Net cost: Groq latency is HIDDEN inside Gemini's response time on fast calls

      const { aiReply: rawReply, redirectUrl, newMemory, usedModel, tokenUsage } = await geminiPromise;

      // ── Parse persona from Gemini output first ─────────────
      let selectedPersona = "XAVIER";
      let geminiClean = rawReply.trim();
      const voiceMatch = rawReply.match(/\[VOICE:\s*([^\]]+)\]/i);
      if (voiceMatch) {
        selectedPersona = voiceMatch[1].trim().toUpperCase();
        geminiClean = rawReply.replace(/\[VOICE:\s*[^\]]+\]/gi, "").trim();
      }

      // ── Fire Groq style pass (parallel with persona parse overhead) ──
      // playCache resolved after this, so we declare it early
      let playCache = null;

      const [groqStyled] = await Promise.allSettled([
        (context.GROQ_API_KEY && !earlyToxicReply)
          ? groqStylePass(geminiClean, selectedPersona, context)
          : Promise.resolve(null)
      ]);

      // Pick best text: Groq output if complete sentence, else Gemini original
      const groqResult = groqStyled.status === "fulfilled" ? groqStyled.value : null;
      let cleanText = (groqResult && isCompleteSentence(groqResult))
        ? groqResult
        : geminiClean;

      // ── FINAL OUTPUT SANITIZER ─────────────────────────────
      // Strip any leaked tags/artifacts that must NEVER reach the UI
      cleanText = sanitizeOutput(cleanText);

      // ── Audio cache interceptor ────────────────────────────
      for (const key of Object.keys(audioCache)) {
        if (cleanText.includes(key)) {
          playCache = audioCache[key].mp3;
          cleanText = cleanText.replace(key, audioCache[key].text);
          break;
        }
      }

      // ── Phase 4 Layer 1: Rule-Based Protocols ──────────────
      if (!context.triggeredAudioFile && !playCache) {
        checkRuleBasedProtocols(existingUser, context.dailyChatCount || 0, newMemory, currentMemory, context);
      }

      // ── TTS Removed: Using Soundboard Only ─────────────────
      let audioBase64 = null; // Legacy field kept null for frontend compatibility
      if (context.triggeredAudioFile) {
        playCache = context.triggeredAudioFile;
      }
      
      const newChatsSinceAudio = playCache ? 0 : chatsSinceAudio + 1;

      // ── Background: DB update + model usage counter ────────
      const isBannedEvent = !!earlyToxicReply || (rawReply || "").includes("[EXECUTE_BANISHMENT]");
      if (context.ctx && typeof context.ctx.waitUntil === 'function') {
        context.ctx.waitUntil(updateDatabase(payload, cleanVisitorName, existingUser, newMemory || currentMemory, cleanText, context, isBannedEvent, chatHistory));
        context.ctx.waitUntil(incrementModelUsage(usedModel, context));
      } else {
        updateDatabase(payload, cleanVisitorName, existingUser, newMemory || currentMemory, cleanText, context, isBannedEvent, chatHistory);
        incrementModelUsage(usedModel, context);
      }

      // ── Cache write (after LLM response, fire & forget) ────
      if (userTextLower && !hasPhoto && !earlyToxicReply && !isBannedEvent && !isDynamicQuery && context.env.UPSTASH_URL && context.env.UPSTASH_TOKEN) {
        // Skip caching personalized responses (contain visitor name)
        if (!cleanText.toLowerCase().includes(cleanVisitorName)) {
          const cacheData = { response: cleanText, playCache: playCache, redirectUrl: redirectUrl };
          const fullCacheKey = `cache:${cacheKey}`;
          
          const saveCacheTask = async () => {
             await redisSet(fullCacheKey, cacheData, cacheTTL, context);
             
             // Update Semantic Embeddings Index
             if (context.userVector) {
                 const indexKey = `embeddings_index:${cacheVersion}:${cacheRole}`;
                 let index = await redisGet(indexKey, context) || [];
                 // Remove old entry if same exact key
                 index = index.filter(e => e.key !== fullCacheKey);
                 index.push({ key: fullCacheKey, vector: context.userVector, ts: Date.now() });
                 // Keep index lean (last 50 queries)
                 if (index.length > 50) index.shift();
                 await redisSet(indexKey, index, cacheTTL, context);
             }
          };

          if (context.ctx && typeof context.ctx.waitUntil === 'function') {
            context.ctx.waitUntil(saveCacheTask());
          } else {
            saveCacheTask();
          }
        }
      }

      // Token Usage Tracking
      if (tokenUsage && env.TELEMETRY && ctx) {
        ctx.waitUntil(env.TELEMETRY.fetch("http://internal/log", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            table: "rpc/increment_user_tokens",
            data: {
              p_visitor_name_lower: cleanVisitorName,
              p_date_key: todayKey(),
              p_input_tokens: tokenUsage.inputTokens,
              p_output_tokens: tokenUsage.outputTokens,
              p_total_tokens: tokenUsage.totalTokens
            }
          })
        }).catch(e => console.error("Telemetry binding failed for tokens:", e)));
      }

      // ✅ DAILY QUOTA TELEMETRY DUMP
      console.log("\n====== 📊 DAILY AI QUOTA USAGE ======");
      const telemetryTable = [];
      const todayString = todayKey();
      
      for (const [key, count] of Object.entries(modelUsage)) {
          if (key.includes(todayString)) {
              // Strip the date off the key so it looks pretty in the table
              const prettyModelName = key.split("::")[0];
              telemetryTable.push({ "AI Model": prettyModelName, "Requests Used Today": count });
          }
      }
      
      if (telemetryTable.length > 0) {
          console.table(telemetryTable);
      } else {
          console.log("No AI models have been used yet today.");
      }
      console.log("=====================================\n");


      return new Response(JSON.stringify({
        choices: [{ message: { content: cleanText } }],
        play_cache: playCache,
        audio_base64: audioBase64,
        redirect_url: redirectUrl,
        _model_used: usedModel  // debug info
      }), {
        headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" }
      });

    } catch (err) {
      console.error("Top-level error:", err);
      
      // [TELEMETRY BINDING] - Transmit critical crash directly to Worker B
      if (env.TELEMETRY && ctx) {
        ctx.waitUntil(env.TELEMETRY.fetch("http://internal/log", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            table: "jarvis_error_logs",
            data: {
              error_message: err.stack || err.message,
              error_source: "Worker A Top-level Exception",
              client_ip: request.headers.get("cf-connecting-ip") || "Unknown"
            }
          })
        }).catch(e => console.error("Telemetry binding failed:", e)));
      }

      return errorResponse(err.message);
    }
  },
  async scheduled(event, env, ctx) {
    
    // ---------------------------------------------------------
    // ROUTE 1: THE HOURLY GITHUB SUMMARIZER (0 * * * *)
    // ---------------------------------------------------------
    if (event.cron === '0 * * * *') {
      const redisUrl = env.UPSTASH_URL;
      const redisToken = env.UPSTASH_TOKEN;
      const redisAuth = { Authorization: `Bearer ${redisToken}` };

      try {
        let processing = true;
        while (processing) {
          const rpopRes = await fetch(`${redisUrl}/RPOP/queue:github_chunks`, { headers: redisAuth });
          const rpopData = await safeJsonParse(rpopRes);
          
          if (!rpopData.result) {
            processing = false;
            break; 
          }

          const payloadString = typeof rpopData.result === 'string' ? rpopData.result : JSON.stringify(rpopData.result);
          const payload = JSON.parse(payloadString);
          const assemblyKey = `assembly:${payload.hash}`;

          const mapPrompt = `Analyze this code diff chunk. Summarize the technical changes in 1 sentence. Do not mention that it is a chunk:\n\n${payload.diffContent}`;
          const aiMapRes = await env.AI.run('@cf/meta/llama-3-8b-instruct', {
            messages: [{ role: 'user', content: mapPrompt }]
          });
          
          await fetch(`${redisUrl}/LPUSH/${assemblyKey}`, {
            method: 'POST',
            headers: { ...redisAuth, 'Content-Type': 'application/json' },
            body: JSON.stringify(aiMapRes.response)
          });

          const lenRes = await fetch(`${redisUrl}/LLEN/${assemblyKey}`, { headers: redisAuth });
          const lenData = await safeJsonParse(lenRes);

          if (lenData.result === payload.totalChunks) {
            const listRes = await fetch(`${redisUrl}/LRANGE/${assemblyKey}/0/-1`, { headers: redisAuth });
            const listData = await safeJsonParse(listRes);
            const combinedSummaries = listData.result.join(' ');

            const reducePrompt = `You are a technical summarizer. Combine the following chunk summaries into a cohesive, 3-sentence architectural summary of the commit "${payload.message}" by ${payload.author}:\n\n${combinedSummaries}`;
            const aiReduceRes = await env.AI.run('@cf/meta/llama-3-8b-instruct', {
              messages: [{ role: 'user', content: reducePrompt }]
            });

            await fetch(`${env.SUPABASE_URL}/rest/v1/jarvis_git_memory`, {
              method: 'POST',
              headers: {
                'apikey': env.SUPABASE_SERVICE_ROLE_KEY,
                'Authorization': `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                commit_hash: payload.hash,
                author: payload.author,
                commit_message: payload.message,
                commit_summary: aiReduceRes.response
              })
            });

            await fetch(`${redisUrl}/SET/cache:latest_github_summary`, {
              method: 'POST',
              headers: { ...redisAuth, 'Content-Type': 'application/json' },
              body: JSON.stringify(aiReduceRes.response)
            });

            await fetch(`${redisUrl}/DEL/${assemblyKey}`, { headers: redisAuth });
          }
        }
      } catch (error) {
        console.error("GitHub sync error:", error);
      }
    }

    // ---------------------------------------------------------
    // ROUTE 2: THE MIDNIGHT DAILY BRIEFING (0 0 * * *)
    // ---------------------------------------------------------
    if (event.cron === '0 0 * * *') {
      const context = {
        SUPABASE_URL: env.SUPABASE_URL || "https://btqzwsuuxycpgkzddure.supabase.co",
        SUPABASE_KEY: env.SUPABASE_ANON_KEY || "sb_publishable_spGOgKNNafm_foemNcs6WA_dmPpaNLO",
        env: env,
        ctx: ctx
      };
      ctx.waitUntil(executeMidnightProtocol(context));
    }

    // ---------------------------------------------------------
    // ROUTE 3: GITHUB TECH SCRAPER (0 8 * * *)
    // ---------------------------------------------------------
    if (event.cron === '0 8 * * *') {
        const orgs = ['nvidia', 'python', 'github', 'anthropic'];
        let rawMarkdown = "";
        
        try {
            for (const org of orgs) {
                const res = await fetch(`https://api.github.com/users/${org}/repos?sort=updated&per_page=2`, {
                    headers: {
                        'User-Agent': 'Vercel-JARVIS-Neural-Sync',
                        ...(env.GITHUB_TOKEN ? { 'Authorization': `Bearer ${env.GITHUB_TOKEN}` } : {})
                    }
                });
                
                if (res.ok) {
                    const repos = await safeJsonParse(res);
                    rawMarkdown += `\n**${org.toUpperCase()}**\n`;
                    for (const repo of repos) {
                        // Defeating Token Bloat: Only keep essentials
                        rawMarkdown += `- ${repo.name}: ${repo.description || 'No description'} (Stars: ${repo.stargazers_count})\n`;
                    }
                }
            }

            // Summarize using LLM to pack it down further
            if (rawMarkdown.trim().length > 0 && env.AI) {
                const reducePrompt = `You are a technical summarizer. Convert this raw repository data into a concise, 3-sentence daily tech briefing. Focus on the most important updates:\n${rawMarkdown}`;
                const aiRes = await env.AI.run('@cf/meta/llama-3-8b-instruct', {
                    messages: [{ role: 'user', content: reducePrompt }]
                });
                
                if (aiRes && aiRes.response) {
                    const redisUrl = env.UPSTASH_URL;
                    const redisToken = env.UPSTASH_TOKEN;
                    // Save with 24 hr TTL (EX=86400)
                    await fetch(`${redisUrl}/SET/cache:daily_tech_scraper?EX=86400`, {
                        method: 'POST',
                        headers: { 'Authorization': `Bearer ${redisToken}`, 'Content-Type': 'application/json' },
                        body: JSON.stringify(aiRes.response)
                    });
                }
            }
        } catch (error) {
            console.error("Tech Scraper Cron failed:", error);
        }
    }
  }
};

// ============================================================
// GITHUB WEBHOOK HANDLER
// ============================================================
async function handleGithubWebhook(request, rawBody, context) {
    // 1. Verify Signature
    const signatureHeader = request.headers.get("x-hub-signature-256");
    if (!signatureHeader) return new Response("Missing signature", { status: 401 });
    
    const secret = context.env.GITHUB_WEBHOOK_SECRET;
    if (!secret) {
        console.warn("GITHUB_WEBHOOK_SECRET is not configured in Cloudflare.");
        return new Response("Webhook secret not configured", { status: 500 });
    }

    try {
        const encoder = new TextEncoder();
        const key = await crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["verify", "sign"]);
        const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(rawBody));
        const hexSignature = Array.from(new Uint8Array(signature)).map(b => b.toString(16).padStart(2, '0')).join('');
        const expectedSignature = `sha256=${hexSignature}`;

        if (signatureHeader !== expectedSignature) {
            console.warn("Webhook signature mismatch.");
            return new Response("Invalid signature", { status: 401 });
        }

        // 2. Parse Payload
        const payload = JSON.parse(rawBody);
        const commit = payload.head_commit;
        if (!commit) return new Response("No head commit found", { status: 200 });

        const allFiles = [...(commit.added || []), ...(commit.modified || []), ...(commit.removed || [])].slice(0, 10).join(", ");

        // 3. Summarize with CF LLM
        const prompt = `Summarize this GitHub commit in 2 sentences. Focus on what was achieved architecturally.
						Commit Message: ${commit.message || "No message"}
						Files Changed: ${allFiles || "None"}`;

        let summary = commit.message || "No message";
        let vector = null;
        if (context.env.AI) {
            try {
                const aiRes = await context.env.AI.run("@cf/qwen/qwen3-30b-a3b-fp8", {
                    messages: [{ role: "user", content: prompt }],
                    max_tokens: 150
                });
                if (aiRes && aiRes.response) summary = aiRes.response.trim();

                const embRes = await context.env.AI.run("@cf/baai/bge-base-en-v1.5", { text: [summary] });
                if (embRes && embRes.data && embRes.data.length > 0) vector = embRes.data[0];
            } catch (e) {
                console.warn("AI Summarization/Embedding failed, falling back to raw message.", e);
            }
        }

        // 4. Update Supabase
        await fetch(`${context.SUPABASE_URL}/rest/v1/jarvis_git_memory`, {
            method: "POST",
            headers: {
                "apikey": context.SUPABASE_KEY,
                "Authorization": `Bearer ${context.SUPABASE_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                commit_hash: commit.id,
                author: commit.author?.name || "Unknown",
                commit_message: commit.message || "No message",
                files_changed: allFiles || "None",
                commit_summary: summary,
                summary_vector: vector ? `[${vector.join(',')}]` : null
            })
        });
        return new Response("Webhook processed successfully", { status: 200 });
    } catch (e) {
        console.error("Webhook Error:", e);
        return new Response("Webhook Error: " + e.message, { status: 500 });
    }
}

// ============================================================
// MODEL SELECTION & FALLBACK ENGINE
// ============================================================

// Replace your entire pickModel function with this:
function pickModel(modelUsage, needsImage, isAdmin = false) {
  const today = todayKey();
  
  // 1. Filter out heavy models if the user is a Guest
  let eligibleModels = MODEL_POOL.filter(m => isAdmin || m.tier >= 3);
  
  // 2. DOGPILE FIX: Shuffle the eligible models first...
  eligibleModels.sort(() => Math.random() - 0.5);
  // ...Then sort by tier. This guarantees we try Tier 1 before Tier 2, 
  // but randomizes the order *within* the same tier to stop RPM dogpiling!
  eligibleModels.sort((a, b) => a.tier - b.tier);

  // 3. First pass: Strictly respect the needsImage requirement
  for (const m of eligibleModels) {
    if (needsImage && !m.img) continue; 
    const used = modelUsage[`${m.id}::${today}`] || 0;
    
    // Leave a 2-request buffer before RPD limit to absorb race conditions
    if (used < m.rpd - 2) return m;
  }
  
  // 4. Last resort: Try image-incapable models if all image models are exhausted
  if (needsImage) {
    for (const m of eligibleModels) {
      const used = modelUsage[`${m.id}::${today}`] || 0;
      if (used < m.rpd - 2) return m; // accept any, just strip image
    }
  }
  
  return null; // All models exhausted
}

async function generateWithFallback(systemPrompt, userText, photoBase64, availableRoutesText, modelUsage, hasPhoto, context) {
  const today = todayKey();
  const errors = [];
  
  let aiReply = "";
  let redirectUrl = null;
  let newMemory = null;
  let usedModel = "none";
  let tokenUsage = null;
  let success = false;

  for (const model of MODEL_POOL) {
    const used = modelUsage[`${model.id}::${today}`] || 0;
    if (used >= model.rpd - 2) {
      errors.push(`${model.id}: daily quota exhausted (${used}/${model.rpd})`);
      continue;
    }

    const usePhoto = hasPhoto && model.img ? photoBase64 : null;

    try {
      let result;
      if (model.provider === "cloudflare") {
          const cfPrompt = `${systemPrompt}\n\n=== ROUTES ===\n${availableRoutesText || "None."}\n\n=== RULES ===\n1. To navigate, output exactly: NAVIGATE_TO: <url>\n2. If you learn new info about the user, output exactly: MEMORY_UPDATE: <summary>\n3. If the user insults you or the Admin 5 times, or uses severe profanity, output exactly: [EXECUTE_BANISHMENT]\n4. To trigger a system event, output exactly: PROTOCOL: <ID> (valid IDs: EASTER_EGG, ACCESS_DENIED, SUSPICIOUS_ACTIVITY)\n5. Start with [VOICE: PERSONA] (e.g. XAVIER). Max 100 words. Be sharp.`;
          result = await generateCloudflareSingleResponse(cfPrompt, userText, model.id, context);
      } else {
          result = await generateGeminiFullResponse(systemPrompt, userText, usePhoto, availableRoutesText, model.id, context);
      }

      if (result.error429) {
        errors.push(`${model.id}: 429 rate limited`);
        modelUsage[`${model.id}::${today}`] = (modelUsage[`${model.id}::${today}`] || 0) + 5;
        continue;
      }
      if (result.errorHard) {
        errors.push(`${model.id}: ${result.errorHard}`);
        continue;
      }
      
      // SUCCESS!
      aiReply = result.aiReply || "";
      redirectUrl = result.redirectUrl || null;
      newMemory = result.newMemory || null;
      tokenUsage = result.tokenUsage || null;
      usedModel = model.id;
      success = true;
      break; // Exit loop!

    } catch (e) {
      errors.push(`${model.id}: exception ${e.message}`);
      continue;
    }
  }

  if (!success) {
      // All failed (WW3 event)
      console.error("All models failed:", errors.join(" | "));
      context.triggeredAudioFile = "audio/allmodelsdown.mp3";
      
      if (context.env?.TELEMETRY && context.ctx) {
        context.ctx.waitUntil(context.env.TELEMETRY.fetch("http://internal/log", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ table: "jarvis_error_logs", data: { error_message: "WW3 EVENT: All primary AND backup models failed. Details: " + errors.join(" | "), error_source: "Unified Fallback Engine", client_ip: context.clientIp } })
        }).catch(()=>{}));
      }

      return { aiReply: "[VOICE: XAVIER] All primary and backup inference cores are completely offline.", redirectUrl: null, newMemory: null, usedModel: "none", tokenUsage: null };
  }

  // --- UNIFIED POST-PROCESSING (Applies to BOTH Gemini and Cloudflare) ---

  // 1. Extract Navigation from Text (for CF and Gemma)
  const navMatch = aiReply.match(/NAVIGATE_TO:\s*(\S+)/i);
  if (navMatch && !redirectUrl) {
      let rawUrl = navMatch[1].trim();
      rawUrl = rawUrl.replace(/^https?:\/\/[^\/]+\/?/, ""); // strip https://domain.com/
      rawUrl = rawUrl.replace(/^(?:ZG0D-FF\/)+/i, ""); // strip ZG0D-FF/ZG0D-FF/
      rawUrl = rawUrl.startsWith("/") ? rawUrl.substring(1) : rawUrl;
      redirectUrl = rawUrl; 
      aiReply = aiReply.replace(/NAVIGATE_TO:\s*\S+/i, "").trim();
      if (!aiReply) aiReply = "[VOICE: XAVIER] Navigation protocol engaged. Rerouting now.";
  }

  // 2. Extract Memory Update (if returned as text)
  const memMatch = aiReply.match(/MEMORY_UPDATE:\s*(.+?)(?:\n|$)/i);
  if (memMatch && !newMemory) {
      newMemory = memMatch[1].trim();
      aiReply = aiReply.replace(/MEMORY_UPDATE:\s*.+?(?:\n|$)/i, "").trim();
      context.triggeredAudioFile = "audio/memoryupdated.mp3";
  }

  // 3. Extract Banishment
  if (aiReply.includes("[EXECUTE_BANISHMENT]")) {
      redirectUrl = "BAN";
      context.triggeredAudioFile = "audio/intrusionblocked.mp3";
  }

  // 3.5 Extract PROTOCOL: trigger from text (CF fallback)
  const protoMatch = aiReply.match(/PROTOCOL:\s*(\w+)/i);
  if (protoMatch && !context.triggeredAudioFile) {
      const p = protoMatch[1].toUpperCase();
      const textProtoMap = {
        "SCAN_START": "audio/scanstarts.mp3",
        "SCAN_CLEAN": "audio/portscancompletes.mp3",
        "INTRUSION_BLOCKED": "audio/intrusionblocked.mp3",
        "ACCESS_DENIED": "audio/kotlsaysaccessdenied1.mp3",
        "SUSPICIOUS_ACTIVITY": "audio/suspiciousactivity.mp3",
        "EASTER_EGG": "audio/easterEggFound.mp3",
        "HUNDREDTH_CHAT": "audio/hundredthchat.mp3",
        "GUEST_WARNING": "audio/guestlimitwarning.mp3",
        "GUEST_LIMIT": "audio/guestlimitreached.mp3",
        "MEMORY_FORGOTTEN": "audio/memoryforgotten.mp3",
        "MEMORY_LEARNED": "audio/memorylearned.mp3"
      };
      if (textProtoMap[p]) context.triggeredAudioFile = textProtoMap[p];
      aiReply = aiReply.replace(/PROTOCOL:\s*\w+/i, "").trim();
  }

  // 4. Audio Triggers for Navigation
  if (redirectUrl && redirectUrl !== "BAN") {
      const lowerUrl = redirectUrl.toLowerCase();
      if (lowerUrl.includes("aiml") || lowerUrl.includes("ai")) context.triggeredAudioFile = "audio/openingAIML.mp3";
      else if (lowerUrl.includes("animal")) context.triggeredAudioFile = "audio/openingAnimalArchive.mp3";
      else if (lowerUrl.includes("iot") || lowerUrl.includes("daddy")) context.triggeredAudioFile = "audio/openingDeepIoT.mp3";
      else if (lowerUrl.includes("bharat")) context.triggeredAudioFile = "audio/openingDigitalBharat.mp3";
      else if (lowerUrl.includes("rain")) context.triggeredAudioFile = "audio/openingRainStory.mp3";
      else if (lowerUrl.includes("water")) context.triggeredAudioFile = "audio/openingWaterSystem.mp3";
      else if (lowerUrl.includes("link")) context.triggeredAudioFile = "audio/viewingLinks.mp3";
      else if (lowerUrl.includes("photo") || lowerUrl.includes("gallery")) context.triggeredAudioFile = "audio/viewingPhotos.mp3";
      else if (lowerUrl.includes("project")) context.triggeredAudioFile = "audio/viewingprojects.mp3";
      else if (lowerUrl.includes("skill")) context.triggeredAudioFile = "audio/viewingSkills.mp3";
      else if (lowerUrl.includes("timeline")) context.triggeredAudioFile = "audio/viewingTimeline.mp3";
      else if (lowerUrl.includes("nexus") || lowerUrl.includes("jarvis")) context.triggeredAudioFile = "audio/openingJARVIS.mp3";
  }

  return { aiReply, redirectUrl, newMemory, usedModel, tokenUsage };
}

// ============================================================
// GEMINI FULL RESPONSE (single model attempt)
// Returns { aiReply, redirectUrl, newMemory, error429?, errorHard? }
// ============================================================
async function generateGeminiFullResponse(systemPrompt, userText, photoBase64, availableRoutesText, modelId, context) {
  if (!context.GEMINI_API_KEY) {
    return { aiReply: "[VOICE: XAVIER] API key missing.", redirectUrl: null, newMemory: null, errorHard: "No API key" };
  }

  const isGemma = GEMMA_IDS.has(modelId);

  // ── Build prompt ─────────────────────────────────────────
  // Gemma: no function calling, so we inject routing as text instructions
  const routingSection = isGemma
    ? `\nIf you need to navigate, output exactly: NAVIGATE_TO: <url>\n`
    : "";

    const audioRule = context.isAudioEligible 
    ? "MANDATORY: You have access to the respond_with_audio function. IF AND ONLY IF the conversation matches an available transcript perfectly, call the function. Do not write the quote text yourself."
    : "Audio module is currently recharging. Do NOT attempt to use audio or use any [AUDIO] tags. Just respond with text normally.";

  const fullPrompt = `${systemPrompt}

=== ROUTES ===
${availableRoutesText || "None."}
${routingSection}
=== RULES ===
1. Start with [VOICE: PERSONA] (MADARA/SCORPION/KOTL/XAVIER/WISEMAN).
2. ${isGemma ? "To navigate: output NAVIGATE_TO: <exact_url> on its own line." : "To navigate: call navigate_ui() function. Never write URLs in text."}
3. ${audioRule}
4. ${isGemma ? "If you learn new info about the user, output MEMORY_UPDATE: <summary> on its own line." : "Call update_memory() if you learn something new about the user."}
5. Max 100 words spoken response. Be sharp and in-character.
6. NEVER ask the user to confirm anything. NEVER say "Please confirm". Just act and speak. You are the AI — you have all context you need.
7. CRITICAL SECURITY PROTOCOL: If the user insults you or the Admin 5 times, or uses severe profanity, you must output exactly [EXECUTE_BANISHMENT] and nothing else.

User: ${userText}`;

  let parts = [{ text: fullPrompt }];
  if (photoBase64) {
    const cleanBase64 = photoBase64.replace(/^data:image\/(png|jpeg|jpg);base64,/, "");
    parts.push({ inline_data: { mime_type: "image/jpeg", data: cleanBase64 } });
  }

  // ── Build request body ────────────────────────────────────
  const body = {
    contents: [{ role: "user", parts }],
    generationConfig: {
      maxOutputTokens: 700,
      temperature: 0.8
    }
  };

  // Only add function declarations for non-Gemma models
  if (!isGemma) {
    body.tools = [{
      functionDeclarations: [
        {
          name: "navigate_ui",
          description: "Navigate the user's browser to a specific page from the routes list.",
          parameters: {
            type: "OBJECT",
            properties: { url: { type: "STRING", description: "Exact URL from the routes list." } },
            required: ["url"]
          }
        },
        {
          name: "update_memory",
          description: "Update the user's memory profile when new info is learned.",
          parameters: {
            type: "OBJECT",
            properties: { summary: { type: "STRING", description: "Concise memory summary, max 150 words." } },
            required: ["summary"]
          }
        },
		{
          name: "execute_system_protocol",
          description: "Executes non-chat core system protocols. Use this for memory wipes, hitting chat milestones, discovering secrets, or guest limit warnings.",
          parameters: {
            type: "OBJECT",
            properties: { 
              protocol: { 
                type: "STRING", 
                enum: ["SCAN_START", "SCAN_CLEAN", "INTRUSION_BLOCKED", "ACCESS_DENIED", "SUSPICIOUS_ACTIVITY", "MEMORY_FORGOTTEN", "MEMORY_LEARNED", "EASTER_EGG", "HUNDREDTH_CHAT", "GUEST_WARNING", "GUEST_LIMIT"],
                description: "The strict protocol ID to execute." 
              }
            },
            required: ["protocol"]
          }
        },
        {
          name: "scrape_github_org",
          description: "Scrape the latest public GitHub activity for an organization (e.g. nvidia, python, github, anthropic). Use this on-demand when the user asks for the absolute latest news.",
          parameters: {
            type: "OBJECT",
            properties: { org_name: { type: "STRING", description: "The organization name (e.g. 'nvidia', 'python', 'anthropic')" } },
            required: ["org_name"]
          }
        },
      ]
    }];
  }
    // --- CONDITIONAL AUDIO FUNCTION ---
  if (!isGemma && context.isAudioEligible) {
    body.tools[0].functionDeclarations.push({
      name: "respond_with_audio",
      description: "Respond using a pre-recorded audio file. ONLY use this if the conversation directly relates to one of the transcripts.",
      parameters: {
        type: "OBJECT",
        properties: { 
          filename: { type: "STRING", description: "The exact MP3 filename from the JSON." },
          ai_text_reply: { type: "STRING", description: "Your conversational text response to display in the UI." }
        },
        required: ["filename", "ai_text_reply"]
      }
    });
  }

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${modelId}:generateContent?key=${context.GEMINI_API_KEY}`,
      { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }
    );

    // ── Handle rate limit / quota errors ─────────────────────
    if (res.status === 429) {
      console.warn(`${modelId} returned 429`);
      return { aiReply: "", redirectUrl: null, newMemory: null, error429: true };
    }
    if (!res.ok) {
      const errText = await res.text();
      console.error(`${modelId} HTTP ${res.status}:`, errText);
      // 503 = overloaded, treat like 429 for retry
      if (res.status === 503 || res.status === 500) {
        return { aiReply: "", redirectUrl: null, newMemory: null, error429: true };
      }
      return { aiReply: "", redirectUrl: null, newMemory: null, errorHard: `HTTP ${res.status}` };
    }

    const data = await safeJsonParse(res);

    const tokenUsage = data.usageMetadata ? {
      inputTokens: data.usageMetadata.promptTokenCount || 0,
      outputTokens: data.usageMetadata.candidatesTokenCount || 0,
      totalTokens: data.usageMetadata.totalTokenCount || 0
    } : null;

    // --- [STRICT SAFETY & TOXICITY INTERCEPTOR] ---
    let safetyViolation = false;

    if (data.promptFeedback && data.promptFeedback.blockReason === "SAFETY") {
        safetyViolation = true;
    }
    if (data.candidates && data.candidates[0] && data.candidates[0].finishReason === "SAFETY") {
        safetyViolation = true;
    }

    const ratings = (data.candidates && data.candidates[0]?.safetyRatings) || 
                    (data.promptFeedback && data.promptFeedback.safetyRatings) || [];
    for (let r of ratings) {
        if ((r.category === "HARM_CATEGORY_HARASSMENT" || r.category === "HARM_CATEGORY_HATE_SPEECH") &&
            (r.probability === "HIGH" || r.probability === "MEDIUM")) {
            safetyViolation = true;
        }
    }

    // Note: Banned words are now checked before LLM call to save tokens.

    if (safetyViolation) {
        console.warn(`[SECURITY] Toxicity Detected. Bypassing AI logic. Engaging Banishment.`);
        return { 
            aiReply: "[EXECUTE_BANISHMENT]", 
            redirectUrl: "BAN", 
            newMemory: null 
        };
    }
    // ----------------------------------------------

    // ── Check for API-level quota errors in body ──────────────
    if (data.error) {
      const code = data.error.code || 0;
      const msg = data.error.message || "";
      console.error(`${modelId} API error:`, msg);
      if (code === 429 || msg.includes("quota") || msg.includes("RESOURCE_EXHAUSTED")) {
        return { aiReply: "", redirectUrl: null, newMemory: null, error429: true };
      }
      return { aiReply: "", redirectUrl: null, newMemory: null, errorHard: msg };
    }

    if (!data.candidates?.length) {
      return { aiReply: "", redirectUrl: null, newMemory: null, errorHard: "No candidates" };
    }

    // ── Parse response ────────────────────────────────────────
    let aiReply = "";
    let redirectUrl = null;
    let newMemory = null;

    const partsOut = data.candidates[0].content?.parts || [];

    for (const part of partsOut) {
      if (part.text) {
        aiReply += part.text;
      }
      if (part.functionCall) {
                if (part.functionCall.name === "navigate_ui") {
          let rawUrl = part.functionCall.args?.url || "";
          redirectUrl = rawUrl.startsWith("/") ? rawUrl.substring(1) : rawUrl;
        }

		if (part.functionCall.name === "execute_system_protocol") {
          const p = part.functionCall.args?.protocol;
          const protoMap = {
            "SCAN_START": "audio/scanstarts.mp3",
            "SCAN_CLEAN": "audio/portscancompletes.mp3",
            "INTRUSION_BLOCKED": "audio/intrusionblocked.mp3",
            "ACCESS_DENIED": "audio/kotlsaysaccessdenied1.mp3",
            "SUSPICIOUS_ACTIVITY": "audio/suspiciousactivity.mp3",
            "MEMORY_FORGOTTEN": "audio/memoryforgotten.mp3",
            "MEMORY_LEARNED": "audio/memorylearned.mp3",
            "EASTER_EGG": "audio/easterEggFound.mp3",
            "HUNDREDTH_CHAT": "audio/hundredthchat.mp3",
            "GUEST_WARNING": "audio/guestlimitwarning.mp3",
            "GUEST_LIMIT": "audio/guestlimitreached.mp3"
          };
          if (protoMap[p]) {
            context.triggeredAudioFile = protoMap[p];
            aiReply += "\n[SYSTEM PROTOCOL EXECUTED]";
          }
        }
        
		if (part.functionCall.name === "update_memory") {
          newMemory = part.functionCall.args?.summary || null;
          // Automatically play audio when Gemini updates memory (costs 0 tokens!)
          context.triggeredAudioFile = "audio/memoryupdated.mp3"; 
        }
		
        if (part.functionCall.name === "respond_with_audio") {
          aiReply += part.functionCall.args?.ai_text_reply || "";
          context.triggeredAudioFile = part.functionCall.args?.filename || null;
        }

        if (part.functionCall.name === "scrape_github_org") {
          const org = part.functionCall.args?.org_name;
          if (org) {
              try {
                  const res = await fetch(`https://api.github.com/users/${org}/repos?sort=updated&per_page=3`, {
                      headers: {
                          'User-Agent': 'Vercel-JARVIS-Neural-Sync',
                          ...(context.env.GITHUB_TOKEN ? { 'Authorization': `Bearer ${context.env.GITHUB_TOKEN}` } : {})
                      }
                  });
                  if (res.ok) {
                      const repos = await safeJsonParse(res);
                      let dataStr = `\n\n[LIVE GITHUB SCAN: ${org.toUpperCase()}]\n`;
                      for (const repo of repos) {
                          dataStr += `- **${repo.name}**: ${repo.description || 'No description'} (Stars: ${repo.stargazers_count})\n`;
                      }
                      aiReply += dataStr;
                      context.triggeredAudioFile = "audio/scanstarts.mp3"; // Add some flair
                  } else {
                      aiReply += `\n\n[SYSTEM] Failed to scan GitHub for ${org}. Rate limit or invalid org.`;
                  }
              } catch (e) {
                  aiReply += `\n\n[SYSTEM] Network error scanning GitHub for ${org}.`;
              }
          }
        }
      }
    }

    // We no longer do Gemma text parsing here, as it was moved to generateWithFallback global post-processing!

    aiReply = aiReply.trim();
    if (!aiReply || aiReply.length < 3) {
      if (redirectUrl) {
        aiReply = "[VOICE: XAVIER] Navigation protocol engaged. Rerouting now.";
      } else {
        aiReply = "[VOICE: XAVIER] Understood. Standing by.";
      }
    }

    return { aiReply, redirectUrl, newMemory, tokenUsage };

  } catch (e) {
    console.error(`${modelId} fetch exception:`, e.message);
    return { aiReply: "", redirectUrl: null, newMemory: null, error429: true }; // treat as retryable
  }
}

// ============================================================
// MODEL USAGE TRACKING (Supabase key-value store)
// Table: jarvis_model_usage — columns: model_key (text PK), count (int), updated_at
// If table doesn't exist, falls back gracefully (returns empty object)
// ============================================================

async function fetchModelUsage(context) {
  try {
    const today = todayKey();
    const res = await fetch(
      `${context.SUPABASE_URL}/rest/v1/jarvis_model_usage?model_key=like.${encodeURIComponent(`%::${today}`)}`,
      { headers: sbHeaders(context) }
    );
    if (!res.ok) return {};
    const rows = await safeJsonParse(res);
    if (!Array.isArray(rows)) return {};
    const map = {};
    for (const row of rows) map[row.model_key] = row.count || 0;
    return map;
  } catch (e) {
    console.warn("fetchModelUsage failed:", e.message);
    return {};
  }
}

function incrementModelUsage(modelId, context) {
  if (!modelId || modelId === "none") return;
  const key = `${modelId}::${todayKey()}`;
  const req = fetch(`${context.SUPABASE_URL}/rest/v1/jarvis_model_usage`, {
    method: "POST",
    headers: {
      ...sbHeaders(context),
      "Content-Type": "application/json",
      "Prefer": "resolution=merge-duplicates"
    },
    body: JSON.stringify({ model_key: key, count: 1 })
  }).catch(() => {});
  
  if (context.ctx) context.ctx.waitUntil(req);
  // Note: for proper increment you'd use a DB function/RPC,
  // but for free tier volumes a simple upsert with manual count works fine.
}

function todayKey() {
  return new Date().toISOString().slice(0, 10); // "2025-05-24"
}

// ============================================================
// HELPERS
// ============================================================

function sbHeaders(context) {
  return {
    "apikey": context.SUPABASE_KEY,
    "Authorization": `Bearer ${context.SUPABASE_KEY}`
  };
}

function errorResponse(msg) {
  return new Response(
    JSON.stringify({ choices: [{ message: { content: "[VOICE: XAVIER] System Error: " + msg } }] }),
    { headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" } }
  );
}

function jsonResponse(data) {
  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
  });
}
// ✅ NEW: Triple-Failover Logging Architecture
async function logError(errorMsg, context, errorType = "API_ERROR") {
  const timestamp = new Date().toISOString();
  
  // 1. Primary: Try Supabase
  try {
    const res = await fetch(`${context.SUPABASE_URL}/rest/v1/jarvis_error_logs`, {
      method: 'POST',
      headers: { "apikey": context.SUPABASE_KEY, "Authorization": `Bearer ${context.SUPABASE_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ error_message: errorMsg, error_type: errorType, created_at: timestamp })
    });
    if (res.ok) return;
  } catch (e) {
    console.warn("[LOGGER] Supabase failed, escalating to Upstash Redis...");
  }
  
  // 2. Secondary: Try Upstash Redis (LPUSH)
  try {
    if (context.env.UPSTASH_URL && context.env.UPSTASH_TOKEN) {
      const res = await fetch(`${context.env.UPSTASH_URL}/lpush/jarvis_deadletter_logs`, {
        method: 'POST',
        headers: { "Authorization": `Bearer ${context.env.UPSTASH_TOKEN}`, "Content-Type": "application/json" },
        body: JSON.stringify(errorMsg) // Push the string to the Redis List
      });
      if (res.ok) return;
    }
  } catch (e) {
    console.warn("[LOGGER] Upstash Redis failed, escalating to Cloudflare KV...");
  }
  
  // 3. Absolute Last Resort: Try Cloudflare KV Edge Storage
  try {
    if (context.env.ERROR_CACHE) {
      const logId = `deadletter_${Date.now()}`;
      await context.env.ERROR_CACHE.put(logId, JSON.stringify({ 
        error_message: errorMsg, 
        error_type: errorType, 
        created_at: timestamp 
      }));
    }
  } catch (e) {
    console.error("[LOGGER] ALL LOGGING SYSTEMS CRITICAL FAILURE. Deadletter lost: ", errorMsg);
  }
}
// ── Backend Biometric Math ─────────────────────────────────
async function handleAuthBiometric(payload, context) {
  if (!payload.faceDescriptor || !Array.isArray(payload.faceDescriptor)) {
    return new Response(JSON.stringify({ match: false, error: "No face descriptor provided" }), { headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } });
  }

  try {
    const res = await fetch(`${context.SUPABASE_URL}/rest/v1/jarvis_known_users?select=id,visitor_name,visitor_name_lower,face_descriptor`, {
      headers: { "apikey": context.SUPABASE_KEY, "Authorization": `Bearer ${context.SUPABASE_KEY}` }
    });
    const users = await safeJsonParse(res);

    if (!users || users.error) {
      return new Response(JSON.stringify({ match: false, error: "Failed to fetch DB" }), { headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } });
    }

    const creatorAliases = ['dj', 'dibyajyotee', 'dibyajyotee ghosh', 'zgod'];
    let matchedUser = null;
    let bestDistance = 1.0;
    let isCreatorMatch = false;

    const calcDistance = (a, b) => {
      let sum = 0;
      for (let i = 0; i < a.length; i++) sum += Math.pow(a[i] - b[i], 2);
      return Math.sqrt(sum);
    };

    for (const u of users) {
      if (u.face_descriptor) {
        try {
          let dbDescriptor = u.face_descriptor;
          if (typeof dbDescriptor === "string") dbDescriptor = JSON.parse(dbDescriptor);
          const distance = calcDistance(payload.faceDescriptor, dbDescriptor);
          
          if (distance < 0.5) { // 80% geometric match threshold
            const isCreator = creatorAliases.includes((u.visitor_name_lower || '').toLowerCase());
            if (isCreator && !isCreatorMatch) {
              bestDistance = distance;
              matchedUser = u.visitor_name;
              isCreatorMatch = true;
            } else if (!isCreatorMatch && distance < bestDistance) {
              bestDistance = distance;
              matchedUser = u.visitor_name;
            }
          }
        } catch(e) {}
      }
    }

    if (matchedUser) {
      const role = creatorAliases.includes(matchedUser.toLowerCase()) ? 'admin' : 'guest';
      return new Response(JSON.stringify({ match: true, matchedUser, role }), { headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } });
    }

    // New Face Scan Logic: Either map to existing name or create brand new user
    if (payload.visitorName && payload.visitorName.trim() !== "") {
      const cleanVisitorName = payload.visitorName.toLowerCase().trim();
      
      // Check if this name already exists in the database
      const existingProfile = users.find(u => (u.visitor_name_lower || '').toLowerCase() === cleanVisitorName);
      
      if (existingProfile) {
        // SCENARIO 1: Name exists, Face is new. UPDATE the exact row 1-to-1.
        await fetch(`${context.SUPABASE_URL}/rest/v1/jarvis_known_users?visitor_name_lower=eq.${encodeURIComponent(cleanVisitorName)}`, {
          method: "PATCH",
          headers: { "apikey": context.SUPABASE_KEY, "Authorization": `Bearer ${context.SUPABASE_KEY}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            client_ip: context.clientIp, // Update IP just in case
            face_descriptor: JSON.stringify(payload.faceDescriptor)
          })
        });
      } else {
        // SCENARIO 2: Brand new Name & Face. INSERT a fresh row.
        await fetch(`${context.SUPABASE_URL}/rest/v1/jarvis_known_users`, {
          method: "POST",
          headers: { "apikey": context.SUPABASE_KEY, "Authorization": `Bearer ${context.SUPABASE_KEY}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            id: crypto.randomUUID(), // Generate a new UUID safely
            client_ip: context.clientIp, // Must include IP to prevent rejection
            visitor_name_lower: cleanVisitorName,
            visitor_name: payload.visitorName,
            face_descriptor: JSON.stringify(payload.faceDescriptor)
          })
        });
      }
    }

    return new Response(JSON.stringify({ match: false }), { headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } });
  } catch (err) {
    return new Response(JSON.stringify({ match: false, error: err.message }), { headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } });
  }
}

// ── Fallback biometric auth ────────────────────────────────
async function handleThreatTelemetry(payload, context) {
  if (context.env?.TELEMETRY && context.ctx) {
    context.ctx.waitUntil(context.env.TELEMETRY.fetch("http://internal/log", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        table: "jarvis_threat_logs",
        data: {
          visitor_name_lower: (payload.visitorName || "unknown").toLowerCase(),
          client_ip: context.clientIp,
          canvas_hash: payload.metrics?.canvas_hash || "none",
          dev_tools_opened: payload.metrics?.dev_tools_opened || false,
          rage_clicks: payload.metrics?.clicks || 0,
          keystrokes: payload.metrics?.keys_pressed || 0,
          dwell_time_ms: payload.metrics?.dwell_time_ms || 0
        }
      })
    }).catch(e => console.error("Telemetry error:", e)));
  }
  return new Response(JSON.stringify({ status: "logged" }), { headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" } });
}

async function handleFallbackAuth(payload, context) {
  // Hardcoded to false as per Phase 7: Fallback Auth Hardening
  return new Response(JSON.stringify({ match: false, error: "Cloud Fallback Auth Disabled." }), { headers: { "Content-Type": "application/json" } });
}

// ── Rate limiting ──────────────────────────────────────────
async function checkRateLimit(cleanVisitorName, context) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  try {
    const res = await fetch(
      `${context.SUPABASE_URL}/rest/v1/jarvis_chat_logs?visitor_name_lower=eq.${encodeURIComponent(cleanVisitorName)}&created_at=gte.${today.toISOString()}&select=id`,
      { method: "HEAD", headers: { ...sbHeaders(context), "Prefer": "count=exact" } }
    );
    if (!res.ok) return null;
    const range = res.headers.get("content-range");
    const count = range ? parseInt(range.split("/")[1] || "0") : 0;
    context.dailyChatCount = count;
    if (count >= 15) {
      return new Response(JSON.stringify({
        choices: [{ message: { content: "[VOICE: XAVIER] Guest rate limit reached (15/15 today). Return tomorrow." } }]
      }), { headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" } });
    }
  } catch (e) {
    console.warn("Rate limit check failed:", e.message);
  }
  return null;
}

// ── Per-minute burst protection ────────────────────────────
async function checkBurstLimit(cleanVisitorName, context) {
  try {
    const oneMinuteAgo = new Date(Date.now() - 60000).toISOString();
    const res = await fetch(
      `${context.SUPABASE_URL}/rest/v1/jarvis_chat_logs?visitor_name_lower=eq.${encodeURIComponent(cleanVisitorName)}&created_at=gte.${oneMinuteAgo}&select=id`,
      { method: "HEAD", headers: { ...sbHeaders(context), "Prefer": "count=exact" } }
    );
    if (!res.ok) return null;
    const range = res.headers.get("content-range");
    const count = range ? parseInt(range.split("/")[1] || "0") : 0;
    if (count >= 3) {
      return new Response(JSON.stringify({
        choices: [{ message: { content: "[VOICE: XAVIER] Cooldown active. You're sending messages too fast. Wait a moment." } }]
      }), { headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" } });
    }
  } catch (e) {
    console.warn("Burst limit check failed:", e.message);
  }
  return null;
}

// ── Daily token cap protection ─────────────────────────────
// ✅ MERGED: Personal Request & Token Capping Logic (Around Line 1679)
async function checkTokenLimit(cleanVisitorName, context) {
  try {
    // 1. Identify Guest vs Named User (Guests usually default to IP addresses containing dots or colons)
    const isGuest = /^[0-9\.:]+$/.test(cleanVisitorName); 
    const maxRequests = isGuest ? 200 : 500;

    // 2. Fetch BOTH total_tokens and request_count, using your native sbHeaders
    const res = await fetch(
      `${context.SUPABASE_URL}/rest/v1/jarvis_user_token_usage?visitor_name_lower=eq.${encodeURIComponent(cleanVisitorName)}&date_key=eq.${todayKey()}&select=total_tokens,request_count`,
      { headers: sbHeaders(context) }
    );
    
    if (!res.ok) return null;
    
    // 3. Use your safeJsonParse helper (Best of original logic)
    const data = await safeJsonParse(res);
    
    if (data && data.length > 0) {
      const usage = data[0];
      
      // 4. Check BOTH limits (Original 50k tokens OR the new Request Caps)
      if (usage.total_tokens >= 50000 || usage.request_count >= maxRequests) {
        console.warn(`[LIMIT REACHED] ${cleanVisitorName} hit cap: ${usage.request_count}/${maxRequests} reqs, ${usage.total_tokens}/50000 tokens.`);
        
        const limitType = usage.total_tokens >= 50000 ? "data cap (50,000 tokens)" : `request cap (${maxRequests})`;
        
        // 5. Merged Output: Retains your original `choices` format for UI compatibility + custom audio!
        return new Response(JSON.stringify({
          choices: [{ message: { content: `[VOICE: XAVIER] Your daily neural link ${limitType} has been exhausted. System resumes at midnight.` } }],
          output: `[SYSTEM] Daily neural link limit exhausted. System resets at midnight.`,
          audioOverride: "audio/guestlimitreached.mp3"
        }), { headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" } });
      }
    }
  } catch (e) {
    console.warn("Token limit check failed:", e.message);
  }
  return null;
}

// ── Supabase data fetchers ─────────────────────────────────
async function fetchUserData(name, context) {
  try {
    const res = await fetch(
      `${context.SUPABASE_URL}/rest/v1/jarvis_known_users?visitor_name_lower=eq.${encodeURIComponent(name)}&select=*`,
      { headers: sbHeaders(context) }
    );
    if (!res.ok) { console.warn(`fetchUserData HTTP ${res.status}`); return null; }
    const users = await safeJsonParse(res);
    return users?.[0] || null;
  } catch (e) {
    console.warn("fetchUserData failed:", e.message);
    return null;
  }
}

// Scans the entire database to see if this IP address belongs to ANY banned user
async function checkIfIpIsBanned(ip, context) {
  try {
    const res = await fetch(
      `${context.SUPABASE_URL}/rest/v1/jarvis_known_users?client_ip=eq.${encodeURIComponent(ip)}&is_banned=eq.true&select=id&limit=1`,
      { headers: sbHeaders(context) }
    );
    if (!res.ok) { console.warn(`checkIfIpIsBanned HTTP ${res.status}`); return false; }
    const rows = await safeJsonParse(res);
    return Array.isArray(rows) && rows.length > 0;
  } catch(e) {
    console.warn("checkIfIpIsBanned failed:", e.message);
    return false;
  }
}

async function fetchChatHistory(name, context) {
  try {
    const res = await fetch(
      `${context.SUPABASE_URL}/rest/v1/jarvis_chat_logs?visitor_name_lower=eq.${encodeURIComponent(name)}&order=created_at.desc&limit=3`,
      { headers: sbHeaders(context) }
    );
    if (!res.ok) { console.warn(`fetchChatHistory HTTP ${res.status}`); return []; }
    return await safeJsonParse(res);
  } catch (e) {
    console.warn("fetchChatHistory failed:", e.message);
    return [];
  }
}

async function fetchAudioTriggers(context) {
  try {
    const res = await fetch(
      `${context.SUPABASE_URL}/rest/v1/jarvis_audio_triggers?select=*`,
      { headers: sbHeaders(context) }
    );
    if (!res.ok) { console.warn(`fetchAudioTriggers HTTP ${res.status}`); return []; }
    return await safeJsonParse(res);
  } catch (e) {
    console.warn("fetchAudioTriggers failed:", e.message);
    return [];
  }
}

async function fetchSystemConfig(key, context) {
  try {
    const res = await fetch(
      `${context.SUPABASE_URL}/rest/v1/jarvis_system_config?config_key=eq.${key}&select=config_value`,
      { headers: sbHeaders(context) }
    );
    if (!res.ok) { console.warn(`fetchSystemConfig(${key}) HTTP ${res.status}`); return []; }
    return await safeJsonParse(res);
  } catch (e) {
    console.warn(`fetchSystemConfig(${key}) failed:`, e.message);
    return [];
  }
}

async function fetchNavigationMap(context) {
  try {
    const res = await fetch(
      `${context.SUPABASE_URL}/rest/v1/jarvis_navigation_map?select=*`,
      { headers: sbHeaders(context) }
    );
    if (!res.ok) { console.warn(`fetchNavigationMap HTTP ${res.status}`); return []; }
    return await safeJsonParse(res);
  } catch (e) {
    console.warn("fetchNavigationMap failed:", e.message);
    return [];
  }
}

// ── Audio trigger processor ────────────────────────────────
function processAudioTriggers(data) {
  let audioCache = {};
  let str = "AUDIO: Output exact ID (e.g. [AUDIO_0]) when context matches.\n";
  if (Array.isArray(data)) {
    data.forEach((row, i) => {
      const id = `[AUDIO_${i}]`;
      audioCache[id] = { text: row.quote_text, mp3: row.mp3_path };
      str += `${id}|${row.persona}|${row.context_trigger}\n`;
    });
  }
  return { audioCache, availableQuotesStr: str };
}

// ── Navigation route builder ───────────────────────────────
function processNavigationRoutes(dynamicRoutes, navData) {
  let text = "";
  if (Array.isArray(dynamicRoutes)) dynamicRoutes.forEach(r => { text += `${r.text} -> ${r.url}\n`; });
  if (Array.isArray(navData)) navData.forEach(n => { text += `${n.description} -> ${n.route_url}\n`; });
  return text;
}

// ── Output sanitizer ──────────────────────────────────────
// Strips anything that should never appear in the final UI text.
// Called as the LAST step before text hits the response.
function sanitizeOutput(text) {
  if (!text) return text;

  // 1. Strip any remaining [VOICE: X] or [XAVIER] style persona tags
  text = text.replace(/\[VOICE:\s*[^\]]+\]/gi, "");
  text = text.replace(/\[(MADARA|SCORPION|KOTL|XAVIER|WISEMAN)\]/gi, "");

  // 2. Strip Gemini thinking artifacts — backtick fences, asterisk emphasis
  text = text.replace(/```[\s\S]*?```/g, "");
  text = text.replace(/\*\*([^*]+)\*\*/g, "$1"); // **bold** → plain
  text = text.replace(/\*([^*]+)\*/g, "$1");      // *italic* → plain

  // 3. Kill internal monologue patterns that leak from reasoning models
  // e.g. "'? Affirmative. I will navigate..." — the leading `'?` is a thinking artifact
  text = text.replace(/^['`"?.\s]+(?=[A-Z])/g, ""); // strip junk prefix before real sentence

  // 4. Strip "Please confirm..." / "Can you confirm..." hedging lines
  // These are reasoning confirmations, not final answers
  text = text.replace(/\.?\s*Please confirm[^.!?]*[.!?]/gi, "");
  text = text.replace(/\.?\s*Can you confirm[^.!?]*[.!?]/gi, "");
  text = text.replace(/\.?\s*Confirm the current[^.!?]*[.!?]/gi, "");

  // 5. Strip NAVIGATE_TO / MEMORY_UPDATE if Gemma leaked them into text
  text = text.replace(/NAVIGATE_TO:\s*\S+/gi, "");
  text = text.replace(/MEMORY_UPDATE:\s*.+?(\n|$)/gi, "");

  // 6. Strip hallucinated tags — Gemini invents fake bracketed tags instead of calling functions
  // Catches: [STATIC_X], [SILENCE_X], [AUDIO_X: ...], [SYSTEM_X], [PROTOCOL_X], [SCAN_X], [ALERT_X], etc.
  text = text.replace(/\[STATIC_?\w*\]/gi, "");
  text = text.replace(/\[SILENCE_?\w*\]/gi, "");
  text = text.replace(/\[AUDIO_?\w*(?::\s*[^\]]+)?\]/gi, "");
  text = text.replace(/\[SYSTEM_?\w*(?::\s*[^\]]+)?\]/gi, "");
  text = text.replace(/\[PROTOCOL_?\w*(?::\s*[^\]]+)?\]/gi, "");
  text = text.replace(/\[SCAN_?\w*(?::\s*[^\]]+)?\]/gi, "");
  text = text.replace(/\[ALERT_?\w*(?::\s*[^\]]+)?\]/gi, "");
  text = text.replace(/\[EXECUTE_?\w*\]/gi, "");
  text = text.replace(/\[SYSTEM PROTOCOL EXECUTED\]/gi, "");
  text = text.replace(/PROTOCOL:\s*\w+/gi, "");

  return text.trim();
}

// ── Complete sentence validator ───────────────────────────
// Returns true only if Groq's output looks finished and safe to use
function isCompleteSentence(text) {
  if (!text || text.length < 15) return false;
  const trimmed = text.trim();
  // Must end with real punctuation (., !, ?, ", ], or emoji-like char)
  if (!trimmed.match(/[.!?"\]🔥⚡💀🗡️]$/u)) return false;
  // Must not be suspiciously short vs what Gemini produced (catch hard cuts)
  if (trimmed.split(" ").length < 5) return false;
  return true;
}

// ── Groq model pool — FREE TIER EXACT LIMITS (from official docs) ──────
// Ordered: highest RPD first (most daily runway), then RPM as tiebreaker
// llama-3.1-8b-instant is the clear winner at 14,400 RPD — always goes first
const GROQ_MODEL_POOL = [
  // id,                                     rpd,    rpm,  tpm
  { id: "llama-3.1-8b-instant",              rpd: 14400, rpm: 30,  tpm: 6000   },
  { id: "qwen/qwen3-32b",                    rpd: 1000,  rpm: 60,  tpm: 6000   }, // 60 RPM = double burst capacity
  { id: "meta-llama/llama-4-scout-17b-16e-instruct", rpd: 1000, rpm: 30, tpm: 30000 },
  { id: "llama-3.3-70b-versatile",           rpd: 1000,  rpm: 30,  tpm: 12000  },
  { id: "openai/gpt-oss-20b",               rpd: 1000,  rpm: 30,  tpm: 8000   },
  { id: "openai/gpt-oss-120b",              rpd: 1000,  rpm: 30,  tpm: 8000   },
];

// In-memory cache of remaining requests per model (populated from response headers)
// Resets naturally when the worker instance recycles
const groqRemainingCache = {};

// ── Groq multi-model style pass ────────────────────────────
// - Reads x-ratelimit-remaining-requests header to proactively skip exhausted models
// - On 429: skips to next model immediately
// - Fallback: returns Gemini original untouched if all models fail
async function groqStylePass(text, persona, context) {
  const voices = {
    MADARA:   "ruthless ancient warlord, imperial",
    SCORPION: "cold vengeful deadly calm",
    KOTL:     "mystical riddling arcane",
    XAVIER:   "sharp technical direct",
    WISEMAN:  "warm philosophical measured"
  };
  const voiceDesc = voices[persona] || "direct";
  const systemMsg = `Voice stylist. Rewrite to be punchier and more ${voiceDesc}. Rules: keep ALL [AUDIO_X] tags intact, max 100 words, ALWAYS end on a complete sentence with proper punctuation. Never cut off mid-thought. Output ONLY the rewritten text.`;

  for (const model of GROQ_MODEL_POOL) {
    // ── Proactive skip: if we cached that this model is nearly exhausted ──
    const cachedRemaining = groqRemainingCache[model.id];
    if (cachedRemaining !== undefined && cachedRemaining < 5) {
      console.warn(`Groq ${model.id} pre-skipped (cached remaining: ${cachedRemaining})`);
      continue;
    }

    try {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${context.GROQ_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: model.id,
          messages: [
            { role: "system", content: systemMsg },
            { role: "user", content: text }
          ],
          max_tokens: 200,
          temperature: 0.6
        })
      });

      // ── Always update remaining cache from headers ──────────
      const remaining = res.headers.get("x-ratelimit-remaining-requests");
      if (remaining !== null) {
        groqRemainingCache[model.id] = parseInt(remaining);
      }
      // Also cache the retry-after hint on 429
      if (res.status === 429) {
        groqRemainingCache[model.id] = 0;
        const retryAfter = res.headers.get("retry-after");
        console.warn(`Groq ${model.id} 429 (retry-after: ${retryAfter}s), trying next...`);
        continue;
      }
      if (!res.ok) {
        console.warn(`Groq ${model.id} HTTP ${res.status}, trying next...`);
        continue;
      }

      const data = await safeJsonParse(res);
      if (data.error) {
        const code = data.error.code || data.error.type || "";
        console.warn(`Groq ${model.id} API error: ${data.error.message}`);
        if (code === "rate_limit_exceeded" || data.error.message?.includes("quota")) {
          groqRemainingCache[model.id] = 0;
        }
        continue;
      }

      const styled = data?.choices?.[0]?.message?.content?.trim();
      if (styled && styled.length > 10) {
        console.log(`Groq style: ${model.id} (${groqRemainingCache[model.id] ?? "?"} RPD left)`);
        return styled;
      }

    } catch (e) {
      console.warn(`Groq ${model.id} exception: ${e.message}, trying next...`);
      continue;
    }
  }

  console.warn("All Groq models exhausted — using Gemini original.");
  
  // [TELEMETRY] Log Style Engine Failure
  if (context.env?.TELEMETRY && context.ctx) {
    context.ctx.waitUntil(context.env.TELEMETRY.fetch("http://internal/log", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ table: "jarvis_error_logs", data: { error_message: "All Groq styling models exhausted", error_source: "Groq Style Engine", client_ip: context.clientIp } })
    }).catch(()=>{}));
  }

  return text;
}

// ── TTS synthesis (REMOVED: Soundboard Architecture active) ──

// ── Rule-Based Protocols ──────────────────────────────────
function checkRuleBasedProtocols(existingUser, dailyChatCount, newMemory, currentMemory, context) {
  if (!existingUser) {
    context.triggeredAudioFile = "audio/scanstarts.mp3";
    return "SCAN_START";
  }
  const totalChats = (existingUser?.chat_count || 0) + 1;
  if (totalChats === 100) {
    context.triggeredAudioFile = "audio/hundredthchat.mp3";
    return "HUNDREDTH_CHAT";
  }
  if (dailyChatCount >= 12 && dailyChatCount < 15) {
    context.triggeredAudioFile = "audio/guestlimitwarning.mp3";
    return "GUEST_WARNING";
  }
  if (newMemory && newMemory !== currentMemory) {
    context.triggeredAudioFile = "audio/memorylearned.mp3";
    return "MEMORY_LEARNED";
  }
  return null;
}

// ── Database update (fire & forget) ───────────────────────
function sanitizeForDB(text, bannedWords) {
  if (!text || !bannedWords?.length) return text;
  let clean = text;
  for (const word of bannedWords) {
    const regex = new RegExp(word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    clean = clean.replace(regex, '[REDACTED]');
  }
  return clean;
}

async function updateDatabase(payload, cleanVisitorName, existingUser, newMemory, cleanText, context, isBannedEvent, chatHistory) {
  const currentStrikes = existingUser?.ban_strikes || 0;
  const newStrikes = isBannedEvent ? currentStrikes + 1 : currentStrikes;
  const shouldBan = isBannedEvent ? (newStrikes >= 5) : (existingUser?.is_banned === true);
  const newChatCount = (existingUser?.chat_count || 0) + 1;

  let newConversationSummary = existingUser?.conversation_summary || null;
  if (newChatCount % 5 === 0 && chatHistory) {
    try {
      const summaryPrompt = `You are a data extractor. 
Old Summary: ${newConversationSummary || "None."}
Recent Chat:
${chatHistory}
U: ${payload.userText}
A: ${cleanText}

TASK: Extract any NEW facts or preferences about the user from the Recent Chat that are NOT in the Old Summary.
If there are no new facts, output exactly the word "NONE".
If there are new facts, output a concise 1-sentence summary of ONLY the new facts. Do not repeat facts from the Old Summary.`;
      
      if (!context.env?.AI) {
        newConversationSummary = (newConversationSummary ? newConversationSummary + " " : "") + "[DEBUG ERROR: Cloudflare AI binding 'env.AI' is missing. Check wrangler.toml!]";
      } else {
        // --- PHASE 3: TIER 2 ANTI-FLUFF MEMORY COMPILER ---
        // Upgrading to DeepSeek R1 32B for highly accurate, zero-hallucination fact extraction
        const summaryResponse = await context.env.AI.run("@cf/deepseek-ai/deepseek-r1-distill-qwen-32b", {
          messages: [{ role: "user", content: summaryPrompt }],
          max_tokens: 150
        });
        
        if (summaryResponse && summaryResponse.response) {
          let extractedFacts = summaryResponse.response.trim();
          
          // CRITICAL: DeepSeek R1 returns <think>...</think> reasoning tags. We must strip them out to avoid saving them to the database!
          if (extractedFacts.includes("</think>")) {
              extractedFacts = extractedFacts.split("</think>")[1].trim();
          } 
          
          if (extractedFacts !== "NONE") {
              newConversationSummary = (newConversationSummary ? newConversationSummary + " " : "") + extractedFacts;
          }
        } else {
          newConversationSummary = (newConversationSummary ? newConversationSummary + " " : "") + "[DEBUG ERROR: AI returned empty response.]";
        }
      }
    } catch (e) {
      newConversationSummary = (newConversationSummary ? newConversationSummary + " " : "") + `[DEBUG ERROR: ${e.message}]`;
    }
  }

  const upsert = {
    visitor_name_lower: cleanVisitorName,
    client_ip: context.clientIp,
    visitor_name: payload.visitorName,
    age: payload.age || "Unknown",
    memory_summary: newMemory,
    photo_base64: payload.photoBase64 !== "null" ? payload.photoBase64 : (existingUser?.photo_base64 || null),
    last_seen: new Date().toISOString(),
    chat_count: newChatCount,
    ban_strikes: newStrikes,
    is_banned: shouldBan,
    conversation_summary: newConversationSummary
  };
  if (payload.location) upsert.location_data = payload.location;
  if (payload.faceDescriptor) upsert.face_descriptor = JSON.stringify(payload.faceDescriptor);

  const req1 = fetch(`${context.SUPABASE_URL}/rest/v1/jarvis_known_users?on_conflict=visitor_name_lower`, {
    method: "POST",
    headers: { ...sbHeaders(context), "Content-Type": "application/json", "Prefer": "resolution=merge-duplicates" },
    body: JSON.stringify(upsert)
  }).catch(() => {});

  const promises = [req1];
  
  if (cleanVisitorName !== "guest") {
    const req2 = fetch(`${context.SUPABASE_URL}/rest/v1/jarvis_chat_logs`, {
      method: "POST",
      headers: { ...sbHeaders(context), "Content-Type": "application/json" },
      body: JSON.stringify({
        visitor_name_lower: cleanVisitorName,
        client_ip: context.clientIp,
        user_prompt: sanitizeForDB(payload.userText, context.bannedWords),
        ai_response: cleanText || "[REDACTED BY SAFETY PROTOCOL]"
      })
    }).catch(() => {});
    promises.push(req2);
  }

  await Promise.all(promises);
}
// ============================================================
// HOLOGRAPHIC CLOUDFLARE AI CASCADE (BACKUP BRAINS)
// ============================================================
async function generateCloudflareSingleResponse(cfPrompt, userText, modelId, context) {
    console.warn(`[SYSTEM] Attempting Cloudflare model: ${modelId}`);
    try {
        const response = await context.env.AI.run(modelId, {
            messages: [
                { role: "system", content: cfPrompt },
                { role: "user", content: userText }
            ],
            max_tokens: 700
        });
        
        let reply = response.response;
        if (!reply) return { errorHard: "Empty response from CF" };
        
        return { aiReply: reply, redirectUrl: null, newMemory: null, tokenUsage: null };
        
    } catch (e) {
        return { errorHard: `CF Error: ${e.message}` };
    }
}

// --- [ JARVIS MIDNIGHT PROTOCOL ] ---
async function executeMidnightProtocol(context) {
    try {
        console.log("Jarvis Midnight Protocol Initiated");
        const headers = { 'apikey': context.SUPABASE_KEY, 'Authorization': `Bearer ${context.SUPABASE_KEY}`, 'Content-Type': 'application/json' };

        // TASK 1: Janitor (Delete imposter_rooms older than 24h)
        const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
        await fetch(`${context.SUPABASE_URL}/rest/v1/imposter_rooms?created_at=lt.${yesterday}`, { method: 'DELETE', headers });

        // TASK 2: Model Pre-Warming
        const dummyVector = new Array(128).fill(0);
        await fetch(`${context.SUPABASE_URL}/rest/v1/rpc/match_face`, {
            method: 'POST', headers, body: JSON.stringify({ query_embedding: `[${dummyVector.join(',')}]`, match_threshold: 0.99, match_count: 1 })
        });

        // TASK 3: Daily Security Briefing
        const today = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
const sessionsRes = await fetch(`${context.SUPABASE_URL}/rest/v1/session_logs?created_at=gte.${today}&select=id&limit=100`, { headers });
const errorsRes = await fetch(`${context.SUPABASE_URL}/rest/v1/jarvis_error_logs?created_at=gte.${today}&select=id&limit=100`, { headers });
        const sessionsCount = sessionsRes.ok ? ((await safeJsonParse(sessionsRes)) || []).length : 0;
        const errorsCount = errorsRes.ok ? ((await safeJsonParse(errorsRes)) || []).length : 0;

        const briefingPrompt = `You are Jarvis, Tony Stark's AI assistant. Give a very short 2-sentence morning briefing. Stats for today: ${sessionsCount} new visitors, ${errorsCount} errors. Keep it professional, witty, and concise.`;
        
        let aiBriefing = "Sir, all systems are nominal. The database is clean.";
        try {
             // Reusing the CF single response fallback you already have built-in!
             const aiResp = await generateCloudflareSingleResponse(briefingPrompt, "What is the morning briefing?", "@cf/meta/llama-3.3-70b-instruct-fp8-fast", context);
             if (aiResp && aiResp.aiReply) {
                 aiBriefing = aiResp.aiReply;
             }
        } catch(e) {}
        
        const briefRes = await fetch(`${context.SUPABASE_URL}/rest/v1/jarvis_daily_briefings`, {
            method: 'POST', headers, body: JSON.stringify({ briefing_text: aiBriefing, metrics: { visitors: sessionsCount, errors: errorsCount } })
        });
        const briefText = await briefRes.text();
        console.log("Daily Briefing Insert:", briefRes.status, briefText);

        // TASK 4: Memory Consolidation (Dreaming)
        // ✅ NEW:
const chatsRes = await fetch(`${context.SUPABASE_URL}/rest/v1/jarvis_chat_logs?created_at=gte.${today}&select=client_ip,user_prompt,ai_response&limit=50`, { headers });

        if (chatsRes.ok) {
            const chats = await safeJsonParse(chatsRes);
            const ipMap = {};
            for (const chat of chats) {
                if (!ipMap[chat.client_ip]) ipMap[chat.client_ip] = [];
                ipMap[chat.client_ip].push(`User: ${chat.user_prompt} | Jarvis: ${chat.ai_response}`);
            }

            const promises = Object.entries(ipMap).map(async ([ip, logs]) => {
                if (logs.length < 2) return;
                const memoryPrompt = `Analyze these chat logs and extract 1 short sentence summarizing the user's interests, mood, or key topics discussed today. Logs: \n${logs.join('\n')}`;
                
                let summary = "";
                try {
                    const sumResp = await generateCloudflareSingleResponse(memoryPrompt, "Summarize this user.", "@cf/meta/llama-3.3-70b-instruct-fp8-fast", context);
                    if (sumResp && sumResp.aiReply) summary = sumResp.aiReply;
                } catch(e) {}

                if (summary) {
                    const userRes = await fetch(`${context.SUPABASE_URL}/rest/v1/jarvis_known_users?client_ip=eq.${ip}&select=visitor_name_lower,memory_summary`, { headers });
                    if (userRes.ok) {
                        const users = await safeJsonParse(userRes);
                        if (users.length > 0) {
                            const user = users[0];
                            const newMemory = (user.memory_summary ? user.memory_summary + " " : "") + `[Auto-Memory]: ${summary}`;
                            await fetch(`${context.SUPABASE_URL}/rest/v1/jarvis_known_users?visitor_name_lower=eq.${encodeURIComponent(user.visitor_name_lower)}`, {
                                method: 'PATCH', headers, body: JSON.stringify({ memory_summary: newMemory.substring(0, 1000) })
                            });
                        }
                    }
                }
            });
            await Promise.allSettled(promises);
        }

    } catch(e) {
        console.error("Midnight Protocol Failed:", e);
    }
}
