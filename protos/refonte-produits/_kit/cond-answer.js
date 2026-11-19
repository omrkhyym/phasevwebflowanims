/* AI Conductor, « The PhaseV answer » (v2, autour du cercle) : les documents de l'étude, éparpillés, se renvoient le travail
   (allers-retours en pointillé) ; un modèle d'étude unique apparaît et les range sur un anneau, dans l'ordre du cycle.
   Un changement part du protocole : une onde mauve fait le tour de l'anneau et marque l'impact en aval.
   Un humain valide au centre : l'anneau se ferme en jaune et la mise à jour passe sur chaque document (turquoise).
   Style du film BonV (socle bonv-draw.js). Panneau sombre pleine largeur. Monté sur [data-pv="cond-answer"].
   Texte : enfants [data-role] du montage (docs : 6 <li data-icon="doc|app|db|trend|km|net"> dans l'ordre du cycle ;
   handoffs, hub, change, approve). */
import { bonvStage, readText, WHITE, GREY, YEL, MAU, BLU, TEA, TAU, cl, seg, oq, ioq, lerp } from './bonv-draw.js';

const T = { in: .2, hand: .6, handStep: .34, ring: 3.4, dock: 3.7, core: 3.9, change: 5.4, wave: 5.9, waveStep: .42, press: 8.7, close0: 8.85, close1: 10.2, fade: 12.4, loop: 13 };
const STILL = 11.2;
const SCAT = [[.2, .26], [.8, .2], [.64, .74], [.32, .8], [.9, .56], [.1, .58]];   // désordre de départ (fractions de W, H)
const HAND = [[0, 1], [1, 2], [2, 1], [1, 3], [3, 4], [4, 2], [2, 5], [5, 0]];     // allers-retours, dont des retours en arrière

