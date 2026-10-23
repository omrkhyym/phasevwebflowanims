import { initGantt } from './src/gantt.js';
import { initHero } from './src/hero-homepage.js';
import { initPlatformHub } from './src/platform-hub.js';
import { initEvidenceBars } from './src/evidence-bars.js';

document.querySelectorAll('[data-pv="gantt"]').forEach(initGantt);
document.querySelectorAll('[data-pv="hero-homepage"]').forEach(initHero);
document.querySelectorAll('[data-pv="platform-hub"]').forEach(initPlatformHub);
document.querySelectorAll('[data-pv="evidence-bars"]').forEach(initEvidenceBars);