/* PhaseV · Careers · trois disciplines qui fusionnent, dans le style du film BonV (proto, 2026-11-17)
   Même récit que src/company-careers.js (supprimé le 2026-11-20) : trois populations séparées en triangle, qui fusionnent en une seule, puis se séparent.
   Vocabulaire BonV (socle bonv-draw.js), tout net : petits points pleins, anneaux fins avec arc de progression,
   pointillés qui défilent entre les groupes, anneau jaune qui se ferme à la fusion (seul jaune). Pas de flou, pas de halo.
   Montage : <div data-pv="careers-affine"></div> dans le panneau sombre de Build with us. Retourne destroy(). */
import { bonvStage, WHITE, YEL, CAP, TAU, seg, oq, ioq, lerp, rng, rgba } from './bonv-draw.js';

const COL = [CAP[1], CAP[5], CAP[0]];   // mauve, bleu, turquoise désaturés
const PER = 64, G = 3, N = PER * G;
const T = { flowIn: .6, flowOut: 3.4, merge: 3.0, dur: 2.6, close: 6.1, split: 9.6, loop: 14 };
const LW = TAU / T.loop, PK = T.loop / 5;   // PK : période des paquets de lumière (2,8 s, divise la boucle)
const ORB = .58, RG = .3, RB = .74;     // en unités U : distance des groupes au centre, rayon d'un groupe, rayon du cercle fusionné

/* positions de départ (dans chaque groupe) et d'arrivée (dans le cercle fusionné), appariées après tri par x
   (sinon la transition part en chaos) ; le mélange des places d'arrivée fait lire « fusion » */
const R = rng(7), DOTS = [];
const slots = Array.from({ length: N }, (_, j) => { const r = RB * .86 * Math.sqrt((j + .5) / N), a = j * 2.39996; return [Math.cos(a) * r, Math.sin(a) * r]; });
for (let i = N - 1; i > 0; i--) { const k = Math.floor(R() * (i + 1)); [slots[i], slots[k]] = [slots[k], slots[i]]; }
const CEN = [0, 1, 2].map(g => { const a = -Math.PI / 2 + g * TAU / G; return [Math.cos(a) * ORB, Math.sin(a) * ORB + .04]; });
for (let g = 0; g < G; g++) {
  const a = Array.from({ length: PER }, (_, j) => { const r = RG * .8 * Math.sqrt((j + .5) / PER), an = j * 2.39996; return [CEN[g][0] + Math.cos(an) * r, CEN[g][1] + Math.sin(an) * r]; })
    .sort((u, v) => u[0] - v[0] || u[1] - v[1]);
  const b = slots.slice(g * PER, (g + 1) * PER).sort((u, v) => u[0] - v[0] || u[1] - v[1]);
  for (let j = 0; j < PER; j++) DOTS.push({ g, a: a[j], b: b[j], d: R() * .5 + (a[j][0] + .9) * .18, ph: R() * TAU, s: .75 + R() * .5, al: R() < .25 ? .55 : .95 });
}

/* verre fin : pas de reflet rond ni de teinte, un voile blanc à peine visible qui s'efface vers le bas ;
   la lumière ne passe que par la tranche (filet qui s'allume sur un court arc en haut à gauche, touche de couleur en bas à droite),
   et un second filet très pâle juste à l'intérieur donne l'épaisseur du verre */
function glassDisc(g, cx, cy, r, a, col, ea) {
  if (r <= 0) return;
  const x = g.x, lf = x.createLinearGradient(cx, cy - r, cx, cy + r);
  lf.addColorStop(0, `rgba(255,255,255,${.05 * a})`); lf.addColorStop(.6, `rgba(255,255,255,${.015 * a})`); lf.addColorStop(1, `rgba(255,255,255,${.008 * a})`);
  x.fillStyle = lf; x.beginPath(); x.arc(cx, cy, r, 0, TAU); x.fill();
  glassEdge(g, cx, cy, r, col, ea);
}
function rimStyle(x, cx, cy, r, col, a) {
  if (!x.createConicGradient) {   // repli : dégradé linéaire doux
    const le = x.createLinearGradient(cx - r, cy - r, cx + r, cy + r);
    le.addColorStop(0, rgba(WHITE, .4 * a)); le.addColorStop(.4, rgba(WHITE, .05 * a)); le.addColorStop(1, rgba(col, .35 * a));
    return le;
  }
  const c = x.createConicGradient(-3 * Math.PI / 4, cx, cy);   // 0 = haut à gauche, puis sens horaire
  c.addColorStop(0, rgba(WHITE, .55 * a)); c.addColorStop(.1, rgba(WHITE, .12 * a)); c.addColorStop(.3, rgba(WHITE, .04 * a));
  c.addColorStop(.5, rgba(col, .35 * a)); c.addColorStop(.7, rgba(WHITE, .04 * a)); c.addColorStop(.9, rgba(WHITE, .12 * a));
  c.addColorStop(1, rgba(WHITE, .55 * a));
  return c;
}
function glassEdge(g, cx, cy, r, col, a) {
  if (a <= 0 || r <= 0) return;
  const x = g.x;
  x.strokeStyle = rimStyle(x, cx, cy, r, col, a); x.lineWidth = .75; x.beginPath(); x.arc(cx, cy, r, 0, TAU); x.stroke();
  if (r > 3) { x.strokeStyle = rgba(WHITE, .06 * a); x.lineWidth = .5; x.beginPath(); x.arc(cx, cy, r - 1.5, 0, TAU); x.stroke(); }
}

