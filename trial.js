import { initTrialHeroBg } from './src/trial-hero-bg.js';
import { initSuccessDesignSpace } from './src/success-design-space.js';
import { initPlatformConnect } from './src/platform-connect.js';

document.querySelectorAll('[data-pv="trial-hero-bg"]').forEach((el) => initTrialHeroBg(el));
document.querySelectorAll('[data-pv="success-design-space"]').forEach((el) => initSuccessDesignSpace(el));
document.querySelectorAll('[data-pv="platform-connect"]').forEach((el) => initPlatformConnect(el));
