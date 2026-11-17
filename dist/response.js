import { n as e, t } from "./rolldown-runtime-wf392T_D.mjs";
import { a as n, c as r, i, l as a, r as o, s, t as c } from "./hero-stage-DpBC6yvy.mjs";
import { n as l, t as u } from "./platform-connect-cards-C5Y4IjAO.mjs";
import { n as d, t as f } from "./platform-connect-Dh9cewVn.mjs";
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
}));
//#endregion
//#region src/viz.js
function T(e) {
	if (!e || e.dataset.pvInit) return null;
	e.dataset.pvInit = "1";
	let t = matchMedia("(prefers-reduced-motion: reduce)").matches, n = e.dataset.mode || "precision", r = e.closest(".video-animation, .surface-dark") ? D : E, i = r.ink, a = r.mau, o = r.tea, s = "rgb(" + i + ")";
	getComputedStyle(e).position === "static" && (e.style.position = "relative");
	let c = document.createElement("canvas");
	c.setAttribute("aria-hidden", "true"), c.style.cssText = "position:absolute;inset:0;width:100%;height:100%;display:block", e.appendChild(c);
	let l = c.getContext("2d"), u = k(n === "split" ? 5 : 3), d = () => Math.sqrt(-2 * Math.log(u() + 1e-9)) * Math.cos(6.2832 * u()), f = Array.from({ length: n === "split" ? 170 : 120 }, (e, t) => ({
		a: d(),
		b: d(),
		arm: t % 2,
		resp: u() < .4,
		j: u()
	})), p = 0, m = 0, h = 0, g = performance.now();
	function _(e) {
		l.clearRect(0, 0, p, m);
		let r = t ? 1 : A(e), c = Math.min(p, m);
		if (n === "precision") {
			let e = [m * .3, m * .52], t = [p * .42, p * .58], n = p * .13 * (1 - .6 * r);
			f.forEach((r) => {
				let o = t[r.arm] + r.a * n, s = e[r.arm] + r.b * c * .035;
				l.beginPath(), l.arc(o, s, 3.2, 0, 6.283), l.fillStyle = r.arm ? `rgba(${i},.8)` : `rgba(${a},.85)`, l.fill();
			});
			let o = m * .8, u = p * .62, d = p * .26 * (1 - .62 * r), h = p * .3;
			l.strokeStyle = `rgba(${i},.25)`, l.lineWidth = 1, l.beginPath(), l.moveTo(p * .1, o), l.lineTo(p * .9, o), l.stroke(), l.setLineDash([3, 4]), l.beginPath(), l.moveTo(h, o - 18), l.lineTo(h, o + 18), l.stroke(), l.setLineDash([]), l.strokeStyle = s, l.lineWidth = 3, l.lineCap = "round", l.beginPath(), l.moveTo(u - d, o), l.lineTo(u + d, o), l.stroke(), [u - d, u + d].forEach((e) => {
				l.lineWidth = 2, l.beginPath(), l.moveTo(e, o - 8), l.lineTo(e, o + 8), l.stroke();
			}), l.beginPath(), l.arc(u, o, 6, 0, 6.283), l.fillStyle = s, l.fill();
		} else if (n === "rank") {
			let e = [
				.55,
				.92,
				.38,
				.74,
				.62
			], t = e.length, n = m * .085, o = m * .06, s = (m - t * n - (t - 1) * o) / 2, c = p * .12, u = p * .76, d = e.map((e, t) => t).sort((t, n) => e[n] - e[t]), f = (e) => d.indexOf(e);
			e.forEach((e, t) => {
				let d = s + (t + (f(t) - t) * r) * (n + o), p = u * e * (.35 + .65 * Math.min(1, r * 1.6 + .2)), m = f(t) === 0;
				l.fillStyle = m ? `rgba(${i},${.35 + .65 * r})` : `rgba(${a},.7)`, l.beginPath(), l.roundRect ? l.roundRect(c, d, p, n, n / 2) : l.rect(c, d, p, n), l.fill(), l.beginPath(), l.arc(c - n * .9, d + n / 2, n * .22, 0, 6.283), l.fillStyle = `rgba(${i},.25)`, l.fill();
			});
		} else if (n === "dist") {
			let e = p * .1, t = p * .9, n = m * .78, o = m * .5, c = (n) => e + (t - e) * n, u = .48, d = (e) => Math.exp(-.5 * ((e - u) / .09) ** 2);
			l.strokeStyle = `rgba(${i},.25)`, l.lineWidth = 1, l.beginPath(), l.moveTo(e, n), l.lineTo(t, n), l.stroke();
			let f = .02 + .98 * Math.min(1, r * 1.4 + .15);
			l.beginPath(), l.moveTo(c(.33), n);
			for (let e = .33; e <= Math.min(.63, f); e += .005) l.lineTo(c(e), n - d(e) * o);
			l.lineTo(c(Math.min(.63, f)), n), l.closePath(), l.fillStyle = `rgba(${a},${.35 * r})`, l.fill(), l.beginPath();
			for (let e = 0; e <= f; e += .005) {
				let t = c(e), r = n - d(e) * o;
				e ? l.lineTo(t, r) : l.moveTo(t, r);
			}
			l.strokeStyle = s, l.lineWidth = 2.5, l.stroke(), f > u && (l.setLineDash([4, 4]), l.lineWidth = 1.5, l.beginPath(), l.moveTo(c(u), n), l.lineTo(c(u), n - o - 10), l.stroke(), l.setLineDash([]));
		} else {
			let e = p / 2, t = m / 2;
			l.strokeStyle = `rgba(${i},${.35 * (1 - r) + .1})`, l.setLineDash([5, 5]), l.lineWidth = 1.5, l.beginPath(), l.moveTo(p * .12, t), l.lineTo(p * .88, t), l.stroke(), l.setLineDash([]), f.forEach((n) => {
				let i = (n.resp ? -1 : 1) * m * .2 * r, s = e + n.a * p * .15, c = t + n.b * m * .1 * (1 - .3 * r) + i;
				if (l.beginPath(), l.arc(s, c, 3.4, 0, 6.283), l.fillStyle = `rgba(${a},${.85 - .25 * r})`, n.resp && r > .02) {
					let e = a.split(",").map((e, t) => Math.round(+e + (+o.split(",")[t] - e) * r));
					l.fillStyle = `rgba(${e},.95)`;
				}
				l.fill();
			});
		}
	}
	let v = () => {
		let n = Math.min(devicePixelRatio || 1, 2);
		p = e.clientWidth, m = e.clientHeight, c.width = Math.round(p * n), c.height = Math.round(m * n), l.setTransform(n, 0, 0, n, 0, 0), _(t ? 6 : (performance.now() - g) / 1e3);
	}, y = (e) => {
		h = requestAnimationFrame(y), _((e - g) / 1e3);
	}, b = new ResizeObserver(v);
	b.observe(e);
	let x = null;
	return t || (x = new IntersectionObserver(([e]) => {
		e.isIntersecting && !h ? h = requestAnimationFrame(y) : e.isIntersecting || (cancelAnimationFrame(h), h = 0);
	}), x.observe(e)), function() {
		cancelAnimationFrame(h), b.disconnect(), x && x.disconnect(), c.remove(), delete e.dataset.pvInit;
	};
}
var E, D, O, k, A, j = e((() => {
	E = {
		ink: "20,18,56",
		mau: "146,138,205",
		tea: "127,232,207"
	}, D = {
		ink: "244,244,244",
		mau: "201,196,239",
		tea: "127,232,207"
	}, O = (e) => e < .5 ? 4 * e * e * e : 1 - (-2 * e + 2) ** 3 / 2, k = (e) => () => {
		e |= 0, e = e + 1831565813 | 0;
		let t = Math.imul(e ^ e >>> 15, 1 | e);
		return t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t, ((t ^ t >>> 14) >>> 0) / 4294967296;
	}, A = (e) => {
		let t = e % 8 / 8;
		return O(t < .2 ? 0 : t < .45 ? (t - .2) / .25 : t < .8 ? 1 : 1 - (t - .8) / .2);
	};
})), M = /* @__PURE__ */ t((() => {
	w(), d(), l(), j(), document.querySelectorAll("[data-pv=\"response-hero-bg\"]").forEach((e) => p(e)), document.querySelectorAll("[data-pv=\"platform-connect\"]").forEach((e) => f(e)), document.querySelectorAll("[data-pv=\"viz\"]").forEach((e) => T(e)), document.querySelectorAll("[data-pv=\"platform-connect-v2\"]").forEach((e) => u(e));
}));
//#endregion
export default M();
