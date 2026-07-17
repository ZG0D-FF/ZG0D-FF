import crypto from 'crypto';

// Required: without this, Next.js/Vercel parses the body as JSON before we
// can verify the HMAC signature against the raw bytes.
export const config = {
  api: {
    bodyParser: false,
  },
};

async function getRawBody(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

function verifySignature(rawBody, signatureHeader, secret) {
  if (!signatureHeader) return false;

  const expected =
    'sha256=' +
    crypto.createHmac('sha256', secret).update(rawBody).digest('hex');

  const expectedBuf = Buffer.from(expected, 'utf8');
  const receivedBuf = Buffer.from(signatureHeader, 'utf8');

  if (expectedBuf.length !== receivedBuf.length) return false;
  return crypto.timingSafeEqual(expectedBuf, receivedBuf);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { Redis } = await import('@upstash/redis');
  const { getToken } = await import('@vercel/connect');

  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });

  try {
    const rawBody = await getRawBody(req);
    const signature = req.headers['x-hub-signature-256'];
    const event = req.headers['x-github-event'];
    const secret = process.env.GITHUB_WEBHOOK_SECRET_VERCEL;

    if (secret) {
      const valid = verifySignature(rawBody, signature, secret);
      if (!valid) {
        console.warn('Invalid webhook signature');
        return res.status(401).json({ error: 'Invalid signature' });
      }
    } else {
      console.warn('GITHUB_WEBHOOK_SECRET_VERCEL not set — skipping signature verification');
    }

    let payload;
    try {
      payload = JSON.parse(rawBody.toString('utf8'));
    } catch {
      return res.status(400).json({ error: 'Invalid JSON payload' });
    }

    if (event !== 'push') {
      return res.status(200).json({ message: 'Not a push event. Ignored.' });
    }

    const repoFullName = payload.repository?.full_name;
    if (!repoFullName) {
      return res.status(400).json({ error: 'Missing repository info' });
    }

    const commits = payload.commits || [];
    if (commits.length === 0) {
      return res.status(200).json({ message: 'No commits to process.' });
    }

    let githubToken = '';
    try {
      const connectToken = await getToken('github/alizarin-sail', { subject: { type: 'app' } });
      githubToken = connectToken?.token || '';
    } catch (e) {
      console.warn('Failed to fetch Vercel Connect token', e);
      return res.status(500).json({ error: 'OAuth Token fetch failed' });
    }

    for (const commit of commits) {
      // commit.url from the webhook payload is the GitHub *API* commit URL,
      // e.g. https://api.github.com/repos/owner/repo/commits/<sha>
      // Appending ".diff" only works on the HTML URL (github.com/.../commit/sha.diff),
      // NOT the API URL. To get a diff from the API URL, request it with the
      // diff media type via the Accept header instead.
      const diffUrl = commit.url;

      const headers = {
        'User-Agent': 'Vercel-JARVIS-Neural-Sync',
        Accept: 'application/vnd.github.v3.diff',
      };

      if (githubToken) {
        headers['Authorization'] = `Bearer ${githubToken}`;
      }

      let diffResponse;
      try {
        diffResponse = await fetch(diffUrl, { headers });
      } catch (fetchErr) {
        console.error(`Network error fetching diff for ${commit.id}:`, fetchErr);
        continue;
      }

      if (!diffResponse.ok) {
        const errText = await diffResponse.text();
        console.error(`Failed to fetch diff for ${commit.id}. Status: ${diffResponse.status}, Error: ${errText}`);
        continue;
      }

      const diffText = await diffResponse.text();

      const diffLines = diffText.split('\n');
      const chunkSize = 1000;
      const chunks = [];
      for (let i = 0; i < diffLines.length; i += chunkSize) {
        chunks.push(diffLines.slice(i, i + chunkSize).join('\n'));
      }

      const commitData = {
        hash: commit.id,
        author: commit.author?.name || 'unknown',
        message: commit.message || '',
        repo: repoFullName,
      };

      const pipeline = redis.pipeline();
      chunks.forEach((chunk, index) => {
        pipeline.lpush(
          'queue:github_chunks',
          JSON.stringify({
            ...commitData,
            chunkIndex: index,
            totalChunks: chunks.length,
            diffContent: chunk,
          })
        );
      });
      await pipeline.exec();
    }

    return res.status(200).json({ message: 'Diffs chunked and pushed to ephemeral queue successfully.' });
  } catch (error) {
    console.error('Webhook processing error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
