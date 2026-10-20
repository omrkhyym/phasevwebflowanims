/* PhaseV · hero /portfolio-optimizer · diagramme en tornade
   Montage via le socle hero-stage :
   - <div data-pv="portfolio-hero-bg"></div>, premier enfant du header : fond plein cadre au-dessus de 991 px ;
   - <div data-pv="portfolio-hero-slot"></div>, dernier enfant de la grille header_content : bloc 4:3 à 991 px et moins.
   Sensibilité de la probabilité de succès à chaque driver : les barres apparaissent
   dans le désordre, s'étendent, se trient par largeur, puis les deux drivers qui pèsent
   le plus passent en jaune. Nouveau tirage à chaque boucle. L'ensemble s'atténue côté texte en mode fond.
   Titre, texte et boutons restent dans Webflow. */

import { mountHeroStage, seg, ease, rng, rgba, TAU } from './hero-stage.js';

const MAU = [146, 138, 205], BLU = [120, 168, 224], TEA = [127, 232, 207], PALE = [199, 196, 226], YEL = [226, 199, 10];

/* Chronologie (secondes) et géométrie.
   L'axe est à 62 % de la largeur en mode fond (à droite du texte), centré en mode bloc. */
const ND = 9, AXIS = .62, AXIS_BLOCK = .5, T_GROW = .6, T_SORT = 3.4, T_YEL = 5.6, T_OUT = 10.4, LOOP = 12.6, STILL = 8.5;

export function initPortfolioHeroBg(root) {
  if (!root || root.dataset.pvInit) return;

  let batch = -1, DR = [];
  function build(seed) {
    const R = rng(seed); DR = [];
    for (let i = 0; i < ND; i++) { const w = .05 + R() * .28, sk = .3 + R() * .4; DR.push({ lo: w * sk, hi: w * (1 - sk), w, r0: i, del: R() * .8, c: [MAU, BLU, TEA][i % 3] }); }
    const order = [...DR.keys()].sort(() => R() - .5); DR.forEach((d, i) => d.r0 = order[i]);
    [...DR].sort((a, b) => b.w - a.w).forEach((d, k) => { d.r1 = k; d.pick = k < 2; });
  }

  function draw(stage, T) {
    const { ctx: x, W, H, mouse, reduce, flow } = stage;
    const n = reduce ? 0 : Math.floor(T / LOOP), t = reduce ? T : T % LOOP;
    if (n !== batch) { batch = n; build(71 + n * 5); }
    x.clearRect(0, 0, W, H);
    const mx = -mouse.x * 12, my = -mouse.y * 8;
    const pitch = Math.max(5, Math.min(W, H) * .0085), cx = W * (flow ? AXIS_BLOCK : AXIS) + mx;
    const rowY = r => H * (.17 + r * .083) + my, Xs = v => W * v;
    const out = 1 - ease(seg(t, T_OUT, T_OUT + 1.6)), yel = ease(seg(t, T_YEL, T_YEL + 1));
    const r = Math.max(1.3, pitch * .25);

    // axe central : l'estimation de référence
    for (let y = rowY(-.6); y < rowY(ND - .4); y += pitch) { x.fillStyle = rgba(PALE, .22 * out); x.fillRect(cx - .6, y, 1.2, 1.2); }

    for (const d of DR) {
      const g = ease(seg(t, T_GROW + d.del, T_GROW + d.del + 1.4)) * out;
      const k = ease(seg(t, T_SORT + d.r1 * .08, T_SORT + d.r1 * .08 + 1.2));
      const y = rowY(d.r0 + (d.r1 - d.r0) * k);
      // le jaune ne marque que les deux drivers qui pèsent le plus (moment de décision)
      const ay = d.pick ? yel : 0, dim = d.pick ? 1 : 1 - .35 * yel;
      const L = Xs(d.lo) * g, Rr = Xs(d.hi) * g;
      // deux rangées de points par barre pour lui donner de l'épaisseur
      for (let row = 0; row < 2; row++) {
        const yy = y + (row - .5) * pitch;
        for (let px = cx - L; px <= cx + Rr; px += pitch) {
          const f = stage.fade(px);
          if (ay < 1) { x.fillStyle = rgba(d.c, .4 * f * dim * (1 - ay) * out); x.beginPath(); x.arc(px, yy, r, 0, TAU); x.fill(); }
          if (ay > 0) { x.fillStyle = rgba(YEL, .85 * f * ay * out); x.beginPath(); x.arc(px, yy, r, 0, TAU); x.fill(); }
        }
      }
    }
  }

  return mountHeroStage(root, { name: 'portfolio', draw, still: STILL });
}
