# Architecture

## Runtime model

Astro prerenders all pages and feeds. `src/pages/api/contact.ts` declares `prerender = false`, so the Vercel adapter emits only that route as a function. This preserves static performance while allowing secure email delivery.

## Structure

```text
src/
├── components/       shared page, content, navigation, and form components
├── content/blog/     Markdown grouped by id/ and en/
├── data/site.ts      identity, navigation, contact, services, placeholders
├── layouts/          metadata, schema, header/footer, global behaviour
├── pages/            file-based routes, API, RSS, robots
├── styles/           Tailwind entry and global design tokens
├── utils/            blog, i18n, contact validation
└── content.config.ts collection schema
```

Routes use physical `id` and `en` folders. Shared page components prevent translated structures from drifting. Blog detail routes use `getStaticPaths`; article pairs share `translationKey`.

## Boundaries

- Components receive data and render UI; business constants live in `data`.
- Content prose lives in Markdown, not components.
- Secrets are read only inside the server endpoint.
- No client framework is shipped. Small interactions use scoped native scripts.
- Add a CMS only if editorial workflow requires it; do not change routing or the content schema without migration notes.
