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
    const redisKey = `ratelimit:telemetry:${clientIp}`;

    // 2. Ping Upstash Redis to increment their hit count
    const redisRes = await fetch(`${UPSTASH_URL}/incr/${redisKey}`, {
      headers: { Authorization: `Bearer ${UPSTASH_TOKEN}` }
    });
    const { result: count } = await redisRes.json();

    // Set a 1-hour expiration on the IP tracker if it's their first hit
    if (count === 1) {
      await fetch(`${UPSTASH_URL}/expire/${redisKey}/3600`, {
        headers: { Authorization: `Bearer ${UPSTASH_TOKEN}` }
      });
    }

    // 3. ENFORCE RATE LIMIT (e.g., max 5 telemetry logs per hour per IP)
    if (count > 5) {
      console.warn(`[SHIELD] Rate limit exceeded for IP: ${clientIp}`);
      return new Response(JSON.stringify({ error: "Rate limit exceeded. System locked." }), { 
        status: 429, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      });
    }

    // 4. SANITIZE AND INSERT DATA
    const body = await req.json();
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    const { error } = await supabase.from('session_logs').insert({
      // Force substring limits at the edge before it even hits the DB
      visitor_name: String(body.visitor_name || 'GUEST').substring(0, 50),
      page_section: String(body.page_section || 'UNKNOWN').substring(0, 50),
      device_info: String(body.device_info || 'UNKNOWN').substring(0, 200)
    });

    if (error) throw error;

    return new Response(JSON.stringify({ success: true, message: "Telemetry stored." }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});