/* Home, The problem : la chaîne des décisions (population → design → sites → données → documents), chacune dans un outil séparé.
   Une décision avance le long de la chaîne ; à chaque relais manuel, le lien est coupé : elle cale, une partie repart en arrière
   (travail refait, mauve), puis passe. En bas, la ligne de temps s'allonge, en mauve pendant les blocages.
   Style du film BonV (socle bonv-draw.js). Panneau sombre pleine largeur. Monté sur [data-pv="problem-chain"].
   Texte : enfants [data-role] du montage (steps : 5 <li data-icon>, handoff, rework, delay). */
import { bonvStage, readText, WHITE, GREY, MAU, TAU, cl, seg, oq, ioq, lerp } from './bonv-draw.js';

const REWORK = [1, 3];   // relais où une partie du travail repart en arrière

export function initProblemChain(mount) {
  const tx = readText(mount);
  const ST = [...mount.querySelectorAll('[data-role="steps"] li')].slice(0, 5).map(li => ({ lab: li.textContent.trim().toUpperCase(), ic: li.dataset.icon || 'doc' }));
  const HO = tx.one('handoff').toUpperCase(), RW = tx.one('rework').toUpperCase(), DL = tx.one('delay').toUpperCase();
  const n = ST.length;
  // chronologie : pour chaque relais, approche, blocage, retour en arrière éventuel, saut, arrivée
  const H = []; let t = 1.0;
  for (let i = 0; i < n - 1; i++) {
    const h = { i, m0: t, gap: t + .5, st1: t + 1.4 }; h.rw1 = h.st1 + (REWORK.includes(i) ? 1.1 : 0); h.jump = h.rw1 + .25; h.arr = h.jump + .45;
    H.push(h); t = h.arr + .55;
  }
  const END = t, LOOP = END + 2.2, FADE = END + 1.6;
  let L = null;

  function layout(g) {
    const { W, H: HH } = g, hz = W >= 760, S = g.S = hz ? cl(W / 1200, .6, 1.15) : cl(W / 400, .75, 1.1);
    const bw = hz ? Math.min((W - 80 * S) / n * .62, 170 * S) : Math.min(W * .7, 260 * S), bh = (hz ? 52 : 42) * S;   // boîtes plus étroites : des liens longs, où le blocage se voit
    const B = ST.map((s, i) => hz ? [W * (i + .5) / n, HH * .4] : [W / 2, HH * (.08 + .155 * i)]);
    const bar = hz ? { x0: B[0][0] - bw / 2, x1: B[n - 1][0] + bw / 2, y: HH * .78 } : { x0: W * .12, x1: W * .88, y: HH * .9 };
    L = { hz, bw, bh, B, bar, fsM: Math.max(8.5, (hz ? 10 : 9) * S), gh: 9 * S };
  }

  function link(i) {   // extrémités du lien i → i+1 et bornes de la coupure au milieu
    const { hz, bw, bh, B, gh } = L, a = hz ? [B[i][0] + bw / 2 + 6 * g0.S, B[i][1]] : [B[i][0], B[i][1] + bh / 2 + 6 * g0.S];
    const b = hz ? [B[i + 1][0] - bw / 2 - 6 * g0.S, B[i + 1][1]] : [B[i + 1][0], B[i + 1][1] - bh / 2 - 6 * g0.S];
    const m = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2], d = hz ? [gh, 0] : [0, gh];
    return { a, b, g1: [m[0] - d[0], m[1] - d[1]], g2: [m[0] + d[0], m[1] + d[1]], m };
  }
  let g0 = null;

  function draw(g, t) {
    g0 = g; const { S } = g, { hz, bw, bh, B, bar, fsM } = L;
    const ia = oq(seg(t, .1, .6));
    // liens coupés au milieu
    for (let i = 0; i < n - 1; i++) {
      const k = link(i), h = H[i], passed = t > h.arr;
      g.x.save(); g.x.setLineDash([4 * S, 5 * S]);
      g.line(k.a[0], k.a[1], k.g1[0], k.g1[1], passed ? WHITE : GREY, (passed ? .5 : .4) * ia, 1.2);
      g.line(k.g2[0], k.g2[1], k.b[0], k.b[1], passed ? WHITE : GREY, (passed ? .5 : .4) * ia, 1.2);
      g.x.restore();
      // blocage : impulsion à la coupure, étiquette « manual handoff »
      const st = seg(t, h.gap, h.st1 + .3) * (1 - seg(t, h.jump, h.jump + .3));
      if (st > 0) {
        const pk = (t - h.gap) % .9 / .9;
        g.x.strokeStyle = `rgba(169,159,216,${.6 * (1 - pk) * st})`; g.x.lineWidth = 1; g.x.beginPath(); g.x.arc(k.m[0], k.m[1], 6 * S + 14 * S * pk, 0, TAU); g.x.stroke();
        if (HO) g.text(HO, k.m[0] + (hz ? 0 : 16 * S), k.m[1] + (hz ? -16 * S : fsM * .36), 400, fsM * .9, MAU, st, hz ? 'center' : 'left', true);
      }
      // travail refait : un paquet mauve repart vers l'outil précédent
      if (REWORK.includes(i)) {
        const r = seg(t, h.st1, h.rw1);
        if (r > 0 && r < 1) {
          const u = ioq(r), p = [lerp(k.g1[0], B[i][0], u), lerp(k.g1[1], B[i][1], u)];
          g.dot(p[0], p[1], 3.2 * S, MAU, 1);
          if (RW) g.text(RW, B[i][0], B[i][1] + (hz ? bh / 2 + 22 * S : -bh / 2 - 8 * S), 400, fsM * .9, MAU, Math.sin(Math.PI * r), hz ? 'center' : 'center', true);
        }
      }
    }
    // les outils : boîtes en verre séparées ; celle qui a reçu la décision s'éclaire
    ST.forEach((s, i) => {
      const got = i === 0 ? seg(t, .8, 1.1) : seg(t, H[i - 1].arr, H[i - 1].arr + .3);
      g.chip(s.lab, B[i][0], B[i][1], bw, bh, s.ic, ia * oq(seg(t, .1 + i * .08, .5 + i * .08)), WHITE, .15 + .55 * got, fsM);
    });
    // la décision : un point blanc qui avance, cale, saute la coupure
    let pos = null;
    H.forEach(h => {
      const k = link(h.i);
      if (t >= h.m0 && t < h.gap) pos = [lerp(k.a[0], k.g1[0], ioq(seg(t, h.m0, h.gap))), lerp(k.a[1], k.g1[1], ioq(seg(t, h.m0, h.gap)))];
      else if (t >= h.gap && t < h.jump) pos = k.g1;
      else if (t >= h.jump && t < h.arr) pos = [lerp(k.g2[0], k.b[0], ioq(seg(t, h.jump, h.arr))), lerp(k.g2[1], k.b[1], ioq(seg(t, h.jump, h.arr)))];
    });
    if (pos) g.dot(pos[0], pos[1], 3.6 * S, WHITE, 1);

    // ligne de temps : blanche quand la décision avance, mauve pendant les blocages
    const tb = seg(t, .8, END), bx = x => lerp(bar.x0, bar.x1, x);
    g.line(bar.x0, bar.y, bar.x1, bar.y, WHITE, .1 * ia, 2 * S);
    const span = END - .8, X = tt => (tt - .8) / span;
    let last = .8;
    H.forEach(h => {
      if (t > last) g.line(bx(X(last)), bar.y, bx(X(Math.min(t, h.gap))), bar.y, WHITE, .6, 2 * S);
      if (t > h.gap) g.line(bx(X(h.gap)), bar.y, bx(X(Math.min(t, h.jump))), bar.y, MAU, .95, 2 * S);
      last = h.jump;
    });
    if (t > last) g.line(bx(X(last)), bar.y, bx(X(Math.min(t, END))), bar.y, WHITE, .6, 2 * S);
    if (DL) g.text(DL, bar.x0, bar.y - 12 * S, 400, fsM * .9, GREY, ia, 'left', true);
    if (tb > 0 && tb < 1) g.dot(bx(tb), bar.y, 3 * S, WHITE, 1);
  }

  return bonvStage(mount, { aspect: W => W >= 760 ? (W >= 1000 ? .36 : .45) : 1.5, loop: LOOP, fade: FADE, still: END + .5, layout, draw });
}
