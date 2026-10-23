/* CSS des couches injectées (line field et fond flottant), une seule fois par page.
   Les couches sont toutes en .pv-layer, doublé pour passer devant la règle de hero-stage
   (« :has(> slot) > :not(slot) { position:relative; z-index:1 } », spécificité 0,2,0).
   Empilement dans la section isolée : nappes -3, lignes -2, grain -1, contenu en auto. */

const CSS = `
[data-line-field]{ isolation:isolate; }
.pv-layer.pv-layer.pv-layer{ position:absolute; inset:0; pointer-events:none; }
.pv-lf.pv-layer.pv-layer{ z-index:-2; width:100%; height:100%; display:block; }
.pv-bg.pv-layer.pv-layer{ z-index:-3; overflow:hidden; }
.pv-grain.pv-layer.pv-layer{ z-index:-1; background-image:var(--pv-grain); background-size:180px 180px;
  mix-blend-mode:soft-light; opacity:.18; }

/* JS actif : le fond devient les nappes injectées ; le fallback (pseudo-éléments de l'embed global) est coupé */
.pv-live[data-bg='purple-gradient']{ position:relative; isolation:isolate; background:#141238; }
.pv-live[data-bg='purple-gradient']::before, .pv-live[data-bg='purple-gradient']::after{ display:none; }

/* Gradient flottant : les deux radiaux de la charte deviennent des nappes qui dérivent, tournent et respirent.
   Transform uniquement : composité GPU, aucun repaint. La troisième nappe, mauve très faible, casse la symétrie. */
.pv-blob{ position:absolute; display:block; border-radius:50%; will-change:transform; }
.pv-b1{ width:95%; height:120%; left:42%; top:-48%;
  background:radial-gradient(closest-side, rgba(126,91,178,.50), rgba(126,91,178,.18) 55%, rgba(126,91,178,0));
  animation:pv-f1 46s ease-in-out infinite; }
.pv-b2{ width:100%; height:115%; left:-36%; top:38%;
  background:radial-gradient(closest-side, rgba(65,34,125,.58), rgba(65,34,125,.2) 55%, rgba(65,34,125,0));
  animation:pv-f2 58s ease-in-out infinite; }
.pv-b3{ width:60%; height:70%; left:18%; top:10%;
  background:radial-gradient(closest-side, rgba(146,138,205,.12), rgba(146,138,205,0));
  animation:pv-f3 39s ease-in-out infinite; }
@keyframes pv-f1{ 0%,100%{ transform:translate(0,0) rotate(0) scale(1,1); }
  33%{ transform:translate(-9%,7%) rotate(14deg) scale(1.12,.9); }
  66%{ transform:translate(5%,12%) rotate(-8deg) scale(.92,1.08); } }
@keyframes pv-f2{ 0%,100%{ transform:translate(0,0) rotate(0) scale(1,1); }
  40%{ transform:translate(11%,-8%) rotate(-12deg) scale(.9,1.12); }
  75%{ transform:translate(4%,-14%) rotate(9deg) scale(1.1,.94); } }
@keyframes pv-f3{ 0%,100%{ transform:translate(0,0) scale(1); }
  50%{ transform:translate(22%,18%) scale(1.25); } }
@media (prefers-reduced-motion:reduce){ .pv-blob{ animation:none; } }
`;

export function injectLineFieldCSS() {
  if (document.getElementById('pv-layers-css')) return;
  const s = document.createElement('style');
  s.id = 'pv-layers-css';
  s.textContent = CSS;
  document.head.appendChild(s);
}
