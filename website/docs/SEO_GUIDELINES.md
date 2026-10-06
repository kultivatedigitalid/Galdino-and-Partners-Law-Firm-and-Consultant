# SEO Guidelines

## Technical

`BaseLayout` supplies unique title/description, canonical, hreflang, Open Graph, Twitter card, and Organization/LegalService JSON-LD. Blog pages add Article JSON-LD. `@astrojs/sitemap` creates the sitemap; `robots.txt` references it; locale feeds expose RSS.

One H1 per page. Section titles use H2; card titles or subtopics use H3 where nested. Internal links use descriptive Indonesian or English labels. Trailing slashes are canonical.

## Topic model

Primary themes: konsultan perizinan, law firm Indonesia, perizinan usaha, legalitas perusahaan, OSS-RBA, izin sektoral, kepatuhan regulasi, project and investment licensing. Do not force exact-match phrases into every section.

Service pages target commercial intent; profile/projects support entity trust; blog articles answer informational intent and link naturally to services/contact. Every article needs a unique 80–170 character description, category, tags, author, dates, and image.

## Before launch

Replace `PUBLIC_SITE_URL`; confirm the production domain in metadata and search tools; provide a raster 1200×630 social image if platform SVG support is insufficient; verify schema with a validator; ensure placeholders are not indexed as final claims; review sitemap and redirect behaviour.
