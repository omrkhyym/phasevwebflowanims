/* AI Conductor, Proof (dose selection) : probabilité de retenir la bonne dose, design standard contre design optimisé,
   à nombre de participants égal. Seuls les chiffres du texte sont dessinés (attributs data-a, data-b, data-n).
   Deux anneaux qui se remplissent, l'écart en jaune (comme l'écart du Proof ClinOps), puis les participants, identiques.
   Style du film BonV (socle bonv-draw.js). Monté sur [data-pv="cond-dose"].
   Texte : enfants [data-role] du montage (label-a, label-b, metric, unit, n-label). */
import { bonvStage, readText, WHITE, GREY, YEL, TEA, TAU, cl, seg, oq, ioq } from './bonv-draw.js';

const T = { in: .2, fa0: 1.0, fa1: 3.2, fb0: 1.4, fb1: 3.8, gap0: 4.2, gap1: 4.9, grid: 5.1, lab: 6.4, fade: 11.4, loop: 12 };
const STILL = 9;

export function initCondDose(mount) {
  const tx = readText(mount), num = (k, d) => { const v = parseFloat(mount.dataset[k]); return Number.isFinite(v) ? v : d; };
  const A = num('a', 0), B = num('b', 0), N = Math.round(num('n', 0));
  const LA = tx.one('label-a').toUpperCase(), LB = tx.one('label-b').toUpperCase(), MET = tx.one('metric').toUpperCase(), UNIT = tx.one('unit').toUpperCase(), NL = tx.one('n-label').toUpperCase();
  let L = null;

  function layout(g) {
    const { W, H } = g, S = g.S = cl(W / 480, .7, 1.25);
    const r = Math.min(W * .17, H * .2), cy = H * .3;
    L = { S, r, cy, ca: W * .27, cb: W * .73, fsM: Math.max(8, 9 * S), fsN: Math.max(22, r * .48), gy: H * .64 };
  }

  function arc(g, cx, cy, r, f0, f1, col, a, w) {
    if (a <= 0 || f1 <= f0) return;
    g.x.strokeStyle = col; g.x.globalAlpha = a; g.x.lineWidth = w; g.x.lineCap = 'round';
    g.x.beginPath(); g.x.arc(cx, cy, r, -Math.PI / 2 + TAU * f0, -Math.PI / 2 + TAU * f1); g.x.stroke(); g.x.globalAlpha = 1;
  }

  function draw(g, t) {
    const { S } = g, { r, cy, ca, cb, fsM, fsN, gy } = L;
    const ia = oq(seg(t, T.in, T.in + .5));
    const fa = ioq(seg(t, T.fa0, T.fa1)) * A / 100, fb = ioq(seg(t, T.fb0, T.fb1)) * B / 100;
    [[ca, fa, A, LA, GREY], [cb, fb, B, LB, TEA]].forEach(([cx, f, v, lab, col], i) => {
      // base pointillée, puis l'arc qui se remplit, avec un point lumineux en tête
      g.x.save(); g.x.setLineDash([1, 5 * S]); g.x.lineCap = 'round'; g.x.strokeStyle = `rgba(140,134,176,${.7 * ia})`; g.x.lineWidth = 1.5;
      g.x.beginPath(); g.x.arc(cx, cy, r, 0, TAU); g.x.stroke(); g.x.restore();
      const main = i === 1 ? Math.min(f, A / 100) : f;
      arc(g, cx, cy, r, 0, main, i ? TEA : 'rgba(244,244,244,.55)', ia, 2 * S);
      if (i === 1 && f > A / 100) arc(g, cx, cy, r, A / 100, f, YEL, ia, 2.5 * S);   // l'écart gagné
      const run = i ? seg(t, T.fb0, T.fb1) : seg(t, T.fa0, T.fa1);
      if (run > 0 && run < 1) { const an = -Math.PI / 2 + TAU * f; g.dot(cx + Math.cos(an) * r, cy + Math.sin(an) * r, 3.5 * S, WHITE, ia); }
      // la valeur, qui compte
      g.text(Math.round(f * 100) + '%', cx, cy + fsN * .35, 300, fsN, WHITE, ia * (i ? 1 : .7), 'center');
      g.text(lab, cx, cy + r + 24 * S, 400, fsM, i ? WHITE : GREY, ia, 'center', true);
    });
    g.text(MET, (ca + cb) / 2, cy + r + 44 * S, 400, fsM * .9, GREY, ia * .8, 'center', true);

    // l'écart, en jaune, entre les deux anneaux
    const ga = oq(seg(t, T.gap0, T.gap1));
    if (ga > 0) {
      const d = Math.round(B - A);
      // plus bas, là où les deux anneaux s'écartent le plus
      g.text((d >= 0 ? '+' : '') + d + (UNIT ? ' ' + UNIT : ''), (ca + cb) / 2, cy + r * .75 + fsM * .4, 500, fsM * 1.25, YEL, ga, 'center', true);
    }

    // les participants : le même nombre des deux côtés
    if (N > 0) {
      const cols = 10, rows = Math.ceil(N / cols), sp = Math.min(r * 1.6 / cols, 9 * S), dr = Math.max(1, sp * .22);
      [ca, cb].forEach(cx => {
        const x0 = cx - sp * (cols - 1) / 2;
        for (let k = 0; k < N; k++) {
          const a = ia * oq(seg(t, T.grid + k * .008, T.grid + .3 + k * .008));
          g.dot(x0 + (k % cols) * sp, gy + Math.floor(k / cols) * sp, dr, WHITE, .55 * a);
        }
      });
      g.text(NL, (ca + cb) / 2, gy + rows * sp + 18 * S, 400, fsM, WHITE, .8 * ia * seg(t, T.lab, T.lab + .4), 'center', true);
      g.text('=', (ca + cb) / 2, gy + rows * sp / 2 + fsM * .5, 300, fsM * 1.6, GREY, ia * seg(t, T.lab, T.lab + .4), 'center');
    }
  }

  return bonvStage(mount, { aspect: W => W < 420 ? 1 : .82, loop: T.loop, fade: T.fade, still: STILL, layout, draw });
}
