import { initPortfolioHeroBg } from './src/portfolio-hero-bg.js';
import { initViz } from './src/viz.js';
import { initPlatformConnect as initPlatformConnectCards } from './src/platform-connect-cards.js';

// refonte (2026-11-17) : page reconstruite ; graphes animés (rank, dist) et bloc plateforme en cartes, la plateforme v1 n'y est plus
document.querySelectorAll('[data-pv="portfolio-hero-bg"]').forEach((el) => initPortfolioHeroBg(el));
document.querySelectorAll('[data-pv="viz"]').forEach((el) => initViz(el));
document.querySelectorAll('[data-pv="platform-connect-v2"]').forEach((el) => initPlatformConnectCards(el));
