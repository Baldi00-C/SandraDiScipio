---
title: Indice della documentazione di progetto
progetto: Sito portfolio Sandra Di Scipio
versione_prodotto: V.0
fase_corrente: F1 base comune in Figma fatta (T-02.1 → T-02.4), F2 setup tecnico in corso (T-03.1, T-03.2, T-03.5 fatti)
ultimo_aggiornamento: 2026-11-23
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
| Design (mockup Figma) | IN CORSO | File [SandraDiScipio](https://www.figma.com/design/Zl3k5Q7AegYlr0mGOQa6YQ/SandraDiScipio) collegato (D-048); adottata la guida di stile esistente come base (D-049). T-02.2 fatto: font ospitabili (D-056), scala tipografica desktop e mobile (D-057), spaziature (D-058), griglia (D-059), logo nel menu e nel footer (D-060). T-02.3 fatto: menu desktop e mobile con menu a schermo intero (D-061), selettore lingua (D-062), pulsante WhatsApp (D-063), footer con riga legale (D-064), stati hover e focus (D-065). T-02.4 fatto: pulsanti (D-066), card progetto (D-067), campi dei form con menu a tendina e allegati (D-068), messaggi (D-069). Prossimo: mockup delle pagine (F3) |
| Scelte tecniche (stack, hosting, email) | DECISE | [06-stack-tecnologico.md](06-stack-tecnologico.md): Astro + Tailwind su Cloudflare, email con Resend |
| Sviluppo V.0 | IN CORSO | Setup tecnico (F2) in parallelo alla base Figma (D-038). T-03.1 fatto: nuovo progetto in `src/`, POC in `poc/` (D-050). T-03.2 fatto: struttura `/it/` `/en/` `/es/` (D-051). T-03.5 fatto: test, lint, formattazione e CI (D-052), `main` protetto (D-053). Prossimo: T-03.3 |

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

## Regole per aggiornare questa documentazione

1. Ogni nuova decisione va in [04-decisioni.md](04-decisioni.md) con ID, data, stato e motivazione.
2. Se una decisione cambia un requisito, aggiorna anche il file del requisito e cita l'ID della decisione (es. `→ D-006`).
3. Non cancellare le decisioni superate: segnalale come `SUPERATA da D-0xx`.
4. Aggiorna `ultimo_aggiornamento` nel frontmatter dei file modificati.
5. Scrivi in italiano, con frasi brevi e affermazioni esplicite (niente "forse", "eventualmente" senza stato).

## Fonti

- Brief iniziale dell'utente (riportato in [01-visione.md](01-visione.md)).
- Documento condiviso "Sito Sandra Di Scipio — Requisiti business V.0": https://claude.ai/artifact/1WuAXzp3ijbTxXSqarn1Yr (stesso contenuto di questi file al 2026-11-21; in caso di differenze, vale `docs/`).
