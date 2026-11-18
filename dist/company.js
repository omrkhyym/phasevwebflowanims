import { n as e, t } from "./rolldown-runtime-wf392T_D.mjs";
import { _ as n, a as r, c as i, d as a, f as o, g as s, l as c, m as l, n as u, p as d, s as f, u as p, v as m } from "./bonv-draw-Db5acgQk.mjs";
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
	let n = t.getContext("2d"), i = matchMedia("(prefers-reduced-motion: reduce)").matches, a = _.map((e) => .13 * (1 / e) ** 1.5), o = _.flatMap((e, t) => Array.from({ length: 3 + t }, () => ({
		i: t,
		ph: C() * r,
		s: .8 + C() * .5
	}))), c = w.map(() => [0, 0]), l = 0, u = 0, d = () => {
		let r = Math.min(devicePixelRatio || 1, 2), a = e.getBoundingClientRect();
		l = a.width, u = a.height, t.width = Math.round(l * r), t.height = Math.round(u * r), n.setTransform(r, 0, 0, r, 0, 0), i && E(0);
	}, g = (e, t, i, a, o) => {
		o <= 0 || (n.fillStyle = s(a, o), n.beginPath(), n.arc(e, t, i, 0, r), n.fill());
	}, x = !i && !matchMedia("(hover: none)").matches, S = {
		x: 0,
		y: 0,
		tx: 0,
		ty: 0
	}, T = (t) => {
		let n = e.getBoundingClientRect();
		S.tx = p((t.clientX - n.left) / n.width - .5, -.5, .5), S.ty = p((t.clientY - n.top) / n.height - .5, -.5, .5);
	};
	x && window.addEventListener("pointermove", T, { passive: !0 });
	function E(e) {
		n.clearRect(0, 0, l, u);
		let t = l > 991, i = l * (t ? .68 : .78), d = u / 2, h = Math.min(u * .28, l * (t ? .2 : .34)), x = p(Math.min(l, u) / 800, .7, 1.2), C = (e) => _[e] * h * y;
		S.x += (S.tx - S.x) * .05, S.y += (S.ty - S.y) * .05;
		let T = (e) => [S.x * 2 * 12 * x * e, S.y * 2 * 12 * x * e], E = e % v, O = h * .6 + (C(_.length - 1) * 1.15 - h * .6) * m(E, 0, 3.4), k = h * .45, A = (e) => m(E, 0, 3.4) < 1 ? Math.exp(-(((e - O) / k) ** 2)) : 0, j = (t, n) => C(t) + (2 + t * .6) * x * Math.sin(4 * n + e * .35 + t * 1.3) + 7 * x * A(C(t));
		n.lineWidth = 1, _.forEach((e, t) => {
			let [a, o] = T(.45 + t * .14), c = A(C(t));
			n.strokeStyle = s(f, .14 - t * .018 + .12 * c), n.beginPath();
			for (let e = 0; e <= 180; e++) {
				let s = e / 180 * r, c = j(t, s), l = i + a + Math.cos(s) * c, u = d + o + Math.sin(s) * c;
				e ? n.lineTo(l, u) : n.moveTo(l, u);
			}
			n.stroke();
		});
		for (let t of o) {
			let n = t.ph + a[t.i] * e, r = j(t.i, n), [o, s] = T(.45 + t.i * .14);
			g(i + o + Math.cos(n) * r, d + s + Math.sin(n) * r, 2 * x * t.s, b[t.i], .75);
		}
		let [M, N] = T(.33), P = i + M, F = d + N, I = 1 + .45 * Math.sin(Math.PI * m(E, 0, 1.1));
		w.forEach((t, n) => {
			let r = t.edge ? .006 : .016;
			c[n][0] = P + (t.x + r * Math.sin(e * t.w + t.ph)) * h, c[n][1] = F + (t.y + r * Math.cos(e * t.w * .9 + t.ph * 1.7)) * h;
		});
		let L = D * h;
		n.lineWidth = .5;
		for (let e = 0; e < c.length; e++) for (let t = e + 1; t < c.length; t++) {
			let r = Math.hypot(c[e][0] - c[t][0], c[e][1] - c[t][1]);
			r >= L || (n.strokeStyle = s(f, .28 * I * (1 - r / L)), n.beginPath(), n.moveTo(c[e][0], c[e][1]), n.lineTo(c[t][0], c[t][1]), n.stroke());
		}
		let R = Math.max(.8, h / 250);
		if (w.forEach((e, t) => g(c[t][0], c[t][1], R, f, e.a)), n.save(), n.globalCompositeOperation = "destination-out", t) {
			let e = n.createLinearGradient(0, 0, l * .56, 0);
			e.addColorStop(0, "rgba(0,0,0,.92)"), e.addColorStop(.6, "rgba(0,0,0,.6)"), e.addColorStop(1, "rgba(0,0,0,0)"), n.fillStyle = e, n.fillRect(0, 0, l * .56, u);
		} else n.fillStyle = "rgba(0,0,0,.45)", n.fillRect(0, 0, l, u);
		n.restore();
	}
	let O = new ResizeObserver(d);
	O.observe(e), d();
	let k = !0, A = performance.now(), j = 0, M = 0, N = new IntersectionObserver(([e]) => {
		k = e.isIntersecting;
	});
	N.observe(e);
	let P = (e) => {
		M = requestAnimationFrame(P);
		let t = Math.min((e - A) / 1e3, .05);
		A = e, k && (j += t, E(j));
	};
	return i || (M = requestAnimationFrame(P)), function() {
		cancelAnimationFrame(M), O.disconnect(), N.disconnect(), window.removeEventListener("pointermove", T), t.remove(), delete e.dataset.pvInit;
	};
}
var _, v, y, b, x, S, C, w, T, E, D, O = e((() => {
	a(), _ = [
		1,
		1.45,
		1.95,
		2.5,
		3.1
	], v = 6.5, y = 1.22, b = [
		u[0],
		u[1],
		u[5],
		u[3],
		u[4]
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
	}, C = n(11), w = [], T = .075, E = .062, D = .12;
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
		e.ph = C() * r, e.w = .35 + C() * .3, e.a = e.edge ? .8 : .5 + C() * .3;
	});
}));
//#endregion
//#region src/careers-affine.js
function k(e, t, n, i, a, o, s) {
	if (i <= 0) return;
	let c = e.x, l = c.createLinearGradient(t, n - i, t, n + i);
	l.addColorStop(0, `rgba(255,255,255,${.05 * a})`), l.addColorStop(.6, `rgba(255,255,255,${.015 * a})`), l.addColorStop(1, `rgba(255,255,255,${.008 * a})`), c.fillStyle = l, c.beginPath(), c.arc(t, n, i, 0, r), c.fill(), j(e, t, n, i, o, s);
}
function A(e, t, n, r, i, a) {
	if (!e.createConicGradient) {
		let o = e.createLinearGradient(t - r, n - r, t + r, n + r);
		return o.addColorStop(0, s(f, .4 * a)), o.addColorStop(.4, s(f, .05 * a)), o.addColorStop(1, s(i, .35 * a)), o;
	}
	let o = e.createConicGradient(-3 * Math.PI / 4, t, n);
	return o.addColorStop(0, s(f, .55 * a)), o.addColorStop(.1, s(f, .12 * a)), o.addColorStop(.3, s(f, .04 * a)), o.addColorStop(.5, s(i, .35 * a)), o.addColorStop(.7, s(f, .04 * a)), o.addColorStop(.9, s(f, .12 * a)), o.addColorStop(1, s(f, .55 * a)), o;
}
function j(e, t, n, i, a, o) {
	if (o <= 0 || i <= 0) return;
	let c = e.x;
	c.strokeStyle = A(c, t, n, i, a, o), c.lineWidth = .75, c.beginPath(), c.arc(t, n, i, 0, r), c.stroke(), i > 3 && (c.strokeStyle = s(f, .06 * o), c.lineWidth = .5, c.beginPath(), c.arc(t, n, i - 1.5, 0, r), c.stroke());
}
function M(e, t) {
	let { W: n, H: a, S: c } = e, u = n / 2, p = a / 2, h = Math.min(n, a) / 2 * .9, g = (e) => [u + e[0] * h, p + e[1] * h], _ = (e) => o(m(t, R.merge + e, R.merge + e + R.dur)) - o(m(t, R.split + e, R.split + e + R.dur)), v = _(.25), y = 1 - v, b = g([0, .04 * (1 - v)]), x = V * (1 - v) * h;
	if (y > 0 && x > H * h) {
		let n = (d(H, U, v) * h + 6 * c) / x, i = t % B / B;
		for (let a = 0; a < I; a++) {
			let o = -Math.PI / 2 + a * r / I + n, s = -Math.PI / 2 + (a + 1) * r / I - n;
			if (s <= o) continue;
			let l = Array.from({ length: 41 }, (e, t) => {
				let n = d(o, s, t / 40);
				return [b[0] + Math.cos(n) * x, b[1] + Math.sin(n) * x];
			});
			e.flow(l, f, .45 * y, t, 0, a);
			for (let t = 0; t < 6; t++) {
				let n = i - t * .018;
				if (n <= 0 || n >= 1) continue;
				let r = .5 - .5 * Math.cos(Math.PI * n), a = d(o, s, r), l = Math.sin(Math.PI * n) ** .6;
				e.dot(b[0] + Math.cos(a) * x, b[1] + Math.sin(a) * x, (2.6 - t * .35) * c, f, y * l * (1 - t / 6) * (t ? .7 : 1));
			}
		}
	}
	for (let t = 0; t < I; t++) {
		let n = g([q[t][0] * (1 - v), q[t][1] * (1 - v)]), r = d(H, U, v) * h;
		k(e, n[0], n[1], r, d(1, .42, v), P[t], 1 - v);
	}
	v > 0 && j(e, u, p, d(H, U, v) * h, f, v);
	let S = l(m(t, R.close, R.close + 1.3)) * (1 - m(t, R.split - .3, R.split + .5));
	S > 0 && (e.x.save(), e.x.setLineDash([1, 7 * c]), e.x.lineDashOffset = -t * 14 * c, e.x.strokeStyle = s(i, .8 * S), e.x.lineWidth = 2 * c, e.x.lineCap = "round", e.x.beginPath(), e.x.arc(u, p, U * h + 12 * c, -Math.PI / 2, -Math.PI / 2 + r * l(m(t, R.close, R.close + 1.3))), e.x.stroke(), e.x.restore());
	let C = t * .04, w = Math.cos(C), T = Math.sin(C), E = 2 * c;
	for (let n of G) {
		let r = _(n.d), i = n.b[0] * w - n.b[1] * T, a = n.b[0] * T + n.b[1] * w, o = d(n.a[0], i, r), s = d(n.a[1], a, r), c = Math.sin(Math.PI * r) * .1;
		o += -(a - n.a[1]) * c, s += (i - n.a[0]) * c, o += .006 * Math.sin(z * 2 * t + n.ph), s += .006 * Math.cos(z * 2 * t + n.ph * 1.3);
		let l = g([o, s]);
		e.dot(l[0], l[1], E * n.s, P[n.g], n.al);
	}
}
function N(e) {
	let t = matchMedia("(max-width: 991px)");
	return c(e, {
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
	a(), P = [
		u[1],
		u[5],
		u[0]
	], F = 64, I = 3, L = 192, R = {
		flowIn: .6,
		flowOut: 3.4,
		merge: 3,
		dur: 2.6,
		close: 6.1,
		split: 9.6,
		loop: 14
	}, z = r / R.loop, B = R.loop / 5, V = .58, H = .3, U = .74, W = n(7), G = [], K = Array.from({ length: L }, (e, t) => {
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
		let t = -Math.PI / 2 + e * r / I;
		return [Math.cos(t) * V, Math.sin(t) * V + .04];
	});
	for (let e = 0; e < I; e++) {
		let t = Array.from({ length: F }, (t, n) => {
			let r = H * .8 * Math.sqrt((n + .5) / F), i = n * 2.39996;
			return [q[e][0] + Math.cos(i) * r, q[e][1] + Math.sin(i) * r];
		}).sort((e, t) => e[0] - t[0] || e[1] - t[1]), n = K.slice(e * F, (e + 1) * F).sort((e, t) => e[0] - t[0] || e[1] - t[1]);
		for (let i = 0; i < F; i++) G.push({
			g: e,
			a: t[i],
			b: n[i],
			d: W() * .5 + (t[i][0] + .9) * .18,
			ph: W() * r,
			s: .75 + W() * .5,
			al: W() < .25 ? .55 : .95
		});
	}
})), Y = /* @__PURE__ */ t((() => {
	O(), J(), document.querySelectorAll("[data-pv=\"about-orbits\"]").forEach(g), document.querySelectorAll("[data-pv=\"careers-affine\"]").forEach(N);
}));
//#endregion
export default Y();
