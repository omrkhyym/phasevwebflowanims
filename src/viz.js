/* Graphes animés des pages produit (port du kit des protos, protos/refonte-produits/_kit/kit.js).
   Montage : <div data-pv="viz" data-mode="precision|split|rank|dist"></div> ; le module crée son canvas plein cadre.
   precision : deux bras de patients, la dispersion se resserre et l'intervalle de confiance rétrécit (ajustement pronostique).
   split : un nuage de patients se sépare, les répondeurs montent et passent en turquoise.
   rank : les chemins candidats se trient, le meilleur passe en navy. dist : distribution de la PoTS et son intervalle.
   Va-et-vient de 8 s ; couleurs claires dans un panneau sombre (.video-animation, .surface-dark), encre sinon.
   Reduced motion : état révélé fixe. Pause hors écran. Retourne destroy(). */

const LIGHT = { ink: '20,18,56', mau: '146,138,205', tea: '127,232,207' };
const DARK = { ink: '244,244,244', mau: '201,196,239', tea: '127,232,207' };
const ease = v => v < .5 ? 4 * v * v * v : 1 - Math.pow(-2 * v + 2, 3) / 2;
const rng = s => () => { s |= 0; s = s + 0x6D2B79F5 | 0; let t = Math.imul(s ^ s >>> 15, 1 | s); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
// va-et-vient : 0 (état brut) tenu, montée, 1 (état révélé) tenu, retour
const ping = t => { const u = (t % 8) / 8; return ease(u < .2 ? 0 : u < .45 ? (u - .2) / .25 : u < .8 ? 1 : 1 - (u - .8) / .2); };

export function initViz(el) {
  if (!el || el.dataset.pvInit) return null;
  el.dataset.pvInit = '1';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mode = el.dataset.mode || 'precision';
  const C = el.closest('.video-animation, .surface-dark') ? DARK : LIGHT;
  const INK = C.ink, MAU = C.mau, TEA = C.tea, SOLID = 'rgb(' + INK + ')';
  if (getComputedStyle(el).position === 'static') el.style.position = 'relative';
  const cv = document.createElement('canvas');
  cv.setAttribute('aria-hidden', 'true');
  cv.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block';
  el.appendChild(cv);
  const x = cv.getContext('2d');
  const R = rng(mode === 'split' ? 5 : 3), g = () => Math.sqrt(-2 * Math.log(R() + 1e-9)) * Math.cos(6.2832 * R());
  const P = Array.from({ length: mode === 'split' ? 170 : 120 }, (_, i) => ({ a: g(), b: g(), arm: i % 2, resp: R() < .4, j: R() }));
  let W = 0, H = 0, raf = 0;
  const t0 = performance.now();

  function draw(t) {
    x.clearRect(0, 0, W, H);
    const k = reduced ? 1 : ping(t), m = Math.min(W, H);
    if (mode === 'precision') {
      const rows = [H * .3, H * .52], mean = [W * .42, W * .58], sp = W * .13 * (1 - .6 * k);
      P.forEach(p => { const X = mean[p.arm] + p.a * sp, Y = rows[p.arm] + p.b * m * .035; x.beginPath(); x.arc(X, Y, 3.2, 0, 6.283); x.fillStyle = p.arm ? `rgba(${INK},.8)` : `rgba(${MAU},.85)`; x.fill(); });
      // estimation de l'effet et son intervalle
      const y = H * .8, cx = W * .62, half = W * .26 * (1 - .62 * k), z = W * .3;
      x.strokeStyle = `rgba(${INK},.25)`; x.lineWidth = 1; x.beginPath(); x.moveTo(W * .1, y); x.lineTo(W * .9, y); x.stroke();
      x.setLineDash([3, 4]); x.beginPath(); x.moveTo(z, y - 18); x.lineTo(z, y + 18); x.stroke(); x.setLineDash([]);
      x.strokeStyle = SOLID; x.lineWidth = 3; x.lineCap = 'round'; x.beginPath(); x.moveTo(cx - half, y); x.lineTo(cx + half, y); x.stroke();
      [cx - half, cx + half].forEach(X => { x.lineWidth = 2; x.beginPath(); x.moveTo(X, y - 8); x.lineTo(X, y + 8); x.stroke(); });
      x.beginPath(); x.arc(cx, y, 6, 0, 6.283); x.fillStyle = SOLID; x.fill();
    } else if (mode === 'rank') {
      const V = [.55, .92, .38, .74, .62], n = V.length, bh = H * .085, gap = H * .06, top = (H - n * bh - (n - 1) * gap) / 2, x0 = W * .12, wmax = W * .76;
      const order = V.map((v, i) => i).sort((a, b) => V[b] - V[a]), rankOf = i => order.indexOf(i);
      V.forEach((v, i) => {
        const y = top + (i + (rankOf(i) - i) * k) * (bh + gap), w = wmax * v * (.35 + .65 * Math.min(1, k * 1.6 + .2)), best = rankOf(i) === 0;
        x.fillStyle = best ? `rgba(${INK},${.35 + .65 * k})` : `rgba(${MAU},.7)`;
        x.beginPath(); x.roundRect ? x.roundRect(x0, y, w, bh, bh / 2) : x.rect(x0, y, w, bh); x.fill();
        x.beginPath(); x.arc(x0 - bh * .9, y + bh / 2, bh * .22, 0, 6.283); x.fillStyle = `rgba(${INK},.25)`; x.fill();
      });
    } else if (mode === 'dist') {
      const x0 = W * .1, x1 = W * .9, base = H * .78, peak = H * .5, sx = p => x0 + (x1 - x0) * p, mu = .48, sd = .09;
      const f = p => Math.exp(-.5 * Math.pow((p - mu) / sd, 2));
      x.strokeStyle = `rgba(${INK},.25)`; x.lineWidth = 1; x.beginPath(); x.moveTo(x0, base); x.lineTo(x1, base); x.stroke();
      const end = .02 + .98 * Math.min(1, k * 1.4 + .15);
      x.beginPath(); x.moveTo(sx(.33), base); for (let p = .33; p <= Math.min(.63, end); p += .005) x.lineTo(sx(p), base - f(p) * peak); x.lineTo(sx(Math.min(.63, end)), base); x.closePath();
      x.fillStyle = `rgba(${MAU},${.35 * k})`; x.fill();
      x.beginPath(); for (let p = 0; p <= end; p += .005) { const X = sx(p), Y = base - f(p) * peak; p ? x.lineTo(X, Y) : x.moveTo(X, Y); }
      x.strokeStyle = SOLID; x.lineWidth = 2.5; x.stroke();
      if (end > mu) { x.setLineDash([4, 4]); x.lineWidth = 1.5; x.beginPath(); x.moveTo(sx(mu), base); x.lineTo(sx(mu), base - peak - 10); x.stroke(); x.setLineDash([]); }
    } else {
      const cx = W / 2, cy = H / 2;
      // moyenne d'ensemble : une ligne qui s'efface quand les groupes apparaissent
      x.strokeStyle = `rgba(${INK},${.35 * (1 - k) + .1})`; x.setLineDash([5, 5]); x.lineWidth = 1.5; x.beginPath(); x.moveTo(W * .12, cy); x.lineTo(W * .88, cy); x.stroke(); x.setLineDash([]);
      P.forEach(p => {
        const off = (p.resp ? -1 : 1) * H * .2 * k, X = cx + p.a * W * .15, Y = cy + p.b * H * .1 * (1 - .3 * k) + off;
        x.beginPath(); x.arc(X, Y, 3.4, 0, 6.283);
        x.fillStyle = `rgba(${MAU},${.85 - .25 * k})`;
        if (p.resp && k > .02) { const c = MAU.split(',').map((v, i) => Math.round(+v + (+TEA.split(',')[i] - v) * k)); x.fillStyle = `rgba(${c},.95)`; }
        x.fill();
      });
    }
  }
  const fit = () => {
    const d = Math.min(devicePixelRatio || 1, 2);
    W = el.clientWidth; H = el.clientHeight;
    cv.width = Math.round(W * d); cv.height = Math.round(H * d); x.setTransform(d, 0, 0, d, 0, 0);
    draw(reduced ? 6 : (performance.now() - t0) / 1000);
  };
  const frame = now => { raf = requestAnimationFrame(frame); draw((now - t0) / 1000); };
  const ro = new ResizeObserver(fit); ro.observe(el);
  let io = null;
  if (!reduced) {
    io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !raf) raf = requestAnimationFrame(frame);
      else if (!e.isIntersecting) { cancelAnimationFrame(raf); raf = 0; }
    });
    io.observe(el);
  }
  return function destroy() {
    cancelAnimationFrame(raf); ro.disconnect(); if (io) io.disconnect();
    cv.remove(); delete el.dataset.pvInit;
  };
}
