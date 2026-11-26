/**
 * Full-screen image viewer of the project pages (D-073). Every
 * `[data-viewer-item]` button opens the `[data-image-viewer]` dialog at its
 * position; arrows (buttons or keyboard) move through the page images.
 */
import { formatCounter, wrapIndex } from "../lib/viewer";

const dialog = document.querySelector<HTMLDialogElement>("[data-image-viewer]");
const items = [...document.querySelectorAll<HTMLElement>("[data-viewer-item]")];

if (dialog && items.length > 0) {
  const image = dialog.querySelector<HTMLImageElement>("[data-viewer-image]")!;
  const caption = dialog.querySelector<HTMLElement>("[data-viewer-text]")!;
  const counter = dialog.querySelector<HTMLElement>("[data-viewer-counter]")!;
  const template = dialog.dataset.counter ?? "{current} / {total}";
  let current = 0;

  const setZoom = (zoomed: boolean, event?: MouseEvent) => {
    if (zoomed && event) {
      const box = image.getBoundingClientRect();
      image.style.transformOrigin = `${event.clientX - box.left}px ${event.clientY - box.top}px`;
    }
    image.style.transform = zoomed ? "scale(2)" : "";
    image.dataset.zoomed = String(zoomed);
  };

  const show = (index: number) => {
    current = index;
    const item = items[current];
    setZoom(false);
    image.src = item.dataset.viewerSrc ?? "";
    image.alt = item.dataset.viewerAlt ?? "";
    caption.textContent = item.dataset.viewerCaption ?? "";
    counter.textContent = formatCounter(template, current, items.length);
  };

  const move = (step: number) => show(wrapIndex(current, step, items.length));

  items.forEach((item, index) =>
    item.addEventListener("click", () => {
      show(index);
      dialog.showModal();
    })
  );

  dialog.querySelector("[data-viewer-close]")?.addEventListener("click", () => dialog.close());
  dialog.querySelector("[data-viewer-previous]")?.addEventListener("click", () => move(-1));
  dialog.querySelector("[data-viewer-next]")?.addEventListener("click", () => move(1));
  if (items.length < 2) dialog.querySelector<HTMLElement>("[data-viewer-nav]")?.setAttribute("hidden", "");

  dialog.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") move(-1);
    if (event.key === "ArrowRight") move(1);
  });

  // Double tap / double click zooms in on that point (pinch zoom is native)
  image.addEventListener("dblclick", (event) => setZoom(image.dataset.zoomed !== "true", event));
}
