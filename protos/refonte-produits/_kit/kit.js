/* Kit des pages produit : comportements des blocs communs (onglets, visuels, graphiques, FAQ, plateforme, barre de proto).
   Chargé en module par chaque page de protos/refonte-produits/. */

import { initPlatformConnect } from './platform-connect-cards.js';

document.querySelectorAll('[data-pv="platform-connect-v2"]').forEach(el => initPlatformConnect(el));


/* Contrat Webflow : un div [data-pv="tabs"] contient des [data-tab data-tab-label="…"]. Le libellé reste dans Webflow
   (attribut). Le module construit la barre d'onglets, n'affiche que l'onglet actif. Sans JS : tous les panneaux visibles. */
(function () {
  document.querySelectorAll('[data-pv="tabs"]').forEach(root => {
    if (root.dataset.pvInit) return; root.dataset.pvInit = '1';
    const panels = [...root.querySelectorAll(':scope > [data-tab]')];
    const list = document.createElement('div'); list.className = 'pv-tablist'; list.setAttribute('role', 'tablist');
    const tabs = panels.map((p, i) => {
      const b = document.createElement('button'); b.type = 'button'; b.className = 'pv-tab'; b.setAttribute('role', 'tab');
      // l'onglet montre le nom (attribut) et la question (h3 du panneau, masqué ensuite)
      const n = document.createElement('span'); n.className = 'pv-tab-n'; n.textContent = p.dataset.tabLabel;
      const q = document.createElement('span'); q.className = 'pv-tab-q'; q.textContent = p.querySelector('h3')?.textContent || '';
      b.append(n, q); b.id = 'pv-tab-' + i; p.id = 'pv-panel-' + i;
      b.setAttribute('aria-controls', p.id); p.setAttribute('role', 'tabpanel'); p.setAttribute('aria-labelledby', b.id);
      b.addEventListener('click', () => set(i));
      list.append(b); return b;
    });
    function set(i) {
      tabs.forEach((b, k) => { b.setAttribute('aria-selected', String(k === i)); b.tabIndex = k === i ? 0 : -1; });
      panels.forEach((p, k) => p.classList.toggle('is-on', k === i));
    }
    list.addEventListener('keydown', e => {
      const i = tabs.indexOf(document.activeElement); if (i < 0) return;
      const n = e.key === 'ArrowRight' ? (i + 1) % tabs.length : e.key === 'ArrowLeft' ? (i - 1 + tabs.length) % tabs.length : -1;
      if (n >= 0) { e.preventDefault(); set(n); tabs[n].focus(); }
    });
    root.prepend(list); root.classList.add('is-ready'); set(0);
    root.dataset.v = 'C';   // variante retenue par Romain (A et B écartées)
    panels.forEach((p, i) => { const v = document.createElement('div'); v.className = 'rp-viz'; v.dataset.mode = p.dataset.viz || (i ? 'split' : 'precision'); /* data-viz sur le panneau : precision | split | rank | dist */ p.append(v); });
  });
  // détails du cas : panneau repliable
  document.querySelectorAll('[data-rp-details]').forEach(w => {
    const b = w.querySelector('.rp-toggle'), p = w.querySelector('.rp-details');
    b.addEventListener('click', () => {
      const open = !w.classList.contains('is-open');
      w.classList.toggle('is-open', open); b.setAttribute('aria-expanded', String(open)); p.inert = !open;
      b.textContent = open ? 'Hide case details ↑' : 'View case details →';
    });
  });
})();


/* Chaque point est un patient ; la couleur dit l'effet estimé sur la baisse d'HbA1c (navy faible → mauve → turquoise fort).
   Les pointillés marquent la frontière des répondeurs (âge ≥ 53, IMC ≤ 32), comme le graphique du document.
   Données illustratives, générées : à remplacer par les vraies si le client les fournit. */
