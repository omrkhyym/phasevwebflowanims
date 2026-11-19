/* Hero homepage, « morph » (WebGL2, recherche style affiné). Illustration abstraite, sans récit :
   une seule matière de points lumineux qui passe d'une forme 3D à l'autre, emportée par un courant fluide.
   Formes : nappe ondulante → ruban torsadé → anneau → hélice → nappe… (boucle de 24 s).
   Profondeur de champ : les points hors du plan net deviennent de grands disques doux.
   Caméra en orbite lente, inclinée par la souris. Monté dans <div data-pv="hero-morph"></div>. */
const SEL = '[data-pv="hero-morph"]';
const CSS = `
.header_image-wrapper:has(${SEL}){ background:none!important; border:0!important; box-shadow:none!important; position:relative; overflow:visible!important; min-height:30rem; }
.header_component:has(${SEL}), .header_content:has(${SEL}){ position:relative; }
.header_content:has(${SEL}) .header_content-left{ position:relative; z-index:2; }
/* très grand, ancré à droite, passe sous la colonne de texte ; s'estompe côté texte */
${SEL}{ position:absolute; top:-18%; bottom:-18%; right:-8%; width:96vw; z-index:0; pointer-events:none;
  -webkit-mask-image:linear-gradient(90deg, transparent 2%, rgba(0,0,0,.4) 24%, #000 46%); mask-image:linear-gradient(90deg, transparent 2%, rgba(0,0,0,.4) 24%, #000 46%); }
${SEL} canvas{ position:absolute; inset:0; width:100%; height:100%; display:block; }
@media (max-width:991px){
  .section_header:has(${SEL}){ height:auto; min-height:100svh; display:flex; flex-direction:column; justify-content:center; overflow-x:clip; }
  .header_component:has(${SEL}), .header_component:has(${SEL}) .header_content{ height:auto; }
  ${SEL}{ position:relative; top:auto; bottom:auto; right:auto; width:100vw; margin-left:calc(50% - 50vw); aspect-ratio:1/1; margin-top:1rem; -webkit-mask-image:none; mask-image:none; }
}`;

