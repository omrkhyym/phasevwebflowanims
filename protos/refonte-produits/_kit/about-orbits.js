/* PhaseV · About · hero « Orbites » (proto, 2026-11-17)
   Grands anneaux fins, centrés à droite du texte (le texte est à gauche, comme les autres heros), qui débordent du cadre ;
   de petits points aux couleurs des capacités y tournent, plus lentement vers l'extérieur.
   Dans l'anneau intérieur, le V du logo PhaseV en plexus, présent en permanence : des points répartis dans le V (et sur son contour,
   pour garder la silhouette nette), qui dérivent à peine, reliés à leurs voisins proches par des traits fins qui s'effacent avec la distance.
   Vague concentrique toutes les 6,5 s (les anneaux gonflent au passage, ondulation légère en permanence) ; parallaxe discrète
   au pointeur, par profondeur (coupée en reduced motion et sur écran tactile).
   Style BonV : tout net, pas de flou ni de halo, pas de jaune. Côté texte, l'animation s'efface (fondu doux).
   Montage : <div data-pv="about-orbits"></div>, premier enfant du header ; le module pose son CSS (plein cadre, sous le texte).
   Retourne destroy(). */
import { CAP, WHITE, TAU, cl, seg, rng, rgba } from './bonv-draw.js';

const RINGS = [1, 1.45, 1.95, 2.5, 3.1];         // rayons, en multiples du rayon de l'anneau intérieur
const WAVE = 6.5;                                 // période de la vague concentrique (s)
const RING_K = 1.22;                             // anneau intérieur un peu plus grand que le disque du V : de l'air autour du V
const COL = [CAP[0], CAP[1], CAP[5], CAP[3], CAP[4]];

/* V du logo PhaseV, normalisé au rayon du disque (même tracé que bonv-draw.js) */
const VPTS = [[.2749, -.4797], [-.0004, .1548], [-.2181, -.3639], [-.2710, -.4797], [-.5574, -.4797], [-.0170, .6489], [.0186, .6489], [.5574, -.4797]];
const inV = (px, py) => {
  let c = false;
  for (let i = 0, j = VPTS.length - 1; i < VPTS.length; j = i++) {
    const [xi, yi] = VPTS[i], [xj, yj] = VPTS[j];
    if ((yi > py) !== (yj > py) && px < (xj - xi) * (py - yi) / (yj - yi) + xi) c = !c;
  }
  return c;
};

/* points du plexus : le contour à pas régulier, puis l'intérieur à distance minimale (répartition régulière, sans amas) */
const R = rng(11), VD = [], EDGE = .075, MIN = .062, LINK = .12;
for (let i = 0; i < VPTS.length; i++) {
  const a = VPTS[i], b = VPTS[(i + 1) % VPTS.length], L = Math.hypot(b[0] - a[0], b[1] - a[1]), n = Math.max(1, Math.round(L / EDGE));
  for (let j = 0; j < n; j++) VD.push({ x: a[0] + (b[0] - a[0]) * j / n, y: a[1] + (b[1] - a[1]) * j / n, edge: true });
}
for (let k = 0; k < 6000; k++) {
  const px = (R() - .5) * 1.12, py = -.48 + R() * 1.13;
  if (!inV(px, py)) continue;
  if (VD.some(p => Math.hypot(p.x - px, p.y - py) < MIN)) continue;
  VD.push({ x: px, y: py, edge: false });
}
VD.forEach(p => { p.ph = R() * TAU; p.w = .35 + R() * .3; p.a = p.edge ? .8 : .5 + R() * .3; });

function injectCSS() {
  if (document.getElementById('pv-about-orbits-css')) return;
  const s = document.createElement('style'); s.id = 'pv-about-orbits-css';
  s.textContent = `[data-pv="about-orbits"]{position:absolute;inset:0;z-index:0;pointer-events:none;overflow:hidden}
:has(> [data-pv="about-orbits"]) > :not([data-pv="about-orbits"]):not(.pv-layer):not([aria-hidden="true"]){position:relative;z-index:1}`;
  document.head.appendChild(s);
}

