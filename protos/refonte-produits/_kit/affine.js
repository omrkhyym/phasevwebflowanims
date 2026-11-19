// Template « style affiné » (recherche) : fonds animés BonV et graphe glossy. Chargé après affine-bg.js.
import { initDesignSpaceGlossy } from './design-space-glossy.js';
import { initClinopsProofGlossy } from './clinops-proof-glossy.js';
import { initBonvAnswer } from './bonv-answer.js';
import { initBonvAsk } from './bonv-ask.js';
import { initBonvCollab } from './bonv-collab.js';
import { initBonvOrch } from './bonv-orch.js';
import { initCondAnswer } from './cond-answer.js';
import { initCondBackbone } from './cond-backbone.js';
import { initCondProtocol } from './cond-protocol.js';
import { initCondReport } from './cond-report.js';
import { initCondDose } from './cond-dose.js';

// fond animé posé derrière le contenu du bloc : calque à z-index -1 dans un contexte isolé, classe af-dark-layer (opacité dans affine.css)
function animatedBg(host, palette = DARK_PAL) {
  if (!window.AffineBackground || host.dataset.afBgOn) return;
  host.dataset.afBgOn = '1';
  AffineBackground.mount(host, { palette, scrollParallax: false });
  const layer = host.firstElementChild;
  if (layer) { layer.style.zIndex = '-1'; layer.classList.add('af-dark-layer'); }
  host.style.isolation = 'isolate';
}

const P = window.AffineBackground ? AffineBackground.PALETTES : {};
// une seule palette pour tous les fonds sombres : « mid », entre-deux du bleu BonV et du violet du site (validé le 2026-11-17)
const DARK_PAL = P.mid || P.bonv;
// hero : l'animation de fond de BonV, sous l'animation propre au produit
const hero = document.querySelector('header.section_header, [data-cs-hero], header');   // [data-cs-hero] : hero de la fiche Case Studies (un div)
if (hero) animatedBg(hero);
// sections marquées : data-af-bg="violet" ou "bonv"
document.querySelectorAll('[data-af-bg]').forEach(s => animatedBg(s));
// scènes des vidéos : même fond animé que le header
document.querySelectorAll('[data-wf="A"] .feature-grid .video-animation').forEach(v => animatedBg(v));
// frise : plus de fond animé sur la dernière étape (rejeté en clair) ; en sombre elle est en verre rosé, en clair elle garde le navy du kit

document.querySelectorAll('[data-pv="design-space-glossy"]').forEach(initDesignSpaceGlossy);
document.querySelectorAll('[data-pv="clinops-proof-glossy"]').forEach(initClinopsProofGlossy);
// BonV, The PhaseV answer : panneau sombre avec le fond animé, puis la scène par-dessus
document.querySelectorAll('[data-pv="bonv-answer"]').forEach(m => { animatedBg(m); initBonvAnswer(m); });
// BonV, étapes : scènes dans le style du film, posées dans la scène sombre des étapes (fond animé déjà monté plus haut)
document.querySelectorAll('[data-pv="bonv-ask"]').forEach(initBonvAsk);
document.querySelectorAll('[data-pv="bonv-collab"]').forEach(initBonvCollab);
document.querySelectorAll('[data-pv="bonv-orch"]').forEach(initBonvOrch);
// AI Conductor : mêmes scènes, même socle ; le schéma de The PhaseV answer a son panneau sombre et son fond animé
document.querySelectorAll('[data-pv="cond-answer"]').forEach(m => { animatedBg(m); initCondAnswer(m); });
document.querySelectorAll('[data-pv="cond-backbone"]').forEach(initCondBackbone);
document.querySelectorAll('[data-pv="cond-protocol"]').forEach(initCondProtocol);
document.querySelectorAll('[data-pv="cond-report"]').forEach(initCondReport);
document.querySelectorAll('[data-pv="cond-dose"]').forEach(initCondDose);


