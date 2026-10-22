/* Bloc "The ClinOps workflow" de ClinOps Optimizer (proto : protos/phasev-clinops-workflow-proto.html).
   Monté dans <div data-pv="clinops-workflow"></div>, bande pleine largeur sous l'en-tête.
   Label, titre et paragraphe restent dans Webflow. La marge haute est une classe Webflow. */

const INK = [20, 18, 56], MAU = [146, 138, 205], YEL = '#E2C70A', MUT = '#7d7b9c', GRID = '#d3d0e8', INK_HEX = '#141238';

/* Chronologie (s). Une seule population de particules : patients, puis sites, puis plan d'enrôlement. */
const T = { waves: [1.0, 1.7, 2.4], pool: 3.0, sites: 4.2, pick: 6.0, fan: 8.0, act: 12.0, refc: 13.6, upd: 15.0, out: 17.0, loop: 18 };
const STEPS = [['FEASIBILITY', 0], ['SITE STRATEGY', 4.1], ['ENROLLMENT', 7.9], ['REFORECASTING', 11.9]];
const STILL = 16;   // état dessiné sous reduced motion : reforecast complet

/* Courbes d'enrôlement cumulé, en fractions : u = temps (0..1), valeur = part de la cible */
const NC = 12, TODAY = .45, MILESTONE = .78;
const plan = (u, g) => (1 + .16 * g) / (1 + Math.exp(-(u - .42) / .1)) - (1 + .16 * g) / (1 + Math.exp(.42 / .1));
const actual = u => plan(u, 0) * .8;   // le réel prend du retard sur le plan
const refc = (u, g) => {   // nouvelle trajectoire depuis les données réelles
  const a0 = actual(TODAY), k = (u - TODAY) / (1 - TODAY);
  return a0 + ((1 + .12 * g) - a0) * (1 - Math.exp(-k * 2.6)) / (1 - Math.exp(-2.6));
};
const NS = 14, NPICK = 9;
/* Groupes de rendu des particules : encre puis mauve, opacité arrondie au 1/QA */
const QA = 20;
const BUCKETS = Array.from({ length: 2 * (QA + 1) }, () => []);

