import { n as e } from "./rolldown-runtime-wf392T_D.mjs";
//#region src/bonv-draw.js
function t(e) {
	let t = e | 0;
	return () => {
		t = t + 1831565813 | 0;
		let e = Math.imul(t ^ t >>> 15, 1 | t);
		return e = e + Math.imul(e ^ e >>> 7, 61 | e) ^ e, ((e ^ e >>> 14) >>> 0) / 4294967296;
	};
}
function n(e) {
	let t = parseInt(e.slice(1), 16);
	return [
		t >> 16 & 255,
		t >> 8 & 255,
		t & 255
	];
}
function r(e, t) {
	let r = n(e);
	return `rgba(${r[0]},${r[1]},${r[2]},${g(t)})`;
}
function i(e) {
	return {
		one: (t) => ((e.querySelector(`[data-role="${t}"]`) || {}).textContent || "").trim(),
		list: (t) => [...e.querySelectorAll(`[data-role="${t}"] li`)].map((e) => e.textContent.trim())
	};
}
function a(e, t) {
	if (e.dataset.pvInit) return null;
	e.dataset.pvInit = "1";
	let n = e.closest("section") || document.body, i = (e) => getComputedStyle(n.querySelector(e) || document.body).fontFamily, a = i(".text-size-large"), d = i(".text-size-label");
	e.style.position = "relative";
	let f = document.createElement("canvas");
	f.setAttribute("aria-hidden", "true"), f.style.cssText = "position:absolute;inset:0;width:100%;height:100%;display:block;z-index:1;transition:opacity .5s ease;", e.appendChild(f);
	let p = f.getContext("2d"), m = "letterSpacing" in p, x = {
		x: p,
		W: 0,
		H: 0,
		S: 1
	};
	x.font = (e, t, n) => {
		p.font = `${e} ${t}px ${n ? d : a}`, m && (p.letterSpacing = n ? (t * .12).toFixed(2) + "px" : "0px");
	}, x.text = (e, t, n, i, a, o, s, c = "left", l = !1) => {
		s <= 0 || !e || (x.font(i, a, l), p.textAlign = c, p.textBaseline = "alphabetic", p.fillStyle = r(o, s), p.fillText(e, t, n));
	}, x.tw = (e, t, n, r) => (x.font(t, n, r), p.measureText(e).width), x.wrap = (e, t, n, r, i) => {
		x.font(t, n, i);
		let a = [], o = "";
		for (let t of e.split(" ")) {
			let e = o ? o + " " + t : t;
			p.measureText(e).width > r && o ? (a.push(o), o = t) : o = e;
		}
		return o && a.push(o), a;
	}, x.dot = (e, t, n, i, a) => {
		a <= 0 || n <= 0 || (p.fillStyle = r(i, a), p.beginPath(), p.arc(e, t, n, 0, h), p.fill());
	}, x.line = (e, t, n, i, a, o, s = 1) => {
		o <= 0 || (p.strokeStyle = r(a, o), p.lineWidth = s, p.beginPath(), p.moveTo(e, t), p.lineTo(n, i), p.stroke());
	}, x.poly = (e, t, n, i) => {
		if (!(e.length < 2 || n <= 0)) {
			p.strokeStyle = r(t, n), p.lineWidth = i, p.lineCap = "round", p.lineJoin = "round", p.beginPath(), p.moveTo(e[0][0], e[0][1]);
			for (let t = 1; t < e.length; t++) p.lineTo(e[t][0], e[t][1]);
			p.stroke();
		}
	}, x.qpts = (e, t, n, r, i = 24) => {
		let a = (e[0] + t[0]) / 2, o = (e[1] + t[1]) / 2, s = t[0] - e[0], c = a - (t[1] - e[1]) * n, l = o + s * n, u = [], d = Math.max(2, Math.ceil(i * r));
		for (let n = 0; n <= d; n++) {
			let i = r * n / d, a = 1 - i;
			u.push([a * a * e[0] + 2 * a * i * c + i * i * t[0], a * a * e[1] + 2 * a * i * l + i * i * t[1]]);
		}
		return u;
	}, x.elbow = (e, t, n, r = 1, i = 8 * x.S) => {
		let a = [
			e,
			[n, e[1]],
			[n, t[1]],
			t
		], o = [e];
		for (let e = 1; e < 3; e++) {
			let t = a[e], n = a[e - 1], r = a[e + 1], s = Math.hypot(t[0] - n[0], t[1] - n[1]) || 1, c = Math.hypot(r[0] - t[0], r[1] - t[1]) || 1, l = Math.min(i, s / 2, c / 2), u = [t[0] + (n[0] - t[0]) / s * l, t[1] + (n[1] - t[1]) / s * l], d = [t[0] + (r[0] - t[0]) / c * l, t[1] + (r[1] - t[1]) / c * l];
			o.push(u);
			for (let e = 1; e <= 6; e++) {
				let n = e / 6, r = 1 - n;
				o.push([r * r * u[0] + 2 * r * n * t[0] + n * n * d[0], r * r * u[1] + 2 * r * n * t[1] + n * n * d[1]]);
			}
		}
		o.push(t);
		let s = [0];
		for (let e = 1; e < o.length; e++) s.push(s[e - 1] + Math.hypot(o[e][0] - o[e - 1][0], o[e][1] - o[e - 1][1]));
		let c = s[s.length - 1] * g(r), l = [], u = 1;
		for (let e = 0; e <= 40; e++) {
			let t = c * e / 40;
			for (; u < o.length - 1 && s[u] < t;) u++;
			let n = (t - s[u - 1]) / (s[u] - s[u - 1] || 1);
			l.push([b(o[u - 1][0], o[u][0], n), b(o[u - 1][1], o[u][1], n)]);
		}
		return l;
	}, x.trim = (e, t, n, r) => {
		let i = t[0] - e[0], a = t[1] - e[1], o = Math.hypot(i, a) || 1, s = i / o, c = a / o;
		return [[e[0] + s * n, e[1] + c * n], [t[0] - s * r, t[1] - c * r]];
	}, x.rr = (e, t, n, r, i, a = i) => {
		i = Math.max(0, Math.min(i, n / 2, r / 2)), a = Math.max(0, Math.min(a, n / 2, r / 2)), p.beginPath(), p.moveTo(e + a, t), p.arcTo(e + n, t, e + n, t + r, i), p.arcTo(e + n, t + r, e, t + r, i), p.arcTo(e, t + r, e, t, i), p.arcTo(e, t, e + n, t, a), p.closePath();
	}, x.glass = (e, t, n, r, i, a, o) => {
		if (a <= 0) return;
		p.save(), p.globalAlpha = a, x.rr(e, t, n, r, i, o);
		let s = p.createLinearGradient(e, t, e + n * .9, t + r);
		s.addColorStop(0, "rgba(150,110,200,.18)"), s.addColorStop(.5, "rgba(90,60,150,.15)"), s.addColorStop(1, "rgba(40,24,80,.34)"), p.fillStyle = s, p.fill();
		let c = p.createLinearGradient(e, t, e + n, t + r);
		c.addColorStop(0, "rgba(244,244,244,.3)"), c.addColorStop(.4, "rgba(244,244,244,.07)"), c.addColorStop(.75, "rgba(244,244,244,.03)"), c.addColorStop(1, "rgba(214,170,240,.14)"), p.strokeStyle = c, p.lineWidth = 1, p.stroke(), p.restore();
	}, x.flow = (e, t, n, r, i, a) => {
		if (n <= 0 || e.length < 2) return;
		let s = x.S;
		if (p.save(), p.setLineDash([1, 7 * s]), p.lineDashOffset = -r * 28 * s, x.poly(e, t, n, 2 * s), p.restore(), i <= 0) return;
		let c = e.length - 1, l = (r + a * .53) / 1.5 % 1;
		for (let r = 0; r < 5; r++) {
			let a = l - r * .02;
			if (a < 0 || a > 1) continue;
			let u = e[Math.min(c, Math.floor(y(a) * c))];
			x.dot(u[0], u[1], (3 - r * .5) * s, r ? t : o, i * Math.min(1, n * 1.6) * (1 - r / 5) * Math.min(1, Math.sin(Math.PI * a) * 3));
		}
	}, x.icon = (e, t, n, i, a, s = o) => {
		if (a <= 0) return;
		let c = i / 48;
		p.save(), p.translate(t, n), p.scale(c, c), p.translate(-24, -24), p.lineWidth = 1.5 / c, p.lineCap = "round", p.lineJoin = "round", w[e].forEach(([e, t]) => {
			p.strokeStyle = r(s, a * t), p.stroke(e);
		}), p.restore();
	}, x.db = (e, t, n, i, a = o) => {
		if (i <= 0) return;
		let s = n / 2, c = n * .18, l = t - n * .42, u = t + n * .42;
		p.strokeStyle = r(a, i), p.lineWidth = 1.2, p.beginPath(), p.ellipse(e, l, s, c, 0, 0, h), p.stroke(), p.beginPath(), p.moveTo(e - s, l), p.lineTo(e - s, u), p.ellipse(e, u, s, c, 0, Math.PI, 0, !0), p.lineTo(e + s, l), p.stroke(), p.beginPath(), p.ellipse(e, t, s, c, 0, 0, Math.PI), p.stroke();
	}, x.vMark = (e, t, n, i, a = 0, s = 0, l = 1, u = !0) => {
		if (!(l <= 0)) {
			if (u) {
				let r = n * 1.47, o = i * .22, u = Math.max(18, Math.round(h * r / Math.max(6, n * .16))), d = Math.max(1, n * .034), f = i * 3.6, p = .55 + .45 * Math.sin(i * 13) * Math.sin(i * 7.3 + 1);
				for (let m = 0; m < u; m++) {
					let g = o + m / u * h, _ = ((g - f) % h + Math.PI * 3) % h - Math.PI, v = Math.exp(-((_ / .42) ** 2)) * a, y = .5 + .5 * Math.sin(g * 3 + i * 9) * Math.sin(g * 5 - i * 7 + 1.3), b = s * p * y, S = r + n * (.06 * v + .18 * b), C = d * (1 + 1.2 * v + 1.3 * b), w = .72 + .28 * Math.cos(g + Math.PI * .75);
					x.dot(e + Math.cos(g) * S, t + Math.sin(g) * S, C, c, l * Math.min(1, (.8 + .2 * v + .2 * b) * w));
				}
			}
			x.dot(e, t, n, c, l), p.fillStyle = r(o, l), p.beginPath(), S.forEach(([r, i], a) => {
				let o = e + r * n, s = t + i * n;
				a ? p.lineTo(o, s) : p.moveTo(o, s);
			}), p.closePath(), p.fill();
		}
	}, x.avatar = (e, t, n, r, i, a) => {
		a <= 0 || (x.dot(e, t, n, r, a), x.text((i || "?").charAt(0).toUpperCase(), e, t + n * .36, 600, Math.round(n * 1.02), l, a, "center"));
	}, x.ring = (e, t, n, i, a, s) => {
		s <= 0 || (x.dot(e, t, n, u, .85 * s), p.strokeStyle = r(o, .14 * s), p.lineWidth = 1, p.beginPath(), p.arc(e, t, n, 0, h), p.stroke(), a > 0 && (p.strokeStyle = r(i, s), p.lineWidth = 1.5, p.lineCap = "round", p.beginPath(), p.arc(e, t, n, -Math.PI / 2, -Math.PI / 2 + h * a), p.stroke()));
	}, x.button = (e, t, n, r, i, a, s) => {
		let c = x.tw(e, 500, i) + 32 * x.S;
		if (s <= 0) return c;
		let u = 1 - .05 * a;
		return p.save(), p.translate(t + c / 2, n + r / 2), p.scale(u, u), p.translate(-(t + c / 2), -(n + r / 2)), p.globalAlpha = s, x.rr(t, n, c, r, r / 2), p.fillStyle = o, p.fill(), p.globalAlpha = 1, x.text(e, t + c / 2, n + r / 2 + i * .34, 500, i, l, s, "center"), p.restore(), c;
	}, x.approve = (e, t, n, i, a) => {
		if (a <= 0 || (i < 1 && (p.save(), p.setLineDash([1, 4 * x.S]), p.lineCap = "round", p.strokeStyle = r(s, .8 * a * (1 - i)), p.lineWidth = 1.5, p.beginPath(), p.arc(e, t, n, 0, h), p.stroke(), p.restore()), i <= 0)) return;
		p.strokeStyle = r(c, a), p.lineWidth = 1.5, p.lineCap = "round", p.beginPath(), p.arc(e, t, n, -Math.PI / 2, -Math.PI / 2 + h * v(i)), p.stroke();
		let o = _(i, .5, 1);
		if (o > 0) {
			let r = [
				[e - n * .42, t + n * .02],
				[e - n * .1, t + n * .32],
				[e + n * .45, t - n * .3]
			], i = o < .4 ? [r[0], [b(r[0][0], r[1][0], o / .4), b(r[0][1], r[1][1], o / .4)]] : [
				r[0],
				r[1],
				[b(r[1][0], r[2][0], (o - .4) / .6), b(r[1][1], r[2][1], (o - .4) / .6)]
			];
			x.poly(i, c, a, 1.5);
		}
	}, x.chip = (e, t, n, i, a, s, c, l, u = 0, d) => {
		if (c <= 0) return;
		let f = x.S, m = t - i / 2, h = n - a / 2;
		x.glass(m, h, i, a, Math.min(12 * f, a / 2), c), l && u > 0 && (x.rr(m, h, i, a, Math.min(12 * f, a / 2)), p.strokeStyle = r(l, c * u), p.lineWidth = 1.5, p.stroke());
		let g = Math.min(a * .55, 20 * f);
		s === "db" ? x.db(m + 10 * f + g / 2, n, g * .7, .85 * c) : s && x.icon(s, m + 10 * f + g / 2, n, g, .85 * c), x.text(e, m + (s ? 16 * f + g : 12 * f), n + (d || Math.max(8, 9 * f)) * .36, 400, d || Math.max(8, 9 * f), o, c, "left", !0);
	}, x.typing = (e, t, n, r) => {
		for (let i = 0; i < 3; i++) x.dot(e + i * 8 * x.S, t, 2.2 * x.S, o, n * (.35 + .65 * Math.max(0, Math.sin(r * 7 - i * .7))));
	};
	let C = matchMedia("(prefers-reduced-motion: reduce)").matches, T = !1, E = !1, D = 0, O = 0, k = 0, A = 0;
	function j() {
		let n = e.clientWidth;
		if (!n) return;
		x.W = n, x.H = Math.round(n * t.aspect(n)), e.style.height = x.H + "px";
		let r = Math.min(devicePixelRatio || 1, 2);
		f.width = Math.round(n * r), f.height = Math.round(x.H * r), p.setTransform(r, 0, 0, r, 0, 0), t.layout(x), E = !0, T && M(C ? t.still : D);
	}
	function M(e) {
		E && (p.clearRect(0, 0, x.W, x.H), t.draw(x, e));
	}
	function N(e) {
		O = requestAnimationFrame(N), D += Math.min((e - k) / 1e3, .05), k = e, D > t.loop && (D = 0), f.style.opacity = D > t.fade ? 0 : 1, M(D);
	}
	function P() {
		O || C || (D = 0, f.style.opacity = 1, k = performance.now(), O = requestAnimationFrame(N));
	}
	function F() {
		cancelAnimationFrame(O), O = 0;
	}
	let I = new ResizeObserver(() => {
		e.clientWidth !== A && (A = e.clientWidth, j());
	});
	I.observe(e);
	let L = null;
	return (document.fonts ? Promise.race([Promise.all([document.fonts.load(`400 12px ${a}`), document.fonts.load(`400 12px ${d}`)]), new Promise((e) => setTimeout(e, 3e3))]) : Promise.resolve()).then(() => {
		T = !0, j(), !C && (L = new IntersectionObserver(([e]) => e.isIntersecting ? P() : F(), { threshold: .3 }), L.observe(e));
	}), { destroy() {
		F(), I.disconnect(), L && L.disconnect(), f.remove(), e.style.height = "", delete e.dataset.pvInit;
	} };
}
var o, s, c, l, u, d, f, p, m, h, g, _, v, y, b, x, S, C, w, T = e((() => {
	o = "#F4F4F4", s = "#8C86B0", c = "#E2C70A", l = "#17103A", u = "#0D0926", d = "#A99FD8", f = "#78A8E0", p = "#7FE8CF", m = [
		"#86C6D0",
		"#A99FD8",
		"#D6A394",
		"#92CBAE",
		"#C9C4EF",
		"#78A8E0"
	], h = Math.PI * 2, g = (e, t = 0, n = 1) => Math.max(t, Math.min(n, e)), _ = (e, t, n) => g((e - t) / (n - t)), v = (e) => 1 - (1 - e) ** 5, y = (e) => e < .5 ? 16 * e ** 5 : 1 - (-2 * e + 2) ** 5 / 2, b = (e, t, n) => e + (t - e) * n, x = (e, t, n, r, i) => _(e, t, t + r) * (1 - _(e, n - i, n)), S = [
		[.2749, -.4797],
		[-4e-4, .1548],
		[-.2181, -.3639],
		[-.271, -.4797],
		[-.5574, -.4797],
		[-.017, .6489],
		[.0186, .6489],
		[.5574, -.4797]
	], C = {
		km: [["M7 9 V41 H43", .4], ["M7 12 H15 V20 H24 V27 H33 V33 H43", 1]],
		app: [[[
			10,
			21,
			32
		].flatMap((e) => [
			10,
			21,
			32
		].map((t) => `M${t} ${e} h9 v9 h-9 Z`)).join(""), .75]],
		doc: [
			["M13 7 H29 L35 14 V41 H13 Z", 1],
			["M29 7 V14 H35", .55],
			["M19 22 H30 M19 28 H30 M19 34 H26", .7]
		],
		trend: [["M7 7 V41 H43", .4], ["M11 34 L19 25 L25 29 L32 16 L39 20", 1]],
		net: [["M24 24 L12 13 M24 24 L38 15 M24 24 L14 36 M24 24 L36 35", .5], ["M27.4 24a3.4 3.4 0 1 0-6.8 0a3.4 3.4 0 1 0 6.8 0M14.4 13a2.4 2.4 0 1 0-4.8 0a2.4 2.4 0 1 0 4.8 0M40.4 15a2.4 2.4 0 1 0-4.8 0a2.4 2.4 0 1 0 4.8 0M16.4 36a2.4 2.4 0 1 0-4.8 0a2.4 2.4 0 1 0 4.8 0M38.4 35a2.4 2.4 0 1 0-4.8 0a2.4 2.4 0 1 0 4.8 0", 1]]
	}, w = {};
	for (let e in C) w[e] = C[e].map(([e, t]) => [new Path2D(e), t]);
}));
//#endregion
export { t as _, h as a, c, T as d, y as f, r as g, i as h, d as i, a as l, v as m, m as n, p as o, b as p, s as r, o as s, f as t, g as u, _ as v, x as y };
