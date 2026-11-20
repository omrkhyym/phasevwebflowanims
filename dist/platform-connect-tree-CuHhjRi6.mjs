import { n as e } from "./rolldown-runtime-wf392T_D.mjs";
import { _ as t, a as n, d as r, f as i, l as a, m as o, n as s, o as c, p as l, s as u, u as d, v as f } from "./bonv-draw-Db5acgQk.mjs";
//#region src/mini-scene-lite.js
function p(e) {
	let t = b[e.dataset.scene] || b.rank, n = m[(+e.dataset.col || 0) % m.length];
	return a(e, {
		aspect: () => .62,
		loop: h.loop,
		fade: h.fade,
		still: h.p1 + .5,
		layout: (e) => {
			e.S = d(e.W / 400, .7, 1.2);
		},
		draw: (e, r) => {
			e.x.lineCap = "round", e.x.lineJoin = "round", t(e, e.W, e.H, f(r, h.p0, h.p1), n);
		}
	});
}
var m, h, g, _, v, y, b, x = e((() => {
	r(), m = [
		s[0],
		s[1],
		s[2],
		s[3],
		s[5]
	], h = {
		p0: .4,
		p1: 4.4,
		fade: 6.4,
		loop: 7
	}, g = t(7), _ = Array.from({ length: 24 }, (e, t) => ({
		x: t % 6 / 5 - .5 + (g() - .5) * .07,
		y: Math.floor(t / 6) / 3 - .5 + (g() - .5) * .09,
		rec: g() < .38,
		d: g()
	})), v = Array.from({ length: 30 }, () => ({
		x: g() - .5,
		y: (g() - .5) * .8,
		resp: g() < .42
	})), y = [
		.48,
		.86,
		.32,
		.66
	], b = {
		rank(e, t, n, r, a) {
			let s = y.map((e, t) => t).sort((e, t) => y[t] - y[e]), c = i(f(r, .2, .65)), d = n / 5.2, p = t * .14;
			y.forEach((i, m) => {
				let h = l(m, s.indexOf(m), c), g = s.indexOf(m) === 0 && c > .95, _ = n * .22 + h * d;
				e.line(p, _, t * .86, _, u, .1, 4 * e.S), e.line(p, _, p + t * .72 * i * o(f(r, 0, .25)), _, g ? a : u, g ? 1 : .6, 5.5 * e.S), g && e.dot(p + t * .72 * i, _, 6 * e.S, a, 1);
			});
		},
		curve(e, t, r, a, o) {
			let s = t * .14, c = t * .88, d = r * .2, p = r * .8;
			e.line(s, p, c, p, u, .3, 1.5 * e.S), e.line(s, d, s, p, u, .3, 1.5 * e.S);
			let m = i(f(a, 0, .5)), h = (e) => [l(s, c, e), p - (p - d) * (.06 + .86 * (1 - (1 - e) ** 2.4))], g = [];
			for (let e = 0; e <= Math.ceil(36 * m); e++) g.push(h(Math.min(e / 36, m)));
			e.poly(g, u, .95, 3.2 * e.S);
			let _ = i(f(a, .55, .9));
			if (_ > 0) {
				let t = h(l(.15, .5, _));
				e.x.save(), e.x.setLineDash([3 * e.S, 4 * e.S]), e.line(t[0], t[1], t[0], p, u, .45, 1.5 * e.S), e.line(s, t[1], t[0], t[1], u, .45, 1.5 * e.S), e.x.restore(), e.dot(t[0], t[1], 5.5 * e.S, o, 1), e.x.strokeStyle = o, e.x.globalAlpha = .7, e.x.lineWidth = 2 * e.S, e.x.beginPath(), e.x.arc(t[0], t[1], 11 * e.S, 0, n), e.x.stroke(), e.x.globalAlpha = 1;
			}
		},
		sites(e, t, n, r, i) {
			_.forEach((a) => {
				let s = a.rec ? o(f(r, .1 + a.d * .55, .25 + a.d * .55)) : 0;
				e.dot(t / 2 + a.x * t * .7, n / 2 + a.y * n * .6, (3.2 + 2.2 * s) * e.S, s > 0 ? i : u, s > 0 ? .5 + .5 * s : .32);
			});
		},
		split(e, t, n, r, a) {
			let o = i(f(r, .15, .7));
			o > .6 && e.line(t / 2, n * .16, t / 2, n * .84, u, .32 * f(o, .6, 1), 1.5 * e.S), v.forEach((r) => {
				let i = (r.resp ? -.2 : .2) + r.x * .32, s = l(r.x * .8, i, o);
				e.dot(t / 2 + s * t * .8, n / 2 + r.y * n * .7, 3.6 * e.S, r.resp && o > .3 ? a : u, r.resp ? .5 + .5 * o : .36);
			});
		},
		doc(e, t, n, r, i) {
			let a = t * .16, s = n / 6.2;
			for (let l = 0; l < 4; l++) {
				let d = n * .26 + l * s, p = o(f(r, .04 + l * .08, .22 + l * .08)), m = t * (l === 0 ? .4 : l === 2 ? .46 : .58);
				e.line(a, d, a + m * p, d, u, l === 0 ? .9 : .5, (l === 0 ? 5.5 : 3.5) * e.S);
				let h = f(r, .55 + l * .08, .66 + l * .08);
				if (h > 0) {
					let n = t * .84;
					e.poly([
						[n - 6 * e.S, d],
						[n - 2 * e.S, d + 4 * e.S],
						[n + 6 * e.S, d - 5 * e.S]
					].slice(0, h > .5 ? 3 : 2), l === 3 ? i : c, h, 2.6 * e.S);
				}
			}
		}
	};
}));
//#endregion
//#region src/platform-connect-tree.js
function S() {
	if (document.getElementById("pv-pct-css")) return;
	let e = document.createElement("style");
	e.id = "pv-pct-css", e.textContent = F, document.head.appendChild(e);
}
function C(e) {
	if (!e || e.dataset.pvReady) return null;
	let t = e.dataset.current;
	if (!w[t]) return console.warn("[pv] platform-connect : data-current manquant ou inconnu (" + t + "), attendu " + T.join(" | ")), null;
	e.dataset.pvReady = "1", S(), e.style.width = "100%";
	let n = (t) => e.dataset["name" + t[0].toUpperCase() + t.slice(1)] || w[t].name, r = [t, ...T.filter((e) => e !== t)], i = matchMedia("(prefers-reduced-motion: reduce)").matches, a = (e.closest("section") || document.body).querySelector(".text-size-label"), o = document.createElement("div");
	o.className = "pv-pct", a && o.style.setProperty("--pv-pct-mono", getComputedStyle(a).fontFamily), o.setAttribute("role", "img"), o.setAttribute("aria-label", `PhaseV platform: ${n(t)}, connected to ${r.slice(1).map(n).join(", ")}.`);
	let s = document.createElement("div");
	s.className = "pv-pct-stage";
	let c = document.createElementNS(M, "svg");
	c.setAttribute("class", "pv-pct-wires"), c.setAttribute("aria-hidden", "true"), s.appendChild(c), o.appendChild(s), e.appendChild(o);
	let l = r.map((e, t) => {
		let r = w[e], i = document.createElement("div");
		return i.className = "pv-pct-it" + (t ? "" : " is-main"), i.style.setProperty("--c", E[r.col]), i.innerHTML = `<div class="pv-pct-viz"><div data-scene="${r.scene}" data-col="${r.col}"></div></div><div class="pv-pct-name"></div>`, i.querySelector(".pv-pct-name").textContent = n(e), s.appendChild(i), i;
	}), u = l.map((e) => p(e.querySelector("[data-scene]"))), d = {}, f = null;
	function m() {
		o.classList.toggle("is-compact", e.clientWidth < 560);
		let t = s.getBoundingClientRect();
		c.setAttribute("viewBox", `0 0 ${t.width} ${t.height}`), c.innerHTML = "", d = {};
		let n = (e) => {
			let n = e.getBoundingClientRect(), r = e.querySelector(".pv-pct-viz").getBoundingClientRect();
			return {
				l: n.left - t.left,
				r: n.right - t.left,
				t: n.top - t.top,
				b: n.bottom - t.top,
				cx: (n.left + n.right) / 2 - t.left,
				vy: (r.top + r.bottom) / 2 - t.top
			};
		}, r = (e, t) => {
			let n = document.createElementNS(M, "path");
			n.setAttribute("d", e), n.setAttribute("fill", "none"), n.setAttribute("stroke", j), n.setAttribute("stroke-width", "1"), n.setAttribute("stroke-linecap", "round"), c.appendChild(n), d[t] = n;
		}, i = l.map(n), a = i[0];
		if (o.classList.contains("is-compact")) {
			r(`M${a.cx},${a.b} L${a.cx},${a.b + 8}`, "stem");
			for (let e = 1; e < 5; e++) {
				let t = i[e];
				r(`M${t.cx < a.cx ? t.r : t.l},${t.vy} L${a.cx},${t.vy} L${a.cx},${a.b + 8}`, e);
			}
		} else {
			let e = (a.b + Math.min(...i.slice(1).map((e) => e.t))) / 2;
			r(`M${a.cx},${a.b} L${a.cx},${e}`, "stem");
			for (let t = 1; t < 5; t++) {
				let n = i[t];
				r(`M${n.cx},${n.t} L${n.cx},${e} L${a.cx},${e}`, t);
			}
		}
		f = document.createElementNS(M, "circle"), f.setAttribute("r", "4"), f.style.opacity = 0, c.appendChild(f);
	}
	function h(e, t) {
		let n = e || t, r = e ? [[d[n], !0], [d.stem, !1]] : [[d.stem, !0], [d[n], !1]], i = r.map(([e]) => e.getTotalLength()), a = i[0] + i[1];
		return {
			ids: [d[n], d.stem],
			at(e) {
				let t = e * a;
				for (let e = 0; e < 2; e++) {
					let [n, a] = r[e];
					if (t <= i[e] || e === 1) {
						let r = Math.min(t, i[e]);
						return n.getPointAtLength(a ? r : i[e] - r);
					}
					t -= i[e];
				}
			}
		};
	}
	let g = 0, _ = 0, v = 0;
	function y(e) {
		if (g = requestAnimationFrame(y), _ += Math.min((e - v) / 1e3, .05), v = e, !f || !d.stem) return;
		let t = _ - A;
		if (t < 0) return;
		let n = Math.floor(t / O) % D.length, i = t % O / O, [a, o] = D[n], s = Math.min(1, i * O / k), c = h(a, o), u = c.at(N(s)), p = E[w[r[a]].col];
		f.setAttribute("cx", u.x), f.setAttribute("cy", u.y), f.setAttribute("fill", p), f.style.opacity = +(s > 0 && s < 1), l.forEach((e, t) => {
			e.classList.toggle("is-on", t === a && s < 1), e.classList.toggle("is-hit", t === o && s >= 1 && i < .85);
		});
		let m = s < 1 ? Math.min(1, s * 6) : Math.max(0, 1 - (i - k / O) / .2);
		Object.values(d).forEach((e) => {
			e.setAttribute("stroke", j), e.style.opacity = 1;
		}), m > 0 && c.ids.forEach((e) => {
			e.setAttribute("stroke", p), e.style.opacity = m * .85;
		});
	}
	let b = () => {
		g || i || (v = performance.now(), g = requestAnimationFrame(y));
	}, x = () => {
		cancelAnimationFrame(g), g = 0;
	}, C = new ResizeObserver(m);
	C.observe(e);
	let P = new IntersectionObserver(([e]) => e.isIntersecting ? b() : x(), { threshold: .2 });
	return P.observe(e), m(), { destroy() {
		x(), C.disconnect(), P.disconnect(), u.forEach((e) => e && e.destroy && e.destroy()), o.remove(), delete e.dataset.pvReady;
	} };
}
var w, T, E, D, O, k, A, j, M, N, P, F, I = e((() => {
	x(), r(), w = {
		portfolio: {
			name: "Portfolio Optimizer",
			scene: "rank",
			col: 0
		},
		response: {
			name: "Response Optimizer",
			scene: "split",
			col: 3
		},
		trial: {
			name: "Trial Optimizer",
			scene: "curve",
			col: 1
		},
		clinops: {
			name: "ClinOps Optimizer",
			scene: "sites",
			col: 2
		},
		conductor: {
			name: "AI Conductor",
			scene: "doc",
			col: 4
		}
	}, T = [
		"portfolio",
		"response",
		"trial",
		"clinops",
		"conductor"
	], E = [
		s[0],
		s[1],
		s[2],
		s[3],
		s[5]
	], D = [
		[1, 0],
		[0, 3],
		[2, 0],
		[0, 4],
		[3, 0],
		[0, 1],
		[4, 0],
		[0, 2]
	], O = 2.6, k = 1.1, A = 1.2, j = "rgba(248,248,248,.16)", M = "http://www.w3.org/2000/svg", N = (e) => e < .5 ? 4 * e * e * e : 1 - (-2 * e + 2) ** 3 / 2, P = "content:'';position:absolute;inset:0;border-radius:inherit;padding:.5px;pointer-events:none;\n  background:linear-gradient(150deg, rgba(248,248,248,.32) 0%, rgba(248,248,248,.07) 40%, rgba(248,248,248,.03) 75%, rgba(214,170,240,.14) 100%);\n  -webkit-mask:linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;", F = `
.pv-pct{position:relative;isolation:isolate;width:100%;padding:2.25rem;border-radius:1.5rem;
  background:radial-gradient(60% 55% at 88% 6%, rgba(108,105,209,.52), rgba(108,105,209,0) 70%),
    radial-gradient(55% 60% at 22% 70%, rgba(96,62,152,.46), rgba(96,62,152,0) 70%), radial-gradient(90% 90% at 50% 45%, #281d60, #181344 85%)}
.pv-pct::before{${P}}
.pv-pct.is-compact{padding:1.25rem}
.pv-pct-stage{position:relative;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:1rem;row-gap:3.5rem}
.pv-pct.is-compact .pv-pct-stage{grid-template-columns:repeat(2,minmax(0,1fr));column-gap:2rem;row-gap:1.75rem}
.pv-pct-wires{position:absolute;inset:0;width:100%;height:100%;overflow:visible;pointer-events:none;z-index:0}
.pv-pct-it{position:relative;isolation:isolate;z-index:1;grid-row:2;transition:transform .5s cubic-bezier(.2,.7,.2,1)}
.pv-pct.is-compact .pv-pct-it{grid-row:auto}
.pv-pct-it.is-main{grid-column:2 / span 2;grid-row:1;padding:.625rem;border-radius:1.125rem;
  background:radial-gradient(120% 60% at 15% 0%, rgba(255,255,255,.06), rgba(255,255,255,0) 60%), linear-gradient(155deg, rgba(150,110,200,.2) 0%, rgba(90,60,150,.16) 50%, rgba(40,24,80,.34) 100%)}
.pv-pct.is-compact .pv-pct-it.is-main{grid-column:1 / -1;margin-bottom:1rem}
.pv-pct-it.is-main::before{${P}z-index:2}
.pv-pct-viz{position:relative;border-radius:.75rem;overflow:hidden;background:rgba(13,9,38,.55)}
.pv-pct-viz::after{${P}z-index:2;transition:padding .3s ease, background .3s ease}
.pv-pct-it.is-main .pv-pct-viz{border-radius:.625rem}
.pv-pct-it.is-main .pv-pct-viz::after{display:none}
.pv-pct-viz > div{position:relative;z-index:1;width:100%}
.pv-pct-name{margin:.5rem 0 0;font-family:var(--pv-pct-mono, 'Roboto Mono', ui-monospace, monospace);font-size:.6875rem;line-height:1.3;
  font-weight:400;letter-spacing:.08em;text-transform:uppercase;color:rgba(248,248,248,.72)}
.pv-pct-it.is-main .pv-pct-name{margin:.625rem .25rem .125rem;font-size:.75rem;color:#f8f8f8}
.pv-pct-it.is-on{transform:translateY(-3px)}
.pv-pct-it.is-on .pv-pct-viz::after, .pv-pct-it.is-hit .pv-pct-viz::after{padding:1.5px;background:var(--c)}
.pv-pct-it.is-main.is-hit{box-shadow:inset 0 0 0 1.5px var(--c)}
@media (prefers-reduced-motion:reduce){.pv-pct-it{transition:none}}`;
}));
//#endregion
export { I as n, C as t };
