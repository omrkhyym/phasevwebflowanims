import { initHeroSequence } from './src/hero-sequence/index.js';
import { initGanttGlossy } from './src/gantt-glossy.js';
import { initMiniScene } from './src/mini-scene.js';
import { initTestimonials } from './src/testimonials.js';

// refonte (2026-11-17) : hero en séquence WebGL, Gantt restylé dans le panneau sombre, mini-scènes des cartes produit,
// témoignages en onglets. Les anciens blocs (hero-homepage, gantt, platform-hub, evidence-bars) sont masqués dans Webflow.
document.querySelectorAll('[data-pv="hero-sequence"]').forEach(initHeroSequence);
document.querySelectorAll('[data-pv="gantt-glossy"]').forEach(initGanttGlossy);
document.querySelectorAll('[data-pv="mini-scene"]').forEach(initMiniScene);
document.querySelectorAll('[data-pv="testimonials"]').forEach(initTestimonials);
