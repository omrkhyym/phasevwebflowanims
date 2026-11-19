/* Scène 3 : dézoom, montagnes et orbite. Reprend le plan figé (scène 2) à la fin de sa scène, sans le modifier : son code est repris
   tel quel, ses réglages deviennent des constantes, et ses vagues continuent de vivre. La caméra recule, le plan rétrécit
   jusqu'à la taille du paysage, puis 4 ou 5 montagnes se lèvent pendant que les vagues s'apaisent.
   Puis l'orbite (réunie ici le 2026-11-16, avec les valeurs figées de l'ancienne scène Orbite, sans la respiration des montagnes) :
   la caméra continue de tourner avec la vitesse reçue du dézoom, un léger balancement, un reflet fin qui glisse sur les crêtes.
   Une seule scène, un seul programme : les montagnes ne sont jamais recalculées par un autre, donc aucun saut.
   FIGÉE le 2026-11-16 : valeurs validées par Romain (voir SCENES.md). Ne plus modifier. */
import plane from './plane.js';

const PLANE_END = plane.duration;   // la scène commence là où le plan s'arrête
const ORBIT_DUR = 4;                // durée de l'orbite après le dézoom
const P = Object.fromEntries(Object.entries(plane.params).map(([k, d]) => [k, d.value]));

const num = v => { const s = Number.isInteger(v) ? v.toFixed(1) : String(v); return v < 0 ? '(' + s + ')' : s; };   // négatif entre parenthèses : jamais de « -- » dans le shader
const PLANE_GLSL = plane.glsl
  .replace('void scene(', 'void planeScene(')
  .replace(/\bu_(\w+)\b/g, (m, k) => (k in plane.params && k !== 'count' ? num(plane.params[k].value) : m));

const ez = k => (k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2);
const seg = (t, a, b) => Math.max(0, Math.min(1, (t - a) / (b - a)));
const lerp = (a, b, k) => a + (b - a) * k;

