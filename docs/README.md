---
title: Indice della documentazione di progetto
progetto: Sito portfolio Sandra Di Scipio
versione_prodotto: V.0
fase_corrente: F1 base comune in Figma fatta (T-02.1 → T-02.4), F2 setup tecnico in corso (T-03.1, T-03.2, T-03.3, T-03.5, T-03.7, T-03.8, T-03.9 fatti)
ultimo_aggiornamento: 2026-11-26
lingua: italiano
---

# Documentazione di progetto — Sito portfolio Sandra Di Scipio

> **Per agenti AI e LLM: leggi questo file per primo.** Indica cosa è deciso, dove si trova e come lavorare con l'utente. Le cartelle `docs/` sono la fonte di verità sui requisiti; il codice del POC in `poc/` NON lo è (vedi "Stato del codice").

## In una frase

Sito portfolio multilingua (IT, EN, ES) per **Sandra Di Scipio**, architetta e interior designer che avvia l'attività in proprio: presenta lei e i suoi progetti e raccoglie richieste di preventivo tramite questionari inviati per email.

## Stato del progetto

| Area | Stato | Dettaglio |
| --- | --- | --- |
| Requisiti business V.0 | CHIUSI | [02-requisiti-business.md](02-requisiti-business.md), [03-preventivatore.md](03-preventivatore.md) |
| Roadmap V.0 | DEFINITA | [07-roadmap.md](07-roadmap.md): bozza completa entro 2026-12-15, online entro 2027-01-31. Storie e task su [GitHub Issues](https://github.com/Baldi00-C/SandraDiScipio/issues) |
| Design (mockup Figma) | IN CORSO | File [SandraDiScipio](https://www.figma.com/design/Zl3k5Q7AegYlr0mGOQa6YQ/SandraDiScipio) collegato (D-048); adottata la guida di stile esistente come base (D-049). T-02.2 fatto: font ospitabili (D-057), scala tipografica desktop e mobile (D-058), spaziature (D-059), griglia (D-060), logo nel menu e nel footer (D-061). T-02.3 fatto: menu desktop e mobile con menu a schermo intero (D-062), selettore lingua (D-063), pulsante WhatsApp (D-064), footer con riga legale (D-065), stati hover e focus (D-066). T-02.4 fatto: pulsanti (D-067), card progetto (D-068), campi dei form con menu a tendina e allegati (D-069), messaggi (D-070). F3: mockup di Progetti fatto (T-04.1: elenco, scheda, visore, D-071 → D-073) e di Contatti (T-05.1: due colonne, oggetto a tendina, messaggio WhatsApp, conferma al posto del form, D-074 → D-077); Home approvata con le immagini di esempio (D-090). Prossimo: T-06.1 Chi sono |
| Scelte tecniche (stack, hosting, email) | DECISE | [06-stack-tecnologico.md](06-stack-tecnologico.md): Astro + Tailwind su Cloudflare, email con Resend |
| Sviluppo V.0 | IN CORSO | Setup tecnico (F2) in parallelo alla base Figma (D-038). T-03.1 fatto: nuovo progetto in `src/`, POC in `poc/` (D-050). T-03.2 fatto: struttura `/it/` `/en/` `/es/` (D-051). T-03.3 fatto: lingua del visitatore sulla radice (D-056). T-03.4 fatto: deploy su Cloudflare con Workers Builds e anteprime delle PR, sito non indicizzato fino a M2 (D-089). T-03.5 fatto: test, lint, formattazione e CI (D-052), `main` protetto (D-053). T-03.7 fatto: token aggiornati a T-02.2, header, menu mobile, selettore lingua, footer e pulsante WhatsApp in ogni pagina, pagine segnaposto con slug tradotti (D-082, D-083). F3: T-04.2 fatto, content collection dei 3 progetti professionali del POC in IT, EN ed ES più un progetto universitario segnaposto (D-084, D-085). T-04.3 fatto: pagina elenco Progetti nelle tre lingue con card, intestazioni di sezione, invito al preventivo e pulsante (D-086). T-04.4 fatto: scheda progetto professionale e universitaria con visore delle immagini (D-087); Progetti in bozza (S-04) completo. T-05.2 fatto: pagina Contatti con WhatsApp, email e telefono nelle tre lingue, form in T-05.3 (D-088). T-09.3 fatto in anticipo per l'anteprima: Home in bozza con immagini di esempio e progetti veri (D-090). Motion del design system nelle pagine fatte: entrate allo scroll, tende sulle foto, dissolvenza della pagina, alone WhatsApp, rispetto di "riduci movimento" (D-091). Prossimo: T-05.3, che richiede l'endpoint su Cloudflare (T-03.4) |

## Stato del codice (importante)

Il primo codice del repository (Astro + Tailwind, invio email con Resend) è un **POC**. L'utente ha deciso di **ripartire da zero**, dal design allo sviluppo. Con T-03.1 il POC è stato archiviato nel tag Git `poc` e spostato nella cartella `poc/`, esclusa da build e controlli (D-050). Il nuovo progetto V.0 è nella radice (`src/`, `package.json`).

- NON considerare il POC come base vincolante per stile, struttura o tecnologia.
- Si possono riusare i **contenuti** del POC (testi, foto dei progetti in `poc/src/assets/projects/`, dati di contatto in `poc/src/data/site.ts`) come materiale di partenza.
- Lo stack deciso ([06-stack-tecnologico.md](06-stack-tecnologico.md)) riprende Astro, Tailwind e Resend, ma con hosting Cloudflare al posto dell'adapter Node e una nuova struttura multilingua. Il codice del POC resta solo un riferimento.

## Mappa dei documenti

| File | Contenuto | Quando leggerlo |
| --- | --- | --- |
| [01-visione.md](01-visione.md) | Idea, obiettivi, pubblico, lingue | Sempre, per il contesto |
| [02-requisiti-business.md](02-requisiti-business.md) | Pagine del sito e cosa contiene ciascuna, con ID dei requisiti | Prima di disegnare o sviluppare una pagina |
| [03-preventivatore.md](03-preventivatore.md) | Flusso del preventivatore e bozze dei due questionari | Prima di lavorare su preventivatore, form o email |
| [04-decisioni.md](04-decisioni.md) | Registro delle decisioni: decise, rimandate, aperte | Prima di proporre qualcosa: verifica che non sia già deciso |
| [05-modo-di-lavorare.md](05-modo-di-lavorare.md) | Come collaborare con l'utente, ruoli, regole | Sempre, prima di fare domande o proporre lavoro |
| [06-stack-tecnologico.md](06-stack-tecnologico.md) | Stack, hosting, email, multilingua, privacy, SEO, test, flusso Git | Prima di scrivere codice o configurare servizi |
| [07-roadmap.md](07-roadmap.md) | Fasi, milestone, date, dipendenze, materiali da fornire, primi task | Prima di iniziare un lavoro: verifica fase e stato |
| [glossario.md](glossario.md) | Termini del dominio e del progetto | Quando un termine è ambiguo |
| [agent_kb/README.md](agent_kb/README.md) | Contesto operativo per agenti, convenzioni del codice e verifiche | Prima di modificare codice o preparare una PR |
| [agent_kb/proposals.md](agent_kb/proposals.md) | Convenzioni e skill adottate, con origine del confronto | Prima di scegliere la procedura per sviluppo e review |

## Regole per aggiornare questa documentazione

1. Ogni nuova decisione va in [04-decisioni.md](04-decisioni.md) con ID, data, stato e motivazione.
2. Se una decisione cambia un requisito, aggiorna anche il file del requisito e cita l'ID della decisione (es. `→ D-006`).
3. Non cancellare le decisioni superate: segnalale come `SUPERATA da D-0xx`.
4. Aggiorna `ultimo_aggiornamento` nel frontmatter dei file modificati.
5. Scrivi in italiano, con frasi brevi e affermazioni esplicite (niente "forse", "eventualmente" senza stato).

## Fonti

- Brief iniziale dell'utente (riportato in [01-visione.md](01-visione.md)).
- Documento condiviso "Sito Sandra Di Scipio — Requisiti business V.0": https://claude.ai/artifact/1WuAXzp3ijbTxXSqarn1Yr (stesso contenuto di questi file al 2026-11-21; in caso di differenze, vale `docs/`).
