# Architecture

Astro 7 with TypeScript, Tailwind 4, Markdown content collections and `@astrojs/node` standalone output. Pages are prerendered; `/api/contact/` and the language-aware 404 run on Node. The Node server serves the built client and server output.

## Content boundaries

- `src/data/service-catalog.ts`: six categories and four environmental groups.
- `src/data/service-records-*.ts`: 38 bilingual service-specific records.
- `src/data/services.ts`: shared typed service model, relationships and URL helpers.
- `src/data/service-prices.ts`: provisional professional-fee estimates.
- `src/data/industries.ts`, `experiences.ts`, `people.ts`, `contact.ts`, `stats.ts`: central content.
- `src/content/blog/{id,en}`: paired Markdown articles with sources and service identifiers.
- `src/data/launch.ts`: explicit indexing gate.

The existing hub URL names (`services`, `projects`, `blog`, `profile`, `contact`) are retained to preserve existing links. Public navigation uses the requested Indonesian names and equivalent English labels. Service URL paths follow category → optional environmental group → service. Each route has a reciprocal language equivalent.

## Interface

Home and About retain their approved composition; Home's service rail now has six categories. New editorial pages use isolated `editorial.css`. Static content remains available without hydration. Client scripts implement search, the mobile menu, consent, sharing, carousels and the contact form.

## Runtime

POST /api/contact/ validates and normalises the request, limits body size, applies bounded in-memory abuse protection and sends authenticated SMTP mail through Nodemailer. There is no submission database. Rate limits are per Node process; see CONTACT_FORM.md before scaling horizontally.

Astro origin checking remains enabled. No SMTP credential or contact content is placed in client JavaScript. Analytics loads only after explicit consent and a valid configured GTM ID.

## Verification

`npm run qa` runs Astro diagnostics, API unit tests, a production build, and HTML validation. The validator checks every built page, internal links and anchors, reciprocal hreflang, route counts, source metadata, schemas and disabled indexing. Browser and external-host checks are recorded separately.
