/// <reference types="vitest/config" />
import { getViteConfig } from "astro/config";

// Unit tests (D-035): questionnaire logic, attachment validation, email
// building. Test files live next to the code: *.test.ts.
export default getViteConfig({
  test: {
    include: ["src/**/*.test.ts"],
    passWithNoTests: true,
  },
});
