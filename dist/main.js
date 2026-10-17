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
	let g = h(ae, oe), y = h(se, ce), x = (e, t) => n.getUniformLocation(e, t), S = {
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
	let z = n.createFramebuffer(), B = n.createTexture(), V = 1, H = 1;
	function U() {
		V = Math.min(window.devicePixelRatio || 1, 2);
		let i = e.getBoundingClientRect();
		t.width = Math.max(1, Math.round(i.width * V)), t.height = Math.max(1, Math.round(i.height * V)), n.activeTexture(n.TEXTURE2), n.bindTexture(n.TEXTURE_2D, B), n.texImage2D(n.TEXTURE_2D, 0, n.RGBA, t.width, t.height, 0, n.RGBA, n.UNSIGNED_BYTE, null), n.texParameteri(n.TEXTURE_2D, n.TEXTURE_MIN_FILTER, n.LINEAR), n.texParameteri(n.TEXTURE_2D, n.TEXTURE_MAG_FILTER, n.LINEAR), n.texParameteri(n.TEXTURE_2D, n.TEXTURE_WRAP_S, n.CLAMP_TO_EDGE), n.texParameteri(n.TEXTURE_2D, n.TEXTURE_WRAP_T, n.CLAMP_TO_EDGE), n.bindFramebuffer(n.FRAMEBUFFER, z), n.framebufferTexture2D(n.FRAMEBUFFER, n.COLOR_ATTACHMENT0, n.TEXTURE_2D, B, 0), r && J(7.5);
	}
	let W = {
		x: 0,
		y: 0,
		a: 0,
		tx: 0,
		ty: 0,
		in: !1
	};
	d.addEventListener("pointermove", (t) => {
		let n = e.getBoundingClientRect(), r = Math.min(n.width, n.height);
		W.tx = (t.clientX - n.left - n.width / 2) / r, W.ty = -(t.clientY - n.top - n.height / 2) / r, W.in = !0;
	}), d.addEventListener("pointerleave", () => W.in = !1);
	let G = 0;
	function K(e, t, n, r, i, a) {
		if (G >= k || i <= .003) return;
		let o = G++ * 7;
		j[o] = e, j[o + 1] = t, j[o + 2] = Math.max(n * H, .7 * V), j[o + 3] = r, j[o + 4] = i, j[o + 5] = a;
	}
	function le(e) {
		let t = Math.floor(e / R) % 5, n = e - Math.floor(e / R) * R, a = i[(t + 5 - 1) % 5], o = i[t], s = .0038 * A.rMul;
		G = 0;
		let d = r ? 0 : W.x * W.a, f = r ? 0 : W.y * W.a;
		if (!r) for (let e = 0; e < 4; e++) u[Math.floor(Math.random() * L)] = Math.floor(Math.random() * 10);
		for (let t = 0; t < L; t++) {
			if (t & 1) continue;
			let r = a[t], i = o[t], p = .5 * T((i[0] + .45) / .9) + .2 * c[t], m = O(E(n, p, p + 1.1)), h = i[0] - r[0], g = i[1] - r[1], _ = l[t] * Math.sin(Math.PI * m), v = D(r[0], i[0], m) - g * _ + .0015 * Math.sin(e * 1.3 + t), y = D(r[1], i[1], m) + h * _ + .0015 * Math.cos(e * 1.1 + t * 1.7), b = s, x = D(r[3] || 0, i[3] || 0, m);
			v += x * (te * d + ne * Math.sin(e * .31)), y += x * (te * f + ne * .6 * Math.cos(e * .24)), b *= 1 + re * x;
			let S = .95 * (1 - ie * (1 - (x * .5 + .5)));
			if (y += .0012 * Math.sin(e * 2.2 + t * .7), W.a > .001) {
				let e = v - W.x, t = y - W.y;
				b *= 1 + 1.2 * W.a * Math.exp(-(e * e + t * t) / .004);
			}
			r[2] === i[2] || m >= 1 ? K(v, y, b, i[2], S, u[t]) : m <= 0 ? K(v, y, b, r[2], S, u[t]) : (K(v, y, b, r[2], S * (1 - m), u[t]), K(v, y, b, i[2], S * m, u[t]));
		}
	}
	let q = !1;
	function J(e) {
		if (q) return;
		let r = t.width, i = t.height;
		H = Math.min(r / (a * ee), i / (o * ee)), le(e), n.bindFramebuffer(n.FRAMEBUFFER, z), n.viewport(0, 0, r, i), n.clearColor(0, 0, 0, 0), n.clear(n.COLOR_BUFFER_BIT), n.useProgram(g), n.bindVertexArray(M), n.uniform2f(S.res, r, i), n.uniform2f(S.c, r / 2, i / 2), n.uniform1f(S.S, H), n.uniform3fv(S.pal, w), n.uniform1i(S.atlas, 1), n.uniform1i(S.glyph, A.glyph), n.enable(n.BLEND), n.blendFunc(n.ONE, n.ONE_MINUS_SRC_ALPHA), n.bindBuffer(n.ARRAY_BUFFER, N), n.bufferSubData(n.ARRAY_BUFFER, 0, j, 0, G * 7), n.drawArraysInstanced(n.TRIANGLE_STRIP, 0, 4, G), n.bindFramebuffer(n.FRAMEBUFFER, null), n.viewport(0, 0, r, i), n.clearColor(0, 0, 0, 0), n.clear(n.COLOR_BUFFER_BIT), n.useProgram(y), n.bindVertexArray(P), n.uniform1i(C.tex, 2), n.uniform2f(C.res, r, i), n.uniform1f(C.time, e), n.uniform1f(C.dpr, V), n.drawArrays(n.TRIANGLES, 0, 3);
	}
	let Y = 0, X = 0, Z = 0;
	function Q(e) {
		Y = requestAnimationFrame(Q);
		let t = Math.max(0, Math.min((e - Z) / 1e3, .05));
		Z = e, W.x += (W.tx - W.x) * .08, W.y += (W.ty - W.y) * .08, W.a += (+!!W.in - W.a) * .06, X += t, J(X);
	}
	function ue() {
		Y || r || q || (Z = performance.now(), Y = requestAnimationFrame(Q));
	}
	function $() {
		cancelAnimationFrame(Y), Y = 0;
	}
	t.addEventListener("webglcontextlost", (e) => {
		e.preventDefault(), q = !0, $();
	}), new ResizeObserver(U).observe(e), U(), document.fonts && document.fonts.ready.then(() => {
		I(), r && J(7.5);
	}), r ? J(7.5) : new IntersectionObserver(([e]) => e.isIntersecting ? ue() : $()).observe(e);
}
var S, C, w, T, E, D, O, k, A, j, M, N, P, F, I, L, R, ee, te, ne, re, ie, ae, oe, se, ce, z = e((() => {
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
	}, j = 0, M = 1, N = 2, P = 3, F = 4, I = 6, L = 1400, R = 4, ee = .92, te = .028, ne = .01, re = .24, ie = .45, ae = "#version 300 es\nlayout(location=0) in vec2 q;\nlayout(location=1) in vec4 a;\nlayout(location=2) in vec2 b;\nuniform vec2 u_res,u_c; uniform float u_S;\nout vec2 vq; flat out float vr,vc,va,vd;\nvoid main(){ vec2 c=u_c+a.xy*u_S; float h=a.z+1.; vq=q*h; vr=a.z; vc=a.w; va=b.x; vd=b.y;\n  gl_Position=vec4((c+q*h)/u_res*2.-1.,0.,1.); }", oe = "#version 300 es\nprecision highp float;\nin vec2 vq; flat in float vr,vc,va,vd;\nuniform vec3 u_pal[8]; uniform sampler2D u_atlas; uniform int u_glyph;\nout vec4 o;\nvoid main(){ float cov;\n  if(u_glyph==1){ vec2 uv=vq/(vr+1.)*.5+.5; cov=texture(u_atlas,vec2((vd+uv.x)/10.,1.-uv.y)).a; }\n  else cov=clamp(vr-length(vq)+.5,0.,1.);\n  float al=cov*va; if(al<=.002) discard;\n  o=vec4(u_pal[int(vc+.5)]*al,al); }", se = "#version 300 es\nlayout(location=0) in vec2 p; void main(){ gl_Position=vec4(p,0.,1.); }", ce = "#version 300 es\nprecision highp float;\nuniform sampler2D u_tex; uniform vec2 u_res; uniform float u_time,u_dpr;\nout vec4 o;\nfloat hash(vec2 p){ p=fract(p*vec2(123.34,456.21)); p+=dot(p,p+45.32); return fract(p.x*p.y); }\nvec4 T(vec2 uv){ return texture(u_tex,uv); }\nvec3 glow(vec2 uv,float rad){ vec3 s=vec3(0.);\n  for(int i=0;i<12;i++){ float a=float(i)*.5236+.26; vec2 d=vec2(cos(a),sin(a))*rad/u_res; s+=T(uv+d).rgb+.6*T(uv+d*2.3).rgb; }\n  return s/12.; }\nvoid main(){\n  vec2 fc=gl_FragCoord.xy, uv=fc/u_res;\n  vec2 c=uv*2.-1., cc=c*(1.+.025*dot(c,c)), s=cc*.5+.5;\n  float ab=1.2*u_dpr/u_res.x;\n  vec3 p=vec3(T(s+vec2(ab,0.)).r, T(s).g, T(s-vec2(ab,0.)).b);\n  vec3 col=p + glow(s,2.5*u_dpr)*.6 + glow(s,8.*u_dpr)*.3;\n  col*=.84+.16*sin(fc.y*3.14159/(1.5*u_dpr));\n  col+=(hash(fc+fract(u_time)*100.)-.5)*.025*step(.02,max(col.r,max(col.g,col.b)));\n  col*=.985+.015*sin(u_time*7.);\n  col=max(col,0.);\n  float al=clamp(max(col.r,max(col.g,col.b))*1.25,0.,1.);\n  o=vec4(col*al, al);\n}";
}));
//#endregion
//#region src/platform-hub.js
function B() {
	if (document.getElementById("pv-hub-css")) return;
	let e = document.createElement("style");
	e.id = "pv-hub-css", e.textContent = le, document.head.appendChild(e);
}
function V(e) {
	return () => {
		e |= 0, e = e + 1831565813 | 0;
		let t = Math.imul(e ^ e >>> 15, 1 | e);
		return t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t, ((t ^ t >>> 14) >>> 0) / 4294967296;
	};
}
function H(e) {
	let t = V(21 + ue.indexOf(e)), n = () => Math.sqrt(-2 * Math.log(t() + 1e-9)) * Math.cos(J * t()), r = [];
	if (e === "frontier") for (let e = 0; e < q; e++) {
		let e = t(), n = t(), i = -.3 + .52 * e ** .55 - n ** 1.25 * .58, a = n < .035 && e > .12;
		r.push([
			-.42 + e * .84,
			Math.max(-.36, Math.min(.34, i)),
			a ? Y : X,
			a ? 1 : n * 2 - 1
		]);
	}
	else if (e === "split") for (let e = 0; e < q; e++) {
		let n = e % 100 < 42, i = n ? -.22 : .22, a = t() * J, o = t() ** .62 * (n ? .2 : .23);
		r.push([
			Math.cos(a) * o * 1.55,
			i + Math.sin(a) * o * .9,
			n ? Y : X,
			n ? 1 : t() * 2 - 1
		]);
	}
	else if (e === "enroll") {
		let e = Math.round(q * .34), t = Math.round(q * .34);
		for (let t = 0; t < e; t++) {
			let e = t / 339;
			r.push([
				-.42 + e * .84,
				.3 - .52 / (1 + Math.exp(-(e - .46) / .155)),
				Y,
				1
			]);
		}
		for (let e = 0; e < t; e++) {
			let t = e / 339;
			r.push([
				-.42 + t * .84,
				.3 - .4 / (1 + Math.exp(-(t - .58) / .185)),
				X,
				.1
			]);
		}
		for (let e = 0; e < 13; e++) {
			let t = e / 13, n = .34 - e * .006;
			for (let e = 0; e < 25; e++) r.push([
				-.42 + (t + e / 25 * (1 / 13)) * .84,
				n,
				Z,
				-.7
			]);
		}
	} else if (e === "fan") {
		let e = Math.ceil(q / 26);
		for (let i = 0; i < 26; i++) {
			let a = i === 0 ? 0 : n(), o = 2 + t() * 4, s = t() * J, c = i / 25 * 2 - 1;
			for (let t = 0; t < e; t++) {
				let e = t / 38, n = e * (.15 * a + .1 * Math.sin(o * e + s));
				r.push([
					-.43 + e * .86,
					Math.max(-.34, Math.min(.34, .18 * e - .07 + n)),
					i === 0 ? Y : X,
					i === 0 ? 1 : c
				]);
			}
		}
	} else {
		let e = Math.round(q * .17), t = Math.round(q * .46);
		for (let t = 0; t < e; t++) {
			let n = .062 * Math.sqrt((t + .5) / e), i = t * 2.39996;
			r.push([
				Math.cos(i) * n,
				Math.sin(i) * n,
				Y,
				1
			]);
		}
		let n = Math.round(t / 6);
		for (let e = 0; e < 6; e++) {
			let t = -Math.PI / 2 + J / 6 * e, i = Math.cos(t) * .33, a = Math.sin(t) * .33;
			for (let e = 0; e < n; e++) {
				let t = .16 + e / n * .84;
				r.push([
					i * t,
					a * t,
					X,
					1 - t * 1.4
				]);
			}
			for (let t = 0; t < 61; t++) {
				let n = .045 * Math.sqrt((t + .5) / 61), o = t * 2.39996;
				r.push([
					i + Math.cos(o) * n,
					a + Math.sin(o) * n,
					e % 2 ? Z : Q,
					-.2
				]);
			}
		}
	}
	for (; r.length < q;) r.push(r[r.length - 1] || [
		0,
		0,
		X,
		0
	]);
	return r.length = q, W(r).sort((e, t) => e[0] - t[0] || e[1] - t[1]);
}
function U(e, t) {
	let n = [...e].sort((e, t) => e - t);
	return n[Math.max(0, Math.min(n.length - 1, Math.round(t * (n.length - 1))))];
}
function W(e) {
	let t = e.map((e) => e[0]), n = e.map((e) => e[1]), r = U(t, pe), i = U(t, .99), a = U(n, pe), o = U(n, .99), s = Math.min(de / Math.max(i - r, 1e-6), fe / Math.max(o - a, 1e-6)), c = (r + i) / 2, l = (a + o) / 2;
	return e.map((e) => [
		(e[0] - c) * s,
		(e[1] - l) * s,
		e[2],
		e[3]
	]);
}
function G(e) {
	if (e.dataset.pvReady) return;
	let t = e.closest("section") || document, n = t.querySelector("[data-pv=\"platform-tabs\"]"), r = t.querySelector("#dm-panels"), i = r ? [...r.querySelectorAll(".dm-panel[data-panel]")] : [];
	if (!n || !i.length) return;
	e.dataset.pvReady = "1", B();
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
	let l = c.getContext("2d"), u = {}, d = (e) => u[e] || (u[e] = H(e)), f, p, m = 1, h = 0, g = 0, _ = 0, v = 0, y = 0, b = "";
	function x() {
		let e = $(m), t = Array(q);
		for (let n = 0; n < q; n++) {
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
		let e = $(m), t = Math.min(g, _) * 1.18, n = g / 2, r = _ / 2, i = a ? 0 : Math.sin(h * .4) * .009, o = b === "conductor" && m >= 1 && !a;
		for (let a = 0; a < q; a++) {
			let s = f[a], c = p[a], u = s[3] + (c[3] - s[3]) * e, d = s[0] + (c[0] - s[0]) * e + (v * .024 + i) * u, m = s[1] + (c[1] - s[1]) * e + y * .018 * u, g = e < .5 ? s[2] : c[2], _ = (u + 1) / 2, b = .95 + _ * .95, x = g === Y ? .96 : .3 + _ * .36;
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
			l.beginPath(), l.arc(n + d * t, r + m * t, b, 0, J), l.fillStyle = `rgba(${g[0]},${g[1]},${g[2]},${x.toFixed(3)})`, l.fill();
		}
	}
	let T = -1;
	function E(e, t) {
		e !== T && (T = e, s.forEach((t, n) => {
			let r = n === e;
			t.tab.setAttribute("aria-selected", r ? "true" : "false"), t.tab.tabIndex = r ? 0 : -1, t.panel.classList.toggle("is-active", r);
		}), S(K[s[e].key] || "fan", t));
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
var K, le, q, J, Y, X, Z, Q, ue, $, de, fe, pe, me = e((() => {
	K = {
		pursue: "frontier",
		benefits: "split",
		run: "enroll",
		design: "fan",
		connect: "conductor"
	}, le = "\n[data-pv=\"platform-tabs\"]{ display:grid; grid-template-columns:repeat(5,minmax(0,1fr));\n  border-top:1px solid #2A2450; margin:18px 0 52px; }\n@media (max-width:1040px){ [data-pv=\"platform-tabs\"]{ grid-template-columns:repeat(3,minmax(0,1fr)); } }\n@media (max-width:640px){ [data-pv=\"platform-tabs\"]{ grid-template-columns:repeat(2,minmax(0,1fr)); } }\n.pv-tab{ appearance:none; text-align:left; cursor:pointer; width:100%; padding:20px 18px 20px 0;\n  border:0; border-top:1px solid transparent; margin-top:-1px; border-radius:0; background:transparent;\n  color:inherit; font:inherit; transition:border-color .3s ease; }\n.pv-tab_q{ display:block; font-size:11px; line-height:1.4; letter-spacing:.08em; text-transform:uppercase;\n  color:#8F8CB5; margin-bottom:8px; min-height:2.8em; transition:color .3s ease; }\n.pv-tab_n{ display:block; font-size:16px; letter-spacing:-.01em; color:#8B87B4; transition:color .3s ease; }\n.pv-tab:hover .pv-tab_n{ color:#F4F4F4; }\n.pv-tab[aria-selected=\"true\"]{ border-top-color:#E2C70A; }\n.pv-tab[aria-selected=\"true\"] .pv-tab_q{ color:#E2C70A; }\n.pv-tab[aria-selected=\"true\"] .pv-tab_n{ color:#F4F4F4; }\n.pv-tab:focus-visible{ outline:2px solid #E2C70A; outline-offset:-2px; }\n\n[data-pv=\"platform-hub\"]{ position:relative; min-height:440px; }\n[data-pv=\"platform-hub\"] canvas{ position:absolute; inset:-6% -14%; width:128%; height:112%; pointer-events:none; }\n@media (max-width:900px){ [data-pv=\"platform-hub\"]{ min-height:320px; } }\n\n/* les panneaux non actifs restent cachés même si le CSS de la page change */\n#dm-panels .dm-panel:not(.is-active){ display:none; }\n#dm-panels .dm-panel.is-active{ animation:pvPanelIn .35s ease both; }\n@keyframes pvPanelIn{ from{ opacity:0; transform:translateY(10px); } to{ opacity:1; transform:none; } }\n@media (prefers-reduced-motion:reduce){ #dm-panels .dm-panel.is-active{ animation:none; } .pv-tab, .pv-tab *{ transition:none; } }", q = 1e3, J = Math.PI * 2, Y = [
		226,
		199,
		10
	], X = [
		146,
		138,
		205
	], Z = [
		120,
		168,
		224
	], Q = [
		127,
		232,
		207
	], ue = [
		"frontier",
		"split",
		"enroll",
		"fan",
		"conductor"
	], $ = (e) => e < .5 ? 4 * e * e * e : 1 - (-2 * e + 2) ** 3 / 2, de = .88, fe = .68, pe = .01;
})), he = /* @__PURE__ */ t((() => {
	g(), z(), me(), document.querySelectorAll("[data-pv=\"gantt\"]").forEach(n), document.querySelectorAll("[data-pv=\"hero-homepage\"]").forEach(x), document.querySelectorAll("[data-pv=\"platform-hub\"]").forEach(G);
}));
//#endregion
export default he();
