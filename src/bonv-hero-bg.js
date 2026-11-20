/* PhaseV · hero /bonv · le V et son anneau de points, comme un chatbot
   Montage via le socle hero-stage :
   - <div data-pv="bonv-hero-bg"></div>, premier enfant du header : fond plein cadre au-dessus de 991 px ;
   - <div data-pv="bonv-hero-slot"></div>, dernier enfant de la grille header_content : bloc 4:3 à 991 px et moins.
   Boucle : BonV parle (les points de l'anneau pulsent comme une voix), puis réfléchit (une vague fait le tour de l'anneau).
   Logique de l'anneau reprise du kit bonv-style (bonv-mark.js). Rendu validé dans protos/bonv/phasev-bonv-hero-v-proto.html
   (2026-11-20), qui remplace la réponse en streaming (protos/bonv/phasev-bonv-hero-proto.html, récupérable dans git).
   Titre, texte et boutons restent dans Webflow. */

import { mountHeroStage, cl, smooth, TAU } from './hero-stage.js';

const YEL = '#E2C70A', WHITE = '#F4F4F4';
/* Polygone du V du logo, en rayons du disque */
const VPTS = [[0.2749, -0.4797], [-0.0004, 0.1548], [-0.2181, -0.3639], [-0.2710, -0.4797], [-0.5574, -0.4797], [-0.0170, 0.6489], [0.0186, 0.6489], [0.5574, -0.4797]];
/* Chronologie (s) : parle, puis réfléchit ; fondu de X s entre les deux. STILL : instant affiché en reduced motion (parle). */
const SPEAK = 3.6, THINK = 3.6, LOOP = SPEAK + THINK, X = .7, STILL = 1.8;

/* poids de « réfléchit » : monte autour de SPEAK, redescend sur la fin de boucle pour repartir de « parle » sans saut */
const thinking = k => cl(smooth(SPEAK - X / 2, SPEAK + X / 2, k) - smooth(LOOP - X, LOOP, k));

export function initBonvHeroBg(root) {
  if (!root || root.dataset.pvInit) return;

  function draw(stage, T) {
    const { ctx: c, W, H, flow, mouse } = stage;
    c.clearRect(0, 0, W, H);
    const th = thinking(T % LOOP), sp = 1 - th;

    // place : à droite du texte en mode fond, centré dans le bloc 4:3 en mode bloc
    const r = flow ? Math.min(W, H) * .17 : Math.min(W * .075, H * .12);
    const x = (flow ? W * .5 : W * .74) + mouse.x * 18, y = H * .5 + mouse.y * 18;
    const alpha = stage.fade(x);

    // anneau de points : rotation lente ; vague qui tourne (réfléchit) ; pulsation de voix (parle)
    const rr = r * 1.47, rot = T * .22;
    const n = Math.max(24, Math.round(TAU * rr / Math.max(9, r * .16))), dr = Math.max(1.1, r * .028);
    const head = T * 3.6, voice = .55 + .45 * Math.sin(T * 13) * Math.sin(T * 7.3 + 1);
    c.fillStyle = YEL;
    for (let i = 0; i < n; i++) {
      const a = rot + i / n * TAU;
      const d = ((a - head) % TAU + Math.PI * 3) % TAU - Math.PI;
      const bump = Math.exp(-((d / .42) ** 2)) * th;
      const amp = .5 + .5 * Math.sin(a * 3 + T * 9) * Math.sin(a * 5 - T * 7 + 1.3), vo = sp * voice * amp;
      const R = rr + r * (.06 * bump + .18 * vo), s = dr * (1 + 1.2 * bump + 1.3 * vo), light = .72 + .28 * Math.cos(a + Math.PI * .75);
      c.globalAlpha = Math.min(1, (.8 + .2 * bump + .2 * vo) * light) * alpha;
      c.beginPath(); c.arc(x + Math.cos(a) * R, y + Math.sin(a) * R, s, 0, TAU); c.fill();
    }

    // disque jaune et V blanc
    c.globalAlpha = alpha;
    c.beginPath(); c.arc(x, y, r, 0, TAU); c.fill();
    c.fillStyle = WHITE; c.beginPath();
    VPTS.forEach(([px, py], i) => { const vx = x + px * r, vy = y + py * r; i ? c.lineTo(vx, vy) : c.moveTo(vx, vy); });
    c.closePath(); c.fill();
    c.globalAlpha = 1;
  }

  return mountHeroStage(root, { name: 'bonv', draw, still: STILL });
}
