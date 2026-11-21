/**
 * Site locales (D-025, D-046).
 * Italian is the source language of all copy; English is the fallback
 * locale and the target of `x-default`.
 */
export const locales = ['it', 'en', 'es'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

/** Each locale's name written in that language (language switcher). */
export const localeNames: Record<Locale, string> = {
  it: 'Italiano',
  en: 'English',
  es: 'Español',
};

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (locales as readonly string[]).includes(value);
}
