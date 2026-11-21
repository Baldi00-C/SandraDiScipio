// @ts-check
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

// V.0 project (T-03.1). i18n: T-03.2. Cloudflare adapter: T-03.4.
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
});
