/**
 * POST /api/contatti — invio del modulo contatti / preventivatore con Resend.
 *
 * Controlli, in ordine:
 *  1. stessa origine del sito e dimensione massima della richiesta
 *  2. honeypot e tempo minimo di compilazione (ai bot una finta conferma)
 *  3. rate limit per IP (in memoria)
 *  4. validazione e pulizia di ogni campo, escape HTML nell'email
 *  5. invio con Resend: mittente fisso, il visitatore solo in Reply-To
 */
import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import { MAIL_FROM, MAIL_TO, RESEND_API_KEY } from 'astro:env/server';

export const prerender = false;

const MAX_BYTES = 16 * 1024;
const MIN_FILL_SECONDS = 3;
const LIMIT_HOUR = 5;
const LIMIT_DAY = 20;

const SOURCES = {
  contatti: 'Pagina Contatti',
  home: 'Home',
  preventivatore: 'Preventivatore online',
} as const;
type Source = keyof typeof SOURCES;

type Body = { ok: boolean; message?: string; errors?: Record<string, string> };

const json = (status: number, body: Body) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
    },
  });

/* ── Rate limit in memoria ────────────────────────────────────────────────
   Vale per singola istanza del server: su hosting serverless ogni istanza
   ha il suo contatore. Gli IP restano solo in memoria e non vengono salvati. */
const hits = new Map<string, number[]>();
const DAY = 24 * 60 * 60 * 1000;
const HOUR = 60 * 60 * 1000;

function rateLimited(ip: string, now: number): boolean {
  const list = (hits.get(ip) ?? []).filter((t) => now - t < DAY);
  hits.set(ip, list);
  const lastHour = list.filter((t) => now - t < HOUR).length;
  return lastHour >= LIMIT_HOUR || list.length >= LIMIT_DAY;
}
function recordHit(ip: string, now: number) {
  hits.set(ip, [...(hits.get(ip) ?? []), now]);
  if (hits.size > 5000) {
    for (const [key, list] of hits) if (!list.some((t) => now - t < DAY)) hits.delete(key);
  }
}

/* ── Pulizia dei campi ──────────────────────────────────────────────────── */
const str = (v: FormDataEntryValue | null) => (typeof v === 'string' ? v : '');
/** Una riga: niente a capo né caratteri di controllo (evita header injection). */
const cleanLine = (v: FormDataEntryValue | null, max: number) =>
  str(v)
    .replace(/[\u0000-\u001f\u007f]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, max);
/** Testo su più righe: tiene gli a capo, toglie gli altri caratteri di controllo. */
const cleanText = (v: FormDataEntryValue | null, max: number) =>
  str(v)
    .replace(/\r\n?/g, '\n')
    .replace(/[\u0000-\u0008\u000b-\u001f\u007f]/g, '')
    .trim()
    .slice(0, max);
