/* BonV, étape 01 Ask : la question en langage courant, BonV demande un document, l'utilisateur le dépose,
   BonV en extrait les informations clés puis propose les étapes suivantes, qu'un humain confirme.
   D'après la scène Understands du film (chat en verre qui défile, V qui réfléchit). Monté sur [data-pv="bonv-ask"].
   Texte : enfants [data-role] du montage (user, question, keys, bonv-ask, file, extract-title, extract, steps-title, steps, confirm). */
import { bonvStage, readText, WHITE, GREY, MAU, BLU, TEA, cl, seg, oq } from './bonv-draw.js';

const T = { type0: .5, type1: 2.2, keys: 2.3, b1: 2.9, b1txt: 3.7, file: 4.6, up0: 4.9, up1: 5.9, b2: 6.4, b2txt: 7.0, b3: 8.4, b3txt: 9.0, press: 10.3, ok0: 10.45, ok1: 11.1, fade: 12.4, loop: 13 };
const STILL = 11.6;

export function initBonvAsk(mount) {
  const tx = readText(mount);
  const USER = tx.one('user'), Q = tx.one('question'), KEYS = tx.list('keys'), B1 = tx.one('bonv-ask'), FILE = tx.one('file');
  const XT = tx.one('extract-title').toUpperCase(), XR = tx.list('extract').map(s => s.toUpperCase());
  const ST = tx.one('steps-title').toUpperCase(), SR = tx.list('steps'), OK = tx.one('confirm');
  let L = null;

  function layout(g) {
    const { W } = g, S = g.S = cl(W / 480, .7, 1.25);
    const pad = 20 * S, ar = 10 * S, vr = 8 * S, ax = pad + 12 * S, bx = pad + 34 * S, bwMax = W - bx - pad, bp = 13 * S;
    const fsB = Math.max(12, 13.5 * S), lh = fsB * 1.42, fsM = Math.max(8.5, 9.5 * S);
    const txt = (s) => { const lines = g.wrap(s, 400, fsB, bwMax - bp * 2); const w = Math.max(...lines.map(l => g.tw(l, 400, fsB))) + bp * 2; return { lines, w, h: lines.length * lh + bp * 2 - (lh - fsB) }; };
    const q = txt(Q), b1 = txt(B1);
    const items = [
      { who: 'u', t0: .2, w: q.w, h: q.h, lines: q.lines, kind: 'q' },
      { who: 'b', t0: T.b1, w: b1.w, h: b1.h, lines: b1.lines, kind: 'b1' },
      { who: 'u', t0: T.file, w: Math.min(bwMax, 250 * S), h: 46 * S, kind: 'file' },
      { who: 'b', t0: T.b2, w: Math.min(bwMax, 290 * S), h: bp * 2 + fsM + 10 * S + XR.length * 22 * S, kind: 'x' },
      { who: 'b', t0: T.b3, w: Math.min(bwMax, 300 * S), h: bp * 2 + fsM + 8 * S + SR.length * 26 * S + 14 * S + 30 * S, kind: 's' },
    ];
    L = { pad, ar, vr, ax, bx, bp, fsB, lh, fsM, items, gap: 12 * S };
  }

  function draw(g, t) {
    const { S, H } = g, { pad, ar, vr, ax, bx, bp, fsB, lh, fsM, items, gap } = L;
    // le fil défile vers le haut à chaque nouveau message ; ce qui sort en haut s'efface
    let y = H - pad;
    const pos = [];
    for (let i = items.length - 1; i >= 0; i--) {
      const it = items[i], p = oq(seg(t, it.t0, it.t0 + .45));
      if (p <= 0) continue;
      y -= (it.h + gap) * p;
      pos[i] = { y: y + gap * p + 10 * S * (1 - p), a: p * cl((y - 4 * S) / (30 * S) + .4) };
    }
    items.forEach((it, i) => {
      const P = pos[i]; if (!P || P.a <= 0) return;
      const yy = P.y, a = P.a;
      // avatar
      if (it.who === 'u') g.avatar(ax, yy + ar, ar, MAU, USER, a);
      else {
        const think = it.kind === 'b1' ? seg(t, T.b1, T.b1 + .2) * (1 - seg(t, T.b1txt - .1, T.b1txt + .2))
          : it.kind === 'x' ? seg(t, T.b2, T.b2 + .2) * (1 - seg(t, T.b2txt - .1, T.b2txt + .2))
          : seg(t, T.b3, T.b3 + .2) * (1 - seg(t, T.b3txt - .1, T.b3txt + .2));
        const speak = it.kind === 's' ? seg(t, T.ok0, T.ok0 + .2) * (1 - seg(t, T.ok1 + .4, T.ok1 + 1)) : 0;
        g.vMark(ax, yy + ar, vr, t, think, speak, a);
      }
      g.glass(bx, yy, it.w, it.h, 14 * S, a, 5 * S);

      if (it.kind === 'q') {
        // la question s'écrit, puis ses mots clés se soulignent
        let left = Math.round(Q.length * seg(t, T.type0, T.type1)), cx = bx + bp, cy = yy + bp + fsB;
        it.lines.forEach((ln, k) => {
          const s = ln.slice(0, Math.max(0, left)); left -= ln.length + 1;
          const by = yy + bp + fsB * .92 + k * lh;
          g.text(s, bx + bp, by, 400, fsB, WHITE, a);
          if (s.length) { cx = bx + bp + g.tw(s, 400, fsB); cy = by; }
          KEYS.forEach((key, ki) => {
            const at = ln.indexOf(key); if (at < 0) return;
            const uk = oq(seg(t, T.keys + ki * .25, T.keys + .45 + ki * .25)); if (uk <= 0) return;
            const x0 = bx + bp + g.tw(ln.slice(0, at), 400, fsB), kw = g.tw(key, 400, fsB);
            g.line(x0, by + 4 * S, x0 + kw * uk, by + 4 * S, MAU, a, 1.5);
          });
        });
        if (t < T.type1 + .5 && Math.sin(t * 10) > 0) { g.x.fillStyle = `rgba(244,244,244,${.8 * a})`; g.x.fillRect(cx + 2, cy - fsB * .85, 1.5, fsB); }
      }

      if (it.kind === 'b1') {
        if (t < T.b1txt) g.typing(bx + bp + 2 * S, yy + it.h / 2, a, t);
        const ta = a * seg(t, T.b1txt, T.b1txt + .3);
        it.lines.forEach((ln, k) => g.text(ln, bx + bp, yy + bp + fsB * .92 + k * lh, 400, fsB, WHITE, ta));
      }

      if (it.kind === 'file') {
        // le document déposé : icône, nom, barre de chargement
        const cy = yy + it.h / 2, up = oq(seg(t, T.up0, T.up1));
        g.icon('doc', bx + bp + 9 * S, cy, 22 * S, a);
        g.text(FILE, bx + bp + 26 * S, cy - 2 * S, 400, fsB * .95, WHITE, a);
        const x0 = bx + bp + 26 * S, x1 = bx + it.w - bp, by = cy + 9 * S;
        g.line(x0, by, x1, by, WHITE, .12 * a, 2 * S);
        g.line(x0, by, x0 + (x1 - x0) * up, by, up >= 1 ? TEA : WHITE, .85 * a, 2 * S);
      }

      if (it.kind === 'x') {
        // informations extraites : une ligne par champ, la valeur se remplit
        if (t < T.b2txt) g.typing(bx + bp + 2 * S, yy + bp + fsM * .5, a, t);
        const ha = a * seg(t, T.b2txt, T.b2txt + .3);
        g.text(XT, bx + bp, yy + bp + fsM, 400, fsM, GREY, ha, 'left', true);
        XR.forEach((lab, k) => {
          const ry = yy + bp + fsM + 10 * S + k * 22 * S, ra = a * seg(t, T.b2txt + .2 + k * .35, T.b2txt + .5 + k * .35);
          if (k) g.line(bx + bp, ry, bx + it.w - bp, ry, WHITE, .08 * ra);
          g.text(lab, bx + bp, ry + 15 * S, 400, fsM, WHITE, .85 * ra, 'left', true);
          const v0 = bx + it.w * .46, v1 = bx + it.w - bp - (k % 2 ? 30 : 10) * S, fk = oq(seg(t, T.b2txt + .4 + k * .35, T.b2txt + 1 + k * .35));
          g.line(v0, ry + 11 * S, v0 + (v1 - v0) * fk, ry + 11 * S, BLU, .55 * ra, 5 * S);
        });
      }

      if (it.kind === 's') {
        // étapes proposées : la première retenue ; un humain confirme
        if (t < T.b3txt) g.typing(bx + bp + 2 * S, yy + bp + fsM * .5, a, t);
        const ha = a * seg(t, T.b3txt, T.b3txt + .3);
        g.text(ST, bx + bp, yy + bp + fsM, 400, fsM, GREY, ha, 'left', true);
        SR.forEach((s, k) => {
          const ry = yy + bp + fsM + 8 * S + k * 26 * S, ra = a * seg(t, T.b3txt + .15 + k * .2, T.b3txt + .45 + k * .2);
          if (k) g.line(bx + bp, ry, bx + it.w - bp, ry, WHITE, .08 * ra);
          g.ring(bx + bp + 7 * S, ry + 13 * S, 6 * S, k === 0 ? WHITE : GREY, k === 0 ? 1 : .35, ra);
          g.text(s, bx + bp + 22 * S, ry + 13 * S + fsB * .34, 400, fsB * .95, k === 0 ? WHITE : GREY, ra);
        });
        const by = yy + it.h - bp - 30 * S, pr = Math.sin(Math.PI * seg(t, T.press, T.press + .25));
        const ba = a * seg(t, T.b3txt + .8, T.b3txt + 1.1);
        const bw = g.button(OK, bx + bp, by, 30 * S, fsB * .9, pr, ba);
        g.approve(bx + bp + bw + 20 * S, by + 15 * S, 10 * S, seg(t, T.ok0, T.ok1), ba);
      }
    });
  }

  return bonvStage(mount, { aspect: W => W < 420 ? 1.2 : 11 / 16, loop: T.loop, fade: T.fade, still: STILL, layout, draw });
}
