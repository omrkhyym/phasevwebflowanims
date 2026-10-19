import { n as e, t } from "./rolldown-runtime-wf392T_D.mjs";
//#region src/portfolio-hero-bg.js
function n() {
	if (document.getElementById("pv-portfolio-hero-css")) return;
	let e = document.createElement("style");
	e.id = "pv-portfolio-hero-css", e.textContent = o, document.head.appendChild(e);
}
function r(e) {
	return () => {
		e |= 0, e = e + 1831565813 | 0;
		let t = Math.imul(e ^ e >>> 15, 1 | e);
		return t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t, ((t ^ t >>> 14) >>> 0) / 4294967296;
	};
}
function i(e) {
	if (!e || e.dataset.pvInit) return;
	let t = document.createElement("canvas");
	t.setAttribute("aria-hidden", "true");
	let i = t.getContext("2d");
	if (!i) return;
	e.dataset.pvInit = "1", n(), e.appendChild(t);
	let a = matchMedia("(prefers-reduced-motion: reduce)").matches, o = -1, c = [];
	function E(e) {
		let t = r(e);
		c = [];
		for (let e = 0; e < v; e++) {
			let n = .05 + t() * .28, r = .3 + t() * .4;
			c.push({
				lo: n * r,
				hi: n * (1 - r),
				w: n,
				r0: e,
				del: t() * .8,
				c: [
					p,
					m,
					h
				][e % 3]
			});
		}
		let n = [...c.keys()].sort(() => t() - .5);
		c.forEach((e, t) => e.r0 = n[t]), [...c].sort((e, t) => t.w - e.w).forEach((e, t) => {
			e.r1 = t, e.pick = t < 2;
		});
	}
	let D = 0, O = 0, k = !1;
	function A() {
		let n = e.getBoundingClientRect();
		if (!n.width || !n.height) return;
		let r = Math.min(devicePixelRatio || 1, 2);
		D = n.width, O = n.height, t.width = Math.round(D * r), t.height = Math.round(O * r), i.setTransform(r, 0, 0, r, 0, 0), k = D < 900, a && I(T);
	}
	let j = new ResizeObserver(A);
	j.observe(e);
	let M = e.parentElement || document.body, N = {
		x: 0,
		y: 0,
		tx: 0,
		ty: 0
	}, P = (t) => {
		let n = e.getBoundingClientRect();
		N.tx = (t.clientX - n.left) / n.width - .5, N.ty = (t.clientY - n.top) / n.height - .5;
	};
	M.addEventListener("pointermove", P, { passive: !0 });
	let F = (e) => k ? .55 : .22 + .78 * d(D * .22, D * .62, e);
	function I(e) {
		let t = a ? 0 : Math.floor(e / w), n = a ? e : e % w;
		t !== o && (o = t, E(71 + t * 5)), i.clearRect(0, 0, D, O), N.x += (N.tx - N.x) * .05, N.y += (N.ty - N.y) * .05;
		let r = a ? 0 : -N.x * 12, d = a ? 0 : -N.y * 8, p = Math.max(5, Math.min(D, O) * .0085), m = D * y + r, h = (e) => O * (.17 + e * .083) + d, v = (e) => D * e, T = 1 - u(l(n, C, 12)), k = u(l(n, S, 6.6)), A = Math.max(1.3, p * .25);
		for (let e = h(-.6); e < h(8.6); e += p) i.fillStyle = f(g, .22 * T), i.fillRect(m - .6, e, 1.2, 1.2);
		for (let e of c) {
			let t = u(l(n, b + e.del, b + e.del + 1.4)) * T, r = u(l(n, x + e.r1 * .08, x + e.r1 * .08 + 1.2)), a = h(e.r0 + (e.r1 - e.r0) * r), o = e.pick ? k : 0, c = e.pick ? 1 : 1 - .35 * k, d = v(e.lo) * t, g = v(e.hi) * t;
			for (let t = 0; t < 2; t++) {
				let n = a + (t - .5) * p;
				for (let t = m - d; t <= m + g; t += p) {
					let r = F(t);
					o < 1 && (i.fillStyle = f(e.c, .4 * r * c * (1 - o) * T), i.beginPath(), i.arc(t, n, A, 0, s), i.fill()), o > 0 && (i.fillStyle = f(_, .85 * r * o * T), i.beginPath(), i.arc(t, n, A, 0, s), i.fill());
				}
			}
		}
	}
	A();
	let L = 0, R = !1, z = !1, B = 0, V = 0;
	function H(e) {
		L = requestAnimationFrame(H);
		let t = Math.min((e - V) / 1e3, .05);
		V = e, B += t, I(B);
	}
	function U() {
		R || a || !z || document.hidden || (R = !0, V = performance.now(), L = requestAnimationFrame(H));
	}
	function W() {
		R && (R = !1, cancelAnimationFrame(L));
	}
	let G = new IntersectionObserver(([e]) => {
		z = e.isIntersecting, z ? U() : W();
	});
	G.observe(e);
	let K = () => {
		document.hidden ? W() : U();
	};
	return document.addEventListener("visibilitychange", K), function() {
		W(), G.disconnect(), j.disconnect(), document.removeEventListener("visibilitychange", K), M.removeEventListener("pointermove", P), t.remove(), delete e.dataset.pvInit;
	};
}
var a, o, s, c, l, u, d, f, p, m, h, g, _, v, y, b, x, S, C, w, T, E = e((() => {
	a = "[data-pv=\"portfolio-hero-bg\"]", o = `
:has(> ${a}){ position:relative; overflow:hidden; }
:has(> ${a}) > :not(${a}){ position:relative; z-index:1; }
${a}{ position:absolute; inset:0; z-index:0; pointer-events:none; }
${a} canvas{ position:absolute; inset:0; width:100%; height:100%; display:block; }`, s = Math.PI * 2, c = (e) => Math.max(0, Math.min(1, e)), l = (e, t, n) => c((e - t) / (n - t)), u = (e) => e < .5 ? 4 * e * e * e : 1 - (-2 * e + 2) ** 3 / 2, d = (e, t, n) => {
		let r = c((n - e) / (t - e));
		return r * r * (3 - 2 * r);
	}, f = (e, t) => `rgba(${e[0]},${e[1]},${e[2]},${Math.max(0, Math.min(1, t)).toFixed(3)})`, p = [
		146,
		138,
		205
	], m = [
		120,
		168,
		224
	], h = [
		127,
		232,
		207
	], g = [
		199,
		196,
		226
	], _ = [
		226,
		199,
		10
	], v = 9, y = .62, b = .6, x = 3.4, S = 5.6, C = 10.4, w = 12.6, T = 8.5;
})), D = /* @__PURE__ */ t((() => {
	E(), document.querySelectorAll("[data-pv=\"portfolio-hero-bg\"]").forEach((e) => i(e));
}));
//#endregion
export default D();