(function () {
  const INK = [20, 18, 56], MAU = [146, 138, 205], TEA = [127, 232, 207];
  const mix = (a, b, k) => a.map((v, i) => Math.round(v + (b[i] - v) * k));
  const col = e => e < .5 ? mix(INK, MAU, e * 2) : mix(MAU, TEA, (e - .5) * 2);
  const cl = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v)), seg = (t, a, b) => cl((t - a) / (b - a));
  const ease = v => v < .5 ? 4 * v * v * v : 1 - Math.pow(-2 * v + 2, 3) / 2;
  function rng(s) { return () => { s |= 0; s = s + 0x6D2B79F5 | 0; let t = Math.imul(s ^ s >>> 15, 1 | s); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  const R = rng(7), g = () => Math.sqrt(-2 * Math.log(R() + 1e-9)) * Math.cos(6.2832 * R());
  const PTS = [];
  for (let i = 0; i < 340; i++) {
    const age = cl(60 + g() * 8.5, 35, 79), bmi = cl(32 + g() * 3.6 - (age - 60) * .05, 23.5, 41);
    const inside = age >= 53 && bmi <= 32;
    const e = cl((inside ? .62 : .18) + (32 - bmi) * .035 + (age - 53) * .006 + g() * .12);
    PTS.push({ age, bmi, e, d: R() });
  }
  const AX = [33, 81], AY = [23, 41.5];
  document.querySelectorAll('[data-pv="hte-scatter"]').forEach(mount => {
    mount.style.cssText = 'position:relative;width:100%;aspect-ratio:1.45/1;';
    const cv = document.createElement('canvas'); cv.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block;';
    cv.setAttribute('role', 'img'); cv.setAttribute('aria-label', 'Scatter plot of patients by age and BMI, colored by estimated treatment effect, with the responder boundary at age 53 and BMI 32.');
    mount.append(cv); const x = cv.getContext('2d');
    const FAMILY = getComputedStyle(mount).fontFamily;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let W = 0, H = 0, t0 = 0, raf = 0, started = false;
    function fit() { const dpr = Math.min(devicePixelRatio || 1, 2); W = mount.clientWidth; H = mount.clientHeight; cv.width = W * dpr; cv.height = H * dpr; x.setTransform(dpr, 0, 0, dpr, 0, 0); draw(started ? (performance.now() - t0) / 1000 : (reduced ? 9 : 0)); }
    function draw(t) {
      x.clearRect(0, 0, W, H);
      const L = 40, B = 30, Rm = 46, T = 8, pw = W - L - Rm, ph = H - B - T;
      const sx = a => L + (a - AX[0]) / (AX[1] - AX[0]) * pw, sy = b => T + ph - (b - AY[0]) / (AY[1] - AY[0]) * ph;
      // axes et graduations
      x.font = `500 11px ${FAMILY}`; x.fillStyle = '#626262'; x.strokeStyle = '#14123826'; x.lineWidth = 1;
      x.beginPath(); x.moveTo(L, T); x.lineTo(L, T + ph); x.lineTo(L + pw, T + ph); x.stroke();
      x.textAlign = 'center'; [40, 50, 60, 70, 80].forEach(a => { x.fillText(a, sx(a), T + ph + 16); });
      x.textAlign = 'right'; [25, 30, 35, 40].forEach(b => { x.fillText(b, L - 8, sy(b) + 4); x.strokeStyle = '#1412380f'; x.beginPath(); x.moveTo(L, sy(b)); x.lineTo(L + pw, sy(b)); x.stroke(); });
      x.textAlign = 'center'; x.fillText('Age', L + pw / 2, H - 2);
      x.save(); x.translate(11, T + ph / 2); x.rotate(-Math.PI / 2); x.fillText('BMI', 0, 0); x.restore();
      // points : apparition, puis couleur de l'effet
      const tint = ease(seg(t, 1.2, 2.6));
      PTS.forEach(p => {
        const k = ease(seg(t, p.d * .9, p.d * .9 + .5)); if (k <= 0) return;
        const c = mix(MAU, col(p.e), tint);
        x.beginPath(); x.arc(sx(p.age), sy(p.bmi), 3.2 * k, 0, 6.283); x.fillStyle = `rgba(${c},${.85})`; x.fill();
      });
      // frontière des répondeurs, tracée en pointillés
      const b = ease(seg(t, 2.8, 3.8)), xa = sx(53), yb = sy(32), x1 = sx(80), y0 = sy(AY[0]);
      if (b > 0) {
        x.setLineDash([6, 5]); x.strokeStyle = '#141238'; x.lineWidth = 2;
        x.beginPath(); x.moveTo(xa, y0); x.lineTo(xa, y0 + (yb - y0) * b); x.stroke();
        x.beginPath(); x.moveTo(xa, yb); x.lineTo(xa + (x1 - xa) * b, yb); x.stroke(); x.setLineDash([]);
      }
      // échelle de couleur
      const gx = W - 22, gy0 = T, gy1 = T + ph, gr = x.createLinearGradient(0, gy1, 0, gy0);
      gr.addColorStop(0, `rgb(${INK})`); gr.addColorStop(.5, `rgb(${MAU})`); gr.addColorStop(1, `rgb(${TEA})`);
      x.globalAlpha = tint; x.fillStyle = gr; x.fillRect(gx, gy0, 10, gy1 - gy0); x.globalAlpha = 1;
      x.save(); x.translate(gx - 8, T + ph / 2); x.rotate(-Math.PI / 2); x.fillStyle = '#626262'; x.textAlign = 'center'; x.fillText('Estimated effect', 0, 0); x.restore();
    }
    function frame() { const t = (performance.now() - t0) / 1000; draw(t); raf = t < 4.2 ? requestAnimationFrame(frame) : 0; }
    new ResizeObserver(fit).observe(mount);
    // l'animation se joue une fois, à l'entrée à l'écran
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting && !started) { started = true; io.disconnect(); if (reduced) return draw(9); t0 = performance.now(); raf = requestAnimationFrame(frame); } }, { threshold: .35 });
    io.observe(mount);
  });
})();


