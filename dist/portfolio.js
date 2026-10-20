import { n as e, t } from "./rolldown-runtime-wf392T_D.mjs";
import { a as n, c as r, i, o as a, r as o, s, t as c } from "./hero-stage-DpBC6yvy.mjs";
//#region src/portfolio-hero-bg.js
function l(e) {
	if (!e || e.dataset.pvInit) return;
	let t = -1, i = [];
	function l(e) {
		let t = s(e);
		i = [];
		for (let e = 0; e < h; e++) {
			let n = .05 + t() * .28, r = .3 + t() * .4;
			i.push({
				lo: n * r,
				hi: n * (1 - r),
				w: n,
				r0: e,
				del: t() * .8,
				c: [
					u,
					d,
					f
				][e % 3]
			});
		}
		let n = [...i.keys()].sort(() => t() - .5);
		i.forEach((e, t) => e.r0 = n[t]), [...i].sort((e, t) => t.w - e.w).forEach((e, t) => {
			e.r1 = t, e.pick = t < 2;
		});
	}
	function w(e, n) {
		let { ctx: s, W: u, H: d, mouse: f, reduce: h, flow: C } = e, w = h ? 0 : Math.floor(n / S), T = h ? n : n % S;
		w !== t && (t = w, l(71 + w * 5)), s.clearRect(0, 0, u, d);
		let E = -f.x * 12, D = -f.y * 8, O = Math.max(5, Math.min(u, d) * .0085), k = u * (C ? _ : g) + E, A = (e) => d * (.17 + e * .083) + D, j = (e) => u * e, M = 1 - o(r(T, x, 12)), N = o(r(T, b, 6.6)), P = Math.max(1.3, O * .25);
		for (let e = A(-.6); e < A(8.6); e += O) s.fillStyle = a(p, .22 * M), s.fillRect(k - .6, e, 1.2, 1.2);
		for (let t of i) {
			let n = o(r(T, v + t.del, v + t.del + 1.4)) * M, i = o(r(T, y + t.r1 * .08, y + t.r1 * .08 + 1.2)), l = A(t.r0 + (t.r1 - t.r0) * i), u = t.pick ? N : 0, d = t.pick ? 1 : 1 - .35 * N, f = j(t.lo) * n, p = j(t.hi) * n;
			for (let n = 0; n < 2; n++) {
				let r = l + (n - .5) * O;
				for (let n = k - f; n <= k + p; n += O) {
					let i = e.fade(n);
					u < 1 && (s.fillStyle = a(t.c, .4 * i * d * (1 - u) * M), s.beginPath(), s.arc(n, r, P, 0, c), s.fill()), u > 0 && (s.fillStyle = a(m, .85 * i * u * M), s.beginPath(), s.arc(n, r, P, 0, c), s.fill());
				}
			}
		}
	}
	return n(e, {
		name: "portfolio",
		draw: w,
		still: C
	});
}
var u, d, f, p, m, h, g, _, v, y, b, x, S, C, w = e((() => {
	i(), u = [
		146,
		138,
		205
	], d = [
		120,
		168,
		224
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
	], h = 9, g = .62, _ = .5, v = .6, y = 3.4, b = 5.6, x = 10.4, S = 12.6, C = 8.5;
})), T = /* @__PURE__ */ t((() => {
	w(), document.querySelectorAll("[data-pv=\"portfolio-hero-bg\"]").forEach((e) => l(e));
}));
//#endregion
export default T();