// onglets : les visuels sont créés par kit.js (chargé après ce script) ; on pose le fond animé une fois le DOM prêt
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-v="C"] [data-tab] .rp-viz').forEach(v => animatedBg(v));
});

// Testimonials (Home) : onglets partenaires ; défilement auto toutes les 8 s quand le bloc est à l'écran, pause au survol ou au focus.
// Le trait de l'onglet actif se remplit pendant l'attente. Sans défilement en reduced motion. Webflow : composant Tabs natif + ce petit script.
document.querySelectorAll('[data-af-quotes]').forEach(root => {
  if (root.dataset.afInit) return; root.dataset.afInit = '1';
  const tabs = [...root.querySelectorAll('.af-quotes_tab')], panes = [...root.querySelectorAll('.af-quote')];
  const DUR = 8000, reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let cur = 0, t0 = 0, raf = 0, visible = false, paused = false;
  const show = i => {
    cur = (i + tabs.length) % tabs.length; t0 = performance.now();
    tabs.forEach((b, k) => { const on = k === cur; b.classList.toggle('is-active', on); b.setAttribute('aria-selected', on); b.style.setProperty('--af-q', reduced ? 1 : 0); });
    panes.forEach((p, k) => { const on = k === cur; p.classList.toggle('is-active', on); p.hidden = !on; });
  };
  const tick = now => {
    raf = requestAnimationFrame(tick);
    if (!visible || paused) { t0 = now - (parseFloat(tabs[cur].style.getPropertyValue('--af-q')) || 0) * DUR; return; }
    const k = Math.min(1, (now - t0) / DUR);
    tabs[cur].style.setProperty('--af-q', k);
    if (k >= 1) show(cur + 1);
  };
  tabs.forEach((b, k) => b.addEventListener('click', () => show(k)));
  root.addEventListener('pointerenter', () => paused = true, { passive: true });
  root.addEventListener('pointerleave', () => paused = false, { passive: true });
  root.addEventListener('focusin', () => paused = true);
  root.addEventListener('focusout', () => paused = false);
  show(0);
  if (!reduced) {
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible && !raf) { t0 = performance.now(); raf = requestAnimationFrame(tick); } }, { threshold: .4 }).observe(root);
  }
});

// Home, chemin de décision : onglets des questions ; défilement auto toutes les 7 s à l'écran, pause au survol ou au focus ;
// le trait de l'onglet actif se remplit (la scène decision-path.js est archivée).
document.querySelectorAll('[data-af-path]').forEach(root => {
  if (root.dataset.afInit) return; root.dataset.afInit = '1';
  const tabs = [...root.querySelectorAll('.af-path_tab')], panes = [...root.querySelectorAll('.af-path_pane')];
  const DUR = 7000, reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let cur = 0, t0 = 0, raf = 0, visible = false, paused = false, prog = 0;
  const show = i => {
    cur = (i + tabs.length) % tabs.length; t0 = performance.now(); prog = 0;
    tabs.forEach((b, k) => { const on = k === cur; b.classList.toggle('is-active', on); b.setAttribute('aria-selected', on); b.style.setProperty('--af-q', reduced ? 1 : 0); });
    panes.forEach((p, k) => p.classList.toggle('is-active', k === cur));
    root.dispatchEvent(new CustomEvent('af-path:change', { detail: { index: cur } }));
  };
  const tick = now => {
    raf = requestAnimationFrame(tick);
    if (!visible || paused) { t0 = now - prog * DUR; return; }
    prog = Math.min(1, (now - t0) / DUR);
    tabs[cur].style.setProperty('--af-q', prog);
    if (prog >= 1) show(cur + 1);
  };
  tabs.forEach((b, k) => b.addEventListener('click', () => show(k)));
  root.addEventListener('pointerenter', () => paused = true, { passive: true });
  root.addEventListener('pointerleave', () => paused = false, { passive: true });
  root.addEventListener('focusin', () => paused = true);
  root.addEventListener('focusout', () => paused = false);
  show(0);
  if (!reduced) new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible && !raf) { t0 = performance.now(); raf = requestAnimationFrame(tick); } }, { threshold: .3 }).observe(root);
});

