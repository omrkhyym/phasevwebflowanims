/* PhaseV · hero /response-optimizer · nuage de patients
   Monté dans <div data-pv="response-hero-bg"></div>, premier enfant du header du hero.
   Un point = un patient. Les points se rangent par score pronostique, puis les traités
   s'écartent là où le traitement agit, et ceux qui en bénéficient passent en jaune.
   Le nuage s'atténue côté texte. Titre, texte et boutons restent dans Webflow. */

const SEL = '[data-pv="response-hero-bg"]';

/* CSS ciblé sur le header qui contient notre div : aucune classe Webflow n'est modifiée. */
const CSS = `
:has(> ${SEL}){ position:relative; overflow:hidden; }
:has(> ${SEL}) > :not(${SEL}){ position:relative; z-index:1; }
${SEL}{ position:absolute; inset:0; z-index:0; pointer-events:none; }
${SEL} canvas{ position:absolute; inset:0; width:100%; height:100%; display:block; }`;

function injectCSS() {
  if (document.getElementById('pv-response-hero-css')) return;
  const s = document.createElement('style');
  s.id = 'pv-response-hero-css';
  s.textContent = CSS;
  document.head.appendChild(s);
}

const TAU = Math.PI * 2;
const cl = v => Math.max(0, Math.min(1, v)), seg = (t, a, b) => cl((t - a) / (b - a));
const ease = v => v < .5 ? 4 * v * v * v : 1 - Math.pow(-2 * v + 2, 3) / 2;
const smooth = (a, b, v) => { const k = cl((v - a) / (b - a)); return k * k * (3 - 2 * k); };
function rng(s) { return () => { s |= 0; s = s + 0x6D2B79F5 | 0; let t = Math.imul(s ^ s >>> 15, 1 | s); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }

/* Chronologie (secondes) */
const T_IN = 0, T_SORT = 1.6, T_SEP = 4.6, T_YEL = 6.0, T_BACK = 11, LOOP = 13.4;
const N = 1400;
const MAU = [146, 138, 205], BLU = [120, 168, 224], YEL = [226, 199, 10];

export function initResponseHeroBg(root) {
  if (!root || root.dataset.pvInit) return;
  const cv = document.createElement('canvas');
  cv.setAttribute('aria-hidden', 'true');
  const x = cv.getContext('2d'); if (!x) return;
  root.dataset.pvInit = '1';
  injectCSS();
  root.appendChild(cv);

  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const R = rng(5), gauss = () => Math.sqrt(-2 * Math.log(R() + 1e-9)) * Math.cos(TAU * R());

  /* u   : score pronostique de base (axe horizontal une fois ordonné)
     arm : 0 contrôle, 1 traité
     Le bénéfice du traitement n'existe que dans la partie haute du score. */
  const base = u => .14 + .48 * u, eff = u => .26 * smooth(.5, .88, u);
  const P = [];
  for (let i = 0; i < N; i++) {
    const u = R(), arm = i & 1, res = gauss() * .035;
    P.push({
      u, arm, ph: R() * TAU,
      // état 0 : la position sur l'axe est inconnue, tout le monde est mélangé
      x0: R(), y0: .48 + gauss() * .15,
      // état 1 : ordonnés par score pronostique, le bruit prévisible disparaît
      y1: base(u) + res,
      // état 2 : les traités s'écartent là où le traitement agit
      y2: base(u) + res + arm * eff(u),
      win: arm === 1 && eff(u) > .09
    });
  }

  let W = 0, H = 0, mobile = false;
  function fit() {
    const r = root.getBoundingClientRect(); if (!r.width || !r.height) return;
    const d = Math.min(devicePixelRatio || 1, 2);
    W = r.width; H = r.height; cv.width = Math.round(W * d); cv.height = Math.round(H * d); x.setTransform(d, 0, 0, d, 0, 0);
    mobile = W < 900; if (reduce) frame(9);
  }
  const ro = new ResizeObserver(fit);
  ro.observe(root);

  /* La souris est écoutée sur le header qui porte la div, le canvas reste en pointer-events:none. */
  const host = root.parentElement || document.body;
  const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
  const onMove = e => {
    const r = root.getBoundingClientRect();
    mouse.tx = (e.clientX - r.left) / r.width - .5; mouse.ty = (e.clientY - r.top) / r.height - .5;
  };
  host.addEventListener('pointermove', onMove, { passive: true });

  /* Atténuation côté texte : le nuage s'efface sous la colonne de gauche. */
  const fade = px => mobile ? .55 : .22 + .78 * smooth(W * .22, W * .62, px);

  function frame(t) {
    x.clearRect(0, 0, W, H);
    mouse.x += (mouse.tx - mouse.x) * .05; mouse.y += (mouse.ty - mouse.y) * .05;
    const mx = reduce ? 0 : -mouse.x * 12, my = reduce ? 0 : -mouse.y * 8;
    const X = v => W * (.04 + .92 * v) + mx, Y = v => H * (.92 - .78 * v) + my;
    const back = ease(seg(t, T_BACK, T_BACK + 2));
    const yel = ease(seg(t, T_YEL, T_YEL + .9)) * (1 - back);
    const inA = ease(seg(t, T_IN, T_IN + 1.2));
    const r = Math.max(1.3, Math.min(W, H) * .0019);

    for (const p of P) {
      // le tri se propage de gauche à droite, le retour au mélange aussi
      const k1 = ease(seg(t, T_SORT + p.u * 1.4, T_SORT + p.u * 1.4 + 1.4)) * (1 - back);
      const k2 = ease(seg(t, T_SEP + p.u * .6, T_SEP + p.u * .6 + 1.1)) * (1 - back);
      const jit = (1 - k1) * .012 + .003;
      const xx = p.x0 + (p.u - p.x0) * k1 + jit * Math.sin(t * .9 + p.ph);
      const yy = p.y0 + (p.y1 - p.y0) * k1 + (p.y2 - p.y1) * k2 + jit * Math.cos(t * .8 + p.ph * 1.3);
      const px = X(xx), py = Y(yy), f = fade(px);
      const c = p.arm ? BLU : MAU;
      const a = inA * f * (.34 + .12 * k1);
      x.fillStyle = `rgba(${c[0]},${c[1]},${c[2]},${a.toFixed(3)})`;
      x.beginPath(); x.arc(px, py, r, 0, TAU); x.fill();
      // le jaune ne marque que les traités qui bénéficient (moment de décision)
      if (p.win && yel > 0) {
        x.fillStyle = `rgba(${YEL[0]},${YEL[1]},${YEL[2]},${(yel * f * .9).toFixed(3)})`;
        x.beginPath(); x.arc(px, py, r * 1.15, 0, TAU); x.fill();
      }
    }
  }

  fit();

  /* ---------- boucle : ne tourne que visible, onglet actif, sans reduced-motion ---------- */
  let raf = 0, running = false, visible = false, t = 0, last = 0;
  function loop(now) {
    raf = requestAnimationFrame(loop);
    const dt = Math.min((now - last) / 1000, .05); last = now;
    t = (t + dt) % LOOP; frame(t);
  }
  function start() { if (running || reduce || !visible || document.hidden) return; running = true; last = performance.now(); raf = requestAnimationFrame(loop); }
  function stop() { if (!running) return; running = false; cancelAnimationFrame(raf); }

  const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; visible ? start() : stop(); });
  io.observe(root);
  const onVis = () => { document.hidden ? stop() : start(); };
  document.addEventListener('visibilitychange', onVis);

  return function destroy() {
    stop(); io.disconnect(); ro.disconnect();
    document.removeEventListener('visibilitychange', onVis);
    host.removeEventListener('pointermove', onMove);
    cv.remove(); delete root.dataset.pvInit;
  };
}
