/* PhaseV · navigation en « île » (proto, 2026-11-17, v2)
   Le contenu vient de la nav Webflow (logo, menu Platform, liens, bouton) : le module la lit, construit sa propre barre et masque l'originale.
   - Le contenu de la barre ne bouge jamais : logo et bouton calés sur les marges du site (padding-global + container-large, lues sur la page).
   - En haut de page : barre transparente, posée sur le hero.
   - Au scroll : un fond en pilule sombre apparaît derrière le contenu (fondu, sans changement de taille du contenu) ;
     la barre se cache en descendant, revient en remontant (avec une marge de tolérance, pour ne pas clignoter).
   - Survol : une pastille claire glisse d'un lien à l'autre (même geste que les filtres de Case Studies et Resources).
   - Platform : panneau en verre sombre ; à gauche les produits (ordre du parcours, question en mono), à droite l'aperçu
     du produit survolé (mini-scène des cartes plateforme de la Home ; BonV : son V et son anneau).
   - 991 px et moins : bouton menu, menu plein écran (produits, liens, bouton), entrées en décalé.
   Données lues sur les liens du menu Platform : data-af-q (question), data-af-scene, data-af-col (mini-scène), data-af-group (1 ou 2).
   Courbes douces, sans dépassement. Reduced motion : changements immédiats. Montage : initNavIsland(document.querySelector('.navbar_component')). */
import { bonvStage, CAP, seg } from './bonv-draw.js';
import { initMiniScene } from './mini-scene.js';

const COLS = [CAP[0], CAP[1], CAP[2], CAP[3], CAP[5]];   // mêmes couleurs que les mini-scènes
const OUT = 'cubic-bezier(.2,.7,.2,1)';                  // sortie douce, sans dépassement
const INOUT = 'cubic-bezier(.45,0,.2,1)';
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const CHEV = '<svg class="pvn-chev" viewBox="0 0 10 10" aria-hidden="true"><path d="M2 3.75 5 6.75 8 3.75" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const ARROW = '<svg class="pvn-arrow" viewBox="0 0 12 12" aria-hidden="true"><path d="M2 6h8M6.5 2.5 10 6l-3.5 3.5" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const EXT = '<svg class="pvn-ext" viewBox="0 0 12 12" aria-hidden="true"><path d="M4 2.5h5.5V8M9.5 2.5 3 9" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const EDGE = `content:'';position:absolute;inset:0;border-radius:inherit;padding:.5px;pointer-events:none;
  background:linear-gradient(150deg, rgba(248,248,248,.34) 0%, rgba(248,248,248,.08) 40%, rgba(248,248,248,.04) 75%, rgba(214,170,240,.18) 100%);
  -webkit-mask:linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;`;

function injectCSS() {
  if (document.getElementById('pvn-css')) return;
  const s = document.createElement('style'); s.id = 'pvn-css';
  s.textContent = `
html.pvn-on .navbar_component{display:none !important}
html.pvn-lock, html.pvn-lock body{overflow:hidden}
.pvn{position:fixed;inset:0 0 auto;z-index:1000;pointer-events:none;font-family:var(--af-font, Roboto, Arial, sans-serif);color:#f8f8f8;
  transition:transform .7s ${OUT}, opacity .5s ease}
.pvn.is-hidden{transform:translateY(-110%);opacity:0;transition:transform .5s ${INOUT}, opacity .35s ease .1s}
.pvn-bar{box-sizing:border-box;padding:.625rem var(--pvn-pad, 2.5rem) 0}   /* marge haute : l'île se pose à un peu plus d'1 rem du bord */
@media (max-width:991px){ .pvn-bar{padding-top:.375rem} }
.pvn-in{pointer-events:auto;position:relative;display:flex;align-items:center;gap:2rem;max-width:var(--pvn-max, 90rem);min-height:5.25rem;margin:0 auto}
/* fond de l'île : il apparaît derrière le contenu, sans le déplacer ; plus large que le contenu, pour l'air autour du logo et du bouton */
/* même matière que le panneau Platform : opaque, dégradé violet, reflet doux en haut à gauche ; bord presque invisible
   (essais rejetés le 2026-11-17 : verre translucide flouté, effet « creusé ») */
