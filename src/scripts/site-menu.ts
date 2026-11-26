/** Media query of the full desktop menu (`--breakpoint-desktop`, D-082). */
export const DESKTOP_MENU_QUERY = "(width >= 67.5rem)";

/**
 * Wires the full-screen mobile menu (D-062): a modal <dialog> opened by
 * `[data-menu-open]` and closed by `[data-menu-close]`, Esc (native), a link
 * inside it, or a resize to the desktop layout.
 */
export function setupSiteMenu(root: Document): void {
  const dialog = root.querySelector<HTMLDialogElement>("#site-menu");
  const openButton = root.querySelector<HTMLButtonElement>("[data-menu-open]");
  if (!dialog || !openButton) return;

  openButton.addEventListener("click", () => {
    dialog.showModal();
    openButton.setAttribute("aria-expanded", "true");
  });

  dialog.addEventListener("close", () => {
    openButton.setAttribute("aria-expanded", "false");
  });

  dialog.addEventListener("click", (event) => {
    const target = event.target as Element | null;
    if (target?.closest("[data-menu-close]") || target?.closest("nav a")) dialog.close();
  });

  const desktop = root.defaultView?.matchMedia(DESKTOP_MENU_QUERY);
  desktop?.addEventListener("change", (event) => {
    if (event.matches && dialog.open) dialog.close();
  });
}
