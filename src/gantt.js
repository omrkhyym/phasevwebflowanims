/* Gantt "The problem" : le planning d'étude glisse, outil par outil.
   Monté dans <div data-pv="gantt"></div>. Eyebrow, titre et paragraphe restent dans Webflow. */

/* Valeurs retenues sur le prototype (ex-panneau de réglages) */
const CFG = {
  slip: 18,       // glissement total, en semaines
  lag: 1.15,      // latence entre deux outils, en secondes
  speed: 1,
  hold: 2.6,      // maintien de l'état final avant de reboucler
  ghost: .35,     // opacité du plan initial
  bar: 20,        // épaisseur des barres, en px
  red: true,      // rouge à faire valider par le client ; false = ocre
  showTools: true
};

const INK = '#141238', MUT = '#9c9bb0';
const ALERT = CFG.red ? '#c0392b' : '#8a7a10';
const WEEKS = 104;   // la largeur totale représente 104 semaines
const SQ = .70;      // part de la largeur occupée par le plan initial, pour laisser la place au glissement

/* Les quatre outils. L'ordre est celui dans lequel chacun finit par recalculer. */
const TOOLS = [
  { n: 'PROTOCOL', c: '#141238' },
  { n: 'CTMS',     c: '#3f3e69' },
  { n: 'EDC',      c: '#6d6c93' },
  { n: 'eTMF',     c: '#9e9db7' }
];
/* Le planning, en fraction de la largeur totale */
const TASKS = [
  { n: 'PROTOCOL FINAL',   a: .00, b: .13, tool: 0 },
  { n: 'SITE ACTIVATION',  a: .11, b: .33, tool: 1 },
  { n: 'FPI → LPI',        a: .30, b: .61, tool: 1 },
  { n: 'DATA CLEANING',    a: .57, b: .73, tool: 2 },
  { n: 'DATABASE LOCK',    a: .71, b: .78, tool: 2 },
  { n: 'CSR & SUBMISSION', a: .76, b: .95, tool: 3 }
];

const CYCLE = 2.5 + TOOLS.length * CFG.lag + CFG.hold;
const FINAL_T = 2.5 + TOOLS.length * CFG.lag;   // tout est recalculé, début du maintien

const cl = (v, a, b) => Math.max(a, Math.min(b, v));
const seg = (t, a, b) => cl((t - a) / (b - a), 0, 1);
const ease = v => v < .5 ? 4 * v * v * v : 1 - Math.pow(-2 * v + 2, 3) / 2;