/* precision : deux bras de patients, la dispersion se resserre et l'intervalle de confiance rétrécit (ajustement pronostique).
   split : un nuage de patients se sépare ; ceux qui répondent au traitement montent et passent en turquoise. */
(function () {
  // couleurs par défaut ; une page peut les changer en CSS (--viz-ink, --viz-mau, --viz-tea en « r,g,b »), ex. visuel sur fond sombre
  const INK0 = '20,18,56', MAU0 = '146,138,205', TEA0 = '127,232,207';
  const cl = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v)), ease = v => v < .5 ? 4 * v * v * v : 1 - Math.pow(-2 * v + 2, 3) / 2;
  function rng(s) { return () => { s |= 0; s = s + 0x6D2B79F5 | 0; let t = Math.imul(s ^ s >>> 15, 1 | s); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  // va-et-vient : 0 (état brut) tenu, montée, 1 (état révélé) tenu, retour
  const ping = t => { const u = (t % 8) / 8; return ease(u < .2 ? 0 : u < .45 ? (u - .2) / .25 : u < .8 ? 1 : 1 - (u - .8) / .2); };
  function setup(el) {
    const cs = getComputedStyle(el), V = (n, d) => cs.getPropertyValue('--viz-' + n).trim() || d;
    const INK = V('ink', INK0), MAU = V('mau', MAU0), TEA = V('tea', TEA0), SOLID = 'rgb(' + INK + ')';
    const cv = document.createElement('canvas'); el.append(cv); const x = cv.getContext('2d');
    const R = rng(el.dataset.mode === 'split' ? 5 : 3), g = () => Math.sqrt(-2 * Math.log(R() + 1e-9)) * Math.cos(6.2832 * R());
    const P = Array.from({ length: el.dataset.mode === 'split' ? 170 : 120 }, (_, i) => ({ a: g(), b: g(), arm: i % 2, resp: R() < .4, j: R() }));
    let W = 0, H = 0, raf = 0, t0 = performance.now(), vis = false;
    const fit = () => { const d = Math.min(devicePixelRatio || 1, 2); W = el.clientWidth; H = el.clientHeight; cv.width = W * d; cv.height = H * d; x.setTransform(d, 0, 0, d, 0, 0); draw(reduced ? 6 : (performance.now() - t0) / 1000); };
    function draw(t) {
      x.clearRect(0, 0, W, H); const k = reduced ? 1 : ping(t), m = Math.min(W, H);
      if (el.dataset.mode === 'precision') {
        const rows = [H * .3, H * .52], mean = [W * .42, W * .58], sp = W * .13 * (1 - .6 * k);
        P.forEach(p => { const X = mean[p.arm] + p.a * sp, Y = rows[p.arm] + p.b * m * .035; x.beginPath(); x.arc(X, Y, 3.2, 0, 6.283); x.fillStyle = p.arm ? `rgba(${INK},.8)` : `rgba(${MAU},.85)`; x.fill(); });
        // estimation de l'effet et son intervalle
        const y = H * .8, cx = W * .62, half = W * .26 * (1 - .62 * k), z = W * .3;
        x.strokeStyle = `rgba(${INK},.25)`; x.lineWidth = 1; x.beginPath(); x.moveTo(W * .1, y); x.lineTo(W * .9, y); x.stroke();
        x.setLineDash([3, 4]); x.beginPath(); x.moveTo(z, y - 18); x.lineTo(z, y + 18); x.stroke(); x.setLineDash([]);
        x.strokeStyle = SOLID; x.lineWidth = 3; x.lineCap = 'round'; x.beginPath(); x.moveTo(cx - half, y); x.lineTo(cx + half, y); x.stroke();
        [cx - half, cx + half].forEach(X => { x.lineWidth = 2; x.beginPath(); x.moveTo(X, y - 8); x.lineTo(X, y + 8); x.stroke(); });
        x.beginPath(); x.arc(cx, y, 6, 0, 6.283); x.fillStyle = SOLID; x.fill();
      } else if (el.dataset.mode === 'rank') {
        // chemins candidats : les barres s'allongent puis se trient ; le meilleur chemin passe en navy
        const V = [.55, .92, .38, .74, .62], n = V.length, bh = H * .085, gap = H * .06, top = (H - n * bh - (n - 1) * gap) / 2, x0 = W * .12, wmax = W * .76;
        const order = V.map((v, i) => i).sort((a, b) => V[b] - V[a]), rankOf = i => order.indexOf(i);
        V.forEach((v, i) => {
          const y = top + (i + (rankOf(i) - i) * k) * (bh + gap), w = wmax * v * (.35 + .65 * Math.min(1, k * 1.6 + .2)), best = rankOf(i) === 0;
          x.fillStyle = best ? `rgba(${INK},${.35 + .65 * k})` : `rgba(${MAU},.7)`;
          x.beginPath(); x.roundRect ? x.roundRect(x0, y, w, bh, bh / 2) : x.rect(x0, y, w, bh); x.fill();
          x.beginPath(); x.arc(x0 - bh * .9, y + bh / 2, bh * .22, 0, 6.283); x.fillStyle = `rgba(${INK},.25)`; x.fill();
        });
      } else if (el.dataset.mode === 'dist') {
        // distribution de la PoTS (exemple du document : 48 %, intervalle 90 % de 33 à 63 %) ; la courbe se trace puis l'intervalle se pose
        const x0 = W * .1, x1 = W * .9, base = H * .78, peak = H * .5, sx = p => x0 + (x1 - x0) * p, mu = .48, sd = .09;
        const f = p => Math.exp(-.5 * Math.pow((p - mu) / sd, 2));
        x.strokeStyle = `rgba(${INK},.25)`; x.lineWidth = 1; x.beginPath(); x.moveTo(x0, base); x.lineTo(x1, base); x.stroke();
        const end = .02 + .98 * Math.min(1, k * 1.4 + .15);
        x.beginPath(); x.moveTo(sx(.33), base); for (let p = .33; p <= Math.min(.63, end); p += .005) x.lineTo(sx(p), base - f(p) * peak); x.lineTo(sx(Math.min(.63, end)), base); x.closePath();
        x.fillStyle = `rgba(${MAU},${.35 * k})`; x.fill();
        x.beginPath(); for (let p = 0; p <= end; p += .005) { const X = sx(p), Y = base - f(p) * peak; p ? x.lineTo(X, Y) : x.moveTo(X, Y); }
        x.strokeStyle = SOLID; x.lineWidth = 2.5; x.stroke();
        if (end > mu) { x.setLineDash([4, 4]); x.strokeStyle = SOLID; x.lineWidth = 1.5; x.beginPath(); x.moveTo(sx(mu), base); x.lineTo(sx(mu), base - peak - 10); x.stroke(); x.setLineDash([]); }
      } else {
        const cx = W / 2, cy = H / 2;
        // moyenne d'ensemble : une ligne qui s'efface quand les groupes apparaissent
        x.strokeStyle = `rgba(${INK},${.35 * (1 - k) + .1})`; x.setLineDash([5, 5]); x.lineWidth = 1.5; x.beginPath(); x.moveTo(W * .12, cy); x.lineTo(W * .88, cy); x.stroke(); x.setLineDash([]);
        P.forEach(p => {
          const off = (p.resp ? -1 : 1) * H * .2 * k, X = cx + p.a * W * .15, Y = cy + p.b * H * .1 * (1 - .3 * k) + off;
          x.beginPath(); x.arc(X, Y, 3.4, 0, 6.283);
          x.fillStyle = p.resp ? `rgba(${k > .02 ? TEA : MAU},${.9})` : `rgba(${MAU},${.85 - .25 * k})`;
          if (p.resp && k > .02) { const c = MAU.split(',').map((v, i) => Math.round(+v + (+TEA.split(',')[i] - v) * k)); x.fillStyle = `rgba(${c},.95)`; }
          x.fill();
        });
      }
    }
    const frame = now => { raf = requestAnimationFrame(frame); draw((now - t0) / 1000); };
    new ResizeObserver(fit).observe(el);
    if (!reduced) new IntersectionObserver(([e]) => { vis = e.isIntersecting; if (vis && !raf) raf = requestAnimationFrame(frame); else if (!vis) { cancelAnimationFrame(raf); raf = 0; } }).observe(el);
  }
  document.querySelectorAll('.rp-viz').forEach(setup);
})();


