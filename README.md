# Sandra Di Scipio — sito portfolio

Sito in **Astro** e **Tailwind CSS v4**, costruito sul Design System Figma di Sandra Di Scipio. Le pagine sono statiche; il modulo contatti invia le email con **[Resend](https://resend.com)** tramite un endpoint JavaScript (`src/pages/api/contatti.ts`).

## Requisiti

- Node.js ≥ 20.3 (consigliato 22 LTS)
- Un account [Resend](https://resend.com) con una chiave API (serve solo per il modulo contatti)

## Avvio in locale

```bash
npm install
cp .env.example .env   # poi inserisci RESEND_API_KEY
npm run dev            # http://localhost:4321
```

Senza `RESEND_API_KEY` il sito funziona, ma il modulo risponde con un errore e non invia nulla.

## Build

```bash
npm run build     # astro check + build in dist/ (dist/client statico, dist/server per /api)
npm run preview
```

## Struttura

```
src/
  assets/            immagini originali (ottimizzate in build in AVIF/WebP)
    projects/<slug>/ immagini dei progetti, nomi kebab-case
    about/           ritratto
  components/        componenti .astro del Design System
  content/projects/  un file .md per progetto (Content Collection)
  content.config.ts  schema Zod dei progetti
  data/              contatti, servizi, domande e prezzi del preventivatore
  layouts/           BaseLayout (SEO, header, footer), LegalLayout
  pages/             le 9 pagine + 404
  scripts/           motion e gestione form (TypeScript)
  styles/global.css  token Figma in @theme + variabili semantiche --sd-*
  pages/api/         endpoint del modulo contatti (Resend)
public/
  .htaccess          header di sicurezza e cache (solo hosting Apache/LiteSpeed)
```

## Aggiungere un progetto

1. Crea la cartella `src/assets/projects/nome-progetto/` e mettici le immagini con nomi kebab-case.
2. Copia uno dei file in `src/content/projects/` e rinominalo, ad esempio `nome-progetto.md`.
3. Compila il frontmatter. La categoria deve essere una di queste: `Ristrutturazione completa`, `Interior design`, `Arredamento chiavi in mano`. Se un campo manca o è sbagliato, lo schema Zod blocca la build e indica l'errore.

## Preventivatore

Le domande e i valori di calcolo sono in `src/data/estimator.ts`. **I valori attuali sono dimostrativi** e vanno sostituiti con i criteri di Sandra.

## Deploy

L'hosting non è ancora deciso. Serve un servizio che esegua Node.js per l'endpoint `/api/contatti`; le pagine restano statiche.

- **Vercel o Netlify:** sostituisci in `astro.config.mjs` l'adapter `@astrojs/node` con `@astrojs/vercel` o `@astrojs/netlify` (`npx astro add vercel`).
- **Hostinger con Node.js** (piani Business/Cloud): resta `@astrojs/node`; il comando di avvio è `npm start`.

In ogni caso:

1. Imposta nel pannello dell'hosting `RESEND_API_KEY`, `MAIL_FROM`, `MAIL_TO` e `SITE_URL`.
2. Su Resend verifica il dominio del sito (record DNS) e usa un mittente di quel dominio in `MAIL_FROM`.
3. Aggiorna `SITE_URL` con il dominio reale.

## Sicurezza del modulo

- Accettate solo richieste POST dalla stessa origine del sito, massimo 16 KB
- Honeypot nascosto e tempo minimo di compilazione (ai bot una finta conferma)
- Rate limit per IP (5 all'ora, 20 al giorno), solo in memoria: su hosting serverless vale per singola istanza
- Validazione di ogni campo, rimozione dei caratteri di controllo e escape HTML nell'email
- Mittente fisso del dominio verificato; il visitatore compare solo nel Reply-To
- La chiave Resend resta sul server (`astro:env`, `access: 'secret'`) e `.env` è escluso da Git

## Prima della pubblicazione

- [ ] Far verificare e completare Privacy Policy e Cookie Policy (titolare, P. IVA, conservazione, fornitore hosting)
- [ ] Sostituire i prezzi demo del preventivatore
- [ ] Revisione dei testi dei progetti da parte di Sandra
- [ ] Aggiungere il link Instagram in `src/data/site.ts` (se esiste)
- [ ] Scegliere l'hosting e impostare l'adapter
- [ ] Verificare il dominio su Resend e inserire `RESEND_API_KEY`
