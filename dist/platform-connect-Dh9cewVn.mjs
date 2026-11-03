import { n as e } from "./rolldown-runtime-wf392T_D.mjs";
//#region src/platform-connect.js
function t(e) {
	return () => {
		e |= 0, e = e + 1831565813 | 0;
		let t = Math.imul(e ^ e >>> 15, 1 | e);
		return t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t, ((t ^ t >>> 14) >>> 0) / 4294967296;
	};
}
function n(e) {
	let n = t(11), r = () => {
		let e = Math.sqrt(-2 * Math.log(n() + 1e-9)) * Math.cos(6.2832 * n());
		return g(e, -2.3, 2.3);
	}, s = [
		.4,
		.15,
		.15,
		.15,
		.15
	], c = [];
	for (let t = 0; t < e; t++) {
		let e = n(), t = 0, l = s[0];
		for (; e > l && t < 4;) t++, l += s[t];
		let u = r() * .5, d = r() * .5, f = Math.hypot(u, d), p, m;
		t === 0 ? f < .34 ? (p = a, m = 1) : (p = i, m = .75) : n() < .7 ? (p = o, m = .85) : (p = i, m = .45), c.push({
			c: t,
			ox: u,
			oy: d,
			ax: r() * .5,
			ay: r() * .5,
			mx: r() * .5,
			my: r() * .5,
			w: (n() - .5) * .3,
			s: (t === 0 && f < .34 ? 1.6 : 1) + n() * 1.2,
			col: p,
			a: m,
			d: n(),
			j: n() * 2 - 1,
			trip: null,
			fill: `rgba(${p[0]},${p[1]},${p[2]},${m})`
		});
	}
	return f.forEach(([e, t, n]) => {
		let r = e === 0 ? 130 : 75, i = 0;
		for (let a of c) {
			if (i >= r) break;
			a.c === e && !a.trip && (a.trip = {
				to: t,
				ts: n + i / r * 1.4,
				side: (e + t) % 2 ? 1 : -1
			}, i++);
		}
	}), c;
}
function r(e) {
	if (e.dataset.pvReady) return;
	let t = e.dataset.current;
	if (!s[t]) {
		console.warn("[pv] platform-connect : data-current manquant ou inconnu (" + t + "), attendu " + c.join(" | "));
		return;
	}
	e.dataset.pvReady = "1";
	let r = (t) => e.dataset["name" + t[0].toUpperCase() + t.slice(1)] || s[t], i = c.filter((e) => e !== t);
	e.style.cssText += "position:relative;width:100%;aspect-ratio:1.2/1;";
	let a = document.createElement("canvas");
	a.style.cssText = "position:absolute;inset:0;width:100%;height:100%;display:block;", a.setAttribute("role", "img"), a.setAttribute("aria-label", `PhaseV platform: ${r(t)} at the center, exchanging data with the four other PhaseV products.`), e.appendChild(a);
	let o = a.getContext("2d"), f = e.closest("section") || document.body, y = f.querySelector(".text-size-label"), b = y ? getComputedStyle(y) : null, x = b ? b.fontFamily : "Aspekta, Arial, sans-serif", S = b && b.letterSpacing !== "normal" ? (parseFloat(b.letterSpacing) || 0) / (parseFloat(b.fontSize) || 16) : 0, C = "letterSpacing" in o;
	getComputedStyle(f).backgroundColor;
	function w(e, t) {
		o.font = `${e} ${t}px ${x}`, C && (o.letterSpacing = (S * t).toFixed(2) + "px");
	}
	function T(e, t, n) {
		let r = o.measureText(e).width;
		o.fillText(e, g(t - r / 2, 2, E - r - 2), n);
	}
	let E = 0, D = 0, O = null, k = 0, A = {
		x: 0,
		y: 0,
		tx: 0,
		ty: 0
	};
	function j(e) {
		let n = e % d;
		o.clearRect(0, 0, E, D);
		let a = Math.min(E, D), s = E / 2, c = D / 2 - a * .01, f = [
			a * .105,
			a * .055,
			a * .055,
			a * .055,
			a * .055
		], m = a * .13, g = h.map(([e, t], n) => [s + e * E - A.x * (n ? 14 : 6), c + t * D - A.y * (n ? 10 : 4)]), y = n < u, b = Math.min(_(n, 2.7, 3.3), 1 - _(n, 11.7, 12.3));
		for (let t of O) {
			let r = t.w * e, i = Math.cos(r), a = Math.sin(r), d = t.ox * i - t.oy * a, h = t.ox * a + t.oy * i, b = t.ax * i - t.ay * a, x = t.ax * a + t.ay * i, S = s + (t.mx * i - t.my * a) * m * 2, C = c + (t.mx * a + t.my * i) * m * 2, w, T, E = t.c;
			if (t.trip && n >= t.trip.ts) {
				let e = _(n, t.trip.ts, t.trip.ts + p), r = g[t.c], i = g[t.trip.to], a = [r[0] + d * f[t.c] * 2, r[1] + h * f[t.c] * 2], o = [i[0] + b * f[t.trip.to] * 2, i[1] + x * f[t.trip.to] * 2];
				if (e < 1) {
					let n = e, r = o[0] - a[0], i = o[1] - a[1], s = Math.hypot(r, i) || 1, c = -i / s, l = r / s, u = s * .22 * t.trip.side, d = t.j * 4 * Math.sin(Math.PI * n), f = (a[0] + o[0]) / 2 + c * u, p = (a[1] + o[1]) / 2 + l * u, m = 1 - n;
					w = m * m * a[0] + 2 * m * n * f + n * n * o[0] + c * d, T = m * m * a[1] + 2 * m * n * p + n * n * o[1] + l * d;
				} else E = t.trip.to, w = o[0], T = o[1];
			} else w = g[E][0] + d * f[E] * 2, T = g[E][1] + h * f[E] * 2;
			let D = v(_(n, l + t.d * .8, 2.7 + t.d * .8)), O = v(_(n, u + t.d * .6, 13.6 + t.d * .6)), k = y ? D : 1 - O, A = S + (w - S) * k, j = C + (T - C) * k;
			o.fillStyle = t.fill, o.fillRect(A - t.s / 2, j - t.s / 2, t.s, t.s);
		}
		if (b > 0) {
			let e = E < 420 ? 9 : 10;
			o.textAlign = "left", o.fillStyle = "#141238", w(500, e), o.globalAlpha = b * .75, i.forEach((t, n) => {
				let i = g[n + 1];
				T(r(t), i[0], Math.min(D - 4, i[1] + f[1] * 2.4 + e));
			}), w(700, e + 2), o.globalAlpha = b, T(r(t), g[0][0], g[0][1] + f[0] * 2.3 + e + 4), o.globalAlpha = 1;
		}
	}
	let M = matchMedia("(prefers-reduced-motion: reduce)").matches, N = !1, P = 0, F = 0, I = 0;
	function L() {
		let t = Math.min(devicePixelRatio || 1, 2);
		E = e.clientWidth, D = e.clientHeight, a.width = Math.round(E * t), a.height = Math.round(D * t), o.setTransform(t, 0, 0, t, 0, 0);
		let r = E < 500 ? 1100 : 1800;
		r !== k && (O = n(r), k = r), N && j(M ? m : P);
	}
	function R(e) {
		F = requestAnimationFrame(R), P += Math.min((e - I) / 1e3, .05), I = e, A.x += (A.tx - A.x) * .06, A.y += (A.ty - A.y) * .06, j(P);
	}
	function z(t) {
		let n = e.getBoundingClientRect();
		A.tx = g((t.clientX - n.left) / n.width * 2 - 1, -1, 1), A.ty = g((t.clientY - n.top) / n.height * 2 - 1, -1, 1);
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
	return (document.fonts ? Promise.race([document.fonts.load(`500 10px ${x}`), new Promise((e) => setTimeout(e, 3e3))]) : Promise.resolve()).then(() => {
		N = !0, L(), !M && (U = new IntersectionObserver(([e]) => e.isIntersecting ? B() : V(), { threshold: .3 }), U.observe(e));
	}), { destroy() {
		V(), H.disconnect(), U && U.disconnect(), a.remove(), delete e.dataset.pvReady;
	} };
}
var i, a, o, s, c, l, u, d, f, p, m, h, g, _, v, y = e((() => {
	i = [
		20,
		18,
		56
	], a = [
		226,
		199,
		10
	], o = [
		146,
		138,
		205
	], s = {
		portfolio: "PORTFOLIO OPTIMIZER",
		trial: "TRIAL OPTIMIZER",
		response: "RESPONSE OPTIMIZER",
		clinops: "CLINOPS OPTIMIZER",
		conductor: "AI CONDUCTOR"
	}, c = [
		"portfolio",
		"trial",
		"response",
		"clinops",
		"conductor"
	], l = 1.3, u = 12, d = 14.6, f = [
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
	], p = 1.9, m = 7.2, h = [
		[0, 0],
		[-.33, -.29],
		[.32, -.31],
		[-.31, .3],
		[.34, .27]
	], g = (e, t = 0, n = 1) => Math.max(t, Math.min(n, e)), _ = (e, t, n) => g((e - t) / (n - t)), v = (e) => e < .5 ? 4 * e * e * e : 1 - (-2 * e + 2) ** 3 / 2;
}));
//#endregion
export { y as n, r as t };
