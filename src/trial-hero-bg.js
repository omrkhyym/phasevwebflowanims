/* PhaseV · hero /trial-optimizer · courbes de puissance
   Monté dans <div data-pv="trial-hero-bg"></div>, premier enfant du header du hero.
   Une courbe par design. Une ligne verticale balaie les tailles d'effet et allume
   les points qu'elle croise, puis la courbe la plus robuste passe en jaune.
   Les courbes s'atténuent côté texte. Titre, texte et bouton restent dans Webflow. */

const SEL = '[data-pv="trial-hero-bg"]';

/* CSS ciblé sur le header qui contient notre div : aucune classe Webflow n'est modifiée. */
const CSS = `
:has(> ${SEL}){ position:relative; overflow:hidden; }
:has(> ${SEL}) > :not(${SEL}){ position:relative; z-index:1; }
${SEL}{ position:absolute; inset:0; z-index:0; pointer-events:none; }
${SEL} canvas{ position:absolute; inset:0; width:100%; height:100%; display:block; }`;

function injectCSS() {
  if (document.getElementById('pv-trial-hero-css')) return;
  const s = document.createElement('style');
  s.id = 'pv-trial-hero-css';
  s.textContent = CSS;
  document.head.appendChild(s);
}

const TAU = Math.PI * 2;
const cl = v => Math.max(0, Math.min(1, v)), seg = (t, a, b) => cl((t - a) / (b - a));
const ease = v => v < .5 ? 4 * v * v * v : 1 - Math.pow(-2 * v + 2, 3) / 2;
const smooth = (a, b, v) => { const k = cl((v - a) / (b - a)); return k * k * (3 - 2 * k); };
const rgba = (c, a) => `rgba(${c[0]},${c[1]},${c[2]},${Math.max(0, Math.min(1, a)).toFixed(3)})`;
const MAU = [146, 138, 205], BLU = [120, 168, 224], TEA = [127, 232, 207], PALE = [199, 196, 226], YEL = [226, 199, 10];

/* Courbes de puissance : x = taille d'effet réelle, y = probabilité de succès.
   Un design par courbe. Elles se croisent : aucun design ne gagne partout,
   sauf celui qu'on retient (index ROB), qui tient le mieux sur toute la plage. */
const DESIGNS = [
  { m: .50, s: .075, top: 1.00, c: MAU },   // fixe
  { m: .40, s: .11, top: .97, c: BLU },     // adaptatif, le plus robuste
  { m: .33, s: .06, top: .82, c: TEA },     // bayésien, fort tôt puis plafonne
  { m: .60, s: .05, top: 1.00, c: PALE }    // séquentiel groupé, tardif mais raide
];
const ROB = 1, ND = 240;
const pw = (d, u) => d.top / (1 + Math.exp(-(u - d.m) / d.s));

/* Chronologie (secondes) */
const T_IN = 0, T_SCAN = 1.6, SCAN = 5.2, T_YEL = 7.2, T_OUT = 11.4, LOOP = 13, STILL = 9;

export function initTrialHeroBg(root) {
  if (!root || root.dataset.pvInit) return;
  const cv = document.createElement('canvas');
  cv.setAttribute('aria-hidden', 'true');
  const x = cv.getContext('2d'); if (!x) return;
  root.dataset.pvInit = '1';
  injectCSS();
  root.appendChild(cv);

  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  let W = 0, H = 0, mobile = false;
  function fit() {
    const r = root.getBoundingClientRect(); if (!r.width || !r.height) return;
    const d = Math.min(devicePixelRatio || 1, 2);
    W = r.width; H = r.height; cv.width = Math.round(W * d); cv.height = Math.round(H * d); x.setTransform(d, 0, 0, d, 0, 0);
    mobile = W < 900; if (reduce) frame(STILL);
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

  /* Atténuation côté texte : les courbes s'effacent sous la colonne de gauche. */
  const fade = px => mobile ? .55 : .22 + .78 * smooth(W * .22, W * .62, px);

  function frame(T) {
    const t = reduce ? T : T % LOOP;
    x.clearRect(0, 0, W, H);
    mouse.x += (mouse.tx - mouse.x) * .05; mouse.y += (mouse.ty - mouse.y) * .05;
    const mx = reduce ? 0 : -mouse.x * 12, my = reduce ? 0 : -mouse.y * 8;
    const X = u => W * (.04 + .92 * u) + mx, Y = p => H * (.86 - .66 * p) + my;
    const out = 1 - ease(seg(t, T_OUT, T_OUT + 1.4));
    const sc = seg(t, T_SCAN, T_SCAN + SCAN), xs = ease(sc), scanOn = (t > T_SCAN && t < T_SCAN + SCAN + .6) ? 1 - seg(t, T_SCAN + SCAN, T_SCAN + SCAN + .6) : 0;
    const yel = ease(seg(t, T_YEL, T_YEL + 1.2));
    const r = Math.max(1.3, Math.min(W, H) * .0019);

    // la ligne de balayage : la réalité qui diffère de l'hypothèse
    if (scanOn > 0) {
      const px = X(xs);
      x.save(); x.setLineDash([3, 5]); x.strokeStyle = rgba(PALE, .35 * scanOn * fade(px)); x.lineWidth = 1;
      x.beginPath(); x.moveTo(px, Y(1.08)); x.lineTo(px, Y(-.04)); x.stroke(); x.restore();
    }

    DESIGNS.forEach((d, k) => {
      const isRob = k === ROB;
      for (let i = 0; i < ND; i++) {
        const u = i / (ND - 1), px = X(u), py = Y(pw(d, u)), f = fade(px);
        const app = ease(seg(t, T_IN + u * 1.2, T_IN + u * 1.2 + .5)) * out; if (app <= 0) continue;
        const near = scanOn * Math.exp(-Math.pow((u - xs) / .045, 2));
        const yk = isRob ? ease(seg(t, T_YEL + u * .9, T_YEL + u * .9 + .4)) : 0;
        const dimOthers = isRob ? 1 : 1 - .55 * yel;
        const a = app * f * (.28 + .6 * near) * dimOthers * (1 - yk);
        if (a > .003) { x.fillStyle = rgba(d.c, a); x.beginPath(); x.arc(px, py, r * (1 + .5 * near), 0, TAU); x.fill(); }
        // le jaune ne marque que le design retenu (moment de décision)
        if (yk > 0) { x.fillStyle = rgba(YEL, app * f * .85 * yk); x.beginPath(); x.arc(px, py, r * 1.1, 0, TAU); x.fill(); }
      }
      // point d'intersection courbe / balayage
      if (scanOn > 0) {
        const px = X(xs), py = Y(pw(d, xs));
        x.strokeStyle = rgba(d.c, .7 * scanOn * fade(px)); x.lineWidth = 1;
        x.beginPath(); x.arc(px, py, 5, 0, TAU); x.stroke();
      }
    });
  }

  fit();

  /* ---------- boucle : ne tourne que visible, onglet actif, sans reduced-motion ---------- */
  let raf = 0, running = false, visible = false, t = 0, last = 0;
  function loop(now) {
    raf = requestAnimationFrame(loop);
    const dt = Math.min((now - last) / 1000, .05); last = now;
    t += dt; frame(t);
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
