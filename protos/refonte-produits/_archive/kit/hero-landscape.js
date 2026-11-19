/* Hero homepage, « le paysage de décision » (WebGL2, recherche style affiné).
   Environ 40 000 points très fins forment une surface en relief vue en perspective : le paysage des possibles.
   La surface se reforme d'un relief à l'autre par une vague qui traverse le champ. Illustration pure : pas de point jaune, pas de libellé.
   Caméra en orbite lente, inclinée par la souris ; profondeur de champ par la taille et l'opacité des points.
   Très grand, passe sous la colonne de texte en s'estompant. Monté dans <div data-pv="hero-landscape"></div>. */
const SEL = '[data-pv="hero-landscape"]';
const CSS = `
.header_image-wrapper:has(${SEL}){ background:none!important; border:0!important; box-shadow:none!important; position:relative; overflow:visible!important; min-height:30rem; }
.header_component:has(${SEL}), .header_content:has(${SEL}){ position:relative; }
.header_content:has(${SEL}) .header_content-left{ position:relative; z-index:2; }
/* très grand, ancré à droite, passe sous la colonne de texte ; s'estompe côté texte */
${SEL}{ position:absolute; top:-16%; bottom:-16%; right:-6%; width:95vw; z-index:0; pointer-events:none;
  -webkit-mask-image:linear-gradient(90deg, transparent 2%, rgba(0,0,0,.4) 24%, #000 46%); mask-image:linear-gradient(90deg, transparent 2%, rgba(0,0,0,.4) 24%, #000 46%); }
${SEL} canvas{ position:absolute; inset:0; width:100%; height:100%; display:block; }
@media (max-width:991px){
  .section_header:has(${SEL}){ height:auto; min-height:100svh; display:flex; flex-direction:column; justify-content:center; overflow-x:clip; }
  .header_component:has(${SEL}), .header_component:has(${SEL}) .header_content{ height:auto; }
  ${SEL}{ position:relative; top:auto; bottom:auto; right:auto; width:100vw; margin-left:calc(50% - 50vw); aspect-ratio:1/1; margin-top:1rem; -webkit-mask-image:none; mask-image:none; }
}`;

/* ---------- les 5 reliefs ---------- */
const G = (x, z, cx, cz, s) => Math.exp(-((x - cx) ** 2 + (z - cz) ** 2) / (s * s));
const sstep = (a, b, v) => { const t = Math.max(0, Math.min(1, (v - a) / (b - a))); return t * t * (3 - 2 * t); };
const LAND = [
  (x, z) => { const u = x + 1; return (.36 * (1 - Math.exp(-2.6 * u)) - .075 * u * u) * (.55 + .45 * Math.exp(-(((z - .08) / .38) ** 2))); },   // Trial : puissance contre taille
  (x, z) => .18 * G(x, z, -.55, .2, .2) + .24 * G(x, z, -.1, -.25, .2) + .32 * G(x, z, .42, .14, .18) + .14 * G(x, z, .72, -.3, .16) + .12 * G(x, z, .12, .38, .16),   // Portfolio : opportunités
  (x, z) => .06 + .2 * sstep(-.15, .15, x) * Math.exp(-((z / .5) ** 2)) + .05 * Math.sin(x * 3 + z * 2),   // effet causal : un plateau
  (x, z) => .3 / (1 + Math.exp(-6 * x)) * (.75 + .25 * Math.cos(z * 7) * Math.cos(x * 5)),   // ClinOps : courbe de recrutement
  (x, z) => .27 * G(x, z, -.38, -.16, .24) + .19 * G(x, z, .42, .2, .22) + .02,   // Response : deux populations
];
const LAND_GLSL = `
float G(vec2 p, vec2 c, float s){ vec2 d=p-c; return exp(-dot(d,d)/(s*s)); }
float land(int s, vec2 p){
  float x=p.x, z=p.y;
  if(s==0){ float u=x+1.; return (.36*(1.-exp(-2.6*u))-.075*u*u)*(.55+.45*exp(-pow((z-.08)/.38,2.))); }
  if(s==1) return .18*G(p,vec2(-.55,.2),.2)+.24*G(p,vec2(-.1,-.25),.2)+.32*G(p,vec2(.42,.14),.18)+.14*G(p,vec2(.72,-.3),.16)+.12*G(p,vec2(.12,.38),.16);
  if(s==2) return .06+.2*smoothstep(-.15,.15,x)*exp(-pow(z/.5,2.))+.05*sin(x*3.+z*2.);
  if(s==3) return .3/(1.+exp(-6.*x))*(.75+.25*cos(z*7.)*cos(x*5.));
  return .27*G(p,vec2(-.38,-.16),.24)+.19*G(p,vec2(.42,.2),.22)+.02;
}`;
const ZR = .62;   // demi-profondeur du terrain (x va de -1 à 1)

