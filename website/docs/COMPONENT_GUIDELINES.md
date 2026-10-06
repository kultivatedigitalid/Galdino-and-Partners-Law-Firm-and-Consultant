# Component Guidelines

- Use PascalCase for `.astro` components, camelCase for functions, and kebab-case for routes and Markdown slugs.
- Keep route files thin; compose shared page components.
- Define TypeScript interfaces for props and use the `Locale` union.
- Use semantic elements first. Do not replace buttons with clickable `div` elements.
- Prefer Tailwind utilities. Add global CSS only for tokens, repeated primitives, typography, prose, or behaviour that is substantially clearer in CSS.
- Do not add a UI framework for isolated interactions. Native disclosure (`details`), forms, and short scripts are preferred.
- Never read secrets in prerendered components or client scripts.
- Put editable business facts in `src/data/site.ts`; put editorial articles in Markdown.
- New bilingual components must receive `locale` and contain complete ID/EN copy. Do not hide missing translations.
- A component is reusable when it represents a stable visual or content pattern. Avoid abstract wrappers that merely rename one utility class.
- All animations need a purpose, short duration, and reduced-motion behaviour.
