import { n as e, t } from "./rolldown-runtime-wf392T_D.mjs";
import { a as n, d as r, l as i, n as a, o, r as s, s as c, t as l, u } from "./platform-connect-Bf2sdhRo.mjs";
//#region src/response-hero-bg.js
function d(e) {
	if (!e || e.dataset.pvInit) return;
	let t = i(5), a = () => Math.sqrt(-2 * Math.log(t() + 1e-9)) * Math.cos(s * t()), o = (e) => .14 + .48 * e, l = (e) => .26 * r(.5, .88, e), d = [];
	for (let e = 0; e < v; e++) {
		let n = t(), r = e & 1, i = a() * .035;
		d.push({
			u: n,
			arm: r,
			ph: t() * s,
			x0: t(),
			y0: .48 + a() * .15,
			y1: o(n) + i,
			y2: o(n) + i + r * l(n),
			win: r === 1 && l(n) > .09
		});
	}
	function S(e, t) {
		let { ctx: r, W: i, H: a, mouse: o } = e, c = t % _;
		r.clearRect(0, 0, i, a);
		let l = -o.x * 12, v = -o.y * 8, S = (e) => i * (.04 + .92 * e) + l, C = (e) => a * (.92 - .78 * e) + v, w = n(u(c, g, 13)), T = n(u(c, h, 6.9)) * (1 - w), E = n(u(c, f, 1.2)), D = Math.max(1.3, Math.min(i, a) * .0019);
		for (let t of d) {
			let i = n(u(c, p + t.u * 1.4, p + t.u * 1.4 + 1.4)) * (1 - w), a = n(u(c, m + t.u * .6, m + t.u * .6 + 1.1)) * (1 - w), o = (1 - i) * .012 + .003, l = t.x0 + (t.u - t.x0) * i + o * Math.sin(c * .9 + t.ph), d = t.y0 + (t.y1 - t.y0) * i + (t.y2 - t.y1) * a + o * Math.cos(c * .8 + t.ph * 1.3), f = S(l), h = C(d), g = e.fade(f), _ = t.arm ? b : y, v = E * g * (.34 + .12 * i);
			r.fillStyle = `rgba(${_[0]},${_[1]},${_[2]},${v.toFixed(3)})`, r.beginPath(), r.arc(f, h, D, 0, s), r.fill(), t.win && T > 0 && (r.fillStyle = `rgba(${x[0]},${x[1]},${x[2]},${(T * g * .9).toFixed(3)})`, r.beginPath(), r.arc(f, h, D * 1.15, 0, s), r.fill());
		}
	}
	return c(e, {
		name: "response",
		draw: S,
		still: 9
	});
}
var f, p, m, h, g, _, v, y, b, x, S = e((() => {
	o(), f = 0, p = 1.6, m = 4.6, h = 6, g = 11, _ = 13.4, v = 1400, y = [
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
	S(), a(), document.querySelectorAll("[data-pv=\"response-hero-bg\"]").forEach((e) => d(e)), document.querySelectorAll("[data-pv=\"platform-connect\"]").forEach((e) => l(e));
}));
//#endregion
export default C();
