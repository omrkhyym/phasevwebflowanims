/* Gantt "The problem", variante « glossy » sur fond sombre (style affiné, d'après le film BonV). Reprend l'histoire de src/gantt.js
   (non modifié) : un critère d'éligibilité change, chaque outil recalcule à son propre moment, la soumission glisse.
   Mise en page aérée : lignes hautes, libellés lisibles, grille de semaines, outil en pastille, retard en étiquette.
   Retard en terracotta désaturé des capacités BonV (le rouge est hors charte). Monté dans <div data-pv="gantt-glossy"></div>. */
import { cl, seg } from './bonv-draw.js';

const CFG = { slip: 18, lag: 1.15, hold: 2.8 };
const WHITE = '#F4F4F4', DIM = 'rgba(244,244,244,.42)', FAINT = 'rgba(244,244,244,.08)', GRID = 'rgba(244,244,244,.14)';
const ALERT = '#D6A394';
const WEEKS = 104, SQ = .72;
const TOOLS = [{ n: 'PROTOCOL', c: '#C9C4EF' }, { n: 'CTMS', c: '#A99FD8' }, { n: 'EDC', c: '#78A8E0' }, { n: 'eTMF', c: '#7FE8CF' }];
const TASKS = [
  { n: 'Final protocol', a: .00, b: .13, tool: 0 },
  { n: 'Site activation', a: .11, b: .33, tool: 1 },
  { n: 'FPI → LPI', a: .30, b: .61, tool: 1 },
  { n: 'Data cleaning', a: .57, b: .73, tool: 2 },
  { n: 'Database lock', a: .71, b: .78, tool: 2 },
  { n: 'CSR & submission', a: .76, b: .95, tool: 3 }
];
const FINAL_T = 2.6 + TOOLS.length * CFG.lag, CYCLE = FINAL_T + CFG.hold;
const ease = v => v < .5 ? 4 * v * v * v : 1 - Math.pow(-2 * v + 2, 3) / 2;

