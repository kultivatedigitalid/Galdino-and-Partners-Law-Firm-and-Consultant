# Vercel deployment

The application supports Vercel through `@astrojs/vercel`. Pages and images are prerendered; `/api/contact/` and the localized 404/legacy-route handler run in a Node.js function. The separate `astro.vercel.config.mjs` reuses the existing Astro configuration. Ordinary `npm run build` and `npm start` still use Node standalone.

## Import from GitHub

1. Push the prepared changes to the private [repository](https://github.com/afinitasid/Galdino-Partner-Website), then import it into Vercel using an account with repository access.
2. Set **Root Directory** to `outputs/galdino_partner/website`.
3. Select **Astro** and **Node.js 24.x**. The app's `vercel.json` sets Install Command to `npm ci` and Build Command to `npm run build:vercel`. Leave Output Directory at the framework default; the adapter generates `.vercel/output`. No start command is needed.
4. Add the environment settings below to the appropriate Preview and Production scopes, then deploy.
5. Check `/` redirects to `/id/`, both language homepages and their images load, legacy links redirect, and an unknown `/en/` URL returns an English 404 with HTTP status 404.
6. Check `GET /api/contact/` returns 405 and foreign-origin POSTs return 403. After SMTP is configured, submit one consented test from the actual deployed origin and confirm receipt and Reply-To.

The committed `trailingSlash` setting matches Astro's slash-terminated routes. Do not add a catch-all rewrite to `index.html`: it would break the API and 404 handling.

## Environment settings

| Variable | Vercel value |
| --- | --- |
| `PUBLIC_SITE_URL` | Intended canonical HTTPS URL, such as `https://galdino.co.id`. For a dedicated staging domain, use that domain and rebuild. |
| `PUBLIC_INDEXING_ENABLED` | `false`; content approval is still pending. |
| `PUBLIC_GTM_ID` | Leave empty until the approved container is available. |
| `CONTACT_ORIGIN` | Exact HTTPS origin used by visitors, without path or trailing slash. For the initial deployment, set this to its assigned Vercel URL once known, then redeploy. Update it when attaching a custom domain. |
| `SMTP_HOST`, `SMTP_PORT` | Verified mail server and port `465` or `587`. |
| `SMTP_USER`, `SMTP_PASSWORD` | Private mailbox credentials. Configure these in Vercel, never in Git or browser variables. |
| `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL` | Authorized sender and approved recipient. |
| `CONTACT_TEST_MODE` | `false`. |
| `TRUST_PROXY_IP_HEADER` | Leave empty for direct Vercel hosting; the adapter supplies `clientAddress`. Verify separately if adding another proxy. |

`HOST` and `PORT` are only for Node standalone and are unnecessary on Vercel. Changing build variables requires a redeploy. Each preview origin needs its own `CONTACT_ORIGIN`; the endpoint deliberately rejects other origins. Pages deploy without SMTP credentials, but sending the form returns 503 until delivery is configured. See [ENVIRONMENT.md](ENVIRONMENT.md) for all variables.

The current rate limiter is in memory per function instance. Counters reset with cold starts and are not shared across instances. For a public contact form, configure Vercel Firewall rate limiting for `/api/contact/` (or a shared external limiter) if a deployment-wide limit is required. Verify actual SMTP connectivity and delivery on the hosted function.

## Local verification

From the application root:

```sh
npm ci
npm run qa
npm run build:vercel
npm run validate:vercel
```

The Vercel build produces `.vercel/output/config.json`, static pages/assets under `.vercel/output/static`, and a server function under `.vercel/output/functions`. `validate:vercel` checks that build directly. It does not verify a live Vercel account, DNS, or SMTP delivery. For local browser QA, run the ordinary Node build and `npm run test:browser`.

Use Vercel's deployment history to roll back to a previously verified deployment. Keep indexing disabled until the existing launch approvals are complete.

## Verification on 15 October 2026

- Node 24.11.1: Astro check passed for 179 files with no errors, warnings or hints; all 20 contact/search tests passed.
- `npm run build:vercel` and `npm run validate:vercel` passed for 167 pages, including assets, bilingual links, metadata and noindex checks.
- The generated Node 24 function was imported locally and exercised: API 405/403/503 responses, both localized 404 responses and a legacy 301 redirect passed. SMTP was disabled and no email was sent.
- The original Node standalone build and its 167-page validation also passed.

These results verify local deployment artifacts. Hosted SMTP, domain and Vercel account checks remain to be performed during deployment.

References: [Astro on Vercel](https://docs.astro.build/en/guides/deploy/vercel/), [Astro Vercel adapter](https://docs.astro.build/en/guides/integrations-guide/vercel/), [Vercel root directories](https://vercel.com/docs/monorepos), [Node.js versions](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions).
