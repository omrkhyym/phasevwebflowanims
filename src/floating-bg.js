/* Fond flottant de toutes les sections [data-bg='purple-gradient'] : trois nappes animées en CSS et un grain fixe.
   Indépendant du line field (une section peut avoir le fond sans les lignes).
   Pose .pv-live sur la section, ce qui coupe le fallback CSS de l'embed global. */

import { injectLineFieldCSS } from './line-field/css.js';

/* Tuile de bruit 180 px, générée une fois pour la page. Contraste réduit : ±55 autour du gris moyen. */
function grainTile() {
  const N = 180, c = document.createElement('canvas'); c.width = c.height = N;
  const g = c.getContext('2d'), d = g.createImageData(N, N);
  for (let i = 0; i < d.data.length; i += 4) { const v = 128 + (Math.random() - .5) * 110 | 0; d.data[i] = d.data[i + 1] = d.data[i + 2] = v; d.data[i + 3] = 255; }
  g.putImageData(d, 0, 0);
  return c.toDataURL();
}

export function initFloatingBg(root = document) {
  const secs = [...root.querySelectorAll("[data-bg='purple-gradient']")].filter(s => !s.dataset.pvBg);
  if (!secs.length) return [];
  injectLineFieldCSS();
  if (!document.documentElement.style.getPropertyValue('--pv-grain'))
    document.documentElement.style.setProperty('--pv-grain', 'url(' + grainTile() + ')');

  return secs.map((s, i) => {
    s.dataset.pvBg = '1';
    const bg = document.createElement('div');
    bg.className = 'pv-bg pv-layer';
    bg.setAttribute('aria-hidden', 'true');
    bg.innerHTML = '<i class="pv-blob pv-b1"></i><i class="pv-blob pv-b2"></i><i class="pv-blob pv-b3"></i>';
    /* déphasage d'après la position de la section, sinon toutes les nappes bougent ensemble */
    bg.querySelectorAll('.pv-blob').forEach((b, j) => { b.style.animationDelay = (-(i * 17 + j * 11)) + 's'; });
    const gr = document.createElement('div');
    gr.className = 'pv-grain pv-layer';
    gr.setAttribute('aria-hidden', 'true');
    s.prepend(bg); s.append(gr);
    s.classList.add('pv-live');

    return function destroy() {
      bg.remove(); gr.remove();
      s.classList.remove('pv-live');
      delete s.dataset.pvBg;
    };
  });
}
