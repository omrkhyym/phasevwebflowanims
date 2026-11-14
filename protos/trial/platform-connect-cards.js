/* Bloc "plateforme connectée" des pages produit, version cartes (proto : protos/trial/phasev-platform-connect-protos.html).
   Destiné à remplacer src/platform-connect.js après validation ; même contrat de montage :
   <div data-pv="platform-connect" data-current="trial"></div>
   Le produit de la page est la carte centrale navy, les quatre autres sont des cartes blanches reliées par des fils.
   Un échange à la fois : des paquets parcourent le fil, la carte source se soulève, la carte cible reçoit.
   Chaque carte porte la miniature du motif de son hero produit, rejouée pendant l'échange.
   Label, titre et paragraphe restent dans Webflow. Les noms des produits peuvent être
   surchargés sur le montage : data-name-clinops="CLINOPS OPTIMIZER", etc. */

const INK = '20,18,56', MAU = '146,138,205';

const NAMES = {
  portfolio: 'PORTFOLIO OPTIMIZER',
  trial: 'TRIAL OPTIMIZER',
  response: 'RESPONSE OPTIMIZER',
  clinops: 'CLINOPS OPTIMIZER',
  conductor: 'AI CONDUCTOR'
};
const ORDER = ['portfolio', 'trial', 'response', 'clinops', 'conductor'];
// une couleur secondaire de la charte par produit (mauve, bleu, turquoise, violet)
const COL = { trial: MAU, portfolio: MAU, response: '120,168,224', clinops: '127,232,207', conductor: '104,74,158' };

/* 0 = produit de la page, 1..4 = voisins ; échanges [de, vers], un à la fois, aller et retour alternés */
const EV = [[1, 0], [0, 3], [2, 0], [0, 4], [3, 0], [0, 1], [4, 0], [0, 2]];
const GAP = 2.6, INTRO = 1.8;
const T_STILL = INTRO + GAP * .55;   // état dessiné sous reduced motion : un échange en cours
const SPOT = [[.5, .5], [.19, .14], [.81, .14], [.19, .86], [.81, .86]];

const cl = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const seg = (t, a, b) => cl((t - a) / (b - a));
const ease = v => v < .5 ? 4 * v * v * v : 1 - Math.pow(-2 * v + 2, 3) / 2;
const back = v => { const c = 1.6; return 1 + (c + 1) * Math.pow(v - 1, 3) + c * Math.pow(v - 1, 2); };
const hash = n => { const v = Math.sin(n * 127.1 + 311.7) * 43758.5453; return v - Math.floor(v); };

function current(t) {
  if (t < INTRO) return [null, 0];
  const L = EV.length * GAP, u = ((t - INTRO) % L) / GAP, i = Math.floor(u);
  return [EV[i], u - i];
}

