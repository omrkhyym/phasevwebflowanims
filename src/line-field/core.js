/* Socle du line field (repris de mount() du proto 7).
   Canvas, ResizeObserver, DPR plafonné à 2, souris lissée avec présence, masque de calm zone,
   pause hors écran, reduced motion (frame statique), fondu d'entrée de 1,2 s.
   Différence avec le proto : une seule boucle rAF pour toutes les instances, arrêtée quand aucune n'est visible. */

import { injectLineFieldCSS } from './css.js';

/* Zones de calme par défaut : blocs de texte, boutons et cartes. Seuls les éléments les plus englobants
   sont retenus (un titre dans un section-top ne compte pas deux fois). Surcharge : data-line-calm="<sélecteur>"
   sur la section ; ajout au cas par cas : data-line-calm-item. */
const DEFAULT_CALM = [
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', '.w-richtext', '.w-button', '.button',
  '[class*="text-size-"]', '[class*="section-top"]', '[class*="card"]', '[class*="ev-case"]', '[class*="glance-stat"]',
].join(',');

const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- boucle partagée ---------- */
const live = new Set();
let raf = 0, last = 0;
function loop(now) {
  const dt = Math.max(0, Math.min((now - last) / 1000, .05)); last = now;
  let any = false;
  // une instance visible pas encore mesurée garde la boucle en vie (sinon l'IntersectionObserver,
  // qui peut répondre avant le premier resize, l'arrêterait pour de bon)
  for (const it of live) if (it.vis) { any = true; if (it.S.W) it.tick(dt); }
  raf = any ? requestAnimationFrame(loop) : 0;
}
function wake() {
  if (raf || reduced) return;
  last = performance.now();
  raf = requestAnimationFrame(loop);
}

