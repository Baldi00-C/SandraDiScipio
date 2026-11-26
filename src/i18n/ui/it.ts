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
  "projects.description":
    "Progetti di architettura e interior design di Sandra Di Scipio: lavori professionali e universitari.",
  "projects.heading": "I nostri progetti, le nostre storie.",
  "projects.lead": "Una selezione di lavori che raccontano il nostro approccio alla progettazione e al design.",
  "projects.countOne": "{count} progetto",
  "projects.countMany": "{count} progetti",
  "projects.comingSoon": "In arrivo",
  "projects.professional": "Progetti professionali",
  "projects.professionalLead": "Proposte, render e lavori realizzati per clienti privati e aziende.",
  "projects.university": "Progetti universitari",
  "projects.universityLead": "Tavole, render e concept dei progetti del percorso di studi.",
  "projects.universityPlaceholder":
    "Segnaposto: elenco e materiale dei progetti universitari in arrivo entro il 15/12.",
  "projects.ctaTitle": "Hai un progetto da realizzare?",
  "projects.ctaText": "Ogni grande progetto nasce da una prima idea e da una conversazione.",
  "cta.quote": "Richiedi un preventivo",
  "placeholder.eyebrow": "Pagina in costruzione",
  "placeholder.lead": "Il contenuto di questa pagina è in preparazione.",
} as const;

export type UiKey = keyof typeof it;
export type UiDictionary = Record<UiKey, string>;
