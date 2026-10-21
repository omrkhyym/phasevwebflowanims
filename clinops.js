import { initClinopsHeroBg } from './src/clinops-hero-bg.js';
import { initPlatformConnect } from './src/platform-connect.js';

document.querySelectorAll('[data-pv="clinops-hero-bg"]').forEach((el) => initClinopsHeroBg(el));
document.querySelectorAll('[data-pv="platform-connect"]').forEach((el) => initPlatformConnect(el));
