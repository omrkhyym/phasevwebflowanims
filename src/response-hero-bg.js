/* PhaseV · hero /response-optimizer · nuage de patients
   Montage via le socle hero-stage :
   - <div data-pv="response-hero-bg"></div>, premier enfant du header : fond plein cadre au-dessus de 991 px ;
   - <div data-pv="response-hero-slot"></div>, dernier enfant de la grille header_content : bloc 4:3 à 991 px et moins.
   Un point = un patient. Les points se rangent par score pronostique, puis les traités
   s'écartent là où le traitement agit, et ceux qui en bénéficient passent en jaune.
   Le nuage s'atténue côté texte en mode fond. Titre, texte et boutons restent dans Webflow. */

import { mountHeroStage, seg, ease, smooth, rng, TAU } from './hero-stage.js';

/* Chronologie (secondes) */
const T_IN = 0, T_SORT = 1.6, T_SEP = 4.6, T_YEL = 6.0, T_BACK = 11, LOOP = 13.4;
const N = 1400;
const MAU = [146, 138, 205], BLU = [120, 168, 224], YEL = [226, 199, 10];

export function initResponseHeroBg(root) {
  if (!root || root.dataset.pvInit) return;
  const R = rng(5), gauss = () => Math.sqrt(-2 * Math.log(R() + 1e-9)) * Math.cos(TAU * R());

  /* u   : score pronostique de base (axe horizontal une fois ordonné)
     arm : 0 contrôle, 1 traité
     Le bénéfice du traitement n'existe que dans la partie haute du score. */
  const base = u => .14 + .48 * u, eff = u => .26 * smooth(.5, .88, u);
  const P = [];
  for (let i = 0; i < N; i++) {
    const u = R(), arm = i & 1, res = gauss() * .035;
    P.push({
      u, arm, ph: R() * TAU,
      // état 0 : la position sur l'axe est inconnue, tout le monde est mélangé
      x0: R(), y0: .48 + gauss() * .15,
      // état 1 : ordonnés par score pronostique, le bruit prévisible disparaît
      y1: base(u) + res,
      // état 2 : les traités s'écartent là où le traitement agit
      y2: base(u) + res + arm * eff(u),
      win: arm === 1 && eff(u) > .09
    });
  }

  function draw(stage, T) {
    const { ctx: x, W, H, mouse } = stage;
    const t = T % LOOP;
    x.clearRect(0, 0, W, H);
    const mx = -mouse.x * 12, my = -mouse.y * 8;
    const X = v => W * (.04 + .92 * v) + mx, Y = v => H * (.92 - .78 * v) + my;
    const back = ease(seg(t, T_BACK, T_BACK + 2));
    const yel = ease(seg(t, T_YEL, T_YEL + .9)) * (1 - back);
    const inA = ease(seg(t, T_IN, T_IN + 1.2));
    const r = Math.max(1.3, Math.min(W, H) * .0019);

    for (const p of P) {
      // le tri se propage de gauche à droite, le retour au mélange aussi
      const k1 = ease(seg(t, T_SORT + p.u * 1.4, T_SORT + p.u * 1.4 + 1.4)) * (1 - back);
      const k2 = ease(seg(t, T_SEP + p.u * .6, T_SEP + p.u * .6 + 1.1)) * (1 - back);
      const jit = (1 - k1) * .012 + .003;
      const xx = p.x0 + (p.u - p.x0) * k1 + jit * Math.sin(t * .9 + p.ph);
      const yy = p.y0 + (p.y1 - p.y0) * k1 + (p.y2 - p.y1) * k2 + jit * Math.cos(t * .8 + p.ph * 1.3);
      const px = X(xx), py = Y(yy), f = stage.fade(px);
      const c = p.arm ? BLU : MAU;
      const a = inA * f * (.34 + .12 * k1);
      x.fillStyle = `rgba(${c[0]},${c[1]},${c[2]},${a.toFixed(3)})`;
      x.beginPath(); x.arc(px, py, r, 0, TAU); x.fill();
      // le jaune ne marque que les traités qui bénéficient (moment de décision)
      if (p.win && yel > 0) {
        x.fillStyle = `rgba(${YEL[0]},${YEL[1]},${YEL[2]},${(yel * f * .9).toFixed(3)})`;
        x.beginPath(); x.arc(px, py, r * 1.15, 0, TAU); x.fill();
      }
    }
  }

  return mountHeroStage(root, { name: 'response', draw, still: 9 });
}
