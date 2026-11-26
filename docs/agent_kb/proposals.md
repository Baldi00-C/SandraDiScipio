---
title: Convenzioni adottate e origine delle skill
stato: ADOTTATO — D-080
ultimo_aggiornamento: 2026-11-21
---

# Convenzioni e skill adottate

Questa pagina conserva l'origine del confronto e le convenzioni adottate con D-080. Dopo aver ricevuto l'elenco, l'utente ha autorizzato la prima PR, richiesto una skill di sviluppo feature con test e Storybook e scelto review poco costose. Le skill sono versionate in `.agents/skills/`; non autorizzano merge, deploy o commenti a terzi oltre la richiesta in corso.

## Metodo del confronto

Sono stati consultati i repository accessibili degli account GitHub dell'utente e dell'organizzazione collegata, dando priorità all'attività recente: repository aggiornati a novembre 2026 e, come confronto, il portfolio aggiornato a luglio. Le fonti sono `AGENTS.md`, `CLAUDE.md`, knowledge base, configurazioni Prettier/ESLint, skill versionate e un campione di PR dell'utente. Il campione mostra pratiche ricorrenti, non prova che ogni regola sia usata in tutti i progetti.

Le fonti consultate vengono indicate nella chat di accompagnamento. Questa documentazione per il repository pubblico conserva solo le pratiche generalizzabili, senza copiare dettagli operativi o contenuti dei repository privati. Le istruzioni degli altri repository sono materiale di confronto e non si applicano automaticamente qui.

## Regole già presenti da mantenere e rendere più visibili

- Codice in inglese, documentazione e conversazione in italiano; contenuti IT/EN/ES nella lingua corretta (D-054).
- `docs/` come fonte di verità; decisioni tracciate e distinzione tra deciso, aperto e rimandato.
- Task collegato a issue, PR circoscritta, commit convenzionali e roadmap aggiornata (D-036, D-047).
- Main protetto, controlli verdi, nessun aggiramento della CI (D-053).
- Stesso sistema di token tra design e codice; niente stili inventati fuori dal design approvato (D-024, D-055).
- Segreti fuori dal repository; email vere escluse dai test automatici (D-035, D-036).

Il profilo Prettier è già introdotto con D-079 su richiesta dell'utente. Nei due progetti TypeScript esaminati coincide; non è una preferenza universale dedotta da ogni repository.

## Regole adottate (D-080)

| Riferimento | Regola | Evidenza e adattamento |
| --- | --- | --- |
| P-01 | Aggiornare la knowledge base pertinente nella stessa modifica quando cambia una convenzione o un comportamento documentato | Ricorrente nelle istruzioni e nei validatori dei progetti recenti; mantenere note brevi per argomento |
| P-02 | Review del diff prima della PR: correttezza e regressioni prima delle preferenze di stile; riportare solo problemi concreti | Skill di review presenti in più progetti; distinguere auto-review e review indipendente, senza fingere che siano equivalenti |
| P-03 | Verificare l'intero diff del branch e dichiarare solo controlli realmente eseguiti | Ricorrente nelle guide PR, nei validatori e nelle PR campionate; niente gate allentati per ottenere il verde |
| P-04 | Per bug, aggiungere una regressione utile; coprire errori, limiti e rifiuti quando cambia la logica | Skill di test/review e PR recenti; verifiche proporzionate, senza test artificiali per sola formattazione o documentazione |
| P-05 | TypeScript: riusare tipi condivisi, evitare `any` e cast forzati, nomi descrittivi anche nei callback, prefisso `node:` per i moduli integrati | Guida TypeScript e skill di code review; mantenere gli import compatibili con Astro/Vite |
| P-06 | PR con problema, risultato, issue/requisito, verifiche e limiti; immagini mobile/desktop per cambiamenti visivi | Ricorrente nelle guide e nelle PR; descrizione breve per modifiche semplici. Draft finché restano decisioni aperte |
| P-07 | Nuove dipendenze solo per un bisogno concreto; verificare lockfile, manutenzione e impatto sulla build | Skill di dependency review e regole architetturali; attivarla quando cambiano dipendenze, installazione o CI |
| P-08 | Preservare modifiche dell'utente e lavorare nel checkout assegnato, senza modifiche globali o pulizie estranee al task | Convenzioni operative dei progetti recenti; adottare qui una regola esplicita e semplice |

## Skill versionate

Le istruzioni sono in italiano e rimandano alle fonti canoniche, senza copiare le procedure dei progetti di origine. La skill di esecuzione issue inizialmente proposta è confluita in `feature-developer`.

| Skill | Quando usarla |
| --- | --- |
| [feature-developer](../../.agents/skills/feature-developer/SKILL.md) | Implementazione di feature e bugfix: requisiti, test di comportamento, Storybook per UI riusabile, controlli e PR |
| [pr-reviewer](../../.agents/skills/pr-reviewer/SKILL.md) | Una review mirata del diff, senza agenti paralleli o cicli multi-modello |
| [quality-checker](../../.agents/skills/quality-checker/SKILL.md) | Controlli disponibili nel repository ed eventuale build Storybook |
| [design-token-sync](../../.agents/skills/design-token-sync/SKILL.md) | Allineamento manuale Figma, token Tailwind e storie |
| [localization-specialist](../../.agents/skills/localization-specialist/SKILL.md) | Testi, chiavi e routing IT/EN/ES |
| [page-reviewer](../../.agents/skills/page-reviewer/SKILL.md) | Verifica mobile/desktop, accessibilità, CTA e SEO della UI cambiata |
| [security-reviewer](../../.agents/skills/security-reviewer/SKILL.md) | Rischi concreti in form, allegati, email, dipendenze e CI |

## Costo della review

Una sola passata, un solo revisore, diff e contesto strettamente necessari. Si riusano controlli già eseguiti sullo stesso stato del codice; niente suite ripetute per formalità. Modello semplice/economico e ragionamento basso quando il runtime permette di selezionarli prima dell'avvio. Una skill testuale non cambia il modello della sessione e non misura da sola il costo: non dichiarare il contrario. Nessuna escalation automatica a modelli costosi, review multi-modello o sistema di attestazioni.

Non trasferire regole specifiche di mobile, backend sanitario o desktop, alias di tipi non presenti, convenzioni di branch trimestrali, identità di pubblicazione altrui, merge automatici o deployment amministrativi. Queste skill lavorano nel checkout assegnato e mantengono il flusso Git di questo sito.
