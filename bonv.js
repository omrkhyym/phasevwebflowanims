import { initBonvHeroBg } from './src/bonv-hero-bg.js';
import { injectCondRoles } from './src/cond-roles.js';
import { initBonvAnswer } from './src/bonv-answer.js';
import { initBonvAsk } from './src/bonv-ask.js';
import { initBonvCollab } from './src/bonv-collab.js';
import { initBonvOrch } from './src/bonv-orch.js';

// refonte (2026-11-17) : page reconstruite ; scènes animées d'après le film BonV (texte saisi dans Webflow).
injectCondRoles();
document.querySelectorAll('[data-pv="bonv-hero-bg"]').forEach((el) => initBonvHeroBg(el));
document.querySelectorAll('[data-pv="bonv-answer"]').forEach(initBonvAnswer);
document.querySelectorAll('[data-pv="bonv-ask"]').forEach(initBonvAsk);
document.querySelectorAll('[data-pv="bonv-collab"]').forEach(initBonvCollab);
document.querySelectorAll('[data-pv="bonv-orch"]').forEach(initBonvOrch);
