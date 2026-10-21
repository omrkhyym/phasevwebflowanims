import { n as e, t } from "./rolldown-runtime-wf392T_D.mjs";
import { a as n, c as r, n as i, o as a, r as o, s, t as c, u as l } from "./platform-connect-Bf2sdhRo.mjs";
//#region src/trial-hero-bg.js
function u(e) {
	if (!e || e.dataset.pvInit) return;
	function t(e, t) {
		let { ctx: i, W: a, H: s, mouse: c, reduce: u } = e, d = u ? t : t % w, f = (t) => e.fade(t);
		i.clearRect(0, 0, a, s);
		let p = -c.x * 12, T = -c.y * 8, E = (e) => a * (.04 + .92 * e) + p, D = (e) => s * (.86 - .66 * e) + T, O = 1 - n(l(d, C, 12.8)), k = l(d, x, 6.800000000000001), A = n(k), j = d > x && d < 7.4 ? 1 - l(d, 6.800000000000001, 7.4) : 0, M = n(l(d, S, 8.4)), N = Math.max(1.3, Math.min(a, s) * .0019);
		if (j > 0) {
			let e = E(A);
			i.save(), i.setLineDash([3, 5]), i.strokeStyle = r(m, .35 * j * f(e)), i.lineWidth = 1, i.beginPath(), i.moveTo(e, D(1.08)), i.lineTo(e, D(-.04)), i.stroke(), i.restore();
		}
		g.forEach((e, t) => {
			let a = t === _;
			for (let t = 0; t < v; t++) {
				let s = t / 239, c = E(s), u = D(y(e, s)), p = f(c), m = n(l(d, b + s * 1.2, b + s * 1.2 + .5)) * O;
				if (m <= 0) continue;
				let g = j * Math.exp(-(((s - A) / .045) ** 2)), _ = a ? n(l(d, S + s * .9, S + s * .9 + .4)) : 0, v = a ? 1 : 1 - .55 * M, x = m * p * (.28 + .6 * g) * v * (1 - _);
				x > .003 && (i.fillStyle = r(e.c, x), i.beginPath(), i.arc(c, u, N * (1 + .5 * g), 0, o), i.fill()), _ > 0 && (i.fillStyle = r(h, m * p * .85 * _), i.beginPath(), i.arc(c, u, N * 1.1, 0, o), i.fill());
			}
			if (j > 0) {
				let t = E(A), n = D(y(e, A));
				i.strokeStyle = r(e.c, .7 * j * f(t)), i.lineWidth = 1, i.beginPath(), i.arc(t, n, 5, 0, o), i.stroke();
			}
		});
	}
	return s(e, {
		name: "trial",
		draw: t,
		still: T
	});
}
var d, f, p, m, h, g, _, v, y, b, x, S, C, w, T, E = e((() => {
	a(), d = [
		146,
		138,
		205
	], f = [
		120,
		168,
		224
	], p = [
		127,
		232,
		207
	], m = [
		199,
		196,
		226
	], h = [
		226,
		199,
		10
	], g = [
		{
			m: .5,
			s: .075,
			top: 1,
			c: d
		},
		{
			m: .4,
			s: .11,
			top: .97,
			c: f
		},
		{
			m: .33,
			s: .06,
			top: .82,
			c: p
		},
		{
			m: .6,
			s: .05,
			top: 1,
			c: m
		}
	], _ = 1, v = 240, y = (e, t) => e.top / (1 + Math.exp(-(t - e.m) / e.s)), b = 0, x = 1.6, S = 7.2, C = 11.4, w = 13, T = 9;
}));
//#endregion
//#region src/success-design-space.js
function D(e) {
	return () => {
		e |= 0, e = e + 1831565813 | 0;
		let t = Math.imul(e ^ e >>> 15, 1 | e);
		return t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t, ((t ^ t >>> 14) >>> 0) / 4294967296;
	};
}
function O(e) {
	for (let t = e.closest("section") || e.parentElement; t; t = t.parentElement) {
		let e = getComputedStyle(t).backgroundColor, n = e.match(/rgba?\(([^)]+)\)/);
		if (n && (n[1].split(",")[3] === void 0 || parseFloat(n[1].split(",")[3]) > 0)) return e;
	}
	return "#ECEAF6";
}
function k(e) {
	if (e.dataset.pvReady) return;
	e.dataset.pvReady = "1", e.style.cssText += "position:relative;width:100%;min-width:0;";
	let t = document.createElement("canvas");
	t.style.cssText = "position:absolute;inset:0;width:100%;height:100%;display:block;", t.setAttribute("role", "img"), t.setAttribute("aria-label", "Operating characteristics of simulated candidate designs: the adaptive design reaches 90.3% power with 574 participants, 55 fewer than the fixed design at 629, with type I error held at 2.5%."), e.appendChild(t);
	let n = t.getContext("2d"), r = (e.closest("section") || document.body).querySelector(".text-size-label"), i = r ? getComputedStyle(r) : null, a = i ? i.fontFamily : "Aspekta, Arial, sans-serif", o = i && i.letterSpacing !== "normal" ? (parseFloat(i.letterSpacing) || 0) / (parseFloat(i.fontSize) || 16) : 0, s = "letterSpacing" in n, c = O(e);
	function l(e, t) {
		n.font = `${e} ${t}px ${a}`, s && (n.letterSpacing = (o * t).toFixed(2) + "px");
	}
	function u(e, t, r, i, a, o, s = "left", u = 1, d = !0) {
		if (u <= 0) return;
		l(i, a);
		let p = n.measureText(e).width, m = s === "left" ? t : s === "right" ? t - p : t - p / 2;
		m = L(m, 2, f - p - 2), d && (n.globalAlpha = u * .92, n.fillStyle = c, n.fillRect(m - 4, r - a - 1, p + 8, a + 5)), n.globalAlpha = u, n.fillStyle = o, n.textAlign = "left", n.fillText(e, m, r), n.globalAlpha = 1;
	}
	function d(e, t, r, i, a) {
		if (a <= 0) return;
		let o = e + (t - e) * a, s = Math.sign(t - e) || 1;
		n.strokeStyle = i, n.fillStyle = i, n.lineWidth = 1.25, n.beginPath(), n.moveTo(e, r + .5), n.lineTo(o, r + .5), n.stroke(), n.beginPath(), n.moveTo(o, r + .5), n.lineTo(o - s * 7, r - 3.5), n.lineTo(o - s * 7, r + 4.5), n.closePath(), n.fill();
	}
	let f = 0, p = 0;
	function m(e) {
		n.clearRect(0, 0, f, p);
		let t = f < I, r = t ? 9 : 10, i = f - 16, a = p - 56, o = i - 52, s = a - 48, m = (e) => 52 + (e - 490) / 260 * o, h = (e) => a - (e - .72) / .26 * s;
		l(400, r), n.fillStyle = N, n.textAlign = "right";
		for (let e of [
			.75,
			.8,
			.85,
			.9,
			.95
		]) {
			let t = Math.round(h(e)) + .5;
			n.fillText(Math.round(e * 100) + "%", 42, t + 3), n.strokeStyle = P, n.globalAlpha = .6, n.beginPath(), n.moveTo(52, t), n.lineTo(i, t), n.stroke(), n.globalAlpha = 1;
		}
		n.textAlign = "center";
		for (let e = 500; e <= 750; e += 50) n.fillStyle = N, n.fillText(e, m(e), a + 18);
		n.textAlign = "left", n.strokeStyle = A, n.globalAlpha = .55, n.lineWidth = 1, n.beginPath(), n.moveTo(52.5, 48), n.lineTo(52.5, a + .5), n.lineTo(i, a + .5), n.stroke(), n.globalAlpha = 1, l(500, r);
		let g = n.measureText("EXPECTED SAMPLE SIZE").width;
		l(400, r);
		let _ = n.measureText("TYPE I ERROR HELD AT 2.5%").width + 12 > i - g, v = _ ? a + 34 : a + 40, y = _ ? p - 2 : p - 8;
		u("POWER", 0, 32, 500, r, N, "left", 1, !1), u("EXPECTED SAMPLE SIZE", i, v, 500, r, N, "right", 1, !1), u("CANDIDATE DESIGNS · SIMULATED", 52 + o / 2, 16, 500, r, A, "center", R(e, .1, .6), !1);
		let b = z(R(e, 2.7, 3.3)), x = t ? 1e3 : H.length;
		n.fillStyle = M;
		for (let t = 0; t < x; t++) {
			let r = H[t], i = B(R(e, .25 + r.d * 1.5, .7 + r.d * 1.5));
			if (i <= 0) continue;
			let a = r.p >= .9 ? i * (.5 + .3 * b) : i * .5 * (1 - .72 * b);
			n.globalAlpha = a, n.beginPath(), n.arc(m(r.n), h(r.p) - (1 - i) * 10, 2, 0, 6.2832), n.fill();
		}
		n.globalAlpha = 1;
		let S = h(.9), C = z(R(e, 2, 2.7));
		C > 0 && (n.strokeStyle = A, n.lineWidth = 1.25, n.beginPath(), n.moveTo(52, S), n.lineTo(52 + C * o, S), n.stroke()), u("TARGET 90%", 58, S - 8, 500, r, A, "left", R(e, 2.5, 2.9));
		let w = m(629), T = R(e, 3.3, 3.7);
		T > 0 && (n.globalAlpha = T, n.strokeStyle = A, n.lineWidth = 1.5, n.fillStyle = c, n.beginPath(), n.arc(w, S, 7, 0, 6.2832), n.fill(), n.stroke(), n.globalAlpha = 1), u("FIXED DESIGN · N 629", w + 12, S + 20, 500, r, A, "left", T);
		let E = m(574), D = h(.903), O = R(e, 3.9, 4.4);
		if (O > 0) {
			let e = V(O);
			n.fillStyle = j, n.beginPath(), n.arc(E, D, 6 * e, 0, 6.2832), n.fill(), n.strokeStyle = A, n.lineWidth = 1.5, n.beginPath(), n.arc(E, D, 9.5 * e, 0, 6.2832), n.stroke();
		}
		u("ADAPTIVE DESIGN", E + 14, D - 30, 700, r, A, "left", R(e, 4.2, 4.6)), u("N 574 · POWER 90.3%", E + 14, D - 16, 400, r, A, "left", R(e, 4.3, 4.7)), d(w, E, S + 40, A, z(R(e, 4.5, 5.1))), u("−55 PARTICIPANTS", (w + E) / 2, S + 58, 700, r + 1, A, "center", R(e, 4.9, 5.3)), u("TYPE I ERROR HELD AT 2.5%", 0, y, 400, r, N, "left", R(e, 5.2, 5.6), !1);
	}
	let h = matchMedia("(prefers-reduced-motion: reduce)").matches, g = !1, _ = 0, v = !1, y = 0, b = 0;
	function x() {
		let r = Math.min(devicePixelRatio || 1, 2);
		f = e.clientWidth, p = Math.round(Math.max(320, f / 1.15)), e.style.height = p + "px", t.width = Math.round(f * r), t.height = Math.round(p * r), n.setTransform(r, 0, 0, r, 0, 0), g && m(_);
	}
	function S(e) {
		_ = Math.min(_ + Math.min((e - b) / 1e3, .05), F), b = e, m(_), y = _ < F ? requestAnimationFrame(S) : 0;
	}
	function C() {
		v = !0, _ = 0, b = performance.now(), y ||= requestAnimationFrame(S);
	}
	function w() {
		cancelAnimationFrame(y), y = 0, v = !1, _ = 0, m(0);
	}
	let T = -1, E = new ResizeObserver(() => {
		e.clientWidth !== T && (T = e.clientWidth, x());
	});
	E.observe(e);
	let D = null;
	return (document.fonts ? Promise.race([document.fonts.load(`500 10px ${a}`), new Promise((e) => setTimeout(e, 3e3))]) : Promise.resolve()).then(() => {
		g = !0, h && (_ = F), x(), !h && (D = new IntersectionObserver(([e]) => {
			e.isIntersecting ? !v && e.intersectionRatio >= .45 && C() : v && w();
		}, { threshold: [0, .45] }), D.observe(e));
	}), { destroy() {
		cancelAnimationFrame(y), y = 0, E.disconnect(), D && D.disconnect(), t.remove(), delete e.dataset.pvReady;
	} };
}
var A, j, M, N, P, F, I, L, R, z, B, V, H, U = e((() => {
	A = "#141238", j = "#E2C70A", M = "#928ACD", N = "#7d7b9c", P = "#d3d0e8", F = 5.7, I = 600, L = (e, t = 0, n = 1) => Math.max(t, Math.min(n, e)), R = (e, t, n) => L((e - t) / (n - t)), z = (e) => e < .5 ? 4 * e * e * e : 1 - (-2 * e + 2) ** 3 / 2, B = (e) => 1 - (1 - e) ** 3, V = (e) => 1 + 2.70158 * (e - 1) ** 3 + 1.70158 * (e - 1) ** 2, H = (() => {
		let e = D(7), t = () => Math.sqrt(-2 * Math.log(e() + 1e-9)) * Math.cos(6.2832 * e()), n = (e) => .955 - .05 * Math.exp(-(e - 574) / 60), r = [];
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
})), W = /* @__PURE__ */ t((() => {
	E(), U(), i(), document.querySelectorAll("[data-pv=\"trial-hero-bg\"]").forEach((e) => u(e)), document.querySelectorAll("[data-pv=\"success-design-space\"]").forEach((e) => k(e)), document.querySelectorAll("[data-pv=\"platform-connect\"]").forEach((e) => c(e));
}));
//#endregion
export default W();