const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
const EMAIL_RE = /^[^\s@,;<>"]+@[^\s@,;<>"]+\.[^\s@,;<>"]{2,}$/;

export const POST: APIRoute = async ({ request, clientAddress, site, url }) => {
  // 1) Stessa origine e dimensione massima
  const origin = request.headers.get('origin');
  const allowed = new Set([url.origin, site?.origin].filter(Boolean));
  if (origin && !allowed.has(origin)) {
    return json(403, { ok: false, message: 'Richiesta non consentita.' });
  }
  if (Number(request.headers.get('content-length') ?? 0) > MAX_BYTES) {
    return json(413, { ok: false, message: 'Richiesta troppo grande.' });
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return json(400, { ok: false, message: 'Richiesta non valida.' });
  }

  // 2) Honeypot e tempo minimo: ai bot si risponde "ok" senza inviare nulla
  const honeypot = cleanLine(form.get('website'), 200);
  const formTs = Number.parseInt(str(form.get('form_ts')), 10);
  const nowSec = Math.floor(Date.now() / 1000);
  const tooFast = Number.isFinite(formTs) && formTs > 0 && nowSec - formTs < MIN_FILL_SECONDS;
  if (honeypot || tooFast) {
    console.warn('[contatti] invio scartato (honeypot/tempo)');
    return json(200, { ok: true });
  }

  // 3) Rate limit
  let ip = 'sconosciuto';
  try {
    ip = clientAddress || ip;
  } catch {
    /* alcuni adapter non espongono l'IP */
  }
  const now = Date.now();
  if (rateLimited(ip, now)) {
    return json(429, {
      ok: false,
      message: 'Hai inviato troppe richieste. Riprova più tardi o scrivici via email.',
    });
  }

  // 4) Validazione
  const errors: Record<string, string> = {};
  const name = cleanLine(form.get('name'), 80);
  if (name.length < 2) errors.name = 'inserisci il tuo nome.';

  const email = cleanLine(form.get('email'), 120);
  if (!EMAIL_RE.test(email)) errors.email = 'inserisci un indirizzo email valido.';

  const phone = cleanLine(form.get('phone'), 30);
  if (phone && !/^[+0-9 ().-]{6,30}$/.test(phone)) errors.phone = 'inserisci un numero di telefono valido.';

  const message = cleanText(form.get('message'), 2000);
  if (message.length < 10) errors.message = 'scrivi almeno qualche parola sul tuo progetto.';

  if (str(form.get('privacy')) !== '1') errors.privacy = 'serve il consenso al trattamento dei dati.';

  const rawSource = str(form.get('source'));
  const source: Source = rawSource in SOURCES ? (rawSource as Source) : 'contatti';
  const estimate = source === 'preventivatore' ? cleanText(form.get('estimate'), 2000) : '';

  if (Object.keys(errors).length) {
    return json(422, { ok: false, message: 'Controlla i campi evidenziati e riprova.', errors });
  }

  // 5) Invio con Resend
  if (!RESEND_API_KEY) {
    console.error('[contatti] RESEND_API_KEY mancante: impostala nel file .env o nel pannello dell’hosting');
    return json(500, { ok: false, message: 'Servizio momentaneamente non disponibile. Scrivici via email.' });
  }

  const date = new Intl.DateTimeFormat('it-IT', {
    dateStyle: 'short',
    timeStyle: 'short',
    timeZone: 'Europe/Rome',
  }).format(new Date());
  const rows: [string, string][] = [
    ['Nome', name],
    ['Email', email],
    ['Telefono', phone || '—'],
    ['Provenienza', SOURCES[source]],
    ['Data', date],
  ];
  const nl2br = (s: string) => esc(s).replace(/\n/g, '<br>');
  const h = 'font-family:Georgia,serif;font-weight:400';

  const html = `<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.6;color:#1d1d1b">
<h2 style="${h}">Nuova richiesta dal sito</h2>
<table cellpadding="6" style="border-collapse:collapse">${rows
    .map(([l, v]) => `<tr><td style="color:#6b5855">${esc(l)}</td><td>${esc(v)}</td></tr>`)
    .join('')}</table>
<h3 style="${h}">Messaggio</h3><p>${nl2br(message)}</p>
${estimate ? `<h3 style="${h}">Risposte al preventivatore</h3><p>${nl2br(estimate)}</p>` : ''}
<p style="color:#6b5855;font-size:13px">Consenso privacy: sì. Rispondi direttamente a questa email per scrivere a ${esc(name)}.</p>
</div>`;

  const text = [
    'Nuova richiesta dal sito',
    '',
    ...rows.map(([l, v]) => `${l}: ${v}`),
    '',
    'Messaggio:',
    message,
    ...(estimate ? ['', 'Risposte al preventivatore:', estimate] : []),
  ].join('\n');

  const resend = new Resend(RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: MAIL_FROM,
    to: MAIL_TO.split(',').map((s) => s.trim()).filter(Boolean),
    replyTo: `${name.replace(/["<>]/g, '')} <${email}>`,
    subject: `Nuova richiesta dal sito · ${SOURCES[source]} · ${name}`.slice(0, 180),
    html,
    text,
  });

  if (error) {
    console.error('[contatti] errore Resend:', error.name, error.message);
    return json(502, {
      ok: false,
      message: 'Non siamo riusciti a inviare il messaggio. Riprova o scrivici via email.',
    });
  }

  recordHit(ip, now);
  return json(200, { ok: true, message: 'Grazie, richiesta inviata.' });
};

// Qualsiasi altro metodo: 405
export const ALL: APIRoute = () =>
  new Response(null, { status: 405, headers: { Allow: 'POST' } });
