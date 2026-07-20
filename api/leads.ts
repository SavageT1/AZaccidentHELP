import { randomUUID } from 'node:crypto';

const allowedOrigins = new Set([
  'https://azaccidenthelp.com',
  'https://www.azaccidenthelp.com',
]);

const isAllowedOrigin = (origin: string) => {
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
};

const clean = (value: unknown, max = 500) =>
  typeof value === 'string' ? value.trim().slice(0, max) : '';

export default async function handler(req: any, res: any) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const origin = clean(req.headers.origin, 200);
  if (!isAllowedOrigin(origin)) {
    return res.status(403).json({ ok: false, error: 'Invalid origin' });
  }

  const body = req.body || {};
  if (body.website) return res.status(200).json({ ok: true }); // honeypot

  const fullName = clean(body.fullName, 120);
  const phone = clean(body.phone, 30).replace(/[^0-9+(). -]/g, '');
  const email = clean(body.email, 160);
  const consent = body.consent === true;

  if (fullName.length < 2 || phone.replace(/\D/g, '').length < 10 || !consent) {
    return res.status(400).json({ ok: false, error: 'Name, valid phone, and consent are required.' });
  }

  const lead = {
    submissionId: clean(body.submissionId, 80) || randomUUID(),
    submittedAt: new Date().toISOString(),
    fullName,
    phone,
    email,
    preferredLanguage: clean(body.preferredLanguage, 20) || 'English',
    accidentType: clean(body.accidentType, 80),
    city: clean(body.city, 100),
    caseDetails: clean(body.caseDetails, 2000),
    needAttorney: clean(body.needAttorney, 20),
    consent: true,
    consentTextVersion: '2026-07-11',
    consentedAt: new Date().toISOString(),
    pageUrl: clean(body.pageUrl, 500),
    referrer: clean(body.referrer, 500),
    utmSource: clean(body.utmSource, 150),
    utmMedium: clean(body.utmMedium, 150),
    utmCampaign: clean(body.utmCampaign, 150),
    gclid: clean(body.gclid, 250),
    fbclid: clean(body.fbclid, 250),
    leadSource: clean(body.leadSource, 50) || 'Website Form',
    status: 'New',
  };

  const deliveries: Record<string, boolean> = {};

  if (process.env.HUBSPOT_PRIVATE_APP_TOKEN) {
    const properties: Record<string, string> = {
      firstname: lead.fullName.split(/\s+/)[0],
      lastname: lead.fullName.split(/\s+/).slice(1).join(' '),
      phone: lead.phone,
      email: lead.email,
      hs_lead_status: 'NEW',
      lifecyclestage: 'lead',
    };
    if (!properties.email) delete properties.email;

    const searchProperty = lead.email ? 'email' : 'phone';
    const searchValue = lead.email || lead.phone;
    const search = await fetch('https://api.hubapi.com/crm/v3/objects/contacts/search', {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.HUBSPOT_PRIVATE_APP_TOKEN}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ filterGroups: [{ filters: [{ propertyName: searchProperty, operator: 'EQ', value: searchValue }] }], limit: 1 }),
    });
    const searchJson: any = search.ok ? await search.json() : { results: [] };
    const existingId = searchJson.results?.[0]?.id;
    const url = existingId
      ? `https://api.hubapi.com/crm/v3/objects/contacts/${existingId}`
      : 'https://api.hubapi.com/crm/v3/objects/contacts';
    const hubspot = await fetch(url, {
      method: existingId ? 'PATCH' : 'POST',
      headers: { Authorization: `Bearer ${process.env.HUBSPOT_PRIVATE_APP_TOKEN}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ properties }),
    });
    deliveries.hubspot = hubspot.ok;
  }

  if (process.env.GOOGLE_SHEETS_WEBHOOK_URL) {
    const sheets = await fetch(process.env.GOOGLE_SHEETS_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(process.env.LEAD_WEBHOOK_SECRET ? { 'X-Webhook-Secret': process.env.LEAD_WEBHOOK_SECRET } : {}),
      },
      body: JSON.stringify(lead),
    });
    deliveries.sheets = sheets.ok;
  }

  if (process.env.GHL_WEBHOOK_URL) {
    const ghl = await fetch(process.env.GHL_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(process.env.LEAD_WEBHOOK_SECRET ? { 'X-Webhook-Secret': process.env.LEAD_WEBHOOK_SECRET } : {}),
      },
      body: JSON.stringify(lead),
    });
    deliveries.ghl = ghl.ok;
  }

  if (!Object.keys(deliveries).length) {
    return res.status(503).json({ ok: false, error: 'Lead intake is not configured yet.' });
  }
  if (!Object.values(deliveries).some(Boolean)) {
    return res.status(502).json({ ok: false, error: 'We could not securely deliver your request. Please call us.' });
  }

  return res.status(200).json({ ok: true, submissionId: lead.submissionId, deliveries });
}
