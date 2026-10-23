/* Line field : sélection de la texture et montage sur chaque [data-line-field].
   - data-line-field="<nom>" force la texture (voir LINE-FIELD.md) ;
   - vide ou "random" : tirage stable, d'après la position du bloc parmi ceux de la page,
     sans reprendre une texture déjà posée explicitement sur la page ;
   - nom inconnu : avertissement en console, puis tirage. */

import { mountLineField } from './core.js';
import { Swimmer } from './textures/swimmer.js';
import { Matrix } from './textures/matrix.js';
import { KM } from './textures/km.js';
import { Forest } from './textures/forest.js';
import { Waterfall } from './textures/waterfall.js';
import { Volcano } from './textures/volcano.js';

export const TEXTURES = { swimmer: Swimmer, matrix: Matrix, km: KM, forest: Forest, waterfall: Waterfall, volcano: Volcano };

export function initLineFields(root = document) {
  const els = [...root.querySelectorAll('[data-line-field]')].filter(el => !el.dataset.pvLine);
  const name = el => (el.dataset.lineField || '').trim().toLowerCase();
  const used = new Set(els.map(name).filter(n => TEXTURES[n]));
  let pool = Object.keys(TEXTURES).filter(k => !used.has(k));
  if (!pool.length) pool = Object.keys(TEXTURES);
  let draw = 0;

  return els.map(el => {
    let n = name(el);
    if (!TEXTURES[n]) {
      if (n && n !== 'random') console.warn(`[line-field] texture inconnue « ${n} », tirage à la place`, el);
      n = pool[draw++ % pool.length];
    }
    el.dataset.pvLine = n;
    return mountLineField(el, TEXTURES[n]);
  });
}
