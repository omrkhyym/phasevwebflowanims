/* AI Conductor, étape Interactive protocol : une question posée sur une section du protocole ouvre l'app d'évidence
   (arbitrage), les sections impactées s'allument, la décision est validée puis propagée, et la version avance.
   Style du film BonV (socle bonv-draw.js). Monté sur [data-pv="cond-protocol"].
   Texte : enfants [data-role] du montage (doc, v-before, v-after, sections : <li data-focus> / <li data-impact>,
   user, question, app, x-axis, y-axis, approve). */
import { bonvStage, readText, WHITE, GREY, MAU, BLU, TEA, cl, seg, oq, ioq, lerp } from './bonv-draw.js';

const T = { card: .2, q: 1.0, type0: 1.3, type1: 2.8, app: 3.2, curve0: 3.7, curve1: 4.5, cur: 4.5, opt0: 4.9, opt1: 5.9, imp: 6.2, approve: 7.4, press: 7.9, ok0: 8.05, ok1: 8.7, prop: 8.9, ver: 9.7, fade: 11.4, loop: 12 };
const STILL = 10.4;
const curve = u => 1 - Math.pow(1 - u, 2.4);   // puissance selon la taille : rendement décroissant

export function initCondProtocol(mount) {
  const tx = readText(mount);
  const DOC = tx.one('doc').toUpperCase(), V0 = tx.one('v-before').toUpperCase(), V1 = tx.one('v-after').toUpperCase();
  const SEC = [...mount.querySelectorAll('[data-role="sections"] li')].map(li => ({ lab: li.textContent.trim().toUpperCase(), focus: li.hasAttribute('data-focus'), impact: li.hasAttribute('data-impact') }));
  const USER = tx.one('user'), Q = tx.one('question'), APP = tx.one('app').toUpperCase(), XA = tx.one('x-axis').toUpperCase(), YA = tx.one('y-axis').toUpperCase(), OK = tx.one('approve');
  const iF = Math.max(0, SEC.findIndex(s => s.focus)), IMP = SEC.map((s, i) => s.impact ? i : -1).filter(i => i >= 0);
  let L = null;

  function layout(g) {
    const { W, H } = g, S = g.S = cl(W / 480, .7, 1.25), pad = 18 * S, fsM = Math.max(8, 8.8 * S), fsB = Math.max(12, 12.5 * S), narrow = W < 420;
    let doc, bub, app;
    const bubFor = (x, y, w) => { const lines = g.wrap(Q, 400, fsB, w - 54 * S); return { x, y, w, h: lines.length * fsB * 1.4 + 22 * S, lines }; };
    if (!narrow) {
      // gouttière large entre le protocole et la colonne de droite : les liens y passent, sans traverser les cartes
      doc = { x: pad, y: pad, w: W * .38, h: H - 2 * pad };
      const rx = doc.x + doc.w + 44 * S;
      bub = bubFor(rx, pad, W - rx - pad);
      app = { x: rx, y: bub.y + bub.h + 20 * S, w: bub.w, h: H - pad - (bub.y + bub.h + 20 * S) };
    } else {
      doc = { x: pad, y: pad, w: W - 2 * pad, h: H * .4 };
      bub = bubFor(pad, doc.y + doc.h + 12 * S, W - 2 * pad);
      app = { x: pad, y: bub.y + bub.h + 12 * S, w: W - 2 * pad, h: H - pad - (bub.y + bub.h + 12 * S) };
    }
    L = { fsM, fsB, doc, bub, app, narrow, rowH: (doc.h - 34 * S) / Math.max(1, SEC.length) };
  }

  function draw(g, t) {
    const { S } = g, { fsM, fsB, doc, bub, app, narrow, rowH } = L;
    const rowY = i => doc.y + 30 * S + i * rowH;
    const ca = oq(seg(t, T.card, T.card + .5));
    const impK = j => oq(seg(t, T.imp + j * .2, T.imp + .5 + j * .2)), prK = j => oq(seg(t, T.prop + j * .25, T.prop + .5 + j * .25));

    /* liens à angle droit, dans la gouttière ; un seul jeu visible à la fois :
       section ciblée → question (s'efface à l'ouverture de l'app), puis app → sections impactées (s'efface après la propagation).
       En mobile, les cartes sont empilées : pas de liens, les contours des sections suffisent. */
    const gx = doc.x + doc.w + 22 * S;
    const fq = ioq(seg(t, T.q + .3, T.q + .9)) , fqa = 1 - seg(t, T.app, T.app + .5);
    if (!narrow && fq > 0 && fqa > 0) g.flow(g.elbow([doc.x + doc.w + 4 * S, rowY(iF) + rowH / 2], [bub.x - 6 * S, bub.y + bub.h / 2], gx, fq), MAU, .55 * fqa, t, 0, 0);
    if (!narrow) IMP.forEach((i, j) => {
      const k = ioq(seg(t, T.imp + j * .2, T.imp + .6 + j * .2)); if (k <= 0) return;
      const la = 1 - seg(t, T.prop + 1.6, T.prop + 2.2); if (la <= 0) return;
      const lane = gx + (j - (IMP.length - 1) / 2) * 7 * S;
      const pr = prK(j), pk = Math.max(Math.min(seg(t, T.imp + .6 + j * .2, T.imp + .8 + j * .2), 1 - seg(t, T.approve - .3, T.approve)), Math.min(seg(t, T.prop + j * .25, T.prop + .2 + j * .25), 1 - seg(t, T.prop + 1.4, T.prop + 1.8)));
      g.flow(g.elbow([app.x - 6 * S, app.y + 26 * S + j * 12 * S], [doc.x + doc.w + 4 * S, rowY(i) + rowH / 2], lane, k), pr > 0 ? TEA : BLU, .5 * la, t, k >= 1 ? pk : 0, j + 2);
    });

    // le protocole et ses sections
    g.glass(doc.x, doc.y + 10 * S * (1 - ca), doc.w, doc.h, 16 * S, ca);
    g.text(DOC, doc.x + 14 * S, doc.y + 20 * S, 400, fsM, GREY, ca, 'left', true);
    const vk = seg(t, T.ver, T.ver + .3);
    g.text(V0, doc.x + doc.w - 14 * S, doc.y + 20 * S, 400, fsM, GREY, ca * (1 - vk), 'right', true);
    g.text(V1, doc.x + doc.w - 14 * S, doc.y + 20 * S, 400, fsM, TEA, ca * vk, 'right', true);
    SEC.forEach((s, i) => {
      const ra = ca * oq(seg(t, .4 + i * .1, .8 + i * .1)), y = rowY(i), j = IMP.indexOf(i);
      const foc = i === iF ? seg(t, T.q + .2, T.q + .5) : 0, imp = j >= 0 ? impK(j) : 0, pr = j >= 0 ? prK(j) : 0;
      const ek = Math.max(foc, imp), col = i === iF ? MAU : pr > 0 ? TEA : BLU;
      if (ek > 0) { g.rr(doc.x + 8 * S, y + 2 * S, doc.w - 16 * S, rowH - 4 * S, 8 * S); g.x.strokeStyle = `rgba(${col === MAU ? '169,159,216' : col === TEA ? '127,232,207' : '120,168,224'},${.8 * ek * ra})`; g.x.lineWidth = 1; g.x.stroke(); }
      g.text(s.lab, doc.x + 16 * S, y + rowH * .42, 400, fsM, ek > 0 ? WHITE : GREY, ra, 'left', true);
      const bw = (doc.w - 32 * S) * (.5 + .12 * ((i * 5) % 4));
      g.line(doc.x + 16 * S, y + rowH * .7, doc.x + 16 * S + bw, y + rowH * .7, WHITE, .3 * ra, 3 * S);
      if (j >= 0) g.dot(doc.x + doc.w - 18 * S, y + rowH / 2, 3 * S, pr > 0 ? TEA : BLU, ra * Math.max(imp, pr));
    });

    // la question, posée dans le contexte de la section
    const qa = oq(seg(t, T.q, T.q + .4));
    if (qa > 0) {
      const ar = 9 * S;
      g.glass(bub.x + 2 * ar + 8 * S, bub.y, bub.w - 2 * ar - 8 * S, bub.h, 14 * S, qa, 5 * S);
      g.avatar(bub.x + ar, bub.y + ar + 4 * S, ar, MAU, USER, qa);
      let left = Math.round(Q.length * seg(t, T.type0, T.type1));
      bub.lines.forEach((ln, k) => { const s = ln.slice(0, Math.max(0, left)); left -= ln.length + 1; g.text(s, bub.x + 2 * ar + 20 * S, bub.y + 11 * S + fsB * .92 + k * fsB * 1.4, 400, fsB, WHITE, qa); });
    }

    // l'app d'évidence : arbitrage sur la courbe, puis validation
    const aa = oq(seg(t, T.app, T.app + .5));
    if (aa > 0) {
      g.glass(app.x, app.y + 10 * S * (1 - aa), app.w, app.h, 16 * S, aa);
      g.text(APP, app.x + 14 * S, app.y + 19 * S, 400, fsM, WHITE, .85 * aa, 'left', true);
      const bh = 28 * S, by = app.y + app.h - 12 * S - bh;
      const gx0 = app.x + 30 * S, gx1 = app.x + app.w - 18 * S, gy0 = app.y + 32 * S, gy1 = by - 22 * S;
      if (gy1 - gy0 > 20 * S) {
        const ax = seg(t, T.curve0 - .2, T.curve0 + .2) * aa;
        g.line(gx0, gy1, gx1, gy1, WHITE, .15 * ax); g.line(gx0, gy0, gx0, gy1, WHITE, .15 * ax);
        g.text(XA, gx1, gy1 + 13 * S, 400, fsM * .85, GREY, ax, 'right', true);
        g.x.save(); g.x.translate(gx0 - 8 * S, gy0); g.x.rotate(-Math.PI / 2); g.text(YA, 0, 0, 400, fsM * .85, GREY, ax, 'right', true); g.x.restore();
        const ck = ioq(seg(t, T.curve0, T.curve1)), P = u => [lerp(gx0, gx1, u), gy1 - (gy1 - gy0) * (.08 + .84 * curve(u))], pts = [];
        for (let k = 0; k <= Math.ceil(30 * ck); k++) pts.push(P(Math.min(k / 30, ck)));
        g.poly(pts, WHITE, aa, 1.6);
        const cur = P(.3), ok = ioq(seg(t, T.opt0, T.opt1)), opt = P(lerp(.3, .58, ok));
        g.dot(cur[0], cur[1], 4 * S, GREY, aa * seg(t, T.cur, T.cur + .3));
        if (ok > 0) {
          g.x.save(); g.x.setLineDash([2 * S, 3 * S]);
          g.line(opt[0], opt[1], opt[0], gy1, WHITE, .35 * aa); g.line(gx0, opt[1], opt[0], opt[1], WHITE, .35 * aa);
          g.x.restore();
          g.dot(opt[0], opt[1], 4.5 * S, WHITE, aa);
          g.x.strokeStyle = `rgba(244,244,244,${.4 * aa})`; g.x.lineWidth = 1; g.x.beginPath(); g.x.arc(opt[0], opt[1], 8 * S, 0, Math.PI * 2); g.x.stroke();
        }
      }
      const va = aa * seg(t, T.approve, T.approve + .3);
      const bw = g.button(OK, app.x + 14 * S, by, bh, fsB * .88, Math.sin(Math.PI * seg(t, T.press, T.press + .25)), va);
      g.approve(app.x + 14 * S + bw + 18 * S, by + bh / 2, 9 * S, seg(t, T.ok0, T.ok1), va);
    }
  }

  return bonvStage(mount, { aspect: W => W < 420 ? 1.45 : 11 / 16, loop: T.loop, fade: T.fade, still: STILL, layout, draw });
}
