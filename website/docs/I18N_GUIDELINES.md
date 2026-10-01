# I18N Guidelines

Indonesian is the default locale but remains prefixed: `/id/`. English uses `/en/`; `/` redirects to Indonesian. Astro i18n configuration enforces the locale list and prefix behaviour.

Fixed pages use identical English route segments to keep switching predictable. Header navigation comes from `src/data/site.ts`. New page routes must be created in both locale folders and linked in both navigation arrays if they are global.

Each layout emits:

- self canonical URL;
- alternate ID and EN URLs;
- `x-default` pointing to `/id/`;
- correct `<html lang>`;
- locale-specific Open Graph locale.

Blog translations can use different slugs. They must share `translationKey`, and the article component finds the paired entry for the language switch and hreflang. If an article has no translation, do not invent an alternate URL to unrelated content.

Dates use `id-ID` or `en-US`. Keep legal names and regulated terminology faithful to their official Indonesian form where translation would create ambiguity; add an English explanation instead.
