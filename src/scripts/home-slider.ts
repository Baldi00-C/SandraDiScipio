/**
 * Featured projects slider of the Home (D-090). Without JavaScript every
 * slide is listed; with it one slide is shown and the arrows move through
 * them, wrapping around. On every change the photo curtains replay and the
 * text comes back from 14 px (motion 08, D-091).
 */

/** Plays the curtains and the text entrance of a slide again. */
function replayMotion(slide: HTMLElement): void {
  const curtains = slide.querySelectorAll<HTMLElement>("[data-curtain]");
  curtains.forEach((frame) => {
    frame.classList.add("curtain-reset");
    frame.classList.remove("is-revealed");
  });
  const text = slide.querySelector<HTMLElement>("[data-slide-text]");
  text?.classList.remove("slide-enter");
  void slide.offsetWidth; // apply the closed curtains before animating again
  requestAnimationFrame(() => {
    curtains.forEach((frame) => {
      frame.classList.remove("curtain-reset");
      frame.classList.add("is-revealed");
    });
    text?.classList.add("slide-enter");
  });
}

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
  const move = (step: number) => {
    show(current + step);
    replayMotion(slides[current]);
  };

  controls.hidden = false;
  previous.addEventListener("click", () => move(-1));
  next.addEventListener("click", () => move(1));
  show(0);
}

document.querySelectorAll<HTMLElement>("[data-slider]").forEach(setupSlider);
