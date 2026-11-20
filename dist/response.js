import { n as e, t } from "./rolldown-runtime-wf392T_D.mjs";
import { a as n, c as r, i, l as a, r as o, s, t as c } from "./hero-stage-DpBC6yvy.mjs";
import { n as l, t as u } from "./platform-connect-tree-CuHhjRi6.mjs";
import { n as d, t as f } from "./viz-CS9SStLT.mjs";
//#region src/response-hero-bg.js
function p(e) {
	if (!e || e.dataset.pvInit) return;
	let t = s(5), i = () => Math.sqrt(-2 * Math.log(t() + 1e-9)) * Math.cos(c * t()), l = (e) => .14 + .48 * e, u = (e) => .26 * a(.5, .88, e), d = [];
	for (let e = 0; e < b; e++) {
		let n = t(), r = e & 1, a = i() * .035;
		d.push({
			u: n,
			arm: r,
			ph: t() * c,
			x0: t(),
			y0: .48 + i() * .15,
			y1: l(n) + a,
			y2: l(n) + a + r * u(n),
			win: r === 1 && u(n) > .09
		});
	}
	function f(e, t) {
		let { ctx: n, W: i, H: a, mouse: s } = e, l = t % y;
		n.clearRect(0, 0, i, a);
		let u = -s.x * 12, f = -s.y * 8, p = (e) => i * (.04 + .92 * e) + u, b = (e) => a * (.92 - .78 * e) + f, w = o(r(l, v, 13)), T = o(r(l, _, 6.9)) * (1 - w), E = o(r(l, m, 1.2)), D = Math.max(1.3, Math.min(i, a) * .0019);
		for (let t of d) {
			let i = o(r(l, h + t.u * 1.4, h + t.u * 1.4 + 1.4)) * (1 - w), a = o(r(l, g + t.u * .6, g + t.u * .6 + 1.1)) * (1 - w), s = (1 - i) * .012 + .003, u = t.x0 + (t.u - t.x0) * i + s * Math.sin(l * .9 + t.ph), d = t.y0 + (t.y1 - t.y0) * i + (t.y2 - t.y1) * a + s * Math.cos(l * .8 + t.ph * 1.3), f = p(u), m = b(d), _ = e.fade(f), v = t.arm ? S : x, y = E * _ * (.34 + .12 * i);
			n.fillStyle = `rgba(${v[0]},${v[1]},${v[2]},${y.toFixed(3)})`, n.beginPath(), n.arc(f, m, D, 0, c), n.fill(), t.win && T > 0 && (n.fillStyle = `rgba(${C[0]},${C[1]},${C[2]},${(T * _ * .9).toFixed(3)})`, n.beginPath(), n.arc(f, m, D * 1.15, 0, c), n.fill());
		}
	}
	return n(e, {
		name: "response",
		draw: f,
		still: 9
	});
}
var m, h, g, _, v, y, b, x, S, C, w = e((() => {
	i(), m = 0, h = 1.6, g = 4.6, _ = 6, v = 11, y = 13.4, b = 1400, x = [
		146,
		138,
		205
	], S = [
		120,
		168,
		224
	], C = [
		226,
		199,
		10
	];
})), T = /* @__PURE__ */ t((() => {
	w(), l(), d(), document.querySelectorAll("[data-pv=\"response-hero-bg\"]").forEach((e) => p(e)), document.querySelectorAll("[data-pv=\"viz\"]").forEach((e) => f(e)), document.querySelectorAll("[data-pv=\"platform-connect-v2\"]").forEach((e) => u(e));
}));
//#endregion
export default T();
