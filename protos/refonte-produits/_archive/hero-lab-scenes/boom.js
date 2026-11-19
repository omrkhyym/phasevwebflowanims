/* Scène 2 : l'explosion. Part du blob figé (scène 1) exactement tel qu'il est à la fin de sa scène, sans le modifier :
   son code est repris tel quel, ses réglages deviennent des constantes. Le blob vit encore un instant, se contracte, puis explose ;
   les particules filent hors du cadre, à pleine intensité (aucun fondu).
   FIGÉE le 2026-11-16 (voir SCENES.md). Révision (rythme) en réglage : impulsion, jets, turbulence, contraction sèche, éclat. */
import blob from './blob.js';

const LEAD = 1.5;                       // la scène reprend le blob 1,5 s avant la fin de sa propre scène
const BLOB_T0 = blob.duration - LEAD;   // temps du blob au début de cette scène

// le GLSL du blob, avec ses réglages figés en constantes
const num = v => { const s = Number.isInteger(v) ? v.toFixed(1) : String(v); return v < 0 ? '(' + s + ')' : s; };   // négatif entre parenthèses : jamais de « -- » dans le shader
const BLOB_GLSL = blob.glsl
  .replace('void scene(', 'void blobScene(')
  .replace(/\bu_(\w+)\b/g, (m, k) => (k in blob.params ? num(blob.params[k].value) : m));

// caméra de départ : celle du blob à la fin de son zoom
const B = Object.fromEntries(Object.entries(blob.params).map(([k, d]) => [k, d.value]));

export default {
  id: 'boom',
  frozen: true,
  name: 'Explosion (retirée)',
  inSequence: false,   // remplacée par le délitement (2026-11-16), gardée de côté
  locked: ['cam', 'pitch', 'yaw', 'zoom', 'size', 'bright', 'dof', 'focus', 'shift'],   // caméra et rendu hérités de la scène précédente
  duration: 5,
  startsAt: BLOB_T0,   // moment du blob où cette scène prend le relais
  camera: { ...blob.camera, ...blob.cameraAt(BLOB_T0, { ...blob.camera, ...B }) },   // la caméra du blob au moment du relais
  params: {
    count: { label: 'Densité (particules)', min: 2000, max: 131072, step: 1000, value: B.count },
    at: { label: "Moment de l'explosion (s)", min: .3, max: 3, step: .05, value: 0.65 },
    pre: { label: 'Contraction avant', min: 0, max: .8, step: .01, value: 0.18 },
    preDur: { label: 'Durée de la contraction (s)', min: .05, max: 1.5, step: .05, value: 0.25 },
    power: { label: 'Puissance (vitesse de départ)', min: .2, max: 8, step: .05, value: 2.35 },
    accel: { label: 'Accélération (négatif : freine)', min: -4, max: 8, step: .05, value: 0.4 },
    corner: { label: 'Vers les coins (0 partout, 1 coins)', min: 0, max: 1, step: .01, value: 0 },
    spread: { label: 'Écart des vitesses', min: 0, max: 1, step: .01, value: 0.65 },
    trail: { label: 'Traînée', min: 0, max: 2, step: .01, value: 0 },
    swirl: { label: 'Tourbillon', min: 0, max: 3, step: .01, value: 0 },
    depth: { label: 'Part qui passe devant la caméra', min: 0, max: .6, step: .01, value: 0.6 },
    flyAlpha: { label: 'Opacité en vol', min: .02, max: 1, step: .01, value: 0.74 },
    impulse: { label: 'Impulsion (départ très vif qui freine)', min: 0, max: 1, step: .01, value: .7 },
    jets: { label: 'Jets (gerbes selon la direction)', min: 0, max: 1, step: .01, value: .5 },
    turb: { label: 'Turbulence (trajectoires courbes)', min: 0, max: 1.5, step: .01, value: .4 },
    flash: { label: "Éclat au moment de l'explosion", min: 0, max: 4, step: .05, value: 1.2 },
  },
  glsl: `
${BLOB_GLSL}
void scene(vec2 g, vec4 r, float t, out vec3 P, out float A, out vec3 C){
  vec3 Bp; float Ba; vec3 Bc;
  blobScene(g, r, ${num(BLOB_T0)}+t, Bp, Ba, Bc);
  // contraction juste avant l'explosion
  float pre=ez(smoothstep(u_at-u_preDur, u_at, t))*step(t,u_at);
  float age=t-u_at;
  if(age<=0.){ P=Bp*(1.-u_pre*pre); A=Ba; C=Bc; return; }
  // point de départ : la position du point au moment de l'explosion
  vec3 p0, c0; float a0;
  blobScene(g, r, ${num(BLOB_T0)}+u_at, p0, a0, c0);
  p0*=1.-u_pre;
  vec3 dir=normalize(p0+vec3(1e-4));
  vec3 cdir=normalize(mix(dir, vec3(sign(dir.x)*(.6+.4*abs(dir.x)), sign(dir.y)*(.35+.4*abs(dir.y)), dir.z*.5), u_corner));
  if(r.x<u_depth) cdir=normalize(vec3(cdir.xy, -(.4+.6*abs(cdir.z))));   // une part file vers la caméra
  float V=max(u_power*(1.+u_spread*(fract(r.w*2.71)*2.-1.)), .05);
  // jets : la vitesse varie selon la direction, ce qui dessine des gerbes au lieu d'une sphère régulière
  float jn=.5*sin(dot(dir,vec3(2.3,1.7,-1.9))*2.1)+.3*sin(dot(dir,vec3(-1.3,2.9,1.1))*3.3)+.2*sin(dot(dir,vec3(3.1,-1.2,2.4))*4.7);
  V*=max(.15, 1.+u_jets*1.4*jn);
  // accélération négative : le point freine puis s'arrête
  float ae=u_accel<0. ? min(age, V/-u_accel) : age;
  // impulsion : départ très rapide qui freine (comme une vraie explosion), puis l'accélération reprend
  float dl=V*ae+.5*u_accel*ae*ae, di=V*1.8*(1.-exp(-age*3.))+.5*max(u_accel,0.)*age*age;
  float d=length(p0)+mix(dl,di,u_impulse);
  cdir=rotY(cdir, age*u_swirl*(r.z-.5)*2.);
  // turbulence : les trajectoires se courbent, de plus en plus en s'éloignant
  vec3 tw=vec3(sin(dir.y*5.+age*2.1+r.z*6.), sin(dir.z*5.-age*1.7), sin(dir.x*5.+age*2.3));
  P=cdir*d+tw*u_turb*.35*d*min(age,2.)*.5;
  float k=smoothstep(0.,.12,age);
  A=mix(Ba, u_flyAlpha, k)*(1.+u_flash*exp(-age*6.));   // bref éclat au moment de l'explosion
  C=mix(Bc, mix(WHI, mix(BLU,MAU,r.z), smoothstep(0.,1.,age)), k);
  S_out=u_trail*k*clamp((V+u_accel*ae)/4.,0.,1.);   // traînée proportionnelle à la vitesse
}`,
};
