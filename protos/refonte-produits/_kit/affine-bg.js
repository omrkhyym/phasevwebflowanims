/* Copie de bonv-bg.js (skill bonv-style) pour la recherche « style affiné » : même shader, palette en paramètre.
   AffineBackground.mount(el, { palette: AffineBackground.PALETTES.violet }). Le fichier de la skill n'est pas modifié. */
/* BonV background for the web: a melting mesh gradient (domain-warped simplex noise, WebGL),
   rendered at 1/16 resolution and blown up through a heavy CSS blur, plus a fixed, very light grain.
   Same shader and palette as the BonV launch film (js/bgshader.js), adapted for pages:
   - fixed full-viewport layer behind the content (z-index -1), or mounted in any element you pass
   - pauses when the tab is hidden, renders one still frame under prefers-reduced-motion
   - CSS gradient fallback if WebGL is missing
   Usage:  <script src="bonv-bg.js"></script>  <script>BonVBackground.mount()</script>
           BonVBackground.mount(el, { speed: 1, scrollParallax: true })  */
(function () {
  'use strict';
  const VS = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';
  const FS_TPL = `precision highp float;
uniform vec2 uRes;uniform float uT;uniform vec2 uOff;
vec3 mod289(vec3 x){return x-floor(x*(1./289.))*289.;}
vec2 mod289(vec2 x){return x-floor(x*(1./289.))*289.;}
vec3 permute(vec3 x){return mod289(((x*34.)+1.)*x);}
float snoise(vec2 v){const vec4 C=vec4(.211324865405187,.366025403784439,-.577350269189626,.024390243902439);
  vec2 i=floor(v+dot(v,C.yy));vec2 x0=v-i+dot(i,C.xx);vec2 i1=(x0.x>x0.y)?vec2(1.,0.):vec2(0.,1.);
  vec4 x12=x0.xyxy+C.xxzz;x12.xy-=i1;i=mod289(i);
  vec3 p=permute(permute(i.y+vec3(0.,i1.y,1.))+i.x+vec3(0.,i1.x,1.));
  vec3 m=max(.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.);m=m*m;m=m*m;
  vec3 x=2.*fract(p*C.www)-1.;vec3 h=abs(x)-.5;vec3 ox=floor(x+.5);vec3 a0=x-ox;
  m*=1.79284291400159-.85373472095314*(a0*a0+h*h);
  vec3 g;g.x=a0.x*x0.x+h.x*x0.y;g.yz=a0.yz*x12.xz+h.yz*x12.yw;return 130.*dot(m,g);}
float fbm(vec2 p){float a=.5,s=0.;for(int i=0;i<2;i++){s+=a*snoise(p);p=p*1.8+vec2(1.7,9.2);a*=.4;}return s;}
vec3 hex(float r,float g,float b){return vec3(r,g,b)/255.;}
void main(){
  vec2 uv=gl_FragCoord.xy/uRes;uv.y=1.-uv.y;
  float asp=uRes.x/uRes.y;
  vec2 p=uv*vec2(asp,1.)*.32+uOff;
  float t=uT*.07;
  vec2 q=vec2(fbm(p*1.05+vec2(0.,t)),fbm(p*1.05+vec2(5.2,1.3)-t*.8));
  vec2 r=vec2(fbm(p*1.1+1.3*q+vec2(1.7,9.2)+t*.6),fbm(p*1.1+1.3*q+vec2(8.3,2.8)-t*.5));
  float n=fbm(p+1.4*r);
  vec3 ink0=hex(%INK0%),ink2=hex(%INK2%),indigo=hex(%INDIGO%),blue=hex(%BLUE%),violet=hex(%VIOLET%),soft=hex(%SOFT%);
  vec3 col=mix(ink0,ink2,smoothstep(-.45,.45,n));
  col=mix(col,indigo,smoothstep(.0,.7,r.x+.2*n)*.45);
  col=mix(col,violet,smoothstep(.05,.6,q.y+.25*r.y)*.38*(1.-.55*uv.x));
  vec2 L=vec2(.86+.05*sin(t*2.3),.1+.06*cos(t*1.7))-uOff*vec2(1.2,.9);
  float lr=length((uv-L)*vec2(asp,1.))+.35*n;
  col=mix(col,blue,smoothstep(1.05,.1,lr)*.55);
  col+=soft*smoothstep(.45,.0,lr)*.16;
  float v=length((uv-vec2(.55,.46))*vec2(1.25,1.));
  col*=mix(1.,.3,smoothstep(.38,1.05,v));
  gl_FragColor=vec4(col,1.);
}`;
  // palettes : BonV d'origine, et violet PhaseV (navy, plum, violet, mauve)
  const PALETTES = {
    bonv:   { ink0: '#06041A', ink2: '#17103A', indigo: '#242C80', blue: '#3D5BE0', violet: '#5B44B8', soft: '#7C93F2' },
    violet: { ink0: '#141238', ink2: '#24154A', indigo: '#5E2670', blue: '#7E5BB2', violet: '#684A9E', soft: '#928ACD' },
    // entre-deux (essai About, 2026-11-17) : moitié BonV, moitié violet du site
    mid:    { ink0: '#0D0B29', ink2: '#1D1342', indigo: '#412978', blue: '#5E5BC9', violet: '#6247AB', soft: '#878FE0' },
  };
  const FALLBACK = 'radial-gradient(60% 55% at 88% 6%, rgba(61,91,224,.45), rgba(61,91,224,0) 70%),' +
    'radial-gradient(55% 60% at 22% 70%, rgba(91,68,184,.22), rgba(91,68,184,0) 70%),' +
    'radial-gradient(80% 80% at 55% 46%, #17103A, #06041A 85%)';
  // fixed grain: static monochrome noise as an SVG data URI, soft-light at very low opacity
  const GRAIN = "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='256' height='256'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='256' height='256' filter='url(%23n)'/></svg>\")";

  function shader(pal) {
    const f = h => { const n = parseInt(h.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255].map(v => v.toFixed(1)).join(','); };
    return FS_TPL.replace('%INK0%', f(pal.ink0)).replace('%INK2%', f(pal.ink2)).replace('%INDIGO%', f(pal.indigo))
      .replace('%BLUE%', f(pal.blue)).replace('%VIOLET%', f(pal.violet)).replace('%SOFT%', f(pal.soft));
  }
  function mount(host, opts) {
    opts = Object.assign({ speed: 1, scrollParallax: true, grain: .07, blur: 1 / 12, palette: PALETTES.bonv }, opts || {});
    const FS = shader(opts.palette);
    const fixed = !host;
    host = host || document.body;
    const layer = document.createElement('div');
    layer.setAttribute('aria-hidden', 'true');
    layer.style.cssText = (fixed ? 'position:fixed;inset:0;z-index:-1;' : 'position:absolute;inset:0;z-index:0;') +
      'overflow:hidden;pointer-events:none;background:' + opts.palette.ink0 + ';';
    const cvs = document.createElement('canvas');
    const grain = document.createElement('div');
    grain.style.cssText = 'position:absolute;inset:0;mix-blend-mode:soft-light;opacity:' + opts.grain + ';background-image:' + GRAIN + ';';
    layer.appendChild(cvs); layer.appendChild(grain);
    if (!fixed && getComputedStyle(host).position === 'static') host.style.position = 'relative';
    host.insertBefore(layer, host.firstChild);

    let gl = null, uRes, uT, uOff;
    try {
      gl = cvs.getContext('webgl', { antialias: false, premultipliedAlpha: false, preserveDrawingBuffer: false });
      if (gl) {
        const sh = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s)); return s; };
        const prog = gl.createProgram(); gl.attachShader(prog, sh(gl.VERTEX_SHADER, VS)); gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FS)); gl.linkProgram(prog);
        if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog));
        gl.useProgram(prog);
        const b = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, b); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
        const loc = gl.getAttribLocation(prog, 'p'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
        uRes = gl.getUniformLocation(prog, 'uRes'); uT = gl.getUniformLocation(prog, 'uT'); uOff = gl.getUniformLocation(prog, 'uOff');
      }
    } catch (e) { console.warn('BonV background: WebGL off, CSS fallback.', e); gl = null; }
    if (!gl) { cvs.remove(); layer.style.background = FALLBACK; return { destroy() { layer.remove(); } }; }

    // tiny canvas (1/16), scaled up past the edges and blurred: no detail survives, only soft melting colour
    function size() {
      const W = layer.clientWidth || innerWidth, H = layer.clientHeight || innerHeight;
      const w = Math.max(8, Math.round(W / 16)), h = Math.max(8, Math.round(H / 16));
      if (cvs.width !== w || cvs.height !== h) { cvs.width = w; cvs.height = h; }
      const bl = Math.round(W * opts.blur), m = bl * 2;
      cvs.style.cssText = `position:absolute;left:${-m}px;top:${-m}px;width:${W + 2 * m}px;height:${H + 2 * m}px;filter:blur(${bl}px);`;
    }
    size(); addEventListener('resize', size);
    const reduce = matchMedia('(prefers-reduced-motion: reduce)');
    let raf = 0, t0 = performance.now(), last = 0;
    function draw(now) {
      const t = (now - t0) / 1000 * opts.speed + 20;   // start 20 s in: a nicer first frame
      const sy = opts.scrollParallax ? Math.min(1, scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight)) : 0;
      gl.viewport(0, 0, cvs.width, cvs.height);
      gl.uniform2f(uRes, cvs.width, cvs.height); gl.uniform1f(uT, t); gl.uniform2f(uOff, 0, sy * .35);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    }
    function loop(now) {
      raf = requestAnimationFrame(loop);
      if (now - last < 33) return;   // 30 fps is plenty for a background that moves this slowly
      last = now; draw(now);
    }
    // ajout proto : pause hors écran quand le fond est monté dans un bloc (plusieurs fonds sur la page)
    let onScreen = true, io = null;
    function start() { cancelAnimationFrame(raf); if (reduce.matches || document.hidden || !onScreen) { draw(performance.now()); return; } raf = requestAnimationFrame(loop); }
    document.addEventListener('visibilitychange', start);
    reduce.addEventListener && reduce.addEventListener('change', start);
    if (opts.scrollParallax && reduce.matches) addEventListener('scroll', () => draw(performance.now()), { passive: true });
    if (!fixed && 'IntersectionObserver' in window) {
      io = new IntersectionObserver(([e]) => { onScreen = e.isIntersecting; start(); });
      io.observe(host);
    }
    start();
    return { destroy() { cancelAnimationFrame(raf); if (io) io.disconnect(); layer.remove(); } };
  }
  window.AffineBackground = { mount, PALETTES };
})();
