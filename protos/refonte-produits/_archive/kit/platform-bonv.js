/* « Standalone or connected » : deux visuels dans l'esprit BonV (recherche style affiné), dans une fenêtre sombre.
   [data-pv="platform-orbit"] : les 5 produits en anneaux fins autour de la plateforme, liens en pointillés qui défilent.
   [data-pv="platform-flow"]  : le flux décrit par le texte de Trial (insights → Trial → ClinOps, AI Conductor).
   Même contrat que le module validé : data-current = produit de la page (le seul en jaune). */
const ICONS = '../_kit/bv-icons/';
// cercles complets autour des icônes (retour de Romain)
const PRODUCTS = {
  portfolio: { name: 'Portfolio', full: 'Portfolio Optimizer', icon: 'distribution', c: '#A99FD8', p: 1 },
  trial: { name: 'Trial', full: 'Trial Optimizer', icon: 'sliders', c: '#86C6D0', p: 1 },
  clinops: { name: 'ClinOps', full: 'ClinOps Optimizer', icon: 'network', c: '#D6A394', p: 1 },
  response: { name: 'Response', full: 'Response Optimizer', icon: 'scatter', c: '#92CBAE', p: 1 },
  conductor: { name: 'AI Conductor', full: 'AI Conductor', icon: 'document', c: '#7C93F2', p: 1 },
};

const ring = (k, cur, extra = '') => {
  const p = PRODUCTS[k];
  return `<div class="af-ring${k === cur ? ' is-current' : ''}" style="--c:${p.c};--p:${p.p}${extra}">`
    + `<svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="49.5" pathLength="1"/></svg>`
    + `<img src="${ICONS}${p.icon}.svg" alt=""></div>`;
};

/* ---------- A : orbite ---------- */
// positions dans un carré de 560 : centre (280, 280), anneau central r 84, produits à r ≈ 225
const ORBIT = [
  ['portfolio', 50, 10, 'M280 184 L280 104', true],
  ['trial', 12, 40, 'M187 256 L114 236'],
  ['clinops', 27, 84, 'M226 359 L178 430'],
  ['response', 73, 84, 'M334 359 L382 430'],
  ['conductor', 88, 40, 'M373 256 L446 236'],
];
export function initPlatformOrbit(mount) {
  if (mount.dataset.pvReady) return;
  mount.dataset.pvReady = '1';
  const cur = mount.dataset.current;
  mount.innerHTML = `<div class="af-win"><span class="af-hud">PhaseV platform</span>
    <div class="af-orbit" role="img" aria-label="${PRODUCTS[cur] ? PRODUCTS[cur].full + ' connected to the four other PhaseV products' : 'The five PhaseV products, connected'}">
      <svg class="af-links" viewBox="0 0 560 560" aria-hidden="true">${ORBIT.map(([k, , , d]) => `<path class="af-flow${k === cur ? ' is-accent' : ''}" d="${d}"/>`).join('')}</svg>
      <div class="af-core"><span>PhaseV</span></div>
      ${ORBIT.map(([k, l, t, , top]) => `<div class="af-cap${top ? ' is-top' : ''}" style="left:${l}%;top:${t}%">${ring(k, cur)}<span class="af-cap-label${k === cur ? ' is-current' : ''}">${PRODUCTS[k].name}</span></div>`).join('')}
    </div></div>`;
}

/* ---------- B : flux ---------- */
// boîte de 600 × 520 ; à gauche ce qui entre, au centre le produit, à droite ce qui en sort
const FLOW_NODES = [
  ['response', 15, 26], ['portfolio', 15, 70],
  ['trial', 50, 48, true],
  ['clinops', 85, 26], ['conductor', 85, 70],
];
const FLOW_LINKS = [
  ['M138 135 C210 135 220 230 252 240', 'in'], ['M138 364 C210 364 220 270 252 260', 'in'],
  ['M348 240 C380 230 390 135 462 135', 'out'], ['M348 260 C380 270 390 364 462 364', 'out'],
];
// intitulés des liens retirés (retour de Romain : ils flottaient) ; le texte du bloc dit déjà ce qui circule
const FLOW_LABELS = [];
const FLOW_META = { clinops: 'Operational planning', conductor: 'Protocol · SAP', trial: 'Scenario space' };
export function initPlatformFlow(mount) {
  if (mount.dataset.pvReady) return;
  mount.dataset.pvReady = '1';
  const cur = mount.dataset.current || 'trial';
  const light = mount.dataset.theme === 'light';   // variante fond clair
  mount.innerHTML = `<div class="af-win${light ? ' is-light' : ''}"><span class="af-hud">Connected workflow</span>
    <div class="af-flowbox" role="img" aria-label="Reviewed insights from Response and Portfolio Optimizer enter the Trial Optimizer scenario space; design decisions inform ClinOps Optimizer; approved parameters return to the protocol and SAP through AI Conductor.">
      <svg class="af-links" viewBox="0 0 600 520" aria-hidden="true">
        ${FLOW_LINKS.map(([d, dir]) => `<path class="af-flow${dir === 'out' ? ' is-accent' : ''}" d="${d}"/>`).join('')}
        ${FLOW_LABELS.map(([x, y, s, a]) => `<text class="af-flow-lab" x="${x}" y="${y}" text-anchor="${a}">${s.toUpperCase()}</text>`).join('')}
      </svg>
      ${FLOW_NODES.map(([k, l, t, big]) => `<div class="af-cap${big ? ' is-big' : ''}" style="left:${l}%;top:${t}%">${ring(k, cur)}<span class="af-cap-label${k === cur ? ' is-current' : ''}">${PRODUCTS[k].full}</span>${FLOW_META[k] ? `<span class="af-cap-meta">${FLOW_META[k]}</span>` : ''}</div>`).join('')}
    </div></div>`;
}
