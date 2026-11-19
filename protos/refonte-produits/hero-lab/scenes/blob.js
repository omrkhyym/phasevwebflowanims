/* Scène 1 : le blob. Une masse de particules en volume, organique, qui se déforme et tourne sur elle-même.
   FIGÉE le 2026-11-16 : valeurs validées par Romain (voir SCENES.md). Ne plus modifier.
   Révision du 2026-11-16 (rythme) : 4,5 s, part plus petit, la caméra part de plus loin (2.6).
   Ajout figé le 2026-11-16 : le blob part lisse et la déformation monte peu à peu ; la caméra avance doucement vers lui.
   Ajout du 2026-11-16, en réglage : le noyau, une sphère parfaite au centre, qui ne se déforme jamais (le centre de tout). */
export default {
  id: 'blob',
  frozen: true,
  name: '1. Blob',
  duration: 4.5,
  camera: { cam: 2.6, pitch: -.1, yaw: 0, zoom: 1, size: .89, bright: 1, dof: .88, focus: .41, shift: .3 },   // décalé à droite comme le paysage (ajout du 2026-11-16)
  params: {
    count: { label: 'Densité (particules)', min: 2000, max: 131072, step: 1000, value: 50000 },
    radius: { label: 'Rayon', min: .05, max: 1.2, step: .01, value: 0.36 },
    deform: { label: 'Déformation', min: 0, max: 1.2, step: .01, value: 0.27 },
    freq: { label: 'Finesse des bosses', min: .2, max: 4, step: .01, value: 0.48 },
    warp: { label: 'Torsion organique', min: 0, max: 1, step: .01, value: 0 },
    speed: { label: 'Vitesse de déformation', min: 0, max: 3, step: .01, value: 1.01 },
    spin: { label: 'Rotation sur lui-même', min: -1.5, max: 1.5, step: .01, value: -0.74 },
    volume: { label: 'Volume (0 plein, 1 surface)', min: 0, max: 1, step: .01, value: 0.49 },
    shell: { label: 'Épaisseur du bord', min: 0, max: .5, step: .01, value: 0.02 },
    alpha: { label: 'Opacité par particule', min: .005, max: .4, step: .001, value: 0.059 },
    tint: { label: 'Teinte (blanc → mauve au bord)', min: 0, max: 1, step: .01, value: 0.41 },
    blue: { label: 'Part de bleu', min: 0, max: 1, step: .01, value: 0.11 },
    ramp: { label: 'Montée de la déformation et de la taille (s)', min: .1, max: 12, step: .1, value: 3 },
    r0: { label: 'Taille au départ (part de la taille finale)', min: .2, max: 1, step: .01, value: .6 },
    camEnd: { label: 'Zoom : distance caméra à la fin', min: 1.2, max: 5, step: .01, value: 1.9 },
    zoomDur: { label: 'Durée du zoom (s)', min: 1, max: 12, step: .1, value: 4.5 },
    coreR: { label: 'Noyau : taille (part du blob)', min: .1, max: .8, step: .01, value: .2 },
    coreShare: { label: 'Noyau : part des particules', min: 0, max: .4, step: .005, value: .1 },
    coreThick: { label: 'Noyau : épaisseur du contour (0 net)', min: 0, max: .5, step: .01, value: .03 },
    coreBright: { label: 'Noyau : luminosité', min: .2, max: 5, step: .05, value: 1.8 },
    coreSpin: { label: 'Noyau : rotation propre', min: -1.5, max: 1.5, step: .01, value: .15 },
  },
  // la caméra avance vers le blob, en douceur (courbe cubique), de « Distance caméra » à « distance à la fin »
  cameraAt(t, v) {
    const k = Math.min(1, t / v.zoomDur), e = k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
    return { cam: v.cam + (v.camEnd - v.cam) * e };
  },
  glsl: `
float bn(vec3 p, float t){
  return .5*sin(dot(p,vec3(1.7,2.3,-1.1))*1.9+t*.9)+.35*sin(dot(p,vec3(-2.6,.9,1.8))*2.3-t*1.2)
        +.25*sin(dot(p,vec3(1.2,-3.1,2.4))*2.9+t*1.6)+.15*sin(dot(p,vec3(3.7,1.4,-2.9))*3.7-t*2.1);
}
// le noyau : une part fixe des particules (même tirage dans toutes les scènes qui reprennent le blob)
bool isCore(vec4 r){ return fract(r.y*17.3+r.z*7.1) < u_coreShare; }
void scene(vec2 g, vec4 r, float t, out vec3 P, out float A, out vec3 C){
  vec3 dir=sphereDir(r);
  float ts=t*u_speed;
  vec3 wd=dir+u_warp*vec3(sin(ts*.7+dir.y*3.),sin(ts*.6+dir.z*3.),sin(ts*.8+dir.x*3.));
  // répartition dans le volume : 1 - volume = exposant (0 → plein, 1 → tout en surface) ; l'épaisseur du bord ajoute un aléa
  float k=pow(fract(r.w*5.13), max(1.-u_volume, .02));
  k=mix(k, 1.-u_shell*fract(r.x*9.7), step(.001,u_shell));
  float grow=ez(clamp(t/u_ramp,0.,1.));
  // le noyau : une sphère parfaite, jamais déformée ; elle grandit avec le blob au départ, puis reste ronde
  if(isCore(r)){
    float rc=u_radius*u_coreR*mix(u_r0,1.,grow)*(1.-u_coreThick*fract(r.x*5.7));
    P=rotY(dir*rc, t*u_coreSpin);
    A=u_alpha*u_coreBright; C=WHI;
    return;
  }
  float rad=u_radius*mix(u_r0,1.,grow)*(1.+u_deform*grow*bn(wd*u_freq,ts))*k;   // petit et lisse au départ, puis il grandit et se déforme
  P=rotX(rotY(dir*rad, t*u_spin), .3*sin(t*.13));
  A=u_alpha;
  vec3 c=mix(WHI, MAU, smoothstep(.3,1.2,rad/u_radius)*u_tint);
  C=mix(c, BLU, u_blue*fract(r.z*3.3));
}`,
};