export function initGanttGlossy(mount) {
  if (mount.dataset.pvReady) return;
  mount.dataset.pvReady = '1';
  const cv = document.createElement('canvas');
  cv.style.cssText = 'display:block;width:100%;';
  cv.setAttribute('role', 'img');
  cv.setAttribute('aria-label', 'Study timeline: one eligibility change pushes submission back by 18 weeks as each tool recalculates on its own schedule.');
  mount.appendChild(cv);
  const x = cv.getContext('2d');
  const sec = mount.closest('section') || document.body;
  const fam = sel => getComputedStyle(sec.querySelector(sel) || document.body).fontFamily;
  const SANS = fam('.text-size-large'), MONO = fam('.text-size-label'), hasLS = 'letterSpacing' in x;

  function font(w, size, mono) { x.font = `${w} ${size}px ${mono ? MONO : SANS}`; if (hasLS) x.letterSpacing = mono ? (size * .12).toFixed(2) + 'px' : '0px'; }
  function txt(s, px, py, w, size, c, a = 1, al = 'left', mono = false) { if (a <= 0) return; font(w, size, mono); x.textAlign = al; x.globalAlpha = a; x.fillStyle = c; x.fillText(s, px, py); x.globalAlpha = 1; x.textAlign = 'left'; }
  function tw(s, w, size, mono) { font(w, size, mono); return x.measureText(s).width; }
  function rr(px, py, w, h, r) { x.beginPath(); if (x.roundRect) x.roundRect(px, py, w, h, Math.min(r, w / 2, h / 2)); else x.rect(px, py, w, h); }
  function line(x0, y0, x1, y1, c, a, w = 1) { x.globalAlpha = a; x.strokeStyle = c; x.lineWidth = w; x.beginPath(); x.moveTo(x0, y0); x.lineTo(x1, y1); x.stroke(); x.globalAlpha = 1; }

  let W = 0, H = 0, S = 1, narrow = false;
  function geom() {
    narrow = W < 640; S = cl(W / 1100, .7, 1.15);
    const top = 64 * S, rowH = (narrow ? 40 : 54) * S, padL = narrow ? 118 * S : 230 * S, padR = 24 * S;
    return { top, rowH, padL, padR, w: W - padL - padR, BH: (narrow ? 12 : 16) * S, gridTop: top + 14 * S, bottom: top + 14 * S + rowH * TASKS.length };
  }
  function height() { const g = geom(); return Math.round(g.bottom + 92 * S); }

  function draw(tt) {
    x.clearRect(0, 0, W, H);
    const { top, rowH, padL, w, BH, gridTop, bottom } = geom();
    const push = CFG.slip / WEEKS, X = v => padL + v * w, fsL = Math.max(12, (narrow ? 12 : 15) * S), fsM = Math.max(8.5, 10 * S);

    // grille des semaines
    for (let k = 0; k <= 8; k++) {
      const v = k / 8, wk = Math.round(WEEKS * v), px = X(v);
      line(px, gridTop - 6 * S, px, bottom, WHITE, k === 0 ? .18 : .07);
      if (!narrow || k % 2 === 0) txt('W' + wk, px, top - 6 * S, 400, fsM, DIM, 1, k === 0 ? 'left' : k === 8 ? 'right' : 'center', true);
    }
    txt('STUDY TIMELINE', 0, top - 6 * S, 400, fsM, DIM, 1, 'left', true);

    const trig = ease(seg(tt, .7, 1.7));
    let pending = false;
    TASKS.forEach((tk, i) => {
      const y = gridTop + i * rowH + rowH / 2, lag = tk.tool * CFG.lag;
      const k = i === 0 ? trig : ease(seg(tt, 1.6 + lag, 2.6 + lag));
      if (i > 0 && k < 1 && trig >= 1) pending = true;
      const a = tk.a * SQ + (i === 0 ? 0 : push * k), b = tk.b * SQ + push * (i === 0 ? trig : k);
      if (i) line(0, y - rowH / 2, X(1), y - rowH / 2, WHITE, .06);
      // libellé de la tâche et son outil
      txt(tk.n, 0, y + (narrow ? 4 : -1) * S, 400, fsL, k > 0 || i === 0 ? WHITE : DIM);
      if (!narrow) txt(TOOLS[tk.tool].n, 0, y + 15 * S, 400, fsM * .9, TOOLS[tk.tool].c, .85, 'left', true);
      // plan initial, en pointillé
      x.save(); x.setLineDash([2, 3]); rr(X(tk.a * SQ) + .5, y - BH / 2 + .5, (tk.b - tk.a) * SQ * w - 1, BH - 1, BH / 2);
      x.strokeStyle = 'rgba(244,244,244,.28)'; x.lineWidth = 1; x.stroke(); x.restore();
      // la part du glissement pas encore répercutée par cet outil
      if (i > 0 && trig >= 1 && k < 1) {
        const g0 = X(tk.a * SQ + push), g1 = X(a);
        x.save(); x.setLineDash([3, 3]); rr(g1, y - BH / 2 - 3 * S, g0 - g1 + (b - a) * w, BH + 6 * S, (BH + 6 * S) / 2);
        x.strokeStyle = ALERT; x.globalAlpha = .8; x.lineWidth = 1; x.stroke(); x.restore(); x.globalAlpha = 1;
        txt('STALE', X(b) + 10 * S, y + fsM * .36, 400, fsM, ALERT, .9, 'left', true);
      }
      // position courante
      rr(X(a), y - BH / 2, (b - a) * w, BH, BH / 2); x.globalAlpha = .92; x.fillStyle = TOOLS[tk.tool].c; x.fill(); x.globalAlpha = 1;
    });

    // jalon de soumission : date prévue, puis date réelle ; l'écart hachuré, l'étiquette de retard
    const last = TASKS[TASKS.length - 1], lk = ease(seg(tt, 1.6 + last.tool * CFG.lag, 2.6 + last.tool * CFG.lag));
    const x0 = X(last.b * SQ), x1 = X(last.b * SQ + push * lk), vTop = gridTop - 6 * S, vBot = bottom + 8 * S;
    x.save(); x.setLineDash([3, 4]); line(x0, vTop, x0, vBot, WHITE, .5); x.restore();
    txt('PLANNED', x0, vBot + 18 * S, 400, fsM, DIM, 1, 'center', true);
    if (lk > .03) {
      x.save(); x.beginPath(); x.rect(x0, vTop, x1 - x0, vBot - vTop); x.clip();
      for (let px = x0 - 80; px < x1 + 80; px += 7 * S) line(px, vTop, px - 70 * S, vBot, ALERT, .14);
      x.restore();
      line(x1, vTop, x1, vBot, ALERT, 1, 1.5);
      // étiquette en pastille : « SUBMISSION +N WEEKS »
      const lbl = 'SUBMISSION  +' + Math.round(CFG.slip * lk) + ' WEEKS', lw = tw(lbl, 500, fsM * 1.05, true) + 22 * S, lh = 24 * S;
      const lx = Math.min(x1 + 10 * S, W - lw - 2), ly = vBot + 6 * S;
      x.globalAlpha = lk; rr(lx, ly, lw, lh, lh / 2); x.fillStyle = 'rgba(214,163,148,.16)'; x.fill(); x.strokeStyle = ALERT; x.lineWidth = 1; x.stroke(); x.globalAlpha = 1;
      txt(lbl, lx + 11 * S, ly + lh / 2 + fsM * .38, 500, fsM * 1.05, ALERT, lk, 'left', true);
    }

    // légende d'état, avec un point de couleur
    const state = trig < 1 ? 'ONE ELIGIBILITY CRITERION CHANGES' : pending ? 'THREE TOOLS HAVE NOT RECALCULATED YET' : 'EVERY DOWNSTREAM DATE HAS MOVED';
    const sc = trig < 1 ? WHITE : pending ? ALERT : WHITE, sy = vBot + 58 * S;
    x.globalAlpha = 1; x.fillStyle = sc; x.beginPath(); x.arc(5 * S, sy - fsM * .35, 3.5 * S, 0, Math.PI * 2); x.fill();
    txt(state, 18 * S, sy, 400, fsM, sc, .9, 'left', true);
  }

  /* ---------- boucle : tourne seulement à l'écran ---------- */
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let raf = 0, last = 0, t = 0, ready = false, lastW = 0;
  function fit() {
    W = cv.clientWidth; if (!W) return;
    H = height(); cv.style.height = H + 'px';
    const dpr = Math.min(devicePixelRatio || 1, 2);
    cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr); x.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (ready) draw(reduced ? FINAL_T : t);
  }
  function frame(now) { raf = requestAnimationFrame(frame); t += Math.min((now - last) / 1000, .05); last = now; if (t > CYCLE) t = 0; draw(t); }
  function start() { if (raf || reduced) return; t = 0; last = performance.now(); raf = requestAnimationFrame(frame); }
  function stop() { cancelAnimationFrame(raf); raf = 0; }
  const ro = new ResizeObserver(() => { if (cv.clientWidth !== lastW) { lastW = cv.clientWidth; fit(); } });
  ro.observe(mount);
  let io = null;
  const fontReady = document.fonts ? Promise.race([Promise.all([document.fonts.load(`400 12px ${SANS}`), document.fonts.load(`400 12px ${MONO}`)]), new Promise(r => setTimeout(r, 3000))]) : Promise.resolve();
  fontReady.then(() => {
    ready = true; fit();
    if (reduced) return;
    io = new IntersectionObserver(([e]) => e.isIntersecting ? start() : stop(), { threshold: .25 }); io.observe(mount);
  });
  return { destroy() { stop(); ro.disconnect(); if (io) io.disconnect(); cv.remove(); delete mount.dataset.pvReady; } };
}
