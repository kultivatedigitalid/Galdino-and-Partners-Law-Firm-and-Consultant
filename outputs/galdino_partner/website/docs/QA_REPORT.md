# QA report

Verified 30 September 2026 on Windows, Node 24.11.1, Microsoft Edge and the local production build at http://localhost:4327. Results describe this local environment and do not guarantee production hosting.

## Validation

- npm run check: 125 files, 0 errors, 0 warnings, 0 hints.
- npm test: 20 tests passed (15 contact/API tests and 5 search ranking tests).
- npm run build: production build completed.
- npm run validate: 167 pages, 38 services, 6 categories, 4 environmental groups, 6 industries, 14 articles per language; 0 validation errors. Checks include internal links, locale alternates, metadata, schemas, forms, images, sitemap/RSS and the noindex gate.
- Production preview smoke test: Indonesian and English Services, Industries, Contact and Insight index routes all returned HTTP 200; URLs without the trailing slash redirected to the canonical slash URL.
- npm run test:browser: 37 passed, 0 failed, 0 flaky. Responsive checks covered 17 representative routes at widths 320, 375, 430, 768, 900, 1024, 1280, 1440 and 1920 pixels (153 route/viewport checks), without horizontal overflow or uncaught page errors.
- Axe scanned 13 representative pages and reported no WCAG 2 A/AA or 2.1 A/AA violations.
- Browser checks cover mobile navigation and mega menu, bilingual navigation, the hidden Services search, service links and images, experience filters, contact form states, consent, analytics gating, noindex, redirects, and selected desktop/mobile hero assets.
- Contact form tests use a local in-memory SMTP sink and do not send real email.

Latest browser details are in reports/browser-summary.json; validated route totals are in reports/validation.json. Current 375px/1440px screenshots are in reports/screenshots/.

## Lighthouse

Lighthouse 13.5.0, default mobile simulation, consent banner present. These scores are a single local run and can vary with system load.

| Page | Performance | Accessibility | Best practices | SEO | LCP | CLS | TBT |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Home | 87 | 100 | 100 | 69 | 3.18 s | 0 | 56.5 ms |
| Services | 80 | 100 | 100 | 69 | 2.64 s | 0 | 623 ms |
| Contact | 69 | 100 | 100 | 69 | 2.15 s | 0 | 3,283 ms |

Home, Services and Contact measured below the project's 90-point performance target in this run. Performance varies with local machine load; inspect the full diagnostics in reports/performance.json before comparing runs. SEO is 69 by design because crawling remains blocked and pages use noindex,nofollow. Do not enable indexing to change that score.

## Visual review and launch

Home and About Us use their original hero layouts. Services, Industries, Our Experiences, Insight and Contact have separate new wide hero photographs. Contact and Our Experiences switch to purpose-composed portrait images on narrow screens. All images are centered; service, industry and case cards preserve full images with object-fit: contain. Navigation contains no Contact or How We Work item; Contact remains available from Consultation and has no navbar. The old How We Work URLs redirect to Home's process section.

Hostinger access and a GTM ID are not yet available, as confirmed by the user. Production hosting, real SMTP receipt, live analytics and Search Console checks remain unverified. Prices and content remain provisional; indexing stays disabled. Broader unused-file cleanup is listed in docs/CLEANUP_REVIEW.md and was not included in deleting the specifically requested How We Work page.
