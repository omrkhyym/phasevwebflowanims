/* Mini-scènes allégées pour le bloc « plateforme connectée » (src/platform-connect-tree.js, proto protos/site/phasev-platform-connect-v6-protos.html) : mêmes scènes que src/mini-scene.js
   (Home, menu). On ne réduit que les répétitions (nombre de barres, de lignes, de points) ; les éléments qui portent
   le sens restent : rails et point de l'option retenue (rank), axes, repères et anneau du design retenu (curve),
   sites recommandés (sites), ligne de séparation (split), coche de validation sur chaque ligne (doc). */
import { bonvStage, WHITE, TEA, CAP, TAU, cl, seg, oq, ioq, lerp, rng } from './bonv-draw.js';

const COLS = [CAP[0], CAP[1], CAP[2], CAP[3], CAP[5]];
const T = { p0: .4, p1: 4.4, fade: 6.4, loop: 7 };
const R0 = rng(7);
const SITES = Array.from({ length: 24 }, (_, i) => ({ x: (i % 6) / 5 - .5 + (R0() - .5) * .07, y: Math.floor(i / 6) / 3 - .5 + (R0() - .5) * .09, rec: R0() < .38, d: R0() }));
const POP = Array.from({ length: 30 }, () => ({ x: (R0() - .5), y: (R0() - .5) * .8, resp: R0() < .42 }));
const BARS = [.48, .86, .32, .66];

const SCENES = {
  rank(g, w, h, p, col) {   // les options se classent, la meilleure prend la couleur
    const order = BARS.map((v, i) => i).sort((a, b) => BARS[b] - BARS[a]), k = ioq(seg(p, .2, .65)), gap = h / 5.2, x0 = w * .14;
    BARS.forEach((v, i) => {
      const pos = lerp(i, order.indexOf(i), k), top = order.indexOf(i) === 0 && k > .95, y = h * .22 + pos * gap;
      g.line(x0, y, w * .86, y, WHITE, .1, 4 * g.S);
      g.line(x0, y, x0 + (w * .72) * v * oq(seg(p, 0, .25)), y, top ? col : WHITE, top ? 1 : .6, 5.5 * g.S);
      if (top) g.dot(x0 + w * .72 * v, y, 6 * g.S, col, 1);
    });
  },
  curve(g, w, h, p, col) {   // courbe puissance / taille, le design retenu se pose (identique à la Home)
    const x0 = w * .14, x1 = w * .88, y0 = h * .2, y1 = h * .8;
    g.line(x0, y1, x1, y1, WHITE, .3, 1.5 * g.S); g.line(x0, y0, x0, y1, WHITE, .3, 1.5 * g.S);
    const ck = ioq(seg(p, 0, .5)), P = u => [lerp(x0, x1, u), y1 - (y1 - y0) * (.06 + .86 * (1 - Math.pow(1 - u, 2.4)))], pts = [];
    for (let i = 0; i <= Math.ceil(36 * ck); i++) pts.push(P(Math.min(i / 36, ck)));
    g.poly(pts, WHITE, .95, 3.2 * g.S);
    const ok = ioq(seg(p, .55, .9));
    if (ok > 0) {
      const q = P(lerp(.15, .5, ok));
      g.x.save(); g.x.setLineDash([3 * g.S, 4 * g.S]); g.line(q[0], q[1], q[0], y1, WHITE, .45, 1.5 * g.S); g.line(x0, q[1], q[0], q[1], WHITE, .45, 1.5 * g.S); g.x.restore();
      g.dot(q[0], q[1], 5.5 * g.S, col, 1);
      g.x.strokeStyle = col; g.x.globalAlpha = .7; g.x.lineWidth = 2 * g.S; g.x.beginPath(); g.x.arc(q[0], q[1], 11 * g.S, 0, TAU); g.x.stroke(); g.x.globalAlpha = 1;
    }
  },
  sites(g, w, h, p, col) {   // grille de sites, les recommandés s'allument
    SITES.forEach(s => {
      const on = s.rec ? oq(seg(p, .1 + s.d * .55, .25 + s.d * .55)) : 0;
      g.dot(w / 2 + s.x * w * .7, h / 2 + s.y * h * .6, (3.2 + 2.2 * on) * g.S, on > 0 ? col : WHITE, on > 0 ? .5 + .5 * on : .32);
    });
  },
  split(g, w, h, p, col) {   // la population se sépare : répondeurs d'un côté
    const k = ioq(seg(p, .15, .7));
    if (k > .6) g.line(w / 2, h * .16, w / 2, h * .84, WHITE, .32 * seg(k, .6, 1), 1.5 * g.S);
    POP.forEach(q => {
      const tx = (q.resp ? -.2 : .2) + q.x * .32, px = lerp(q.x * .8, tx, k);
      g.dot(w / 2 + px * w * .8, h / 2 + q.y * h * .7, 3.6 * g.S, q.resp && k > .3 ? col : WHITE, q.resp ? .5 + .5 * k : .36);
    });
  },
  doc(g, w, h, p, col) {   // le document s'écrit, puis chaque ligne est validée
    const x0 = w * .16, lines = 4, gap = h / 6.2;
    for (let l = 0; l < lines; l++) {
      const y = h * .26 + l * gap, wk = oq(seg(p, .04 + l * .08, .22 + l * .08)), ww = w * (l === 0 ? .4 : l === 2 ? .46 : .58);
      g.line(x0, y, x0 + ww * wk, y, WHITE, l === 0 ? .9 : .5, (l === 0 ? 5.5 : 3.5) * g.S);
      const ck = seg(p, .55 + l * .08, .66 + l * .08);
      if (ck > 0) { const cx = w * .84; g.poly([[cx - 6 * g.S, y], [cx - 2 * g.S, y + 4 * g.S], [cx + 6 * g.S, y - 5 * g.S]].slice(0, ck > .5 ? 3 : 2), l === lines - 1 ? col : TEA, ck, 2.6 * g.S); }
    }
  },
};

export function initMiniScene(mount) {
  const scene = SCENES[mount.dataset.scene] || SCENES.rank, col = COLS[(+mount.dataset.col || 0) % COLS.length];
  const layout = g => { g.S = cl(g.W / 400, .7, 1.2); };
  const draw = (g, t) => { g.x.lineCap = 'round'; g.x.lineJoin = 'round'; scene(g, g.W, g.H, seg(t, T.p0, T.p1), col); };
  return bonvStage(mount, { aspect: () => .62, loop: T.loop, fade: T.fade, still: T.p1 + .5, layout, draw });
}
