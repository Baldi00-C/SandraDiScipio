---
title: Indice della documentazione di progetto
progetto: Sito portfolio Sandra Di Scipio
versione_prodotto: V.0
fase_corrente: requisiti business (chiusi) → prossima fase: mockup in Figma
ultimo_aggiornamento: 2026-11-21
lingua: italiano
---

# Documentazione di progetto — Sito portfolio Sandra Di Scipio

> **Per agenti AI e LLM: leggi questo file per primo.** Indica cosa è deciso, dove si trova e come lavorare con l'utente. Le cartelle `docs/` sono la fonte di verità sui requisiti; il codice in `src/` NON lo è (vedi "Stato del codice").

## In una frase

Sito portfolio multilingua (IT, EN, ES) per **Sandra Di Scipio**, architetta e interior designer che avvia l'attività in proprio: presenta lei e i suoi progetti e raccoglie richieste di preventivo tramite questionari inviati per email.

## Stato del progetto

| Area | Stato | Dettaglio |
| --- | --- | --- |
| Requisiti business V.0 | CHIUSI | [02-requisiti-business.md](02-requisiti-business.md), [03-preventivatore.md](03-preventivatore.md) |
| Design (mockup Figma) | NON INIZIATO | Deciso il metodo: mockup in Figma prima del codice. Avvio rimandato dall'utente |
| Scelte tecniche (stack, hosting, email) | NON INIZIATE | Rimandate di proposito: si decidono dopo il business |
| Sviluppo V.0 | NON INIZIATO | Si riparte da zero |

## Stato del codice (importante)

Il codice presente nel repository (`src/`, Astro + Tailwind, invio email con Resend) è un **POC**. L'utente ha deciso di **ripartire da zero**, dal design allo sviluppo.

- NON considerare il POC come base vincolante per stile, struttura o tecnologia.
- Si possono riusare i **contenuti** del POC (testi, foto dei progetti in `src/assets/projects/`, dati di contatto in `src/data/site.ts`) come materiale di partenza.
- Le scelte tecniche del POC (Astro, Resend, adapter Node) NON sono decisioni confermate.

## Mappa dei documenti

| File | Contenuto | Quando leggerlo |
| --- | --- | --- |
| [01-visione.md](01-visione.md) | Idea, obiettivi, pubblico, lingue | Sempre, per il contesto |
| [02-requisiti-business.md](02-requisiti-business.md) | Pagine del sito e cosa contiene ciascuna, con ID dei requisiti | Prima di disegnare o sviluppare una pagina |
| [03-preventivatore.md](03-preventivatore.md) | Flusso del preventivatore e bozze dei due questionari | Prima di lavorare su preventivatore, form o email |
| [04-decisioni.md](04-decisioni.md) | Registro delle decisioni: decise, rimandate, aperte | Prima di proporre qualcosa: verifica che non sia già deciso |
| [05-modo-di-lavorare.md](05-modo-di-lavorare.md) | Come collaborare con l'utente, ruoli, regole | Sempre, prima di fare domande o proporre lavoro |
| [glossario.md](glossario.md) | Termini del dominio e del progetto | Quando un termine è ambiguo |

## Regole per aggiornare questa documentazione

1. Ogni nuova decisione va in [04-decisioni.md](04-decisioni.md) con ID, data, stato e motivazione.
2. Se una decisione cambia un requisito, aggiorna anche il file del requisito e cita l'ID della decisione (es. `→ D-006`).
3. Non cancellare le decisioni superate: segnalale come `SUPERATA da D-0xx`.
4. Aggiorna `ultimo_aggiornamento` nel frontmatter dei file modificati.
5. Scrivi in italiano, con frasi brevi e affermazioni esplicite (niente "forse", "eventualmente" senza stato).

## Fonti

- Brief iniziale dell'utente (riportato in [01-visione.md](01-visione.md)).
- Documento condiviso "Sito Sandra Di Scipio — Requisiti business V.0": https://claude.ai/artifact/1WuAXzp3ijbTxXSqarn1Yr (stesso contenuto di questi file al 2026-11-21; in caso di differenze, vale `docs/`).
