import { n as e, t } from "./rolldown-runtime-wf392T_D.mjs";
//#region src/response-hero-bg.js
function n() {
	if (document.getElementById("pv-response-hero-css")) return;
	let e = document.createElement("style");
	e.id = "pv-response-hero-css", e.textContent = o, document.head.appendChild(e);
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
	let a = matchMedia("(prefers-reduced-motion: reduce)").matches, o = r(5), c = () => Math.sqrt(-2 * Math.log(o() + 1e-9)) * Math.cos(s * o()), S = (e) => .14 + .48 * e, C = (e) => .26 * d(.5, .88, e), w = [];
	for (let e = 0; e < v; e++) {
		let t = o(), n = e & 1, r = c() * .035;
		w.push({
			u: t,
			arm: n,
			ph: o() * s,
			x0: o(),
			y0: .48 + c() * .15,
			y1: S(t) + r,
			y2: S(t) + r + n * C(t),
			win: n === 1 && C(t) > .09
		});
	}
	let T = 0, E = 0, D = !1;
	function O() {
		let n = e.getBoundingClientRect();
		if (!n.width || !n.height) return;
		let r = Math.min(devicePixelRatio || 1, 2);
		T = n.width, E = n.height, t.width = Math.round(T * r), t.height = Math.round(E * r), i.setTransform(r, 0, 0, r, 0, 0), D = T < 900, a && P(9);
	}
	let k = new ResizeObserver(O);
	k.observe(e);
	let A = e.parentElement || document.body, j = {
		x: 0,
		y: 0,
		tx: 0,
		ty: 0
	}, M = (t) => {
		let n = e.getBoundingClientRect();
		j.tx = (t.clientX - n.left) / n.width - .5, j.ty = (t.clientY - n.top) / n.height - .5;
	};
	A.addEventListener("pointermove", M, { passive: !0 });
	let N = (e) => D ? .55 : .22 + .78 * d(T * .22, T * .62, e);
	function P(e) {
		i.clearRect(0, 0, T, E), j.x += (j.tx - j.x) * .05, j.y += (j.ty - j.y) * .05;
		let t = a ? 0 : -j.x * 12, n = a ? 0 : -j.y * 8, r = (e) => T * (.04 + .92 * e) + t, o = (e) => E * (.92 - .78 * e) + n, c = u(l(e, g, 13)), d = u(l(e, h, 6.9)) * (1 - c), _ = u(l(e, f, 1.2)), v = Math.max(1.3, Math.min(T, E) * .0019);
		for (let t of w) {
			let n = u(l(e, p + t.u * 1.4, p + t.u * 1.4 + 1.4)) * (1 - c), a = u(l(e, m + t.u * .6, m + t.u * .6 + 1.1)) * (1 - c), f = (1 - n) * .012 + .003, h = t.x0 + (t.u - t.x0) * n + f * Math.sin(e * .9 + t.ph), g = t.y0 + (t.y1 - t.y0) * n + (t.y2 - t.y1) * a + f * Math.cos(e * .8 + t.ph * 1.3), S = r(h), C = o(g), w = N(S), T = t.arm ? b : y, E = _ * w * (.34 + .12 * n);
			i.fillStyle = `rgba(${T[0]},${T[1]},${T[2]},${E.toFixed(3)})`, i.beginPath(), i.arc(S, C, v, 0, s), i.fill(), t.win && d > 0 && (i.fillStyle = `rgba(${x[0]},${x[1]},${x[2]},${(d * w * .9).toFixed(3)})`, i.beginPath(), i.arc(S, C, v * 1.15, 0, s), i.fill());
		}
	}
	O();
	let F = 0, I = !1, L = !1, R = 0, z = 0;
	function B(e) {
		F = requestAnimationFrame(B);
		let t = Math.min((e - z) / 1e3, .05);
		z = e, R = (R + t) % _, P(R);
	}
	function V() {
		I || a || !L || document.hidden || (I = !0, z = performance.now(), F = requestAnimationFrame(B));
	}
	function H() {
		I && (I = !1, cancelAnimationFrame(F));
	}
	let U = new IntersectionObserver(([e]) => {
		L = e.isIntersecting, L ? V() : H();
	});
	U.observe(e);
	let W = () => {
		document.hidden ? H() : V();
	};
	return document.addEventListener("visibilitychange", W), function() {
		H(), U.disconnect(), k.disconnect(), document.removeEventListener("visibilitychange", W), A.removeEventListener("pointermove", M), t.remove(), delete e.dataset.pvInit;
	};
}
var a, o, s, c, l, u, d, f, p, m, h, g, _, v, y, b, x, S = e((() => {
	a = "[data-pv=\"response-hero-bg\"]", o = `
:has(> ${a}){ position:relative; overflow:hidden; }
:has(> ${a}) > :not(${a}){ position:relative; z-index:1; }
${a}{ position:absolute; inset:0; z-index:0; pointer-events:none; }
${a} canvas{ position:absolute; inset:0; width:100%; height:100%; display:block; }`, s = Math.PI * 2, c = (e) => Math.max(0, Math.min(1, e)), l = (e, t, n) => c((e - t) / (n - t)), u = (e) => e < .5 ? 4 * e * e * e : 1 - (-2 * e + 2) ** 3 / 2, d = (e, t, n) => {
		let r = c((n - e) / (t - e));
		return r * r * (3 - 2 * r);
	}, f = 0, p = 1.6, m = 4.6, h = 6, g = 11, _ = 13.4, v = 1400, y = [
		146,
		138,
		205
	], b = [
		120,
		168,
		224
	], x = [
		226,
		199,
		10
	];
})), C = /* @__PURE__ */ t((() => {
	S(), document.querySelectorAll("[data-pv=\"response-hero-bg\"]").forEach((e) => i(e));
}));
//#endregion
export default C();
