---
title: Roadmap della V.0
stato: DECISO
ultimo_aggiornamento: 2026-11-26
---

# Roadmap della V.0

Piano deciso con l'utente il 2026-11-21 (→ D-037 … D-045). Stati delle fasi e dei task: `DA FARE`, `IN CORSO`, `FATTO`.

Regole:
- Le **uniche date vincolanti** sono le due milestone (D-043). Le finestre delle fasi sono **indicative**.
- Le revisioni di Sandra come PO **non** sono nella roadmap: le gestisce l'utente (D-041).
- I task operativi vivono nelle GitHub Issues (D-045); questo file tiene fasi, milestone, dipendenze e stato.

## Milestone

| ID | Milestone | Data | Cosa c'è | Stato |
| --- | --- | --- | --- | --- |
| M1 | Bozza completa | entro 2026-12-15 | Tutte le pagine sviluppate almeno in IT (livello "Bozza", D-042), online sull'indirizzo di anteprima Cloudflare, da mostrare | DA FARE |
| M2 | V.0 online | entro 2027-01-31 | Tutte le pagine "Fatte" (D-042), traduzioni riviste, sito pubblicato su `sandradiscipio.com` | DA FARE |

## Fasi

| ID | Fase | Finestra indicativa | Dipende da | Stato |
| --- | --- | --- | --- | --- |
| F0 | Roadmap e organizzazione su GitHub | 2026-11-21 | Requisiti e stack (chiusi) | FATTO |
| F1 | Base comune in Figma | 2026-11-22 → 2026-11-28 | F0; accesso a Figma | FATTO |
| F2 | Setup tecnico | 2026-11-22 → 2026-11-28, in parallelo a F1 | F0 | IN CORSO |
| F3 | Pagine in bozza (mockup + sviluppo, D-039) | 2026-11-29 → 2026-12-15 | F1, F2 | DA FARE |
| F4 | Completamento delle pagine (da "Bozza" a "Fatta") | 2026-12-16 → 2027-01-20 | F3, materiali di D-044 | DA FARE |
| F5 | Preparazione e pubblicazione | 2027-01-10 → 2027-01-31 | F4, materiali di D-044 | DA FARE |

### F1 — Base comune in Figma (D-037)

| Contenuto | Note |
| --- | --- |
| Stile: colori, font, scala tipografica, spaziature, griglia | Diventano i token Tailwind (D-024). Font ospitabili sul sito (D-032) |
| Elementi globali: menu, footer, selettore lingua, pulsante WhatsApp | REQ-GLOB-1, 2, 3 |
| Componenti comuni: pulsanti, card progetto, campi dei form, messaggi di conferma ed errore | Riusati da tutte le pagine |
| Versioni mobile e desktop | |

Fatto quando: l'utente approva la base comune in Figma.

