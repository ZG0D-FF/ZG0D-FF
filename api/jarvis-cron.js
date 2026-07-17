export default async function handler(req, res) {
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret || req.headers.authorization !== `Bearer ${cronSecret}`) {
    return res.status(401).json({ error: 'Unauthorized.' });
  }

  try {
    // 1. Check Supabase: Did Cloudflare natively succeed today?
    const sbUrl = process.env.VITE_SUPABASE_URL || "https://btqzwsuuxycpgkzddure.supabase.co";
    const sbKey = process.env.VITE_SUPABASE_ANON_KEY || "sb_publishable_spGOgKNNafm_foemNcs6WA_dmPpaNLO";
    
    const today = new Date().toISOString().split('T')[0];
    const checkRes = await fetch(`${sbUrl}/rest/v1/jarvis_daily_briefings?date_summary=eq.${today}&select=id`, {
      headers: { 'apikey': sbKey, 'Authorization': `Bearer ${sbKey}` }
    });
    
    if (checkRes.ok) {
        const checkData = await checkRes.json();
        if (checkData && checkData.length > 0) {
            return res.status(200).json({ success: true, message: 'Cloudflare natively succeeded. Vercel aborting.' });
        }
    }

    // 2. Cloudflare failed. Ping it forcefully.
    // CRITICAL: Replace this with your REAL Cloudflare Worker URL from the Dashboard!
       const workerUrl = "https://soft-thunder-2965.zgodmr.workers.dev/";
    
    const triggerRes = await fetch(workerUrl, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "execute_midnight_protocol", cron_secret: cronSecret })
    });

    if (triggerRes.ok) {
      return res.status(200).json({ success: true, message: 'Cloudflare was down. Vercel forcefully woke it up.' });
    } else {
      return res.status(500).json({ success: false, message: 'Cloudflare failed to respond.' });
    }
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}