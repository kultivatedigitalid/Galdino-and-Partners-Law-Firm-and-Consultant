// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import config from './astro.config.mjs';

// Keep the Node standalone build available for local QA and Hostinger.
export default defineConfig({
 ...config,
 adapter: vercel({ maxDuration: 60 }),
});
