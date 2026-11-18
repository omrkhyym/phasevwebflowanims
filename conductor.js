import { initConductorHeroBg } from './src/conductor-hero-bg.js';
import { initPlatformConnect as initPlatformConnectCards } from './src/platform-connect-cards.js';
import { injectCondRoles } from './src/cond-roles.js';
import { initCondAnswer } from './src/cond-answer.js';
import { initCondDose } from './src/cond-dose.js';
import { initCondBackbone } from './src/cond-backbone.js';
import { initCondProtocol } from './src/cond-protocol.js';
import { initCondReport } from './src/cond-report.js';

// refonte (2026-11-17) : page reconstruite ; scènes animées dans le style BonV (texte saisi dans Webflow), plateforme en cartes.
// La plateforme v1 (platform-connect) n'est plus sur la page.
injectCondRoles();
document.querySelectorAll('[data-pv="conductor-hero-bg"]').forEach((el) => initConductorHeroBg(el));
document.querySelectorAll('[data-pv="cond-answer"]').forEach(initCondAnswer);
document.querySelectorAll('[data-pv="cond-dose"]').forEach(initCondDose);
document.querySelectorAll('[data-pv="cond-backbone"]').forEach(initCondBackbone);
document.querySelectorAll('[data-pv="cond-protocol"]').forEach(initCondProtocol);
document.querySelectorAll('[data-pv="cond-report"]').forEach(initCondReport);
document.querySelectorAll('[data-pv="platform-connect-v2"]').forEach((el) => initPlatformConnectCards(el));
