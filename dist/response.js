import { n as e, t } from "./rolldown-runtime-wf392T_D.mjs";
import { a as n, c as r, i, l as a, r as o, s, t as c } from "./hero-stage-DpBC6yvy.mjs";
import { n as l, t as u } from "./platform-connect-cards-C5Y4IjAO.mjs";
import { n as d, t as f } from "./platform-connect-Dh9cewVn.mjs";
import { n as p, t as m } from "./viz-CS9SStLT.mjs";
//#region src/response-hero-bg.js
function h(e) {
	if (!e || e.dataset.pvInit) return;
	let t = s(5), i = () => Math.sqrt(-2 * Math.log(t() + 1e-9)) * Math.cos(c * t()), l = (e) => .14 + .48 * e, u = (e) => .26 * a(.5, .88, e), d = [];
	for (let e = 0; e < S; e++) {
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
		let { ctx: n, W: i, H: a, mouse: s } = e, l = t % x;
		n.clearRect(0, 0, i, a);
		let u = -s.x * 12, f = -s.y * 8, p = (e) => i * (.04 + .92 * e) + u, m = (e) => a * (.92 - .78 * e) + f, h = o(r(l, b, 13)), S = o(r(l, y, 6.9)) * (1 - h), E = o(r(l, g, 1.2)), D = Math.max(1.3, Math.min(i, a) * .0019);
		for (let t of d) {
			let i = o(r(l, _ + t.u * 1.4, _ + t.u * 1.4 + 1.4)) * (1 - h), a = o(r(l, v + t.u * .6, v + t.u * .6 + 1.1)) * (1 - h), s = (1 - i) * .012 + .003, u = t.x0 + (t.u - t.x0) * i + s * Math.sin(l * .9 + t.ph), d = t.y0 + (t.y1 - t.y0) * i + (t.y2 - t.y1) * a + s * Math.cos(l * .8 + t.ph * 1.3), f = p(u), g = m(d), y = e.fade(f), b = t.arm ? w : C, x = E * y * (.34 + .12 * i);
			n.fillStyle = `rgba(${b[0]},${b[1]},${b[2]},${x.toFixed(3)})`, n.beginPath(), n.arc(f, g, D, 0, c), n.fill(), t.win && S > 0 && (n.fillStyle = `rgba(${T[0]},${T[1]},${T[2]},${(S * y * .9).toFixed(3)})`, n.beginPath(), n.arc(f, g, D * 1.15, 0, c), n.fill());
		}
	}
	return n(e, {
		name: "response",
		draw: f,
		still: 9
	});
}
var g, _, v, y, b, x, S, C, w, T, E = e((() => {
	i(), g = 0, _ = 1.6, v = 4.6, y = 6, b = 11, x = 13.4, S = 1400, C = [
		146,
		138,
		205
	], w = [
		120,
		168,
		224
	], T = [
		226,
		199,
		10
	];
})), D = /* @__PURE__ */ t((() => {
	E(), d(), l(), p(), document.querySelectorAll("[data-pv=\"response-hero-bg\"]").forEach((e) => h(e)), document.querySelectorAll("[data-pv=\"platform-connect\"]").forEach((e) => f(e)), document.querySelectorAll("[data-pv=\"viz\"]").forEach((e) => m(e)), document.querySelectorAll("[data-pv=\"platform-connect-v2\"]").forEach((e) => u(e));
}));
//#endregion
export default D();
