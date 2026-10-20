import { n as e, t } from "./rolldown-runtime-wf392T_D.mjs";
import { a as n, c as r, i, l as a, r as o, s, t as c } from "./hero-stage-DpBC6yvy.mjs";
//#region src/response-hero-bg.js
function l(e) {
	if (!e || e.dataset.pvInit) return;
	let t = s(5), i = () => Math.sqrt(-2 * Math.log(t() + 1e-9)) * Math.cos(c * t()), l = (e) => .14 + .48 * e, b = (e) => .26 * a(.5, .88, e), x = [];
	for (let e = 0; e < g; e++) {
		let n = t(), r = e & 1, a = i() * .035;
		x.push({
			u: n,
			arm: r,
			ph: t() * c,
			x0: t(),
			y0: .48 + i() * .15,
			y1: l(n) + a,
			y2: l(n) + a + r * b(n),
			win: r === 1 && b(n) > .09
		});
	}
	function S(e, t) {
		let { ctx: n, W: i, H: a, mouse: s } = e, l = t % h;
		n.clearRect(0, 0, i, a);
		let g = -s.x * 12, b = -s.y * 8, S = (e) => i * (.04 + .92 * e) + g, C = (e) => a * (.92 - .78 * e) + b, w = o(r(l, m, 13)), T = o(r(l, p, 6.9)) * (1 - w), E = o(r(l, u, 1.2)), D = Math.max(1.3, Math.min(i, a) * .0019);
		for (let t of x) {
			let i = o(r(l, d + t.u * 1.4, d + t.u * 1.4 + 1.4)) * (1 - w), a = o(r(l, f + t.u * .6, f + t.u * .6 + 1.1)) * (1 - w), s = (1 - i) * .012 + .003, u = t.x0 + (t.u - t.x0) * i + s * Math.sin(l * .9 + t.ph), p = t.y0 + (t.y1 - t.y0) * i + (t.y2 - t.y1) * a + s * Math.cos(l * .8 + t.ph * 1.3), m = S(u), h = C(p), g = e.fade(m), b = t.arm ? v : _, x = E * g * (.34 + .12 * i);
			n.fillStyle = `rgba(${b[0]},${b[1]},${b[2]},${x.toFixed(3)})`, n.beginPath(), n.arc(m, h, D, 0, c), n.fill(), t.win && T > 0 && (n.fillStyle = `rgba(${y[0]},${y[1]},${y[2]},${(T * g * .9).toFixed(3)})`, n.beginPath(), n.arc(m, h, D * 1.15, 0, c), n.fill());
		}
	}
	return n(e, {
		name: "response",
		draw: S,
		still: 9
	});
}
var u, d, f, p, m, h, g, _, v, y, b = e((() => {
	i(), u = 0, d = 1.6, f = 4.6, p = 6, m = 11, h = 13.4, g = 1400, _ = [
		146,
		138,
		205
	], v = [
		120,
		168,
		224
	], y = [
		226,
		199,
		10
	];
})), x = /* @__PURE__ */ t((() => {
	b(), document.querySelectorAll("[data-pv=\"response-hero-bg\"]").forEach((e) => l(e));
}));
//#endregion
export default x();
