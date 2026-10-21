import { initConductorHeroBg } from './src/conductor-hero-bg.js';
import { initPlatformConnect } from './src/platform-connect.js';

document.querySelectorAll('[data-pv="conductor-hero-bg"]').forEach((el) => initConductorHeroBg(el));
document.querySelectorAll('[data-pv="platform-connect"]').forEach((el) => initPlatformConnect(el));
