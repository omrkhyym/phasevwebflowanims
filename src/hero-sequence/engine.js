/* Atelier du hero Home : moteur commun à toutes les scènes (WebGL2, points additifs).
   Une scène fournit son GLSL (fonction scene(), qui place chaque particule), ses réglages et sa durée.
   Le moteur gère les particules, la caméra, la profondeur de champ et le rendu ; il ne connaît aucune scène en particulier. */

// réglages communs à toutes les scènes (caméra, rendu)
export const COMMON = {
  cam: { label: 'Distance caméra', min: 1.2, max: 5, step: .01, value: 2.6 },
  pitch: { label: 'Inclinaison', min: -.6, max: 1.4, step: .01, value: .06 },
  yaw: { label: 'Rotation', min: -3.14, max: 3.14, step: .01, value: 0 },
  zoom: { label: 'Échelle', min: .3, max: 2, step: .01, value: 1 },
  size: { label: 'Taille des points', min: .3, max: 4, step: .01, value: 1 },
  bright: { label: 'Luminosité', min: .05, max: 4, step: .01, value: 1 },
  dof: { label: 'Flou de profondeur', min: 0, max: 2, step: .01, value: 1 },
  focus: { label: 'Zone nette (largeur)', min: 0, max: 1.5, step: .01, value: .35 },
  shift: { label: 'Décalage vers la droite', min: -.8, max: .8, step: .01, value: 0 },
};

export const MAX_N = 512 * 256;   // particules disponibles ; la densité en dessine une partie

const HEAD = `#version 300 es
layout(location=0) in vec2 a_g;   // position sur une grille régulière (pour les scènes de plan)
layout(location=1) in vec4 a_r;   // aléas
uniform float u_t, u_scale, u_cam, u_dpr, u_dof, u_focus, u_size, u_bright, u_shift;   // shift : décalage horizontal de l'image (0 centré)
uniform vec2 u_rot, u_res;
out float v_a; out float v_b; out float v_s; out vec2 v_d; out vec3 v_c;
float S_out=0.;   // une scène peut le poser : étire le point en traînée, dans le sens de la fuite depuis le centre
const float PI=3.14159265, TAU=6.2831853;
const vec3 MAU=vec3(.663,.624,.847), BLU=vec3(.471,.659,.878), TEA=vec3(.498,.910,.812), WHI=vec3(.957);
float ez(float k){ return k<.5?4.*k*k*k:1.-pow(-2.*k+2.,3.)/2.; }
vec3 rotY(vec3 p, float a){ float c=cos(a), s=sin(a); return vec3(c*p.x+s*p.z, p.y, -s*p.x+c*p.z); }
vec3 rotX(vec3 p, float a){ float c=cos(a), s=sin(a); return vec3(p.x, c*p.y-s*p.z, s*p.y+c*p.z); }
vec3 sphereDir(vec4 r){ float ct=r.y*2.-1., sn=sqrt(1.-ct*ct), ph=r.z*TAU; return vec3(sn*cos(ph),ct,sn*sin(ph)); }
`;
const MAIN = `
void main(){
  vec3 P; float A; vec3 C;
  scene(a_g, a_r, u_t, P, A, C);
  float cy=cos(u_rot.x), sy=sin(u_rot.x); P=vec3(cy*P.x+sy*P.z,P.y,-sy*P.x+cy*P.z);
  float cp=cos(u_rot.y), sp=sin(u_rot.y); P=vec3(P.x,cp*P.y+sp*P.z,cp*P.z-sp*P.y);
  float zr=u_cam+P.z, z=max(zr,.3); vec2 s=P.xy/z*u_scale;
  gl_Position=vec4(s.x/u_res.x*2.+u_shift, s.y/u_res.y*2., 0., 1.);
  // profondeur de champ : net près du centre de la scène, disques doux devant et derrière (l'énergie du point est conservée)
  float near=clamp(2.25-z*.62,.08,1.);
  float base=(1.+2.4*near)*u_size, blur=clamp(abs(P.z)-u_focus,0.,1.6)*u_dof;
  float sz=min(base+14.*blur*blur,80.);
  v_b=clamp(blur*1.8,0.,1.);
  v_s=clamp(S_out,0.,2.); v_d=normalize(s+1e-4);
  gl_PointSize=u_dpr*sz*(1.+2.*v_s);
  v_a=A*u_bright*near*pow(base/sz,1.25)*smoothstep(.35,.7,zr);
  v_c=C;
}`;
const FS = `#version 300 es
precision highp float;
in float v_a; in float v_b; in float v_s; in vec2 v_d; in vec3 v_c; out vec4 o;
void main(){
  vec2 q=gl_PointCoord-.5; q.y=-q.y;
  vec2 ql=vec2(dot(q,v_d), dot(q,vec2(-v_d.y,v_d.x))); ql.y*=1.+4.*v_s;
  float d=length(ql);
  float sharp=smoothstep(.5,.15,d), bokeh=smoothstep(.5,.38,d)*(.7+.3*smoothstep(.1,.45,d));
  float a=mix(sharp,bokeh,v_b)*v_a; if(a<.002) discard;
  o=vec4(v_c*a,a);
}`;

