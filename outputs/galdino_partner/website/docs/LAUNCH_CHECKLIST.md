# Launch checklist

Code completion and production launch are separate checks. The current branch is a non-indexed prototype with explicitly authorised provisional data.

## Local release

- [x] npm ci completes.
- [x] npm run check: zero errors.
- [x] npm test: contact validation, injection, failure and rate-limit tests pass.
- [x] npm run build and npm run validate pass.
- [x] Browser checks: mobile menu, service search, insight filters, translations, cookie controls and form success/error.
- [x] Responsive checks at 320, 375, 430, 768, 900, 1024, 1280, 1440 and 1920.
- [x] Record measured Lighthouse results; do not claim an unmeasured score.
- [x] Prepared validated changes for a normal fast-forward publication; verify the resulting remote commit in Git after push.

## External launch gates

- [ ] Business owner approves all P0 fields in PROVISIONAL_DATA_REGISTER.md and its JSON register.
- [ ] Replace or explicitly approve fictional people data, imagery, case studies, client marks, statistics and price assumptions.
- [ ] Legal/editorial review confirms public service and article content.
- [ ] Hostinger plan and Node deployment tested.
- [ ] SMTP test received from actual host; mailbox permissions and retention configured.
- [ ] Trusted proxy address handling confirmed.
- [ ] GTM/GA configured and consent/PII tests verified.
- [ ] Domain ownership, HTTPS and DNS verified.
- [ ] Search Console verified and sitemap submitted.
- [ ] Only after approval: set LAUNCH.dataVerified=true and PUBLIC_INDEXING_ENABLED=true on the approved HTTPS domain.

Access to Hostinger and GTM is unavailable as confirmed by the user. Never change the dataVerified gate just to make SEO tooling show an indexable score.
