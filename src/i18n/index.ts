import type { Locale } from "./config";
import { en } from "./ui/en";
import { es } from "./ui/es";
import { it, type UiDictionary, type UiKey } from "./ui/it";

export * from "./config";
export * from "./routes";
export * from "./detect";
export * from "./labels";

const dictionaries: Record<Locale, UiDictionary> = { it, en, es };

/** Returns the translation function for a locale. */
export function useTranslations(locale: Locale) {
  return (key: UiKey): string => dictionaries[locale][key];
}