const VS = `#version 300 es
layout(location=0) in vec3 a_p;   // u, v (paramètres de surface), r (aléa par point)
uniform float u_k, u_t, u_lt, u_scale, u_cam, u_dpr, u_ox, u_oy, u_fade;
uniform int u_a, u_b;
uniform vec2 u_rot, u_res;
out float v_a; out float v_b; out vec3 v_c;
const float PI=3.14159265, TAU=6.2831853;
vec3 shape(int id, float u, float v, float t){
  if(id==0){                                            // nappe ondulante
    float x=(u-.5)*2.7, z=(v-.5)*1.8;
    float y=.17*sin(x*2.3+t*.6)*cos(z*2.6-t*.45)+.07*sin(x*5.-z*3.2+t*.9);
    return vec3(x,y-.04,z);
  }
  if(id==1){                                            // ruban fermé, trois demi-torsions
    float a=u*TAU, w=(v-.5)*.72, tw=a*1.5+t*.3;
    float R=.86+.06*sin(a*3.+t*.5);
    vec3 n=vec3(cos(a),0.,sin(a));
    return n*R+vec3(0.,.14*sin(a*2.+t*.4),0.)+n*w*cos(tw)+vec3(0.,w*sin(tw),0.);
  }
  if(id==2){                                            // anneau (le cercle du logo)
    float a=u*TAU, b=v*TAU+t*.35;
    float R=.82, r=.25+.05*sin(a*4.+t*.6);
    return vec3((R+r*cos(b))*cos(a), r*sin(b), (R+r*cos(b))*sin(a));
  }
  // hélice : surface vissée le long de x, effilée aux deux bouts
  float x=(u-.5)*2.9, a=u*TAU*2.2+t*.4, w=(v-.5)*.95*(.3+.7*sin(u*PI));
  return vec3(x, w*sin(a), w*cos(a));
}
vec3 rotY(vec3 p, float a){ float c=cos(a), s=sin(a); return vec3(c*p.x+s*p.z, p.y, -s*p.x+c*p.z); }
void main(){
  float u=a_p.x, v=a_p.y, r=a_p.z;
  // chaque point part avec un léger décalage : la transformation balaie la forme de gauche à droite
  float kk=clamp(u_k*1.75-(u*.6+r*.15),0.,1.); kk=kk<.5?4.*kk*kk*kk:1.-pow(-2.*kk+2.,3.)/2.;
  vec3 P=mix(shape(u_a,u,v,u_t), shape(u_b,u,v,u_t), kk);
  // le courant : tourbillon autour de l'axe vertical et houle, maximum au milieu de la transformation
  float bump=sin(PI*kk);
  P=rotY(P, bump*(1.1+.8*r)*(P.y+.6));
  vec3 q=P*1.8;
  P+=vec3(sin(q.y*2.1+u_t*.8+r*4.), sin(q.z*2.3-u_t*.7+r*2.), sin(q.x*1.9+u_t*.6))*.26*bump;
  // caméra
  float cy=cos(u_rot.x), sy=sin(u_rot.x); P=vec3(cy*P.x+sy*P.z,P.y,-sy*P.x+cy*P.z);
  float cp=cos(u_rot.y), sp=sin(u_rot.y); P=vec3(P.x,cp*P.y+sp*P.z,cp*P.z-sp*P.y);
  float z=u_cam+P.z; vec2 s=P.xy/z*u_scale;
  gl_Position=vec4((s.x+u_ox)/u_res.x*2.,(s.y+u_oy)/u_res.y*2.,0.,1.);
  // profondeur de champ : net au centre de la forme, disques doux devant et derrière
  float blur=clamp(abs(P.z+.05)-.12,0.,1.3);
  float sz=1.5+15.*blur*blur+2.*clamp(-P.z,0.,1.);
  gl_PointSize=u_dpr*sz*(3.2/z);
  v_b=clamp(blur*1.6,0.,1.);
  float spark=step(.993,r);
  v_a=(.62*pow(1.5/sz,1.15)*(.75+.5*r)+spark*.5*(1.-v_b))*u_fade;
  // couleur : mauve, bleu, turquoise le long de la forme ; les points nets tirent vers le blanc
  vec3 MAU=vec3(.663,.624,.847), BLU=vec3(.471,.659,.878), TEA=vec3(.498,.910,.812), WHI=vec3(.957);
  float f=fract(u*1.+v*.35+u_lt*.02);
  vec3 c=f<.33?mix(MAU,BLU,f/.33):f<.66?mix(BLU,TEA,(f-.33)/.33):mix(TEA,MAU,(f-.66)/.34);
  v_c=mix(c,WHI,(1.-v_b)*.38+spark*.5);
}`;
const FS = `#version 300 es
precision highp float;
in float v_a; in float v_b; in vec3 v_c; out vec4 o;
void main(){
  float d=length(gl_PointCoord-.5);
  float sharp=smoothstep(.5,.18,d);
  float bokeh=smoothstep(.5,.4,d)*(.65+.35*smoothstep(.15,.45,d));   // disque doux, bord un peu plus lumineux
  float a=mix(sharp,bokeh,v_b)*v_a; if(a<.002) discard;
  o=vec4(v_c*a,a);
}`;

const HOLD = 3.4, MORPH = 2.6, STEP = HOLD + MORPH, NS = 4, LOOP = STEP * NS;

