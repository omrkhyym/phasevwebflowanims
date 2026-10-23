/* Barres de comparaison des cas Evidence (Home).
   Monté sur le bloc des barres : <div data-pv="evidence-bars">…</div>. Les libellés et les valeurs restent dans Webflow ;
   chaque remplissage porte data-value et data-max, le module en tire la largeur et anime l'entrée.
   Un cas hors écran (slide suivante du Swiper) ne s'anime qu'à son arrivée. */

export function initEvidenceBars(root) {
  if (root.dataset.pvReady) return;
  root.dataset.pvReady = '1';

  const fills = [...root.querySelectorAll('[data-value]')];
  if (!fills.length) return () => {};

  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  fills.forEach((el, i) => {
    const v = parseFloat(el.dataset.value);
    const max = parseFloat(el.dataset.max) || 1;
    const ratio = Number.isFinite(v) ? Math.max(0, Math.min(1, v / max)) : 0;
    el.style.width = (ratio * 100).toFixed(2) + '%';
    el.style.transformOrigin = 'left center';
    if (reduce) return;
    el.style.transform = 'scaleX(0)';
    el.style.transition = `transform 1.1s cubic-bezier(.65,0,.35,1) ${i * 0.12}s`;
  });
  if (reduce) return () => {};

  const show = () => fills.forEach(el => { el.style.transform = 'scaleX(1)'; });
  const io = new IntersectionObserver(entries => {
    if (!entries.some(e => e.isIntersecting)) return;
    show();
    io.disconnect();
  }, { threshold: 0.6 });
  io.observe(root);

  return function destroy() {
    io.disconnect();
  };
}
