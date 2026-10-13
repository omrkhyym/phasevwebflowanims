//#region \0rolldown/runtime.js
var e = (e, t, n) => () => {
	if (n) throw n[0];
	try {
		return e && (t = e(e = 0)), t;
	} catch (e) {
		throw n = [e], e;
	}
}, t = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports);
//#endregion
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
			n: "PROTOCOL FINAL",
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
		for (let e = 0; e < 50; e++) {
			let l = e / 49, u = l * (.19 * i + .09 * a * Math.sin(o * l + s));
			t.push([
				-.42 + l * .84,
				Math.max(-.46, Math.min(.46, n(l) + u)),
				r === 0 ? j : M,
				r === 0 ? 1 : c
			]);
		}
	}
	let r = [], i = .84 / 70, a = Array(70).fill(0);
	for (let e = 0; e < L; e++) {
		let t = .03 + .1 * y(.004 + .992 * (e + .5) / L), n = Math.max(0, Math.min(69, Math.floor((t + .42) / i)));
		r.push([
			-.42 + (n + .5) * i,
			-.294 + a[n] * .0088,
			n === 37 ? j : M,
			n / 69 * 2 - 1
		]), a[n]++;
	}
	let o = [], s = -.1;
	for (let e = 0; e < 58; e++) o.push([
		s,
		.36 - .72 / 57 * e,
		I,
		0
	]);
	for (let t = 0; t < 11; t++) {
		let n = t === 10, r = n ? -.34 : .3 - t * .056, i = n ? .01999999999999999 : s + (e() - .25) * .26, a = n ? .04 : .04 + e() * .08, c = n ? j : M, l = n ? 1 : t / 9 * 2 - 1;
		for (let e = 0; e < 80; e++) o.push([
			i - a + 2 * a * e / 79,
			r,
			c,
			l
		]);
		for (let e = 0; e < 42; e++) {
			let t = .016 * Math.sqrt((e + .5) / 42), n = e * 2.39996;
			o.push([
				i + Math.cos(n) * t,
				r + Math.sin(n) * t,
				c,
				l
			]);
		}
	}
	let c = [], l = [...Array(56)].map((e, t) => 1 / (1 + Math.exp(-((t + .5) / 56 - .5) / .1))), u = l.reduce((e, t) => e + t, 0), d = l.map((e) => Math.floor(e * L / u)), f = L - d.reduce((e, t) => e + t, 0);
	for (let e = 55; f > 0; e--, f--) d[e]++;
	d.forEach((e, t) => {
		let n = t / 55 * 2 - 1;
		for (let r = 0; r < e; r++) c.push([
			-.42 + (t + .5) * .015,
			-.294 + r * .0105,
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
	], h = [
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
		let n = Math.sqrt(e) * .0062, r = t / 4 * 2 - 1;
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
		.78,
		.78,
		.78,
		.72
	], S = [
		1,
		1,
		1,
		1,
		.72
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
	let r = matchMedia("(prefers-reduced-motion: reduce)").matches, i = b(), a = 0, o = 0;
	for (let e of i) for (let t of e) a = Math.max(a, Math.abs(t[0]) * 2), o = Math.max(o, Math.abs(t[1]) * 2);
	a = Math.max(a, 1e-6), o = Math.max(o, 1e-6);
	let s = v(99), c = Float32Array.from({ length: L }, () => s()), l = Float32Array.from({ length: L }, () => (s() - .5) * .7), u = Uint8Array.from({ length: L }, () => Math.floor(s() * 10)), d = e.closest(".section_header") || document.body, f = d.querySelector("h1"), p = f ? getComputedStyle(f).fontFamily : "Aspekta, Arial, sans-serif";
	function m(e, t) {
		let r = n.createShader(e);
		if (n.shaderSource(r, t), n.compileShader(r), !n.getShaderParameter(r, n.COMPILE_STATUS)) throw Error(n.getShaderInfoLog(r));
		return r;
	}
	function h(e, t) {
		let r = n.createProgram();
		if (n.attachShader(r, m(n.VERTEX_SHADER, e)), n.attachShader(r, m(n.FRAGMENT_SHADER, t)), n.linkProgram(r), !n.getProgramParameter(r, n.LINK_STATUS)) throw Error(n.getProgramInfoLog(r));
		return r;
	}
	let g = h(te, ne), y = h(re, ie), x = (e, t) => n.getUniformLocation(e, t), S = {
		res: x(g, "u_res"),
		c: x(g, "u_c"),
		S: x(g, "u_S"),
		pal: x(g, "u_pal[0]"),
		atlas: x(g, "u_atlas"),
		glyph: x(g, "u_glyph")
	}, C = {
		tex: x(y, "u_tex"),
		res: x(y, "u_res"),
		time: x(y, "u_time"),
		dpr: x(y, "u_dpr")
	}, w = new Float32Array(A.pal.flat()), k = 2 * L, j = new Float32Array(k * 7), M = n.createVertexArray();
	n.bindVertexArray(M), n.bindBuffer(n.ARRAY_BUFFER, n.createBuffer()), n.bufferData(n.ARRAY_BUFFER, new Float32Array([
		-1,
		-1,
		1,
		-1,
		-1,
		1,
		1,
		1
	]), n.STATIC_DRAW), n.enableVertexAttribArray(0), n.vertexAttribPointer(0, 2, n.FLOAT, !1, 0, 0);
	let N = n.createBuffer();
	n.bindBuffer(n.ARRAY_BUFFER, N), n.bufferData(n.ARRAY_BUFFER, j.byteLength, n.DYNAMIC_DRAW), n.enableVertexAttribArray(1), n.vertexAttribPointer(1, 4, n.FLOAT, !1, 28, 0), n.vertexAttribDivisor(1, 1), n.enableVertexAttribArray(2), n.vertexAttribPointer(2, 2, n.FLOAT, !1, 28, 16), n.vertexAttribDivisor(2, 1);
	let P = n.createVertexArray();
	n.bindVertexArray(P), n.bindBuffer(n.ARRAY_BUFFER, n.createBuffer()), n.bufferData(n.ARRAY_BUFFER, new Float32Array([
		-1,
		-1,
		3,
		-1,
		-1,
		3
	]), n.STATIC_DRAW), n.enableVertexAttribArray(0), n.vertexAttribPointer(0, 2, n.FLOAT, !1, 0, 0);
	let F = n.createTexture();
	function I() {
		let e = document.createElement("canvas");
		e.width = 960, e.height = 96;
		let t = e.getContext("2d");
		t.fillStyle = "#fff", t.font = `500 70px ${p}`, t.textAlign = "center", t.textBaseline = "middle";
		for (let e = 0; e < 10; e++) t.fillText(String(e), e * 96 + 48, 52);
		n.activeTexture(n.TEXTURE1), n.bindTexture(n.TEXTURE_2D, F), n.texImage2D(n.TEXTURE_2D, 0, n.RGBA, n.RGBA, n.UNSIGNED_BYTE, e), n.generateMipmap(n.TEXTURE_2D), n.texParameteri(n.TEXTURE_2D, n.TEXTURE_MIN_FILTER, n.LINEAR_MIPMAP_LINEAR), n.texParameteri(n.TEXTURE_2D, n.TEXTURE_MAG_FILTER, n.LINEAR), n.texParameteri(n.TEXTURE_2D, n.TEXTURE_WRAP_S, n.CLAMP_TO_EDGE), n.texParameteri(n.TEXTURE_2D, n.TEXTURE_WRAP_T, n.CLAMP_TO_EDGE);
	}
	I();
	let U = n.createFramebuffer(), W = n.createTexture(), G = 1, K = 1;
	function ae() {
		G = Math.min(window.devicePixelRatio || 1, 2);
		let i = e.getBoundingClientRect();
		t.width = Math.max(1, Math.round(i.width * G)), t.height = Math.max(1, Math.round(i.height * G)), n.activeTexture(n.TEXTURE2), n.bindTexture(n.TEXTURE_2D, W), n.texImage2D(n.TEXTURE_2D, 0, n.RGBA, t.width, t.height, 0, n.RGBA, n.UNSIGNED_BYTE, null), n.texParameteri(n.TEXTURE_2D, n.TEXTURE_MIN_FILTER, n.LINEAR), n.texParameteri(n.TEXTURE_2D, n.TEXTURE_MAG_FILTER, n.LINEAR), n.texParameteri(n.TEXTURE_2D, n.TEXTURE_WRAP_S, n.CLAMP_TO_EDGE), n.texParameteri(n.TEXTURE_2D, n.TEXTURE_WRAP_T, n.CLAMP_TO_EDGE), n.bindFramebuffer(n.FRAMEBUFFER, U), n.framebufferTexture2D(n.FRAMEBUFFER, n.COLOR_ATTACHMENT0, n.TEXTURE_2D, W, 0), r && Z(7.5);
	}
	let q = {
		x: 0,
		y: 0,
		a: 0,
		tx: 0,
		ty: 0,
		in: !1
	};
	d.addEventListener("pointermove", (t) => {
		let n = e.getBoundingClientRect(), r = Math.min(n.width, n.height);
		q.tx = (t.clientX - n.left - n.width / 2) / r, q.ty = -(t.clientY - n.top - n.height / 2) / r, q.in = !0;
	}), d.addEventListener("pointerleave", () => q.in = !1);
	let J = 0;
	function Y(e, t, n, r, i, a) {
		if (J >= k || i <= .003) return;
		let o = J++ * 7;
		j[o] = e, j[o + 1] = t, j[o + 2] = Math.max(n * K, .7 * G), j[o + 3] = r, j[o + 4] = i, j[o + 5] = a;
	}
	function oe(e) {
		let t = Math.floor(e / R) % 5, n = e - Math.floor(e / R) * R, a = i[(t + 5 - 1) % 5], o = i[t], s = .0038 * A.rMul;
		J = 0;
		let d = r ? 0 : q.x * q.a, f = r ? 0 : q.y * q.a;
		if (!r) for (let e = 0; e < 4; e++) u[Math.floor(Math.random() * L)] = Math.floor(Math.random() * 10);
		for (let t = 0; t < L; t++) {
			if (t & 1) continue;
			let r = a[t], i = o[t], p = .5 * T((i[0] + .45) / .9) + .2 * c[t], m = O(E(n, p, p + 1.1)), h = i[0] - r[0], g = i[1] - r[1], _ = l[t] * Math.sin(Math.PI * m), v = D(r[0], i[0], m) - g * _ + .0015 * Math.sin(e * 1.3 + t), y = D(r[1], i[1], m) + h * _ + .0015 * Math.cos(e * 1.1 + t * 1.7), b = s, x = D(r[3] || 0, i[3] || 0, m);
			v += x * (B * d + V * Math.sin(e * .31)), y += x * (B * f + V * .6 * Math.cos(e * .24)), b *= 1 + H * x;
			let S = .95 * (1 - ee * (1 - (x * .5 + .5)));
			if (y += .0012 * Math.sin(e * 2.2 + t * .7), q.a > .001) {
				let e = v - q.x, t = y - q.y;
				b *= 1 + 1.2 * q.a * Math.exp(-(e * e + t * t) / .004);
			}
			r[2] === i[2] || m >= 1 ? Y(v, y, b, i[2], S, u[t]) : m <= 0 ? Y(v, y, b, r[2], S, u[t]) : (Y(v, y, b, r[2], S * (1 - m), u[t]), Y(v, y, b, i[2], S * m, u[t]));
		}
	}
	let X = !1;
	function Z(e) {
		if (X) return;
		let r = t.width, i = t.height;
		K = Math.min(r / (a * z), i / (o * z)), oe(e), n.bindFramebuffer(n.FRAMEBUFFER, U), n.viewport(0, 0, r, i), n.clearColor(0, 0, 0, 0), n.clear(n.COLOR_BUFFER_BIT), n.useProgram(g), n.bindVertexArray(M), n.uniform2f(S.res, r, i), n.uniform2f(S.c, r / 2, i / 2), n.uniform1f(S.S, K), n.uniform3fv(S.pal, w), n.uniform1i(S.atlas, 1), n.uniform1i(S.glyph, A.glyph), n.enable(n.BLEND), n.blendFunc(n.ONE, n.ONE_MINUS_SRC_ALPHA), n.bindBuffer(n.ARRAY_BUFFER, N), n.bufferSubData(n.ARRAY_BUFFER, 0, j, 0, J * 7), n.drawArraysInstanced(n.TRIANGLE_STRIP, 0, 4, J), n.bindFramebuffer(n.FRAMEBUFFER, null), n.viewport(0, 0, r, i), n.clearColor(0, 0, 0, 0), n.clear(n.COLOR_BUFFER_BIT), n.useProgram(y), n.bindVertexArray(P), n.uniform1i(C.tex, 2), n.uniform2f(C.res, r, i), n.uniform1f(C.time, e), n.uniform1f(C.dpr, G), n.drawArrays(n.TRIANGLES, 0, 3);
	}
	let Q = 0, se = 0, $ = 0;
	function ce(e) {
		Q = requestAnimationFrame(ce);
		let t = Math.max(0, Math.min((e - $) / 1e3, .05));
		$ = e, q.x += (q.tx - q.x) * .08, q.y += (q.ty - q.y) * .08, q.a += (+!!q.in - q.a) * .06, se += t, Z(se);
	}
	function le() {
		Q || r || X || ($ = performance.now(), Q = requestAnimationFrame(ce));
	}
	function ue() {
		cancelAnimationFrame(Q), Q = 0;
	}
	t.addEventListener("webglcontextlost", (e) => {
		e.preventDefault(), X = !0, ue();
	}), new ResizeObserver(ae).observe(e), ae(), document.fonts && document.fonts.ready.then(() => {
		I(), r && Z(7.5);
	}), r ? Z(7.5) : new IntersectionObserver(([e]) => e.isIntersecting ? le() : ue()).observe(e);
}
var S, C, w, T, E, D, O, k, A, j, M, N, P, F, I, L, R, z, B, V, H, ee, te, ne, re, ie, U = e((() => {
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
/* grille empilée : le débordement 66vw n'a plus de sens, on centre */
@media (max-width:991px){
  .header_image-wrapper:has(${S}){ min-height:22rem; }
  ${S}{ width:112vw; right:auto; left:50%; transform:translateX(-50%); top:-4%; bottom:-4%; }
}
@media (max-width:479px){
  .header_image-wrapper:has(${S}){ min-height:17rem; }
  ${S}{ width:124vw; }
}`, w = Math.PI * 2, T = (e) => Math.max(0, Math.min(1, e)), E = (e, t, n) => T((e - t) / (n - t)), D = (e, t, n) => e + (t - e) * n, O = (e) => e < .5 ? 4 * e * e * e : 1 - (-2 * e + 2) ** 3 / 2, k = (e) => Math.sqrt(-2 * Math.log(e() + 1e-9)) * Math.cos(w * e()), A = {
		glyph: 1,
		rMul: 2.6,
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
	}, j = 0, M = 1, N = 2, P = 3, F = 4, I = 6, L = 1400, R = 4, z = .92, B = .028, V = .01, H = .24, ee = .45, te = "#version 300 es\nlayout(location=0) in vec2 q;\nlayout(location=1) in vec4 a;\nlayout(location=2) in vec2 b;\nuniform vec2 u_res,u_c; uniform float u_S;\nout vec2 vq; flat out float vr,vc,va,vd;\nvoid main(){ vec2 c=u_c+a.xy*u_S; float h=a.z+1.; vq=q*h; vr=a.z; vc=a.w; va=b.x; vd=b.y;\n  gl_Position=vec4((c+q*h)/u_res*2.-1.,0.,1.); }", ne = "#version 300 es\nprecision highp float;\nin vec2 vq; flat in float vr,vc,va,vd;\nuniform vec3 u_pal[8]; uniform sampler2D u_atlas; uniform int u_glyph;\nout vec4 o;\nvoid main(){ float cov;\n  if(u_glyph==1){ vec2 uv=vq/(vr+1.)*.5+.5; cov=texture(u_atlas,vec2((vd+uv.x)/10.,1.-uv.y)).a; }\n  else cov=clamp(vr-length(vq)+.5,0.,1.);\n  float al=cov*va; if(al<=.002) discard;\n  o=vec4(u_pal[int(vc+.5)]*al,al); }", re = "#version 300 es\nlayout(location=0) in vec2 p; void main(){ gl_Position=vec4(p,0.,1.); }", ie = "#version 300 es\nprecision highp float;\nuniform sampler2D u_tex; uniform vec2 u_res; uniform float u_time,u_dpr;\nout vec4 o;\nfloat hash(vec2 p){ p=fract(p*vec2(123.34,456.21)); p+=dot(p,p+45.32); return fract(p.x*p.y); }\nvec4 T(vec2 uv){ return texture(u_tex,uv); }\nvec3 glow(vec2 uv,float rad){ vec3 s=vec3(0.);\n  for(int i=0;i<12;i++){ float a=float(i)*.5236+.26; vec2 d=vec2(cos(a),sin(a))*rad/u_res; s+=T(uv+d).rgb+.6*T(uv+d*2.3).rgb; }\n  return s/12.; }\nvoid main(){\n  vec2 fc=gl_FragCoord.xy, uv=fc/u_res;\n  vec2 c=uv*2.-1., cc=c*(1.+.025*dot(c,c)), s=cc*.5+.5;\n  float ab=1.2*u_dpr/u_res.x;\n  vec3 p=vec3(T(s+vec2(ab,0.)).r, T(s).g, T(s-vec2(ab,0.)).b);\n  vec3 col=p + glow(s,2.5*u_dpr)*.6 + glow(s,8.*u_dpr)*.3;\n  col*=.84+.16*sin(fc.y*3.14159/(1.5*u_dpr));\n  col+=(hash(fc+fract(u_time)*100.)-.5)*.025*step(.02,max(col.r,max(col.g,col.b)));\n  col*=.985+.015*sin(u_time*7.);\n  col=max(col,0.);\n  float al=clamp(max(col.r,max(col.g,col.b))*1.25,0.,1.);\n  o=vec4(col*al, al);\n}";
})), W = /* @__PURE__ */ t((() => {
	g(), U(), document.querySelectorAll("[data-pv=\"gantt\"]").forEach(n), document.querySelectorAll("[data-pv=\"hero-homepage\"]").forEach(x);
}));
//#endregion
export default W();
