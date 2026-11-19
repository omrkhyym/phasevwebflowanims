/* Nuage HTE (Response, cas Diabète), variante « glossy » sur fond sombre (recherche style affiné).
   Copie adaptée du nuage de kit.js (non modifié) : mêmes patients, même chronologie.
   Rendu sombre : effet faible en mauve atténué, effet fort en turquoise, lumière additive, frontière en pointillés blancs.
   Monté sur [data-pv="hte-glossy"]. */
const DIM = [70, 62, 128], MAU = [146, 138, 205], TEA = [127, 232, 207];
const mix = (a, b, k) => a.map((v, i) => Math.round(v + (b[i] - v) * k));
const col = e => e < .5 ? mix(DIM, MAU, e * 2) : mix(MAU, TEA, (e - .5) * 2);
const cl = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v)), seg = (t, a, b) => cl((t - a) / (b - a));
const ease = v => v < .5 ? 4 * v * v * v : 1 - Math.pow(-2 * v + 2, 3) / 2;
function rng(s) { return () => { s |= 0; s = s + 0x6D2B79F5 | 0; let t = Math.imul(s ^ s >>> 15, 1 | s); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }

// mêmes patients que le nuage validé (même graine, même tirage)
const PTS = (() => {
  const R = rng(7), g = () => Math.sqrt(-2 * Math.log(R() + 1e-9)) * Math.cos(6.2832 * R()), P = [];
  for (let i = 0; i < 340; i++) {
    const age = cl(60 + g() * 8.5, 35, 79), bmi = cl(32 + g() * 3.6 - (age - 60) * .05, 23.5, 41);
    const inside = age >= 53 && bmi <= 32;
    const e = cl((inside ? .62 : .18) + (32 - bmi) * .035 + (age - 53) * .006 + g() * .12);
    P.push({ age, bmi, e, d: R() });
  }
  return P;
})();
const AX = [33, 81], AY = [23, 41.5];
const TXT = 'rgba(244,244,244,.6)';

export function initHteGlossy(mount) {
  if (mount.dataset.pvReady) return;
  mount.dataset.pvReady = '1';
  mount.style.cssText += 'position:relative;width:100%;aspect-ratio:1.45/1;';
  const cv = document.createElement('canvas');
  cv.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block;';
  cv.setAttribute('role', 'img');
  cv.setAttribute('aria-label', 'Scatter plot of patients by age and BMI, colored by estimated treatment effect, with the responder boundary at age 53 and BMI 32.');
  mount.append(cv);
  const x = cv.getContext('2d');
  const label = (mount.closest('section') || document.body).querySelector('.text-size-label');
  const FAMILY = label ? getComputedStyle(label).fontFamily : 'ui-monospace, monospace';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let W = 0, H = 0, t0 = 0, raf = 0, started = false, last = 9;

  function fit() {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    W = mount.clientWidth; H = mount.clientHeight;
    cv.width = W * dpr; cv.height = H * dpr; x.setTransform(dpr, 0, 0, dpr, 0, 0);
    draw(started ? last : 0);
  }
  function draw(t) {
    last = t;
    x.clearRect(0, 0, W, H);
    const L = 40, B = 30, Rm = 46, T = 8, pw = W - L - Rm, ph = H - B - T;
    const sx = a => L + (a - AX[0]) / (AX[1] - AX[0]) * pw, sy = b => T + ph - (b - AY[0]) / (AY[1] - AY[0]) * ph;
    // axes en mono, grille quasi invisible
    x.font = `400 10px ${FAMILY}`; x.fillStyle = TXT; x.lineWidth = 1;
    x.strokeStyle = 'rgba(244,244,244,.16)'; x.beginPath(); x.moveTo(L, T + ph + .5); x.lineTo(L + pw, T + ph + .5); x.stroke();
    x.textAlign = 'center'; [40, 50, 60, 70, 80].forEach(a => x.fillText(a, sx(a), T + ph + 16));
    x.textAlign = 'right'; [25, 30, 35, 40].forEach(b => {
      x.fillText(b, L - 8, sy(b) + 4);
      x.strokeStyle = 'rgba(244,244,244,.07)'; x.beginPath(); x.moveTo(L, Math.round(sy(b)) + .5); x.lineTo(L + pw, Math.round(sy(b)) + .5); x.stroke();
    });
    x.textAlign = 'center'; x.fillText('AGE', L + pw / 2, H - 2);
    x.save(); x.translate(11, T + ph / 2); x.rotate(-Math.PI / 2); x.fillText('BMI', 0, 0); x.restore();
    // patients : lumière additive, puis couleur de l'effet
    const tint = ease(seg(t, 1.2, 2.6));
    x.save(); x.globalCompositeOperation = 'lighter';
    PTS.forEach(p => {
      const k = ease(seg(t, p.d * .9, p.d * .9 + .5)); if (k <= 0) return;
      const c = mix(MAU, col(p.e), tint);
      x.beginPath(); x.arc(sx(p.age), sy(p.bmi), 3 * k, 0, 6.283); x.fillStyle = `rgba(${c},.62)`; x.fill();
    });
    x.restore();
    // frontière des répondeurs : pointillés blancs fins
    const b = ease(seg(t, 2.8, 3.8)), xa = sx(53), yb = sy(32), x1 = sx(80), y0 = sy(AY[0]);
    if (b > 0) {
      x.setLineDash([5, 5]); x.strokeStyle = 'rgba(244,244,244,.85)'; x.lineWidth = 1.4;
      x.beginPath(); x.moveTo(xa, y0); x.lineTo(xa, y0 + (yb - y0) * b); x.stroke();
      x.beginPath(); x.moveTo(xa, yb); x.lineTo(xa + (x1 - xa) * b, yb); x.stroke(); x.setLineDash([]);
    }
    // échelle de couleur : trait fin
    const gx = W - 18, gy0 = T, gy1 = T + ph, gr = x.createLinearGradient(0, gy1, 0, gy0);
    gr.addColorStop(0, `rgb(${DIM})`); gr.addColorStop(.5, `rgb(${MAU})`); gr.addColorStop(1, `rgb(${TEA})`);
    x.globalAlpha = tint; x.fillStyle = gr; x.fillRect(gx, gy0, 4, gy1 - gy0); x.globalAlpha = 1;
    x.save(); x.translate(gx - 10, T + ph / 2); x.rotate(-Math.PI / 2); x.fillStyle = TXT; x.textAlign = 'center'; x.fillText('ESTIMATED EFFECT', 0, 0); x.restore();
  }
  function frame() { const t = (performance.now() - t0) / 1000; draw(t); raf = t < 4.2 ? requestAnimationFrame(frame) : 0; }
  const ro = new ResizeObserver(fit); ro.observe(mount);
  // une seule lecture, à l'entrée à l'écran
  const io = new IntersectionObserver(([e]) => {
    if (!e.isIntersecting || started) return;
    started = true; io.disconnect();
    if (reduced) return draw(9);
    t0 = performance.now(); raf = requestAnimationFrame(frame);
  }, { threshold: .35 });
  io.observe(mount);
  return { destroy() { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); cv.remove(); delete mount.dataset.pvReady; } };
}
