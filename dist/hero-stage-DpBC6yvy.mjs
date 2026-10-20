import { n as e } from "./rolldown-runtime-wf392T_D.mjs";
//#region src/hero-stage.js
function t(e) {
	return () => {
		e |= 0, e = e + 1831565813 | 0;
		let t = Math.imul(e ^ e >>> 15, 1 | e);
		return t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t, ((t ^ t >>> 14) >>> 0) / 4294967296;
	};
}
function n(e) {
	let t = `pv-${e}-hero-css`;
	if (document.getElementById(t)) return;
	let n = `[data-pv="${e}-hero-bg"]`, r = `[data-pv="${e}-hero-slot"]`, i = document.createElement("style");
	i.id = t, i.textContent = `
:has(> ${n}){ position:relative; overflow:hidden; }
:has(> ${n}) > :not(${n}){ position:relative; z-index:1; }
${n}{ position:absolute; inset:0; z-index:0; pointer-events:none; }
${n} canvas, ${r} canvas{ position:absolute; inset:0; width:100%; height:100%; display:block; }
${r}{ display:none; }
@media (max-width:991px){
  :has(> ${n}):has(${r}) > ${n}{ display:none; }
  ${r}{ display:block; position:relative; width:100%; aspect-ratio:4/3; pointer-events:none; }
}`, document.head.appendChild(i);
}
function r(e, { name: t, draw: r, still: i = 0, onResize: a }) {
	if (!e || e.dataset.pvInit) return;
	let o = document.createElement("canvas");
	o.setAttribute("aria-hidden", "true");
	let s = o.getContext("2d");
	if (!s) return;
	e.dataset.pvInit = "1", n(t);
	let l = e.parentElement || document.body, u = l.querySelector(`[data-pv="${t}-hero-slot"]`), d = matchMedia("(prefers-reduced-motion: reduce)").matches, f = matchMedia("(max-width: 991px)"), p = {
		x: 0,
		y: 0
	}, m = {
		ctx: s,
		W: 0,
		H: 0,
		flow: !1,
		mobile: !1,
		reduce: d,
		mouse: {
			x: 0,
			y: 0
		},
		fade(e) {
			return this.flow ? 1 : this.mobile ? .55 : .22 + .78 * c(this.W * .22, this.W * .62, e);
		}
	}, h = null;
	function g(e) {
		let t = m.flow || d ? 0 : .05;
		m.mouse.x += ((m.flow || d ? 0 : p.x) - m.mouse.x) * (t || 1), m.mouse.y += ((m.flow || d ? 0 : p.y) - m.mouse.y) * (t || 1), r(m, e);
	}
	function _() {
		if (!h) return;
		let e = h.getBoundingClientRect();
		if (!e.width || !e.height) return;
		let t = Math.min(devicePixelRatio || 1, 2);
		m.W = e.width, m.H = e.height, o.width = Math.round(m.W * t), o.height = Math.round(m.H * t), s.setTransform(t, 0, 0, t, 0, 0), m.mobile = m.W < 900, a && a(m), d && g(i);
	}
	let v = (e) => {
		let t = o.getBoundingClientRect();
		t.width && (p.x = (e.clientX - t.left) / t.width - .5, p.y = (e.clientY - t.top) / t.height - .5);
	};
	l.addEventListener("pointermove", v, { passive: !0 });
	let y = 0, b = !1, x = !1, S = 0, C = 0;
	function w(e) {
		y = requestAnimationFrame(w);
		let t = Math.min((e - C) / 1e3, .05);
		C = e, S += t, g(S);
	}
	function T() {
		b || d || !x || document.hidden || (b = !0, C = performance.now(), y = requestAnimationFrame(w));
	}
	function E() {
		b && (b = !1, cancelAnimationFrame(y));
	}
	let D = new ResizeObserver(_), O = new IntersectionObserver(([e]) => {
		x = e.isIntersecting, x ? T() : E();
	});
	function k() {
		let t = f.matches && u ? u : e;
		t !== h && (h = t, m.flow = h === u, h.appendChild(o), D.disconnect(), D.observe(h), O.disconnect(), O.observe(h), _());
	}
	let A = () => k();
	f.addEventListener ? f.addEventListener("change", A) : f.addListener(A);
	let j = () => {
		document.hidden ? E() : T();
	};
	return document.addEventListener("visibilitychange", j), k(), function() {
		E(), O.disconnect(), D.disconnect(), f.removeEventListener ? f.removeEventListener("change", A) : f.removeListener(A), document.removeEventListener("visibilitychange", j), l.removeEventListener("pointermove", v), o.remove(), delete e.dataset.pvInit;
	};
}
var i, a, o, s, c, l, u = e((() => {
	i = Math.PI * 2, a = (e) => Math.max(0, Math.min(1, e)), o = (e, t, n) => a((e - t) / (n - t)), s = (e) => e < .5 ? 4 * e * e * e : 1 - (-2 * e + 2) ** 3 / 2, c = (e, t, n) => {
		let r = a((n - e) / (t - e));
		return r * r * (3 - 2 * r);
	}, l = (e, t) => `rgba(${e[0]},${e[1]},${e[2]},${Math.max(0, Math.min(1, t)).toFixed(3)})`;
}));
//#endregion
export { r as a, o as c, u as i, c as l, a as n, l as o, s as r, t as s, i as t };
