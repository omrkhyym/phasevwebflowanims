/* Témoignages de la Home : une citation à la une, les partenaires en onglets dessous.
   Structure native dans Webflow : <div data-pv="testimonials"> > .tm-panes > .tm-quote (une par partenaire)
   et .tm-tabs > .tm-tab (même ordre), chaque onglet contenant un .tm-bar (trait de progression).
   Le module ne fait que basculer la classe is-active (styles dans Webflow : .tm-quote.is-active, .tm-tab.is-active).
   Défilement auto toutes les 8 s quand le bloc est à l'écran, pause au survol ou au focus ; le trait de l'onglet actif
   se remplit pendant l'attente. Reduced motion : pas de défilement, trait plein. Retourne destroy(). */

const DUR = 8000;

export function initTestimonials(root) {
  if (!root || root.dataset.pvInit) return null;
  root.dataset.pvInit = '1';
  const tabs = [...root.querySelectorAll('.tm-tab')];
  const panes = [...root.querySelectorAll('.tm-quote')];
  if (!tabs.length || tabs.length !== panes.length) { delete root.dataset.pvInit; return null; }
  const bars = tabs.map((t) => t.querySelector('.tm-bar'));
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let cur = 0, t0 = 0, raf = 0, visible = false, paused = false, prog = 0;

  const list = tabs[0].parentElement;
  list.setAttribute('role', 'tablist');
  tabs.forEach((t, i) => {
    t.setAttribute('role', 'tab');
    t.tabIndex = 0;
    t.id = t.id || `tm-tab-${i}`;
    panes[i].id = panes[i].id || `tm-quote-${i}`;
    t.setAttribute('aria-controls', panes[i].id);
    panes[i].setAttribute('role', 'tabpanel');
    panes[i].setAttribute('aria-labelledby', t.id);
  });

  const setBar = (i, k) => { if (bars[i]) bars[i].style.transform = `scaleX(${k})`; };
  function show(i) {
    cur = (i + tabs.length) % tabs.length; t0 = performance.now(); prog = 0;
    tabs.forEach((t, k) => {
      const on = k === cur;
      t.classList.toggle('is-active', on);
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      setBar(k, on && reduced ? 1 : 0);
    });
    panes.forEach((p, k) => {
      const on = k === cur;
      p.classList.toggle('is-active', on);
      p.setAttribute('aria-hidden', on ? 'false' : 'true');
    });
  }
  function tick(now) {
    raf = requestAnimationFrame(tick);
    if (!visible || paused) { t0 = now - prog * DUR; return; }
    prog = Math.min(1, (now - t0) / DUR);
    setBar(cur, prog);
    if (prog >= 1) show(cur + 1);
  }

  const onClick = (e) => { const i = tabs.indexOf(e.target.closest('.tm-tab')); if (i >= 0) show(i); };
  const onKey = (e) => {
    const i = tabs.indexOf(e.target.closest('.tm-tab'));
    if (i < 0) return;
    let n = null;
    if (e.key === 'ArrowRight') n = i + 1; else if (e.key === 'ArrowLeft') n = i - 1;
    else if (e.key === 'Enter' || e.key === ' ') n = i;
    if (n === null) return;
    e.preventDefault(); show(n); tabs[cur].focus();
  };
  const pause = () => { paused = true; };
  const resume = () => { paused = false; };
  list.addEventListener('click', onClick);
  list.addEventListener('keydown', onKey);
  root.addEventListener('pointerenter', pause, { passive: true });
  root.addEventListener('pointerleave', resume, { passive: true });
  root.addEventListener('focusin', pause);
  root.addEventListener('focusout', resume);
  show(0);

  let io = null;
  if (!reduced) {
    io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !raf) { t0 = performance.now() - prog * DUR; raf = requestAnimationFrame(tick); }
      else if (!visible) { cancelAnimationFrame(raf); raf = 0; }
    }, { threshold: 0.4 });
    io.observe(root);
  }

  return function destroy() {
    cancelAnimationFrame(raf); if (io) io.disconnect();
    list.removeEventListener('click', onClick); list.removeEventListener('keydown', onKey);
    root.removeEventListener('pointerenter', pause); root.removeEventListener('pointerleave', resume);
    root.removeEventListener('focusin', pause); root.removeEventListener('focusout', resume);
    delete root.dataset.pvInit;
  };
}
