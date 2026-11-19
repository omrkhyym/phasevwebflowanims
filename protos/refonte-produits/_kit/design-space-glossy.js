/* Success story Trial, variante « glossy » sur fond sombre (recherche style affiné, inspirée de BonV).
   Copie adaptée de src/success-design-space.js (validé, non modifié) : mêmes données et même chronologie,
   rendu sombre : frontière blanche avec dégradé dessous, nuage en lumière additive, grille quasi invisible,
   étiquettes mono, jaune réservé au design retenu et à l'écart. Monté sur [data-pv="design-space-glossy"]. */

const WHITE = '#F4F4F4', YEL = '#E2C70A', MAU = '#C9C4EF', TXT = 'rgba(244,244,244,.62)', FAINT = 'rgba(244,244,244,.08)';
const DUR = 5.7;
const SMALL = 600;

const cl = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const seg = (t, a, b) => cl((t - a) / (b - a));
const ease = v => v < .5 ? 4 * v * v * v : 1 - Math.pow(-2 * v + 2, 3) / 2;
const easeOut = v => 1 - Math.pow(1 - v, 3);
function rng(s) { return () => { s |= 0; s = s + 0x6D2B79F5 | 0; let t = Math.imul(s ^ s >>> 15, 1 | s); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }

// mêmes designs simulés que le module validé (même graine)
const FRONT = n => .955 - .05 * Math.exp(-(n - 574) / 60);
const DESIGNS = (() => {
  const R = rng(7), g = () => Math.sqrt(-2 * Math.log(R() + 1e-9)) * Math.cos(6.2832 * R()), P = [];
  for (let i = 0; i < 1600; i++) {
    const n = 500 + R() * 240;
    let p = FRONT(n) - Math.abs(g()) * .028 - Math.pow(R(), 2.2) * .12;
    if (n < 580 && p >= .899) p = .897 - R() * .012;
    P.push({ n, p: Math.max(.725, p), d: R() });
  }
  return P;
})();

export function initDesignSpaceGlossy(mount) {
  if (mount.dataset.pvReady) return;
  mount.dataset.pvReady = '1';
  mount.style.cssText += 'position:relative;width:100%;min-width:0;';
  const cv = document.createElement('canvas');
  cv.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block;';
  cv.setAttribute('role', 'img');
  cv.setAttribute('aria-label', 'Operating characteristics of simulated candidate designs: the adaptive design reaches 90.3% power with 574 participants, 55 fewer than the fixed design at 629, with type I error held at 2.5%.');
  mount.appendChild(cv);
  const x = cv.getContext('2d');

  // typo des étiquettes : celle du label de la section (mono en style affiné)
  const label = (mount.closest('section') || document.body).querySelector('.text-size-label');
  const cs = label ? getComputedStyle(label) : null;
  const FAMILY = cs ? cs.fontFamily : 'ui-monospace, monospace';
  const lsRatio = cs && cs.letterSpacing !== 'normal' ? (parseFloat(cs.letterSpacing) || 0) / (parseFloat(cs.fontSize) || 16) : 0;
  const hasLS = 'letterSpacing' in x;
  const font = (w, size) => { x.font = `${w} ${size}px ${FAMILY}`; if (hasLS) x.letterSpacing = (lsRatio * size).toFixed(2) + 'px'; };

  let W = 0, H = 0;
  // pill : fond sombre derrière le texte, pour rester lisible par-dessus la courbe et les points
  function tag(s, px, py, size, c, al = 'left', a = 1, pill = false) {
    if (a <= 0) return;
    font(400, size);
    const tw = x.measureText(s).width;
    let x0 = al === 'left' ? px : al === 'right' ? px - tw : px - tw / 2;
    x0 = cl(x0, 8, W - tw - 8);
    if (pill) {
      x.globalAlpha = a * .82; x.fillStyle = '#141238';
      x.beginPath(); x.roundRect ? x.roundRect(x0 - 7, py - size - 4, tw + 14, size + 10, 4) : x.rect(x0 - 7, py - size - 4, tw + 14, size + 10); x.fill();
    }
    x.globalAlpha = a; x.fillStyle = c; x.textAlign = 'left'; x.fillText(s, x0, py); x.globalAlpha = 1;
  }

  function draw(t) {
    x.clearRect(0, 0, W, H);
    const small = W < SMALL, s = small ? 9 : 10;
    const L = 48, R = W - 12, T = 44, B = H - 52, pw = R - L, ph = B - T;
    const N0 = 490, N1 = 750, P0 = .72, P1 = .98;
    const X = n => L + (n - N0) / (N1 - N0) * pw, Y = p => B - (p - P0) / (P1 - P0) * ph;

    // grille : trois lignes très faibles, axes en mono
    font(400, s); x.textAlign = 'right';
    for (const p of [.80, .90]) {
      const y = Math.round(Y(p)) + .5;
      x.fillStyle = TXT; x.fillText(Math.round(p * 100) + '%', L - 10, y + 3);
      x.strokeStyle = FAINT; x.lineWidth = 1; x.beginPath(); x.moveTo(L, y); x.lineTo(R, y); x.stroke();
    }
    x.textAlign = 'center'; x.fillStyle = TXT;
    for (let n = 500; n <= 750; n += 50) x.fillText(n, X(n), B + 18);
    x.strokeStyle = 'rgba(244,244,244,.16)'; x.beginPath(); x.moveTo(L, B + .5); x.lineTo(R, B + .5); x.stroke();
    tag('POWER', 0, T - 16, s, TXT);
    tag('EXPECTED SAMPLE SIZE', R, B + 38, s, TXT, 'right');
    tag('CANDIDATE DESIGNS · SIMULATED', L, 14, s, WHITE, 'left', seg(t, .1, .6));

    // frontière des meilleurs designs, avec un dégradé dessous (l'effet « glossy »)
    const kf = ease(seg(t, 1.6, 2.6));
    if (kf > 0) {
      const nA = 548, nB = nA + (N1 - nA) * kf;
      x.beginPath();
      for (let n = nA; n <= nB; n += 2) { const px = X(n), py = Y(FRONT(n)); n === nA ? x.moveTo(px, py) : x.lineTo(px, py); }
      x.lineTo(X(nB), B); x.lineTo(X(nA), B); x.closePath();
      const gr = x.createLinearGradient(0, Y(.96), 0, B);
      gr.addColorStop(0, 'rgba(244,244,244,.16)'); gr.addColorStop(1, 'rgba(244,244,244,0)');
      x.fillStyle = gr; x.fill();
      x.beginPath();
      for (let n = nA; n <= nB; n += 2) { const px = X(n), py = Y(FRONT(n)); n === nA ? x.moveTo(px, py) : x.lineTo(px, py); }
      x.strokeStyle = WHITE; x.lineWidth = 1.6; x.stroke();
    }

    // nuage : lumière additive, ceux sous la cible s'éteignent
    const filt = ease(seg(t, 2.7, 3.3)), count = small ? 1000 : DESIGNS.length;
    x.save(); x.globalCompositeOperation = 'lighter'; x.fillStyle = MAU;
    for (let i = 0; i < count; i++) {
      const q = DESIGNS[i];
      const a = easeOut(seg(t, .25 + q.d * 1.5, .7 + q.d * 1.5)); if (a <= 0) continue;
      const ok = q.p >= .90, al = ok ? a * (.32 + .22 * filt) : a * .3 * (1 - .75 * filt);
      x.globalAlpha = al; x.beginPath(); x.arc(X(q.n), Y(q.p) - (1 - a) * 10, 1.7, 0, 6.2832); x.fill();
    }
    x.restore();

    // cible de puissance : trait fin en pointillés
    const yT = Y(.90), kl = ease(seg(t, 2.0, 2.7));
    if (kl > 0) { x.save(); x.setLineDash([4, 5]); x.strokeStyle = 'rgba(244,244,244,.45)'; x.lineWidth = 1; x.beginPath(); x.moveTo(L, yT + .5); x.lineTo(L + kl * pw, yT + .5); x.stroke(); x.restore(); }
    tag('TARGET 90%', L + 6, yT - 8, s, TXT, 'left', seg(t, 2.5, 2.9));

    // design fixe : anneau fin
    const xr = X(629), kr = seg(t, 3.3, 3.7);
    if (kr > 0) { x.globalAlpha = kr; x.strokeStyle = 'rgba(244,244,244,.75)'; x.lineWidth = 1.25; x.beginPath(); x.arc(xr, yT, 6, 0, 6.2832); x.stroke(); x.globalAlpha = 1; }
    tag('FIXED · N 629', xr + 12, yT + 20, s, TXT, 'left', kr);

    // design retenu : point jaune et anneau de points (le geste de la marque)
    const xs = X(574), ys = Y(.903), ks = easeOut(seg(t, 3.9, 4.5));
    if (ks > 0) {
      x.fillStyle = YEL; x.beginPath(); x.arc(xs, ys, 5 * ks, 0, 6.2832); x.fill();
      const nDots = 22, rr = 13 * ks;
      for (let i = 0; i < nDots; i++) {
        const an = i / nDots * 6.2832 - 1.5708;
        x.globalAlpha = ks * (.45 + .45 * (i / nDots < ks ? 1 : 0));
        x.beginPath(); x.arc(xs + Math.cos(an) * rr, ys + Math.sin(an) * rr, 1.1, 0, 6.2832); x.fill();
      }
      x.globalAlpha = 1;
    }
    // étiquette en haut à gauche du point : zone vide (aucun design plus petit n'atteint 90 %), reliée par un trait fin
    const kt = seg(t, 4.2, 4.6), lx = xs - 26, ly = ys - 50;
    if (kt > 0) {
      x.globalAlpha = kt * .6; x.strokeStyle = WHITE; x.lineWidth = 1;
      x.beginPath(); x.moveTo(xs - 11, ys - 11); x.lineTo(lx + 4, ly + 16); x.stroke(); x.globalAlpha = 1;
    }
    tag('ADAPTIVE DESIGN', lx, ly - 16, s, WHITE, 'right', kt, true);
    tag('N 574 · POWER 90.3%', lx, ly, s, 'rgba(244,244,244,.82)', 'right', seg(t, 4.3, 4.7), true);

    // écart : trait jaune et étiquette mono
    const ka = ease(seg(t, 4.5, 5.1)), ya = yT + 40;
    if (ka > 0) {
      x.strokeStyle = YEL; x.lineWidth = 1.4;
      x.beginPath(); x.moveTo(xr, ya + .5); x.lineTo(xr + (xs - xr) * ka, ya + .5); x.stroke();
      x.fillStyle = YEL; x.beginPath(); x.arc(xr, ya + .5, 2.4, 0, 6.2832); x.fill();
      if (ka >= 1) { x.beginPath(); x.arc(xs, ya + .5, 2.4, 0, 6.2832); x.fill(); }
    }
    tag('−55 PARTICIPANTS', (xr + xs) / 2, ya + 20, s, YEL, 'center', seg(t, 4.9, 5.3));
    tag('TYPE I ERROR HELD AT 2.5%', 0, H - 6, s, TXT, 'left', seg(t, 5.2, 5.6));
  }

  // lecture une fois à l'entrée, état final tenu, relance après une sortie complète
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
    raf = t < DUR ? requestAnimationFrame(frame) : 0;
  }
  function play() { played = true; t = 0; last = performance.now(); if (!raf) raf = requestAnimationFrame(frame); }
  function reset() { cancelAnimationFrame(raf); raf = 0; played = false; t = 0; draw(0); }

  let lastW = -1;
  const ro = new ResizeObserver(() => { if (mount.clientWidth !== lastW) { lastW = mount.clientWidth; fit(); } });
  ro.observe(mount);
  let io = null;
  const fontReady = document.fonts
    ? Promise.race([document.fonts.load(`400 10px ${FAMILY}`), new Promise(r => setTimeout(r, 3000))])
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

  return { destroy() { cancelAnimationFrame(raf); raf = 0; ro.disconnect(); if (io) io.disconnect(); cv.remove(); delete mount.dataset.pvReady; } };
}
