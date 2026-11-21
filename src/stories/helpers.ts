// Shared helpers for the design system stories.

/** Creates an element from an HTML string. */
export function html(markup: string): HTMLElement {
  const template = document.createElement('template');
  template.innerHTML = markup.trim();
  return template.content.firstElementChild as HTMLElement;
}

/** Converts "rgb(29, 29, 27)" to "#1D1D1B". */
export function rgbToHex(rgb: string): string {
  const parts = rgb.match(/[\d.]+/g);
  if (!parts || parts.length < 3) return rgb;
  return (
    '#' +
    parts
      .slice(0, 3)
      .map((n) => Math.round(Number(n)).toString(16).padStart(2, '0'))
      .join('')
      .toUpperCase()
  );
}

/**
 * Once the story is mounted, writes the browser-computed value into every
 * [data-read] node, so the values shown come from the token CSS rather than
 * from a hand-written copy.
 */
export function fillComputedValues(root: HTMLElement): void {
  requestAnimationFrame(() => {
    root.querySelectorAll<HTMLElement>('[data-read]').forEach((node) => {
      const target = node.closest<HTMLElement>('[data-sample]')?.querySelector<HTMLElement>('[data-probe]');
      if (!target) return;
      const style = getComputedStyle(target);
      const kind = node.dataset.read;
      if (kind === 'bg') node.textContent = rgbToHex(style.backgroundColor);
      if (kind === 'type') {
        const size = parseFloat(style.fontSize);
        const lineHeight = parseFloat(style.lineHeight);
        const tracking = parseFloat(style.letterSpacing) || 0;
        node.textContent = [
          `${round(size)} px`,
          `line height ${round(lineHeight)} px`,
          `tracking ${round((tracking / size) * 100)}%`,
          `weight ${style.fontWeight}`,
        ].join(' · ');
      }
      if (kind === 'width') node.textContent = `${round(parseFloat(style.width))} px`;
    });
  });
}

function round(n: number): number {
  return Math.round(n * 100) / 100;
}

/** Full-page wrapper for a story, using semantic colors. */
export function page(body: string): HTMLElement {
  const root = html(
    `<div class="min-h-screen bg-background-canvas px-6 py-12 text-text-primary tablet:px-12">
      <div class="mx-auto max-w-site">${body}</div>
    </div>`,
  );
  fillComputedValues(root);
  return root;
}

/** Page header in the style of the Figma Foundations board. */
export function pageHeader(section: string, title: string, intro: string): string {
  return `
    <header class="mb-12 border-b border-border-default pb-8">
      <p class="type-eyebrow text-text-secondary">SANDRA DI SCIPIO / DESIGN SYSTEM / ${section}</p>
      <h1 class="type-h1 mt-3 text-text-primary">${title}</h1>
      <p class="type-body-small mt-3 max-w-2xl text-text-secondary">${intro}</p>
    </header>`;
}
