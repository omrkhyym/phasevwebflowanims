/* Entrée commune à toutes les pages, chargée depuis le footer de code global du site.
   Fond flottant sur chaque [data-bg='purple-gradient'] et line field sur chaque [data-line-field] (voir LINE-FIELD.md).
   Refonte (2026-11-17) : fond sombre animé unique sur les heros, les blocs [data-af-bg] et les panneaux vidéo des étapes ;
   FAQ native en accordéon. */
import { initFloatingBg } from './src/floating-bg.js';
import { initLineFields } from './src/line-field/index.js';
import { initDarkBg } from './src/dark-bg.js';
import { initFaq } from './src/faq.js';

initFloatingBg();
initLineFields();
document.querySelectorAll('header.section_header, [data-af-bg], .feature-grid > .video-animation').forEach(initDarkBg);
document.querySelectorAll('[data-pv="faq"]').forEach(initFaq);
