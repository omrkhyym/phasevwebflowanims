/* Bloc "Proof" de ClinOps Optimizer : la levée d'aveugle (proto : protos/phasev-clinops-proof-proto.html).
   Monté dans <div data-pv="clinops-proof"></div>, colonne droite du bloc. La colonne gauche reste dans Webflow.
   Chiffres réels en attributs optionnels du montage, modifiables sans rebuild :
   data-sites (357), data-rec (0.43), data-other (0.28), data-gain (53, le chiffre officiel affiché dans l'accolade). */

const INK = '#141238', MUT = '#7d7b9c', GRID = '#e3e1ef';

/* Chronologie (s) : sites à l'aveugle, sélection PhaseV, levée d'aveugle, moyennes */
const T = { grid: 0, pick: 1.4, reveal: 3.2, means: 5.8, gap: 6.8, out: 11.2, loop: 12 };
const STILL = 9;   // état dessiné sous reduced motion
const COLS = 21, REC_SHARE = .4;   // la part de sites recommandés est une hypothèse de proto

const cl = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const seg = (t, a, b) => cl((t - a) / (b - a));
const ease = v => v < .5 ? 4 * v * v * v : 1 - Math.pow(-2 * v + 2, 3) / 2;
function rng(s) { return () => { s |= 0; s = s + 0x6D2B79F5 | 0; let t = Math.imul(s ^ s >>> 15, 1 | s); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }

/* Taux générés : seules les deux moyennes sont réelles ; chaque groupe est recalé sur sa moyenne */
function buildSites(N, mRec, mOth) {
  const R = rng(9), g = () => Math.sqrt(-2 * Math.log(R() + 1e-9)) * Math.cos(6.2832 * R()), S = [];
  for (let i = 0; i < N; i++) {
    const rec = R() < REC_SHARE, sg = .55;
    S.push({ i, rec, v: Math.exp(sg * g() - sg * sg / 2), jx: R() - .5, d: R() });
  }
  for (const [flag, m] of [[true, mRec], [false, mOth]]) {
    const G = S.filter(s => s.rec === flag), avg = G.reduce((a, s) => a + s.v, 0) / G.length;
    G.forEach(s => s.v = Math.min(s.v * m / avg, .97));
  }
  return S;
}

/* Couleur calculée d'un élément, ou repli si absent ou transparent */
function colorOf(el, prop, fallback) {
  if (!el) return fallback;
  const c = getComputedStyle(el)[prop];
  const m = c && c.match(/rgba?\(([^)]+)\)/);
  if (!m) return fallback;
  const a = m[1].split(',')[3];
  return a !== undefined && parseFloat(a) === 0 ? fallback : c;
}

