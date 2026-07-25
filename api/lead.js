const WINDOW_MS = 60_000;
const MAX_REQUESTS = 5;
const attempts = new Map();

const allowedOrigins = new Set([
  'https://azaccidenthelp.com',
  'https://www.azaccidenthelp.com',
]);

const clean = (value, max = 500) =>
  typeof value === 'string' ? value.trim().slice(0, max) : '';

function isAllowedOrigin(origin) {
  if (!origin) return true;
  if (allowedOrigins.has(origin)) return true;

  try {
    const { hostname, protocol } = new URL(origin);
    return protocol === 'https:' &&
      hostname.endsWith('.vercel.app') &&
      (hostname === 'a-zaccident-help.vercel.app' || hostname.startsWith('a-zaccident-help-'));
  } catch {
    return false;
  }
}

export default async function handler(request, response) {
  response.setHeader('Cache-Control', 'no-store');
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ error: 'Method not allowed' });
  }

  const origin = clean(request.headers.origin, 200);
  if (!isAllowedOrigin(origin)) {
    return response.status(403).json({ error: 'Invalid origin' });
  }

  const body = request.body && typeof request.body === 'object' && !Array.isArray(request.body)
    ? request.body
    : {};
  if (body.website) return response.status(200).json({ ok: true });

  const ip = clean(request.headers['x-forwarded-for']?.split(',')[0], 64) || 'unknown';
  const now = Date.now();
  const recent = (attempts.get(ip) || []).filter((time) => now - time < WINDOW_MS);
  if (recent.length >= MAX_REQUESTS) return response.status(429).json({ error: 'Please try again shortly' });
  recent.push(now);
  attempts.set(ip, recent);

  if (attempts.size > 5_000) {
    const cutoff = now - WINDOW_MS;
    for (const [key, timestamps] of attempts) {
      if (!timestamps.some((time) => time >= cutoff)) attempts.delete(key);
    }
  }

  const name = clean(body.name, 120).replace(/\s+/g, ' ');
  const phone = clean(body.phone, 30).replace(/[^0-9+(). -]/g, '');
  const email = clean(body.email, 160).toLowerCase();
  const accidentType = clean(body.accidentType, 80);
  const message = clean(body.message, 2_000);
  const source = clean(body.source, 500);
  const consent = body.consent === true;

  if (!name || !phone || !email || !accidentType || consent !== true) return response.status(400).json({ error: 'Missing required fields or consent' });
  if (!/^\S+@\S+\.\S+$/.test(email) || !/^\+?[\d\s().-]{10,}$/.test(phone)) {
    return response.status(400).json({ error: 'Invalid contact information' });
  }

  const webhookUrl = process.env.GHL_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error('Lead delivery is not configured: GHL_WEBHOOK_URL is missing');
    return response.status(503).json({ error: 'Lead delivery is not configured' });
  }

  const [firstName, ...lastNameParts] = name.split(' ');
  try {
    const sent = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(process.env.LEAD_WEBHOOK_SECRET ? { 'X-Webhook-Secret': process.env.LEAD_WEBHOOK_SECRET } : {}),
      },
      body: JSON.stringify({
        firstName,
        lastName: lastNameParts.join(' '),
        name,
        phone,
        email,
        accidentType,
        message,
        source: 'AZAccidentHelp.com',
        pageUrl: source || 'https://azaccidenthelp.com/',
        submittedAt: new Date().toISOString(),
        consent,
        consentTextVersion: '2026-07-25',
      }),
      signal: AbortSignal.timeout(8_000),
    });

    if (!sent.ok) {
      console.error('GoHighLevel lead delivery failed', sent.status);
      return response.status(502).json({ error: 'Unable to deliver lead' });
    }
  } catch {
    console.error('GoHighLevel lead delivery failed');
    return response.status(502).json({ error: 'Unable to deliver lead' });
  }

  return response.status(200).json({ ok: true });
}