export default {
  id: 'land',
  frozen: true,
  name: '3. Dézoom, montagnes, orbite',
  locked: ['cam', 'pitch', 'yaw', 'zoom', 'size', 'bright', 'dof', 'focus', 'shift'],   // caméra et rendu hérités de la scène précédente
  duration: 1.85 + 3.4 + ORBIT_DUR,   // fin du dézoom (début + durée) + orbite
  startsAt: PLANE_END,   // moment du plan où cette scène prend le relais
  // caméra de départ : la caméra d'arrivée du plan
  camera: { ...plane.camera, cam: P.camTo, pitch: P.pitchTo, yaw: P.yawTo },
  params: {
    count: { label: 'Densité (particules)', min: 2000, max: 131072, step: 1000, value: plane.params.count.value },
    // dézoom
    dzAt: { label: 'Dézoom : début (s)', min: 0, max: 4, step: .05, value: 1.85 },
    dzDur: { label: 'Dézoom : durée (s)', min: .5, max: 6, step: .05, value: 3.4 },
    landW: { label: 'Taille finale du paysage', min: .4, max: 2.2, step: .01, value: 0.89 },
    camEnd: { label: 'Caméra de fin : distance', min: 1.2, max: 6, step: .01, value: 2.86 },
    pitchEnd: { label: 'Caméra de fin : inclinaison', min: -.6, max: 1.4, step: .01, value: 0.39 },
    yawOut: { label: "Vitesse de rotation passée à l'orbite", min: 0, max: .6, step: .005, value: .165 },
    yawEnd: { label: 'Caméra de fin : rotation', min: -3.14, max: 3.14, step: .01, value: 2.52 },
    zoomEnd: { label: 'Fin : échelle', min: .3, max: 2, step: .01, value: 1.15 },
    sizeEnd: { label: 'Fin : taille des points', min: .3, max: 4, step: .01, value: .92 },
    shiftEnd: { label: 'Fin : décalage vers la droite', min: -.8, max: .8, step: .01, value: 0.3 },
    // montagnes
    mCount: { label: 'Montagnes : nombre', min: 4, max: 5, step: 1, value: 5 },
    mHeight: { label: 'Montagnes : hauteur', min: .05, max: 1.2, step: .01, value: 0.45 },
    sharp: { label: 'Montagnes : arrondies (0) ou pointues (1)', min: 0, max: 1, step: .01, value: 0 },
    mWidth: { label: 'Montagnes : largeur', min: .05, max: .6, step: .01, value: 0.18 },
    spread: { label: 'Montagnes : écartement', min: .3, max: 1.5, step: .01, value: 1.14 },
    seed: { label: 'Montagnes : tirage (disposition)', min: 0, max: 30, step: 1, value: 12 },
    vary: { label: 'Montagnes : écart des tailles', min: 0, max: 1, step: .01, value: .7 },
    steep: { label: 'Montagnes : raideur des flancs (pain de sucre)', min: 0, max: 1, step: .01, value: .5 },
    small: { label: 'Petits pics secondaires : nombre', min: 0, max: 14, step: 1, value: 6 },
    smallH: { label: 'Petits pics secondaires : hauteur', min: 0, max: 1, step: .01, value: .35 },
    // montée
    riseAt: { label: 'Montée : début (s)', min: 0, max: 5, step: .05, value: 1.4 },
    riseDur: { label: 'Montée : durée (s)', min: .3, max: 5, step: .05, value: 2.7 },
    order: { label: 'Montée : ensemble (0) ou une par une (1)', min: 0, max: 1, step: .01, value: 0.42 },
    // vagues et rendu
    waveKeep: { label: 'Vagues gardées sur le paysage', min: 0, max: 1, step: .01, value: 0 },
    peakGlow: { label: 'Sommets plus lumineux', min: 0, max: 3, step: .05, value: 0.5 },
    crestCol: { label: 'Turquoise et blanc sur les crêtes', min: 0, max: 1, step: .01, value: 0.37 },
    // orbite (valeurs figées de l'ancienne scène Orbite)
    rampIn: { label: 'Orbite : mise en route du balancement et du reflet (s)', min: .1, max: 6, step: .1, value: 2.4 },
    pitchAmp: { label: "Orbite : balancement d'inclinaison", min: 0, max: .3, step: .005, value: 0.01 },
    pitchPeriod: { label: 'Orbite : période du balancement (s)', min: 2, max: 30, step: .5, value: 11 },
    camAmp: { label: 'Orbite : respiration de la distance', min: 0, max: .6, step: .01, value: 0.05 },
    camPeriod: { label: 'Orbite : période de la respiration (s)', min: 2, max: 30, step: .5, value: 12.5 },
    glint: { label: 'Reflet sur les crêtes : intensité', min: 0, max: 3, step: .05, value: 1.45 },
    glintPeriod: { label: 'Reflet : durée du passage (s)', min: 2, max: 20, step: .5, value: 10.5 },
    glintWidth: { label: 'Reflet : largeur', min: .03, max: .6, step: .01, value: 0.29 },
    glintDir: { label: 'Reflet : direction', min: -3.14, max: 3.14, step: .01, value: 0.6 },
  },
  // la caméra recule pendant le dézoom ; l'échelle, la taille des points et le décalage changent avec elle, sans saut
  cameraAt(t, v) {
    const e = ez(seg(t, v.dzAt, v.dzAt + v.dzDur));
    // rotation : part de l'arrêt et arrive à « rotation de fin » encore lancée (vitesse passée à l'orbite) : aucun arrêt entre les deux
    const D = v.dzDur, u = (t - v.dzAt) / D, yaw = u <= 0 ? v.yaw : u >= 1 ? v.yawEnd + v.yawOut * (t - v.dzAt - D)
      : (2 * u ** 3 - 3 * u ** 2 + 1) * v.yaw + (-2 * u ** 3 + 3 * u ** 2) * v.yawEnd + (u ** 3 - u ** 2) * D * v.yawOut;
    // orbite : après le dézoom, la rotation continue ; balancement et respiration montent en douceur depuis zéro
    const to = Math.max(0, t - v.dzAt - D), k = Math.min(1, to / v.rampIn), eo = k * k * (3 - 2 * k);
    return { cam: lerp(v.cam, v.camEnd, e) + v.camAmp * eo * Math.sin(2 * Math.PI * to / v.camPeriod),
      pitch: lerp(v.pitch, v.pitchEnd, e) + v.pitchAmp * eo * Math.sin(2 * Math.PI * to / v.pitchPeriod), yaw,
      zoom: lerp(v.zoom, v.zoomEnd, e), size: lerp(v.size, v.sizeEnd, e), shift: lerp(v.shift, v.shiftEnd, e) };
  },
  glsl: `
${PLANE_GLSL}
float hs(float n){ return fract(sin(n*127.1+u_seed*311.7)*43758.5453); }
// les montagnes, dans les coordonnées du plan (-1..1) ; chacune a sa hauteur, sa largeur, son allongement et sa montée
float peak(vec2 d, float sig, float p){ return exp(-pow(length(d)/sig, p)); }
float mountains(vec2 q, float t){
  vec2 slot[5]=vec2[5](vec2(-.62,-.18), vec2(-.22,.34), vec2(.12,-.28), vec2(.48,.26), vec2(.74,-.32));
  // profil : arrondi (2) ou pointu (0.9) ; la raideur relève l'exposant : flancs raides, sommet arrondi
  float p=mix(mix(2.,.9,u_sharp), 3.6, u_steep);
  float H=0., big=mod(u_seed,u_mCount);
  for(int i=0;i<5;i++){
    float fi=float(i);
    if(fi>=u_mCount) break;
    vec2 c=(slot[i]+(vec2(hs(fi*5.+1.),hs(fi*5.+2.))-.5)*.3)*u_spread;
    // tailles : avec l'écart, une montagne domine, les autres vont de petites à moyennes
    float f=hs(fi*5.+3.);
    float sz=mix(.5+.5*f, fi==big ? 1. : .18+.7*pow(f,1.4), u_vary);
    float hgt=u_mHeight*sz;
    float sig=u_mWidth*(.7+.6*hs(fi*5.+4.))*mix(1., .5+.6*sz, u_vary);
    float a=hs(fi*5.+5.)*PI, el=1.+1.4*hs(fi*5.+6.)*(1.-.6*u_steep);
    vec2 d=q-c; d=vec2(cos(a)*d.x+sin(a)*d.y, -sin(a)*d.x+cos(a)*d.y); d.x/=el;
    float t0=u_riseAt+u_order*fi*u_riseDur*.45;
    H+=hgt*peak(d,sig,p)*ez(clamp((t-t0)/u_riseDur,0.,1.));
  }
  // petits pics secondaires, posés entre les grands, qui se lèvent après eux
  for(int i=0;i<14;i++){
    float fi=float(i)+20.;
    if(float(i)>=u_small) break;
    vec2 c=vec2(hs(fi*3.+1.)*1.7-.85, hs(fi*3.+2.)*1.3-.65)*u_spread;
    float hgt=u_mHeight*u_smallH*(.4+.6*hs(fi*3.+3.));
    float sig=u_mWidth*(.35+.3*hs(fi*3.+4.));
    float t0=u_riseAt+u_riseDur*(.3+.6*hs(fi*3.+5.));
    H+=hgt*peak(q-c,sig,p)*ez(clamp((t-t0)/u_riseDur,0.,1.));
  }
  return H;
}
void scene(vec2 g, vec4 r, float t, out vec3 P, out float A, out vec3 C){
  vec3 Pp; float Ap; vec3 Cp;
  planeScene(g, r, ${num(PLANE_END)}+t, Pp, Ap, Cp);
  float e=ez(clamp((t-u_dzAt)/u_dzDur,0.,1.));
  float sc=mix(1., u_landW/${num(P.width)}, e);                       // le plan rétrécit jusqu'à la taille du paysage
  float wv=(Pp.y-${num(P.height)})*mix(1., u_waveKeep, e);           // les vagues s'apaisent
  float H=mountains(g, t);
  float hn=H/max(u_mHeight,.01);
  P=vec3(Pp.x*sc, ${num(P.height)}+wv*sc+H, Pp.z*sc);
  A=Ap*(1.+u_peakGlow*hn);
  C=mix(Cp, TEA, u_crestCol*smoothstep(.25,.6,hn)); C=mix(C, WHI, u_crestCol*.7*smoothstep(.65,1.,hn));
  // orbite : un reflet fin traverse le paysage et allume les crêtes ; il monte depuis zéro après le dézoom
  float to=max(t-u_dzAt-u_dzDur,0.), ko=smoothstep(0.,u_rampIn,to);
  vec2 dg=vec2(cos(u_glintDir), sin(u_glintDir));
  float pos=-1.6+3.2*fract(to/u_glintPeriod);
  float glw=exp(-pow((dot(P.xz,dg)-pos)/u_glintWidth,2.))*clamp(hn,0.,1.)*u_glint*ko;
  A*=1.+glw; C=mix(C, WHI, clamp(glw*.6,0.,1.));
}`,
};
