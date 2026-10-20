/* PhaseV · hero /ai-conductor · chaîne documentaire
   Montage via le socle hero-stage :
   - <div data-pv="conductor-hero-bg"></div>, premier enfant du header : fond plein cadre au-dessus de 991 px ;
   - <div data-pv="conductor-hero-slot"></div>, dernier enfant de la grille header_content : bloc 4:3 à 991 px et moins.
   Six pages (protocole, SAP, specs, code, TLF, CSR) : une ligne du protocole est réécrite en jaune,
   puis une impulsion descend la chaîne et réécrit la ligne liée de chaque document en turquoise.
   Titre, texte et boutons restent dans Webflow. */

import { mountHeroStage, cl, seg, ease, rng, rgba, TAU } from './hero-stage.js';

const MAU = [146, 138, 205], TEA = [127, 232, 207], PALE = [199, 196, 226], YEL = [226, 199, 10];

/* Mode fond : cascade de 6 pages à droite du texte.
   Mode bloc : pages en ligne, à taille lisible, la vue glisse vers la droite en suivant l'impulsion jusqu'au CSR. */
const NP = 6, T_IN = 1.2, STILL = 4.2;
const ROWS = [{ y: 0, head: 1 }, { y: 2 }, { y: 3 }, { y: 4 }, { y: 5.6 }, { y: 6.6 }, { y: 7.6 }, { y: 9.2 }, { y: 10.2 }, { y: 11.2 }], UNITS = 12.2;

