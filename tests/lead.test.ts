import assert from 'node:assert/strict';
import test, { afterEach } from 'node:test';
import handler from '../api/lead.js';

type MockResponse = {
  statusCode: number;
  body: unknown;
  headers: Record<string, string>;
  setHeader(name: string, value: string): void;
  status(code: number): MockResponse;
  json(value: unknown): MockResponse;
};

const originalFetch = globalThis.fetch;
const originalEnv = {
  GHL_WEBHOOK_URL: process.env.GHL_WEBHOOK_URL,
  LEAD_WEBHOOK_SECRET: process.env.LEAD_WEBHOOK_SECRET,
  HUBSPOT_PRIVATE_APP_TOKEN: process.env.HUBSPOT_PRIVATE_APP_TOKEN,
  GOOGLE_SHEETS_WEBHOOK_URL: process.env.GOOGLE_SHEETS_WEBHOOK_URL,
};

function response(): MockResponse {
  return {
    statusCode: 200,
    body: undefined,
    headers: {},
    setHeader(name, value) {
      this.headers[name] = value;
    },
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(value) {
      this.body = value;
      return this;
    },
  };
}

function validRequest(origin = 'https://www.azaccidenthelp.com') {
  return {
    method: 'POST',
    headers: {
      origin,
      'x-forwarded-for': `192.0.2.${Math.floor(Math.random() * 200) + 1}`,
    },
    body: {
      name: 'Test Lead',
      phone: '602-555-0123',
      email: 'lead@example.com',
      accidentType: 'car',
      message: 'Test only',
      source: 'https://www.azaccidenthelp.com/',
      consent: true,
    },
  };
}

afterEach(() => {
  globalThis.fetch = originalFetch;
  for (const [key, value] of Object.entries(originalEnv)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
});

test('blocks a hostile origin before delivery', async () => {
  process.env.GHL_WEBHOOK_URL = 'https://services.leadconnectorhq.com/hooks/test';
  let called = false;
  globalThis.fetch = (async () => {
    called = true;
    return new Response(null, { status: 200 });
  }) as typeof fetch;

  const res = response();
  await handler(validRequest('https://evil-vercel.app.attacker.example'), res);

  assert.equal(res.statusCode, 403);
  assert.equal(called, false);
});

test('requires GHL even when legacy CRM variables exist', async () => {
  delete process.env.GHL_WEBHOOK_URL;
  process.env.HUBSPOT_PRIVATE_APP_TOKEN = 'legacy-token';
  process.env.GOOGLE_SHEETS_WEBHOOK_URL = 'https://example.com/legacy';
  let called = false;
  globalThis.fetch = (async () => {
    called = true;
    return new Response(null, { status: 200 });
  }) as typeof fetch;

  const res = response();
  await handler(validRequest(), res);

  assert.equal(res.statusCode, 503);
  assert.equal(called, false);
});

test('returns an error when GHL rejects the lead', async () => {
  process.env.GHL_WEBHOOK_URL = 'https://services.leadconnectorhq.com/hooks/test';
  globalThis.fetch = (async () => new Response(null, { status: 500 })) as typeof fetch;

  const res = response();
  await handler(validRequest(), res);

  assert.equal(res.statusCode, 502);
  assert.deepEqual(res.body, { error: 'Unable to deliver lead' });
});

test('delivers exactly once to GHL and then returns success', async () => {
  const ghlUrl = 'https://services.leadconnectorhq.com/hooks/test';
  process.env.GHL_WEBHOOK_URL = ghlUrl;
  process.env.LEAD_WEBHOOK_SECRET = 'test-secret';
  process.env.HUBSPOT_PRIVATE_APP_TOKEN = 'legacy-token';
  process.env.GOOGLE_SHEETS_WEBHOOK_URL = 'https://example.com/legacy';
  const calls: Array<{
    url: string;
    body: Record<string, unknown>;
    headers: HeadersInit | undefined;
  }> = [];
  globalThis.fetch = (async (input, init) => {
    calls.push({
      url: String(input),
      body: JSON.parse(String(init?.body)),
      headers: init?.headers,
    });
    return new Response(null, { status: 200 });
  }) as typeof fetch;

  const res = response();
  await handler(validRequest(), res);

  assert.equal(res.statusCode, 200);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, ghlUrl);
  assert.equal(calls[0].body.name, 'Test Lead');
  assert.equal(calls[0].body.consent, true);
  assert.equal((calls[0].headers as Record<string, string>)['X-Webhook-Secret'], 'test-secret');
  assert.deepEqual(res.body, { ok: true });
});
