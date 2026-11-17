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
	return `rgba(${r[0]},${r[1]},${r[2]},${p(t)})`;
}
function i(e, t) {
	if (e.dataset.pvInit) return null;
	e.dataset.pvInit = "1";
	let n = e.closest("section") || document.body, i = (e) => getComputedStyle(n.querySelector(e) || document.body).fontFamily, u = i(".text-size-large"), d = i(".text-size-label");
	e.style.position = "relative";
	let y = document.createElement("canvas");
	y.setAttribute("aria-hidden", "true"), y.style.cssText = "position:absolute;inset:0;width:100%;height:100%;display:block;z-index:1;transition:opacity .5s ease;", e.appendChild(y);
	let x = y.getContext("2d"), S = "letterSpacing" in x, C = {
		x,
		W: 0,
		H: 0,
		S: 1
	};
	C.font = (e, t, n) => {
		x.font = `${e} ${t}px ${n ? d : u}`, S && (x.letterSpacing = n ? (t * .12).toFixed(2) + "px" : "0px");
	}, C.text = (e, t, n, i, a, o, s, c = "left", l = !1) => {
		s <= 0 || !e || (C.font(i, a, l), x.textAlign = c, x.textBaseline = "alphabetic", x.fillStyle = r(o, s), x.fillText(e, t, n));
	}, C.tw = (e, t, n, r) => (C.font(t, n, r), x.measureText(e).width), C.wrap = (e, t, n, r, i) => {
		C.font(t, n, i);
		let a = [], o = "";
		for (let t of e.split(" ")) {
			let e = o ? o + " " + t : t;
			x.measureText(e).width > r && o ? (a.push(o), o = t) : o = e;
		}
		return o && a.push(o), a;
	}, C.dot = (e, t, n, i, a) => {
		a <= 0 || n <= 0 || (x.fillStyle = r(i, a), x.beginPath(), x.arc(e, t, n, 0, f), x.fill());
	}, C.line = (e, t, n, i, a, o, s = 1) => {
		o <= 0 || (x.strokeStyle = r(a, o), x.lineWidth = s, x.beginPath(), x.moveTo(e, t), x.lineTo(n, i), x.stroke());
	}, C.poly = (e, t, n, i) => {
		if (!(e.length < 2 || n <= 0)) {
			x.strokeStyle = r(t, n), x.lineWidth = i, x.lineCap = "round", x.lineJoin = "round", x.beginPath(), x.moveTo(e[0][0], e[0][1]);
			for (let t = 1; t < e.length; t++) x.lineTo(e[t][0], e[t][1]);
			x.stroke();
		}
	}, C.qpts = (e, t, n, r, i = 24) => {
		let a = (e[0] + t[0]) / 2, o = (e[1] + t[1]) / 2, s = t[0] - e[0], c = a - (t[1] - e[1]) * n, l = o + s * n, u = [], d = Math.max(2, Math.ceil(i * r));
		for (let n = 0; n <= d; n++) {
			let i = r * n / d, a = 1 - i;
			u.push([a * a * e[0] + 2 * a * i * c + i * i * t[0], a * a * e[1] + 2 * a * i * l + i * i * t[1]]);
		}
		return u;
	}, C.elbow = (e, t, n, r = 1, i = 8 * C.S) => {
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
		let c = s[s.length - 1] * p(r), l = [], u = 1;
		for (let e = 0; e <= 40; e++) {
			let t = c * e / 40;
			for (; u < o.length - 1 && s[u] < t;) u++;
			let n = (t - s[u - 1]) / (s[u] - s[u - 1] || 1);
			l.push([_(o[u - 1][0], o[u][0], n), _(o[u - 1][1], o[u][1], n)]);
		}
		return l;
	}, C.trim = (e, t, n, r) => {
		let i = t[0] - e[0], a = t[1] - e[1], o = Math.hypot(i, a) || 1, s = i / o, c = a / o;
		return [[e[0] + s * n, e[1] + c * n], [t[0] - s * r, t[1] - c * r]];
	}, C.rr = (e, t, n, r, i, a = i) => {
		i = Math.max(0, Math.min(i, n / 2, r / 2)), a = Math.max(0, Math.min(a, n / 2, r / 2)), x.beginPath(), x.moveTo(e + a, t), x.arcTo(e + n, t, e + n, t + r, i), x.arcTo(e + n, t + r, e, t + r, i), x.arcTo(e, t + r, e, t, i), x.arcTo(e, t, e + n, t, a), x.closePath();
	}, C.glass = (e, t, n, r, i, a, o) => {
		if (a <= 0) return;
		x.save(), x.globalAlpha = a, C.rr(e, t, n, r, i, o);
		let s = x.createLinearGradient(e, t, e + n * .9, t + r);
		s.addColorStop(0, "rgba(150,110,200,.18)"), s.addColorStop(.5, "rgba(90,60,150,.15)"), s.addColorStop(1, "rgba(40,24,80,.34)"), x.fillStyle = s, x.fill();
		let c = x.createLinearGradient(e, t, e + n, t + r);
		c.addColorStop(0, "rgba(244,244,244,.3)"), c.addColorStop(.4, "rgba(244,244,244,.07)"), c.addColorStop(.75, "rgba(244,244,244,.03)"), c.addColorStop(1, "rgba(214,170,240,.14)"), x.strokeStyle = c, x.lineWidth = 1, x.stroke(), x.restore();
	}, C.flow = (e, t, n, r, i, o) => {
		if (n <= 0 || e.length < 2) return;
		let s = C.S;
		if (x.save(), x.setLineDash([1, 7 * s]), x.lineDashOffset = -r * 28 * s, C.poly(e, t, n, 2 * s), x.restore(), i <= 0) return;
		let c = e.length - 1, l = (r + o * .53) / 1.5 % 1;
		for (let r = 0; r < 5; r++) {
			let o = l - r * .02;
			if (o < 0 || o > 1) continue;
			let u = e[Math.min(c, Math.floor(g(o) * c))];
			C.dot(u[0], u[1], (3 - r * .5) * s, r ? t : a, i * Math.min(1, n * 1.6) * (1 - r / 5) * Math.min(1, Math.sin(Math.PI * o) * 3));
		}
	}, C.icon = (e, t, n, i, o, s = a) => {
		if (o <= 0) return;
		let c = i / 48;
		x.save(), x.translate(t, n), x.scale(c, c), x.translate(-24, -24), x.lineWidth = 1.5 / c, x.lineCap = "round", x.lineJoin = "round", b[e].forEach(([e, t]) => {
			x.strokeStyle = r(s, o * t), x.stroke(e);
		}), x.restore();
	}, C.db = (e, t, n, i, o = a) => {
		if (i <= 0) return;
		let s = n / 2, c = n * .18, l = t - n * .42, u = t + n * .42;
		x.strokeStyle = r(o, i), x.lineWidth = 1.2, x.beginPath(), x.ellipse(e, l, s, c, 0, 0, f), x.stroke(), x.beginPath(), x.moveTo(e - s, l), x.lineTo(e - s, u), x.ellipse(e, u, s, c, 0, Math.PI, 0, !0), x.lineTo(e + s, l), x.stroke(), x.beginPath(), x.ellipse(e, t, s, c, 0, 0, Math.PI), x.stroke();
	}, C.vMark = (e, t, n, i, o = 0, c = 0, l = 1, u = !0) => {
		if (!(l <= 0)) {
			if (u) {
				let r = n * 1.47, a = i * .22, u = Math.max(18, Math.round(f * r / Math.max(6, n * .16))), d = Math.max(1, n * .034), p = i * 3.6, m = .55 + .45 * Math.sin(i * 13) * Math.sin(i * 7.3 + 1);
				for (let h = 0; h < u; h++) {
					let g = a + h / u * f, _ = ((g - p) % f + Math.PI * 3) % f - Math.PI, v = Math.exp(-((_ / .42) ** 2)) * o, y = .5 + .5 * Math.sin(g * 3 + i * 9) * Math.sin(g * 5 - i * 7 + 1.3), b = c * m * y, x = r + n * (.06 * v + .18 * b), S = d * (1 + 1.2 * v + 1.3 * b), w = .72 + .28 * Math.cos(g + Math.PI * .75);
					C.dot(e + Math.cos(g) * x, t + Math.sin(g) * x, S, s, l * Math.min(1, (.8 + .2 * v + .2 * b) * w));
				}
			}
			C.dot(e, t, n, s, l), x.fillStyle = r(a, l), x.beginPath(), v.forEach(([r, i], a) => {
				let o = e + r * n, s = t + i * n;
				a ? x.lineTo(o, s) : x.moveTo(o, s);
			}), x.closePath(), x.fill();
		}
	}, C.avatar = (e, t, n, r, i, a) => {
		a <= 0 || (C.dot(e, t, n, r, a), C.text((i || "?").charAt(0).toUpperCase(), e, t + n * .36, 600, Math.round(n * 1.02), c, a, "center"));
	}, C.ring = (e, t, n, i, o, s) => {
		s <= 0 || (C.dot(e, t, n, l, .85 * s), x.strokeStyle = r(a, .14 * s), x.lineWidth = 1, x.beginPath(), x.arc(e, t, n, 0, f), x.stroke(), o > 0 && (x.strokeStyle = r(i, s), x.lineWidth = 1.5, x.lineCap = "round", x.beginPath(), x.arc(e, t, n, -Math.PI / 2, -Math.PI / 2 + f * o), x.stroke()));
	}, C.button = (e, t, n, r, i, o, s) => {
		let l = C.tw(e, 500, i) + 32 * C.S;
		if (s <= 0) return l;
		let u = 1 - .05 * o;
		return x.save(), x.translate(t + l / 2, n + r / 2), x.scale(u, u), x.translate(-(t + l / 2), -(n + r / 2)), x.globalAlpha = s, C.rr(t, n, l, r, r / 2), x.fillStyle = a, x.fill(), x.globalAlpha = 1, C.text(e, t + l / 2, n + r / 2 + i * .34, 500, i, c, s, "center"), x.restore(), l;
	}, C.approve = (e, t, n, i, a) => {
		if (a <= 0 || (i < 1 && (x.save(), x.setLineDash([1, 4 * C.S]), x.lineCap = "round", x.strokeStyle = r(o, .8 * a * (1 - i)), x.lineWidth = 1.5, x.beginPath(), x.arc(e, t, n, 0, f), x.stroke(), x.restore()), i <= 0)) return;
		x.strokeStyle = r(s, a), x.lineWidth = 1.5, x.lineCap = "round", x.beginPath(), x.arc(e, t, n, -Math.PI / 2, -Math.PI / 2 + f * h(i)), x.stroke();
		let c = m(i, .5, 1);
		if (c > 0) {
			let r = [
				[e - n * .42, t + n * .02],
				[e - n * .1, t + n * .32],
				[e + n * .45, t - n * .3]
			], i = c < .4 ? [r[0], [_(r[0][0], r[1][0], c / .4), _(r[0][1], r[1][1], c / .4)]] : [
				r[0],
				r[1],
				[_(r[1][0], r[2][0], (c - .4) / .6), _(r[1][1], r[2][1], (c - .4) / .6)]
			];
			C.poly(i, s, a, 1.5);
		}
	}, C.chip = (e, t, n, i, o, s, c, l, u = 0, d) => {
		if (c <= 0) return;
		let f = C.S, p = t - i / 2, m = n - o / 2;
		C.glass(p, m, i, o, Math.min(12 * f, o / 2), c), l && u > 0 && (C.rr(p, m, i, o, Math.min(12 * f, o / 2)), x.strokeStyle = r(l, c * u), x.lineWidth = 1.5, x.stroke());
		let h = Math.min(o * .55, 20 * f);
		s === "db" ? C.db(p + 10 * f + h / 2, n, h * .7, .85 * c) : s && C.icon(s, p + 10 * f + h / 2, n, h, .85 * c), C.text(e, p + (s ? 16 * f + h : 12 * f), n + (d || Math.max(8, 9 * f)) * .36, 400, d || Math.max(8, 9 * f), a, c, "left", !0);
	}, C.typing = (e, t, n, r) => {
		for (let i = 0; i < 3; i++) C.dot(e + i * 8 * C.S, t, 2.2 * C.S, a, n * (.35 + .65 * Math.max(0, Math.sin(r * 7 - i * .7))));
	};
	let w = matchMedia("(prefers-reduced-motion: reduce)").matches, T = !1, E = !1, D = 0, O = 0, k = 0, A = 0;
	function j() {
		let n = e.clientWidth;
		if (!n) return;
		C.W = n, C.H = Math.round(n * t.aspect(n)), e.style.height = C.H + "px";
		let r = Math.min(devicePixelRatio || 1, 2);
		y.width = Math.round(n * r), y.height = Math.round(C.H * r), x.setTransform(r, 0, 0, r, 0, 0), t.layout(C), E = !0, T && M(w ? t.still : D);
	}
	function M(e) {
		E && (x.clearRect(0, 0, C.W, C.H), t.draw(C, e));
	}
	function N(e) {
		O = requestAnimationFrame(N), D += Math.min((e - k) / 1e3, .05), k = e, D > t.loop && (D = 0), y.style.opacity = D > t.fade ? 0 : 1, M(D);
	}
	function P() {
		O || w || (D = 0, y.style.opacity = 1, k = performance.now(), O = requestAnimationFrame(N));
	}
	function F() {
		cancelAnimationFrame(O), O = 0;
	}
	let I = new ResizeObserver(() => {
		e.clientWidth !== A && (A = e.clientWidth, j());
	});
	I.observe(e);
	let L = null;
	return (document.fonts ? Promise.race([Promise.all([document.fonts.load(`400 12px ${u}`), document.fonts.load(`400 12px ${d}`)]), new Promise((e) => setTimeout(e, 3e3))]) : Promise.resolve()).then(() => {
		T = !0, j(), !w && (L = new IntersectionObserver(([e]) => e.isIntersecting ? P() : F(), { threshold: .3 }), L.observe(e));
	}), { destroy() {
		F(), I.disconnect(), L && L.disconnect(), y.remove(), e.style.height = "", delete e.dataset.pvInit;
	} };
}
var a, o, s, c, l, u, d, f, p, m, h, g, _, v, y, b, x = e((() => {
	a = "#F4F4F4", o = "#8C86B0", s = "#E2C70A", c = "#17103A", l = "#0D0926", u = "#7FE8CF", d = [
		"#86C6D0",
		"#A99FD8",
		"#D6A394",
		"#92CBAE",
		"#C9C4EF",
		"#78A8E0"
	], f = Math.PI * 2, p = (e, t = 0, n = 1) => Math.max(t, Math.min(n, e)), m = (e, t, n) => p((e - t) / (n - t)), h = (e) => 1 - (1 - e) ** 5, g = (e) => e < .5 ? 16 * e ** 5 : 1 - (-2 * e + 2) ** 5 / 2, _ = (e, t, n) => e + (t - e) * n, v = [
		[.2749, -.4797],
		[-4e-4, .1548],
		[-.2181, -.3639],
		[-.271, -.4797],
		[-.5574, -.4797],
		[-.017, .6489],
		[.0186, .6489],
		[.5574, -.4797]
	], y = {
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
	}, b = {};
	for (let e in y) b[e] = y[e].map(([e, t]) => [new Path2D(e), t]);
}));
//#endregion
export { s as a, x as c, h as d, r as f, a as i, g as l, m, f as n, i as o, t as p, u as r, p as s, d as t, _ as u };
