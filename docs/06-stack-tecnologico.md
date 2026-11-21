---
title: Stack tecnologico (V.0)
stato: DECISO (con punti rimandati indicati)
ultimo_aggiornamento: 2026-11-21
---

# Stack tecnologico

Scelte prese con l'utente il 2026-11-21, prima dei mockup (→ D-020). Ogni riga cita la decisione nel [registro](04-decisioni.md).

Il POC, archiviato in `poc/` (D-050) (Astro 5 + Tailwind 4 + Resend + adapter Node) è servito come esperienza: lo stack scelto è simile, ma il codice **non** è una base vincolante (D-001). Si riparte da zero, cambiando l'adapter (Node → Cloudflare) e la struttura multilingua.

## Riepilogo

| Area | Scelta | Stato | Decisione |
| --- | --- | --- | --- |
| Contenuti | File nel repository (Markdown/JSON), aggiornati dall'utente. Nessun CMS nella V.0 | DECISO | D-021 |
| CMS per Sandra | Da valutare dopo la V.0 | RIMANDATO | D-022 |
| Framework | Astro + TypeScript | DECISO | D-023 |
| Styling | Tailwind CSS 4 | DECISO | D-024 |
| Multilingua | `/it/`, `/en/`, `/es/` con slug tradotti, hreflang | DECISO | D-025 |
| Lingua del visitatore | Lingua del browser; fallback inglese; la scelta dal selettore viene ricordata | DECISO | D-046 |
| Hosting | Cloudflare (Workers + asset statici), piano gratuito | DECISO | D-026 |
| Email dai form | Resend | DECISO | D-027 |
| Allegati | Max 5 file, 20 MB in tutto | DECISO | D-015 |
| Dominio | `sandradiscipio.com` su Cloudflare Registrar | DECISO, da acquistare | D-028 |
| Email sul dominio | `info@sandradiscipio.com` inoltrata alla Gmail di Sandra | DECISO | D-029 |
| Anti-spam | Cloudflare Turnstile + honeypot + limite di invii | DECISO | D-030 |
| Analytics | Cloudflare Web Analytics (senza cookie) | DECISO | D-031 |
| Cookie e consenso | Nessun cookie di profilazione, nessun banner | DECISO | D-032 |
| Privacy e cookie policy | Iubenda, IT/EN/ES | DECISO | D-033 |
| SEO | Pacchetto base | DECISO | D-034 |
| Profilo Google Business | Da valutare | RIMANDATO | D-034 |
| Test e qualità | Completa | DECISO | D-035 |
| Git e deploy | Branch → PR con anteprima → `main` = produzione | DECISO | D-036 |

## Dettagli e motivazioni

### Contenuti (D-021, D-022)

- Progetti come content collection di Astro: un file per progetto e per lingua, immagini in `src/assets/`.
- Testi dell'interfaccia (menu, pulsanti, etichette dei form, email) in file di traduzione per lingua.
- Motivo: zero costi, niente login, tutto versionato in Git. Un CMS basato sui file (es. Keystatic, Decap) si può aggiungere dopo senza cambiare la struttura.

### Framework e styling (D-023, D-024)

- Astro genera pagine statiche; solo gli endpoint dei form girano sul server.
- Ottimizzazione delle immagini integrata: importante per un portfolio pieno di render e foto.
- Tailwind 4 con i token (colori, font, spaziature) presi dai mockup Figma, definiti una volta in CSS.

### Multilingua (D-025)

| Pagina | IT | EN | ES |
| --- | --- | --- | --- |
| Esempio | `/it/chi-sono` | `/en/about` | `/es/sobre-mi` |

- Lingua mostrata al visitatore (→ D-046):
  1. Chi arriva sulla radice `/` va nella lingua scelta in una visita precedente, se c'è.
  2. Altrimenti nella lingua del browser (`Accept-Language`), se è IT, EN o ES.
  3. Altrimenti in **inglese** (fallback).
- Gli indirizzi con prefisso (`/it/...`, `/en/...`, `/es/...`) si aprono sempre così come sono: nessun reindirizzamento, per non rompere i link condivisi e la SEO.
- La scelta fatta col selettore si ricorda con una memoria tecnica nel browser (cookie tecnico o localStorage): non richiede banner (D-032).
- Il selettore della lingua (REQ-GLOB-1) porta alla stessa pagina nell'altra lingua.
- Gli slug definitivi si fissano in sviluppo, insieme alle traduzioni (D-007).

### Hosting (D-026)

- Cloudflare Workers con asset statici e adapter ufficiale `@astrojs/cloudflare`.
- Motivo principale: accetta richieste fino a 100 MB, quindi gli allegati arrivano all'endpoint senza storage intermedio. Vercel (4,5 MB) e Netlify (circa 6 MB) avrebbero richiesto soluzioni in più.
- Rischio noto: il piano gratuito ha un limite di tempo CPU per richiesta. Se l'invio con allegati lo supera, si passa al piano Workers a pagamento (5 $/mese). Da verificare in sviluppo con allegati da 20 MB.

### Email (D-027, D-014, D-009)

