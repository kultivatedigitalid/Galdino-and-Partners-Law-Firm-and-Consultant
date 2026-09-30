// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
export default defineConfig({
 site: process.env.PUBLIC_SITE_URL || 'https://galdino.co.id',
 output: 'static', adapter: node({ mode: 'standalone' }), trailingSlash: 'always',
 integrations: [sitemap({ filter: page => !page.endsWith('/404/') })],
 i18n: { locales:['id','en'], defaultLocale:'id', routing:{prefixDefaultLocale:true,redirectToDefaultLocale:false}},
 vite:{ plugins:[tailwindcss()] }, security:{ checkOrigin:true },
});