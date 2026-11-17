import { initAboutOrbits } from './src/about-orbits.js';
import { initCareersAffine } from './src/careers-affine.js';

/* refonte (2026-11-17) : hero « Orbites » (texte à gauche, sans line field) et animation carrières dans le panneau sombre
   de Build with us (montage sur l'embed, data-pv="careers-affine"). src/company-careers.js et src/company-hero-lines.js
   restent dans le repo pour un retour en arrière. */
document.querySelectorAll('[data-pv="about-orbits"]').forEach(initAboutOrbits);
document.querySelectorAll('[data-pv="careers-affine"]').forEach(initCareersAffine);
