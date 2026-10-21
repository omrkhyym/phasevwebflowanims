import { n as e, t } from "./rolldown-runtime-wf392T_D.mjs";
import { a as n, c as r, i, l as a, n as o, o as s, r as c, s as l, t as u, u as d } from "./platform-connect-Bf2sdhRo.mjs";
//#region src/conductor-hero-bg.js
function f(e) {
	if (!e || e.dataset.pvInit) return;
	let t = a(83), o = [...Array(_)].map(() => b.map((e, n) => ({
		...e,
		len: e.head ? .42 + t() * .2 : n % 3 == 0 ? .3 + t() * .3 : .82 + t() * .18,
		alt: .4 + t() * .55
	}))), s = !1, u = 0, f = 0, S = 0, C = 0, w = 0, T = 0, E = 6.5, D = .42;
	function O({ W: e, H: t, flow: n }) {
		s = n, s ? (E = 8, D = .7, u = Math.min(e * .36, t * .72 / 1.32), f = u * 1.32, S = u * 1.14, C = 0, w = (e - u) / 2, T = (t - f) / 2) : (E = 6.5, D = .42, u = Math.min(e * .5 / 4.9, t * .3), S = u * .78, f = u * 1.32, C = Math.min(f * .46, (t * .8 - f) / 5), w = e * .965 - (u + S * 5), T = (t - (f + C * 5)) / 2);
	}
	let k = (e, t) => e + f * .13 + t.y * (f * .74 / x);
	function A(e, t) {
		let { ctx: l, W: b, H: x, mouse: A, reduce: j } = e;
		O(e);
		let M = j ? t + v + 2 : t;
		l.clearRect(0, 0, b, x);
		let N = -A.x * 12, P = -A.y * 8, F = u / 30, I = Math.max(1.1, F * .32), L = j ? 0 : Math.floor(Math.max(0, M - v) / E), R = j ? y : Math.max(0, M - v) % E, z = a(500 + L), B = (e) => .5 + e * D, V = j ? 1 : 1 - n(d(R, E - 1.4, E - .5)), H = o.map((e, t) => {
			let n = e.map((e, t) => t).filter((n) => !e[n].head && (s || t === 5 || k(0, e[n]) < C * .9));
			return n.length ? n[Math.floor(z() * n.length)] : 1;
		}), U = 0;
		if (s && !j) {
			let e = i((R - B(0)) / D / 5) * 5, t = n(d(R, E - 1.2, E - .1));
			U = n(e / 5) * 5 * S * (1 - t);
		}
		let W = (e) => w + e * S - U + N, G = (e) => T + e * C + P, K = (t, n) => s ? n * i(Math.min((t + u) / (b * .18), (b - t) / (b * .18))) : e.fade(t + u * .5) * n, q = (e, t, n, r, i) => {
			t <= e || (l.strokeStyle = r, l.lineWidth = i, l.beginPath(), l.moveTo(e, n), l.lineTo(t, n), l.stroke());
		};
		l.lineCap = "round";
		let J = [];
		for (let e = 0; e < _; e++) {
			let t = W(e), i = G(e);
			if (t > b + 4 || t + u < -4) continue;
			let a = n(d(M, e * .15, e * .15 + .9));
			if (a <= 0) continue;
			let s = K(t, a);
			if (s <= .003) continue;
			let c = B(e), _ = j ? 1 : n(d(R, c, c + .45)), v = j ? 0 : Math.max(0, 1 - Math.abs(R - c - .25) / .55) * V, y = e === 0 ? g : m, x = u * .16;
			l.globalAlpha = s, l.setLineDash([]), l.fillStyle = "rgba(24,20,64,.94)", l.beginPath(), l.moveTo(t, i), l.lineTo(t + u - x, i), l.lineTo(t + u, i + x), l.lineTo(t + u, i + f), l.lineTo(t, i + f), l.closePath(), l.fill(), l.setLineDash([.001, F * 1.3]), l.lineWidth = I * 1.6, l.strokeStyle = v > 0 ? r(y, .3 + .55 * v) : r(h, .3), l.stroke(), l.beginPath(), l.moveTo(t + u - x, i), l.lineTo(t + u - x, i + x), l.lineTo(t + u, i + x), l.stroke(), l.setLineDash([.001, F]), o[e].forEach((n, a) => {
				let o = a === H[e], s = n.len + (n.alt - n.len) * (o ? _ : 0), c = t + u * .12, l = c + u * .74 * s, d = k(i, n);
				for (let e = 0; e < (n.head ? 2 : 1); e++) {
					let t = d + e * F;
					q(c, l, t, r(n.head ? h : p, (n.head ? .55 : .5) * (o ? 1 - _ * V * .8 : 1)), I * 2), o && _ * V > 0 && q(c, c + (l - c) * _, t, r(y, .95 * V), I * 2.3);
				}
				o && e < 5 && J.push({
					k: e,
					xa: l,
					ya: d
				});
			});
		}
		if (l.globalAlpha = 1, l.setLineDash([]), !j) for (let e of J) {
			let t = e.k, a = W(t + 1) + u * .12, p = k(G(t + 1), o[t + 1][H[t + 1]]), h = d(R, B(t) + .3, B(t + 1));
			if (h <= 0 || h >= 1) continue;
			let _ = s ? f * .12 : C * .3;
			for (let o = 0; o < 4; o++) {
				let s = n(i(h - o * .06)), d = e.xa + (a - e.xa) * s, f = e.ya + (p - e.ya) * s - Math.sin(Math.PI * s) * _;
				l.globalAlpha = K(d - u * .5, 1) * Math.sin(Math.PI * h) * (1 - o * .25), l.fillStyle = r(t === 0 && h < .5 ? g : m, .95), l.beginPath(), l.arc(d, f, I * (1.9 - o * .35), 0, c), l.fill();
			}
		}
		l.globalAlpha = 1;
	}
	return l(e, {
		name: "conductor",
		draw: A,
		still: y
	});
}
var p, m, h, g, _, v, y, b, x, S = e((() => {
	s(), p = [
		146,
		138,
		205
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
	], _ = 6, v = 1.2, y = 4.2, b = [
		{
			y: 0,
			head: 1
		},
		{ y: 2 },
		{ y: 3 },
		{ y: 4 },
		{ y: 5.6 },
		{ y: 6.6 },
		{ y: 7.6 },
		{ y: 9.2 },
		{ y: 10.2 },
		{ y: 11.2 }
	], x = 12.2;
})), C = /* @__PURE__ */ t((() => {
	S(), o(), document.querySelectorAll("[data-pv=\"conductor-hero-bg\"]").forEach((e) => f(e)), document.querySelectorAll("[data-pv=\"platform-connect\"]").forEach((e) => u(e));
}));
//#endregion
export default C();