export function initClinopsProof(mount) {
  if (mount.dataset.pvReady) return;
  mount.dataset.pvReady = '1';

  // chiffres : attributs du montage, valeurs du proto par défaut
  const num = (k, d) => { const v = parseFloat(mount.dataset[k]); return Number.isFinite(v) && v > 0 ? v : d; };
  const N = Math.round(num('sites', 357)), M_REC = num('rec', .43), M_OTH = num('other', .28), GAIN = Math.round(num('gain', 53));
  const ROWS = Math.ceil(N / COLS);
  const SITES = buildSites(N, M_REC, M_OTH);
  const L_REC = M_REC.toFixed(2), L_OTH = M_OTH.toFixed(2);

  mount.style.cssText += 'position:relative;width:100%;aspect-ratio:1/1;';
  const cv = document.createElement('canvas');
  cv.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block;transition:opacity .5s ease;';
  cv.setAttribute('role', 'img');
  cv.setAttribute('aria-label', `Blinded retrospective: sites recommended by PhaseV recruited ${L_REC} patients per site per month versus ${L_OTH} for non-recommended sites, ${GAIN}% faster.`);
  mount.appendChild(cv);
  const x = cv.getContext('2d');

  /* Typo : la première étiquette de la page (le bloc n'en a pas), repli sur la police du body.
     L'espacement est converti en ratio de la taille, puis réappliqué à nos petites tailles. */
  const section = mount.closest('section') || document.body;
  const label = document.querySelector('.text-size-label');
  const cs = getComputedStyle(label || document.body);
  const FAMILY = cs.fontFamily;
  const lsRatio = label && cs.letterSpacing !== 'normal'
    ? (parseFloat(cs.letterSpacing) || 0) / (parseFloat(cs.fontSize) || 16) : 0;
  const hasLS = 'letterSpacing' in x;
  const GRN = colorOf(section.querySelector('.text-color-green') || document.querySelector('.text-color-green'), 'color', '#087f6a');
  const BG = colorOf(section, 'backgroundColor', '#ffffff');

  function setFont(w, size) {
    x.font = `${w} ${size}px ${FAMILY}`;
    if (hasLS) x.letterSpacing = (lsRatio * size).toFixed(2) + 'px';
  }
  /* bg : pastille de la couleur de section derrière le texte, pour les étiquettes posées sur le nuage */
  function txt(s, px, py, w, size, c, a = 1, al = 'left', bg = false) {
    if (a <= 0) return;
    setFont(w, size);
    const tw = x.measureText(s).width, x0 = al === 'left' ? px : al === 'right' ? px - tw : px - tw / 2;
    if (bg) { x.globalAlpha = a * .92; x.fillStyle = BG; x.fillRect(x0 - 4, py - 12, tw + 8, 16); }
    x.globalAlpha = a; x.fillStyle = c; x.textAlign = 'left'; x.fillText(s, x0, py); x.globalAlpha = 1;
  }

  let W = 0, H = 0;
  function draw(t) {
    x.clearRect(0, 0, W, H);
    const fs = W < 420 ? 9 : 10, L = Math.max(40, W * .09), Rr = W - 8, T0 = W < 480 ? 54 : 40, B = H - 44;
    const Y = v => B - v * (B - T0);
    const colW = (Rr - L) * .34, cA = L + (Rr - L) * .27, cB = L + (Rr - L) * .75;

    // grille de départ
    const gs = Math.min((W * .78) / COLS, (H * .55) / ROWS), gx0 = W / 2 - gs * (COLS - 1) / 2, gy0 = H * .48 - gs * (ROWS - 1) / 2;

    // axe : apparaît avec la levée d'aveugle
    const ax = seg(t, T.reveal, T.reveal + .6);
    if (ax > 0) {
      setFont(400, fs); x.textAlign = 'right';
      for (const v of [0, .2, .4, .6, .8]) {
        const y = Math.round(Y(v)) + .5;
        x.globalAlpha = ax; x.fillStyle = MUT; x.fillText(v.toFixed(1), L - 8, y + 3);
        x.strokeStyle = GRID; x.lineWidth = 1; x.beginPath(); x.moveTo(L, y); x.lineTo(Rr, y); x.stroke();
      }
      x.globalAlpha = 1; x.textAlign = 'left';
      txt('PATIENTS / SITE / MONTH', 0, T0 - 14, 500, fs, MUT, ax);
      txt('RECOMMENDED', cA, B + 22, 700, fs, GRN, ax, 'center');
      txt('NOT RECOMMENDED', cB, B + 22, 500, fs, MUT, ax, 'center');
    }

    // sites
    for (const s of SITES) {
      const gxp = gx0 + (s.i % COLS) * gs, gyp = gy0 + Math.floor(s.i / COLS) * gs;
      const k = ease(seg(t, T.reveal + s.d * 1.1, T.reveal + 1.2 + s.d * 1.1));
      const tx = (s.rec ? cA : cB) + s.jx * colW, ty = Y(s.v);
      const px = gxp + (tx - gxp) * k, py = gyp + (ty - gyp) * k;
      // la sélection s'allume site par site
      const on = s.rec ? seg(t, T.pick + s.d * 1.2, T.pick + .25 + s.d * 1.2) : 0;
      // après la levée, les non-recommandés passent au second plan
      const dim = s.rec ? 1 : 1 - .35 * seg(t, T.means, T.means + .6);
      x.globalAlpha = (on > 0 ? .35 + .65 * on : .35) * dim;
      x.fillStyle = on > 0 ? GRN : INK;
      x.beginPath(); x.arc(px, py, on > 0 ? 2.4 + .6 * on : 2.4, 0, 6.2832); x.fill();
    }
    x.globalAlpha = 1;

    // moyennes
    const kmA = ease(seg(t, T.means, T.means + .6)), kmB = ease(seg(t, T.means + .3, T.means + .9));
    const yA = Y(M_REC), yB = Y(M_OTH), a0 = cA - colW * .62, b0 = cB - colW * .62;
    if (kmB > 0) { x.strokeStyle = INK; x.lineWidth = 1.5; x.globalAlpha = .7; x.beginPath(); x.moveTo(b0, yB); x.lineTo(b0 + colW * 1.24 * kmB, yB); x.stroke(); x.globalAlpha = 1; }
    if (kmA > 0) {
      x.strokeStyle = GRN; x.lineWidth = 2; x.beginPath(); x.moveTo(a0, yA); x.lineTo(a0 + colW * 1.24 * kmA, yA); x.stroke();
      // prolongement pointillé pour comparer d'une colonne à l'autre
      const kd = ease(seg(t, T.gap, T.gap + .6));
      if (kd > 0) {
        x.save(); x.setLineDash([3, 4]); x.globalAlpha = .8; x.lineWidth = 1.25; x.beginPath();
        x.moveTo(a0 + colW * 1.24, yA); x.lineTo(a0 + colW * 1.24 + (b0 + colW * 1.24 - a0 - colW * 1.24) * kd, yA); x.stroke(); x.restore();
      }
    }
    txt(L_REC, a0, yA - 8, 700, fs + 1, GRN, seg(t, T.means + .4, T.means + .8), 'left', true);
    txt(L_OTH, b0 + colW * 1.24, yB - 8, 700, fs + 1, INK, seg(t, T.means + .7, T.means + 1.1), 'right', true);

    // écart
    const kg = ease(seg(t, T.gap + .4, T.gap + 1)), gx = b0 - 10;
    if (kg > 0) {
      x.strokeStyle = GRN; x.lineWidth = 1.5; x.globalAlpha = kg; x.beginPath();
      x.moveTo(gx + 5, yA); x.lineTo(gx, yA); x.lineTo(gx, yA + (yB - yA) * kg); x.lineTo(gx + 5, yA + (yB - yA) * kg); x.stroke(); x.globalAlpha = 1;
    }
    txt('+' + GAIN + '%', gx - 8, (yA + yB) / 2 + 5, 700, fs + 4, GRN, seg(t, T.gap + .8, T.gap + 1.2), 'right', true);

    // état
    const st = [[N + ' SITES · OUTCOMES BLINDED', 0, T.pick, MUT], ['PHASEV RECOMMENDS', T.pick, T.reveal, GRN], ['WHAT ACTUALLY HAPPENED', T.reveal, 99, INK]];
    for (const [s0, a, b, c] of st) txt(s0, W, 14, 700, fs, c, Math.min(seg(t, a, a + .3), 1 - seg(t, b - .3, b)), 'right');
  }

  /* ---------- boucle : tourne seulement à l'écran, repart de t = 0 à chaque entrée ---------- */
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let ready = false, t = 0, raf = 0, last = 0;

  function fit() {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    W = mount.clientWidth; H = mount.clientHeight;
    cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
    x.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (ready) draw(reduced ? STILL : t);
  }
  function frame(now) {
    raf = requestAnimationFrame(frame);
    t += Math.min((now - last) / 1000, .05); last = now;
    if (t > T.loop) t = 0;
    cv.style.opacity = t > T.out ? 0 : 1;   // fondu de sortie avant la boucle
    draw(t);
  }
  function start() {
    if (raf || reduced) return;
    t = 0; cv.style.opacity = 1;
    last = performance.now(); raf = requestAnimationFrame(frame);
  }
  function stop() { cancelAnimationFrame(raf); raf = 0; }

  const ro = new ResizeObserver(fit);
  ro.observe(mount);
  let io = null;

  /* On attend la police avant le premier dessin, sinon il part en Arial.
     Plafond à 3 s pour ne jamais bloquer l'animation. */
  const fontReady = document.fonts
    ? Promise.race([document.fonts.load(`500 10px ${FAMILY}`), new Promise(r => setTimeout(r, 3000))])
    : Promise.resolve();

  fontReady.then(() => {
    ready = true;
    fit();
    if (reduced) return;
    io = new IntersectionObserver(([e]) => e.isIntersecting ? start() : stop(), { threshold: .35 });
    io.observe(mount);
  });

  return {
    destroy() {
      stop(); ro.disconnect(); if (io) io.disconnect();
      cv.remove(); delete mount.dataset.pvReady;
    }
  };
}
