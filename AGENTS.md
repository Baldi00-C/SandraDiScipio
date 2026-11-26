# Istruzioni per agenti AI

Progetto: sito portfolio multilingua (IT, EN, ES) di Sandra Di Scipio, architetta e interior designer.

**Prima di qualsiasi lavoro leggi [docs/README.md](docs/README.md).** La cartella `docs/` è la fonte di verità su idea, requisiti, decisioni e modo di lavorare.

Regole essenziali (dettagli in [docs/05-modo-di-lavorare.md](docs/05-modo-di-lavorare.md)):

- Rispondi sempre in italiano. Il codice invece è tutto in inglese: nomi, commenti, configurazioni, CI (D-054).
- Fai una domanda alla volta.
- Prima il business, poi la tecnologia: non proporre scelte tecniche finché non sono state chiuse le decisioni di business.
- Il codice del sito V.0 è in `src/` (nuovo progetto, T-03.1). Il POC è archiviato in `poc/` e nel tag Git `poc`: solo riferimento, non base vincolante (D-001, D-050).
- Registra ogni nuova decisione in [docs/04-decisioni.md](docs/04-decisioni.md).

## Knowledge base operativa

Dopo l'indice di progetto, consulta [docs/agent_kb/README.md](docs/agent_kb/README.md). Leggi solo gli approfondimenti pertinenti al lavoro:

- [Contesto e mappa del codice](docs/agent_kb/project_context.md): prima di modificare il sito; distingue funzionalità presenti e pianificate.
- [Convenzioni del codice](docs/agent_kb/code_conventions.md): lingua, Prettier, TypeScript, multilingua e design system.
- [Verifiche e pull request](docs/agent_kb/verification_and_prs.md): comandi reali, controlli ancora da implementare e flusso Git.

Questi documenti raccolgono le decisioni esistenti; i requisiti e il registro in `docs/` restano le fonti canoniche. [Convenzioni e skill](docs/agent_kb/proposals.md) descrive le pratiche adottate con D-080. `CLAUDE.md` rimanda a questo file per mantenere una sola base di istruzioni.

## Skill del repository (D-080)

Le skill condivise sono in `.agents/skills/`. Leggi solo quella pertinente:

- `feature-developer`: feature e bugfix, test di comportamento, storie per UI riusabile e controlli finali.
- `pr-reviewer`: review del diff prima della PR, con una sola passata e contesto limitato. Preferisci un modello semplice quando selezionabile; niente orchestrazioni multi-modello automatiche.
- `quality-checker`: verifiche del repository e build Storybook quando pertinente.
- `design-token-sync`, `localization-specialist`, `page-reviewer`, `security-reviewer`: approfondimenti sulle sole superfici coinvolte.

Aggiorna la knowledge base quando cambia ciò che descrive. Riporta solo verifiche eseguite, preserva le modifiche dell'utente e mantieni la PR circoscritta. Le skill non introducono pubblicazioni, merge o deploy automatici.
