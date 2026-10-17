import { n as e, t } from "./rolldown-runtime-wf392T_D.mjs";
//#region src/company-careers.js
function n(e) {
	if (!e || e.dataset.pvInit) return;
	e.dataset.pvInit = "1", e.style.position = "relative", e.style.width = "100%", e.style.aspectRatio = "4 / 3";
	let t = document.createElement("canvas");
	t.setAttribute("aria-hidden", "true"), t.style.cssText = "position:absolute;inset:0;width:100%;height:100%;display:block", e.appendChild(t);
	let n = t.getContext("2d"), r = matchMedia("(prefers-reduced-motion: reduce)").matches, i = Math.PI * 2, a = [
		"146,138,205",
		"120,168,224",
		"127,232,207"
	], o = (e, t, n) => Math.max(t, Math.min(n, e)), s = (e, t, n) => o((e - t) / (n - t), 0, 1), c = (e) => e < .5 ? 4 * e * e * e : 1 - (-2 * e + 2) ** 3 / 2, l = ((e) => () => {
		e |= 0, e = e + 1831565813 | 0;
		let t = Math.imul(e ^ e >>> 15, 1 | e);
		return t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t, ((t ^ t >>> 14) >>> 0) / 4294967296;
	})(7), u = [], d = .27;
	for (let e = 0; e < 3; e++) {
		let t = -Math.PI / 2 + e * i / 3, n = Math.cos(t) * d, r = Math.sin(t) * d * .95 + .02;
		for (let t = 0; t < 300; t++) {
			let i = .15 * Math.sqrt((t + .5) / 300), a = t * 2.39996;
			u.push({
				g: e,
				x: n + Math.cos(a) * i,
				y: r + Math.sin(a) * i
			});
		}
	}
	let f = [];
	for (let e = 0; e < 900; e++) {
		let t = .36 * Math.sqrt((e + .5) / 900), n = e * 2.39996;
		f.push([Math.cos(n) * t, Math.sin(n) * t * .92]);
	}
	for (let e = 899; e > 0; e--) {
		let t = Math.floor(l() * (e + 1));
		[f[e], f[t]] = [f[t], f[e]];
	}
	let p = [];
	for (let e = 0; e < 3; e++) {
		let t = u.filter((t) => t.g === e).sort((e, t) => e.x - t.x || e.y - t.y), n = f.slice(e * 300, (e + 1) * 300).sort((e, t) => e[0] - t[0] || e[1] - t[1]);
		for (let r = 0; r < 300; r++) p.push({
			g: e,
			ax: t[r].x,
			ay: t[r].y,
			bx: n[r][0],
			by: n[r][1],
			z: l() * 2 - 1,
			d: l() * .45 + (t[r].x + .45) * .25,
			ph: l() * i
		});
	}
	let m = 0, h = 0;
	for (let e of p) m = Math.max(m, Math.abs(e.ax), Math.abs(e.bx)), h = Math.max(h, Math.abs(e.ay), Math.abs(e.by));
	let g = 0, _ = 0, v = () => {
		let r = Math.min(window.devicePixelRatio || 1, 2), i = e.getBoundingClientRect();
		g = i.width, _ = i.height, t.width = Math.round(g * r), t.height = Math.round(_ * r), n.setTransform(r, 0, 0, r, 0, 0);
	}, y = new ResizeObserver(v);
	y.observe(e), v();
	let b = {
		x: 0,
		y: 0,
		tx: 0,
		ty: 0
	}, x = (t) => {
		let n = e.getBoundingClientRect();
		b.tx = o((t.clientX - n.left) / n.width - .5, -1, 1), b.ty = o((t.clientY - n.top) / n.height - .5, -1, 1);
	};
	window.addEventListener("pointermove", x, { passive: !0 });
	let S = 1.8, C = 1.5, w = 6.4;
	function T(e) {
		n.clearRect(0, 0, g, _);
		let t = Math.min(g / (m * 2 * 1.12), _ / (h * 2 * 1.12)), o = g / 2, l = _ / 2, u = r ? 4.5 : e % 10.2;
		b.x += (b.tx - b.x) * .06, b.y += (b.ty - b.y) * .06;
		let d = r ? 0 : b.x, f = r ? 0 : b.y;
		for (let m = 0; m < 3; m++) {
			n.fillStyle = "rgb(" + a[m] + ")";
			for (let a = m * 300; a < (m + 1) * 300; a++) {
				let m = p[a], h = c(s(u, S + m.d, S + m.d + C)) - c(s(u, w + m.d, w + m.d + C)), _ = m.ax + (m.bx - m.ax) * h, v = m.ay + (m.by - m.ay) * h, y = Math.sin(Math.PI * h) * .05;
				_ += -(m.by - m.ay) * y * 1.2, v += (m.bx - m.ax) * y * 1.2, r || (_ += .0025 * Math.sin(e * 1.1 + m.ph), v += .0025 * Math.cos(e * .9 + m.ph * 1.3)), _ += m.z * (.03 * d + .008 * Math.sin(e * .3)), v += m.z * (.022 * f);
				let b = (m.z + 1) / 2, x = (1.05 + b * 1.25) * (g > 600 ? 1 : .8);
				n.globalAlpha = .42 + b * .5, n.beginPath(), n.arc(o + _ * t, l + v * t, x, 0, i), n.fill();
			}
		}
		n.globalAlpha = 1;
	}
	let E = !0, D = performance.now(), O = 0, k = 0, A = new IntersectionObserver(([e]) => {
		E = e.isIntersecting;
	});
	A.observe(e);
	let j = (e) => {
		k = requestAnimationFrame(j);
		let t = Math.min((e - D) / 1e3, .05);
		D = e, E && (O += t, T(O));
	};
	return k = requestAnimationFrame(j), function() {
		cancelAnimationFrame(k), y.disconnect(), A.disconnect(), window.removeEventListener("pointermove", x), t.remove(), delete e.dataset.pvInit;
	};
}
var r = e((() => {}));
//#endregion
//#region src/company-hero-lines.js
function i(e, t) {
	if (!e || e.dataset.pvInit) return;
	let n = Object.assign({}, a, t || {}), r = matchMedia("(prefers-reduced-motion: reduce)"), i = r.matches, d = document.createElement("canvas");
	d.setAttribute("aria-hidden", "true"), Object.assign(d.style, {
		position: "absolute",
		inset: "0",
		width: "100%",
		height: "100%",
		zIndex: "-1",
		pointerEvents: "none",
		display: "block"
	});
	let f = d.getContext("2d");
	if (!f) return;
	e.dataset.pvInit = "1";
	let p = e.style.position, m = e.style.isolation;
	getComputedStyle(e).position === "static" && (e.style.position = "relative"), e.style.isolation = "isolate", e.prepend(d);
	let h = e.querySelector(n.calmTarget), g = 0, _ = 0, v = 1, y = n.pitch, b = [], x = null, S = 0, C = 0, w = +!!i;
	function T(e, t) {
		e.a = c(-.08, .8), e.len = Math.min(c(n.len[0], n.len[1]), 1.08 - e.a), e.g = c(n.grow[0], n.grow[1]) * (.7 + e.len * .8), e.h = c(n.hold[0], n.hold[1]), e.r = e.g * .85, e.gp = c(n.gap[0], n.gap[1]), e.resp = Math.random() < .5 ? c(.1, .45) : -1, e.ev = e.resp >= 0 && Math.random() < .45 ? c(e.resp + .2, .92) : -1, e.cap = Math.random() < .55, e.t = t ? Math.random() * (e.g + e.h + e.r + e.gp) : 0;
	}
	function E() {
		let e = Math.round((_ - (b.length - 1) * y) / 2);
		b.forEach((t, n) => t.y = e + n * y);
	}
	function D() {
		y = g < 700 ? n.pitchMobile : n.pitch, b = [];
		let e = Math.ceil(_ / y) + 1;
		for (let t = 0; t < e; t++) {
			let e = {
				th: c(1.2, 3),
				al: c(.45, 1)
			};
			T(e, !0), b.push(e);
		}
		E();
	}
	function O() {
		let t = e.getBoundingClientRect();
		if (S = t.top + scrollY, C = t.left + scrollX, !h) {
			x = {
				cx: g / 2,
				cy: _ / 2,
				rx: g * .35,
				ry: _ * .3
			};
			return;
		}
		let n = h.getBoundingClientRect();
		x = {
			cx: n.left - t.left + n.width / 2,
			cy: n.top - t.top + n.height / 2,
			rx: n.width / 2,
			ry: n.height / 2
		};
	}
	function k() {
		let t = e.getBoundingClientRect();
		if (!t.width || !t.height) return;
		v = Math.min(devicePixelRatio || 1, 2);
		let n = !b.length || Math.abs(t.height - _) > 40 || g < 700 != t.width < 700;
		g = t.width, _ = t.height, d.width = Math.round(g * v), d.height = Math.round(_ * v), f.setTransform(v, 0, 0, v, 0, 0), n ? D() : E(), O(), z();
	}
	let A = {
		x: 0,
		y: 0,
		tx: 0,
		ty: 0,
		a: 0,
		in: !1
	};
	function j(e) {
		A.tx = e.pageX - C, A.ty = e.pageY - S, A.a < .02 && (A.x = A.tx, A.y = A.ty), A.in = !0;
	}
	let M = () => {
		A.in = !1;
	}, N = (e) => {
		e.pointerType !== "mouse" && (A.in = !1);
	};
	e.addEventListener("pointermove", j, { passive: !0 }), e.addEventListener("pointerdown", j, { passive: !0 }), e.addEventListener("pointerleave", M, { passive: !0 }), e.addEventListener("pointerup", N, { passive: !0 }), e.addEventListener("pointercancel", M, { passive: !0 });
	let P = (e) => {
		let t = e - A.y;
		return e + t * n.lensK * A.a * Math.exp(-(t * t) / (n.lensR * n.lensR));
	}, F = (e, t) => A.a * Math.exp(-((e - A.x) ** 2) / (n.glowRx * n.glowRx) - (t - A.y) ** 2 / (n.glowRy * n.glowRy)), I = f.createRadialGradient(0, 0, 0, 0, 0, 1);
	I.addColorStop(0, `rgba(0,0,0,${n.calm})`), I.addColorStop(.55, `rgba(0,0,0,${n.calm * .8})`), I.addColorStop(1, "rgba(0,0,0,0)");
	function L(e, t, n, r, i) {
		n <= .05 || i <= 0 || (f.beginPath(), f.arc(e, t, n, 0, s), f.fillStyle = `rgba(${r},${Math.min(1, i)})`, f.fill());
	}
	let R = (e, t) => u(l((e - t) / .05, 0, 1));
	function z() {
		f.clearRect(0, 0, g, _);
		let e = A.a > .001;
		for (let t of b) {
			let r = t.g, i = t.h, a = t.r, s = t.t, c, d;
			if (s < r) c = u(s / r), d = 0;
			else if (s < r + i) c = 1, d = 0;
			else if (s < r + i + a) c = 1, d = u((s - r - i) / a);
			else continue;
			let p = e ? P(t.y) : t.y, m = t.th, h = w * t.al, _ = (e) => (t.a + e * t.len) * g, v = _(d), y = _(c);
			f.fillStyle = `rgba(${o.bar},${.24 * h})`, f.fillRect(v, p - m / 2, y - v, m);
			let b = 0;
			if (e && (b = A.a * Math.exp(-((p - A.y) ** 2) / (n.glowRy * n.glowRy)), b > .02)) {
				let e = A.x - n.glowRx * 1.6, t = A.x + n.glowRx * 1.6, r = Math.max(v, e), i = Math.min(y, t);
				if (i > r) {
					let n = f.createLinearGradient(e, 0, t, 0), a = (.42 * b * h).toFixed(3);
					n.addColorStop(0, `rgba(${o.glow},0)`), n.addColorStop(.5, `rgba(${o.glow},${a})`), n.addColorStop(1, `rgba(${o.glow},0)`), f.fillStyle = n, f.fillRect(r, p - m / 2, i - r, m);
				}
			}
			let x = (e) => b > .02 ? F(e, p) : 0;
			if (t.resp >= 0 && c > t.resp) {
				let e = Math.max(v, _(t.resp));
				f.fillStyle = `rgba(${o.resp},${.3 * h})`, f.fillRect(e, p - m / 2, y - e, m);
			}
			if (t.resp >= 0 && d < t.resp) {
				let e = _(t.resp), n = x(e);
				L(e, p, (m * .6 + 1.4) * R(c, t.resp) * (1 + .45 * n), o.resp, (.8 + .2 * n) * h);
			}
			if (t.ev >= 0 && d < t.ev) {
				let e = _(t.ev), n = x(e);
				L(e, p, (m * .6 + 1.4) * R(c, t.ev) * (1 + .45 * n), o.cr, (.85 + .15 * n) * h);
			}
			if (t.cap && s >= r && d < .98) {
				let e = u(l((s - r) / .4, 0, 1)), t = x(y), n = (m + 1.6) * e * (1 + .4 * t);
				f.fillStyle = `rgba(${o.cap},${(.5 + .35 * t) * h})`, f.fillRect(y - n / 2, p - n / 2, n, n);
			}
		}
		if (n.calm > 0 && x) {
			let e = Math.max(x.rx * (1 + n.calmX), g < 700 ? g * .6 : 0), t = x.ry * (1 + n.calmY);
			f.save(), f.globalCompositeOperation = "destination-out", f.translate(x.cx, x.cy), f.scale(e, t), f.fillStyle = I, f.fillRect(-1, -1, 2, 2), f.restore();
		}
	}
	let B = 0, V = !1, H = !1, U = 0, W = !0;
	function G(e) {
		B = requestAnimationFrame(G);
		let t = Math.min((e - U) / 1e3, .05);
		U = e, w = Math.min(1, w + t / n.intro);
		let r = 1 - Math.exp(-t * n.follow), i = 1 - Math.exp(-t * n.presence);
		A.x += (A.tx - A.x) * r, A.y += (A.ty - A.y) * r, A.a += (+!!A.in - A.a) * i;
		for (let e of b) e.t += t, e.t > e.g + e.h + e.r + e.gp && T(e, !1);
		z();
	}
	function K() {
		V || i || !H || document.hidden || (V = !0, U = performance.now(), B = requestAnimationFrame(G));
	}
	function q() {
		V && (V = !1, cancelAnimationFrame(B));
	}
	let J = new IntersectionObserver(([e]) => {
		H = e.isIntersecting, H ? K() : q();
	}), Y = new ResizeObserver(k), X = () => {
		document.hidden ? q() : K();
	}, Z = (e) => {
		i = e.matches, i ? (q(), w = 1, A.a = 0, z()) : K();
	};
	return Y.observe(e), h && Y.observe(h), J.observe(e), document.addEventListener("visibilitychange", X), r.addEventListener && r.addEventListener("change", Z), document.fonts && document.fonts.ready.then(() => {
		W && (O(), V || z());
	}), k(), function() {
		W = !1, q(), J.disconnect(), Y.disconnect(), document.removeEventListener("visibilitychange", X), r.removeEventListener && r.removeEventListener("change", Z), e.removeEventListener("pointermove", j), e.removeEventListener("pointerdown", j), e.removeEventListener("pointerleave", M), e.removeEventListener("pointerup", N), e.removeEventListener("pointercancel", M), d.remove(), e.style.position = p, e.style.isolation = m, delete e.dataset.pvInit;
	};
}
var a, o, s, c, l, u, d = e((() => {
	a = {
		pitch: 12,
		pitchMobile: 10,
		grow: [2.6, 5],
		len: [.14, .55],
		hold: [3, 8],
		gap: [.4, 3],
		calmTarget: ".header_content-left",
		calm: .9,
		calmX: .75,
		calmY: .95,
		lensR: 130,
		lensK: .11,
		glowRx: 240,
		glowRy: 90,
		follow: 9,
		presence: 5,
		intro: 1.2
	}, o = {
		bar: "146,138,205",
		resp: "120,168,224",
		cr: "127,232,207",
		cap: "199,196,226",
		glow: "232,230,246"
	}, s = Math.PI * 2, c = (e, t) => e + (t - e) * Math.random(), l = (e, t, n) => Math.max(t, Math.min(n, e)), u = (e) => e >= 1 ? 1 : 1 - 2 ** (-10 * e);
})), f = /* @__PURE__ */ t((() => {
	r(), d(), document.querySelectorAll("[data-pv=\"company-careers\"]").forEach(n), document.querySelectorAll("[data-pv=\"company-hero\"]").forEach((e) => i(e));
}));
//#endregion
export default f();
