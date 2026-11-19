/* Navigation en « île » (refonte, 2026-11-17). Structure native : composant Webflow « nav-island » (racine .pvn, data-pv="nav").
   Le texte, les liens, les produits (data-scene, data-col, data-group) et le bouton s'éditent dans le Designer ; ce module
   n'ajoute que le comportement et les états (repris du proto protos/refonte-produits/_kit/nav-island.js, validé) :
   - au scroll : fond en pilule qui apparaît derrière le contenu ; la barre se cache en descendant, revient en remontant ;
   - survol : pastille claire qui glisse d'un lien à l'autre ;
   - Platform : panneau des produits, aperçu animé du produit survolé (mini-scène ; BonV : son V) ;
   - 991 px et moins : menu plein écran, rempli à partir des liens de la barre (une seule source à éditer).
   L'ancienne nav (.navbar_component) est masquée par son style dans Webflow. Reduced motion : changements immédiats. */
import { bonvStage, CAP, seg } from './bonv-draw.js';
import { initMiniScene } from './mini-scene.js';

const COLS = [CAP[0], CAP[1], CAP[2], CAP[3], CAP[5]];   // mêmes couleurs que les mini-scènes
const OUT = 'cubic-bezier(.2,.7,.2,1)';
const INOUT = 'cubic-bezier(.45,0,.2,1)';
const EDGE = `content:'';position:absolute;inset:0;border-radius:inherit;padding:.5px;pointer-events:none;
  background:linear-gradient(150deg, rgba(248,248,248,.34) 0%, rgba(248,248,248,.08) 40%, rgba(248,248,248,.04) 75%, rgba(214,170,240,.18) 100%);
  -webkit-mask:linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;`;