export function createEngine(canvas) {
  const gl = canvas.getContext('webgl2', { alpha: true, antialias: false, premultipliedAlpha: true });
  if (!gl) throw new Error('WebGL2 indisponible');

  // particules dans un ordre aléatoire : en dessiner n donne un échantillon uniforme
  const GX = 512, GZ = 256, grid = new Float32Array(MAX_N * 2), rnd4 = new Float32Array(MAX_N * 4), order = new Uint32Array(MAX_N);
  let seed = 11; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  for (let i = 0; i < MAX_N; i++) order[i] = i;
  for (let i = MAX_N - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [order[i], order[j]] = [order[j], order[i]]; }
  for (let k = 0; k < MAX_N; k++) {
    const id = order[k], i = id % GX, j = Math.floor(id / GX);
    grid[k * 2] = -1 + 2 * i / (GX - 1); grid[k * 2 + 1] = -1 + 2 * j / (GZ - 1);
    for (let c = 0; c < 4; c++) rnd4[k * 4 + c] = rnd();
  }
  const vao = gl.createVertexArray(); gl.bindVertexArray(vao);
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer()); gl.bufferData(gl.ARRAY_BUFFER, grid, gl.STATIC_DRAW);
  gl.enableVertexAttribArray(0); gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer()); gl.bufferData(gl.ARRAY_BUFFER, rnd4, gl.STATIC_DRAW);
  gl.enableVertexAttribArray(1); gl.vertexAttribPointer(1, 4, gl.FLOAT, false, 0, 0);

  function sh(t, src) { const s = gl.createShader(t); gl.shaderSource(s, src); gl.compileShader(s); if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s)); return s; }
  let prog = null, loc = {}, sceneKeys = [], fixedVals = {};
  const cache = new Map();   // un programme par scène, compilé une seule fois

  function useScene(scene) {
    const hit = cache.get(scene.id);
    if (hit) { ({ prog, loc, sceneKeys, fixedVals } = hit); return; }
    // « fixed » : valeurs reprises d'une scène précédente qui doivent rester des variables (jamais précalculées par le compilateur)
    const fixed = scene.fixed || {};
    const decl = [...Object.keys(scene.params), ...Object.keys(fixed)].map(k => `uniform float u_${k};`).join('\n');
    const p = gl.createProgram();
    gl.attachShader(p, sh(gl.VERTEX_SHADER, HEAD + decl + '\n' + scene.glsl + MAIN)); gl.attachShader(p, sh(gl.FRAGMENT_SHADER, FS)); gl.linkProgram(p);
    if (!gl.getProgramParameter(p, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(p));
    prog = p; sceneKeys = Object.keys(scene.params); loc = {}; fixedVals = fixed;
    ['t', 'scale', 'cam', 'dpr', 'dof', 'focus', 'size', 'bright', 'shift', 'rot', 'res', ...sceneKeys, ...Object.keys(fixed)].forEach(k => { loc[k] = gl.getUniformLocation(p, 'u_' + k); });
    cache.set(scene.id, { prog, loc, sceneKeys, fixedVals });
  }

  let W = 1, H = 1, dpr = 1;
  function resize() {
    dpr = Math.min(devicePixelRatio || 1, 2);
    W = Math.max(1, Math.round(canvas.clientWidth * dpr)); H = Math.max(1, Math.round(canvas.clientHeight * dpr));
    canvas.width = W; canvas.height = H;
  }

  // v : valeurs courantes (communes + scène) ; n : nombre de particules dessinées
  function render(t, v, n) {
    gl.viewport(0, 0, W, H); gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT);
    if (!prog) return;
    gl.useProgram(prog); gl.bindVertexArray(vao);
    gl.uniform1f(loc.t, t); gl.uniform1f(loc.scale, Math.min(W, H * 1.6) * .9 * v.zoom); gl.uniform1f(loc.cam, v.cam); gl.uniform1f(loc.dpr, dpr);
    gl.uniform1f(loc.dof, v.dof); gl.uniform1f(loc.focus, v.focus); gl.uniform1f(loc.size, v.size); gl.uniform1f(loc.bright, v.bright); gl.uniform1f(loc.shift, v.shift || 0);
    gl.uniform2f(loc.rot, v.yaw, v.pitch); gl.uniform2f(loc.res, W, H);
    sceneKeys.forEach(k => gl.uniform1f(loc[k], v[k]));
    Object.entries(fixedVals).forEach(([k, x]) => gl.uniform1f(loc[k], x));
    gl.enable(gl.BLEND); gl.blendFunc(gl.ONE, gl.ONE);
    gl.drawArrays(gl.POINTS, 0, Math.min(MAX_N, Math.max(1, Math.round(n))));
  }
  return { useScene, resize, render };
}
