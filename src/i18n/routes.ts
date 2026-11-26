import { defaultLocale, locales, type Locale } from "./config";

/**
 * Translated slugs of every page (D-025, D-083). One row per page, one column
 * per locale. Empty string = the locale's home page (`/it/`).
 * Final slugs are confirmed together with the translations (D-007, F4).
 * Always build internal links with `pathFor()`, never by hand.
 */
export const routes = {
  home: { it: "", en: "", es: "" },
  about: { it: "chi-sono", en: "about", es: "sobre-mi" },
  services: { it: "servizi", en: "services", es: "servicios" },
  projects: { it: "progetti", en: "projects", es: "proyectos" },
  quote: { it: "preventivatore", en: "quote", es: "presupuesto" },
  contact: { it: "contatti", en: "contact", es: "contacto" },
  privacy: { it: "privacy-policy", en: "privacy-policy", es: "politica-de-privacidad" },
  cookies: { it: "cookie-policy", en: "cookie-policy", es: "politica-de-cookies" },
} as const satisfies Record<string, Record<Locale, string>>;

export type RouteKey = keyof typeof routes;

/** Main menu entries, in order (D-062). */
export const mainNav = [
  "home",
  "about",
  "services",
  "projects",
  "quote",
  "contact",
] as const satisfies readonly RouteKey[];

/**
 * Pages that exist only as placeholders until their own task builds them
 * (D-083). Remove a key from here when its real page is added.
 */
export const placeholderPages = [
  "about",
  "services",
  "projects",
  "quote",
  "contact",
  "privacy",
  "cookies",
] as const satisfies readonly RouteKey[];

export type PlaceholderPage = (typeof placeholderPages)[number];

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
