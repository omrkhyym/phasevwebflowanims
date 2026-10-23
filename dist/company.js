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
var r = e((() => {})), i = /* @__PURE__ */ t((() => {
	r(), document.querySelectorAll("[data-pv=\"company-careers\"]").forEach(n);
}));
//#endregion
export default i();
