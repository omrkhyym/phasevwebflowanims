/* Hero homepage, « pulse » (WebGL2, recherche style affiné). Illustration abstraite en boucle (27 s), les mêmes particules du début à la fin :
   1. un blob de particules, organique, qui se déforme et tourne sur lui-même ;
   2. il se contracte puis explose : les particules filent vers les bords et les coins et sortent du cadre ;
   3. elles reviennent de l'extérieur et forment un plan qui couvre presque tout l'écran ; une onde d'impact part du centre, puis des vagues amples ;
   4. la caméra recule (dézoom), le plan rétrécit et cinq montagnes se forment (pic, crête, double sommet, massif, petit pic) ;
   5. la caméra tourne lentement autour du paysage ;
   6. les sommets s'évaporent vers le haut et les particules se rassemblent en blob : la boucle repart, vue d'un autre angle à chaque tour.
   Profondeur de champ : hors du plan net, les points deviennent des disques doux. Monté dans <div data-pv="hero-pulse"></div>. */
const SEL = '[data-pv="hero-pulse"]';
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

const ZR = .75;   // demi-profondeur de la grille (x va de -1 à 1)
// chronologie de la boucle (s)
const T = {
  boom: 4.0,            // l'explosion
  back: 4.5,            // début du retour vers le plan
  ripple: 6.2,          // l'onde d'impact part du centre
  cam2: [4.4, 6.8],     // caméra : vers le plan, tout proche
  land: [10.5, 14],     // dézoom, les montagnes se forment
  orbit: 11,            // la caméra commence à tourner
  evap: [22.2, 26.4],   // les sommets s'évaporent et se rassemblent en blob
  cam4: [23.2, 26.6],   // caméra : retour au blob
  L: 27,
};
const ORBIT = .12;                                      // vitesse de rotation autour du paysage (rad/s)
const TURN = ORBIT * (T.L - T.orbit) - .35;            // angle gagné à chaque tour : la boucle repart d'un autre point de vue

