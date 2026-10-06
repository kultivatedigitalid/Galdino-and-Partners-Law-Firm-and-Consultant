// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: process.env.PUBLIC_SITE_URL || 'https://example-legal-domain.com',
  output: 'static',
  adapter: vercel(),
  integrations: [sitemap()],
  i18n: {
    locales: ['id', 'en'],
    defaultLocale: 'id',
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },
  vite: { plugins: [tailwindcss()] },
  security: { checkOrigin: true },
});
