/* Success story Trial Optimizer : l'espace des designs (proto 1, protos/phasev-success-story-protos.html).
   Monté dans <div data-pv="success-design-space"></div>, colonne droite du bloc.
   Label, chiffre, paragraphe et boutons restent dans Webflow. */

const INK = '#141238', YEL = '#E2C70A', MAU = '#928ACD', MUT = '#7d7b9c', GRID = '#d3d0e8';
const DUR = 5.7;      // fin de la chronologie, en secondes
const SMALL = 600;    // sous cette largeur de canvas : étiquettes en 9 px, 1000 points

const cl = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const seg = (t, a, b) => cl((t - a) / (b - a));
const ease = v => v < .5 ? 4 * v * v * v : 1 - Math.pow(-2 * v + 2, 3) / 2;
const easeOut = v => 1 - Math.pow(1 - v, 3);
const back = v => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(v - 1, 3) + c1 * Math.pow(v - 1, 2); };
function rng(s) { return () => { s |= 0; s = s + 0x6D2B79F5 | 0; let t = Math.imul(s ^ s >>> 15, 1 | s); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }

/* Données figées du proto. La frontière passe par le design retenu (574, ~90.5 %) :
   aucun design plus petit n'atteint 90 %, c'est ce qui le rend optimal.
   En petit format on dessine les 1000 premiers points du même tirage. */
const DESIGNS = (() => {
  const R = rng(7), g = () => Math.sqrt(-2 * Math.log(R() + 1e-9)) * Math.cos(6.2832 * R());
  const f = n => .955 - .05 * Math.exp(-(n - 574) / 60), P = [];
  for (let i = 0; i < 1600; i++) {
    const n = 500 + R() * 240;
    let p = f(n) - Math.abs(g()) * .028 - Math.pow(R(), 2.2) * .12;
    if (n < 580 && p >= .899) p = .897 - R() * .012;
    P.push({ n, p: Math.max(.725, p), d: R() });
  }
  return P;
})();

/* Couleur de fond réelle derrière le bloc : la section, ou le premier parent opaque */
function sectionBg(el) {
  for (let n = el.closest('section') || el.parentElement; n; n = n.parentElement) {
    const c = getComputedStyle(n).backgroundColor;
    const m = c.match(/rgba?\(([^)]+)\)/);
    if (m && (m[1].split(',')[3] === undefined || parseFloat(m[1].split(',')[3]) > 0)) return c;
  }
  return '#ECEAF6';
}

