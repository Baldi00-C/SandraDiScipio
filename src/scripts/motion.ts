/**
 * Scroll entrances and photo curtains (Figma "05 · Motion principles", D-091).
 * Adds `is-revealed` to every `[data-reveal]` and `[data-curtain]` element the
 * first time about 14 % of it enters the viewport (−6 % lower margin), and
 * never replays. With reduced motion everything is revealed at once.
 */
const targets = document.querySelectorAll<HTMLElement>("[data-reveal], [data-curtain]");
const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (reduced || !("IntersectionObserver" in window)) {
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
