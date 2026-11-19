/* BonV, étape 02 Collaborate : la question devient un projet, les membres arrivent avec leur rôle,
   les crédits du projet se consomment sous les yeux du budget holder, le résultat est partagé avec toute l'équipe,
   et la validation finale revient au final sign-off (seul jaune de la scène avec le V).
   D'après la scène Teams du film (cartes en verre, membres ajoutés un à un). Monté sur [data-pv="bonv-collab"].
   Texte : enfants [data-role] du montage (project, members : <li><span>nom</span><span>rôle</span></li>, credits, result). */
import { bonvStage, readText, WHITE, GREY, MAU, BLU, TEA, CAP, cl, seg, oq, ioq, lerp } from './bonv-draw.js';

const T = { card: .2, m0: 1.0, mStep: .8, ring: 4.4, use: [[5.0, .22], [6.0, .41], [7.0, .58]], res: 7.9, cv0: 8.2, cv1: 9.0, share: 9.0, seen: 9.8, sign0: 10.6, sign1: 11.25, fade: 12.4, loop: 13 };
const STILL = 11.8;
const COLS = [MAU, BLU, TEA, CAP[2]];

export function initBonvCollab(mount) {
  const tx = readText(mount);
  const PROJ = tx.one('project').toUpperCase(), CRED = tx.one('credits').toUpperCase(), RES = tx.one('result').toUpperCase();
  const MEM = [...mount.querySelectorAll('[data-role="members"] li')].slice(0, 4).map(li => {
    const s = li.querySelectorAll('span'); return { name: (s[0] || li).textContent.trim(), role: (s[1] ? s[1].textContent.trim() : '') };
  });
  const iBudget = MEM.findIndex(m => /budget/i.test(m.role)), iSign = MEM.findIndex(m => /sign/i.test(m.role));
  let L = null;

  function layout(g) {
    const { W, H } = g, S = g.S = cl(W / 480, .7, 1.25);
    const pad = 20 * S, fsB = Math.max(12, 13.5 * S), fsM = Math.max(8, 9 * S);
    const narrow = W < 420;
    const card = narrow ? { x: pad, y: pad, w: W - 2 * pad, h: H * .56 } : { x: pad, y: pad, w: W * .57, h: H - 2 * pad };
    const colX = narrow ? pad : card.x + card.w + 16 * S, colW = narrow ? W - 2 * pad : W - pad - colX;
    const ringR = Math.min(38 * S, colW * .26);
    let ring, res;
    if (narrow) {
      const top = card.y + card.h + 18 * S, bh = H - pad - top;
      ring = { x: pad + ringR + 6 * S, y: top + ringR + 4 * S, r: ringR };
      res = { x: pad + ringR * 2 + 28 * S, y: top, w: W - pad - (pad + ringR * 2 + 28 * S), h: bh };
    } else {
      ring = { x: colX + colW / 2, y: pad + ringR + 10 * S, r: ringR };
      const top = ring.y + ringR + 34 * S;
      res = { x: colX, y: top, w: colW, h: H - pad - top };
    }
    const head = 40 * S, rowH = (card.h - head - 8 * S) / Math.max(1, MEM.length);
    L = { pad, fsB, fsM, card, ring, res, head, rowH, narrow };
  }

  function draw(g, t) {
    const { S } = g, { fsB, fsM, card, ring, res, head, rowH, narrow } = L;
    const ca = oq(seg(t, T.card, T.card + .5));

    // la carte du projet
    g.glass(card.x, card.y + 10 * S * (1 - ca), card.w, card.h, 18 * S, ca);
    g.text(PROJ, card.x + 16 * S, card.y + 24 * S, 400, fsM, GREY, ca, 'left', true);
    g.line(card.x + 16 * S, card.y + head - 4 * S, card.x + card.w - 16 * S, card.y + head - 4 * S, WHITE, .1 * ca);

    const rowY = i => card.y + head + i * rowH + rowH / 2;
    MEM.forEach((m, i) => {
      const t0 = T.m0 + i * T.mStep, a = ca * oq(seg(t, t0, t0 + .45)), cy = rowY(i);
      if (a <= 0) return;
      const ar = 10 * S, ax = card.x + 16 * S + ar;
      g.avatar(ax, cy, ar * (.6 + .4 * oq(seg(t, t0, t0 + .3))), COLS[i], m.name, a);
      g.text(m.name, ax + ar + 10 * S, cy + fsB * .34, 400, fsB, WHITE, a);
      // le rôle : pastille mono qui glisse en place
      const pk = oq(seg(t, t0 + .2, t0 + .65)), lab = m.role.toUpperCase(), pw = g.tw(lab, 400, fsM, true) + 16 * S, ph = 20 * S;
      const px = card.x + card.w - 16 * S - pw + 12 * S * (1 - pk) - (narrow ? 0 : 0);
      g.x.save(); g.x.globalAlpha = a * pk; g.rr(px, cy - ph / 2, pw, ph, ph / 2);
      g.x.strokeStyle = `rgba(244,244,244,.22)`; g.x.lineWidth = 1; g.x.stroke(); g.x.restore();
      g.text(lab, px + 8 * S, cy + fsM * .36, 400, fsM, WHITE, .8 * a * pk, 'left', true);
      // résultat vu par le membre
      const sa = a * oq(seg(t, T.seen + i * .15, T.seen + .3 + i * .15));
      g.dot(ax + ar * .75, cy - ar * .75, 3 * S, TEA, sa);
      if (i < MEM.length - 1) g.line(card.x + 16 * S, cy + rowH / 2, card.x + card.w - 16 * S, cy + rowH / 2, WHITE, .06 * a);
    });

    // crédits du projet : allocation en pointillé, consommation en bleu, par paliers
    const ra = oq(seg(t, T.ring, T.ring + .5));
    if (ra > 0) {
      g.x.save(); g.x.setLineDash([1, 5 * S]); g.x.lineCap = 'round'; g.x.strokeStyle = `rgba(140,134,176,${.9 * ra})`; g.x.lineWidth = 1.5;
      g.x.beginPath(); g.x.arc(ring.x, ring.y, ring.r, 0, Math.PI * 2); g.x.stroke(); g.x.restore();
      let use = 0; T.use.forEach(([u0, v], k) => { const prev = k ? T.use[k - 1][1] : 0; use = Math.max(use, lerp(prev, v, ioq(seg(t, u0, u0 + .6)))); });
      if (use > 0) { g.x.strokeStyle = `rgba(120,168,224,${ra})`; g.x.lineWidth = 2 * S; g.x.lineCap = 'round'; g.x.beginPath(); g.x.arc(ring.x, ring.y, ring.r, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * use); g.x.stroke(); }
      // chaque palier : une petite impulsion sur l'anneau
      T.use.forEach(([u0]) => { const k = seg(t, u0, u0 + .7); if (k > 0 && k < 1) { g.x.strokeStyle = `rgba(120,168,224,${.35 * (1 - k) * ra})`; g.x.lineWidth = 1; g.x.beginPath(); g.x.arc(ring.x, ring.y, ring.r + 4 * S + 10 * S * k, 0, Math.PI * 2); g.x.stroke(); } });
      if (iBudget >= 0) g.avatar(ring.x, ring.y, ring.r * .3, COLS[iBudget], MEM[iBudget].name, ra);
      if (narrow) g.text(CRED, ring.x, ring.y + ring.r + 16 * S, 400, fsM, GREY, ra, 'center', true);
      else g.text(CRED, ring.x, ring.y + ring.r + 20 * S, 400, fsM, GREY, ra, 'center', true);
    }

    // le résultat partagé : carte, courbe, puis il part vers chaque membre
    const qa = oq(seg(t, T.res, T.res + .5));
    if (qa > 0) {
      const ry = res.y + 10 * S * (1 - qa);
      g.glass(res.x, ry, res.w, res.h, 16 * S, qa);
      g.text(RES, res.x + 14 * S, ry + 22 * S, 400, fsM, WHITE, .85 * qa, 'left', true);
      const gx0 = res.x + 14 * S, gx1 = res.x + res.w - 14 * S, gy0 = ry + 36 * S, gy1 = ry + res.h - 14 * S, ck = ioq(seg(t, T.cv0, T.cv1));
      g.line(gx0, gy1, gx1, gy1, WHITE, .12 * qa);
      const pts = [];
      for (let k = 0; k <= Math.ceil(28 * ck); k++) { const u = Math.min(k / 28, ck); pts.push([lerp(gx0, gx1, u), gy1 - (gy1 - gy0) * (.1 + .8 * (1 - Math.pow(1 - u, 2.2)))]); }
      g.poly(pts, WHITE, qa, 1.6);
      MEM.forEach((m, i) => {
        const k = ioq(seg(t, T.share + i * .12, T.share + .6 + i * .12)); if (k <= 0) return;
        const a0 = narrow ? [res.x + res.w * (.25 + i * .17), ry - 6 * S] : [res.x - 6 * S, ry + res.h * (.3 + i * .14)];
        const a1 = narrow ? [card.x + card.w - 30 * S - i * 40 * S, card.y + card.h + 6 * S] : [card.x + card.w + 6 * S, rowY(i)];
        g.flow(g.qpts(a0, a1, (i - 1.5) * .04, k), COLS[i], .45, t, k >= 1 ? win2(t) : 0, i + 2);
      });
    }

    // validation finale par le final sign-off
    if (iSign >= 0) {
      const cy = rowY(iSign), k = seg(t, T.sign0, T.sign1);
      const lab = MEM[iSign].role.toUpperCase(), pw = g.tw(lab, 400, fsM, true) + 16 * S;
      g.approve(card.x + card.w - 16 * S - pw - 16 * S, cy, 8 * S, k, ca * seg(t, T.sign0 - .5, T.sign0));
    }
  }
  const win2 = t => Math.min(seg(t, T.share + .6, T.share + .9), 1 - seg(t, T.sign0, T.sign0 + .4));

  return bonvStage(mount, { aspect: W => W < 420 ? 1.25 : 11 / 16, loop: T.loop, fade: T.fade, still: STILL, layout, draw });
}
