---
title: Convenzioni del codice
ultimo_aggiornamento: 2026-11-21
---

# Convenzioni del codice

## Lingue (D-054)

- Codice in inglese: nomi di file di codice, identificatori, tipi, commenti, descrizioni dei test, configurazioni e nomi dei job CI.
- Documentazione (`docs/`, README, istruzioni per agenti) e conversazione in italiano.
- Testi rivolti ai visitatori nella lingua del contenuto: italiano, inglese o spagnolo. Non tradurre in inglese i valori dei dizionari IT/ES per applicare la regola del codice.
- Nomi propri e slug pubblici tradotti mantengono la forma prevista. Il POC resta archiviato così com'è.

## Prettier ed editor (D-052, D-079)

La configurazione vincolante è [`.prettierrc.json`](../../.prettierrc.json); [`.editorconfig`](../../.editorconfig) uniforma l'editor. Il profilo comune rilevato nell'app e nel Web SDK dei progetti recenti è stato adattato al sito:

| Aspetto | Valore |
| --- | --- |
| Apici JS/TS | Doppi (`singleQuote: false`) |
| Larghezza desiderata | 120 (`printWidth`), non un limite rigido |
| Indentazione | 2 spazi, senza tab |
| Punto e virgola | Sì |
| Virgole finali | `es5` |
| Spazi nelle parentesi graffe | Sì |
| Parametri delle arrow function | Sempre tra parentesi |
| File di testo | UTF-8, LF, newline finale |
| Import | Moduli Node, pacchetti esterni, riga vuota, import relativi; ordinamento senza distinzione maiuscole/minuscole |

Mantieni i plugin del repository: parser Astro, ordinamento import e classi Tailwind. L'ordinamento delle classi legge `src/styles/global.css`. ESLint controlla il codice; `eslint-config-prettier` disattiva le regole di stile che farebbero conflitto con il formatter.

Esegui `npm run format` per applicare e `npm run format:check` per verificare. Rispetta [`.prettierignore`](../../.prettierignore): Markdown escluso per evitare riscritture inutili delle tabelle (D-052); POC, lockfile, dipendenze e output generati esclusi. Non modificare manualmente il lockfile per uniformare lo stile.

## TypeScript e struttura attuali

Usa la configurazione strict di Astro e le regole di [ESLint](../../eslint.config.js). Conserva i tipi e le funzioni condivise già esportati, in particolare `Locale` e `RouteKey`. Per nuovo codice o codice modificato, applica le [convenzioni adottate](proposals.md): tipi condivisi, niente `any` o cast forzati senza necessità motivata, nomi descrittivi nei callback e prefisso `node:` per i moduli integrati. Non importare alias o framework di altri progetti; evita rifattorizzazioni estranee al task.

## Multilingua (D-025, D-046, D-051)

- Testi dell'interfaccia in `src/i18n/ui/<lingua>.ts`, con le stesse chiavi in tutte le lingue.
- Slug in `src/i18n/routes.ts`; costruisci i link interni delle pagine con `pathFor()`.
- Prefisso anche per l'inglese e barra finale negli URL. Canonical e hreflang assoluti dalla configurazione `SITE_URL`.
- `x-default` punta all'inglese; l'italiano è la lingua in cui nascono i testi.
- Traduzioni AI EN/ES e revisione umana prima della pubblicazione secondo D-040; la milestone Bozza permette pagine almeno in IT (D-042).

## Design system (D-024, D-032, D-055)

Usa i token in `src/styles/tokens.css` e le classi condivise. Un cambiamento intenzionale in Figma richiede l'aggiornamento dei token e delle storie pertinenti; la sincronizzazione attuale è manuale. Storybook usa HTML con Vite: non fingere che verifichi il rendering dei componenti Astro. Font ospitati localmente; niente caricamenti di servizi esterni con cookie senza una nuova decisione.
