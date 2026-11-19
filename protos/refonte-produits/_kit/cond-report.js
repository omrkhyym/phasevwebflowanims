/* AI Conductor, étape Analysis & reporting : une chaîne traçable, des données nettoyées aux spécifications,
   au code, au contrôle QC indépendant validé par un expert, jusqu'aux TLF et au premier draft du CSR.
   Style du film BonV (socle bonv-draw.js). Monté sur [data-pv="cond-report"].
   Texte : enfants [data-role] du montage (stations : 5 <li>, panels : 5 <li>, spec : <li>A → B</li>, qc-a, qc-b, approve, csr). */
import { bonvStage, readText, WHITE, GREY, MAU, BLU, TEA, cl, seg, oq, ioq, lerp, win } from './bonv-draw.js';

// début de chaque station, puis fin de la dernière : environ 4 s par station, pour lire chaque étape
const ST = [.6, 4.6, 8.6, 12.6, 17.4, 22.0];
const SLOW = 1.8;   // les animations internes d'un panneau sont étirées d'autant
const T = { press: 15.9, ok0: 16.05, ok1: 16.7, fade: 22.9, loop: 23.6 };
const STILL = 21.4;

export function initCondReport(mount) {
  const tx = readText(mount);
  const STA = tx.list('stations').slice(0, 5).map(s => s.toUpperCase()), PAN = tx.list('panels').slice(0, 5).map(s => s.toUpperCase());
  const SPEC = tx.list('spec').slice(0, 3).map(s => s.split('→').map(v => v.trim().toUpperCase()));
  const QA = tx.one('qc-a').toUpperCase(), QB = tx.one('qc-b').toUpperCase(), OK = tx.one('approve'), CSR = tx.one('csr').toUpperCase();
  let L = null;

  function layout(g) {
    const { W, H } = g, S = g.S = cl(W / 480, .7, 1.25), pad = 18 * S, fsM = Math.max(7.5, 8.6 * S), fsB = Math.max(12, 12.5 * S);
    const sy = pad + 12 * S, sx0 = pad + 34 * S, sx1 = W - pad - 34 * S;
    const st = STA.map((s, i) => [lerp(sx0, sx1, STA.length > 1 ? i / (STA.length - 1) : .5), sy]);
    const top = sy + 9 * S + fsM + 22 * S;
    L = { pad, fsM, fsB, st, panel: { x: pad, y: top, w: W - 2 * pad, h: H - pad - top } };
  }

  function draw(g, t) {
    const { S } = g, { fsM, fsB, st, panel: P } = L, r = 9 * S;

    // la chaîne : stations reliées, un paquet passe de l'une à l'autre
    st.forEach((p, i) => {
      if (i < st.length - 1) {
        const lk = ioq(seg(t, .1 + i * .08, .6 + i * .08)), q = st[i + 1];
        const pk = win(t, ST[i + 1] - .5, ST[i + 1] + .3, .15, .2);
        g.flow(g.qpts([p[0] + r + 5 * S, p[1]], [q[0] - r - 5 * S, q[1]], 0, lk), t > ST[i + 1] ? WHITE : GREY, t > ST[i + 1] ? .55 : .3, t, pk, i);
      }
      const a = oq(seg(t, .1 + i * .08, .5 + i * .08)), on = seg(t, ST[i], ST[i] + .4), done = seg(t, ST[i + 1], ST[i + 1] + .3);
      g.ring(p[0], p[1], r, i === 3 && done > 0 ? TEA : WHITE, oq(on), a);
      if (done > 0) g.dot(p[0], p[1], 2.5 * S, i === 3 ? TEA : WHITE, a * done);
      g.text(STA[i], p[0], p[1] + r + 14 * S, 400, fsM, on > 0 && done < 1 ? WHITE : GREY, a, 'center', true);
    });

    // le panneau : ce que produit la station en cours
    const pa = oq(seg(t, .3, .8));
    g.glass(P.x, P.y, P.w, P.h, 16 * S, pa);
    const x0 = P.x + 16 * S, x1 = P.x + P.w - 16 * S, y0 = P.y + 34 * S, y1 = P.y + P.h - 14 * S;
    PAN.forEach((lab, i) => {
      const a = pa * (i === 4 ? seg(t, ST[4], ST[4] + .5) : win(t, ST[i], ST[i + 1], .5, .4));
      if (a <= 0) return;
      g.text(lab, x0, P.y + 21 * S, 400, fsM, GREY, a, 'left', true);
      const tt = (t - ST[i]) / SLOW;
      if (i === 0) {   // données nettoyées : un tableau qui se remplit
        const rows = 5, cols = 4, rh = (y1 - y0) / rows;
        for (let rr = 0; rr < rows; rr++) for (let c = 0; c < cols; c++) {
          const k = oq(seg(tt, .1 + rr * .12 + c * .03, .5 + rr * .12 + c * .03)), cw = (x1 - x0) / cols;
          g.line(x0 + c * cw, y0 + rr * rh + rh / 2, x0 + c * cw + cw * (.4 + .35 * (((rr + 1) * (c + 2)) % 5) / 4) * k, y0 + rr * rh + rh / 2, rr === 0 ? GREY : WHITE, (rr === 0 ? .7 : .35) * a, 3 * S);
        }
      }
      if (i === 1) {   // spécifications : domaine source → jeu d'analyse
        const rh = (y1 - y0) / Math.max(3, SPEC.length);
        SPEC.forEach(([s, d], k) => {
          const y = y0 + rh * (k + .5), ka = a * oq(seg(tt, .15 + k * .3, .5 + k * .3)), lk = ioq(seg(tt, .3 + k * .3, .8 + k * .3));
          const cw = (x1 - x0) * .32;
          g.chip(s, x0 + cw / 2, y, cw, 26 * S, 'db', ka, WHITE, 0, fsM);
          g.chip(d || '', x1 - cw / 2, y, cw, 26 * S, 'db', ka * seg(tt, .6 + k * .3, .9 + k * .3), BLU, .7, fsM);
          g.flow(g.qpts([x0 + cw + 6 * S, y], [x1 - cw - 6 * S, y], 0, lk), BLU, .5 * ka, t, lk >= 1 ? 1 : 0, k);
        });
      }
      if (i === 2) {   // code R / SAS : les lignes s'écrivent
        const n = 6, lh = (y1 - y0) / n, toks = [[.18, .3, .12], [.08, .22, .3, .1], [.08, .4], [.16, .26, .18], [.08, .3, .2], [.08, .14], [.2, .28]];
        for (let l = 0; l < n; l++) {
          const k = seg(tt, .1 + l * .17, .35 + l * .17); if (k <= 0) continue;
          const y = y0 + lh * (l + .5);
          g.text(String(l + 1).padStart(2, '0'), x0, y + fsM * .36, 400, fsM * .9, GREY, .6 * a, 'left', true);
          let cx = x0 + 26 * S + (l > 0 && l < n - 1 ? 14 * S : 0);
          toks[l].forEach((w, j) => {
            const tw = (x1 - x0 - 50 * S) * w, kk = cl(k * toks[l].length - j);
            g.line(cx, y, cx + tw * kk, y, [WHITE, MAU, BLU, TEA][(l + j) % 4], (j ? .65 : .5) * a, 3.5 * S);
            cx += tw + 6 * S;
          });
        }
      }
      if (i === 3) {   // QC indépendant : deux programmes comparés ligne à ligne, puis validation experte
        const cm = (x0 + x1) / 2, rows = 5, bh = 28 * S, rh = (y1 - y0 - bh - 12 * S) / (rows + .6);
        g.text(QA, x0, y0 + fsM * .4, 400, fsM * .9, WHITE, .75 * a, 'left', true);
        g.text(QB, cm + 14 * S, y0 + fsM * .4, 400, fsM * .9, WHITE, .75 * a, 'left', true);
        for (let rr = 0; rr < rows; rr++) {
          const y = y0 + rh * (rr + 1.2), k = oq(seg(tt, .1 + rr * .1, .4 + rr * .1)), w = (cm - x0 - 24 * S) * (.5 + .1 * ((rr * 3) % 5));
          g.line(x0, y, x0 + w * k, y, WHITE, .4 * a, 3 * S);
          g.line(cm + 14 * S, y, cm + 14 * S + w * k, y, WHITE, .4 * a, 3 * S);
          const m = seg(tt, .6 + rr * .25, .8 + rr * .25);
          g.dot(cm, y, 3 * S, TEA, a * m);
        }
        const by = y1 - bh, pr = Math.sin(Math.PI * seg(t, T.press, T.press + .25)), ba = a * seg(tt, 1.4, 1.7);
        const bw = g.button(OK, x0, by, bh, fsB * .88, pr, ba);
        g.approve(x0 + bw + 18 * S, by + bh / 2, 9 * S, seg(t, T.ok0, T.ok1), ba);
      }
      if (i === 4) {   // sorties : tableau TLF, puis les pages du CSR
        const tw = (x1 - x0) * .54, rows = 5, rh = (y1 - y0) / rows;
        for (let rr = 0; rr < rows; rr++) {
          const k = oq(seg(tt, .1 + rr * .15, .45 + rr * .15)), y = y0 + rh * (rr + .5);
          if (rr === 1) g.line(x0, y - rh / 2, x0 + tw, y - rh / 2, WHITE, .25 * a * k);
          g.line(x0, y, x0 + tw * .34 * k, y, rr ? WHITE : GREY, (rr ? .45 : .7) * a, 3 * S);
          for (let c = 0; c < 3; c++) { const cx = x0 + tw * (.42 + c * .2); g.line(cx, y, cx + tw * .12 * k, y, rr ? BLU : GREY, (rr ? .6 : .7) * a, 3 * S); }
        }
        // le CSR : une seule page, qui s'écrit ligne à ligne à côté du tableau
        const px = x0 + tw + 24 * S, pw = x1 - px, ph = y1 - y0 - 16 * S, pk = oq(seg(tt, .9, 1.3));
        if (pk > 0) {
          g.glass(px, y0 + 6 * S * (1 - pk), pw, ph, 8 * S, a * pk);
          const nl = Math.max(3, Math.floor((ph - 24 * S) / (10 * S)));
          for (let l = 0; l < nl; l++) {
            const k = oq(seg(tt, 1.2 + l * .12, 1.45 + l * .12)), w = (pw - 24 * S) * (l === 0 ? .5 : l % 4 === 3 ? .6 : 1);
            g.line(px + 12 * S, y0 + 16 * S + l * 10 * S, px + 12 * S + w * k, y0 + 16 * S + l * 10 * S, WHITE, (l === 0 ? .6 : .3) * a, l === 0 ? 3.5 * S : 2.5 * S);
          }
        }
        g.text(CSR, px, y1, 400, fsM, WHITE, .8 * a * seg(tt, 1.6, 1.9), 'left', true);
      }
    });
  }

  return bonvStage(mount, { aspect: W => W < 420 ? 1.05 : 11 / 16, loop: T.loop, fade: T.fade, still: STILL, layout, draw });
}