export function initAboutOrbits(root) {
  if (!root || root.dataset.pvInit) return;
  root.dataset.pvInit = '1';
  injectCSS();
  const cv = document.createElement('canvas');
  cv.setAttribute('aria-hidden', 'true');
  cv.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block';
  root.appendChild(cv);
  const x = cv.getContext('2d');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* points d'ambiance : 3 à 7 par anneau, phases fixes ; vitesse angulaire décroissante vers l'extérieur */
  const OM = RINGS.map(r => .13 * Math.pow(1 / r, 1.5));
  const DOTS = RINGS.flatMap((r, i) => Array.from({ length: 3 + i }, () => ({ i, ph: R() * TAU, s: .8 + R() * .5 })));
  const P = VD.map(() => [0, 0]);

  let W = 0, H = 0;
  const resize = () => {
    const dpr = Math.min(devicePixelRatio || 1, 2), b = root.getBoundingClientRect();
    W = b.width; H = b.height;
    cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
    x.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (reduced) frame(0);
  };

  const dot = (px, py, r, c, a) => { if (a <= 0) return; x.fillStyle = rgba(c, a); x.beginPath(); x.arc(px, py, r, 0, TAU); x.fill(); };

  /* parallaxe au pointeur : position lissée ; coupée en reduced motion et sur écran tactile */
  const parallax = !reduced && !matchMedia('(hover: none)').matches;
  const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
  const onMove = e => {
    const b = root.getBoundingClientRect();
    mouse.tx = cl((e.clientX - b.left) / b.width - .5, -.5, .5);
    mouse.ty = cl((e.clientY - b.top) / b.height - .5, -.5, .5);
  };
  if (parallax) window.addEventListener('pointermove', onMove, { passive: true });

  function frame(t) {
    x.clearRect(0, 0, W, H);
    const wide = W > 991;
    const cx0 = W * (wide ? .68 : .78), cy0 = H / 2;
    const R0 = Math.min(H * .28, W * (wide ? .2 : .34)), S = cl(Math.min(W, H) / 800, .7, 1.2);
    const rad = i => RINGS[i] * R0 * RING_K;
    mouse.x += (mouse.tx - mouse.x) * .05; mouse.y += (mouse.ty - mouse.y) * .05;
    // décalage d'un calque selon sa profondeur : le V bouge peu (≈ 4 px), l'anneau extérieur le plus (≈ 12 px)
    const off = depth => [mouse.x * 2 * 12 * S * depth, mouse.y * 2 * 12 * S * depth];

    /* vague concentrique : toutes les 6,5 s, une onde part du V et traverse les anneaux vers l'extérieur ; au passage,
       chaque anneau gonfle de quelques pixels et s'éclaircit un peu. En permanence, une ondulation légère (4 lobes qui tournent). */
    const tm = t % WAVE, wf = R0 * .6 + (rad(RINGS.length - 1) * 1.15 - R0 * .6) * seg(tm, 0, 3.4), ww = R0 * .45;
    const swell = r => seg(tm, 0, 3.4) < 1 ? Math.exp(-(((r - wf) / ww) ** 2)) : 0;
    const ringR = (i, a) => rad(i) + (2 + i * .6) * S * Math.sin(4 * a + t * .35 + i * 1.3) + 7 * S * swell(rad(i));

    // anneaux, tracés en polyligne pour onduler
    x.lineWidth = 1;
    RINGS.forEach((r, i) => {
      const [ox, oy] = off(.45 + i * .14), sw = swell(rad(i));
      x.strokeStyle = rgba(WHITE, .14 - i * .018 + .12 * sw);
      x.beginPath();
      for (let k = 0; k <= 180; k++) {
        const a = k / 180 * TAU, rr = ringR(i, a), px = cx0 + ox + Math.cos(a) * rr, py = cy0 + oy + Math.sin(a) * rr;
        k ? x.lineTo(px, py) : x.moveTo(px, py);
      }
      x.stroke();
    });

    // points d'ambiance sur les anneaux (ils suivent l'ondulation de leur anneau)
    for (const p of DOTS) {
      const a = p.ph + OM[p.i] * t, rr = ringR(p.i, a), [ox, oy] = off(.45 + p.i * .14);
      dot(cx0 + ox + Math.cos(a) * rr, cy0 + oy + Math.sin(a) * rr, 2 * S * p.s, COL[p.i], .75);
    }

    /* le V en plexus : dérive très légère (moindre sur le contour), liens entre voisins proches, plus pâles avec la distance ;
       il s'éclaire un peu au départ de chaque vague */
    const [vx, vy] = off(.33), cx = cx0 + vx, cy = cy0 + vy, pulse = 1 + .45 * Math.sin(Math.PI * seg(tm, 0, 1.1));
    VD.forEach((p, i) => {
      const amp = p.edge ? .006 : .016;
      P[i][0] = cx + (p.x + amp * Math.sin(t * p.w + p.ph)) * R0;
      P[i][1] = cy + (p.y + amp * Math.cos(t * p.w * .9 + p.ph * 1.7)) * R0;
    });
    const lk = LINK * R0;
    x.lineWidth = .5;
    for (let i = 0; i < P.length; i++) for (let j = i + 1; j < P.length; j++) {
      const d = Math.hypot(P[i][0] - P[j][0], P[i][1] - P[j][1]);
      if (d >= lk) continue;
      x.strokeStyle = rgba(WHITE, .28 * pulse * (1 - d / lk));
      x.beginPath(); x.moveTo(P[i][0], P[i][1]); x.lineTo(P[j][0], P[j][1]); x.stroke();
    }
    const vr = Math.max(.8, R0 / 250);   // points fins, discrets
    VD.forEach((p, i) => dot(P[i][0], P[i][1], vr, WHITE, p.a));

    /* côté texte : l'animation s'efface en fondu doux (comme l'atténuation des heros produit) ; sur petit écran, atténuée partout */
    x.save();
    x.globalCompositeOperation = 'destination-out';
    if (wide) {
      const gr = x.createLinearGradient(0, 0, W * .56, 0);
      gr.addColorStop(0, 'rgba(0,0,0,.92)'); gr.addColorStop(.6, 'rgba(0,0,0,.6)'); gr.addColorStop(1, 'rgba(0,0,0,0)');
      x.fillStyle = gr; x.fillRect(0, 0, W * .56, H);
    } else { x.fillStyle = 'rgba(0,0,0,.45)'; x.fillRect(0, 0, W, H); }
    x.restore();
  }

  const ro = new ResizeObserver(resize); ro.observe(root); resize();
  let visible = true, last = performance.now(), time = 0, raf = 0;
  const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
  io.observe(root);
  const loop = now => {
    raf = requestAnimationFrame(loop);
    const d = Math.min((now - last) / 1000, .05); last = now;
    if (!visible) return;
    time += d; frame(time);
  };
  if (!reduced) raf = requestAnimationFrame(loop);

  return function destroy() {
    cancelAnimationFrame(raf); ro.disconnect(); io.disconnect();
    window.removeEventListener('pointermove', onMove);
    cv.remove(); delete root.dataset.pvInit;
  };
}