| Email | Destinatario | Lingua | Contenuto |
| --- | --- | --- | --- |
| Richiesta | Sandra | Lingua in cui l'utente ha compilato il form (D-014) | Tutte le risposte + allegati |
| Copia di conferma | Utente | Lingua dell'utente | Riepilogo delle risposte, nomi degli allegati (non i file), conferma |

- Mittente su dominio verificato in Resend (es. `noreply@sandradiscipio.com`), con `reply-to` impostato sull'email dell'utente nell'email a Sandra.
- Piano gratuito Resend: 3.000 email/mese, 100/giorno, max 40 MB per email. Ogni invio di form usa 2 email.
- Chiave API solo nelle variabili d'ambiente di Cloudflare.

### Allegati (D-015)

| Regola | Valore |
| --- | --- |
| Numero massimo | 5 file |
| Peso massimo | 20 MB in tutto |
| Formati | JPG, PNG, HEIC, WebP, PDF |
| Riduzione | Le foto grandi si riducono nel browser prima dell'invio |
| Controlli | Nel browser (messaggio chiaro all'utente) e di nuovo sul server |

### Dominio ed email sul dominio (D-028, D-029)

- `sandradiscipio.com`, libero al 2026-11-21, da acquistare su Cloudflare Registrar prima della pubblicazione.
- Il DNS su Cloudflare serve anche per: verifica del dominio in Resend, Email Routing.
- `info@sandradiscipio.com` inoltrato alla Gmail di Sandra con Cloudflare Email Routing (gratuito). Una casella vera a pagamento si può valutare più avanti.
- Email e numero definitivi da mostrare sul sito: ancora APERTO (REQ-CONT-6).

### Anti-spam (D-030)

- Cloudflare Turnstile su form contatti e questionari, verificato sul server.
- Campo honeypot nascosto e limite di invii per indirizzo IP.

### Privacy, cookie, analytics (D-031, D-032, D-033)

- Cloudflare Web Analytics: senza cookie, nessun dato personale.
- Nessun banner: il sito non usa cookie di profilazione. Regole per restare così:
  - font ospitati sul sito (niente Google Fonts da CDN);
  - nessun contenuto esterno (Instagram, Google Maps, YouTube) caricato senza consenso;
  - se in futuro si aggiunge un servizio con cookie, serve il banner (nuova decisione).
- Privacy policy e cookie policy generate con Iubenda in IT, EN, ES. Piano da scegliere all'acquisto in base alle lingue.
- Ogni form ha la casella di consenso privacy (REQ-CONT-4, questionari).

### SEO (D-034)

- `title` e `description` per ogni pagina e lingua.
- `hreflang` tra le versioni IT/EN/ES e `x-default` che punta all'inglese (D-046).
- Sitemap, `robots.txt`, URL canonici.
- Open Graph per le anteprime sui social.
- Dati strutturati schema.org (Person, ProfessionalService) e testo alternativo per le immagini.
- Google Search Console dopo la pubblicazione.
- Profilo Google Business: RIMANDATO, dopo la pubblicazione.

### Test e qualità (D-035)

| Controllo | Strumento | Quando |
| --- | --- | --- |
| Tipi | `astro check` / TypeScript | Ogni PR |
| Lint e formattazione | ESLint, Prettier | Ogni PR |
| Test unitari | Logica dei questionari, validazione allegati, costruzione delle email | Ogni PR |
| Test end-to-end | Playwright: form contatti, i due questionari, cambio lingua | Ogni PR |
| Accessibilità | axe (con Playwright) | Ogni PR |
| Link rotti | Controllo automatico sul sito generato | Ogni PR |
| Prestazioni e accessibilità | Lighthouse | Prima di ogni rilascio |

Tutti i controlli automatici girano in GitHub Actions. Nei test non si inviano email vere.

### Git e deploy (D-036)

```
branch di funzionalità ──► pull request ──► controlli GitHub Actions + anteprima Cloudflare
                                                        │
                                                   merge su main
                                                        ▼
                                                 produzione (Cloudflare)
```

- Commit convenzionali (`feat(...)`, `fix(...)`, `docs:`, `chore(...)`), con l'ID del requisito quando c'è.
- Nessun ambiente di staging fisso: le anteprime delle PR bastano anche per mostrare le novità a Sandra.
- Segreti (Resend, Turnstile) solo nelle variabili d'ambiente di Cloudflare, mai nel repository.

## Costi previsti

| Voce | Costo |
| --- | --- |
| Hosting, analytics, Turnstile, Email Routing (Cloudflare) | Gratis (5 $/mese se servono più risorse per gli allegati) |
| Resend | Gratis fino a 3.000 email/mese |
| Dominio `sandradiscipio.com` | Prezzo annuo di Cloudflare Registrar |
| Iubenda | Abbonamento annuo, da verificare in base alle lingue |

## Prima della pubblicazione

1. Acquistare `sandradiscipio.com` (D-028).
2. Verificare il dominio in Resend e attivare Email Routing (D-027, D-029).
3. Attivare Iubenda e collegare le policy (D-033).
4. Confermare email e numero di Sandra (REQ-CONT-6).
5. Registrare il sito su Google Search Console (D-034).
