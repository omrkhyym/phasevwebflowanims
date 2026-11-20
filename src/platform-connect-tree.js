/* Bloc « plateforme connectée » des pages produit, version « carte et rangée » (proto validé :
   protos/site/phasev-platform-connect-v6-protos.html, variante I1). Remplace src/platform-connect-cards.js.
   Même contrat de montage : <div data-pv="platform-connect-v2" data-current="trial"></div>, dans le diptyque
   (texte dans Webflow à gauche, ce montage à droite). Les noms des produits sont surchargeables sur le montage :
   data-name-clinops="ClinOps Optimizer", etc.
   Rendu : panneau sombre ; le produit de la page en carte, les quatre autres en vignettes dessous (mini-scènes allégées,
   src/mini-scene-lite.js) ; fils fins au repos ; un échange à la fois : un point de la couleur du produit voyage,
   la vignette qui envoie se soulève, celle qui reçoit prend un liseré de sa couleur.
   Montage étroit (moins de 560 px) : carte en pleine largeur, vignettes en 2 × 2, fil par une colonne centrale. */
import { initMiniScene } from './mini-scene-lite.js';
import { CAP } from './bonv-draw.js';

const P = {
  portfolio: { name: 'Portfolio Optimizer', scene: 'rank', col: 0 },
  response:  { name: 'Response Optimizer', scene: 'split', col: 3 },
  trial:     { name: 'Trial Optimizer', scene: 'curve', col: 1 },
  clinops:   { name: 'ClinOps Optimizer', scene: 'sites', col: 2 },
  conductor: { name: 'AI Conductor', scene: 'doc', col: 4 },
};
const ORDER = ['portfolio', 'response', 'trial', 'clinops', 'conductor'];   // ordre du développement
const COLS = [CAP[0], CAP[1], CAP[2], CAP[3], CAP[5]];                      // couleurs des mini-scènes
const EV = [[1, 0], [0, 3], [2, 0], [0, 4], [3, 0], [0, 1], [4, 0], [0, 2]]; // [de, vers] ; 0 = produit de la page
const GAP = 2.6, TRAVEL = 1.1, START = 1.2;
const REST = 'rgba(248,248,248,.16)';
const NS = 'http://www.w3.org/2000/svg';
const ease = v => v < .5 ? 4 * v * v * v : 1 - Math.pow(-2 * v + 2, 3) / 2;

const EDGE = `content:'';position:absolute;inset:0;border-radius:inherit;padding:.5px;pointer-events:none;
  background:linear-gradient(150deg, rgba(248,248,248,.32) 0%, rgba(248,248,248,.07) 40%, rgba(248,248,248,.03) 75%, rgba(214,170,240,.14) 100%);
  -webkit-mask:linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;`;
const CSS = `
.pv-pct{position:relative;isolation:isolate;width:100%;padding:2.25rem;border-radius:1.5rem;
  background:radial-gradient(60% 55% at 88% 6%, rgba(108,105,209,.52), rgba(108,105,209,0) 70%),
    radial-gradient(55% 60% at 22% 70%, rgba(96,62,152,.46), rgba(96,62,152,0) 70%), radial-gradient(90% 90% at 50% 45%, #281d60, #181344 85%)}
.pv-pct::before{${EDGE}}
.pv-pct.is-compact{padding:1.25rem}
.pv-pct-stage{position:relative;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:1rem;row-gap:3.5rem}
.pv-pct.is-compact .pv-pct-stage{grid-template-columns:repeat(2,minmax(0,1fr));column-gap:2rem;row-gap:1.75rem}
.pv-pct-wires{position:absolute;inset:0;width:100%;height:100%;overflow:visible;pointer-events:none;z-index:0}
.pv-pct-it{position:relative;isolation:isolate;z-index:1;grid-row:2;transition:transform .5s cubic-bezier(.2,.7,.2,1)}
.pv-pct.is-compact .pv-pct-it{grid-row:auto}
.pv-pct-it.is-main{grid-column:2 / span 2;grid-row:1;padding:.625rem;border-radius:1.125rem;
  background:radial-gradient(120% 60% at 15% 0%, rgba(255,255,255,.06), rgba(255,255,255,0) 60%), linear-gradient(155deg, rgba(150,110,200,.2) 0%, rgba(90,60,150,.16) 50%, rgba(40,24,80,.34) 100%)}
.pv-pct.is-compact .pv-pct-it.is-main{grid-column:1 / -1;margin-bottom:1rem}
.pv-pct-it.is-main::before{${EDGE}z-index:2}
.pv-pct-viz{position:relative;border-radius:.75rem;overflow:hidden;background:rgba(13,9,38,.55)}
.pv-pct-viz::after{${EDGE}z-index:2;transition:padding .3s ease, background .3s ease}
.pv-pct-it.is-main .pv-pct-viz{border-radius:.625rem}
.pv-pct-it.is-main .pv-pct-viz::after{display:none}
.pv-pct-viz > div{position:relative;z-index:1;width:100%}
.pv-pct-name{margin:.5rem 0 0;font-family:var(--pv-pct-mono, 'Roboto Mono', ui-monospace, monospace);font-size:.6875rem;line-height:1.3;
  font-weight:400;letter-spacing:.08em;text-transform:uppercase;color:rgba(248,248,248,.72)}
.pv-pct-it.is-main .pv-pct-name{margin:.625rem .25rem .125rem;font-size:.75rem;color:#f8f8f8}
.pv-pct-it.is-on{transform:translateY(-3px)}
.pv-pct-it.is-on .pv-pct-viz::after, .pv-pct-it.is-hit .pv-pct-viz::after{padding:1.5px;background:var(--c)}
.pv-pct-it.is-main.is-hit{box-shadow:inset 0 0 0 1.5px var(--c)}
@media (prefers-reduced-motion:reduce){.pv-pct-it{transition:none}}`;

