---
name: sandra-verify
description: "Esegui i controlli del sito e, quando pertinente, la build Storybook; riporta risultati e lacune. Usare dopo modifiche a codice, test o configurazione."
---

# Verifica della modifica

Leggi `docs/agent_kb/verification_and_prs.md`. Usa Node 24 come indicato in `.nvmrc` e il lockfile del repository; installa con `npm ci` se necessario, senza modificare l'ambiente globale.

- Dopo modifiche a codice/configurazione esegui `npm run verify`: tipi, lint, Prettier, Vitest e build.
- Per storie, token o configurazione Storybook esegui anche `npm run build-storybook`.
- Per soli Markdown o skill controlla frontmatter, link locali e coerenza delle istruzioni: non avviare build senza un motivo concreto.
- Correggi gli errori pertinenti senza disattivare test o indebolire gate. Riesegui i controlli interessati dalle correzioni; riusa quelli validi sullo stesso stato del codice.
- Playwright, axe e link rotti non fanno ancora parte della CI: non attribuirli a `verify`. Non inviare email vere dai test automatici.

Riporta comandi effettivi, esiti e verifiche non eseguite. Build riuscita e controlli statici non sostituiscono la verifica visiva o il collaudo dei servizi esterni.
