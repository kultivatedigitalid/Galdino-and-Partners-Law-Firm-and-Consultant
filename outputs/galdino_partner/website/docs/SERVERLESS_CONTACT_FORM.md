# Serverless Contact Form

## Flow

`ContactForm.astro` submits `FormData` to `POST /api/contact`. The Vercel function checks same-origin requests and content type, applies a rate limit, parses and normalises fields, silently accepts a filled honeypot, validates all required data, escapes email HTML, and calls the Resend REST API.

## Variables

- `RESEND_API_KEY`: server-only Resend key.
- `CONTACT_TO_EMAIL`: recipient mailbox.
- `CONTACT_FROM_EMAIL`: sender on a Resend-verified domain.
- `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`: recommended distributed rate limit.
- `CONTACT_FORM_DRY_RUN`: local testing only; must be false/absent in production.

The limit is five requests per IP per 15 minutes. Without Upstash, a warm-instance map provides best-effort protection but is not globally consistent. Add CAPTCHA only after measured abuse because it adds friction and third-party code.

## Security and privacy

No submission is stored by the site. Resend/email and Vercel logs remain external processors and must be reflected in the approved privacy notice. Never log form contents. Rotate exposed secrets. Do not accept file uploads. The UI warns users not to send sensitive documents.

## Testing

Set dry run to true locally. Test missing fields (422), wrong content type (415), cross-origin request (403), valid submission (200), honeypot (200 without delivery), and rate-limit behaviour (429). Verify fallback WhatsApp/email when delivery is unavailable.
