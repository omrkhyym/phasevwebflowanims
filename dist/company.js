import { n as e, t } from "./rolldown-runtime-wf392T_D.mjs";
import { a as n, c as r, d as i, f as a, i as o, l as s, m as c, n as l, o as u, p as d, s as f, t as p, u as m } from "./bonv-draw-D7G52O51.mjs";
//#region src/about-orbits.js
function h() {
	if (document.getElementById("pv-about-orbits-css")) return;
	let e = document.createElement("style");
	e.id = "pv-about-orbits-css", e.textContent = "[data-pv=\"about-orbits\"]{position:absolute;inset:0;z-index:0;pointer-events:none;overflow:hidden}\n:has(> [data-pv=\"about-orbits\"]) > :not([data-pv=\"about-orbits\"]):not(.pv-layer):not([aria-hidden=\"true\"]){position:relative;z-index:1}", document.head.appendChild(e);
}
function g(e) {
	if (!e || e.dataset.pvInit) return;
	e.dataset.pvInit = "1", h();
	let t = document.createElement("canvas");
	t.setAttribute("aria-hidden", "true"), t.style.cssText = "position:absolute;inset:0;width:100%;height:100%;display:block", e.appendChild(t);
	let n = t.getContext("2d"), r = matchMedia("(prefers-reduced-motion: reduce)").matches, i = _.map((e) => .13 * (1 / e) ** 1.5), s = _.flatMap((e, t) => Array.from({ length: 3 + t }, () => ({
		i: t,
		ph: C() * l,
		s: .8 + C() * .5
	}))), u = w.map(() => [0, 0]), d = 0, p = 0, m = () => {
		let i = Math.min(devicePixelRatio || 1, 2), a = e.getBoundingClientRect();
		d = a.width, p = a.height, t.width = Math.round(d * i), t.height = Math.round(p * i), n.setTransform(i, 0, 0, i, 0, 0), r && E(0);
	}, g = (e, t, r, i, o) => {
		o <= 0 || (n.fillStyle = a(i, o), n.beginPath(), n.arc(e, t, r, 0, l), n.fill());
	}, x = !r && !matchMedia("(hover: none)").matches, S = {
		x: 0,
		y: 0,
		tx: 0,
		ty: 0
	}, T = (t) => {
		let n = e.getBoundingClientRect();
		S.tx = f((t.clientX - n.left) / n.width - .5, -.5, .5), S.ty = f((t.clientY - n.top) / n.height - .5, -.5, .5);
	};
	x && window.addEventListener("pointermove", T, { passive: !0 });
	function E(e) {
		n.clearRect(0, 0, d, p);
		let t = d > 991, r = d * (t ? .68 : .78), m = p / 2, h = Math.min(p * .28, d * (t ? .2 : .34)), x = f(Math.min(d, p) / 800, .7, 1.2), C = (e) => _[e] * h * y;
		S.x += (S.tx - S.x) * .05, S.y += (S.ty - S.y) * .05;
		let T = (e) => [S.x * 2 * 12 * x * e, S.y * 2 * 12 * x * e], E = e % v, O = h * .6 + (C(_.length - 1) * 1.15 - h * .6) * c(E, 0, 3.4), k = h * .45, A = (e) => c(E, 0, 3.4) < 1 ? Math.exp(-(((e - O) / k) ** 2)) : 0, j = (t, n) => C(t) + (2 + t * .6) * x * Math.sin(4 * n + e * .35 + t * 1.3) + 7 * x * A(C(t));
		n.lineWidth = 1, _.forEach((e, t) => {
			let [i, s] = T(.45 + t * .14), c = A(C(t));
			n.strokeStyle = a(o, .14 - t * .018 + .12 * c), n.beginPath();
			for (let e = 0; e <= 180; e++) {
				let a = e / 180 * l, o = j(t, a), c = r + i + Math.cos(a) * o, u = m + s + Math.sin(a) * o;
				e ? n.lineTo(c, u) : n.moveTo(c, u);
			}
			n.stroke();
		});
		for (let t of s) {
			let n = t.ph + i[t.i] * e, a = j(t.i, n), [o, s] = T(.45 + t.i * .14);
			g(r + o + Math.cos(n) * a, m + s + Math.sin(n) * a, 2 * x * t.s, b[t.i], .75);
		}
		let [M, N] = T(.33), P = r + M, F = m + N, I = 1 + .45 * Math.sin(Math.PI * c(E, 0, 1.1));
		w.forEach((t, n) => {
			let r = t.edge ? .006 : .016;
			u[n][0] = P + (t.x + r * Math.sin(e * t.w + t.ph)) * h, u[n][1] = F + (t.y + r * Math.cos(e * t.w * .9 + t.ph * 1.7)) * h;
		});
		let L = D * h;
		n.lineWidth = .5;
		for (let e = 0; e < u.length; e++) for (let t = e + 1; t < u.length; t++) {
			let r = Math.hypot(u[e][0] - u[t][0], u[e][1] - u[t][1]);
			r >= L || (n.strokeStyle = a(o, .28 * I * (1 - r / L)), n.beginPath(), n.moveTo(u[e][0], u[e][1]), n.lineTo(u[t][0], u[t][1]), n.stroke());
		}
		let R = Math.max(.8, h / 250);
		if (w.forEach((e, t) => g(u[t][0], u[t][1], R, o, e.a)), n.save(), n.globalCompositeOperation = "destination-out", t) {
			let e = n.createLinearGradient(0, 0, d * .56, 0);
			e.addColorStop(0, "rgba(0,0,0,.92)"), e.addColorStop(.6, "rgba(0,0,0,.6)"), e.addColorStop(1, "rgba(0,0,0,0)"), n.fillStyle = e, n.fillRect(0, 0, d * .56, p);
		} else n.fillStyle = "rgba(0,0,0,.45)", n.fillRect(0, 0, d, p);
		n.restore();
	}
	let O = new ResizeObserver(m);
	O.observe(e), m();
	let k = !0, A = performance.now(), j = 0, M = 0, N = new IntersectionObserver(([e]) => {
		k = e.isIntersecting;
	});
	N.observe(e);
	let P = (e) => {
		M = requestAnimationFrame(P);
		let t = Math.min((e - A) / 1e3, .05);
		A = e, k && (j += t, E(j));
	};
	return r || (M = requestAnimationFrame(P)), function() {
		cancelAnimationFrame(M), O.disconnect(), N.disconnect(), window.removeEventListener("pointermove", T), t.remove(), delete e.dataset.pvInit;
	};
}
var _, v, y, b, x, S, C, w, T, E, D, O = e((() => {
	r(), _ = [
		1,
		1.45,
		1.95,
		2.5,
		3.1
	], v = 6.5, y = 1.22, b = [
		p[0],
		p[1],
		p[5],
		p[3],
		p[4]
	], x = [
		[.2749, -.4797],
		[-4e-4, .1548],
		[-.2181, -.3639],
		[-.271, -.4797],
		[-.5574, -.4797],
		[-.017, .6489],
		[.0186, .6489],
		[.5574, -.4797]
	], S = (e, t) => {
		let n = !1;
		for (let r = 0, i = x.length - 1; r < x.length; i = r++) {
			let [a, o] = x[r], [s, c] = x[i];
			o > t != c > t && e < (s - a) * (t - o) / (c - o) + a && (n = !n);
		}
		return n;
	}, C = d(11), w = [], T = .075, E = .062, D = .12;
	for (let e = 0; e < x.length; e++) {
		let t = x[e], n = x[(e + 1) % x.length], r = Math.hypot(n[0] - t[0], n[1] - t[1]), i = Math.max(1, Math.round(r / T));
		for (let e = 0; e < i; e++) w.push({
			x: t[0] + (n[0] - t[0]) * e / i,
			y: t[1] + (n[1] - t[1]) * e / i,
			edge: !0
		});
	}
	for (let e = 0; e < 6e3; e++) {
		let e = (C() - .5) * 1.12, t = -.48 + C() * 1.13;
		S(e, t) && (w.some((n) => Math.hypot(n.x - e, n.y - t) < E) || w.push({
			x: e,
			y: t,
			edge: !1
		}));
	}
	w.forEach((e) => {
		e.ph = C() * l, e.w = .35 + C() * .3, e.a = e.edge ? .8 : .5 + C() * .3;
	});
}));
//#endregion
//#region src/careers-affine.js
function k(e, t, n, r, i, a, o) {
	if (r <= 0) return;
	let s = e.x, c = s.createLinearGradient(t, n - r, t, n + r);
	c.addColorStop(0, `rgba(255,255,255,${.05 * i})`), c.addColorStop(.6, `rgba(255,255,255,${.015 * i})`), c.addColorStop(1, `rgba(255,255,255,${.008 * i})`), s.fillStyle = c, s.beginPath(), s.arc(t, n, r, 0, l), s.fill(), j(e, t, n, r, a, o);
}
function A(e, t, n, r, i, s) {
	if (!e.createConicGradient) {
		let c = e.createLinearGradient(t - r, n - r, t + r, n + r);
		return c.addColorStop(0, a(o, .4 * s)), c.addColorStop(.4, a(o, .05 * s)), c.addColorStop(1, a(i, .35 * s)), c;
	}
	let c = e.createConicGradient(-3 * Math.PI / 4, t, n);
	return c.addColorStop(0, a(o, .55 * s)), c.addColorStop(.1, a(o, .12 * s)), c.addColorStop(.3, a(o, .04 * s)), c.addColorStop(.5, a(i, .35 * s)), c.addColorStop(.7, a(o, .04 * s)), c.addColorStop(.9, a(o, .12 * s)), c.addColorStop(1, a(o, .55 * s)), c;
}
function j(e, t, n, r, i, s) {
	if (s <= 0 || r <= 0) return;
	let c = e.x;
	c.strokeStyle = A(c, t, n, r, i, s), c.lineWidth = .75, c.beginPath(), c.arc(t, n, r, 0, l), c.stroke(), r > 3 && (c.strokeStyle = a(o, .06 * s), c.lineWidth = .5, c.beginPath(), c.arc(t, n, r - 1.5, 0, l), c.stroke());
}
function M(e, t) {
	let { W: r, H: u, S: d } = e, f = r / 2, p = u / 2, h = Math.min(r, u) / 2 * .9, g = (e) => [f + e[0] * h, p + e[1] * h], _ = (e) => s(c(t, R.merge + e, R.merge + e + R.dur)) - s(c(t, R.split + e, R.split + e + R.dur)), v = _(.25), y = 1 - v, b = g([0, .04 * (1 - v)]), x = V * (1 - v) * h;
	if (y > 0 && x > H * h) {
		let n = (m(H, U, v) * h + 6 * d) / x, r = t % B / B;
		for (let i = 0; i < I; i++) {
			let a = -Math.PI / 2 + i * l / I + n, s = -Math.PI / 2 + (i + 1) * l / I - n;
			if (s <= a) continue;
			let c = Array.from({ length: 41 }, (e, t) => {
				let n = m(a, s, t / 40);
				return [b[0] + Math.cos(n) * x, b[1] + Math.sin(n) * x];
			});
			e.flow(c, o, .45 * y, t, 0, i);
			for (let t = 0; t < 6; t++) {
				let n = r - t * .018;
				if (n <= 0 || n >= 1) continue;
				let i = .5 - .5 * Math.cos(Math.PI * n), c = m(a, s, i), l = Math.sin(Math.PI * n) ** .6;
				e.dot(b[0] + Math.cos(c) * x, b[1] + Math.sin(c) * x, (2.6 - t * .35) * d, o, y * l * (1 - t / 6) * (t ? .7 : 1));
			}
		}
	}
	for (let t = 0; t < I; t++) {
		let n = g([q[t][0] * (1 - v), q[t][1] * (1 - v)]), r = m(H, U, v) * h;
		k(e, n[0], n[1], r, m(1, .42, v), P[t], 1 - v);
	}
	v > 0 && j(e, f, p, m(H, U, v) * h, o, v);
	let S = i(c(t, R.close, R.close + 1.3)) * (1 - c(t, R.split - .3, R.split + .5));
	S > 0 && (e.x.save(), e.x.setLineDash([1, 7 * d]), e.x.lineDashOffset = -t * 14 * d, e.x.strokeStyle = a(n, .8 * S), e.x.lineWidth = 2 * d, e.x.lineCap = "round", e.x.beginPath(), e.x.arc(f, p, U * h + 12 * d, -Math.PI / 2, -Math.PI / 2 + l * i(c(t, R.close, R.close + 1.3))), e.x.stroke(), e.x.restore());
	let C = t * .04, w = Math.cos(C), T = Math.sin(C), E = 2 * d;
	for (let n of G) {
		let r = _(n.d), i = n.b[0] * w - n.b[1] * T, a = n.b[0] * T + n.b[1] * w, o = m(n.a[0], i, r), s = m(n.a[1], a, r), c = Math.sin(Math.PI * r) * .1;
		o += -(a - n.a[1]) * c, s += (i - n.a[0]) * c, o += .006 * Math.sin(z * 2 * t + n.ph), s += .006 * Math.cos(z * 2 * t + n.ph * 1.3);
		let l = g([o, s]);
		e.dot(l[0], l[1], E * n.s, P[n.g], n.al);
	}
}
function N(e) {
	let t = matchMedia("(max-width: 991px)");
	return u(e, {
		aspect: () => t.matches ? .75 : 1,
		loop: R.loop,
		fade: Infinity,
		still: R.close + 2,
		layout(e) {
			e.S = Math.max(.75, Math.min(1.25, Math.min(e.W, e.W * (t.matches ? .75 : 1)) / 520));
		},
		draw: M
	});
}
var P, F, I, L, R, z, B, V, H, U, W, G, K, q, J = e((() => {
	r(), P = [
		p[1],
		p[5],
		p[0]
	], F = 64, I = 3, L = 192, R = {
		flowIn: .6,
		flowOut: 3.4,
		merge: 3,
		dur: 2.6,
		close: 6.1,
		split: 9.6,
		loop: 14
	}, z = l / R.loop, B = R.loop / 5, V = .58, H = .3, U = .74, W = d(7), G = [], K = Array.from({ length: L }, (e, t) => {
		let n = U * .86 * Math.sqrt((t + .5) / L), r = t * 2.39996;
		return [Math.cos(r) * n, Math.sin(r) * n];
	});
	for (let e = 191; e > 0; e--) {
		let t = Math.floor(W() * (e + 1));
		[K[e], K[t]] = [K[t], K[e]];
	}
	q = [
		0,
		1,
		2
	].map((e) => {
		let t = -Math.PI / 2 + e * l / I;
		return [Math.cos(t) * V, Math.sin(t) * V + .04];
	});
	for (let e = 0; e < I; e++) {
		let t = Array.from({ length: F }, (t, n) => {
			let r = H * .8 * Math.sqrt((n + .5) / F), i = n * 2.39996;
			return [q[e][0] + Math.cos(i) * r, q[e][1] + Math.sin(i) * r];
		}).sort((e, t) => e[0] - t[0] || e[1] - t[1]), n = K.slice(e * F, (e + 1) * F).sort((e, t) => e[0] - t[0] || e[1] - t[1]);
		for (let r = 0; r < F; r++) G.push({
			g: e,
			a: t[r],
			b: n[r],
			d: W() * .5 + (t[r][0] + .9) * .18,
			ph: W() * l,
			s: .75 + W() * .5,
			al: W() < .25 ? .55 : .95
		});
	}
})), Y = /* @__PURE__ */ t((() => {
	O(), J(), document.querySelectorAll("[data-pv=\"about-orbits\"]").forEach(g), document.querySelectorAll("[data-pv=\"careers-affine\"]").forEach(N);
}));
//#endregion
export default Y();
