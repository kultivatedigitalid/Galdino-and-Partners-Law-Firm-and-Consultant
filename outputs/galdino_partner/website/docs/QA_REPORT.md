# QA report

Verified 30 September 2026 on Windows, Node 24.11.1, Microsoft Edge 154 and the local production build at http://localhost:4327. These are measured local results, not a production-host guarantee.

## Functional and source validation

- npm ci completed; installed-dependency audit reported zero vulnerabilities at installation.
- npm run check: 123 files, zero errors, warnings or hints.
- npm test: 19 tests passed (15 contact validation/security/rate-limit cases and four search-relevance cases).
- npm run build: completed successfully using the standalone Node adapter.
- npm run validate: 177 pages; 38 service details, six categories, four environmental groups, six industries and 14 articles per language. Zero reported validation errors. Internal links, form action, reciprocal language pairs, metadata, structured data, image alternatives, RSS/sitemap and the indexing block were checked.
- npm run test:browser: all 32 tests passed, zero failures or flaky tests. The final run includes both image decoding before screenshot capture and the Home carousel follow-up.
- Responsive coverage: 18 representative routes at 320, 375, 430, 768, 900, 1024, 1280, 1440 and 1920 pixels (162 route/viewport checks), with no detected horizontal overflow or uncaught page errors.
- Axe: 13 representative pages passed the WCAG 2 A/AA and 2.1 A/AA rules tested. This is automated coverage, not a complete accessibility certification.
- Interaction checks: mobile menu/ESC; reciprocal translation; partial/intent/industry/KBLI-context search; ISO number discrimination; category navigation; case filters and reset; insight filters; consent persistence, withdrawal and keyboard dialog handling; proportional logo; gallery and Home carousel keyboard navigation; HTTP 404 and noindex.
- Contact checks: service prefill, native validation, successful local stream transport, focus containment and restoration, cooldown, failed-submission value preservation. The stream transport sends no real email.
- Analytics checks: a stub GTM script is loaded only after consent; query strings and form values are excluded from the captured event payloads.

Evidence: reports/validation.json, reports/browser-summary.json, reports/browser-final-checks.json and reports/screenshots/. Source QA commands are documented in README.md.

## Lighthouse — final mobile simulation

Lighthouse 13.5.0, default mobile simulation, consent banner present. Scores can vary with machine load. The table records the final run after the initial carousel layout reads were consolidated and the immediate pre-layout update removed.

| Page | Performance | Accessibility | Best practices | SEO | LCP | CLS | TBT |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| home | 95 | 100 | 100 | 69 | 2.34 s | 0 | 26 ms |
| services | 96 | 100 | 100 | 69 | 2.34 s | 0 | 15 ms |
| contact | 98 | 100 | 100 | 66 | 1.64 s | 0 | 0 ms |

Performance, accessibility and best-practice targets are met on these three measured pages. The SEO score is intentionally below the indexing target because robots.txt blocks crawling and robots metadata is noindex,nofollow. Indexing was not enabled to improve a score. Non-blocking Lighthouse diagnostics remain in reports/performance.json, including image delivery and dependency-chain opportunities.

## Visual review

Reviewed desktop and mobile screenshots of Services, Industries, Case Studies and Profile. Search follows the Services banner; category pages retain full service lists. Each industry has contextual imagery; case details use distinct supporting imagery and a pathway; Profile retains its approved hero and adds founder/story/work imagery. Logo sizing preserves its intrinsic ratio, including the formerly enlarged Home monogram. Screenshots wait for image decoding so asynchronous image paint is not mistaken for a missing asset. Generated imagery and provisional company claims are documented in VISUAL_REVISION.md and PROVISIONAL_DATA_REGISTER.md.

## External work not verified

Hostinger access and a GTM ID are unavailable, as confirmed by the user. Deployment on the actual host, real SMTP receipt, production analytics, DNS/HTTPS ownership and Search Console verification remain external launch gates. Provisional claims, prices, identities, case studies and generated photos require the owner’s release approval before indexing.

Additional file cleanup is pending explicit owner confirmation; see CLEANUP_REVIEW.md. No broad deletion of project archives was performed.
