# Deployment

## Vercel

1. Push the repository and import it into Vercel.
2. Framework preset: Astro. Build command: `npm run build`. Output is detected by the adapter.
3. Add all production environment variables from `.env.example`; never commit `.env`.
4. Set `PUBLIC_SITE_URL` to the final HTTPS origin and redeploy.
5. Verify the Resend sender domain and recipient.
6. Provision Upstash and add REST credentials for reliable distributed rate limiting.

`vercel.json` adds trailing-slash behaviour and baseline security headers. Review the Content Security Policy whenever external analytics, embeds, fonts, or CAPTCHA are proposed; do not loosen it globally without documenting the exact origin.

## Pre-deployment checklist

- `npm ci && npm run qa` passes on the deployment Node version.
- Legal name, domain, address, registration, service scope, team, project claims, privacy, and terms are approved.
- ID/EN content parity and hreflang are checked.
- Contact success/failure paths are tested against production services.
- Sitemap, robots, RSS, canonical URLs, and social previews use the final domain.
- Keyboard, 320px/768px/1440px layouts, contrast, and reduced motion are checked.
- Vercel logs contain no sensitive message content.
- Run Lighthouse on representative homepage, service, article, and contact pages.

Rollback by promoting the last healthy Vercel deployment; rotate credentials if a failed release exposed configuration.
