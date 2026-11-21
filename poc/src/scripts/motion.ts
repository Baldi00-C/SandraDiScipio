/**
 * Motion del sito (spec Figma "05 · Motion principles").
 * Tutto è disattivato con prefers-reduced-motion: testi e foto compaiono
 * subito nella posizione finale.
 */

const reduce = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;

let cleanups: Array<() => void> = [];

/* 02 · Scroll entrances + 03 · Photo curtain reveal ------------------------ */
function initReveals() {
  const reveals = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal], [data-curtain]'));
  if (!reveals.length) return;

  if (reduce() || !('IntersectionObserver' in window)) {
    reveals.forEach((el) => el.classList.add('is-revealed'));
    return;
  }

  // Ritardi di gruppo 0 / 100 / 200 ms
  document.querySelectorAll<HTMLElement>('[data-reveal-group]').forEach((group) => {
    group.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el, i) => {
      el.style.setProperty('--reveal-delay', `${Math.min(i, 2) * 100}ms`);
    });
  });

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          io.unobserve(entry.target); // non ripetere
        }
      }
    },
    { threshold: 0.14, rootMargin: '0px 0px -6% 0px' },
  );
  reveals.forEach((el) => io.observe(el));
  cleanups.push(() => io.disconnect());
}

/* 04 · Atmospheric imagery: parallax limitato al 7% / 14% ----------------- */
function initParallax() {
  if (reduce()) return; // anche la traslazione su scroll va protetta
  const layers = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'));
  if (!layers.length) return;

  let ticking = false;
  const update = () => {
    ticking = false;
    const vh = window.innerHeight;
    for (const layer of layers) {
      const frame = layer.parentElement;
      if (!frame) continue;
      const rect = frame.getBoundingClientRect();
      if (rect.bottom < -100 || rect.top > vh + 100) continue;
      const amount = Number(layer.dataset.parallax) || 0.07;
      // progresso -1 (sotto) … 1 (sopra)
      const progress = Math.max(-1, Math.min(1, (rect.top + rect.height / 2 - vh / 2) / (vh / 2 + rect.height / 2)));
      layer.style.transform = `translate3d(0, ${(-progress * amount * rect.height).toFixed(1)}px, 0)`;
    }
  };
  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  };
  update();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  cleanups.push(() => {
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onScroll);
  });
}

/* 09 · Pointer-following light: maschera ~300 px, alone ~380 px, lerp 12% -- */
function initPointerLight() {
  if (reduce() || !finePointer()) return;
  document.querySelectorAll<HTMLElement>('[data-pointer-light]').forEach((zone) => {
    let tx = 0;
    let ty = 0;
    let x = 0;
    let y = 0;
    let raf = 0;
    let active = false;

    const loop = () => {
      x += (tx - x) * 0.12;
      y += (ty - y) * 0.12;
      zone.style.setProperty('--lx', `${x.toFixed(1)}px`);
      zone.style.setProperty('--ly', `${y.toFixed(1)}px`);
      if (active || Math.abs(tx - x) > 0.5 || Math.abs(ty - y) > 0.5) raf = requestAnimationFrame(loop);
      else raf = 0;
    };
    const onMove = (e: PointerEvent) => {
      const r = zone.getBoundingClientRect();
      tx = e.clientX - r.left;
      ty = e.clientY - r.top;
      if (!active) {
        active = true;
        x = tx;
        y = ty;
        zone.classList.add('light-on');
      }
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const onLeave = () => {
      active = false;
      zone.classList.remove('light-on');
    };
    zone.addEventListener('pointermove', onMove);
    zone.addEventListener('pointerleave', onLeave);
    cleanups.push(() => {
      zone.removeEventListener('pointermove', onMove);
      zone.removeEventListener('pointerleave', onLeave);
      cancelAnimationFrame(raf);
    });
  });
}

/* 10 · Marquee: scorre solo quando la sezione è visibile ------------------ */
function initMarquee() {
  const items = document.querySelectorAll<HTMLElement>('.marquee');
  if (!items.length || reduce() || !('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => e.target.classList.toggle('is-visible', e.isIntersecting));
  });
  items.forEach((m) => io.observe(m));
  cleanups.push(() => io.disconnect());
}

function init() {
  cleanups.forEach((fn) => fn());
  cleanups = [];
  initReveals();
  initParallax();
  initPointerLight();
  initMarquee();
}

document.addEventListener('astro:page-load', init);
document.addEventListener('astro:before-swap', () => {
  cleanups.forEach((fn) => fn());
  cleanups = [];
});
