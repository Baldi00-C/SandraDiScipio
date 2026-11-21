---
title: Registro delle decisioni
ultimo_aggiornamento: 2026-11-21
---

# Registro delle decisioni

Legenda stato:
- `DECISO` — vincolante; non riproporre alternative se l'utente non lo chiede.
- `RIMANDATO` — si decide nella fase indicata in "Quando"; chiedi all'utente solo quando si arriva lì.
- `APERTO` — da decidere, nessuna fase indicata.
- `SUPERATA da D-0xx` — non più valida.

Regola: prima di fare una domanda all'utente, controlla qui che la risposta non ci sia già.

| ID | Data | Tema | Decisione | Stato | Quando / Note |
| --- | --- | --- | --- | --- | --- |
| D-001 | 2026-11-21 | Punto di partenza | Il sito esistente è un POC. Si riparte da zero, dal design allo sviluppo | DECISO | Si possono riusare contenuti e foto del POC |
| D-002 | 2026-11-21 | Metodo di design | Mockup delle pagine in Figma, rivisti insieme, poi sviluppo | DECISO | Avvio dei mockup rimandato dall'utente il 2026-11-21 |
| D-003 | 2026-11-21 | Progetti conclusi | Parte digitale e parte interior (foto reali) stanno nella stessa scheda progetto | DECISO | Non due categorie separate |
| D-004 | 2026-11-21 | Prezzo nel Chiavi in mano | Nessuna cifra mostrata nella V.0 | DECISO | Stima automatica possibile in futuro |
| D-005 | 2026-11-21 | Autore delle domande | Le bozze le scrive l'AI | DECISO | Revisione: vedi D-019 |
| D-006 | 2026-11-21 | Allegati nei questionari | Sì, facoltativi | DECISO | Limiti: D-015 |
| D-007 | 2026-11-21 | Traduzioni EN/ES | Le fa l'AI, poi revisione umana | DECISO | Revisori: D-018 |
| D-008 | 2026-11-21 | Contenuti Chi sono | Li fornisce l'utente in fase di sviluppo | RIMANDATO | Fase: sviluppo di Chi sono |
| D-009 | 2026-11-21 | Dopo l'invio di un form | Email a Sandra + copia di riepilogo all'utente | DECISO | Vale per questionari e form contatti |
| D-010 | 2026-11-21 | Pubblico | Chiunque sia interessato; nessun target unico | DECISO | |
| D-011 | 2026-11-21 | Pagina Servizi | Resta come pagina a sé nel menu | DECISO | Non era nel brief, aggiunta su decisione dell'utente |
| D-012 | 2026-11-21 | Progetti in evidenza in Home | — | RIMANDATO | Fase: sviluppo della Home |
| D-013 | 2026-11-21 | Progetti universitari | Elenco e materiale li fornisce l'utente | RIMANDATO | Fase: sviluppo di Progetti |
| D-014 | 2026-11-21 | Lingua delle email a Sandra | La lingua in cui l'utente ha compilato il form | DECISO | |
| D-015 | 2026-11-21 | Limiti degli allegati | Max 5 file, 20 MB in tutto; formati JPG, PNG, HEIC, WebP, PDF; foto grandi ridotte nel browser prima dell'invio. La copia all'utente elenca solo i nomi dei file | DECISO | Deciso il 2026-11-21 nelle scelte tecniche. Dettagli in [06-stack-tecnologico.md](06-stack-tecnologico.md) |
| D-016 | 2026-11-21 | Elementi extra in Home | Instagram, recensioni, iscrizione all'Ordine: da valutare | RIMANDATO | Fase: sviluppo della Home |
| D-017 | 2026-11-21 | Tempi di risposta promessi | — | RIMANDATO | Più avanti, nessuna fase indicata |
| D-018 | 2026-11-21 | Revisori EN/ES | Persone di conoscenza dell'utente | DECISO | |
| D-019 | 2026-11-21 | Revisione delle domande | Si rivedono con l'utente quando si sviluppano i questionari, poi le valida Sandra (PO) | DECISO | |
| D-020 | 2026-11-21 | Tecnologia, hosting, dominio, servizio email | Decisi il 2026-11-21, prima dei mockup, su scelta dell'utente: vedi D-021 → D-036 | DECISO | Riepilogo in [06-stack-tecnologico.md](06-stack-tecnologico.md) |
| D-021 | 2026-11-21 | Chi aggiorna i contenuti | Nella V.0 i contenuti (progetti, testi) sono file nel repository, aggiornati dall'utente (anche con un agente AI). Nessun CMS | DECISO | Il CMS per l'autonomia di Sandra è RIMANDATO (D-022) |
| D-022 | 2026-11-21 | CMS per Sandra | Da valutare: CMS che lavora sugli stessi file (es. Keystatic, Decap) o CMS online | RIMANDATO | Fase: dopo la pubblicazione della V.0 |
| D-023 | 2026-11-21 | Framework e linguaggio | Astro + TypeScript | DECISO | Sito di contenuti quasi tutto statico; immagini e i18n inclusi; già provato nel POC |
| D-024 | 2026-11-21 | Styling | Tailwind CSS 4, token (colori, font, spaziature) allineati ai mockup Figma | DECISO | |
| D-025 | 2026-11-21 | Indirizzi multilingua | Prefisso per tutte le lingue (`/it/`, `/en/`, `/es/`) con slug tradotti; la radice `/` porta alla lingua del browser; hreflang tra le versioni | DECISO | Fallback e memoria della scelta: D-046 |
| D-026 | 2026-11-21 | Hosting | Cloudflare (Workers con asset statici, adapter ufficiale Astro), piano gratuito | DECISO | Accetta invii fino a 100 MB (allegati). Se l'elaborazione degli allegati supera i limiti di CPU del piano gratuito, si passa al piano da 5 $/mese |
| D-027 | 2026-11-21 | Servizio email | Resend: email a Sandra e copia all'utente, modelli nel codice, uno per lingua; invio dal dominio verificato | DECISO | Piano gratuito: 3.000 email/mese, 100/giorno, max 40 MB per email |
| D-028 | 2026-11-21 | Dominio | `sandradiscipio.com`, da registrare su Cloudflare Registrar; DNS su Cloudflare | DECISO | Al 2026-11-21 risulta libero, non ancora acquistato. Da comprare prima della pubblicazione |
| D-029 | 2026-11-21 | Indirizzo email sul dominio | `info@sandradiscipio.com` con inoltro gratuito (Cloudflare Email Routing) alla Gmail di Sandra | DECISO | Casella vera a pagamento valutabile in futuro. Email e numero definitivi restano da confermare (REQ-CONT-6) |
| D-030 | 2026-11-21 | Anti-spam | Cloudflare Turnstile + campo honeypot + limite di invii per indirizzo | DECISO | Niente reCAPTCHA (cookie di Google, GDPR) |
| D-031 | 2026-11-21 | Analytics | Cloudflare Web Analytics, senza cookie | DECISO | |
| D-032 | 2026-11-21 | Cookie e consenso | Nessun cookie di profilazione, quindi nessun banner. Font ospitati sul sito; nessun contenuto esterno (Instagram, Maps, video) senza consenso | DECISO | Se si aggiungono servizi con cookie, serve il banner |
| D-033 | 2026-11-21 | Testi privacy e cookie policy | Iubenda, in IT, EN, ES | DECISO | Piano e costo da verificare all'acquisto |
| D-034 | 2026-11-21 | SEO | Pacchetto base: title e description per lingua, hreflang, sitemap, robots.txt, Open Graph, schema.org, alt delle immagini, Google Search Console | DECISO | Profilo Google Business: RIMANDATO, dopo la pubblicazione |
| D-035 | 2026-11-21 | Test e qualità | Completa: astro check, ESLint, Prettier, Playwright (form, questionari, cambio lingua), test unitari su questionari ed email, axe per l'accessibilità, controllo link rotti, in GitHub Actions su ogni PR; Lighthouse prima del rilascio | DECISO | |
| D-036 | 2026-11-21 | Flusso Git e deploy | Branch per funzionalità → pull request con controlli e anteprima Cloudflare → merge su `main` = produzione. Commit convenzionali. Chiavi segrete solo nelle variabili d'ambiente di Cloudflare | DECISO | Nessun ambiente di staging fisso |
| D-037 | 2026-11-21 | Alternanza design e sviluppo | Prima una base comune in Figma (stile: colori, font, spaziature; menu, footer, selettore lingua, pulsante WhatsApp, componenti comuni). Poi pagina per pagina: mockup → approvazione dell'utente → sviluppo | DECISO | Precisa D-002. Dettagli in [07-roadmap.md](07-roadmap.md) |
| D-038 | 2026-11-21 | Momento del setup tecnico | Il setup del nuovo progetto (Astro da zero, struttura IT/EN/ES, GitHub Actions, Cloudflare con anteprime) si fa in parallelo alla base Figma | DECISO | Lo stile si applica al codice quando la base Figma è pronta |
| D-039 | 2026-11-21 | Ordine delle pagine | Progetti (elenco e schede) → Contatti (form ed email) → Chi sono → Servizi → Preventivatore (due questionari) → Home per ultima | DECISO | Progetti: materiale già disponibile. Contatti: porta prima il flusso email riusato dai questionari. Home: riassume le altre pagine |
| D-040 | 2026-11-21 | Tempi delle traduzioni | Ogni pagina si chiude con testi IT definitivi e traduzione AI in EN/ES. La revisione umana (D-018) si fa in un unico giro su tutto il sito prima della pubblicazione | DECISO | Precisa D-007 |
| D-041 | 2026-11-21 | Revisioni di Sandra (PO) | Non fanno parte della roadmap: le gestisce l'utente | DECISO | Non pianificare né proporre revisioni di Sandra |
| D-042 | 2026-11-21 | Definizione di "fatto" | Due livelli. **Bozza**: mockup approvato, pagina sviluppata almeno in IT, segnaposto ammessi, controlli verdi, PR unita. **Fatta**: mockup approvato; pagina uguale al mockup su mobile e desktop; testi IT definitivi + EN/ES tradotti dall'AI; SEO base della pagina; controlli automatici verdi; PR approvata dall'utente e unita su `main` | DECISO | Il livello "Bozza" serve per la milestone del 2026-12-15 (D-043) |
| D-043 | 2026-11-21 | Date | Entro il **2026-12-15**: sito completo in bozza (tutte le pagine sviluppate almeno in IT, anche con segnaposto) da mostrare. Entro il **2027-01-31**: sito online sul dominio | DECISO | Uniche date fissate dall'utente; le finestre intermedie in [07-roadmap.md](07-roadmap.md) sono indicative |
| D-044 | 2026-11-21 | Scadenze dei materiali | Entro il 2026-12-15: testi e foto di Chi sono (D-008), elenco e materiale dei progetti universitari (D-013). Entro il 2027-01-10: email e numero definitivi (REQ-CONT-6), acquisto del dominio (D-028), attivazione di Iubenda (D-033) | DECISO | Li fornisce l'utente |
| D-045 | 2026-11-21 | Tracciamento dei task | Roadmap in `docs/07-roadmap.md` (fonte di verità). Task operativi come GitHub Issues con l'ID del requisito, chiuse dalle PR. Milestone GitHub: "Bozza completa" (2026-12-15) e "V.0 online" (2027-01-31) | DECISO | |
| D-046 | 2026-11-21 | Lingua mostrata al visitatore | Il visitatore vede il sito nella lingua del suo browser, se è IT, EN o ES; altrimenti in **inglese**. La scelta fatta col selettore vale più del browser ed è ricordata alle visite successive (memoria tecnica, nessun banner). I link con prefisso di lingua si aprono così come sono. `x-default` punta all'inglese | DECISO | Precisa D-025, che prevedeva l'italiano come ripiego. L'italiano resta la lingua in cui nascono i testi |
| D-047 | 2026-11-21 | Struttura su GitHub | Milestone GitHub = milestone della roadmap. Ogni milestone contiene **storie** (issue con label `tipo: storia`). Ogni storia contiene **task** come sotto-issue; ogni task = una PR che lo chiude (`Closes #n`). I lavori senza codice (mockup Figma, materiali, revisioni) si chiudono con una piccola PR che aggiorna `docs/` | DECISO | Precisa D-045. Label in [07-roadmap.md](07-roadmap.md) |
| D-048 | 2026-11-21 | File Figma del sito | Il file del sito è [SandraDiScipio](https://www.figma.com/design/Zl3k5Q7AegYlr0mGOQa6YQ/SandraDiScipio) (Drafts dell'utente). L'agente ci lavora con `figma-console-mcp` e il plugin Desktop Bridge aperto in Figma Desktop | DECISO | Collegamento verificato il 2026-11-21 (lettura e scrittura). Il token Figma è una credenziale dell'utente: l'agente non lo legge né lo mostra |
| D-049 | 2026-11-21 | Punto di partenza della base Figma | Si adotta la guida di stile già presente nel file (Foundations, Components, Patterns, Claude Code handoff, Motion principles) e le 9 pagine statiche del sito come base di F1. Le verifiche e le aggiunte mancanti si fanno nei task T-02.2 → T-02.4 | DECISO | Da verificare in T-02.2: font ospitabili (D-032), stili di testo da creare. Da aggiungere in T-02.3/T-02.4 se mancano: selettore lingua, pulsante WhatsApp, card progetto. Riepilogo in [07-roadmap.md](07-roadmap.md) |
| D-050 | 2026-11-21 | Archivio del POC | Il POC è salvato nel tag Git `poc` e spostato per intero nella cartella `poc/` (codice, `package.json`, asset). La cartella è esclusa da build, `astro check`, lint e test. Il nuovo progetto V.0 parte nella radice del repository | DECISO | Scelta dell'utente in T-03.1. I contenuti riusabili (foto, testi dei progetti, dati di contatto) si prendono da `poc/` quando servono (T-04.2, T-05.2) |
