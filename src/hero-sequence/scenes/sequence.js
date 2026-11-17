/* La séquence complète en UN SEUL programme (2026-11-16) : blob → délitement et plan → dézoom, montagnes et orbite → retour au blob.
   Pourquoi : le hasard qui place les montagnes (hs, sin × 43758) est si sensible que deux programmes différents ne le calculent pas
   exactement pareil : les sommets bougeaient à chaque raccord entre scènes. Ici, tout est dans le même programme, et le paysage
   est calculé une seule fois pour la fin des montagnes comme pour le retour au blob : aucun second calcul, donc aucun saut.
   Les valeurs sont celles des scènes figées ; la caméra suit, scène par scène, leurs propres trajectoires (calculées en JS). */
import blob from './blob.js';
import plane from './plane.js';
import land from './land.js';
import evap from './evap.js';

const num = v => { const s = Number.isInteger(v) ? v.toFixed(1) : String(v); return v < 0 ? '(' + s + ')' : s; };   // négatif entre parenthèses : jamais de « -- » dans le shader

// début de chaque scène dans la séquence
const T1 = blob.duration, T2 = T1 + plane.duration, T3 = T2 + land.duration, T4 = T3 + evap.duration;

// le code du retour au blob contient toute la chaîne (blobScene, planeScene, landScene, evapMix) ; ses réglages deviennent des constantes
const CHAIN = evap.glsl
  .replace('void scene(', 'void evapScene(')
  .replace(/\bu_(\w+)\b/g, (m, k) => (k in evap.params && k !== 'count' ? num(evap.params[k].value) : m));

export const BOUNDS = [0, T1, T2, T3, T4];

export default {
  id: 'sequence',
  name: 'Séquence (un seul programme)',
  inSequence: false,
  duration: T4,
  camera: { ...blob.camera },
  params: { count: { label: 'Densité (particules)', min: 2000, max: 131072, step: 1000, value: blob.params.count.value } },
  fixed: { ...evap.fixed },   // le tirage des montagnes reste une variable
  glsl: `
${CHAIN}
void scene(vec2 g, vec4 r, float T, out vec3 P, out float A, out vec3 C){
  if(T<${num(T1)}){ blobScene(g, r, T, P, A, C); return; }
  if(T<${num(T2)}){ planeScene(g, r, T-${num(T1)}, P, A, C); return; }
  // le paysage : calculé une seule fois, ici, pour la fin des montagnes comme pour le retour au blob
  vec3 Lp; float La; vec3 Lc;
  landScene(g, r, T-${num(T2)}, Lp, La, Lc);
  if(T<${num(T3)}){ P=Lp; A=La; C=Lc; return; }
  evapMix(g, r, T-${num(T3)}, Lp, La, Lc, P, A, C);
}`,
};
