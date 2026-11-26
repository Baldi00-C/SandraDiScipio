---
title: Knowledge base operativa per agenti
ultimo_aggiornamento: 2026-11-21
---

# Knowledge base per agenti

Parti da [../README.md](../README.md), poi leggi l'approfondimento relativo al lavoro. Questa base rende navigabile la conoscenza del progetto senza sostituire requisiti, roadmap o registro delle decisioni (D-078).

| Documento | Quando leggerlo |
| --- | --- |
| [project_context.md](project_context.md) | Per capire prodotto, struttura e differenza tra ciò che esiste e ciò che è previsto |
| [code_conventions.md](code_conventions.md) | Prima di scrivere codice, traduzioni, componenti o configurazioni |
| [verification_and_prs.md](verification_and_prs.md) | Prima di verificare una modifica o preparare una pull request |
| [proposals.md](proposals.md) | Per consultare convenzioni e skill adottate con D-080 |

## Manutenzione

- Aggiorna la nota pertinente quando cambia il comportamento descritto e indica il file di codice o la decisione da cui deriva.
- Una scelta nuova si registra prima in [../04-decisioni.md](../04-decisioni.md); una proposta non diventa una decisione perché compare qui.
- Distingui sempre tra comportamento osservato nel codice, requisito deciso e lavoro ancora da fare. Non dichiarare attivo un servizio solo perché compare nello stack.
- Conserva `AGENTS.md` come ingresso comune agli agenti e `CLAUDE.md` come rimando. Evita copie divergenti delle stesse istruzioni.
- Documentazione in italiano; nomi tecnici e identificatori in inglese. Aggiorna `ultimo_aggiornamento` nei file modificati.
