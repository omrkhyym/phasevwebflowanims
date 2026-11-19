/* BonV motion helpers for pages (no dependency).
   - Entrances: elements with [data-bv-in] fade in, rise 24 px and unblur 8 px when they enter the viewport,
     out-quint 800 ms, staggered 60 ms inside a [data-bv-group]. Content stays visible without JS
     (the hidden start state only applies once <html> has the .bv-motion class, set here).
   - Keywords: .bv-key underlines draw on when their parent enters.
   - Respects prefers-reduced-motion (everything shows at once).
   Usage: <script src="bonv-motion.js" defer></script>  */
(function () {
  'use strict';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window)) return;
  document.documentElement.classList.add('bv-motion');
  function prime(root) {
    root.querySelectorAll('[data-bv-group]').forEach(g => g.querySelectorAll('[data-bv-in]').forEach((el, i) => el.style.setProperty('--i', i)));
  }
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (!e.isIntersecting) return; e.target.classList.add('is-in'); e.target.querySelectorAll('.bv-key').forEach(k => k.classList.add('is-on')); io.unobserve(e.target); });
  }, { rootMargin: '0px 0px -12% 0px', threshold: .15 });
  function init() { prime(document); document.querySelectorAll('[data-bv-in]').forEach(el => io.observe(el)); }
  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
  window.BonVMotion = { observe: el => io.observe(el), prime };
})();