function draw(g, t) {
  const { W, H, S } = g, cx = W / 2, cy = H / 2, U = Math.min(W, H) / 2 * .9;
  const P = (q) => [cx + q[0] * U, cy + q[1] * U];
  const mixAt = d => ioq(seg(t, T.merge + d, T.merge + d + T.dur)) - ioq(seg(t, T.split + d, T.split + d + T.dur));
  const km = mixAt(.25);   // anneaux : ils glissent vers le centre et s'élargissent jusqu'au cercle fusionné

  /* liaison : le cercle qui passe par les trois groupes, en arcs de pointillés qui défilent, coupés au bord des anneaux ;
     présent tant que les groupes sont séparés (continu d'une boucle à l'autre), il se resserre avec eux à la fusion et s'efface */
  const fa = 1 - km, oc = P([0, .04 * (1 - km)]), rc = ORB * (1 - km) * U;
  if (fa > 0 && rc > RG * U) {
    const gap = (lerp(RG, RB, km) * U + 6 * S) / rc;   // demi-angle masqué par chaque anneau
    /* paquet de lumière : avance en continu le long de l'arc (pas de saut de point en point), même rythme sur les trois arcs ;
       la période divise la boucle, donc pas de saut au bouclage */
    const u = (t % PK) / PK;
    for (let i = 0; i < G; i++) {
      const a0 = -Math.PI / 2 + i * TAU / G + gap, a1 = -Math.PI / 2 + (i + 1) * TAU / G - gap;
      if (a1 <= a0) continue;
      const pts = Array.from({ length: 41 }, (_, j) => { const a = lerp(a0, a1, j / 40); return [oc[0] + Math.cos(a) * rc, oc[1] + Math.sin(a) * rc]; });
      g.flow(pts, WHITE, .45 * fa, t, 0, i);   // pointillés seuls
      for (let s = 0; s < 6; s++) {
        const us = u - s * .018; if (us <= 0 || us >= 1) continue;
        const e = .5 - .5 * Math.cos(Math.PI * us), a = lerp(a0, a1, e);
        const env = Math.sin(Math.PI * us) ** .6;   // apparaît et s'éteint en douceur aux bouts de l'arc
        g.dot(oc[0] + Math.cos(a) * rc, oc[1] + Math.sin(a) * rc, (2.6 - s * .35) * S, WHITE, fa * env * (1 - s / 6) * (s ? .7 : 1));
      }
    }
  }

  /* groupes : disques en verre, bord de la couleur du groupe ; à la fusion, ils se superposent en un seul disque au bord blanc
     (chaque verre s'atténue pour que la superposition des trois ne fonce pas) */
  for (let i = 0; i < G; i++) {
    const c = P([CEN[i][0] * (1 - km), CEN[i][1] * (1 - km)]), r = lerp(RG, RB, km) * U;
    glassDisc(g, c[0], c[1], r, lerp(1, .42, km), COL[i], 1 - km);
  }
  if (km > 0) glassEdge(g, cx, cy, lerp(RG, RB, km) * U, WHITE, km);
  /* fusion tenue : un anneau en pointillés jaunes qui défilent se ferme autour du groupe uni, un peu à l'extérieur du disque.
     Jaune : le moment où l'on rejoint PhaseV, seul jaune de la section */
  const ck = oq(seg(t, T.close, T.close + 1.3)) * (1 - seg(t, T.split - .3, T.split + .5));
  if (ck > 0) {
    g.x.save();
    g.x.setLineDash([1, 7 * S]); g.x.lineDashOffset = -t * 14 * S;
    g.x.strokeStyle = rgba(YEL, .8 * ck); g.x.lineWidth = 2 * S; g.x.lineCap = 'round';
    g.x.beginPath(); g.x.arc(cx, cy, RB * U + 12 * S, -Math.PI / 2, -Math.PI / 2 + TAU * oq(seg(t, T.close, T.close + 1.3))); g.x.stroke();
    g.x.restore();
  }

  /* points : nets, pleins ; trajet légèrement courbe, nul aux extrémités ; le groupe uni tourne très lentement */
  const rot = t * .04, cr = Math.cos(rot), sr = Math.sin(rot), rd = 2 * S;
  for (const p of DOTS) {
    const m = mixAt(p.d), bx = p.b[0] * cr - p.b[1] * sr, by = p.b[0] * sr + p.b[1] * cr;
    let x = lerp(p.a[0], bx, m), y = lerp(p.a[1], by, m);
    const sw = Math.sin(Math.PI * m) * .1;
    x += -(by - p.a[1]) * sw; y += (bx - p.a[0]) * sw;
    x += .006 * Math.sin(LW * 2 * t + p.ph); y += .006 * Math.cos(LW * 2 * t + p.ph * 1.3);   // dérive périodique sur la boucle : pas de saut
    const q = P([x, y]);
    g.dot(q[0], q[1], rd * p.s, COL[p.g], p.al);
  }
}

export function initCareersAffine(mount) {
  const small = matchMedia('(max-width: 991px)');
  return bonvStage(mount, {
    aspect: () => small.matches ? .75 : 1,
    loop: T.loop, fade: Infinity, still: T.close + 2,
    layout(g) { g.S = Math.max(.75, Math.min(1.25, Math.min(g.W, g.W * (small.matches ? .75 : 1)) / 520)); },
    draw,
  });
}
