/* Hub plateforme : onglets générés depuis les panneaux Webflow + nuage de particules qui morphe.
   Webflow fournit :
   - <div data-pv="platform-tabs"></div>   → reçoit les onglets
   - <div data-pv="platform-hub"></div>    → reçoit le canvas
   - #dm-panels > .dm-panel[data-panel]    → le contenu, éditable dans Webflow
   Aucun texte dans ce fichier : question et nom de module sont lus dans chaque panneau. */

/* Clé du panneau (prop "target" dans Webflow) → forme du nuage */
const SHAPES = { pursue: 'frontier', benefits: 'split', run: 'enroll', design: 'fan', connect: 'conductor' };

const CSS = `
[data-pv="platform-tabs"]{ display:grid; grid-template-columns:repeat(5,minmax(0,1fr));
  border-top:1px solid #2A2450; margin:18px 0 52px; }
@media (max-width:1040px){ [data-pv="platform-tabs"]{ grid-template-columns:repeat(3,minmax(0,1fr)); } }
@media (max-width:640px){ [data-pv="platform-tabs"]{ grid-template-columns:repeat(2,minmax(0,1fr)); } }
.pv-tab{ appearance:none; text-align:left; cursor:pointer; width:100%; padding:20px 18px 20px 0;
  border:0; border-top:1px solid transparent; margin-top:-1px; border-radius:0; background:transparent;
  color:inherit; font:inherit; transition:border-color .3s ease; }
.pv-tab_q{ display:block; font-size:11px; line-height:1.4; letter-spacing:.08em; text-transform:uppercase;
  color:#8F8CB5; margin-bottom:8px; min-height:2.8em; transition:color .3s ease; }
.pv-tab_n{ display:block; font-size:16px; letter-spacing:-.01em; color:#8B87B4; transition:color .3s ease; }
.pv-tab:hover .pv-tab_n{ color:#F4F4F4; }
.pv-tab[aria-selected="true"]{ border-top-color:#E2C70A; }
.pv-tab[aria-selected="true"] .pv-tab_q{ color:#E2C70A; }
.pv-tab[aria-selected="true"] .pv-tab_n{ color:#F4F4F4; }
.pv-tab:focus-visible{ outline:2px solid #E2C70A; outline-offset:-2px; }

[data-pv="platform-hub"]{ position:relative; min-height:440px; }
[data-pv="platform-hub"] canvas{ position:absolute; inset:-6% -14%; width:128%; height:112%; pointer-events:none; }
@media (max-width:900px){ [data-pv="platform-hub"]{ min-height:320px; } }

/* les panneaux non actifs restent cachés même si le CSS de la page change */
#dm-panels .dm-panel:not(.is-active){ display:none; }
#dm-panels .dm-panel.is-active{ animation:pvPanelIn .35s ease both; }
@keyframes pvPanelIn{ from{ opacity:0; transform:translateY(10px); } to{ opacity:1; transform:none; } }
@media (prefers-reduced-motion:reduce){ #dm-panels .dm-panel.is-active{ animation:none; } .pv-tab, .pv-tab *{ transition:none; } }`;

function injectCSS() {
  if (document.getElementById('pv-hub-css')) return;
  const s = document.createElement('style');
  s.id = 'pv-hub-css';
  s.textContent = CSS;
  document.head.appendChild(s);
}

/* ---------- nuage : génération des formes ---------- */
const N = 1000, TAU = Math.PI * 2;
const YEL = [226, 199, 10], MAU = [146, 138, 205], BLU = [120, 168, 224], TEA = [127, 232, 207];
const ORDER = ['frontier', 'split', 'enroll', 'fan', 'conductor'];

