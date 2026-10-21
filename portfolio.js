import { initPortfolioHeroBg } from './src/portfolio-hero-bg.js';
import { initPlatformConnect } from './src/platform-connect.js';

document.querySelectorAll('[data-pv="portfolio-hero-bg"]').forEach((el) => initPortfolioHeroBg(el));
document.querySelectorAll('[data-pv="platform-connect"]').forEach((el) => initPlatformConnect(el));
