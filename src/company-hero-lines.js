/* PhaseV · hero /company · Line field
   Montage : data-pv="company-hero" sur le header du hero (pas un div vide :
   le canvas doit passer sous le texte du header).
   Canvas 2D sans dépendance. Retourne destroy() pour nettoyer observers, listeners et boucle. */

/* ---------- réglages figés (validés en proto v4) ---------- */
const CONFIG = {
  pitch: 12, pitchMobile: 10,   // écart entre pistes, px
  grow: [2.6, 5],               // durée du tracé, s (easeOutExpo)
  len: [.14, .55],              // longueur d'un trait, fraction de largeur
  hold: [3, 8], gap: [.4, 3],
  calmTarget: '.header_content-left',  // bloc texte sous lequel les lignes s'effacent
  calm: .9, calmX: .75, calmY: .95,
  lensR: 130, lensK: .11,       // écartement vertical autour du curseur
  glowRx: 240, glowRy: 90,      // éclaircissement local
  follow: 9, presence: 5,       // réactivité du pointeur, 1/s
  intro: 1.2                    // fondu d'apparition, s
};
const COL = { bar: '146,138,205', resp: '120,168,224', cr: '127,232,207', cap: '199,196,226', glow: '232,230,246' };

const TAU = Math.PI * 2;
const rnd = (a, b) => a + (b - a) * Math.random(), cl = (v, a, b) => Math.max(a, Math.min(b, v));
const outExpo = v => v >= 1 ? 1 : 1 - Math.pow(2, -10 * v);

