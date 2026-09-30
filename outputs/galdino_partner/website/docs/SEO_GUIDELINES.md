# SEO and indexing

All current pages render noindex,nofollow. robots.txt disallows all crawling. LAUNCH.dataVerified remains false and PUBLIC_INDEXING_ENABLED defaults false; both must change after approvals, on the exact approved HTTPS host, before indexing is enabled.

Canonical URLs are locale-specific and omit query strings. hreflang uses id-ID, en and x-default to the Indonesian equivalent. Dynamic service, industry and article translations use explicit paired paths. Language switching preserves scroll position where possible.

Built output includes sitemap and ID/EN RSS. A custom Node 404 preserves HTTP 404 and selects language from the path. JSON-LD describes Organization/LegalService, WebSite/WebPage, Person, Service, Article and BreadcrumbList based on displayed content. No review/rating schema or FAQ rich-result claims.

Public offers with inferred/provisional prices deliberately omit structured Offer prices. Prices are not approved commercial quotations. Open Graph uses the existing approved-layout company image converted to PNG.

Search Console ownership and real production metadata checks require domain access. Automated SEO tools penalise noindex; this is an intentional staging gate, not a reason to enable indexing prematurely.
