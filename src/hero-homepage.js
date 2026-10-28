/* Hero homepage : nuage de chiffres qui morphe entre 5 graphes métier (WebGL2).
   Monté dans <div data-pv="hero-homepage"></div>, placé dans header_image-wrapper.
   Titre, texte, boutons et fond restent dans Webflow. */

const SEL = '[data-pv="hero-homepage"]';

/* CSS ciblé uniquement sur le wrapper qui contient notre div :
   aucune classe Webflow n'est modifiée ailleurs sur le site. */
const CSS = `
.header_image-wrapper:has(${SEL}){
  background:none!important; border:0!important; border-radius:0!important; box-shadow:none!important;
  -webkit-backdrop-filter:none!important; backdrop-filter:none!important;
  position:relative; overflow:visible!important; min-height:30rem;
}
.header_component:has(${SEL}), .header_content:has(${SEL}){ position:relative; }
.header_content:has(${SEL}) .header_content-left{ position:relative; z-index:2; }
/* l'anim fait 2/3 de la page, ancrée à droite, et passe sous la colonne texte */
${SEL}{ position:absolute; top:-10%; bottom:-10%; right:0%; width:55vw; z-index:0; pointer-events:none; }
${SEL} canvas{ position:absolute; inset:0; width:100%; height:100%; display:block; }
/* grille empilée : l'anim repasse dans le flux, en bloc 4:3 sous le texte */
@media (max-width:991px){
  .header_image-wrapper:has(${SEL}){ min-height:22rem; }
  /* le header publié fait 100svh et sa grille 100% : on libère la hauteur pour que le bloc tienne sous le texte */
  .section_header:has(${SEL}){ height:auto; min-height:100svh; display:flex; flex-direction:column; justify-content:center; overflow-x:clip; }
  .header_component:has(${SEL}), .header_component:has(${SEL}) .header_content{ height:auto; }
  /* pleine largeur d'écran : sort des marges de padding-global sans scroll horizontal */
  ${SEL}{ position:relative; top:auto; bottom:auto; right:auto; width:100vw; margin-left:calc(50% - 50vw); aspect-ratio:1/1; margin-top:2rem; }
}
@media (max-width:479px){
  .header_image-wrapper:has(${SEL}){ min-height:17rem; }
}`;

function injectCSS() {
  if (document.getElementById('pv-hero-css')) return;
  const s = document.createElement('style');
  s.id = 'pv-hero-css';
  s.textContent = CSS;
  document.head.appendChild(s);
}