**File Figma del sito**: [SandraDiScipio](https://www.figma.com/design/Zl3k5Q7AegYlr0mGOQa6YQ/SandraDiScipio) (D-048). Punto di partenza adottato (D-049): la guida di stile già presente nel file.

| Pagina Figma | Contenuto |
| --- | --- |
| Page 1 | 00 Logo, 01 Foundations, 02 Components, 03 Patterns, 04 Claude Code handoff, 05 Motion principles |
| Website · Static design | 9 pagine statiche: Home, Chi sono, Servizi, Progetti, Progetto, Preventivatore, Contatti, Privacy Policy, Cookie Policy |

| Elemento | Valori nel file |
| --- | --- |
| Variabili | 89 in 5 collezioni: `Sandra · Primitives`, `Sandra · Semantic` (Light e Dark), `Sandra · Typography` (Desktop e Mobile), `Sandra · Layout` (Desktop e Mobile), `Sandra · Motion` |
| Colori base | ink `#1D1D1B`, stone `#989897` (solo logo), rose `#BA8484`, rose-deep `#8C5A5A`, blush `#F1E8E5`, paper `#FBF8F6`, line `#D9CBC7`, muted `#6B5855`, label `#5E4D4A`; error `#A03030`, success `#3D6650`, disabled `#E5DCD8` |
| Font | Titoli Cormorant Garamond, testo Gothic A1, licenza OFL 1.1, ospitati con Fontsource (D-057) |
| Stili di testo | 12 stili `Sandra/*` legati alle variabili `type/*`, con modi Desktop e Mobile (D-058). Desktop/mobile in px: Hero 104 / 56, Display Large 76 / 44, H1 52 / 36, H2 40 / 30, H3 24 / 22, Body Large 18 / 17, Body 17 / 16, Body Small 14, Control 15 / 16, Link, Caption ed Eyebrow 12 |
| Spaziature | Base 4 px: 0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 96, 120 (D-059). Margine pagina 24 / 20, spazio tra sezioni 120 / 72 |
| Layout e griglia | Larghezza massima 1180 px, cambi di layout a 480 e 860 px. Stili `Sandra/Grid/Desktop` (1440 px, 12 colonne, spazio 24) e `Sandra/Grid/Mobile` (375 px, 4 colonne, margini 20, spazio 16) (D-060) |
| Componenti | Logo (simbolo originale, nome in Plus Jakarta Sans, 8 varianti, D-061), Brand mark, Service card, Estimator step, Contact banner. Componenti comuni (T-02.4, tavola 02 · Components, tutti con auto-layout): Button (Primario e Secondario, taglie 52 e 44 px, D-067), Editorial link, Filter chip, Checkbox, Text field, Select, File upload, File item (D-069), Notice (D-070), Project card (D-068). Elementi globali (T-02.3): Site header (Desktop, Mobile, menu mobile aperto, D-062), Site footer (Desktop, Mobile, D-065), Nav link, Mobile nav link, Footer link, Language option, Language switcher (D-063), Menu button, WhatsApp button (D-064); stati hover, corrente e focus (D-066) |
| Effetti | `Sandra/Shadow/Floating` (ombra del pulsante WhatsApp e della tendina lingua) |
| Motion | Durate 0,25 s, 0,4 s, 1,1 s; curva `cubic-bezier(0.2, 0.7, 0.1, 1)` |

Tavola dello stile approvata in T-02.2: [T-02.2 · Type, spacing & grid](https://www.figma.com/design/Zl3k5Q7AegYlr0mGOQa6YQ/SandraDiScipio?node-id=34-224) (Page 1), insieme a [01 · Foundations](https://www.figma.com/design/Zl3k5Q7AegYlr0mGOQa6YQ/SandraDiScipio?node-id=3-82) e [00 · Logo](https://www.figma.com/design/Zl3k5Q7AegYlr0mGOQa6YQ/SandraDiScipio?node-id=34-399).

Elementi globali approvati in T-02.3: tavola [T-02.3 · Global elements](https://www.figma.com/design/Zl3k5Q7AegYlr0mGOQa6YQ/SandraDiScipio?node-id=35-1225) (Page 1) con i componenti [Site header](https://www.figma.com/design/Zl3k5Q7AegYlr0mGOQa6YQ/SandraDiScipio?node-id=3-295), [Site footer](https://www.figma.com/design/Zl3k5Q7AegYlr0mGOQa6YQ/SandraDiScipio?node-id=35-1708), [Language switcher](https://www.figma.com/design/Zl3k5Q7AegYlr0mGOQa6YQ/SandraDiScipio?node-id=35-1293), [WhatsApp button](https://www.figma.com/design/Zl3k5Q7AegYlr0mGOQa6YQ/SandraDiScipio?node-id=35-1323) e gli esempi d'uso desktop e mobile ([desktop](https://www.figma.com/design/Zl3k5Q7AegYlr0mGOQa6YQ/SandraDiScipio?node-id=35-2050), [menu mobile aperto](https://www.figma.com/design/Zl3k5Q7AegYlr0mGOQa6YQ/SandraDiScipio?node-id=35-2139)). Header e footer sono aggiornati nelle 9 pagine statiche e in 03 · Patterns.

Componenti comuni approvati in T-02.4: tavola [02 · Components](https://www.figma.com/design/Zl3k5Q7AegYlr0mGOQa6YQ/SandraDiScipio?node-id=3-87) (Page 1) con [Button](https://www.figma.com/design/Zl3k5Q7AegYlr0mGOQa6YQ/SandraDiScipio?node-id=3-203), [Text field](https://www.figma.com/design/Zl3k5Q7AegYlr0mGOQa6YQ/SandraDiScipio?node-id=3-267), [Select](https://www.figma.com/design/Zl3k5Q7AegYlr0mGOQa6YQ/SandraDiScipio?node-id=35-2305), [File upload](https://www.figma.com/design/Zl3k5Q7AegYlr0mGOQa6YQ/SandraDiScipio?node-id=35-2443), [Notice](https://www.figma.com/design/Zl3k5Q7AegYlr0mGOQa6YQ/SandraDiScipio?node-id=3-280) e [Project card](https://www.figma.com/design/Zl3k5Q7AegYlr0mGOQa6YQ/SandraDiScipio?node-id=35-2466); esempi d'uso nella sezione [T-02.4 · Common components](https://www.figma.com/design/Zl3k5Q7AegYlr0mGOQa6YQ/SandraDiScipio?node-id=35-2470) (griglia progetti desktop e mobile, form mobile con pulsante a tutta larghezza). I form di Home e Contatti nelle pagine statiche sono riallineati ai nuovi campi.

Con T-02.4 la base comune (F1) è completa: si passa ai mockup delle pagine (F3).

### F2 — Setup tecnico (D-038)

| Contenuto | Riferimento |
| --- | --- |
| Progetto Astro + TypeScript nuovo; il POC resta solo come riferimento, in `poc/` e nel tag `poc` | D-001, D-023, D-050 |
| Tailwind 4 con token provvisori, sostituiti da quelli di F1 | D-024 |
| Struttura multilingua `/it/`, `/en/`, `/es/`, file di traduzione, hreflang con `x-default` in inglese | D-025 |
| Lingua del visitatore: scelta ricordata → lingua del browser → inglese; link con prefisso mai reindirizzati | D-046 |
| Content collection dei progetti (un file per progetto e per lingua) — fatta in T-04.2 | D-021, D-084 |
| Adapter Cloudflare, deploy di `main` e anteprime delle PR | D-026, D-036 |
| GitHub Actions: astro check, ESLint, Prettier, test unitari, Playwright, axe, link rotti | D-035 |
| Fino alla pubblicazione il sito vive sull'indirizzo Cloudflare di anteprima, non indicizzato dai motori di ricerca | D-034 |

Fatto quando: una pagina di prova in 3 lingue è online sull'indirizzo Cloudflare, una PR genera l'anteprima e tutti i controlli girano verdi.

### F3 — Pagine in bozza (D-039, D-042)

Per ogni pagina: mockup in Figma → approvazione dell'utente → sviluppo → PR unita. Livello richiesto: **Bozza**.

| Ordine | Pagina | Requisiti | Note |
| --- | --- | --- | --- |
| 1 | Progetti: elenco + scheda | REQ-PROG-1 … 4 | Con i 3 progetti professionali del POC. Universitari con segnaposto finché non arriva il materiale (D-013) |
| 2 | Contatti: dati, form, email | REQ-CONT-1 … 5 | Primo collaudo di Resend (D-027) e anti-spam (D-030). Email e numero del POC finché non sono confermati |
| 3 | Chi sono | REQ-CHI-1 … 4 | Segnaposto finché non arrivano testi e foto (D-008) |
| 4 | Servizi | REQ-SERV-1, 2 | |
| 5 | Preventivatore: scelta + 2 questionari + allegati | REQ-PREV-1 … 7 | Revisione delle domande con l'utente in questa fase (D-019). Verifica allegati da 20 MB sul piano gratuito (D-026) |
| 6 | Home | REQ-HOME-1 … 6 | Qui si decidono progetti in evidenza (D-012) ed elementi extra (D-016) |

Fatto quando (M1): tutte e 6 le pagine sono in bozza online sull'indirizzo di anteprima.

Mockup approvati, nella pagina Figma "Website · Static design":

| Pagina | Sezione Figma | Decisioni |
| --- | --- | --- |
| Progetti: elenco, scheda professionale, scheda universitaria, visore immagini (desktop e mobile) | [T-04.1 · Progetti](https://www.figma.com/design/Zl3k5Q7AegYlr0mGOQa6YQ/SandraDiScipio?node-id=65-2559): [elenco](https://www.figma.com/design/Zl3k5Q7AegYlr0mGOQa6YQ/SandraDiScipio?node-id=65-2560), [scheda](https://www.figma.com/design/Zl3k5Q7AegYlr0mGOQa6YQ/SandraDiScipio?node-id=65-2788), [visore](https://www.figma.com/design/Zl3k5Q7AegYlr0mGOQa6YQ/SandraDiScipio?node-id=65-3170), [scheda universitaria](https://www.figma.com/design/Zl3k5Q7AegYlr0mGOQa6YQ/SandraDiScipio?node-id=65-3197) | D-071, D-072, D-073 |
| Contatti: pagina, invio riuscito, stati del form (oggetto "Altro", errori, tendina aperta) (desktop e mobile) | [T-05.1 · Contatti](https://www.figma.com/design/Zl3k5Q7AegYlr0mGOQa6YQ/SandraDiScipio?node-id=266-1339): [desktop](https://www.figma.com/design/Zl3k5Q7AegYlr0mGOQa6YQ/SandraDiScipio?node-id=266-1340), [mobile](https://www.figma.com/design/Zl3k5Q7AegYlr0mGOQa6YQ/SandraDiScipio?node-id=266-1488), [inviato](https://www.figma.com/design/Zl3k5Q7AegYlr0mGOQa6YQ/SandraDiScipio?node-id=268-1616), [oggetto Altro](https://www.figma.com/design/Zl3k5Q7AegYlr0mGOQa6YQ/SandraDiScipio?node-id=268-1738), [errori](https://www.figma.com/design/Zl3k5Q7AegYlr0mGOQa6YQ/SandraDiScipio?node-id=268-1865) | D-074, D-075, D-076, D-077 |
| Home (desktop; mobile ricavato nel codice) | [01 · Home](https://www.figma.com/design/Zl3k5Q7AegYlr0mGOQa6YQ/SandraDiScipio?node-id=4-8), con immagini di esempio | D-012, D-016, D-088 |

I mockup usano il materiale reale del POC (Villa a Castana per la scheda). Le vecchie bozze 04, 05 e 07 restano nel file, segnate come superate.

### F4 — Completamento delle pagine (D-040, D-042)

| Contenuto | Riferimento |
| --- | --- |
| Inserire i contenuti reali al posto dei segnaposto | D-008, D-013, D-044 |
| Testi IT definitivi e traduzione AI in EN/ES, slug tradotti definitivi | D-007, D-025, D-040 |
| SEO base di ogni pagina: title, description, Open Graph, alt delle immagini, schema.org | D-034 |
| Rifinitura grafica su mobile e desktop rispetto ai mockup | D-042 |

Fatto quando: ogni pagina rispetta il livello **Fatta** (D-042).

### F5 — Preparazione e pubblicazione

| Passo | Riferimento | Entro |
| --- | --- | --- |
| Acquisto di `sandradiscipio.com`, DNS su Cloudflare | D-028 | 2027-01-10 |
| Email e numero definitivi confermati | REQ-CONT-6 | 2027-01-10 |
| Attivazione di Iubenda, policy collegate nel footer in IT/EN/ES | D-033, REQ-GLOB-3 | 2027-01-10 |
| Verifica del dominio in Resend, attivazione di Email Routing per `info@` | D-027, D-029 | dopo l'acquisto del dominio |
| Revisione umana unica dei testi EN/ES | D-018, D-040 | prima della pubblicazione |
| Collaudo finale: form e questionari con email vere, Lighthouse | D-035 | prima della pubblicazione |
| Collegamento del dominio, indicizzazione attiva, Google Search Console | D-034 | 2027-01-31 |

Fatto quando (M2): il sito è online su `sandradiscipio.com` nelle 3 lingue e i form inviano le email a Sandra e all'utente.

## Materiali da fornire (D-044)

| Materiale | Chi | Entro | Serve per |
| --- | --- | --- | --- |
| Testi e foto di Chi sono | Utente | 2026-12-15 | F4, pagina Chi sono |
| Elenco e materiale dei progetti universitari | Utente | 2026-12-15 | F4, pagina Progetti |
| Email e numero definitivi | Utente | 2027-01-10 | F5 |
| Acquisto del dominio | Utente | 2027-01-10 | F5 |
| Attivazione di Iubenda | Utente | 2027-01-10 | F5 |
| Accesso a Figma per l'agente | Utente | prima di F1 | F1 (fornito il 2026-11-21) |
| Partita IVA di Sandra (riga legale del footer, D-065) | Utente | 2027-01-10 | F5 |

## Temi rimandati e loro collocazione

| Tema | Decisione | Fase |
| --- | --- | --- |
| Progetti in evidenza in Home | D-012 | Deciso: D-088 |
| Elementi extra in Home | D-016 | Deciso: nessuno nella bozza (D-088) |
| Contenuti Chi sono | D-008 | F3 (segnaposto), F4 (reali) |
| Progetti universitari | D-013 | F3 (segnaposto), F4 (reali) |
| Revisione delle domande dei questionari | D-019 | F3, Preventivatore |
| Tempi di risposta promessi | D-017 | Nessuna fase: chiedere all'utente prima di scrivere le email di conferma |
| CMS per Sandra | D-022 | Dopo M2 |
| Profilo Google Business | D-034 | Dopo M2 |

## Struttura su GitHub (D-045, D-047)

```
Milestone (M1, M2)
└── Storia            issue con label `tipo: storia`, nella milestone
    └── Task          sotto-issue della storia, label `tipo: task`, stessa milestone
        └── PR        una PR per task, con `Closes #<task>` nella descrizione
```

Regole:
- Ogni task si chiude con **una sola PR**. I lavori senza codice (mockup Figma, materiali, revisioni) si chiudono con una piccola PR che aggiorna `docs/` (es. link al frame Figma approvato, stato del materiale ricevuto).
- Una storia si chiude quando tutti i suoi task sono chiusi.
- Titolo delle issue: `[S-03] Setup tecnico`, `[T-03.2] Struttura multilingua`. Titolo della PR: commit convenzionale con l'ID del task, es. `feat(i18n): struttura /it/ /en/ /es/ (T-03.2)`.
- La colonna "Issue" collega ogni storia e task alla sua issue. Quando un task si chiude, aggiornare qui lo stato nella stessa PR.
- Milestone su GitHub: [M1 — Bozza completa](https://github.com/Baldi00-C/SandraDiScipio/milestone/1), [M2 — V.0 online](https://github.com/Baldi00-C/SandraDiScipio/milestone/2).

### Label

| Gruppo | Label | Uso |
| --- | --- | --- |
| Tipo | `tipo: storia`, `tipo: task` | Livello della issue |
| Fase | `fase: F0` … `fase: F5` | Fase della roadmap |
| Area | `area: design`, `area: codice`, `area: contenuti`, `area: infrastruttura`, `area: docs` | Che tipo di lavoro è |
| Pagina | `pagina: globale`, `pagina: progetti`, `pagina: contatti`, `pagina: chi-sono`, `pagina: servizi`, `pagina: preventivatore`, `pagina: home` | Pagina coinvolta |
| Senza codice | `senza codice` | Task chiuso da una PR di sola documentazione |

## Storie e task

### M1 — Bozza completa (entro 2026-12-15)

| ID | Storia / task | Fase | Area | Dipende da | Issue | Stato |
| --- | --- | --- | --- | --- | --- | --- |
| **S-01** | **Organizzazione del lavoro su GitHub** | F0 | docs | — | [#1](https://github.com/Baldi00-C/SandraDiScipio/issues/1) | FATTO |
| T-01.1 | Label, milestone, storie e task su GitHub; numeri delle issue in questo file | F0 | docs | — | [#2](https://github.com/Baldi00-C/SandraDiScipio/issues/2) | FATTO |
| **S-02** | **Base comune in Figma** | F1 | design | S-01 | [#3](https://github.com/Baldi00-C/SandraDiScipio/issues/3) | FATTO |
| T-02.1 | Collegare Figma all'agente e creare il file del sito | F1 | design | — | [#4](https://github.com/Baldi00-C/SandraDiScipio/issues/4) | FATTO |
| T-02.2 | Stile: colori, font, scala tipografica, spaziature, griglia (mobile e desktop) | F1 | design | T-02.1 | [#5](https://github.com/Baldi00-C/SandraDiScipio/issues/5) | FATTO |
| T-02.3 | Elementi globali: menu, footer, selettore lingua, pulsante WhatsApp | F1 | design | T-02.2 | [#6](https://github.com/Baldi00-C/SandraDiScipio/issues/6) | FATTO |
| T-02.4 | Componenti comuni: pulsanti, card progetto, campi dei form, messaggi di conferma ed errore | F1 | design | T-02.2 | [#7](https://github.com/Baldi00-C/SandraDiScipio/issues/7) | FATTO |
| **S-03** | **Setup tecnico** | F2 | infrastruttura | S-01 | [#8](https://github.com/Baldi00-C/SandraDiScipio/issues/8) | IN CORSO |
| T-03.1 | Archiviare il POC (tag Git) e creare il nuovo progetto Astro + TypeScript + Tailwind 4 | F2 | codice | — | [#9](https://github.com/Baldi00-C/SandraDiScipio/issues/9) | FATTO |
| T-03.2 | Struttura multilingua `/it/` `/en/` `/es/`, file di traduzione, hreflang con `x-default` in inglese | F2 | codice | T-03.1 | [#10](https://github.com/Baldi00-C/SandraDiScipio/issues/10) | FATTO |
| T-03.3 | Lingua del visitatore: scelta ricordata → browser → inglese (D-046) | F2 | codice | T-03.2 | [#11](https://github.com/Baldi00-C/SandraDiScipio/issues/11) | FATTO |
| T-03.4 | Cloudflare: adapter, deploy di `main`, anteprime delle PR, sito non indicizzato fino a M2 | F2 | infrastruttura | T-03.1 | [#12](https://github.com/Baldi00-C/SandraDiScipio/issues/12) | DA FARE |
| T-03.5 | GitHub Actions: astro check, ESLint, Prettier, test unitari | F2 | infrastruttura | T-03.1 | [#13](https://github.com/Baldi00-C/SandraDiScipio/issues/13) | FATTO |
| T-03.6 | GitHub Actions: Playwright, axe, controllo link rotti | F2 | infrastruttura | T-03.5 | [#14](https://github.com/Baldi00-C/SandraDiScipio/issues/14) | DA FARE |
| T-03.7 | Token di Tailwind ed elementi globali dal Figma (layout base di tutte le pagine) | F2 | codice | T-02.3, T-03.2 | [#15](https://github.com/Baldi00-C/SandraDiScipio/issues/15) | FATTO |
| T-03.8 | Storybook con il design system dal Figma: token Tailwind, colori, tipografia, spaziature (D-055) | F2 | codice | T-02.1, T-03.1 | [#69](https://github.com/Baldi00-C/SandraDiScipio/issues/69) | FATTO |
| T-03.9 | Knowledge base agenti, skill di sviluppo/review e convenzioni Prettier (D-078 … D-081) | F2 | docs | T-03.5, T-03.8 | [#72](https://github.com/Baldi00-C/SandraDiScipio/issues/72) | FATTO |
| **S-04** | **Progetti in bozza** | F3 | codice | S-02, S-03 | [#16](https://github.com/Baldi00-C/SandraDiScipio/issues/16) | FATTO |
| T-04.1 | Mockup di elenco e scheda progetto | F3 | design | T-02.4 | [#17](https://github.com/Baldi00-C/SandraDiScipio/issues/17) | FATTO |
| T-04.2 | Content collection dei progetti con i 3 progetti professionali del POC | F3 | contenuti | T-03.2 | [#18](https://github.com/Baldi00-C/SandraDiScipio/issues/18) | FATTO |
| T-04.3 | Pagina elenco con i gruppi Non conclusi e Conclusi | F3 | codice | T-04.1, T-04.2, T-03.7 | [#19](https://github.com/Baldi00-C/SandraDiScipio/issues/19) | FATTO |
| T-04.4 | Scheda progetto: parte digitale, parte interior, prima/dopo | F3 | codice | T-04.3 | [#20](https://github.com/Baldi00-C/SandraDiScipio/issues/20) | FATTO |
| **S-05** | **Contatti in bozza** | F3 | codice | S-04 | [#21](https://github.com/Baldi00-C/SandraDiScipio/issues/21) | IN CORSO |
| T-05.1 | Mockup della pagina Contatti | F3 | design | T-02.4 | [#22](https://github.com/Baldi00-C/SandraDiScipio/issues/22) | FATTO |
| T-05.2 | Pagina con WhatsApp (messaggio precompilato), email, telefono | F3 | codice | T-05.1, T-03.7 | [#23](https://github.com/Baldi00-C/SandraDiScipio/issues/23) | DA FARE |
| T-05.3 | Form contatti ed endpoint: email a Sandra e copia all'utente con Resend, modelli per lingua | F3 | codice | T-05.2 | [#24](https://github.com/Baldi00-C/SandraDiScipio/issues/24) | DA FARE |
| T-05.4 | Anti-spam: Turnstile, honeypot, limite di invii | F3 | codice | T-05.3 | [#25](https://github.com/Baldi00-C/SandraDiScipio/issues/25) | DA FARE |
| **S-06** | **Chi sono in bozza** | F3 | codice | S-05 | [#26](https://github.com/Baldi00-C/SandraDiScipio/issues/26) | DA FARE |
| T-06.1 | Mockup della pagina Chi sono | F3 | design | T-02.4 | [#27](https://github.com/Baldi00-C/SandraDiScipio/issues/27) | DA FARE |
| T-06.2 | Pagina Chi sono con segnaposto | F3 | codice | T-06.1, T-03.7 | [#28](https://github.com/Baldi00-C/SandraDiScipio/issues/28) | DA FARE |
| **S-07** | **Servizi in bozza** | F3 | codice | S-06 | [#29](https://github.com/Baldi00-C/SandraDiScipio/issues/29) | DA FARE |
| T-07.1 | Mockup della pagina Servizi | F3 | design | T-02.4 | [#30](https://github.com/Baldi00-C/SandraDiScipio/issues/30) | DA FARE |
| T-07.2 | Pagina Servizi con i collegamenti ai percorsi del preventivatore | F3 | codice | T-07.1, T-03.7 | [#31](https://github.com/Baldi00-C/SandraDiScipio/issues/31) | DA FARE |
| **S-08** | **Preventivatore in bozza** | F3 | codice | S-07 | [#32](https://github.com/Baldi00-C/SandraDiScipio/issues/32) | DA FARE |
| T-08.1 | Revisione delle domande dei questionari con l'utente (D-019) | F3 | docs | — | [#33](https://github.com/Baldi00-C/SandraDiScipio/issues/33) | DA FARE |
| T-08.2 | Mockup: scelta del percorso e i due questionari | F3 | design | T-08.1, T-02.4 | [#34](https://github.com/Baldi00-C/SandraDiScipio/issues/34) | DA FARE |
| T-08.3 | Pagina di scelta del percorso | F3 | codice | T-08.2, T-03.7 | [#35](https://github.com/Baldi00-C/SandraDiScipio/issues/35) | DA FARE |
| T-08.4 | Questionario Chiavi in mano | F3 | codice | T-08.3, T-05.3 | [#36](https://github.com/Baldi00-C/SandraDiScipio/issues/36) | DA FARE |
| T-08.5 | Questionario Solo progetto (4 passaggi) | F3 | codice | T-08.3, T-05.3 | [#37](https://github.com/Baldi00-C/SandraDiScipio/issues/37) | DA FARE |
| T-08.6 | Allegati: riduzione delle foto nel browser, controlli, prova con 20 MB su Cloudflare | F3 | codice | T-08.4 | [#38](https://github.com/Baldi00-C/SandraDiScipio/issues/38) | DA FARE |
| **S-09** | **Home in bozza** | F3 | codice | S-08 | [#39](https://github.com/Baldi00-C/SandraDiScipio/issues/39) | FATTO |
| T-09.1 | Decidere progetti in evidenza ed elementi extra (D-012, D-016) | F3 | docs | — | [#40](https://github.com/Baldi00-C/SandraDiScipio/issues/40) | FATTO |
| T-09.2 | Mockup della Home | F3 | design | T-09.1, T-02.4 | [#41](https://github.com/Baldi00-C/SandraDiScipio/issues/41) | FATTO |
| T-09.3 | Pagina Home | F3 | codice | T-09.2, T-03.7 | [#42](https://github.com/Baldi00-C/SandraDiScipio/issues/42) | FATTO |

### M2 — V.0 online (entro 2027-01-31)

| ID | Storia / task | Fase | Area | Dipende da | Issue | Stato |
| --- | --- | --- | --- | --- | --- | --- |
| **S-10** | **Contenuti reali** | F4 | contenuti | M1 | [#43](https://github.com/Baldi00-C/SandraDiScipio/issues/43) | DA FARE |
| T-10.1 | Testi e foto di Chi sono nella pagina (materiale entro 2026-12-15) | F4 | contenuti | T-06.2 | [#44](https://github.com/Baldi00-C/SandraDiScipio/issues/44) | DA FARE |
| T-10.2 | Progetti universitari nella content collection (materiale entro 2026-12-15) | F4 | contenuti | T-04.2 | [#45](https://github.com/Baldi00-C/SandraDiScipio/issues/45) | DA FARE |
| **S-11** | **Pagine fatte** (livello "Fatta", D-042: testi IT definitivi, EN/ES dall'AI, slug, SEO della pagina, rifinitura) | F4 | codice | S-10 | [#46](https://github.com/Baldi00-C/SandraDiScipio/issues/46) | DA FARE |
| T-11.1 | Progetti fatta | F4 | codice | T-10.2 | [#47](https://github.com/Baldi00-C/SandraDiScipio/issues/47) | DA FARE |
| T-11.2 | Contatti fatta | F4 | codice | S-05 | [#48](https://github.com/Baldi00-C/SandraDiScipio/issues/48) | DA FARE |
| T-11.3 | Chi sono fatta | F4 | codice | T-10.1 | [#49](https://github.com/Baldi00-C/SandraDiScipio/issues/49) | DA FARE |
| T-11.4 | Servizi fatta | F4 | codice | S-07 | [#50](https://github.com/Baldi00-C/SandraDiScipio/issues/50) | DA FARE |
| T-11.5 | Preventivatore fatta (testi delle email inclusi; chiedere prima D-017) | F4 | codice | S-08 | [#51](https://github.com/Baldi00-C/SandraDiScipio/issues/51) | DA FARE |
| T-11.6 | Home fatta | F4 | codice | T-11.1 … T-11.5 | [#52](https://github.com/Baldi00-C/SandraDiScipio/issues/52) | DA FARE |
| T-11.7 | SEO globale: sitemap, robots.txt, canonici, schema.org, Open Graph predefinito | F4 | codice | T-03.2 | [#53](https://github.com/Baldi00-C/SandraDiScipio/issues/53) | DA FARE |
| **S-12** | **Dominio, email e policy** | F5 | infrastruttura | — | [#54](https://github.com/Baldi00-C/SandraDiScipio/issues/54) | DA FARE |
| T-12.1 | Acquisto di `sandradiscipio.com` e DNS su Cloudflare (entro 2027-01-10) | F5 | infrastruttura | — | [#55](https://github.com/Baldi00-C/SandraDiScipio/issues/55) | DA FARE |
| T-12.2 | Email e numero definitivi sul sito (entro 2027-01-10) | F5 | contenuti | — | [#56](https://github.com/Baldi00-C/SandraDiScipio/issues/56) | DA FARE |
| T-12.3 | Verifica del dominio in Resend ed Email Routing per `info@` | F5 | infrastruttura | T-12.1 | [#57](https://github.com/Baldi00-C/SandraDiScipio/issues/57) | DA FARE |
| T-12.4 | Iubenda: privacy e cookie policy IT/EN/ES collegate nel footer (entro 2027-01-10) | F5 | codice | — | [#58](https://github.com/Baldi00-C/SandraDiScipio/issues/58) | DA FARE |
| **S-13** | **Revisione e collaudo** | F5 | docs | S-11, S-12 | [#59](https://github.com/Baldi00-C/SandraDiScipio/issues/59) | DA FARE |
| T-13.1 | Revisione umana unica dei testi EN/ES e correzioni (D-040) | F5 | contenuti | S-11 | [#60](https://github.com/Baldi00-C/SandraDiScipio/issues/60) | DA FARE |
| T-13.2 | Collaudo finale: form e questionari con email vere, Lighthouse | F5 | docs | T-12.3, T-13.1 | [#61](https://github.com/Baldi00-C/SandraDiScipio/issues/61) | DA FARE |
| **S-14** | **Pubblicazione** | F5 | infrastruttura | S-13 | [#62](https://github.com/Baldi00-C/SandraDiScipio/issues/62) | DA FARE |
| T-14.1 | Collegare il dominio, attivare l'indicizzazione, registrare Google Search Console | F5 | infrastruttura | T-13.2 | [#63](https://github.com/Baldi00-C/SandraDiScipio/issues/63) | DA FARE |

## Primo step

1. **T-01.1** ([#2](https://github.com/Baldi00-C/SandraDiScipio/issues/2)): label, milestone, storie e task creati su GitHub il 2026-11-21; si chiude con la PR che porta questa documentazione su `main`.
2. Poi in parallelo **T-02.1** (Figma) e **T-03.1** (nuovo progetto).
