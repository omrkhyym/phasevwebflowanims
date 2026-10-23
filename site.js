/* Entrée commune à toutes les pages, chargée depuis le footer de code global du site.
   Fond flottant sur chaque [data-bg='purple-gradient'] et line field sur chaque [data-line-field] (voir LINE-FIELD.md). */
import { initFloatingBg } from './src/floating-bg.js';
import { initLineFields } from './src/line-field/index.js';

initFloatingBg();
initLineFields();