export function initHeroMorph(root) {
  if (root.dataset.pvReady) return;
  root.dataset.pvReady = '1';
  if (!document.getElementById('pv-hero-morph-css')) { const s = document.createElement('style'); s.id = 'pv-hero-morph-css'; s.textContent = CSS; document.head.appendChild(s); }
  const cv = document.createElement('canvas');
  cv.setAttribute('aria-hidden', 'true');
  root.appendChild(cv);
  const gl = cv.getContext('webgl2', { alpha: true, antialias: false, premultipliedAlpha: true });
  if (!gl) return;

  // grille de paramètres (u, v) avec un léger aléa pour éviter le moiré
  const GU = 420, GV = 144, N = GU * GV, pts = new Float32Array(N * 3);
  let seed = 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  for (let j = 0, k = 0; j < GV; j++) for (let i = 0; i < GU; i++) {
    pts[k++] = (i + rnd() * .8) / GU; pts[k++] = (j + rnd() * .8) / GV; pts[k++] = rnd();
  }
  function sh(t, src) { const s = gl.createShader(t); gl.shaderSource(s, src); gl.compileShader(s); if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s)); return s; }
  const pr = gl.createProgram(); gl.attachShader(pr, sh(gl.VERTEX_SHADER, VS)); gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, FS)); gl.linkProgram(pr);
  if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(pr));
  const U = n => gl.getUniformLocation(pr, n);
  const u = { k: U('u_k'), t: U('u_t'), lt: U('u_lt'), a: U('u_a'), b: U('u_b'), scale: U('u_scale'), cam: U('u_cam'), dpr: U('u_dpr'), ox: U('u_ox'), oy: U('u_oy'), fade: U('u_fade'), rot: U('u_rot'), res: U('u_res') };
  const vao = gl.createVertexArray(); gl.bindVertexArray(vao);
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer()); gl.bufferData(gl.ARRAY_BUFFER, pts, gl.STATIC_DRAW);
  gl.enableVertexAttribArray(0); gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);

  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const CAM = 3.2;
  let W = 0, H = 0, dpr = 1, SCALE = 1, OX = 0, OY = 0;
  function resize() {
    dpr = Math.min(devicePixelRatio || 1, 2); const r = root.getBoundingClientRect();
    W = Math.max(1, Math.round(r.width * dpr)); H = Math.max(1, Math.round(r.height * dpr));
    cv.width = W; cv.height = H;
    const block = r.width < 900;
    SCALE = block ? Math.min(W, H) * 1.25 : Math.min(W * .78, H * 1.75); OX = block ? 0 : W * .13; OY = 0;   // en desktop, la forme est décalée à droite du texte
    if (reduced) render(STEP * 2 + HOLD * .5, 0);
  }
  const header = root.closest('.section_header') || document.body, mouse = { x: 0, y: 0, tx: 0, ty: 0 };
  header.addEventListener('pointermove', e => { mouse.tx = e.clientX / innerWidth - .5; mouse.ty = e.clientY / innerHeight - .5; }, { passive: true });
  header.addEventListener('pointerleave', () => { mouse.tx = 0; mouse.ty = 0; }, { passive: true });

  // lt : temps dans la boucle (choix des formes) ; t : temps continu (ondulations, caméra), pour ne jamais sauter au bouclage
  function render(lt, t) {
    const i = Math.floor(lt / STEP) % NS, ph = lt - Math.floor(lt / STEP) * STEP;
    const k = Math.max(0, Math.min(1, (ph - HOLD) / MORPH));
    const rot = [-.4 + t * .07 + mouse.x * .35, .5 + .07 * Math.sin(t * .13) + mouse.y * .12];
    gl.viewport(0, 0, W, H); gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(pr); gl.bindVertexArray(vao);
    gl.uniform1i(u.a, i); gl.uniform1i(u.b, (i + 1) % NS); gl.uniform1f(u.k, k);
    gl.uniform1f(u.t, t); gl.uniform1f(u.lt, lt); gl.uniform1f(u.fade, reduced ? 1 : Math.min(1, t / 1.5));
    gl.uniform1f(u.scale, SCALE); gl.uniform1f(u.cam, CAM); gl.uniform1f(u.dpr, dpr); gl.uniform1f(u.ox, OX); gl.uniform1f(u.oy, OY);
    gl.uniform2f(u.rot, rot[0], rot[1]); gl.uniform2f(u.res, W, H);
    gl.enable(gl.BLEND); gl.blendFunc(gl.ONE, gl.ONE);
    gl.drawArrays(gl.POINTS, 0, N);
  }

  // réglage de proto : ?pvt=10 fige la scène à 10 s (vérification sans attendre)
  const FREEZE = parseFloat(new URLSearchParams(location.search).get('pvt'));
  let raf = 0, time = 0, last = 0;
  function loop(now) {
    raf = requestAnimationFrame(loop); const dt = Math.min((now - last) / 1000, .05); last = now;
    mouse.x += (mouse.tx - mouse.x) * .05; mouse.y += (mouse.ty - mouse.y) * .05; time += dt;
    if (Number.isFinite(FREEZE)) render(FREEZE % LOOP, FREEZE); else render(time % LOOP, time);
  }
  function start() { if (raf || reduced) return; last = performance.now(); raf = requestAnimationFrame(loop); }
  function stop() { cancelAnimationFrame(raf); raf = 0; }
  cv.addEventListener('webglcontextlost', e => { e.preventDefault(); stop(); });
  const ro = new ResizeObserver(resize); ro.observe(root); resize();
  let iob = null;
  if (!reduced) { iob = new IntersectionObserver(([e]) => e.isIntersecting ? start() : stop()); iob.observe(root); }
  return { destroy() { stop(); ro.disconnect(); if (iob) iob.disconnect(); cv.remove(); delete root.dataset.pvReady; } };
}
