import { n as e, t } from "./rolldown-runtime-wf392T_D.mjs";
import { a as n, c as r, i, o as a, r as o, s, t as c } from "./hero-stage-DpBC6yvy.mjs";
import { n as l, t as u } from "./platform-connect-Dh9cewVn.mjs";
//#region src/portfolio-hero-bg.js
function d(e) {
	if (!e || e.dataset.pvInit) return;
	let t = -1, i = [];
	function l(e) {
		let t = s(e);
		i = [];
		for (let e = 0; e < _; e++) {
			let n = .05 + t() * .28, r = .3 + t() * .4;
			i.push({
				lo: n * r,
				hi: n * (1 - r),
				w: n,
				r0: e,
				del: t() * .8,
				c: [
					f,
					p,
					m
				][e % 3]
			});
		}
		let n = [...i.keys()].sort(() => t() - .5);
		i.forEach((e, t) => e.r0 = n[t]), [...i].sort((e, t) => t.w - e.w).forEach((e, t) => {
			e.r1 = t, e.pick = t < 2;
		});
	}
	function u(e, n) {
		let { ctx: s, W: u, H: d, mouse: f, reduce: p, flow: m } = e, _ = p ? 0 : Math.floor(n / w), T = p ? n : n % w;
		_ !== t && (t = _, l(71 + _ * 5)), s.clearRect(0, 0, u, d);
		let E = -f.x * 12, D = -f.y * 8, O = Math.max(5, Math.min(u, d) * .0085), k = u * (m ? y : v) + E, A = (e) => d * (.17 + e * .083) + D, j = (e) => u * e, M = 1 - o(r(T, C, 12)), N = o(r(T, S, 6.6)), P = Math.max(1.3, O * .25);
		for (let e = A(-.6); e < A(8.6); e += O) s.fillStyle = a(h, .22 * M), s.fillRect(k - .6, e, 1.2, 1.2);
		for (let t of i) {
			let n = o(r(T, b + t.del, b + t.del + 1.4)) * M, i = o(r(T, x + t.r1 * .08, x + t.r1 * .08 + 1.2)), l = A(t.r0 + (t.r1 - t.r0) * i), u = t.pick ? N : 0, d = t.pick ? 1 : 1 - .35 * N, f = j(t.lo) * n, p = j(t.hi) * n;
			for (let n = 0; n < 2; n++) {
				let r = l + (n - .5) * O;
				for (let n = k - f; n <= k + p; n += O) {
					let i = e.fade(n);
					u < 1 && (s.fillStyle = a(t.c, .4 * i * d * (1 - u) * M), s.beginPath(), s.arc(n, r, P, 0, c), s.fill()), u > 0 && (s.fillStyle = a(g, .85 * i * u * M), s.beginPath(), s.arc(n, r, P, 0, c), s.fill());
				}
			}
		}
	}
	return n(e, {
		name: "portfolio",
		draw: u,
		still: T
	});
}
var f, p, m, h, g, _, v, y, b, x, S, C, w, T, E = e((() => {
	i(), f = [
		146,
		138,
		205
	], p = [
		120,
		168,
		224
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
	], _ = 9, v = .62, y = .5, b = .6, x = 3.4, S = 5.6, C = 10.4, w = 12.6, T = 8.5;
})), D = /* @__PURE__ */ t((() => {
	E(), l(), document.querySelectorAll("[data-pv=\"portfolio-hero-bg\"]").forEach((e) => d(e)), document.querySelectorAll("[data-pv=\"platform-connect\"]").forEach((e) => u(e));
}));
//#endregion
export default D();
