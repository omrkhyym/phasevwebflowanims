/* Bloc "plateforme connectée" des cinq pages produit (proto : protos/phasev-platform-particles-proto.html).
   Monté dans <div data-pv="platform-connect" data-current="trial"></div>, à la place du placeholder.
   Label, titre et paragraphe restent dans Webflow. Les noms des produits peuvent être
   surchargés sur le montage : data-name-clinops="CLINOPS OPTIMIZER", etc. */

const INK = [20, 18, 56], YEL = [226, 199, 10], MAU = [146, 138, 205];

const NAMES = {
  portfolio: 'PORTFOLIO OPTIMIZER',
  trial: 'TRIAL OPTIMIZER',
  response: 'RESPONSE OPTIMIZER',
  clinops: 'CLINOPS OPTIMIZER',
  conductor: 'AI CONDUCTOR'
};
const ORDER = ['portfolio', 'trial', 'response', 'clinops', 'conductor'];

/* Chronologie (s) : un nuage commun, division en cinq amas, échanges, refonte */
const T_SPLIT = 1.3, T_EX = 3.6, T_MERGE = 12.0, LOOP = 14.6;   // T_EX : début des échanges, porté par EVENTS
/* Échanges [de, vers, début] ; 0 = produit de la page, 1..4 = voisins.
   Le centre émet et reçoit le plus ; un échange voisin-voisin pour que ce ne soit pas qu'une étoile. */
const EVENTS = [[1, 0, 3.7], [0, 2, 4.5], [3, 0, 5.4], [0, 4, 6.2], [2, 0, 7.1], [0, 1, 7.9], [4, 3, 8.7], [0, 3, 9.4]];
const TRAVEL = 1.9;
const T_STILL = 7.2;   // état dessiné sous reduced motion : amas séparés, un flux en cours

/* Places des amas en fraction du canvas, volontairement pas symétriques */
const SPOT = [[0, 0], [-.33, -.29], [.32, -.31], [-.31, .30], [.34, .27]];

