/* Lien « Back to top » du footer ([data-pv="back-to-top"], composant footer-bottom) : remontée en haut de page avec
   un easing (quint en entrée-sortie, durée selon la distance, 0,8 à 1,8 s), par Lenis quand il tourne, sinon par
   requestAnimationFrame. Le lien garde href="#" : sans JS il remonte quand même. Reduced motion : remontée immédiate.
   Le focus revient en haut de page (sur le body) pour que la navigation au clavier reparte du début. Retourne destroy(). */

const ease = t => (t < .5 ? 16 * t ** 5 : 1 - (-2 * t + 2) ** 5 / 2);
const reduce = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function focusTop() {
  const b = document.body;
  const had = b.hasAttribute('tabindex');
  if (!had) b.setAttribute('tabindex', '-1');
  b.focus({ preventScroll: true });
  if (!had) b.addEventListener('blur', () => b.removeAttribute('tabindex'), { once: true });
}

export function initBackToTop(root) {
  if (!root || root.dataset.pvInit) return null;
  root.dataset.pvInit = '1';
  let raf = 0;

  const onClick = (e) => {
    e.preventDefault();
    const y = window.scrollY || document.documentElement.scrollTop;
    if (y <= 0) return focusTop();
    if (reduce()) {
      if (window.lenis) window.lenis.scrollTo(0, { immediate: true, force: true });
      else window.scrollTo(0, 0);
      return focusTop();
    }
    const duration = Math.min(1.8, Math.max(.8, y / 3000));
    if (window.lenis && typeof window.lenis.scrollTo === 'function') {
      window.lenis.scrollTo(0, { duration, easing: ease, force: true, onComplete: focusTop });
      return;
    }
    cancelAnimationFrame(raf);
    const t0 = performance.now();
    const step = (now) => {
      const p = Math.min(1, (now - t0) / (duration * 1000));
      window.scrollTo(0, y * (1 - ease(p)));
      if (p < 1) raf = requestAnimationFrame(step); else focusTop();
    };
    raf = requestAnimationFrame(step);
  };

  root.addEventListener('click', onClick);
  return function destroy() {
    cancelAnimationFrame(raf);
    root.removeEventListener('click', onClick);
    delete root.dataset.pvInit;
  };
}
