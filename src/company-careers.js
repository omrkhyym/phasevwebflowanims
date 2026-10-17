/* PhaseV · Careers · populations qui fusionnent
   Montage : <div data-pv="company-careers"></div> vide dans Webflow.
   Le module crée le canvas et dimensionne le conteneur lui-même.
   Retourne destroy() pour nettoyer observers et boucle. */
export function initCareersPopulations(root) {
  if (!root || root.dataset.pvInit) return;
  root.dataset.pvInit = '1';

  root.style.position = 'relative';
  root.style.width = '100%';
  root.style.aspectRatio = '4 / 3';
  const cv = document.createElement('canvas');
  cv.setAttribute('aria-hidden', 'true');
  cv.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block';
  root.appendChild(cv);
  const ctx = cv.getContext('2d');

  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const TAU = Math.PI * 2, N = 900, G = 3, PER = N / G;
  const COL = ['146,138,205', '120,168,224', '127,232,207']; // mauve, bleu, turquoise. Pas de jaune : réservé à la décision.
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const seg = (t, a, b) => clamp((t - a) / (b - a), 0, 1);
  const inOut = x => x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
  const rng = s => () => {
    s |= 0; s = s + 0x6D2B79F5 | 0;
    let t = Math.imul(s ^ s >>> 15, 1 | s);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
  const R = rng(7);

  /* État A : trois populations séparées en triangle.
     État B : un seul nuage où les trois couleurs sont mélangées. */
  const A = [], CR = .15, ORB = .27;
  for (let g = 0; g < G; g++) {
    const ang = -Math.PI / 2 + g * TAU / G, cx0 = Math.cos(ang) * ORB, cy0 = Math.sin(ang) * ORB * .95 + .02;
    for (let j = 0; j < PER; j++) {
      const rr = CR * Math.sqrt((j + .5) / PER), a = j * 2.39996;
      A.push({ g, x: cx0 + Math.cos(a) * rr, y: cy0 + Math.sin(a) * rr });
    }
  }
  const slots = [];
  for (let j = 0; j < N; j++) {
    const rr = .36 * Math.sqrt((j + .5) / N), a = j * 2.39996;
    slots.push([Math.cos(a) * rr, Math.sin(a) * rr * .92]);
  }
  // le mélange aléatoire des positions est ce qui fait lire « fusion »
  for (let i = N - 1; i > 0; i--) { const k = Math.floor(R() * (i + 1)); [slots[i], slots[k]] = [slots[k], slots[i]]; }

  /* Tri départ et arrivée par x avant appariement, sinon la transition part en chaos */
  const P = [];
  for (let g = 0; g < G; g++) {
    const a = A.filter(p => p.g === g).sort((u, v) => u.x - v.x || u.y - v.y);
    const b = slots.slice(g * PER, (g + 1) * PER).sort((u, v) => u[0] - v[0] || u[1] - v[1]);
    for (let j = 0; j < PER; j++) {
      P.push({
        g, ax: a[j].x, ay: a[j].y, bx: b[j][0], by: b[j][1],
        z: R() * 2 - 1,                        // profondeur : taille, opacité, parallaxe
        d: R() * .45 + (a[j].x + .45) * .25,   // retard : la fusion se propage de gauche à droite
        ph: R() * TAU
      });
    }
  }
  let EX = 0, EY = 0;
  for (const p of P) {
    EX = Math.max(EX, Math.abs(p.ax), Math.abs(p.bx));
    EY = Math.max(EY, Math.abs(p.ay), Math.abs(p.by));
  }

  let W = 0, H = 0;
  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2), r = root.getBoundingClientRect();
    W = r.width; H = r.height;
    cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  const ro = new ResizeObserver(resize); ro.observe(root); resize();

  const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
  const onMove = e => {
    const r = root.getBoundingClientRect();
    mouse.tx = clamp((e.clientX - r.left) / r.width - .5, -1, 1);
    mouse.ty = clamp((e.clientY - r.top) / r.height - .5, -1, 1);
  };
  window.addEventListener('pointermove', onMove, { passive: true });

  /* Cycle : tenue séparée, fusion, tenue fusionnée, séparation */
  const T_MERGE = 1.8, DUR = 1.5, T_HOLD = 2.4,
        T_SPLIT = T_MERGE + DUR + .7 + T_HOLD, PERIOD = T_SPLIT + DUR + .7 + 1.6;

  function frame(t) {
    ctx.clearRect(0, 0, W, H);
    const S = Math.min(W / (EX * 2 * 1.12), H / (EY * 2 * 1.12)), cx = W / 2, cy = H / 2;
    const u = reduced ? T_MERGE + DUR + 1.2 : (t % PERIOD);
    mouse.x += (mouse.tx - mouse.x) * .06; mouse.y += (mouse.ty - mouse.y) * .06;
    const px = reduced ? 0 : mouse.x, py = reduced ? 0 : mouse.y;
    for (let g = 0; g < G; g++) {
      ctx.fillStyle = 'rgb(' + COL[g] + ')';
      for (let i = g * PER; i < (g + 1) * PER; i++) {
        const p = P[i];
        const m = inOut(seg(u, T_MERGE + p.d, T_MERGE + p.d + DUR)) - inOut(seg(u, T_SPLIT + p.d, T_SPLIT + p.d + DUR));
        let x = p.ax + (p.bx - p.ax) * m, y = p.ay + (p.by - p.ay) * m;
        // léger tourbillon pendant le trajet, nul aux deux extrémités
        const sw = Math.sin(Math.PI * m) * .05;
        x += -(p.by - p.ay) * sw * 1.2; y += (p.bx - p.ax) * sw * 1.2;
        if (!reduced) { x += .0025 * Math.sin(t * 1.1 + p.ph); y += .0025 * Math.cos(t * .9 + p.ph * 1.3); }
        x += p.z * (.03 * px + .008 * Math.sin(t * .3)); y += p.z * (.022 * py);
        const depth = (p.z + 1) / 2, rad = (1.05 + depth * 1.25) * (W > 600 ? 1 : .8);
        ctx.globalAlpha = .42 + depth * .5;
        ctx.beginPath(); ctx.arc(cx + x * S, cy + y * S, rad, 0, TAU); ctx.fill();
      }
    }
    ctx.globalAlpha = 1;
  }

  let visible = true, last = performance.now(), time = 0, raf = 0;
  const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
  io.observe(root);
  const loop = now => {
    raf = requestAnimationFrame(loop);
    const dt = Math.min((now - last) / 1000, .05); last = now;
    if (!visible) return;
    time += dt; frame(time);
  };
  raf = requestAnimationFrame(loop);

  return function destroy() {
    cancelAnimationFrame(raf); ro.disconnect(); io.disconnect();
    window.removeEventListener('pointermove', onMove);
    cv.remove(); delete root.dataset.pvInit;
  };
}