const cl = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const seg = (t, a, b) => cl((t - a) / (b - a));
const ease = v => v < .5 ? 4 * v * v * v : 1 - Math.pow(-2 * v + 2, 3) / 2;
function rng(s) { return () => { s |= 0; s = s + 0x6D2B79F5 | 0; let t = Math.imul(s ^ s >>> 15, 1 | s); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }

function build(N) {
  const R = rng(11), g = () => { const v = Math.sqrt(-2 * Math.log(R() + 1e-9)) * Math.cos(6.2832 * R()); return cl(v, -2.3, 2.3); };
  const share = [.40, .15, .15, .15, .15], pts = [];
  for (let i = 0; i < N; i++) {
    let u = R(), c = 0, acc = share[0];
    while (u > acc && c < 4) { c++; acc += share[c]; }
    const ox = g() * .5, oy = g() * .5, r = Math.hypot(ox, oy);
    let col, a;
    if (c === 0) { if (r < .34) { col = YEL; a = 1; } else { col = INK; a = .75; } }
    else { if (R() < .7) { col = MAU; a = .85; } else { col = INK; a = .45; } }
    pts.push({
      c, ox, oy, ax: g() * .5, ay: g() * .5, mx: g() * .5, my: g() * .5, w: (R() - .5) * .3,
      s: (c === 0 && r < .34 ? 1.6 : 1) + R() * 1.2, col, a, d: R(), j: R() * 2 - 1, trip: null,
      fill: `rgba(${col[0]},${col[1]},${col[2]},${a})`
    });
  }
  /* chaque échange recrute des particules de l'amas source, qui restent ensuite dans l'amas d'arrivée */
  EVENTS.forEach(([from, to, t0]) => {
    const K = from === 0 ? 130 : 75;
    let k = 0;
    for (const p of pts) {
      if (k >= K) break;
      if (p.c === from && !p.trip) { p.trip = { to, ts: t0 + (k / K) * 1.4, side: (from + to) % 2 ? 1 : -1 }; k++; }
    }
  });
  return pts;
}

export function initPlatformConnect(mount) {
  if (mount.dataset.pvReady) return;
  const current = mount.dataset.current;
  if (!NAMES[current]) {
    console.warn('[pv] platform-connect : data-current manquant ou inconnu (' + current + '), attendu ' + ORDER.join(' | '));
    return;
  }
  mount.dataset.pvReady = '1';

  // noms : défaut dans le JS, surchargeables par data-name-<clé> sur le montage
  const name = k => mount.dataset['name' + k[0].toUpperCase() + k.slice(1)] || NAMES[k];
  const sats = ORDER.filter(k => k !== current);

  mount.style.cssText += 'position:relative;width:100%;aspect-ratio:1.2/1;';
  const cv = document.createElement('canvas');
  cv.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block;';
  cv.setAttribute('role', 'img');
  cv.setAttribute('aria-label', `PhaseV platform: ${name(current)} at the center, exchanging data with the four other PhaseV products.`);
  mount.appendChild(cv);
  const x = cv.getContext('2d');

  /* Typo : celle de l'étiquette du bloc, comme gantt.js.
     L'espacement est converti en ratio de la taille, puis réappliqué à nos petites tailles. */
  const section = mount.closest('section') || document.body;
  const label = section.querySelector('.text-size-label');
  const cs = label ? getComputedStyle(label) : null;
  const FAMILY = cs ? cs.fontFamily : 'Aspekta, Arial, sans-serif';
  const lsRatio = cs && cs.letterSpacing !== 'normal'
    ? (parseFloat(cs.letterSpacing) || 0) / (parseFloat(cs.fontSize) || 16) : 0;
  const hasLS = 'letterSpacing' in x;
  // fond de la section : rien n'est peint, gardé pour d'éventuelles pastilles derrière les noms
  const BG = getComputedStyle(section).backgroundColor;

  function setFont(w, size) {
    x.font = `${w} ${size}px ${FAMILY}`;
    if (hasLS) x.letterSpacing = (lsRatio * size).toFixed(2) + 'px';
  }
  // nom centré sur px, recalé vers l'intérieur s'il sort du canvas (petits écrans)
  function name_(s, px, py) {
    const w = x.measureText(s).width;
    x.fillText(s, cl(px - w / 2, 2, W - w - 2), py);
  }

  let W = 0, H = 0, pts = null, built = 0;
  const mouse = { x: 0, y: 0, tx: 0, ty: 0 };

  function draw(T) {
    const t = T % LOOP;
    x.clearRect(0, 0, W, H);
    const m = Math.min(W, H), cx = W / 2, cy = H / 2 - m * .01;
    const RAD = [m * .105, m * .055, m * .055, m * .055, m * .055], RM = m * .13;
    // parallaxe : les voisins bougent plus que le centre
    const C = SPOT.map(([u, v], i) => [cx + u * W - mouse.x * (i ? 14 : 6), cy + v * H - mouse.y * (i ? 10 : 4)]);

    const split = t < T_MERGE;
    const lab = Math.min(seg(t, T_SPLIT + 1.4, T_SPLIT + 2.0), 1 - seg(t, T_MERGE - .3, T_MERGE + .3));

    for (const p of pts) {
      // rotation lente propre à chaque particule : le nuage respire sans jamais se figer
      const ang = p.w * T, ca = Math.cos(ang), sa = Math.sin(ang);
      const rx = p.ox * ca - p.oy * sa, ry = p.ox * sa + p.oy * ca;
      // place dans l'amas d'arrivée, tirée à part : les arrivants se mêlent au nuage au lieu d'en recréer le cœur
      const qx = p.ax * ca - p.ay * sa, qy = p.ax * sa + p.ay * ca;
      const mergedX = cx + (p.mx * ca - p.my * sa) * RM * 2, mergedY = cy + (p.mx * sa + p.my * ca) * RM * 2;

      // amas courant, ou position sur le filament
      let px, py, c = p.c;
      if (p.trip && t >= p.trip.ts) {
        const u = seg(t, p.trip.ts, p.trip.ts + TRAVEL);
        const a = C[p.c], b = C[p.trip.to];
        const A = [a[0] + rx * RAD[p.c] * 2, a[1] + ry * RAD[p.c] * 2];
        const B = [b[0] + qx * RAD[p.trip.to] * 2, b[1] + qy * RAD[p.trip.to] * 2];
        if (u < 1) {
          // trajet linéaire le long de la courbe, sans easing : le flux reste régulier
          const k = u, dx = B[0] - A[0], dy = B[1] - A[1], len = Math.hypot(dx, dy) || 1, nx = -dy / len, ny = dx / len;
          const bow = len * .22 * p.trip.side, wob = p.j * 4 * Math.sin(Math.PI * k);
          const mx2 = (A[0] + B[0]) / 2 + nx * bow, my2 = (A[1] + B[1]) / 2 + ny * bow, q = 1 - k;
          px = q * q * A[0] + 2 * q * k * mx2 + k * k * B[0] + nx * wob;
          py = q * q * A[1] + 2 * q * k * my2 + k * k * B[1] + ny * wob;
        } else { c = p.trip.to; px = B[0]; py = B[1]; }
      } else { px = C[c][0] + rx * RAD[c] * 2; py = C[c][1] + ry * RAD[c] * 2; }

      // division puis refonte, chaque particule avec son propre retard
      const kIn = ease(seg(t, T_SPLIT + p.d * .8, T_SPLIT + 1.4 + p.d * .8));
      const kOut = ease(seg(t, T_MERGE + p.d * .6, T_MERGE + 1.6 + p.d * .6));
      const k = split ? kIn : 1 - kOut;
      const X = mergedX + (px - mergedX) * k, Y = mergedY + (py - mergedY) * k;

      x.fillStyle = p.fill;
      x.fillRect(X - p.s / 2, Y - p.s / 2, p.s, p.s);
    }

    // noms
    if (lab > 0) {
      const fs = W < 420 ? 9 : 10;
      x.textAlign = 'left'; x.fillStyle = '#141238';
      setFont(500, fs); x.globalAlpha = lab * .75;
      sats.forEach((k, i) => { const c = C[i + 1]; name_(name(k), c[0], Math.min(H - 4, c[1] + RAD[1] * 2.4 + fs)); });
      setFont(700, fs + 2); x.globalAlpha = lab;
      name_(name(current), C[0][0], C[0][1] + RAD[0] * 2.3 + fs + 4);
      x.globalAlpha = 1;
    }
  }

  /* ---------- boucle : tourne seulement quand le bloc est à l'écran ---------- */
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let ready = false, clock = 0, raf = 0, last = 0;

  function fit() {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    W = mount.clientWidth; H = mount.clientHeight;
    cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
    x.setTransform(dpr, 0, 0, dpr, 0, 0);
    // reconstruction seulement au franchissement du seuil de 500 px
    const N = W < 500 ? 1100 : 1800;
    if (N !== built) { pts = build(N); built = N; }
    if (ready) draw(reduced ? T_STILL : clock);
  }
  function frame(now) {
    raf = requestAnimationFrame(frame);
    clock += Math.min((now - last) / 1000, .05); last = now;
    mouse.x += (mouse.tx - mouse.x) * .06; mouse.y += (mouse.ty - mouse.y) * .06;
    draw(clock);
  }
  function onPointer(e) {
    const r = mount.getBoundingClientRect();
    mouse.tx = cl((e.clientX - r.left) / r.width * 2 - 1, -1, 1);
    mouse.ty = cl((e.clientY - r.top) / r.height * 2 - 1, -1, 1);
  }
  function start() {
    if (raf || reduced) return;
    addEventListener('pointermove', onPointer, { passive: true });
    last = performance.now(); raf = requestAnimationFrame(frame);
  }
  function stop() {
    cancelAnimationFrame(raf); raf = 0;
    removeEventListener('pointermove', onPointer);
  }

  const ro = new ResizeObserver(fit);
  ro.observe(mount);
  let io = null;

  /* On attend la police avant le premier dessin, sinon il part en Arial.
     Plafond à 3 s pour ne jamais bloquer l'animation. */
  const fontReady = document.fonts
    ? Promise.race([document.fonts.load(`500 10px ${FAMILY}`), new Promise(r => setTimeout(r, 3000))])
    : Promise.resolve();

  fontReady.then(() => {
    ready = true;
    fit();
    if (reduced) return;
    io = new IntersectionObserver(([e]) => e.isIntersecting ? start() : stop(), { threshold: .3 });
    io.observe(mount);
  });

  return {
    destroy() {
      stop(); ro.disconnect(); if (io) io.disconnect();
      cv.remove(); delete mount.dataset.pvReady;
    }
  };
}
