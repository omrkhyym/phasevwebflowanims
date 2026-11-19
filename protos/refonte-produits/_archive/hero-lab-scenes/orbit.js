/* Scène 5 : l'orbite. Reprend le paysage figé (scène 4) dès la fin du dézoom, sans le modifier : les derniers pics montent encore
   pendant que la caméra se met à tourner (décision du 2026-11-16, pour raccourcir). Son code est repris tel quel,
   ses réglages deviennent des constantes. La caméra tourne lentement autour du paysage, avec un léger balancement ;
   les montagnes peuvent respirer, un reflet fin glisse sur les crêtes. Tout part de zéro à la première image : aucun saut.
   FIGÉE le 2026-11-16 : valeurs validées par Romain (voir SCENES.md). Ne plus modifier. */
import land from './land.js';
import { COMMON } from '../engine.js';

const LAND_START = land.params.dzAt.value + land.params.dzDur.value;   // fin du dézoom : la caméra est posée, la rotation peut partir
const L = Object.fromEntries(Object.entries(land.params).map(([k, d]) => [k, d.value]));

const num = v => { const s = Number.isInteger(v) ? v.toFixed(1) : String(v); return v < 0 ? '(' + s + ')' : s; };   // négatif entre parenthèses : jamais de « -- » dans le shader
const LAND_GLSL = land.glsl
  .replace('void scene(', 'void landScene(')
  .replace(/\bu_(\w+)\b/g, (m, k) => (k in land.params && k !== 'count' ? num(land.params[k].value) : m));

// caméra et rendu de départ : ceux de la fin de la scène 4
const start = { ...Object.fromEntries(Object.entries(COMMON).map(([k, d]) => [k, k in land.camera ? land.camera[k] : d.value])), ...L };
const END = land.cameraAt(LAND_START, start);
const SPEED = L.yawOut;   // la vitesse de rotation reçue du dézoom : même sens, sans arrêt
const PLANE_H = -.15;   // hauteur du plan (scène 3) : la base du relief

export default {
  id: 'orbit',
  frozen: true,
  name: 'Orbite (réunie dans la scène 3)',
  inSequence: false,
  locked: ['cam', 'pitch', 'yaw', 'zoom', 'size', 'bright', 'dof', 'focus', 'shift'],   // caméra et rendu hérités de la scène précédente
  duration: 4,
  yawSpeed: SPEED,
  startsAt: LAND_START,   // moment du paysage où cette scène prend le relais
  camera: { ...land.camera, cam: END.cam, pitch: END.pitch, yaw: END.yaw, zoom: END.zoom, size: END.size },
  params: {
    count: { label: 'Densité (particules)', min: 2000, max: 131072, step: 1000, value: land.params.count.value },
    rampIn: { label: 'Rotation : mise en route (s)', min: .1, max: 6, step: .1, value: 2.4 },
    pitchAmp: { label: "Balancement d'inclinaison", min: 0, max: .3, step: .005, value: 0.01 },
    pitchPeriod: { label: 'Balancement : période (s)', min: 2, max: 30, step: .5, value: 11 },
    camAmp: { label: 'Respiration de la distance', min: 0, max: .6, step: .01, value: 0.05 },
    camPeriod: { label: 'Respiration : période (s)', min: 2, max: 30, step: .5, value: 12.5 },
    breath: { label: 'Montagnes qui respirent', min: 0, max: .5, step: .01, value: 0.17 },
    breathSpeed: { label: 'Respiration des montagnes : vitesse', min: .05, max: 3, step: .05, value: 0.9 },
    glint: { label: 'Reflet sur les crêtes : intensité', min: 0, max: 3, step: .05, value: 1.45 },
    glintPeriod: { label: 'Reflet : durée du passage (s)', min: 2, max: 20, step: .5, value: 10.5 },
    glintWidth: { label: 'Reflet : largeur', min: .03, max: .6, step: .01, value: 0.29 },
    glintDir: { label: 'Reflet : direction', min: -3.14, max: 3.14, step: .01, value: 0.6 },
  },
  // la rotation se met en route depuis l'arrêt ; balancement et respiration montent avec elle
  cameraAt(t, v) {
    const r = v.rampIn, ang = SPEED * t;   // la rotation est déjà lancée ; balancement et respiration montent en douceur
    const k = Math.min(1, t / r), e = k * k * (3 - 2 * k);
    return {
      yaw: v.yaw + ang,
      pitch: v.pitch + v.pitchAmp * e * Math.sin(2 * Math.PI * t / v.pitchPeriod),
      cam: v.cam + v.camAmp * e * Math.sin(2 * Math.PI * t / v.camPeriod),
      shift: END.shift,
    };
  },
  glsl: `
${LAND_GLSL}
void scene(vec2 g, vec4 r, float t, out vec3 P, out float A, out vec3 C){
  landScene(g, r, ${num(LAND_START)}+t, P, A, C);
  float k=smoothstep(0., u_rampIn, t);
  float H=P.y-(${num(PLANE_H)}), hn=clamp(H/${num(L.mHeight)},0.,1.);
  // les montagnes respirent : une houle lente sur le relief
  P.y=${num(PLANE_H)}+H*(1.+u_breath*k*sin(t*u_breathSpeed+P.x*3.+P.z*2.));
  // le reflet : une bande fine qui traverse le paysage et allume les crêtes au passage
  vec2 dg=vec2(cos(u_glintDir), sin(u_glintDir));
  float pos=-1.6+3.2*fract(t/u_glintPeriod);
  float glw=exp(-pow((dot(P.xz,dg)-pos)/u_glintWidth,2.))*hn*u_glint;
  A*=1.+glw; C=mix(C, WHI, clamp(glw*.6,0.,1.));
}`,
};
