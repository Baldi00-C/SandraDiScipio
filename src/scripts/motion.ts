/**
 * Scroll entrances and photo curtains (Figma "05 · Motion principles", D-091).
 * Adds `is-revealed` to every `[data-reveal]` and `[data-curtain]` element the
 * first time about 14 % of it enters the viewport (−6 % lower margin), and
 * never replays. With reduced motion everything is revealed at once.
 * A page opened in a background tab is also shown at once, without
 * transitions: browsers pause them while the page is hidden, which would
 * leave the content invisible (`motion-off`).
 */
const targets = document.querySelectorAll<HTMLElement>("[data-reveal], [data-curtain]");
const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const hidden = document.visibilityState === "hidden";

if (hidden) document.documentElement.classList.add("motion-off");

if (reduced || hidden || !("IntersectionObserver" in window)) {
  targets.forEach((target) => target.classList.add("is-revealed"));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-revealed");
        observer.unobserve(entry.target);
      }
    },
    { threshold: 0.14, rootMargin: "0px 0px -6% 0px" }
  );
  targets.forEach((target) => observer.observe(target));
}

/**
 * 09 / Pointer-following light over `[data-pointer-light]` (Home hero): the
 * light follows the pointer with 12 % interpolation per frame and fades out
 * when the pointer leaves. Fine hovering pointers only.
 */
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

if (!reduced && finePointer) {
  document.querySelectorAll<HTMLElement>("[data-pointer-light]").forEach((zone) => {
    let targetX = 0;
    let targetY = 0;
    let x = 0;
    let y = 0;
    let frame = 0;
    let active = false;

    const loop = () => {
      x += (targetX - x) * 0.12;
      y += (targetY - y) * 0.12;
      zone.style.setProperty("--lx", `${x.toFixed(1)}px`);
      zone.style.setProperty("--ly", `${y.toFixed(1)}px`);
      const moving = Math.abs(targetX - x) > 0.5 || Math.abs(targetY - y) > 0.5;
      frame = active || moving ? requestAnimationFrame(loop) : 0;
    };

    zone.addEventListener("pointermove", (event) => {
      const box = zone.getBoundingClientRect();
      targetX = event.clientX - box.left;
      targetY = event.clientY - box.top;
      if (!active) {
        active = true;
        x = targetX;
        y = targetY;
        zone.classList.add("light-on");
      }
      if (!frame) frame = requestAnimationFrame(loop);
    });

    zone.addEventListener("pointerleave", () => {
      active = false;
      zone.classList.remove("light-on");
    });
  });
}
