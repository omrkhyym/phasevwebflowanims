import { n as e, t } from "./rolldown-runtime-wf392T_D.mjs";
import { d as n, f as r, h as i, i as a, l as o, m as s, n as c, o as l, p as u, r as d, s as f, t as p, u as m, v as h } from "./bonv-draw-Db5acgQk.mjs";
import { a as g, c as _, i as v, l as y, n as b, r as x, s as S, t as C } from "./hero-stage-DpBC6yvy.mjs";
import { n as w, t as T } from "./cond-roles-C9a4ANms.mjs";
//#region src/bonv-hero-bg.js
function E(e) {
	if (!e || e.dataset.pvInit) return;
	let t = S(7), n = [];
	for (let e = 0; e < M; e++) {
		let r = e === 5 ? 6.2 : j - t() * 1.8, i = 0;
		for (; i < r;) {
			let a = Math.min(.45 + t() * t() * 2.3, r - i);
			if (a < .35) break;
			n.push({
				x: i,
				w: a,
				row: e,
				t: 0,
				pts: []
			}), i += a + .27;
		}
	}
	let r = 0;
	n.forEach((e) => {
		e.t = r, r += .09 + e.w * .05;
	}), n.forEach((e) => e.t = F + e.t / r * I);
	let i = n[n.length - 1];
	n.forEach((e) => {
		let n = Math.round(e.w * ee);
		for (let r = 0; r < n; r++) {
			let n = t();
			e.pts.push({
				x: e.x + t() * e.w,
				y: e.row * N + (t() - .5) * P,
				ox: .25 + t() * .9,
				oy: (t() - .5) * .16,
				s: n,
				tint: Math.min(2, Math.floor((n * .5 + e.x * .13 % 1 * .5) * re))
			});
		}
	});
	let a = [...Array(110)].map(() => ({
		x: (t() - .5) * .045,
		y: (t() - .5) * .6,
		s: t()
	})), o = 1, s = /* @__PURE__ */ new Map(), c = 1;
	function l(e) {
		let t = e.join(","), n = s.get(t);
		if (!n) {
			let e = Math.ceil((o + 1) * 2 * c);
			n = document.createElement("canvas"), n.width = n.height = e;
			let r = n.getContext("2d");
			r.fillStyle = `rgb(${t})`, r.beginPath(), r.arc(e / 2, e / 2, o * c, 0, C), r.fill(), s.set(t, n);
		}
		return n;
	}
	let u = 1, d = 0, f = 0;
	function p({ W: e, H: t, flow: n }) {
		u = n ? e * .88 / j : e * .42 / j, d = n ? e * .06 : e * .53, f = t * .5 - te / 2 * u, o = Math.max(.75, u * .028), c = Math.min(devicePixelRatio || 1, 2), s = /* @__PURE__ */ new Map();
	}
	function m(e, t) {
		let { ctx: r, W: s, H: c, mouse: p } = e, m = t % z;
		r.clearRect(0, 0, s, c);
		let h = x(_(m, L, 7.5)), g = 1 - x(_(m, R, 10.6));
		if (g <= 0) return;
		let v = o + 1, S = v * 2, w = -.14, T = 0;
		for (let a of n) {
			if (a.t > m) break;
			w = a.x + a.w + .13, T = a.row * N;
			let n = y(.1, 1.5, m - a.t), o = Math.round(n * B) / B, s = a === i, c = a.row / 5 * 2 - 1, _ = c * 14 * p.x, C = c * 14 * p.y, E = [...Array(re)].map((e, t) => {
				let n = V(A, V(D, O, t / 2), o);
				return s && (n = V(n, k, Math.round(h * B) / B)), l(n);
			}), j = (.95 + -.35 * n) * g * (s ? 1 : 1 - .4 * h), M = s ? .98 * g : 0;
			for (let n of a.pts) {
				let i = x(b((m - a.t - n.s * .1) / .42));
				if (i <= 0) continue;
				let o = d + (n.x + n.ox * (1 - i)) * u + _, c = f + (n.y + n.oy * (1 - i) + Math.sin(t * .5 + n.s * 70) * .004) * u + C, l = i * (s ? j + (M - j) * h : j) * e.fade(o);
				l <= .003 || (r.globalAlpha = l, r.drawImage(E[n.tint], o - v, c - v, S, S));
			}
		}
		let E = (m > F && m < 6.1000000000000005 ? 1 : .5 + .5 * Math.cos(m * C * .9)) * (1 - _(m, L, 7.5)) * .9 * g;
		if (E > .003) {
			let t = l(A);
			for (let n of a) {
				let i = d + (w + n.x) * u, a = f + (T + n.y) * u;
				r.globalAlpha = E * e.fade(i), r.drawImage(t, i - v, a - v, S, S);
			}
		}
		r.globalAlpha = 1;
	}
	return g(e, {
		name: "bonv",
		draw: m,
		still: ne,
		onResize: p
	});
}
var D, O, k, A, j, M, N, P, ee, te, F, I, L, R, z, ne, re, B, V, ie = e((() => {
	v(), D = [
		146,
		138,
		205
	], O = [
		120,
		168,
		224
	], k = [
		226,
		199,
		10
	], A = [
		237,
		235,
		255
	], j = 13, M = 6, N = 1, P = .1, ee = 55, te = 5, F = .7, I = 5.4, L = 6.7, R = 9.4, z = 11, ne = 8.2, re = 3, B = 8, V = (e, t, n) => [
		0,
		1,
		2
	].map((r) => Math.round(e[r] + (t[r] - e[r]) * n));
}));
//#endregion
//#region src/bonv-answer.js
function ae(e) {
	let t = parseInt(e.slice(1), 16);
	return [
		t >> 16 & 255,
		t >> 8 & 255,
		t & 255
	];
}
function H(e, t) {
	let n = ae(e);
	return `rgba(${n[0]},${n[1]},${n[2]},${q(t)})`;
}
function U(e) {
	if (e.dataset.pvInit) return;
	e.dataset.pvInit = "1";
	let t = (t) => ((e.querySelector(`[data-role="${t}"]`) || {}).textContent || "").trim(), n = t("question"), r = t("ask-label").toUpperCase(), i = t("result").toUpperCase(), a = t("approve"), o = [...e.querySelectorAll("[data-role=\"targets\"] li")].slice(0, 3).map((e) => e.textContent.trim().toUpperCase()), s = e.closest("section") || document.body, c = (e) => getComputedStyle(s.querySelector(e) || document.body).fontFamily, l = c(".text-size-large"), u = c(".text-size-label");
	e.style.position = "relative";
	let d = document.createElement("canvas");
	d.setAttribute("aria-hidden", "true"), d.style.cssText = "position:absolute;inset:0;width:100%;height:100%;display:block;z-index:1;transition:opacity .5s ease;", e.appendChild(d);
	let f = d.getContext("2d"), p = "letterSpacing" in f;
	function m(e, t, n) {
		f.font = `${e} ${t}px ${n ? u : l}`, p && (f.letterSpacing = n ? (t * .12).toFixed(2) + "px" : "0px");
	}
	function h(e, t, n, r, i, a, o, s = "left", c = !1) {
		o <= 0 || !e || (m(r, i, c), f.textAlign = s, f.textBaseline = "alphabetic", f.fillStyle = H(a, o), f.fillText(e, t, n));
	}
	function g(e, t, n, r) {
		return m(t, n, r), f.measureText(e).width;
	}
	function _(e, t, n, r, i) {
		m(t, n, i);
		let a = [], o = "";
		for (let t of e.split(" ")) {
			let e = o ? o + " " + t : t;
			f.measureText(e).width > r && o ? (a.push(o), o = t) : o = e;
		}
		return o && a.push(o), a;
	}
	function v(e, t, n, r, i) {
		i <= 0 || n <= 0 || (f.fillStyle = H(r, i), f.beginPath(), f.arc(e, t, n, 0, G), f.fill());
	}
	function y(e, t, n, r) {
		if (!(e.length < 2 || n <= 0)) {
			f.strokeStyle = H(t, n), f.lineWidth = r, f.lineCap = "round", f.beginPath(), f.moveTo(e[0][0], e[0][1]);
			for (let t = 1; t < e.length; t++) f.lineTo(e[t][0], e[t][1]);
			f.stroke();
		}
	}
	function b(e, t, n, r, i = 24) {
		let a = (e[0] + t[0]) / 2, o = (e[1] + t[1]) / 2, s = t[0] - e[0], c = a - (t[1] - e[1]) * n, l = o + s * n, u = [], d = Math.max(2, Math.ceil(i * r));
		for (let n = 0; n <= d; n++) {
			let i = r * n / d, a = 1 - i;
			u.push([a * a * e[0] + 2 * a * i * c + i * i * t[0], a * a * e[1] + 2 * a * i * l + i * i * t[1]]);
		}
		return u;
	}
	function x(e, t, n, r) {
		let i = t[0] - e[0], a = t[1] - e[1], o = Math.hypot(i, a) || 1, s = i / o, c = a / o;
		return [[e[0] + s * n, e[1] + c * n], [t[0] - s * r, t[1] - c * r]];
	}
	function S(e, t, n, r, i, a = i) {
		f.beginPath(), f.moveTo(e + a, t), f.arcTo(e + n, t, e + n, t + r, i), f.arcTo(e + n, t + r, e, t + r, i), f.arcTo(e, t + r, e, t, i), f.arcTo(e, t, e + n, t, a), f.closePath();
	}
	function C(e, t, n, r, i, a, o) {
		if (a <= 0) return;
		f.save(), f.globalAlpha = a, S(e, t, n, r, i, o);
		let s = f.createLinearGradient(e, t, e + n * .9, t + r);
		s.addColorStop(0, "rgba(150,110,200,.18)"), s.addColorStop(.5, "rgba(90,60,150,.15)"), s.addColorStop(1, "rgba(40,24,80,.34)"), f.fillStyle = s, f.fill();
		let c = f.createLinearGradient(e, t, e + n, t + r);
		c.addColorStop(0, "rgba(244,244,244,.3)"), c.addColorStop(.4, "rgba(244,244,244,.07)"), c.addColorStop(.75, "rgba(244,244,244,.03)"), c.addColorStop(1, "rgba(214,170,240,.14)"), f.strokeStyle = c, f.lineWidth = 1, f.stroke(), f.restore();
	}
	function w(e, t, n, r, i, a) {
		if (n <= 0 || e.length < 2 || (f.save(), f.setLineDash([1, 7 * N]), f.lineDashOffset = -r * 28 * N, y(e, t, n, 2.2 * N), f.restore(), i <= 0)) return;
		let o = e.length - 1, s = (r + a * .53) / 1.5 % 1;
		for (let r = 0; r < 5; r++) {
			let a = s - r * .02;
			if (a < 0 || a > 1) continue;
			let c = e[Math.min(o, Math.floor(X(a) * o))];
			v(c[0], c[1], (3.2 - r * .5) * N, r ? t : W, i * Math.min(1, n * 1.6) * (1 - r / 5) * Math.min(1, Math.sin(Math.PI * a) * 3));
		}
	}
	let T = [[new Path2D("M7 9 V41 H43"), .4], [new Path2D("M7 12 H15 V20 H24 V27 H33 V33 H43"), 1]], E = [[new Path2D([
		10,
		21,
		32
	].flatMap((e) => [
		10,
		21,
		32
	].map((t) => `M${t} ${e} h9 v9 h-9 Z`)).join("")), .75]];
	function D(e, t, n, r, i) {
		if (i <= 0) return;
		let a = r / 48;
		f.save(), f.translate(t, n), f.scale(a, a), f.translate(-24, -24), f.lineWidth = 1.5 / a, f.lineCap = "round", f.lineJoin = "round", e.forEach(([e, t]) => {
			f.strokeStyle = H(W, i * t), f.stroke(e);
		}), f.restore();
	}
	function O(e, t, n, r) {
		if (r <= 0) return;
		let i = n / 2, a = n * .18, o = t - n * .42, s = t + n * .42;
		f.strokeStyle = H(W, r), f.lineWidth = 1.2, f.beginPath(), f.ellipse(e, o, i, a, 0, 0, G), f.stroke(), f.beginPath(), f.moveTo(e - i, o), f.lineTo(e - i, s), f.ellipse(e, s, i, a, 0, Math.PI, 0, !0), f.lineTo(e + i, o), f.stroke(), f.beginPath(), f.ellipse(e, t, i, a, 0, 0, Math.PI), f.stroke();
	}
	function k(e, t, n, r) {
		let i = e.r * 1.47, a = t * .22, o = Math.max(24, Math.round(G * i / Math.max(7, e.r * .16))), s = Math.max(1.1, e.r * .034), c = t * 3.6, l = .55 + .45 * Math.sin(t * 13) * Math.sin(t * 7.3 + 1);
		for (let u = 0; u < o; u++) {
			let d = a + u / o * G, f = ((d - c) % G + Math.PI * 3) % G - Math.PI, p = Math.exp(-((f / .42) ** 2)) * n, m = .5 + .5 * Math.sin(d * 3 + t * 9) * Math.sin(d * 5 - t * 7 + 1.3), h = r * l * m, g = i + e.r * (.06 * p + .18 * h), _ = s * (1 + 1.2 * p + 1.3 * h), y = .72 + .28 * Math.cos(d + Math.PI * .75);
			v(e.x + Math.cos(d) * g, e.y + Math.sin(d) * g, _, se, Math.min(1, (.8 + .2 * p + .2 * h) * y));
		}
		v(e.x, e.y, e.r, se, 1), f.fillStyle = W, f.beginPath(), pe.forEach(([t, n], r) => {
			let i = e.x + t * e.r, a = e.y + n * e.r;
			r ? f.lineTo(i, a) : f.moveTo(i, a);
		}), f.closePath(), f.fill();
	}
	function A(e, t, n, r, i) {
		if (n <= 0) return;
		let [a, o] = t.p, s = P.tr;
		v(a, o, s, le, .85 * n), f.strokeStyle = H(W, .14 * n), f.lineWidth = 1, f.beginPath(), f.arc(a, o, s, 0, G), f.stroke(), r > 0 && (f.strokeStyle = H(ue[e], n), f.lineWidth = 1.5, f.lineCap = "round", f.beginPath(), f.arc(a, o, s, -Math.PI / 2, -Math.PI / 2 + G * r), f.stroke());
		let c = (.45 + .45 * r) * n;
		if (e === 0 ? D(T, a, o, s * 1.1, c) : e === 1 ? D(E, a, o, s * 1.1, c) : O(a, o, s * .62, c), e === 0) for (let e = 0; e < 5; e++) {
			let t = -Math.PI / 2 + e * G / 5 + i * .12, c = q(r * 5 - e);
			v(a + Math.cos(t) * (s + 9 * N), o + Math.sin(t) * (s + 9 * N), 2.2 * N, de[e], n * (.2 + .8 * c));
		}
		t.lab.forEach((e, i) => h(e, a, t.ly + i * P.fsM * 1.5, 400, P.fsM, r > .99 ? W : oe, n * (.6 + .4 * r), "center", !0));
	}
	let j = 0, M = 0, N = 1, P = null;
	function ee() {
		let e = j >= 760;
		N = e ? q(j / 1200, .6, 1.15) : q(j / 400, .75, 1.1);
		let t = Math.max(13, (e ? 16 : 15) * N), r = t * 1.45, i = Math.max(9, 11 * N), a = 18 * N, s = {
			hz: e,
			fsB: t,
			lh: r,
			fsM: i,
			pad: a,
			tr: (e ? 26 : 22) * N
		};
		if (e) {
			M = Math.round(j * (j >= 1e3 ? .5 : .62));
			let e = j * .25, i = _(n, 400, t, e - a * 2), o = i.length * r + a * 2;
			s.bub = {
				x: j * .05,
				y: M / 2 - o / 2,
				w: e,
				h: o,
				lines: i
			}, s.v = {
				x: j * .405,
				y: M / 2,
				r: 30 * N
			}, s.nodes = [
				0,
				1,
				2
			].map((e) => ({ p: [j * .6 + (e === 1 ? j * .03 : 0), M / 2 + (e - 1) * M * .29] }));
			let c = j * .2, l = 230 * N;
			s.card = {
				x: j * .75,
				y: M / 2 - l / 2,
				w: c,
				h: l
			};
		} else {
			let e = j - 48 * N, o = _(n, 400, t, e - a * 2), c = o.length * r + a * 2, l = 30 * N + i + 12 * N;
			s.bub = {
				x: (j - e) / 2,
				y: l,
				w: e,
				h: c,
				lines: o
			}, l += c + 34 * N;
			let u = 24 * N;
			s.v = {
				x: j / 2,
				y: l + u * 1.47,
				r: u
			}, l = s.v.y + u * 1.47 + 70 * N + s.tr, s.nodes = [
				0,
				1,
				2
			].map((e) => ({ p: [j * (.2 + .3 * e), l + (e === 1 ? 14 * N : 0)] })), l += 14 * N + s.tr + 22 * N + i * 3 + 40 * N;
			let d = Math.min(j - 48 * N, 340 * N), f = 170 * N;
			s.card = {
				x: (j - d) / 2,
				y: l,
				w: d,
				h: f
			}, M = Math.round(l + f + 30 * N);
		}
		let c = e ? j * .16 : j * .3;
		return s.nodes.forEach((e, t) => {
			let n = o[t] || "", r = n.split(" ");
			e.lab = g(n, 400, i, !0) > c && r.length > 1 ? [r.slice(0, Math.ceil(r.length / 2)).join(" "), r.slice(Math.ceil(r.length / 2)).join(" ")] : [n], e.ly = e.p[1] + s.tr + (t === 0 ? 30 : 22) * N;
		}), s;
	}
	function te(e) {
		f.clearRect(0, 0, j, M);
		let { hz: t, fsB: o, lh: s, fsM: c, pad: l, bub: u, v: d, nodes: p, card: _ } = P, v = d.r * 1.47 + 8 * N, T = Y(J(e, 0, .5));
		h(r, u.x, u.y - 12 * N, 400, c, oe, T, "left", !0), C(u.x, u.y, u.w, u.h, 18 * N, T, 6 * N);
		let E = Math.round(n.length * J(e, K.type0, K.type1)), D = u.x + l, O = u.y + l + o;
		u.lines.forEach((e, t) => {
			let n = e.slice(0, Math.max(0, E));
			E -= e.length + 1;
			let r = u.y + l + o * .95 + t * s;
			h(n, u.x + l, r, 400, o, W, T), n.length && (m(400, o), D = u.x + l + f.measureText(n).width, O = r);
		}), e < K.send + .4 && Math.sin(e * 10) > 0 && (f.fillStyle = H(W, .8 * T), f.fillRect(D + 2, O - o * .85, 1.5, o));
		let ee = t ? [u.x + u.w + 8 * N, u.y + u.h / 2] : [j / 2, u.y + u.h + 8 * N], te = t ? [d.x - v, d.y] : [d.x, d.y - v], F = X(J(e, K.send, K.send + .6));
		F > 0 && w(b(ee, te, 0, F), W, .5, e, Math.min(J(e, K.send + .6, K.send + .9), 1 - J(e, K.th1, K.th1 + .4)), 0);
		let I = Y(J(e, K.card, K.card + .5)), L = _.y + 14 * N * (1 - I);
		if (p.forEach((n, r) => {
			let i = X(J(e, K.out + r * .15, K.out + .6 + r * .15)), a = Y(J(e, K.out + .3 + r * .15, K.out + .8 + r * .15)), o = Y(J(e, K.lit + r * .35, K.lit + 1.4 + r * .35));
			if (i > 0) {
				let [t, a] = x([d.x, d.y], n.p, v, P.tr + 6 * N);
				w(b(t, a, (1 - r) * .06, i), ue[r], .35 + .4 * o, e, i >= 1 ? Math.min(J(e, K.lit, K.lit + .3), 1 - J(e, K.back + .6, K.back + 1)) : 0, r + 1);
			}
			let s = X(J(e, K.back + r * .12, K.back + .6 + r * .12));
			s > 0 && w(b(t ? [n.p[0] + P.tr + 8 * N, n.p[1]] : [n.p[0], n.ly + c * 1.5 * (n.lab.length - 1) + 12 * N], t ? [_.x - 8 * N, L + _.h * (.5 + (r - 1) * .16)] : [_.x + _.w * (.5 + (r - 1) * .22), L - 8 * N], (r - 1) * .05, s), ue[r], .4, e, s >= 1 ? Math.min(J(e, K.back + .7, K.back + 1), 1 - J(e, K.press, K.press + .4)) : 0, r + 4), A(r, n, a, o, e);
		}), k(d, e, Math.min(J(e, K.th0, K.th0 + .3), 1 - J(e, K.th1 - .3, K.th1)), X(J(e, K.ring0, K.ring0 + .2)) * (1 - X(J(e, K.ring1 + .6, K.ring1 + 1.3)))), I > 0) {
			C(_.x, L, _.w, _.h, 20 * N, I), h(i, _.x + l, L + l + c, 400, c, W, .85 * I, "left", !0);
			let t = 34 * N, n = L + _.h - l - t, r = _.x + l, s = _.x + _.w - l, u = L + l + c + 18 * N, d = n - 18 * N;
			f.strokeStyle = H(W, .12 * I), f.lineWidth = 1, f.beginPath(), f.moveTo(r, d + .5), f.lineTo(s, d + .5), f.stroke();
			let p = X(J(e, K.cv0, K.cv1)), m = [], v = [];
			for (let e = 0; e <= Math.ceil(32 * p); e++) {
				let t = Math.min(e / 32, p), n = me(r, s, t), i = d - u;
				m.push([n, d - i * (.12 + .32 * t)]), v.push([n, d - i * (.12 + .78 * (1 - (1 - t) ** 2.2))]);
			}
			f.save(), f.setLineDash([3 * N, 4 * N]), y(m, oe, .9 * I, 1.2), f.restore(), y(v, W, I, 1.6);
			let x = 1 - .05 * Math.sin(Math.PI * J(e, K.press, K.press + .25)), w = g(a, 500, o * .9) + 36 * N, T = _.x + l;
			f.save(), f.translate(T + w / 2, n + t / 2), f.scale(x, x), f.translate(-(T + w / 2), -(n + t / 2)), f.globalAlpha = I, S(T, n, w, t, t / 2), f.fillStyle = W, f.fill(), f.globalAlpha = 1, h(a, T + w / 2, n + t / 2 + o * .32, 500, o * .9, ce, I, "center"), f.restore();
			let E = T + w + 22 * N, D = n + t / 2, O = 11 * N, k = Y(J(e, K.ring0, K.ring1));
			if (k < 1 && (f.save(), f.setLineDash([1, 4 * N]), f.lineCap = "round", f.strokeStyle = H(oe, .8 * I * (1 - k)), f.lineWidth = 1.5, f.beginPath(), f.arc(E, D, O, 0, G), f.stroke(), f.restore()), k > 0) {
				f.strokeStyle = H(se, I), f.lineWidth = 1.5, f.lineCap = "round", f.beginPath(), f.arc(E, D, O, -Math.PI / 2, -Math.PI / 2 + G * k), f.stroke();
				let t = J(e, K.ring0 + .35, K.ring1 + .1);
				t > 0 && y(b([E - O * .42, D + O * .02], [E - O * .1, D + O * .32], 0, 1, 2).concat(b([E - O * .1, D + O * .32], [E + O * .45, D - O * .3], 0, 1, 2)).slice(0, 1 + Math.ceil(5 * t)), se, I, 1.5);
			}
		}
	}
	let F = matchMedia("(prefers-reduced-motion: reduce)").matches, I = !1, L = 0, R = 0, z = 0;
	function ne() {
		if (j = e.clientWidth, !j) return;
		P = ee(), e.style.height = M + "px";
		let t = Math.min(devicePixelRatio || 1, 2);
		d.width = Math.round(j * t), d.height = Math.round(M * t), f.setTransform(t, 0, 0, t, 0, 0), I && te(F ? fe : L);
	}
	function re(e) {
		R = requestAnimationFrame(re), L += Math.min((e - z) / 1e3, .05), z = e, L > K.loop && (L = 0), d.style.opacity = L > K.fade ? 0 : 1, te(L);
	}
	function B() {
		R || F || (L = 0, d.style.opacity = 1, z = performance.now(), R = requestAnimationFrame(re));
	}
	function V() {
		cancelAnimationFrame(R), R = 0;
	}
	let ie = 0, ae = new ResizeObserver(() => {
		e.clientWidth !== ie && (ie = e.clientWidth, ne());
	});
	ae.observe(e);
	let U = null;
	return (document.fonts ? Promise.race([Promise.all([document.fonts.load(`400 12px ${l}`), document.fonts.load(`400 12px ${u}`)]), new Promise((e) => setTimeout(e, 3e3))]) : Promise.resolve()).then(() => {
		I = !0, ne(), !F && (U = new IntersectionObserver(([e]) => e.isIntersecting ? B() : V(), { threshold: .3 }), U.observe(e));
	}), { destroy() {
		V(), ae.disconnect(), U && U.disconnect(), d.remove(), e.style.height = "", delete e.dataset.pvInit;
	} };
}
var W, oe, se, ce, le, ue, de, G, K, fe, pe, q, J, Y, X, me, he = e((() => {
	W = "#F4F4F4", oe = "#8C86B0", se = "#E2C70A", ce = "#17103A", le = "#0D0926", ue = [
		"#A99FD8",
		"#78A8E0",
		"#7FE8CF"
	], de = [
		"#86C6D0",
		"#A99FD8",
		"#D6A394",
		"#92CBAE",
		"#C9C4EF"
	], G = Math.PI * 2, K = {
		type0: .5,
		type1: 2.5,
		send: 2.8,
		th0: 3.3,
		th1: 4.9,
		out: 4.2,
		lit: 4.9,
		back: 6.9,
		card: 7.2,
		cv0: 7.6,
		cv1: 8.6,
		press: 9.1,
		ring0: 9.25,
		ring1: 9.85,
		fade: 11.4,
		loop: 12
	}, fe = 10.5, pe = [
		[.2749, -.4797],
		[-4e-4, .1548],
		[-.2181, -.3639],
		[-.271, -.4797],
		[-.5574, -.4797],
		[-.017, .6489],
		[.0186, .6489],
		[.5574, -.4797]
	], q = (e, t = 0, n = 1) => Math.max(t, Math.min(n, e)), J = (e, t, n) => q((e - t) / (n - t)), Y = (e) => 1 - (1 - e) ** 5, X = (e) => e < .5 ? 16 * e ** 5 : 1 - (-2 * e + 2) ** 5 / 2, me = (e, t, n) => e + (t - e) * n;
}));
//#endregion
//#region src/bonv-ask.js
function ge(e) {
	let t = i(e), n = t.one("user"), r = t.one("question"), c = t.list("keys"), u = t.one("bonv-ask"), g = t.one("file"), _ = t.one("extract-title").toUpperCase(), v = t.list("extract").map((e) => e.toUpperCase()), y = t.one("steps-title").toUpperCase(), b = t.list("steps"), x = t.one("confirm"), S = null;
	function C(e) {
		let { W: t } = e, n = e.S = m(t / 480, .7, 1.25), i = 20 * n, a = 10 * n, o = 8 * n, s = i + 12 * n, c = i + 34 * n, l = t - c - i, d = 13 * n, f = Math.max(12, 13.5 * n), p = f * 1.42, h = Math.max(8.5, 9.5 * n), g = (t) => {
			let n = e.wrap(t, 400, f, l - d * 2);
			return {
				lines: n,
				w: Math.max(...n.map((t) => e.tw(t, 400, f))) + d * 2,
				h: n.length * p + d * 2 - (p - f)
			};
		}, _ = g(r), y = g(u);
		S = {
			pad: i,
			ar: a,
			vr: o,
			ax: s,
			bx: c,
			bp: d,
			fsB: f,
			lh: p,
			fsM: h,
			items: [
				{
					who: "u",
					t0: .2,
					w: _.w,
					h: _.h,
					lines: _.lines,
					kind: "q"
				},
				{
					who: "b",
					t0: Z.b1,
					w: y.w,
					h: y.h,
					lines: y.lines,
					kind: "b1"
				},
				{
					who: "u",
					t0: Z.file,
					w: Math.min(l, 250 * n),
					h: 46 * n,
					kind: "file"
				},
				{
					who: "b",
					t0: Z.b2,
					w: Math.min(l, 290 * n),
					h: d * 2 + h + 10 * n + v.length * 22 * n,
					kind: "x"
				},
				{
					who: "b",
					t0: Z.b3,
					w: Math.min(l, 300 * n),
					h: d * 2 + h + 8 * n + b.length * 26 * n + 14 * n + 30 * n,
					kind: "s"
				}
			],
			gap: 12 * n
		};
	}
	function w(e, t) {
		let { S: i, H: o } = e, { pad: u, ar: C, vr: w, ax: T, bx: E, bp: D, fsB: O, lh: k, fsM: A, items: j, gap: M } = S, N = o - u, P = [];
		for (let e = j.length - 1; e >= 0; e--) {
			let n = j[e], r = s(h(t, n.t0, n.t0 + .45));
			r <= 0 || (N -= (n.h + M) * r, P[e] = {
				y: N + M * r + 10 * i * (1 - r),
				a: r * m((N - 4 * i) / (30 * i) + .4)
			});
		}
		j.forEach((o, u) => {
			let m = P[u];
			if (!m || m.a <= 0) return;
			let S = m.y, j = m.a;
			if (o.who === "u") e.avatar(T, S + C, C, a, n, j);
			else {
				let n = o.kind === "b1" ? h(t, Z.b1, Z.b1 + .2) * (1 - h(t, Z.b1txt - .1, Z.b1txt + .2)) : o.kind === "x" ? h(t, Z.b2, Z.b2 + .2) * (1 - h(t, Z.b2txt - .1, Z.b2txt + .2)) : h(t, Z.b3, Z.b3 + .2) * (1 - h(t, Z.b3txt - .1, Z.b3txt + .2)), r = o.kind === "s" ? h(t, Z.ok0, Z.ok0 + .2) * (1 - h(t, Z.ok1 + .4, Z.ok1 + 1)) : 0;
				e.vMark(T, S + C, w, t, n, r, j);
			}
			if (e.glass(E, S, o.w, o.h, 14 * i, j, 5 * i), o.kind === "q") {
				let n = Math.round(r.length * h(t, Z.type0, Z.type1)), l = E + D, u = S + D + O;
				o.lines.forEach((r, o) => {
					let d = r.slice(0, Math.max(0, n));
					n -= r.length + 1;
					let p = S + D + O * .92 + o * k;
					e.text(d, E + D, p, 400, O, f, j), d.length && (l = E + D + e.tw(d, 400, O), u = p), c.forEach((n, o) => {
						let c = r.indexOf(n);
						if (c < 0) return;
						let l = s(h(t, Z.keys + o * .25, Z.keys + .45 + o * .25));
						if (l <= 0) return;
						let u = E + D + e.tw(r.slice(0, c), 400, O), d = e.tw(n, 400, O);
						e.line(u, p + 4 * i, u + d * l, p + 4 * i, a, j, 1.5);
					});
				}), t < Z.type1 + .5 && Math.sin(t * 10) > 0 && (e.x.fillStyle = `rgba(244,244,244,${.8 * j})`, e.x.fillRect(l + 2, u - O * .85, 1.5, O));
			}
			if (o.kind === "b1") {
				t < Z.b1txt && e.typing(E + D + 2 * i, S + o.h / 2, j, t);
				let n = j * h(t, Z.b1txt, Z.b1txt + .3);
				o.lines.forEach((t, r) => e.text(t, E + D, S + D + O * .92 + r * k, 400, O, f, n));
			}
			if (o.kind === "file") {
				let n = S + o.h / 2, r = s(h(t, Z.up0, Z.up1));
				e.icon("doc", E + D + 9 * i, n, 22 * i, j), e.text(g, E + D + 26 * i, n - 2 * i, 400, O * .95, f, j);
				let a = E + D + 26 * i, c = E + o.w - D, u = n + 9 * i;
				e.line(a, u, c, u, f, .12 * j, 2 * i), e.line(a, u, a + (c - a) * r, u, r >= 1 ? l : f, .85 * j, 2 * i);
			}
			if (o.kind === "x") {
				t < Z.b2txt && e.typing(E + D + 2 * i, S + D + A * .5, j, t);
				let n = j * h(t, Z.b2txt, Z.b2txt + .3);
				e.text(_, E + D, S + D + A, 400, A, d, n, "left", !0), v.forEach((n, r) => {
					let a = S + D + A + 10 * i + r * 22 * i, c = j * h(t, Z.b2txt + .2 + r * .35, Z.b2txt + .5 + r * .35);
					r && e.line(E + D, a, E + o.w - D, a, f, .08 * c), e.text(n, E + D, a + 15 * i, 400, A, f, .85 * c, "left", !0);
					let l = E + o.w * .46, u = E + o.w - D - (r % 2 ? 30 : 10) * i, d = s(h(t, Z.b2txt + .4 + r * .35, Z.b2txt + 1 + r * .35));
					e.line(l, a + 11 * i, l + (u - l) * d, a + 11 * i, p, .55 * c, 5 * i);
				});
			}
			if (o.kind === "s") {
				t < Z.b3txt && e.typing(E + D + 2 * i, S + D + A * .5, j, t);
				let n = j * h(t, Z.b3txt, Z.b3txt + .3);
				e.text(y, E + D, S + D + A, 400, A, d, n, "left", !0), b.forEach((n, r) => {
					let a = S + D + A + 8 * i + r * 26 * i, s = j * h(t, Z.b3txt + .15 + r * .2, Z.b3txt + .45 + r * .2);
					r && e.line(E + D, a, E + o.w - D, a, f, .08 * s), e.ring(E + D + 7 * i, a + 13 * i, 6 * i, r === 0 ? f : d, r === 0 ? 1 : .35, s), e.text(n, E + D + 22 * i, a + 13 * i + O * .34, 400, O * .95, r === 0 ? f : d, s);
				});
				let r = S + o.h - D - 30 * i, a = Math.sin(Math.PI * h(t, Z.press, Z.press + .25)), s = j * h(t, Z.b3txt + .8, Z.b3txt + 1.1), c = e.button(x, E + D, r, 30 * i, O * .9, a, s);
				e.approve(E + D + c + 20 * i, r + 15 * i, 10 * i, h(t, Z.ok0, Z.ok1), s);
			}
		});
	}
	return o(e, {
		aspect: (e) => e < 420 ? 1.2 : 11 / 16,
		loop: Z.loop,
		fade: Z.fade,
		still: _e,
		layout: C,
		draw: w
	});
}
var Z, _e, ve = e((() => {
	n(), Z = {
		type0: .5,
		type1: 2.2,
		keys: 2.3,
		b1: 2.9,
		b1txt: 3.7,
		file: 4.6,
		up0: 4.9,
		up1: 5.9,
		b2: 6.4,
		b2txt: 7,
		b3: 8.4,
		b3txt: 9,
		press: 10.3,
		ok0: 10.45,
		ok1: 11.1,
		fade: 12.4,
		loop: 13
	}, _e = 11.6;
}));
//#endregion
//#region src/bonv-collab.js
function ye(e) {
	let t = i(e), n = t.one("project").toUpperCase(), a = t.one("credits").toUpperCase(), c = t.one("result").toUpperCase(), p = [...e.querySelectorAll("[data-role=\"members\"] li")].slice(0, 4).map((e) => {
		let t = e.querySelectorAll("span");
		return {
			name: (t[0] || e).textContent.trim(),
			role: t[1] ? t[1].textContent.trim() : ""
		};
	}), g = p.findIndex((e) => /budget/i.test(e.role)), _ = p.findIndex((e) => /sign/i.test(e.role)), v = null;
	function y(e) {
		let { W: t, H: n } = e, r = e.S = m(t / 480, .7, 1.25), i = 20 * r, a = Math.max(12, 13.5 * r), o = Math.max(8, 9 * r), s = t < 420, c = s ? {
			x: i,
			y: i,
			w: t - 2 * i,
			h: n * .56
		} : {
			x: i,
			y: i,
			w: t * .57,
			h: n - 2 * i
		}, l = s ? i : c.x + c.w + 16 * r, u = s ? t - 2 * i : t - i - l, d = Math.min(38 * r, u * .26), f, h;
		if (s) {
			let e = c.y + c.h + 18 * r, a = n - i - e;
			f = {
				x: i + d + 6 * r,
				y: e + d + 4 * r,
				r: d
			}, h = {
				x: i + d * 2 + 28 * r,
				y: e,
				w: t - i - (i + d * 2 + 28 * r),
				h: a
			};
		} else {
			f = {
				x: l + u / 2,
				y: i + d + 10 * r,
				r: d
			};
			let e = f.y + d + 34 * r;
			h = {
				x: l,
				y: e,
				w: u,
				h: n - i - e
			};
		}
		let g = 40 * r, _ = (c.h - g - 8 * r) / Math.max(1, p.length);
		v = {
			pad: i,
			fsB: a,
			fsM: o,
			card: c,
			ring: f,
			res: h,
			head: g,
			rowH: _,
			narrow: s
		};
	}
	function b(e, t) {
		let { S: i } = e, { fsB: o, fsM: m, card: y, ring: b, res: S, head: C, rowH: w, narrow: T } = v, E = s(h(t, Q.card, Q.card + .5));
		e.glass(y.x, y.y + 10 * i * (1 - E), y.w, y.h, 18 * i, E), e.text(n, y.x + 16 * i, y.y + 24 * i, 400, m, d, E, "left", !0), e.line(y.x + 16 * i, y.y + C - 4 * i, y.x + y.w - 16 * i, y.y + C - 4 * i, f, .1 * E);
		let D = (e) => y.y + C + e * w + w / 2;
		p.forEach((n, r) => {
			let a = Q.m0 + r * Q.mStep, c = E * s(h(t, a, a + .45)), u = D(r);
			if (c <= 0) return;
			let d = 10 * i, g = y.x + 16 * i + d;
			e.avatar(g, u, d * (.6 + .4 * s(h(t, a, a + .3))), xe[r], n.name, c), e.text(n.name, g + d + 10 * i, u + o * .34, 400, o, f, c);
			let _ = s(h(t, a + .2, a + .65)), v = n.role.toUpperCase(), b = e.tw(v, 400, m, !0) + 16 * i, x = 20 * i, S = y.x + y.w - 16 * i - b + 12 * i * (1 - _) - 0;
			e.x.save(), e.x.globalAlpha = c * _, e.rr(S, u - x / 2, b, x, x / 2), e.x.strokeStyle = "rgba(244,244,244,.22)", e.x.lineWidth = 1, e.x.stroke(), e.x.restore(), e.text(v, S + 8 * i, u + m * .36, 400, m, f, .8 * c * _, "left", !0);
			let C = c * s(h(t, Q.seen + r * .15, Q.seen + .3 + r * .15));
			e.dot(g + d * .75, u - d * .75, 3 * i, l, C), r < p.length - 1 && e.line(y.x + 16 * i, u + w / 2, y.x + y.w - 16 * i, u + w / 2, f, .06 * c);
		});
		let O = s(h(t, Q.ring, Q.ring + .5));
		if (O > 0) {
			e.x.save(), e.x.setLineDash([1, 5 * i]), e.x.lineCap = "round", e.x.strokeStyle = `rgba(140,134,176,${.9 * O})`, e.x.lineWidth = 1.5, e.x.beginPath(), e.x.arc(b.x, b.y, b.r, 0, Math.PI * 2), e.x.stroke(), e.x.restore();
			let n = 0;
			Q.use.forEach(([e, i], a) => {
				let o = a ? Q.use[a - 1][1] : 0;
				n = Math.max(n, u(o, i, r(h(t, e, e + .6))));
			}), n > 0 && (e.x.strokeStyle = `rgba(120,168,224,${O})`, e.x.lineWidth = 2 * i, e.x.lineCap = "round", e.x.beginPath(), e.x.arc(b.x, b.y, b.r, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * n), e.x.stroke()), Q.use.forEach(([n]) => {
				let r = h(t, n, n + .7);
				r > 0 && r < 1 && (e.x.strokeStyle = `rgba(120,168,224,${.35 * (1 - r) * O})`, e.x.lineWidth = 1, e.x.beginPath(), e.x.arc(b.x, b.y, b.r + 4 * i + 10 * i * r, 0, Math.PI * 2), e.x.stroke());
			}), g >= 0 && e.avatar(b.x, b.y, b.r * .3, xe[g], p[g].name, O), T ? e.text(a, b.x, b.y + b.r + 16 * i, 400, m, d, O, "center", !0) : e.text(a, b.x, b.y + b.r + 20 * i, 400, m, d, O, "center", !0);
		}
		let k = s(h(t, Q.res, Q.res + .5));
		if (k > 0) {
			let n = S.y + 10 * i * (1 - k);
			e.glass(S.x, n, S.w, S.h, 16 * i, k), e.text(c, S.x + 14 * i, n + 22 * i, 400, m, f, .85 * k, "left", !0);
			let a = S.x + 14 * i, o = S.x + S.w - 14 * i, s = n + 36 * i, l = n + S.h - 14 * i, d = r(h(t, Q.cv0, Q.cv1));
			e.line(a, l, o, l, f, .12 * k);
			let g = [];
			for (let e = 0; e <= Math.ceil(28 * d); e++) {
				let t = Math.min(e / 28, d);
				g.push([u(a, o, t), l - (l - s) * (.1 + .8 * (1 - (1 - t) ** 2.2))]);
			}
			e.poly(g, f, k, 1.6), p.forEach((a, o) => {
				let s = r(h(t, Q.share + o * .12, Q.share + .6 + o * .12));
				if (s <= 0) return;
				let c = T ? [S.x + S.w * (.25 + o * .17), n - 6 * i] : [S.x - 6 * i, n + S.h * (.3 + o * .14)], l = T ? [y.x + y.w - 30 * i - o * 40 * i, y.y + y.h + 6 * i] : [y.x + y.w + 6 * i, D(o)];
				e.flow(e.qpts(c, l, (o - 1.5) * .04, s), xe[o], .45, t, s >= 1 ? x(t) : 0, o + 2);
			});
		}
		if (_ >= 0) {
			let n = D(_), r = h(t, Q.sign0, Q.sign1), a = p[_].role.toUpperCase(), o = e.tw(a, 400, m, !0) + 16 * i;
			e.approve(y.x + y.w - 16 * i - o - 16 * i, n, 8 * i, r, E * h(t, Q.sign0 - .5, Q.sign0));
		}
	}
	let x = (e) => Math.min(h(e, Q.share + .6, Q.share + .9), 1 - h(e, Q.sign0, Q.sign0 + .4));
	return o(e, {
		aspect: (e) => e < 420 ? 1.25 : 11 / 16,
		loop: Q.loop,
		fade: Q.fade,
		still: be,
		layout: y,
		draw: b
	});
}
var Q, be, xe, Se = e((() => {
	n(), Q = {
		card: .2,
		m0: 1,
		mStep: .8,
		ring: 4.4,
		use: [
			[5, .22],
			[6, .41],
			[7, .58]
		],
		res: 7.9,
		cv0: 8.2,
		cv1: 9,
		share: 9,
		seen: 9.8,
		sign0: 10.6,
		sign1: 11.25,
		fade: 12.4,
		loop: 13
	}, be = 11.8, xe = [
		a,
		p,
		l,
		c[2]
	];
}));
//#endregion
//#region src/bonv-orch.js
function Ce(e) {
	let t = (t) => [...e.querySelectorAll(`[data-role="${t}"] li`)], n = t("products"), i = t("integrations"), a = [...n.map((e, t) => ({
		lab: e.textContent.trim().toUpperCase(),
		kind: "p",
		col: c[t % c.length],
		pick: e.hasAttribute("data-pick")
	})), ...i.map((e) => ({
		lab: e.textContent.trim().toUpperCase(),
		kind: "i",
		col: l,
		pick: e.hasAttribute("data-pick")
	}))], p = ((e.querySelector("[data-role=\"result\"]") || {}).textContent || "").trim().toUpperCase(), g = t("lineage").map((e) => {
		let t = e.querySelectorAll("span");
		return {
			k: (t[0] || e).textContent.trim().toUpperCase(),
			v: t[1] ? t[1].textContent.trim() : ""
		};
	}), _ = Math.max(0, a.findIndex((e) => e.kind === "p" && e.pick)), v = a.findIndex((e) => e.kind === "i" && e.pick), y = null;
	function b(e) {
		let { W: t, H: n } = e, r = e.S = m(t / 480, .7, 1.25), i = 20 * r, o = Math.max(12, 13 * r), s = Math.max(8, 8.8 * r), c = t < 420, l = a.length, u = c ? {
			x: i + 22 * r,
			y: n * .3,
			r: 15 * r
		} : {
			x: t * .15,
			y: n / 2,
			r: 17 * r
		}, d = c ? n * .25 : n * .42, f = d * 1.05, p = 72 * Math.PI / 180;
		a.forEach((e, t) => {
			let n = -p + 2 * p * (l > 1 ? t / (l - 1) : .5);
			e.p = [u.x + Math.cos(n) * f, u.y + Math.sin(n) * d];
		});
		let h = c ? t - 2 * i : t * .42, _ = Math.min(c ? n * .36 : n * .62, 40 * r + g.length * 38 * r), v = c ? {
			x: i,
			y: n - i - _,
			w: h,
			h: _
		} : {
			x: t - i - h,
			y: n / 2 - _ / 2,
			w: h,
			h: _
		};
		y = {
			pad: i,
			fsB: o,
			fsM: s,
			v: u,
			nr: 7 * r,
			card: v,
			narrow: c
		};
	}
	function x(e, t) {
		let { S: n } = e, { fsB: i, fsM: o, v: c, nr: l, card: m, narrow: b } = y, x = c.r * 1.47 + 6 * n, S = s(h(t, $.focus, $.focus + .7));
		a.forEach((i, a) => {
			let u = $.out + a * $.step, p = r(h(t, u, u + .5)), m = s(h(t, u + .4, u + 1.2)), g = a === _ || a === v, y = g ? 1 : 1 - .75 * S;
			if (p > 0) {
				let [r, o] = e.trim([c.x, c.y], i.p, x, l + 4 * n);
				e.flow(e.qpts(r, o, .04, p), i.col, (.25 + .35 * m) * y, t, p >= 1 ? Math.min(h(t, u + .5, u + .8), 1 - h(t, $.focus, $.focus + .4)) : 0, a);
			}
			let C = s(h(t, u + .2, u + .6)) * y;
			i.kind === "p" ? e.ring(i.p[0], i.p[1], l, i.col, m, C) : (e.ring(i.p[0], i.p[1], l, i.col, m, C), e.db(i.p[0], i.p[1], l * 1.05, .8 * C * (.5 + .5 * m)));
			let w = C * (g ? 1 : 1 - S) * (b && !g ? .7 : 1);
			e.text(i.lab, i.p[0] + l + 8 * n, i.p[1] + o * .36, 400, o, g && S > .5 ? f : d, w, "left", !0), g && S > 0 && (e.x.strokeStyle = `rgba(244,244,244,${.5 * S})`, e.x.lineWidth = 1, e.x.beginPath(), e.x.arc(i.p[0], i.p[1], l + 5 * n, 0, Math.PI * 2), e.x.stroke());
		});
		let C = Math.min(h(t, .2, .5), 1 - h(t, $.out + a.length * $.step, $.out + a.length * $.step + .4));
		e.vMark(c.x, c.y, c.r, t, C, 0, 1);
		let w = s(h(t, $.open0, $.open0 + .4));
		if (w > 0) {
			let c = r(h(t, $.open0, $.open1)), y = u(36 * n, m.h, c), x = m.y + (m.h - y) / 2;
			e.glass(m.x + 10 * n * (1 - w), x, m.w, y, 16 * n, w), e.text(p, m.x + 14 * n, x + 22 * n, 400, o, f, .85 * w, "left", !0), g.forEach((c, u) => {
				let p = w * s(h(t, $.row + u * $.rowStep, $.row + .4 + u * $.rowStep));
				if (p <= 0) return;
				let g = m.y + 38 * n + u * 38 * n;
				e.line(m.x + 14 * n, g, m.x + m.w - 14 * n, g, f, .1 * p), e.text(c.k, m.x + 14 * n, g + 15 * n, 400, o, d, p, "left", !0), e.text(c.v, m.x + 14 * n, g + 31 * n, 400, i, f, p);
				let y = u === 0 ? _ : u === 1 ? v : -1;
				if (y >= 0) {
					let i = a[y], s = r(h(t, $.row + u * $.rowStep, $.row + .7 + u * $.rowStep)), c = e.tw(i.lab, 400, o, !0), d = b ? [i.p[0], i.p[1] + l + 6 * n] : [i.p[0] + l + 14 * n + c, i.p[1]], f = b ? [m.x + m.w * (.55 + u * .2), m.y - 6 * n] : [m.x - 6 * n, g + 18 * n];
					e.flow(e.qpts(d, f, (u ? -1 : 1) * .08, s), i.col, .5 * p, t, +(s >= 1), u + 3);
				}
			});
		}
	}
	return o(e, {
		aspect: (e) => e < 420 ? 1.3 : 11 / 16,
		loop: $.loop,
		fade: $.fade,
		still: we,
		layout: b,
		draw: x
	});
}
var $, we, Te = e((() => {
	n(), $ = {
		out: 1,
		step: .16,
		focus: 5.6,
		open0: 6.2,
		open1: 6.9,
		row: 7.1,
		rowStep: .55,
		fade: 12.4,
		loop: 13
	}, we = 10.8;
})), Ee = /* @__PURE__ */ t((() => {
	ie(), T(), he(), ve(), Se(), Te(), w(), document.querySelectorAll("[data-pv=\"bonv-hero-bg\"]").forEach((e) => E(e)), document.querySelectorAll("[data-pv=\"bonv-answer\"]").forEach(U), document.querySelectorAll("[data-pv=\"bonv-ask\"]").forEach(ge), document.querySelectorAll("[data-pv=\"bonv-collab\"]").forEach(ye), document.querySelectorAll("[data-pv=\"bonv-orch\"]").forEach(Ce);
}));
//#endregion
export default Ee();