(function () {
  const CSS = `
  [data-pv="faq"]{ display:grid; grid-template-columns:minmax(0,4fr) minmax(0,8fr); gap:2.5rem 3rem; align-items:start; }
  [data-pv="faq"] > .section-top{ position:sticky; top:8rem; }
  [data-faq-list]{ border-top:1px solid #14123826; }
  [data-faq-item]{ border-bottom:1px solid #14123826; }
  [data-faq-item] > h3{ margin:0; }
  .pv-faq-q{ all:unset; box-sizing:border-box; width:100%; display:flex; justify-content:space-between; align-items:center; gap:2rem;
    padding:1.5rem 0; cursor:pointer; font-size:1.25rem; font-weight:600; line-height:130%; color:#141238; }
  .pv-faq-q:focus-visible{ outline:2px solid #141238; outline-offset:4px; border-radius:4px; }
  .pv-faq-pm{ flex:none; position:relative; width:2.5rem; height:2.5rem; border-radius:999px; border:1px solid #14123833; transition:background .2s, border-color .2s, color .2s; }
  .pv-faq-pm::before, .pv-faq-pm::after{ content:''; position:absolute; left:50%; top:50%; width:.875rem; height:1.5px; background:currentColor; transform:translate(-50%,-50%); transition:transform .3s cubic-bezier(.2,.7,.2,1); }
  .pv-faq-pm::after{ transform:translate(-50%,-50%) rotate(90deg); }
  .pv-faq-q:hover .pv-faq-pm{ border-color:#141238; }
  [data-faq-item][data-open] .pv-faq-pm{ background:#141238; color:#f8f8f8; border-color:#141238; }
  [data-faq-item][data-open] .pv-faq-pm::after{ transform:translate(-50%,-50%) rotate(0); }
  .pv-faq-a{ display:grid; grid-template-rows:0fr; transition:grid-template-rows .35s cubic-bezier(.2,.7,.2,1); }
  [data-faq-item][data-open] .pv-faq-a{ grid-template-rows:1fr; }
  .pv-faq-a > div{ overflow:hidden; }
  .pv-faq-a > div > *{ margin:0; padding:0 4rem 1.75rem 0; font-size:1.0625rem; line-height:160%; color:#2b2a48; }
  @media (prefers-reduced-motion:reduce){ .pv-faq-a, .pv-faq-pm::before, .pv-faq-pm::after{ transition:none; } }
  @media (max-width:991px){ [data-pv="faq"]{ grid-template-columns:1fr; } [data-pv="faq"] > .section-top{ position:static; }
    .pv-faq-q{ font-size:1.0625rem; } .pv-faq-a > div > *{ padding-right:0; } }`;
  let n = 0;
  function initFaq(root) {
    if (root.dataset.pvInit) return;
    root.dataset.pvInit = '1';
    if (!document.getElementById('pv-faq-css')) { const st = document.createElement('style'); st.id = 'pv-faq-css'; st.textContent = CSS; document.head.appendChild(st); }
    root.querySelectorAll('[data-faq-item]').forEach(item => {
      const q = item.querySelector('h2,h3,h4,h5,h6'), a = q && q.nextElementSibling;
      if (!a) return;
      const id = 'pv-faq-' + (++n);
      const btn = document.createElement('button');
      btn.type = 'button'; btn.className = 'pv-faq-q';
      btn.setAttribute('aria-expanded', 'false'); btn.setAttribute('aria-controls', id);
      const label = document.createElement('span'); label.append(...q.childNodes);
      const pm = document.createElement('span'); pm.className = 'pv-faq-pm'; pm.setAttribute('aria-hidden', 'true');
      btn.append(label, pm); q.append(btn);
      const panel = document.createElement('div'), inner = document.createElement('div');
      panel.className = 'pv-faq-a'; panel.id = id; panel.setAttribute('role', 'region'); panel.inert = true;
      a.before(panel); inner.append(a); panel.append(inner);
      item._pvSet = open => { btn.setAttribute('aria-expanded', String(open)); item.toggleAttribute('data-open', open); panel.inert = !open; };
      btn.addEventListener('click', () => {
        const open = btn.getAttribute('aria-expanded') !== 'true';
        // une seule question ouverte à la fois
        if (open) root.querySelectorAll('[data-faq-item][data-open]').forEach(o => o._pvSet(false));
        item._pvSet(open);
      });
    });
  }
  document.querySelectorAll('[data-pv="faq"]').forEach(initFaq);
})();


  /* bascule de la mise en page du bloc 1 : A → B → C */
  (function () {
    const b = document.getElementById('b1Switch'), order = ['A', 'B', 'C'];
    if (!b) return;   // bascule retirée : C retenu
    b.addEventListener('click', () => {
      const root = document.querySelector('[data-pv="tabs"]'); if (!root) return;
      const v = order[(order.indexOf(root.dataset.v) + 1) % order.length];
      root.dataset.v = v; b.textContent = 'Bloc 1 : ' + v;
      window.dispatchEvent(new Event('resize'));
    });
  })();
  document.querySelectorAll('.pv-proto button[data-cls]').forEach(b => b.addEventListener('click', () => {
    const on = document.body.classList.toggle(b.dataset.cls);
    b.setAttribute('aria-pressed', String(on));
  }));