// navigation en « île » (proto, toutes les pages) : lit la nav Webflow, construit la sienne, masque l'originale
import { initNavIsland } from './nav-island.js';
initNavIsland(document.querySelector('.navbar_component'));

// Home, plateforme : mini-scènes en en-tête des cartes
import { initMiniScene } from './mini-scene.js';
document.querySelectorAll('[data-pv="mini-scene"]').forEach(initMiniScene);

// Home, The problem : Gantt d'origine restylé, dans une scène sombre avec le fond animé
import { initGanttGlossy } from './gantt-glossy.js';
document.querySelectorAll('[data-pv="gantt-glossy"]').forEach(m => {
  const stage = m.closest('.af-stage-wide');
  if (stage) animatedBg(stage);
  initGanttGlossy(m);
});

// Home, hero : la séquence validée dans l'atelier (blob, délitement et plan, montagnes et orbite, retour)
import { initHeroSequence } from './hero-sequence.js';
import { initAboutOrbits } from './about-orbits.js';   // About : hero « Orbites »
document.querySelectorAll('[data-pv="about-orbits"]').forEach(initAboutOrbits);
import { initCareersAffine } from './careers.js';   // About, Build with us : trois disciplines qui fusionnent, style BonV
document.querySelectorAll('[data-pv="careers-affine"]').forEach(m => {
  const panel = m.closest('.animation-wrapper');
  if (panel) animatedBg(panel);   // panneau : même fond animé que les sections sombres
  initCareersAffine(m);
});
document.querySelectorAll('[data-pv="hero-sequence"]').forEach(initHeroSequence);

// Case Studies, filtres : la pastille blanche de l'onglet actif glisse d'une catégorie à l'autre.
// Les onglets sont créés par case-studies.js (chargé à part) : on attend qu'ils apparaissent.
function pvSegmented(bar) {
  if (bar.dataset.afSeg) return; bar.dataset.afSeg = '1';
  const ind = document.createElement('span'); ind.className = 'cs-pill-ind'; ind.setAttribute('aria-hidden', 'true');
  bar.prepend(ind); bar.classList.add('has-ind');
  const place = () => {
    const on = bar.querySelector('.fs_radio_field.is-list-active') || [...bar.querySelectorAll('.fs_radio_field')].find(l => l.querySelector('input:checked'));
    if (!on) { ind.style.width = '0'; return; }
    ind.style.transform = `translateX(${on.offsetLeft}px)`; ind.style.width = on.offsetWidth + 'px';
  };
  new MutationObserver(place).observe(bar, { subtree: true, attributes: true, attributeFilter: ['class'] });
  new ResizeObserver(place).observe(bar);
  bar.addEventListener('change', place);
  place();
}
{
  const scan = () => document.querySelectorAll('.cs-pills, [data-af-lib] .filter_block.margin-bottom').forEach(pvSegmented);
  scan();
  if (document.querySelector('[data-pv="case-studies"]')) {
    const mo = new MutationObserver(scan); mo.observe(document.body, { childList: true, subtree: true });
    setTimeout(() => mo.disconnect(), 10000);
  }
}

// Resources, article : les paragraphes vides (espaceurs ajoutés dans l'éditeur Webflow, souvent un caractère invisible) sont masqués,
// pour un espace régulier entre les paragraphes
document.querySelectorAll('[data-af-article] .post-rtf > p').forEach(p => {
  if (!p.textContent.replace(/[\s\u200b\u200c\u200d\ufeff]/g, '') && !p.querySelector('img, iframe, video')) p.classList.add('af-empty');
});