export function initSuccessDesignSpace(mount) {
  if (mount.dataset.pvReady) return;
  mount.dataset.pvReady = '1';

  /* Ratio 1.15/1 et 320 px minimum. La hauteur est calculée à partir de la largeur :
     aspect-ratio + min-height imposerait 368 px de large et déborderait à 375 px. */
  mount.style.cssText += 'position:relative;width:100%;min-width:0;';
  const cv = document.createElement('canvas');
  cv.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block;';
  cv.setAttribute('role', 'img');
  cv.setAttribute('aria-label', 'Operating characteristics of simulated candidate designs: the adaptive design reaches 90.3% power with 574 participants, 55 fewer than the fixed design at 629, with type I error held at 2.5%.');
  mount.appendChild(cv);
  const x = cv.getContext('2d');

  /* Typo : celle de l'étiquette du bloc, comme gantt.js.
     L'espacement est converti en ratio de la taille, puis réappliqué à nos petites tailles. */
  const section = mount.closest('section') || document.body;
  const label = section.querySelector('.text-size-label');
  const cs = label ? getComputedStyle(label) : null;
  const FAMILY = cs ? cs.fontFamily : 'Aspekta, Arial, sans-serif';
  const lsRatio = cs && cs.letterSpacing !== 'normal'
    ? (parseFloat(cs.letterSpacing) || 0) / (parseFloat(cs.fontSize) || 16) : 0;
  const hasLS = 'letterSpacing' in x;
  const BG = sectionBg(mount);

  function setFont(w, size) {
    x.font = `${w} ${size}px ${FAMILY}`;
    if (hasLS) x.letterSpacing = (lsRatio * size).toFixed(2) + 'px';
  }
  /* Texte, avec une pastille de la couleur de section pour rester lisible sur le nuage.
     Gardé dans le canvas si la largeur manque (petits écrans). */
  function tag(s, px, py, w, size, c, al = 'left', a = 1, bg = true) {
    if (a <= 0) return;
    setFont(w, size);
    const tw = x.measureText(s).width;
    let x0 = al === 'left' ? px : al === 'right' ? px - tw : px - tw / 2;
    x0 = cl(x0, 2, W - tw - 2);
    if (bg) { x.globalAlpha = a * .92; x.fillStyle = BG; x.fillRect(x0 - 4, py - size - 1, tw + 8, size + 5); }
    x.globalAlpha = a; x.fillStyle = c; x.textAlign = 'left'; x.fillText(s, x0, py); x.globalAlpha = 1;
  }
  function arrow(xa, xb, y, c, k) {
    if (k <= 0) return;
    const xe = xa + (xb - xa) * k, dir = Math.sign(xb - xa) || 1;
    x.strokeStyle = c; x.fillStyle = c; x.lineWidth = 1.25;
    x.beginPath(); x.moveTo(xa, y + .5); x.lineTo(xe, y + .5); x.stroke();
    x.beginPath(); x.moveTo(xe, y + .5); x.lineTo(xe - dir * 7, y - 3.5); x.lineTo(xe - dir * 7, y + 4.5); x.closePath(); x.fill();
  }

  let W = 0, H = 0;
  function draw(t) {
    x.clearRect(0, 0, W, H);
    const small = W < SMALL, s = small ? 9 : 10;
    const L = 52, R = W - 16, T = 48, B = H - 56, pw = R - L, ph = B - T;
    const N0 = 490, N1 = 750, P0 = .72, P1 = .98;
    const X = n => L + (n - N0) / (N1 - N0) * pw, Y = p => B - (p - P0) / (P1 - P0) * ph;

    // grille et axes
    setFont(400, s); x.fillStyle = MUT; x.textAlign = 'right';
    for (const p of [.75, .80, .85, .90, .95]) {
      const y = Math.round(Y(p)) + .5;
      x.fillText(Math.round(p * 100) + '%', L - 10, y + 3);
      x.strokeStyle = GRID; x.globalAlpha = .6; x.beginPath(); x.moveTo(L, y); x.lineTo(R, y); x.stroke(); x.globalAlpha = 1;
    }
    x.textAlign = 'center';
    for (let n = 500; n <= 750; n += 50) { x.fillStyle = MUT; x.fillText(n, X(n), B + 18); }
    x.textAlign = 'left';
    x.strokeStyle = INK; x.globalAlpha = .55; x.lineWidth = 1;
    x.beginPath(); x.moveTo(L + .5, T); x.lineTo(L + .5, B + .5); x.lineTo(R, B + .5); x.stroke(); x.globalAlpha = 1;
    // titre d'axe et note de bas de graphe : écartés verticalement s'ils se croisent (très petits écrans)
    setFont(500, s); const axisW = x.measureText('EXPECTED SAMPLE SIZE').width;
    setFont(400, s); const noteW = x.measureText('TYPE I ERROR HELD AT 2.5%').width;
    const tight = noteW + 12 > R - axisW;
    const axisY = tight ? B + 34 : B + 40, noteY = tight ? H - 2 : H - 8;
    tag('POWER', 0, T - 16, 500, s, MUT, 'left', 1, false);
    tag('EXPECTED SAMPLE SIZE', R, axisY, 500, s, MUT, 'right', 1, false);
    tag('CANDIDATE DESIGNS · SIMULATED', L + pw / 2, 16, 500, s, INK, 'center', seg(t, .1, .6), false);

    // nuage : les designs arrivent, puis ceux sous la cible s'éteignent
    const filt = ease(seg(t, 2.7, 3.3)), count = small ? 1000 : DESIGNS.length;
    x.fillStyle = MAU;
    for (let i = 0; i < count; i++) {
      const q = DESIGNS[i];
      const a = easeOut(seg(t, .25 + q.d * 1.5, .7 + q.d * 1.5)); if (a <= 0) continue;
      const ok = q.p >= .90, al = ok ? a * (.5 + .3 * filt) : a * .5 * (1 - .72 * filt);
      x.globalAlpha = al; x.beginPath(); x.arc(X(q.n), Y(q.p) - (1 - a) * 10, 2, 0, 6.2832); x.fill();
    }
    x.globalAlpha = 1;

    // cible de puissance
    const yT = Y(.90), kl = ease(seg(t, 2.0, 2.7));
    if (kl > 0) { x.strokeStyle = INK; x.lineWidth = 1.25; x.beginPath(); x.moveTo(L, yT); x.lineTo(L + kl * pw, yT); x.stroke(); }
    tag('TARGET 90%', L + 6, yT - 8, 500, s, INK, 'left', seg(t, 2.5, 2.9));

    // design fixe : puissance d'origine inconnue, posé sur la cible en attendant le client
    const xr = X(629), kr = seg(t, 3.3, 3.7);
    if (kr > 0) {
      x.globalAlpha = kr; x.strokeStyle = INK; x.lineWidth = 1.5; x.fillStyle = BG;
      x.beginPath(); x.arc(xr, yT, 7, 0, 6.2832); x.fill(); x.stroke(); x.globalAlpha = 1;
    }
    tag('FIXED DESIGN · N 629', xr + 12, yT + 20, 500, s, INK, 'left', kr);

    // design retenu : le moment de décision, seul usage du jaune
    const xs = X(574), ys = Y(.903), ks = seg(t, 3.9, 4.4);
    if (ks > 0) {
      const sc = back(ks);
      x.fillStyle = YEL; x.beginPath(); x.arc(xs, ys, 6 * sc, 0, 6.2832); x.fill();
      x.strokeStyle = INK; x.lineWidth = 1.5; x.beginPath(); x.arc(xs, ys, 9.5 * sc, 0, 6.2832); x.stroke();
    }
    tag('ADAPTIVE DESIGN', xs + 14, ys - 30, 700, s, INK, 'left', seg(t, 4.2, 4.6));
    tag('N 574 · POWER 90.3%', xs + 14, ys - 16, 400, s, INK, 'left', seg(t, 4.3, 4.7));

    // écart de taille d'échantillon
    arrow(xr, xs, yT + 40, INK, ease(seg(t, 4.5, 5.1)));
    tag('−55 PARTICIPANTS', (xr + xs) / 2, yT + 58, 700, s + 1, INK, 'center', seg(t, 4.9, 5.3));
    tag('TYPE I ERROR HELD AT 2.5%', 0, noteY, 400, s, MUT, 'left', seg(t, 5.2, 5.6), false);
  }

  /* ---------- lecture : une fois à l'entrée, état final tenu, relance après une sortie complète ---------- */
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let ready = false, t = 0, played = false, raf = 0, last = 0;

  function fit() {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    W = mount.clientWidth; H = Math.round(Math.max(320, W / 1.15));
    mount.style.height = H + 'px';
    cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
    x.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (ready) draw(t);
  }
  function frame(now) {
    t = Math.min(t + Math.min((now - last) / 1000, .05), DUR); last = now;
    draw(t);
    raf = t < DUR ? requestAnimationFrame(frame) : 0;   // rien ne tourne une fois la lecture finie
  }
  function play() {
    played = true; t = 0; last = performance.now();
    if (!raf) raf = requestAnimationFrame(frame);
  }
  function reset() {
    cancelAnimationFrame(raf); raf = 0;
    played = false; t = 0; draw(0);
  }

  // on observe la largeur du montage ; sa hauteur suit, sans boucle
  let lastW = -1;
  const ro = new ResizeObserver(() => { if (mount.clientWidth !== lastW) { lastW = mount.clientWidth; fit(); } });
  ro.observe(mount);
  let io = null;

  /* On attend la police avant le premier dessin, sinon il part en Arial.
     Plafond à 3 s pour ne jamais bloquer l'animation. */
  const fontReady = document.fonts
    ? Promise.race([document.fonts.load(`500 10px ${FAMILY}`), new Promise(r => setTimeout(r, 3000))])
    : Promise.resolve();

  fontReady.then(() => {
    ready = true;
    if (reduced) t = DUR;
    fit();
    if (reduced) return;
    io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) { if (played) reset(); }
      else if (!played && e.intersectionRatio >= .45) play();
    }, { threshold: [0, .45] });
    io.observe(mount);
  });

  return {
    destroy() {
      cancelAnimationFrame(raf); raf = 0;
      ro.disconnect(); if (io) io.disconnect();
      cv.remove(); delete mount.dataset.pvReady;
    }
  };
}
