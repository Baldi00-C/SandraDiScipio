import { isLocale, localeCookie } from '../i18n';

/**
 * Remembers the locale picked with the language switcher (D-046):
 * any link with `data-locale-choice="<locale>"` stores it on click.
 */
document.addEventListener('click', (event) => {
  const link = (event.target as Element | null)?.closest<HTMLElement>('[data-locale-choice]');
  const locale = link?.dataset.localeChoice;
  if (isLocale(locale)) document.cookie = localeCookie(locale);
});
