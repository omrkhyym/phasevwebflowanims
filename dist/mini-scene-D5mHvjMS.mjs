import { n as e } from "./rolldown-runtime-wf392T_D.mjs";
import { c as t, d as n, i as r, l as i, m as a, n as o, o as s, p as c, r as l, s as u, t as d, u as f } from "./bonv-draw-D7G52O51.mjs";
//#region src/mini-scene.js
function p(e) {
	let t = b[e.dataset.scene] || b.rank, n = m[(+e.dataset.col || 0) % m.length];
	return s(e, {
		aspect: () => .62,
		loop: h.loop,
		fade: h.fade,
		still: h.p1 + .5,
		layout: (e) => {
			e.S = u(e.W / 400, .7, 1.2);
		},
		draw: (e, r) => {
			e.x.lineCap = "round", e.x.lineJoin = "round", t(e, e.W, e.H, a(r, h.p0, h.p1), n);
		}
	});
}
var m, h, g, _, v, y, b, x = e((() => {
	t(), m = [
		d[0],
		d[1],
		d[2],
		d[3],
		d[5]
	], h = {
		p0: .4,
		p1: 4.4,
		fade: 6.4,
		loop: 7
	}, g = c(7), _ = Array.from({ length: 40 }, (e, t) => ({
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
		rank(e, t, o, s, c) {
			let l = y.map((e, t) => t).sort((e, t) => y[t] - y[e]), u = i(a(s, .2, .65)), d = o / 6.2, p = t * .14;
			y.forEach((i, m) => {
				let h = f(m, l.indexOf(m), u), g = l.indexOf(m) === 0 && u > .95, _ = o * .2 + h * d;
				e.line(p, _, t * .86, _, r, .1, 4 * e.S), e.line(p, _, p + t * .72 * i * n(a(s, 0, .25)), _, g ? c : r, g ? 1 : .6, 5.5 * e.S), g && e.dot(p + t * .72 * i, _, 6 * e.S, c, 1);
			});
		},
		curve(e, t, n, s, c) {
			let l = t * .14, u = t * .88, d = n * .2, p = n * .8;
			e.line(l, p, u, p, r, .3, 1.5 * e.S), e.line(l, d, l, p, r, .3, 1.5 * e.S);
			let m = i(a(s, 0, .5)), h = (e) => [f(l, u, e), p - (p - d) * (.06 + .86 * (1 - (1 - e) ** 2.4))], g = [];
			for (let e = 0; e <= Math.ceil(36 * m); e++) g.push(h(Math.min(e / 36, m)));
			e.poly(g, r, .95, 3.2 * e.S);
			let _ = i(a(s, .55, .9));
			if (_ > 0) {
				let t = h(f(.15, .5, _));
				e.x.save(), e.x.setLineDash([3 * e.S, 4 * e.S]), e.line(t[0], t[1], t[0], p, r, .45, 1.5 * e.S), e.line(l, t[1], t[0], t[1], r, .45, 1.5 * e.S), e.x.restore(), e.dot(t[0], t[1], 5.5 * e.S, c, 1), e.x.strokeStyle = c, e.x.globalAlpha = .7, e.x.lineWidth = 2 * e.S, e.x.beginPath(), e.x.arc(t[0], t[1], 11 * e.S, 0, o), e.x.stroke(), e.x.globalAlpha = 1;
			}
		},
		sites(e, t, i, o, s) {
			_.forEach((c) => {
				let l = c.rec ? n(a(o, .1 + c.d * .55, .25 + c.d * .55)) : 0;
				e.dot(t / 2 + c.x * t * .74, i / 2 + c.y * i * .62, (3 + 2.2 * l) * e.S, l > 0 ? s : r, l > 0 ? .5 + .5 * l : .32);
			});
		},
		split(e, t, n, o, s) {
			let c = i(a(o, .15, .7));
			c > .6 && e.line(t / 2, n * .16, t / 2, n * .84, r, .32 * a(c, .6, 1), 1.5 * e.S), v.forEach((i) => {
				let a = (i.resp ? -.2 : .2) + i.x * .32, o = f(i.x * .8, a, c);
				e.dot(t / 2 + o * t * .8, n / 2 + i.y * n * .7, 3.6 * e.S, i.resp && c > .3 ? s : r, i.resp ? .5 + .5 * c : .36);
			});
		},
		doc(e, t, i, o, s) {
			let c = t * .16, u = i / 8.5;
			for (let d = 0; d < 6; d++) {
				let f = i * .22 + d * u, p = n(a(o, .04 + d * .07, .2 + d * .07)), m = t * (d === 0 ? .4 : d % 3 == 2 ? .46 : .58);
				e.line(c, f, c + m * p, f, r, d === 0 ? .9 : .5, (d === 0 ? 5.5 : 3.5) * e.S);
				let h = a(o, .55 + d * .06, .66 + d * .06);
				if (h > 0) {
					let n = t * .84;
					e.poly([
						[n - 6 * e.S, f],
						[n - 2 * e.S, f + 4 * e.S],
						[n + 6 * e.S, f - 5 * e.S]
					].slice(0, h > .5 ? 3 : 2), d === 5 ? s : l, h, 2.6 * e.S);
				}
			}
		}
	};
}));
//#endregion
export { x as n, p as t };
