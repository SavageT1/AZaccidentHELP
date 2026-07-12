const WINDOW_MS = 60_000;
const MAX_REQUESTS = 5;
const attempts = new Map();

export default async function handler(request, response) {
  if (request.method !== 'POST') return response.status(405).json({ error: 'Method not allowed' });

  const ip = request.headers['x-forwarded-for']?.split(',')[0] || 'unknown';
  const now = Date.now();
  const recent = (attempts.get(ip) || []).filter((time) => now - time < WINDOW_MS);
  if (recent.length >= MAX_REQUESTS) return response.status(429).json({ error: 'Please try again shortly' });
  recent.push(now);
  attempts.set(ip, recent);

  const { name, phone, email, accidentType, message = '', source = '', website = '' } = request.body || {};
  if (website) return response.status(200).json({ ok: true });
  if (!name || !phone || !email || !accidentType) return response.status(400).json({ error: 'Missing required fields' });
  if (!/^\S+@\S+\.\S+$/.test(email) || !/^\+?[\d\s().-]{10,}$/.test(phone)) {
    return response.status(400).json({ error: 'Invalid contact information' });
  }

  const webhookUrl = process.env.GHL_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error('Lead delivery is not configured: GHL_WEBHOOK_URL is missing');
    return response.status(503).json({ error: 'Lead delivery is not configured' });
  }

  const normalizedName = String(name).trim().replace(/\s+/g, ' ');
  const [firstName, ...lastNameParts] = normalizedName.split(' ');
  const sent = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      firstName,
      lastName: lastNameParts.join(' '),
      name: normalizedName,
      phone: String(phone).trim(),
      email: String(email).trim().toLowerCase(),
      accidentType,
      message,
      source: 'AZAccidentHelp.com',
      pageUrl: source || 'https://azaccidenthelp.com/',
      submittedAt: new Date().toISOString(),
      consent: true,
    }),
  });

  if (!sent.ok) {
    console.error('GoHighLevel lead delivery failed', sent.status);
    return response.status(502).json({ error: 'Unable to deliver lead' });
  }
  return response.status(200).json({ ok: true });
}
