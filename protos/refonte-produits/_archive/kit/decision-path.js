/* Home, The PhaseV platform : « le chemin de décision », version loupe.
   Les 5 étapes sont de petits anneaux sur une ligne ; l'étape active s'ouvre en une grande loupe ronde qui montre,
   en mini-scène, ce que fait le produit (classement, courbe de design, sites, répondeurs, document validé).
   Au changement d'étape, la loupe glisse le long de la ligne vers la nouvelle étape. Style du film BonV (socle bonv-draw.js).
   Monté sur [data-pv="decision-path"], dans [data-af-path] : les onglets HTML portent le texte et l'étape active
   (événement « af-path:change » posé par affine.js) ; l'ordre des onglets donne la mini-scène. */
import { bonvStage, WHITE, GREY, TEA, CAP, DISC, TAU, cl, seg, oq, ioq, lerp, rng } from './bonv-draw.js';

const COLS = [CAP[0], CAP[1], CAP[2], CAP[3], CAP[5]];
const R0 = rng(7), SITES = Array.from({ length: 26 }, (_, i) => ({ x: (i % 6) / 5 - .5 + (R0() - .5) * .12, y: Math.floor(i / 6) / 4 - .5 + (R0() - .5) * .12, rec: R0() < .4, d: R0() }));
const POP = Array.from({ length: 34 }, () => ({ x: (R0() - .5) * .9, y: (R0() - .5) * .7, resp: R0() < .45, d: R0() }));
const BARS = [.55, .9, .35, .72, .5];   // valeurs des barres du classement

