/* Chiffres en anneaux (généralisation de la scène de dose AI Conductor) : un anneau par chiffre, qui se remplit
   jusqu'à sa valeur pendant que le nombre compte, la légende dessous. Seuls les chiffres du texte sont dessinés.
   Style du film BonV (socle bonv-draw.js). Monté sur [data-pv="stat-rings"].
   Texte : enfants [data-role] du montage (stats : <li data-value="88">légende</li>, 2 ou 3 chiffres). */
import { bonvStage, WHITE, TAU, cl, seg, oq, ioq } from './bonv-draw.js';

const T = { in: .2, fill: .8, step: .45, dur: 2.2, cap: 1.6, fade: 11.4, loop: 12 };
const STILL = 8;

export function initStatRings(mount) {
  const ST = [...mount.querySelectorAll('[data-role="stats"] li')].slice(0, 3).map(li => ({ v: cl(parseFloat(li.dataset.value) || 0, 0, 100), cap: li.textContent.trim() }));
  const n = ST.length || 1;
  let L = null;

  function layout(g) {
    const { W, H } = g, S = g.S = cl(W / 480, .7, 1.25), colW = W / n;
    const r = Math.min(colW * .3, H * .24), cy = H * .36, fsB = Math.max(12, 12.5 * S);
    ST.forEach((s, i) => { s.cx = colW * (i + .5); s.lines = g.wrap(s.cap, 400, fsB, colW * .78); });
    L = { r, cy, fsB, fsN: Math.max(24, r * .5) };
  }

  function draw(g, t) {
    const { S, x } = g, { r, cy, fsB, fsN } = L;
    const ia = oq(seg(t, T.in, T.in + .5));
    ST.forEach((s, i) => {
      const t0 = T.fill + i * T.step, run = seg(t, t0, t0 + T.dur), f = ioq(run) * s.v / 100;
      // base pointillée, arc plein, point lumineux en tête pendant le remplissage
      x.save(); x.setLineDash([1, 5 * S]); x.lineCap = 'round'; x.strokeStyle = `rgba(140,134,176,${.7 * ia})`; x.lineWidth = 1.5;
      x.beginPath(); x.arc(s.cx, cy, r, 0, TAU); x.stroke(); x.restore();
      if (f > 0) { x.strokeStyle = `rgba(244,244,244,${.85 * ia})`; x.lineWidth = 2 * S; x.lineCap = 'round'; x.beginPath(); x.arc(s.cx, cy, r, -Math.PI / 2, -Math.PI / 2 + TAU * f); x.stroke(); }
      if (run > 0 && run < 1) { const an = -Math.PI / 2 + TAU * f; g.dot(s.cx + Math.cos(an) * r, cy + Math.sin(an) * r, 3.5 * S, WHITE, ia); }
      g.text(Math.round(f * 100) + '%', s.cx, cy + fsN * .35, 300, fsN, WHITE, ia, 'center');
      const ca = ia * seg(t, t0 + T.cap, t0 + T.cap + .5);
      s.lines.forEach((ln, k) => g.text(ln, s.cx, cy + r + 30 * S + k * fsB * 1.4, 400, fsB, WHITE, .75 * ca, 'center'));
    });
  }

  return bonvStage(mount, { aspect: W => W < 420 ? 1.1 : 11 / 16, loop: T.loop, fade: T.fade, still: STILL, layout, draw });
}
