import { n as e, t } from "./rolldown-runtime-wf392T_D.mjs";
import { a as n, c as r, l as i, n as a, o, r as s, s as c, t as l, u } from "./platform-connect-Bf2sdhRo.mjs";
//#region src/portfolio-hero-bg.js
function d(e) {
	if (!e || e.dataset.pvInit) return;
	let t = -1, a = [];
	function o(e) {
		let t = i(e);
		a = [];
		for (let e = 0; e < _; e++) {
			let n = .05 + t() * .28, r = .3 + t() * .4;
			a.push({
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
		let n = [...a.keys()].sort(() => t() - .5);
		a.forEach((e, t) => e.r0 = n[t]), [...a].sort((e, t) => t.w - e.w).forEach((e, t) => {
			e.r1 = t, e.pick = t < 2;
		});
	}
	function l(e, i) {
		let { ctx: c, W: l, H: d, mouse: f, reduce: p, flow: m } = e, _ = p ? 0 : Math.floor(i / w), T = p ? i : i % w;
		_ !== t && (t = _, o(71 + _ * 5)), c.clearRect(0, 0, l, d);
		let E = -f.x * 12, D = -f.y * 8, O = Math.max(5, Math.min(l, d) * .0085), k = l * (m ? y : v) + E, A = (e) => d * (.17 + e * .083) + D, j = (e) => l * e, M = 1 - n(u(T, C, 12)), N = n(u(T, S, 6.6)), P = Math.max(1.3, O * .25);
		for (let e = A(-.6); e < A(8.6); e += O) c.fillStyle = r(h, .22 * M), c.fillRect(k - .6, e, 1.2, 1.2);
		for (let t of a) {
			let i = n(u(T, b + t.del, b + t.del + 1.4)) * M, a = n(u(T, x + t.r1 * .08, x + t.r1 * .08 + 1.2)), o = A(t.r0 + (t.r1 - t.r0) * a), l = t.pick ? N : 0, d = t.pick ? 1 : 1 - .35 * N, f = j(t.lo) * i, p = j(t.hi) * i;
			for (let n = 0; n < 2; n++) {
				let i = o + (n - .5) * O;
				for (let n = k - f; n <= k + p; n += O) {
					let a = e.fade(n);
					l < 1 && (c.fillStyle = r(t.c, .4 * a * d * (1 - l) * M), c.beginPath(), c.arc(n, i, P, 0, s), c.fill()), l > 0 && (c.fillStyle = r(g, .85 * a * l * M), c.beginPath(), c.arc(n, i, P, 0, s), c.fill());
				}
			}
		}
	}
	return c(e, {
		name: "portfolio",
		draw: l,
		still: T
	});
}
var f, p, m, h, g, _, v, y, b, x, S, C, w, T, E = e((() => {
	o(), f = [
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
	E(), a(), document.querySelectorAll("[data-pv=\"portfolio-hero-bg\"]").forEach((e) => d(e)), document.querySelectorAll("[data-pv=\"platform-connect\"]").forEach((e) => l(e));
}));
//#endregion
export default D();