const VS = `#version 300 es
layout(location=0) in vec2 a_p;
uniform int u_a, u_b; uniform float u_k, u_t, u_scale, u_cam, u_dpr, u_oy, u_ox;
uniform vec2 u_rot, u_res;
out float v_a; out vec3 v_c;
${LAND_GLSL}
void main(){
  vec2 p=a_p;
  float w=clamp(u_k*1.7-(p.x*.5+.5)*.7,0.,1.); w=w*w*(3.-2.*w);          // la vague traverse le champ de gauche à droite
  float h=mix(land(u_a,p),land(u_b,p),w);
  h+=.01*sin(u_t*1.1+p.x*7.+p.y*5.)+.12*w*(1.-w);                        // respiration, et la crête de la vague
  vec3 P=vec3(p.x,h*1.8-.2,p.y);                                          // relief accentué
  float cy=cos(u_rot.x), sy=sin(u_rot.x); P=vec3(cy*P.x+sy*P.z,P.y,-sy*P.x+cy*P.z);
  float cp=cos(u_rot.y), sp=sin(u_rot.y); P=vec3(P.x,cp*P.y+sp*P.z,cp*P.z-sp*P.y);
  float z=u_cam+P.z;
  vec2 s=P.xy/z*u_scale;
  gl_Position=vec4((s.x+u_ox)/u_res.x*2.,(s.y+u_oy)/u_res.y*2.,0.,1.);
  float near=clamp(2.25-z*.62,.08,1.);
  gl_PointSize=u_dpr*(1.+2.4*near);
  float edge=smoothstep(1.,.72,abs(p.x))*smoothstep(.62,.4,abs(p.y));     // bords du terrain fondus, pas de coupe nette
  v_a=.7*near*(.45+1.8*h)*edge;
  vec3 MAU=vec3(.663,.624,.847), BLU=vec3(.471,.659,.878), TEA=vec3(.498,.910,.812), WHI=vec3(.957);
  vec3 c=mix(MAU,BLU,smoothstep(.02,.16,h)); c=mix(c,TEA,smoothstep(.16,.3,h)); c=mix(c,WHI,smoothstep(.3,.42,h)*.6);
  v_c=c;
}`;
const FS = `#version 300 es
precision highp float;
in float v_a; in vec3 v_c; out vec4 o;
void main(){ float d=length(gl_PointCoord-.5); float a=smoothstep(.5,.15,d)*v_a; if(a<.003) discard; o=vec4(v_c*a,a); }`;

const DUR = 7, NS = LAND.length;
const WAVE = 1.9;   // durée de la vague qui reforme le relief

