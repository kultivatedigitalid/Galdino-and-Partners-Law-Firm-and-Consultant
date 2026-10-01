# Galdino & Partner Website

Production-oriented bilingual website for a licensing consultant and law firm. Built with Astro 7, Tailwind CSS 4, Markdown Content Collections, and a Vercel-compatible contact endpoint.

## Quick start

Requirements: Node.js 22.12+ and npm.

```bash
npm install
cp .env.example .env
npm run dev
```

Open `http://localhost:4321/id/` or `/en/`. The root redirects to Indonesian. Do not put real secrets in Git.

## Commands

```bash
npm run dev       # local development
npm run check     # Astro and TypeScript diagnostics
npm run lint      # project lint gate (Astro check)
npm run build     # production build
npm run preview   # preview a built static site
npm run validate  # route, link, placeholder, and documentation checks
npm run qa        # check + build + validate
```

## Production setup

1. Replace structured placeholders through `src/data/site.ts` and approved content.
2. Set `PUBLIC_SITE_URL` to the production origin.
3. Configure Resend and, preferably, Upstash variables described in `.env.example`.
4. Verify the sender domain, contact recipients, legal copy, service scope, team information, and publishable experience.
5. Import the repository into Vercel and deploy. Astro uses `@astrojs/vercel`; only `/api/contact` runs server-side.

The complete project contract is in [`docs/PROJECT_CONTEXT.md`](docs/PROJECT_CONTEXT.md). Start all future AI-agent work there, then read the topic-specific document.
