import { n as e, t } from "./rolldown-runtime-wf392T_D.mjs";
import { a as n, c as r, i, n as a, o, r as s, s as c, t as l } from "./hero-stage-DpBC6yvy.mjs";
import { n as u, t as d } from "./platform-connect-Dh9cewVn.mjs";
//#region src/conductor-hero-bg.js
function f(e) {
	if (!e || e.dataset.pvInit) return;
	let t = c(83), i = [...Array(_)].map(() => b.map((e, n) => ({
		...e,
		len: e.head ? .42 + t() * .2 : n % 3 == 0 ? .3 + t() * .3 : .82 + t() * .18,
		alt: .4 + t() * .55
	}))), u = !1, d = 0, f = 0, S = 0, C = 0, w = 0, T = 0, E = 6.5, D = .42;
	function O({ W: e, H: t, flow: n }) {
		u = n, u ? (E = 8, D = .7, d = Math.min(e * .36, t * .72 / 1.32), f = d * 1.32, S = d * 1.14, C = 0, w = (e - d) / 2, T = (t - f) / 2) : (E = 6.5, D = .42, d = Math.min(e * .5 / 4.9, t * .3), S = d * .78, f = d * 1.32, C = Math.min(f * .46, (t * .8 - f) / 5), w = e * .965 - (d + S * 5), T = (t - (f + C * 5)) / 2);
	}
	let k = (e, t) => e + f * .13 + t.y * (f * .74 / x);
	function A(e, t) {
		let { ctx: n, W: b, H: x, mouse: A, reduce: j } = e;
		O(e);
		let M = j ? t + v + 2 : t;
		n.clearRect(0, 0, b, x);
		let N = -A.x * 12, P = -A.y * 8, F = d / 30, I = Math.max(1.1, F * .32), L = j ? 0 : Math.floor(Math.max(0, M - v) / E), R = j ? y : Math.max(0, M - v) % E, z = c(500 + L), B = (e) => .5 + e * D, V = j ? 1 : 1 - s(r(R, E - 1.4, E - .5)), H = i.map((e, t) => {
			let n = e.map((e, t) => t).filter((n) => !e[n].head && (u || t === 5 || k(0, e[n]) < C * .9));
			return n.length ? n[Math.floor(z() * n.length)] : 1;
		}), U = 0;
		if (u && !j) {
			let e = a((R - B(0)) / D / 5) * 5, t = s(r(R, E - 1.2, E - .1));
			U = s(e / 5) * 5 * S * (1 - t);
		}
		let W = (e) => w + e * S - U + N, G = (e) => T + e * C + P, K = (t, n) => u ? n * a(Math.min((t + d) / (b * .18), (b - t) / (b * .18))) : e.fade(t + d * .5) * n, q = (e, t, r, i, a) => {
			t <= e || (n.strokeStyle = i, n.lineWidth = a, n.beginPath(), n.moveTo(e, r), n.lineTo(t, r), n.stroke());
		};
		n.lineCap = "round";
		let J = [];
		for (let e = 0; e < _; e++) {
			let t = W(e), a = G(e);
			if (t > b + 4 || t + d < -4) continue;
			let c = s(r(M, e * .15, e * .15 + .9));
			if (c <= 0) continue;
			let l = K(t, c);
			if (l <= .003) continue;
			let u = B(e), _ = j ? 1 : s(r(R, u, u + .45)), v = j ? 0 : Math.max(0, 1 - Math.abs(R - u - .25) / .55) * V, y = e === 0 ? g : m, x = d * .16;
			n.globalAlpha = l, n.setLineDash([]), n.fillStyle = "rgba(24,20,64,.94)", n.beginPath(), n.moveTo(t, a), n.lineTo(t + d - x, a), n.lineTo(t + d, a + x), n.lineTo(t + d, a + f), n.lineTo(t, a + f), n.closePath(), n.fill(), n.setLineDash([.001, F * 1.3]), n.lineWidth = I * 1.6, n.strokeStyle = v > 0 ? o(y, .3 + .55 * v) : o(h, .3), n.stroke(), n.beginPath(), n.moveTo(t + d - x, a), n.lineTo(t + d - x, a + x), n.lineTo(t + d, a + x), n.stroke(), n.setLineDash([.001, F]), i[e].forEach((n, r) => {
				let i = r === H[e], s = n.len + (n.alt - n.len) * (i ? _ : 0), c = t + d * .12, l = c + d * .74 * s, u = k(a, n);
				for (let e = 0; e < (n.head ? 2 : 1); e++) {
					let t = u + e * F;
					q(c, l, t, o(n.head ? h : p, (n.head ? .55 : .5) * (i ? 1 - _ * V * .8 : 1)), I * 2), i && _ * V > 0 && q(c, c + (l - c) * _, t, o(y, .95 * V), I * 2.3);
				}
				i && e < 5 && J.push({
					k: e,
					xa: l,
					ya: u
				});
			});
		}
		if (n.globalAlpha = 1, n.setLineDash([]), !j) for (let e of J) {
			let t = e.k, c = W(t + 1) + d * .12, p = k(G(t + 1), i[t + 1][H[t + 1]]), h = r(R, B(t) + .3, B(t + 1));
			if (h <= 0 || h >= 1) continue;
			let _ = u ? f * .12 : C * .3;
			for (let r = 0; r < 4; r++) {
				let i = s(a(h - r * .06)), u = e.xa + (c - e.xa) * i, f = e.ya + (p - e.ya) * i - Math.sin(Math.PI * i) * _;
				n.globalAlpha = K(u - d * .5, 1) * Math.sin(Math.PI * h) * (1 - r * .25), n.fillStyle = o(t === 0 && h < .5 ? g : m, .95), n.beginPath(), n.arc(u, f, I * (1.9 - r * .35), 0, l), n.fill();
			}
		}
		n.globalAlpha = 1;
	}
	return n(e, {
		name: "conductor",
		draw: A,
		still: y
	});
}
var p, m, h, g, _, v, y, b, x, S = e((() => {
	i(), p = [
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
	S(), u(), document.querySelectorAll("[data-pv=\"conductor-hero-bg\"]").forEach((e) => f(e)), document.querySelectorAll("[data-pv=\"platform-connect\"]").forEach((e) => d(e));
}));
//#endregion
export default C();
