/* Entrée commune à toutes les pages, chargée depuis le footer de code global du site.
   Fond flottant sur chaque [data-bg='purple-gradient'] (le line field n'est plus monté : aucune page ne l'utilise depuis la refonte ;
   son CSS commun reste dans src/line-field/css.js, utilisé par le fond flottant).
   Refonte (2026-11-17) : fond sombre animé unique sur les heros, les blocs [data-af-bg] et les panneaux vidéo des étapes ;
   FAQ native en accordéon. */
import { initFloatingBg } from './src/floating-bg.js';
import { initDarkBg } from './src/dark-bg.js';
import { initFaq } from './src/faq.js';
import { initNav } from './src/nav.js';
import { initSlider } from './src/sliders.js';
import { initBackToTop } from './src/back-to-top.js';

initFloatingBg();
document.querySelectorAll('header.section_header, [data-af-bg], .feature-grid > .video-animation').forEach(initDarkBg);
document.querySelectorAll('[data-pv="faq"]').forEach(initFaq);
// navigation en île : composant Webflow « nav-island » (refonte, 2026-11-17)
document.querySelectorAll('[data-pv="nav"]').forEach(initNav);
// sliders : un seul système pour tous les [data-swiper] (nettoyage, 2026-11-17)
document.querySelectorAll('[data-swiper]').forEach(initSlider);
// footer : « Back to top » avec easing (2026-11-18)
document.querySelectorAll('[data-pv="back-to-top"]').forEach(initBackToTop);
