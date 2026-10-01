# QA report

Home hero revision verified 2 October 2026; complete browser baseline verified 1 October 2026 on Windows, Node 24.11.1, Microsoft Edge and the local production build at http://localhost:4327. Results describe this local environment and do not guarantee production hosting.

## Validation

- npm run check: 129 files, 0 errors, 0 warnings, 0 hints.
- npm test: 20 tests passed (15 contact/API tests and 5 search ranking tests).
- npm run build: production build completed.
- npm run validate: 167 pages, 38 services, 6 categories, 4 environmental groups, 6 industries, 14 articles per language; 0 validation errors. Checks include internal links, locale alternates, metadata, schemas, forms, images, sitemap/RSS and the noindex gate.
- Production preview smoke test: Indonesian and English Services, Industries, Contact and Insight index routes all returned HTTP 200; URLs without the trailing slash redirected to the canonical slash URL.
- Complete browser baseline (1 October): 40 passed, 0 failed, 0 flaky. Responsive checks covered 17 representative routes at widths 320, 375, 430, 768, 900, 1024, 1280, 1440 and 1920 pixels (153 route/viewport checks), without horizontal overflow or uncaught page errors.
- Axe scanned 13 representative pages and reported no WCAG 2 A/AA or 2.1 A/AA violations.
- Browser checks cover mobile navigation and mega menu, bilingual navigation, the hidden Services search, service links and images, experience filters, contact form states, consent, analytics gating, noindex, redirects, and selected desktop/mobile hero assets.
- Current Home regression review (2 October): 10 passed, 0 failed. It covers 17 representative routes at 320/375/430/768/1024/1440px, Home accessibility, mobile/language navigation, mega-menu keyboard/outside-click behavior and shared brand typography. Hero screenshots cover both languages at 1440px and 375px. Astro check, 20 unit tests, production build and validation passed again. The final shared-brand test also covers transparent/white header states across both languages, including Contact. Final-build screenshots cover the Home composition and scrolled navbars.
- Contact form tests use a local in-memory SMTP sink and do not send real email.

The complete browser baseline is in reports/browser-summary.json; the current focused Home review is in reports/home-architecture-review.json. Validated route totals are in reports/validation.json. Current 375px/1440px screenshots are in reports/screenshots/.

## Lighthouse

Current run on 2 October 2026: Lighthouse 13.5.0, default mobile simulation, consent banner present. Home was audited again after setting high fetch priority on the supplied architectural backdrop, which the initial audit identified as the LCP image. Services and Contact use the same-session shared-navbar audit. Scores can vary with system load.

| Page | Performance | Accessibility | Best practices | SEO | LCP | CLS | TBT |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Home | 93 | 100 | 100 | 69 | 2.65 s | 0 | 17.0 ms |
| Services | 95 | 100 | 100 | 69 | 2.33 s | 0 | 0.0 ms |
| Contact | 99 | 100 | 100 | 66 | 1.70 s | 0 | 10.0 ms |

Home reaches the project's 90-point performance target in the final local run. The initial architecture run scored 77; the final run scored 93, with 2.65s LCP, CLS 0 and 17ms TBT. Both hero images are eager, high priority and discoverable in the initial document. The final audit passes LCP discovery. The entire score difference cannot be attributed solely to the priority hint because local audit timings vary. See reports/performance.json for diagnostics. Crawling remains blocked and pages use noindex,nofollow, which reduces SEO scores. Do not enable indexing to change those scores.

## Visual review and launch

Home layers the supplied architectural backdrop with a separate monochrome transparent three-person consultation photograph. Existing centered copy uses two headline lines, a red title box with white text, one consultation CTA and the architectural red accent. Thin vertical guides and side notes appear on larger screens; mobile simplifies the decoration and keeps the background artwork below the CTA. Desktop framing fits one viewport. Other sections and About Us keep their existing layouts. Desktop navbars balance logo left, links centered and language/consultation actions right; mobile menu behavior is retained. All website headers start transparent and turn solid white after scrolling. Image-led headers change from light to dark text; Home starts with dark text. All button CTAs share a 4px corner radius. Services, Industries, Our Experiences and Insight retain distinct wide hero photographs. The five supplied mockup photographs are cleaned of embedded UI and used on their matching main pages, including Our Experiences on mobile. Contact has no banner and uses context left, form right. All photographs are centered and fill their fixed frames; logos retain their intrinsic proportions. Services restore smaller centered cover photos with red left/bottom accents, without numbers or captions; Home case photography restores cover framing. Industry cards use centered cover framing and red accents. Other main index heroes keep their dash/tag, benefit headline, lead and consultation button; breadcrumb strips are removed. Category hubs use two complete cards per row with a short description and provisional price and specific dark process maps with initial-record guidance. FAQ disclosure and interactive links have minimal motion with reduced-motion support. Contact restores six next-step explanations in the left column and keeps the main navbar above the inquiry section; the navbar has no separate Contact item. Home's dark section presents “Why Galdino & Partner,” and Industries uses the same dark background for its regulatory map. The old How We Work URLs redirect to the updated Home section. Category, service and industry detail heroes have white backgrounds, dark copy left, bordered photography right and a section CTA. Sector detail pages remove cases, insights and the duplicate sequence section. About Us retains its restored story and related cases, removes the company identity register, and uses a smaller founder note, four working principles and eight monochrome photographs in an overlapping CSS collage with black negative space and translucent red accents; mobile uses its own taller composition. Individual professional profiles have no banner, start closer to the navbar, and omit related services/insights. Specific services show dashed timing/fee labels immediately after the context explanation, with the fee-exclusions note inside the same section. Content lists show dot bullets. Articles follow the Kultivate editorial structure without reading durations.

Hostinger access and a GTM ID are not yet available, as confirmed by the user. Production hosting, real SMTP receipt, live analytics and Search Console checks remain unverified. Prices and content remain provisional; indexing stays disabled. Broader unused-file cleanup is listed in docs/CLEANUP_REVIEW.md and was not included in deleting the specifically requested How We Work page.
