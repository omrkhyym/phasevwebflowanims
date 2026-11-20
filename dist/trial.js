import { n as e, t } from "./rolldown-runtime-wf392T_D.mjs";
import { a as n, c as r, i, o as a, r as o, t as s } from "./hero-stage-DpBC6yvy.mjs";
import { n as c, t as l } from "./platform-connect-tree-CuHhjRi6.mjs";
//#region src/trial-hero-bg.js
function u(e) {
	if (!e || e.dataset.pvInit) return;
	function t(e, t) {
		let { ctx: n, W: i, H: c, mouse: l, reduce: u } = e, d = u ? t : t % w, f = (t) => e.fade(t);
		n.clearRect(0, 0, i, c);
		let p = -l.x * 12, T = -l.y * 8, E = (e) => i * (.04 + .92 * e) + p, D = (e) => c * (.86 - .66 * e) + T, O = 1 - o(r(d, C, 12.8)), k = r(d, x, 6.800000000000001), A = o(k), j = d > x && d < 7.4 ? 1 - r(d, 6.800000000000001, 7.4) : 0, M = o(r(d, S, 8.4)), N = Math.max(1.3, Math.min(i, c) * .0019);
		if (j > 0) {
			let e = E(A);
			n.save(), n.setLineDash([3, 5]), n.strokeStyle = a(m, .35 * j * f(e)), n.lineWidth = 1, n.beginPath(), n.moveTo(e, D(1.08)), n.lineTo(e, D(-.04)), n.stroke(), n.restore();
		}
		g.forEach((e, t) => {
			let i = t === _;
			for (let t = 0; t < v; t++) {
				let c = t / 239, l = E(c), u = D(y(e, c)), p = f(l), m = o(r(d, b + c * 1.2, b + c * 1.2 + .5)) * O;
				if (m <= 0) continue;
				let g = j * Math.exp(-(((c - A) / .045) ** 2)), _ = i ? o(r(d, S + c * .9, S + c * .9 + .4)) : 0, v = i ? 1 : 1 - .55 * M, x = m * p * (.28 + .6 * g) * v * (1 - _);
				x > .003 && (n.fillStyle = a(e.c, x), n.beginPath(), n.arc(l, u, N * (1 + .5 * g), 0, s), n.fill()), _ > 0 && (n.fillStyle = a(h, m * p * .85 * _), n.beginPath(), n.arc(l, u, N * 1.1, 0, s), n.fill());
			}
			if (j > 0) {
				let t = E(A), r = D(y(e, A));
				n.strokeStyle = a(e.c, .7 * j * f(t)), n.lineWidth = 1, n.beginPath(), n.arc(t, r, 5, 0, s), n.stroke();
			}
		});
	}
	return n(e, {
		name: "trial",
		draw: t,
		still: T
	});
}
var d, f, p, m, h, g, _, v, y, b, x, S, C, w, T, E = e((() => {
	i(), d = [
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
//#region src/design-space-glossy.js
function D(e) {
	return () => {
		e |= 0, e = e + 1831565813 | 0;
		let t = Math.imul(e ^ e >>> 15, 1 | e);
		return t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t, ((t ^ t >>> 14) >>> 0) / 4294967296;
	};
}
function O(e) {
	if (e.dataset.pvReady) return;
	e.dataset.pvReady = "1", e.style.cssText += "position:relative;width:100%;min-width:0;";
	let t = document.createElement("canvas");
	t.style.cssText = "position:absolute;inset:0;width:100%;height:100%;display:block;", t.setAttribute("role", "img"), t.setAttribute("aria-label", "Operating characteristics of simulated candidate designs: the adaptive design reaches 90.3% power with 574 participants, 55 fewer than the fixed design at 629, with type I error held at 2.5%."), e.appendChild(t);
	let n = t.getContext("2d"), r = (e.closest("section") || document.body).querySelector(".text-size-label"), i = r ? getComputedStyle(r) : null, a = i ? i.fontFamily : "ui-monospace, monospace", o = i && i.letterSpacing !== "normal" ? (parseFloat(i.letterSpacing) || 0) / (parseFloat(i.fontSize) || 16) : 0, s = "letterSpacing" in n, c = (e, t) => {
		n.font = `${e} ${t}px ${a}`, s && (n.letterSpacing = (o * t).toFixed(2) + "px");
	}, l = 0, u = 0;
	function d(e, t, r, i, a, o = "left", s = 1, u = !1) {
		if (s <= 0) return;
		c(400, i);
		let d = n.measureText(e).width, f = o === "left" ? t : o === "right" ? t - d : t - d / 2;
		f = I(f, 8, l - d - 8), u && (n.globalAlpha = s * .82, n.fillStyle = "#141238", n.beginPath(), n.roundRect ? n.roundRect(f - 7, r - i - 4, d + 14, i + 10, 4) : n.rect(f - 7, r - i - 4, d + 14, i + 10), n.fill()), n.globalAlpha = s, n.fillStyle = a, n.textAlign = "left", n.fillText(e, f, r), n.globalAlpha = 1;
	}
	function f(e) {
		n.clearRect(0, 0, l, u);
		let t = l < F, r = t ? 9 : 10, i = l - 12, a = u - 52, o = i - 48, s = a - 44, f = (e) => 48 + (e - 490) / 260 * o, p = (e) => a - (e - .72) / .26 * s;
		c(400, r), n.textAlign = "right";
		for (let e of [.8, .9]) {
			let t = Math.round(p(e)) + .5;
			n.fillStyle = M, n.fillText(Math.round(e * 100) + "%", 38, t + 3), n.strokeStyle = N, n.lineWidth = 1, n.beginPath(), n.moveTo(48, t), n.lineTo(i, t), n.stroke();
		}
		n.textAlign = "center", n.fillStyle = M;
		for (let e = 500; e <= 750; e += 50) n.fillText(e, f(e), a + 18);
		n.strokeStyle = "rgba(244,244,244,.16)", n.beginPath(), n.moveTo(48, a + .5), n.lineTo(i, a + .5), n.stroke(), d("POWER", 0, 28, r, M), d("EXPECTED SAMPLE SIZE", i, a + 38, r, M, "right"), d("CANDIDATE DESIGNS · SIMULATED", 48, 14, r, k, "left", L(e, .1, .6));
		let m = R(L(e, 1.6, 2.6));
		if (m > 0) {
			let e = 548 + 202 * m;
			n.beginPath();
			for (let t = 548; t <= e; t += 2) {
				let e = f(t), r = p(B(t));
				t === 548 ? n.moveTo(e, r) : n.lineTo(e, r);
			}
			n.lineTo(f(e), a), n.lineTo(f(548), a), n.closePath();
			let t = n.createLinearGradient(0, p(.96), 0, a);
			t.addColorStop(0, "rgba(244,244,244,.16)"), t.addColorStop(1, "rgba(244,244,244,0)"), n.fillStyle = t, n.fill(), n.beginPath();
			for (let t = 548; t <= e; t += 2) {
				let e = f(t), r = p(B(t));
				t === 548 ? n.moveTo(e, r) : n.lineTo(e, r);
			}
			n.strokeStyle = k, n.lineWidth = 1.6, n.stroke();
		}
		let h = R(L(e, 2.7, 3.3)), g = t ? 1e3 : V.length;
		n.save(), n.globalCompositeOperation = "lighter", n.fillStyle = j;
		for (let t = 0; t < g; t++) {
			let r = V[t], i = z(L(e, .25 + r.d * 1.5, .7 + r.d * 1.5));
			if (i <= 0) continue;
			let a = r.p >= .9 ? i * (.32 + .22 * h) : i * .3 * (1 - .75 * h);
			n.globalAlpha = a, n.beginPath(), n.arc(f(r.n), p(r.p) - (1 - i) * 10, 1.7, 0, 6.2832), n.fill();
		}
		n.restore();
		let _ = p(.9), v = R(L(e, 2, 2.7));
		v > 0 && (n.save(), n.setLineDash([4, 5]), n.strokeStyle = "rgba(244,244,244,.45)", n.lineWidth = 1, n.beginPath(), n.moveTo(48, _ + .5), n.lineTo(48 + v * o, _ + .5), n.stroke(), n.restore()), d("TARGET 90%", 54, _ - 8, r, M, "left", L(e, 2.5, 2.9));
		let y = f(629), b = L(e, 3.3, 3.7);
		b > 0 && (n.globalAlpha = b, n.strokeStyle = "rgba(244,244,244,.75)", n.lineWidth = 1.25, n.beginPath(), n.arc(y, _, 6, 0, 6.2832), n.stroke(), n.globalAlpha = 1), d("FIXED · N 629", y + 12, _ + 20, r, M, "left", b);
		let x = f(574), S = p(.903), C = z(L(e, 3.9, 4.5));
		if (C > 0) {
			n.fillStyle = A, n.beginPath(), n.arc(x, S, 5 * C, 0, 6.2832), n.fill();
			let e = 13 * C;
			for (let t = 0; t < 22; t++) {
				let r = t / 22 * 6.2832 - 1.5708;
				n.globalAlpha = C * (.45 + .45 * (t / 22 < C)), n.beginPath(), n.arc(x + Math.cos(r) * e, S + Math.sin(r) * e, 1.1, 0, 6.2832), n.fill();
			}
			n.globalAlpha = 1;
		}
		let w = L(e, 4.2, 4.6), T = x - 26, E = S - 50;
		w > 0 && (n.globalAlpha = w * .6, n.strokeStyle = k, n.lineWidth = 1, n.beginPath(), n.moveTo(x - 11, S - 11), n.lineTo(T + 4, E + 16), n.stroke(), n.globalAlpha = 1), d("ADAPTIVE DESIGN", T, E - 16, r, k, "right", w, !0), d("N 574 · POWER 90.3%", T, E, r, "rgba(244,244,244,.82)", "right", L(e, 4.3, 4.7), !0);
		let D = R(L(e, 4.5, 5.1)), O = _ + 40;
		D > 0 && (n.strokeStyle = A, n.lineWidth = 1.4, n.beginPath(), n.moveTo(y, O + .5), n.lineTo(y + (x - y) * D, O + .5), n.stroke(), n.fillStyle = A, n.beginPath(), n.arc(y, O + .5, 2.4, 0, 6.2832), n.fill(), D >= 1 && (n.beginPath(), n.arc(x, O + .5, 2.4, 0, 6.2832), n.fill())), d("−55 PARTICIPANTS", (y + x) / 2, O + 20, r, A, "center", L(e, 4.9, 5.3)), d("TYPE I ERROR HELD AT 2.5%", 0, u - 6, r, M, "left", L(e, 5.2, 5.6));
	}
	let p = matchMedia("(prefers-reduced-motion: reduce)").matches, m = !1, h = 0, g = !1, _ = 0, v = 0;
	function y() {
		let r = Math.min(devicePixelRatio || 1, 2);
		l = e.clientWidth, u = Math.round(Math.max(320, l / 1.15)), e.style.height = u + "px", t.width = Math.round(l * r), t.height = Math.round(u * r), n.setTransform(r, 0, 0, r, 0, 0), m && f(h);
	}
	function b(e) {
		h = Math.min(h + Math.min((e - v) / 1e3, .05), P), v = e, f(h), _ = h < P ? requestAnimationFrame(b) : 0;
	}
	function x() {
		g = !0, h = 0, v = performance.now(), _ ||= requestAnimationFrame(b);
	}
	function S() {
		cancelAnimationFrame(_), _ = 0, g = !1, h = 0, f(0);
	}
	let C = -1, w = new ResizeObserver(() => {
		e.clientWidth !== C && (C = e.clientWidth, y());
	});
	w.observe(e);
	let T = null;
	return (document.fonts ? Promise.race([document.fonts.load(`400 10px ${a}`), new Promise((e) => setTimeout(e, 3e3))]) : Promise.resolve()).then(() => {
		m = !0, p && (h = P), y(), !p && (T = new IntersectionObserver(([e]) => {
			e.isIntersecting ? !g && e.intersectionRatio >= .45 && x() : g && S();
		}, { threshold: [0, .45] }), T.observe(e));
	}), { destroy() {
		cancelAnimationFrame(_), _ = 0, w.disconnect(), T && T.disconnect(), t.remove(), delete e.dataset.pvReady;
	} };
}
var k, A, j, M, N, P, F, I, L, R, z, B, V, H = e((() => {
	k = "#F4F4F4", A = "#E2C70A", j = "#C9C4EF", M = "rgba(244,244,244,.62)", N = "rgba(244,244,244,.08)", P = 5.7, F = 600, I = (e, t = 0, n = 1) => Math.max(t, Math.min(n, e)), L = (e, t, n) => I((e - t) / (n - t)), R = (e) => e < .5 ? 4 * e * e * e : 1 - (-2 * e + 2) ** 3 / 2, z = (e) => 1 - (1 - e) ** 3, B = (e) => .955 - .05 * Math.exp(-(e - 574) / 60), V = (() => {
		let e = D(7), t = () => Math.sqrt(-2 * Math.log(e() + 1e-9)) * Math.cos(6.2832 * e()), n = [];
		for (let r = 0; r < 1600; r++) {
			let r = 500 + e() * 240, i = B(r) - Math.abs(t()) * .028 - e() ** 2.2 * .12;
			r < 580 && i >= .899 && (i = .897 - e() * .012), n.push({
				n: r,
				p: Math.max(.725, i),
				d: e()
			});
		}
		return n;
	})();
})), U = /* @__PURE__ */ t((() => {
	E(), H(), c(), document.querySelectorAll("[data-pv=\"trial-hero-bg\"]").forEach((e) => u(e)), document.querySelectorAll("[data-pv=\"design-space-glossy\"]").forEach((e) => O(e)), document.querySelectorAll("[data-pv=\"platform-connect-v2\"]").forEach((e) => l(e));
}));
//#endregion
export default U();
