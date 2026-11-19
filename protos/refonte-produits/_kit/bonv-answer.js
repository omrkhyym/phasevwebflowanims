/* BonV, « The PhaseV answer » : la question → BonV → modules PhaseV, outils du sponsor, systèmes tiers → résultats à valider.
   D'après la scène Orchestrates du film de lancement BonV (dossier TEST - v82), adaptée au web en canvas 2D :
   même vocabulaire (V et anneau de points jaunes, pointillés qui défilent, paquets de lumière, icônes au trait
   dans un anneau fin, verre), sans WebGL ni export. Le fond animé du panneau est posé par affine.js.
   Le texte vient des enfants [data-role] du montage (modifiables dans Webflow) : masqués à l'écran, lus par les lecteurs d'écran.
   Jaune : le V et la validation humaine, rien d'autre. Monté sur [data-pv="bonv-answer"]. */
const WHITE = '#F4F4F4', GREY = '#8C86B0', YEL = '#E2C70A', NAVY = '#17103A', DISC = '#0D0926';
const TGT = ['#A99FD8', '#78A8E0', '#7FE8CF'];                       // modules PhaseV, outils du sponsor, systèmes tiers
const CAP = ['#86C6D0', '#A99FD8', '#D6A394', '#92CBAE', '#C9C4EF']; // les 5 capacités, désaturées (film), sans jaune
const TAU = Math.PI * 2;

/* Chronologie (s) : la question s'écrit, part vers BonV, BonV réfléchit, appelle les trois systèmes,
   les résultats reviennent dans la carte, un humain valide. */
const T = { type0: .5, type1: 2.5, send: 2.8, th0: 3.3, th1: 4.9, out: 4.2, lit: 4.9, back: 6.9, card: 7.2,
  cv0: 7.6, cv1: 8.6, press: 9.1, ring0: 9.25, ring1: 9.85, fade: 11.4, loop: 12 };
const STILL = 10.5;   // état dessiné sous reduced motion : validé, avant le fondu

/* le V du logo PhaseV, normalisé au rayon du disque (film, core.js) */
const VPTS = [[.2749, -.4797], [-.0004, .1548], [-.2181, -.3639], [-.2710, -.4797], [-.5574, -.4797], [-.0170, .6489], [.0186, .6489], [.5574, -.4797]];

const cl = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const seg = (t, a, b) => cl((t - a) / (b - a));
const oq = v => 1 - Math.pow(1 - v, 5);                                         // sortie quint
const ioq = v => v < .5 ? 16 * v ** 5 : 1 - Math.pow(-2 * v + 2, 5) / 2;        // entrée-sortie quint
const lerp = (a, b, k) => a + (b - a) * k;
function hexArr(h) { const n = parseInt(h.slice(1), 16); return [n >> 16 & 255, n >> 8 & 255, n & 255]; }
function rgba(c, a) { const v = hexArr(c); return `rgba(${v[0]},${v[1]},${v[2]},${cl(a)})`; }

