export default {
    async fetch(request, env) {
        // Only accept POST requests from our internal Service Binding
        if (request.method !== "POST") {
            return new Response("Method not allowed", { status: 405 });
        }

        try {
            const payload = await request.json();
            
            // Ensure we have the required keys
            if (!env.SUPABASE_URL || !env.SUPABASE_KEY) {
                return new Response("Missing Supabase Variables", { status: 500 });
            }

            const table = payload.table;
            if (!table || !payload.data) {
                return new Response("Invalid payload", { status: 400 });
            }

            // Construct Supabase REST URL
            const url = `${env.SUPABASE_URL}/rest/v1/${table}`;
            
            const headers = {
                "apikey": env.SUPABASE_KEY,
                "Authorization": `Bearer ${env.SUPABASE_KEY}`,
                "Content-Type": "application/json"
            };

            // If we are updating model usage, we need to allow upserts (merge-duplicates)
            if (table === "jarvis_model_usage" || table === "jarvis_user_token_usage") {
                headers["Prefer"] = "resolution=merge-duplicates";
            }

            // Fire the request to Supabase
            const response = await fetch(url, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(payload.data)
            });

            if (!response.ok) {
                const err = await response.text();
                console.error("Supabase Error:", err);
                return new Response("DB Error: " + err, { status: 500 });
            }

            return new Response("Logged successfully", { status: 200 });

        } catch (err) {
            console.error("Telemetry Worker Error:", err);
            return new Response(err.message, { status: 500 });
        }
    }
};
