# SEO Guidelines

## Technical

`BaseLayout` supplies unique title/description, canonical, hreflang, Open Graph, Twitter card, and Organization/LegalService JSON-LD. `x-default` resolves to the Indonesian equivalent of the current page. The transparent red-black-gold master logo is used by all routes and organization schema. Home, Profile, and placeholder person routes use the red theme color and immersive header configuration.

Profile adds `ProfilePage` and `BreadcrumbList` structured data. Placeholder person routes emit BreadcrumbList only and remain `noindex,follow`; Person schema must not be emitted until names, roles, credentials, photographs, and professional identities are verified. Blog pages add Article JSON-LD.

`@astrojs/sitemap` creates the sitemap; `robots.txt` references it; locale feeds expose RSS.

Use one H1 per page. Section titles use H2; member names, service areas, and subtopics use H3 where nested. Internal links use descriptive Indonesian or English labels. Trailing slashes are canonical.

## Topic model

Primary themes: konsultan perizinan, law firm Indonesia, perizinan usaha, legalitas perusahaan, OSS-RBA, izin sektoral, kepatuhan regulasi, project and investment licensing. Do not force exact-match phrases into every section.

Service pages target commercial intent; Profile and Projects support entity trust; blog articles answer informational intent and link naturally to Services and Contact. Profile should connect each verified team member to relevant licensing expertise without inventing experience or credentials.

Every article needs a unique 80-170 character description, category, tags, author, dates, and image.

## Before launch

Replace `PUBLIC_SITE_URL`; confirm the production domain in metadata and search tools; provide a raster 1200x630 social image if platform SVG support is insufficient; verify schema with a validator; ensure placeholders are not indexed as final claims; review sitemap and redirect behaviour.

Replace Profile member placeholders before removing `noindex` from individual routes or adding Person schema. Verify that official photographs have consent, descriptive alt text, and appropriate Astro image widths.
