/* Hero homepage : la séquence validée dans l'atelier (hero-lab), en boucle de 26,75 s.
   Blob avec son noyau → délitement et plan → dézoom, montagnes et orbite → retour au blob.
   Reprend tels quels le moteur et le programme unique de l'atelier (hero-lab/engine.js, hero-lab/scenes/sequence.js) :
   même rendu, aucun raccord entre programmes, donc aucun saut. La caméra suit les trajectoires des scènes figées.
   Grand, ancré à droite, passe sous la colonne de texte en s'estompant. Pause hors écran ; image fixe si l'animation est réduite.
   Monté dans <div data-pv="hero-sequence"></div>. */
import { createEngine, COMMON } from './engine.js';
import blob from './scenes/blob.js';
import plane from './scenes/plane.js';
import land from './scenes/land.js';
import evap from './scenes/evap.js';
import sequence from './scenes/sequence.js';

const SEL = '[data-pv="hero-sequence"]';
const CSS = `
.header_image-wrapper:has(${SEL}){ background:none!important; border:0!important; box-shadow:none!important; position:relative; overflow:visible!important; min-height:30rem; }
.header_component:has(${SEL}), .header_content:has(${SEL}){ position:relative; }
.header_content:has(${SEL}) .header_content-left{ position:relative; z-index:2; }
/* très grand, ancré à droite, passe sous la colonne de texte ; s'estompe côté texte */
${SEL}{ position:absolute; top:-16%; bottom:-16%; right:-6%; width:95vw; z-index:0; pointer-events:none;
  -webkit-mask-image:linear-gradient(90deg, transparent 2%, rgba(0,0,0,.4) 24%, #000 46%); mask-image:linear-gradient(90deg, transparent 2%, rgba(0,0,0,.4) 24%, #000 46%); }
${SEL} canvas{ position:absolute; inset:0; width:100%; height:100%; display:block; }
@media (max-width:991px){
  .section_header:has(${SEL}){ height:auto; min-height:100svh; display:flex; flex-direction:column; justify-content:center; overflow-x:clip; }
  .header_component:has(${SEL}), .header_component:has(${SEL}) .header_content{ height:auto; }
  ${SEL}{ position:relative; top:auto; bottom:auto; right:auto; width:100vw; margin-left:calc(50% - 50vw); aspect-ratio:1/1; margin-top:1rem; -webkit-mask-image:none; mask-image:none; }
  /* l'animation descend jusqu'au bas de l'écran : elle prend toute la hauteur laissée par le texte, sans marge dessous */
  .section_header:has(${SEL}){ justify-content:flex-start; }
  .section_header:has(${SEL}) > .padding-global{ flex:1 0 auto; display:flex; flex-direction:column; padding-bottom:0; }
  .section_header:has(${SEL}) > .padding-global > .container-large{ flex:1 0 auto; display:flex; flex-direction:column; width:100%; }
  .header_component:has(${SEL}){ flex:1 0 auto; display:flex; flex-direction:column; }
  ${SEL}{ flex:1 0 auto; aspect-ratio:auto; min-height:100vw; }
}`;

// la chronologie : chaque scène figée, avec ses valeurs et sa trajectoire de caméra
const defaults = sc => ({
  ...Object.fromEntries(Object.entries(COMMON).map(([k, d]) => [k, sc.camera && k in sc.camera ? sc.camera[k] : d.value])),
  ...Object.fromEntries(Object.entries(sc.params).map(([k, d]) => [k, d.value])),
});
const SEGS = []; {
  let at = 0;
  [blob, plane, land, evap].forEach(sc => { SEGS.push({ sc, at, end: sc.duration, v: defaults(sc) }); at += sc.duration; });
}
const LOOP = sequence.duration;
const SMALL_ZOOM = 1.5;   // mobile : la scène est réglée pour le grand écran, elle paraissait petite dans le carré
const STILL_T = SEGS[2].at + 7.5;   // image fixe (animation réduite) : le paysage, pendant l'orbite

export function initHeroSequence(root) {
  if (root.dataset.pvReady) return;
  root.dataset.pvReady = '1';
  if (!document.getElementById('pv-hero-seq-css')) { const s = document.createElement('style'); s.id = 'pv-hero-seq-css'; s.textContent = CSS; document.head.appendChild(s); }
  const cv = document.createElement('canvas');
  cv.setAttribute('aria-hidden', 'true');
  root.appendChild(cv);

  let engine;
  try { engine = createEngine(cv); engine.useScene(sequence); }
  catch (e) { cv.remove(); delete root.dataset.pvReady; return; }   // pas de WebGL2 : le hero reste sans animation

  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let small = false;
  function draw(T) {
    const s = SEGS.find(x => T < x.at + x.end) || SEGS[SEGS.length - 1];
    const t = Math.min(T - s.at, s.end);
    const v = s.sc.cameraAt ? { ...s.v, ...s.sc.cameraAt(t, s.v) } : s.v;
    // petit écran (bloc sous le texte) : scène recentrée et agrandie, moitié moins de particules
    const vv = small ? { ...v, shift: 0, zoom: v.zoom * SMALL_ZOOM } : v;
    engine.render(T, vv, s.v.count * (small ? .5 : 1));
  }

  function resize() {
    small = root.getBoundingClientRect().width < 900;
    engine.resize();
    if (reduced) draw(STILL_T);
  }

  let raf = 0, time = 0, last = 0;
  function loop(now) {
    raf = requestAnimationFrame(loop);
    time += Math.min((now - last) / 1000, .05); last = now;
    draw(time % LOOP);
  }
  function start() { if (raf || reduced) return; last = performance.now(); raf = requestAnimationFrame(loop); }
  function stop() { cancelAnimationFrame(raf); raf = 0; }
  cv.addEventListener('webglcontextlost', e => { e.preventDefault(); stop(); });

  const ro = new ResizeObserver(resize); ro.observe(root); resize();
  let io = null;
  if (!reduced) { io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop())); io.observe(root); }
  return { destroy() { stop(); ro.disconnect(); if (io) io.disconnect(); cv.remove(); delete root.dataset.pvReady; } };
}
