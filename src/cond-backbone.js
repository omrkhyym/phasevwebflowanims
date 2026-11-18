/* AI Conductor, étape Study backbone : sources et standards du sponsor alimentent le modèle d'étude ;
   le premier draft s'écrit, chaque paragraphe garde sa source ; le contrôle CRF → EDC trouve un écart et le résout.
   Style du film BonV (socle bonv-draw.js). Monté sur [data-pv="cond-backbone"].
   Texte : enfants [data-role] du montage (sources : <li data-icon>, hub, draft, check, crf, edc, gap, fixed). */
import { bonvStage, readText, WHITE, GREY, MAU, TEA, CAP, cl, seg, oq, ioq, lerp } from './bonv-draw.js';

const T = { src: .2, hub: .8, link: 1.1, draft: 1.8, p0: 2.4, pStep: 1.15, check: 6.2, scan0: 6.9, scan1: 8.1, gapRow: 2, fix0: 8.8, fix1: 9.4, fade: 11.4, loop: 12 };
const STILL = 10;
const ROWS = 4;
const SCOL = [CAP[0], CAP[1], CAP[3]];

export function initCondBackbone(mount) {
  const tx = readText(mount);
  const SRC = [...mount.querySelectorAll('[data-role="sources"] li')].slice(0, 3).map(li => ({ lab: li.textContent.trim().toUpperCase(), ic: li.dataset.icon || 'doc' }));
  const HUB = tx.one('hub').toUpperCase(), DRAFT = tx.one('draft').toUpperCase(), CHECK = tx.one('check').toUpperCase();
  const CRF = tx.one('crf').toUpperCase(), EDC = tx.one('edc').toUpperCase(), GAP = tx.one('gap').toUpperCase(), FIXED = tx.one('fixed').toUpperCase();
  let L = null;

  function layout(g) {
    const { W, H } = g, S = g.S = cl(W / 480, .7, 1.25), pad = 18 * S, fsM = Math.max(8, 8.8 * S), narrow = W < 420;
    const chh = 28 * S, sw = narrow ? W * .5 : Math.min(W * .36, 160 * S);
    let src, hub, draft, check;
    if (!narrow) {
      src = SRC.map((s, k) => [pad + 18 * S + sw / 2, pad + chh / 2 + k * (chh + 9 * S)]);
      hub = { x: pad + 18 * S + sw / 2, y: pad + 3 * (chh + 9 * S) + 26 * S, w: sw, h: 34 * S };
      draft = { x: W * .46, y: pad, w: W * .54 - pad, h: H * .6 - pad };
      check = { x: pad, y: H * .66, w: W - 2 * pad, h: H * .34 - pad };
    } else {
      src = SRC.map((s, k) => [pad + sw / 2, pad + chh / 2 + k * (chh + 8 * S)]);
      hub = { x: pad + sw + (W - pad - (pad + sw)) / 2, y: src[1][1], w: Math.min(W - 2 * pad - sw - 20 * S, 130 * S), h: 32 * S };
      draft = { x: pad, y: src[2][1] + chh / 2 + 22 * S, w: W - 2 * pad, h: H * .34 };
      check = { x: pad, y: draft.y + draft.h + 14 * S, w: W - 2 * pad, h: H - pad - (draft.y + draft.h + 14 * S) };
    }
    L = { pad, fsM, chh, sw, src, hub, draft, check, narrow };
  }

  function draw(g, t) {
    const { S } = g, { fsM, chh, sw, src, hub, draft, check, narrow } = L;
    const pT = k => T.p0 + k * T.pStep;

    // 1. sources → modèle d'étude
    src.forEach((p, k) => {
      const lk = ioq(seg(t, T.link + k * .15, T.link + .6 + k * .15)); if (lk <= 0) return;
      const a0 = narrow ? [p[0] + sw / 2 + 6 * S, p[1]] : [p[0] - sw / 2 - 6 * S, p[1]];
      const a1 = narrow ? [hub.x - hub.w / 2 - 6 * S, hub.y + (k - 1) * 8 * S] : [hub.x - hub.w / 2 - 6 * S, hub.y];
      const pk = Math.min(seg(t, pT(k), pT(k) + .15), 1 - seg(t, pT(k) + .5, pT(k) + .7));
      g.flow(g.qpts(a0, a1, narrow ? 0 : .45, lk), pk > 0 ? SCOL[k] : WHITE, .3 + .3 * pk, t, lk >= 1 ? pk : 0, k);
    });
    // 2. modèle d'étude → paragraphes du draft
    const para = k => [draft.x - 6 * S, draft.y + 34 * S + k * (draft.h - 42 * S) / 3 + 8 * S];
    for (let k = 0; k < 3; k++) {
      const lk = ioq(seg(t, pT(k) + .35, pT(k) + .8)); if (lk <= 0) continue;
      const a0 = narrow ? [hub.x, hub.y + hub.h / 2 + 6 * S] : [hub.x + hub.w / 2 + 6 * S, hub.y];
      const a1 = narrow ? [draft.x + draft.w * (.62 + .12 * k), draft.y - 6 * S] : para(k);
      const pk = Math.min(seg(t, pT(k) + .8, pT(k) + .95), 1 - seg(t, pT(k) + 1.3, pT(k) + 1.5));
      g.flow(g.qpts(a0, a1, narrow ? .1 : -.1, lk), SCOL[k], .35, t, lk >= 1 ? pk : 0, k + 3);
    }
    src.forEach((p, k) => {
      const a = oq(seg(t, T.src + k * .15, T.src + .55 + k * .15)), on = Math.min(seg(t, pT(k), pT(k) + .2), 1 - seg(t, pT(k) + 1, pT(k) + 1.4));
      g.chip(SRC[k].lab, p[0], p[1], sw, chh, SRC[k].ic, a, SCOL[k], .2 + .8 * on, fsM);
    });
    g.chip(HUB, hub.x, hub.y, hub.w, hub.h, 'net', oq(seg(t, T.hub, T.hub + .5)), WHITE, .35, fsM);

    // 3. le premier draft : trois paragraphes, chacun avec la pastille de sa source
    const da = oq(seg(t, T.draft, T.draft + .5));
    if (da > 0) {
      g.glass(draft.x, draft.y, draft.w, draft.h, 16 * S, da);
      g.text(DRAFT, draft.x + 14 * S, draft.y + 20 * S, 400, fsM, GREY, da, 'left', true);
      const ph = (draft.h - 42 * S) / 3;
      for (let k = 0; k < 3; k++) {
        const y0 = draft.y + 34 * S + k * ph, x0 = draft.x + 28 * S, x1 = draft.x + draft.w - 14 * S, n = Math.max(2, Math.min(3, Math.floor(ph / (9 * S))));
        for (let l = 0; l < n; l++) {
          const wk = oq(seg(t, pT(k) + .9 + l * .2, pT(k) + 1.3 + l * .2)), w = (x1 - x0) * (l === n - 1 ? .55 + .15 * k : 1);
          g.line(x0, y0 + l * 9 * S + 4 * S, x0 + w * wk, y0 + l * 9 * S + 4 * S, WHITE, .45 * da, 3.5 * S);
        }
        const ca = da * oq(seg(t, pT(k) + 1.2, pT(k) + 1.5));
        g.dot(draft.x + 16 * S, y0 + 4 * S, 3.5 * S, SCOL[k], ca);
      }
    }

    // 4. contrôle CRF → EDC : une ligne ne correspond pas, elle est signalée puis corrigée
    const ca = oq(seg(t, T.check, T.check + .5));
    if (ca > 0) {
      g.glass(check.x, check.y, check.w, check.h, 16 * S, ca);
      g.text(CHECK, check.x + 14 * S, check.y + 19 * S, 400, fsM, GREY, ca, 'left', true);
      const c0 = check.x + 14 * S, cm = check.x + check.w * .5, c1 = check.x + check.w - 14 * S, top = check.y + 30 * S, rh = (check.h - 38 * S) / ROWS;
      g.text(CRF, c0, top + 2 * S, 400, fsM * .9, GREY, .8 * ca, 'left', true);
      g.text(EDC, cm + 18 * S, top + 2 * S, 400, fsM * .9, GREY, .8 * ca, 'left', true);
      const scan = seg(t, T.scan0, T.scan1), fix = oq(seg(t, T.fix0, T.fix1));
      for (let r = 0; r < ROWS; r++) {
        const y = top + 8 * S + (r + .5) * rh * .92, ra = ca * oq(seg(t, T.check + .2 + r * .1, T.check + .5 + r * .1));
        const gap = r === T.gapRow, seen = scan * ROWS > r + .5, wA = (cm - c0 - 26 * S) * (.55 + .1 * ((r * 7) % 4));
        const wB = gap ? lerp(wA * .55, wA, fix) : wA;
        g.line(c0, y, c0 + wA, y, WHITE, .4 * ra, 3.5 * S);
        g.line(cm + 18 * S, y, cm + 18 * S + wB, y, gap && fix < 1 && seen ? MAU : WHITE, .4 * ra + (gap && seen ? .3 * ra : 0), 3.5 * S);
        const col = gap ? (fix > .5 ? TEA : MAU) : TEA;
        if (seen) {
          g.x.save(); g.x.setLineDash([1, 4 * S]); g.x.lineCap = 'round';
          g.line(c0 + wA + 6 * S, y, cm + 12 * S, y, col, .8 * ra, 1.5); g.x.restore();
          if (gap) {
            const lab = fix > .5 ? FIXED : GAP;
            g.text(lab, c1, y + fsM * .36, 400, fsM * .9, col, ra, 'right', true);
          }
        }
      }
      if (scan > 0 && scan < 1) { const sy = top + 8 * S + scan * ROWS * rh * .92; g.line(c0, sy, c1, sy, WHITE, .15 * ca, 1); }
    }
  }

  return bonvStage(mount, { aspect: W => W < 420 ? 1.3 : 11 / 16, loop: T.loop, fade: T.fade, still: STILL, layout, draw });
}
