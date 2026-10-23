import { initCareersPopulations } from './src/company-careers.js';

/* Le hero de Company n'a plus d'animation propre : il passe au line field (texture swimmer, via site.js).
   src/company-hero-lines.js est conservé pour un retour en arrière. */
document.querySelectorAll('[data-pv="company-careers"]').forEach(initCareersPopulations);
