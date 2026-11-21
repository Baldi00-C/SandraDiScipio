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

## Stato

| Area | Stato |
| --- | --- |
| Requisiti business V.0 | Chiusi |
| Stack tecnologico | Deciso |
| Design (mockup Figma) | Da iniziare |
| Sviluppo V.0 | Da iniziare, si riparte da zero |

## Stack deciso

Dettagli e motivazioni in [docs/06-stack-tecnologico.md](docs/06-stack-tecnologico.md).

- **Astro** + **TypeScript**, **Tailwind CSS 4**
- Multilingua con indirizzi `/it/`, `/en/`, `/es/` e slug tradotti
- Hosting su **Cloudflare** (Workers con asset statici), dominio `sandradiscipio.com`
- Email dei form con **Resend** (a Sandra e copia all'utente, nella sua lingua)
- Anti-spam con **Cloudflare Turnstile**, analytics senza cookie (**Cloudflare Web Analytics**), policy con **Iubenda**
- Test: `astro check`, ESLint, Prettier, test unitari, Playwright, axe, link rotti, in GitHub Actions
- Flusso: branch → pull request con anteprima → merge su `main` = produzione

## Codice attuale: è un POC

Il codice in `src/` è un **prototipo esplorativo** (Astro 5 + Tailwind 4 + Resend + adapter Node). **Non** è la base del sito definitivo (decisione D-001): lo sviluppo V.0 riparte da zero.

Del POC si possono riusare i contenuti: testi, foto dei progetti in `src/assets/projects/`, dati di contatto in `src/data/site.ts`. Alcune parti contraddicono i requisiti decisi, per esempio i prezzi dimostrativi del preventivatore (nella V.0 non si mostra nessun prezzo, D-004) e l'adapter Node (l'hosting scelto è Cloudflare, D-026).

### Avviare il POC in locale (solo come riferimento)

Requisiti: Node.js ≥ 20.3. La chiave [Resend](https://resend.com) serve solo per provare il modulo contatti.

```bash
npm install
```

```bash
cp .env.example .env
```

```bash
npm run dev
```

Il sito è su http://localhost:4321. Senza `RESEND_API_KEY` il modulo contatti risponde con un errore e non invia nulla.
