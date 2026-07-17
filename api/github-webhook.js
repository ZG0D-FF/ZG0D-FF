import crypto from 'crypto';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Dynamically import ESM modules to bypass Vercel CommonJS restrictions
  const { getToken } = await import('@vercel/connect');
  const { Redis } = await import('@upstash/redis');

  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });

  try {
    // 1. (Optional) Verify Webhook Signature here if you added GITHUB_WEBHOOK_SECRET_VERCEL
    const signature = req.headers['x-hub-signature-256'];
    const event = req.headers['x-github-event'];
    
    // We only care about push events
    if (event !== 'push') {
      return res.status(200).json({ message: 'Not a push event. Ignored.' });
    }

    const payload = req.body;
    const repoFullName = payload.repository.full_name; // e.g. ZG0D-FF/project
    const commits = payload.commits || [];

    if (commits.length === 0) {
      return res.status(200).json({ message: 'No commits to process.' });
    }

    // 2. Fetch the dynamically managed OAuth token from Vercel Connect
    // 'github/alizarin-sail' is the UID of the connect integration you set up!
    let githubToken = '';
    try {
      const connectToken = await getToken('github/alizarin-sail', { subject: { type: 'app' } });
      githubToken = connectToken.token;
    } catch (e) {
      console.warn("Failed to fetch Vercel Connect token, falling back to manual or skipping", e);
      return res.status(500).json({ error: 'OAuth Token fetch failed' });
    }

    // 3. For each commit, fetch the diff
    for (const commit of commits) {
      const commitUrl = commit.url; // e.g. https://api.github.com/repos/.../commits/hash
      
      const diffResponse = await fetch(commitUrl, {
        headers: {
          'Authorization': `Bearer ${githubToken}`,
          'Accept': 'application/vnd.github.v3.diff',
          'User-Agent': 'Vercel-JARVIS-Neural-Sync'
        }
      });

      if (!diffResponse.ok) {
        console.error(`Failed to fetch diff for ${commit.id}`);
        continue;
      }

      const diffText = await diffResponse.text();

      // 4. Chunking (Map-Reduce Splitter)
      // We will split the diff by file or by lines. A safe approach is splitting by max 1000 lines.
      const diffLines = diffText.split('\n');
      const chunkSize = 1000;
      let chunks = [];

      for (let i = 0; i < diffLines.length; i += chunkSize) {
        chunks.push(diffLines.slice(i, i + chunkSize).join('\n'));
      }

      const commitData = {
        hash: commit.id,
        author: commit.author.name,
        message: commit.message,
        repo: repoFullName
      };

      // 5. LPUSH to Ephemeral Queue (Upstash Redis)
      for (let index = 0; index < chunks.length; index++) {
        const payloadToQueue = {
          ...commitData,
          chunkIndex: index,
          totalChunks: chunks.length,
          diffContent: chunks[index]
        };
        
        await redis.lpush('queue:github_chunks', JSON.stringify(payloadToQueue));
      }
    }

    return res.status(200).json({ message: 'Diffs chunked and pushed to ephemeral queue successfully.' });

  } catch (error) {
    console.error('Webhook processing error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