function injectCSS() {
  if (document.getElementById('pv-pct-css')) return;
  const s = document.createElement('style'); s.id = 'pv-pct-css'; s.textContent = CSS; document.head.appendChild(s);
}

export function initPlatformConnectTree(mount) {
  if (!mount || mount.dataset.pvReady) return null;
  const cur = mount.dataset.current;
  if (!P[cur]) { console.warn('[pv] platform-connect : data-current manquant ou inconnu (' + cur + '), attendu ' + ORDER.join(' | ')); return null; }
  mount.dataset.pvReady = '1';
  injectCSS();
  mount.style.width = '100%';

  const name = k => mount.dataset['name' + k[0].toUpperCase() + k.slice(1)] || P[k].name;
  const keys = [cur, ...ORDER.filter(k => k !== cur)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // police mono : celle des étiquettes du site
  const section = mount.closest('section') || document.body, label = section.querySelector('.text-size-label');
  const wrap = document.createElement('div'); wrap.className = 'pv-pct';
  if (label) wrap.style.setProperty('--pv-pct-mono', getComputedStyle(label).fontFamily);
  wrap.setAttribute('role', 'img');
  wrap.setAttribute('aria-label', `PhaseV platform: ${name(cur)}, connected to ${keys.slice(1).map(name).join(', ')}.`);
  const stage = document.createElement('div'); stage.className = 'pv-pct-stage';
  const svg = document.createElementNS(NS, 'svg'); svg.setAttribute('class', 'pv-pct-wires'); svg.setAttribute('aria-hidden', 'true');
  stage.appendChild(svg); wrap.appendChild(stage); mount.appendChild(wrap);

  const cards = keys.map((k, i) => {
    const d = P[k], el = document.createElement('div');
    el.className = 'pv-pct-it' + (i ? '' : ' is-main');
    el.style.setProperty('--c', COLS[d.col]);
    el.innerHTML = `<div class="pv-pct-viz"><div data-scene="${d.scene}" data-col="${d.col}"></div></div><div class="pv-pct-name"></div>`;
    el.querySelector('.pv-pct-name').textContent = name(k);
    stage.appendChild(el); return el;
  });
  const scenes = cards.map(c => initMiniScene(c.querySelector('[data-scene]')));

  /* fils : arbre (bus sous la carte) ou, en étroit, colonne centrale entre les vignettes */
  let paths = {}, dot = null;
  function wires() {
    wrap.classList.toggle('is-compact', mount.clientWidth < 560);
    const R = stage.getBoundingClientRect();
    svg.setAttribute('viewBox', `0 0 ${R.width} ${R.height}`); svg.innerHTML = ''; paths = {};
    const box = el => { const b = el.getBoundingClientRect(), v = el.querySelector('.pv-pct-viz').getBoundingClientRect();
      return { l: b.left - R.left, r: b.right - R.left, t: b.top - R.top, b: b.bottom - R.top, cx: (b.left + b.right) / 2 - R.left, vy: (v.top + v.bottom) / 2 - R.top }; };
    const add = (d, id) => { const p = document.createElementNS(NS, 'path'); p.setAttribute('d', d); p.setAttribute('fill', 'none');
      p.setAttribute('stroke', REST); p.setAttribute('stroke-width', '1'); p.setAttribute('stroke-linecap', 'round'); svg.appendChild(p); paths[id] = p; };
    const B = cards.map(box), c0 = B[0];
    if (wrap.classList.contains('is-compact')) {
      add(`M${c0.cx},${c0.b} L${c0.cx},${c0.b + 8}`, 'stem');
      for (let i = 1; i < 5; i++) { const b = B[i], edge = b.cx < c0.cx ? b.r : b.l; add(`M${edge},${b.vy} L${c0.cx},${b.vy} L${c0.cx},${c0.b + 8}`, i); }
    } else {
      const bus = (c0.b + Math.min(...B.slice(1).map(b => b.t))) / 2;
      add(`M${c0.cx},${c0.b} L${c0.cx},${bus}`, 'stem');
      for (let i = 1; i < 5; i++) { const b = B[i]; add(`M${b.cx},${b.t} L${b.cx},${bus} L${c0.cx},${bus}`, i); }
    }
    dot = document.createElementNS(NS, 'circle'); dot.setAttribute('r', '4'); dot.style.opacity = 0; svg.appendChild(dot);
  }

  // trajet d'un échange : la branche de la vignette, puis le tronc jusqu'à la carte (ou l'inverse)
  function route(from, to) {
    const sat = from || to, seq = from ? [[paths[sat], true], [paths.stem, false]] : [[paths.stem, true], [paths[sat], false]];
    const lens = seq.map(([p]) => p.getTotalLength()), tot = lens[0] + lens[1];
    return { ids: [paths[sat], paths.stem], at(u) {
      let s = u * tot;
      for (let k = 0; k < 2; k++) { const [p, fwd] = seq[k]; if (s <= lens[k] || k === 1) { const f = Math.min(s, lens[k]); return p.getPointAtLength(fwd ? f : lens[k] - f); } s -= lens[k]; }
    } };
  }

  let raf = 0, clock = 0, last = 0;
  function frame(now) {
    raf = requestAnimationFrame(frame);
    clock += Math.min((now - last) / 1000, .05); last = now;
    if (!dot || !paths.stem) return;
    const t = clock - START; if (t < 0) return;
    const i = Math.floor(t / GAP) % EV.length, ph = (t % GAP) / GAP, [from, to] = EV[i];
    const u = Math.min(1, ph * GAP / TRAVEL), r = route(from, to), at = r.at(ease(u)), col = COLS[P[keys[from]].col];
    dot.setAttribute('cx', at.x); dot.setAttribute('cy', at.y); dot.setAttribute('fill', col);
    dot.style.opacity = u > 0 && u < 1 ? 1 : 0;
    cards.forEach((c, k) => { c.classList.toggle('is-on', k === from && u < 1); c.classList.toggle('is-hit', k === to && u >= 1 && ph < .85); });
    // le trajet de l'échange se colore pendant le voyage, puis revient au repos
    const k = u < 1 ? Math.min(1, u * 6) : Math.max(0, 1 - (ph - TRAVEL / GAP) / .2);
    Object.values(paths).forEach(p => { p.setAttribute('stroke', REST); p.style.opacity = 1; });
    if (k > 0) r.ids.forEach(p => { p.setAttribute('stroke', col); p.style.opacity = k * .85; });
  }
  const start = () => { if (raf || reduced) return; last = performance.now(); raf = requestAnimationFrame(frame); };
  const stop = () => { cancelAnimationFrame(raf); raf = 0; };

  const ro = new ResizeObserver(wires); ro.observe(mount);
  const io = new IntersectionObserver(([e]) => e.isIntersecting ? start() : stop(), { threshold: .2 });
  io.observe(mount);
  wires();

  return {
    destroy() {
      stop(); ro.disconnect(); io.disconnect();
      scenes.forEach(s => s && s.destroy && s.destroy());
      wrap.remove(); delete mount.dataset.pvReady;
    }
  };
}
