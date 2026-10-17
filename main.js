import { initGantt } from './src/gantt.js';
import { initHero } from './src/hero-homepage.js';
import { initPlatformHub } from './src/platform-hub.js';

document.querySelectorAll('[data-pv="gantt"]').forEach(initGantt);
document.querySelectorAll('[data-pv="hero-homepage"]').forEach(initHero);
document.querySelectorAll('[data-pv="platform-hub"]').forEach(initPlatformHub);