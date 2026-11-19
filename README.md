# Sandra Di Scipio — sito portfolio

Sito statico in **Astro (SSG)** e **Tailwind CSS v4**, costruito sul Design System Figma di Sandra Di Scipio. Il modulo contatti usa un backend **PHP + PHPMailer (SMTP)**.

## Requisiti

- Node.js ≥ 20.3 (consigliato 22 LTS)
- PHP ≥ 8.1 e [Composer](https://getcomposer.org) (servono solo per il modulo contatti)

## Avvio in locale

```bash
npm install                 # dipendenze del sito
composer install            # PHPMailer → private/vendor/
cp private/config.example.php private/config.php   # poi inserisci i dati SMTP
```

Servono due terminali:

```bash
npm run dev:php   # server PHP su http://localhost:8000 (cartella public/)
npm run dev       # Astro su http://localhost:4321, /api/* va al server PHP
```

Il sito è su http://localhost:4321. Il form invia davvero le email se `private/config.php` contiene credenziali SMTP valide.

## Build

```bash
npm run build     # astro check + build in dist/
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
public/
  api/               endpoint PHP (copiati intatti in dist/api/)
  .htaccess          header di sicurezza e cache per Apache/LiteSpeed
private/             FUORI dalla document root: bootstrap PHP, config, vendor
```

## Aggiungere un progetto

1. Crea la cartella `src/assets/projects/nome-progetto/` e mettici le immagini con nomi kebab-case.
2. Copia uno dei file in `src/content/projects/` e rinominalo, ad esempio `nome-progetto.md`.
3. Compila il frontmatter. La categoria deve essere una di queste: `Ristrutturazione completa`, `Interior design`, `Arredamento chiavi in mano`. Se un campo manca o è sbagliato, lo schema Zod blocca la build e indica l'errore.

## Preventivatore

Le domande e i valori di calcolo sono in `src/data/estimator.ts`. **I valori attuali sono dimostrativi** e vanno sostituiti con i criteri di Sandra.

## Deploy (es. Hostinger)

1. Esegui `npm run build` e `composer install --no-dev` in locale.
2. Carica il **contenuto** di `dist/` in `public_html/`.
3. Carica la cartella `private/` **accanto** a `public_html/`, non al suo interno:

   ```
   domains/tuodominio.it/
     public_html/   ← contenuto di dist/ (con api/)
     private/       ← bootstrap.php, config.php, vendor/, .htaccess
   ```

   Gli endpoint cercano `../../private/` rispetto a `public_html/api/`. Se il tuo hosting usa un percorso diverso, imposta la variabile d'ambiente `SDS_PRIVATE_DIR`.
4. In `private/config.php` lascia in `allowed_origins` **solo** il dominio di produzione, poi imposta `debug => false`.
5. Attiva HTTPS e decommenta il redirect e l'HSTS in `public/.htaccess`.
6. Aggiorna `SITE_URL` in `astro.config.mjs` con il dominio reale.

## Sicurezza del modulo

- Token CSRF di sessione, verificato con `hash_equals`
- Honeypot nascosto e tempo minimo di compilazione
- Rate limit per sessione (3 invii ogni 10 minuti) e per IP (5 all'ora, 20 al giorno; l'IP viene salvato solo come hash HMAC)
- CORS limitato alle origini configurate; sono accettati solo POST
- Validazione con `filter_var`, rimozione dei caratteri CR/LF dai campi su una riga e `htmlspecialchars` nell'email HTML
- PHPMailer via SMTP autenticato, mai `mail()`. Il visitatore compare solo nel campo Reply-To
- `config.php`, `.env` e `vendor/` sono esclusi da Git

## Prima della pubblicazione

- [ ] Far verificare e completare Privacy Policy e Cookie Policy (titolare, P. IVA, conservazione, fornitore hosting)
- [ ] Sostituire i prezzi demo del preventivatore
- [ ] Revisione dei testi dei progetti da parte di Sandra
- [ ] Aggiungere il link Instagram in `src/data/site.ts` (se esiste)
- [ ] Inserire dominio e credenziali SMTP
