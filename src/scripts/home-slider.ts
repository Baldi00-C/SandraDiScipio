/**
 * Featured projects slider of the Home (D-088). Without JavaScript every
 * slide is listed; with it one slide is shown and the arrows move through
 * them, wrapping around.
 */
export function setupSlider(root: HTMLElement): void {
  const slides = [...root.querySelectorAll<HTMLElement>("[data-slide]")];
  const previous = root.querySelector<HTMLButtonElement>("[data-slide-previous]");
  const next = root.querySelector<HTMLButtonElement>("[data-slide-next]");
  const controls = root.querySelector<HTMLElement>("[data-slide-controls]");
  if (slides.length < 2 || !previous || !next || !controls) return;

  let current = 0;
  const show = (index: number) => {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      slide.hidden = slideIndex !== current;
    });
  };

  controls.hidden = false;
  previous.addEventListener("click", () => show(current - 1));
  next.addEventListener("click", () => show(current + 1));
  show(0);
}

document.querySelectorAll<HTMLElement>("[data-slider]").forEach(setupSlider);
