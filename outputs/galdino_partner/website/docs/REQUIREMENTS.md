# Requirements

## Functional

- Locales: `/id/` and `/en/`; `/` redirects to `/id/`.
- Dedicated navbar pages: profile, services, projects, blog, and contact.
- Homepage sections: header, legal-specific hero, value, services, reasons, process, industries, experience, insights, FAQ, consultation CTA, footer.
- Markdown blog with requested frontmatter, category filtering, tags, related posts, translations, SEO, structured data, RSS, and draft exclusion.
- Contact by WhatsApp, email, and `/api/contact`.
- Form fields: name, email, WhatsApp, organisation, service, message, data consent, plus hidden honeypot.

## Non-functional

- Semantic HTML, keyboard access, visible focus, reduced-motion support, responsive layouts, lightweight assets, minimal dependencies.
- Canonical, hreflang, metadata, Open Graph, sitemap, robots, LegalService/Organization schema, and Article schema.
- Server validation and sanitisation, same-origin check, rate limiting, secret-only environment variables, no caching of API responses.

## Content integrity

No fabricated claims, results, team members, testimonials, registration numbers, or client relationships. Placeholders must remain visibly labelled until approved information is supplied.

## Definition of done

`npm run qa` passes; all required pages build; internal route checks pass; both locales are complete; form validation and fallback channels work; documentation matches code; production variables and legal content are reviewed.
