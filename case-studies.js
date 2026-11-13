import { initCaseStudiesLibrary, initCaseStudiesFeatured, initCaseStudy } from './src/case-studies.js';

/* Page Case Studies (bibliothèque) et template CMS des fiches. */
document.querySelectorAll('[data-swiper="feature"]').forEach(initCaseStudiesFeatured);
document.querySelectorAll('[data-pv="case-studies"]').forEach(initCaseStudiesLibrary);
document.querySelectorAll('[data-pv="case-study"]').forEach(initCaseStudy);
