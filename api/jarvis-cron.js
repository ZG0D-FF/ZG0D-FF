export default async function handler(req, res) {
  // 1. Verify Vercel Cron Secret (to prevent manual triggers)
  const authHeader = req.headers.authorization;
  const cronSecret = process.env.CRON_SECRET;
  
  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return res.status(401).json({ error: 'Unauthorized. Invalid CRON_SECRET.' });
  }

  try {
    // 2. Fire the POST request to Cloudflare Worker to wake it up
    // We do NOT await the response because we want Vercel to exit instantly
    // Cloudflare will catch it and run via ctx.waitUntil()
    const workerUrl = "https://soft-thunder-2965.zg0d-ff.workers.dev/"; 
    
    // Using fetch but only waiting for the network send, not the full execution.
    // Cloudflare will return a 200 OK instantly and process in the background.
    const triggerRes = await fetch(workerUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        action: "execute_midnight_protocol",
        cron_secret: cronSecret // Pass it along for secondary verification if needed
      })
    });

    if (triggerRes.ok) {
      return res.status(200).json({ success: true, message: 'Cloudflare Worker protocol triggered successfully in the background.' });
    } else {
      return res.status(500).json({ success: false, message: 'Failed to trigger worker.' });
    }
  } catch (error) {
    console.error("Vercel Cron Error:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