.pvn-bg{position:absolute;z-index:-1;inset:.5rem -1.5rem;border-radius:999px;opacity:0;transform:scale(.985);pointer-events:none;
  background:radial-gradient(60% 140% at 12% 0%, rgba(255,255,255,.07), rgba(255,255,255,0) 60%),
    var(--af-dark-panel, #1f1856);
  transition:opacity .45s ease, transform .8s ${OUT}}
.pvn-bg::before{content:'';position:absolute;inset:0;border-radius:inherit;padding:.5px;pointer-events:none;
  background:linear-gradient(180deg, rgba(255,255,255,.14) 0%, rgba(255,255,255,.03) 50%, rgba(255,255,255,0) 100%);
  -webkit-mask:linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude}
.pvn.is-float .pvn-bg{opacity:1;transform:none}
.pvn-logo{display:block;flex:none;width:9rem;height:1.5rem;color:#f8f8f8}
.pvn-logo svg{display:block;width:100%;height:100%}
.pvn-links{position:relative;flex:1;display:flex;justify-content:center;align-items:center;gap:.125rem}
.pvn-link{position:relative;z-index:1;display:inline-flex;align-items:center;gap:.375rem;margin:0;padding:.5625rem .9375rem;border:0;border-radius:999px;background:none;
  font:inherit;font-size:.9375rem;font-weight:400;line-height:1.2;color:rgba(248,248,248,.76);text-decoration:none;white-space:nowrap;cursor:pointer;transition:color .25s ease}
.pvn-link:hover, .pvn-link:focus-visible, .pvn.is-open .pvn-toggle, .pvn-link[aria-current="page"]{color:#f8f8f8}
.pvn-link[aria-current="page"]::after{content:'';position:absolute;left:50%;bottom:.1rem;width:3px;height:3px;border-radius:50%;background:#928acd;transform:translateX(-50%)}
.pvn :focus-visible{outline:2px solid rgba(248,248,248,.6);outline-offset:2px}
.pvn-chev{width:.625rem;height:.625rem;transition:transform .4s ${OUT}}
.pvn.is-open .pvn-chev{transform:rotate(180deg)}
.pvn-ext{width:.625rem;height:.625rem;opacity:.55}
.pvn-hl{position:absolute;left:0;top:50%;width:0;height:2.375rem;border-radius:999px;background:rgba(255,255,255,.08);opacity:0;pointer-events:none;
  transform:translate(0,-50%);transition:transform .4s ${OUT}, width .4s ${OUT}, opacity .25s ease}
.pvn-cta{flex:none;display:flex}
.pvn-cta .button{white-space:nowrap}
.pvn-burger{display:none}
/* panneau Platform */
.pvn-panel{position:absolute;top:calc(100% + .125rem);left:50%;width:min(56rem, calc(100vw - 2rem));opacity:0;visibility:hidden;pointer-events:none;
  transform:translate(-50%,-4px);transition:opacity .2s ease, transform .3s ${OUT}, visibility 0s linear .3s}
.pvn-panel::before{content:'';position:absolute;left:0;right:0;top:-1rem;height:1rem}
.pvn.is-open .pvn-panel{opacity:1;visibility:visible;pointer-events:auto;transform:translate(-50%,0);transition:opacity .3s ease, transform .5s ${OUT}, visibility 0s}
.pvn-panel-in{position:relative;isolation:isolate;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.05fr);gap:.75rem;padding:.75rem;border-radius:1.5rem;
  background:radial-gradient(120% 70% at 12% 0%, rgba(255,255,255,.07), rgba(255,255,255,0) 55%), var(--af-dark-panel, #1f1856)}
.pvn-panel-in::after{${EDGE}}
.pvn-list{display:flex;flex-direction:column;gap:.125rem;padding:.125rem 0}
.pvn-item{display:grid;grid-template-columns:auto minmax(0,1fr) auto;align-items:center;column-gap:.875rem;padding:.8125rem 1rem;border-radius:1rem;
  color:#f8f8f8;text-decoration:none;transition:background-color .25s ease}
.pvn-dot{width:.625rem;height:.625rem;border-radius:50%;box-shadow:inset 0 0 0 1.5px var(--c);transition:background-color .25s ease}
.pvn-item-t{display:flex;flex-direction:column;gap:.3rem;min-width:0}
.pvn-item-n{font-size:1rem;font-weight:400;line-height:1.2}
.pvn-item-q{font-family:var(--af-mono, 'Roboto Mono', monospace);font-size:.6875rem;letter-spacing:.08em;text-transform:uppercase;line-height:1.35;color:rgba(248,248,248,.5)}
.pvn-arrow{width:.75rem;height:.75rem}
.pvn-item .pvn-arrow{opacity:0;transform:translateX(-4px);color:rgba(248,248,248,.75);transition:opacity .25s ease, transform .4s ${OUT}}
.pvn-item.is-active{background:rgba(255,255,255,.06)}
.pvn-item.is-active .pvn-dot{background:var(--c)}
.pvn-item.is-active .pvn-arrow{opacity:1;transform:none}
.pvn-sep{height:1px;margin:.375rem 1rem;background:rgba(248,248,248,.1)}
.pvn-prev{position:relative;display:flex;flex-direction:column;min-height:100%;border-radius:1rem;overflow:hidden;background:rgba(13,9,38,.55);color:#f8f8f8;text-decoration:none}
.pvn-stage{position:relative;flex:1;min-height:12rem}
.pvn-scene{position:absolute !important;left:0;top:50%;width:100%;transform:translateY(-50%);opacity:0;transition:opacity .4s ease}
.pvn-scene.is-on{opacity:1}
.pvn-prev-cap{display:flex;justify-content:space-between;align-items:center;gap:1rem;padding:.875rem 1.25rem 1rem;border-top:1px solid rgba(248,248,248,.08);font-size:.9375rem}
.pvn-prev-cap .pvn-arrow{transition:transform .4s ${OUT}}
.pvn-prev:hover .pvn-prev-cap .pvn-arrow{transform:translateX(3px)}
/* menu plein écran (991 px et moins) */
.pvn-sheet{position:fixed;inset:0;z-index:-2;display:flex;flex-direction:column;box-sizing:border-box;padding:6.5rem var(--pvn-pad, 1.5rem) 2rem;overflow:auto;opacity:0;visibility:hidden;pointer-events:none;
  background:var(--af-dark-bg, #1b1448);
  transition:opacity .35s ease, visibility 0s linear .35s}
.pvn.is-sheet .pvn-sheet{opacity:1;visibility:visible;pointer-events:auto;transition:opacity .4s ease, visibility 0s}
.pvn-s{display:flex;flex-direction:column;gap:.25rem;width:100%;max-width:36rem;margin:0 auto;flex:1}
.pvn-s > *{opacity:0;transform:translateY(10px);transition:opacity .3s ease, transform .5s ${OUT};transition-delay:0s}
.pvn.is-sheet .pvn-s > *{opacity:1;transform:none;transition:opacity .45s ease, transform .7s ${OUT};transition-delay:calc(var(--i) * 30ms + 100ms)}
.pvn-s-label{margin:0 0 .5rem;font-family:var(--af-mono, 'Roboto Mono', monospace);font-size:.75rem;letter-spacing:.12em;text-transform:uppercase;color:var(--_colors---primary--yellow, #e1c721)}
.pvn-s-prod{display:grid;grid-template-columns:auto minmax(0,1fr);align-items:center;column-gap:.875rem;padding:.625rem 0;color:#f8f8f8;text-decoration:none}
.pvn-s-prod .pvn-item-n{font-size:1.125rem}
.pvn-s-prod[aria-current="page"] .pvn-dot{background:var(--c)}
.pvn-s-sep{height:1px;margin:1rem 0;background:rgba(248,248,248,.14)}
.pvn-s-link{display:flex;align-items:center;gap:.625rem;padding:.5rem 0;font-size:1.75rem;font-weight:300;line-height:1.2;letter-spacing:-.01em;color:#f8f8f8;text-decoration:none}
.pvn-s-link .pvn-ext{width:.875rem;height:.875rem}
.pvn-s-cta{margin-top:auto;padding-top:2rem}
.pvn-s-cta .button{width:100%}
@media (max-width:991px){
  .pvn-links, .pvn-cta, .pvn-panel{display:none}
  .pvn-in{min-height:4.5rem}
  .pvn-bg{inset:.375rem -.75rem}
  .pvn-burger{display:inline-flex;flex-direction:column;justify-content:center;align-items:center;gap:5px;flex:none;margin-left:auto;width:2.75rem;height:2.75rem;padding:0;
    border:0;border-radius:50%;background:rgba(255,255,255,.08);cursor:pointer}
  .pvn-burger span{display:block;width:1.125rem;height:1.5px;border-radius:2px;background:#f8f8f8;transition:transform .5s ${OUT}}
  .pvn.is-sheet .pvn-burger span:first-child{transform:translateY(3.25px) rotate(45deg)}
  .pvn.is-sheet .pvn-burger span:last-child{transform:translateY(-3.25px) rotate(-45deg)}
  .pvn.is-sheet .pvn-bg{opacity:0}
}
@media (min-width:992px){ .pvn-sheet{display:none} }
@media (prefers-reduced-motion:reduce){ .pvn, .pvn *, .pvn *::before, .pvn *::after{transition-duration:.01ms !important;transition-delay:0s !important} }`;
  document.head.appendChild(s);
}

/* aperçu BonV : son V et son anneau de points (état « réfléchit » qui revient toutes les 3 s) */
function bonvPreview(mount) {
  return bonvStage(mount, {
    aspect: () => .62, loop: 1e6, fade: Infinity, still: 1.2,
    layout(g) { g.S = Math.max(.7, Math.min(1.2, g.W / 400)); },
    draw(g, t) { g.vMark(g.W / 2, g.H / 2, g.H * .15, t, Math.sin(Math.PI * seg(t % 3, .3, 1.9)), 0, 1, true); },
  });
}

export function initNavIsland(wf) {
  if (!wf || wf.dataset.pvInit) return null;
  wf.dataset.pvInit = '1';
  injectCSS();
  const small = matchMedia('(max-width: 991px)');

  /* contenu lu dans la nav Webflow */
  const logoA = wf.querySelector('.navbar_logo-link');
  const dd = wf.querySelector('.navbar_menu-dropdown');
  const ddLabel = ((dd && dd.querySelector('.navbar_dropdwn-toggle .text-block') || {}).textContent || 'Platform').trim();
  const cur = a => a.classList.contains('w--current') || a.getAttribute('aria-current') === 'page';
  const products = dd ? [...dd.querySelectorAll('.navbar_dropdown-link')].map(a => ({
    name: a.textContent.trim(), href: a.href, q: a.dataset.afQ || '', scene: a.dataset.afScene || '',
    col: a.dataset.afCol || '', group: a.dataset.afGroup || '1', current: cur(a),
  })) : [];
  const links = [...wf.querySelectorAll('.navbar_menu > a.navbar_link')].map(a => ({
    text: a.textContent.trim(), href: a.href, ext: a.target === '_blank', current: cur(a),
    attrs: (a.hasAttribute('data-new') ? ' data-new' : '') + (a.hasAttribute('data-proposed') ? ' data-proposed' : ''),
  }));
  const cta = wf.querySelector('.navbar_menu .button');
  const color = p => p.col !== '' ? COLS[+p.col % COLS.length] : '#F4F4F4';

  const itemHTML = (p, i, cls) => `<a class="${cls}" href="${esc(p.href)}" data-i="${i}" style="--c:${color(p)}"${p.current ? ' aria-current="page"' : ''}>
      <span class="pvn-dot" aria-hidden="true"></span><span class="pvn-item-t"><span class="pvn-item-n">${esc(p.name)}</span>${p.q ? `<span class="pvn-item-q">${esc(p.q)}</span>` : ''}</span>${cls === 'pvn-item' ? ARROW : ''}</a>`;
  const withSep = (cls, sep) => products.map((p, i) => (i && p.group !== products[i - 1].group ? sep : '') + itemHTML(p, i, cls)).join('');
  const linkHTML = (l, cls) => `<a class="${cls}" href="${esc(l.href)}"${l.ext ? ' target="_blank" rel="noopener"' : ''}${l.current ? ' aria-current="page"' : ''}${l.attrs}>${esc(l.text)}${l.ext ? EXT : ''}</a>`;

  const root = document.createElement('div');
  root.className = 'pvn';
  root.innerHTML = `
  <div class="pvn-bar"><div class="pvn-in">
    <span class="pvn-bg" aria-hidden="true"></span>
    <a class="pvn-logo" href="${esc(logoA ? logoA.href : '/')}" aria-label="PhaseV">${logoA && logoA.querySelector('svg') ? logoA.querySelector('svg').outerHTML : ''}</a>
    <nav class="pvn-links" aria-label="Main">
      <span class="pvn-hl" aria-hidden="true"></span>
      ${products.length ? `<button class="pvn-link pvn-toggle" type="button" aria-expanded="false" aria-controls="pvn-panel">${esc(ddLabel)}${CHEV}</button>` : ''}
      ${links.map(l => linkHTML(l, 'pvn-link')).join('')}
    </nav>
    <div class="pvn-cta"></div>
    <button class="pvn-burger" type="button" aria-expanded="false" aria-controls="pvn-sheet" aria-label="Menu"><span></span><span></span></button>
    <div class="pvn-panel" id="pvn-panel">
      <div class="pvn-panel-in">
        <div class="pvn-list">${withSep('pvn-item', '<div class="pvn-sep" aria-hidden="true"></div>')}</div>
        <a class="pvn-prev" href="#" tabindex="-1" aria-hidden="true"><div class="pvn-stage"></div><span class="pvn-prev-cap"><span class="pvn-prev-n"></span>${ARROW}</span></a>
      </div>
    </div>
  </div></div>
  <div class="pvn-sheet" id="pvn-sheet">
    <div class="pvn-s">
      <div class="pvn-s-label">${esc(ddLabel)}</div>
      ${withSep('pvn-s-prod', '<div class="pvn-s-sep" aria-hidden="true"></div>')}
      <div class="pvn-s-sep" aria-hidden="true"></div>
      ${links.map(l => linkHTML(l, 'pvn-s-link')).join('')}
      <div class="pvn-s-cta"></div>
    </div>
  </div>`;
  document.body.appendChild(root);
  if (cta) {
    root.querySelector('.pvn-s-cta').appendChild(cta.cloneNode(true));
    root.querySelector('.pvn-cta').appendChild(cta);   // le vrai bouton (et son animation de survol) passe dans la barre
  }
  root.querySelectorAll('.pvn-s > *').forEach((el, i) => el.style.setProperty('--i', i));
  document.documentElement.classList.add('pvn-on');

  const inner = root.querySelector('.pvn-in'), box = root.querySelector('.pvn-links'), hl = root.querySelector('.pvn-hl');
  const toggle = root.querySelector('.pvn-toggle');
  const items = [...root.querySelectorAll('.pvn-item')], stage = root.querySelector('.pvn-stage');
  const prev = root.querySelector('.pvn-prev'), prevName = root.querySelector('.pvn-prev-n');
  const burger = root.querySelector('.pvn-burger');
  const off = [];   // listeners à retirer dans destroy()
  const on = (el, ev, fn, opt) => { el.addEventListener(ev, fn, opt); off.push(() => el.removeEventListener(ev, fn, opt)); };

  /* marges : celles du site (padding-global, largeur de container-large), relues au redimensionnement */
  const fitPad = () => {
    const pg = document.querySelector('.main-wrapper .padding-global'), ct = document.querySelector('.main-wrapper .container-large');
    if (pg) root.style.setProperty('--pvn-pad', getComputedStyle(pg).paddingLeft);
    if (ct) { const mw = getComputedStyle(ct).maxWidth; if (mw && mw !== 'none') root.style.setProperty('--pvn-max', mw); }
  };
  fitPad();
  on(window, 'resize', fitPad, { passive: true });

  /* pastille de survol : elle glisse d'un lien à l'autre ; au premier survol elle apparaît en place, sans glisser.
     Elle reste sur Platform tant que son panneau est ouvert, et s'efface dès que rien n'est survolé ni ouvert */
  let hlOn = false, overBox = false;
  const moveHl = el => {
    const b = el.getBoundingClientRect(), p = box.getBoundingClientRect();
    if (!hlOn) hl.style.transition = 'none';
    hl.style.width = b.width + 'px';
    hl.style.transform = `translate(${b.left - p.left}px,-50%)`;
    if (!hlOn) { void hl.offsetWidth; hl.style.transition = ''; }
    hl.style.opacity = 1; hlOn = true;
  };
  const hideHl = () => { hl.style.opacity = 0; hlOn = false; };
  const settleHl = () => { if (open && toggle) moveHl(toggle); else if (!overBox && !box.contains(document.activeElement)) hideHl(); };
  box.querySelectorAll('.pvn-link').forEach(l => {
    on(l, 'pointerenter', () => { moveHl(l); if (l !== toggle) setOpen(false); }, { passive: true });
    on(l, 'focus', () => moveHl(l));
    on(l, 'blur', () => setTimeout(settleHl, 0));
  });
  on(box, 'pointerenter', () => { overBox = true; }, { passive: true });
  on(box, 'pointerleave', () => { overBox = false; settleHl(); }, { passive: true });

  /* aperçu du produit : une scène à la fois, fondu croisé ; détruite à la fermeture du panneau */
  let curIdx = -1, scene = null, sceneEl = null;
  const show = i => {
    if (i === curIdx || !products[i]) return;
    curIdx = i;
    items.forEach((it, k) => it.classList.toggle('is-active', k === i));
    const p = products[i];
    prev.href = p.href; prevName.textContent = p.name;
    const m = document.createElement('div'); m.className = 'pvn-scene';
    if (p.scene) { m.dataset.scene = p.scene; m.dataset.col = p.col; }
    stage.appendChild(m);
    const inst = p.scene ? initMiniScene(m) : bonvPreview(m);
    requestAnimationFrame(() => m.classList.add('is-on'));
    const oldEl = sceneEl, old = scene;
    if (oldEl) { oldEl.classList.remove('is-on'); setTimeout(() => { if (old) old.destroy(); oldEl.remove(); }, 450); }
    sceneEl = m; scene = inst;
  };
  const clearPreview = () => {
    if (scene) scene.destroy(); if (sceneEl) sceneEl.remove();
    scene = sceneEl = null; curIdx = -1; items.forEach(it => it.classList.remove('is-active'));
  };

  /* ouverture du panneau : survol (petit délai d'intention), clic ou clavier ; fermeture en sortant de la barre et du panneau */
  let open = false, tOpen = 0, tClose = 0, tClear = 0, openedAt = 0;
  const defIdx = () => Math.max(0, products.findIndex(p => p.current));
  function setOpen(v, focusFirst) {
    clearTimeout(tOpen); clearTimeout(tClose);
    if (!toggle || open === v) { if (v && focusFirst && items[curIdx]) items[curIdx].focus(); return; }
    open = v;
    root.classList.toggle('is-open', v);
    toggle.setAttribute('aria-expanded', v);
    clearTimeout(tClear);
    if (v) { openedAt = performance.now(); show(curIdx < 0 ? defIdx() : curIdx); moveHl(toggle); if (focusFirst) items[curIdx].focus(); }
    else { tClear = setTimeout(clearPreview, 450); settleHl(); }
  }
  if (toggle) {
    on(toggle, 'pointerenter', e => { if (e.pointerType === 'mouse') { clearTimeout(tClose); tOpen = setTimeout(() => setOpen(true), 80); } }, { passive: true });
    on(toggle, 'pointerleave', () => clearTimeout(tOpen), { passive: true });
    // clic juste après l'ouverture au survol : le panneau reste ouvert (sinon le clic le refermerait aussitôt)
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
    if (sheet === v) return;
    sheet = v;
    root.classList.toggle('is-sheet', v);
    burger.setAttribute('aria-expanded', v);
    document.documentElement.classList.toggle('pvn-lock', v);
    if (window.lenis) v ? window.lenis.stop() : window.lenis.start();
    if (v) setHidden(false);
  }
  on(burger, 'click', () => setSheet(!sheet));
  root.querySelectorAll('.pvn-sheet a').forEach(a => on(a, 'click', () => setSheet(false)));
  on(small, 'change', () => { setOpen(false); setSheet(false); fitPad(); });
  on(document, 'keydown', e => {
    if (e.key !== 'Escape') return;
    if (open) { setOpen(false); toggle.focus(); }
    if (sheet) { setSheet(false); burger.focus(); }
  });

  /* scroll : fond de l'île au-delà de 24 px (retiré sous 8 px, pour ne pas clignoter au raz du haut) ;
     cachée après 48 px de descente continue (au-delà de 240 px), revient après 24 px de remontée */
  let lastY = window.scrollY, run = 0, hidden = false, float = false;
  function setHidden(v) { if (hidden === v) return; hidden = v; root.classList.toggle('is-hidden', v); if (v) { setOpen(false); hideHl(); } }
  const onScroll = () => {
    const y = window.scrollY;
    if (!float && y > 24) { float = true; root.classList.add('is-float'); }
    else if (float && y < 8) { float = false; root.classList.remove('is-float'); }
    const d = y - lastY; lastY = y;
    if (!d) return;
    run = Math.sign(d) === Math.sign(run) ? run + d : d;   // distance parcourue dans le même sens
    if (run > 48 && y > 240 && !open && !sheet) setHidden(true);
    else if (run < -24 || y < 120) setHidden(false);
  };
  on(window, 'scroll', onScroll, { passive: true });
  onScroll();

  return function destroy() {
    off.forEach(f => f()); clearTimeout(tOpen); clearTimeout(tClose); clearTimeout(tClear);
    clearPreview(); setSheet(false);
    if (cta) (wf.querySelector('.navbar_menu .div-block') || wf.querySelector('.navbar_menu') || wf).appendChild(cta);
    root.remove(); document.documentElement.classList.remove('pvn-on');
    delete wf.dataset.pvInit;
  };
}
