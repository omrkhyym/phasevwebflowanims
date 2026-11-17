/* Scène 3 : le délitement et le plan (révision du 2026-11-16 : remplace l'explosion, retirée de la séquence).
   Reprend le blob figé (scène 1) à la fin de sa scène, sans le modifier : son code est repris tel quel, ses réglages deviennent
   des constantes. Le blob continue de vivre et perd ses particules une à une ; chacune flotte, portée par une légère turbulence,
   et descend doucement jusqu'à sa place sur le plan, qui se compose peu à peu (du centre vers les bords). Le plan couvre presque
   tout l'écran et ondule. La caméra glisse de la vue du blob à la caméra d'arrivée.
   Le plan (taille, vagues, rendu, caméra d'arrivée) garde ses valeurs figées ; le délitement est en réglage. */
import blob from './blob.js';

const BLOB_T0 = blob.duration;   // le délitement commence là où la scène du blob s'arrête
const B = Object.fromEntries(Object.entries(blob.params).map(([k, d]) => [k, d.value]));

const num = v => { const s = Number.isInteger(v) ? v.toFixed(1) : String(v); return v < 0 ? '(' + s + ')' : s; };   // négatif entre parenthèses : jamais de « -- » dans le shader
const BLOB_GLSL = blob.glsl
  .replace('void scene(', 'void blobScene(')
  .replace(/\bu_(\w+)\b/g, (m, k) => (k in blob.params ? num(blob.params[k].value) : m));

const ez = k => (k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2);
const seg = (t, a, b) => Math.max(0, Math.min(1, (t - a) / (b - a)));
const lerp = (a, b, k) => a + (b - a) * k;

