import { initCareersPopulations } from './src/company-careers.js';
import { initCompanyHeroLines } from './src/company-hero-lines.js';

document.querySelectorAll('[data-pv="company-careers"]').forEach(initCareersPopulations);
document.querySelectorAll('[data-pv="company-hero"]').forEach((el) => initCompanyHeroLines(el));