export function initPlatformConnect(mount) {
  if (mount.dataset.pvReady) return;
  const cur = mount.dataset.current;
  if (!NAMES[cur]) {
    console.warn('[pv] platform-connect : data-current manquant ou inconnu (' + cur + '), attendu ' + ORDER.join(' | '));
    return;
  }
  mount.dataset.pvReady = '1';

  // noms : défaut dans le JS, surchargeables par data-name-<clé> sur le montage
  const name = k => mount.dataset['name' + k[0].toUpperCase() + k.slice(1)] || NAMES[k];
  const KEYS = [cur, ...ORDER.filter(k => k !== cur)];

  mount.style.cssText += 'position:relative;width:100%;aspect-ratio:1.2/1;';
  const cv = document.createElement('canvas');
  cv.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block;';
  cv.setAttribute('role', 'img');
  cv.setAttribute('aria-label', `PhaseV platform: ${name(cur)} at the center, exchanging data with the four other PhaseV products.`);
  mount.appendChild(cv);
  const x = cv.getContext('2d');

  // typo de l'étiquette du bloc, espacement converti en ratio de la taille
  const section = mount.closest('section') || document.body;
  const label = section.querySelector('.text-size-label');
  const cs = label ? getComputedStyle(label) : null;
  const FAMILY = cs ? cs.fontFamily : 'Aspekta, Arial, sans-serif';
  const lsRatio = cs && cs.letterSpacing !== 'normal' ? (parseFloat(cs.letterSpacing) || 0) / (parseFloat(cs.fontSize) || 16) : .08;
  const hasLS = 'letterSpacing' in x;
  function font(w, s) { x.font = `${w} ${s}px ${FAMILY}`; if (hasLS) x.letterSpacing = (lsRatio * s).toFixed(2) + 'px'; }
  function rr(bx, by, bw, bh, r) { x.beginPath(); x.roundRect ? x.roundRect(bx, by, bw, bh, r) : x.rect(bx, by, bw, bh); }

  /* miniatures des motifs des heros produit, en points ; pr (0..1) rejoue le motif.
     L'élément mis en avant est en navy (blanc sur la carte centrale), le jaune reste réservé à la décision. */
  function glyph(key, cx, cy, s, dark, pr) {
    const base = dark ? 'rgba(255,255,255,.42)' : `rgba(${MAU},.95)`, hi = dark ? '#ffffff' : '#141238';
    const dot = (X, Y, r, c) => { x.beginPath(); x.arc(X, Y, r, 0, 6.283); x.fillStyle = c; x.fill(); };
    const L = cx - s / 2, T = cy - s / 2, d = Math.max(.8, s * .045);
    if (key === 'trial') { // éventail de simulations, une trajectoire retenue qui se trace
      for (let j = 1; j < 6; j++) {
        const b = (hash(j) - .5) * 2, f = 2 + hash(j + 9) * 4;
        for (let q = 0; q <= 12; q++) { const u = q / 12; dot(L + u * s, cy + s * .3 - u * s * .45 + u * s * (.32 * b + .08 * Math.sin(f * u * 3)), d * .8, base); }
      }
      x.beginPath(); for (let q = 0; q <= 30 * pr; q++) { const u = q / 30, X = L + u * s, Y = cy + s * .3 - u * s * .45; q ? x.lineTo(X, Y) : x.moveTo(X, Y); }
      x.strokeStyle = hi; x.lineWidth = Math.max(1.5, s * .07); x.lineCap = 'round'; x.stroke();
    } else if (key === 'portfolio') { // tornade, les barres s'étendent ; les deux drivers majeurs en avant
      const W_ = [1, .78, .6, .44, .3], bh = s * .12, gap = s * .085;
      W_.forEach((w, j) => {
        const ww = s * w * (.25 + .75 * ease(cl(pr * 1.4 - j * .1))), y = T + s * .04 + j * (bh + gap);
        rr(cx - ww / 2, y, ww, bh, bh / 2); x.fillStyle = j < 2 ? hi : base; x.fill();
      });
    } else if (key === 'response') { // nuage de patients qui se sépare ; les répondeurs en avant
      const g = s * .06 * ease(pr);
      for (let j = 0; j < 26; j++) {
        const resp = j < 11, a = hash(j + 3) * 6.283, r = Math.sqrt(hash(j + 40)) * (resp ? .2 : .24);
        dot(cx + Math.cos(a) * r * s * 1.5, cy + (resp ? -.13 : .13) * s + (resp ? -g : g) + Math.sin(a) * r * s * .75, d, resp ? hi : base);
      }
    } else if (key === 'clinops') { // carte en points, des sites s'allument avec leur bassin
      const n = 7, st = s / (n - 1);
      for (let a = 0; a < n; a++) for (let b = 0; b < n; b++) {
        const u = a / (n - 1) - .5, v = b / (n - 1) - .5;
        if (Math.hypot(u * 1.1 + .05 * Math.sin(b * 2), v * 1.4) < .5 + .08 * hash(a * 7 + b)) dot(L + a * st, T + b * st, d * .8, base);
      }
      [[.3, .35], [.62, .55], [.45, .78]].forEach(([u, v], j) => {
        const on = cl(pr * 3 - j), X = L + u * s, Y = T + v * s;
        if (on > 0) { x.beginPath(); x.arc(X, Y, s * (.08 + .1 * on), 0, 6.283); x.strokeStyle = dark ? `rgba(255,255,255,${.5 * (1 - on) + .15})` : `rgba(${INK},${.4 * (1 - on) + .12})`; x.lineWidth = 1; x.stroke(); }
        dot(X, Y, d * 1.7, on > 0 ? hi : base);
      });
    } else { // conductor : chaîne de documents, une impulsion réécrit la ligne liée de chaque page
      for (let p = 0; p < 3; p++) {
        const px = L + p * s * .2, py = T + p * s * .14, pw = s * .6, ph = s * .72;
        rr(px, py, pw, ph, s * .06); x.fillStyle = dark ? '#141238' : '#fff'; x.fill();
        x.strokeStyle = base; x.lineWidth = 1; x.stroke();
        for (let l = 0; l < 4; l++) {
          x.fillStyle = l === 2 && pr * 3 > p ? hi : (dark ? 'rgba(255,255,255,.22)' : `rgba(${MAU},.45)`);
          x.fillRect(px + pw * .16, py + ph * (.2 + l * .18), pw * (l === 3 ? .4 : .68), Math.max(1.2, s * .045));
        }
      }
    }
  }

  // fil en S vertical entre deux ports
  function vwire(a, b) {
    const my = (a[1] + b[1]) / 2;
    return u => { const q = 1 - u; return [q*q*q*a[0] + 3*q*q*u*a[0] + 3*q*u*u*b[0] + u*u*u*b[0], q*q*q*a[1] + 3*q*q*u*my + 3*q*u*u*my + u*u*u*b[1]]; };
  }
  function path(f, u0, u1, n = 48) { x.beginPath(); for (let k = 0; k <= n; k++) { const [X, Y] = f(u0 + (u1 - u0) * k / n); k ? x.lineTo(X, Y) : x.moveTo(X, Y); } }

  let W = 0, H = 0;

  function draw(t) {
    x.clearRect(0, 0, W, H);
    const m = Math.min(W, H), fs = W < 420 ? 9 : 11;
    const [ev, ph] = current(t), from = ev ? ev[0] : -1, to = ev ? ev[1] : -1, sat = ev ? (from || to) : -1;
    const act = ev ? Math.min(seg(ph, 0, .1), 1 - seg(ph, .88, 1)) : 0;
    const arrive = ev ? seg(ph, .6, .72) * (1 - seg(ph, .78, 1)) : 0;

    // trame de points très légère : un plan de travail
    const step = m / 20;
    x.fillStyle = `rgba(${INK},.07)`;
    for (let gy = step / 2; gy < H; gy += step) for (let gx = step / 2; gx < W; gx += step) { x.beginPath(); x.arc(gx, gy, .9, 0, 6.283); x.fill(); }

    const cw = [m * .44, m * .33, m * .33, m * .33, m * .33], ch = [m * .27, m * .15, m * .15, m * .15, m * .15];
    // apparition en cascade puis flottement léger ; la carte active se soulève
    const P = SPOT.map(([u, v], i) => {
      const k = back(seg(t, .05 + i * .1, .65 + i * .1));
      const lift = (i === sat ? act : 0) * m * .012 + (i === to ? arrive * m * .006 : 0);
      return [u * W, v * H + (1 - k) * m * .05 + Math.sin(t * .7 + i * 1.9) * m * .005 - lift, k];
    });
    const port = i => [P[i][0], P[i][1] + (SPOT[i][1] < .5 ? 1 : -1) * ch[i] / 2];
    const port0 = i => [P[0][0] + (SPOT[i][0] < .5 ? -1 : 1) * cw[0] * .3, P[0][1] + (SPOT[i][1] < .5 ? -1 : 1) * ch[0] / 2];

    // fils : pointillé qui défile au repos, plein et coloré quand il porte un échange
    const wireIn = ease(seg(t, .6, 1.5));
    for (let i = 1; i < 5; i++) {
      const f = vwire(port(i), port0(i)), on = i === sat ? act : 0, c = COL[KEYS[i]];
      path(f, 0, wireIn);
      x.setLineDash([2, 5]); x.lineDashOffset = -t * 10; x.strokeStyle = `rgba(${INK},.28)`; x.lineWidth = 1; x.stroke();
      x.setLineDash([]);
      if (on > 0) {
        const a = port(i), b = port0(i), g = x.createLinearGradient(a[0], a[1], b[0], b[1]);
        g.addColorStop(0, `rgba(${c},${on})`); g.addColorStop(1, `rgba(${MAU},${on})`);
        path(f, 0, 1); x.strokeStyle = g; x.lineWidth = 2; x.stroke();
      }
      [port(i), port0(i)].forEach(([X, Y]) => {
        x.beginPath(); x.arc(X, Y, 4, 0, 6.283); x.fillStyle = '#fff'; x.fill();
        x.strokeStyle = on > 0 ? `rgba(${MAU},${.5 + on * .5})` : `rgba(${INK},.3)`; x.lineWidth = 1.25; x.stroke();
      });
    }

    // paquets de données : capsules lumineuses avec traînée
    if (ev) {
      const f = vwire(port(sat), port0(sat)), dir = from === 0 ? -1 : 1, c = COL[KEYS[sat]];
      for (let n = 0; n < 6; n++) {
        const u = seg(ph, .1 + n * .05, .62 + n * .05); if (u <= 0 || u >= 1) continue;
        const e = ease(u), uu = dir > 0 ? e : 1 - e, t0 = cl(uu - dir * .09);
        path(f, Math.min(t0, uu), Math.max(t0, uu), 12);
        const [ax, ay] = f(t0), [bx, by] = f(uu), g = x.createLinearGradient(ax, ay, bx, by);
        g.addColorStop(0, `rgba(${c},0)`); g.addColorStop(1, `rgba(${c},.9)`);
        x.strokeStyle = g; x.lineWidth = n ? 2.5 : 3.5; x.stroke();
        x.save(); x.shadowColor = `rgba(${c},.9)`; x.shadowBlur = 12;
        x.beginPath(); x.arc(bx, by, n ? 2.8 : 4, 0, 6.283); x.fillStyle = '#fff'; x.fill();
        x.lineWidth = 2; x.strokeStyle = `rgba(${c},1)`; x.stroke(); x.restore();
      }
    }

    // cartes
    for (let i = 0; i < 5; i++) {
      const [cx, cy, k] = P[i]; if (k <= 0) continue;
      const key = KEYS[i], c = COL[key];
      const w = cw[i], h = ch[i], r = m * .028, dark = i === 0, on = i === sat ? act : 0, glow = i === to ? arrive : 0;
      x.globalAlpha = cl(k);
      x.save(); x.shadowColor = `rgba(${INK},${.10 + on * .08})`; x.shadowBlur = 26 + on * 14; x.shadowOffsetY = 10 + on * 6;
      rr(cx - w / 2, cy - h / 2, w, h, r); x.fillStyle = dark ? '#141238' : '#fff'; x.fill(); x.restore();
      if (dark) { // halo mauve dans la carte centrale
        x.save(); rr(cx - w / 2, cy - h / 2, w, h, r); x.clip();
        const g = x.createRadialGradient(cx - w * .3, cy - h * .6, 0, cx - w * .3, cy - h * .6, w * .8);
        g.addColorStop(0, `rgba(${MAU},${.45 + glow * .3})`); g.addColorStop(1, `rgba(${MAU},0)`);
        x.fillStyle = g; x.fillRect(cx - w / 2, cy - h / 2, w, h); x.restore();
      }
      rr(cx - w / 2, cy - h / 2, w, h, r);
      x.strokeStyle = dark ? `rgba(255,255,255,${.12 + glow * .5})` : glow || on ? `rgba(${c},${.5 + Math.max(glow, on) * .5})` : `rgba(${INK},.08)`;
      x.lineWidth = 1 + Math.max(glow, on) * 1.5; x.stroke();
      if (glow > 0) { // onde d'arrivée
        const e = seg(ph, .6, .9), d = e * m * .04;
        rr(cx - w / 2 - d, cy - h / 2 - d, w + d * 2, h + d * 2, r + d);
        x.strokeStyle = `rgba(${MAU},${(1 - e) * .6})`; x.lineWidth = 1.5; x.stroke();
      }

      const pad = h * (dark ? .18 : .2), s = dark ? h * .22 : h * .34;
      const tx = cx - w / 2 + pad, ty = dark ? cy - h / 2 + pad : cy - s * .85;
      rr(tx, ty, s * 1.7, s * 1.7, s * .4);
      x.fillStyle = dark ? 'rgba(255,255,255,.08)' : `rgba(${c},${.16 + on * .14})`; x.fill();
      const pr = dark ? (to === 0 ? ease(seg(ph, .62, .95)) : 1) : (i === sat ? ease(seg(ph, .05, .6)) : 1);
      glyph(key, tx + s * .85, ty + s * .85, s * 1.1, dark, pr);

      // nom sur deux lignes
      const [a, b] = name(key).split(/ (?=OPTIMIZER|CONDUCTOR)/);
      font(dark ? 700 : 600, dark ? fs + 2 : fs); x.fillStyle = dark ? '#fff' : '#141238'; x.textBaseline = 'middle';
      const nx = tx + s * 1.7 + pad * .7, ny = ty + s * .85;
      if (b) { x.fillText(a, nx, ny - fs * .72); x.globalAlpha = cl(k) * .55; x.fillText(b, nx, ny + fs * .78); x.globalAlpha = cl(k); } else x.fillText(a, nx, ny);
      x.textBaseline = 'alphabetic';

      // voyant d'état : il clignote pendant l'échange
      const dx = cx + w / 2 - pad * .9, dy = cy - h / 2 + pad * .9, blink = on ? .5 + .5 * Math.sin(t * 14) : 0;
      x.beginPath(); x.arc(dx, dy, 3.2, 0, 6.283);
      x.fillStyle = on || (dark && ev) ? `rgba(${dark ? '127,232,207' : c},${.6 + blink * .4})` : `rgba(${dark ? '255,255,255' : INK},.18)`; x.fill();

      if (dark) { // mini graphe : trois scénarios, la courbe retenue se redessine à chaque réception
        const gx = cx - w / 2 + pad, gw = w - pad * 2, gy = cy + h / 2 - pad * .9, gh = h * .34;
        x.strokeStyle = 'rgba(255,255,255,.12)'; x.lineWidth = 1;
        x.beginPath(); x.moveTo(gx, gy); x.lineTo(gx + gw, gy); x.stroke();
        const curve = (j, u) => gy - gh * (1 - Math.exp(-u * (2.2 + j * 1.1))) * (.7 + j * .12);
        for (let j = 0; j < 3; j++) {
          const end = j === 2 ? (to === 0 ? .25 + .75 * seg(ph, .62, .95) : 1) : 1;
          x.beginPath(); for (let q = 0; q <= 30; q++) { const u = q / 30 * end; q ? x.lineTo(gx + u * gw, curve(j, u)) : x.moveTo(gx, curve(j, 0)); }
          x.strokeStyle = j === 2 ? `rgba(${MAU},1)` : 'rgba(255,255,255,.22)'; x.lineWidth = j === 2 ? 2 : 1.25; x.stroke();
        }
      } else { // lignes de contenu factices
        const lx = cx - w / 2 + pad, ly = cy + h / 2 - pad * .75;
        [.55, .3].forEach((Lw, j) => { rr(lx + j * w * .6, ly - 2, (w - pad * 2) * Lw, 4, 2); x.fillStyle = `rgba(${INK},.07)`; x.fill(); });
      }
      x.globalAlpha = 1;
    }
  }

  /* ---------- boucle : tourne seulement quand le bloc est à l'écran ---------- */
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let ready = false, clock = 0, raf = 0, last = 0;

  function fit() {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    W = mount.clientWidth; H = mount.clientHeight;
    cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
    x.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (ready) draw(reduced ? T_STILL : clock);
  }
  function frame(now) {
    raf = requestAnimationFrame(frame);
    clock += Math.min((now - last) / 1000, .05); last = now;
    draw(clock);
  }
  function start() { if (raf || reduced) return; last = performance.now(); raf = requestAnimationFrame(frame); }
  function stop() { cancelAnimationFrame(raf); raf = 0; }

  const ro = new ResizeObserver(fit);
  ro.observe(mount);
  let io = null;

  // on attend la police avant le premier dessin (plafond 3 s)
  const fontReady = document.fonts
    ? Promise.race([document.fonts.load(`600 11px ${FAMILY}`), new Promise(r => setTimeout(r, 3000))])
    : Promise.resolve();

  fontReady.then(() => {
    ready = true;
    fit();
    if (reduced) return;
    io = new IntersectionObserver(([e]) => e.isIntersecting ? start() : stop(), { threshold: .3 });
    io.observe(mount);
  });

  return {
    destroy() {
      stop(); ro.disconnect(); if (io) io.disconnect();
      cv.remove(); delete mount.dataset.pvReady;
    }
  };
}
