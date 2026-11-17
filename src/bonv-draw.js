/* Socle commun des scènes BonV (style du film de lancement, dossier TEST - v82) : canvas, boucle, observers,
   reduced motion, polices, et le vocabulaire de dessin (verre, V et anneau de points, pointillés qui défilent,
   paquets de lumière, icônes au trait, avatars, bouton blanc, anneau de validation jaune).
   Une scène fournit layout(g) et draw(g, t) ; le texte vient des enfants [data-role] du montage (modifiables dans Webflow).
   bonv-answer.js (validé) garde sa propre copie de ces fonctions ; il pourra passer sur ce socle à la release. */
export const WHITE = '#F4F4F4', GREY = '#8C86B0', YEL = '#E2C70A', NAVY = '#17103A', DISC = '#0D0926';
export const MAU = '#A99FD8', BLU = '#78A8E0', TEA = '#7FE8CF';
export const CAP = ['#86C6D0', '#A99FD8', '#D6A394', '#92CBAE', '#C9C4EF', '#78A8E0'];   // capacités désaturées, sans jaune
export const TAU = Math.PI * 2;
export const cl = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
export const seg = (t, a, b) => cl((t - a) / (b - a));
export const oq = v => 1 - Math.pow(1 - v, 5);                                    // sortie quint
export const ioq = v => v < .5 ? 16 * v ** 5 : 1 - Math.pow(-2 * v + 2, 5) / 2;   // entrée-sortie quint
export const lerp = (a, b, k) => a + (b - a) * k;
export const win = (t, a, b, fi, fo) => seg(t, a, a + fi) * (1 - seg(t, b - fo, b));
export function rng(seed) { let s = seed | 0; return () => { s = s + 0x6D2B79F5 | 0; let t = Math.imul(s ^ s >>> 15, 1 | s); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
function hexArr(h) { const n = parseInt(h.slice(1), 16); return [n >> 16 & 255, n >> 8 & 255, n & 255]; }
export function rgba(c, a) { const v = hexArr(c); return `rgba(${v[0]},${v[1]},${v[2]},${cl(a)})`; }

/* texte du montage : role('x') → texte, list('x') → textes des <li> */
export function readText(mount) {
  return {
    one: r => ((mount.querySelector(`[data-role="${r}"]`) || {}).textContent || '').trim(),
    list: r => [...mount.querySelectorAll(`[data-role="${r}"] li`)].map(li => li.textContent.trim()),
  };
}

/* le V du logo PhaseV, normalisé au rayon du disque (film, core.js) */
const VPTS = [[.2749, -.4797], [-.0004, .1548], [-.2181, -.3639], [-.2710, -.4797], [-.5574, -.4797], [-.0170, .6489], [.0186, .6489], [.5574, -.4797]];
const ICONS = {
  km: [['M7 9 V41 H43', .4], ['M7 12 H15 V20 H24 V27 H33 V33 H43', 1]],
  app: [[[10, 21, 32].flatMap(yy => [10, 21, 32].map(xx => `M${xx} ${yy} h9 v9 h-9 Z`)).join(''), .75]],
  doc: [['M13 7 H29 L35 14 V41 H13 Z', 1], ['M29 7 V14 H35', .55], ['M19 22 H30 M19 28 H30 M19 34 H26', .7]],
  trend: [['M7 7 V41 H43', .4], ['M11 34 L19 25 L25 29 L32 16 L39 20', 1]],
  net: [['M24 24 L12 13 M24 24 L38 15 M24 24 L14 36 M24 24 L36 35', .5], ['M27.4 24a3.4 3.4 0 1 0-6.8 0a3.4 3.4 0 1 0 6.8 0M14.4 13a2.4 2.4 0 1 0-4.8 0a2.4 2.4 0 1 0 4.8 0M40.4 15a2.4 2.4 0 1 0-4.8 0a2.4 2.4 0 1 0 4.8 0M16.4 36a2.4 2.4 0 1 0-4.8 0a2.4 2.4 0 1 0 4.8 0M38.4 35a2.4 2.4 0 1 0-4.8 0a2.4 2.4 0 1 0 4.8 0', 1]],
};
const ICON_P = {};
for (const k in ICONS) ICON_P[k] = ICONS[k].map(([d, a]) => [new Path2D(d), a]);

/* ---------- la scène : canvas, boucle, observers ----------
   opts : aspect(W) → hauteur / largeur, loop, fade (début du fondu de sortie), still (état reduced motion), layout(g), draw(g, t) */
export function bonvStage(mount, opts) {
  if (mount.dataset.pvInit) return null;
  mount.dataset.pvInit = '1';

  const sec = mount.closest('section') || document.body;
  const fam = sel => getComputedStyle(sec.querySelector(sel) || document.body).fontFamily;
  const SANS = fam('.text-size-large'), MONO = fam('.text-size-label');

  mount.style.position = 'relative';
  const cv = document.createElement('canvas');
  cv.setAttribute('aria-hidden', 'true');
  cv.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block;z-index:1;transition:opacity .5s ease;';
  mount.appendChild(cv);
  const x = cv.getContext('2d');
  const hasLS = 'letterSpacing' in x;
  const g = { x, W: 0, H: 0, S: 1 };

  /* ---------- dessin de base ---------- */
  g.font = (w, size, mono) => { x.font = `${w} ${size}px ${mono ? MONO : SANS}`; if (hasLS) x.letterSpacing = mono ? (size * .12).toFixed(2) + 'px' : '0px'; };
  g.text = (s, px, py, w, size, c, a, al = 'left', mono = false) => {
    if (a <= 0 || !s) return;
    g.font(w, size, mono); x.textAlign = al; x.textBaseline = 'alphabetic'; x.fillStyle = rgba(c, a); x.fillText(s, px, py);
  };
  g.tw = (s, w, size, mono) => { g.font(w, size, mono); return x.measureText(s).width; };
  g.wrap = (s, w, size, maxW, mono) => {
    g.font(w, size, mono); const out = []; let line = '';
    for (const wd of s.split(' ')) { const t = line ? line + ' ' + wd : wd; if (x.measureText(t).width > maxW && line) { out.push(line); line = wd; } else line = t; }
    if (line) out.push(line); return out;
  };
  g.dot = (px, py, r, c, a) => { if (a <= 0 || r <= 0) return; x.fillStyle = rgba(c, a); x.beginPath(); x.arc(px, py, r, 0, TAU); x.fill(); };
  g.line = (x0, y0, x1, y1, c, a, w = 1) => { if (a <= 0) return; x.strokeStyle = rgba(c, a); x.lineWidth = w; x.beginPath(); x.moveTo(x0, y0); x.lineTo(x1, y1); x.stroke(); };
  g.poly = (pts, c, a, w) => {
    if (pts.length < 2 || a <= 0) return;
    x.strokeStyle = rgba(c, a); x.lineWidth = w; x.lineCap = 'round'; x.lineJoin = 'round'; x.beginPath();
    x.moveTo(pts[0][0], pts[0][1]); for (let i = 1; i < pts.length; i++) x.lineTo(pts[i][0], pts[i][1]); x.stroke();
  };
  g.qpts = (a, b, bend, k, n = 24) => {
    const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2, dx = b[0] - a[0], dy = b[1] - a[1], cx = mx - dy * bend, cy = my + dx * bend, out = [];
    const m = Math.max(2, Math.ceil(n * k));
    for (let i = 0; i <= m; i++) { const u = k * i / m, v = 1 - u; out.push([v * v * a[0] + 2 * v * u * cx + u * u * b[0], v * v * a[1] + 2 * v * u * cy + u * u * b[1]]); }
    return out;
  };
  /* lien à angle droit (coins arrondis) qui passe par la gouttière x = gx : a → (gx, a.y) → (gx, b.y) → b.
     Points rééchantillonnés à pas régulier (les paquets avancent à vitesse constante), tracé jusqu'à k. */
  g.elbow = (a, b, gx, k = 1, rc = 8 * g.S) => {
    const P = [a, [gx, a[1]], [gx, b[1]], b], raw = [a];
    for (let i = 1; i < 3; i++) {
      const c = P[i], p = P[i - 1], n = P[i + 1], d1 = Math.hypot(c[0] - p[0], c[1] - p[1]) || 1, d2 = Math.hypot(n[0] - c[0], n[1] - c[1]) || 1, r = Math.min(rc, d1 / 2, d2 / 2);
      const s = [c[0] + (p[0] - c[0]) / d1 * r, c[1] + (p[1] - c[1]) / d1 * r], e = [c[0] + (n[0] - c[0]) / d2 * r, c[1] + (n[1] - c[1]) / d2 * r];
      raw.push(s); for (let j = 1; j <= 6; j++) { const u = j / 6, v = 1 - u; raw.push([v * v * s[0] + 2 * v * u * c[0] + u * u * e[0], v * v * s[1] + 2 * v * u * c[1] + u * u * e[1]]); }
    }
    raw.push(b);
    const cum = [0]; for (let i = 1; i < raw.length; i++) cum.push(cum[i - 1] + Math.hypot(raw[i][0] - raw[i - 1][0], raw[i][1] - raw[i - 1][1]));
    const tot = cum[cum.length - 1] * cl(k), m = 40, out = []; let j = 1;
    for (let i = 0; i <= m; i++) {
      const d = tot * i / m; while (j < raw.length - 1 && cum[j] < d) j++;
      const u = (d - cum[j - 1]) / ((cum[j] - cum[j - 1]) || 1);
      out.push([lerp(raw[j - 1][0], raw[j][0], u), lerp(raw[j - 1][1], raw[j][1], u)]);
    }
    return out;
  };
  // les liens s'arrêtent au bord des éléments, jamais de centre à centre
  g.trim = (a, b, ra, rb) => {
    const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1, ux = dx / L, uy = dy / L;
    return [[a[0] + ux * ra, a[1] + uy * ra], [b[0] - ux * rb, b[1] - uy * rb]];
  };
  g.rr = (px, py, w, h, r, tl = r) => {
    r = Math.max(0, Math.min(r, w / 2, h / 2)); tl = Math.max(0, Math.min(tl, w / 2, h / 2));
    x.beginPath(); x.moveTo(px + tl, py);
    x.arcTo(px + w, py, px + w, py + h, r); x.arcTo(px + w, py + h, px, py + h, r);
    x.arcTo(px, py + h, px, py, r); x.arcTo(px, py, px + w, py, tl); x.closePath();
  };
  // verre du film (sans l'instantané flouté) : teinte violette, bord plus clair en haut à gauche
  g.glass = (px, py, w, h, r, a, tl) => {
    if (a <= 0) return;
    x.save(); x.globalAlpha = a; g.rr(px, py, w, h, r, tl);
    const gf = x.createLinearGradient(px, py, px + w * .9, py + h);
    gf.addColorStop(0, 'rgba(150,110,200,.18)'); gf.addColorStop(.5, 'rgba(90,60,150,.15)'); gf.addColorStop(1, 'rgba(40,24,80,.34)');
    x.fillStyle = gf; x.fill();
    const gs = x.createLinearGradient(px, py, px + w, py + h);
    gs.addColorStop(0, 'rgba(244,244,244,.3)'); gs.addColorStop(.4, 'rgba(244,244,244,.07)'); gs.addColorStop(.75, 'rgba(244,244,244,.03)'); gs.addColorStop(1, 'rgba(214,170,240,.14)');
    x.strokeStyle = gs; x.lineWidth = 1; x.stroke(); x.restore();
  };
  /* pointillés qui défilent + paquets de lumière (film, flowLine) */
  g.flow = (pts, col, a, t, pk, seed) => {
    if (a <= 0 || pts.length < 2) return; const S = g.S;
    x.save(); x.setLineDash([1, 7 * S]); x.lineDashOffset = -t * 28 * S; g.poly(pts, col, a, 2 * S); x.restore();
    if (pk <= 0) return;
    const n = pts.length - 1, u0 = ((t + seed * .53) / 1.5) % 1;
    for (let s = 0; s < 5; s++) {
      const u = u0 - s * .02; if (u < 0 || u > 1) continue;
      const p = pts[Math.min(n, Math.floor(ioq(u) * n))];
      g.dot(p[0], p[1], (3 - s * .5) * S, s ? col : WHITE, pk * Math.min(1, a * 1.6) * (1 - s / 5) * Math.min(1, Math.sin(Math.PI * u) * 3));
    }
  };
  g.icon = (name, px, py, s, a, col = WHITE) => {
    if (a <= 0) return; const k = s / 48;
    x.save(); x.translate(px, py); x.scale(k, k); x.translate(-24, -24);
    x.lineWidth = 1.5 / k; x.lineCap = 'round'; x.lineJoin = 'round';
    ICON_P[name].forEach(([p, al]) => { x.strokeStyle = rgba(col, a * al); x.stroke(p); });
    x.restore();
  };
  g.db = (px, py, s, a, col = WHITE) => {
    if (a <= 0) return; const w = s / 2, h = s * .18, top = py - s * .42, bot = py + s * .42;
    x.strokeStyle = rgba(col, a); x.lineWidth = 1.2;
    x.beginPath(); x.ellipse(px, top, w, h, 0, 0, TAU); x.stroke();
    x.beginPath(); x.moveTo(px - w, top); x.lineTo(px - w, bot); x.ellipse(px, bot, w, h, 0, Math.PI, 0, true); x.lineTo(px + w, top); x.stroke();
    x.beginPath(); x.ellipse(px, py, w, h, 0, 0, Math.PI); x.stroke();
  };
  /* le V et son anneau de points jaunes : réfléchit (une vague fait le tour), parle (les points pulsent) */
  g.vMark = (vx, vy, r, t, th = 0, sp = 0, a = 1, ring = true) => {
    if (a <= 0) return;
    if (ring) {
      const R0 = r * 1.47, rot = t * .22, n = Math.max(18, Math.round(TAU * R0 / Math.max(6, r * .16))), dr = Math.max(1, r * .034);
      const head = t * 3.6, voice = .55 + .45 * Math.sin(t * 13) * Math.sin(t * 7.3 + 1);
      for (let i = 0; i < n; i++) {
        const an = rot + i / n * TAU, d = ((an - head) % TAU + Math.PI * 3) % TAU - Math.PI;
        const bump = Math.exp(-((d / .42) ** 2)) * th;
        const amp = .5 + .5 * Math.sin(an * 3 + t * 9) * Math.sin(an * 5 - t * 7 + 1.3), vo = sp * voice * amp;
        const R = R0 + r * (.06 * bump + .18 * vo), s = dr * (1 + 1.2 * bump + 1.3 * vo), light = .72 + .28 * Math.cos(an + Math.PI * .75);
        g.dot(vx + Math.cos(an) * R, vy + Math.sin(an) * R, s, YEL, a * Math.min(1, (.8 + .2 * bump + .2 * vo) * light));
      }
    }
    g.dot(vx, vy, r, YEL, a);
    x.fillStyle = rgba(WHITE, a); x.beginPath();
    VPTS.forEach(([px, py], i) => { const X = vx + px * r, Y = vy + py * r; i ? x.lineTo(X, Y) : x.moveTo(X, Y); });
    x.closePath(); x.fill();
  };
  // avatar d'une personne : disque de couleur, initiale sombre
  g.avatar = (px, py, r, col, name, a) => {
    if (a <= 0) return;
    g.dot(px, py, r, col, a);
    g.text((name || '?').charAt(0).toUpperCase(), px, py + r * .36, 600, Math.round(r * 1.02), NAVY, a, 'center');
  };
  // anneau fin : disque sombre, base claire, arc de progression dans la couleur donnée
  g.ring = (px, py, r, col, L, a) => {
    if (a <= 0) return;
    g.dot(px, py, r, DISC, .85 * a);
    x.strokeStyle = rgba(WHITE, .14 * a); x.lineWidth = 1; x.beginPath(); x.arc(px, py, r, 0, TAU); x.stroke();
    if (L > 0) { x.strokeStyle = rgba(col, a); x.lineWidth = 1.5; x.lineCap = 'round'; x.beginPath(); x.arc(px, py, r, -Math.PI / 2, -Math.PI / 2 + TAU * L); x.stroke(); }
  };
  // bouton principal : pilule blanche, texte sombre ; renvoie sa largeur
  g.button = (label, bx, by, bh, fs, press, a) => {
    const bw = g.tw(label, 500, fs) + 32 * g.S; if (a <= 0) return bw;
    const sc = 1 - .05 * press;
    x.save(); x.translate(bx + bw / 2, by + bh / 2); x.scale(sc, sc); x.translate(-(bx + bw / 2), -(by + bh / 2));
    x.globalAlpha = a; g.rr(bx, by, bw, bh, bh / 2); x.fillStyle = WHITE; x.fill(); x.globalAlpha = 1;
    g.text(label, bx + bw / 2, by + bh / 2 + fs * .34, 500, fs, NAVY, a, 'center');
    x.restore(); return bw;
  };
  // validation humaine : anneau pointillé gris en attente, puis fermé en jaune avec la coche
  g.approve = (rx, ry, r, k, a) => {
    if (a <= 0) return;
    if (k < 1) { x.save(); x.setLineDash([1, 4 * g.S]); x.lineCap = 'round'; x.strokeStyle = rgba(GREY, .8 * a * (1 - k)); x.lineWidth = 1.5; x.beginPath(); x.arc(rx, ry, r, 0, TAU); x.stroke(); x.restore(); }
    if (k <= 0) return;
    x.strokeStyle = rgba(YEL, a); x.lineWidth = 1.5; x.lineCap = 'round';
    x.beginPath(); x.arc(rx, ry, r, -Math.PI / 2, -Math.PI / 2 + TAU * oq(k)); x.stroke();
    const kk = seg(k, .5, 1);
    if (kk > 0) {
      const p = [[rx - r * .42, ry + r * .02], [rx - r * .1, ry + r * .32], [rx + r * .45, ry - r * .3]];
      const m = kk < .4 ? [p[0], [lerp(p[0][0], p[1][0], kk / .4), lerp(p[0][1], p[1][1], kk / .4)]]
        : [p[0], p[1], [lerp(p[1][0], p[2][0], (kk - .4) / .6), lerp(p[1][1], p[2][1], (kk - .4) / .6)]];
      g.poly(m, YEL, a, 1.5);
    }
  };
  // pastille en verre : icône au trait + étiquette mono, centrée sur (cx, cy) ; edge : couleur du bord (état), ek : son intensité
  g.chip = (label, cx, cy, w, h, ic, a, edge, ek = 0, fs) => {
    if (a <= 0) return;
    const S = g.S, x0 = cx - w / 2, y0 = cy - h / 2;
    g.glass(x0, y0, w, h, Math.min(12 * S, h / 2), a);
    if (edge && ek > 0) { g.rr(x0, y0, w, h, Math.min(12 * S, h / 2)); x.strokeStyle = rgba(edge, a * ek); x.lineWidth = 1.5; x.stroke(); }
    const isz = Math.min(h * .55, 20 * S);
    if (ic === 'db') g.db(x0 + 10 * S + isz / 2, cy, isz * .7, .85 * a); else if (ic) g.icon(ic, x0 + 10 * S + isz / 2, cy, isz, .85 * a);
    g.text(label, x0 + (ic ? 16 * S + isz : 12 * S), cy + (fs || Math.max(8, 9 * S)) * .36, 400, fs || Math.max(8, 9 * S), WHITE, a, 'left', true);
  };
  // BonV écrit : trois points
  g.typing = (px, py, a, t) => {
    for (let i = 0; i < 3; i++) g.dot(px + i * 8 * g.S, py, 2.2 * g.S, WHITE, a * (.35 + .65 * Math.max(0, Math.sin(t * 7 - i * .7))));
  };

  /* ---------- boucle : tourne seulement à l'écran, repart de t = 0 à chaque entrée ---------- */
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let ready = false, laid = false, t = 0, raf = 0, last = 0, lastW = 0;

  function fit() {
    const W = mount.clientWidth; if (!W) return;
    g.W = W; g.H = Math.round(W * opts.aspect(W));
    mount.style.height = g.H + 'px';
    const dpr = Math.min(devicePixelRatio || 1, 2);
    cv.width = Math.round(W * dpr); cv.height = Math.round(g.H * dpr);
    x.setTransform(dpr, 0, 0, dpr, 0, 0);
    opts.layout(g); laid = true;
    if (ready) paint(reduced ? opts.still : t);
  }
  function paint(tt) { if (!laid) return; x.clearRect(0, 0, g.W, g.H); opts.draw(g, tt); }
  function frame(now) {
    raf = requestAnimationFrame(frame);
    t += Math.min((now - last) / 1000, .05); last = now;
    if (t > opts.loop) t = 0;
    cv.style.opacity = t > opts.fade ? 0 : 1;   // fondu de sortie avant la boucle
    paint(t);
  }
  function start() { if (raf || reduced) return; t = 0; cv.style.opacity = 1; last = performance.now(); raf = requestAnimationFrame(frame); }
  function stop() { cancelAnimationFrame(raf); raf = 0; }

  const ro = new ResizeObserver(() => { if (mount.clientWidth !== lastW) { lastW = mount.clientWidth; fit(); } });
  ro.observe(mount);
  let io = null;
  const fontReady = document.fonts
    ? Promise.race([Promise.all([document.fonts.load(`400 12px ${SANS}`), document.fonts.load(`400 12px ${MONO}`)]), new Promise(r => setTimeout(r, 3000))])
    : Promise.resolve();
  fontReady.then(() => {
    ready = true; fit();
    if (reduced) return;
    io = new IntersectionObserver(([e]) => e.isIntersecting ? start() : stop(), { threshold: .3 });
    io.observe(mount);
  });

  return {
    destroy() {
      stop(); ro.disconnect(); if (io) io.disconnect();
      cv.remove(); mount.style.height = ''; delete mount.dataset.pvInit;
    }
  };
}
