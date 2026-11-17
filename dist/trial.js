import { n as e, t } from "./rolldown-runtime-wf392T_D.mjs";
import { a as n, c as r, i, o as a, r as o, t as s } from "./hero-stage-DpBC6yvy.mjs";
import { n as c, t as l } from "./platform-connect-Dh9cewVn.mjs";
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
		m = I(m, 2, f - p - 2), d && (n.globalAlpha = u * .92, n.fillStyle = c, n.fillRect(m - 4, r - a - 1, p + 8, a + 5)), n.globalAlpha = u, n.fillStyle = o, n.textAlign = "left", n.fillText(e, m, r), n.globalAlpha = 1;
	}
	function d(e, t, r, i, a) {
		if (a <= 0) return;
		let o = e + (t - e) * a, s = Math.sign(t - e) || 1;
		n.strokeStyle = i, n.fillStyle = i, n.lineWidth = 1.25, n.beginPath(), n.moveTo(e, r + .5), n.lineTo(o, r + .5), n.stroke(), n.beginPath(), n.moveTo(o, r + .5), n.lineTo(o - s * 7, r - 3.5), n.lineTo(o - s * 7, r + 4.5), n.closePath(), n.fill();
	}
	let f = 0, p = 0;
	function m(e) {
		n.clearRect(0, 0, f, p);
		let t = f < F, r = t ? 9 : 10, i = f - 16, a = p - 56, o = i - 52, s = a - 48, m = (e) => 52 + (e - 490) / 260 * o, h = (e) => a - (e - .72) / .26 * s;
		l(400, r), n.fillStyle = N, n.textAlign = "right";
		for (let e of [
			.75,
			.8,
			.85,
			.9,
			.95
		]) {
			let t = Math.round(h(e)) + .5;
			n.fillText(Math.round(e * 100) + "%", 42, t + 3), n.strokeStyle = ee, n.globalAlpha = .6, n.beginPath(), n.moveTo(52, t), n.lineTo(i, t), n.stroke(), n.globalAlpha = 1;
		}
		n.textAlign = "center";
		for (let e = 500; e <= 750; e += 50) n.fillStyle = N, n.fillText(e, m(e), a + 18);
		n.textAlign = "left", n.strokeStyle = A, n.globalAlpha = .55, n.lineWidth = 1, n.beginPath(), n.moveTo(52.5, 48), n.lineTo(52.5, a + .5), n.lineTo(i, a + .5), n.stroke(), n.globalAlpha = 1, l(500, r);
		let g = n.measureText("EXPECTED SAMPLE SIZE").width;
		l(400, r);
		let _ = n.measureText("TYPE I ERROR HELD AT 2.5%").width + 12 > i - g, v = _ ? a + 34 : a + 40, y = _ ? p - 2 : p - 8;
		u("POWER", 0, 32, 500, r, N, "left", 1, !1), u("EXPECTED SAMPLE SIZE", i, v, 500, r, N, "right", 1, !1), u("CANDIDATE DESIGNS · SIMULATED", 52 + o / 2, 16, 500, r, A, "center", L(e, .1, .6), !1);
		let b = R(L(e, 2.7, 3.3)), x = t ? 1e3 : re.length;
		n.fillStyle = M;
		for (let t = 0; t < x; t++) {
			let r = re[t], i = te(L(e, .25 + r.d * 1.5, .7 + r.d * 1.5));
			if (i <= 0) continue;
			let a = r.p >= .9 ? i * (.5 + .3 * b) : i * .5 * (1 - .72 * b);
			n.globalAlpha = a, n.beginPath(), n.arc(m(r.n), h(r.p) - (1 - i) * 10, 2, 0, 6.2832), n.fill();
		}
		n.globalAlpha = 1;
		let S = h(.9), C = R(L(e, 2, 2.7));
		C > 0 && (n.strokeStyle = A, n.lineWidth = 1.25, n.beginPath(), n.moveTo(52, S), n.lineTo(52 + C * o, S), n.stroke()), u("TARGET 90%", 58, S - 8, 500, r, A, "left", L(e, 2.5, 2.9));
		let w = m(629), T = L(e, 3.3, 3.7);
		T > 0 && (n.globalAlpha = T, n.strokeStyle = A, n.lineWidth = 1.5, n.fillStyle = c, n.beginPath(), n.arc(w, S, 7, 0, 6.2832), n.fill(), n.stroke(), n.globalAlpha = 1), u("FIXED DESIGN · N 629", w + 12, S + 20, 500, r, A, "left", T);
		let E = m(574), D = h(.903), O = L(e, 3.9, 4.4);
		if (O > 0) {
			let e = ne(O);
			n.fillStyle = j, n.beginPath(), n.arc(E, D, 6 * e, 0, 6.2832), n.fill(), n.strokeStyle = A, n.lineWidth = 1.5, n.beginPath(), n.arc(E, D, 9.5 * e, 0, 6.2832), n.stroke();
		}
		u("ADAPTIVE DESIGN", E + 14, D - 30, 700, r, A, "left", L(e, 4.2, 4.6)), u("N 574 · POWER 90.3%", E + 14, D - 16, 400, r, A, "left", L(e, 4.3, 4.7)), d(w, E, S + 40, A, R(L(e, 4.5, 5.1))), u("−55 PARTICIPANTS", (w + E) / 2, S + 58, 700, r + 1, A, "center", L(e, 4.9, 5.3)), u("TYPE I ERROR HELD AT 2.5%", 0, y, 400, r, N, "left", L(e, 5.2, 5.6), !1);
	}
	let h = matchMedia("(prefers-reduced-motion: reduce)").matches, g = !1, _ = 0, v = !1, y = 0, b = 0;
	function x() {
		let r = Math.min(devicePixelRatio || 1, 2);
		f = e.clientWidth, p = Math.round(Math.max(320, f / 1.15)), e.style.height = p + "px", t.width = Math.round(f * r), t.height = Math.round(p * r), n.setTransform(r, 0, 0, r, 0, 0), g && m(_);
	}
	function S(e) {
		_ = Math.min(_ + Math.min((e - b) / 1e3, .05), P), b = e, m(_), y = _ < P ? requestAnimationFrame(S) : 0;
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
		g = !0, h && (_ = P), x(), !h && (D = new IntersectionObserver(([e]) => {
			e.isIntersecting ? !v && e.intersectionRatio >= .45 && C() : v && w();
		}, { threshold: [0, .45] }), D.observe(e));
	}), { destroy() {
		cancelAnimationFrame(y), y = 0, E.disconnect(), D && D.disconnect(), t.remove(), delete e.dataset.pvReady;
	} };
}
var A, j, M, N, ee, P, F, I, L, R, te, ne, re, ie = e((() => {
	A = "#141238", j = "#E2C70A", M = "#928ACD", N = "#7d7b9c", ee = "#d3d0e8", P = 5.7, F = 600, I = (e, t = 0, n = 1) => Math.max(t, Math.min(n, e)), L = (e, t, n) => I((e - t) / (n - t)), R = (e) => e < .5 ? 4 * e * e * e : 1 - (-2 * e + 2) ** 3 / 2, te = (e) => 1 - (1 - e) ** 3, ne = (e) => 1 + 2.70158 * (e - 1) ** 3 + 1.70158 * (e - 1) ** 2, re = (() => {
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
}));
//#endregion
//#region src/design-space-glossy.js
function ae(e) {
	return () => {
		e |= 0, e = e + 1831565813 | 0;
		let t = Math.imul(e ^ e >>> 15, 1 | e);
		return t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t, ((t ^ t >>> 14) >>> 0) / 4294967296;
	};
}
function oe(e) {
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
		f = ue(f, 8, l - d - 8), u && (n.globalAlpha = s * .82, n.fillStyle = "#141238", n.beginPath(), n.roundRect ? n.roundRect(f - 7, r - i - 4, d + 14, i + 10, 4) : n.rect(f - 7, r - i - 4, d + 14, i + 10), n.fill()), n.globalAlpha = s, n.fillStyle = a, n.textAlign = "left", n.fillText(e, f, r), n.globalAlpha = 1;
	}
	function f(e) {
		n.clearRect(0, 0, l, u);
		let t = l < le, r = t ? 9 : 10, i = l - 12, a = u - 52, o = i - 48, s = a - 44, f = (e) => 48 + (e - 490) / 260 * o, p = (e) => a - (e - .72) / .26 * s;
		c(400, r), n.textAlign = "right";
		for (let e of [.8, .9]) {
			let t = Math.round(p(e)) + .5;
			n.fillStyle = V, n.fillText(Math.round(e * 100) + "%", 38, t + 3), n.strokeStyle = ce, n.lineWidth = 1, n.beginPath(), n.moveTo(48, t), n.lineTo(i, t), n.stroke();
		}
		n.textAlign = "center", n.fillStyle = V;
		for (let e = 500; e <= 750; e += 50) n.fillText(e, f(e), a + 18);
		n.strokeStyle = "rgba(244,244,244,.16)", n.beginPath(), n.moveTo(48, a + .5), n.lineTo(i, a + .5), n.stroke(), d("POWER", 0, 28, r, V), d("EXPECTED SAMPLE SIZE", i, a + 38, r, V, "right"), d("CANDIDATE DESIGNS · SIMULATED", 48, 14, r, z, "left", U(e, .1, .6));
		let m = W(U(e, 1.6, 2.6));
		if (m > 0) {
			let e = 548 + 202 * m;
			n.beginPath();
			for (let t = 548; t <= e; t += 2) {
				let e = f(t), r = p(G(t));
				t === 548 ? n.moveTo(e, r) : n.lineTo(e, r);
			}
			n.lineTo(f(e), a), n.lineTo(f(548), a), n.closePath();
			let t = n.createLinearGradient(0, p(.96), 0, a);
			t.addColorStop(0, "rgba(244,244,244,.16)"), t.addColorStop(1, "rgba(244,244,244,0)"), n.fillStyle = t, n.fill(), n.beginPath();
			for (let t = 548; t <= e; t += 2) {
				let e = f(t), r = p(G(t));
				t === 548 ? n.moveTo(e, r) : n.lineTo(e, r);
			}
			n.strokeStyle = z, n.lineWidth = 1.6, n.stroke();
		}
		let h = W(U(e, 2.7, 3.3)), g = t ? 1e3 : fe.length;
		n.save(), n.globalCompositeOperation = "lighter", n.fillStyle = se;
		for (let t = 0; t < g; t++) {
			let r = fe[t], i = de(U(e, .25 + r.d * 1.5, .7 + r.d * 1.5));
			if (i <= 0) continue;
			let a = r.p >= .9 ? i * (.32 + .22 * h) : i * .3 * (1 - .75 * h);
			n.globalAlpha = a, n.beginPath(), n.arc(f(r.n), p(r.p) - (1 - i) * 10, 1.7, 0, 6.2832), n.fill();
		}
		n.restore();
		let _ = p(.9), v = W(U(e, 2, 2.7));
		v > 0 && (n.save(), n.setLineDash([4, 5]), n.strokeStyle = "rgba(244,244,244,.45)", n.lineWidth = 1, n.beginPath(), n.moveTo(48, _ + .5), n.lineTo(48 + v * o, _ + .5), n.stroke(), n.restore()), d("TARGET 90%", 54, _ - 8, r, V, "left", U(e, 2.5, 2.9));
		let y = f(629), b = U(e, 3.3, 3.7);
		b > 0 && (n.globalAlpha = b, n.strokeStyle = "rgba(244,244,244,.75)", n.lineWidth = 1.25, n.beginPath(), n.arc(y, _, 6, 0, 6.2832), n.stroke(), n.globalAlpha = 1), d("FIXED · N 629", y + 12, _ + 20, r, V, "left", b);
		let x = f(574), S = p(.903), C = de(U(e, 3.9, 4.5));
		if (C > 0) {
			n.fillStyle = B, n.beginPath(), n.arc(x, S, 5 * C, 0, 6.2832), n.fill();
			let e = 13 * C;
			for (let t = 0; t < 22; t++) {
				let r = t / 22 * 6.2832 - 1.5708;
				n.globalAlpha = C * (.45 + .45 * (t / 22 < C)), n.beginPath(), n.arc(x + Math.cos(r) * e, S + Math.sin(r) * e, 1.1, 0, 6.2832), n.fill();
			}
			n.globalAlpha = 1;
		}
		let w = U(e, 4.2, 4.6), T = x - 26, E = S - 50;
		w > 0 && (n.globalAlpha = w * .6, n.strokeStyle = z, n.lineWidth = 1, n.beginPath(), n.moveTo(x - 11, S - 11), n.lineTo(T + 4, E + 16), n.stroke(), n.globalAlpha = 1), d("ADAPTIVE DESIGN", T, E - 16, r, z, "right", w, !0), d("N 574 · POWER 90.3%", T, E, r, "rgba(244,244,244,.82)", "right", U(e, 4.3, 4.7), !0);
		let D = W(U(e, 4.5, 5.1)), O = _ + 40;
		D > 0 && (n.strokeStyle = B, n.lineWidth = 1.4, n.beginPath(), n.moveTo(y, O + .5), n.lineTo(y + (x - y) * D, O + .5), n.stroke(), n.fillStyle = B, n.beginPath(), n.arc(y, O + .5, 2.4, 0, 6.2832), n.fill(), D >= 1 && (n.beginPath(), n.arc(x, O + .5, 2.4, 0, 6.2832), n.fill())), d("−55 PARTICIPANTS", (y + x) / 2, O + 20, r, B, "center", U(e, 4.9, 5.3)), d("TYPE I ERROR HELD AT 2.5%", 0, u - 6, r, V, "left", U(e, 5.2, 5.6));
	}
	let p = matchMedia("(prefers-reduced-motion: reduce)").matches, m = !1, h = 0, g = !1, _ = 0, v = 0;
	function y() {
		let r = Math.min(devicePixelRatio || 1, 2);
		l = e.clientWidth, u = Math.round(Math.max(320, l / 1.15)), e.style.height = u + "px", t.width = Math.round(l * r), t.height = Math.round(u * r), n.setTransform(r, 0, 0, r, 0, 0), m && f(h);
	}
	function b(e) {
		h = Math.min(h + Math.min((e - v) / 1e3, .05), H), v = e, f(h), _ = h < H ? requestAnimationFrame(b) : 0;
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
		m = !0, p && (h = H), y(), !p && (T = new IntersectionObserver(([e]) => {
			e.isIntersecting ? !g && e.intersectionRatio >= .45 && x() : g && S();
		}, { threshold: [0, .45] }), T.observe(e));
	}), { destroy() {
		cancelAnimationFrame(_), _ = 0, w.disconnect(), T && T.disconnect(), t.remove(), delete e.dataset.pvReady;
	} };
}
var z, B, se, V, ce, H, le, ue, U, W, de, G, fe, pe = e((() => {
	z = "#F4F4F4", B = "#E2C70A", se = "#C9C4EF", V = "rgba(244,244,244,.62)", ce = "rgba(244,244,244,.08)", H = 5.7, le = 600, ue = (e, t = 0, n = 1) => Math.max(t, Math.min(n, e)), U = (e, t, n) => ue((e - t) / (n - t)), W = (e) => e < .5 ? 4 * e * e * e : 1 - (-2 * e + 2) ** 3 / 2, de = (e) => 1 - (1 - e) ** 3, G = (e) => .955 - .05 * Math.exp(-(e - 574) / 60), fe = (() => {
		let e = ae(7), t = () => Math.sqrt(-2 * Math.log(e() + 1e-9)) * Math.cos(6.2832 * e()), n = [];
		for (let r = 0; r < 1600; r++) {
			let r = 500 + e() * 240, i = G(r) - Math.abs(t()) * .028 - e() ** 2.2 * .12;
			r < 580 && i >= .899 && (i = .897 - e() * .012), n.push({
				n: r,
				p: Math.max(.725, i),
				d: e()
			});
		}
		return n;
	})();
}));
//#endregion
//#region src/platform-connect-cards.js
function me(e) {
	if (e < be) return [null, 0];
	let t = ve.length * ye, n = (e - be) % t / ye, r = Math.floor(n);
	return [ve[r], n - r];
}
function he(e) {
	if (e.dataset.pvReady) return;
	let t = e.dataset.current;
	if (!ge[t]) {
		console.warn("[pv] platform-connect : data-current manquant ou inconnu (" + t + "), attendu " + _e.join(" | "));
		return;
	}
	e.dataset.pvReady = "1";
	let n = (t) => e.dataset["name" + t[0].toUpperCase() + t.slice(1)] || ge[t], r = [t, ..._e.filter((e) => e !== t)];
	e.style.cssText += "position:relative;width:100%;aspect-ratio:1.2/1;";
	let i = document.createElement("canvas");
	i.style.cssText = "position:absolute;inset:0;width:100%;height:100%;display:block;", i.setAttribute("role", "img"), i.setAttribute("aria-label", `PhaseV platform: ${n(t)} at the center, exchanging data with the four other PhaseV products.`), e.appendChild(i);
	let a = i.getContext("2d"), o = (e.closest("section") || document.body).querySelector(".text-size-label"), s = o ? getComputedStyle(o) : null, c = s ? s.fontFamily : "Aspekta, Arial, sans-serif", l = s && s.letterSpacing !== "normal" ? (parseFloat(s.letterSpacing) || 0) / (parseFloat(s.fontSize) || 16) : .08, u = "letterSpacing" in a;
	function d(e, t) {
		a.font = `${e} ${t}px ${c}`, u && (a.letterSpacing = (l * t).toFixed(2) + "px");
	}
	function f(e, t, n, r, i) {
		a.beginPath(), a.roundRect ? a.roundRect(e, t, n, r, i) : a.rect(e, t, n, r);
	}
	function p(e, t, n, r, i, o) {
		let s = i ? "rgba(255,255,255,.42)" : `rgba(${q},.95)`, c = i ? "#ffffff" : "#141238", l = (e, t, n, r) => {
			a.beginPath(), a.arc(e, t, n, 0, 6.283), a.fillStyle = r, a.fill();
		}, u = t - r / 2, d = n - r / 2, p = Math.max(.8, r * .045);
		if (e === "trial") {
			for (let e = 1; e < 6; e++) {
				let t = ($(e) - .5) * 2, i = 2 + $(e + 9) * 4;
				for (let e = 0; e <= 12; e++) {
					let a = e / 12;
					l(u + a * r, n + r * .3 - a * r * .45 + a * r * (.32 * t + .08 * Math.sin(i * a * 3)), p * .8, s);
				}
			}
			a.beginPath();
			for (let e = 0; e <= 30 * o; e++) {
				let t = e / 30, i = u + t * r, o = n + r * .3 - t * r * .45;
				e ? a.lineTo(i, o) : a.moveTo(i, o);
			}
			a.strokeStyle = c, a.lineWidth = Math.max(1.5, r * .07), a.lineCap = "round", a.stroke();
		} else if (e === "portfolio") {
			let e = [
				1,
				.78,
				.6,
				.44,
				.3
			], n = r * .12, i = r * .085;
			e.forEach((e, l) => {
				let u = r * e * (.25 + .75 * Q(X(o * 1.4 - l * .1))), p = d + r * .04 + l * (n + i);
				f(t - u / 2, p, u, n, n / 2), a.fillStyle = l < 2 ? c : s, a.fill();
			});
		} else if (e === "response") {
			let e = r * .06 * Q(o);
			for (let i = 0; i < 26; i++) {
				let a = i < 11, o = $(i + 3) * 6.283, u = Math.sqrt($(i + 40)) * (a ? .2 : .24);
				l(t + Math.cos(o) * u * r * 1.5, n + (a ? -.13 : .13) * r + (a ? -e : e) + Math.sin(o) * u * r * .75, p, a ? c : s);
			}
		} else if (e === "clinops") {
			let e = r / 6;
			for (let t = 0; t < 7; t++) for (let n = 0; n < 7; n++) {
				let r = t / 6 - .5, i = n / 6 - .5;
				Math.hypot(r * 1.1 + .05 * Math.sin(n * 2), i * 1.4) < .5 + .08 * $(t * 7 + n) && l(u + t * e, d + n * e, p * .8, s);
			}
			[
				[.3, .35],
				[.62, .55],
				[.45, .78]
			].forEach(([e, t], n) => {
				let f = X(o * 3 - n), m = u + e * r, h = d + t * r;
				f > 0 && (a.beginPath(), a.arc(m, h, r * (.08 + .1 * f), 0, 6.283), a.strokeStyle = i ? `rgba(255,255,255,${.5 * (1 - f) + .15})` : `rgba(${K},${.4 * (1 - f) + .12})`, a.lineWidth = 1, a.stroke()), l(m, h, p * 1.7, f > 0 ? c : s);
			});
		} else for (let e = 0; e < 3; e++) {
			let t = u + e * r * .2, n = d + e * r * .14, l = r * .6, p = r * .72;
			f(t, n, l, p, r * .06), a.fillStyle = i ? "#141238" : "#fff", a.fill(), a.strokeStyle = s, a.lineWidth = 1, a.stroke();
			for (let s = 0; s < 4; s++) a.fillStyle = s === 2 && o * 3 > e ? c : i ? "rgba(255,255,255,.22)" : `rgba(${q},.45)`, a.fillRect(t + l * .16, n + p * (.2 + s * .18), l * (s === 3 ? .4 : .68), Math.max(1.2, r * .045));
		}
	}
	function m(e, t) {
		let n = (e[1] + t[1]) / 2;
		return (r) => {
			let i = 1 - r;
			return [i * i * i * e[0] + 3 * i * i * r * e[0] + 3 * i * r * r * t[0] + r * r * r * t[0], i * i * i * e[1] + 3 * i * i * r * n + 3 * i * r * r * n + r * r * r * t[1]];
		};
	}
	function h(e, t, n, r = 48) {
		a.beginPath();
		for (let i = 0; i <= r; i++) {
			let [o, s] = e(t + (n - t) * i / r);
			i ? a.lineTo(o, s) : a.moveTo(o, s);
		}
	}
	let g = 0, _ = 0;
	function v(e) {
		a.clearRect(0, 0, g, _);
		let t = Math.min(g, _), i = g < 420 ? 9 : 11, [o, s] = me(e), c = o ? o[0] : -1, l = o ? o[1] : -1, u = o ? c || l : -1, v = o ? Math.min(Z(s, 0, .1), 1 - Z(s, .88, 1)) : 0, y = o ? Z(s, .6, .72) * (1 - Z(s, .78, 1)) : 0, b = t / 20;
		a.fillStyle = `rgba(${K},.07)`;
		for (let e = b / 2; e < _; e += b) for (let t = b / 2; t < g; t += b) a.beginPath(), a.arc(t, e, .9, 0, 6.283), a.fill();
		let x = [
			t * .44,
			t * .33,
			t * .33,
			t * .33,
			t * .33
		], S = [
			t * .27,
			t * .15,
			t * .15,
			t * .15,
			t * .15
		], C = Y.map(([n, r], i) => {
			let a = Se(Z(e, .05 + i * .1, .65 + i * .1)), o = (i === u ? v : 0) * t * .012 + (i === l ? y * t * .006 : 0);
			return [
				n * g,
				r * _ + (1 - a) * t * .05 + Math.sin(e * .7 + i * 1.9) * t * .005 - o,
				a
			];
		}), w = (e) => [C[e][0], C[e][1] + (Y[e][1] < .5 ? 1 : -1) * S[e] / 2], T = (e) => [C[0][0] + (Y[e][0] < .5 ? -1 : 1) * x[0] * .3, C[0][1] + (Y[e][1] < .5 ? -1 : 1) * S[0] / 2], E = Q(Z(e, .6, 1.5));
		for (let t = 1; t < 5; t++) {
			let n = m(w(t), T(t)), i = t === u ? v : 0, o = J[r[t]];
			if (h(n, 0, E), a.setLineDash([2, 5]), a.lineDashOffset = -e * 10, a.strokeStyle = `rgba(${K},.28)`, a.lineWidth = 1, a.stroke(), a.setLineDash([]), i > 0) {
				let e = w(t), r = T(t), s = a.createLinearGradient(e[0], e[1], r[0], r[1]);
				s.addColorStop(0, `rgba(${o},${i})`), s.addColorStop(1, `rgba(${q},${i})`), h(n, 0, 1), a.strokeStyle = s, a.lineWidth = 2, a.stroke();
			}
			[w(t), T(t)].forEach(([e, t]) => {
				a.beginPath(), a.arc(e, t, 4, 0, 6.283), a.fillStyle = "#fff", a.fill(), a.strokeStyle = i > 0 ? `rgba(${q},${.5 + i * .5})` : `rgba(${K},.3)`, a.lineWidth = 1.25, a.stroke();
			});
		}
		if (o) {
			let e = m(w(u), T(u)), t = c === 0 ? -1 : 1, n = J[r[u]];
			for (let r = 0; r < 6; r++) {
				let i = Z(s, .1 + r * .05, .62 + r * .05);
				if (i <= 0 || i >= 1) continue;
				let o = Q(i), c = t > 0 ? o : 1 - o, l = X(c - t * .09);
				h(e, Math.min(l, c), Math.max(l, c), 12);
				let [u, d] = e(l), [f, p] = e(c), m = a.createLinearGradient(u, d, f, p);
				m.addColorStop(0, `rgba(${n},0)`), m.addColorStop(1, `rgba(${n},.9)`), a.strokeStyle = m, a.lineWidth = r ? 2.5 : 3.5, a.stroke(), a.save(), a.shadowColor = `rgba(${n},.9)`, a.shadowBlur = 12, a.beginPath(), a.arc(f, p, r ? 2.8 : 4, 0, 6.283), a.fillStyle = "#fff", a.fill(), a.lineWidth = 2, a.strokeStyle = `rgba(${n},1)`, a.stroke(), a.restore();
			}
		}
		for (let c = 0; c < 5; c++) {
			let [m, h, g] = C[c];
			if (g <= 0) continue;
			let _ = r[c], b = J[_], w = x[c], T = S[c], E = t * .028, D = c === 0, O = c === u ? v : 0, k = c === l ? y : 0;
			if (a.globalAlpha = X(g), a.save(), a.shadowColor = `rgba(${K},${.1 + O * .08})`, a.shadowBlur = 26 + O * 14, a.shadowOffsetY = 10 + O * 6, f(m - w / 2, h - T / 2, w, T, E), a.fillStyle = D ? "#141238" : "#fff", a.fill(), a.restore(), D) {
				a.save(), f(m - w / 2, h - T / 2, w, T, E), a.clip();
				let e = a.createRadialGradient(m - w * .3, h - T * .6, 0, m - w * .3, h - T * .6, w * .8);
				e.addColorStop(0, `rgba(${q},${.45 + k * .3})`), e.addColorStop(1, `rgba(${q},0)`), a.fillStyle = e, a.fillRect(m - w / 2, h - T / 2, w, T), a.restore();
			}
			if (f(m - w / 2, h - T / 2, w, T, E), a.strokeStyle = D ? `rgba(255,255,255,${.12 + k * .5})` : k || O ? `rgba(${b},${.5 + Math.max(k, O) * .5})` : `rgba(${K},.08)`, a.lineWidth = 1 + Math.max(k, O) * 1.5, a.stroke(), k > 0) {
				let e = Z(s, .6, .9), n = e * t * .04;
				f(m - w / 2 - n, h - T / 2 - n, w + n * 2, T + n * 2, E + n), a.strokeStyle = `rgba(${q},${(1 - e) * .6})`, a.lineWidth = 1.5, a.stroke();
			}
			let A = T * (D ? .18 : .2), j = D ? T * .22 : T * .34, M = m - w / 2 + A, N = D ? h - T / 2 + A : h - j * .85;
			f(M, N, j * 1.7, j * 1.7, j * .4), a.fillStyle = D ? "rgba(255,255,255,.08)" : `rgba(${b},${.16 + O * .14})`, a.fill();
			let ee = D ? l === 0 ? Q(Z(s, .62, .95)) : 1 : c === u ? Q(Z(s, .05, .6)) : 1;
			p(_, M + j * .85, N + j * .85, j * 1.1, D, ee);
			let [P, F] = n(_).split(/ (?=OPTIMIZER|CONDUCTOR)/);
			d(D ? 700 : 600, D ? i + 2 : i), a.fillStyle = D ? "#fff" : "#141238", a.textBaseline = "middle";
			let I = M + j * 1.7 + A * .7, L = N + j * .85;
			F ? (a.fillText(P, I, L - i * .72), a.globalAlpha = X(g) * .55, a.fillText(F, I, L + i * .78), a.globalAlpha = X(g)) : a.fillText(P, I, L), a.textBaseline = "alphabetic";
			let R = m + w / 2 - A * .9, te = h - T / 2 + A * .9, ne = O ? .5 + .5 * Math.sin(e * 14) : 0;
			if (a.beginPath(), a.arc(R, te, 3.2, 0, 6.283), a.fillStyle = O || D && o ? `rgba(${D ? "127,232,207" : b},${.6 + ne * .4})` : `rgba(${D ? "255,255,255" : K},.18)`, a.fill(), D) {
				let e = m - w / 2 + A, t = w - A * 2, n = h + T / 2 - A * .9, r = T * .34;
				a.strokeStyle = "rgba(255,255,255,.12)", a.lineWidth = 1, a.beginPath(), a.moveTo(e, n), a.lineTo(e + t, n), a.stroke();
				let i = (e, t) => n - r * (1 - Math.exp(-t * (2.2 + e * 1.1))) * (.7 + e * .12);
				for (let n = 0; n < 3; n++) {
					let r = n === 2 && l === 0 ? .25 + .75 * Z(s, .62, .95) : 1;
					a.beginPath();
					for (let o = 0; o <= 30; o++) {
						let s = o / 30 * r;
						o ? a.lineTo(e + s * t, i(n, s)) : a.moveTo(e, i(n, 0));
					}
					a.strokeStyle = n === 2 ? `rgba(${q},1)` : "rgba(255,255,255,.22)", a.lineWidth = n === 2 ? 2 : 1.25, a.stroke();
				}
			} else {
				let e = m - w / 2 + A, t = h + T / 2 - A * .75;
				[.55, .3].forEach((n, r) => {
					f(e + r * w * .6, t - 2, (w - A * 2) * n, 4, 2), a.fillStyle = `rgba(${K},.07)`, a.fill();
				});
			}
			a.globalAlpha = 1;
		}
	}
	let y = matchMedia("(prefers-reduced-motion: reduce)").matches, b = !1, x = 0, S = 0, C = 0;
	function w() {
		let t = Math.min(devicePixelRatio || 1, 2);
		g = e.clientWidth, _ = e.clientHeight, i.width = Math.round(g * t), i.height = Math.round(_ * t), a.setTransform(t, 0, 0, t, 0, 0), b && v(y ? xe : x);
	}
	function T(e) {
		S = requestAnimationFrame(T), x += Math.min((e - C) / 1e3, .05), C = e, v(x);
	}
	function E() {
		S || y || (C = performance.now(), S = requestAnimationFrame(T));
	}
	function D() {
		cancelAnimationFrame(S), S = 0;
	}
	let O = new ResizeObserver(w);
	O.observe(e);
	let k = null;
	return (document.fonts ? Promise.race([document.fonts.load(`600 11px ${c}`), new Promise((e) => setTimeout(e, 3e3))]) : Promise.resolve()).then(() => {
		b = !0, w(), !y && (k = new IntersectionObserver(([e]) => e.isIntersecting ? E() : D(), { threshold: .3 }), k.observe(e));
	}), { destroy() {
		D(), O.disconnect(), k && k.disconnect(), i.remove(), delete e.dataset.pvReady;
	} };
}
var K, q, ge, _e, J, ve, ye, be, xe, Y, X, Z, Q, Se, $, Ce = e((() => {
	K = "20,18,56", q = "146,138,205", ge = {
		portfolio: "PORTFOLIO OPTIMIZER",
		trial: "TRIAL OPTIMIZER",
		response: "RESPONSE OPTIMIZER",
		clinops: "CLINOPS OPTIMIZER",
		conductor: "AI CONDUCTOR"
	}, _e = [
		"portfolio",
		"trial",
		"response",
		"clinops",
		"conductor"
	], J = {
		trial: q,
		portfolio: q,
		response: "120,168,224",
		clinops: "127,232,207",
		conductor: "104,74,158"
	}, ve = [
		[1, 0],
		[0, 3],
		[2, 0],
		[0, 4],
		[3, 0],
		[0, 1],
		[4, 0],
		[0, 2]
	], ye = 2.6, be = 1.8, xe = 3.2300000000000004, Y = [
		[.5, .5],
		[.19, .14],
		[.81, .14],
		[.19, .86],
		[.81, .86]
	], X = (e, t = 0, n = 1) => Math.max(t, Math.min(n, e)), Z = (e, t, n) => X((e - t) / (n - t)), Q = (e) => e < .5 ? 4 * e * e * e : 1 - (-2 * e + 2) ** 3 / 2, Se = (e) => 1 + 2.6 * (e - 1) ** 3 + 1.6 * (e - 1) ** 2, $ = (e) => {
		let t = Math.sin(e * 127.1 + 311.7) * 43758.5453;
		return t - Math.floor(t);
	};
})), we = /* @__PURE__ */ t((() => {
	E(), ie(), c(), pe(), Ce(), document.querySelectorAll("[data-pv=\"trial-hero-bg\"]").forEach((e) => u(e)), document.querySelectorAll("[data-pv=\"success-design-space\"]").forEach((e) => k(e)), document.querySelectorAll("[data-pv=\"platform-connect\"]").forEach((e) => l(e)), document.querySelectorAll("[data-pv=\"design-space-glossy\"]").forEach((e) => oe(e)), document.querySelectorAll("[data-pv=\"platform-connect-v2\"]").forEach((e) => he(e));
}));
//#endregion
export default we();
