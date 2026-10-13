import { initGantt } from './src/gantt.js';
import { initHero } from './src/hero-homepage.js';

document.querySelectorAll('[data-pv="gantt"]').forEach(initGantt);
document.querySelectorAll('[data-pv="hero-homepage"]').forEach(initHero);