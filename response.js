import { initResponseHeroBg } from './src/response-hero-bg.js';
import { initPlatformConnect } from './src/platform-connect.js';

document.querySelectorAll('[data-pv="response-hero-bg"]').forEach((el) => initResponseHeroBg(el));
document.querySelectorAll('[data-pv="platform-connect"]').forEach((el) => initPlatformConnect(el));
