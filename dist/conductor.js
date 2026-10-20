import { n as e, t } from "./rolldown-runtime-wf392T_D.mjs";
import { a as n, c as r, i, n as a, o, r as s, s as c, t as l } from "./hero-stage-DpBC6yvy.mjs";
//#region src/conductor-hero-bg.js
function u(e) {
	if (!e || e.dataset.pvInit) return;
	let t = c(83), i = [...Array(h)].map(() => v.map((e, n) => ({
		...e,
		len: e.head ? .42 + t() * .2 : n % 3 == 0 ? .3 + t() * .3 : .82 + t() * .18,
		alt: .4 + t() * .55
	}))), u = !1, b = 0, x = 0, S = 0, C = 0, w = 0, T = 0, E = 6.5, D = .42;
	function O({ W: e, H: t, flow: n }) {
		u = n, u ? (E = 8, D = .7, b = Math.min(e * .36, t * .72 / 1.32), x = b * 1.32, S = b * 1.14, C = 0, w = (e - b) / 2, T = (t - x) / 2) : (E = 6.5, D = .42, b = Math.min(e * .5 / 4.9, t * .3), S = b * .78, x = b * 1.32, C = Math.min(x * .46, (t * .8 - x) / 5), w = e * .965 - (b + S * 5), T = (t - (x + C * 5)) / 2);
	}
	let k = (e, t) => e + x * .13 + t.y * (x * .74 / y);
	function A(e, t) {
		let { ctx: n, W: v, H: y, mouse: A, reduce: j } = e;
		O(e);
		let M = j ? t + g + 2 : t;
		n.clearRect(0, 0, v, y);
		let N = -A.x * 12, P = -A.y * 8, F = b / 30, I = Math.max(1.1, F * .32), L = j ? 0 : Math.floor(Math.max(0, M - g) / E), R = j ? _ : Math.max(0, M - g) % E, z = c(500 + L), B = (e) => .5 + e * D, V = j ? 1 : 1 - s(r(R, E - 1.4, E - .5)), H = i.map((e, t) => {
			let n = e.map((e, t) => t).filter((n) => !e[n].head && (u || t === 5 || k(0, e[n]) < C * .9));
			return n.length ? n[Math.floor(z() * n.length)] : 1;
		}), U = 0;
		if (u && !j) {
			let e = a((R - B(0)) / D / 5) * 5, t = s(r(R, E - 1.2, E - .1));
			U = s(e / 5) * 5 * S * (1 - t);
		}
		let W = (e) => w + e * S - U + N, G = (e) => T + e * C + P, K = (t, n) => u ? n * a(Math.min((t + b) / (v * .18), (v - t) / (v * .18))) : e.fade(t + b * .5) * n, q = (e, t, r, i, a) => {
			t <= e || (n.strokeStyle = i, n.lineWidth = a, n.beginPath(), n.moveTo(e, r), n.lineTo(t, r), n.stroke());
		};
		n.lineCap = "round";
		let J = [];
		for (let e = 0; e < h; e++) {
			let t = W(e), a = G(e);
			if (t > v + 4 || t + b < -4) continue;
			let c = s(r(M, e * .15, e * .15 + .9));
			if (c <= 0) continue;
			let l = K(t, c);
			if (l <= .003) continue;
			let u = B(e), h = j ? 1 : s(r(R, u, u + .45)), g = j ? 0 : Math.max(0, 1 - Math.abs(R - u - .25) / .55) * V, _ = e === 0 ? m : f, y = b * .16;
			n.globalAlpha = l, n.setLineDash([]), n.fillStyle = "rgba(24,20,64,.94)", n.beginPath(), n.moveTo(t, a), n.lineTo(t + b - y, a), n.lineTo(t + b, a + y), n.lineTo(t + b, a + x), n.lineTo(t, a + x), n.closePath(), n.fill(), n.setLineDash([.001, F * 1.3]), n.lineWidth = I * 1.6, n.strokeStyle = g > 0 ? o(_, .3 + .55 * g) : o(p, .3), n.stroke(), n.beginPath(), n.moveTo(t + b - y, a), n.lineTo(t + b - y, a + y), n.lineTo(t + b, a + y), n.stroke(), n.setLineDash([.001, F]), i[e].forEach((n, r) => {
				let i = r === H[e], s = n.len + (n.alt - n.len) * (i ? h : 0), c = t + b * .12, l = c + b * .74 * s, u = k(a, n);
				for (let e = 0; e < (n.head ? 2 : 1); e++) {
					let t = u + e * F;
					q(c, l, t, o(n.head ? p : d, (n.head ? .55 : .5) * (i ? 1 - h * V * .8 : 1)), I * 2), i && h * V > 0 && q(c, c + (l - c) * h, t, o(_, .95 * V), I * 2.3);
				}
				i && e < 5 && J.push({
					k: e,
					xa: l,
					ya: u
				});
			});
		}
		if (n.globalAlpha = 1, n.setLineDash([]), !j) for (let e of J) {
			let t = e.k, c = W(t + 1) + b * .12, d = k(G(t + 1), i[t + 1][H[t + 1]]), p = r(R, B(t) + .3, B(t + 1));
			if (p <= 0 || p >= 1) continue;
			let h = u ? x * .12 : C * .3;
			for (let r = 0; r < 4; r++) {
				let i = s(a(p - r * .06)), u = e.xa + (c - e.xa) * i, g = e.ya + (d - e.ya) * i - Math.sin(Math.PI * i) * h;
				n.globalAlpha = K(u - b * .5, 1) * Math.sin(Math.PI * p) * (1 - r * .25), n.fillStyle = o(t === 0 && p < .5 ? m : f, .95), n.beginPath(), n.arc(u, g, I * (1.9 - r * .35), 0, l), n.fill();
			}
		}
		n.globalAlpha = 1;
	}
	return n(e, {
		name: "conductor",
		draw: A,
		still: _
	});
}
var d, f, p, m, h, g, _, v, y, b = e((() => {
	i(), d = [
		146,
		138,
		205
	], f = [
		127,
		232,
		207
	], p = [
		199,
		196,
		226
	], m = [
		226,
		199,
		10
	], h = 6, g = 1.2, _ = 4.2, v = [
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
	], y = 12.2;
})), x = /* @__PURE__ */ t((() => {
	b(), document.querySelectorAll("[data-pv=\"conductor-hero-bg\"]").forEach((e) => u(e));
}));
//#endregion
export default x();
