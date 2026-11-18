import { n as e } from "./rolldown-runtime-wf392T_D.mjs";
import { _ as t, a as n, d as r, f as i, l as a, m as o, n as s, o as c, p as l, s as u, u as d, v as f } from "./bonv-draw-Db5acgQk.mjs";
//#region src/mini-scene.js
function p(e) {
	let t = b[e.dataset.scene] || b.rank, n = m[(+e.dataset.col || 0) % m.length];
	return a(e, {
		aspect: () => .62,
		loop: h.loop,
		fade: h.fade,
		still: h.p1 + .5,
		layout: (e) => {
			e.S = d(e.W / 400, .7, 1.2);
		},
		draw: (e, r) => {
			e.x.lineCap = "round", e.x.lineJoin = "round", t(e, e.W, e.H, f(r, h.p0, h.p1), n);
		}
	});
}
var m, h, g, _, v, y, b, x = e((() => {
	r(), m = [
		s[0],
		s[1],
		s[2],
		s[3],
		s[5]
	], h = {
		p0: .4,
		p1: 4.4,
		fade: 6.4,
		loop: 7
	}, g = t(7), _ = Array.from({ length: 40 }, (e, t) => ({
		x: t % 8 / 7 - .5 + (g() - .5) * .06,
		y: Math.floor(t / 8) / 4 - .5 + (g() - .5) * .08,
		rec: g() < .38,
		d: g()
	})), v = Array.from({ length: 46 }, () => ({
		x: g() - .5,
		y: (g() - .5) * .8,
		resp: g() < .42,
		d: g()
	})), y = [
		.48,
		.86,
		.32,
		.7,
		.58
	], b = {
		rank(e, t, n, r, a) {
			let s = y.map((e, t) => t).sort((e, t) => y[t] - y[e]), c = i(f(r, .2, .65)), d = n / 6.2, p = t * .14;
			y.forEach((i, m) => {
				let h = l(m, s.indexOf(m), c), g = s.indexOf(m) === 0 && c > .95, _ = n * .2 + h * d;
				e.line(p, _, t * .86, _, u, .1, 4 * e.S), e.line(p, _, p + t * .72 * i * o(f(r, 0, .25)), _, g ? a : u, g ? 1 : .6, 5.5 * e.S), g && e.dot(p + t * .72 * i, _, 6 * e.S, a, 1);
			});
		},
		curve(e, t, r, a, o) {
			let s = t * .14, c = t * .88, d = r * .2, p = r * .8;
			e.line(s, p, c, p, u, .3, 1.5 * e.S), e.line(s, d, s, p, u, .3, 1.5 * e.S);
			let m = i(f(a, 0, .5)), h = (e) => [l(s, c, e), p - (p - d) * (.06 + .86 * (1 - (1 - e) ** 2.4))], g = [];
			for (let e = 0; e <= Math.ceil(36 * m); e++) g.push(h(Math.min(e / 36, m)));
			e.poly(g, u, .95, 3.2 * e.S);
			let _ = i(f(a, .55, .9));
			if (_ > 0) {
				let t = h(l(.15, .5, _));
				e.x.save(), e.x.setLineDash([3 * e.S, 4 * e.S]), e.line(t[0], t[1], t[0], p, u, .45, 1.5 * e.S), e.line(s, t[1], t[0], t[1], u, .45, 1.5 * e.S), e.x.restore(), e.dot(t[0], t[1], 5.5 * e.S, o, 1), e.x.strokeStyle = o, e.x.globalAlpha = .7, e.x.lineWidth = 2 * e.S, e.x.beginPath(), e.x.arc(t[0], t[1], 11 * e.S, 0, n), e.x.stroke(), e.x.globalAlpha = 1;
			}
		},
		sites(e, t, n, r, i) {
			_.forEach((a) => {
				let s = a.rec ? o(f(r, .1 + a.d * .55, .25 + a.d * .55)) : 0;
				e.dot(t / 2 + a.x * t * .74, n / 2 + a.y * n * .62, (3 + 2.2 * s) * e.S, s > 0 ? i : u, s > 0 ? .5 + .5 * s : .32);
			});
		},
		split(e, t, n, r, a) {
			let o = i(f(r, .15, .7));
			o > .6 && e.line(t / 2, n * .16, t / 2, n * .84, u, .32 * f(o, .6, 1), 1.5 * e.S), v.forEach((r) => {
				let i = (r.resp ? -.2 : .2) + r.x * .32, s = l(r.x * .8, i, o);
				e.dot(t / 2 + s * t * .8, n / 2 + r.y * n * .7, 3.6 * e.S, r.resp && o > .3 ? a : u, r.resp ? .5 + .5 * o : .36);
			});
		},
		doc(e, t, n, r, i) {
			let a = t * .16, s = n / 8.5;
			for (let l = 0; l < 6; l++) {
				let d = n * .22 + l * s, p = o(f(r, .04 + l * .07, .2 + l * .07)), m = t * (l === 0 ? .4 : l % 3 == 2 ? .46 : .58);
				e.line(a, d, a + m * p, d, u, l === 0 ? .9 : .5, (l === 0 ? 5.5 : 3.5) * e.S);
				let h = f(r, .55 + l * .06, .66 + l * .06);
				if (h > 0) {
					let n = t * .84;
					e.poly([
						[n - 6 * e.S, d],
						[n - 2 * e.S, d + 4 * e.S],
						[n + 6 * e.S, d - 5 * e.S]
					].slice(0, h > .5 ? 3 : 2), l === 5 ? i : c, h, 2.6 * e.S);
				}
			}
		}
	};
}));
//#endregion
export { x as n, p as t };
