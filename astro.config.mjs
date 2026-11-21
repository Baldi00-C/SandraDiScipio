// @ts-check
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

// Nuovo progetto V.0 (T-03.1). Multilingua: T-03.2. Adapter Cloudflare: T-03.4.
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
});