/* états et transitions seulement : la mise en page de base est dans les classes Webflow (pvn-*) */
const CSS = `
html.pvn-lock, html.pvn-lock body{overflow:hidden}
.pvn{transition:transform .7s ${OUT}, opacity .5s ease}
.pvn.is-hidden{transform:translateY(-110%);opacity:0;transition:transform .5s ${INOUT}, opacity .35s ease .1s}
.pvn-bg{transform:scale(.985);transition:opacity .45s ease, transform .8s ${OUT}}
.pvn-bg::before{content:'';position:absolute;inset:0;border-radius:inherit;padding:.5px;pointer-events:none;
  background:linear-gradient(180deg, rgba(255,255,255,.14) 0%, rgba(255,255,255,.03) 50%, rgba(255,255,255,0) 100%);
  -webkit-mask:linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude}
.pvn.is-float .pvn-bg{opacity:1;transform:none}
.pvn-logo svg{display:block;width:100%;height:100%}
.pvn-link{font:inherit;transition:color .25s ease}
.pvn-link:focus-visible, .pvn.is-open .pvn-toggle, .pvn-link[aria-current="page"], .pvn-toggle.is-current{color:#f8f8f8}
/* page en cours : pastille sombre fixe, même forme que la pastille de survol (qui passe dessous) */
.pvn-link[aria-current="page"], .pvn-toggle.is-current{background-color:rgba(10,8,30,.55);box-shadow:inset 0 0 0 .5px rgba(248,248,248,.12)}
.pvn :focus-visible{outline:2px solid rgba(248,248,248,.6);outline-offset:2px}
.pvn-chev{transition:transform .4s ${OUT}}
.pvn.is-open .pvn-chev{transform:rotate(180deg)}
.pvn-hl{transform:translate(0,-50%);transition:transform .4s ${OUT}, width .4s ${OUT}, opacity .25s ease}
.pvn-cta .button{white-space:nowrap}
.pvn-panel{transform:translate(-50%,-4px);transition:opacity .2s ease, transform .3s ${OUT}, visibility 0s linear .3s}
.pvn-panel::before{content:'';position:absolute;left:0;right:0;top:-1rem;height:1rem}
.pvn.is-open .pvn-panel{opacity:1;visibility:visible;pointer-events:auto;transform:translate(-50%,0);transition:opacity .3s ease, transform .5s ${OUT}, visibility 0s}
.pvn-panel-in{isolation:isolate}
.pvn-panel-in::after{${EDGE}}
.pvn-item{transition:background-color .25s ease}
.pvn-dot{box-shadow:inset 0 0 0 1.5px var(--c, #f4f4f4);transition:background-color .25s ease}
.pvn-item.is-active{background:rgba(255,255,255,.06)}
.pvn-item.is-active .pvn-dot, .pvn-item[aria-current="page"] .pvn-dot{background:var(--c, #f4f4f4)}
.pvn-scene{position:absolute !important;left:0;top:50%;width:100%;transform:translateY(-50%);opacity:0;transition:opacity .4s ease}
.pvn-scene.is-on{opacity:1}
.pvn-prev-go{transition:transform .4s ${OUT}}
.pvn-prev:hover .pvn-prev-go{transform:translateX(3px)}
.pvn-sheet{transition:opacity .35s ease, visibility 0s linear .35s}
.pvn.is-sheet .pvn-sheet{opacity:1;visibility:visible;pointer-events:auto;transition:opacity .4s ease, visibility 0s}
.pvn-s > *{opacity:0;transform:translateY(10px);transition:opacity .3s ease, transform .5s ${OUT};transition-delay:0s}
.pvn.is-sheet .pvn-s > *{opacity:1;transform:none;transition:opacity .45s ease, transform .7s ${OUT};transition-delay:calc(var(--i) * 30ms + 100ms)}
.pvn-s-label{margin:0 0 .5rem;font-family:var(--af-mono, 'Roboto Mono', monospace);font-size:.75rem;letter-spacing:.12em;text-transform:uppercase;color:#e2c70a}
.pvn-s-prod{display:grid;grid-template-columns:auto minmax(0,1fr);align-items:center;column-gap:.875rem;padding:.625rem 0;color:#f8f8f8;text-decoration:none}
.pvn-s-prod .pvn-item-n{font-size:1.125rem}
.pvn-s-sep{height:1px;margin:1rem 0;background:rgba(248,248,248,.14)}
.pvn-s-link{display:flex;align-items:center;gap:.625rem;padding:.5rem 0;font-size:1.75rem;font-weight:300;line-height:1.2;letter-spacing:-.01em;color:#f8f8f8;text-decoration:none}
.pvn-s-link .pvn-ext{width:.875rem;height:.875rem}
.pvn-s-cta{margin-top:auto;padding-top:2rem}
.pvn-s-cta .button{width:100%}
.pvn-burger-line{transition:transform .5s ${OUT}}
@media (max-width:991px){
  .pvn.is-sheet .pvn-burger-line:first-child{transform:translateY(3.25px) rotate(45deg)}
  .pvn.is-sheet .pvn-burger-line:last-child{transform:translateY(-3.25px) rotate(-45deg)}
  .pvn.is-sheet .pvn-bg{opacity:0}
}
@media (min-width:992px){ .pvn-sheet{display:none} }
@media (prefers-reduced-motion:reduce){ .pvn, .pvn *, .pvn *::before, .pvn *::after{transition-duration:.01ms !important;transition-delay:0s !important} }`;

function injectCSS() {
  if (document.getElementById('pv-nav-css')) return;
  const s = document.createElement('style'); s.id = 'pv-nav-css'; s.textContent = CSS; document.head.appendChild(s);
}

/* aperçu BonV : son V et son anneau de points (état « réfléchit » qui revient toutes les 3 s) */
function bonvPreview(mount) {
  return bonvStage(mount, {
    aspect: () => .62, loop: 1e6, fade: Infinity, still: 1.2,
    layout(g) { g.S = Math.max(.7, Math.min(1.2, g.W / 400)); },
    draw(g, t) { g.vMark(g.W / 2, g.H / 2, g.H * .15, t, Math.sin(Math.PI * seg(t % 3, .3, 1.9)), 0, 1, true); },
  });
}

const samePage = a => {
  try { const u = new URL(a.href, location.href); return u.origin === location.origin && u.pathname.replace(/\/$/, '') === location.pathname.replace(/\/$/, ''); }
  catch (e) { return false; }
};

