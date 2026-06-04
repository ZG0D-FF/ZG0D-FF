import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Environment variables securely stored in Supabase
const UPSTASH_URL = Deno.env.get('UPSTASH_URL')!;
const UPSTASH_TOKEN = Deno.env.get('UPSTASH_TOKEN')!;
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // 1. Identify the intruder/visitor via IP
    const clientIp = req.headers.get('x-forwarded-for') || 'unknown_ip';
    
    // We get the JSON body
    const body = await req.json();
    const action = body.action || 'session'; // determine what to do
    
    // 2. ENFORCE RATE LIMIT based on action type
    const limit = action === 'chat' ? 50 : 20; // more generous for chatting
    const redisKey = `ratelimit:telemetry:${action}:${clientIp}`;

    const redisRes = await fetch(`${UPSTASH_URL}/incr/${redisKey}`, {
      headers: { Authorization: `Bearer ${UPSTASH_TOKEN}` }
    });
    const { result: count } = await redisRes.json();

    // Set expiration based on action (e.g. 1 hour)
    if (count === 1) {
      await fetch(`${UPSTASH_URL}/expire/${redisKey}/3600`, {
        headers: { Authorization: `Bearer ${UPSTASH_TOKEN}` }
      });
    }

    if (count > limit) {
      console.warn(`[SHIELD] Rate limit exceeded for IP: ${clientIp} on action: ${action}`);
      return new Response(JSON.stringify({ error: "Rate limit exceeded. System locked." }), { 
        status: 429, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      });
    }

    // 3. INIT SUPABASE SERVICE CLIENT (bypasses RLS so we can write to all tables safely)
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    let resultData = null;

    // 4. ROUTER - Handle different requests
    switch (action) {
      
      case 'session':
        // Original telemetry logic
        const { error: sessionError } = await supabase.from('session_logs').insert({
          visitor_name: String(body.visitor_name || 'GUEST').substring(0, 50),
          page_section: String(body.page_section || 'UNKNOWN').substring(0, 50),
          device_info: String(body.device_info || 'UNKNOWN').substring(0, 200)
        });
        if (sessionError) throw sessionError;
        resultData = "Session stored.";
        break;

      case 'sync_profile':
        // Logic: Sync visitor profile but DO NOT overwrite photo if the new one is empty
        const vName = String(body.visitor_name || 'GUEST').trim();
        const vNameLower = vName.toLowerCase();
        
        // Let's first get the existing profile to protect the photo and descriptors
        const { data: existingProfile } = await supabase
          .from('jarvis_known_users')
          .select('photo_base64, memory_summary, face_descriptor')
          .eq('visitor_name_lower', vNameLower)
          .maybeSingle();

        const updatePayload: any = {
          client_ip: clientIp,
          visitor_name: vName,
          visitor_name_lower: vNameLower,
          last_seen: new Date().toISOString(),
          age: body.age ? String(body.age) : null,
          location_data: body.location_data ? String(body.location_data) : null,
        };

        // If they provided a new photo, use it. Otherwise, keep the old one.
        if (body.photo_base64) {
          updatePayload.photo_base64 = body.photo_base64;
        } else if (existingProfile && existingProfile.photo_base64) {
          updatePayload.photo_base64 = existingProfile.photo_base64;
        }

        // Keep the memory summary if it exists (Groq summarizes this later)
        if (existingProfile && existingProfile.memory_summary) {
          updatePayload.memory_summary = existingProfile.memory_summary;
        }

        // Store or protect face_descriptor
        if (body.face_descriptor) {
          try {
            updatePayload.face_descriptor = JSON.parse(body.face_descriptor);
          } catch(e) {}
        } else if (existingProfile && existingProfile.face_descriptor) {
          updatePayload.face_descriptor = existingProfile.face_descriptor;
        }

        const { error: profileError } = await supabase
          .from('jarvis_known_users')
          .upsert(updatePayload, { onConflict: 'visitor_name_lower' });
        
        if (profileError) throw profileError;
        resultData = "Profile synced safely.";
        break;

      case 'chat':
        // Log a chat message
        const { error: chatError } = await supabase.from('jarvis_chat_logs').insert({
          client_ip: clientIp,
          user_prompt: String(body.user_prompt || ''),
          ai_response: String(body.ai_response || '')
        });
        if (chatError) throw chatError;
        resultData = "Chat logged.";
        break;

      case 'error_log':
        // Log a frontend error
        const { error: errLogError } = await supabase.from('jarvis_error_logs').insert({
          client_ip: clientIp,
          error_message: String(body.error_message || ''),
          error_source: String(body.error_source || ''),
          url: String(body.url || ''),
          user_agent: String(body.user_agent || '').substring(0, 200)
        });
        if (errLogError) throw errLogError;
        resultData = "Error logged.";
        break;

      default:
        throw new Error("Unknown action type");
    }

    return new Response(JSON.stringify({ success: true, message: resultData }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});