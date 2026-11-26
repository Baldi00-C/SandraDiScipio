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
  "nav.main": "Menu principale",
  "nav.home": "Home",
  "nav.about": "Chi sono",
  "nav.services": "Servizi",
  "nav.projects": "Progetti",
  "nav.quote": "Preventivatore",
  "nav.contact": "Contatti",
  "nav.skip": "Vai al contenuto",
  "nav.homeLink": "Sandra Di Scipio, pagina iniziale",
  "nav.changeLanguage": "Cambia lingua",
  "menu.open": "Apri il menu",
  "menu.close": "Chiudi il menu",
  "contact.heading": "Contatti",
  "contact.whatsapp": "WhatsApp",
  "contact.email": "Email",
  "contact.phone": "Telefono",
  "contact.newTab": "si apre in una nuova scheda",
  "whatsapp.label": "Scrivimi su WhatsApp",
  "whatsapp.message": "Buongiorno Sandra, scrivo dal sito: vorrei informazioni su un progetto.",
  "footer.tagline": "Architettura | Interior Design | Ristrutturazioni",
  "footer.legal": "Legale",
  "footer.privacy": "Privacy Policy",
  "footer.cookies": "Cookie Policy",
  "footer.vat": "P.IVA",
  "footer.vatPending": "[da fornire]",
  "placeholder.eyebrow": "Pagina in costruzione",
  "placeholder.lead": "Il contenuto di questa pagina è in preparazione.",
} as const;

export type UiKey = keyof typeof it;
export type UiDictionary = Record<UiKey, string>;
