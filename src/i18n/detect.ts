import { defaultLocale, isLocale, type Locale } from "./config";

/**
 * Visitor locale (D-046), used only on the root `/`:
 * 1. the locale chosen with the language switcher, remembered in a cookie;
 * 2. otherwise the first browser language that the site supports;
 * 3. otherwise English.
 * Prefixed URLs (`/it/...`) are never redirected.
 */

/** Technical cookie (no consent banner needed, D-032) that stores the chosen locale. */
export const LOCALE_COOKIE = "locale";
const ONE_YEAR_IN_SECONDS = 60 * 60 * 24 * 365;

/** Reads the remembered locale from a `document.cookie`-style string. */
export function readSavedLocale(cookieHeader: string | null | undefined): Locale | undefined {
  if (!cookieHeader) return undefined;
  for (const part of cookieHeader.split(";")) {
    const [name, ...rest] = part.trim().split("=");
    if (name === LOCALE_COOKIE) {
      const value = decodeURIComponent(rest.join("="));
      return isLocale(value) ? value : undefined;
    }
  }
  return undefined;
}

/** Cookie string that remembers a locale for one year. */
export function localeCookie(locale: Locale): string {
  return `${LOCALE_COOKIE}=${locale}; Path=/; Max-Age=${ONE_YEAR_IN_SECONDS}; SameSite=Lax`;
}

/** Maps browser languages in order of preference (e.g. `es-AR`) to the first supported locale. */
export function matchBrowserLocale(languages: readonly string[]): Locale | undefined {
  for (const language of languages) {
    const primary = language.trim().toLowerCase().split("-")[0];
    if (isLocale(primary)) return primary;
  }
  return undefined;
}

export function pickLocale({
  saved,
  browserLanguages,
}: {
  saved?: Locale;
  browserLanguages: readonly string[];
}): Locale {
  return saved ?? matchBrowserLocale(browserLanguages) ?? defaultLocale;
}