export function mountLineField(sec, Kind) {
  injectLineFieldCSS();
  if (getComputedStyle(sec).position === 'static') sec.style.position = 'relative';

  const cv = document.createElement('canvas');
  cv.className = 'pv-lf pv-layer';
  cv.setAttribute('aria-hidden', 'true');
  sec.prepend(cv);
  const x = cv.getContext('2d');
  const mask = document.createElement('canvas'), mk = mask.getContext('2d');
  const m = { x: 0, y: 0, tx: 0, ty: 0, a: 0, in: false };
  const S = { W: 0, H: 0, dpr: 1, m, nx: 0, ny: 0, fade: reduced ? 1 : 0,
    /* éclaircissement local, ellipse étirée en largeur */
    glow: (px, py, rx = 240, ry = 90) => { if (m.a < .01) return 0; const dx = (px - m.x) / rx, dy = (py - m.y) / ry; return m.a * Math.exp(-(dx * dx + dy * dy)); } };
  const tex = Kind(S);
  let T = reduced ? 9 : 0;

  /* ---------- calm zone ---------- */
  let calmEls = [];
  const calmRO = new ResizeObserver(() => scheduleMask());
  function collectCalm() {
    const sel = sec.dataset.lineCalm || DEFAULT_CALM;
    const r0 = sec.getBoundingClientRect(), area = r0.width * r0.height;
    let els = [...sec.querySelectorAll(sel), ...sec.querySelectorAll('[data-line-calm-item]')]
      .filter(el => !el.classList.contains('pv-layer'))
      .filter(el => { const r = el.getBoundingClientRect(); return r.width > 0 && r.height > 0 && r.width * r.height < area * .6; });
    els = [...new Set(els)];
    // ne garder que les plus englobants
    els = els.filter(el => !els.some(o => o !== el && o.contains(el)));
    calmRO.disconnect();
    els.forEach(el => calmRO.observe(el));
    calmEls = els;
  }
  /* Chaque bloc retire jusqu'à 78 % de la texture, avec un fondu de 90 px autour.
     Empilement de rectangles en destination-out, pas de ctx.filter (Safari). */
  function buildMask() {
    mask.width = cv.width; mask.height = cv.height;
    mk.setTransform(S.dpr, 0, 0, S.dpr, 0, 0);
    mk.globalCompositeOperation = 'source-over'; mk.fillStyle = '#fff'; mk.fillRect(0, 0, S.W, S.H);
    mk.globalCompositeOperation = 'destination-out';
    const r0 = sec.getBoundingClientRect(), F = 90, DEPTH = .78, N = 16, a = 1 - Math.pow(1 - DEPTH, 1 / N);
    mk.fillStyle = 'rgba(0,0,0,' + a + ')';
    calmEls.forEach(el => {
      const r = el.getBoundingClientRect(), L = r.left - r0.left, Tp = r.top - r0.top;
      if (!r.width || !r.height) return;
      for (let i = 0; i < N; i++) { const e = F * (1 - i / N);
        mk.beginPath();
        if (mk.roundRect) mk.roundRect(L - e, Tp - e, r.width + 2 * e, r.height + 2 * e, e + 8); else mk.rect(L - e, Tp - e, r.width + 2 * e, r.height + 2 * e);
        mk.fill(); }
    });
  }
  let maskRaf = 0;
  function scheduleMask() {
    if (maskRaf) return;
    maskRaf = requestAnimationFrame(() => { maskRaf = 0; if (!S.W) return; buildMask(); if (reduced) frame(0); });
  }

  /* ---------- rendu ---------- */
  function frame(dt) {
    const k = 1 - Math.exp(-dt * 8);
    m.x += (m.tx - m.x) * k; m.y += (m.ty - m.y) * k; m.a += ((m.in ? 1 : 0) - m.a) * (1 - Math.exp(-dt * 4));
    S.nx = (m.x / S.W - .5) * 2 * m.a; S.ny = (m.y / S.H - .5) * 2 * m.a;
    if (S.fade < 1) S.fade = Math.min(1, S.fade + dt / 1.2);
    x.setTransform(S.dpr, 0, 0, S.dpr, 0, 0); x.globalCompositeOperation = 'source-over'; x.globalAlpha = 1;
    x.clearRect(0, 0, S.W, S.H);
    x.globalAlpha = S.fade; tex.draw(x, T, dt); x.globalAlpha = 1;
    x.setTransform(1, 0, 0, 1, 0, 0); x.globalCompositeOperation = 'destination-in'; x.drawImage(mask, 0, 0);
    x.globalCompositeOperation = 'source-over';
  }

  function resize() {
    S.dpr = Math.min(devicePixelRatio || 1, 2); const r = sec.getBoundingClientRect(); S.W = r.width; S.H = r.height;
    if (!S.W || !S.H) return;
    cv.width = Math.max(1, Math.round(S.W * S.dpr)); cv.height = Math.max(1, Math.round(S.H * S.dpr));
    if (!m.in) { m.x = m.tx = S.W / 2; m.y = m.ty = S.H / 2; }
    collectCalm(); buildMask(); tex.resize(T);
    if (reduced) frame(0); else if (it.vis) wake();
  }

  /* ---------- souris ---------- */
  const onMove = e => { const r = sec.getBoundingClientRect(); m.tx = e.clientX - r.left; m.ty = e.clientY - r.top;
    if (m.a < .02) { m.x = m.tx; m.y = m.ty; } m.in = true; };
  const onLeave = () => { m.in = false; };
  sec.addEventListener('pointermove', onMove, { passive: true });
  sec.addEventListener('pointerleave', onLeave, { passive: true });

  const it = { S, vis: false, tick(dt) { T += dt; frame(dt); } };
  live.add(it);
  const io = new IntersectionObserver(([e]) => { it.vis = e.isIntersecting; if (it.vis) wake(); });
  io.observe(sec);
  const ro = new ResizeObserver(resize);
  ro.observe(sec);
  if (document.fonts) document.fonts.ready.then(scheduleMask);

  return function destroy() {
    live.delete(it);
    io.disconnect(); ro.disconnect(); calmRO.disconnect();
    if (maskRaf) cancelAnimationFrame(maskRaf);
    sec.removeEventListener('pointermove', onMove);
    sec.removeEventListener('pointerleave', onLeave);
    cv.remove();
    delete sec.dataset.pvLine;
  };
}