export default {
  id: 'plane',
  name: '2. Délitement, plan',
  locked: ['cam', 'pitch', 'yaw', 'zoom', 'size', 'bright', 'dof', 'focus', 'shift'],   // caméra et rendu hérités de la scène précédente
  duration: 8,
  startsAt: BLOB_T0,   // moment du blob où cette scène prend le relais
  // caméra de départ : celle du blob à la fin de sa scène
  camera: { ...blob.camera, ...blob.cameraAt(BLOB_T0, { ...blob.camera, ...B }) },
  params: {
    count: { label: 'Densité (particules)', min: 2000, max: 131072, step: 1000, value: B.count },
    // délitement (en réglage)
    shedAt: { label: 'Délitement : début (s)', min: 0, max: 3, step: .05, value: .2 },
    shedDur: { label: 'Délitement : durée (s)', min: .5, max: 6, step: .05, value: 3 },
    order: { label: 'Le plan se compose : au hasard (0) ou du centre vers les bords (1)', min: 0, max: 1, step: .01, value: .8 },
    fall: { label: 'Descente : durée par particule (s)', min: .5, max: 5, step: .05, value: 2.4 },
    float: { label: 'Flottement (turbulence)', min: 0, max: 1.5, step: .01, value: .5 },
    lift: { label: 'Petite montée avant de descendre', min: 0, max: .5, step: .01, value: .1 },
    soft: { label: "S'écarte avant de descendre", min: 0, max: 1, step: .01, value: .6 },
    // plan (valeurs figées)
    width: { label: 'Plan : largeur', min: .5, max: 4, step: .01, value: 2.2 },
    ratio: { label: 'Plan : profondeur / largeur', min: .2, max: 1.5, step: .01, value: 0.8 },
    height: { label: "Plan : hauteur dans l'image", min: -1, max: .6, step: .01, value: -0.15 },
    grid: { label: 'Plan : semis (0) ou grille (1)', min: 0, max: 1, step: 1, value: 0 },
    // vagues (valeurs figées ; elles montent à partir de « début »)
    waveAt: { label: 'Vagues : début (s)', min: 0, max: 6, step: .05, value: 1.85 },
    waveAmp: { label: 'Vagues : amplitude', min: 0, max: .4, step: .005, value: 0.035 },
    waveLen: { label: "Vagues : longueur d'onde", min: .3, max: 6, step: .05, value: 1.4 },
    waveSpeed: { label: 'Vagues : vitesse', min: 0, max: 4, step: .05, value: 1.1 },
    waveDir: { label: 'Vagues : direction', min: -3.14, max: 3.14, step: .01, value: 1.33 },
    // caméra d'arrivée (valeurs figées)
    camTo: { label: "Caméra d'arrivée : distance", min: 1.2, max: 5, step: .01, value: 2.33 },
    pitchTo: { label: "Caméra d'arrivée : inclinaison", min: -.6, max: 1.4, step: .01, value: 0.29 },
    yawTo: { label: "Caméra d'arrivée : rotation", min: -3.14, max: 3.14, step: .01, value: 0.41 },
    camDur: { label: 'Caméra : durée du passage (s)', min: .3, max: 6, step: .05, value: 2.5 },
    // rendu du plan (valeurs figées)
    planeAlpha: { label: 'Plan : opacité par particule', min: .02, max: 1, step: .01, value: 0.35 },
    crest: { label: 'Plan : crêtes plus lumineuses', min: 0, max: 3, step: .05, value: 1 },
    teal: { label: 'Plan : turquoise sur les crêtes', min: 0, max: 1, step: .01, value: 0.5 },
  },
  // la caméra passe de la vue du blob à la caméra d'arrivée, dès que le délitement commence
  cameraAt(t, v) {
    const e = ez(seg(t, v.shedAt, v.shedAt + v.camDur));
    return { cam: lerp(v.cam, v.camTo, e), pitch: lerp(v.pitch, v.pitchTo, e), yaw: lerp(v.yaw, v.yawTo, e) };
  },
  glsl: `
${BLOB_GLSL}
void scene(vec2 g, vec4 r, float t, out vec3 P, out float A, out vec3 C){
  // la place du point sur le plan : grille régulière (selon son rang) ou semis (sa position aléatoire)
  float n=max(u_count,4.), cols=floor(sqrt(n/u_ratio)), rows=max(floor(n/cols),2.);
  float id=float(gl_VertexID);
  vec2 gp=vec2(mod(id,cols)/(cols-1.), floor(id/cols)/(rows-1.))*2.-1.;
  vec2 q=mix(g, gp, u_grid);
  vec2 pg=vec2(q.x*u_width, q.y*u_width*u_ratio);
  float edge=smoothstep(1.,.82,abs(q.x))*smoothstep(1.,.82,abs(q.y));   // bords fondus, pas de rectangle net

  // vagues
  float ra=t-u_waveAt;
  vec2 dw=vec2(cos(u_waveDir),sin(u_waveDir));
  float ph=dot(pg,dw)*TAU/u_waveLen-t*u_waveSpeed;
  float sw=sin(ph+.8*sin(dot(pg,vec2(-dw.y,dw.x))*TAU/(u_waveLen*1.7)+t*.4))*.7+.3*sin(ph*2.1+1.3+t*.3);
  float wv=u_waveAmp*ez(clamp(ra/2.,0.,1.))*sw;
  vec3 target=vec3(pg.x, u_height+wv, pg.y);
  float Ta=u_planeAlpha*edge*max(.15, 1.+u_crest*wv*8.);
  vec3 Tc=mix(MAU,BLU,clamp(.5+wv*6.,0.,1.)); Tc=mix(Tc,TEA,u_teal*smoothstep(.03,.12,wv));

  // le délitement : chaque point quitte le blob à son moment ; le plan se compose du centre vers les bords
  float s=mix(fract(r.y*3.1), clamp(length(q)/1.41,0.,1.), u_order);
  float td=u_shedAt+s*u_shedDur;
  vec3 Bp; float Ba; vec3 Bc;
  if(t<td){ blobScene(g, r, ${num(BLOB_T0)}+t, Bp, Ba, Bc); P=Bp; A=Ba; C=Bc; return; }
  blobScene(g, r, ${num(BLOB_T0)}+td, Bp, Ba, Bc);   // l'endroit où il s'est détaché
  float u=clamp((t-td)/u_fall,0.,1.), arc=sin(PI*u);
  float kh=1.-pow(1.-u, 2.+u_soft*3.), kv=ez(u);           // s'écarte d'abord à l'horizontale, puis descend et se pose en douceur
  P=vec3(mix(Bp.x,target.x,kh), mix(Bp.y,target.y,kv)+u_lift*arc, mix(Bp.z,target.z,kh));
  P+=u_float*arc*.25*vec3(sin(t*1.3+r.x*TAU), .5*sin(t*1.1+r.y*TAU), cos(t*1.2+r.z*TAU));   // il flotte
  A=mix(Ba,Ta,u); C=mix(Bc,Tc,u);
}`,
};