export function initHeroLandscape(root) {
  if (root.dataset.pvReady) return;
  root.dataset.pvReady = '1';
  if (!document.getElementById('pv-hero-land-css')) { const s = document.createElement('style'); s.id = 'pv-hero-land-css'; s.textContent = CSS; document.head.appendChild(s); }

  const cv = document.createElement('canvas');
  cv.setAttribute('aria-hidden', 'true');
  root.appendChild(cv);
  const gl = cv.getContext('webgl2', { alpha: true, antialias: false, premultipliedAlpha: true });
  if (!gl) return;
  // la grille de points
  const GX = 280, GZ = 140, pts = new Float32Array(GX * GZ * 2);
  let k = 0;
  for (let j = 0; j < GZ; j++) for (let i = 0; i < GX; i++) { pts[k++] = -1 + 2 * i / (GX - 1) + (((i * 7 + j * 13) % 11) / 11 - .5) * .004; pts[k++] = -ZR + 2 * ZR * j / (GZ - 1); }
  function sh(t, src) { const s = gl.createShader(t); gl.shaderSource(s, src); gl.compileShader(s); if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s)); return s; }
  const pr = gl.createProgram(); gl.attachShader(pr, sh(gl.VERTEX_SHADER, VS)); gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, FS)); gl.linkProgram(pr);
  if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(pr));
  const U = n => gl.getUniformLocation(pr, n);
  const u = { a: U('u_a'), b: U('u_b'), k: U('u_k'), t: U('u_t'), scale: U('u_scale'), cam: U('u_cam'), dpr: U('u_dpr'), oy: U('u_oy'), ox: U('u_ox'), rot: U('u_rot'), res: U('u_res') };
  const vao = gl.createVertexArray(); gl.bindVertexArray(vao);
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer()); gl.bufferData(gl.ARRAY_BUFFER, pts, gl.STATIC_DRAW);
  gl.enableVertexAttribArray(0); gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let W = 0, H = 0, dpr = 1, CAM = 2.5, SCALE = 1, OY = 0, OX = 0;
  function resize() {
    dpr = Math.min(devicePixelRatio || 1, 2); const r = root.getBoundingClientRect();
    W = Math.max(1, Math.round(r.width * dpr)); H = Math.max(1, Math.round(r.height * dpr));
    cv.width = W; cv.height = H;
    const block = r.width < 900;   // en desktop, le relief est décalé à droite du texte et déborde dessous
    SCALE = block ? Math.min(W * .82, H * 1.25) : Math.min(W * .9, H * 2.1); OY = H * .05; OX = block ? 0 : W * .06;
    if (reduced) render(DUR * .8);
  }
  // la souris incline la caméra (le hero est sous le texte : on écoute le header)
  const header = root.closest('.section_header') || document.body, mouse = { x: 0, y: 0, tx: 0, ty: 0 };
  header.addEventListener('pointermove', e => { mouse.tx = e.clientX / innerWidth - .5; mouse.ty = e.clientY / innerHeight - .5; }, { passive: true });
  header.addEventListener('pointerleave', () => { mouse.tx = 0; mouse.ty = 0; }, { passive: true });

  const seg = (t, a, b) => Math.max(0, Math.min(1, (t - a) / (b - a)));

  function render(t) {
    const s = Math.floor(t / DUR) % NS, a = (s + NS - 1) % NS, uu = t - Math.floor(t / DUR) * DUR, kk = seg(uu, 0, WAVE);
    const rot = [-.38 + .16 * Math.sin(t * .06) + mouse.x * .35, .5 + mouse.y * .12];
    gl.viewport(0, 0, W, H); gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(pr); gl.bindVertexArray(vao);
    gl.uniform1i(u.a, a); gl.uniform1i(u.b, s); gl.uniform1f(u.k, kk); gl.uniform1f(u.t, t);
    gl.uniform1f(u.scale, SCALE); gl.uniform1f(u.cam, CAM); gl.uniform1f(u.dpr, dpr); gl.uniform1f(u.oy, OY); gl.uniform1f(u.ox, OX);
    gl.uniform2f(u.rot, rot[0], rot[1]); gl.uniform2f(u.res, W, H);
    gl.enable(gl.BLEND); gl.blendFunc(gl.ONE, gl.ONE);   // lumière additive douce
    gl.drawArrays(gl.POINTS, 0, GX * GZ);

  }

  // réglage de proto : ?pvt=10 fige la scène à 10 s
  const FREEZE = parseFloat(new URLSearchParams(location.search).get('pvt'));
  let raf = 0, time = 0, last = 0;
  function loop(now) { raf = requestAnimationFrame(loop); const dt = Math.min((now - last) / 1000, .05); last = now; mouse.x += (mouse.tx - mouse.x) * .05; mouse.y += (mouse.ty - mouse.y) * .05; time += dt; render(Number.isFinite(FREEZE) ? FREEZE : time); }
  function start() { if (raf || reduced) return; last = performance.now(); raf = requestAnimationFrame(loop); }
  function stop() { cancelAnimationFrame(raf); raf = 0; }
  cv.addEventListener('webglcontextlost', e => { e.preventDefault(); stop(); });
  const ro = new ResizeObserver(resize); ro.observe(root); resize();
  let iob = null;
  if (reduced) render(DUR * .8);
  else { iob = new IntersectionObserver(([e]) => e.isIntersecting ? start() : stop()); iob.observe(root); }
  return { destroy() { stop(); ro.disconnect(); if (iob) iob.disconnect(); cv.remove(); delete root.dataset.pvReady; } };
}
