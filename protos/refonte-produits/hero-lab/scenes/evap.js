/* Scène 4 : le retour au blob. Reprend la scène 3 (montagnes et orbite) à la fin de sa scène, sans la modifier.
   Le tirage des montagnes (seed) reste une variable : en constante, le compilateur précalcule le hasard (sin × 43758, très sensible)
   avec une autre précision et les sommets changent de place au raccord (le saut constaté le 2026-11-16). Les sommets s'évaporent
   d'abord, en arc vers le haut, et toutes les particules se rassemblent en blob ; la caméra revient à la vue de départ du blob
   (décalage à droite compris). À la dernière image, tout est exactement la première image de la scène 1 : la boucle repart sans saut.
   FIGÉE le 2026-11-16 : valeurs validées par Romain (voir SCENES.md). Ne plus modifier. */
import land from './land.js';
import blob from './blob.js';
import { COMMON } from '../engine.js';

const num = v => { const s = Number.isInteger(v) ? v.toFixed(1) : String(v); return v < 0 ? '(' + s + ')' : s; };   // négatif entre parenthèses : jamais de « -- » dans le shader
// la scène 3 contient déjà toute la chaîne, blob compris (blobScene) : on la reprend telle quelle ; le tirage reste une variable
const LAND_GLSL = land.glsl
  .replace('void scene(', 'void landScene(')
  .replace(/\bu_(\w+)\b/g, (m, k) => (k in land.params && k !== 'count' && k !== 'seed' ? num(land.params[k].value) : m));

const DURATION = 5;
const PLANE_H = -.15, M_HEIGHT = .45;   // base et hauteur du relief (scènes 3 et 4)

// caméra et rendu : de la fin de la scène 3 à la première image du blob
const vals = sc => ({ ...Object.fromEntries(Object.entries(COMMON).map(([k, d]) => [k, k in sc.camera ? sc.camera[k] : d.value])), ...Object.fromEntries(Object.entries(sc.params).map(([k, d]) => [k, d.value])) });
const LV = vals(land), FROM = { ...LV, ...land.cameraAt(land.duration, LV) };
const BV = vals(blob), TO = { ...BV, ...blob.cameraAt(0, BV) };
const YAW_SPEED = land.params.yawOut.value;   // la caméra tourne encore en arrivant : elle garde son sens et ralentit jusqu'à l'arrêt

// courbe d'Hermite : part de p0 avec la vitesse v0, arrive en p1 à l'arrêt
const hermite = (p0, v0, p1, u, D) => { const u2 = u * u, u3 = u2 * u; return (2 * u3 - 3 * u2 + 1) * p0 + (u3 - 2 * u2 + u) * D * v0 + (-2 * u3 + 3 * u2) * p1; };
const ez = k => (k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2);
const lerp = (a, b, k) => a + (b - a) * k;

export default {
  id: 'evap',
  frozen: true,
  name: '4. Retour au blob',
  locked: ['cam', 'pitch', 'yaw', 'zoom', 'size', 'bright', 'dof', 'focus', 'shift'],   // caméra et rendu hérités de la scène précédente
  duration: DURATION,
  startsAt: land.duration,
  fixed: { seed: land.params.seed.value },   // le tirage des montagnes reste une variable, comme dans la scène 3
  camera: { cam: FROM.cam, pitch: FROM.pitch, yaw: FROM.yaw, zoom: FROM.zoom, size: FROM.size, bright: FROM.bright, dof: FROM.dof, focus: FROM.focus, shift: FROM.shift },
  params: {
    count: { label: 'Densité (particules)', min: 2000, max: 131072, step: 1000, value: land.params.count.value },
    start: { label: 'Évaporation : début (s)', min: 0, max: 2, step: .05, value: 0.3 },
    stagger: { label: 'Évaporation : étalement (s)', min: 0, max: 3, step: .05, value: 1.9 },
    dur: { label: 'Évaporation : durée par particule (s)', min: .3, max: 3, step: .05, value: 2.5 },
    order: { label: 'Ordre : hasard (0) ou sommets d’abord (1)', min: 0, max: 1, step: .01, value: 0.61 },
    lift: { label: 'Montée en arc (hauteur)', min: 0, max: 1.5, step: .01, value: 0.34 },
    swirl: { label: 'Tourbillon', min: 0, max: 3, step: .01, value: 2.17 },
    vapor: { label: 'Éclat pendant le trajet', min: 0, max: 3, step: .05, value: 0.4 },
    camAt: { label: 'Caméra : début du retour (s)', min: 0, max: 3, step: .05, value: 1.0 },
    camDur: { label: 'Caméra : durée du retour (s)', min: .5, max: 5.5, step: .05, value: 4.0 },
  },
  // la caméra continue de tourner, puis revient en douceur à la vue de départ du blob ; elle y est posée avant la fin
  cameraAt(t, v) {
    const a = v.camAt, D = Math.max(.1, Math.min(v.camDur, DURATION - a));
    if (t < a) return { yaw: FROM.yaw + YAW_SPEED * t, shift: FROM.shift };
    const u = Math.min(1, (t - a) / D), e = ez(u), y0 = FROM.yaw + YAW_SPEED * a;
    return {
      yaw: y0 + YAW_SPEED * D * (Math.min(u, 1) - Math.min(u, 1) ** 2 / 2),
      pitch: lerp(FROM.pitch, TO.pitch, e), cam: lerp(FROM.cam, TO.cam, e),
      zoom: lerp(FROM.zoom, TO.zoom, e), size: lerp(FROM.size, TO.size, e),
      bright: lerp(FROM.bright, TO.bright, e), dof: lerp(FROM.dof, TO.dof, e), focus: lerp(FROM.focus, TO.focus, e),
      shift: lerp(FROM.shift, TO.shift, e),
    };
  },
  glsl: `
${LAND_GLSL}
// reçoit le paysage déjà calculé (Op, Oa, Oc) : la séquence complète le calcule une seule fois
void evapMix(vec2 g, vec4 r, float t, vec3 Op, float Oa, vec3 Oc, out vec3 P, out float A, out vec3 C){
  // la cible : le blob, qui rejoint pile sa première image à la fin de la scène
  vec3 Bp; float Ba; vec3 Bc;
  blobScene(g, r, t-${num(DURATION)}, Bp, Ba, Bc);
  float hn=clamp((Op.y-(${num(PLANE_H)}))/${num(M_HEIGHT)},0.,1.);
  float s=mix(fract(r.x*7.7), 1.-hn, u_order);                       // les sommets partent les premiers
  float k=ez(clamp((t-u_start-s*u_stagger)/u_dur,0.,1.));
  k=mix(k, 1., smoothstep(${num(DURATION - .25)}, ${num(DURATION)}, t));   // tout est posé à la dernière image
  float arc=sin(PI*k);
  P=mix(Op,Bp,k)+vec3(0.,u_lift*arc,0.);
  P=rotY(P, u_swirl*arc*(.5+r.z));
  A=mix(Oa,Ba,k)*(1.+u_vapor*arc);
  C=mix(Oc,Bc,k); C=mix(C, WHI, clamp(u_vapor*arc*.3,0.,1.));
}
void scene(vec2 g, vec4 r, float t, out vec3 P, out float A, out vec3 C){
  vec3 Op; float Oa; vec3 Oc;
  landScene(g, r, ${num(land.duration)}+t, Op, Oa, Oc);
  evapMix(g, r, t, Op, Oa, Oc, P, A, C);
}`,
};