export function initCondAnswer(mount) {
  const tx = readText(mount);
  const DOCS = [...mount.querySelectorAll('[data-role="docs"] li')].slice(0, 6).map(li => ({ lab: li.textContent.trim().toUpperCase(), ic: li.dataset.icon || 'doc' }));
  const HO = tx.one('handoffs').toUpperCase(), HUB = tx.one('hub').toUpperCase(), CHG = tx.one('change').toUpperCase(), OK = tx.one('approve');
  const n = DOCS.length || 1, ang = k => -Math.PI / 2 + k * TAU / n;
  let L = null;

  function layout(g) {
    const { W, H } = g, hz = W >= 760;
    const S = g.S = hz ? cl(W / 1200, .6, 1.15) : cl(W / 400, .75, 1.1);
    const C = [W / 2, H / 2], R = hz ? Math.min(H * .34, W * .2) : Math.min(W * .3, H * .3);
    L = { hz, C, R, Rc: R * .42, nr: (hz ? 20 : 16) * S, fsM: Math.max(8.5, (hz ? 10.5 : 9.5) * S), fsB: Math.max(12, 13 * S) };
  }

  // arc de l'anneau, de l'angle a0 à a1 (radians depuis le haut, sens horaire)
  function arc(g, a0, a1, col, a, w) {
    if (a <= 0 || a1 <= a0) return; const { C, R } = L;
    g.x.strokeStyle = col; g.x.globalAlpha = cl(a); g.x.lineWidth = w; g.x.lineCap = 'round';
    g.x.beginPath(); g.x.arc(C[0], C[1], R, -Math.PI / 2 + a0, -Math.PI / 2 + a1); g.x.stroke(); g.x.globalAlpha = 1;
  }

  function draw(g, t) {
    const { S, W, H } = g, { hz, C, R, Rc, nr, fsM, fsB } = L;
    const dock = k => ioq(seg(t, T.dock + k * .08, T.dock + 1 + k * .08));
    const pos = DOCS.map((d, k) => {
      const dk = dock(k), dr = 1 - dk, s = [SCAT[k][0] * W, SCAT[k][1] * H], f = [C[0] + Math.cos(ang(k)) * R, C[1] + Math.sin(ang(k)) * R];
      return [lerp(s[0], f[0], dk) + Math.sin(t * .9 + k) * 7 * S * dr, lerp(s[1], f[1], dk) + Math.cos(t * .7 + k * 2) * 6 * S * dr];
    });
    const waveAt = k => T.wave + k * T.waveStep, closeAt = k => lerp(T.close0, T.close1, k / n);

    // 1. avant : le travail passe de main en main, avec des retours en arrière
    const before = 1 - seg(t, T.ring, T.ring + .5);
    if (before > 0) {
      HAND.forEach(([a, b], i) => {
        const t0 = T.hand + i * T.handStep, k = ioq(seg(t, t0, t0 + .35)), fo = 1 - seg(t, t0 + .5, t0 + 1.1);
        if (k <= 0 || fo <= 0) return;
        const [p0, p1] = g.trim(pos[a], pos[b], nr + 6 * S, nr + 6 * S), back = b < a;
        g.flow(g.qpts(p0, p1, back ? .25 : -.12, k), back ? MAU : GREY, .55 * fo * before, t, k >= 1 ? fo : 0, i);
      });
      // les allers-retours s'accumulent, un trait par passage
      if (HO) {
        const a = before * seg(t, T.hand, T.hand + .4), x0 = hz ? 28 * S : 18 * S, y0 = hz ? 34 * S : 26 * S;
        g.text(HO, x0, y0, 400, fsM, GREY, a, 'left', true);
        HAND.forEach((h, i) => { const k = seg(t, T.hand + i * T.handStep + .3, T.hand + i * T.handStep + .45); g.line(x0 + i * 7 * S, y0 + 10 * S, x0 + i * 7 * S, y0 + 10 * S + 12 * S * k, h[1] < h[0] ? MAU : WHITE, .7 * a); });
      }
    }

    // 2. l'anneau du modèle d'étude : base, onde du changement, fermeture jaune à la validation
    const ra = oq(seg(t, T.ring, T.ring + 1.2));
    if (ra > 0) {
      arc(g, 0, TAU * ra, 'rgba(244,244,244,.16)', 1, 1);
      // onde mauve : une tête lumineuse et sa traîne, qui fait le tour une fois
      const wv = seg(t, T.wave, T.wave + n * T.waveStep);
      if (wv > 0 && wv < 1) { const h = TAU * wv; for (let s = 0; s < 14; s++) arc(g, Math.max(0, h - (s + 1) * .045), h - s * .045, MAU, (1 - s / 14) * .9, 2.5 * S); }
      // impact : arc bleu fin derrière l'onde, puis l'anneau se ferme en jaune après validation
      const imp = seg(t, T.wave, T.wave + n * T.waveStep) * (1 - seg(t, T.close0, T.close0 + .4));
      if (imp > 0) arc(g, 0, TAU * imp, BLU, .35, 1.2);
      const cz = ioq(seg(t, T.close0, T.close1));
      if (cz > 0) arc(g, 0, TAU * cz, YEL, 1 - .5 * seg(t, T.close1 + .4, T.close1 + 1.4), 2.5 * S);
    }

    // 3. le noyau : modèle d'étude, anneau de points mauves qui réfléchit quand le changement arrive, bouton de validation
    const ca = oq(seg(t, T.core, T.core + .6));
    if (ca > 0) {
      const th = Math.min(seg(t, T.change, T.change + .4), 1 - seg(t, T.wave + n * T.waveStep - .3, T.wave + n * T.waveStep + .2));
      const rr = Rc + 12 * S, nd = Math.round(TAU * rr / (9 * S)), head = t * 3.4;
      for (let i = 0; i < nd; i++) {
        const an = t * .2 + i / nd * TAU, d = ((an - head) % TAU + Math.PI * 3) % TAU - Math.PI, bump = Math.exp(-((d / .45) ** 2)) * th;
        g.dot(C[0] + Math.cos(an) * (rr + 3 * S * bump), C[1] + Math.sin(an) * (rr + 3 * S * bump), 1.3 * S * (1 + 1.1 * bump), MAU, ca * (.55 + .45 * bump));
      }
      g.glass(C[0] - Rc, C[1] - Rc, Rc * 2, Rc * 2, Rc, ca);
      g.icon('net', C[0], C[1] - Rc * .42, Math.min(Rc * .42, 34 * S), ca);
      g.text(HUB, C[0], C[1] + fsM * .2, 400, fsM, WHITE, ca, 'center', true);
      const va = ca * seg(t, T.wave + n * T.waveStep, T.wave + n * T.waveStep + .4), bh = 28 * S, bw = g.tw(OK, 500, fsB * .9) + 32 * S;
      g.button(OK, C[0] - bw / 2, C[1] + Rc * .3, bh, fsB * .9, Math.sin(Math.PI * seg(t, T.press, T.press + .25)), va * (1 - .6 * seg(t, T.close1, T.close1 + .6)));
    }

    // 4. le changement : étiquette au-dessus du protocole, paquet vers le noyau
    const chg = oq(seg(t, T.change, T.change + .4)) * (1 - seg(t, T.close0, T.close0 + .5));
    if (chg > 0 && pos[0]) {
      const p = pos[0], [a0, a1] = g.trim(p, C, nr + 6 * S, Rc + 18 * S), k = ioq(seg(t, T.change + .2, T.change + .7));
      g.flow(g.qpts(a0, a1, 0, k), MAU, .6 * chg, t, k >= 1 ? 1 - seg(t, T.wave, T.wave + .4) : 0, 9);
      if (CHG) {
        const w = g.tw(CHG, 400, fsM * .9, true) + 18 * S, h = 20 * S, x0 = p[0] + nr + 12 * S, y0 = p[1] - h / 2;
        g.x.save(); g.x.globalAlpha = chg; g.rr(x0, y0, w, h, h / 2); g.x.strokeStyle = MAU; g.x.lineWidth = 1; g.x.stroke(); g.x.restore();
        g.text(CHG, x0 + 9 * S, y0 + h / 2 + fsM * .32, 400, fsM * .9, MAU, chg, 'left', true);
      }
    }

    // 5. les documents : anneau fin, icône, étiquette à l'extérieur du cercle
    DOCS.forEach((d, k) => {
      const a = oq(seg(t, T.in + k * .1, T.in + .5 + k * .1)), p = pos[k], dk = dock(k);
      const hit = k === 0 ? oq(seg(t, T.change, T.change + .3)) : oq(seg(t, waveAt(k), waveAt(k) + .3));
      const done = oq(seg(t, closeAt(k), closeAt(k) + .3));
      const col = done > 0 ? TEA : k === 0 ? MAU : BLU;
      g.ring(p[0], p[1], nr, col, Math.max(hit, done), a);
      if (d.ic === 'db') g.db(p[0], p[1], nr * .62, .85 * a); else g.icon(d.ic, p[0], p[1], nr * 1.05, .85 * a);
      // étiquette : à l'extérieur une fois sur l'anneau (en mobile, dessous)
      const ox = Math.cos(ang(k)), oy = Math.sin(ang(k)), lw = hz && Math.abs(ox) > .3;
      const lx = lw ? p[0] + Math.sign(ox) * (nr + 12 * S) * dk + (1 - dk) * (nr + 12 * S) : p[0];
      const ly = lw ? p[1] + fsM * .36 : oy < -.5 && dk > .5 ? p[1] - nr - 12 * S : p[1] + nr + 18 * S;
      const al = lw ? (ox > 0 || dk < .5 ? 'left' : 'right') : 'center';
      g.text(d.lab, lx, ly, 400, fsM, done > 0 || hit > 0 ? WHITE : GREY, a, al, true);
    });
  }

  return bonvStage(mount, { aspect: W => W >= 760 ? (W >= 1000 ? .5 : .62) : 1.15, loop: T.loop, fade: T.fade, still: STILL, layout, draw });
}
