# Galdino & Partner website

Bilingual Astro website for permitting and management-system advisory. The approved Home and About compositions are retained. Navigation now follows Home → Services → Industries → Case Studies → Insights → About Us → Contact.

- 38 service details, six category hubs and four environmental subcategory hubs per language.
- Six industry pages, six provisional case studies, four professional profiles and How We Work.
- 14 articles per language, direct service mega menu and category directory, searchable services and insights, privacy preferences and a Node SMTP contact endpoint.
- Current changes: [30 September revision](docs/REVISION_2026-09-30.md), including simplified environmental URLs and legacy 301 redirects.
- Staging remains `noindex,nofollow`; all provisional data require approval before public indexing.

## Development

Use Node 22.12+ (local verification environment: Node 24.11.1).

```sh
npm ci
npm run qa
npm run dev -- --background
```

Use `npm exec astro dev status`, `npm exec astro dev logs`, and `npm exec astro dev stop` to manage the background development server.

## Production

```sh
npm ci
npm run build
npm start
```

Configure server secrets in Hostinger, never in Git. Read [deployment](docs/DEPLOYMENT.md), [site map](docs/SITE_MAP.md), [launch checklist](docs/LAUNCH_CHECKLIST.md), [pricing research](docs/PRICING_RESEARCH.md), and [provisional register](docs/PROVISIONAL_DATA_REGISTER.md).

The user confirmed that Hostinger access and the GTM ID are not yet available. Live SMTP delivery, host compatibility, production analytics and Search Console verification therefore remain external launch steps. A successful local test does not verify those services.

## Browser QA

After npm run qa, run npm run test:browser. The Playwright configuration starts a loopback-only test server on port 4327 and uses installed Microsoft Edge. SMTP uses an in-memory stream sink; it sends no email. To measure performance separately, start node scripts/test-server.mjs, then run node scripts/lighthouse.mjs. Set CHROME_PATH if the browser executable differs. Do not run Lighthouse alongside other heavy tests.

Run npm run docs:inventory after changing central content. Measured results and external limitations are recorded in [QA report](docs/QA_REPORT.md).
