/* BonV, étape 03 Orchestrate : BonV appelle les produits PhaseV et les systèmes du sponsor (intégrations par API),
   puis un résultat s'ouvre et montre comment il a été produit : le module, les données, la revue (traçabilité).
   D'après la scène Orchestrates du film (V, arc des modules, pointillés et paquets). Monté sur [data-pv="bonv-orch"].
   Texte : enfants [data-role] du montage (products, integrations : le <li data-pick> est celui retenu ;
   result ; lineage : <li><span>libellé</span><span>valeur</span></li>). */
import { bonvStage, WHITE, GREY, TEA, CAP, cl, seg, oq, ioq, lerp } from './bonv-draw.js';

const T = { out: 1.0, step: .16, focus: 5.6, open0: 6.2, open1: 6.9, row: 7.1, rowStep: .55, fade: 12.4, loop: 13 };
const STILL = 10.8;

export function initBonvOrch(mount) {
  const items = sel => [...mount.querySelectorAll(`[data-role="${sel}"] li`)];
  const P = items('products'), I = items('integrations');
  const NODES = [...P.map((li, i) => ({ lab: li.textContent.trim().toUpperCase(), kind: 'p', col: CAP[i % CAP.length], pick: li.hasAttribute('data-pick') })),
    ...I.map(li => ({ lab: li.textContent.trim().toUpperCase(), kind: 'i', col: TEA, pick: li.hasAttribute('data-pick') }))];
  const RES = ((mount.querySelector('[data-role="result"]') || {}).textContent || '').trim().toUpperCase();
  const LIN = items('lineage').map(li => { const s = li.querySelectorAll('span'); return { k: (s[0] || li).textContent.trim().toUpperCase(), v: s[1] ? s[1].textContent.trim() : '' }; });
  const pickP = Math.max(0, NODES.findIndex(n => n.kind === 'p' && n.pick)), pickI = NODES.findIndex(n => n.kind === 'i' && n.pick);
  let L = null;

  function layout(g) {
    const { W, H } = g, S = g.S = cl(W / 480, .7, 1.25);
    const pad = 20 * S, fsB = Math.max(12, 13 * S), fsM = Math.max(8, 8.8 * S), narrow = W < 420, n = NODES.length;
    const v = narrow ? { x: pad + 22 * S, y: H * .3, r: 15 * S } : { x: W * .15, y: H / 2, r: 17 * S };
    const R = narrow ? H * .25 : H * .42, rx = R * 1.05, span = 72 * Math.PI / 180;
    NODES.forEach((nd, i) => { const a = -span + (2 * span) * (n > 1 ? i / (n - 1) : .5); nd.p = [v.x + Math.cos(a) * rx, v.y + Math.sin(a) * R]; });
    const cw = narrow ? W - 2 * pad : W * .42, ch = Math.min(narrow ? H * .36 : H * .62, 40 * S + LIN.length * 38 * S);
    const card = narrow ? { x: pad, y: H - pad - ch, w: cw, h: ch } : { x: W - pad - cw, y: H / 2 - ch / 2, w: cw, h: ch };
    L = { pad, fsB, fsM, v, nr: 7 * S, card, narrow };
  }

  function draw(g, t) {
    const { S } = g, { fsB, fsM, v, nr, card, narrow } = L, VR = v.r * 1.47 + 6 * S;
    const fk = oq(seg(t, T.focus, T.focus + .7));   // passage à la traçabilité : le reste s'efface

    // 1. BonV appelle chaque produit et chaque intégration
    NODES.forEach((nd, i) => {
      const t0 = T.out + i * T.step, ek = ioq(seg(t, t0, t0 + .5)), lit = oq(seg(t, t0 + .4, t0 + 1.2));
      const keep = i === pickP || i === pickI, dim = keep ? 1 : 1 - .75 * fk;
      if (ek > 0) {
        const [a0, a1] = g.trim([v.x, v.y], nd.p, VR, nr + 4 * S);
        g.flow(g.qpts(a0, a1, .04, ek), nd.col, (.25 + .35 * lit) * dim, t, ek >= 1 ? Math.min(seg(t, t0 + .5, t0 + .8), 1 - seg(t, T.focus, T.focus + .4)) : 0, i);
      }
      const na = oq(seg(t, t0 + .2, t0 + .6)) * dim;
      if (nd.kind === 'p') g.ring(nd.p[0], nd.p[1], nr, nd.col, lit, na);
      else { g.ring(nd.p[0], nd.p[1], nr, nd.col, lit, na); g.db(nd.p[0], nd.p[1], nr * 1.05, .8 * na * (.5 + .5 * lit)); }
      const la = na * (keep ? 1 : 1 - fk) * (narrow && !keep ? .7 : 1);
      g.text(nd.lab, nd.p[0] + nr + 8 * S, nd.p[1] + fsM * .36, 400, fsM, keep && fk > .5 ? WHITE : GREY, la, 'left', true);
      // le produit retenu : son anneau se referme, un second anneau fin l'entoure
      if (keep && fk > 0) { g.x.strokeStyle = `rgba(244,244,244,${.5 * fk})`; g.x.lineWidth = 1; g.x.beginPath(); g.x.arc(nd.p[0], nd.p[1], nr + 5 * S, 0, Math.PI * 2); g.x.stroke(); }
    });

    // 2. le V
    const th = Math.min(seg(t, .2, .5), 1 - seg(t, T.out + NODES.length * T.step, T.out + NODES.length * T.step + .4));
    g.vMark(v.x, v.y, v.r, t, th, 0, 1);

    // 3. un résultat s'ouvre : d'où il vient, avec quelles données, qui l'a revu
    const oa = oq(seg(t, T.open0, T.open0 + .4));
    if (oa > 0) {
      const ok = ioq(seg(t, T.open0, T.open1)), h = lerp(36 * S, card.h, ok), y0 = card.y + (card.h - h) / 2;
      g.glass(card.x + 10 * S * (1 - oa), y0, card.w, h, 16 * S, oa);
      g.text(RES, card.x + 14 * S, y0 + 22 * S, 400, fsM, WHITE, .85 * oa, 'left', true);
      LIN.forEach((r, k) => {
        const ra = oa * oq(seg(t, T.row + k * T.rowStep, T.row + .4 + k * T.rowStep)); if (ra <= 0) return;
        const ry = card.y + 38 * S + k * 38 * S;
        g.line(card.x + 14 * S, ry, card.x + card.w - 14 * S, ry, WHITE, .1 * ra);
        g.text(r.k, card.x + 14 * S, ry + 15 * S, 400, fsM, GREY, ra, 'left', true);
        g.text(r.v, card.x + 14 * S, ry + 31 * S, 400, fsB, WHITE, ra);
        // les deux premières lignes se rattachent au produit et à l'intégration retenus
        const src = k === 0 ? pickP : k === 1 ? pickI : -1;
        if (src >= 0) {
          const nd = NODES[src], lk = ioq(seg(t, T.row + k * T.rowStep, T.row + .7 + k * T.rowStep));
          const lab = g.tw(nd.lab, 400, fsM, true);
          const a0 = narrow ? [nd.p[0], nd.p[1] + nr + 6 * S] : [nd.p[0] + nr + 14 * S + lab, nd.p[1]];
          const a1 = narrow ? [card.x + card.w * (.55 + k * .2), card.y - 6 * S] : [card.x - 6 * S, ry + 18 * S];
          g.flow(g.qpts(a0, a1, (k ? -1 : 1) * .08, lk), nd.col, .5 * ra, t, lk >= 1 ? 1 : 0, k + 3);
        }
      });
    }
  }

  return bonvStage(mount, { aspect: W => W < 420 ? 1.3 : 11 / 16, loop: T.loop, fade: T.fade, still: STILL, layout, draw });
}
