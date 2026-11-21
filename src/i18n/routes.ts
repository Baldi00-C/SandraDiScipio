import { defaultLocale, locales, type Locale } from "./config";

/**
 * Translated slugs of every page (D-025). One row per page, one column per
 * locale. Empty string = the locale's home page (`/it/`).
 * Final slugs are set together with the translations (D-007, F4).
 * Always build internal links with `pathFor()`, never by hand.
 */
export const routes = {
  home: { it: "", en: "", es: "" },
} as const satisfies Record<string, Record<Locale, string>>;

export type RouteKey = keyof typeof routes;

/** Relative path of a page in a locale, e.g. `/it/chi-sono/`. */
export function pathFor(key: RouteKey, locale: Locale): string {
  const slug = routes[key][locale];
  return slug ? `/${locale}/${slug}/` : `/${locale}/`;
}

/** Paths of the same page in every locale, plus `x-default`. */
export function alternatesFor(key: RouteKey): { hreflang: string; path: string }[] {
  return [
    ...locales.map((locale) => ({ hreflang: locale, path: pathFor(key, locale) })),
    { hreflang: "x-default", path: pathFor(key, defaultLocale) },
  ];
}
