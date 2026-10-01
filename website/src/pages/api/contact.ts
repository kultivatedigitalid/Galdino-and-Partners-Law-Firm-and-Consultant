import type { APIRoute } from 'astro';
import { escapeHtml, parseContactPayload, validateContact } from '../../utils/contact';

export const prerender = false;

const memory = new Map<string, { count: number; resetAt: number }>();
const WINDOW_SECONDS = 15 * 60;
const MAX_REQUESTS = 5;

function json(body: object, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}

async function isRateLimited(key: string) {
  const url = import.meta.env.UPSTASH_REDIS_REST_URL;
  const token = import.meta.env.UPSTASH_REDIS_REST_TOKEN;
  if (url && token && !url.includes('replace-me')) {
    try {
      const response = await fetch(`${url.replace(/\/$/, '')}/multi-exec`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify([['INCR', key], ['EXPIRE', key, WINDOW_SECONDS]]),
      });
      if (response.ok) {
        const result = await response.json() as Array<{ result: number }>;
        return Number(result[0]?.result ?? 0) > MAX_REQUESTS;
      }
    } catch {
      // Fall through to warm-instance protection if the optional store is unavailable.
    }
  }
  const now = Date.now();
  const current = memory.get(key);
  if (!current || current.resetAt <= now) {
    memory.set(key, { count: 1, resetAt: now + WINDOW_SECONDS * 1000 });
    return false;
  }
  current.count += 1;
  return current.count > MAX_REQUESTS;
}

export const POST: APIRoute = async ({ request, clientAddress, url }) => {
  const origin = request.headers.get('origin');
  if (origin && new URL(origin).host !== url.host) {
    return json({ message: 'Invalid request origin.' }, 403);
  }
  const contentType = request.headers.get('content-type') || '';
  if (!contentType.includes('multipart/form-data') && !contentType.includes('application/x-www-form-urlencoded')) {
    return json({ message: 'Unsupported content type.' }, 415);
  }
  const forwarded = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  const ip = forwarded || clientAddress || 'unknown';
  if (await isRateLimited(`contact:${ip}`)) {
    return json({ message: 'Terlalu banyak permintaan. Silakan tunggu beberapa menit / Too many requests. Please wait a few minutes.' }, 429);
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return json({ message: 'Form data could not be read.' }, 400);
  }
  const payload = parseContactPayload(form);
  if (payload.website) return json({ message: 'Thank you.' });
  const errors = validateContact(payload);
  if (errors.length) {
    return json({ message: payload.locale === 'id' ? 'Periksa kembali field yang wajib diisi.' : 'Please review the required fields.', fields: errors }, 422);
  }

  if (import.meta.env.CONTACT_FORM_DRY_RUN === 'true') {
    return json({ message: payload.locale === 'id' ? 'Permintaan diterima dalam mode uji.' : 'Enquiry received in test mode.' });
  }

  const apiKey = import.meta.env.RESEND_API_KEY;
  const to = import.meta.env.CONTACT_TO_EMAIL;
  const from = import.meta.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from || apiKey.includes('replace_with')) {
    console.error('Contact delivery environment variables are not configured.');
    return json({ message: payload.locale === 'id' ? 'Formulir belum dapat mengirim. Silakan gunakan WhatsApp atau email.' : 'The form cannot deliver yet. Please use WhatsApp or email.' }, 503);
  }

  const safe = Object.fromEntries(Object.entries(payload).map(([key, value]) => [key, typeof value === 'string' ? escapeHtml(value) : value]));
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: payload.email,
      subject: `Website enquiry — ${payload.service} — ${payload.company}`,
      html: `<h1>New website enquiry</h1><p><strong>Name:</strong> ${safe.name}</p><p><strong>Email:</strong> ${safe.email}</p><p><strong>WhatsApp:</strong> ${safe.whatsapp}</p><p><strong>Company:</strong> ${safe.company}</p><p><strong>Service:</strong> ${safe.service}</p><p><strong>Message:</strong></p><p>${String(safe.message).replace(/\n/g, '<br>')}</p><hr><p>Consent recorded: yes · Locale: ${safe.locale}</p>`,
    }),
  });
  if (!response.ok) {
    console.error('Contact email delivery failed:', response.status, await response.text());
    return json({ message: payload.locale === 'id' ? 'Pesan belum terkirim. Silakan gunakan WhatsApp atau email.' : 'The message was not delivered. Please use WhatsApp or email.' }, 502);
  }
  return json({ message: payload.locale === 'id' ? 'Terima kasih. Permintaan Anda telah terkirim.' : 'Thank you. Your enquiry has been sent.' });
};

export const ALL: APIRoute = () => json({ message: 'Method not allowed.' }, 405);
