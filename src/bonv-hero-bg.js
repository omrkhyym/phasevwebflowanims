/* PhaseV · hero /bonv · réponse en streaming
   Montage via le socle hero-stage :
   - <div data-pv="bonv-hero-bg"></div>, premier enfant du header : fond plein cadre au-dessus de 991 px ;
   - <div data-pv="bonv-hero-slot"></div>, dernier enfant de la grille header_content : bloc 4:3 à 991 px et moins.
   Une réponse s'écrit sur six lignes de points : chaque mot arrive au curseur, s'écrit clair puis se pose en mauve ou bleu.
   Fin d'écriture : le dernier mot passe au jaune (la décision), le reste s'efface un peu, puis fondu et boucle.
   Rendu validé dans protos/phasev-bonv-hero-proto.html. Titre, texte et boutons restent dans Webflow. */

import { mountHeroStage, cl, seg, ease, smooth, rng, TAU } from './hero-stage.js';

const MAU = [146, 138, 205], BLU = [120, 168, 224], YEL = [226, 199, 10], PALE = [237, 235, 255];

/* Texte simulé, en unités (1 = interligne). DENS : points par unité de longueur de mot. */
const COLS = 13, ROWS = 6, PITCH = 1, THICK = .1, DENS = 55, H_ = (ROWS - 1) * PITCH;
/* Chronologie (s) : écriture, décision, tenue, fondu */
const T0 = .7, TYPE = 5.4, DEC = T0 + TYPE + .6, DEC_D = .8, OUT = 9.4, OUT_D = 1.2, LOOP = 11, STILL = 8.2;
/* Teintes de pose (mauve → bleu) et pas de quantification des couleurs, pour mettre les disques en cache */
const TINTS = 3, STEPS = 8;

const mix = (a, b, k) => [0, 1, 2].map(i => Math.round(a[i] + (b[i] - a[i]) * k));

export function initBonvHeroBg(root) {
  if (!root || root.dataset.pvInit) return;

  const R = rng(7), words = [];
  for (let row = 0; row < ROWS; row++) {
    const maxW = row === ROWS - 1 ? 6.2 : COLS - R() * 1.8; let x = 0;
    while (x < maxW) { const w = Math.min(.45 + R() * R() * 2.3, maxW - x); if (w < .35) break; words.push({ x, w, row, t: 0, pts: [] }); x += w + .27; }
  }
  let tc = 0; words.forEach(w => { w.t = tc; tc += .09 + w.w * .05; });
  words.forEach(w => w.t = T0 + w.t / tc * TYPE);
  const LAST = words[words.length - 1];
  words.forEach(w => {
    const n = Math.round(w.w * DENS);
    for (let i = 0; i < n; i++) {
      const s = R();
      w.pts.push({ x: w.x + R() * w.w, y: w.row * PITCH + (R() - .5) * THICK, ox: .25 + R() * .9, oy: (R() - .5) * .16, s, tint: Math.min(TINTS - 1, Math.floor((s * .5 + ((w.x * .13) % 1) * .5) * TINTS)) });
    }
  });
  const caret = [...Array(110)].map(() => ({ x: (R() - .5) * .045, y: (R() - .5) * .6, s: R() }));

  /* Disques antialiasés en cache : une petite image par couleur quantifiée, redessinée au changement de taille */
  let rad = 1, sprites = new Map(), dpr = 1;
  function sprite(c) {
    const key = c.join(',');
    let cv = sprites.get(key);
    if (!cv) {
      const S = Math.ceil((rad + 1) * 2 * dpr);
      cv = document.createElement('canvas'); cv.width = cv.height = S;
      const g = cv.getContext('2d');
      g.fillStyle = `rgb(${key})`; g.beginPath(); g.arc(S / 2, S / 2, rad * dpr, 0, TAU); g.fill();
      sprites.set(key, cv);
    }
    return cv;
  }

  let s = 1, X0 = 0, Y0 = 0;
  function layout({ W, H, flow }) {
    // fond : lignes sur 42 % de la largeur, à droite du texte ; bloc : 88 % de la largeur, centrées
    s = flow ? W * .88 / COLS : W * .42 / COLS;
    X0 = flow ? W * .06 : W * .53; Y0 = H * .5 - H_ / 2 * s;
    rad = Math.max(.75, s * .028); dpr = Math.min(devicePixelRatio || 1, 2); sprites = new Map();
  }

  function draw(stage, T) {
    const { ctx: x, W, H, mouse } = stage;
    const k = T % LOOP;
    x.clearRect(0, 0, W, H);
    const dec = ease(seg(k, DEC, DEC + DEC_D)), fade = 1 - ease(seg(k, OUT, OUT + OUT_D));
    if (fade <= 0) return;
    const D = rad + 1, D2 = D * 2;

    let cx = -.14, cy = 0;
    for (const w of words) {
      if (w.t > k) break;
      cx = w.x + w.w + .13; cy = w.row * PITCH;
      const age = smooth(.1, 1.5, k - w.t), q = Math.round(age * STEPS) / STEPS, yel = w === LAST;
      const z = w.row / (ROWS - 1) * 2 - 1, mx = z * 14 * mouse.x, my = z * 14 * mouse.y;
      // couleur du mot : clair à l'écriture, puis posé ; seul le dernier mot passe au jaune
      const cols = [...Array(TINTS)].map((_, i) => {
        let c = mix(PALE, mix(MAU, BLU, i / (TINTS - 1)), q);
        if (yel) c = mix(c, YEL, Math.round(dec * STEPS) / STEPS);
        return sprite(c);
      });
      const base = (.95 + (.6 - .95) * age) * fade * (yel ? 1 : 1 - .4 * dec), top = yel ? .98 * fade : 0;
      for (const p of w.pts) {
        const e = ease(cl((k - w.t - p.s * .1) / .42)); if (e <= 0) continue;
        const px = X0 + (p.x + p.ox * (1 - e)) * s + mx;
        const py = Y0 + (p.y + p.oy * (1 - e) + Math.sin(T * .5 + p.s * 70) * .004) * s + my;
        const a = e * (yel ? base + (top - base) * dec : base) * stage.fade(px);
        if (a <= .003) continue;
        x.globalAlpha = a;
        x.drawImage(cols[p.tint], px - D, py - D, D2, D2);
      }
    }

    // curseur clair : plein pendant l'écriture, clignote ensuite, s'éteint à la décision
    const typing = k > T0 && k < T0 + TYPE;
    const blink = (typing ? 1 : .5 + .5 * Math.cos(k * TAU * .9)) * (1 - seg(k, DEC, DEC + DEC_D)) * .9 * fade;
    if (blink > .003) {
      const img = sprite(PALE);
      for (const p of caret) {
        const px = X0 + (cx + p.x) * s, py = Y0 + (cy + p.y) * s;
        x.globalAlpha = blink * stage.fade(px);
        x.drawImage(img, px - D, py - D, D2, D2);
      }
    }
    x.globalAlpha = 1;
  }

  return mountHeroStage(root, { name: 'bonv', draw, still: STILL, onResize: layout });
}