const f = v => v.toFixed(3);
const VS = `#version 300 es
layout(location=0) in vec2 a_g;   // position sur la grille
layout(location=1) in vec4 a_r;   // aléas
uniform float u_lt, u_t, u_w3, u_w4, u_scale, u_cam, u_dpr, u_ox, u_oy, u_dof;
uniform vec2 u_rot, u_res;
out float v_a; out float v_b; out float v_s; out vec2 v_d; out vec3 v_c;
const float PI=3.14159265, TAU=6.2831853;
float ez(float k){ return k<.5?4.*k*k*k:1.-pow(-2.*k+2.,3.)/2.; }
vec3 rotY(vec3 p, float a){ float c=cos(a), s=sin(a); return vec3(c*p.x+s*p.z, p.y, -s*p.x+c*p.z); }
vec3 rotX(vec3 p, float a){ float c=cos(a), s=sin(a); return vec3(p.x, c*p.y-s*p.z, s*p.y+c*p.z); }
float G(vec2 p, vec2 c, float s){ vec2 d=p-c; return exp(-dot(d,d)/(s*s)); }
// les cinq montagnes : pic effilé, crête allongée, double sommet, massif arrondi, petit pic
float relief(vec2 p){
  float h=.44*exp(-length(p-vec2(.12,-.08))/.12);
  vec2 q=mat2(.87,-.5,.5,.87)*(p-vec2(-.52,.2)); h+=.24*exp(-(q.x*q.x/.09+q.y*q.y/.006));
  h+=.27*G(p,vec2(.55,.32),.1)+.23*G(p,vec2(.71,.15),.09);
  h+=.19*G(p,vec2(-.2,.5),.24);
  h+=.16*exp(-length(p-vec2(.6,-.45))/.08);
  return h+.012*sin(p.x*13.+p.y*7.)*cos(p.y*11.-p.x*3.);
}
// déformation organique du blob
float bn(vec3 p, float t){
  return .5*sin(dot(p,vec3(1.7,2.3,-1.1))*1.9+t*.9)+.35*sin(dot(p,vec3(-2.6,.9,1.8))*2.3-t*1.2)
        +.25*sin(dot(p,vec3(1.2,-3.1,2.4))*2.9+t*1.6)+.15*sin(dot(p,vec3(3.7,1.4,-2.9))*3.7-t*2.1);
}
void main(){
  vec2 g=a_g; vec4 r=a_r; float lt=u_lt, t=u_t;
  vec3 MAU=vec3(.663,.624,.847), BLU=vec3(.471,.659,.878), TEA=vec3(.498,.910,.812), WHI=vec3(.957);
  float ct=r.y*2.-1., sn=sqrt(1.-ct*ct), ph=r.z*TAU; vec3 dir=vec3(sn*cos(ph),ct,sn*sin(ph));

  // 1. le blob (temps continu : aucun saut au bouclage) ; il se contracte juste avant d'exploser
  vec3 wd=dir+.18*vec3(sin(t*.7+dir.y*3.),sin(t*.6+dir.z*3.),sin(t*.8+dir.x*3.));
  float pre=smoothstep(${f(T.boom - .7)},${f(T.boom - .05)},lt)*step(lt,${f(T.boom)});
  float rad=.3*(1.+.36*bn(wd,t))*pow(fract(r.w*5.13),.38)*(1.-.35*pre);
  vec3 Bp=rotX(rotY(dir*rad,t*.22),.3*sin(t*.13));
  float Ba=.075; vec3 Bc=mix(WHI,MAU,smoothstep(.15,.4,rad)*.6);

  // 3. le plan, très grand ; l'onde d'impact puis des vagues amples
  vec2 pg=g*1.9;
  float wv=.075*sin(pg.x*1.6+lt*1.05+sin(pg.y*1.3+lt*.4))*cos(pg.y*1.9-lt*.8)+.035*sin(pg.x*3.7-lt*1.4+pg.y*2.1);
  float ra=lt-${f(T.ripple)}, rr=length(pg), R=ra*1.15;
  wv+=step(0.,ra)*.16*exp(-pow((rr-R)/.16,2.))*cos((rr-R)*24.)*exp(-ra*.45);
  vec3 Pp=vec3(pg.x, -.1+wv, pg.y);
  float Pa=.45*(.75+4.*wv); vec3 Pc=mix(MAU,BLU,clamp(.5+wv*7.,0.,1.)); Pc=mix(Pc,TEA,smoothstep(.07,.15,wv));

  // 2. l'explosion vers les bords et les coins, puis le retour vers le plan
  vec3 Hp=Bp; float Ha=Ba; vec3 Hc=Bc; float S=0.;
  float age=lt-${f(T.boom)};
  if(age>0.){
    vec3 cdir=normalize(mix(dir, vec3(sign(dir.x)*(.6+.4*abs(dir.x)), sign(dir.y)*(.35+.4*abs(dir.y)), dir.z*.5), .6));
    float V=2.+3.*fract(r.w*2.71);
    float s0=fract(r.y*3.1), a0=${f(T.back - T.boom)}+s0*.9;
    float kr=ez(clamp((age-a0)/1.6,0.,1.));
    float ae=min(age,a0), d=min(.25+V*ae+2.*ae*ae, 3.2);
    vec3 ex=cdir*d;
    vec3 bc=mix(WHI,mix(BLU,MAU,r.z),smoothstep(0.,.8,age));
    Hp=mix(ex,Pp,kr); Ha=mix(.5,Pa,kr); Hc=mix(bc,Pc,kr);
    S=(1.-kr)*clamp(1.-age*.4,0.,1.)*.9;
  }

  // 4. les montagnes
  float h=relief(g)+.008*sin(lt*1.1+g.x*7.+g.y*5.);
  vec3 Mp=vec3(g.x, h*1.7-.18, g.y);
  float edge=smoothstep(1.,.75,abs(g.x))*smoothstep(${f(ZR)},${f(ZR * .62)},abs(g.y));
  float Ma=.42*(.45+1.8*h)*edge;
  vec3 Mc=mix(MAU,BLU,smoothstep(.02,.14,h)); Mc=mix(Mc,TEA,smoothstep(.14,.28,h)); Mc=mix(Mc,WHI,smoothstep(.28,.42,h)*.6);
  float k3=ez(clamp(u_w3*1.6-(.3*fract(r.x*4.3)+.3*length(g)),0.,1.));

  // 6. l'évaporation : les sommets d'abord, en spirale vers le haut, jusqu'au blob
  float s4=(1.-clamp(h/.44,0.,1.))*.7+fract(r.x*7.7)*.3;
  float k4=ez(clamp(u_w4*1.8-s4*.8,0.,1.));

  vec3 P=mix(Hp,Mp,k3);
  P=mix(P,Bp,k4)+vec3(0.,.6*sin(PI*k4),0.); P=rotY(P,k4*(1.-k4)*2.2);
  float A=mix(Ha,Ma,k3); A=mix(A,Ba,k4)+.15*sin(PI*k4)*(1.-s4);
  vec3 C=mix(Hc,Mc,k3); C=mix(C,mix(Bc,WHI,sin(PI*k4)*.5),k4);
  S*=(1.-k3);

  // caméra
  float cy=cos(u_rot.x), sy=sin(u_rot.x); P=vec3(cy*P.x+sy*P.z,P.y,-sy*P.x+cy*P.z);
  float cp=cos(u_rot.y), sp=sin(u_rot.y); P=vec3(P.x,cp*P.y+sp*P.z,cp*P.z-sp*P.y);
  float zr=u_cam+P.z, z=max(zr,.3); vec2 s=P.xy/z*u_scale;
  gl_Position=vec4((s.x+u_ox)/u_res.x*2.,(s.y+u_oy)/u_res.y*2.,0.,1.);
  // profondeur de champ : net au centre, disques doux devant et derrière (l'énergie du point est conservée)
  float near=clamp(2.25-z*.62,.08,1.);
  float base=1.+2.4*near, blur=clamp(abs(P.z)-.35,0.,1.6)*u_dof;
  float sz=min(base+14.*blur*blur,70.);
  v_b=clamp(blur*1.8,0.,1.);
  v_s=S; v_d=normalize(s+1e-4);
  gl_PointSize=u_dpr*sz*(1.+2.*S);
  v_a=A*near*pow(base/sz,1.25)*smoothstep(.35,.7,zr);
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

export function initHeroPulse(root) {
  if (root.dataset.pvReady) return;
  root.dataset.pvReady = '1';
  if (!document.getElementById('pv-hero-pulse-css')) { const s = document.createElement('style'); s.id = 'pv-hero-pulse-css'; s.textContent = CSS; document.head.appendChild(s); }
  const cv = document.createElement('canvas');
  cv.setAttribute('aria-hidden', 'true');
  root.appendChild(cv);
  const gl = cv.getContext('webgl2', { alpha: true, antialias: false, premultipliedAlpha: true });
  if (!gl) return;

  // la grille (dense : le plan est vu de très près) et 4 aléas par point
  const GX = 384, GZ = 192, N = GX * GZ, grid = new Float32Array(N * 2), rnd4 = new Float32Array(N * 4);
  let seed = 11; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  for (let j = 0, k = 0; j < GZ; j++) for (let i = 0; i < GX; i++, k++) {
    grid[k * 2] = -1 + 2 * i / (GX - 1) + (rnd() - .5) * .003; grid[k * 2 + 1] = -ZR + 2 * ZR * j / (GZ - 1);
    for (let c = 0; c < 4; c++) rnd4[k * 4 + c] = rnd();
  }
  function sh(t, src) { const s = gl.createShader(t); gl.shaderSource(s, src); gl.compileShader(s); if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s)); return s; }
  const pr = gl.createProgram(); gl.attachShader(pr, sh(gl.VERTEX_SHADER, VS)); gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, FS)); gl.linkProgram(pr);
  if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(pr));
  const u = {}; ['lt', 't', 'w3', 'w4', 'scale', 'cam', 'dpr', 'ox', 'oy', 'dof', 'rot', 'res'].forEach(n => { u[n] = gl.getUniformLocation(pr, 'u_' + n); });
  const vao = gl.createVertexArray(); gl.bindVertexArray(vao);
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer()); gl.bufferData(gl.ARRAY_BUFFER, grid, gl.STATIC_DRAW);
  gl.enableVertexAttribArray(0); gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer()); gl.bufferData(gl.ARRAY_BUFFER, rnd4, gl.STATIC_DRAW);
  gl.enableVertexAttribArray(1); gl.vertexAttribPointer(1, 4, gl.FLOAT, false, 0, 0);

  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let W = 0, H = 0, dpr = 1, SCALE = 1, OX = 0, OY = 0;
  function resize() {
    dpr = Math.min(devicePixelRatio || 1, 2); const r = root.getBoundingClientRect();
    W = Math.max(1, Math.round(r.width * dpr)); H = Math.max(1, Math.round(r.height * dpr));
    cv.width = W; cv.height = H;
    const block = r.width < 900;   // en desktop, la scène est décalée à droite du texte et déborde dessous
    SCALE = block ? Math.min(W * .82, H * 1.25) : Math.min(W * .9, H * 2.1); OX = block ? 0 : W * .06; OY = H * .05;
    if (reduced) render(18);
  }
  const header = root.closest('.section_header') || document.body, mouse = { x: 0, y: 0, tx: 0, ty: 0 };
  header.addEventListener('pointermove', e => { mouse.tx = e.clientX / innerWidth - .5; mouse.ty = e.clientY / innerHeight - .5; }, { passive: true });
  header.addEventListener('pointerleave', () => { mouse.tx = 0; mouse.ty = 0; }, { passive: true });

  const seg = (t, [a, b]) => Math.max(0, Math.min(1, (t - a) / (b - a)));
  const io = v => v < .5 ? 4 * v * v * v : 1 - Math.pow(-2 * v + 2, 3) / 2;
  const lerp = (a, b, k) => a + (b - a) * k;

  // time : temps continu ; lt : temps dans la boucle. La caméra gagne un angle à chaque tour, sans jamais sauter.
  function render(time) {
    const lt = time % T.L, n = Math.floor(time / T.L);
    const e2 = io(seg(lt, T.cam2)), e3 = io(seg(lt, T.land)), e4 = io(seg(lt, T.cam4));
    let yaw = 0, pit = .06, cam = 2.6, dof = 1;                                   // le blob
    yaw = lerp(yaw, .12, e2); pit = lerp(pit, .42, e2); cam = lerp(cam, 2.0, e2); dof = lerp(dof, .8, e2);   // le plan, tout proche
    const orb = -.35 + ORBIT * Math.max(0, lt - T.orbit);
    yaw = lerp(yaw, orb, e3); pit = lerp(pit, .5, e3); cam = lerp(cam, 2.65, e3); dof = lerp(dof, .3, e3);  // dézoom, puis orbite
    yaw = lerp(yaw, TURN, e4); pit = lerp(pit, .06, e4); cam = lerp(cam, 2.6, e4); dof = lerp(dof, 1, e4);  // retour au blob
    gl.viewport(0, 0, W, H); gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(pr); gl.bindVertexArray(vao);
    gl.uniform1f(u.lt, lt); gl.uniform1f(u.t, time); gl.uniform1f(u.w3, seg(lt, T.land)); gl.uniform1f(u.w4, seg(lt, T.evap));
    gl.uniform1f(u.dof, dof); gl.uniform1f(u.scale, SCALE); gl.uniform1f(u.cam, cam); gl.uniform1f(u.dpr, dpr); gl.uniform1f(u.ox, OX); gl.uniform1f(u.oy, OY);
    gl.uniform2f(u.rot, n * TURN + yaw + mouse.x * .35, pit + mouse.y * .12); gl.uniform2f(u.res, W, H);
    gl.enable(gl.BLEND); gl.blendFunc(gl.ONE, gl.ONE);
    gl.drawArrays(gl.POINTS, 0, N);
  }

  // réglage de proto : ?pvt=10 fige la scène à 10 s
  const FREEZE = parseFloat(new URLSearchParams(location.search).get('pvt'));
  let raf = 0, time = 0, last = 0;
  function loop(now) {
    raf = requestAnimationFrame(loop); const dt = Math.min((now - last) / 1000, .05); last = now;
    mouse.x += (mouse.tx - mouse.x) * .05; mouse.y += (mouse.ty - mouse.y) * .05; time += dt;
    render(Number.isFinite(FREEZE) ? FREEZE : time);
  }
  function start() { if (raf || reduced) return; last = performance.now(); raf = requestAnimationFrame(loop); }
  function stop() { cancelAnimationFrame(raf); raf = 0; }
  cv.addEventListener('webglcontextlost', e => { e.preventDefault(); stop(); });
  const ro = new ResizeObserver(resize); ro.observe(root); resize();
  let iob = null;
  if (!reduced) { iob = new IntersectionObserver(([e]) => e.isIntersecting ? start() : stop()); iob.observe(root); }
  return { destroy() { stop(); ro.disconnect(); if (iob) iob.disconnect(); cv.remove(); delete root.dataset.pvReady; } };
}
