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
}));
//#endregion
//#region src/dark-bg.js
function z(e) {
	let t = (e) => {
		let t = parseInt(e.slice(1), 16);
		return [
			t >> 16 & 255,
			t >> 8 & 255,
			t & 255
		].map((e) => e.toFixed(1)).join(",");
	};
	return U.replace("%INK0%", t(e.ink0)).replace("%INK2%", t(e.ink2)).replace("%INDIGO%", t(e.indigo)).replace("%BLUE%", t(e.blue)).replace("%VIOLET%", t(e.violet)).replace("%SOFT%", t(e.soft));
}
function B(e, t) {
	t = Object.assign({
		speed: 1,
		scrollParallax: !0,
		grain: .07,
		blur: 1 / 12,
		palette: W.bonv
	}, t || {});
	let n = z(t.palette), r = !e;
	e ||= document.body;
	let i = document.createElement("div");
	i.setAttribute("aria-hidden", "true"), i.style.cssText = (r ? "position:fixed;inset:0;z-index:-1;" : "position:absolute;inset:0;z-index:0;") + "overflow:hidden;pointer-events:none;background:" + t.palette.ink0 + ";";
	let a = document.createElement("canvas"), o = document.createElement("div");
	o.style.cssText = "position:absolute;inset:0;mix-blend-mode:soft-light;opacity:" + t.grain + ";background-image:url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='256' height='256'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='256' height='256' filter='url(%23n)'/></svg>\");", i.appendChild(a), i.appendChild(o), !r && getComputedStyle(e).position === "static" && (e.style.position = "relative"), e.insertBefore(i, e.firstChild);
	let s = null, c, l, u;
	try {
		if (s = a.getContext("webgl", {
			antialias: !1,
			premultipliedAlpha: !1,
			preserveDrawingBuffer: !1
		}), s) {
			let e = (e, t) => {
				let n = s.createShader(e);
				if (s.shaderSource(n, t), s.compileShader(n), !s.getShaderParameter(n, s.COMPILE_STATUS)) throw Error(s.getShaderInfoLog(n));
				return n;
			}, t = s.createProgram();
			if (s.attachShader(t, e(s.VERTEX_SHADER, H)), s.attachShader(t, e(s.FRAGMENT_SHADER, n)), s.linkProgram(t), !s.getProgramParameter(t, s.LINK_STATUS)) throw Error(s.getProgramInfoLog(t));
			s.useProgram(t);
			let r = s.createBuffer();
			s.bindBuffer(s.ARRAY_BUFFER, r), s.bufferData(s.ARRAY_BUFFER, new Float32Array([
				-1,
				-1,
				3,
				-1,
				-1,
				3
			]), s.STATIC_DRAW);
			let i = s.getAttribLocation(t, "p");
			s.enableVertexAttribArray(i), s.vertexAttribPointer(i, 2, s.FLOAT, !1, 0, 0), c = s.getUniformLocation(t, "uRes"), l = s.getUniformLocation(t, "uT"), u = s.getUniformLocation(t, "uOff");
		}
	} catch (e) {
		console.warn("BonV background: WebGL off, CSS fallback.", e), s = null;
	}
	if (!s) return a.remove(), i.style.background = G, { destroy() {
		i.remove();
	} };
	function d() {
		let e = i.clientWidth || innerWidth, n = i.clientHeight || innerHeight, r = Math.max(8, Math.round(e / 16)), o = Math.max(8, Math.round(n / 16));
		(a.width !== r || a.height !== o) && (a.width = r, a.height = o);
		let s = Math.round(e * t.blur), c = s * 2;
		a.style.cssText = `position:absolute;left:${-c}px;top:${-c}px;width:${e + 2 * c}px;height:${n + 2 * c}px;filter:blur(${s}px);`;
	}
	d(), addEventListener("resize", d);
	let f = matchMedia("(prefers-reduced-motion: reduce)"), p = 0, m = performance.now(), h = 0;
	function g(e) {
		let n = (e - m) / 1e3 * t.speed + 20, r = t.scrollParallax ? Math.min(1, scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight)) : 0;
		s.viewport(0, 0, a.width, a.height), s.uniform2f(c, a.width, a.height), s.uniform1f(l, n), s.uniform2f(u, 0, r * .35), s.drawArrays(s.TRIANGLES, 0, 3);
	}
	function _(e) {
		p = requestAnimationFrame(_), !(e - h < 33) && (h = e, g(e));
	}
	let v = !0, y = null;
	function b() {
		cancelAnimationFrame(p), f.matches || document.hidden || !v ? g(performance.now()) : p = requestAnimationFrame(_);
	}
	return document.addEventListener("visibilitychange", b), f.addEventListener && f.addEventListener("change", b), t.scrollParallax && f.matches && addEventListener("scroll", () => g(performance.now()), { passive: !0 }), !r && "IntersectionObserver" in window && (y = new IntersectionObserver(([e]) => {
		v = e.isIntersecting, b();
	}), y.observe(e)), b(), { destroy() {
		cancelAnimationFrame(p), y && y.disconnect(), i.remove();
	} };
}
function V(e) {
	if (!e || e.dataset.pvBg) return null;
	e.dataset.pvBg = "1";
	let t = B(e, {
		palette: W.mid,
		scrollParallax: !1
	}), n = e.firstElementChild;
	return n && (n.style.zIndex = "-1", n.style.opacity = ".6", n.classList.add("pv-dark-layer")), e.style.isolation = "isolate", function() {
		t && t.destroy(), delete e.dataset.pvBg;
	};
}
var H, U, W, G, K = e((() => {
	H = "attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}", U = "precision highp float;\nuniform vec2 uRes;uniform float uT;uniform vec2 uOff;\nvec3 mod289(vec3 x){return x-floor(x*(1./289.))*289.;}\nvec2 mod289(vec2 x){return x-floor(x*(1./289.))*289.;}\nvec3 permute(vec3 x){return mod289(((x*34.)+1.)*x);}\nfloat snoise(vec2 v){const vec4 C=vec4(.211324865405187,.366025403784439,-.577350269189626,.024390243902439);\nvec2 i=floor(v+dot(v,C.yy));vec2 x0=v-i+dot(i,C.xx);vec2 i1=(x0.x>x0.y)?vec2(1.,0.):vec2(0.,1.);\nvec4 x12=x0.xyxy+C.xxzz;x12.xy-=i1;i=mod289(i);\nvec3 p=permute(permute(i.y+vec3(0.,i1.y,1.))+i.x+vec3(0.,i1.x,1.));\nvec3 m=max(.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.);m=m*m;m=m*m;\nvec3 x=2.*fract(p*C.www)-1.;vec3 h=abs(x)-.5;vec3 ox=floor(x+.5);vec3 a0=x-ox;\nm*=1.79284291400159-.85373472095314*(a0*a0+h*h);\nvec3 g;g.x=a0.x*x0.x+h.x*x0.y;g.yz=a0.yz*x12.xz+h.yz*x12.yw;return 130.*dot(m,g);}\nfloat fbm(vec2 p){float a=.5,s=0.;for(int i=0;i<2;i++){s+=a*snoise(p);p=p*1.8+vec2(1.7,9.2);a*=.4;}return s;}\nvec3 hex(float r,float g,float b){return vec3(r,g,b)/255.;}\nvoid main(){\nvec2 uv=gl_FragCoord.xy/uRes;uv.y=1.-uv.y;\nfloat asp=uRes.x/uRes.y;\nvec2 p=uv*vec2(asp,1.)*.32+uOff;\nfloat t=uT*.07;\nvec2 q=vec2(fbm(p*1.05+vec2(0.,t)),fbm(p*1.05+vec2(5.2,1.3)-t*.8));\nvec2 r=vec2(fbm(p*1.1+1.3*q+vec2(1.7,9.2)+t*.6),fbm(p*1.1+1.3*q+vec2(8.3,2.8)-t*.5));\nfloat n=fbm(p+1.4*r);\nvec3 ink0=hex(%INK0%),ink2=hex(%INK2%),indigo=hex(%INDIGO%),blue=hex(%BLUE%),violet=hex(%VIOLET%),soft=hex(%SOFT%);\nvec3 col=mix(ink0,ink2,smoothstep(-.45,.45,n));\ncol=mix(col,indigo,smoothstep(.0,.7,r.x+.2*n)*.45);\ncol=mix(col,violet,smoothstep(.05,.6,q.y+.25*r.y)*.38*(1.-.55*uv.x));\nvec2 L=vec2(.86+.05*sin(t*2.3),.1+.06*cos(t*1.7))-uOff*vec2(1.2,.9);\nfloat lr=length((uv-L)*vec2(asp,1.))+.35*n;\ncol=mix(col,blue,smoothstep(1.05,.1,lr)*.55);\ncol+=soft*smoothstep(.45,.0,lr)*.16;\nfloat v=length((uv-vec2(.55,.46))*vec2(1.25,1.));\ncol*=mix(1.,.3,smoothstep(.38,1.05,v));\ngl_FragColor=vec4(col,1.);\n}", W = {
		bonv: {
			ink0: "#06041A",
			ink2: "#17103A",
			indigo: "#242C80",
			blue: "#3D5BE0",
			violet: "#5B44B8",
			soft: "#7C93F2"
		},
		violet: {
			ink0: "#141238",
			ink2: "#24154A",
			indigo: "#5E2670",
			blue: "#7E5BB2",
			violet: "#684A9E",
			soft: "#928ACD"
		},
		mid: {
			ink0: "#0D0B29",
			ink2: "#1D1342",
			indigo: "#412978",
			blue: "#5E5BC9",
			violet: "#6247AB",
			soft: "#878FE0"
		}
	}, G = "radial-gradient(60% 55% at 88% 6%, rgba(61,91,224,.45), rgba(61,91,224,0) 70%),radial-gradient(55% 60% at 22% 70%, rgba(91,68,184,.22), rgba(91,68,184,0) 70%),radial-gradient(80% 80% at 55% 46%, #17103A, #06041A 85%)";
}));
//#endregion
//#region src/faq.js
function q(e) {
	if (!e || e.dataset.pvInit) return null;
	if (e.dataset.pvInit = "1", !document.getElementById("pv-faq-css")) {
		let e = document.createElement("style");
		e.id = "pv-faq-css", e.textContent = J, document.head.appendChild(e);
	}
	let t = [...e.querySelectorAll(".faq-item")], n = [], r = (e, t) => {
		e.classList.toggle("is-open", t), e._q.setAttribute("aria-expanded", t ? "true" : "false"), e._a.inert = !t;
	};
	return t.forEach((e) => {
		let i = e.querySelector(".faq-q"), a = e.querySelector(".faq-a");
		if (!i || !a) return;
		let o = "pv-faq-" + ++Y;
		e._q = i, e._a = a, i.setAttribute("role", "button"), i.tabIndex = 0, i.setAttribute("aria-controls", o), a.id = o, a.setAttribute("role", "region");
		let s = document.createElement("div");
		for (s.className = "pv-faq-in"; a.firstChild;) s.appendChild(a.firstChild);
		a.appendChild(s);
		let c = document.createElement("span");
		c.className = "pv-faq-pm", c.setAttribute("aria-hidden", "true"), i.appendChild(c);
		let l = () => {
			let n = !e.classList.contains("is-open");
			n && t.forEach((t) => t !== e && t._q && r(t, !1)), r(e, n);
		}, u = (e) => {
			(e.key === "Enter" || e.key === " ") && (e.preventDefault(), l());
		};
		i.addEventListener("click", l), i.addEventListener("keydown", u), n.push(() => {
			for (i.removeEventListener("click", l), i.removeEventListener("keydown", u), c.remove(); s.firstChild;) a.appendChild(s.firstChild);
			s.remove();
		}), r(e, !1);
	}), e.classList.add("pv-faq-on"), function() {
		n.forEach((e) => e()), t.forEach((e) => {
			e.classList.remove("is-open"), e._a && (e._a.inert = !1);
		}), e.classList.remove("pv-faq-on"), delete e.dataset.pvInit;
	};
}
var J, Y, X = e((() => {
	J = "\n[data-pv=\"faq\"].pv-faq-on .faq-a{display:grid;grid-template-rows:0fr;transition:grid-template-rows .35s cubic-bezier(.2,.7,.2,1)}\n[data-pv=\"faq\"].pv-faq-on .faq-a > .pv-faq-in{min-height:0;overflow:hidden}\n[data-pv=\"faq\"].pv-faq-on .faq-item.is-open .faq-a{grid-template-rows:1fr}\n[data-pv=\"faq\"] .faq-q{display:flex;justify-content:space-between;align-items:center;gap:1.5rem}\n[data-pv=\"faq\"] .faq-q:focus-visible{outline:2px solid #141238;outline-offset:4px;border-radius:4px}\n.pv-faq-pm{flex:none;position:relative;width:2.5rem;height:2.5rem;border-radius:999px;border:1px solid rgba(20,18,56,.2);transition:background-color .2s,border-color .2s,color .2s}\n.pv-faq-pm::before,.pv-faq-pm::after{content:'';position:absolute;left:50%;top:50%;width:.875rem;height:1.5px;background:currentColor;transform:translate(-50%,-50%);transition:transform .3s}\n.pv-faq-pm::after{transform:translate(-50%,-50%) rotate(90deg)}\n[data-pv=\"faq\"] .faq-q:hover .pv-faq-pm{border-color:#141238}\n[data-pv=\"faq\"] .faq-item.is-open .pv-faq-pm{background:#141238;color:#f8f8f8;border-color:#141238}\n[data-pv=\"faq\"] .faq-item.is-open .pv-faq-pm::after{transform:translate(-50%,-50%) rotate(0)}\n@media (prefers-reduced-motion:reduce){[data-pv=\"faq\"] .faq-a,.pv-faq-pm,.pv-faq-pm::before,.pv-faq-pm::after{transition:none}}", Y = 0;
})), Z = /* @__PURE__ */ t((() => {
	s(), R(), K(), X(), o(), I(), document.querySelectorAll("header.section_header, [data-af-bg], .feature-grid > .video-animation").forEach(V), document.querySelectorAll("[data-pv=\"faq\"]").forEach(q);
}));
//#endregion
export default Z();