export function initConductorHeroBg(root) {
  if (!root || root.dataset.pvInit) return;

  const R = rng(83);
  const PAGES = [...Array(NP)].map(() => ROWS.map((rw, l) => ({
    ...rw,
    len: rw.head ? .42 + R() * .2 : (l % 3 === 0 ? .3 + R() * .3 : .82 + R() * .18),
    alt: .4 + R() * .55
  })));

  let flow = false, pw = 0, ph = 0, step = 0, dy = 0, X0 = 0, Y0 = 0, CYCLE = 6.5, GAP = .42;
  function layout({ W, H, flow: f }) {
    flow = f;
    if (flow) {
      CYCLE = 8; GAP = .7;                      // plus lent : la vue se déplace avec l'impulsion
      pw = Math.min(W * .36, H * .72 / 1.32); ph = pw * 1.32; step = pw * 1.14; dy = 0;
      X0 = (W - pw) / 2; Y0 = (H - ph) / 2;
    } else {
      CYCLE = 6.5; GAP = .42;
      pw = Math.min(W * .5 / 4.9, H * .3); step = pw * .78; ph = pw * 1.32;
      dy = Math.min(ph * .46, (H * .8 - ph) / (NP - 1));
      X0 = W * .965 - (pw + step * (NP - 1)); Y0 = (H - (ph + dy * (NP - 1))) / 2;
    }
  }
  const rowY = (py0, ln) => py0 + ph * .13 + ln.y * (ph * .74 / UNITS);

  function draw(stage, T) {
    const { ctx: x, W, H, mouse, reduce } = stage;
    layout(stage);
    const t = reduce ? T + T_IN + 2 : T;
    x.clearRect(0, 0, W, H);
    const mx = -mouse.x * 12, my = -mouse.y * 8;
    const hp = pw / 30, r = Math.max(1.1, hp * .32);
    const cyc = reduce ? 0 : Math.floor(Math.max(0, t - T_IN) / CYCLE), ct = reduce ? STILL : Math.max(0, t - T_IN) % CYCLE;
    const rr = rng(500 + cyc);
    const lightAt = k => .5 + k * GAP, off = reduce ? 1 : 1 - ease(seg(ct, CYCLE - 1.4, CYCLE - .5));
    // la ligne liée : n'importe où en mode bloc (pas de chevauchement), sinon hors de la zone masquée
    const link = PAGES.map((pg, k) => {
      const ok = pg.map((_, l) => l).filter(l => !pg[l].head && (flow || k === NP - 1 || rowY(0, pg[l]) < dy * .9));
      return ok.length ? ok[Math.floor(rr() * ok.length)] : 1;
    });

    // vue : suit la page en cours de mise à jour, puis revient au protocole pendant le fondu
    let cam = 0;
    if (flow && !reduce) {
      const fi = cl((ct - lightAt(0)) / GAP / (NP - 1)) * (NP - 1);
      const back = ease(seg(ct, CYCLE - 1.2, CYCLE - .1));
      cam = ease(fi / (NP - 1)) * (NP - 1) * step * (1 - back);
    }
    const PX = k => X0 + k * step - cam + mx, PY = k => Y0 + k * dy + my;
    const alphaAt = (px0, app) => flow ? app * cl(Math.min((px0 + pw) / (W * .18), (W - px0) / (W * .18))) : stage.fade(px0 + pw * .5) * app;

    const dotLine = (xa, xb, y, c, w) => { if (xb <= xa) return; x.strokeStyle = c; x.lineWidth = w; x.beginPath(); x.moveTo(xa, y); x.lineTo(xb, y); x.stroke(); };
    x.lineCap = 'round';
    const pulses = [];

    for (let k = 0; k < NP; k++) {
      const px0 = PX(k), py0 = PY(k);
      if (px0 > W + 4 || px0 + pw < -4) continue;
      const app = ease(seg(t, k * .15, k * .15 + .9)); if (app <= 0) continue;
      const f = alphaAt(px0, app); if (f <= .003) continue;
      const lt = lightAt(k), on = reduce ? 1 : ease(seg(ct, lt, lt + .45));
      const flash = reduce ? 0 : Math.max(0, 1 - Math.abs(ct - lt - .25) / .55) * off;
      // le jaune ne marque que le protocole, d'où part la décision
      const hc = k === 0 ? YEL : TEA, fold = pw * .16;
      x.globalAlpha = f;
      x.setLineDash([]); x.fillStyle = 'rgba(24,20,64,.94)';
      x.beginPath(); x.moveTo(px0, py0); x.lineTo(px0 + pw - fold, py0); x.lineTo(px0 + pw, py0 + fold); x.lineTo(px0 + pw, py0 + ph); x.lineTo(px0, py0 + ph); x.closePath(); x.fill();
      x.setLineDash([.001, hp * 1.3]); x.lineWidth = r * 1.6;
      x.strokeStyle = flash > 0 ? rgba(hc, .3 + .55 * flash) : rgba(PALE, .3); x.stroke();
      x.beginPath(); x.moveTo(px0 + pw - fold, py0); x.lineTo(px0 + pw - fold, py0 + fold); x.lineTo(px0 + pw, py0 + fold); x.stroke();
      x.setLineDash([.001, hp]);
      PAGES[k].forEach((ln, l) => {
        const isL = l === link[k], len = ln.len + (ln.alt - ln.len) * (isL ? on : 0);
        const xa = px0 + pw * .12, xb = xa + pw * .74 * len, y = rowY(py0, ln);
        for (let q = 0; q < (ln.head ? 2 : 1); q++) {
          const yy = y + q * hp;
          dotLine(xa, xb, yy, rgba(ln.head ? PALE : MAU, (ln.head ? .55 : .5) * (isL ? 1 - on * off * .8 : 1)), r * 2);
          if (isL && on * off > 0) dotLine(xa, xa + (xb - xa) * on, yy, rgba(hc, .95 * off), r * 2.3);
        }
        if (isL && k < NP - 1) pulses.push({ k, xa: xb, ya: y });
      });
    }
    x.globalAlpha = 1; x.setLineDash([]);

    if (!reduce) for (const p of pulses) {
      const k = p.k, nx = PX(k + 1) + pw * .12, ny = rowY(PY(k + 1), PAGES[k + 1][link[k + 1]]);
      const a = seg(ct, lightAt(k) + .3, lightAt(k + 1)); if (a <= 0 || a >= 1) continue;
      const lift = flow ? ph * .12 : dy * .3;
      for (let j = 0; j < 4; j++) {
        const e = ease(cl(a - j * .06)), px = p.xa + (nx - p.xa) * e, py = p.ya + (ny - p.ya) * e - Math.sin(Math.PI * e) * lift;
        x.globalAlpha = alphaAt(px - pw * .5, 1) * Math.sin(Math.PI * a) * (1 - j * .25);
        x.fillStyle = rgba(k === 0 && a < .5 ? YEL : TEA, .95); x.beginPath(); x.arc(px, py, r * (1.9 - j * .35), 0, TAU); x.fill();
      }
    }
    x.globalAlpha = 1;
  }

  return mountHeroStage(root, { name: 'conductor', draw, still: STILL });
}