export function initDecisionPath(mount) {
  const root = mount.closest('[data-af-path]') || mount.parentElement;
  const n = root.querySelectorAll('.af-path_tab').length || 1, now = () => performance.now() / 1000;
  let cur = 0, prev = 0, at = -10, L = null;
  root.addEventListener('af-path:change', e => { prev = cur; cur = e.detail.index; at = now(); });

  function layout(g) {
    const { W, H } = g, narrow = W < 760, S = g.S = narrow ? cl(W / 400, .75, 1.1) : cl(W / 1200, .6, 1.15);
    L = { narrow, cy: H * .5, R: narrow ? Math.min(H * .4, 72 * S) : Math.min(H * .4, 112 * S), r: (narrow ? 6 : 9) * S, xs: Array.from({ length: n }, (_, i) => W * (i + .5) / n) };
  }

  /* mini-scènes, dans un carré de côté s centré sur (x, y) ; p : avancement 0 → 1 ; col : couleur de l'étape */
  const SCENES = [
    (g, x, y, s, p, col) => {   // Portfolio : les barres se classent, la meilleure option prend la couleur
      const order = BARS.map((v, i) => i).sort((a, b) => BARS[b] - BARS[a]), k = ioq(seg(p, .15, .7)), bh = s / 18;
      BARS.forEach((v, i) => {
        const yy = lerp(i, order.indexOf(i), k), top = order.indexOf(i) === 0 && k > .9;
        const y0 = y - s * .36 + yy * s * .18, w = s * .72 * v * oq(seg(p, 0, .3));
        g.line(x - s * .36, y0, x - s * .36 + w, y0, top ? col : WHITE, top ? 1 : .55, bh);
      });
    },
    (g, x, y, s, p, col) => {   // Trial : la courbe de design se trace, un point glisse jusqu'au design retenu
      const x0 = x - s * .38, x1 = x + s * .38, y0 = y - s * .3, y1 = y + s * .3;
      g.line(x0, y1, x1, y1, WHITE, .2); g.line(x0, y0, x0, y1, WHITE, .2);
      const ck = ioq(seg(p, .05, .55)), P = u => [lerp(x0, x1, u), y1 - (y1 - y0) * (.08 + .84 * (1 - Math.pow(1 - u, 2.4)))], pts = [];
      for (let i = 0; i <= Math.ceil(28 * ck); i++) pts.push(P(Math.min(i / 28, ck)));
      g.poly(pts, WHITE, .9, 1.5);
      const ok = ioq(seg(p, .6, .95)); if (ok > 0) { const q = P(lerp(.2, .55, ok)); g.dot(q[0], q[1], 3.5 * g.S, col, 1); g.x.strokeStyle = col; g.x.globalAlpha = .6; g.x.lineWidth = 1; g.x.beginPath(); g.x.arc(q[0], q[1], 7 * g.S, 0, TAU); g.x.stroke(); g.x.globalAlpha = 1; }
    },
    (g, x, y, s, p, col) => {   // ClinOps : des sites ; les sites recommandés s'allument
      SITES.forEach(st => { const on = st.rec ? oq(seg(p, .2 + st.d * .5, .35 + st.d * .5)) : 0; g.dot(x + st.x * s * .8, y + st.y * s * .7, (2.2 + 1.2 * on) * g.S, on > 0 ? col : WHITE, on > 0 ? .5 + .5 * on : .3); });
    },
    (g, x, y, s, p, col) => {   // Response : la population se sépare, les répondeurs d'un côté
      const k = ioq(seg(p, .2, .75));
      POP.forEach(q => { const tx = (q.resp ? -.22 : .22) + q.x * .35, px = lerp(q.x, tx, k); g.dot(x + px * s, y + q.y * s * .8, 2.4 * g.S, q.resp && k > .3 ? col : WHITE, q.resp ? .5 + .5 * k : .35); });
      if (k > .9) { g.line(x, y - s * .32, x, y + s * .32, WHITE, .2 * seg(p, .75, .9)); }
    },
    (g, x, y, s, p, col) => {   // AI Conductor : les lignes du document s'écrivent, puis sont validées une à une
      for (let l = 0; l < 6; l++) {
        const yy = y - s * .3 + l * s * .12, wk = oq(seg(p, .05 + l * .08, .25 + l * .08)), w = s * (l % 3 === 2 ? .42 : .58);
        g.line(x - s * .36, yy, x - s * .36 + w * wk, yy, WHITE, l === 0 ? .8 : .45, (l === 0 ? 3.5 : 2.5) * g.S);
        const ck = seg(p, .55 + l * .06, .65 + l * .06);
        if (ck > 0) g.poly([[x + s * .3, yy], [x + s * .33, yy + s * .03], [x + s * .38, yy - s * .035]].slice(0, ck > .5 ? 3 : 2), TEA, ck, 1.5);
      }
    },
  ];

  function draw(g, t) {
    const { S } = g, { cy, R, r, xs } = L, tt = now(), mv = ioq(seg(tt, at, at + .9));
    const lx = lerp(xs[prev] ?? xs[0], xs[cur], mv), col = COLS[cur % COLS.length];
    // la ligne : pointillé, trait plein jusqu'à la loupe
    g.flow([[xs[0], cy], [xs[n - 1], cy]], GREY, .4, t, 0, 0);
    g.line(xs[0], cy, lx, cy, WHITE, .4, 1.2);
    // les petites étapes (la loupe passe dessus)
    xs.forEach((sx, i) => {
      if (Math.abs(sx - lx) < R + 10 * S) return;
      const done = i < cur;
      g.dot(sx, cy, r, DISC, .95);
      g.x.strokeStyle = done ? COLS[i % COLS.length] : 'rgba(244,244,244,.5)'; g.x.lineWidth = 1.5; g.x.beginPath(); g.x.arc(sx, cy, r, 0, TAU); g.x.stroke();
      if (done) g.dot(sx, cy, r * .35, COLS[i % COLS.length], .9);
    });
    // la loupe : disque sombre, anneau à la couleur de l'étape, second anneau fin ; la mini-scène dedans
    g.dot(lx, cy, R, DISC, .92);
    g.x.strokeStyle = `rgba(244,244,244,.14)`; g.x.lineWidth = 1; g.x.beginPath(); g.x.arc(lx, cy, R + 8 * S, 0, TAU); g.x.stroke();
    const fill = oq(seg(tt, at + .6, at + 1.4));
    g.x.strokeStyle = col; g.x.lineWidth = 1.5; g.x.lineCap = 'round'; g.x.beginPath(); g.x.arc(lx, cy, R, -Math.PI / 2, -Math.PI / 2 + TAU * Math.max(fill, mv < 1 ? 0 : 1)); g.x.stroke();
    const p = seg(tt, at + .8, at + 3.8), sa = seg(tt, at + .7, at + 1.1);
    if (sa > 0) { g.x.save(); g.x.beginPath(); g.x.arc(lx, cy, R - 4 * S, 0, TAU); g.x.clip(); g.x.globalAlpha = sa; SCENES[cur % SCENES.length](g, lx, cy, R * 1.25, p, col); g.x.restore(); }
  }

  // boucle continue (pas de fondu de sortie) : les transitions suivent les onglets
  return bonvStage(mount, { aspect: W => W < 760 ? .5 : .26, loop: 1e9, fade: 1e9, still: 0, layout, draw });
}
