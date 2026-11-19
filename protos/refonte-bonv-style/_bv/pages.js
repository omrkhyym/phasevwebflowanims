// Comportements communs des protos « style BonV ». Charger après bonv-bg.js, bonv-mark.js et bonv-motion.js.
(function () {
  'use strict';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (window.BonVBackground) BonVBackground.mount();

  // le V garde ses proportions dans sa composition (il est dessiné en px)
  document.querySelectorAll('[data-fit]').forEach(box => {
    const m = box.querySelector('bonv-mark'), k = +box.dataset.fit;
    if (m) new ResizeObserver(() => m.setAttribute('size', Math.round(box.clientWidth * k))).observe(box);
  });

  // champ « Ask BonV » : le V réfléchit pendant la saisie
  document.querySelectorAll('[data-ask]').forEach(field => {
    const mark = document.getElementById(field.dataset.ask);
    if (mark) field.addEventListener('input', () => mark.setAttribute('state', field.value ? 'think' : 'listen'));
  });

  // FAQ : une question ouverte à la fois
  document.querySelectorAll('.faq').forEach(list => {
    const all = [...list.querySelectorAll('details')];
    all.forEach(d => d.addEventListener('toggle', () => { if (d.open) all.forEach(o => { if (o !== d) o.open = false; }); }));
  });

  // plateforme en questions (Home) : onglets accessibles au clavier
  document.querySelectorAll('[data-tabs]').forEach(root => {
    const tabs = [...root.querySelectorAll('[role="tab"]')], panels = [...root.querySelectorAll('[role="tabpanel"]')];
    const select = i => {
      tabs.forEach((t, k) => { t.setAttribute('aria-selected', k === i); t.tabIndex = k === i ? 0 : -1; });
      panels.forEach((p, k) => p.classList.toggle('is-on', k === i));
    };
    tabs.forEach((t, i) => {
      t.addEventListener('click', () => select(i));
      t.addEventListener('keydown', e => {
        const d = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : e.key === 'ArrowUp' || e.key === 'ArrowLeft' ? -1 : 0;
        if (!d) return;
        e.preventDefault(); const n = (i + d + tabs.length) % tabs.length; select(n); tabs[n].focus();
      });
    });
    select(0);
  });

  // vidéos : lecture seulement à l'écran (pas de lecture automatique en mouvement réduit)
  const vids = document.querySelectorAll('video[data-auto]');
  if (vids.length && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting && !reduce) e.target.play().catch(() => {}); else e.target.pause();
    }), { threshold: .35 });
    vids.forEach(v => io.observe(v));
  }
})();
