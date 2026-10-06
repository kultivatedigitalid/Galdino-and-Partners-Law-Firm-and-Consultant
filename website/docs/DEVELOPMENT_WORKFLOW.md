# Development Workflow

1. Read `PROJECT_CONTEXT.md`, then the relevant specification.
2. Create a focused branch using the `codex/` prefix when Git workflow is requested.
3. Update the central data source or Markdown content before duplicating copy in components.
4. Implement both locales in the same change.
5. Run `npm run check`, `npm run build`, and `npm run validate`; `npm run qa` combines them.
6. Preview and manually test mobile, tablet, desktop, keyboard, reduced motion, and form states.
7. Update the applicable documentation whenever behaviour, routes, variables, tokens, or content format changes.

## Code conventions

Two-space indentation, semicolons in TypeScript, single quotes in scripts, PascalCase components, camelCase utilities, UPPER_CASE constants, and kebab-case URLs/content filenames. Prefer named functions for shared logic and narrow prop interfaces. Remove unused dependencies and components in the same change.

## Content workflow

Create paired Markdown files, validate frontmatter, set `draft: true` during review, obtain legal/editorial approval, then publish. Never alter `publishDate` merely for freshness; use `updatedDate` for substantive changes.

## Release record

Record the commit, reviewer, content approvals, environment changes, QA result, and rollback deployment. Any temporary exception must include an owner and expiry date.
