---
title: Contesto operativo e mappa del codice
ultimo_aggiornamento: 2026-11-21
---

# Contesto e codice

## Prodotto

Portfolio di Sandra Di Scipio, architetta e interior designer: racconta il suo lavoro e raccoglie richieste di contatto e di preventivo in IT, EN ed ES. Il preventivatore V.0 contiene due questionari e **non calcola prezzi** (D-004). Per i dettagli leggi [visione](../01-visione.md), [requisiti](../02-requisiti-business.md) e [preventivatore](../03-preventivatore.md).

Sandra è la PO; le decisioni quotidiane si prendono con l'utente. Non inventare biografia, recensioni, clienti o dati di contatto definitivi (D-008, REQ-CONT-6).

## Mappa del progetto V.0

| Percorso | Responsabilità |
| --- | --- |
| `src/pages/` | Pagine Astro; `/` porta alla lingua del visitatore (D-046) |
| `src/pages/[lang]/index.astro` | Home (T-09.3, D-089): immagini di esempio in `src/assets/home/`, progetti in evidenza con `src/lib/home.ts` e `src/scripts/home-slider.ts` |
| `src/pages/[lang]/[projects]/index.astro` | Elenco dei progetti (T-04.3, D-086) |
| `src/pages/[lang]/[projects]/[project].astro` | Scheda progetto con visore delle immagini (T-04.4, D-087); `src/scripts/image-viewer.ts` e `src/lib/viewer.ts` |
| `src/pages/[lang]/[contact]/index.astro` | Pagina Contatti con recapiti (T-05.2, D-088) |
| `src/pages/[lang]/[slug].astro` | Pagine segnaposto di `placeholderPages` (D-083): ogni task di pagina toglie la sua chiave |
| `src/i18n/config.ts` | Lingue supportate e fallback inglese |
| `src/i18n/routes.ts` | Chiavi delle pagine, slug tradotti, voci del menu (`mainNav`), segnaposto, `pathFor()` e `alternatesFor()` |
| `src/i18n/labels.ts` | Testo che dà il nome a ogni pagina (menu, footer, titolo) |
| `src/content.config.ts`, `src/content/projects/<lingua>/` | Content collection dei progetti: un file per progetto e per lingua, stesso slug (D-084). Foto in `src/assets/projects/<slug>/` |
| `src/lib/projects.ts`, `src/lib/project-entries.ts` | Funzioni dei progetti (ordine, progetto successivo, riga di dettagli, impaginazione delle gallerie) e lettura della collection per lingua |
| `src/data/contact.ts` | Email, telefono, link WhatsApp con messaggio già scritto (D-076), partita IVA |
| `src/i18n/ui/` | Dizionari dell'interfaccia; italiano come riferimento delle chiavi |
| `src/components/classes.ts` | Classi Tailwind di `Button`, `ProjectCard`, `SectionHeading`, `ContactCta`, condivise con le storie (D-086) |
| `src/components/` | Header con menu mobile, selettore lingua, footer, pulsante WhatsApp, logo SVG (`src/assets/brand/`) e metadati canonical/hreflang (D-082) |
| `src/layouts/BaseLayout.astro` | Struttura HTML comune e lingua della pagina |
| `src/layouts/PageLayout.astro` | Layout di ogni pagina: header, contenuto, footer e pulsante WhatsApp |
| `src/scripts/` | Memoria della lingua scelta e apertura/chiusura del menu mobile |
| `src/styles/tokens.css` | Token derivati da Figma e classi tipografiche condivise |
| `src/styles/global.css` | Import di font ospitati localmente, token e Tailwind |
| `src/stories/`, `.storybook/` | Catalogo HTML del design system, basato sugli stessi stili del sito |
| `.github/workflows/ci.yml` | Job `Checks`: tipi, lint, formato, test unitari e build |
| `docs/` | Requisiti, decisioni, roadmap e istruzioni |
| `poc/` | Prototipo archiviato; solo riferimento e contenuti riusabili (D-050) |

## Presente e pianificato

Verifica la [roadmap](../07-roadmap.md) e il codice corrente prima di iniziare: questa fotografia iniziale è del 2026-11-21.

| Area | Situazione verificata nel codice |
| --- | --- |
| Astro, TypeScript, Tailwind, Vitest, lint e formatter | Configurati nella radice |
| Multilingua | Home, dizionari, selettore e hreflang presenti; `routes` contiene solo `home` |
| Selezione automatica della lingua | Ancora da implementare: T-03.3; `/` contiene un selettore provvisorio |
| Design system e Storybook | Token e prime storie presenti (T-03.8); completamento design mobile ancora in F1 |
| Cloudflare e anteprime PR | Stack deciso, adapter/deploy ancora da configurare (T-03.4) |
| Playwright, axe e link rotti | Previsti in T-03.6; non presenti nella CI attuale |
| Content collection dei progetti | Fatta (T-04.2): 3 progetti professionali del POC in IT, EN, ES e un universitario segnaposto (D-084, D-085) |
| Pagine complete, form e invio email V.0 | Ancora da sviluppare; la presenza di implementazioni nel POC non le rende disponibili nel nuovo sito |

La scelta futura della lingua segue: scelta ricordata → browser supportato → inglese; gli URL con prefisso restano nella lingua richiesta (D-046). La V.0 userà Cloudflare, Resend e Turnstile secondo [lo stack deciso](../06-stack-tecnologico.md). Non dedurre configurazioni o credenziali attive da queste scelte.

## POC e materiali

`poc/` è escluso dai controlli del progetto nuovo. Puoi consultare testi e foto dei progetti come materiale iniziale; non riportare automaticamente struttura, componenti, comportamenti o stile del prototipo nella V.0 (D-001, D-050). Non riformattarlo insieme al codice attivo.
