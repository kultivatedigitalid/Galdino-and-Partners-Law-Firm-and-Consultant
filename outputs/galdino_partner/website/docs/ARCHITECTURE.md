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

The existing hub URL names (`services`, `projects`, `blog`, `profile`, `contact`) are retained to preserve existing links. Navigation uses Our Experiences and About Us in both languages. Contact is reached through the Consultation CTA and has no navbar; How We Work is now a section on Home. Service URL paths follow category → service. The four environmental groups are anchored sections, not separate pages. src/middleware.ts redirects all 26 former environmental URLs plus two removed How We Work pages to their category anchors or shortened service paths using HTTP 301. Each route has a reciprocal language equivalent.

## Interface

Home and About restore their original banner composition; Home's service rail now has six categories. Editorial pages share ImageHero.astro, shared brand typography, centered full-bleed image banners, an immersive navbar (except Contact) and editorial.css. ServiceMegaMenu.astro exposes six category hubs and 38 direct service links. Service activity imagery is mapped in service-images.ts. Static content remains available without hydration. Service search is temporarily unmounted. Client scripts implement Insight search, the mobile menu, consent, sharing, carousels and the contact form.

## Runtime

POST /api/contact/ validates and normalises the request, limits body size, applies bounded in-memory abuse protection and sends authenticated SMTP mail through Nodemailer. There is no submission database. Rate limits are per Node process; see CONTACT_FORM.md before scaling horizontally.

Astro origin checking remains enabled. No SMTP credential or contact content is placed in client JavaScript. Analytics loads only after explicit consent and a valid configured GTM ID.

## Verification

`npm run qa` runs Astro diagnostics, API unit tests, a production build, and HTML validation. The validator checks every built page, internal links and anchors, reciprocal hreflang, route counts, source metadata, schemas and disabled indexing. Browser and external-host checks are recorded separately.