export function initCompanyHeroLines(root, opts) {
  if (!root || root.dataset.pvInit) return;
  const C = Object.assign({}, CONFIG, opts || {});
  const mq = matchMedia('(prefers-reduced-motion: reduce)');
  let reduced = mq.matches;

  /* isolation:isolate + z-index:-1 : le canvas passe sous le contenu
     non positionné de Webflow, au-dessus du fond du header. */
  const cv = document.createElement('canvas');
  cv.setAttribute('aria-hidden', 'true');
  Object.assign(cv.style, { position: 'absolute', inset: '0', width: '100%', height: '100%', zIndex: '-1', pointerEvents: 'none', display: 'block' });
  const x = cv.getContext('2d'); if (!x) return;
  root.dataset.pvInit = '1';
  const prevPos = root.style.position, prevIso = root.style.isolation;
  if (getComputedStyle(root).position === 'static') root.style.position = 'relative';
  root.style.isolation = 'isolate';
  root.prepend(cv);
  const textEl = root.querySelector(C.calmTarget);

  let W = 0, H = 0, dpr = 1, pitch = C.pitch, lanes = [], calm = null, hostTop = 0, hostLeft = 0, fade = reduced ? 1 : 0;

  /* Une piste porte un trait à la fois : il se trace, tient, se résorbe
     par la queue, puis un autre naît. Marqueurs façon swimmer plot :
     changement de teinte (réponse), second événement, carré de fin. */
  function stroke(L, prewarm) {
    L.a = rnd(-.08, .8); L.len = Math.min(rnd(C.len[0], C.len[1]), 1.08 - L.a);
    L.g = rnd(C.grow[0], C.grow[1]) * (.7 + L.len * .8); L.h = rnd(C.hold[0], C.hold[1]); L.r = L.g * .85; L.gp = rnd(C.gap[0], C.gap[1]);
    L.resp = Math.random() < .5 ? rnd(.1, .45) : -1;
    L.ev = L.resp >= 0 && Math.random() < .45 ? rnd(L.resp + .2, .92) : -1;
    L.cap = Math.random() < .55;
    L.t = prewarm ? Math.random() * (L.g + L.h + L.r + L.gp) : 0;
  }
  function layLanes() { const off = Math.round((H - (lanes.length - 1) * pitch) / 2); lanes.forEach((L, i) => L.y = off + i * pitch); }
  function build() {
    pitch = W < 700 ? C.pitchMobile : C.pitch; lanes = [];
    const n = Math.ceil(H / pitch) + 1;
    for (let i = 0; i < n; i++) { const L = { th: rnd(1.2, 3), al: rnd(.45, 1) }; stroke(L, true); lanes.push(L); }
    layLanes();
  }
  function measure() {
    const hr = root.getBoundingClientRect();
    hostTop = hr.top + scrollY; hostLeft = hr.left + scrollX;
    if (!textEl) { calm = { cx: W / 2, cy: H / 2, rx: W * .35, ry: H * .3 }; return; }
    const r = textEl.getBoundingClientRect();
    calm = { cx: r.left - hr.left + r.width / 2, cy: r.top - hr.top + r.height / 2, rx: r.width / 2, ry: r.height / 2 };
  }
  function resize() {
    const r = root.getBoundingClientRect(); if (!r.width || !r.height) return;
    dpr = Math.min(devicePixelRatio || 1, 2);
    const rebuild = !lanes.length || Math.abs(r.height - H) > 40 || (W < 700) !== (r.width < 700);
    W = r.width; H = r.height;
    cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
    x.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (rebuild) build(); else layLanes();
    measure(); draw();
  }

  /* ---------- pointeur ---------- */
  const P = { x: 0, y: 0, tx: 0, ty: 0, a: 0, in: false };
  function onMove(e) {
    P.tx = e.pageX - hostLeft; P.ty = e.pageY - hostTop;
    if (P.a < .02) { P.x = P.tx; P.y = P.ty; }   // pas de glissement depuis l'ancienne position
    P.in = true;
  }
  const onLeave = () => { P.in = false; };
  const onUp = e => { if (e.pointerType !== 'mouse') P.in = false; };
  root.addEventListener('pointermove', onMove, { passive: true });
  root.addEventListener('pointerdown', onMove, { passive: true });
  root.addEventListener('pointerleave', onLeave, { passive: true });
  root.addEventListener('pointerup', onUp, { passive: true });
  root.addEventListener('pointercancel', onLeave, { passive: true });

  /* Loupe 1D : y' = y + d·K·exp(-d²/R²), d = y - curseur.
     Monotone pour K < ~2 : les pistes s'écartent, restent droites
     et ne se croisent jamais. */
  const lensY = y => { const d = y - P.y; return y + d * C.lensK * P.a * Math.exp(-(d * d) / (C.lensR * C.lensR)); };
  const glowAt = (px, py) => P.a * Math.exp(-((px - P.x) ** 2) / (C.glowRx * C.glowRx) - ((py - P.y) ** 2) / (C.glowRy * C.glowRy));

  /* ---------- rendu ---------- */
  const calmGrad = x.createRadialGradient(0, 0, 0, 0, 0, 1);
  calmGrad.addColorStop(0, `rgba(0,0,0,${C.calm})`); calmGrad.addColorStop(.55, `rgba(0,0,0,${C.calm * .8})`); calmGrad.addColorStop(1, 'rgba(0,0,0,0)');
  function dot(px, py, r, c, a) { if (r <= .05 || a <= 0) return; x.beginPath(); x.arc(px, py, r, 0, TAU); x.fillStyle = `rgba(${c},${Math.min(1, a)})`; x.fill(); }
  const popAt = (head, f) => outExpo(cl((head - f) / .05, 0, 1));

  function draw() {
    x.clearRect(0, 0, W, H);
    const lensOn = P.a > .001;
    for (const L of lanes) {
      const g = L.g, h = L.h, r = L.r, t = L.t; let head, tail;
      if (t < g) { head = outExpo(t / g); tail = 0; }
      else if (t < g + h) { head = 1; tail = 0; }
      else if (t < g + h + r) { head = 1; tail = outExpo((t - g - h) / r); }
      else continue;
      const y = lensOn ? lensY(L.y) : L.y, th = L.th, a = fade * L.al;
      const X = f => (L.a + f * L.len) * W, xs = X(tail), xe = X(head);
      x.fillStyle = `rgba(${COL.bar},${.24 * a})`; x.fillRect(xs, y - th / 2, xe - xs, th);

      let gy = 0;
      if (lensOn) {
        gy = P.a * Math.exp(-((y - P.y) ** 2) / (C.glowRy * C.glowRy));
        if (gy > .02) {
          const g0 = P.x - C.glowRx * 1.6, g1 = P.x + C.glowRx * 1.6, a0 = Math.max(xs, g0), a1 = Math.min(xe, g1);
          if (a1 > a0) {
            const gr = x.createLinearGradient(g0, 0, g1, 0), m = (.42 * gy * a).toFixed(3);
            gr.addColorStop(0, `rgba(${COL.glow},0)`); gr.addColorStop(.5, `rgba(${COL.glow},${m})`); gr.addColorStop(1, `rgba(${COL.glow},0)`);
            x.fillStyle = gr; x.fillRect(a0, y - th / 2, a1 - a0, th);
          }
        }
      }

      const boost = px => gy > .02 ? glowAt(px, y) : 0;
      if (L.resp >= 0 && head > L.resp) { const x0 = Math.max(xs, X(L.resp)); x.fillStyle = `rgba(${COL.resp},${.3 * a})`; x.fillRect(x0, y - th / 2, xe - x0, th); }
      if (L.resp >= 0 && tail < L.resp) { const px = X(L.resp), b = boost(px); dot(px, y, (th * .6 + 1.4) * popAt(head, L.resp) * (1 + .45 * b), COL.resp, (.8 + .2 * b) * a); }
      if (L.ev >= 0 && tail < L.ev) { const px = X(L.ev), b = boost(px); dot(px, y, (th * .6 + 1.4) * popAt(head, L.ev) * (1 + .45 * b), COL.cr, (.85 + .15 * b) * a); }
      if (L.cap && t >= g && tail < .98) {
        const k = outExpo(cl((t - g) / .4, 0, 1)), b = boost(xe), s = (th + 1.6) * k * (1 + .4 * b);
        x.fillStyle = `rgba(${COL.cap},${(.5 + .35 * b) * a})`; x.fillRect(xe - s / 2, y - s / 2, s, s);
      }
    }
    // zone calme : ellipse dégradée sous le bloc texte, sans bord franc
    if (C.calm > 0 && calm) {
      const rx = Math.max(calm.rx * (1 + C.calmX), W < 700 ? W * .6 : 0), ry = calm.ry * (1 + C.calmY);
      x.save(); x.globalCompositeOperation = 'destination-out';
      x.translate(calm.cx, calm.cy); x.scale(rx, ry);
      x.fillStyle = calmGrad; x.fillRect(-1, -1, 2, 2); x.restore();
    }
  }

  /* ---------- boucle : ne tourne que visible, onglet actif, sans reduced-motion ---------- */
  let raf = 0, running = false, visible = false, last = 0, alive = true;
  function tick(now) {
    raf = requestAnimationFrame(tick);
    const dt = Math.min((now - last) / 1000, .05); last = now;
    fade = Math.min(1, fade + dt / C.intro);
    const kf = 1 - Math.exp(-dt * C.follow), kp = 1 - Math.exp(-dt * C.presence);
    P.x += (P.tx - P.x) * kf; P.y += (P.ty - P.y) * kf; P.a += ((P.in ? 1 : 0) - P.a) * kp;
    for (const L of lanes) { L.t += dt; if (L.t > L.g + L.h + L.r + L.gp) stroke(L, false); }
    draw();
  }
  function start() { if (running || reduced || !visible || document.hidden) return; running = true; last = performance.now(); raf = requestAnimationFrame(tick); }
  function stop() { if (!running) return; running = false; cancelAnimationFrame(raf); }

  const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; visible ? start() : stop(); });
  const ro = new ResizeObserver(resize);
  const onVis = () => { document.hidden ? stop() : start(); };
  const onMQ = e => { reduced = e.matches; if (reduced) { stop(); fade = 1; P.a = 0; draw(); } else start(); };
  ro.observe(root); if (textEl) ro.observe(textEl);
  io.observe(root);
  document.addEventListener('visibilitychange', onVis);
  if (mq.addEventListener) mq.addEventListener('change', onMQ);
  if (document.fonts) document.fonts.ready.then(() => { if (alive) { measure(); if (!running) draw(); } });
  resize();

  return function destroy() {
    alive = false;
    stop(); io.disconnect(); ro.disconnect();
    document.removeEventListener('visibilitychange', onVis);
    if (mq.removeEventListener) mq.removeEventListener('change', onMQ);
    root.removeEventListener('pointermove', onMove); root.removeEventListener('pointerdown', onMove);
    root.removeEventListener('pointerleave', onLeave); root.removeEventListener('pointerup', onUp);
    root.removeEventListener('pointercancel', onLeave);
    cv.remove(); root.style.position = prevPos; root.style.isolation = prevIso;
    delete root.dataset.pvInit;
  };
}
