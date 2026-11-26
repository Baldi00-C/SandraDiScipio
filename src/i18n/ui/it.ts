/**
 * Italian UI strings: the reference language.
 * Other locales must have exactly the same keys (enforced by TypeScript).
 */
export const it = {
  "site.name": "Sandra Di Scipio",
  "site.role": "Architetta e interior designer",
  "home.title": "Sandra Di Scipio — Architetta e interior designer",
  "home.description": "Portfolio di Sandra Di Scipio, architetta e interior designer.",
  "home.eyebrow": "Pagina di prova",
  "home.lead": "Il sito è in costruzione.",
  "nav.language": "Lingua",
} as const;

export type UiKey = keyof typeof it;
export type UiDictionary = Record<UiKey, string>;
