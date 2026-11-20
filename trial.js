import { initTrialHeroBg } from './src/trial-hero-bg.js';
import { initSuccessDesignSpace } from './src/success-design-space.js';
import { initPlatformConnect } from './src/platform-connect.js';
import { initDesignSpaceGlossy } from './src/design-space-glossy.js';
import { initPlatformConnectTree } from './src/platform-connect-tree.js';

document.querySelectorAll('[data-pv="trial-hero-bg"]').forEach((el) => initTrialHeroBg(el));
document.querySelectorAll('[data-pv="success-design-space"]').forEach((el) => initSuccessDesignSpace(el));
document.querySelectorAll('[data-pv="platform-connect"]').forEach((el) => initPlatformConnect(el));
// refonte (2026-11-17) : success story sombre et bloc plateforme en cartes
document.querySelectorAll('[data-pv="design-space-glossy"]').forEach((el) => initDesignSpaceGlossy(el));
document.querySelectorAll('[data-pv="platform-connect-v2"]').forEach((el) => initPlatformConnectTree(el));