function rng(s) { return () => { s |= 0; s = s + 0x6D2B79F5 | 0; let t = Math.imul(s ^ s >>> 15, 1 | s); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
const ease = v => v < .5 ? 4 * v * v * v : 1 - Math.pow(-2 * v + 2, 3) / 2;

function build(kind) {
  // graine propre à chaque forme : le rendu ne dépend pas de l'ordre des clics
  const R = rng(21 + ORDER.indexOf(kind));
  const gauss = () => Math.sqrt(-2 * Math.log(R() + 1e-9)) * Math.cos(TAU * R());
  const P = [];

  if (kind === 'frontier') {
    /* actifs candidats, ceux qui bordent la frontière efficiente en jaune */
    for (let i = 0; i < N; i++) {
      const u = R(), v = R();
      const front = -.30 + .52 * Math.pow(u, .55);
      const py = front - Math.pow(v, 1.25) * .58;
      const onFront = v < .035 && u > .12;
      P.push([-.42 + u * .84, Math.max(-.36, Math.min(.34, py)), onFront ? YEL : MAU, onFront ? 1 : v * 2 - 1]);
    }
  } else if (kind === 'split') {
    /* répondeurs / non-répondeurs, séparés par un couloir vide */
    const GAP = .09;
    for (let i = 0; i < N; i++) {
      const resp = i % 100 < 42, cy = resp ? -GAP - .13 : GAP + .13;
      const a = R() * TAU, r = Math.pow(R(), .62) * (resp ? .20 : .23);
      P.push([Math.cos(a) * r * 1.55, cy + Math.sin(a) * r * .9, resp ? YEL : MAU, resp ? 1 : R() * 2 - 1]);
    }
  } else if (kind === 'enroll') {
    /* plan vs simulation d'enrôlement cumulé, sites activés en escalier */
    const CURVE = Math.round(N * .34), SIM = Math.round(N * .34), STEP = N - CURVE - SIM;
    for (let j = 0; j < CURVE; j++) { const u = j / (CURVE - 1); P.push([-.42 + u * .84, .30 - .52 / (1 + Math.exp(-(u - .46) / .155)), YEL, 1]); }
    for (let j = 0; j < SIM; j++) { const u = j / (SIM - 1); P.push([-.42 + u * .84, .30 - .40 / (1 + Math.exp(-(u - .58) / .185)), MAU, .1]); }
    const sites = 13, per = Math.max(1, Math.round(STEP / sites));
    for (let s = 0; s < sites; s++) {
      const u0 = s / sites, y = .34 - s * .006;
      for (let j = 0; j < per; j++) P.push([-.42 + (u0 + (j / per) * (1 / sites)) * .84, y, BLU, -.7]);
    }
  } else if (kind === 'fan') {
    /* fan de simulations, une trajectoire retenue */
    const lines = 26, per = Math.ceil(N / lines);
    for (let i = 0; i < lines; i++) {
      const b = i === 0 ? 0 : gauss(), f = 2 + R() * 4, ph = R() * TAU, z = i / (lines - 1) * 2 - 1;
      for (let j = 0; j < per; j++) {
        const u = j / (per - 1), dev = u * (.15 * b + .1 * Math.sin(f * u + ph));
        P.push([-.43 + u * .86, Math.max(-.34, Math.min(.34, (.18 * u - .07) + dev)), i === 0 ? YEL : MAU, i === 0 ? 1 : z]);
      }
    }
  } else {
    /* cœur central + six nœuds reliés ; le battement est animé dans draw() */
    const HUBN = Math.round(N * .17), NODES = 6, LINKN = Math.round(N * .46);
    for (let j = 0; j < HUBN; j++) { const rr = .062 * Math.sqrt((j + .5) / HUBN), a = j * 2.39996; P.push([Math.cos(a) * rr, Math.sin(a) * rr, YEL, 1]); }
    const perLink = Math.round(LINKN / NODES), perNode = Math.round((N - HUBN - perLink * NODES) / NODES);
    for (let n = 0; n < NODES; n++) {
      const ang = -Math.PI / 2 + n * (TAU / NODES), ex = Math.cos(ang) * .33, ey = Math.sin(ang) * .33;
      for (let j = 0; j < perLink; j++) { const u = .16 + (j / perLink) * .84; P.push([ex * u, ey * u, MAU, 1 - u * 1.4]); }
      for (let j = 0; j < perNode; j++) { const rr = .045 * Math.sqrt((j + .5) / perNode), a = j * 2.39996; P.push([ex + Math.cos(a) * rr, ey + Math.sin(a) * rr, n % 2 ? BLU : TEA, -.2]); }
    }
  }

  while (P.length < N) P.push(P[P.length - 1] || [0, 0, MAU, 0]);
  P.length = N;
  return normalize(P).sort((a, b) => a[0] - b[0] || a[1] - b[1]);
}

/* Recadrage sur l'étendue réelle, scale uniforme, bornes au quantile 1/99 */
const BOX_W = .88, BOX_H = .68, Q = .01;
function quant(arr, q) { const v = [...arr].sort((a, b) => a - b); return v[Math.max(0, Math.min(v.length - 1, Math.round(q * (v.length - 1))))]; }
function normalize(P) {
  const xs = P.map(p => p[0]), ys = P.map(p => p[1]);
  const x0 = quant(xs, Q), x1 = quant(xs, 1 - Q), y0 = quant(ys, Q), y1 = quant(ys, 1 - Q);
  const k = Math.min(BOX_W / Math.max(x1 - x0, 1e-6), BOX_H / Math.max(y1 - y0, 1e-6));
  const cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
  return P.map(p => [(p[0] - cx) * k, (p[1] - cy) * k, p[2], p[3]]);
}

/* ============================================================ */
export function initPlatformHub(mount) {
  if (mount.dataset.pvReady) return;
  const section = mount.closest('section') || document;
  const tabsHost = section.querySelector('[data-pv="platform-tabs"]');
  const panelsWrap = section.querySelector('#dm-panels');
  const panels = panelsWrap ? [...panelsWrap.querySelectorAll('.dm-panel[data-panel]')] : [];
  if (!tabsHost || !panels.length) return;
  mount.dataset.pvReady = '1';
  injectCSS();

  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const txt = (el, sel) => (el.querySelector(sel)?.textContent || '').trim();

  /* ---------- onglets, construits depuis le contenu Webflow ---------- */
  const items = panels.map((panel, i) => {
    const key = panel.getAttribute('data-panel');
    const tab = document.createElement('button');
    tab.type = 'button';
    tab.className = 'pv-tab';
    tab.id = 'pv-tab-' + key;
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-selected', 'false');
    tab.tabIndex = -1;
    const q = document.createElement('span'); q.className = 'pv-tab_q'; q.textContent = txt(panel, '.dm-panel_title-wrapper .text-size-label');
    const n = document.createElement('span'); n.className = 'pv-tab_n'; n.textContent = txt(panel, '.dm-panel_title');
    tab.append(q, n);
    if (!panel.id) panel.id = 'pv-panel-' + key;
    tab.setAttribute('aria-controls', panel.id);
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-labelledby', tab.id);
    tab.addEventListener('click', () => select(i));
    return { key, tab, panel };
  });
  tabsHost.replaceChildren(...items.map(it => it.tab));
  tabsHost.setAttribute('role', 'tablist');

  // clavier : flèches, Début, Fin
  tabsHost.addEventListener('keydown', e => {
    const n = items.length;
    const map = { ArrowRight: sel + 1, ArrowDown: sel + 1, ArrowLeft: sel - 1, ArrowUp: sel - 1, Home: 0, End: n - 1 };
    if (!(e.key in map)) return;
    e.preventDefault();
    const i = (map[e.key] + n) % n;
    select(i);
    items[i].tab.focus();
  });

  /* ---------- nuage ---------- */
  const cv = document.createElement('canvas');
  cv.setAttribute('aria-hidden', 'true');
  mount.appendChild(cv);
  const x = cv.getContext('2d');

  const CACHE = {}; const get = k => CACHE[k] || (CACHE[k] = build(k));
  let from, to, k = 1, t = 0, W = 0, H = 0, mx = 0, my = 0, curKind = '';

  function snapshot() {
    const e = ease(k), out = new Array(N);
    for (let i = 0; i < N; i++) {
      const a = from[i], b = to[i];
      out[i] = [a[0] + (b[0] - a[0]) * e, a[1] + (b[1] - a[1]) * e, e < .5 ? a[2] : b[2], a[3] + (b[3] - a[3]) * e];
    }
    return out;
  }
  function morphTo(kind, instant) {
    const target = get(kind);
    if (!from || instant || reduced) { from = to = target; k = 1; }
    else { from = snapshot(); to = target; k = 0; }
    curKind = kind;
    if (!running) draw();
  }

  function fit() {
    const r = cv.getBoundingClientRect(), dp = Math.min(devicePixelRatio || 1, 2);
    W = r.width; H = r.height; cv.width = Math.round(W * dp); cv.height = Math.round(H * dp);
    x.setTransform(dp, 0, 0, dp, 0, 0);
    if (!running && from) draw();
  }

  function draw() {
    x.clearRect(0, 0, W, H);
    const e = ease(k), S = Math.min(W, H) * 1.18, cx = W / 2, cy = H / 2;
    const drift = reduced ? 0 : Math.sin(t * .4) * .009;
    const pulse = curKind === 'conductor' && k >= 1 && !reduced;

    for (let i = 0; i < N; i++) {
      const a = from[i], b = to[i];
      const z = a[3] + (b[3] - a[3]) * e;
      const px = a[0] + (b[0] - a[0]) * e + (mx * .024 + drift) * z;
      const py = a[1] + (b[1] - a[1]) * e + (my * .018) * z;
      const c = e < .5 ? a[2] : b[2];
      const depth = (z + 1) / 2;
      let rad = .95 + depth * .95;
      let alpha = c === YEL ? .96 : .3 + depth * .36;

      /* Conductor : le cœur se dilate, puis l'impulsion remonte les liens vers les nœuds */
      if (pulse) {
        const r = Math.hypot(px, py);
        if (r < .075) {
          const beat = Math.pow(Math.max(0, Math.sin(t * 1.9)), 6);
          rad *= 1 + beat * .85; alpha = Math.min(1, alpha + beat * .2);
        } else {
          const u = Math.min(1, (r - .075) / .30), d = Math.abs(u - (t * .42) % 1);
          const hit = d < .13 ? 1 - d / .13 : 0;
          rad *= 1 + hit * .9; alpha = Math.min(1, alpha + hit * .55);
        }
      }
      x.beginPath();
      x.arc(cx + px * S, cy + py * S, rad, 0, TAU);
      x.fillStyle = `rgba(${c[0]},${c[1]},${c[2]},${alpha.toFixed(3)})`;
      x.fill();
    }
  }

  /* ---------- sélection ---------- */
  let sel = -1;
  function select(i, instant) {
    if (i === sel) return;
    sel = i;
    items.forEach((it, j) => {
      const on = j === i;
      it.tab.setAttribute('aria-selected', on ? 'true' : 'false');
      it.tab.tabIndex = on ? 0 : -1;
      it.panel.classList.toggle('is-active', on);
    });
    morphTo(SHAPES[items[i].key] || 'fan', instant);
  }

  /* ---------- boucle : seulement quand le bloc est à l'écran ---------- */
  let raf = 0, running = false, last = 0;
  function frame(now) {
    raf = requestAnimationFrame(frame);
    const dt = Math.min((now - last) / 1000, .05); last = now;
    if (k < 1) k = Math.min(1, k + dt / 1.15);
    t += dt;
    draw();
  }
  function start() { if (running || reduced) return; running = true; last = performance.now(); raf = requestAnimationFrame(frame); }
  function stop() { cancelAnimationFrame(raf); running = false; }

  // parallaxe : écoutée sur la section, le canvas ne capte pas la souris
  if (!reduced) section.addEventListener('pointermove', e => {
    const r = cv.getBoundingClientRect();
    mx = ((e.clientX - r.left) / r.width - .5) * 2; my = ((e.clientY - r.top) / r.height - .5) * 2;
  });

  new ResizeObserver(fit).observe(cv);
  fit();

  // panneau de départ : celui déjà actif dans Webflow s'il y en a un, sinon le premier
  const initial = Math.max(0, panels.findIndex(p => p.classList.contains('is-active')));
  select(initial, true);

  if (!reduced) new IntersectionObserver(([e]) => e.isIntersecting ? start() : stop()).observe(mount);
}
