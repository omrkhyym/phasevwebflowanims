/* Hero homepage, « de l'incertitude à la décision connectée » (WebGL2, recherche style affiné). Une seule scène, trois temps :
   1. les futurs possibles : des trajectoires de lumière très fines partent d'un même point et s'ouvrent en éventail dans la profondeur ;
   2. le paysage se révèle : les trajectoires retombent et dessinent un terrain de points (l'évidence donne forme à l'incertitude) ;
   3. la décision connectée : une route jaune traverse le terrain par les crêtes, puis 4 étapes s'allument le long de la route.
   Ensuite tout se dissout en trajectoires et la boucle repart. Caméra en orbite lente, inclinée par la souris.
   Monté dans <div data-pv="hero-decision"> ; textes dans les enfants [data-role] : captions (3 <li>, un par temps), steps (4 <li>). */
const SEL = '[data-pv="hero-decision"]';
const CSS = `
.header_image-wrapper:has(${SEL}){ background:none!important; border:0!important; box-shadow:none!important; position:relative; overflow:visible!important; min-height:30rem; }
.header_component:has(${SEL}), .header_content:has(${SEL}){ position:relative; }
.header_content:has(${SEL}) .header_content-left{ position:relative; z-index:2; }
/* grand, ancré à droite, passe sous la colonne de texte ; s'estompe côté texte */
${SEL}{ position:absolute; top:-12%; bottom:-12%; right:-6%; width:88vw; z-index:0; pointer-events:none;
  -webkit-mask-image:linear-gradient(90deg, transparent 0%, rgba(0,0,0,.35) 22%, #000 48%); mask-image:linear-gradient(90deg, transparent 0%, rgba(0,0,0,.35) 22%, #000 48%); }
${SEL} canvas{ position:absolute; inset:0; width:100%; height:100%; display:block; }
${SEL} > [data-role]{ position:absolute; width:1px; height:1px; overflow:hidden; clip-path:inset(50%); white-space:nowrap; }
${SEL} .pv-hero-cap{ position:absolute; right:12%; bottom:11%; display:flex; flex-direction:column; align-items:flex-end; gap:.75rem;
  font-family:var(--af-mono, "Roboto Mono", monospace); font-size:.75rem; letter-spacing:.14em; text-transform:uppercase; color:rgba(248,248,248,.75); white-space:nowrap; transition:opacity .6s ease; }
${SEL} .pv-hero-cap::before{ content:''; width:2.5rem; height:1px; background:rgba(248,248,248,.35); }
${SEL} .pv-hero-cap.is-out{ opacity:0; }
@media (max-width:991px){
  .section_header:has(${SEL}){ height:auto; min-height:100svh; display:flex; flex-direction:column; justify-content:center; overflow-x:clip; }
  .header_component:has(${SEL}), .header_component:has(${SEL}) .header_content{ height:auto; }
  ${SEL}{ position:relative; top:auto; bottom:auto; right:auto; width:100vw; margin-left:calc(50% - 50vw); aspect-ratio:1/1; margin-top:1rem; -webkit-mask-image:none; mask-image:none; }
  ${SEL} .pv-hero-cap{ right:50%; transform:translateX(50%); align-items:center; bottom:6%; }
}`;

/* ---------- le terrain (même formule en GLSL et en JS : le JS trace la route par les crêtes) ---------- */
const G = (x, z, cx, cz, s) => Math.exp(-((x - cx) ** 2 + (z - cz) ** 2) / (s * s));
const LAND = (x, z) => .2 * G(x, z, -.55, .22, .3) + .3 * G(x, z, .18, -.12, .28) + .22 * G(x, z, .68, .3, .22) + .12 * G(x, z, -.15, .4, .2) + .1 * G(x, z, .5, -.42, .2)
  + .025 * Math.sin(x * 9 + z * 4) * Math.cos(z * 6);
const LAND_GLSL = `
float G(vec2 p, vec2 c, float s){ vec2 d=p-c; return exp(-dot(d,d)/(s*s)); }
float land(vec2 p){ return .2*G(p,vec2(-.55,.22),.3)+.3*G(p,vec2(.18,-.12),.28)+.22*G(p,vec2(.68,.3),.22)+.12*G(p,vec2(-.15,.4),.2)+.1*G(p,vec2(.5,-.42),.2)
  +.025*sin(p.x*9.+p.y*4.)*cos(p.y*6.); }`;
const ZR = .62, HS = 1.8, HY = -.2;   // demi-profondeur du terrain ; échelle et décalage du relief