const cl = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const seg = (t, a, b) => cl((t - a) / (b - a));
const ease = v => v < .5 ? 4 * v * v * v : 1 - Math.pow(-2 * v + 2, 3) / 2;
const mix = (a, b, k) => a + (b - a) * k;
function rng(s) { return () => { s |= 0; s = s + 0x6D2B79F5 | 0; let t = Math.imul(s ^ s >>> 15, 1 | s); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }

function build(N) {
  // tirage rejeté plutôt que borné : pas de colonnes de points aux bords
  const R = rng(17), g = () => { let v; do { v = Math.sqrt(-2 * Math.log(R() + 1e-9)) * Math.cos(6.2832 * R()); } while (Math.abs(v) > 2.4); return v; };
  /* poids des sites, classés du plus fort au plus faible */
  const w = [...Array(NS)].map((_, i) => Math.exp(-i * .15) * (.75 + .5 * R())).sort((a, b) => b - a), wsum = w.reduce((a, b) => a + b, 0);
  const CG = [...Array(NC)].map((_, k) => k === 0 ? 0 : g());
  const P = [];
  for (let i = 0; i < N; i++) {
    const u = R();
    // 3 vagues d'exclusion (éligibilité, échec de screening, compétition) : ~55 % sortent
    const wave = u < .22 ? 0 : u < .40 ? 1 : u < .55 ? 2 : -1;
    let site = -1;
    if (wave < 0) { let r = R() * wsum; site = 0; while (r > w[site] && site < NS - 1) { r -= w[site]; site++; } }
    P.push({ wave, site, ax: g(), ay: g(), bx: g(), by: g(), sx: g(), sy: g(), d: R(), k: Math.floor(R() * NC), u: R(), j: R() - .5, s: 1.2 + R() * .9, ink: R() < .35 });
  }
  return { P, w, CG };
}

/* Taille du montage, injectée une fois : bande 16/5.4, 4/3.4 sous 700 px, sans min-height */
const CSS = `[data-pv="clinops-workflow"]{position:relative;width:100%;aspect-ratio:16/5.4}
@media (max-width:700px){[data-pv="clinops-workflow"]{aspect-ratio:4/3.4}}`;
function injectCSS() {
  if (document.getElementById('pv-clinops-workflow-css')) return;
  const s = document.createElement('style');
  s.id = 'pv-clinops-workflow-css';
  s.textContent = CSS;
  document.head.appendChild(s);
}

export function initClinopsWorkflow(mount) {
  if (mount.dataset.pvReady) return;
  mount.dataset.pvReady = '1';
  injectCSS();

  const cv = document.createElement('canvas');
  cv.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block;';
  cv.setAttribute('role', 'img');
  cv.setAttribute('aria-label', 'ClinOps workflow: the patient pool narrows through feasibility, becomes a ranked site footprint, then an enrollment forecast that updates as actual study data arrive.');
  mount.appendChild(cv);
  const x = cv.getContext('2d');

  /* Typo : celle de l'étiquette du bloc, comme gantt.js.
     L'espacement est converti en ratio de la taille, puis réappliqué à nos petites tailles. */
  const section = mount.closest('section') || document.body;
  const label = section.querySelector('.text-size-label') || document.querySelector('.text-size-label');
  const cs = getComputedStyle(label || document.body);
  const FAMILY = cs.fontFamily;
  const lsRatio = label && cs.letterSpacing !== 'normal'
    ? (parseFloat(cs.letterSpacing) || 0) / (parseFloat(cs.fontSize) || 16) : 0;
  const hasLS = 'letterSpacing' in x;
  // fond de la section : rien n'est peint, gardé pour d'éventuelles pastilles
  const BG = getComputedStyle(section).backgroundColor;

  function setFont(w, size) {
    x.font = `${w} ${size}px ${FAMILY}`;
    if (hasLS) x.letterSpacing = (lsRatio * size).toFixed(2) + 'px';
  }
  function txt(s, px, py, w, size, c, a = 1, al = 'left') {
    if (a <= 0) return;
    setFont(w, size);
    x.textAlign = al; x.globalAlpha = a; x.fillStyle = c; x.fillText(s, px, py);
    x.globalAlpha = 1; x.textAlign = 'left';
  }

  let W = 0, H = 0, D = null;

  function draw(t) {
    x.clearRect(0, 0, W, H);
    const fs = W < 500 ? 9 : 10, L = W < 500 ? 30 : 44, R = W - 8, T0 = 26, B = H - 46;
    const cx = W / 2, cy = (T0 + B) / 2;
    const X = u => L + u * (R - L), Y = v => B - v * (B - T0) * .86;
    const { P, w, CG } = D, wmax = w[0];
    const siteX = i => L + (i + .5) / NS * (R - L), siteY = cy + 6;

    /* ---------- décor par étape ---------- */
    // sites : accolade sous la sélection
    const kb = ease(seg(t, T.pick + .4, T.pick + 1)) * (1 - seg(t, T.fan - .4, T.fan));
    if (kb > 0) {
      const x0 = siteX(0) - 14, x1 = siteX(NPICK - 1) + 14, y = siteY + (B - T0) * .32;
      x.strokeStyle = YEL; x.lineWidth = 3; x.globalAlpha = kb; x.beginPath(); x.moveTo(x0, y); x.lineTo(mix(x0, x1, kb), y); x.stroke(); x.globalAlpha = 1;
      txt('SELECTED FOOTPRINT', x0, y + 16, 700, fs, INK_HEX, kb);
    }

    // axes du plan
    const kx = seg(t, T.fan - .2, T.fan + .4) * (1 - seg(t, T.out - .2, T.out));
    if (kx > 0) {
      x.globalAlpha = kx * .5; x.strokeStyle = INK_HEX; x.lineWidth = 1;
      x.beginPath(); x.moveTo(L + .5, T0); x.lineTo(L + .5, B + .5); x.lineTo(R, B + .5); x.stroke(); x.globalAlpha = 1;
      txt('ENROLLED', L, T0 - 10, 500, fs, MUT, kx);
      txt('TIME', R, B + 16, 500, fs, MUT, kx, 'right');
      const kt = seg(t, T.fan + 1.4, T.fan + 1.9) * (1 - seg(t, T.out - .2, T.out));
      if (kt > 0) {
        x.save(); x.setLineDash([4, 4]); x.strokeStyle = INK_HEX; x.globalAlpha = .6 * kt;
        x.beginPath(); x.moveTo(L, Y(1)); x.lineTo(R, Y(1)); x.stroke();
        x.beginPath(); x.moveTo(X(MILESTONE), T0); x.lineTo(X(MILESTONE), B); x.stroke(); x.restore();
        txt('TARGET', L + 6, Y(1) - 6, 500, fs, INK_HEX, kt);
        txt('MILESTONE', X(MILESTONE) + 6, B - 6, 500, fs, INK_HEX, kt);
      }
      const ktd = seg(t, T.act, T.act + .4) * (1 - seg(t, T.out - .2, T.out));
      if (ktd > 0) {
        x.strokeStyle = INK_HEX; x.lineWidth = 1.25; x.globalAlpha = ktd; x.beginPath(); x.moveTo(X(TODAY), T0); x.lineTo(X(TODAY), B); x.stroke(); x.globalAlpha = 1;
        txt('TODAY · ACTUAL DATA', X(TODAY) - 6, T0 + 10, 700, fs, INK_HEX, ktd, 'right');
      }
    }

    /* ---------- particules ---------- */
    for (const p of P) {
      // A : bassin de patients large, puis pool accessible resserré
      const ax = cx + p.ax * (R - L) * .13, ay = cy + p.ay * (B - T0) * .2;
      const bx = cx + p.bx * (R - L) * .05, by = cy + p.by * (B - T0) * .13;
      let px = ax, py = ay, a = 0, col = MAU;
      const kin = ease(seg(t, 0, .8 + p.d * .4));
      if (p.wave >= 0) {
        // exclus : s'éteignent à leur vague et glissent vers le bas
        const kw = ease(seg(t, T.waves[p.wave] + p.d * .3, T.waves[p.wave] + .5 + p.d * .3));
        px = ax; py = ay + kw * 18; a = kin * (.55 - .45 * kw) * (1 - seg(t, T.pool, T.sites));
        col = p.ink ? INK : MAU;
      } else {
        const kp = ease(seg(t, T.pool + p.d * .4, T.pool + .9 + p.d * .4));
        px = mix(ax, bx, kp); py = mix(ay, by, kp); a = kin * .7; col = kp > .5 || p.ink ? INK : MAU;

        // B : répartition dans les sites, taille ∝ poids du site
        const ks = ease(seg(t, T.sites + p.d * .6, T.sites + 1.2 + p.d * .6));
        const r = (6 + 12 * Math.sqrt(w[p.site] / wmax)) * (W < 500 ? .6 : 1);
        const sx = siteX(p.site) + p.sx * r * .55, sy = siteY + p.sy * r * .55;
        px = mix(px, sx, ks); py = mix(py, sy, ks);
        const picked = p.site < NPICK, kpk = seg(t, T.pick + p.site * .05, T.pick + .4 + p.site * .05);
        if (ks > .5) { col = picked ? INK : MAU; a = picked ? .8 : .75 - .45 * kpk; }

        // C : le footprint retenu alimente le fan de trajectoires
        const kf = ease(seg(t, T.fan + p.u * 1.2, T.fan + .8 + p.u * 1.2));
        if (picked) {
          const g = CG[p.k], fx = X(p.u), fy = Y(plan(p.u, g)) + p.j * 2;
          px = mix(px, fx, kf); py = mix(py, fy, kf);
          if (kf > .5) { col = p.k === 0 ? INK : MAU; a = p.k === 0 ? .9 : .6; }

          // D : avant aujourd'hui, les particules se posent sur le réel ; après, sur la nouvelle trajectoire
          if (p.u < TODAY) {
            const kd = ease(seg(t, T.act + p.u * 2.6, T.act + .5 + p.u * 2.6));
            px = mix(px, X(p.u), kd); py = mix(py, Y(actual(p.u)) + p.j * 1.5, kd);
            if (kd > .5) { col = INK; a = .9; }
          } else {
            const kr = ease(seg(t, T.refc + (p.u - TODAY) * 1.6, T.refc + .9 + (p.u - TODAY) * 1.6));
            py = mix(py, Y(refc(p.u, CG[p.k])) + p.j * 2, kr);
          }
        } else { a *= 1 - seg(t, T.fan, T.fan + .6); }
      }
      // fondu de boucle
      a *= 1 - seg(t, T.out, T.out + .5);
      if (a <= .01) continue;
      // regroupement par couleur et opacité arrondie au 1/20 : un seul remplissage par groupe
      const b = BUCKETS[(col === INK ? 0 : QA + 1) + Math.round(a * QA)];
      b.push(px - p.s / 2, py - p.s / 2, p.s);
    }
    for (let i = 0; i < BUCKETS.length; i++) {
      const b = BUCKETS[i];
      if (!b.length) continue;
      const c = i <= QA ? INK : MAU, q = (i <= QA ? i : i - QA - 1) / QA;
      x.fillStyle = `rgba(${c[0]},${c[1]},${c[2]},${q})`;
      for (let k = 0; k < b.length; k += 3) x.fillRect(b[k], b[k + 1], b[k + 2], b[k + 2]);
      b.length = 0;
    }

    // plan d'origine en fantôme, puis prévision mise à jour : seul jaune de l'étape
    // étiquettes des courbes : sur petit écran elles se croisent, la prévision descend alors d'une ligne
    const planX = X(.62), planY = Y(plan(.62, 0)) - 10;
    let updY = Y(refc(.9, 0)) + 20;
    setFont(500, fs); const planW = x.measureText('PLAN').width;
    setFont(700, fs); const updW = x.measureText('UPDATED FORECAST').width;
    if (X(.9) - updW < planX + planW + 6 && Math.abs(updY - planY) < fs + 4) {
      // sous la courbe, à l'endroit où commence le libellé (la courbe y est plus basse que sous sa fin)
      const uLeft = cl((X(.9) - updW - L) / (R - L), TODAY, 1);
      updY = Math.max(updY + fs + 8, Y(refc(uLeft, 0)) + fs + 6);
    }
    const kg = seg(t, T.refc, T.refc + .6) * (1 - seg(t, T.out - .2, T.out));
    if (kg > 0) {
      x.save(); x.setLineDash([2, 4]); x.strokeStyle = INK_HEX; x.globalAlpha = .45 * kg; x.lineWidth = 1.25; x.beginPath();
      for (let i = 0; i <= 80; i++) { const u = TODAY + (1 - TODAY) * i / 80; i ? x.lineTo(X(u), Y(plan(u, 0))) : x.moveTo(X(u), Y(plan(u, 0))); }
      x.stroke(); x.restore();
      txt('PLAN', planX, planY, 500, fs, MUT, kg);
    }
    const ku = ease(seg(t, T.upd, T.upd + .9)) * (1 - seg(t, T.out - .2, T.out));
    if (ku > 0) {
      const path = () => { x.beginPath(); for (let i = 0; i <= 80; i++) { const u = TODAY + (1 - TODAY) * ku * i / 80; i ? x.lineTo(X(u), Y(refc(u, 0))) : x.moveTo(X(u), Y(refc(u, 0))); } };
      path(); x.strokeStyle = INK_HEX; x.lineWidth = 4.5; x.stroke(); path(); x.strokeStyle = YEL; x.lineWidth = 2.5; x.stroke();
      txt('UPDATED FORECAST', X(.9), updY, 700, fs, INK_HEX, seg(t, T.upd + .7, T.upd + 1.1), 'right');
    }

    // faisabilité : chaque vague d'exclusion est nommée, puis le pool accessible
    const WN = ['ELIGIBILITY CRITERIA', 'SCREEN FAILURE', 'COMPETING TRIALS'];
    WN.forEach((n, i) => { const a0 = T.waves[i]; txt('− ' + n, L, T0 + i * 16, 500, fs, MUT, seg(t, a0, a0 + .3) * (1 - seg(t, T.sites - .3, T.sites))); });
    txt('ACCESSIBLE PATIENTS', cx, cy + (B - T0) * .13 * 2.6 + 14, 700, fs, INK_HEX, seg(t, T.pool + .8, T.pool + 1.2) * (1 - seg(t, T.sites, T.sites + .4)), 'center');
    txt('SITES RANKED BY PROTOCOL FIT · RECRUITMENT · OPERATIONS', L, T0, 500, fs, MUT, seg(t, T.sites + .8, T.sites + 1.2) * (1 - seg(t, T.fan - .4, T.fan)));

    /* ---------- étapes, en bas ---------- */
    let cur = 0;
    STEPS.forEach(([, t0], i) => { if (t >= t0) cur = i; });
    const sw = (R - L) / 4, sy = H - 8;
    x.strokeStyle = GRID; x.lineWidth = 1; x.beginPath(); x.moveTo(L, sy - 16.5); x.lineTo(R, sy - 16.5); x.stroke();
    const prog = cl(t / T.out);
    x.strokeStyle = INK_HEX; x.lineWidth = 1.5; x.beginPath(); x.moveTo(L, sy - 16.5); x.lineTo(L + (R - L) * prog, sy - 16.5); x.stroke();
    // sur petit écran, noms sans numéro, répartis avec des espaces égaux plutôt qu'en colonnes fixes
    const sfs = W < 500 ? 8 : fs;
    const labels = STEPS.map(([n], i) => (W < 500 ? '' : '0' + (i + 1) + ' · ') + n);
    let pos = labels.map((_, i) => L + sw * i);
    if (W < 500) {
      const ws = labels.map((s, i) => { setFont(i === cur ? 700 : 500, sfs); return x.measureText(s).width; });
      const gap = ((R - L) - ws.reduce((a, b) => a + b, 0)) / (labels.length - 1);
      let acc = L; pos = ws.map((w0) => { const p0 = acc; acc += w0 + gap; return p0; });
    }
    labels.forEach((s, i) => {
      const on = i === cur;
      txt(s, pos[i], sy, on ? 700 : 500, sfs, on ? INK_HEX : MUT, on ? 1 : .8);
    });
  }

  /* ---------- boucle : tourne seulement à l'écran, repart de t = 0 à chaque entrée ---------- */
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let ready = false, t = 0, raf = 0, last = 0;

  function fit() {
    const dpr = Math.min(devicePixelRatio || 1, 2), nw = mount.clientWidth, wide = nw >= 500;
    // reconstruction seulement au franchissement de 500 px
    if (!D || wide !== (W >= 500)) D = build(wide ? 2600 : 1500);
    W = nw; H = mount.clientHeight;
    cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
    x.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (ready) draw(reduced ? STILL : t);
  }
  function frame(now) {
    raf = requestAnimationFrame(frame);
    t += Math.min((now - last) / 1000, .05); last = now;
    if (t > T.loop) t = 0;
    draw(t);
  }
  function start() {
    if (raf || reduced) return;
    t = 0; last = performance.now(); raf = requestAnimationFrame(frame);
  }
  function stop() { cancelAnimationFrame(raf); raf = 0; }

  const ro = new ResizeObserver(fit);
  ro.observe(mount);
  let io = null;

  /* On attend la police avant le premier dessin, sinon il part en Arial.
     Plafond à 3 s pour ne jamais bloquer l'animation. */
  const fontReady = document.fonts
    ? Promise.race([document.fonts.load(`500 10px ${FAMILY}`), new Promise(r => setTimeout(r, 3000))])
    : Promise.resolve();

  fontReady.then(() => {
    ready = true;
    fit();
    if (reduced) return;
    io = new IntersectionObserver(([e]) => e.isIntersecting ? start() : stop(), { threshold: .35 });
    io.observe(mount);
  });

  return {
    destroy() {
      stop(); ro.disconnect(); if (io) io.disconnect();
      cv.remove(); delete mount.dataset.pvReady;
    }
  };
}
