import { n as e, t } from "./rolldown-runtime-wf392T_D.mjs";
//#region src/line-field/css.js
function n() {
	if (document.getElementById("pv-layers-css")) return;
	let e = document.createElement("style");
	e.id = "pv-layers-css", e.textContent = r, document.head.appendChild(e);
}
var r, i = e((() => {
	r = "\n[data-line-field]{ isolation:isolate; }\n.pv-layer.pv-layer.pv-layer{ position:absolute; inset:0; pointer-events:none; }\n.pv-lf.pv-layer.pv-layer{ z-index:-2; width:100%; height:100%; display:block; }\n.pv-bg.pv-layer.pv-layer{ z-index:-3; overflow:hidden; }\n.pv-grain.pv-layer.pv-layer{ z-index:-1; background-image:var(--pv-grain); background-size:180px 180px;\n  mix-blend-mode:soft-light; opacity:.18; }\n\n/* JS actif : le fond devient les nappes injectées ; le fallback (pseudo-éléments de l'embed global) est coupé */\n.pv-live[data-bg='purple-gradient']{ position:relative; isolation:isolate; background:#141238; }\n.pv-live[data-bg='purple-gradient']::before, .pv-live[data-bg='purple-gradient']::after{ display:none; }\n\n/* Gradient flottant : les deux radiaux de la charte deviennent des nappes qui dérivent, tournent et respirent.\n   Transform uniquement : composité GPU, aucun repaint. La troisième nappe, mauve très faible, casse la symétrie. */\n.pv-blob{ position:absolute; display:block; border-radius:50%; will-change:transform; }\n.pv-b1{ width:95%; height:120%; left:42%; top:-48%;\n  background:radial-gradient(closest-side, rgba(126,91,178,.50), rgba(126,91,178,.18) 55%, rgba(126,91,178,0));\n  animation:pv-f1 46s ease-in-out infinite; }\n.pv-b2{ width:100%; height:115%; left:-36%; top:38%;\n  background:radial-gradient(closest-side, rgba(65,34,125,.58), rgba(65,34,125,.2) 55%, rgba(65,34,125,0));\n  animation:pv-f2 58s ease-in-out infinite; }\n.pv-b3{ width:60%; height:70%; left:18%; top:10%;\n  background:radial-gradient(closest-side, rgba(146,138,205,.12), rgba(146,138,205,0));\n  animation:pv-f3 39s ease-in-out infinite; }\n@keyframes pv-f1{ 0%,100%{ transform:translate(0,0) rotate(0) scale(1,1); }\n  33%{ transform:translate(-9%,7%) rotate(14deg) scale(1.12,.9); }\n  66%{ transform:translate(5%,12%) rotate(-8deg) scale(.92,1.08); } }\n@keyframes pv-f2{ 0%,100%{ transform:translate(0,0) rotate(0) scale(1,1); }\n  40%{ transform:translate(11%,-8%) rotate(-12deg) scale(.9,1.12); }\n  75%{ transform:translate(4%,-14%) rotate(9deg) scale(1.1,.94); } }\n@keyframes pv-f3{ 0%,100%{ transform:translate(0,0) scale(1); }\n  50%{ transform:translate(22%,18%) scale(1.25); } }\n@media (prefers-reduced-motion:reduce){ .pv-blob{ animation:none; } }\n";
}));
//#endregion
//#region src/floating-bg.js
function a() {
	let e = document.createElement("canvas");
	e.width = e.height = 180;
	let t = e.getContext("2d"), n = t.createImageData(180, 180);
	for (let e = 0; e < n.data.length; e += 4) {
		let t = 128 + (Math.random() - .5) * 110 | 0;
		n.data[e] = n.data[e + 1] = n.data[e + 2] = t, n.data[e + 3] = 255;
	}
	return t.putImageData(n, 0, 0), e.toDataURL();
}
function o(e = document) {
	let t = [...e.querySelectorAll("[data-bg='purple-gradient']")].filter((e) => !e.dataset.pvBg);
	return t.length ? (n(), document.documentElement.style.getPropertyValue("--pv-grain") || document.documentElement.style.setProperty("--pv-grain", "url(" + a() + ")"), t.map((e, t) => {
		e.dataset.pvBg = "1";
		let n = document.createElement("div");
		n.className = "pv-bg pv-layer", n.setAttribute("aria-hidden", "true"), n.innerHTML = "<i class=\"pv-blob pv-b1\"></i><i class=\"pv-blob pv-b2\"></i><i class=\"pv-blob pv-b3\"></i>", n.querySelectorAll(".pv-blob").forEach((e, n) => {
			e.style.animationDelay = -(t * 17 + n * 11) + "s";
		});
		let r = document.createElement("div");
		return r.className = "pv-grain pv-layer", r.setAttribute("aria-hidden", "true"), e.prepend(n), e.append(r), e.classList.add("pv-live"), function() {
			n.remove(), r.remove(), e.classList.remove("pv-live"), delete e.dataset.pvBg;
		};
	})) : [];
}
var s = e((() => {
	i();
}));
//#endregion
//#region src/line-field/core.js
function c(e) {
	let t = Math.max(0, Math.min((e - h) / 1e3, .05));
	h = e;
	let n = !1;
	for (let e of p) e.vis && (n = !0, e.S.W && e.tick(t));
	m = n ? requestAnimationFrame(c) : 0;
}
function l() {
	m || f || (h = performance.now(), m = requestAnimationFrame(c));
}
function u(e, t) {
	n(), getComputedStyle(e).position === "static" && (e.style.position = "relative");
	let r = document.createElement("canvas");
	r.className = "pv-lf pv-layer", r.setAttribute("aria-hidden", "true"), e.prepend(r);
	let i = r.getContext("2d"), a = document.createElement("canvas"), o = a.getContext("2d"), s = {
		x: 0,
		y: 0,
		tx: 0,
		ty: 0,
		a: 0,
		in: !1
	}, c = {
		W: 0,
		H: 0,
		dpr: 1,
		m: s,
		nx: 0,
		ny: 0,
		fade: +!!f,
		glow: (e, t, n = 240, r = 90) => {
			if (s.a < .01) return 0;
			let i = (e - s.x) / n, a = (t - s.y) / r;
			return s.a * Math.exp(-(i * i + a * a));
		}
	}, u = t(c), m = f ? 9 : 0, h = [], g = new ResizeObserver(() => b());
	function _() {
		let t = e.dataset.lineCalm || d, n = e.getBoundingClientRect(), r = n.width * n.height, i = [...e.querySelectorAll(t), ...e.querySelectorAll("[data-line-calm-item]")].filter((e) => !e.classList.contains("pv-layer")).filter((e) => {
			let t = e.getBoundingClientRect();
			return t.width > 0 && t.height > 0 && t.width * t.height < r * .6;
		});
		i = [...new Set(i)], i = i.filter((e) => !i.some((t) => t !== e && t.contains(e))), g.disconnect(), i.forEach((e) => g.observe(e)), h = i;
	}
	function v() {
		a.width = r.width, a.height = r.height, o.setTransform(c.dpr, 0, 0, c.dpr, 0, 0), o.globalCompositeOperation = "source-over", o.fillStyle = "#fff", o.fillRect(0, 0, c.W, c.H), o.globalCompositeOperation = "destination-out";
		let t = e.getBoundingClientRect();
		o.fillStyle = "rgba(0,0,0," + (1 - .21999999999999997 ** (1 / 16)) + ")", h.forEach((e) => {
			let n = e.getBoundingClientRect(), r = n.left - t.left, i = n.top - t.top;
			if (n.width && n.height) for (let e = 0; e < 16; e++) {
				let t = 90 * (1 - e / 16);
				o.beginPath(), o.roundRect ? o.roundRect(r - t, i - t, n.width + 2 * t, n.height + 2 * t, t + 8) : o.rect(r - t, i - t, n.width + 2 * t, n.height + 2 * t), o.fill();
			}
		});
	}
	let y = 0;
	function b() {
		y ||= requestAnimationFrame(() => {
			y = 0, c.W && (v(), f && x(0));
		});
	}
	function x(e) {
		let t = 1 - Math.exp(-e * 8);
		s.x += (s.tx - s.x) * t, s.y += (s.ty - s.y) * t, s.a += (+!!s.in - s.a) * (1 - Math.exp(-e * 4)), c.nx = (s.x / c.W - .5) * 2 * s.a, c.ny = (s.y / c.H - .5) * 2 * s.a, c.fade < 1 && (c.fade = Math.min(1, c.fade + e / 1.2)), i.setTransform(c.dpr, 0, 0, c.dpr, 0, 0), i.globalCompositeOperation = "source-over", i.globalAlpha = 1, i.clearRect(0, 0, c.W, c.H), i.globalAlpha = c.fade, u.draw(i, m, e), i.globalAlpha = 1, i.setTransform(1, 0, 0, 1, 0, 0), i.globalCompositeOperation = "destination-in", i.drawImage(a, 0, 0), i.globalCompositeOperation = "source-over";
	}
	function S() {
		c.dpr = Math.min(devicePixelRatio || 1, 2);
		let t = e.getBoundingClientRect();
		c.W = t.width, c.H = t.height, c.W && c.H && (r.width = Math.max(1, Math.round(c.W * c.dpr)), r.height = Math.max(1, Math.round(c.H * c.dpr)), s.in || (s.x = s.tx = c.W / 2, s.y = s.ty = c.H / 2), _(), v(), u.resize(m), f ? x(0) : T.vis && l());
	}
	let C = (t) => {
		let n = e.getBoundingClientRect();
		s.tx = t.clientX - n.left, s.ty = t.clientY - n.top, s.a < .02 && (s.x = s.tx, s.y = s.ty), s.in = !0;
	}, w = () => {
		s.in = !1;
	};
	e.addEventListener("pointermove", C, { passive: !0 }), e.addEventListener("pointerleave", w, { passive: !0 });
	let T = {
		S: c,
		vis: !1,
		tick(e) {
			m += e, x(e);
		}
	};
	p.add(T);
	let E = new IntersectionObserver(([e]) => {
		T.vis = e.isIntersecting, T.vis && l();
	});
	E.observe(e);
	let D = new ResizeObserver(S);
	return D.observe(e), document.fonts && document.fonts.ready.then(b), function() {
		p.delete(T), E.disconnect(), D.disconnect(), g.disconnect(), y && cancelAnimationFrame(y), e.removeEventListener("pointermove", C), e.removeEventListener("pointerleave", w), r.remove(), delete e.dataset.pvLine;
	};
}
var d, f, p, m, h, g = e((() => {
	i(), d = [
		"h1",
		"h2",
		"h3",
		"h4",
		"h5",
		"h6",
		"p",
		".w-richtext",
		".w-button",
		".button",
		"[class*=\"text-size-\"]",
		"[class*=\"section-top\"]",
		"[class*=\"card\"]",
		"[class*=\"ev-case\"]",
		"[class*=\"glance-stat\"]"
	].join(","), f = matchMedia("(prefers-reduced-motion: reduce)").matches, p = /* @__PURE__ */ new Set(), m = 0, h = 0;
})), _, v, y, b, x, S, C = e((() => {
	_ = (e, t, n) => Math.max(t, Math.min(n, e)), v = (e, t) => e + (t - e) * Math.random(), y = (e) => e * e, b = (e) => e >= 1 ? 1 : 1 - 2 ** (-10 * e), x = () => Math.sqrt(-2 * Math.log(Math.random() + 1e-9)) * Math.cos(6.2832 * Math.random()), S = {
		mau: "146,138,205",
		blu: "120,168,224",
		tea: "127,232,207"
	};
}));
//#endregion
//#region src/line-field/textures/swimmer.js
function w(e) {
	let t = [
		{
			p: 7,
			a: .06,
			w: .6,
			z: .25,
			spd: .6
		},
		{
			p: 13,
			a: .12,
			w: 1,
			z: .6,
			spd: .8
		},
		{
			p: 26,
			a: .24,
			w: 1.4,
			z: 1,
			spd: 1
		}
	], n = [];
	function r(e, t, n) {
		e.x0 = v(-.08, .86), e.len = v(.12, .5), e.g = v(2.6, 5) / e.pl.spd, e.h = v(3, 8), e.r = e.g * .85, e.t0 = n ? t - v(-3, e.g + e.h) : t + v(.4, 3), e.col = Math.random() < .16 ? S.blu : S.mau, e.mk = [];
		let r = Math.floor(v(0, 3));
		for (let t = 0; t < r; t++) e.mk.push({
			f: v(.2, .9),
			c: Math.random() < .6 ? S.tea : S.blu
		});
		e.end = e.pl.z === 1 && Math.random() < .4;
	}
	return {
		resize(i) {
			n = [], t.forEach((t) => {
				for (let a = t.p / 2; a < e.H + t.p; a += t.p) {
					let e = {
						pl: t,
						y: a
					};
					r(e, i, !0), n.push(e);
				}
			});
		},
		draw(t, i) {
			let a = e.m;
			for (let o of n) {
				let n = o.pl, s = i - o.t0;
				if (s > o.g + o.h + o.r) {
					r(o, i, !1);
					continue;
				}
				if (s < 0) continue;
				let c, l;
				s < o.g ? (c = b(s / o.g), l = 0) : s < o.g + o.h ? (c = 1, l = 0) : (c = 1, l = b((s - o.g - o.h) / o.r));
				let u = e.nx * 14 * n.z, d = e.ny * 6 * n.z, f = (o.x0 + o.len * l) * e.W + u, p = (o.x0 + o.len * c) * e.W + u, m = o.y + d;
				if (p - f < .5) continue;
				let h = e.glow(_(a.x, f, p), m), g = Math.min(.6, n.a * (1 + 2 * h * n.z));
				t.fillStyle = "rgba(" + o.col + "," + g + ")", t.fillRect(f, m - n.w / 2, p - f, n.w);
				for (let r of o.mk) {
					if (c < r.f || l > r.f) continue;
					let i = b(_((c - r.f) / .05, 0, 1)), a = (o.x0 + o.len * r.f) * e.W + u, s = (2 + 4 * n.z) * i;
					t.fillStyle = "rgba(" + r.c + "," + Math.min(.85, g * 2.4) + ")", t.fillRect(a - .5, m - s, 1, s * 2);
				}
				o.end && c >= 1 && l < 1 && (t.fillStyle = "rgba(" + S.mau + "," + Math.min(.8, g * 2) + ")", t.fillRect(p - 1.5, m - 1.5, 3, 3));
			}
		}
	};
}
var T = e((() => {
	C();
}));
//#endregion
//#region src/line-field/textures/matrix.js
function E(e) {
	let t = [], n = 0, r = 0, i = 0;
	function a(e, t, r) {
		e.start = Math.floor(v(0, .5) * n);
		let i = n - e.start;
		e.stop = Math.random() < .14 ? e.start + Math.floor(v(.3, .8) * i) : n, e.done = r ? Math.floor(v(0, e.stop - e.start)) : 0, e.born = new Float32Array(n).fill(-99), e.kind = new Uint8Array(n);
		for (let t = 0; t < n; t++) {
			let n = Math.random();
			e.kind[t] = n < .05 ? 1 : n < .09 ? 2 : 0;
		}
		e.next = t + v(.5, 5), e.endAt = -1, e.t0 = r ? -99 : t;
	}
	return {
		resize(o) {
			n = Math.ceil(e.W / 18) + 1;
			let s = Math.ceil(e.H / 18) + 1;
			r = (e.W - (n - 1) * 18) / 2, i = (e.H - (s - 1) * 18) / 2, t = [];
			for (let e = 0; e < s; e++) {
				let e = {};
				a(e, o, !0), t.push(e);
			}
		},
		draw(o, s) {
			let c = e.m, l = e.nx * 5, u = e.ny * 3;
			t.forEach((e, t) => {
				e.start + e.done < e.stop && s >= e.next && (e.born[e.start + e.done] = s, e.done++, e.next = s + v(1.5, 5.5)), e.start + e.done >= e.stop && e.endAt < 0 && (e.endAt = s + v(4, 9));
				let d = _((s - e.t0) / 1.5, 0, 1);
				e.endAt > 0 && (s > e.endAt + 1.5 ? (a(e, s, !1), d = 0) : s > e.endAt && (d = 1 - (s - e.endAt) / 1.5));
				let f = i + t * 18 + u, p = c.a * Math.exp(-y((f - c.y) / 18));
				for (let t = 0; t < n; t++) {
					let i = r + t * 18 + l, a = t - e.start, u = c.a * Math.exp(-y((i - c.x) / 18)), m = Math.max(p * Math.exp(-y((i - c.x) / 360)), u * Math.exp(-y((f - c.y) / 240))), h = S.mau, g, v;
					if (a < 0 || t >= e.stop) g = .03, v = .7;
					else if (a < e.done) {
						if (e.kind[t] === 1) g = .03, v = .7;
						else {
							let n = b(_((s - e.born[t]) / .6, 0, 1));
							h = e.kind[t] === 2 ? S.tea : S.mau, g = (.07 + .15 * n) * d + .03 * (1 - d), v = .8 + .7 * n * d;
						}
					} else g = .03 + .04 * d, v = .8;
					t === e.stop - 1 && e.stop < n && a < e.done && (h = S.blu), g = Math.min(.6, g + .2 * m), o.fillStyle = "rgba(" + h + "," + g + ")", o.beginPath(), o.arc(i, f, v, 0, 6.2832), o.fill();
				}
			});
		}
	};
}
var D = e((() => {
	C();
}));
//#endregion
//#region src/line-field/textures/km.js
function O(e) {
	let t = [];
	function n(e, t, n) {
		e.y0 = e.base + v(-8, 8), e.D = v(40, 150);
		let r = v(.6, 2.6), i = Math.floor(v(10, 26));
		e.ev = [];
		for (let t = 0; t < i; t++) e.ev.push(Math.random());
		e.ev.sort((e, t) => e - t), e.ys = e.ev.map((t) => e.y0 + e.D * (1 - Math.exp(-r * t)) / (1 - Math.exp(-r))), e.cs = [];
		let a = Math.floor(v(5, 13));
		for (let t = 0; t < a; t++) e.cs.push(Math.random());
		e.z = Math.random() < .3 ? 1 : .45, e.col = Math.random() < .2 ? S.blu : S.mau, e.g = v(5, 8), e.h = v(4, 9), e.f = 1.6, e.t0 = n ? t - v(-2, e.g + e.h) : t + v(.5, 3);
	}
	let r = (t) => (-.02 + 1.04 * t) * e.W;
	function i(e, t) {
		let n = e.y0;
		for (let r = 0; r < e.ev.length && e.ev[r] <= t; r++) n = e.ys[r];
		return n;
	}
	function a(e, t, n, a, o) {
		e.beginPath();
		let s = t.y0 + o;
		e.moveTo(r(0) + a, s);
		for (let i = 0; i < t.ev.length && t.ev[i] <= n; i++) {
			let n = r(t.ev[i]) + a;
			e.lineTo(n, s), s = t.ys[i] + o, e.lineTo(n, s);
		}
		e.lineTo(r(n) + a, s);
		let c = t.z === 1 ? 3 : 2;
		for (let s of t.cs) {
			if (s > n) continue;
			let l = r(s) + a, u = i(t, s) + o;
			e.moveTo(l, u - c), e.lineTo(l, u + c);
		}
	}
	return {
		resize(r) {
			t = [];
			let i = Math.ceil(e.H / 30) + 3;
			for (let a = 0; a < i; a++) {
				let o = { base: -60 + a * (e.H + 60) / (i - 1) };
				n(o, r, !0), t.push(o);
			}
		},
		draw(r, i) {
			let o = e.m, s = [];
			for (let o of t) {
				let t = i - o.t0;
				if (t > o.g + o.h + o.f) {
					n(o, i, !1);
					continue;
				}
				if (t < 0) continue;
				let c = b(_(t / o.g, 0, 1)), l = t > o.g + o.h ? 1 - (t - o.g - o.h) / o.f : 1, u = e.nx * 12 * o.z, d = e.ny * 6 * o.z;
				r.lineWidth = o.z === 1 ? 1.1 : .7, r.strokeStyle = "rgba(" + o.col + "," + (o.z === 1 ? .2 : .09) * l + ")", a(r, o, c, u, d), r.stroke(), s.push([
					o,
					c,
					u,
					d,
					l
				]);
			}
			if (o.a > .01) {
				let t = r.createRadialGradient(o.x, o.y, 0, o.x, o.y, 220);
				t.addColorStop(0, "rgba(" + S.mau + "," + .32 * o.a + ")"), t.addColorStop(1, "rgba(" + S.mau + ",0)"), r.strokeStyle = t;
				for (let [t, n, i, o, c] of s) r.lineWidth = t.z === 1 ? 1.1 : .7, r.globalAlpha = e.fade * c, a(r, t, n, i, o), r.stroke();
				r.globalAlpha = e.fade;
			}
		}
	};
}
var k = e((() => {
	C();
}));
//#endregion
//#region src/line-field/textures/forest.js
function A(e) {
	let t = [], n = [];
	function r(e, t) {
		e.fe = e.e, e.fh = e.h, e.te = x() * .15 + .04, e.th = v(.035, .15), e.t0 = t, e.next = t + v(7, 16);
	}
	return {
		resize(i) {
			t = [], n = [];
			let a = Math.max(2, Math.round(e.W / 330)), o = e.W / a;
			for (let s = 0; s < a; s++) {
				let a = {
					pw: o,
					nx: s * o + o * .42
				};
				n.push(a);
				for (let n = 11; n < e.H + 22; n += 22) {
					let e = {
						P: a,
						y: n + s % 2 * 22 / 2,
						w: v(.3, 1),
						z: Math.random() < .35 ? 1 : .5,
						dia: Math.random() < .07
					};
					e.e = x() * .15 + .04, e.h = v(.035, .15), r(e, i - 3), e.next = i + v(0, 14), t.push(e);
				}
			}
		},
		draw(i, a) {
			i.strokeStyle = "rgba(" + S.mau + ",.08)", i.lineWidth = 1, i.setLineDash([2, 4]), i.beginPath();
			for (let t of n) {
				let n = Math.round(t.nx + e.nx * 6) + .5;
				i.moveTo(n, 0), i.lineTo(n, e.H);
			}
			i.stroke(), i.setLineDash([]);
			for (let n of t) {
				a >= n.next && r(n, a);
				let t = b(_((a - n.t0) / 2.4, 0, 1));
				n.e = n.fe + (n.te - n.fe) * t, n.h = n.fh + (n.th - n.fh) * t;
				let o = e.nx * 10 * n.z, s = e.ny * 5 * n.z, c = n.P.nx + n.e * n.P.pw + o, l = n.y + s, u = n.h * n.P.pw, d = e.glow(c, l, 220, 70), f = Math.min(.6, (n.z === 1 ? .2 : .1) * (1 + 2 * d));
				if (n.dia) i.fillStyle = "rgba(" + S.blu + "," + Math.min(.7, f * 1.4) + ")", i.beginPath(), i.moveTo(c - u, l), i.lineTo(c, l - 3.5), i.lineTo(c + u, l), i.lineTo(c, l + 3.5), i.fill();
				else {
					i.fillStyle = "rgba(" + S.mau + "," + f + ")", i.fillRect(c - u, l - .5, u * 2, 1);
					let e = (1.5 + 3.5 * n.w) * (n.z === 1 ? 1 : .7);
					i.fillStyle = "rgba(" + S.mau + "," + Math.min(.75, f * 1.8) + ")", i.fillRect(c - e / 2, l - e / 2, e, e);
				}
			}
		}
	};
}
var j = e((() => {
	C();
}));
//#endregion
//#region src/line-field/textures/waterfall.js
function M(e) {
	let t = 0, n = [], r = 0, i = 0, a = 0;
	function o(e) {
		n = [];
		for (let e = 0; e < t; e++) n.push(_(x() * 38 - 8, -100, 120));
		n.sort((e, t) => t - e), r = e;
	}
	return {
		resize(n) {
			t = Math.ceil(e.W / 5), a = (e.W - t * 5) / 2, i = e.H * .5, o(n - 5);
		},
		draw(s, c) {
			let l = c - r;
			l > 17 && (o(c), l = 0);
			let u = e.H * .42 / 100, d = e.nx * 8, f = e.ny * 4, p = i + f;
			e.m, s.strokeStyle = "rgba(" + S.mau + ",.09)", s.lineWidth = 1, s.setLineDash([2, 4]), s.beginPath();
			for (let t of [20, -30]) {
				let n = Math.round(p - t * u) + .5;
				s.moveTo(0, n), s.lineTo(e.W, n);
			}
			s.stroke(), s.setLineDash([]), s.fillStyle = "rgba(" + S.mau + ",.12)", s.fillRect(0, Math.round(p), e.W, 1);
			for (let r = 0; r < t; r++) {
				let i = r / t * 1.4, o = b(_((l - i) / 1.6, 0, 1)) * (1 - b(_((l - 13.5 - i * .6) / 1.6, 0, 1)));
				if (o <= .002) continue;
				let c = n[r] * u * o, f = a + r * 5 + d, m = n[r] <= -30, h = e.glow(f + 3 / 2, p - c / 2, 200, 140), g = Math.min(.6, (m ? .2 : n[r] >= 20 ? .15 : .09) * (1 + 2 * h));
				s.fillStyle = "rgba(" + (m ? S.blu : S.mau) + "," + g + ")", c > 0 ? s.fillRect(f, p - c, 3, c) : s.fillRect(f, p, 3, -c);
			}
		}
	};
}
var N = e((() => {
	C();
}));
//#endregion
//#region src/line-field/textures/volcano.js
function P(e) {
	let t = 3.2, n = [], r = [], i = 0, a = null, o = null;
	function s() {
		let e = [];
		for (let t = 0; t < 900; t++) {
			let t = x() * 1.1;
			e.push([t, Math.min(9.6, y(t) * v(.5, 1.7) + Math.abs(x()) * .5)]);
		}
		return e.sort((e, t) => e[0] - t[0]);
	}
	return {
		resize(e) {
			n = s(), r = s(), i = e - t, a = Float32Array.from({ length: 900 }, () => Math.random() * 6.2832), o = Float32Array.from({ length: 900 }, () => Math.random() < .3 ? 1 : .45);
		},
		draw(c, l) {
			let u = l - i;
			u > 14 && (n = r, r = s(), i = l, u = 0);
			let d = b(_(u / t, 0, 1)), f = (t) => e.W / 2 + t / 4.2 * e.W / 2, p = (t) => e.H * .95 - t / 10 * e.H * .9;
			c.strokeStyle = "rgba(" + S.mau + ",.08)", c.lineWidth = 1, c.setLineDash([2, 4]), c.beginPath();
			for (let t of [-1, 1]) {
				let n = Math.round(f(t) + e.nx * 6) + .5;
				c.moveTo(n, 0), c.lineTo(n, e.H);
			}
			let m = Math.round(p(1.3) + e.ny * 3) + .5;
			c.moveTo(0, m), c.lineTo(e.W, m), c.stroke(), c.setLineDash([]);
			for (let t = 0; t < 900; t++) {
				let i = n[t][0] + (r[t][0] - n[t][0]) * d, s = n[t][1] + (r[t][1] - n[t][1]) * d, u = o[t], m = f(i) + e.nx * 12 * u + Math.sin(l * .3 + a[t]) * 1.5, h = p(s) + e.ny * 6 * u + Math.cos(l * .27 + a[t]) * 1.5, g = Math.abs(i) > 1 && s > 1.3, _ = e.glow(m, h, 160, 120), v = Math.min(.7, (g ? .32 : .11) * (u === 1 ? 1 : .6) * (1 + 2 * _));
				c.fillStyle = "rgba(" + (g ? i > 0 ? S.tea : S.blu : S.mau) + "," + v + ")", c.beginPath(), c.arc(m, h, u === 1 ? 1.5 : 1.05, 0, 6.2832), c.fill();
			}
		}
	};
}
var F = e((() => {
	C();
}));
//#endregion
//#region src/line-field/index.js
function I(e = document) {
	let t = [...e.querySelectorAll("[data-line-field]")].filter((e) => !e.dataset.pvLine), n = (e) => (e.dataset.lineField || "").trim().toLowerCase(), r = new Set(t.map(n).filter((e) => L[e])), i = Object.keys(L).filter((e) => !r.has(e));
	i.length || (i = Object.keys(L));
	let a = 0;
	return t.map((e) => {
		let t = n(e);
		return L[t] || (t && t !== "random" && console.warn(`[line-field] texture inconnue « ${t} », tirage à la place`, e), t = i[a++ % i.length]), e.dataset.pvLine = t, u(e, L[t]);
	});
}
var L, R = e((() => {
	g(), T(), D(), k(), j(), N(), F(), L = {
		swimmer: w,
		matrix: E,
		km: O,
		forest: A,
		waterfall: M,
		volcano: P
	};
})), z = /* @__PURE__ */ t((() => {
	s(), R(), o(), I();
}));
//#endregion
export default z();