const VS = `#version 300 es
layout(location=0) in vec2 a_p;
uniform float u_rev, u_m, u_t, u_scale, u_cam, u_dpr, u_oy, u_ox, u_fade;
uniform vec2 u_rot, u_res;
out float v_a; out vec3 v_c;
${LAND_GLSL}
void main(){
  vec2 p=a_p; float u=p.x*.5+.5;
  // 1. trajectoire : part de l'origine (x=-1, centre), s'ouvre en éventail en profondeur, ondule
  float zt=p.y*pow(u,.8)*1.15;
  float yt=(p.y*.7+.1*sin(p.y*23.))*u+.12*sin(u*6.+p.y*19.)*u+.04*sin(u_t*.8+p.y*11.)*u;   // éventail ouvert aussi en hauteur
  // 2. terrain
  float h=land(p);
  float w=clamp(u_m*1.7-u*.7,0.,1.); w=w*w*(3.-2.*w);                      // les trajectoires retombent de gauche à droite
  vec3 P=vec3(p.x, mix(yt, h, w)*${HS.toFixed(2)}+${HY.toFixed(2)}, mix(zt, p.y, w));
  P.y+=.08*w*(1.-w)*4.*.25;
  float cy=cos(u_rot.x), sy=sin(u_rot.x); P=vec3(cy*P.x+sy*P.z,P.y,-sy*P.x+cy*P.z);
  float cp=cos(u_rot.y), sp=sin(u_rot.y); P=vec3(P.x,cp*P.y+sp*P.z,cp*P.z-sp*P.y);
  float z=u_cam+P.z; vec2 s=P.xy/z*u_scale;
  gl_Position=vec4((s.x+u_ox)/u_res.x*2.,(s.y+u_oy)/u_res.y*2.,0.,1.);
  float near=clamp(2.35-z*.62,.08,1.);
  gl_PointSize=u_dpr*(1.+2.3*near);
  float reveal=smoothstep(u_rev,u_rev-.06,u);                                  // les trajectoires se tracent depuis l'origine
  float edge=mix(1., smoothstep(1.,.72,abs(p.x))*smoothstep(.62,.4,abs(p.y)), w);
  float aT=.38*near*(.55+.45*(1.-u)), aL=.7*near*(.45+1.8*h);
  v_a=mix(aT*reveal, aL, w)*edge*u_fade;
  vec3 MAU=vec3(.663,.624,.847), BLU=vec3(.471,.659,.878), TEA=vec3(.498,.910,.812), WHI=vec3(.957);
  vec3 cL=mix(MAU,BLU,smoothstep(.02,.16,h)); cL=mix(cL,TEA,smoothstep(.16,.3,h)); cL=mix(cL,WHI,smoothstep(.3,.42,h)*.6);
  vec3 cT=mix(WHI,MAU,u*.7);
  v_c=mix(cT,cL,w);
}`;
const FS = `#version 300 es
precision highp float;
in float v_a; in vec3 v_c; out vec4 o;
void main(){ float d=length(gl_PointCoord-.5); float a=smoothstep(.5,.15,d)*v_a; if(a<.003) discard; o=vec4(v_c*a,a); }`;

// chronologie (s)
const T = { rev0: .3, rev1: 4.2, m0: 4.6, m1: 7.4, r0: 7.8, r1: 11.6, hold: 15.2, d1: 17.4, loop: 18.2 };
const STEP_U = [.24, .48, .72, .93];   // position des étapes le long de la route