/* ---------- utils ---------- */
const TAU = Math.PI * 2;
const clamp01 = x => Math.max(0, Math.min(1, x));
const seg01 = (t, a, b) => clamp01((t - a) / (b - a));
const lerp = (a, b, t) => a + (b - a) * t;
const inOutCubic = x => x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
function rng(seed) { return () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
const gauss = R => Math.sqrt(-2 * Math.log(R() + 1e-9)) * Math.cos(TAU * R());
function probit(p) {
  const a = [-39.69683028665376, 220.9460984245205, -275.9285104469687, 138.3577518672690, -30.66479806614716, 2.506628277459239],
    b = [-54.47609879822406, 161.5858368580409, -155.6989798598866, 66.80131188771972, -13.28068155288572],
    c = [-.007784894002430293, -.3223964580411365, -2.400758277161838, -2.549732539343734, 4.374664141464968, 2.938163982698783],
    d = [.007784695709041462, .3224671290700398, 2.445134137142996, 3.754408661907416], pl = .02425; let q, r;
  if (p < pl) { q = Math.sqrt(-2 * Math.log(p)); return (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1); }
  if (p > 1 - pl) { q = Math.sqrt(-2 * Math.log(1 - p)); return -(((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1); }
  q = p - .5; r = q * q; return (((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q / (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1);
}

/* ---------- style ---------- */
const STYLE = {
  rMul: .6,
  pal: ['#E2C70A', '#c8f3ff', '#93a9ff', '#5fb4e6', '#7fe8cf', '#1c3a4a', '#5f8fa6', '#000000']
    .map(h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16) / 255))
};
const Y = 0, M = 1, VI = 2, BL = 3, GR = 4, GRY = 6;

/* ============================================================
   MORPHING · 1400 × D particules, 5 états
   Ordre : fan (Trial), bell (Portfolio), forest (Causal), KM (Enrollment), cluster (Response)
   ============================================================ */
/* D : densité. Chaque forme garde ses proportions, seuls les pas d’empilement sont divisés par D. */
const D = 3, N = 1400 * D, DUR = 4;

function buildStates() {
  const R = rng(21);
  const fan = [], opt = u => .14 * u + .05 * Math.sin(u * Math.PI * 1.3);
  for (let i = 0; i < 28; i++) {
    const b = i === 0 ? 0 : gauss(R), a1 = R() - .5, f1 = 2 + R() * 4, p1 = R() * TAU, z = i / 27 * 2 - 1;
    for (let j = 0; j < 50 * D; j++) { const u = j / (50 * D - 1), dev = u * (.19 * b + .09 * a1 * Math.sin(f1 * u + p1)); fan.push([-.42 + u * .84, Math.max(-.46, Math.min(.46, opt(u) + dev)), i === 0 ? Y : M, i === 0 ? 1 : z]); }
  }
  const bell = [], K = 70, cw = .84 / K, cnt = new Array(K).fill(0), mu = .03, sd = .1, kmu = Math.floor((mu + .42) / cw);
  for (let i = 0; i < N; i++) {
    const x = mu + sd * probit(.004 + .992 * (i + .5) / N), k = Math.max(0, Math.min(K - 1, Math.floor((x + .42) / cw)));
    bell.push([-.42 + (k + .5) * cw, -.3 + .006 + cnt[k] * .0088 / D, k === kmu ? Y : M, k / (K - 1) * 2 - 1]); cnt[k]++;
  }
  const forest = [], x0 = -.1;
  for (let j = 0; j < 58 * D; j++) forest.push([x0, .36 - j * (.72 / (58 * D - 1)), GRY, 0]);
  for (let r = 0; r < 11; r++) {
    const pooled = r === 10, y = pooled ? -.34 : .3 - r * .056, e = pooled ? x0 + .12 : x0 + (R() - .25) * .26, h = pooled ? .04 : .04 + R() * .08, col = pooled ? Y : M,
      z = pooled ? 1 : r / 9 * 2 - 1;
    for (let j = 0; j < 80 * D; j++) forest.push([e - h + 2 * h * j / (80 * D - 1), y, col, z]);
    for (let j = 0; j < 42 * D; j++) { const rr = .016 * Math.sqrt((j + .5) / (42 * D)), a = j * 2.39996; forest.push([e + Math.cos(a) * rr, y + Math.sin(a) * rr, col, z]); }
  }
  const sc = [], K2 = 56, cw2 = .84 / K2, L = [...Array(K2)].map((_, k) => 1 / (1 + Math.exp(-((k + .5) / K2 - .5) / .1)));
  const sumL = L.reduce((a, b) => a + b, 0), cn = L.map(l => Math.floor(l * N / sumL)); let rem = N - cn.reduce((a, b) => a + b, 0);
  for (let k = K2 - 1; rem > 0; k--, rem--) cn[k]++;
  cn.forEach((n, k) => { const z = k / (K2 - 1) * 2 - 1; for (let j = 0; j < n; j++) sc.push([-.42 + (k + .5) * cw2, -.3 + .006 + j * .0105 / D, j === n - 1 ? Y : BL, z]); });
  const cl = [], sizes = [420, 330, 280, 230, 140].map(n => n * D), cols = [M, BL, GR, VI, Y], C = [[-.2, .14], [.18, .2], [-.08, -.2], [.25, -.12], [.06, .01]];
  sizes.forEach((n, g) => { const Rg = Math.sqrt(n / D) * .0062, z = g / 4 * 2 - 1; for (let j = 0; j < n; j++) { const rr = Rg * Math.sqrt((j + .5) / n), a = j * 2.39996; cl.push([C[g][0] + Math.cos(a) * rr, C[g][1] + Math.sin(a) * rr, cols[g], z]); } });
  const RAW = [fan, bell, forest, sc, cl];

  /* Normalisation : chaque graphe recadré dans une boîte commune, scale uniforme,
     bornes au quantile 1/99 pour qu'un point isolé ne fasse pas rétrécir l'ensemble.
     HSCALE / WSCALE ajustent ensuite chaque état ; H = W préserve les proportions.
     Cloche ×1.2, forest ×1.33 (son maximum dans le cadre des courbes), amas ×1.3 :
     agrandissement uniforme pour les rapprocher de la taille des courbes, qui ne bougent pas. */
  const BOX_W = .86, BOX_H = .62, Q = .01;
  const HSCALE = [1.12, .78 * 1.2, .78 * 1.33, .78, .72 * 1.3];
  const WSCALE = [1, 1.2, 1.33, 1, .72 * 1.3];
  const quant = (arr, q) => { const s = [...arr].sort((a, b) => a - b); return s[Math.max(0, Math.min(s.length - 1, Math.round(q * (s.length - 1))))]; };
  return RAW.map((st, si) => {
    const xs = st.map(p => p[0]), ys = st.map(p => p[1]);
    const x0 = quant(xs, Q), x1 = quant(xs, 1 - Q), y0 = quant(ys, Q), y1 = quant(ys, 1 - Q);
    const w = Math.max(x1 - x0, 1e-6), h = Math.max(y1 - y0, 1e-6);
    const k = Math.min(BOX_W / w, BOX_H / h);
    const kx = k * WSCALE[si], ky = k * HSCALE[si];
    const cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
    return st.map(p => [(p[0] - cx) * kx, (p[1] - cy) * ky, p[2], p[3]]).sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  });
}

/* FIT_PAD : réglage de taille globale. 1 = l'état le plus grand touche les bords.
   FIT_PAD_M : idem en mode bloc (≤ 991 px), cadrage plus serré. */
const FIT_PAD = 0.92, FIT_PAD_M = 1;
/* Profondeur : PARA parallaxe souris, DRIFT oscillation autonome (mobile),
   DSIZE modulation du rayon, DDIM assombrissement du lointain */
const PARA = .028, DRIFT = .010, DSIZE = .24, DDIM = .45;

/* ---------- shaders ---------- */
const PVS = `#version 300 es
layout(location=0) in vec2 q;
layout(location=1) in vec4 a;
layout(location=2) in vec2 b;
uniform vec2 u_res,u_c; uniform float u_S;
out vec2 vq; flat out float vr,vc,va;
void main(){ vec2 c=u_c+a.xy*u_S; float h=a.z+1.; vq=q*h; vr=a.z; vc=a.w; va=b.x;
  gl_Position=vec4((c+q*h)/u_res*2.-1.,0.,1.); }`;
/* Disque antialiasé, sortie prémultipliée sur canvas transparent */
const PFS = `#version 300 es
precision highp float;
in vec2 vq; flat in float vr,vc,va;
uniform vec3 u_pal[8];
out vec4 o;
void main(){ float cov=clamp(vr-length(vq)+.5,0.,1.);
  float al=cov*va; if(al<=.002) discard;
  o=vec4(u_pal[int(vc+.5)]*al,al); }`;

export function initHero(root) {
  if (root.dataset.pvReady) return;
  root.dataset.pvReady = '1';
  injectCSS();

  const canvas = document.createElement('canvas');
  canvas.setAttribute('aria-hidden', 'true');
  root.appendChild(canvas);
  const gl = canvas.getContext('webgl2', { alpha: true, antialias: false, premultipliedAlpha: true });
  if (!gl) return;

  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const block = matchMedia('(max-width:991px)');
  const STATES = buildStates();
  let FIT_W = 0, FIT_H = 0;
  for (const st of STATES) for (const p of st) { FIT_W = Math.max(FIT_W, Math.abs(p[0]) * 2); FIT_H = Math.max(FIT_H, Math.abs(p[1]) * 2); }
  FIT_W = Math.max(FIT_W, 1e-6); FIT_H = Math.max(FIT_H, 1e-6);
  /* Cadre du mode bloc : 99,5 % des points de chaque état. Le pied gauche, très clairsemé,
     de la courbe en escalier sort du bloc (environ 20 points coupés) et les formes y gagnent ~37 %. */
  let FIT_WM = 0, FIT_HM = 0;
  const q995 = v => v.sort((a, b) => a - b)[Math.floor(v.length * .995)];
  for (const st of STATES) { FIT_WM = Math.max(FIT_WM, q995(st.map(p => Math.abs(p[0]))) * 2); FIT_HM = Math.max(FIT_HM, q995(st.map(p => Math.abs(p[1]))) * 2); }
  const R0 = rng(99), RN = Float32Array.from({ length: N }, () => R0()), BU = Float32Array.from({ length: N }, () => (R0() - .5) * .7);
  const header = root.closest('.section_header') || document.body;

  function sh(t, src) { const s = gl.createShader(t); gl.shaderSource(s, src); gl.compileShader(s); if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s)); return s; }
  function program(vs, fs) {
    const p = gl.createProgram(); gl.attachShader(p, sh(gl.VERTEX_SHADER, vs)); gl.attachShader(p, sh(gl.FRAGMENT_SHADER, fs)); gl.linkProgram(p);
    if (!gl.getProgramParameter(p, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(p)); return p;
  }
  const PP = program(PVS, PFS);
  const ul = (p, n) => gl.getUniformLocation(p, n);
  const PU = { res: ul(PP, 'u_res'), c: ul(PP, 'u_c'), S: ul(PP, 'u_S'), pal: ul(PP, 'u_pal[0]') };
  const PAL = new Float32Array(STYLE.pal.flat());

  // VAO particules
  const MAX = 2 * N, inst = new Float32Array(MAX * 7);
  const pvao = gl.createVertexArray(); gl.bindVertexArray(pvao);
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer()); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(0); gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
  const ib = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, ib); gl.bufferData(gl.ARRAY_BUFFER, inst.byteLength, gl.DYNAMIC_DRAW);
  gl.enableVertexAttribArray(1); gl.vertexAttribPointer(1, 4, gl.FLOAT, false, 28, 0); gl.vertexAttribDivisor(1, 1);
  gl.enableVertexAttribArray(2); gl.vertexAttribPointer(2, 2, gl.FLOAT, false, 28, 16); gl.vertexAttribDivisor(2, 1);

  let dpr = 1, SP = 1;
  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2); const r = root.getBoundingClientRect();
    canvas.width = Math.max(1, Math.round(r.width * dpr)); canvas.height = Math.max(1, Math.round(r.height * dpr));
    if (reduced) render(7.5);
  }

  /* L'anim a pointer-events:none (elle passe sous le texte) :
     on écoute la souris sur le header et on reprojette dans le repère du canvas. */
  const mouse = { x: 0, y: 0, a: 0, tx: 0, ty: 0, in: false };
  header.addEventListener('pointermove', e => {
    const r = root.getBoundingClientRect(), S = Math.min(r.width, r.height);
    mouse.tx = (e.clientX - r.left - r.width / 2) / S; mouse.ty = -(e.clientY - r.top - r.height / 2) / S; mouse.in = true;
  });
  header.addEventListener('pointerleave', () => mouse.in = false);

  let cnt = 0;
  function put(x, y, r, c, a) { if (cnt >= MAX || a <= .003) return; const k = cnt++ * 7; inst[k] = x; inst[k + 1] = y; inst[k + 2] = Math.max(r * SP, .7 * dpr); inst[k + 3] = c; inst[k + 4] = a; }

  function fill(t) {
    const n = 5, s = Math.floor(t / DUR) % n, u = t - Math.floor(t / DUR) * DUR, A = STATES[(s + n - 1) % n], B = STATES[s], base = .0038 * STYLE.rMul;
    cnt = 0;
    const px = reduced ? 0 : mouse.x * mouse.a, py = reduced ? 0 : mouse.y * mouse.a;
    for (let i = 0; i < N; i++) {
      const a = A[i], b = B[i], d = .5 * clamp01((b[0] + .45) / .9) + .2 * RN[i], e = inOutCubic(seg01(u, d, d + 1.1));
      const dx = b[0] - a[0], dy = b[1] - a[1], bl = BU[i] * Math.sin(Math.PI * e);
      let x = lerp(a[0], b[0], e) - dy * bl + .0015 * Math.sin(t * 1.3 + i), y = lerp(a[1], b[1], e) + dx * bl + .0015 * Math.cos(t * 1.1 + i * 1.7), r = base;
      // z interpolé comme le reste : la profondeur morphe avec la forme
      const z = lerp(a[3] || 0, b[3] || 0, e);
      x += z * (PARA * px + DRIFT * Math.sin(t * .31));
      y += z * (PARA * py + DRIFT * .6 * Math.cos(t * .24));
      r *= 1 + DSIZE * z;
      const al = .95 * (1 - DDIM * (1 - (z * .5 + .5)));
      y += .0012 * Math.sin(t * 2.2 + i * .7);
      if (mouse.a > .001) { const mx = x - mouse.x, my = y - mouse.y; r *= 1 + 1.2 * mouse.a * Math.exp(-(mx * mx + my * my) / .004); }
      if (a[2] === b[2] || e >= 1) put(x, y, r, b[2], al); else if (e <= 0) put(x, y, r, a[2], al);
      else { put(x, y, r, a[2], al * (1 - e)); put(x, y, r, b[2], al * e); }
    }
  }

  let lost = false;
  function render(t) {
    if (lost) return;
    const W = canvas.width, H = canvas.height;
    // fit-to-contain, en portrait comme en paysage
    SP = block.matches
      ? Math.min(W / (FIT_WM * FIT_PAD_M), H / (FIT_HM * FIT_PAD_M))
      : Math.min(W / (FIT_W * FIT_PAD), H / (FIT_H * FIT_PAD));
    fill(t);
    gl.viewport(0, 0, W, H); gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(PP); gl.bindVertexArray(pvao);
    gl.uniform2f(PU.res, W, H); gl.uniform2f(PU.c, W / 2, H / 2); gl.uniform1f(PU.S, SP);
    gl.uniform3fv(PU.pal, PAL);
    gl.enable(gl.BLEND); gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.bindBuffer(gl.ARRAY_BUFFER, ib); gl.bufferSubData(gl.ARRAY_BUFFER, 0, inst, 0, cnt * 7);
    gl.drawArraysInstanced(gl.TRIANGLE_STRIP, 0, 4, cnt);
  }

  /* ---------- boucle : tourne seulement quand le hero est à l'écran ---------- */
  let raf = 0, time = 0, last = 0;
  function loop(now) {
    raf = requestAnimationFrame(loop);
    const dt = Math.max(0, Math.min((now - last) / 1000, .05)); last = now;
    mouse.x += (mouse.tx - mouse.x) * .08; mouse.y += (mouse.ty - mouse.y) * .08; mouse.a += ((mouse.in ? 1 : 0) - mouse.a) * .06;
    time += dt;
    render(time);
  }
  function start() { if (raf || reduced || lost) return; last = performance.now(); raf = requestAnimationFrame(loop); }
  function stop() { cancelAnimationFrame(raf); raf = 0; }

  // perte de contexte GPU (onglet en arrière-plan longtemps, pilote) : on coupe proprement
  canvas.addEventListener('webglcontextlost', e => { e.preventDefault(); lost = true; stop(); });

  new ResizeObserver(resize).observe(root);
  resize();

  if (reduced) render(7.5);
  else new IntersectionObserver(([e]) => e.isIntersecting ? start() : stop()).observe(root);
}
