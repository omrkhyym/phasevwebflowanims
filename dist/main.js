import { n as e, t } from "./rolldown-runtime-wf392T_D.mjs";
//#region src/gantt.js
function n(e) {
	if (e.dataset.pvReady) return;
	e.dataset.pvReady = "1";
	let t = document.createElement("canvas");
	t.style.cssText = "display:block;width:100%;", t.setAttribute("role", "img"), t.setAttribute("aria-label", "Study timeline: one eligibility change pushes submission back by 18 weeks as each tool recalculates on its own schedule."), e.appendChild(t);
	let n = t.getContext("2d"), p = (e.closest("section") || document.body).querySelector(".text-size-label"), g = p ? getComputedStyle(p) : null, _ = g ? g.fontFamily : "Aspekta, Arial, sans-serif", v = g && g.letterSpacing !== "normal" ? (parseFloat(g.letterSpacing) || 0) / (parseFloat(g.fontSize) || 16) : 0, y = "letterSpacing" in n;
	function b(e, t) {
		n.font = `${e} ${t}px ${_}`, y && (n.letterSpacing = (v * t).toFixed(2) + "px");
	}
	function x(e, t, r, i, a, o, s = 1, c = "left") {
		b(i, a), n.textAlign = c, n.globalAlpha = s, n.fillStyle = o, n.fillText(e, t, r), n.globalAlpha = 1, n.textAlign = "left";
	}
	t.style.height = Math.round(58 + r.bar * 1.55 * u.length + 10 + 38 + 14) + "px";
	let S = 1, C = !1, w = 0;
	function T() {
		S = Math.min(devicePixelRatio || 1, 2), t.width = Math.round(t.clientWidth * S), t.height = Math.round(t.clientHeight * S), n.setTransform(S, 0, 0, S, 0, 0), C && E(D ? f : w);
	}
	function E(e) {
		let d = t.clientWidth, f = t.clientHeight;
		n.clearRect(0, 0, d, f);
		let p = Math.min(196, d * .3), g = d - p - 30, _ = r.bar, v = _ * 1.55, y = v * u.length, S = r.slip / s, C = (e) => p + e * c * g;
		x("STUDY TIMELINE", 0, 42, 500, 9, a), x("WEEK 0", p, 42, 400, 9, "#c3c2b8"), x("WEEK 104", p + g, 42, 400, 9, "#c3c2b8", 1, "right"), n.strokeStyle = "#e4e3d9", n.lineWidth = 1, n.beginPath(), n.moveTo(p, 48.5), n.lineTo(p + g, 48.5), n.stroke();
		let w = h(m(e, .7, 1.7)), T = !1;
		u.forEach((t, a) => {
			let s = 58 + a * v + v / 2, u = t.tool * r.lag, d = a === 0 ? w : h(m(e, 1.5 + u, 2.5 + u));
			a > 0 && d < 1 && w >= 1 && (T = !0);
			let f = t.a * c + (a === 0 ? 0 : S * d), y = t.b * c + S * (a === 0 ? w : d);
			if (x(t.n, 0, s + 4, d >= 1 || a === 0 ? 500 : 400, 11, d > 0 ? i : "#b9b8ae"), n.globalAlpha = r.ghost, n.fillStyle = "#dcdbcf", n.fillRect(C(t.a), s - _ / 2, (t.b - t.a) * c * g, _), n.globalAlpha = 1, n.fillStyle = l[t.tool].c, n.fillRect(p + f * g, s - _ / 2, (y - f) * g, _), a > 0 && w >= 1 && d < 1) {
				let e = p + (t.a * c + S) * g, r = p + f * g;
				n.save(), n.setLineDash([2, 3]), n.strokeStyle = o, n.globalAlpha = .75, n.lineWidth = 1, n.strokeRect(r + .5, s - _ / 2 + .5, e - r, _ - 1), n.restore(), n.globalAlpha = 1, x("stale", p + f * g + 4, s + 3, 400, 9, o, .8);
			}
			r.showTools && x(l[t.tool].n, p + y * g + 9, s + 4, 400, 9, "#c3c2b8");
		});
		let E = u[u.length - 1], D = h(m(e, 1.5 + E.tool * r.lag, 2.5 + E.tool * r.lag)), O = C(E.b), k = p + (E.b * c + S * D) * g, A = 58 + y + 10;
		if (n.save(), n.setLineDash([3, 4]), n.strokeStyle = a, n.globalAlpha = .7, n.lineWidth = 1, n.beginPath(), n.moveTo(O, 48), n.lineTo(O, A), n.stroke(), n.restore(), n.globalAlpha = 1, x("PLANNED", O - 6, A + 16, 400, 9, a, .8, "right"), D > .03) {
			n.strokeStyle = o, n.lineWidth = 2, n.beginPath(), n.moveTo(k, 48), n.lineTo(k, A), n.stroke(), n.save(), n.beginPath(), n.rect(O, 48, k - O, A - 48), n.clip(), n.strokeStyle = o, n.globalAlpha = .16, n.lineWidth = 1;
			for (let e = O - 40; e < k + 60; e += 6) n.beginPath(), n.moveTo(e, 48), n.lineTo(e - 60, A), n.stroke();
			n.restore(), n.globalAlpha = 1;
			let e = "SUBMISSION  +" + Math.round(r.slip * D) + " WEEKS";
			b(700, 11);
			let t = n.measureText(e).width;
			k + 10 + t < p + g ? x(e, k + 10, A + 16, 700, 11, o, D) : x(e, k - 10, A + 16, 700, 11, o, D, "right");
		}
		x(w < 1 ? "one eligibility criterion changes" : T ? "three tools have not recalculated yet" : "every downstream date has moved", 0, A + 38, 400, 11, w < 1 ? a : T ? o : i);
	}
	let D = matchMedia("(prefers-reduced-motion: reduce)").matches, O = 0, k = 0;
	function A(e) {
		O = requestAnimationFrame(A);
		let t = Math.min((e - k) / 1e3, .05);
		k = e, w += t * r.speed, w > d && (w = 0), E(w);
	}
	function j() {
		O || D || (w = 0, k = performance.now(), O = requestAnimationFrame(A));
	}
	function M() {
		cancelAnimationFrame(O), O = 0;
	}
	new ResizeObserver(T).observe(t), (document.fonts ? Promise.race([document.fonts.load(`500 11px ${_}`), new Promise((e) => setTimeout(e, 3e3))]) : Promise.resolve()).then(() => {
		C = !0, T(), D ? E(f) : new IntersectionObserver(([e]) => e.isIntersecting ? j() : M(), { threshold: .25 }).observe(e);
	});
}
var r, i, a, o, s, c, l, u, d, f, p, m, h, g = e((() => {
	r = {
		slip: 18,
		lag: 1.15,
		speed: 1,
		hold: 2.6,
		ghost: .35,
		bar: 20,
		red: !0,
		showTools: !0
	}, i = "#141238", a = "#9c9bb0", o = r.red ? "#c0392b" : "#8a7a10", s = 104, c = .7, l = [
		{
			n: "PROTOCOL",
			c: "#141238"
		},
		{
			n: "CTMS",
			c: "#3f3e69"
		},
		{
			n: "EDC",
			c: "#6d6c93"
		},
		{
			n: "eTMF",
			c: "#9e9db7"
		}
	], u = [
		{
			n: "FINAL PROTOCOL",
			a: 0,
			b: .13,
			tool: 0
		},
		{
			n: "SITE ACTIVATION",
			a: .11,
			b: .33,
			tool: 1
		},
		{
			n: "FPI → LPI",
			a: .3,
			b: .61,
			tool: 1
		},
		{
			n: "DATA CLEANING",
			a: .57,
			b: .73,
			tool: 2
		},
		{
			n: "DATABASE LOCK",
			a: .71,
			b: .78,
			tool: 2
		},
		{
			n: "CSR & SUBMISSION",
			a: .76,
			b: .95,
			tool: 3
		}
	], d = 2.5 + l.length * r.lag + r.hold, f = 2.5 + l.length * r.lag, p = (e, t, n) => Math.max(t, Math.min(n, e)), m = (e, t, n) => p((e - t) / (n - t), 0, 1), h = (e) => e < .5 ? 4 * e * e * e : 1 - (-2 * e + 2) ** 3 / 2;
}));
//#endregion
//#region src/hero-homepage.js
function _() {
	if (document.getElementById("pv-hero-css")) return;
	let e = document.createElement("style");
	e.id = "pv-hero-css", e.textContent = C, document.head.appendChild(e);
}
function v(e) {
	return () => {
		e |= 0, e = e + 1831565813 | 0;
		let t = Math.imul(e ^ e >>> 15, 1 | e);
		return t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t, ((t ^ t >>> 14) >>> 0) / 4294967296;
	};
}
function y(e) {
	let t = [
		-39.69683028665376,
		220.9460984245205,
		-275.9285104469687,
		138.357751867269,
		-30.66479806614716,
		2.506628277459239
	], n = [
		-54.47609879822406,
		161.5858368580409,
		-155.6989798598866,
		66.80131188771972,
		-13.28068155288572
	], r = [
		-.007784894002430293,
		-.3223964580411365,
		-2.400758277161838,
		-2.549732539343734,
		4.374664141464968,
		2.938163982698783
	], i = [
		.007784695709041462,
		.3224671290700398,
		2.445134137142996,
		3.754408661907416
	], a, o;
	return e < .02425 ? (a = Math.sqrt(-2 * Math.log(e)), (((((r[0] * a + r[1]) * a + r[2]) * a + r[3]) * a + r[4]) * a + r[5]) / ((((i[0] * a + i[1]) * a + i[2]) * a + i[3]) * a + 1)) : e > .97575 ? (a = Math.sqrt(-2 * Math.log(1 - e)), -(((((r[0] * a + r[1]) * a + r[2]) * a + r[3]) * a + r[4]) * a + r[5]) / ((((i[0] * a + i[1]) * a + i[2]) * a + i[3]) * a + 1)) : (a = e - .5, o = a * a, (((((t[0] * o + t[1]) * o + t[2]) * o + t[3]) * o + t[4]) * o + t[5]) * a / (((((n[0] * o + n[1]) * o + n[2]) * o + n[3]) * o + n[4]) * o + 1));
}
function b() {
	let e = v(21), t = [], n = (e) => .14 * e + .05 * Math.sin(e * Math.PI * 1.3);
	for (let r = 0; r < 28; r++) {
		let i = r === 0 ? 0 : k(e), a = e() - .5, o = 2 + e() * 4, s = e() * w, c = r / 27 * 2 - 1;
		for (let e = 0; e < 150; e++) {
			let l = e / 149, u = l * (.19 * i + .09 * a * Math.sin(o * l + s));
			t.push([
				-.42 + l * .84,
				Math.max(-.46, Math.min(.46, n(l) + u)),
				r === 0 ? j : M,
				r === 0 ? 1 : c
			]);
		}
	}
	let r = [], i = .84 / 70, a = Array(70).fill(0);
	for (let e = 0; e < R; e++) {
		let t = .03 + .1 * y(.004 + .992 * (e + .5) / R), n = Math.max(0, Math.min(69, Math.floor((t + .42) / i)));
		r.push([
			-.42 + (n + .5) * i,
			-.294 + a[n] * .0088 / L,
			n === 37 ? j : M,
			n / 69 * 2 - 1
		]), a[n]++;
	}
	let o = [], s = -.1;
	for (let e = 0; e < 174; e++) o.push([
		s,
		.36 - .72 / 173 * e,
		I,
		0
	]);
	for (let t = 0; t < 11; t++) {
		let n = t === 10, r = n ? -.34 : .3 - t * .056, i = n ? .01999999999999999 : s + (e() - .25) * .26, a = n ? .04 : .04 + e() * .08, c = n ? j : M, l = n ? 1 : t / 9 * 2 - 1;
		for (let e = 0; e < 240; e++) o.push([
			i - a + 2 * a * e / 239,
			r,
			c,
			l
		]);
		for (let e = 0; e < 126; e++) {
			let t = .016 * Math.sqrt((e + .5) / 126), n = e * 2.39996;
			o.push([
				i + Math.cos(n) * t,
				r + Math.sin(n) * t,
				c,
				l
			]);
		}
	}
	let c = [], l = [...Array(56)].map((e, t) => 1 / (1 + Math.exp(-((t + .5) / 56 - .5) / .1))), u = l.reduce((e, t) => e + t, 0), d = l.map((e) => Math.floor(e * R / u)), f = R - d.reduce((e, t) => e + t, 0);
	for (let e = 55; f > 0; e--, f--) d[e]++;
	d.forEach((e, t) => {
		let n = t / 55 * 2 - 1;
		for (let r = 0; r < e; r++) c.push([
			-.42 + (t + .5) * .015,
			-.294 + r * .0105 / L,
			r === e - 1 ? j : P,
			n
		]);
	});
	let p = [], m = [
		420,
		330,
		280,
		230,
		140
	].map((e) => e * L), h = [
		M,
		P,
		F,
		N,
		j
	], g = [
		[-.2, .14],
		[.18, .2],
		[-.08, -.2],
		[.25, -.12],
		[.06, .01]
	];
	m.forEach((e, t) => {
		let n = Math.sqrt(e / L) * .0062, r = t / 4 * 2 - 1;
		for (let i = 0; i < e; i++) {
			let a = n * Math.sqrt((i + .5) / e), o = i * 2.39996;
			p.push([
				g[t][0] + Math.cos(o) * a,
				g[t][1] + Math.sin(o) * a,
				h[t],
				r
			]);
		}
	});
	let _ = [
		t,
		r,
		o,
		c,
		p
	], b = .01, x = [
		1.12,
		.78 * 1.2,
		1.0374,
		.78,
		.72 * 1.3
	], S = [
		1,
		1.2,
		1.33,
		1,
		.72 * 1.3
	], C = (e, t) => {
		let n = [...e].sort((e, t) => e - t);
		return n[Math.max(0, Math.min(n.length - 1, Math.round(t * (n.length - 1))))];
	};
	return _.map((e, t) => {
		let n = e.map((e) => e[0]), r = e.map((e) => e[1]), i = C(n, b), a = C(n, .99), o = C(r, b), s = C(r, .99), c = Math.max(a - i, 1e-6), l = Math.max(s - o, 1e-6), u = Math.min(.86 / c, .62 / l), d = u * S[t], f = u * x[t], p = (i + a) / 2, m = (o + s) / 2;
		return e.map((e) => [
			(e[0] - p) * d,
			(e[1] - m) * f,
			e[2],
			e[3]
		]).sort((e, t) => e[0] - t[0] || e[1] - t[1]);
	});
}
function x(e) {
	if (e.dataset.pvReady) return;
	e.dataset.pvReady = "1", _();
	let t = document.createElement("canvas");
	t.setAttribute("aria-hidden", "true"), e.appendChild(t);
	let n = t.getContext("webgl2", {
		alpha: !0,
		antialias: !1,
		premultipliedAlpha: !0
	});
	if (!n) return;
	let r = matchMedia("(prefers-reduced-motion: reduce)").matches, i = matchMedia("(max-width:991px)"), a = b(), o = 0, s = 0;
	for (let e of a) for (let t of e) o = Math.max(o, Math.abs(t[0]) * 2), s = Math.max(s, Math.abs(t[1]) * 2);
	o = Math.max(o, 1e-6), s = Math.max(s, 1e-6);
	let c = 0, l = 0, u = (e) => e.sort((e, t) => e - t)[Math.floor(e.length * .995)];
	for (let e of a) c = Math.max(c, u(e.map((e) => Math.abs(e[0]))) * 2), l = Math.max(l, u(e.map((e) => Math.abs(e[1]))) * 2);
	let d = v(99), f = Float32Array.from({ length: R }, () => d()), p = Float32Array.from({ length: R }, () => (d() - .5) * .7), m = e.closest(".section_header") || document.body;
	function h(e, t) {
		let r = n.createShader(e);
		if (n.shaderSource(r, t), n.compileShader(r), !n.getShaderParameter(r, n.COMPILE_STATUS)) throw Error(n.getShaderInfoLog(r));
		return r;
	}
	function g(e, t) {
		let r = n.createProgram();
		if (n.attachShader(r, h(n.VERTEX_SHADER, e)), n.attachShader(r, h(n.FRAGMENT_SHADER, t)), n.linkProgram(r), !n.getProgramParameter(r, n.LINK_STATUS)) throw Error(n.getProgramInfoLog(r));
		return r;
	}
	let y = g(ie, ae), x = (e, t) => n.getUniformLocation(e, t), S = {
		res: x(y, "u_res"),
		c: x(y, "u_c"),
		S: x(y, "u_S"),
		pal: x(y, "u_pal[0]")
	}, C = new Float32Array(A.pal.flat()), w = 2 * R, k = new Float32Array(w * 7), j = n.createVertexArray();
	n.bindVertexArray(j), n.bindBuffer(n.ARRAY_BUFFER, n.createBuffer()), n.bufferData(n.ARRAY_BUFFER, new Float32Array([
		-1,
		-1,
		1,
		-1,
		-1,
		1,
		1,
		1
	]), n.STATIC_DRAW), n.enableVertexAttribArray(0), n.vertexAttribPointer(0, 2, n.FLOAT, !1, 0, 0);
	let M = n.createBuffer();
	n.bindBuffer(n.ARRAY_BUFFER, M), n.bufferData(n.ARRAY_BUFFER, k.byteLength, n.DYNAMIC_DRAW), n.enableVertexAttribArray(1), n.vertexAttribPointer(1, 4, n.FLOAT, !1, 28, 0), n.vertexAttribDivisor(1, 1), n.enableVertexAttribArray(2), n.vertexAttribPointer(2, 2, n.FLOAT, !1, 28, 16), n.vertexAttribDivisor(2, 1);
	let N = 1, P = 1;
	function F() {
		N = Math.min(window.devicePixelRatio || 1, 2);
		let n = e.getBoundingClientRect();
		t.width = Math.max(1, Math.round(n.width * N)), t.height = Math.max(1, Math.round(n.height * N)), r && W(7.5);
	}
	let I = {
		x: 0,
		y: 0,
		a: 0,
		tx: 0,
		ty: 0,
		in: !1
	};
	m.addEventListener("pointermove", (t) => {
		let n = e.getBoundingClientRect(), r = Math.min(n.width, n.height);
		I.tx = (t.clientX - n.left - n.width / 2) / r, I.ty = -(t.clientY - n.top - n.height / 2) / r, I.in = !0;
	}), m.addEventListener("pointerleave", () => I.in = !1);
	let L = 0;
	function H(e, t, n, r, i) {
		if (L >= w || i <= .003) return;
		let a = L++ * 7;
		k[a] = e, k[a + 1] = t, k[a + 2] = Math.max(n * P, .7 * N), k[a + 3] = r, k[a + 4] = i;
	}
	function oe(e) {
		let t = Math.floor(e / z) % 5, n = e - Math.floor(e / z) * z, i = a[(t + 5 - 1) % 5], o = a[t], s = .0038 * A.rMul;
		L = 0;
		let c = r ? 0 : I.x * I.a, l = r ? 0 : I.y * I.a;
		for (let t = 0; t < R; t++) {
			let r = i[t], a = o[t], u = .5 * T((a[0] + .45) / .9) + .2 * f[t], d = O(E(n, u, u + 1.1)), m = a[0] - r[0], h = a[1] - r[1], g = p[t] * Math.sin(Math.PI * d), _ = D(r[0], a[0], d) - h * g + .0015 * Math.sin(e * 1.3 + t), v = D(r[1], a[1], d) + m * g + .0015 * Math.cos(e * 1.1 + t * 1.7), y = s, b = D(r[3] || 0, a[3] || 0, d);
			_ += b * (te * c + V * Math.sin(e * .31)), v += b * (te * l + V * .6 * Math.cos(e * .24)), y *= 1 + ne * b;
			let x = .95 * (1 - re * (1 - (b * .5 + .5)));
			if (v += .0012 * Math.sin(e * 2.2 + t * .7), I.a > .001) {
				let e = _ - I.x, t = v - I.y;
				y *= 1 + 1.2 * I.a * Math.exp(-(e * e + t * t) / .004);
			}
			r[2] === a[2] || d >= 1 ? H(_, v, y, a[2], x) : d <= 0 ? H(_, v, y, r[2], x) : (H(_, v, y, r[2], x * (1 - d)), H(_, v, y, a[2], x * d));
		}
	}
	let U = !1;
	function W(e) {
		if (U) return;
		let r = t.width, a = t.height;
		P = i.matches ? Math.min(r / (c * ee), a / (l * ee)) : Math.min(r / (o * B), a / (s * B)), oe(e), n.viewport(0, 0, r, a), n.clearColor(0, 0, 0, 0), n.clear(n.COLOR_BUFFER_BIT), n.useProgram(y), n.bindVertexArray(j), n.uniform2f(S.res, r, a), n.uniform2f(S.c, r / 2, a / 2), n.uniform1f(S.S, P), n.uniform3fv(S.pal, C), n.enable(n.BLEND), n.blendFunc(n.ONE, n.ONE_MINUS_SRC_ALPHA), n.bindBuffer(n.ARRAY_BUFFER, M), n.bufferSubData(n.ARRAY_BUFFER, 0, k, 0, L * 7), n.drawArraysInstanced(n.TRIANGLE_STRIP, 0, 4, L);
	}
	let G = 0, K = 0, q = 0;
	function J(e) {
		G = requestAnimationFrame(J);
		let t = Math.max(0, Math.min((e - q) / 1e3, .05));
		q = e, I.x += (I.tx - I.x) * .08, I.y += (I.ty - I.y) * .08, I.a += (+!!I.in - I.a) * .06, K += t, W(K);
	}
	function Y() {
		G || r || U || (q = performance.now(), G = requestAnimationFrame(J));
	}
	function X() {
		cancelAnimationFrame(G), G = 0;
	}
	t.addEventListener("webglcontextlost", (e) => {
		e.preventDefault(), U = !0, X();
	}), new ResizeObserver(F).observe(e), F(), r ? W(7.5) : new IntersectionObserver(([e]) => e.isIntersecting ? Y() : X()).observe(e);
}
var S, C, w, T, E, D, O, k, A, j, M, N, P, F, I, L, R, z, B, ee, te, V, ne, re, ie, ae, H = e((() => {
	S = "[data-pv=\"hero-homepage\"]", C = `
.header_image-wrapper:has(${S}){
  background:none!important; border:0!important; border-radius:0!important; box-shadow:none!important;
  -webkit-backdrop-filter:none!important; backdrop-filter:none!important;
  position:relative; overflow:visible!important; min-height:30rem;
}
.header_component:has(${S}), .header_content:has(${S}){ position:relative; }
.header_content:has(${S}) .header_content-left{ position:relative; z-index:2; }
/* l'anim fait 2/3 de la page, ancrée à droite, et passe sous la colonne texte */
${S}{ position:absolute; top:-10%; bottom:-10%; right:0%; width:55vw; z-index:0; pointer-events:none; }
${S} canvas{ position:absolute; inset:0; width:100%; height:100%; display:block; }
/* grille empilée : l'anim repasse dans le flux, en bloc 4:3 sous le texte */
@media (max-width:991px){
  .header_image-wrapper:has(${S}){ min-height:22rem; }
  /* le header publié fait 100svh et sa grille 100% : on libère la hauteur pour que le bloc tienne sous le texte */
  .section_header:has(${S}){ height:auto; min-height:100svh; display:flex; flex-direction:column; justify-content:center; overflow-x:clip; }
  .header_component:has(${S}), .header_component:has(${S}) .header_content{ height:auto; }
  /* pleine largeur d'écran : sort des marges de padding-global sans scroll horizontal */
  ${S}{ position:relative; top:auto; bottom:auto; right:auto; width:100vw; margin-left:calc(50% - 50vw); aspect-ratio:1/1; margin-top:2rem; }
}
@media (max-width:479px){
  .header_image-wrapper:has(${S}){ min-height:17rem; }
}`, w = Math.PI * 2, T = (e) => Math.max(0, Math.min(1, e)), E = (e, t, n) => T((e - t) / (n - t)), D = (e, t, n) => e + (t - e) * n, O = (e) => e < .5 ? 4 * e * e * e : 1 - (-2 * e + 2) ** 3 / 2, k = (e) => Math.sqrt(-2 * Math.log(e() + 1e-9)) * Math.cos(w * e()), A = {
		rMul: .6,
		pal: [
			"#E2C70A",
			"#c8f3ff",
			"#93a9ff",
			"#5fb4e6",
			"#7fe8cf",
			"#1c3a4a",
			"#5f8fa6",
			"#000000"
		].map((e) => [
			1,
			3,
			5
		].map((t) => parseInt(e.slice(t, t + 2), 16) / 255))
	}, j = 0, M = 1, N = 2, P = 3, F = 4, I = 6, L = 3, R = 1400 * L, z = 4, B = .92, ee = 1, te = .028, V = .01, ne = .24, re = .45, ie = "#version 300 es\nlayout(location=0) in vec2 q;\nlayout(location=1) in vec4 a;\nlayout(location=2) in vec2 b;\nuniform vec2 u_res,u_c; uniform float u_S;\nout vec2 vq; flat out float vr,vc,va;\nvoid main(){ vec2 c=u_c+a.xy*u_S; float h=a.z+1.; vq=q*h; vr=a.z; vc=a.w; va=b.x;\n  gl_Position=vec4((c+q*h)/u_res*2.-1.,0.,1.); }", ae = "#version 300 es\nprecision highp float;\nin vec2 vq; flat in float vr,vc,va;\nuniform vec3 u_pal[8];\nout vec4 o;\nvoid main(){ float cov=clamp(vr-length(vq)+.5,0.,1.);\n  float al=cov*va; if(al<=.002) discard;\n  o=vec4(u_pal[int(vc+.5)]*al,al); }";
}));
//#endregion
//#region src/platform-hub.js
function oe() {
	if (document.getElementById("pv-hub-css")) return;
	let e = document.createElement("style");
	e.id = "pv-hub-css", e.textContent = Y, document.head.appendChild(e);
}
function U(e) {
	return () => {
		e |= 0, e = e + 1831565813 | 0;
		let t = Math.imul(e ^ e >>> 15, 1 | e);
		return t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t, ((t ^ t >>> 14) >>> 0) / 4294967296;
	};
}
function W(e) {
	let t = U(21 + le.indexOf(e)), n = () => Math.sqrt(-2 * Math.log(t() + 1e-9)) * Math.cos(Z * t()), r = [];
	if (e === "frontier") for (let e = 0; e < X; e++) {
		let e = t(), n = t(), i = -.3 + .52 * e ** .55 - n ** 1.25 * .58, a = n < .035 && e > .12;
		r.push([
			-.42 + e * .84,
			Math.max(-.36, Math.min(.34, i)),
			a ? Q : $,
			a ? 1 : n * 2 - 1
		]);
	}
	else if (e === "split") for (let e = 0; e < X; e++) {
		let n = e % 100 < 42, i = n ? -.22 : .22, a = t() * Z, o = t() ** .62 * (n ? .2 : .23);
		r.push([
			Math.cos(a) * o * 1.55,
			i + Math.sin(a) * o * .9,
			n ? Q : $,
			n ? 1 : t() * 2 - 1
		]);
	}
	else if (e === "enroll") {
		let e = Math.round(X * .34), t = Math.round(X * .34);
		for (let t = 0; t < e; t++) {
			let e = t / 339;
			r.push([
				-.42 + e * .84,
				.3 - .52 / (1 + Math.exp(-(e - .46) / .155)),
				Q,
				1
			]);
		}
		for (let e = 0; e < t; e++) {
			let t = e / 339;
			r.push([
				-.42 + t * .84,
				.3 - .4 / (1 + Math.exp(-(t - .58) / .185)),
				$,
				.1
			]);
		}
		for (let e = 0; e < 13; e++) {
			let t = e / 13, n = .34 - e * .006;
			for (let e = 0; e < 25; e++) r.push([
				-.42 + (t + e / 25 * (1 / 13)) * .84,
				n,
				se,
				-.7
			]);
		}
	} else if (e === "fan") {
		let e = Math.ceil(X / 26);
		for (let i = 0; i < 26; i++) {
			let a = i === 0 ? 0 : n(), o = 2 + t() * 4, s = t() * Z, c = i / 25 * 2 - 1;
			for (let t = 0; t < e; t++) {
				let e = t / 38, n = e * (.15 * a + .1 * Math.sin(o * e + s));
				r.push([
					-.43 + e * .86,
					Math.max(-.34, Math.min(.34, .18 * e - .07 + n)),
					i === 0 ? Q : $,
					i === 0 ? 1 : c
				]);
			}
		}
	} else {
		let e = Math.round(X * .17), t = Math.round(X * .46);
		for (let t = 0; t < e; t++) {
			let n = .062 * Math.sqrt((t + .5) / e), i = t * 2.39996;
			r.push([
				Math.cos(i) * n,
				Math.sin(i) * n,
				Q,
				1
			]);
		}
		let n = Math.round(t / 6);
		for (let e = 0; e < 6; e++) {
			let t = -Math.PI / 2 + Z / 6 * e, i = Math.cos(t) * .33, a = Math.sin(t) * .33;
			for (let e = 0; e < n; e++) {
				let t = .16 + e / n * .84;
				r.push([
					i * t,
					a * t,
					$,
					1 - t * 1.4
				]);
			}
			for (let t = 0; t < 61; t++) {
				let n = .045 * Math.sqrt((t + .5) / 61), o = t * 2.39996;
				r.push([
					i + Math.cos(o) * n,
					a + Math.sin(o) * n,
					e % 2 ? se : ce,
					-.2
				]);
			}
		}
	}
	for (; r.length < X;) r.push(r[r.length - 1] || [
		0,
		0,
		$,
		0
	]);
	return r.length = X, K(r).sort((e, t) => e[0] - t[0] || e[1] - t[1]);
}
function G(e, t) {
	let n = [...e].sort((e, t) => e - t);
	return n[Math.max(0, Math.min(n.length - 1, Math.round(t * (n.length - 1))))];
}
function K(e) {
	let t = e.map((e) => e[0]), n = e.map((e) => e[1]), r = G(t, pe), i = G(t, .99), a = G(n, pe), o = G(n, .99), s = Math.min(de / Math.max(i - r, 1e-6), fe / Math.max(o - a, 1e-6)), c = (r + i) / 2, l = (a + o) / 2;
	return e.map((e) => [
		(e[0] - c) * s,
		(e[1] - l) * s,
		e[2],
		e[3]
	]);
}
function q(e) {
	if (e.dataset.pvReady) return;
	let t = e.closest("section") || document, n = t.querySelector("[data-pv=\"platform-tabs\"]"), r = t.querySelector("#dm-panels"), i = r ? [...r.querySelectorAll(".dm-panel[data-panel]")] : [];
	if (!n || !i.length) return;
	e.dataset.pvReady = "1", oe();
	let a = matchMedia("(prefers-reduced-motion: reduce)").matches, o = (e, t) => (e.querySelector(t)?.textContent || "").trim(), s = i.map((e, t) => {
		let n = e.getAttribute("data-panel"), r = document.createElement("button");
		r.type = "button", r.className = "pv-tab", r.id = "pv-tab-" + n, r.setAttribute("role", "tab"), r.setAttribute("aria-selected", "false"), r.tabIndex = -1;
		let i = document.createElement("span");
		i.className = "pv-tab_q", i.textContent = o(e, ".dm-panel_title-wrapper .text-size-label");
		let a = document.createElement("span");
		return a.className = "pv-tab_n", a.textContent = o(e, ".dm-panel_title"), r.append(i, a), e.id ||= "pv-panel-" + n, r.setAttribute("aria-controls", e.id), e.setAttribute("role", "tabpanel"), e.setAttribute("aria-labelledby", r.id), r.addEventListener("click", () => E(t)), {
			key: n,
			tab: r,
			panel: e
		};
	});
	n.replaceChildren(...s.map((e) => e.tab)), n.setAttribute("role", "tablist"), n.addEventListener("keydown", (e) => {
		let t = s.length, n = {
			ArrowRight: T + 1,
			ArrowDown: T + 1,
			ArrowLeft: T - 1,
			ArrowUp: T - 1,
			Home: 0,
			End: t - 1
		};
		if (!(e.key in n)) return;
		e.preventDefault();
		let r = (n[e.key] + t) % t;
		E(r), s[r].tab.focus();
	});
	let c = document.createElement("canvas");
	c.setAttribute("aria-hidden", "true"), e.appendChild(c);
	let l = c.getContext("2d"), u = {}, d = (e) => u[e] || (u[e] = W(e)), f, p, m = 1, h = 0, g = 0, _ = 0, v = 0, y = 0, b = "";
	function x() {
		let e = ue(m), t = Array(X);
		for (let n = 0; n < X; n++) {
			let r = f[n], i = p[n];
			t[n] = [
				r[0] + (i[0] - r[0]) * e,
				r[1] + (i[1] - r[1]) * e,
				e < .5 ? r[2] : i[2],
				r[3] + (i[3] - r[3]) * e
			];
		}
		return t;
	}
	function S(e, t) {
		let n = d(e);
		!f || t || a ? (f = p = n, m = 1) : (f = x(), p = n, m = 0), b = e, O || w();
	}
	function C() {
		let e = c.getBoundingClientRect(), t = Math.min(devicePixelRatio || 1, 2);
		g = e.width, _ = e.height, c.width = Math.round(g * t), c.height = Math.round(_ * t), l.setTransform(t, 0, 0, t, 0, 0), !O && f && w();
	}
	function w() {
		l.clearRect(0, 0, g, _);
		let e = ue(m), t = Math.min(g, _) * 1.18, n = g / 2, r = _ / 2, i = a ? 0 : Math.sin(h * .4) * .009, o = b === "conductor" && m >= 1 && !a;
		for (let a = 0; a < X; a++) {
			let s = f[a], c = p[a], u = s[3] + (c[3] - s[3]) * e, d = s[0] + (c[0] - s[0]) * e + (v * .024 + i) * u, m = s[1] + (c[1] - s[1]) * e + y * .018 * u, g = e < .5 ? s[2] : c[2], _ = (u + 1) / 2, b = .95 + _ * .95, x = g === Q ? .96 : .3 + _ * .36;
			if (o) {
				let e = Math.hypot(d, m);
				if (e < .075) {
					let e = Math.max(0, Math.sin(h * 1.9)) ** 6;
					b *= 1 + e * .85, x = Math.min(1, x + e * .2);
				} else {
					let t = Math.min(1, (e - .075) / .3), n = Math.abs(t - h * .42 % 1), r = n < .13 ? 1 - n / .13 : 0;
					b *= 1 + r * .9, x = Math.min(1, x + r * .55);
				}
			}
			l.beginPath(), l.arc(n + d * t, r + m * t, b, 0, Z), l.fillStyle = `rgba(${g[0]},${g[1]},${g[2]},${x.toFixed(3)})`, l.fill();
		}
	}
	let T = -1;
	function E(e, t) {
		e !== T && (T = e, s.forEach((t, n) => {
			let r = n === e;
			t.tab.setAttribute("aria-selected", r ? "true" : "false"), t.tab.tabIndex = r ? 0 : -1, t.panel.classList.toggle("is-active", r);
		}), S(J[s[e].key] || "fan", t));
	}
	let D = 0, O = !1, k = 0;
	function A(e) {
		D = requestAnimationFrame(A);
		let t = Math.min((e - k) / 1e3, .05);
		k = e, m < 1 && (m = Math.min(1, m + t / 1.15)), h += t, w();
	}
	function j() {
		O || a || (O = !0, k = performance.now(), D = requestAnimationFrame(A));
	}
	function M() {
		cancelAnimationFrame(D), O = !1;
	}
	a || t.addEventListener("pointermove", (e) => {
		let t = c.getBoundingClientRect();
		v = ((e.clientX - t.left) / t.width - .5) * 2, y = ((e.clientY - t.top) / t.height - .5) * 2;
	}), new ResizeObserver(C).observe(c), C(), E(Math.max(0, i.findIndex((e) => e.classList.contains("is-active"))), !0), a || new IntersectionObserver(([e]) => e.isIntersecting ? j() : M()).observe(e);
}
var J, Y, X, Z, Q, $, se, ce, le, ue, de, fe, pe, me = e((() => {
	J = {
		pursue: "frontier",
		benefits: "split",
		run: "enroll",
		design: "fan",
		connect: "conductor"
	}, Y = "\n[data-pv=\"platform-tabs\"]{ display:grid; grid-template-columns:repeat(5,minmax(0,1fr));\n  border-top:1px solid #2A2450; margin:18px 0 52px; }\n@media (max-width:1040px){ [data-pv=\"platform-tabs\"]{ grid-template-columns:repeat(3,minmax(0,1fr)); } }\n@media (max-width:640px){ [data-pv=\"platform-tabs\"]{ grid-template-columns:repeat(2,minmax(0,1fr)); } }\n.pv-tab{ appearance:none; text-align:left; cursor:pointer; width:100%; padding:20px 18px 20px 0;\n  border:0; border-top:1px solid transparent; margin-top:-1px; border-radius:0; background:transparent;\n  color:inherit; font:inherit; transition:border-color .3s ease; }\n.pv-tab_q{ display:block; font-size:11px; line-height:1.4; letter-spacing:.08em; text-transform:uppercase;\n  color:#8F8CB5; margin-bottom:8px; min-height:2.8em; transition:color .3s ease; }\n.pv-tab_n{ display:block; font-size:16px; letter-spacing:-.01em; color:#8B87B4; transition:color .3s ease; }\n.pv-tab:hover .pv-tab_n{ color:#F4F4F4; }\n.pv-tab[aria-selected=\"true\"]{ border-top-color:#E2C70A; }\n.pv-tab[aria-selected=\"true\"] .pv-tab_q{ color:#E2C70A; }\n.pv-tab[aria-selected=\"true\"] .pv-tab_n{ color:#F4F4F4; }\n.pv-tab:focus-visible{ outline:2px solid #E2C70A; outline-offset:-2px; }\n\n[data-pv=\"platform-hub\"]{ position:relative; min-height:440px; }\n[data-pv=\"platform-hub\"] canvas{ position:absolute; inset:-6% -14%; width:128%; height:112%; pointer-events:none; }\n@media (max-width:900px){ [data-pv=\"platform-hub\"]{ min-height:320px; } }\n\n/* les panneaux non actifs restent cachés même si le CSS de la page change */\n#dm-panels .dm-panel:not(.is-active){ display:none; }\n#dm-panels .dm-panel.is-active{ animation:pvPanelIn .35s ease both; }\n@keyframes pvPanelIn{ from{ opacity:0; transform:translateY(10px); } to{ opacity:1; transform:none; } }\n@media (prefers-reduced-motion:reduce){ #dm-panels .dm-panel.is-active{ animation:none; } .pv-tab, .pv-tab *{ transition:none; } }", X = 1e3, Z = Math.PI * 2, Q = [
		226,
		199,
		10
	], $ = [
		146,
		138,
		205
	], se = [
		120,
		168,
		224
	], ce = [
		127,
		232,
		207
	], le = [
		"frontier",
		"split",
		"enroll",
		"fan",
		"conductor"
	], ue = (e) => e < .5 ? 4 * e * e * e : 1 - (-2 * e + 2) ** 3 / 2, de = .88, fe = .68, pe = .01;
}));
//#endregion
//#region src/evidence-bars.js
function he(e) {
	if (e.dataset.pvReady) return;
	e.dataset.pvReady = "1";
	let t = [...e.querySelectorAll("[data-value]")];
	if (!t.length) return () => {};
	let n = matchMedia("(prefers-reduced-motion: reduce)").matches;
	if (t.forEach((e, t) => {
		let r = parseFloat(e.dataset.value), i = parseFloat(e.dataset.max) || 1, a = Number.isFinite(r) ? Math.max(0, Math.min(1, r / i)) : 0;
		e.style.width = (a * 100).toFixed(2) + "%", e.style.transformOrigin = "left center", !n && (e.style.transform = "scaleX(0)", e.style.transition = `transform 1.1s cubic-bezier(.65,0,.35,1) ${t * .12}s`);
	}), n) return () => {};
	let r = () => t.forEach((e) => {
		e.style.transform = "scaleX(1)";
	}), i = new IntersectionObserver((e) => {
		e.some((e) => e.isIntersecting) && (r(), i.disconnect());
	}, { threshold: .6 });
	return i.observe(e), function() {
		i.disconnect();
	};
}
var ge = e((() => {})), _e = /* @__PURE__ */ t((() => {
	g(), H(), me(), ge(), document.querySelectorAll("[data-pv=\"gantt\"]").forEach(n), document.querySelectorAll("[data-pv=\"hero-homepage\"]").forEach(x), document.querySelectorAll("[data-pv=\"platform-hub\"]").forEach(q), document.querySelectorAll("[data-pv=\"evidence-bars\"]").forEach(he);
}));
//#endregion
export default _e();
