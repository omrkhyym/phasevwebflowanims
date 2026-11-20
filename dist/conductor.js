import { n as e, t } from "./rolldown-runtime-wf392T_D.mjs";
import { a as n, c as r, d as i, f as a, h as o, i as s, l as c, m as l, n as u, o as d, p as f, r as p, s as m, t as h, u as g, v as _, y as v } from "./bonv-draw-Db5acgQk.mjs";
import { a as y, c as b, i as x, n as S, o as C, r as w, s as T, t as E } from "./hero-stage-DpBC6yvy.mjs";
import { n as D, t as O } from "./platform-connect-tree-CuHhjRi6.mjs";
import { n as k, t as A } from "./cond-roles-C9a4ANms.mjs";
//#region src/conductor-hero-bg.js
function j(e) {
	if (!e || e.dataset.pvInit) return;
	let t = T(83), n = [...Array(I)].map(() => z.map((e, n) => ({
		...e,
		len: e.head ? .42 + t() * .2 : n % 3 == 0 ? .3 + t() * .3 : .82 + t() * .18,
		alt: .4 + t() * .55
	}))), r = !1, i = 0, a = 0, o = 0, s = 0, c = 0, l = 0, u = 6.5, d = .42;
	function f({ W: e, H: t, flow: n }) {
		r = n, r ? (u = 8, d = .7, i = Math.min(e * .36, t * .72 / 1.32), a = i * 1.32, o = i * 1.14, s = 0, c = (e - i) / 2, l = (t - a) / 2) : (u = 6.5, d = .42, i = Math.min(e * .5 / 4.9, t * .3), o = i * .78, a = i * 1.32, s = Math.min(a * .46, (t * .8 - a) / 5), c = e * .965 - (i + o * 5), l = (t - (a + s * 5)) / 2);
	}
	let p = (e, t) => e + a * .13 + t.y * (a * .74 / B);
	function m(e, t) {
		let { ctx: m, W: h, H: g, mouse: _, reduce: v } = e;
		f(e);
		let y = v ? t + L + 2 : t;
		m.clearRect(0, 0, h, g);
		let x = -_.x * 12, D = -_.y * 8, O = i / 30, k = Math.max(1.1, O * .32), A = v ? 0 : Math.floor(Math.max(0, y - L) / u), j = v ? R : Math.max(0, y - L) % u, z = T(500 + A), B = (e) => .5 + e * d, V = v ? 1 : 1 - w(b(j, u - 1.4, u - .5)), ee = n.map((e, t) => {
			let n = e.map((e, t) => t).filter((n) => !e[n].head && (r || t === 5 || p(0, e[n]) < s * .9));
			return n.length ? n[Math.floor(z() * n.length)] : 1;
		}), H = 0;
		if (r && !v) {
			let e = S((j - B(0)) / d / 5) * 5, t = w(b(j, u - 1.2, u - .1));
			H = w(e / 5) * 5 * o * (1 - t);
		}
		let U = (e) => c + e * o - H + x, W = (e) => l + e * s + D, G = (t, n) => r ? n * S(Math.min((t + i) / (h * .18), (h - t) / (h * .18))) : e.fade(t + i * .5) * n, K = (e, t, n, r, i) => {
			t <= e || (m.strokeStyle = r, m.lineWidth = i, m.beginPath(), m.moveTo(e, n), m.lineTo(t, n), m.stroke());
		};
		m.lineCap = "round";
		let te = [];
		for (let e = 0; e < I; e++) {
			let t = U(e), r = W(e);
			if (t > h + 4 || t + i < -4) continue;
			let o = w(b(y, e * .15, e * .15 + .9));
			if (o <= 0) continue;
			let s = G(t, o);
			if (s <= .003) continue;
			let c = B(e), l = v ? 1 : w(b(j, c, c + .45)), u = v ? 0 : Math.max(0, 1 - Math.abs(j - c - .25) / .55) * V, d = e === 0 ? F : N, f = i * .16;
			m.globalAlpha = s, m.setLineDash([]), m.fillStyle = "rgba(24,20,64,.94)", m.beginPath(), m.moveTo(t, r), m.lineTo(t + i - f, r), m.lineTo(t + i, r + f), m.lineTo(t + i, r + a), m.lineTo(t, r + a), m.closePath(), m.fill(), m.setLineDash([.001, O * 1.3]), m.lineWidth = k * 1.6, m.strokeStyle = u > 0 ? C(d, .3 + .55 * u) : C(P, .3), m.stroke(), m.beginPath(), m.moveTo(t + i - f, r), m.lineTo(t + i - f, r + f), m.lineTo(t + i, r + f), m.stroke(), m.setLineDash([.001, O]), n[e].forEach((n, a) => {
				let o = a === ee[e], s = n.len + (n.alt - n.len) * (o ? l : 0), c = t + i * .12, u = c + i * .74 * s, f = p(r, n);
				for (let e = 0; e < (n.head ? 2 : 1); e++) {
					let t = f + e * O;
					K(c, u, t, C(n.head ? P : M, (n.head ? .55 : .5) * (o ? 1 - l * V * .8 : 1)), k * 2), o && l * V > 0 && K(c, c + (u - c) * l, t, C(d, .95 * V), k * 2.3);
				}
				o && e < 5 && te.push({
					k: e,
					xa: u,
					ya: f
				});
			});
		}
		if (m.globalAlpha = 1, m.setLineDash([]), !v) for (let e of te) {
			let t = e.k, o = U(t + 1) + i * .12, c = p(W(t + 1), n[t + 1][ee[t + 1]]), l = b(j, B(t) + .3, B(t + 1));
			if (l <= 0 || l >= 1) continue;
			let u = r ? a * .12 : s * .3;
			for (let n = 0; n < 4; n++) {
				let r = w(S(l - n * .06)), a = e.xa + (o - e.xa) * r, s = e.ya + (c - e.ya) * r - Math.sin(Math.PI * r) * u;
				m.globalAlpha = G(a - i * .5, 1) * Math.sin(Math.PI * l) * (1 - n * .25), m.fillStyle = C(t === 0 && l < .5 ? F : N, .95), m.beginPath(), m.arc(a, s, k * (1.9 - n * .35), 0, E), m.fill();
			}
		}
		m.globalAlpha = 1;
	}
	return y(e, {
		name: "conductor",
		draw: m,
		still: R
	});
}
var M, N, P, F, I, L, R, z, B, V = e((() => {
	x(), M = [
		146,
		138,
		205
	], N = [
		127,
		232,
		207
	], P = [
		199,
		196,
		226
	], F = [
		226,
		199,
		10
	], I = 6, L = 1.2, R = 4.2, z = [
		{
			y: 0,
			head: 1
		},
		{ y: 2 },
		{ y: 3 },
		{ y: 4 },
		{ y: 5.6 },
		{ y: 6.6 },
		{ y: 7.6 },
		{ y: 9.2 },
		{ y: 10.2 },
		{ y: 11.2 }
	], B = 12.2;
}));
//#endregion
//#region src/cond-answer.js
function ee(e) {
	let t = o(e), i = [...e.querySelectorAll("[data-role=\"docs\"] li")].slice(0, 6).map((e) => ({
		lab: e.textContent.trim().toUpperCase(),
		ic: e.dataset.icon || "doc"
	})), u = t.one("handoffs").toUpperCase(), v = t.one("hub").toUpperCase(), y = t.one("change").toUpperCase(), b = t.one("approve"), x = i.length || 1, S = (e) => -Math.PI / 2 + e * n / x, C = null;
	function w(e) {
		let { W: t, H: n } = e, r = t >= 760, i = e.S = r ? g(t / 1200, .6, 1.15) : g(t / 400, .75, 1.1), a = [t / 2, n / 2], o = r ? Math.min(n * .34, t * .2) : Math.min(t * .3, n * .3);
		C = {
			hz: r,
			C: a,
			R: o,
			Rc: o * .42,
			nr: (r ? 20 : 16) * i,
			fsM: Math.max(8.5, (r ? 10.5 : 9.5) * i),
			fsB: Math.max(12, 13 * i)
		};
	}
	function T(e, t, n, r, i, a) {
		if (i <= 0 || n <= t) return;
		let { C: o, R: s } = C;
		e.x.strokeStyle = r, e.x.globalAlpha = g(i), e.x.lineWidth = a, e.x.lineCap = "round", e.x.beginPath(), e.x.arc(o[0], o[1], s, -Math.PI / 2 + t, -Math.PI / 2 + n), e.x.stroke(), e.x.globalAlpha = 1;
	}
	function E(e, t) {
		let { S: o, W: c, H: g } = e, { hz: w, C: E, R: D, Rc: O, nr: k, fsM: A, fsB: j } = C, M = (e) => a(_(t, H.dock + e * .08, H.dock + 1 + e * .08)), N = i.map((e, n) => {
			let r = M(n), i = 1 - r, a = [W[n][0] * c, W[n][1] * g], s = [E[0] + Math.cos(S(n)) * D, E[1] + Math.sin(S(n)) * D];
			return [f(a[0], s[0], r) + Math.sin(t * .9 + n) * 7 * o * i, f(a[1], s[1], r) + Math.cos(t * .7 + n * 2) * 6 * o * i];
		}), P = (e) => H.wave + e * H.waveStep, F = (e) => f(H.close0, H.close1, e / x), I = 1 - _(t, H.ring, H.ring + .5);
		if (I > 0 && (G.forEach(([n, r], i) => {
			let c = H.hand + i * H.handStep, l = a(_(t, c, c + .35)), u = 1 - _(t, c + .5, c + 1.1);
			if (l <= 0 || u <= 0) return;
			let [d, f] = e.trim(N[n], N[r], k + 6 * o, k + 6 * o), m = r < n;
			e.flow(e.qpts(d, f, m ? .25 : -.12, l), m ? s : p, .55 * u * I, t, l >= 1 ? u : 0, i);
		}), u)) {
			let n = I * _(t, H.hand, H.hand + .4), r = w ? 28 * o : 18 * o, i = w ? 34 * o : 26 * o;
			e.text(u, r, i, 400, A, p, n, "left", !0), G.forEach((a, c) => {
				let l = _(t, H.hand + c * H.handStep + .3, H.hand + c * H.handStep + .45);
				e.line(r + c * 7 * o, i + 10 * o, r + c * 7 * o, i + 10 * o + 12 * o * l, a[1] < a[0] ? s : m, .7 * n);
			});
		}
		let L = l(_(t, H.ring, H.ring + 1.2));
		if (L > 0) {
			T(e, 0, n * L, "rgba(244,244,244,.16)", 1, 1);
			let i = _(t, H.wave, H.wave + x * H.waveStep);
			if (i > 0 && i < 1) {
				let t = n * i;
				for (let n = 0; n < 14; n++) T(e, Math.max(0, t - (n + 1) * .045), t - n * .045, s, (1 - n / 14) * .9, 2.5 * o);
			}
			let c = _(t, H.wave, H.wave + x * H.waveStep) * (1 - _(t, H.close0, H.close0 + .4));
			c > 0 && T(e, 0, n * c, h, .35, 1.2);
			let l = a(_(t, H.close0, H.close1));
			l > 0 && T(e, 0, n * l, r, 1 - .5 * _(t, H.close1 + .4, H.close1 + 1.4), 2.5 * o);
		}
		let R = l(_(t, H.core, H.core + .6));
		if (R > 0) {
			let r = Math.min(_(t, H.change, H.change + .4), 1 - _(t, H.wave + x * H.waveStep - .3, H.wave + x * H.waveStep + .2)), i = O + 12 * o, a = Math.round(n * i / (9 * o)), c = t * 3.4;
			for (let l = 0; l < a; l++) {
				let u = t * .2 + l / a * n, d = ((u - c) % n + Math.PI * 3) % n - Math.PI, f = Math.exp(-((d / .45) ** 2)) * r;
				e.dot(E[0] + Math.cos(u) * (i + 3 * o * f), E[1] + Math.sin(u) * (i + 3 * o * f), 1.3 * o * (1 + 1.1 * f), s, R * (.55 + .45 * f));
			}
			e.glass(E[0] - O, E[1] - O, O * 2, O * 2, O, R), e.icon("net", E[0], E[1] - O * .42, Math.min(O * .42, 34 * o), R), e.text(v, E[0], E[1] + A * .2, 400, A, m, R, "center", !0);
			let l = R * _(t, H.wave + x * H.waveStep, H.wave + x * H.waveStep + .4), u = 28 * o, d = e.tw(b, 500, j * .9) + 32 * o;
			e.button(b, E[0] - d / 2, E[1] + O * .3, u, j * .9, Math.sin(Math.PI * _(t, H.press, H.press + .25)), l * (1 - .6 * _(t, H.close1, H.close1 + .6)));
		}
		let z = l(_(t, H.change, H.change + .4)) * (1 - _(t, H.close0, H.close0 + .5));
		if (z > 0 && N[0]) {
			let n = N[0], [r, i] = e.trim(n, E, k + 6 * o, O + 18 * o), c = a(_(t, H.change + .2, H.change + .7));
			if (e.flow(e.qpts(r, i, 0, c), s, .6 * z, t, c >= 1 ? 1 - _(t, H.wave, H.wave + .4) : 0, 9), y) {
				let t = e.tw(y, 400, A * .9, !0) + 18 * o, r = 20 * o, i = n[0] + k + 12 * o, a = n[1] - r / 2;
				e.x.save(), e.x.globalAlpha = z, e.rr(i, a, t, r, r / 2), e.x.strokeStyle = s, e.x.lineWidth = 1, e.x.stroke(), e.x.restore(), e.text(y, i + 9 * o, a + r / 2 + A * .32, 400, A * .9, s, z, "left", !0);
			}
		}
		i.forEach((n, r) => {
			let i = l(_(t, H.in + r * .1, H.in + .5 + r * .1)), a = N[r], c = M(r), u = l(r === 0 ? _(t, H.change, H.change + .3) : _(t, P(r), P(r) + .3)), f = l(_(t, F(r), F(r) + .3)), g = f > 0 ? d : r === 0 ? s : h;
			e.ring(a[0], a[1], k, g, Math.max(u, f), i), n.ic === "db" ? e.db(a[0], a[1], k * .62, .85 * i) : e.icon(n.ic, a[0], a[1], k * 1.05, .85 * i);
			let v = Math.cos(S(r)), y = Math.sin(S(r)), b = w && Math.abs(v) > .3, x = b ? a[0] + Math.sign(v) * (k + 12 * o) * c + (1 - c) * (k + 12 * o) : a[0], C = b ? a[1] + A * .36 : y < -.5 && c > .5 ? a[1] - k - 12 * o : a[1] + k + 18 * o, T = b ? v > 0 || c < .5 ? "left" : "right" : "center";
			e.text(n.lab, x, C, 400, A, f > 0 || u > 0 ? m : p, i, T, !0);
		});
	}
	return c(e, {
		aspect: (e) => e >= 760 ? e >= 1e3 ? .5 : .62 : 1.15,
		loop: H.loop,
		fade: H.fade,
		still: U,
		layout: w,
		draw: E
	});
}
var H, U, W, G, K = e((() => {
	i(), H = {
		in: .2,
		hand: .6,
		handStep: .34,
		ring: 3.4,
		dock: 3.7,
		core: 3.9,
		change: 5.4,
		wave: 5.9,
		waveStep: .42,
		press: 8.7,
		close0: 8.85,
		close1: 10.2,
		fade: 12.4,
		loop: 13
	}, U = 11.2, W = [
		[.2, .26],
		[.8, .2],
		[.64, .74],
		[.32, .8],
		[.9, .56],
		[.1, .58]
	], G = [
		[0, 1],
		[1, 2],
		[2, 1],
		[1, 3],
		[3, 4],
		[4, 2],
		[2, 5],
		[5, 0]
	];
}));
//#endregion
//#region src/cond-dose.js
function te(e) {
	let t = o(e), i = (t, n) => {
		let r = parseFloat(e.dataset[t]);
		return Number.isFinite(r) ? r : n;
	}, s = i("a", 0), u = i("b", 0), f = Math.round(i("n", 0)), h = t.one("label-a").toUpperCase(), v = t.one("label-b").toUpperCase(), y = t.one("metric").toUpperCase(), b = t.one("unit").toUpperCase(), x = t.one("n-label").toUpperCase(), S = null;
	function C(e) {
		let { W: t, H: n } = e, r = e.S = g(t / 480, .7, 1.25), i = Math.min(t * .17, n * .2);
		S = {
			S: r,
			r: i,
			cy: n * .3,
			ca: t * .27,
			cb: t * .73,
			fsM: Math.max(8, 9 * r),
			fsN: Math.max(22, i * .48),
			gy: n * .64
		};
	}
	function w(e, t, r, i, a, o, s, c, l) {
		c <= 0 || o <= a || (e.x.strokeStyle = s, e.x.globalAlpha = c, e.x.lineWidth = l, e.x.lineCap = "round", e.x.beginPath(), e.x.arc(t, r, i, -Math.PI / 2 + n * a, -Math.PI / 2 + n * o), e.x.stroke(), e.x.globalAlpha = 1);
	}
	function T(e, t) {
		let { S: i } = e, { r: o, cy: c, ca: g, cb: C, fsM: T, fsN: E, gy: D } = S, O = l(_(t, q.in, q.in + .5)), k = a(_(t, q.fa0, q.fa1)) * s / 100, A = a(_(t, q.fb0, q.fb1)) * u / 100;
		[[
			g,
			k,
			s,
			h,
			p
		], [
			C,
			A,
			u,
			v,
			d
		]].forEach(([a, l, u, f, h], g) => {
			e.x.save(), e.x.setLineDash([1, 5 * i]), e.x.lineCap = "round", e.x.strokeStyle = `rgba(140,134,176,${.7 * O})`, e.x.lineWidth = 1.5, e.x.beginPath(), e.x.arc(a, c, o, 0, n), e.x.stroke(), e.x.restore();
			let v = g === 1 ? Math.min(l, s / 100) : l;
			w(e, a, c, o, 0, v, g ? d : "rgba(244,244,244,.55)", O, 2 * i), g === 1 && l > s / 100 && w(e, a, c, o, s / 100, l, r, O, 2.5 * i);
			let y = g ? _(t, q.fb0, q.fb1) : _(t, q.fa0, q.fa1);
			if (y > 0 && y < 1) {
				let t = -Math.PI / 2 + n * l;
				e.dot(a + Math.cos(t) * o, c + Math.sin(t) * o, 3.5 * i, m, O);
			}
			e.text(Math.round(l * 100) + "%", a, c + E * .35, 300, E, m, O * (g ? 1 : .7), "center"), e.text(f, a, c + o + 24 * i, 400, T, g ? m : p, O, "center", !0);
		}), e.text(y, (g + C) / 2, c + o + 44 * i, 400, T * .9, p, O * .8, "center", !0);
		let j = l(_(t, q.gap0, q.gap1));
		if (j > 0) {
			let t = Math.round(u - s);
			e.text((t >= 0 ? "+" : "") + t + (b ? " " + b : ""), (g + C) / 2, c + o * .75 + T * .4, 500, T * 1.25, r, j, "center", !0);
		}
		if (f > 0) {
			let n = Math.ceil(f / 10), r = Math.min(o * 1.6 / 10, 9 * i), a = Math.max(1, r * .22);
			[g, C].forEach((n) => {
				let i = n - r * 9 / 2;
				for (let n = 0; n < f; n++) {
					let o = O * l(_(t, q.grid + n * .008, q.grid + .3 + n * .008));
					e.dot(i + n % 10 * r, D + Math.floor(n / 10) * r, a, m, .55 * o);
				}
			}), e.text(x, (g + C) / 2, D + n * r + 18 * i, 400, T, m, .8 * O * _(t, q.lab, q.lab + .4), "center", !0), e.text("=", (g + C) / 2, D + n * r / 2 + T * .5, 300, T * 1.6, p, O * _(t, q.lab, q.lab + .4), "center");
		}
	}
	return c(e, {
		aspect: (e) => e < 420 ? 1 : .82,
		loop: q.loop,
		fade: q.fade,
		still: ne,
		layout: C,
		draw: T
	});
}
var q, ne, re = e((() => {
	i(), q = {
		in: .2,
		fa0: 1,
		fa1: 3.2,
		fb0: 1.4,
		fb1: 3.8,
		gap0: 4.2,
		gap1: 4.9,
		grid: 5.1,
		lab: 6.4,
		fade: 11.4,
		loop: 12
	}, ne = 9;
}));
//#endregion
//#region src/cond-backbone.js
function ie(e) {
	let t = o(e), n = [...e.querySelectorAll("[data-role=\"sources\"] li")].slice(0, 3).map((e) => ({
		lab: e.textContent.trim().toUpperCase(),
		ic: e.dataset.icon || "doc"
	})), r = t.one("hub").toUpperCase(), i = t.one("draft").toUpperCase(), u = t.one("check").toUpperCase(), h = t.one("crf").toUpperCase(), v = t.one("edc").toUpperCase(), y = t.one("gap").toUpperCase(), b = t.one("fixed").toUpperCase(), x = null;
	function S(e) {
		let { W: t, H: r } = e, i = e.S = g(t / 480, .7, 1.25), a = 18 * i, o = Math.max(8, 8.8 * i), s = t < 420, c = 28 * i, l = s ? t * .5 : Math.min(t * .36, 160 * i), u, d, f, p;
		s ? (u = n.map((e, t) => [a + l / 2, a + c / 2 + t * (c + 8 * i)]), d = {
			x: a + l + (t - a - (a + l)) / 2,
			y: u[1][1],
			w: Math.min(t - 2 * a - l - 20 * i, 130 * i),
			h: 32 * i
		}, f = {
			x: a,
			y: u[2][1] + c / 2 + 22 * i,
			w: t - 2 * a,
			h: r * .34
		}, p = {
			x: a,
			y: f.y + f.h + 14 * i,
			w: t - 2 * a,
			h: r - a - (f.y + f.h + 14 * i)
		}) : (u = n.map((e, t) => [a + 18 * i + l / 2, a + c / 2 + t * (c + 9 * i)]), d = {
			x: a + 18 * i + l / 2,
			y: a + 3 * (c + 9 * i) + 26 * i,
			w: l,
			h: 34 * i
		}, f = {
			x: t * .46,
			y: a,
			w: t * .54 - a,
			h: r * .6 - a
		}, p = {
			x: a,
			y: r * .66,
			w: t - 2 * a,
			h: r * .34 - a
		}), x = {
			pad: a,
			fsM: o,
			chh: c,
			sw: l,
			src: u,
			hub: d,
			draft: f,
			check: p,
			narrow: s
		};
	}
	function C(e, t) {
		let { S: o } = e, { fsM: c, chh: g, sw: S, src: C, hub: w, draft: T, check: E, narrow: D } = x, O = (e) => J.p0 + e * J.pStep;
		C.forEach((n, r) => {
			let i = a(_(t, J.link + r * .15, J.link + .6 + r * .15));
			if (i <= 0) return;
			let s = D ? [n[0] + S / 2 + 6 * o, n[1]] : [n[0] - S / 2 - 6 * o, n[1]], c = D ? [w.x - w.w / 2 - 6 * o, w.y + (r - 1) * 8 * o] : [w.x - w.w / 2 - 6 * o, w.y], l = Math.min(_(t, O(r), O(r) + .15), 1 - _(t, O(r) + .5, O(r) + .7));
			e.flow(e.qpts(s, c, D ? 0 : .45, i), l > 0 ? X[r] : m, .3 + .3 * l, t, i >= 1 ? l : 0, r);
		});
		let k = (e) => [T.x - 6 * o, T.y + 34 * o + e * (T.h - 42 * o) / 3 + 8 * o];
		for (let n = 0; n < 3; n++) {
			let r = a(_(t, O(n) + .35, O(n) + .8));
			if (r <= 0) continue;
			let i = D ? [w.x, w.y + w.h / 2 + 6 * o] : [w.x + w.w / 2 + 6 * o, w.y], s = D ? [T.x + T.w * (.62 + .12 * n), T.y - 6 * o] : k(n), c = Math.min(_(t, O(n) + .8, O(n) + .95), 1 - _(t, O(n) + 1.3, O(n) + 1.5));
			e.flow(e.qpts(i, s, D ? .1 : -.1, r), X[n], .35, t, r >= 1 ? c : 0, n + 3);
		}
		C.forEach((r, i) => {
			let a = l(_(t, J.src + i * .15, J.src + .55 + i * .15)), o = Math.min(_(t, O(i), O(i) + .2), 1 - _(t, O(i) + 1, O(i) + 1.4));
			e.chip(n[i].lab, r[0], r[1], S, g, n[i].ic, a, X[i], .2 + .8 * o, c);
		}), e.chip(r, w.x, w.y, w.w, w.h, "net", l(_(t, J.hub, J.hub + .5)), m, .35, c);
		let A = l(_(t, J.draft, J.draft + .5));
		if (A > 0) {
			e.glass(T.x, T.y, T.w, T.h, 16 * o, A), e.text(i, T.x + 14 * o, T.y + 20 * o, 400, c, p, A, "left", !0);
			let n = (T.h - 42 * o) / 3;
			for (let r = 0; r < 3; r++) {
				let i = T.y + 34 * o + r * n, a = T.x + 28 * o, s = T.x + T.w - 14 * o, c = Math.max(2, Math.min(3, Math.floor(n / (9 * o))));
				for (let n = 0; n < c; n++) {
					let u = l(_(t, O(r) + .9 + n * .2, O(r) + 1.3 + n * .2)), d = (s - a) * (n === c - 1 ? .55 + .15 * r : 1);
					e.line(a, i + n * 9 * o + 4 * o, a + d * u, i + n * 9 * o + 4 * o, m, .45 * A, 3.5 * o);
				}
				let u = A * l(_(t, O(r) + 1.2, O(r) + 1.5));
				e.dot(T.x + 16 * o, i + 4 * o, 3.5 * o, X[r], u);
			}
		}
		let j = l(_(t, J.check, J.check + .5));
		if (j > 0) {
			e.glass(E.x, E.y, E.w, E.h, 16 * o, j), e.text(u, E.x + 14 * o, E.y + 19 * o, 400, c, p, j, "left", !0);
			let n = E.x + 14 * o, r = E.x + E.w * .5, i = E.x + E.w - 14 * o, a = E.y + 30 * o, g = (E.h - 38 * o) / Y;
			e.text(h, n, a + 2 * o, 400, c * .9, p, .8 * j, "left", !0), e.text(v, r + 18 * o, a + 2 * o, 400, c * .9, p, .8 * j, "left", !0);
			let x = _(t, J.scan0, J.scan1), S = l(_(t, J.fix0, J.fix1));
			for (let u = 0; u < Y; u++) {
				let p = a + 8 * o + (u + .5) * g * .92, h = j * l(_(t, J.check + .2 + u * .1, J.check + .5 + u * .1)), v = u === J.gapRow, C = x * Y > u + .5, w = (r - n - 26 * o) * (.55 + .1 * (u * 7 % 4)), T = v ? f(w * .55, w, S) : w;
				e.line(n, p, n + w, p, m, .4 * h, 3.5 * o), e.line(r + 18 * o, p, r + 18 * o + T, p, v && S < 1 && C ? s : m, .4 * h + (v && C ? .3 * h : 0), 3.5 * o);
				let E = v ? S > .5 ? d : s : d;
				if (C && (e.x.save(), e.x.setLineDash([1, 4 * o]), e.x.lineCap = "round", e.line(n + w + 6 * o, p, r + 12 * o, p, E, .8 * h, 1.5), e.x.restore(), v)) {
					let t = S > .5 ? b : y;
					e.text(t, i, p + c * .36, 400, c * .9, E, h, "right", !0);
				}
			}
			if (x > 0 && x < 1) {
				let t = a + 8 * o + x * Y * g * .92;
				e.line(n, t, i, t, m, .15 * j, 1);
			}
		}
	}
	return c(e, {
		aspect: (e) => e < 420 ? 1.3 : 11 / 16,
		loop: J.loop,
		fade: J.fade,
		still: ae,
		layout: S,
		draw: C
	});
}
var J, ae, Y, X, oe = e((() => {
	i(), J = {
		src: .2,
		hub: .8,
		link: 1.1,
		draft: 1.8,
		p0: 2.4,
		pStep: 1.15,
		check: 6.2,
		scan0: 6.9,
		scan1: 8.1,
		gapRow: 2,
		fix0: 8.8,
		fix1: 9.4,
		fade: 11.4,
		loop: 12
	}, ae = 10, Y = 4, X = [
		u[0],
		u[1],
		u[3]
	];
}));
//#endregion
//#region src/cond-protocol.js
function se(e) {
	let t = o(e), n = t.one("doc").toUpperCase(), r = t.one("v-before").toUpperCase(), i = t.one("v-after").toUpperCase(), u = [...e.querySelectorAll("[data-role=\"sections\"] li")].map((e) => ({
		lab: e.textContent.trim().toUpperCase(),
		focus: e.hasAttribute("data-focus"),
		impact: e.hasAttribute("data-impact")
	})), v = t.one("user"), y = t.one("question"), b = t.one("app").toUpperCase(), x = t.one("x-axis").toUpperCase(), S = t.one("y-axis").toUpperCase(), C = t.one("approve"), w = Math.max(0, u.findIndex((e) => e.focus)), T = u.map((e, t) => e.impact ? t : -1).filter((e) => e >= 0), E = null;
	function D(e) {
		let { W: t, H: n } = e, r = e.S = g(t / 480, .7, 1.25), i = 18 * r, a = Math.max(8, 8.8 * r), o = Math.max(12, 12.5 * r), s = t < 420, c, l, d, f = (t, n, i) => {
			let a = e.wrap(y, 400, o, i - 54 * r);
			return {
				x: t,
				y: n,
				w: i,
				h: a.length * o * 1.4 + 22 * r,
				lines: a
			};
		};
		if (s) c = {
			x: i,
			y: i,
			w: t - 2 * i,
			h: n * .4
		}, l = f(i, c.y + c.h + 12 * r, t - 2 * i), d = {
			x: i,
			y: l.y + l.h + 12 * r,
			w: t - 2 * i,
			h: n - i - (l.y + l.h + 12 * r)
		};
		else {
			c = {
				x: i,
				y: i,
				w: t * .38,
				h: n - 2 * i
			};
			let e = c.x + c.w + 44 * r;
			l = f(e, i, t - e - i), d = {
				x: e,
				y: l.y + l.h + 20 * r,
				w: l.w,
				h: n - i - (l.y + l.h + 20 * r)
			};
		}
		E = {
			fsM: a,
			fsB: o,
			doc: c,
			bub: l,
			app: d,
			narrow: s,
			rowH: (c.h - 34 * r) / Math.max(1, u.length)
		};
	}
	function O(e, t) {
		let { S: o } = e, { fsM: c, fsB: g, doc: D, bub: O, app: k, narrow: A, rowH: j } = E, M = (e) => D.y + 30 * o + e * j, N = l(_(t, Z.card, Z.card + .5)), P = (e) => l(_(t, Z.imp + e * .2, Z.imp + .5 + e * .2)), F = (e) => l(_(t, Z.prop + e * .25, Z.prop + .5 + e * .25)), I = D.x + D.w + 22 * o, L = a(_(t, Z.q + .3, Z.q + .9)), R = 1 - _(t, Z.app, Z.app + .5);
		!A && L > 0 && R > 0 && e.flow(e.elbow([D.x + D.w + 4 * o, M(w) + j / 2], [O.x - 6 * o, O.y + O.h / 2], I, L), s, .55 * R, t, 0, 0), A || T.forEach((n, r) => {
			let i = a(_(t, Z.imp + r * .2, Z.imp + .6 + r * .2));
			if (i <= 0) return;
			let s = 1 - _(t, Z.prop + 1.6, Z.prop + 2.2);
			if (s <= 0) return;
			let c = I + (r - (T.length - 1) / 2) * 7 * o, l = F(r), u = Math.max(Math.min(_(t, Z.imp + .6 + r * .2, Z.imp + .8 + r * .2), 1 - _(t, Z.approve - .3, Z.approve)), Math.min(_(t, Z.prop + r * .25, Z.prop + .2 + r * .25), 1 - _(t, Z.prop + 1.4, Z.prop + 1.8)));
			e.flow(e.elbow([k.x - 6 * o, k.y + 26 * o + r * 12 * o], [D.x + D.w + 4 * o, M(n) + j / 2], c, i), l > 0 ? d : h, .5 * s, t, i >= 1 ? u : 0, r + 2);
		}), e.glass(D.x, D.y + 10 * o * (1 - N), D.w, D.h, 16 * o, N), e.text(n, D.x + 14 * o, D.y + 20 * o, 400, c, p, N, "left", !0);
		let z = _(t, Z.ver, Z.ver + .3);
		e.text(r, D.x + D.w - 14 * o, D.y + 20 * o, 400, c, p, N * (1 - z), "right", !0), e.text(i, D.x + D.w - 14 * o, D.y + 20 * o, 400, c, d, N * z, "right", !0), u.forEach((n, r) => {
			let i = N * l(_(t, .4 + r * .1, .8 + r * .1)), a = M(r), u = T.indexOf(r), f = r === w ? _(t, Z.q + .2, Z.q + .5) : 0, g = u >= 0 ? P(u) : 0, v = u >= 0 ? F(u) : 0, y = Math.max(f, g), b = r === w ? s : v > 0 ? d : h;
			y > 0 && (e.rr(D.x + 8 * o, a + 2 * o, D.w - 16 * o, j - 4 * o, 8 * o), e.x.strokeStyle = `rgba(${b === "#A99FD8" ? "169,159,216" : b === "#7FE8CF" ? "127,232,207" : "120,168,224"},${.8 * y * i})`, e.x.lineWidth = 1, e.x.stroke()), e.text(n.lab, D.x + 16 * o, a + j * .42, 400, c, y > 0 ? m : p, i, "left", !0);
			let x = (D.w - 32 * o) * (.5 + .12 * (r * 5 % 4));
			e.line(D.x + 16 * o, a + j * .7, D.x + 16 * o + x, a + j * .7, m, .3 * i, 3 * o), u >= 0 && e.dot(D.x + D.w - 18 * o, a + j / 2, 3 * o, v > 0 ? d : h, i * Math.max(g, v));
		});
		let B = l(_(t, Z.q, Z.q + .4));
		if (B > 0) {
			let n = 9 * o;
			e.glass(O.x + 2 * n + 8 * o, O.y, O.w - 2 * n - 8 * o, O.h, 14 * o, B, 5 * o), e.avatar(O.x + n, O.y + n + 4 * o, n, s, v, B);
			let r = Math.round(y.length * _(t, Z.type0, Z.type1));
			O.lines.forEach((t, i) => {
				let a = t.slice(0, Math.max(0, r));
				r -= t.length + 1, e.text(a, O.x + 2 * n + 20 * o, O.y + 11 * o + g * .92 + i * g * 1.4, 400, g, m, B);
			});
		}
		let V = l(_(t, Z.app, Z.app + .5));
		if (V > 0) {
			e.glass(k.x, k.y + 10 * o * (1 - V), k.w, k.h, 16 * o, V), e.text(b, k.x + 14 * o, k.y + 19 * o, 400, c, m, .85 * V, "left", !0);
			let n = 28 * o, r = k.y + k.h - 12 * o - n, i = k.x + 30 * o, s = k.x + k.w - 18 * o, l = k.y + 32 * o, u = r - 22 * o;
			if (u - l > 20 * o) {
				let n = _(t, Z.curve0 - .2, Z.curve0 + .2) * V;
				e.line(i, u, s, u, m, .15 * n), e.line(i, l, i, u, m, .15 * n), e.text(x, s, u + 13 * o, 400, c * .85, p, n, "right", !0), e.x.save(), e.x.translate(i - 8 * o, l), e.x.rotate(-Math.PI / 2), e.text(S, 0, 0, 400, c * .85, p, n, "right", !0), e.x.restore();
				let r = a(_(t, Z.curve0, Z.curve1)), d = (e) => [f(i, s, e), u - (u - l) * (.08 + .84 * le(e))], h = [];
				for (let e = 0; e <= Math.ceil(30 * r); e++) h.push(d(Math.min(e / 30, r)));
				e.poly(h, m, V, 1.6);
				let g = d(.3), v = a(_(t, Z.opt0, Z.opt1)), y = d(f(.3, .58, v));
				e.dot(g[0], g[1], 4 * o, p, V * _(t, Z.cur, Z.cur + .3)), v > 0 && (e.x.save(), e.x.setLineDash([2 * o, 3 * o]), e.line(y[0], y[1], y[0], u, m, .35 * V), e.line(i, y[1], y[0], y[1], m, .35 * V), e.x.restore(), e.dot(y[0], y[1], 4.5 * o, m, V), e.x.strokeStyle = `rgba(244,244,244,${.4 * V})`, e.x.lineWidth = 1, e.x.beginPath(), e.x.arc(y[0], y[1], 8 * o, 0, Math.PI * 2), e.x.stroke());
			}
			let d = V * _(t, Z.approve, Z.approve + .3), h = e.button(C, k.x + 14 * o, r, n, g * .88, Math.sin(Math.PI * _(t, Z.press, Z.press + .25)), d);
			e.approve(k.x + 14 * o + h + 18 * o, r + n / 2, 9 * o, _(t, Z.ok0, Z.ok1), d);
		}
	}
	return c(e, {
		aspect: (e) => e < 420 ? 1.45 : 11 / 16,
		loop: Z.loop,
		fade: Z.fade,
		still: ce,
		layout: D,
		draw: O
	});
}
var Z, ce, le, ue = e((() => {
	i(), Z = {
		card: .2,
		q: 1,
		type0: 1.3,
		type1: 2.8,
		app: 3.2,
		curve0: 3.7,
		curve1: 4.5,
		cur: 4.5,
		opt0: 4.9,
		opt1: 5.9,
		imp: 6.2,
		approve: 7.4,
		press: 7.9,
		ok0: 8.05,
		ok1: 8.7,
		prop: 8.9,
		ver: 9.7,
		fade: 11.4,
		loop: 12
	}, ce = 10.4, le = (e) => 1 - (1 - e) ** 2.4;
}));
//#endregion
//#region src/cond-report.js
function de(e) {
	let t = o(e), n = t.list("stations").slice(0, 5).map((e) => e.toUpperCase()), r = t.list("panels").slice(0, 5).map((e) => e.toUpperCase()), i = t.list("spec").slice(0, 3).map((e) => e.split("→").map((e) => e.trim().toUpperCase())), u = t.one("qc-a").toUpperCase(), y = t.one("qc-b").toUpperCase(), b = t.one("approve"), x = t.one("csr").toUpperCase(), S = null;
	function C(e) {
		let { W: t, H: r } = e, i = e.S = g(t / 480, .7, 1.25), a = 18 * i, o = Math.max(7.5, 8.6 * i), s = Math.max(12, 12.5 * i), c = a + 12 * i, l = a + 34 * i, u = t - a - 34 * i, d = n.map((e, t) => [f(l, u, n.length > 1 ? t / (n.length - 1) : .5), c]), p = c + 9 * i + o + 22 * i;
		S = {
			pad: a,
			fsM: o,
			fsB: s,
			st: d,
			panel: {
				x: a,
				y: p,
				w: t - 2 * a,
				h: r - a - p
			}
		};
	}
	function w(e, t) {
		let { S: o } = e, { fsM: c, fsB: f, st: C, panel: w } = S, T = 9 * o;
		C.forEach((r, i) => {
			if (i < C.length - 1) {
				let n = a(_(t, .1 + i * .08, .6 + i * .08)), s = C[i + 1], c = v(t, Q[i + 1] - .5, Q[i + 1] + .3, .15, .2);
				e.flow(e.qpts([r[0] + T + 5 * o, r[1]], [s[0] - T - 5 * o, s[1]], 0, n), t > Q[i + 1] ? m : p, t > Q[i + 1] ? .55 : .3, t, c, i);
			}
			let s = l(_(t, .1 + i * .08, .5 + i * .08)), u = _(t, Q[i], Q[i] + .4), f = _(t, Q[i + 1], Q[i + 1] + .3);
			e.ring(r[0], r[1], T, i === 3 && f > 0 ? d : m, l(u), s), f > 0 && e.dot(r[0], r[1], 2.5 * o, i === 3 ? d : m, s * f), e.text(n[i], r[0], r[1] + T + 14 * o, 400, c, u > 0 && f < 1 ? m : p, s, "center", !0);
		});
		let E = l(_(t, .3, .8));
		e.glass(w.x, w.y, w.w, w.h, 16 * o, E);
		let D = w.x + 16 * o, O = w.x + w.w - 16 * o, k = w.y + 34 * o, A = w.y + w.h - 14 * o;
		r.forEach((n, r) => {
			let S = E * (r === 4 ? _(t, Q[4], Q[4] + .5) : v(t, Q[r], Q[r + 1], .5, .4));
			if (S <= 0) return;
			e.text(n, D, w.y + 21 * o, 400, c, p, S, "left", !0);
			let C = (t - Q[r]) / fe;
			if (r === 0) {
				let t = (A - k) / 5;
				for (let n = 0; n < 5; n++) for (let r = 0; r < 4; r++) {
					let i = l(_(C, .1 + n * .12 + r * .03, .5 + n * .12 + r * .03)), a = (O - D) / 4;
					e.line(D + r * a, k + n * t + t / 2, D + r * a + a * (.4 + .35 * ((n + 1) * (r + 2) % 5) / 4) * i, k + n * t + t / 2, n === 0 ? p : m, (n === 0 ? .7 : .35) * S, 3 * o);
				}
			}
			if (r === 1) {
				let n = (A - k) / Math.max(3, i.length);
				i.forEach(([r, i], s) => {
					let u = k + n * (s + .5), d = S * l(_(C, .15 + s * .3, .5 + s * .3)), f = a(_(C, .3 + s * .3, .8 + s * .3)), p = (O - D) * .32;
					e.chip(r, D + p / 2, u, p, 26 * o, "db", d, m, 0, c), e.chip(i || "", O - p / 2, u, p, 26 * o, "db", d * _(C, .6 + s * .3, .9 + s * .3), h, .7, c), e.flow(e.qpts([D + p + 6 * o, u], [O - p - 6 * o, u], 0, f), h, .5 * d, t, +(f >= 1), s);
				});
			}
			if (r === 2) {
				let t = (A - k) / 6, n = [
					[
						.18,
						.3,
						.12
					],
					[
						.08,
						.22,
						.3,
						.1
					],
					[.08, .4],
					[
						.16,
						.26,
						.18
					],
					[
						.08,
						.3,
						.2
					],
					[.08, .14],
					[.2, .28]
				];
				for (let r = 0; r < 6; r++) {
					let i = _(C, .1 + r * .17, .35 + r * .17);
					if (i <= 0) continue;
					let a = k + t * (r + .5);
					e.text(String(r + 1).padStart(2, "0"), D, a + c * .36, 400, c * .9, p, .6 * S, "left", !0);
					let l = D + 26 * o + (r > 0 && r < 5 ? 14 * o : 0);
					n[r].forEach((t, c) => {
						let u = (O - D - 50 * o) * t, f = g(i * n[r].length - c);
						e.line(l, a, l + u * f, a, [
							m,
							s,
							h,
							d
						][(r + c) % 4], (c ? .65 : .5) * S, 3.5 * o), l += u + 6 * o;
					});
				}
			}
			if (r === 3) {
				let n = (D + O) / 2, r = 28 * o, i = (A - k - r - 12 * o) / 5.6;
				e.text(u, D, k + c * .4, 400, c * .9, m, .75 * S, "left", !0), e.text(y, n + 14 * o, k + c * .4, 400, c * .9, m, .75 * S, "left", !0);
				for (let t = 0; t < 5; t++) {
					let r = k + i * (t + 1.2), a = l(_(C, .1 + t * .1, .4 + t * .1)), s = (n - D - 24 * o) * (.5 + .1 * (t * 3 % 5));
					e.line(D, r, D + s * a, r, m, .4 * S, 3 * o), e.line(n + 14 * o, r, n + 14 * o + s * a, r, m, .4 * S, 3 * o);
					let c = _(C, .6 + t * .25, .8 + t * .25);
					e.dot(n, r, 3 * o, d, S * c);
				}
				let a = A - r, s = Math.sin(Math.PI * _(t, $.press, $.press + .25)), p = S * _(C, 1.4, 1.7), h = e.button(b, D, a, r, f * .88, s, p);
				e.approve(D + h + 18 * o, a + r / 2, 9 * o, _(t, $.ok0, $.ok1), p);
			}
			if (r === 4) {
				let t = (O - D) * .54, n = (A - k) / 5;
				for (let r = 0; r < 5; r++) {
					let i = l(_(C, .1 + r * .15, .45 + r * .15)), a = k + n * (r + .5);
					r === 1 && e.line(D, a - n / 2, D + t, a - n / 2, m, .25 * S * i), e.line(D, a, D + t * .34 * i, a, r ? m : p, (r ? .45 : .7) * S, 3 * o);
					for (let n = 0; n < 3; n++) {
						let s = D + t * (.42 + n * .2);
						e.line(s, a, s + t * .12 * i, a, r ? h : p, (r ? .6 : .7) * S, 3 * o);
					}
				}
				let r = D + t + 24 * o, i = O - r, a = A - k - 16 * o, s = l(_(C, .9, 1.3));
				if (s > 0) {
					e.glass(r, k + 6 * o * (1 - s), i, a, 8 * o, S * s);
					let t = Math.max(3, Math.floor((a - 24 * o) / (10 * o)));
					for (let n = 0; n < t; n++) {
						let t = l(_(C, 1.2 + n * .12, 1.45 + n * .12)), a = (i - 24 * o) * (n === 0 ? .5 : n % 4 == 3 ? .6 : 1);
						e.line(r + 12 * o, k + 16 * o + n * 10 * o, r + 12 * o + a * t, k + 16 * o + n * 10 * o, m, (n === 0 ? .6 : .3) * S, n === 0 ? 3.5 * o : 2.5 * o);
					}
				}
				e.text(x, r, A, 400, c, m, .8 * S * _(C, 1.6, 1.9), "left", !0);
			}
		});
	}
	return c(e, {
		aspect: (e) => e < 420 ? 1.05 : 11 / 16,
		loop: $.loop,
		fade: $.fade,
		still: pe,
		layout: C,
		draw: w
	});
}
var Q, fe, $, pe, me = e((() => {
	i(), Q = [
		.6,
		4.6,
		8.6,
		12.6,
		17.4,
		22
	], fe = 1.8, $ = {
		press: 15.9,
		ok0: 16.05,
		ok1: 16.7,
		fade: 22.9,
		loop: 23.6
	}, pe = 21.4;
})), he = /* @__PURE__ */ t((() => {
	V(), D(), A(), K(), re(), oe(), ue(), me(), k(), document.querySelectorAll("[data-pv=\"conductor-hero-bg\"]").forEach((e) => j(e)), document.querySelectorAll("[data-pv=\"cond-answer\"]").forEach(ee), document.querySelectorAll("[data-pv=\"cond-dose\"]").forEach(te), document.querySelectorAll("[data-pv=\"cond-backbone\"]").forEach(ie), document.querySelectorAll("[data-pv=\"cond-protocol\"]").forEach(se), document.querySelectorAll("[data-pv=\"cond-report\"]").forEach(de), document.querySelectorAll("[data-pv=\"platform-connect-v2\"]").forEach((e) => O(e));
}));
//#endregion
export default he();
