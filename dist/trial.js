import { n as e, t } from "./rolldown-runtime-wf392T_D.mjs";
//#region src/trial-hero-bg.js
function n() {
	if (document.getElementById("pv-trial-hero-css")) return;
	let e = document.createElement("style");
	e.id = "pv-trial-hero-css", e.textContent = a, document.head.appendChild(e);
}
function r(e) {
	if (!e || e.dataset.pvInit) return;
	let t = document.createElement("canvas");
	t.setAttribute("aria-hidden", "true");
	let r = t.getContext("2d");
	if (!r) return;
	e.dataset.pvInit = "1", n(), e.appendChild(t);
	let i = matchMedia("(prefers-reduced-motion: reduce)").matches, a = 0, s = 0, f = !1;
	function p() {
		let n = e.getBoundingClientRect();
		if (!n.width || !n.height) return;
		let o = Math.min(devicePixelRatio || 1, 2);
		a = n.width, s = n.height, t.width = Math.round(a * o), t.height = Math.round(s * o), r.setTransform(o, 0, 0, o, 0, 0), f = a < 900, i && j(E);
	}
	let m = new ResizeObserver(p);
	m.observe(e);
	let D = e.parentElement || document.body, O = {
		x: 0,
		y: 0,
		tx: 0,
		ty: 0
	}, k = (t) => {
		let n = e.getBoundingClientRect();
		O.tx = (t.clientX - n.left) / n.width - .5, O.ty = (t.clientY - n.top) / n.height - .5;
	};
	D.addEventListener("pointermove", k, { passive: !0 });
	let A = (e) => f ? .55 : .22 + .78 * u(a * .22, a * .62, e);
	function j(e) {
		let t = i ? e : e % T;
		r.clearRect(0, 0, a, s), O.x += (O.tx - O.x) * .05, O.y += (O.ty - O.y) * .05;
		let n = i ? 0 : -O.x * 12, u = i ? 0 : -O.y * 8, f = (e) => a * (.04 + .92 * e) + n, p = (e) => s * (.86 - .66 * e) + u, m = 1 - l(c(t, w, 12.8)), E = c(t, S, 6.800000000000001), D = l(E), k = t > S && t < 7.4 ? 1 - c(t, 6.800000000000001, 7.4) : 0, j = l(c(t, C, 8.4)), M = Math.max(1.3, Math.min(a, s) * .0019);
		if (k > 0) {
			let e = f(D);
			r.save(), r.setLineDash([3, 5]), r.strokeStyle = d(h, .35 * k * A(e)), r.lineWidth = 1, r.beginPath(), r.moveTo(e, p(1.08)), r.lineTo(e, p(-.04)), r.stroke(), r.restore();
		}
		_.forEach((e, n) => {
			let i = n === v;
			for (let n = 0; n < y; n++) {
				let a = n / 239, s = f(a), u = p(b(e, a)), h = A(s), _ = l(c(t, x + a * 1.2, x + a * 1.2 + .5)) * m;
				if (_ <= 0) continue;
				let v = k * Math.exp(-(((a - D) / .045) ** 2)), y = i ? l(c(t, C + a * .9, C + a * .9 + .4)) : 0, S = i ? 1 : 1 - .55 * j, w = _ * h * (.28 + .6 * v) * S * (1 - y);
				w > .003 && (r.fillStyle = d(e.c, w), r.beginPath(), r.arc(s, u, M * (1 + .5 * v), 0, o), r.fill()), y > 0 && (r.fillStyle = d(g, _ * h * .85 * y), r.beginPath(), r.arc(s, u, M * 1.1, 0, o), r.fill());
			}
			if (k > 0) {
				let t = f(D), n = p(b(e, D));
				r.strokeStyle = d(e.c, .7 * k * A(t)), r.lineWidth = 1, r.beginPath(), r.arc(t, n, 5, 0, o), r.stroke();
			}
		});
	}
	p();
	let M = 0, N = !1, P = !1, F = 0, I = 0;
	function L(e) {
		M = requestAnimationFrame(L);
		let t = Math.min((e - I) / 1e3, .05);
		I = e, F += t, j(F);
	}
	function R() {
		N || i || !P || document.hidden || (N = !0, I = performance.now(), M = requestAnimationFrame(L));
	}
	function z() {
		N && (N = !1, cancelAnimationFrame(M));
	}
	let B = new IntersectionObserver(([e]) => {
		P = e.isIntersecting, P ? R() : z();
	});
	B.observe(e);
	let V = () => {
		document.hidden ? z() : R();
	};
	return document.addEventListener("visibilitychange", V), function() {
		z(), B.disconnect(), m.disconnect(), document.removeEventListener("visibilitychange", V), D.removeEventListener("pointermove", k), t.remove(), delete e.dataset.pvInit;
	};
}
var i, a, o, s, c, l, u, d, f, p, m, h, g, _, v, y, b, x, S, C, w, T, E, D = e((() => {
	i = "[data-pv=\"trial-hero-bg\"]", a = `
:has(> ${i}){ position:relative; overflow:hidden; }
:has(> ${i}) > :not(${i}){ position:relative; z-index:1; }
${i}{ position:absolute; inset:0; z-index:0; pointer-events:none; }
${i} canvas{ position:absolute; inset:0; width:100%; height:100%; display:block; }`, o = Math.PI * 2, s = (e) => Math.max(0, Math.min(1, e)), c = (e, t, n) => s((e - t) / (n - t)), l = (e) => e < .5 ? 4 * e * e * e : 1 - (-2 * e + 2) ** 3 / 2, u = (e, t, n) => {
		let r = s((n - e) / (t - e));
		return r * r * (3 - 2 * r);
	}, d = (e, t) => `rgba(${e[0]},${e[1]},${e[2]},${Math.max(0, Math.min(1, t)).toFixed(3)})`, f = [
		146,
		138,
		205
	], p = [
		120,
		168,
		224
	], m = [
		127,
		232,
		207
	], h = [
		199,
		196,
		226
	], g = [
		226,
		199,
		10
	], _ = [
		{
			m: .5,
			s: .075,
			top: 1,
			c: f
		},
		{
			m: .4,
			s: .11,
			top: .97,
			c: p
		},
		{
			m: .33,
			s: .06,
			top: .82,
			c: m
		},
		{
			m: .6,
			s: .05,
			top: 1,
			c: h
		}
	], v = 1, y = 240, b = (e, t) => e.top / (1 + Math.exp(-(t - e.m) / e.s)), x = 0, S = 1.6, C = 7.2, w = 11.4, T = 13, E = 9;
})), O = /* @__PURE__ */ t((() => {
	D(), document.querySelectorAll("[data-pv=\"trial-hero-bg\"]").forEach((e) => r(e));
}));
//#endregion
export default O();
