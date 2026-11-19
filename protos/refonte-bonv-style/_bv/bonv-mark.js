/* <bonv-mark> : the BonV V (logo polygon on a yellow disc) with its ring of yellow dots.
   The ring is BonV's "voice" in the film (bonv-style section 19): about 58 round dots whatever the size,
   slowly rotating, slightly brighter top left. Three states:
     state="listen"  rotation only (default)
     state="think"   a wave travels around the ring (BonV is typing "...")
     state="speak"   the dots pulse like a voice while BonV answers
     state="intense" two faster, stronger waves (climax moments only)
   Attributes: size (px, default 120), ring ("off" to hide it, e.g. inside a BonV space ring).
   Usage: <script src="bonv-mark.js"></script>  <bonv-mark size="160" state="listen"></bonv-mark> */
(function () {
  'use strict';
  const YEL = '#E2C70A', WHITE = '#F4F4F4';
  const VPTS = [[0.2749,-0.4797],[-0.0004,0.1548],[-0.2181,-0.3639],[-0.2710,-0.4797],[-0.5574,-0.4797],[-0.0170,0.6489],[0.0186,0.6489],[0.5574,-0.4797]];
  const STATES = { listen: { th: 0, sp: 0, hard: 0 }, think: { th: 1, sp: 0, hard: 0 }, speak: { th: 0, sp: 1, hard: 0 }, intense: { th: 1, sp: 0, hard: 1 } };
  class BonVMark extends HTMLElement {
    static get observedAttributes() { return ['size', 'state', 'ring']; }
    constructor() {
      super();
      this.attachShadow({ mode: 'open' }).innerHTML = '<style>:host{display:inline-block;line-height:0}canvas{display:block}</style><canvas role="img" aria-label="BonV"></canvas>';
      this.cv = this.shadowRoot.querySelector('canvas'); this.ctx = this.cv.getContext('2d');
      this.st = { ...STATES.listen }; this.target = STATES.listen; this.t0 = performance.now();
      this.reduce = matchMedia('(prefers-reduced-motion: reduce)');
    }
    connectedCallback() { this.resize(); this.loop = this.loop.bind(this); this.raf = requestAnimationFrame(this.loop); }
    disconnectedCallback() { cancelAnimationFrame(this.raf); }
    attributeChangedCallback(n) { if (n === 'size') this.resize(); if (n === 'state') this.target = STATES[this.getAttribute('state')] || STATES.listen; }
    resize() {
      const s = +this.getAttribute('size') || 120, box = Math.round(s * 1.9), dpr = Math.min(2, devicePixelRatio || 1);
      this.box = box; this.cv.width = this.cv.height = box * dpr; this.cv.style.width = this.cv.style.height = box + 'px';
      this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0); this.style.margin = `${-(box - s) / 2}px`;   // the element's layout box stays = size
    }
    loop(now) {
      this.raf = requestAnimationFrame(this.loop);
      const T = this.reduce.matches ? 0 : (now - this.t0) / 1000, k = .06;   // ease toward the target state
      for (const key in this.st) this.st[key] += (this.target[key] - this.st[key]) * k;
      this.draw(T);
    }
    draw(T) {
      const c = this.ctx, B = this.box, x = B / 2, y = B / 2, r = (+this.getAttribute('size') || 120) / 2;
      c.clearRect(0, 0, B, B);
      if (this.getAttribute('ring') !== 'off') {
        const { th, sp, hard } = this.st, rr = r * 1.47, rot = T * .22;
        const n = Math.max(24, Math.round(Math.PI * 2 * rr / Math.max(9, r * .16))), dr = Math.max(1.1, r * .028);
        const head = T * (3.6 + (6.2 - 3.6) * hard), voice = .55 + .45 * Math.sin(T * 13) * Math.sin(T * 7.3 + 1);
        c.fillStyle = YEL;
        for (let i = 0; i < n; i++) {
          const a = rot + i / n * Math.PI * 2;
          const d = ((a - head) % (Math.PI * 2) + Math.PI * 3) % (Math.PI * 2) - Math.PI, d2 = ((a - head - Math.PI) % (Math.PI * 2) + Math.PI * 3) % (Math.PI * 2) - Math.PI;
          const bump = (Math.exp(-((d / .42) ** 2)) + hard * Math.exp(-((d2 / .42) ** 2))) * th * (1 + .5 * hard);
          const amp = .5 + .5 * Math.sin(a * 3 + T * 9) * Math.sin(a * 5 - T * 7 + 1.3), vo = sp * voice * amp;
          const R = rr + r * (.06 * bump + .18 * vo), s = dr * (1 + 1.2 * bump + 1.3 * vo), light = .72 + .28 * Math.cos(a + Math.PI * .75);
          c.globalAlpha = Math.min(1, (.8 + .2 * bump + .2 * vo) * light);
          c.beginPath(); c.arc(x + Math.cos(a) * R, y + Math.sin(a) * R, s, 0, Math.PI * 2); c.fill();
        }
        c.globalAlpha = 1;
      }
      c.fillStyle = YEL; c.beginPath(); c.arc(x, y, r, 0, Math.PI * 2); c.fill();
      c.fillStyle = WHITE; c.beginPath(); VPTS.forEach(([px, py], i) => { const X = x + px * r, Y = y + py * r; i ? c.lineTo(X, Y) : c.moveTo(X, Y); }); c.closePath(); c.fill();
    }
  }
  if (!customElements.get('bonv-mark')) customElements.define('bonv-mark', BonVMark);
})();
