import { n as e, t } from "./rolldown-runtime-wf392T_D.mjs";
import { a as n, c as r, i, o as a, r as o, t as s } from "./hero-stage-DpBC6yvy.mjs";
import { n as c, t as l } from "./platform-connect-cards-C5Y4IjAO.mjs";
import { n as u, t as d } from "./platform-connect-Dh9cewVn.mjs";
//#region src/trial-hero-bg.js
function f(e) {
	if (!e || e.dataset.pvInit) return;
	function t(e, t) {
		let { ctx: n, W: i, H: c, mouse: l, reduce: u } = e, d = u ? t : t % E, f = (t) => e.fade(t);
		n.clearRect(0, 0, i, c);
		let p = -l.x * 12, m = -l.y * 8, h = (e) => i * (.04 + .92 * e) + p, D = (e) => c * (.86 - .66 * e) + m, O = 1 - o(r(d, T, 12.8)), k = r(d, C, 6.800000000000001), A = o(k), j = d > C && d < 7.4 ? 1 - r(d, 6.800000000000001, 7.4) : 0, M = o(r(d, w, 8.4)), N = Math.max(1.3, Math.min(i, c) * .0019);
		if (j > 0) {
			let e = h(A);
			n.save(), n.setLineDash([3, 5]), n.strokeStyle = a(g, .35 * j * f(e)), n.lineWidth = 1, n.beginPath(), n.moveTo(e, D(1.08)), n.lineTo(e, D(-.04)), n.stroke(), n.restore();
		}
		v.forEach((e, t) => {
			let i = t === y;
			for (let t = 0; t < b; t++) {
				let c = t / 239, l = h(c), u = D(x(e, c)), p = f(l), m = o(r(d, S + c * 1.2, S + c * 1.2 + .5)) * O;
				if (m <= 0) continue;
				let g = j * Math.exp(-(((c - A) / .045) ** 2)), v = i ? o(r(d, w + c * .9, w + c * .9 + .4)) : 0, y = i ? 1 : 1 - .55 * M, b = m * p * (.28 + .6 * g) * y * (1 - v);
				b > .003 && (n.fillStyle = a(e.c, b), n.beginPath(), n.arc(l, u, N * (1 + .5 * g), 0, s), n.fill()), v > 0 && (n.fillStyle = a(_, m * p * .85 * v), n.beginPath(), n.arc(l, u, N * 1.1, 0, s), n.fill());
			}
			if (j > 0) {
				let t = h(A), r = D(x(e, A));
				n.strokeStyle = a(e.c, .7 * j * f(t)), n.lineWidth = 1, n.beginPath(), n.arc(t, r, 5, 0, s), n.stroke();
			}
		});
	}
	return n(e, {
		name: "trial",
		draw: t,
		still: D
	});
}
var p, m, h, g, _, v, y, b, x, S, C, w, T, E, D, O = e((() => {
	i(), p = [
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
	], v = [
		{
			m: .5,
			s: .075,
			top: 1,
			c: p
		},
		{
			m: .4,
			s: .11,
			top: .97,
			c: m
		},
		{
			m: .33,
			s: .06,
			top: .82,
			c: h
		},
		{
			m: .6,
			s: .05,
			top: 1,
			c: g
		}
	], y = 1, b = 240, x = (e, t) => e.top / (1 + Math.exp(-(t - e.m) / e.s)), S = 0, C = 1.6, w = 7.2, T = 11.4, E = 13, D = 9;
}));
//#endregion
//#region src/success-design-space.js
function k(e) {
	return () => {
		e |= 0, e = e + 1831565813 | 0;
		let t = Math.imul(e ^ e >>> 15, 1 | e);
		return t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t, ((t ^ t >>> 14) >>> 0) / 4294967296;
	};
}
function A(e) {
	for (let t = e.closest("section") || e.parentElement; t; t = t.parentElement) {
		let e = getComputedStyle(t).backgroundColor, n = e.match(/rgba?\(([^)]+)\)/);
		if (n && (n[1].split(",")[3] === void 0 || parseFloat(n[1].split(",")[3]) > 0)) return e;
	}
	return "#ECEAF6";
}
function j(e) {
	if (e.dataset.pvReady) return;
	e.dataset.pvReady = "1", e.style.cssText += "position:relative;width:100%;min-width:0;";
	let t = document.createElement("canvas");
	t.style.cssText = "position:absolute;inset:0;width:100%;height:100%;display:block;", t.setAttribute("role", "img"), t.setAttribute("aria-label", "Operating characteristics of simulated candidate designs: the adaptive design reaches 90.3% power with 574 participants, 55 fewer than the fixed design at 629, with type I error held at 2.5%."), e.appendChild(t);
	let n = t.getContext("2d"), r = (e.closest("section") || document.body).querySelector(".text-size-label"), i = r ? getComputedStyle(r) : null, a = i ? i.fontFamily : "Aspekta, Arial, sans-serif", o = i && i.letterSpacing !== "normal" ? (parseFloat(i.letterSpacing) || 0) / (parseFloat(i.fontSize) || 16) : 0, s = "letterSpacing" in n, c = A(e);
	function l(e, t) {
		n.font = `${e} ${t}px ${a}`, s && (n.letterSpacing = (o * t).toFixed(2) + "px");
	}
	function u(e, t, r, i, a, o, s = "left", u = 1, d = !0) {
		if (u <= 0) return;
		l(i, a);
		let p = n.measureText(e).width, m = s === "left" ? t : s === "right" ? t - p : t - p / 2;
		m = z(m, 2, f - p - 2), d && (n.globalAlpha = u * .92, n.fillStyle = c, n.fillRect(m - 4, r - a - 1, p + 8, a + 5)), n.globalAlpha = u, n.fillStyle = o, n.textAlign = "left", n.fillText(e, m, r), n.globalAlpha = 1;
	}
	function d(e, t, r, i, a) {
		if (a <= 0) return;
		let o = e + (t - e) * a, s = Math.sign(t - e) || 1;
		n.strokeStyle = i, n.fillStyle = i, n.lineWidth = 1.25, n.beginPath(), n.moveTo(e, r + .5), n.lineTo(o, r + .5), n.stroke(), n.beginPath(), n.moveTo(o, r + .5), n.lineTo(o - s * 7, r - 3.5), n.lineTo(o - s * 7, r + 4.5), n.closePath(), n.fill();
	}
	let f = 0, p = 0;
	function m(e) {
		n.clearRect(0, 0, f, p);
		let t = f < R, r = t ? 9 : 10, i = f - 16, a = p - 56, o = i - 52, s = a - 48, m = (e) => 52 + (e - 490) / 260 * o, h = (e) => a - (e - .72) / .26 * s;
		l(400, r), n.fillStyle = F, n.textAlign = "right";
		for (let e of [
			.75,
			.8,
			.85,
			.9,
			.95
		]) {
			let t = Math.round(h(e)) + .5;
			n.fillText(Math.round(e * 100) + "%", 42, t + 3), n.strokeStyle = I, n.globalAlpha = .6, n.beginPath(), n.moveTo(52, t), n.lineTo(i, t), n.stroke(), n.globalAlpha = 1;
		}
		n.textAlign = "center";
		for (let e = 500; e <= 750; e += 50) n.fillStyle = F, n.fillText(e, m(e), a + 18);
		n.textAlign = "left", n.strokeStyle = M, n.globalAlpha = .55, n.lineWidth = 1, n.beginPath(), n.moveTo(52.5, 48), n.lineTo(52.5, a + .5), n.lineTo(i, a + .5), n.stroke(), n.globalAlpha = 1, l(500, r);
		let g = n.measureText("EXPECTED SAMPLE SIZE").width;
		l(400, r);
		let _ = n.measureText("TYPE I ERROR HELD AT 2.5%").width + 12 > i - g, v = _ ? a + 34 : a + 40, y = _ ? p - 2 : p - 8;
		u("POWER", 0, 32, 500, r, F, "left", 1, !1), u("EXPECTED SAMPLE SIZE", i, v, 500, r, F, "right", 1, !1), u("CANDIDATE DESIGNS · SIMULATED", 52 + o / 2, 16, 500, r, M, "center", B(e, .1, .6), !1);
		let b = V(B(e, 2.7, 3.3)), x = t ? 1e3 : U.length;
		n.fillStyle = P;
		for (let t = 0; t < x; t++) {
			let r = U[t], i = H(B(e, .25 + r.d * 1.5, .7 + r.d * 1.5));
			if (i <= 0) continue;
			let a = r.p >= .9 ? i * (.5 + .3 * b) : i * .5 * (1 - .72 * b);
			n.globalAlpha = a, n.beginPath(), n.arc(m(r.n), h(r.p) - (1 - i) * 10, 2, 0, 6.2832), n.fill();
		}
		n.globalAlpha = 1;
		let S = h(.9), C = V(B(e, 2, 2.7));
		C > 0 && (n.strokeStyle = M, n.lineWidth = 1.25, n.beginPath(), n.moveTo(52, S), n.lineTo(52 + C * o, S), n.stroke()), u("TARGET 90%", 58, S - 8, 500, r, M, "left", B(e, 2.5, 2.9));
		let w = m(629), T = B(e, 3.3, 3.7);
		T > 0 && (n.globalAlpha = T, n.strokeStyle = M, n.lineWidth = 1.5, n.fillStyle = c, n.beginPath(), n.arc(w, S, 7, 0, 6.2832), n.fill(), n.stroke(), n.globalAlpha = 1), u("FIXED DESIGN · N 629", w + 12, S + 20, 500, r, M, "left", T);
		let E = m(574), D = h(.903), O = B(e, 3.9, 4.4);
		if (O > 0) {
			let e = ee(O);
			n.fillStyle = N, n.beginPath(), n.arc(E, D, 6 * e, 0, 6.2832), n.fill(), n.strokeStyle = M, n.lineWidth = 1.5, n.beginPath(), n.arc(E, D, 9.5 * e, 0, 6.2832), n.stroke();
		}
		u("ADAPTIVE DESIGN", E + 14, D - 30, 700, r, M, "left", B(e, 4.2, 4.6)), u("N 574 · POWER 90.3%", E + 14, D - 16, 400, r, M, "left", B(e, 4.3, 4.7)), d(w, E, S + 40, M, V(B(e, 4.5, 5.1))), u("−55 PARTICIPANTS", (w + E) / 2, S + 58, 700, r + 1, M, "center", B(e, 4.9, 5.3)), u("TYPE I ERROR HELD AT 2.5%", 0, y, 400, r, F, "left", B(e, 5.2, 5.6), !1);
	}
	let h = matchMedia("(prefers-reduced-motion: reduce)").matches, g = !1, _ = 0, v = !1, y = 0, b = 0;
	function x() {
		let r = Math.min(devicePixelRatio || 1, 2);
		f = e.clientWidth, p = Math.round(Math.max(320, f / 1.15)), e.style.height = p + "px", t.width = Math.round(f * r), t.height = Math.round(p * r), n.setTransform(r, 0, 0, r, 0, 0), g && m(_);
	}
	function S(e) {
		_ = Math.min(_ + Math.min((e - b) / 1e3, .05), L), b = e, m(_), y = _ < L ? requestAnimationFrame(S) : 0;
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
		g = !0, h && (_ = L), x(), !h && (D = new IntersectionObserver(([e]) => {
			e.isIntersecting ? !v && e.intersectionRatio >= .45 && C() : v && w();
		}, { threshold: [0, .45] }), D.observe(e));
	}), { destroy() {
		cancelAnimationFrame(y), y = 0, E.disconnect(), D && D.disconnect(), t.remove(), delete e.dataset.pvReady;
	} };
}
var M, N, P, F, I, L, R, z, B, V, H, ee, U, te = e((() => {
	M = "#141238", N = "#E2C70A", P = "#928ACD", F = "#7d7b9c", I = "#d3d0e8", L = 5.7, R = 600, z = (e, t = 0, n = 1) => Math.max(t, Math.min(n, e)), B = (e, t, n) => z((e - t) / (n - t)), V = (e) => e < .5 ? 4 * e * e * e : 1 - (-2 * e + 2) ** 3 / 2, H = (e) => 1 - (1 - e) ** 3, ee = (e) => 1 + 2.70158 * (e - 1) ** 3 + 1.70158 * (e - 1) ** 2, U = (() => {
		let e = k(7), t = () => Math.sqrt(-2 * Math.log(e() + 1e-9)) * Math.cos(6.2832 * e()), n = (e) => .955 - .05 * Math.exp(-(e - 574) / 60), r = [];
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
}));
//#endregion
//#region src/design-space-glossy.js
function ne(e) {
	return () => {
		e |= 0, e = e + 1831565813 | 0;
		let t = Math.imul(e ^ e >>> 15, 1 | e);
		return t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t, ((t ^ t >>> 14) >>> 0) / 4294967296;
	};
}
function re(e) {
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
		f = J(f, 8, l - d - 8), u && (n.globalAlpha = s * .82, n.fillStyle = "#141238", n.beginPath(), n.roundRect ? n.roundRect(f - 7, r - i - 4, d + 14, i + 10, 4) : n.rect(f - 7, r - i - 4, d + 14, i + 10), n.fill()), n.globalAlpha = s, n.fillStyle = a, n.textAlign = "left", n.fillText(e, f, r), n.globalAlpha = 1;
	}
	function f(e) {
		n.clearRect(0, 0, l, u);
		let t = l < oe, r = t ? 9 : 10, i = l - 12, a = u - 52, o = i - 48, s = a - 44, f = (e) => 48 + (e - 490) / 260 * o, p = (e) => a - (e - .72) / .26 * s;
		c(400, r), n.textAlign = "right";
		for (let e of [.8, .9]) {
			let t = Math.round(p(e)) + .5;
			n.fillStyle = K, n.fillText(Math.round(e * 100) + "%", 38, t + 3), n.strokeStyle = ae, n.lineWidth = 1, n.beginPath(), n.moveTo(48, t), n.lineTo(i, t), n.stroke();
		}
		n.textAlign = "center", n.fillStyle = K;
		for (let e = 500; e <= 750; e += 50) n.fillText(e, f(e), a + 18);
		n.strokeStyle = "rgba(244,244,244,.16)", n.beginPath(), n.moveTo(48, a + .5), n.lineTo(i, a + .5), n.stroke(), d("POWER", 0, 28, r, K), d("EXPECTED SAMPLE SIZE", i, a + 38, r, K, "right"), d("CANDIDATE DESIGNS · SIMULATED", 48, 14, r, W, "left", Y(e, .1, .6));
		let m = X(Y(e, 1.6, 2.6));
		if (m > 0) {
			let e = 548 + 202 * m;
			n.beginPath();
			for (let t = 548; t <= e; t += 2) {
				let e = f(t), r = p(Q(t));
				t === 548 ? n.moveTo(e, r) : n.lineTo(e, r);
			}
			n.lineTo(f(e), a), n.lineTo(f(548), a), n.closePath();
			let t = n.createLinearGradient(0, p(.96), 0, a);
			t.addColorStop(0, "rgba(244,244,244,.16)"), t.addColorStop(1, "rgba(244,244,244,0)"), n.fillStyle = t, n.fill(), n.beginPath();
			for (let t = 548; t <= e; t += 2) {
				let e = f(t), r = p(Q(t));
				t === 548 ? n.moveTo(e, r) : n.lineTo(e, r);
			}
			n.strokeStyle = W, n.lineWidth = 1.6, n.stroke();
		}
		let h = X(Y(e, 2.7, 3.3)), g = t ? 1e3 : $.length;
		n.save(), n.globalCompositeOperation = "lighter", n.fillStyle = ie;
		for (let t = 0; t < g; t++) {
			let r = $[t], i = Z(Y(e, .25 + r.d * 1.5, .7 + r.d * 1.5));
			if (i <= 0) continue;
			let a = r.p >= .9 ? i * (.32 + .22 * h) : i * .3 * (1 - .75 * h);
			n.globalAlpha = a, n.beginPath(), n.arc(f(r.n), p(r.p) - (1 - i) * 10, 1.7, 0, 6.2832), n.fill();
		}
		n.restore();
		let _ = p(.9), v = X(Y(e, 2, 2.7));
		v > 0 && (n.save(), n.setLineDash([4, 5]), n.strokeStyle = "rgba(244,244,244,.45)", n.lineWidth = 1, n.beginPath(), n.moveTo(48, _ + .5), n.lineTo(48 + v * o, _ + .5), n.stroke(), n.restore()), d("TARGET 90%", 54, _ - 8, r, K, "left", Y(e, 2.5, 2.9));
		let y = f(629), b = Y(e, 3.3, 3.7);
		b > 0 && (n.globalAlpha = b, n.strokeStyle = "rgba(244,244,244,.75)", n.lineWidth = 1.25, n.beginPath(), n.arc(y, _, 6, 0, 6.2832), n.stroke(), n.globalAlpha = 1), d("FIXED · N 629", y + 12, _ + 20, r, K, "left", b);
		let x = f(574), S = p(.903), C = Z(Y(e, 3.9, 4.5));
		if (C > 0) {
			n.fillStyle = G, n.beginPath(), n.arc(x, S, 5 * C, 0, 6.2832), n.fill();
			let e = 13 * C;
			for (let t = 0; t < 22; t++) {
				let r = t / 22 * 6.2832 - 1.5708;
				n.globalAlpha = C * (.45 + .45 * (t / 22 < C)), n.beginPath(), n.arc(x + Math.cos(r) * e, S + Math.sin(r) * e, 1.1, 0, 6.2832), n.fill();
			}
			n.globalAlpha = 1;
		}
		let w = Y(e, 4.2, 4.6), T = x - 26, E = S - 50;
		w > 0 && (n.globalAlpha = w * .6, n.strokeStyle = W, n.lineWidth = 1, n.beginPath(), n.moveTo(x - 11, S - 11), n.lineTo(T + 4, E + 16), n.stroke(), n.globalAlpha = 1), d("ADAPTIVE DESIGN", T, E - 16, r, W, "right", w, !0), d("N 574 · POWER 90.3%", T, E, r, "rgba(244,244,244,.82)", "right", Y(e, 4.3, 4.7), !0);
		let D = X(Y(e, 4.5, 5.1)), O = _ + 40;
		D > 0 && (n.strokeStyle = G, n.lineWidth = 1.4, n.beginPath(), n.moveTo(y, O + .5), n.lineTo(y + (x - y) * D, O + .5), n.stroke(), n.fillStyle = G, n.beginPath(), n.arc(y, O + .5, 2.4, 0, 6.2832), n.fill(), D >= 1 && (n.beginPath(), n.arc(x, O + .5, 2.4, 0, 6.2832), n.fill())), d("−55 PARTICIPANTS", (y + x) / 2, O + 20, r, G, "center", Y(e, 4.9, 5.3)), d("TYPE I ERROR HELD AT 2.5%", 0, u - 6, r, K, "left", Y(e, 5.2, 5.6));
	}
	let p = matchMedia("(prefers-reduced-motion: reduce)").matches, m = !1, h = 0, g = !1, _ = 0, v = 0;
	function y() {
		let r = Math.min(devicePixelRatio || 1, 2);
		l = e.clientWidth, u = Math.round(Math.max(320, l / 1.15)), e.style.height = u + "px", t.width = Math.round(l * r), t.height = Math.round(u * r), n.setTransform(r, 0, 0, r, 0, 0), m && f(h);
	}
	function b(e) {
		h = Math.min(h + Math.min((e - v) / 1e3, .05), q), v = e, f(h), _ = h < q ? requestAnimationFrame(b) : 0;
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
		m = !0, p && (h = q), y(), !p && (T = new IntersectionObserver(([e]) => {
			e.isIntersecting ? !g && e.intersectionRatio >= .45 && x() : g && S();
		}, { threshold: [0, .45] }), T.observe(e));
	}), { destroy() {
		cancelAnimationFrame(_), _ = 0, w.disconnect(), T && T.disconnect(), t.remove(), delete e.dataset.pvReady;
	} };
}
var W, G, ie, K, ae, q, oe, J, Y, X, Z, Q, $, se = e((() => {
	W = "#F4F4F4", G = "#E2C70A", ie = "#C9C4EF", K = "rgba(244,244,244,.62)", ae = "rgba(244,244,244,.08)", q = 5.7, oe = 600, J = (e, t = 0, n = 1) => Math.max(t, Math.min(n, e)), Y = (e, t, n) => J((e - t) / (n - t)), X = (e) => e < .5 ? 4 * e * e * e : 1 - (-2 * e + 2) ** 3 / 2, Z = (e) => 1 - (1 - e) ** 3, Q = (e) => .955 - .05 * Math.exp(-(e - 574) / 60), $ = (() => {
		let e = ne(7), t = () => Math.sqrt(-2 * Math.log(e() + 1e-9)) * Math.cos(6.2832 * e()), n = [];
		for (let r = 0; r < 1600; r++) {
			let r = 500 + e() * 240, i = Q(r) - Math.abs(t()) * .028 - e() ** 2.2 * .12;
			r < 580 && i >= .899 && (i = .897 - e() * .012), n.push({
				n: r,
				p: Math.max(.725, i),
				d: e()
			});
		}
		return n;
	})();
})), ce = /* @__PURE__ */ t((() => {
	O(), te(), u(), se(), c(), document.querySelectorAll("[data-pv=\"trial-hero-bg\"]").forEach((e) => f(e)), document.querySelectorAll("[data-pv=\"success-design-space\"]").forEach((e) => j(e)), document.querySelectorAll("[data-pv=\"platform-connect\"]").forEach((e) => d(e)), document.querySelectorAll("[data-pv=\"design-space-glossy\"]").forEach((e) => re(e)), document.querySelectorAll("[data-pv=\"platform-connect-v2\"]").forEach((e) => l(e));
}));
//#endregion
export default ce();
