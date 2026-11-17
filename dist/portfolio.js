import { n as e, t } from "./rolldown-runtime-wf392T_D.mjs";
import { a as n, c as r, i, o as a, r as o, s, t as c } from "./hero-stage-DpBC6yvy.mjs";
import { n as l, t as u } from "./platform-connect-cards-C5Y4IjAO.mjs";
import { n as d, t as f } from "./viz-CS9SStLT.mjs";
//#region src/portfolio-hero-bg.js
function p(e) {
	if (!e || e.dataset.pvInit) return;
	let t = -1, i = [];
	function l(e) {
		let t = s(e);
		i = [];
		for (let e = 0; e < y; e++) {
			let n = .05 + t() * .28, r = .3 + t() * .4;
			i.push({
				lo: n * r,
				hi: n * (1 - r),
				w: n,
				r0: e,
				del: t() * .8,
				c: [
					m,
					h,
					g
				][e % 3]
			});
		}
		let n = [...i.keys()].sort(() => t() - .5);
		i.forEach((e, t) => e.r0 = n[t]), [...i].sort((e, t) => t.w - e.w).forEach((e, t) => {
			e.r1 = t, e.pick = t < 2;
		});
	}
	function u(e, n) {
		let { ctx: s, W: u, H: d, mouse: f, reduce: p, flow: m } = e, h = p ? 0 : Math.floor(n / E), g = p ? n : n % E;
		h !== t && (t = h, l(71 + h * 5)), s.clearRect(0, 0, u, d);
		let y = -f.x * 12, D = -f.y * 8, O = Math.max(5, Math.min(u, d) * .0085), k = u * (m ? x : b) + y, A = (e) => d * (.17 + e * .083) + D, j = (e) => u * e, M = 1 - o(r(g, T, 12)), N = o(r(g, w, 6.6)), P = Math.max(1.3, O * .25);
		for (let e = A(-.6); e < A(8.6); e += O) s.fillStyle = a(_, .22 * M), s.fillRect(k - .6, e, 1.2, 1.2);
		for (let t of i) {
			let n = o(r(g, S + t.del, S + t.del + 1.4)) * M, i = o(r(g, C + t.r1 * .08, C + t.r1 * .08 + 1.2)), l = A(t.r0 + (t.r1 - t.r0) * i), u = t.pick ? N : 0, d = t.pick ? 1 : 1 - .35 * N, f = j(t.lo) * n, p = j(t.hi) * n;
			for (let n = 0; n < 2; n++) {
				let r = l + (n - .5) * O;
				for (let n = k - f; n <= k + p; n += O) {
					let i = e.fade(n);
					u < 1 && (s.fillStyle = a(t.c, .4 * i * d * (1 - u) * M), s.beginPath(), s.arc(n, r, P, 0, c), s.fill()), u > 0 && (s.fillStyle = a(v, .85 * i * u * M), s.beginPath(), s.arc(n, r, P, 0, c), s.fill());
				}
			}
		}
	}
	return n(e, {
		name: "portfolio",
		draw: u,
		still: D
	});
}
var m, h, g, _, v, y, b, x, S, C, w, T, E, D, O = e((() => {
	i(), m = [
		146,
		138,
		205
	], h = [
		120,
		168,
		224
	], g = [
		127,
		232,
		207
	], _ = [
		199,
		196,
		226
	], v = [
		226,
		199,
		10
	], y = 9, b = .62, x = .5, S = .6, C = 3.4, w = 5.6, T = 10.4, E = 12.6, D = 8.5;
})), k = /* @__PURE__ */ t((() => {
	O(), d(), l(), document.querySelectorAll("[data-pv=\"portfolio-hero-bg\"]").forEach((e) => p(e)), document.querySelectorAll("[data-pv=\"viz\"]").forEach((e) => f(e)), document.querySelectorAll("[data-pv=\"platform-connect-v2\"]").forEach((e) => u(e));
}));
//#endregion
export default k();
