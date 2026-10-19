/* PhaseV · hero /portfolio-optimizer · diagramme en tornade
   Monté dans <div data-pv="portfolio-hero-bg"></div>, premier enfant du header du hero.
   Sensibilité de la probabilité de succès à chaque driver : les barres apparaissent
   dans le désordre, s'étendent, se trient par largeur, puis les deux drivers qui pèsent
   le plus passent en jaune. Nouveau tirage à chaque boucle. L'ensemble s'atténue côté texte.
   Titre, texte et boutons restent dans Webflow. */

const SEL = '[data-pv="portfolio-hero-bg"]';

/* CSS ciblé sur le header qui contient notre div : aucune classe Webflow n'est modifiée. */
const CSS = `
:has(> ${SEL}){ position:relative; overflow:hidden; }
:has(> ${SEL}) > :not(${SEL}){ position:relative; z-index:1; }
${SEL}{ position:absolute; inset:0; z-index:0; pointer-events:none; }
${SEL} canvas{ position:absolute; inset:0; width:100%; height:100%; display:block; }`;

function injectCSS() {
  if (document.getElementById('pv-portfolio-hero-css')) return;
  const s = document.createElement('style');
  s.id = 'pv-portfolio-hero-css';
  s.textContent = CSS;
  document.head.appendChild(s);
}

const TAU = Math.PI * 2;
const cl = v => Math.max(0, Math.min(1, v)), seg = (t, a, b) => cl((t - a) / (b - a));
const ease = v => v < .5 ? 4 * v * v * v : 1 - Math.pow(-2 * v + 2, 3) / 2;
const smooth = (a, b, v) => { const k = cl((v - a) / (b - a)); return k * k * (3 - 2 * k); };
function rng(s) { return () => { s |= 0; s = s + 0x6D2B79F5 | 0; let t = Math.imul(s ^ s >>> 15, 1 | s); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
const rgba = (c, a) => `rgba(${c[0]},${c[1]},${c[2]},${Math.max(0, Math.min(1, a)).toFixed(3)})`;
const MAU = [146, 138, 205], BLU = [120, 168, 224], TEA = [127, 232, 207], PALE = [199, 196, 226], YEL = [226, 199, 10];

/* Chronologie (secondes) et géométrie */
const ND = 9, AXIS = .62, T_GROW = .6, T_SORT = 3.4, T_YEL = 5.6, T_OUT = 10.4, LOOP = 12.6, STILL = 8.5;

export function initPortfolioHeroBg(root) {
  if (!root || root.dataset.pvInit) return;
  const cv = document.createElement('canvas');
  cv.setAttribute('aria-hidden', 'true');
  const x = cv.getContext('2d'); if (!x) return;
  root.dataset.pvInit = '1';
  injectCSS();
  root.appendChild(cv);

  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  let batch = -1, DR = [];
  function build(seed) {
    const R = rng(seed); DR = [];
    for (let i = 0; i < ND; i++) { const w = .05 + R() * .28, sk = .3 + R() * .4; DR.push({ lo: w * sk, hi: w * (1 - sk), w, r0: i, del: R() * .8, c: [MAU, BLU, TEA][i % 3] }); }
    const order = [...DR.keys()].sort(() => R() - .5); DR.forEach((d, i) => d.r0 = order[i]);
    [...DR].sort((a, b) => b.w - a.w).forEach((d, k) => { d.r1 = k; d.pick = k < 2; });
  }

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

  /* Atténuation côté texte : la tornade s'efface sous la colonne de gauche. */
  const fade = px => mobile ? .55 : .22 + .78 * smooth(W * .22, W * .62, px);

  function frame(T) {
    const n = reduce ? 0 : Math.floor(T / LOOP), t = reduce ? T : T % LOOP;
    if (n !== batch) { batch = n; build(71 + n * 5); }
    x.clearRect(0, 0, W, H);
    mouse.x += (mouse.tx - mouse.x) * .05; mouse.y += (mouse.ty - mouse.y) * .05;
    const mx = reduce ? 0 : -mouse.x * 12, my = reduce ? 0 : -mouse.y * 8;
    const pitch = Math.max(5, Math.min(W, H) * .0085), cx = W * AXIS + mx;
    const rowY = r => H * (.17 + r * .083) + my, Xs = v => W * v;
    const out = 1 - ease(seg(t, T_OUT, T_OUT + 1.6)), yel = ease(seg(t, T_YEL, T_YEL + 1));
    const r = Math.max(1.3, pitch * .25);

    // axe central : l'estimation de référence
    for (let y = rowY(-.6); y < rowY(ND - .4); y += pitch) { x.fillStyle = rgba(PALE, .22 * out); x.fillRect(cx - .6, y, 1.2, 1.2); }

    for (const d of DR) {
      const g = ease(seg(t, T_GROW + d.del, T_GROW + d.del + 1.4)) * out;
      const k = ease(seg(t, T_SORT + d.r1 * .08, T_SORT + d.r1 * .08 + 1.2));
      const y = rowY(d.r0 + (d.r1 - d.r0) * k);
      // le jaune ne marque que les deux drivers qui pèsent le plus (moment de décision)
      const ay = d.pick ? yel : 0, dim = d.pick ? 1 : 1 - .35 * yel;
      const L = Xs(d.lo) * g, Rr = Xs(d.hi) * g;
      // deux rangées de points par barre pour lui donner de l'épaisseur
      for (let row = 0; row < 2; row++) {
        const yy = y + (row - .5) * pitch;
        for (let px = cx - L; px <= cx + Rr; px += pitch) {
          const f = fade(px);
          if (ay < 1) { x.fillStyle = rgba(d.c, .4 * f * dim * (1 - ay) * out); x.beginPath(); x.arc(px, yy, r, 0, TAU); x.fill(); }
          if (ay > 0) { x.fillStyle = rgba(YEL, .85 * f * ay * out); x.beginPath(); x.arc(px, yy, r, 0, TAU); x.fill(); }
        }
      }
    }
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
