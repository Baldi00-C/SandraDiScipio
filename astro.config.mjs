// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Nuovo progetto V.0 (T-03.1). Multilingua: T-03.2. Adapter Cloudflare: T-03.4.
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
});
