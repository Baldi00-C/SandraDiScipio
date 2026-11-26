// @ts-check
import cloudflare from '@astrojs/cloudflare';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

// Public URL, used for absolute canonical and hreflang links. Until M2 the site
// lives on the Cloudflare address (T-03.4), which sets it through SITE_URL.
const SITE_URL = process.env.SITE_URL ?? 'https://sandradiscipio.com';

export default defineConfig({
  site: SITE_URL,
  // Cloudflare Workers with static assets (D-026). Pages stay prerendered;
  // only future form endpoints will run on the Worker.
  adapter: cloudflare({
    // Optimise images at build time: no Cloudflare Images binding needed.
    imageService: 'compile',
  }),
  // No server sessions: avoids provisioning a Cloudflare KV namespace.
  session: false,
  trailingSlash: 'always',
  // i18n (D-025, D-046): every locale has its own prefix, English included.
  // Translated slugs live in src/i18n/routes.ts. The root `/` is handled by T-03.3.
  i18n: {
    locales: ['it', 'en', 'es'],
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
