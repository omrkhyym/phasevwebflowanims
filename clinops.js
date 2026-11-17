import { initClinopsHeroBg } from './src/clinops-hero-bg.js';
import { initClinopsProofGlossy } from './src/clinops-proof-glossy.js';
import { initPlatformConnect as initPlatformConnectCards } from './src/platform-connect-cards.js';

// refonte (2026-11-17) : la page a été reconstruite ; les anciens blocs (workflow, proof clair, plateforme v1) n'y sont plus
document.querySelectorAll('[data-pv="clinops-hero-bg"]').forEach((el) => initClinopsHeroBg(el));
document.querySelectorAll('[data-pv="clinops-proof-glossy"]').forEach((el) => initClinopsProofGlossy(el));
document.querySelectorAll('[data-pv="platform-connect-v2"]').forEach((el) => initPlatformConnectCards(el));
