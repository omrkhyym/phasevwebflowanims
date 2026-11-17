import { initResourcesLibrary, initResourcesArticle } from './src/resources.js';

/* Page Resources (bibliothèque) et template CMS des articles (refonte, 2026-11-17). */
document.querySelectorAll('[data-af-lib]').forEach(initResourcesLibrary);
document.querySelectorAll('[data-af-article]').forEach(initResourcesArticle);
