/* PhaseV · socle des heros produit à deux modes
   Deux points de montage dans le header du hero :
   - <div data-pv="<nom>-hero-bg"></div>, premier enfant du header : fond plein cadre au-dessus de 991 px ;
   - <div data-pv="<nom>-hero-slot"></div>, dernier enfant de la grille header_content : bloc 4:3 sous les boutons à 991 px et moins.
   Un seul canvas, une seule boucle : le canvas passe d'un emplacement à l'autre au changement de breakpoint.
   Sans slot sur la page, l'animation reste en fond à toutes les tailles.
   Le module d'animation ne fournit que son dessin : draw(stage, t). */

const TAU = Math.PI * 2;
export const cl = v => Math.max(0, Math.min(1, v));
export const seg = (t, a, b) => cl((t - a) / (b - a));
export const ease = v => v < .5 ? 4 * v * v * v : 1 - Math.pow(-2 * v + 2, 3) / 2;
export const smooth = (a, b, v) => { const k = cl((v - a) / (b - a)); return k * k * (3 - 2 * k); };
export function rng(s) { return () => { s |= 0; s = s + 0x6D2B79F5 | 0; let t = Math.imul(s ^ s >>> 15, 1 | s); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
export const rgba = (c, a) => `rgba(${c[0]},${c[1]},${c[2]},${Math.max(0, Math.min(1, a)).toFixed(3)})`;
export { TAU };

/* CSS ciblé sur le header et sur nos divs : aucune classe Webflow n'est modifiée. */
function injectCSS(name) {
  const id = `pv-${name}-hero-css`;
  if (document.getElementById(id)) return;
  const SEL = `[data-pv="${name}-hero-bg"]`, SLOT = `[data-pv="${name}-hero-slot"]`;
  const s = document.createElement('style');
  s.id = id;
  s.textContent = `
:has(> ${SEL}){ position:relative; overflow:hidden; }
:has(> ${SEL}) > :not(${SEL}){ position:relative; z-index:1; }
${SEL}{ position:absolute; inset:0; z-index:0; pointer-events:none; }
${SEL} canvas, ${SLOT} canvas{ position:absolute; inset:0; width:100%; height:100%; display:block; }
${SLOT}{ display:none; }
@media (max-width:991px){
  :has(> ${SEL}):has(${SLOT}) > ${SEL}{ display:none; }
  ${SLOT}{ display:block; position:relative; width:100%; aspect-ratio:4/3; pointer-events:none; }
}`;
  document.head.appendChild(s);
}

/**
 * name     : préfixe des data-pv (« clinops » → clinops-hero-bg / clinops-hero-slot)
 * draw     : (stage, t) => void, dessine une frame
 * still    : instant affiché en reduced motion
 * onResize : (stage) => void, optionnel, appelé après chaque recalcul de taille
 * stage    : { ctx, W, H, flow, mobile, reduce, mouse:{x,y}, fade(px) }
 *   flow   : true en mode bloc (slot actif), false en mode fond
 *   mouse  : position lissée du pointeur, de -.5 à .5, nulle en mode bloc et en reduced motion
 *   fade   : opacité côté texte en mode fond, 1 en mode bloc
 */
export function mountHeroStage(root, { name, draw, still = 0, onResize }) {
  if (!root || root.dataset.pvInit) return;
  const cv = document.createElement('canvas');
  cv.setAttribute('aria-hidden', 'true');
  const ctx = cv.getContext('2d'); if (!ctx) return;
  root.dataset.pvInit = '1';
  injectCSS(name);

  const header = root.parentElement || document.body;
  const slot = header.querySelector(`[data-pv="${name}-hero-slot"]`);
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mqFlow = matchMedia('(max-width: 991px)');

  const target = { x: 0, y: 0 };
  const stage = {
    ctx, W: 0, H: 0, flow: false, mobile: false, reduce, mouse: { x: 0, y: 0 },
    // atténuation côté texte : la colonne de gauche reste lisible en mode fond
    fade(px) { return this.flow ? 1 : this.mobile ? .55 : .22 + .78 * smooth(this.W * .22, this.W * .62, px); }
  };
  let host = null;

  function render(t) {
    const k = stage.flow || reduce ? 0 : .05;
    stage.mouse.x += ((stage.flow || reduce ? 0 : target.x) - stage.mouse.x) * (k || 1);
    stage.mouse.y += ((stage.flow || reduce ? 0 : target.y) - stage.mouse.y) * (k || 1);
    draw(stage, t);
  }

  function fit() {
    if (!host) return;
    const r = host.getBoundingClientRect(); if (!r.width || !r.height) return;
    const d = Math.min(devicePixelRatio || 1, 2);
    stage.W = r.width; stage.H = r.height;
    cv.width = Math.round(stage.W * d); cv.height = Math.round(stage.H * d); ctx.setTransform(d, 0, 0, d, 0, 0);
    stage.mobile = stage.W < 900;
    if (onResize) onResize(stage);
    if (reduce) render(still);
  }

  /* La souris est écoutée sur le header, le canvas reste en pointer-events:none. */
  const onMove = e => {
    const r = cv.getBoundingClientRect(); if (!r.width) return;
    target.x = (e.clientX - r.left) / r.width - .5; target.y = (e.clientY - r.top) / r.height - .5;
  };
  header.addEventListener('pointermove', onMove, { passive: true });

  /* ---------- boucle unique : ne tourne que visible, onglet actif, sans reduced-motion ---------- */
  let raf = 0, running = false, visible = false, t = 0, last = 0;
  function loop(now) {
    raf = requestAnimationFrame(loop);
    const dt = Math.min((now - last) / 1000, .05); last = now;
    t += dt; render(t);
  }
  function start() { if (running || reduce || !visible || document.hidden) return; running = true; last = performance.now(); raf = requestAnimationFrame(loop); }
  function stop() { if (!running) return; running = false; cancelAnimationFrame(raf); }

  const ro = new ResizeObserver(fit);
  const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; visible ? start() : stop(); });

  /* Place l'unique canvas dans l'emplacement du mode courant, et y rebranche les observers. */
  function place() {
    const next = mqFlow.matches && slot ? slot : root;
    if (next === host) return;
    host = next;
    stage.flow = host === slot;
    host.appendChild(cv);
    ro.disconnect(); ro.observe(host);
    io.disconnect(); io.observe(host);
    fit();
  }
  const onMQ = () => place();
  if (mqFlow.addEventListener) mqFlow.addEventListener('change', onMQ); else mqFlow.addListener(onMQ);
  const onVis = () => { document.hidden ? stop() : start(); };
  document.addEventListener('visibilitychange', onVis);
  place();

  return function destroy() {
    stop(); io.disconnect(); ro.disconnect();
    if (mqFlow.removeEventListener) mqFlow.removeEventListener('change', onMQ); else mqFlow.removeListener(onMQ);
    document.removeEventListener('visibilitychange', onVis);
    header.removeEventListener('pointermove', onMove);
    cv.remove(); delete root.dataset.pvInit;
  };
}
