import { initResponseHeroBg } from './src/response-hero-bg.js';
import { initPlatformConnect } from './src/platform-connect.js';
import { initPlatformConnectTree } from './src/platform-connect-tree.js';
import { initViz } from './src/viz.js';

document.querySelectorAll('[data-pv="response-hero-bg"]').forEach((el) => initResponseHeroBg(el));
document.querySelectorAll('[data-pv="platform-connect"]').forEach((el) => initPlatformConnect(el));
// refonte (2026-11-17) : graphes des deux approches et bloc plateforme en cartes
document.querySelectorAll('[data-pv="viz"]').forEach((el) => initViz(el));
document.querySelectorAll('[data-pv="platform-connect-v2"]').forEach((el) => initPlatformConnectTree(el));
