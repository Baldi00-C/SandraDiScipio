// @ts-check
import { defineConfig, envField } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import node from '@astrojs/node';

// Dominio di produzione: aggiornalo prima della pubblicazione
// (serve anche per canonical, Open Graph e sitemap).
const SITE_URL = process.env.SITE_URL ?? 'https://www.sandradiscipio.it';

export default defineConfig({
  site: SITE_URL,
  // Le pagine restano statiche (HTML generato in build); solo /api/contatti
  // gira sul server (prerender = false), per inviare le email con Resend.
  output: 'static',
  // Adapter provvisorio: quando si sceglie l'hosting basta sostituirlo con
  // @astrojs/vercel o @astrojs/netlify (con Hostinger Node.js resta questo).
  adapter: node({ mode: 'standalone' }),
  env: {
    schema: {
      RESEND_API_KEY: envField.string({ context: 'server', access: 'secret', optional: true }),
      MAIL_FROM: envField.string({
        context: 'server',
        access: 'secret',
        default: 'Sito Sandra Di Scipio <onboarding@resend.dev>',
      }),
      MAIL_TO: envField.string({ context: 'server', access: 'secret', default: 'discipiosandra@gmail.com' }),
    },
  },
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
  },
});
