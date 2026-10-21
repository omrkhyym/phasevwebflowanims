import { n as e } from "./rolldown-runtime-wf392T_D.mjs";
//#region src/hero-stage.js
function t(e) {
	return () => {
		e |= 0, e = e + 1831565813 | 0;
		let t = Math.imul(e ^ e >>> 15, 1 | e);
		return t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t, ((t ^ t >>> 14) >>> 0) / 4294967296;
	};
}
function n(e) {
	let t = `pv-${e}-hero-css`;
	if (document.getElementById(t)) return;
	let n = `[data-pv="${e}-hero-bg"]`, r = `[data-pv="${e}-hero-slot"]`, i = document.createElement("style");
	i.id = t, i.textContent = `
:has(> ${n}){ position:relative; overflow:hidden; }
:has(> ${n}) > :not(${n}){ position:relative; z-index:1; }
${n}{ position:absolute; inset:0; z-index:0; pointer-events:none; }
${n} canvas, ${r} canvas{ position:absolute; inset:0; width:100%; height:100%; display:block; }
${r}{ display:none; }
@media (max-width:991px){
  :has(> ${n}):has(${r}) > ${n}{ display:none; }
  ${r}{ display:block; position:relative; width:100%; aspect-ratio:4/3; pointer-events:none; }
}`, document.head.appendChild(i);
}
function r(e, { name: t, draw: r, still: i = 0, onResize: a }) {
	if (!e || e.dataset.pvInit) return;
	let o = document.createElement("canvas");
	o.setAttribute("aria-hidden", "true");
	let s = o.getContext("2d");
	if (!s) return;
	e.dataset.pvInit = "1", n(t);
	let l = e.parentElement || document.body, u = l.querySelector(`[data-pv="${t}-hero-slot"]`), d = matchMedia("(prefers-reduced-motion: reduce)").matches, f = matchMedia("(max-width: 991px)"), p = {
		x: 0,
		y: 0
	}, m = {
		ctx: s,
		W: 0,
		H: 0,
		flow: !1,
		mobile: !1,
		reduce: d,
		mouse: {
			x: 0,
			y: 0
		},
		fade(e) {
			return this.flow ? 1 : this.mobile ? .55 : .22 + .78 * c(this.W * .22, this.W * .62, e);
		}
	}, h = null;
	function g(e) {
		let t = m.flow || d ? 0 : .05;
		m.mouse.x += ((m.flow || d ? 0 : p.x) - m.mouse.x) * (t || 1), m.mouse.y += ((m.flow || d ? 0 : p.y) - m.mouse.y) * (t || 1), r(m, e);
	}
	function _() {
		if (!h) return;
		let e = h.getBoundingClientRect();
		if (!e.width || !e.height) return;
		let t = Math.min(devicePixelRatio || 1, 2);
		m.W = e.width, m.H = e.height, o.width = Math.round(m.W * t), o.height = Math.round(m.H * t), s.setTransform(t, 0, 0, t, 0, 0), m.mobile = m.W < 900, a && a(m), d && g(i);
	}
	let v = (e) => {
		let t = o.getBoundingClientRect();
		t.width && (p.x = (e.clientX - t.left) / t.width - .5, p.y = (e.clientY - t.top) / t.height - .5);
	};
	l.addEventListener("pointermove", v, { passive: !0 });
	let y = 0, b = !1, x = !1, S = 0, C = 0;
	function w(e) {
		y = requestAnimationFrame(w);
		let t = Math.min((e - C) / 1e3, .05);
		C = e, S += t, g(S);
	}
	function T() {
		b || d || !x || document.hidden || (b = !0, C = performance.now(), y = requestAnimationFrame(w));
	}
	function E() {
		b && (b = !1, cancelAnimationFrame(y));
	}
	let D = new ResizeObserver(_), O = new IntersectionObserver(([e]) => {
		x = e.isIntersecting, x ? T() : E();
	});
	function k() {
		let t = f.matches && u ? u : e;
		t !== h && (h = t, m.flow = h === u, h.appendChild(o), D.disconnect(), D.observe(h), O.disconnect(), O.observe(h), _());
	}
	let A = () => k();
	f.addEventListener ? f.addEventListener("change", A) : f.addListener(A);
	let j = () => {
		document.hidden ? E() : T();
	};
	return document.addEventListener("visibilitychange", j), k(), function() {
		E(), O.disconnect(), D.disconnect(), f.removeEventListener ? f.removeEventListener("change", A) : f.removeListener(A), document.removeEventListener("visibilitychange", j), l.removeEventListener("pointermove", v), o.remove(), delete e.dataset.pvInit;
	};
}
var i, a, o, s, c, l, u = e((() => {
	i = Math.PI * 2, a = (e) => Math.max(0, Math.min(1, e)), o = (e, t, n) => a((e - t) / (n - t)), s = (e) => e < .5 ? 4 * e * e * e : 1 - (-2 * e + 2) ** 3 / 2, c = (e, t, n) => {
		let r = a((n - e) / (t - e));
		return r * r * (3 - 2 * r);
	}, l = (e, t) => `rgba(${e[0]},${e[1]},${e[2]},${Math.max(0, Math.min(1, t)).toFixed(3)})`;
}));
//#endregion
//#region src/platform-connect.js
function d(e) {
	return () => {
		e |= 0, e = e + 1831565813 | 0;
		let t = Math.imul(e ^ e >>> 15, 1 | e);
		return t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t, ((t ^ t >>> 14) >>> 0) / 4294967296;
	};
}
function f(e) {
	let t = d(11), n = () => {
		let e = Math.sqrt(-2 * Math.log(t() + 1e-9)) * Math.cos(6.2832 * t());
		return E(e, -2.3, 2.3);
	}, r = [
		.4,
		.15,
		.15,
		.15,
		.15
	], i = [];
	for (let a = 0; a < e; a++) {
		let e = t(), a = 0, o = r[0];
		for (; e > o && a < 4;) a++, o += r[a];
		let s = n() * .5, c = n() * .5, l = Math.hypot(s, c), u, d;
		a === 0 ? l < .34 ? (u = h, d = 1) : (u = m, d = .75) : t() < .7 ? (u = g, d = .85) : (u = m, d = .45), i.push({
			c: a,
			ox: s,
			oy: c,
			ax: n() * .5,
			ay: n() * .5,
			mx: n() * .5,
			my: n() * .5,
			w: (t() - .5) * .3,
			s: (a === 0 && l < .34 ? 1.6 : 1) + t() * 1.2,
			col: u,
			a: d,
			d: t(),
			j: t() * 2 - 1,
			trip: null,
			fill: `rgba(${u[0]},${u[1]},${u[2]},${d})`
		});
	}
	return S.forEach(([e, t, n]) => {
		let r = e === 0 ? 130 : 75, a = 0;
		for (let o of i) {
			if (a >= r) break;
			o.c === e && !o.trip && (o.trip = {
				to: t,
				ts: n + a / r * 1.4,
				side: (e + t) % 2 ? 1 : -1
			}, a++);
		}
	}), i;
}
function p(e) {
	if (e.dataset.pvReady) return;
	let t = e.dataset.current;
	if (!_[t]) {
		console.warn("[pv] platform-connect : data-current manquant ou inconnu (" + t + "), attendu " + v.join(" | "));
		return;
	}
	e.dataset.pvReady = "1";
	let n = (t) => e.dataset["name" + t[0].toUpperCase() + t.slice(1)] || _[t], r = v.filter((e) => e !== t);
	e.style.cssText += "position:relative;width:100%;aspect-ratio:1.2/1;";
	let i = document.createElement("canvas");
	i.style.cssText = "position:absolute;inset:0;width:100%;height:100%;display:block;", i.setAttribute("role", "img"), i.setAttribute("aria-label", `PhaseV platform: ${n(t)} at the center, exchanging data with the four other PhaseV products.`), e.appendChild(i);
	let a = i.getContext("2d"), o = e.closest("section") || document.body, s = o.querySelector(".text-size-label"), c = s ? getComputedStyle(s) : null, l = c ? c.fontFamily : "Aspekta, Arial, sans-serif", u = c && c.letterSpacing !== "normal" ? (parseFloat(c.letterSpacing) || 0) / (parseFloat(c.fontSize) || 16) : 0, d = "letterSpacing" in a;
	getComputedStyle(o).backgroundColor;
	function p(e, t) {
		a.font = `${e} ${t}px ${l}`, d && (a.letterSpacing = (u * t).toFixed(2) + "px");
	}
	function m(e, t, n) {
		let r = a.measureText(e).width;
		a.fillText(e, E(t - r / 2, 2, h - r - 2), n);
	}
	let h = 0, g = 0, S = null, k = 0, A = {
		x: 0,
		y: 0,
		tx: 0,
		ty: 0
	};
	function j(e) {
		let i = e % x;
		a.clearRect(0, 0, h, g);
		let o = Math.min(h, g), s = h / 2, c = g / 2 - o * .01, l = [
			o * .105,
			o * .055,
			o * .055,
			o * .055,
			o * .055
		], u = o * .13, d = T.map(([e, t], n) => [s + e * h - A.x * (n ? 14 : 6), c + t * g - A.y * (n ? 10 : 4)]), f = i < b, _ = Math.min(D(i, 2.7, 3.3), 1 - D(i, 11.7, 12.3));
		for (let t of S) {
			let n = t.w * e, r = Math.cos(n), o = Math.sin(n), p = t.ox * r - t.oy * o, m = t.ox * o + t.oy * r, h = t.ax * r - t.ay * o, g = t.ax * o + t.ay * r, _ = s + (t.mx * r - t.my * o) * u * 2, v = c + (t.mx * o + t.my * r) * u * 2, x, S, w = t.c;
			if (t.trip && i >= t.trip.ts) {
				let e = D(i, t.trip.ts, t.trip.ts + C), n = d[t.c], r = d[t.trip.to], a = [n[0] + p * l[t.c] * 2, n[1] + m * l[t.c] * 2], o = [r[0] + h * l[t.trip.to] * 2, r[1] + g * l[t.trip.to] * 2];
				if (e < 1) {
					let n = e, r = o[0] - a[0], i = o[1] - a[1], s = Math.hypot(r, i) || 1, c = -i / s, l = r / s, u = s * .22 * t.trip.side, d = t.j * 4 * Math.sin(Math.PI * n), f = (a[0] + o[0]) / 2 + c * u, p = (a[1] + o[1]) / 2 + l * u, m = 1 - n;
					x = m * m * a[0] + 2 * m * n * f + n * n * o[0] + c * d, S = m * m * a[1] + 2 * m * n * p + n * n * o[1] + l * d;
				} else w = t.trip.to, x = o[0], S = o[1];
			} else x = d[w][0] + p * l[w] * 2, S = d[w][1] + m * l[w] * 2;
			let T = O(D(i, y + t.d * .8, 2.7 + t.d * .8)), E = O(D(i, b + t.d * .6, 13.6 + t.d * .6)), k = f ? T : 1 - E, A = _ + (x - _) * k, j = v + (S - v) * k;
			a.fillStyle = t.fill, a.fillRect(A - t.s / 2, j - t.s / 2, t.s, t.s);
		}
		if (_ > 0) {
			let e = h < 420 ? 9 : 10;
			a.textAlign = "left", a.fillStyle = "#141238", p(500, e), a.globalAlpha = _ * .75, r.forEach((t, r) => {
				let i = d[r + 1];
				m(n(t), i[0], Math.min(g - 4, i[1] + l[1] * 2.4 + e));
			}), p(700, e + 2), a.globalAlpha = _, m(n(t), d[0][0], d[0][1] + l[0] * 2.3 + e + 4), a.globalAlpha = 1;
		}
	}
	let M = matchMedia("(prefers-reduced-motion: reduce)").matches, N = !1, P = 0, F = 0, I = 0;
	function L() {
		let t = Math.min(devicePixelRatio || 1, 2);
		h = e.clientWidth, g = e.clientHeight, i.width = Math.round(h * t), i.height = Math.round(g * t), a.setTransform(t, 0, 0, t, 0, 0);
		let n = h < 500 ? 1100 : 1800;
		n !== k && (S = f(n), k = n), N && j(M ? w : P);
	}
	function R(e) {
		F = requestAnimationFrame(R), P += Math.min((e - I) / 1e3, .05), I = e, A.x += (A.tx - A.x) * .06, A.y += (A.ty - A.y) * .06, j(P);
	}
	function z(t) {
		let n = e.getBoundingClientRect();
		A.tx = E((t.clientX - n.left) / n.width * 2 - 1, -1, 1), A.ty = E((t.clientY - n.top) / n.height * 2 - 1, -1, 1);
	}
	function B() {
		F || M || (addEventListener("pointermove", z, { passive: !0 }), I = performance.now(), F = requestAnimationFrame(R));
	}
	function V() {
		cancelAnimationFrame(F), F = 0, removeEventListener("pointermove", z);
	}
	let H = new ResizeObserver(L);
	H.observe(e);
	let U = null;
	return (document.fonts ? Promise.race([document.fonts.load(`500 10px ${l}`), new Promise((e) => setTimeout(e, 3e3))]) : Promise.resolve()).then(() => {
		N = !0, L(), !M && (U = new IntersectionObserver(([e]) => e.isIntersecting ? B() : V(), { threshold: .3 }), U.observe(e));
	}), { destroy() {
		V(), H.disconnect(), U && U.disconnect(), i.remove(), delete e.dataset.pvReady;
	} };
}
var m, h, g, _, v, y, b, x, S, C, w, T, E, D, O, k = e((() => {
	m = [
		20,
		18,
		56
	], h = [
		226,
		199,
		10
	], g = [
		146,
		138,
		205
	], _ = {
		portfolio: "PORTFOLIO OPTIMIZER",
		trial: "TRIAL OPTIMIZER",
		response: "RESPONSE OPTIMIZER",
		clinops: "CLINOPS OPTIMIZER",
		conductor: "AI CONDUCTOR"
	}, v = [
		"portfolio",
		"trial",
		"response",
		"clinops",
		"conductor"
	], y = 1.3, b = 12, x = 14.6, S = [
		[
			1,
			0,
			3.7
		],
		[
			0,
			2,
			4.5
		],
		[
			3,
			0,
			5.4
		],
		[
			0,
			4,
			6.2
		],
		[
			2,
			0,
			7.1
		],
		[
			0,
			1,
			7.9
		],
		[
			4,
			3,
			8.7
		],
		[
			0,
			3,
			9.4
		]
	], C = 1.9, w = 7.2, T = [
		[0, 0],
		[-.33, -.29],
		[.32, -.31],
		[-.31, .3],
		[.34, .27]
	], E = (e, t = 0, n = 1) => Math.max(t, Math.min(n, e)), D = (e, t, n) => E((e - t) / (n - t)), O = (e) => e < .5 ? 4 * e * e * e : 1 - (-2 * e + 2) ** 3 / 2;
}));
//#endregion
export { s as a, l as c, c as d, a as i, t as l, k as n, u as o, i as r, r as s, p as t, o as u };
