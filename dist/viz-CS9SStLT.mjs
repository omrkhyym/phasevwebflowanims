import { n as e } from "./rolldown-runtime-wf392T_D.mjs";
//#region src/viz.js
function t(e) {
	if (!e || e.dataset.pvInit) return null;
	e.dataset.pvInit = "1";
	let t = matchMedia("(prefers-reduced-motion: reduce)").matches, i = e.dataset.mode || "precision", s = e.closest(".video-animation, .surface-dark") ? r : n, c = s.ink, l = s.mau, u = s.tea, d = "rgb(" + c + ")";
	getComputedStyle(e).position === "static" && (e.style.position = "relative");
	let f = document.createElement("canvas");
	f.setAttribute("aria-hidden", "true"), f.style.cssText = "position:absolute;inset:0;width:100%;height:100%;display:block", e.appendChild(f);
	let p = f.getContext("2d"), m = a(i === "split" ? 5 : 3), h = () => Math.sqrt(-2 * Math.log(m() + 1e-9)) * Math.cos(6.2832 * m()), g = Array.from({ length: i === "split" ? 170 : 120 }, (e, t) => ({
		a: h(),
		b: h(),
		arm: t % 2,
		resp: m() < .4,
		j: m()
	})), _ = 0, v = 0, y = 0, b = performance.now();
	function x(e) {
		p.clearRect(0, 0, _, v);
		let n = t ? 1 : o(e), r = Math.min(_, v);
		if (i === "precision") {
			let e = [v * .3, v * .52], t = [_ * .42, _ * .58], i = _ * .13 * (1 - .6 * n);
			g.forEach((n) => {
				let a = t[n.arm] + n.a * i, o = e[n.arm] + n.b * r * .035;
				p.beginPath(), p.arc(a, o, 3.2, 0, 6.283), p.fillStyle = n.arm ? `rgba(${c},.8)` : `rgba(${l},.85)`, p.fill();
			});
			let a = v * .8, o = _ * .62, s = _ * .26 * (1 - .62 * n), u = _ * .3;
			p.strokeStyle = `rgba(${c},.25)`, p.lineWidth = 1, p.beginPath(), p.moveTo(_ * .1, a), p.lineTo(_ * .9, a), p.stroke(), p.setLineDash([3, 4]), p.beginPath(), p.moveTo(u, a - 18), p.lineTo(u, a + 18), p.stroke(), p.setLineDash([]), p.strokeStyle = d, p.lineWidth = 3, p.lineCap = "round", p.beginPath(), p.moveTo(o - s, a), p.lineTo(o + s, a), p.stroke(), [o - s, o + s].forEach((e) => {
				p.lineWidth = 2, p.beginPath(), p.moveTo(e, a - 8), p.lineTo(e, a + 8), p.stroke();
			}), p.beginPath(), p.arc(o, a, 6, 0, 6.283), p.fillStyle = d, p.fill();
		} else if (i === "rank") {
			let e = [
				.55,
				.92,
				.38,
				.74,
				.62
			], t = e.length, r = v * .085, i = v * .06, a = (v - t * r - (t - 1) * i) / 2, o = _ * .12, s = _ * .76, u = e.map((e, t) => t).sort((t, n) => e[n] - e[t]), d = (e) => u.indexOf(e);
			e.forEach((e, t) => {
				let u = a + (t + (d(t) - t) * n) * (r + i), f = s * e * (.35 + .65 * Math.min(1, n * 1.6 + .2)), m = d(t) === 0;
				p.fillStyle = m ? `rgba(${c},${.35 + .65 * n})` : `rgba(${l},.7)`, p.beginPath(), p.roundRect ? p.roundRect(o, u, f, r, r / 2) : p.rect(o, u, f, r), p.fill(), p.beginPath(), p.arc(o - r * .9, u + r / 2, r * .22, 0, 6.283), p.fillStyle = `rgba(${c},.25)`, p.fill();
			});
		} else if (i === "dist") {
			let e = _ * .1, t = _ * .9, r = v * .78, i = v * .5, a = (n) => e + (t - e) * n, o = .48, s = (e) => Math.exp(-.5 * ((e - o) / .09) ** 2);
			p.strokeStyle = `rgba(${c},.25)`, p.lineWidth = 1, p.beginPath(), p.moveTo(e, r), p.lineTo(t, r), p.stroke();
			let u = .02 + .98 * Math.min(1, n * 1.4 + .15);
			p.beginPath(), p.moveTo(a(.33), r);
			for (let e = .33; e <= Math.min(.63, u); e += .005) p.lineTo(a(e), r - s(e) * i);
			p.lineTo(a(Math.min(.63, u)), r), p.closePath(), p.fillStyle = `rgba(${l},${.35 * n})`, p.fill(), p.beginPath();
			for (let e = 0; e <= u; e += .005) {
				let t = a(e), n = r - s(e) * i;
				e ? p.lineTo(t, n) : p.moveTo(t, n);
			}
			p.strokeStyle = d, p.lineWidth = 2.5, p.stroke(), u > o && (p.setLineDash([4, 4]), p.lineWidth = 1.5, p.beginPath(), p.moveTo(a(o), r), p.lineTo(a(o), r - i - 10), p.stroke(), p.setLineDash([]));
		} else {
			let e = _ / 2, t = v / 2;
			p.strokeStyle = `rgba(${c},${.35 * (1 - n) + .1})`, p.setLineDash([5, 5]), p.lineWidth = 1.5, p.beginPath(), p.moveTo(_ * .12, t), p.lineTo(_ * .88, t), p.stroke(), p.setLineDash([]), g.forEach((r) => {
				let i = (r.resp ? -1 : 1) * v * .2 * n, a = e + r.a * _ * .15, o = t + r.b * v * .1 * (1 - .3 * n) + i;
				if (p.beginPath(), p.arc(a, o, 3.4, 0, 6.283), p.fillStyle = `rgba(${l},${.85 - .25 * n})`, r.resp && n > .02) {
					let e = l.split(",").map((e, t) => Math.round(+e + (+u.split(",")[t] - e) * n));
					p.fillStyle = `rgba(${e},.95)`;
				}
				p.fill();
			});
		}
	}
	let S = () => {
		let n = Math.min(devicePixelRatio || 1, 2);
		_ = e.clientWidth, v = e.clientHeight, f.width = Math.round(_ * n), f.height = Math.round(v * n), p.setTransform(n, 0, 0, n, 0, 0), x(t ? 6 : (performance.now() - b) / 1e3);
	}, C = (e) => {
		y = requestAnimationFrame(C), x((e - b) / 1e3);
	}, w = new ResizeObserver(S);
	w.observe(e);
	let T = null;
	return t || (T = new IntersectionObserver(([e]) => {
		e.isIntersecting && !y ? y = requestAnimationFrame(C) : e.isIntersecting || (cancelAnimationFrame(y), y = 0);
	}), T.observe(e)), function() {
		cancelAnimationFrame(y), w.disconnect(), T && T.disconnect(), f.remove(), delete e.dataset.pvInit;
	};
}
var n, r, i, a, o, s = e((() => {
	n = {
		ink: "20,18,56",
		mau: "146,138,205",
		tea: "127,232,207"
	}, r = {
		ink: "244,244,244",
		mau: "201,196,239",
		tea: "127,232,207"
	}, i = (e) => e < .5 ? 4 * e * e * e : 1 - (-2 * e + 2) ** 3 / 2, a = (e) => () => {
		e |= 0, e = e + 1831565813 | 0;
		let t = Math.imul(e ^ e >>> 15, 1 | e);
		return t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t, ((t ^ t >>> 14) >>> 0) / 4294967296;
	}, o = (e) => {
		let t = e % 8 / 8;
		return i(t < .2 ? 0 : t < .45 ? (t - .2) / .25 : t < .8 ? 1 : 1 - (t - .8) / .2);
	};
}));
//#endregion
export { s as n, t };
