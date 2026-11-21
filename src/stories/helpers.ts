// Utility comuni alle storie del design system.

/** Crea un elemento da una stringa HTML. */
export function html(markup: string): HTMLElement {
  const template = document.createElement("template");
  template.innerHTML = markup.trim();
  return template.content.firstElementChild as HTMLElement;
}

/** Converte "rgb(29, 29, 27)" in "#1D1D1B". */
export function rgbToHex(rgb: string): string {
  const parts = rgb.match(/[\d.]+/g);
  if (!parts || parts.length < 3) return rgb;
  return (
    "#" +
    parts
      .slice(0, 3)
      .map((n) => Math.round(Number(n)).toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase()
  );
}

/**
 * Dopo il montaggio della storia, scrive nei nodi [data-read] il valore
 * calcolato dal browser: così i valori mostrati vengono dal CSS dei token,
 * non da una copia scritta a mano.
 */
export function fillComputedValues(root: HTMLElement): void {
  requestAnimationFrame(() => {
    root.querySelectorAll<HTMLElement>("[data-read]").forEach((node) => {
      const target = node.dataset.target
        ? root.querySelector<HTMLElement>(node.dataset.target)
        : node.closest<HTMLElement>("[data-sample]")?.querySelector<HTMLElement>("[data-probe]");
      if (!target) return;
      const style = getComputedStyle(target);
      const kind = node.dataset.read;
      if (kind === "bg") node.textContent = rgbToHex(style.backgroundColor);
      if (kind === "type") {
        const size = parseFloat(style.fontSize);
        const line = parseFloat(style.lineHeight);
        const tracking = parseFloat(style.letterSpacing) || 0;
        node.textContent = [
          `${round(size)} px`,
          `interlinea ${round(line)} px`,
          `spaziatura ${round((tracking / size) * 100)}%`,
          `peso ${style.fontWeight}`,
        ].join(" · ");
      }
      if (kind === "width") node.textContent = `${round(parseFloat(style.width))} px`;
    });
  });
}

function round(n: number): number {
  return Math.round(n * 100) / 100;
}

/** Intestazione di pagina nello stile della tavola Foundations di Figma. */
export function pageHeader(section: string, title: string, intro: string): string {
  return `
    <header class="mb-12 border-b border-border-default pb-8">
      <p class="type-eyebrow text-text-secondary">SANDRA DI SCIPIO / DESIGN SYSTEM / ${section}</p>
      <h1 class="type-h1 mt-3 text-text-primary">${title}</h1>
      <p class="type-body-small mt-3 max-w-2xl text-text-secondary">${intro}</p>
    </header>`;
}
