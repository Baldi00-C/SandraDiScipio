// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Dominio di produzione: aggiornalo prima della pubblicazione
// (serve anche per canonical, Open Graph e sitemap).
const SITE_URL = process.env.SITE_URL ?? 'https://www.sandradiscipio.it';

export default defineConfig({
  site: SITE_URL,
  output: 'static',
  trailingSlash: 'ignore',
  build: {
    format: 'directory',
    inlineStylesheets: 'auto',
  },
  image: {
    // Le immagini vengono ottimizzate in build (AVIF/WebP) da sharp.
    responsiveStyles: true,
  },
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover',
  },
  vite: {
    plugins: [tailwindcss()],
    server: {
      // In sviluppo le chiamate /api/*.php vanno al server PHP locale:
      //   terminale 1 → npm run dev:php   (php -S localhost:8000 -t public)
      //   terminale 2 → npm run dev
      proxy: {
        '/api': {
          target: 'http://localhost:8000',
          changeOrigin: false,
          secure: false,
        },
      },
    },
  },
});
