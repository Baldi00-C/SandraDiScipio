/// <reference types="vitest/config" />
import { getViteConfig } from 'astro/config';

// Test unitari (D-035): logica dei questionari, validazione degli allegati,
// costruzione delle email. I file di test stanno accanto al codice: *.test.ts.
export default getViteConfig({
  test: {
    include: ['src/**/*.test.ts'],
    passWithNoTests: true,
  },
});
