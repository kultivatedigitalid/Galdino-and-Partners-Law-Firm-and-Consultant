# Architecture

## Runtime model

Astro prerenders all pages and feeds. `src/pages/api/contact.ts` declares `prerender = false`, so the Vercel adapter emits only that route as a function. This preserves static page performance while allowing server-side validation, rate limiting, and secure email delivery.

No client UI framework is shipped. The mobile navigation, Home viewport reveal, scroll-preserving Home language switch, FAQ disclosure, carousel, and contact form use native elements and small scoped scripts.

## Structure

```text
public/
`-- assets/
    `-- gp-logo-brand.png    transparent red-black-gold master logo
src/
|-- assets/                  Astro-optimized editorial imagery
|-- components/
|   |-- CompanyGallery.astro shared Home/Profile company image carousel
|   |-- home/                Home section components and ServiceVisual
|   |-- profile/             compact team directory
|   `-- icons/               dependency-free semantic UI icons
|-- content/blog/            Markdown grouped by id/ and en/
|-- data/
|   |-- site.ts              identity, navigation, contact, shared placeholders
|   `-- home.ts              Home services, dummy client marks, and statistics
|-- layouts/                 metadata, schema, shell, and global behaviour
|-- pages/                   file-based routes, API, RSS, and robots
|-- styles/                  Tailwind entry, design tokens, and contrast variants
|-- utils/                   blog, i18n, and contact validation
`-- content.config.ts        collection schema
scripts/
`-- validate-project.mjs     required routes and content checks
```

Routes use physical `id` and `en` folders. Shared page components prevent translated structures from drifting. Blog and person-detail routes use `getStaticPaths`; article pairs share `translationKey`, while person routes share the same verified slug across locales.

## Component boundaries

- `BaseLayout.astro` owns metadata, schema, header, footer, the optional desktop contact dock, and global reveal behaviour.
- `Header.astro` owns brand navigation, route-wide scroll-preserving language switching, encoding-safe CTA icon, and keyboard-accessible mobile menu.
- `HomePage.astro` owns the Mockup 1 section composition, locally scoped tokens/motion, and bilingual homepage copy.
- `ArrowIcon.astro` replaces platform-dependent arrow glyphs in shared and Home controls.
- `ServiceVisual.astro` renders lightweight service-category illustrations without a UI or graphics dependency.
- `CompanyGallery.astro` owns the shared five-image Home/Profile gallery, autoplay pause rules, native dragging, keyboard navigation, status feedback, and reduced-motion fallback.
- `ContactDock.astro` is a desktop and tablet WhatsApp shortcut and is hidden on mobile.
- Content components receive data and render UI; business constants remain in `src/data/site.ts` and Home catalog data in `src/data/home.ts`.
- Content prose remains in Markdown, not components.
- Secrets are read only inside the server endpoint.
- Add a CMS only if editorial workflow requires it; do not change routing or the content schema without migration notes.
