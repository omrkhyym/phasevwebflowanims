import { n as e, t } from "./rolldown-runtime-wf392T_D.mjs";
import { a as n, c as r, i, l as a, n as o, r as s, s as c, t as l } from "./hero-stage-DpBC6yvy.mjs";
//#region src/bonv-hero-bg.js
function u(e) {
	if (!e || e.dataset.pvInit) return;
	let t = c(7), i = [];
	for (let e = 0; e < g; e++) {
		let n = e === 5 ? 6.2 : h - t() * 1.8, r = 0;
		for (; r < n;) {
			let a = Math.min(.45 + t() * t() * 2.3, n - r);
			if (a < .35) break;
			i.push({
				x: r,
				w: a,
				row: e,
				t: 0,
				pts: []
			}), r += a + .27;
		}
	}
	let u = 0;
	i.forEach((e) => {
		e.t = u, u += .09 + e.w * .05;
	}), i.forEach((e) => e.t = x + e.t / u * S);
	let A = i[i.length - 1];
	i.forEach((e) => {
		let n = Math.round(e.w * y);
		for (let r = 0; r < n; r++) {
			let n = t();
			e.pts.push({
				x: e.x + t() * e.w,
				y: e.row * _ + (t() - .5) * v,
				ox: .25 + t() * .9,
				oy: (t() - .5) * .16,
				s: n,
				tint: Math.min(2, Math.floor((n * .5 + e.x * .13 % 1 * .5) * D))
			});
		}
	});
	let j = [...Array(110)].map(() => ({
		x: (t() - .5) * .045,
		y: (t() - .5) * .6,
		s: t()
	})), M = 1, N = /* @__PURE__ */ new Map(), P = 1;
	function F(e) {
		let t = e.join(","), n = N.get(t);
		if (!n) {
			let e = Math.ceil((M + 1) * 2 * P);
			n = document.createElement("canvas"), n.width = n.height = e;
			let r = n.getContext("2d");
			r.fillStyle = `rgb(${t})`, r.beginPath(), r.arc(e / 2, e / 2, M * P, 0, l), r.fill(), N.set(t, n);
		}
		return n;
	}
	let I = 1, L = 0, R = 0;
	function z({ W: e, H: t, flow: n }) {
		I = n ? e * .88 / h : e * .42 / h, L = n ? e * .06 : e * .53, R = t * .5 - b / 2 * I, M = Math.max(.75, I * .028), P = Math.min(devicePixelRatio || 1, 2), N = /* @__PURE__ */ new Map();
	}
	function B(e, t) {
		let { ctx: n, W: c, H: u, mouse: h } = e, g = t % T;
		n.clearRect(0, 0, c, u);
		let v = s(r(g, C, 7.5)), y = 1 - s(r(g, w, 10.6));
		if (y <= 0) return;
		let b = M + 1, S = b * 2, E = -.14, N = 0;
		for (let r of i) {
			if (r.t > g) break;
			E = r.x + r.w + .13, N = r.row * _;
			let i = a(.1, 1.5, g - r.t), c = Math.round(i * O) / O, l = r === A, u = r.row / 5 * 2 - 1, x = u * 14 * h.x, C = u * 14 * h.y, w = [...Array(D)].map((e, t) => {
				let n = k(m, k(d, f, t / 2), c);
				return l && (n = k(n, p, Math.round(v * O) / O)), F(n);
			}), T = (.95 + -.35 * i) * y * (l ? 1 : 1 - .4 * v), j = l ? .98 * y : 0;
			for (let i of r.pts) {
				let a = s(o((g - r.t - i.s * .1) / .42));
				if (a <= 0) continue;
				let c = L + (i.x + i.ox * (1 - a)) * I + x, u = R + (i.y + i.oy * (1 - a) + Math.sin(t * .5 + i.s * 70) * .004) * I + C, d = a * (l ? T + (j - T) * v : T) * e.fade(c);
				d <= .003 || (n.globalAlpha = d, n.drawImage(w[i.tint], c - b, u - b, S, S));
			}
		}
		let P = (g > x && g < 6.1000000000000005 ? 1 : .5 + .5 * Math.cos(g * l * .9)) * (1 - r(g, C, 7.5)) * .9 * y;
		if (P > .003) {
			let t = F(m);
			for (let r of j) {
				let i = L + (E + r.x) * I, a = R + (N + r.y) * I;
				n.globalAlpha = P * e.fade(i), n.drawImage(t, i - b, a - b, S, S);
			}
		}
		n.globalAlpha = 1;
	}
	return n(e, {
		name: "bonv",
		draw: B,
		still: E,
		onResize: z
	});
}
var d, f, p, m, h, g, _, v, y, b, x, S, C, w, T, E, D, O, k, A = e((() => {
	i(), d = [
		146,
		138,
		205
	], f = [
		120,
		168,
		224
	], p = [
		226,
		199,
		10
	], m = [
		237,
		235,
		255
	], h = 13, g = 6, _ = 1, v = .1, y = 55, b = 5, x = .7, S = 5.4, C = 6.7, w = 9.4, T = 11, E = 8.2, D = 3, O = 8, k = (e, t, n) => [
		0,
		1,
		2
	].map((r) => Math.round(e[r] + (t[r] - e[r]) * n));
})), j = /* @__PURE__ */ t((() => {
	A(), document.querySelectorAll("[data-pv=\"bonv-hero-bg\"]").forEach((e) => u(e));
}));
//#endregion
export default j();