/* un lien sans adresse devient un vrai bouton pour le clavier et les lecteurs d'écran */
function asButton(el) {
  if (!el) return;
  el.removeAttribute('type'); el.removeAttribute('href');
  el.setAttribute('role', 'button'); el.tabIndex = 0;
  el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); el.click(); } });
}

export function initNav(root) {
  if (!root || root.dataset.pvInit) return null;
  root.dataset.pvInit = '1';
  injectCSS();
  const small = matchMedia('(max-width: 991px)');
  const inner = root.querySelector('.pvn-in'), box = root.querySelector('.pvn-links'), hl = root.querySelector('.pvn-hl');
  const toggle = root.querySelector('.pvn-toggle'), burger = root.querySelector('.pvn-burger');
  const items = [...root.querySelectorAll('.pvn-item')], stage = root.querySelector('.pvn-stage');
  const prev = root.querySelector('.pvn-prev'), prevName = root.querySelector('.pvn-prev-n');
  const sheetBox = root.querySelector('.pvn-s');
  const off = [];
  const on = (el, ev, fn, opt) => { if (!el) return; el.addEventListener(ev, fn, opt); off.push(() => el.removeEventListener(ev, fn, opt)); };
  asButton(toggle); asButton(burger);
  toggle && toggle.setAttribute('aria-expanded', 'false');

  /* page en cours, couleur de chaque produit */
  const color = el => el.dataset.col !== undefined && el.dataset.col !== '' ? COLS[+el.dataset.col % COLS.length] : '#F4F4F4';
  items.forEach(it => { it.style.setProperty('--c', color(it)); if (samePage(it)) it.setAttribute('aria-current', 'page'); });
  // Platform (bouton sans adresse) exclu : sans href, il passait pour un lien vers la page en cours sur toutes les pages
  root.querySelectorAll('.pvn-links a.pvn-link').forEach(a => { if (a !== toggle && a.hasAttribute('href') && samePage(a)) a.setAttribute('aria-current', 'page'); });
  // page produit : la page en cours est dans le panneau Platform, c'est lui qui porte la pastille
  if (toggle && items.some(it => it.getAttribute('aria-current') === 'page')) toggle.classList.add('is-current');

  /* menu plein écran : rempli à partir de la barre (produits, liens, bouton) */
  if (sheetBox && !sheetBox.children.length) {
    const label = document.createElement('div'); label.className = 'pvn-s-label'; label.textContent = (toggle ? toggle.textContent : 'Platform').trim();
    sheetBox.appendChild(label);
    let lastGroup = null;
    items.forEach(it => {
      if (lastGroup !== null && it.dataset.group !== lastGroup) { const s = document.createElement('div'); s.className = 'pvn-s-sep'; sheetBox.appendChild(s); }
      lastGroup = it.dataset.group;
      const a = it.cloneNode(true); a.className = 'pvn-s-prod'; a.querySelector('.pvn-item-q')?.remove(); sheetBox.appendChild(a);
    });
    const sep = document.createElement('div'); sep.className = 'pvn-s-sep'; sheetBox.appendChild(sep);
    root.querySelectorAll('.pvn-links a.pvn-link').forEach(l => { const a = l.cloneNode(true); a.className = 'pvn-s-link'; sheetBox.appendChild(a); });
    const ctaSrc = root.querySelector('.pvn-cta .button');
    if (ctaSrc) { const c = document.createElement('div'); c.className = 'pvn-s-cta'; c.appendChild(ctaSrc.cloneNode(true)); sheetBox.appendChild(c); }
    [...sheetBox.children].forEach((el, i) => el.style.setProperty('--i', i));
  }

  /* marges : celles du site (padding-global, largeur de container-large) */
  const bar = root.querySelector('.pvn-bar');
  const fitPad = () => {
    const pg = document.querySelector('.main-wrapper .padding-global'), ct = document.querySelector('.main-wrapper .container-large');
    if (pg && bar) { const p = getComputedStyle(pg).paddingLeft; bar.style.paddingLeft = p; bar.style.paddingRight = p; }
    if (ct && inner) { const mw = getComputedStyle(ct).maxWidth; if (mw && mw !== 'none') inner.style.maxWidth = mw; }
    if (sheetBox && pg) { const sh = root.querySelector('.pvn-sheet'); if (sh) { const p = getComputedStyle(pg).paddingLeft; sh.style.paddingLeft = p; sh.style.paddingRight = p; } }
  };
  fitPad();
  on(window, 'resize', fitPad, { passive: true });

  /* pastille de survol */
  let hlOn = false, overBox = false, open = false;
  const moveHl = el => {
    if (!hl || !box) return;
    const b = el.getBoundingClientRect(), p = box.getBoundingClientRect();
    if (!hlOn) hl.style.transition = 'none';
    hl.style.width = b.width + 'px';
    hl.style.transform = `translate(${b.left - p.left}px,-50%)`;
    if (!hlOn) { void hl.offsetWidth; hl.style.transition = ''; }
    hl.style.opacity = 1; hlOn = true;
  };
  const hideHl = () => { if (hl) hl.style.opacity = 0; hlOn = false; };
  const settleHl = () => { if (open && toggle) moveHl(toggle); else if (!overBox && !(box && box.contains(document.activeElement))) hideHl(); };
  if (box) {
    box.querySelectorAll('.pvn-link').forEach(l => {
      on(l, 'pointerenter', () => { moveHl(l); if (l !== toggle) setOpen(false); }, { passive: true });
      on(l, 'focus', () => moveHl(l));
      on(l, 'blur', () => setTimeout(settleHl, 0));
    });
    on(box, 'pointerenter', () => { overBox = true; }, { passive: true });
    on(box, 'pointerleave', () => { overBox = false; settleHl(); }, { passive: true });
  }

  /* aperçu du produit survolé */
  let curIdx = -1, scene = null, sceneEl = null;
  const show = i => {
    const it = items[i];
    if (i === curIdx || !it || !stage) return;
    curIdx = i;
    items.forEach((x, k) => x.classList.toggle('is-active', k === i));
    if (prev) prev.href = it.href;
    if (prevName) prevName.textContent = (it.querySelector('.pvn-item-n') || it).textContent.trim();
    const m = document.createElement('div'); m.className = 'pvn-scene';
    if (it.dataset.scene) { m.dataset.scene = it.dataset.scene; m.dataset.col = it.dataset.col; }
    stage.appendChild(m);
    const inst = it.dataset.scene ? initMiniScene(m) : bonvPreview(m);
    requestAnimationFrame(() => m.classList.add('is-on'));
    const oldEl = sceneEl, old = scene;
    if (oldEl) { oldEl.classList.remove('is-on'); setTimeout(() => { if (old) old.destroy(); oldEl.remove(); }, 450); }
    sceneEl = m; scene = inst;
  };
  const clearPreview = () => {
    if (scene) scene.destroy(); if (sceneEl) sceneEl.remove();
    scene = sceneEl = null; curIdx = -1; items.forEach(x => x.classList.remove('is-active'));
  };

  /* panneau Platform : survol (petit délai d'intention), clic ou clavier */
  let tOpen = 0, tClose = 0, tClear = 0, openedAt = 0;
  const defIdx = () => Math.max(0, items.findIndex(x => x.getAttribute('aria-current') === 'page'));
  function setOpen(v, focusFirst) {
    clearTimeout(tOpen); clearTimeout(tClose);
    if (!toggle || open === v) { if (v && focusFirst && items[curIdx]) items[curIdx].focus(); return; }
    open = v;
    root.classList.toggle('is-open', v);
    toggle.setAttribute('aria-expanded', v);
    clearTimeout(tClear);
    if (v) { openedAt = performance.now(); show(curIdx < 0 ? defIdx() : curIdx); moveHl(toggle); if (focusFirst && items[curIdx]) items[curIdx].focus(); }
    else { tClear = setTimeout(clearPreview, 450); settleHl(); }
  }
  if (toggle) {
    on(toggle, 'pointerenter', e => { if (e.pointerType === 'mouse') { clearTimeout(tClose); tOpen = setTimeout(() => setOpen(true), 80); } }, { passive: true });
    on(toggle, 'pointerleave', () => clearTimeout(tOpen), { passive: true });
    on(toggle, 'click', e => { if (e.detail === 0) setOpen(!open, true); else if (!open) setOpen(true); else if (performance.now() - openedAt > 450) setOpen(false); });
    on(toggle, 'keydown', e => { if (e.key === 'ArrowDown') { e.preventDefault(); setOpen(true, true); } });
    on(inner, 'pointerleave', e => { if (e.pointerType === 'mouse') tClose = setTimeout(() => setOpen(false), 200); }, { passive: true });
    on(inner, 'pointerenter', () => clearTimeout(tClose), { passive: true });
    items.forEach((it, i) => {
      on(it, 'pointerenter', () => show(i), { passive: true });
      on(it, 'focus', () => show(i));
      on(it, 'keydown', e => {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); items[(i + (e.key === 'ArrowDown' ? 1 : items.length - 1)) % items.length].focus(); }
      });
    });
    on(root, 'focusout', e => { if (open && !inner.contains(e.relatedTarget)) setOpen(false); });
    on(document, 'pointerdown', e => { if (open && !inner.contains(e.target)) setOpen(false); }, { passive: true });
  }

  /* menu plein écran */
  let sheet = false;
  function setSheet(v) {
    if (sheet === v || !burger) return;
    sheet = v;
    root.classList.toggle('is-sheet', v);
    burger.setAttribute('aria-expanded', v);
    document.documentElement.classList.toggle('pvn-lock', v);
    if (window.lenis) v ? window.lenis.stop() : window.lenis.start();
    if (v) setHidden(false);
  }
  on(burger, 'click', () => setSheet(!sheet));
  if (sheetBox) sheetBox.querySelectorAll('a').forEach(a => on(a, 'click', () => setSheet(false)));
  on(small, 'change', () => { setOpen(false); setSheet(false); fitPad(); });
  on(document, 'keydown', e => {
    if (e.key !== 'Escape') return;
    if (open) { setOpen(false); toggle.focus(); }
    if (sheet) { setSheet(false); burger.focus(); }
  });

  /* scroll : fond de l'île au-delà de 24 px (retiré sous 8 px) ; cachée après 48 px de descente (au-delà de 240 px), revient après 24 px de remontée */
  let lastY = window.scrollY, run = 0, hidden = false, float = false;
  // --nav-h : hauteur occupée par la nav (0 quand elle est cachée), lue par les éléments collants du site ; l'ancienne nav la fournissait
  const setNavH = () => document.documentElement.style.setProperty('--nav-h', (hidden || !inner ? 0 : Math.round(inner.getBoundingClientRect().bottom)) + 'px');
  function setHidden(v) {
    if (hidden === v) return; hidden = v; root.classList.toggle('is-hidden', v);
    document.documentElement.classList.toggle('nav-hidden', v);
    setNavH();
    if (v) { setOpen(false); hideHl(); }
  }
  setNavH();
  on(window, 'resize', setNavH, { passive: true });
  const onScroll = () => {
    const y = window.scrollY;
    if (!float && y > 24) { float = true; root.classList.add('is-float'); }
    else if (float && y < 8) { float = false; root.classList.remove('is-float'); }
    const d = y - lastY; lastY = y;
    if (!d) return;
    run = Math.sign(d) === Math.sign(run) ? run + d : d;
    if (run > 48 && y > 240 && !open && !sheet) setHidden(true);
    else if (run < -24 || y < 120) setHidden(false);
  };
  on(window, 'scroll', onScroll, { passive: true });
  onScroll();

  return function destroy() {
    off.forEach(f => f()); clearTimeout(tOpen); clearTimeout(tClose); clearTimeout(tClear);
    clearPreview(); setSheet(false);
    root.classList.remove('is-open', 'is-float', 'is-hidden', 'is-sheet');
    toggle && toggle.classList.remove('is-current');
    delete root.dataset.pvInit;
  };
}
