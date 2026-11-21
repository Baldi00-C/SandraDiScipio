---
title: Verifiche e pull request
ultimo_aggiornamento: 2026-11-21
---

# Verifiche e pull request

## Ambiente e comandi disponibili

La CI usa Node 24 da `.nvmrc`; il requisito minimo dichiarato è in `package.json`. Installa le dipendenze dalla radice con `npm ci`, usando il lockfile versionato.

| Comando | Verifica |
| --- | --- |
| `npm run check` | Tipi e diagnostica Astro |
| `npm run lint` | Regole ESLint |
| `npm run format:check` | Formato Prettier |
| `npm test` | Test unitari Vitest (`*.test.ts` accanto al codice, D-052) |
| `npm run build` | Build del sito |
| `npm run verify` | Tutti i cinque controlli precedenti, nello stesso ordine della CI |
| `npm run build-storybook` | Build del catalogo del design system; comando separato, non incluso in `verify` né nella CI attuale |

`storybook-static/` e `.cache/` sono esclusi dalla scansione TypeScript: gli output generati e le cache non devono entrare nei controlli del codice sorgente.

Playwright, axe e controllo dei link sono requisiti decisi ma ancora da implementare in T-03.6. Non dichiararli eseguiti usando `verify`. Per il comportamento delle future email usa test senza invii veri (D-035); il collaudo reale è un'attività distinta in F5.

Husky esegue lint-staged prima dei commit; la CI resta necessaria perché copre il progetto completo. Markdown è escluso da Prettier: per modifiche solo documentali controlla coerenza, link relativi e corrispondenza con il codice descritto.

## Flusso Git già deciso

- Branch di lavoro → PR verso `main`; niente push diretto su `main` (D-036, D-053).
- Un task = una PR, con `Closes #n` per la issue corretta; aggiorna lo stato pertinente nella roadmap nella stessa PR (D-047).
- Commit convenzionali e riferimento al requisito/task quando esiste (D-036). Non inventare numeri di issue.
- La protezione di `main` richiede `Checks` verde e branch aggiornato; non aggirarla. L'utente gestisce il merge secondo il flusso attuale.
- Le anteprime Cloudflare fanno parte del flusso previsto; finché T-03.4 non è configurato, non promettere un URL di anteprima automatico.

Dopo aver ricevuto l'elenco, l'utente ha autorizzato la prima PR e l'aggiunta delle skill (D-058). Prima delle PR applica `pr-reviewer`: una sola passata mirata, riusando i risultati validi dei controlli; nessuna orchestrazione multi-modello. Una review della stessa sessione è un'auto-review, non una review indipendente. Per le feature usa `feature-developer`, con test del comportamento e storie per gli elementi visivi riusabili.

## Dati e configurazione

Resend e Turnstile useranno segreti nell'ambiente Cloudflare, mai nel repository (D-036). I dati dei form e gli allegati devono rispettare requisiti, limiti e validazioni client/server già decisi. Non usare informazioni personali reali come fixture dei test.

## Evidenza delle verifiche

Nel resoconto distingui i comandi eseguiti, le verifiche manuali e i controlli mancanti. Una build riuscita non dimostra da sola correttezza visiva, invio delle email o funzionamento del deploy. Le convenzioni di review e struttura delle PR sono in [proposals.md](proposals.md).
