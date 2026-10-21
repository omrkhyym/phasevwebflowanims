import { n as e, t } from "./rolldown-runtime-wf392T_D.mjs";
import { a as n, c as r, i, o as a, r as o, t as s } from "./hero-stage-DpBC6yvy.mjs";
//#region src/trial-hero-bg.js
function c(e) {
	if (!e || e.dataset.pvInit) return;
	function t(e, t) {
		let { ctx: n, W: i, H: c, mouse: l, reduce: u } = e, d = u ? t : t % S, C = (t) => e.fade(t);
		n.clearRect(0, 0, i, c);
		let w = -l.x * 12, T = -l.y * 8, E = (e) => i * (.04 + .92 * e) + w, D = (e) => c * (.86 - .66 * e) + T, O = 1 - o(r(d, x, 12.8)), k = r(d, y, 6.800000000000001), A = o(k), j = d > y && d < 7.4 ? 1 - r(d, 6.800000000000001, 7.4) : 0, M = o(r(d, b, 8.4)), N = Math.max(1.3, Math.min(i, c) * .0019);
		if (j > 0) {
			let e = E(A);
			n.save(), n.setLineDash([3, 5]), n.strokeStyle = a(f, .35 * j * C(e)), n.lineWidth = 1, n.beginPath(), n.moveTo(e, D(1.08)), n.lineTo(e, D(-.04)), n.stroke(), n.restore();
		}
		m.forEach((e, t) => {
			let i = t === h;
			for (let t = 0; t < g; t++) {
				let c = t / 239, l = E(c), u = D(_(e, c)), f = C(l), m = o(r(d, v + c * 1.2, v + c * 1.2 + .5)) * O;
				if (m <= 0) continue;
				let h = j * Math.exp(-(((c - A) / .045) ** 2)), g = i ? o(r(d, b + c * .9, b + c * .9 + .4)) : 0, y = i ? 1 : 1 - .55 * M, x = m * f * (.28 + .6 * h) * y * (1 - g);
				x > .003 && (n.fillStyle = a(e.c, x), n.beginPath(), n.arc(l, u, N * (1 + .5 * h), 0, s), n.fill()), g > 0 && (n.fillStyle = a(p, m * f * .85 * g), n.beginPath(), n.arc(l, u, N * 1.1, 0, s), n.fill());
			}
			if (j > 0) {
				let t = E(A), r = D(_(e, A));
				n.strokeStyle = a(e.c, .7 * j * C(t)), n.lineWidth = 1, n.beginPath(), n.arc(t, r, 5, 0, s), n.stroke();
			}
		});
	}
	return n(e, {
		name: "trial",
		draw: t,
		still: C
	});
}
var l, u, d, f, p, m, h, g, _, v, y, b, x, S, C, w = e((() => {
	i(), l = [
		146,
		138,
		205
	], u = [
		120,
		168,
		224
	], d = [
		127,
		232,
		207
	], f = [
		199,
		196,
		226
	], p = [
		226,
		199,
		10
	], m = [
		{
			m: .5,
			s: .075,
			top: 1,
			c: l
		},
		{
			m: .4,
			s: .11,
			top: .97,
			c: u
		},
		{
			m: .33,
			s: .06,
			top: .82,
			c: d
		},
		{
			m: .6,
			s: .05,
			top: 1,
			c: f
		}
	], h = 1, g = 240, _ = (e, t) => e.top / (1 + Math.exp(-(t - e.m) / e.s)), v = 0, y = 1.6, b = 7.2, x = 11.4, S = 13, C = 9;
}));
//#endregion
//#region src/success-design-space.js
function T(e) {
	return () => {
		e |= 0, e = e + 1831565813 | 0;
		let t = Math.imul(e ^ e >>> 15, 1 | e);
		return t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t, ((t ^ t >>> 14) >>> 0) / 4294967296;
	};
}
function E(e) {
	for (let t = e.closest("section") || e.parentElement; t; t = t.parentElement) {
		let e = getComputedStyle(t).backgroundColor, n = e.match(/rgba?\(([^)]+)\)/);
		if (n && (n[1].split(",")[3] === void 0 || parseFloat(n[1].split(",")[3]) > 0)) return e;
	}
	return "#ECEAF6";
}
function D(e) {
	if (e.dataset.pvReady) return;
	e.dataset.pvReady = "1", e.style.cssText += "position:relative;width:100%;min-width:0;";
	let t = document.createElement("canvas");
	t.style.cssText = "position:absolute;inset:0;width:100%;height:100%;display:block;", t.setAttribute("role", "img"), t.setAttribute("aria-label", "Operating characteristics of simulated candidate designs: the adaptive design reaches 90.3% power with 574 participants, 55 fewer than the fixed design at 629, with type I error held at 2.5%."), e.appendChild(t);
	let n = t.getContext("2d"), r = (e.closest("section") || document.body).querySelector(".text-size-label"), i = r ? getComputedStyle(r) : null, a = i ? i.fontFamily : "Aspekta, Arial, sans-serif", o = i && i.letterSpacing !== "normal" ? (parseFloat(i.letterSpacing) || 0) / (parseFloat(i.fontSize) || 16) : 0, s = "letterSpacing" in n, c = E(e);
	function l(e, t) {
		n.font = `${e} ${t}px ${a}`, s && (n.letterSpacing = (o * t).toFixed(2) + "px");
	}
	function u(e, t, r, i, a, o, s = "left", u = 1, d = !0) {
		if (u <= 0) return;
		l(i, a);
		let p = n.measureText(e).width, m = s === "left" ? t : s === "right" ? t - p : t - p / 2;
		m = F(m, 2, f - p - 2), d && (n.globalAlpha = u * .92, n.fillStyle = c, n.fillRect(m - 4, r - a - 1, p + 8, a + 5)), n.globalAlpha = u, n.fillStyle = o, n.textAlign = "left", n.fillText(e, m, r), n.globalAlpha = 1;
	}
	function d(e, t, r, i, a) {
		if (a <= 0) return;
		let o = e + (t - e) * a, s = Math.sign(t - e) || 1;
		n.strokeStyle = i, n.fillStyle = i, n.lineWidth = 1.25, n.beginPath(), n.moveTo(e, r + .5), n.lineTo(o, r + .5), n.stroke(), n.beginPath(), n.moveTo(o, r + .5), n.lineTo(o - s * 7, r - 3.5), n.lineTo(o - s * 7, r + 4.5), n.closePath(), n.fill();
	}
	let f = 0, p = 0;
	function m(e) {
		n.clearRect(0, 0, f, p);
		let t = f < P, r = t ? 9 : 10, i = f - 16, a = p - 56, o = i - 52, s = a - 48, m = (e) => 52 + (e - 490) / 260 * o, h = (e) => a - (e - .72) / .26 * s;
		l(400, r), n.fillStyle = j, n.textAlign = "right";
		for (let e of [
			.75,
			.8,
			.85,
			.9,
			.95
		]) {
			let t = Math.round(h(e)) + .5;
			n.fillText(Math.round(e * 100) + "%", 42, t + 3), n.strokeStyle = M, n.globalAlpha = .6, n.beginPath(), n.moveTo(52, t), n.lineTo(i, t), n.stroke(), n.globalAlpha = 1;
		}
		n.textAlign = "center";
		for (let e = 500; e <= 750; e += 50) n.fillStyle = j, n.fillText(e, m(e), a + 18);
		n.textAlign = "left", n.strokeStyle = O, n.globalAlpha = .55, n.lineWidth = 1, n.beginPath(), n.moveTo(52.5, 48), n.lineTo(52.5, a + .5), n.lineTo(i, a + .5), n.stroke(), n.globalAlpha = 1, l(500, r);
		let g = n.measureText("EXPECTED SAMPLE SIZE").width;
		l(400, r);
		let _ = n.measureText("TYPE I ERROR HELD AT 2.5%").width + 12 > i - g, v = _ ? a + 34 : a + 40, y = _ ? p - 2 : p - 8;
		u("POWER", 0, 32, 500, r, j, "left", 1, !1), u("EXPECTED SAMPLE SIZE", i, v, 500, r, j, "right", 1, !1), u("CANDIDATE DESIGNS · SIMULATED", 52 + o / 2, 16, 500, r, O, "center", I(e, .1, .6), !1);
		let b = L(I(e, 2.7, 3.3)), x = t ? 1e3 : B.length;
		n.fillStyle = A;
		for (let t = 0; t < x; t++) {
			let r = B[t], i = R(I(e, .25 + r.d * 1.5, .7 + r.d * 1.5));
			if (i <= 0) continue;
			let a = r.p >= .9 ? i * (.5 + .3 * b) : i * .5 * (1 - .72 * b);
			n.globalAlpha = a, n.beginPath(), n.arc(m(r.n), h(r.p) - (1 - i) * 10, 2, 0, 6.2832), n.fill();
		}
		n.globalAlpha = 1;
		let S = h(.9), C = L(I(e, 2, 2.7));
		C > 0 && (n.strokeStyle = O, n.lineWidth = 1.25, n.beginPath(), n.moveTo(52, S), n.lineTo(52 + C * o, S), n.stroke()), u("TARGET 90%", 58, S - 8, 500, r, O, "left", I(e, 2.5, 2.9));
		let w = m(629), T = I(e, 3.3, 3.7);
		T > 0 && (n.globalAlpha = T, n.strokeStyle = O, n.lineWidth = 1.5, n.fillStyle = c, n.beginPath(), n.arc(w, S, 7, 0, 6.2832), n.fill(), n.stroke(), n.globalAlpha = 1), u("FIXED DESIGN · N 629", w + 12, S + 20, 500, r, O, "left", T);
		let E = m(574), D = h(.903), N = I(e, 3.9, 4.4);
		if (N > 0) {
			let e = z(N);
			n.fillStyle = k, n.beginPath(), n.arc(E, D, 6 * e, 0, 6.2832), n.fill(), n.strokeStyle = O, n.lineWidth = 1.5, n.beginPath(), n.arc(E, D, 9.5 * e, 0, 6.2832), n.stroke();
		}
		u("ADAPTIVE DESIGN", E + 14, D - 30, 700, r, O, "left", I(e, 4.2, 4.6)), u("N 574 · POWER 90.3%", E + 14, D - 16, 400, r, O, "left", I(e, 4.3, 4.7)), d(w, E, S + 40, O, L(I(e, 4.5, 5.1))), u("−55 PARTICIPANTS", (w + E) / 2, S + 58, 700, r + 1, O, "center", I(e, 4.9, 5.3)), u("TYPE I ERROR HELD AT 2.5%", 0, y, 400, r, j, "left", I(e, 5.2, 5.6), !1);
	}
	let h = matchMedia("(prefers-reduced-motion: reduce)").matches, g = !1, _ = 0, v = !1, y = 0, b = 0;
	function x() {
		let r = Math.min(devicePixelRatio || 1, 2);
		f = e.clientWidth, p = Math.round(Math.max(320, f / 1.15)), e.style.height = p + "px", t.width = Math.round(f * r), t.height = Math.round(p * r), n.setTransform(r, 0, 0, r, 0, 0), g && m(_);
	}
	function S(e) {
		_ = Math.min(_ + Math.min((e - b) / 1e3, .05), N), b = e, m(_), y = _ < N ? requestAnimationFrame(S) : 0;
	}
	function C() {
		v = !0, _ = 0, b = performance.now(), y ||= requestAnimationFrame(S);
	}
	function w() {
		cancelAnimationFrame(y), y = 0, v = !1, _ = 0, m(0);
	}
	let T = -1, D = new ResizeObserver(() => {
		e.clientWidth !== T && (T = e.clientWidth, x());
	});
	D.observe(e);
	let V = null;
	return (document.fonts ? Promise.race([document.fonts.load(`500 10px ${a}`), new Promise((e) => setTimeout(e, 3e3))]) : Promise.resolve()).then(() => {
		g = !0, h && (_ = N), x(), !h && (V = new IntersectionObserver(([e]) => {
			e.isIntersecting ? !v && e.intersectionRatio >= .45 && C() : v && w();
		}, { threshold: [0, .45] }), V.observe(e));
	}), { destroy() {
		cancelAnimationFrame(y), y = 0, D.disconnect(), V && V.disconnect(), t.remove(), delete e.dataset.pvReady;
	} };
}
var O, k, A, j, M, N, P, F, I, L, R, z, B, V = e((() => {
	O = "#141238", k = "#E2C70A", A = "#928ACD", j = "#7d7b9c", M = "#d3d0e8", N = 5.7, P = 600, F = (e, t = 0, n = 1) => Math.max(t, Math.min(n, e)), I = (e, t, n) => F((e - t) / (n - t)), L = (e) => e < .5 ? 4 * e * e * e : 1 - (-2 * e + 2) ** 3 / 2, R = (e) => 1 - (1 - e) ** 3, z = (e) => 1 + 2.70158 * (e - 1) ** 3 + 1.70158 * (e - 1) ** 2, B = (() => {
		let e = T(7), t = () => Math.sqrt(-2 * Math.log(e() + 1e-9)) * Math.cos(6.2832 * e()), n = (e) => .955 - .05 * Math.exp(-(e - 574) / 60), r = [];
		for (let i = 0; i < 1600; i++) {
			let i = 500 + e() * 240, a = n(i) - Math.abs(t()) * .028 - e() ** 2.2 * .12;
			i < 580 && a >= .899 && (a = .897 - e() * .012), r.push({
				n: i,
				p: Math.max(.725, a),
				d: e()
			});
		}
		return r;
	})();
})), H = /* @__PURE__ */ t((() => {
	w(), V(), document.querySelectorAll("[data-pv=\"trial-hero-bg\"]").forEach((e) => c(e)), document.querySelectorAll("[data-pv=\"success-design-space\"]").forEach((e) => D(e));
}));
//#endregion
export default H();
