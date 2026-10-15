# Environment

For Vercel, configure variables in the project environment settings; see [VERCEL.md](VERCEL.md). `HOST` and `PORT` are unnecessary there. Configure `CONTACT_ORIGIN` separately for each deployment origin and keep `CONTACT_TEST_MODE=false`.

Copy `.env.example` to a private `.env` only when needed. Every example value is intentionally empty. `npm ci`, `npm run qa`, and ordinary page development need no credentials. Shell/hosting environment values must be supplied separately for `npm start`; do not assume Node standalone automatically loads the development `.env`.

| Variable | Phase | Purpose and nonsecret configuration |
| --- | --- | --- |
| PUBLIC_SITE_URL | Build | Canonicals, sitemap and schema site origin. Existing fallback is `https://galdino.co.id`. Use a dedicated preview origin for staging; rebuild metadata after changing it. |
| PUBLIC_INDEXING_ENABLED | Build | Leave blank or `false` during review. Even `true` cannot index until `LAUNCH.dataVerified` and approved HTTPS domain checks also pass. |
| PUBLIC_GTM_ID | Build/browser | Approved GTM container ID, empty until provided. Analytics remains consent-gated. Rebuild after configuring. |
| HOST | Runtime | Bind address. Use `127.0.0.1` locally; `0.0.0.0` only as required by the host. |
| PORT | Runtime | Host-assigned port. Local Node preview/test sink uses `4327`; Astro dev defaults to `4321`. |
| SMTP_HOST | Server runtime | Mail server, pending actual account verification. Candidate Hostinger setting: `smtp.hostinger.com`. |
| SMTP_PORT | Server runtime | Only `465` (implicit TLS) or `587` (required STARTTLS) accepted. Verify actual account settings. |
| SMTP_USER | Server runtime, private | Authenticated mailbox login. |
| SMTP_PASSWORD | Server runtime, secret | Mailbox credential. Supply via protected host settings; never print it. |
| CONTACT_TO_EMAIL | Server runtime | Approved recipient mailbox. Previously planned `halo@kultivate.id`; ownership and routing still require approval. |
| CONTACT_FROM_EMAIL | Server runtime | Sender authorised by the SMTP account. |
| CONTACT_ORIGIN | Server runtime | Exact origin, no path/trailing slash. Production fallback is `https://galdino.co.id`; development falls back to the request origin. Always configure the actual deployed HTTPS origin. |
| TRUST_PROXY_IP_HEADER | Server runtime | Leave blank until trusted ingress demonstrably strips and replaces the header. Endpoint falls back to direct client address. |
| CONTACT_TEST_MODE | Server runtime | Blank/`false` for hosting. `true` selects an in-memory Nodemailer stream sink only with a loopback HTTP CONTACT_ORIGIN. It does not verify production SMTP. |

The contact endpoint reads server process environment first and Astro environment as fallback. Keep SMTP credentials server-only; do not use a `PUBLIC_` prefix. Rebuild if a value was provided during Astro's build. Missing production delivery configuration returns an honest 503.

## Safe local form tests

`npm test` injects a test delivery function. `npm run test:browser` starts `scripts/test-server.mjs`, which binds `127.0.0.1:4327`, sets `CONTACT_ORIGIN=http://localhost:4327` and enables the stream sink. These tests do not need SMTP credentials and send no real email. Stop an unrelated server on that port before testing; use `CI=1` to disallow reuse of a potentially different server.

For local development form testing, privately set `CONTACT_TEST_MODE=true` and `CONTACT_ORIGIN=http://localhost:4321` with the server bound to loopback. Set neither SMTP credentials nor real recipients. Never copy that test configuration into Hostinger.
