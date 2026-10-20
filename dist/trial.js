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
})), T = /* @__PURE__ */ t((() => {
	w(), document.querySelectorAll("[data-pv=\"trial-hero-bg\"]").forEach((e) => c(e));
}));
//#endregion
export default T();