export function initBonvAnswer(mount) {
  if (mount.dataset.pvInit) return;
  mount.dataset.pvInit = '1';

  // texte : enfants du montage, rien en dur
  const role = r => ((mount.querySelector(`[data-role="${r}"]`) || {}).textContent || '').trim();
  const Q = role('question'), ASK = role('ask-label').toUpperCase(), RES = role('result').toUpperCase(), OK = role('approve');
  const TG = [...mount.querySelectorAll('[data-role="targets"] li')].slice(0, 3).map(li => li.textContent.trim().toUpperCase());

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

  /* ---------- dessin de base ---------- */
  function font(w, size, mono) {
    x.font = `${w} ${size}px ${mono ? MONO : SANS}`;
    if (hasLS) x.letterSpacing = mono ? (size * .12).toFixed(2) + 'px' : '0px';
  }
  function text(s, px, py, w, size, c, a, al = 'left', mono = false) {
    if (a <= 0 || !s) return;
    font(w, size, mono); x.textAlign = al; x.textBaseline = 'alphabetic';
    x.fillStyle = rgba(c, a); x.fillText(s, px, py);
  }
  function tw(s, w, size, mono) { font(w, size, mono); return x.measureText(s).width; }
  function wrap(s, w, size, maxW, mono) {
    font(w, size, mono); const out = []; let line = '';
    for (const wd of s.split(' ')) { const t = line ? line + ' ' + wd : wd; if (x.measureText(t).width > maxW && line) { out.push(line); line = wd; } else line = t; }
    if (line) out.push(line); return out;
  }
  function dot(px, py, r, c, a) { if (a <= 0 || r <= 0) return; x.fillStyle = rgba(c, a); x.beginPath(); x.arc(px, py, r, 0, TAU); x.fill(); }
  function poly(pts, c, a, w) {
    if (pts.length < 2 || a <= 0) return;
    x.strokeStyle = rgba(c, a); x.lineWidth = w; x.lineCap = 'round'; x.beginPath();
    x.moveTo(pts[0][0], pts[0][1]); for (let i = 1; i < pts.length; i++) x.lineTo(pts[i][0], pts[i][1]); x.stroke();
  }
  // courbe quadratique de a à b, tracée jusqu'à k (0 à 1)
  function qpts(a, b, bend, k, n = 24) {
    const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2, dx = b[0] - a[0], dy = b[1] - a[1], cx = mx - dy * bend, cy = my + dx * bend, out = [];
    const m = Math.max(2, Math.ceil(n * k));
    for (let i = 0; i <= m; i++) { const u = k * i / m, v = 1 - u; out.push([v * v * a[0] + 2 * v * u * cx + u * u * b[0], v * v * a[1] + 2 * v * u * cy + u * u * b[1]]); }
    return out;
  }
  // segment raccourci aux deux bouts : les liens s'arrêtent au bord des éléments, jamais de centre à centre
  function trim(a, b, ra, rb) {
    const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1, ux = dx / L, uy = dy / L;
    return [[a[0] + ux * ra, a[1] + uy * ra], [b[0] - ux * rb, b[1] - uy * rb]];
  }
  function rr(px, py, w, h, r, tl = r) {
    x.beginPath(); x.moveTo(px + tl, py);
    x.arcTo(px + w, py, px + w, py + h, r); x.arcTo(px + w, py + h, px, py + h, r);
    x.arcTo(px, py + h, px, py, r); x.arcTo(px, py, px + w, py, tl); x.closePath();
  }
  // verre du film (sans l'instantané flouté) : teinte violette, bord plus clair en haut à gauche
  function glass(px, py, w, h, r, a, tl) {
    if (a <= 0) return;
    x.save(); x.globalAlpha = a; rr(px, py, w, h, r, tl);
    const gf = x.createLinearGradient(px, py, px + w * .9, py + h);
    gf.addColorStop(0, 'rgba(150,110,200,.18)'); gf.addColorStop(.5, 'rgba(90,60,150,.15)'); gf.addColorStop(1, 'rgba(40,24,80,.34)');
    x.fillStyle = gf; x.fill();
    const gs = x.createLinearGradient(px, py, px + w, py + h);
    gs.addColorStop(0, 'rgba(244,244,244,.3)'); gs.addColorStop(.4, 'rgba(244,244,244,.07)'); gs.addColorStop(.75, 'rgba(244,244,244,.03)'); gs.addColorStop(1, 'rgba(214,170,240,.14)');
    x.strokeStyle = gs; x.lineWidth = 1; x.stroke(); x.restore();
  }
  /* pointillés qui défilent + paquets de lumière (film, flowLine) */
  function flow(pts, col, a, t, pk, seed) {
    if (a <= 0 || pts.length < 2) return;
    x.save(); x.setLineDash([1, 7 * S]); x.lineDashOffset = -t * 28 * S; poly(pts, col, a, 2.2 * S); x.restore();
    if (pk <= 0) return;
    const n = pts.length - 1, u0 = ((t + seed * .53) / 1.5) % 1;
    for (let s = 0; s < 5; s++) {
      const u = u0 - s * .02; if (u < 0 || u > 1) continue;
      const p = pts[Math.min(n, Math.floor(ioq(u) * n))];
      dot(p[0], p[1], (3.2 - s * .5) * S, s ? col : WHITE, pk * Math.min(1, a * 1.6) * (1 - s / 5) * Math.min(1, Math.sin(Math.PI * u) * 3));
    }
  }

  /* icônes au trait (grille 48, film) : courbe de survie, grille d'application ; base de données à part */
  const KM = [[new Path2D('M7 9 V41 H43'), .4], [new Path2D('M7 12 H15 V20 H24 V27 H33 V33 H43'), 1]];
  const APP = [[new Path2D([10, 21, 32].flatMap(yy => [10, 21, 32].map(xx => `M${xx} ${yy} h9 v9 h-9 Z`)).join('')), .75]];
  function icon(defs, px, py, s, a) {
    if (a <= 0) return; const k = s / 48;
    x.save(); x.translate(px, py); x.scale(k, k); x.translate(-24, -24);
    x.lineWidth = 1.5 / k; x.lineCap = 'round'; x.lineJoin = 'round';
    defs.forEach(([p, al]) => { x.strokeStyle = rgba(WHITE, a * al); x.stroke(p); });
    x.restore();
  }
  function db(px, py, s, a) {
    if (a <= 0) return; const w = s / 2, h = s * .18, top = py - s * .42, bot = py + s * .42;
    x.strokeStyle = rgba(WHITE, a); x.lineWidth = 1.2;
    x.beginPath(); x.ellipse(px, top, w, h, 0, 0, TAU); x.stroke();
    x.beginPath(); x.moveTo(px - w, top); x.lineTo(px - w, bot); x.ellipse(px, bot, w, h, 0, Math.PI, 0, true); x.lineTo(px + w, top); x.stroke();
    x.beginPath(); x.ellipse(px, py, w, h, 0, 0, Math.PI); x.stroke();
  }

  /* le V et son anneau de points jaunes : rotation lente ; réfléchit (une vague fait le tour) ; parle (les points pulsent) */
  function drawV(v, t, th, sp) {
    const R0 = v.r * 1.47, rot = t * .22, n = Math.max(24, Math.round(TAU * R0 / Math.max(7, v.r * .16))), dr = Math.max(1.1, v.r * .034);
    const head = t * 3.6, voice = .55 + .45 * Math.sin(t * 13) * Math.sin(t * 7.3 + 1);
    for (let i = 0; i < n; i++) {
      const a = rot + i / n * TAU, d = ((a - head) % TAU + Math.PI * 3) % TAU - Math.PI;
      const bump = Math.exp(-((d / .42) ** 2)) * th;
      const amp = .5 + .5 * Math.sin(a * 3 + t * 9) * Math.sin(a * 5 - t * 7 + 1.3), vo = sp * voice * amp;
      const R = R0 + v.r * (.06 * bump + .18 * vo), s = dr * (1 + 1.2 * bump + 1.3 * vo), light = .72 + .28 * Math.cos(a + Math.PI * .75);
      dot(v.x + Math.cos(a) * R, v.y + Math.sin(a) * R, s, YEL, Math.min(1, (.8 + .2 * bump + .2 * vo) * light));
    }
    dot(v.x, v.y, v.r, YEL, 1);
    x.fillStyle = WHITE; x.beginPath();
    VPTS.forEach(([px, py], i) => { const X = v.x + px * v.r, Y = v.y + py * v.r; i ? x.lineTo(X, Y) : x.moveTo(X, Y); });
    x.closePath(); x.fill();
  }

  /* un système appelé : disque sombre, anneau fin qui se remplit dans sa couleur, icône, étiquette mono */
  function node(i, n, a, L, t) {
    if (a <= 0) return;
    const [px, py] = n.p, r = G.tr;
    dot(px, py, r, DISC, .85 * a);
    x.strokeStyle = rgba(WHITE, .14 * a); x.lineWidth = 1; x.beginPath(); x.arc(px, py, r, 0, TAU); x.stroke();
    if (L > 0) { x.strokeStyle = rgba(TGT[i], a); x.lineWidth = 1.5; x.lineCap = 'round'; x.beginPath(); x.arc(px, py, r, -Math.PI / 2, -Math.PI / 2 + TAU * L); x.stroke(); }
    const ia = (.45 + .45 * L) * a;
    if (i === 0) icon(KM, px, py, r * 1.1, ia); else if (i === 1) icon(APP, px, py, r * 1.1, ia); else db(px, py, r * .62, ia);
    // modules PhaseV : les cinq capacités en petits points autour de l'anneau, qui s'allument une à une
    if (i === 0) for (let j = 0; j < 5; j++) {
      const an = -Math.PI / 2 + j * TAU / 5 + t * .12, lit = cl(L * 5 - j);
      dot(px + Math.cos(an) * (r + 9 * S), py + Math.sin(an) * (r + 9 * S), 2.2 * S, CAP[j], a * (.2 + .8 * lit));
    }
    n.lab.forEach((ln, k) => text(ln, px, n.ly + k * G.fsM * 1.5, 400, G.fsM, L > .99 ? WHITE : GREY, a * (.6 + .4 * L), 'center', true));
  }

  /* ---------- mise en page : en ligne au-dessus de 760 px, empilée en dessous ; le module fixe la hauteur ---------- */
  let W = 0, H = 0, S = 1, G = null;
  function layout() {
    const hz = W >= 760;
    S = hz ? cl(W / 1200, .6, 1.15) : cl(W / 400, .75, 1.1);
    const fsB = Math.max(13, (hz ? 16 : 15) * S), lh = fsB * 1.45, fsM = Math.max(9, 11 * S), pad = 18 * S;
    const g = { hz, fsB, lh, fsM, pad, tr: (hz ? 26 : 22) * S };
    if (hz) {
      H = Math.round(W * (W >= 1000 ? .5 : .62));
      const bw = W * .25, lines = wrap(Q, 400, fsB, bw - pad * 2), bh = lines.length * lh + pad * 2;
      g.bub = { x: W * .05, y: H / 2 - bh / 2, w: bw, h: bh, lines };
      g.v = { x: W * .405, y: H / 2, r: 30 * S };
      g.nodes = [0, 1, 2].map(i => ({ p: [W * .6 + (i === 1 ? W * .03 : 0), H / 2 + (i - 1) * H * .29] }));
      const cw = W * .2, ch = 230 * S; g.card = { x: W * .75, y: H / 2 - ch / 2, w: cw, h: ch };
    } else {
      const bw = W - 2 * 24 * S, lines = wrap(Q, 400, fsB, bw - pad * 2), bh = lines.length * lh + pad * 2;
      let y = 30 * S + fsM + 12 * S;
      g.bub = { x: (W - bw) / 2, y, w: bw, h: bh, lines };
      y += bh + 34 * S;
      const vr = 24 * S; g.v = { x: W / 2, y: y + vr * 1.47, r: vr };
      y = g.v.y + vr * 1.47 + 70 * S + g.tr;
      g.nodes = [0, 1, 2].map(i => ({ p: [W * (.2 + .3 * i), y + (i === 1 ? 14 * S : 0)] }));
      y += 14 * S + g.tr + 22 * S + fsM * 3 + 40 * S;
      const cw = Math.min(W - 48 * S, 340 * S), ch = 170 * S; g.card = { x: (W - cw) / 2, y, w: cw, h: ch };
      H = Math.round(y + ch + 30 * S);
    }
    // étiquettes des systèmes, sur deux lignes si trop larges
    const maxL = hz ? W * .16 : W * .3;
    g.nodes.forEach((n, i) => {
      const s = TG[i] || '', words = s.split(' ');
      n.lab = tw(s, 400, fsM, true) > maxL && words.length > 1
        ? [words.slice(0, Math.ceil(words.length / 2)).join(' '), words.slice(Math.ceil(words.length / 2)).join(' ')] : [s];
      n.ly = n.p[1] + g.tr + (i === 0 ? 30 : 22) * S;
    });
    return g;
  }

  function draw(t) {
    x.clearRect(0, 0, W, H);
    const { hz, fsB, lh, fsM, pad, bub, v, nodes, card } = G, VR = v.r * 1.47 + 8 * S;

    // 1. la question : bulle en verre, le texte s'écrit
    const ba = oq(seg(t, 0, .5));
    text(ASK, bub.x, bub.y - 12 * S, 400, fsM, GREY, ba, 'left', true);
    glass(bub.x, bub.y, bub.w, bub.h, 18 * S, ba, 6 * S);
    let left = Math.round(Q.length * seg(t, T.type0, T.type1)), cx = bub.x + pad, cy = bub.y + pad + fsB;
    bub.lines.forEach((ln, i) => {
      const s = ln.slice(0, Math.max(0, left)); left -= ln.length + 1;
      const yy = bub.y + pad + fsB * .95 + i * lh;
      text(s, bub.x + pad, yy, 400, fsB, WHITE, ba);
      if (s.length) { font(400, fsB); cx = bub.x + pad + x.measureText(s).width; cy = yy; }
    });
    if (t < T.send + .4 && Math.sin(t * 10) > 0) { x.fillStyle = rgba(WHITE, .8 * ba); x.fillRect(cx + 2, cy - fsB * .85, 1.5, fsB); }

    // 2. la question part vers BonV
    const a0 = hz ? [bub.x + bub.w + 8 * S, bub.y + bub.h / 2] : [W / 2, bub.y + bub.h + 8 * S];
    const a1 = hz ? [v.x - VR, v.y] : [v.x, v.y - VR];
    const qk = ioq(seg(t, T.send, T.send + .6));
    if (qk > 0) flow(qpts(a0, a1, 0, qk), WHITE, .5, t, Math.min(seg(t, T.send + .6, T.send + .9), 1 - seg(t, T.th1, T.th1 + .4)), 0);

    // 3. BonV appelle les trois systèmes ; le retour arrive dans la carte des résultats
    const ca = oq(seg(t, T.card, T.card + .5)), cy0 = card.y + 14 * S * (1 - ca);
    nodes.forEach((n, i) => {
      const ek = ioq(seg(t, T.out + i * .15, T.out + .6 + i * .15));
      const na = oq(seg(t, T.out + .3 + i * .15, T.out + .8 + i * .15));
      const L = oq(seg(t, T.lit + i * .35, T.lit + 1.4 + i * .35));
      if (ek > 0) {
        const [p0, p1] = trim([v.x, v.y], n.p, VR, G.tr + 6 * S);
        flow(qpts(p0, p1, (1 - i) * .06, ek), TGT[i], .35 + .4 * L, t, ek >= 1 ? Math.min(seg(t, T.lit, T.lit + .3), 1 - seg(t, T.back + .6, T.back + 1)) : 0, i + 1);
      }
      const bk = ioq(seg(t, T.back + i * .12, T.back + .6 + i * .12));
      if (bk > 0) {
        const s0 = hz ? [n.p[0] + G.tr + 8 * S, n.p[1]] : [n.p[0], n.ly + fsM * 1.5 * (n.lab.length - 1) + 12 * S];
        const s1 = hz ? [card.x - 8 * S, cy0 + card.h * (.5 + (i - 1) * .16)] : [card.x + card.w * (.5 + (i - 1) * .22), cy0 - 8 * S];
        flow(qpts(s0, s1, (i - 1) * .05, bk), TGT[i], .4, t, bk >= 1 ? Math.min(seg(t, T.back + .7, T.back + 1), 1 - seg(t, T.press, T.press + .4)) : 0, i + 4);
      }
      node(i, n, na, L, t);
    });

    // 4. le V : réfléchit pendant le découpage en tâches, parle après la validation
    const th = Math.min(seg(t, T.th0, T.th0 + .3), 1 - seg(t, T.th1 - .3, T.th1));
    const sp = ioq(seg(t, T.ring0, T.ring0 + .2)) * (1 - ioq(seg(t, T.ring1 + .6, T.ring1 + 1.3)));
    drawV(v, t, th, sp);

    // 5. résultats à valider : carte en verre, courbe, bouton blanc, anneau qui se ferme en jaune à la validation
    if (ca > 0) {
      glass(card.x, cy0, card.w, card.h, 20 * S, ca);
      text(RES, card.x + pad, cy0 + pad + fsM, 400, fsM, WHITE, .85 * ca, 'left', true);
      const bh = 34 * S, by = cy0 + card.h - pad - bh, gx0 = card.x + pad, gx1 = card.x + card.w - pad, gy0 = cy0 + pad + fsM + 18 * S, gy1 = by - 18 * S;
      x.strokeStyle = rgba(WHITE, .12 * ca); x.lineWidth = 1; x.beginPath(); x.moveTo(gx0, gy1 + .5); x.lineTo(gx1, gy1 + .5); x.stroke();
      const ck = ioq(seg(t, T.cv0, T.cv1)), N = 32, ctrl = [], trt = [];
      for (let k = 0; k <= Math.ceil(N * ck); k++) {
        const u = Math.min(k / N, ck), px = lerp(gx0, gx1, u), h = gy1 - gy0;
        ctrl.push([px, gy1 - h * (.12 + .32 * u)]);
        trt.push([px, gy1 - h * (.12 + .78 * (1 - Math.pow(1 - u, 2.2)))]);
      }
      x.save(); x.setLineDash([3 * S, 4 * S]); poly(ctrl, GREY, .9 * ca, 1.2); x.restore();
      poly(trt, WHITE, ca, 1.6);
      // bouton
      const pr = Math.sin(Math.PI * seg(t, T.press, T.press + .25)), sc = 1 - .05 * pr;
      const bw = tw(OK, 500, fsB * .9) + 36 * S, bx = card.x + pad;
      x.save(); x.translate(bx + bw / 2, by + bh / 2); x.scale(sc, sc); x.translate(-(bx + bw / 2), -(by + bh / 2));
      x.globalAlpha = ca; rr(bx, by, bw, bh, bh / 2); x.fillStyle = WHITE; x.fill(); x.globalAlpha = 1;
      text(OK, bx + bw / 2, by + bh / 2 + fsB * .32, 500, fsB * .9, NAVY, ca, 'center');
      x.restore();
      // anneau : en attente (pointillé gris), puis fermé en jaune avec la coche
      const rx = bx + bw + 22 * S, ry = by + bh / 2, r = 11 * S, rk = oq(seg(t, T.ring0, T.ring1));
      if (rk < 1) { x.save(); x.setLineDash([1, 4 * S]); x.lineCap = 'round'; x.strokeStyle = rgba(GREY, .8 * ca * (1 - rk)); x.lineWidth = 1.5; x.beginPath(); x.arc(rx, ry, r, 0, TAU); x.stroke(); x.restore(); }
      if (rk > 0) {
        x.strokeStyle = rgba(YEL, ca); x.lineWidth = 1.5; x.lineCap = 'round';
        x.beginPath(); x.arc(rx, ry, r, -Math.PI / 2, -Math.PI / 2 + TAU * rk); x.stroke();
        const kk = seg(t, T.ring0 + .35, T.ring1 + .1);
        if (kk > 0) poly(qpts([rx - r * .42, ry + r * .02], [rx - r * .1, ry + r * .32], 0, 1, 2).concat(qpts([rx - r * .1, ry + r * .32], [rx + r * .45, ry - r * .3], 0, 1, 2)).slice(0, 1 + Math.ceil(5 * kk)), YEL, ca, 1.5);
      }
    }
  }

  /* ---------- boucle : tourne seulement à l'écran, repart de t = 0 à chaque entrée ---------- */
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let ready = false, t = 0, raf = 0, last = 0;

  function fit() {
    W = mount.clientWidth; if (!W) return;
    G = layout();
    mount.style.height = H + 'px';
    const dpr = Math.min(devicePixelRatio || 1, 2);
    cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
    x.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (ready) draw(reduced ? STILL : t);
  }
  function frame(now) {
    raf = requestAnimationFrame(frame);
    t += Math.min((now - last) / 1000, .05); last = now;
    if (t > T.loop) t = 0;
    cv.style.opacity = t > T.fade ? 0 : 1;   // fondu de sortie avant la boucle
    draw(t);
  }
  function start() {
    if (raf || reduced) return;
    t = 0; cv.style.opacity = 1;
    last = performance.now(); raf = requestAnimationFrame(frame);
  }
  function stop() { cancelAnimationFrame(raf); raf = 0; }

  let lastW = 0;
  const ro = new ResizeObserver(() => { if (mount.clientWidth !== lastW) { lastW = mount.clientWidth; fit(); } });
  ro.observe(mount);
  let io = null;

  // on attend les polices avant le premier dessin (plafond 3 s)
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
