# Sandra Di Scipio — sito portfolio

Sito portfolio multilingua (IT, EN, ES) di **Sandra Di Scipio**, architetta e interior designer: presenta lei e i suoi progetti e raccoglie richieste di preventivo tramite questionari inviati per email.

## Documentazione (fonte di verità)

Requisiti, decisioni e modo di lavorare sono in [`docs/`](docs/README.md). Parti da lì.

| File | Contenuto |
| --- | --- |
| [docs/README.md](docs/README.md) | Indice e stato del progetto |
| [docs/02-requisiti-business.md](docs/02-requisiti-business.md) | Pagine del sito e requisiti |
| [docs/03-preventivatore.md](docs/03-preventivatore.md) | Preventivatore e questionari |
| [docs/04-decisioni.md](docs/04-decisioni.md) | Registro delle decisioni |
| [docs/06-stack-tecnologico.md](docs/06-stack-tecnologico.md) | Stack, hosting, email, test, flusso Git |

Istruzioni per agenti AI: [AGENTS.md](AGENTS.md).

Knowledge base operativa: [docs/agent_kb/](docs/agent_kb/README.md), con mappa del codice, convenzioni e verifiche. Le [convenzioni e skill adottate](docs/agent_kb/proposals.md) descrivono anche sviluppo feature e review a costo contenuto.

## Stato

| Area | Stato |
| --- | --- |
| Requisiti business V.0 | Chiusi |
| Stack tecnologico | Deciso |
| Design (mockup Figma) | Base comune fatta (F1): stile (T-02.2), elementi globali (T-02.3) e componenti comuni (T-02.4: pulsanti, card progetto, campi dei form, messaggi). Mockup delle pagine (F3) in corso: Progetti (T-04.1), Contatti (T-05.1) e Home (T-09.2, con immagini di esempio) e Chi sono (T-06.1) fatti |
| Sviluppo V.0 | In corso: setup tecnico (F2). Elementi globali (header, menu, footer, WhatsApp) e pagine segnaposto nelle tre lingue fatti (T-03.7). Deploy su Cloudflare con anteprime delle PR fatto (T-03.4). Progetti in bozza fatti: content collection (T-04.2), elenco (T-04.3) e scheda con visore delle immagini (T-04.4). Contatti: pagina con recapiti (T-05.2), form in arrivo (T-05.3). Home in bozza (T-09.3). Chi sono con foto e testi veri (T-06.2) |

## Stack deciso

Dettagli e motivazioni in [docs/06-stack-tecnologico.md](docs/06-stack-tecnologico.md).

- **Astro** + **TypeScript**, **Tailwind CSS 4**
- Multilingua con indirizzi `/it/`, `/en/`, `/es/` e slug tradotti; la radice `/` porta alla lingua scelta in precedenza, altrimenti a quella del browser, altrimenti all'inglese (D-046, D-056)
- Hosting su **Cloudflare** (Workers con asset statici), dominio `sandradiscipio.com`
- Email dei form con **Resend** (a Sandra e copia all'utente, nella sua lingua)
- Anti-spam con **Cloudflare Turnstile**, analytics senza cookie (**Cloudflare Web Analytics**), policy con **Iubenda**
- Test: `astro check`, ESLint, Prettier, test unitari, Playwright, axe, link rotti, in GitHub Actions
- Flusso: branch → pull request con anteprima → merge su `main` = produzione

## Avviare il sito in locale

Requisiti: Node.js ≥ 22.23.4.

```bash
npm install
```

```bash
npm run dev
```

Il sito è su http://localhost:4321.

| Comando | Cosa fa |
| --- | --- |
| `npm run check` | Controllo dei tipi (`astro check`) |
| `npm run lint` | ESLint |
| `npm run format` | Formatta con Prettier (ordina anche import e classi Tailwind) |
| `npm run test` | Test unitari con Vitest |
| `npm run build` | Genera il sito in `dist/` |
| `npm run verify` | Tutti i controlli della CI, in sequenza |

Prima di ogni commit Husky esegue ESLint e Prettier sui file modificati. Su GitHub `main` accetta solo PR con il controllo `Checks` verde (D-053).

## Pubblicazione su Cloudflare

Il sito gira su Cloudflare Workers con asset statici (D-026, D-089). Il deploy lo fa **Workers Builds**, l'integrazione Git di Cloudflare: nessun token Cloudflare nel repository né in GitHub.

| Evento | Risultato |
| --- | --- |
| Push su `main` (PR unita) | Produzione: `npx wrangler deploy` |
| Push su un altro branch / PR | Anteprima con indirizzo proprio: `npx wrangler versions upload`, link nella PR |

Fino alla pubblicazione (M2) il sito non è indicizzabile: `public/_headers` aggiunge `X-Robots-Tag: noindex, nofollow` e `public/robots.txt` blocca tutto. Si tolgono in T-14.1.

Provare in locale con il runtime di Cloudflare:

```bash
npm run build && npm run preview
```

### Configurazione su Cloudflare (una volta sola, la fa il titolare dell'account)

1. Cloudflare → **Workers & Pages** → **Create** → **Import a repository** → collegare GitHub e scegliere `Baldi00-C/SandraDiScipio`.
2. Nome del progetto: `sandra-di-scipio` (deve essere uguale a `name` in `wrangler.jsonc`).
3. Impostazioni di build:

   | Campo | Valore |
   | --- | --- |
   | Build command | `npm run build` |
   | Deploy command | `npx wrangler deploy` |
   | Non-production branch deploy command | `npx wrangler versions upload` |
   | Root directory | `/` |
   | Production branch | `main` |
   | Builds for non-production branches | attivo |

4. Variabili di build: `SITE_URL` = indirizzo `*.workers.dev` del Worker (es. `https://sandra-di-scipio.<sottodominio>.workers.dev`), poi `sandradiscipio.com` in T-14.1.
5. Nelle impostazioni del Worker lasciare attivi **workers.dev** e **Preview URLs**.

## POC archiviato

Il primo prototipo (Astro 5 + Tailwind 4 + Resend + adapter Node) è nella cartella [`poc/`](poc/README.md) e nel tag Git `poc`. **Non** è la base del sito definitivo (D-001, D-050): resta solo come riferimento e per riusare i contenuti (foto e testi dei progetti, dati di contatto).