export function initHeroDecision(root) {
  if (root.dataset.pvReady) return;
  root.dataset.pvReady = '1';
  if (!document.getElementById('pv-hero-dec-css')) { const s = document.createElement('style'); s.id = 'pv-hero-dec-css'; s.textContent = CSS; document.head.appendChild(s); }
  const cv = document.createElement('canvas'), ov = document.createElement('canvas');
  cv.setAttribute('aria-hidden', 'true'); ov.setAttribute('aria-hidden', 'true');
  root.appendChild(cv); root.appendChild(ov);
  const gl = cv.getContext('webgl2', { alpha: true, antialias: false, premultipliedAlpha: true }), x = ov.getContext('2d');
  if (!gl) return;
  const li = r => [...root.querySelectorAll(`[data-role="${r}"] li`)].map(e => e.textContent.trim());
  const CAPS = li('captions'), STEPS = li('steps').map(s => s.toUpperCase());
  const MONO = getComputedStyle(document.querySelector('.text-size-label') || document.body).fontFamily;
  const cap = document.createElement('div'); cap.className = 'pv-hero-cap'; cap.setAttribute('aria-hidden', 'true'); root.appendChild(cap);
  let capIdx = -1;
  const setCap = i => { if (i === capIdx || !CAPS.length) return; const first = capIdx < 0; capIdx = i; cap.classList.add('is-out'); setTimeout(() => { cap.textContent = CAPS[i] || ''; cap.classList.remove('is-out'); }, first ? 0 : 450); };

  // la route par les crêtes : pour chaque x, le z le plus haut (avec un peu d'inertie pour une courbe douce)
  const ROUTE = []; let zc = 0;
  for (let i = 0; i <= 160; i++) {
    const px = -.74 + 1.54 * i / 160; let best = zc, bv = -1e9;   // reste dans la partie nette du terrain
    for (let j = 0; j <= 50; j++) { const pz = -ZR * .55 + 1.1 * ZR * j / 50, v = LAND(px, pz) - .6 * Math.abs(pz - zc); if (v > bv) { bv = v; best = pz; } }
    zc += (best - zc) * .1; ROUTE.push([px, zc]);   // forte inertie : une courbe douce, sans zigzag
  }

  const GX = 280, GZ = 140, pts = new Float32Array(GX * GZ * 2); let k = 0;
  for (let j = 0; j < GZ; j++) for (let i = 0; i < GX; i++) { pts[k++] = -1 + 2 * i / (GX - 1); pts[k++] = -ZR + 2 * ZR * j / (GZ - 1); }
  function sh(t, src) { const s = gl.createShader(t); gl.shaderSource(s, src); gl.compileShader(s); if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s)); return s; }
  const pr = gl.createProgram(); gl.attachShader(pr, sh(gl.VERTEX_SHADER, VS)); gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, FS)); gl.linkProgram(pr);
  if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(pr));
  const U = n => gl.getUniformLocation(pr, n);
  const u = { ox: U('u_ox'), rev: U('u_rev'), m: U('u_m'), t: U('u_t'), scale: U('u_scale'), cam: U('u_cam'), dpr: U('u_dpr'), oy: U('u_oy'), fade: U('u_fade'), rot: U('u_rot'), res: U('u_res') };
  const vao = gl.createVertexArray(); gl.bindVertexArray(vao);
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer()); gl.bufferData(gl.ARRAY_BUFFER, pts, gl.STATIC_DRAW);
  gl.enableVertexAttribArray(0); gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let W = 0, H = 0, dpr = 1, CAM = 2.4, SCALE = 1, OY = 0, OX = 0;
  function resize() {
    dpr = Math.min(devicePixelRatio || 1, 2); const r = root.getBoundingClientRect();
    W = Math.max(1, Math.round(r.width * dpr)); H = Math.max(1, Math.round(r.height * dpr));
    cv.width = ov.width = W; cv.height = ov.height = H;
    const block = r.width < 900;
    SCALE = block ? Math.min(W * .95, H * 1.2) : Math.min(W * .66, H * 1.4); OY = H * .03; OX = block ? 0 : W * .14;   // en desktop, la scène est décalée à droite du texte
    if (reduced) render(T.hold - .5);
  }
  const header = root.closest('.section_header') || document.body, mouse = { x: 0, y: 0, tx: 0, ty: 0 };
  header.addEventListener('pointermove', e => { mouse.tx = e.clientX / innerWidth - .5; mouse.ty = e.clientY / innerHeight - .5; }, { passive: true });
  header.addEventListener('pointerleave', () => { mouse.tx = 0; mouse.ty = 0; }, { passive: true });

  function project(px, py, pz, rot) {
    let X = px + (W < 1 ? 0 : 0), Y = py * HS + HY, Z = pz;
    const cy = Math.cos(rot[0]), sy = Math.sin(rot[0]); [X, Z] = [cy * X + sy * Z, -sy * X + cy * Z];
    const cp = Math.cos(rot[1]), sp = Math.sin(rot[1]); [Y, Z] = [cp * Y + sp * Z, cp * Z - sp * Y];
    const z = CAM + Z; return [W / 2 + X / z * SCALE + OX, H / 2 - (Y / z * SCALE + OY)];
  }
  const io = v => v < .5 ? 4 * v * v * v : 1 - Math.pow(-2 * v + 2, 3) / 2, seg = (t, a, b) => Math.max(0, Math.min(1, (t - a) / (b - a)));

  function render(t) {
    const rev = seg(t, T.rev0, T.rev1), m = io(seg(t, T.m0, T.m1)) * (1 - io(seg(t, T.hold, T.d1))), fade = 1 - seg(t, T.d1 - .4, T.loop);
    setCap(t < T.m0 + .6 ? 0 : t < T.r0 + .4 ? 1 : 2);
    // la caméra suit doucement la route pendant le troisième temps
    const follow = io(seg(t, T.r0, T.r1)) * (1 - io(seg(t, T.hold, T.d1)));
    const rot = [-.52 + .2 * follow + .05 * Math.sin(t * .07) + mouse.x * .3, .46 + .04 * follow + mouse.y * .1];
    gl.viewport(0, 0, W, H); gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(pr); gl.bindVertexArray(vao);
    gl.uniform1f(u.rev, rev * 1.08); gl.uniform1f(u.m, m); gl.uniform1f(u.t, t); gl.uniform1f(u.fade, fade);
    gl.uniform1f(u.scale, SCALE); gl.uniform1f(u.cam, CAM); gl.uniform1f(u.dpr, dpr); gl.uniform1f(u.oy, OY); gl.uniform1f(u.ox, OX);
    gl.uniform2f(u.rot, rot[0], rot[1]); gl.uniform2f(u.res, W, H);
    gl.enable(gl.BLEND); gl.blendFunc(gl.ONE, gl.ONE);
    gl.drawArrays(gl.POINTS, 0, GX * GZ);

    // 3. la route jaune et les étapes
    x.clearRect(0, 0, W, H);
    const rk = io(seg(t, T.r0, T.r1)), ra = seg(t, T.r0 - .2, T.r0 + .2) * (1 - seg(t, T.hold, T.hold + 1.2));
    if (rk > 0 && ra > 0) {
      const n = Math.max(2, Math.ceil(ROUTE.length * rk)), P = ROUTE.slice(0, n).map(([px, pz]) => project(px, LAND(px, pz) + .012, pz, rot));
      x.globalAlpha = ra; x.strokeStyle = '#E2C70A'; x.lineWidth = 1.6 * dpr; x.lineCap = 'round'; x.lineJoin = 'round';
      x.beginPath(); P.forEach((p, i) => i ? x.lineTo(p[0], p[1]) : x.moveTo(p[0], p[1])); x.stroke();
      const hd = P[P.length - 1]; if (rk < 1) { x.fillStyle = '#E2C70A'; x.beginPath(); x.arc(hd[0], hd[1], 3.5 * dpr, 0, Math.PI * 2); x.fill(); }
      // les étapes : un anneau fin qui se pose quand la route arrive, puis son libellé
      STEP_U.forEach((su, i) => {
        const at = seg(rk, su, su + .04); if (at <= 0) return;
        const [px, pz] = ROUTE[Math.round(su * (ROUTE.length - 1))], p = project(px, LAND(px, pz) + .012, pz, rot);
        x.globalAlpha = ra * at; x.fillStyle = '#0D0926'; x.beginPath(); x.arc(p[0], p[1], 7 * dpr, 0, Math.PI * 2); x.fill();
        x.strokeStyle = '#F4F4F4'; x.lineWidth = 1.2 * dpr; x.beginPath(); x.arc(p[0], p[1], 7 * dpr, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * at); x.stroke();
        x.fillStyle = '#7FE8CF'; x.beginPath(); x.arc(p[0], p[1], 2.4 * dpr * at, 0, Math.PI * 2); x.fill();
        x.globalAlpha = ra * at * .45; x.strokeStyle = '#F4F4F4'; x.lineWidth = 1 * dpr; x.beginPath(); x.moveTo(p[0], p[1] - 9 * dpr); x.lineTo(p[0], p[1] - 34 * dpr); x.stroke();
        if (STEPS[i]) { x.globalAlpha = ra * at; x.font = `400 ${Math.round(10.5 * dpr)}px ${MONO}`; if ('letterSpacing' in x) x.letterSpacing = (1.3 * dpr) + 'px'; x.fillStyle = '#F4F4F4'; x.textAlign = 'center'; x.fillText(STEPS[i], p[0], p[1] - 42 * dpr); }
      });
      x.globalAlpha = 1;
    }
  }

  // réglage de proto : ?pvt=10 fige la scène à 10 s (vérification des temps sans attendre)
  const FREEZE = parseFloat(new URLSearchParams(location.search).get('pvt'));
  let raf = 0, time = 0, last = 0;
  function loop(now) { raf = requestAnimationFrame(loop); const dt = Math.min((now - last) / 1000, .05); last = now; mouse.x += (mouse.tx - mouse.x) * .05; mouse.y += (mouse.ty - mouse.y) * .05; time += dt; if (time > T.loop) time = 0; render(Number.isFinite(FREEZE) ? FREEZE : time); }
  function start() { if (raf || reduced) return; last = performance.now(); raf = requestAnimationFrame(loop); }
  function stop() { cancelAnimationFrame(raf); raf = 0; }
  cv.addEventListener('webglcontextlost', e => { e.preventDefault(); stop(); });
  const ro = new ResizeObserver(resize); ro.observe(root); resize();
  let iob = null;
  if (reduced) render(T.hold - .5);
  else { iob = new IntersectionObserver(([e]) => e.isIntersecting ? start() : stop()); iob.observe(root); }
  return { destroy() { stop(); ro.disconnect(); if (iob) iob.disconnect(); cv.remove(); ov.remove(); cap.remove(); delete root.dataset.pvReady; } };
}
