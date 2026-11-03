import { n as e, t } from "./rolldown-runtime-wf392T_D.mjs";
import { a as n, c as r, i, l as a, r as o, s, t as c } from "./hero-stage-DpBC6yvy.mjs";
import { n as l, t as u } from "./platform-connect-Dh9cewVn.mjs";
//#region src/response-hero-bg.js
function d(e) {
	if (!e || e.dataset.pvInit) return;
	let t = s(5), i = () => Math.sqrt(-2 * Math.log(t() + 1e-9)) * Math.cos(c * t()), l = (e) => .14 + .48 * e, u = (e) => .26 * a(.5, .88, e), d = [];
	for (let e = 0; e < v; e++) {
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
	function S(e, t) {
		let { ctx: n, W: i, H: a, mouse: s } = e, l = t % _;
		n.clearRect(0, 0, i, a);
		let u = -s.x * 12, v = -s.y * 8, S = (e) => i * (.04 + .92 * e) + u, C = (e) => a * (.92 - .78 * e) + v, w = o(r(l, g, 13)), T = o(r(l, h, 6.9)) * (1 - w), E = o(r(l, f, 1.2)), D = Math.max(1.3, Math.min(i, a) * .0019);
		for (let t of d) {
			let i = o(r(l, p + t.u * 1.4, p + t.u * 1.4 + 1.4)) * (1 - w), a = o(r(l, m + t.u * .6, m + t.u * .6 + 1.1)) * (1 - w), s = (1 - i) * .012 + .003, u = t.x0 + (t.u - t.x0) * i + s * Math.sin(l * .9 + t.ph), d = t.y0 + (t.y1 - t.y0) * i + (t.y2 - t.y1) * a + s * Math.cos(l * .8 + t.ph * 1.3), f = S(u), h = C(d), g = e.fade(f), _ = t.arm ? b : y, v = E * g * (.34 + .12 * i);
			n.fillStyle = `rgba(${_[0]},${_[1]},${_[2]},${v.toFixed(3)})`, n.beginPath(), n.arc(f, h, D, 0, c), n.fill(), t.win && T > 0 && (n.fillStyle = `rgba(${x[0]},${x[1]},${x[2]},${(T * g * .9).toFixed(3)})`, n.beginPath(), n.arc(f, h, D * 1.15, 0, c), n.fill());
		}
	}
	return n(e, {
		name: "response",
		draw: S,
		still: 9
	});
}
var f, p, m, h, g, _, v, y, b, x, S = e((() => {
	i(), f = 0, p = 1.6, m = 4.6, h = 6, g = 11, _ = 13.4, v = 1400, y = [
		146,
		138,
		205
	], b = [
		120,
		168,
		224
	], x = [
		226,
		199,
		10
	];
})), C = /* @__PURE__ */ t((() => {
	S(), l(), document.querySelectorAll("[data-pv=\"response-hero-bg\"]").forEach((e) => d(e)), document.querySelectorAll("[data-pv=\"platform-connect\"]").forEach((e) => u(e));
}));
//#endregion
export default C();