export function initGantt(mount) {
  if (mount.dataset.pvReady) return;
  mount.dataset.pvReady = '1';

  const cv = document.createElement('canvas');
  cv.style.cssText = 'display:block;width:100%;';
  cv.setAttribute('role', 'img');
  cv.setAttribute('aria-label', 'Study timeline: one eligibility change pushes submission back by 18 weeks as each tool recalculates on its own schedule.');
  mount.appendChild(cv);
  const x = cv.getContext('2d');

  /* Typo : celle de l'eyebrow du même bloc, pour suivre le site si la police change.
     L'espacement est converti en ratio de la taille, puis réappliqué à nos petites tailles. */
  const section = mount.closest('section') || document.body;
  const label = section.querySelector('.text-size-label');
  const cs = label ? getComputedStyle(label) : null;
  const FAMILY = cs ? cs.fontFamily : 'Aspekta, Arial, sans-serif';
  const lsRatio = cs && cs.letterSpacing !== 'normal'
    ? (parseFloat(cs.letterSpacing) || 0) / (parseFloat(cs.fontSize) || 16) : 0;
  const hasLS = 'letterSpacing' in x;

  function setFont(w, size) {
    x.font = `${w} ${size}px ${FAMILY}`;
    if (hasLS) x.letterSpacing = (lsRatio * size).toFixed(2) + 'px';
  }
  function txt(s, px, py, w, size, c, a = 1, al = 'left') {
    setFont(w, size);
    x.textAlign = al; x.globalAlpha = a; x.fillStyle = c;
    x.fillText(s, px, py);
    x.globalAlpha = 1; x.textAlign = 'left';
  }

  /* Hauteur = hauteur réelle du dessin, pour que le bas du canvas
     s'aligne sur le bas du paragraphe dans la grille Webflow */
  cv.style.height = Math.round(52 + 6 + CFG.bar * 1.55 * TASKS.length + 10 + 38 + 14) + 'px';

  let dpr = 1, ready = false, t = 0;
  function fit() {
    dpr = Math.min(devicePixelRatio || 1, 2);
    cv.width = Math.round(cv.clientWidth * dpr);
    cv.height = Math.round(cv.clientHeight * dpr);
    x.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (ready) draw(reduced ? FINAL_T : t);
  }

  function draw(tt) {
    const W = cv.clientWidth, H = cv.clientHeight;
    x.clearRect(0, 0, W, H);

    const padL = Math.min(196, W * .30), padR = 30, top = 52;
    const w = W - padL - padR, BH = CFG.bar;
    const rowH = BH * 1.55, gridH = rowH * TASKS.length, gridTop = top + 6;
    const push = CFG.slip / WEEKS, sx = v => padL + (v * SQ) * w;

    // en-tête
    txt('STUDY TIMELINE', 0, 42, 500, 9, MUT);
    txt('WEEK 0', padL, 42, 400, 9, '#c3c2b8');
    txt('WEEK ' + WEEKS, padL + w, 42, 400, 9, '#c3c2b8', 1, 'right');
    x.strokeStyle = '#e4e3d9'; x.lineWidth = 1;
    x.beginPath(); x.moveTo(padL, 48.5); x.lineTo(padL + w, 48.5); x.stroke();

    // l'événement déclencheur : la première tâche s'allonge
    const trig = ease(seg(tt, .7, 1.7));

    let anyPending = false;
    TASKS.forEach((tk, i) => {
      const y = gridTop + i * rowH + rowH / 2;
      // chaque outil recalcule à son propre moment, c'est tout le sujet
      const lag = tk.tool * CFG.lag;
      const k = i === 0 ? trig : ease(seg(tt, 1.5 + lag, 2.5 + lag));
      if (i > 0 && k < 1 && trig >= 1) anyPending = true;

      const a = tk.a * SQ + (i === 0 ? 0 : push * k);
      const b = tk.b * SQ + push * (i === 0 ? trig : k);

      txt(tk.n, 0, y + 4, (k >= 1 || i === 0) ? 500 : 400, 11, k > 0 ? INK : '#b9b8ae');

      // plan initial, en creux
      x.globalAlpha = CFG.ghost; x.fillStyle = '#dcdbcf';
      x.fillRect(sx(tk.a), y - BH / 2, (tk.b - tk.a) * SQ * w, BH);
      x.globalAlpha = 1;

      // position courante
      x.fillStyle = TOOLS[tk.tool].c;
      x.fillRect(padL + a * w, y - BH / 2, (b - a) * w, BH);

      // la part du glissement que cet outil n'a pas encore répercutée
      if (i > 0 && trig >= 1 && k < 1) {
        const gx0 = padL + (tk.a * SQ + push) * w, gx1 = padL + a * w;
        x.save(); x.setLineDash([2, 3]);
        x.strokeStyle = ALERT; x.globalAlpha = .75; x.lineWidth = 1;
        x.strokeRect(gx1 + .5, y - BH / 2 + .5, gx0 - gx1, BH - 1);
        x.restore(); x.globalAlpha = 1;
        txt('stale', padL + a * w + 4, y + 3, 400, 9, ALERT, .8);
      }

      if (CFG.showTools) txt(TOOLS[tk.tool].n, padL + b * w + 9, y + 4, 400, 9, '#c3c2b8');
    });

    // jalon de soumission : date d'origine, puis date réelle
    const lastT = TASKS[TASKS.length - 1];
    const lastK = ease(seg(tt, 1.5 + lastT.tool * CFG.lag, 2.5 + lastT.tool * CFG.lag));
    const x0 = sx(lastT.b), x1 = padL + (lastT.b * SQ + push * lastK) * w;
    const vTop = 48, vBot = gridTop + gridH + 10;

    x.save(); x.setLineDash([3, 4]); x.strokeStyle = MUT; x.globalAlpha = .7; x.lineWidth = 1;
    x.beginPath(); x.moveTo(x0, vTop); x.lineTo(x0, vBot); x.stroke(); x.restore(); x.globalAlpha = 1;
    txt('PLANNED', x0 - 6, vBot + 16, 400, 9, MUT, .8, 'right');

    if (lastK > .03) {
      x.strokeStyle = ALERT; x.lineWidth = 2;
      x.beginPath(); x.moveTo(x1, vTop); x.lineTo(x1, vBot); x.stroke();
      // hachure entre les deux dates
      x.save(); x.beginPath(); x.rect(x0, vTop, x1 - x0, vBot - vTop); x.clip();
      x.strokeStyle = ALERT; x.globalAlpha = .16; x.lineWidth = 1;
      for (let px = x0 - 40; px < x1 + 60; px += 6) { x.beginPath(); x.moveTo(px, vTop); x.lineTo(px - 60, vBot); x.stroke(); }
      x.restore(); x.globalAlpha = 1;
      const lbl = 'SUBMISSION  +' + Math.round(CFG.slip * lastK) + ' WEEKS';
      setFont(700, 11);
      const lw = x.measureText(lbl).width;
      if (x1 + 10 + lw < padL + w) txt(lbl, x1 + 10, vBot + 16, 700, 11, ALERT, lastK);
      else txt(lbl, x1 - 10, vBot + 16, 700, 11, ALERT, lastK, 'right');
    }

    // légende d'état, en bas
    const state = trig < 1 ? 'one eligibility criterion changes'
      : anyPending ? 'three tools have not recalculated yet'
      : 'every downstream date has moved';
    txt(state, 0, vBot + 38, 400, 11, trig < 1 ? MUT : (anyPending ? ALERT : INK));
  }

  /* ---------- boucle : tourne seulement quand le bloc est à l'écran ---------- */
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let raf = 0, last = 0;
  function frame(now) {
    raf = requestAnimationFrame(frame);
    const dt = Math.min((now - last) / 1000, .05); last = now;
    t += dt * CFG.speed;
    if (t > CYCLE) t = 0;
    draw(t);
  }
  function start() {
    if (raf || reduced) return;
    t = 0;   // on rejoue depuis le début à chaque entrée : l'histoire commence par le déclencheur
    last = performance.now();
    raf = requestAnimationFrame(frame);
  }
  function stop() { cancelAnimationFrame(raf); raf = 0; }

  new ResizeObserver(fit).observe(cv);

  /* On attend la police avant le premier dessin, sinon il part en Arial.
     Plafond à 3 s pour ne jamais bloquer l'animation. */
  const fontReady = document.fonts
    ? Promise.race([document.fonts.load(`500 11px ${FAMILY}`), new Promise(r => setTimeout(r, 3000))])
    : Promise.resolve();

  fontReady.then(() => {
    ready = true;
    fit();
    if (reduced) { draw(FINAL_T); return; }
    new IntersectionObserver(([e]) => e.isIntersecting ? start() : stop(), { threshold: .25 }).observe(mount);
  });
}