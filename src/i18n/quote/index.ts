import type { Locale } from "../config";
import { quoteEn } from "./en";
import { quoteEs } from "./es";
import { quoteIt, type QuoteDictionary } from "./it";

export type { QuoteDictionary } from "./it";

const dictionaries: Record<Locale, QuoteDictionary> = { it: quoteIt, en: quoteEn, es: quoteEs };

/** Texts of the quote builder in a locale (S-08). */
export function quoteText(locale: Locale): QuoteDictionary {
  return dictionaries[locale];
}
