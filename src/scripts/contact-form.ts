/**
 * Gestione dei moduli [data-contact-form]:
 * - token CSRF caricato al primo focus (GET /api/csrf-token.php)
 * - validazione accessibile (aria-invalid + messaggio accanto al campo)
 * - invio con Fetch API (POST /api/send-mail.php), stato di caricamento
 *   che impedisce invii doppi, conferma animata (motion 11)
 */

const ENDPOINT_TOKEN = '/api/csrf-token.php';
const ENDPOINT_SEND = '/api/send-mail.php';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type ServerResponse = {
  ok: boolean;
  message?: string;
  errors?: Record<string, string>;
};

async function fetchToken(form: HTMLFormElement): Promise<boolean> {
  const input = form.querySelector<HTMLInputElement>('[data-csrf]');
  if (!input) return false;
  try {
    const res = await fetch(ENDPOINT_TOKEN, {
      method: 'GET',
      credentials: 'same-origin',
      headers: { Accept: 'application/json' },
      cache: 'no-store',
    });
    if (!res.ok) return false;
    const data = (await res.json()) as { token?: string };
    if (data.token) {
      input.value = data.token;
      return true;
    }
  } catch {
    /* rete assente: si riprova all'invio */
  }
  return false;
}

function setFieldError(control: HTMLInputElement | HTMLTextAreaElement, message: string) {
  const field = control.closest<HTMLElement>('[data-field]');
  const err = field?.querySelector<HTMLElement>('[data-error]');
  control.setAttribute('aria-invalid', message ? 'true' : 'false');
  if (err) {
    err.textContent = message ? `Errore: ${message}` : '';
    err.hidden = !message;
  }
}

function validate(form: HTMLFormElement): Record<string, string> {
  const errors: Record<string, string> = {};
  const get = (n: string) => form.elements.namedItem(n) as HTMLInputElement | HTMLTextAreaElement | null;

  const name = get('name');
  if (name && name.value.trim().length < 2) errors.name = 'inserisci il tuo nome.';
  const email = get('email');
  if (email && !EMAIL_RE.test(email.value.trim())) errors.email = 'inserisci un indirizzo email valido.';
  const phone = get('phone');
  if (phone && phone.value.trim() && !/^[+0-9 ().-]{6,30}$/.test(phone.value.trim()))
    errors.phone = 'inserisci un numero di telefono valido.';
  const message = get('message');
  if (message && message.value.trim().length < 10) errors.message = 'scrivi almeno qualche parola sul tuo progetto.';
  if (message && message.value.length > 2000) errors.message = 'il messaggio supera i 2.000 caratteri.';
  const privacy = get('privacy') as HTMLInputElement | null;
  if (privacy && !privacy.checked) errors.privacy = 'serve il consenso al trattamento dei dati per inviare la richiesta.';

  ['name', 'email', 'phone', 'message', 'privacy'].forEach((n) => {
    const c = get(n);
    if (c) setFieldError(c, errors[n] ?? '');
  });
  return errors;
}

function setLoading(button: HTMLButtonElement | null, loading: boolean) {
  if (!button) return;
  const label = button.querySelector<HTMLElement>('.btn-label');
  if (loading) {
    button.dataset.idleLabel = label?.textContent ?? '';
    if (label) label.textContent = button.dataset.loadingLabel ?? 'Invio in corso…';
    button.dataset.loading = 'true';
    button.setAttribute('aria-disabled', 'true');
    button.disabled = true;
  } else {
    if (label && button.dataset.idleLabel) label.textContent = button.dataset.idleLabel;
    button.dataset.loading = 'false';
    button.removeAttribute('aria-disabled');
    button.disabled = false;
  }
}

function showFormError(form: HTMLFormElement, text?: string) {
  const notice = form.querySelector<HTMLElement>('.notice-error');
  if (!notice) return;
  const t = notice.querySelector<HTMLElement>('[data-notice-text]');
  if (t) t.textContent = text ?? 'Controlla i campi evidenziati e riprova.';
  notice.hidden = false;
  notice.focus();
}

function bind(form: HTMLFormElement) {
  if (form.dataset.bound === 'true') return;
  form.dataset.bound = 'true';

  const ts = form.querySelector<HTMLInputElement>('[data-ts]');
  if (ts) ts.value = String(Math.floor(Date.now() / 1000));

  let tokenRequested = false;
  form.addEventListener(
    'focusin',
    () => {
      if (tokenRequested) return;
      tokenRequested = true;
      void fetchToken(form);
    },
    { once: false },
  );

  // Rimuove l'errore mentre si corregge
  form.addEventListener('input', (e) => {
    const t = e.target as HTMLInputElement;
    if (t.getAttribute('aria-invalid') === 'true') setFieldError(t, '');
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const button = form.querySelector<HTMLButtonElement>('[data-submit]');
    if (button?.dataset.loading === 'true') return;

    const notice = form.querySelector<HTMLElement>('.notice-error');
    if (notice) notice.hidden = true;

    const errors = validate(form);
    if (Object.keys(errors).length) {
      showFormError(form);
      const first = form.querySelector<HTMLElement>('[aria-invalid="true"]');
      first?.focus();
      return;
    }

    setLoading(button, true);
    const csrf = form.querySelector<HTMLInputElement>('[data-csrf]');
    if (csrf && !csrf.value) await fetchToken(form);

    try {
      const res = await fetch(ENDPOINT_SEND, {
        method: 'POST',
        body: new FormData(form),
        credentials: 'same-origin',
        headers: { Accept: 'application/json', 'X-Requested-With': 'fetch' },
      });
      let data: ServerResponse = { ok: false };
      try {
        data = (await res.json()) as ServerResponse;
      } catch {
        data = { ok: false, message: 'Il server non ha risposto correttamente. Riprova più tardi.' };
      }

      if (res.ok && data.ok) {
        const wrap = form.closest<HTMLElement>('[data-contact-wrap]');
        const confirm = wrap?.querySelector<HTMLElement>('[data-confirm]');
        form.hidden = true;
        if (confirm) {
          confirm.hidden = false;
          confirm.classList.add('confirm-anim');
          confirm.focus();
        }
        form.dispatchEvent(new CustomEvent('contact:sent', { bubbles: true }));
        return;
      }

      if (data.errors) {
        Object.entries(data.errors).forEach(([n, msg]) => {
          const c = form.elements.namedItem(n) as HTMLInputElement | null;
          if (c) setFieldError(c, msg);
        });
      }
      // Token scaduto: se ne chiede uno nuovo per il prossimo tentativo
      if (res.status === 419 || res.status === 403) {
        if (csrf) csrf.value = '';
        await fetchToken(form);
      }
      showFormError(form, data.message);
    } catch {
      showFormError(form, 'Connessione non riuscita. Controlla la rete o scrivici direttamente via email.');
    } finally {
      setLoading(button, false);
    }
  });
}

export function initContactForms() {
  document.querySelectorAll<HTMLFormElement>('form[data-contact-form]').forEach(bind);
}
