# Hostinger deployment

## Confirmed constraints

Preferred target: Hostinger Managed Node.js, Node 22.12 or later. The user has not yet provided Hostinger access; the actual plan and account capability are unverified. GTM is also unavailable. Do not mark production delivery complete from a local build.

Official references:
- [Hostinger Node.js options](https://www.hostinger.com/support/node-js-hosting-options-at-hostinger/)
- [Hostinger Email settings](https://support.hostinger.com/en/articles/1575756-how-to-get-email-account-configuration-details-for-hostinger-email)
- [Astro Node standalone adapter](https://docs.astro.build/en/guides/integrations-guide/node/)
- [Nodemailer SMTP](https://nodemailer.com/smtp)

## Application settings

Repository: kultivatedigitalid/Galdino-and-Partners-Law-Firm-and-Consultant.
Application root: `outputs/galdino_partner/website`.
Install: `npm ci`.
Build: `npm run build`.
Start: `npm start` (`node dist/server/entry.mjs`).
Host: `0.0.0.0`; PORT: host-assigned environment value.
Deploy the full application build including `dist/client` and `dist/server`, with runtime dependencies.

Set `PUBLIC_SITE_URL=https://galdino.co.id` at build time for final canonicals. For a dedicated preview domain, set its own URL and CONTACT_ORIGIN while keeping indexing off. Static metadata changes require a rebuild.

## Environment

Copy keys from .env.example into the host's environment settings. Do not commit a populated .env or print SMTP_PASSWORD in logs.

- PUBLIC_INDEXING_ENABLED=false throughout provisional review.
- PUBLIC_GTM_ID: empty until the approved container is available.
- CONTACT_ORIGIN: exact HTTPS origin, with no path or trailing slash.
- SMTP_HOST=smtp.hostinger.com and SMTP_PORT=465; verify account settings.
- SMTP_USER / SMTP_PASSWORD: authenticated mailbox credentials.
- CONTACT_FROM_EMAIL: authorised authenticated sender; CONTACT_TO_EMAIL=halo@kultivate.id.
- CONTACT_TEST_MODE=false in every hosted environment.
- TRUST_PROXY_IP_HEADER: leave blank until the host's proxy behaviour is verified. Use only a header stripped and overwritten by the trusted ingress.

SMTP uses TLS on 465 or requires TLS on 587. Verify sender authorisation, SPF/DKIM/DMARC and recipient delivery from the actual host. The contact API returns an honest 503 if delivery is unavailable.

## Go-live verification

1. Confirm Node plan, application root, build/start commands, host and port.
2. Set build-time and server-only variables; deploy a non-indexed preview.
3. Verify static assets, status 404, API rejection cases and form accessibility.
4. Send a consented test request from the deployed origin; verify arrival and Reply-To without retaining test data unnecessarily.
5. Verify direct and proxy client-IP behaviour, rate limits and hosting logs.
6. Configure consent-gated GTM/GA as documented in ANALYTICS.md.
7. Complete every P0 provisional-data approval, then update launch.ts and enable indexing in a separate reviewed release.
8. Verify sitemap, canonical domain, robots, Search Console ownership and production smoke checks.

## Fallback and rollback

If the actual plan cannot run Node, first assess an appropriate Node plan. A static + PHP SMTP alternative requires a separately implemented and tested endpoint; this repository does not claim PHP compatibility.

Retain the previous healthy build and its environment settings. Roll back to that release if API or asset checks fail. Keep indexing disabled during unresolved incidents. Rotate credentials if exposed; avoid logging request bodies or delivery credentials.
