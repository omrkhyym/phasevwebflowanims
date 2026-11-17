import { n as e } from "./rolldown-runtime-wf392T_D.mjs";
//#region src/platform-connect-cards.js
function t(e) {
	if (e < u) return [null, 0];
	let t = c.length * l, n = (e - u) % t / l, r = Math.floor(n);
	return [c[r], n - r];
}
function n(e) {
	if (e.dataset.pvReady) return;
	let n = e.dataset.current;
	if (!a[n]) {
		console.warn("[pv] platform-connect : data-current manquant ou inconnu (" + n + "), attendu " + o.join(" | "));
		return;
	}
	e.dataset.pvReady = "1";
	let c = (t) => e.dataset["name" + t[0].toUpperCase() + t.slice(1)] || a[t], l = [n, ...o.filter((e) => e !== n)];
	e.style.cssText += "position:relative;width:100%;aspect-ratio:1.2/1;";
	let u = document.createElement("canvas");
	u.style.cssText = "position:absolute;inset:0;width:100%;height:100%;display:block;", u.setAttribute("role", "img"), u.setAttribute("aria-label", `PhaseV platform: ${c(n)} at the center, exchanging data with the four other PhaseV products.`), e.appendChild(u);
	let v = u.getContext("2d"), y = (e.closest("section") || document.body).querySelector(".text-size-label"), b = y ? getComputedStyle(y) : null, x = b ? b.fontFamily : "Aspekta, Arial, sans-serif", S = b && b.letterSpacing !== "normal" ? (parseFloat(b.letterSpacing) || 0) / (parseFloat(b.fontSize) || 16) : .08, C = "letterSpacing" in v;
	function w(e, t) {
		v.font = `${e} ${t}px ${x}`, C && (v.letterSpacing = (S * t).toFixed(2) + "px");
	}
	function T(e, t, n, r, i) {
		v.beginPath(), v.roundRect ? v.roundRect(e, t, n, r, i) : v.rect(e, t, n, r);
	}
	function E(e, t, n, a, o, s) {
		let c = o ? "rgba(255,255,255,.42)" : `rgba(${i},.95)`, l = o ? "#ffffff" : "#141238", u = (e, t, n, r) => {
			v.beginPath(), v.arc(e, t, n, 0, 6.283), v.fillStyle = r, v.fill();
		}, d = t - a / 2, f = n - a / 2, m = Math.max(.8, a * .045);
		if (e === "trial") {
			for (let e = 1; e < 6; e++) {
				let t = (_(e) - .5) * 2, r = 2 + _(e + 9) * 4;
				for (let e = 0; e <= 12; e++) {
					let i = e / 12;
					u(d + i * a, n + a * .3 - i * a * .45 + i * a * (.32 * t + .08 * Math.sin(r * i * 3)), m * .8, c);
				}
			}
			v.beginPath();
			for (let e = 0; e <= 30 * s; e++) {
				let t = e / 30, r = d + t * a, i = n + a * .3 - t * a * .45;
				e ? v.lineTo(r, i) : v.moveTo(r, i);
			}
			v.strokeStyle = l, v.lineWidth = Math.max(1.5, a * .07), v.lineCap = "round", v.stroke();
		} else if (e === "portfolio") {
			let e = [
				1,
				.78,
				.6,
				.44,
				.3
			], n = a * .12, r = a * .085;
			e.forEach((e, i) => {
				let o = a * e * (.25 + .75 * h(p(s * 1.4 - i * .1))), u = f + a * .04 + i * (n + r);
				T(t - o / 2, u, o, n, n / 2), v.fillStyle = i < 2 ? l : c, v.fill();
			});
		} else if (e === "response") {
			let e = a * .06 * h(s);
			for (let r = 0; r < 26; r++) {
				let i = r < 11, o = _(r + 3) * 6.283, s = Math.sqrt(_(r + 40)) * (i ? .2 : .24);
				u(t + Math.cos(o) * s * a * 1.5, n + (i ? -.13 : .13) * a + (i ? -e : e) + Math.sin(o) * s * a * .75, m, i ? l : c);
			}
		} else if (e === "clinops") {
			let e = a / 6;
			for (let t = 0; t < 7; t++) for (let n = 0; n < 7; n++) {
				let r = t / 6 - .5, i = n / 6 - .5;
				Math.hypot(r * 1.1 + .05 * Math.sin(n * 2), i * 1.4) < .5 + .08 * _(t * 7 + n) && u(d + t * e, f + n * e, m * .8, c);
			}
			[
				[.3, .35],
				[.62, .55],
				[.45, .78]
			].forEach(([e, t], n) => {
				let i = p(s * 3 - n), h = d + e * a, g = f + t * a;
				i > 0 && (v.beginPath(), v.arc(h, g, a * (.08 + .1 * i), 0, 6.283), v.strokeStyle = o ? `rgba(255,255,255,${.5 * (1 - i) + .15})` : `rgba(${r},${.4 * (1 - i) + .12})`, v.lineWidth = 1, v.stroke()), u(h, g, m * 1.7, i > 0 ? l : c);
			});
		} else for (let e = 0; e < 3; e++) {
			let t = d + e * a * .2, n = f + e * a * .14, r = a * .6, u = a * .72;
			T(t, n, r, u, a * .06), v.fillStyle = o ? "#141238" : "#fff", v.fill(), v.strokeStyle = c, v.lineWidth = 1, v.stroke();
			for (let c = 0; c < 4; c++) v.fillStyle = c === 2 && s * 3 > e ? l : o ? "rgba(255,255,255,.22)" : `rgba(${i},.45)`, v.fillRect(t + r * .16, n + u * (.2 + c * .18), r * (c === 3 ? .4 : .68), Math.max(1.2, a * .045));
		}
	}
	function D(e, t) {
		let n = (e[1] + t[1]) / 2;
		return (r) => {
			let i = 1 - r;
			return [i * i * i * e[0] + 3 * i * i * r * e[0] + 3 * i * r * r * t[0] + r * r * r * t[0], i * i * i * e[1] + 3 * i * i * r * n + 3 * i * r * r * n + r * r * r * t[1]];
		};
	}
	function O(e, t, n, r = 48) {
		v.beginPath();
		for (let i = 0; i <= r; i++) {
			let [a, o] = e(t + (n - t) * i / r);
			i ? v.lineTo(a, o) : v.moveTo(a, o);
		}
	}
	let k = 0, A = 0;
	function j(e) {
		v.clearRect(0, 0, k, A);
		let n = Math.min(k, A), a = k < 420 ? 9 : 11, [o, u] = t(e), d = o ? o[0] : -1, _ = o ? o[1] : -1, y = o ? d || _ : -1, b = o ? Math.min(m(u, 0, .1), 1 - m(u, .88, 1)) : 0, x = o ? m(u, .6, .72) * (1 - m(u, .78, 1)) : 0, S = n / 20;
		v.fillStyle = `rgba(${r},.07)`;
		for (let e = S / 2; e < A; e += S) for (let t = S / 2; t < k; t += S) v.beginPath(), v.arc(t, e, .9, 0, 6.283), v.fill();
		let C = [
			n * .44,
			n * .33,
			n * .33,
			n * .33,
			n * .33
		], j = [
			n * .27,
			n * .15,
			n * .15,
			n * .15,
			n * .15
		], M = f.map(([t, r], i) => {
			let a = g(m(e, .05 + i * .1, .65 + i * .1)), o = (i === y ? b : 0) * n * .012 + (i === _ ? x * n * .006 : 0);
			return [
				t * k,
				r * A + (1 - a) * n * .05 + Math.sin(e * .7 + i * 1.9) * n * .005 - o,
				a
			];
		}), N = (e) => [M[e][0], M[e][1] + (f[e][1] < .5 ? 1 : -1) * j[e] / 2], P = (e) => [M[0][0] + (f[e][0] < .5 ? -1 : 1) * C[0] * .3, M[0][1] + (f[e][1] < .5 ? -1 : 1) * j[0] / 2], F = h(m(e, .6, 1.5));
		for (let t = 1; t < 5; t++) {
			let n = D(N(t), P(t)), a = t === y ? b : 0, o = s[l[t]];
			if (O(n, 0, F), v.setLineDash([2, 5]), v.lineDashOffset = -e * 10, v.strokeStyle = `rgba(${r},.28)`, v.lineWidth = 1, v.stroke(), v.setLineDash([]), a > 0) {
				let e = N(t), r = P(t), s = v.createLinearGradient(e[0], e[1], r[0], r[1]);
				s.addColorStop(0, `rgba(${o},${a})`), s.addColorStop(1, `rgba(${i},${a})`), O(n, 0, 1), v.strokeStyle = s, v.lineWidth = 2, v.stroke();
			}
			[N(t), P(t)].forEach(([e, t]) => {
				v.beginPath(), v.arc(e, t, 4, 0, 6.283), v.fillStyle = "#fff", v.fill(), v.strokeStyle = a > 0 ? `rgba(${i},${.5 + a * .5})` : `rgba(${r},.3)`, v.lineWidth = 1.25, v.stroke();
			});
		}
		if (o) {
			let e = D(N(y), P(y)), t = d === 0 ? -1 : 1, n = s[l[y]];
			for (let r = 0; r < 6; r++) {
				let i = m(u, .1 + r * .05, .62 + r * .05);
				if (i <= 0 || i >= 1) continue;
				let a = h(i), o = t > 0 ? a : 1 - a, s = p(o - t * .09);
				O(e, Math.min(s, o), Math.max(s, o), 12);
				let [c, l] = e(s), [d, f] = e(o), g = v.createLinearGradient(c, l, d, f);
				g.addColorStop(0, `rgba(${n},0)`), g.addColorStop(1, `rgba(${n},.9)`), v.strokeStyle = g, v.lineWidth = r ? 2.5 : 3.5, v.stroke(), v.save(), v.shadowColor = `rgba(${n},.9)`, v.shadowBlur = 12, v.beginPath(), v.arc(d, f, r ? 2.8 : 4, 0, 6.283), v.fillStyle = "#fff", v.fill(), v.lineWidth = 2, v.strokeStyle = `rgba(${n},1)`, v.stroke(), v.restore();
			}
		}
		for (let t = 0; t < 5; t++) {
			let [d, f, g] = M[t];
			if (g <= 0) continue;
			let S = l[t], D = s[S], O = C[t], k = j[t], A = n * .028, N = t === 0, P = t === y ? b : 0, F = t === _ ? x : 0;
			if (v.globalAlpha = p(g), v.save(), v.shadowColor = `rgba(${r},${.1 + P * .08})`, v.shadowBlur = 26 + P * 14, v.shadowOffsetY = 10 + P * 6, T(d - O / 2, f - k / 2, O, k, A), v.fillStyle = N ? "#141238" : "#fff", v.fill(), v.restore(), N) {
				v.save(), T(d - O / 2, f - k / 2, O, k, A), v.clip();
				let e = v.createRadialGradient(d - O * .3, f - k * .6, 0, d - O * .3, f - k * .6, O * .8);
				e.addColorStop(0, `rgba(${i},${.45 + F * .3})`), e.addColorStop(1, `rgba(${i},0)`), v.fillStyle = e, v.fillRect(d - O / 2, f - k / 2, O, k), v.restore();
			}
			if (T(d - O / 2, f - k / 2, O, k, A), v.strokeStyle = N ? `rgba(255,255,255,${.12 + F * .5})` : F || P ? `rgba(${D},${.5 + Math.max(F, P) * .5})` : `rgba(${r},.08)`, v.lineWidth = 1 + Math.max(F, P) * 1.5, v.stroke(), F > 0) {
				let e = m(u, .6, .9), t = e * n * .04;
				T(d - O / 2 - t, f - k / 2 - t, O + t * 2, k + t * 2, A + t), v.strokeStyle = `rgba(${i},${(1 - e) * .6})`, v.lineWidth = 1.5, v.stroke();
			}
			let I = k * (N ? .18 : .2), L = N ? k * .22 : k * .34, R = d - O / 2 + I, z = N ? f - k / 2 + I : f - L * .85;
			T(R, z, L * 1.7, L * 1.7, L * .4), v.fillStyle = N ? "rgba(255,255,255,.08)" : `rgba(${D},${.16 + P * .14})`, v.fill();
			let B = N ? _ === 0 ? h(m(u, .62, .95)) : 1 : t === y ? h(m(u, .05, .6)) : 1;
			E(S, R + L * .85, z + L * .85, L * 1.1, N, B);
			let [V, H] = c(S).split(/ (?=OPTIMIZER|CONDUCTOR)/);
			w(N ? 700 : 600, N ? a + 2 : a), v.fillStyle = N ? "#fff" : "#141238", v.textBaseline = "middle";
			let U = R + L * 1.7 + I * .7, W = z + L * .85;
			H ? (v.fillText(V, U, W - a * .72), v.globalAlpha = p(g) * .55, v.fillText(H, U, W + a * .78), v.globalAlpha = p(g)) : v.fillText(V, U, W), v.textBaseline = "alphabetic";
			let G = d + O / 2 - I * .9, K = f - k / 2 + I * .9, q = P ? .5 + .5 * Math.sin(e * 14) : 0;
			if (v.beginPath(), v.arc(G, K, 3.2, 0, 6.283), v.fillStyle = P || N && o ? `rgba(${N ? "127,232,207" : D},${.6 + q * .4})` : `rgba(${N ? "255,255,255" : r},.18)`, v.fill(), N) {
				let e = d - O / 2 + I, t = O - I * 2, n = f + k / 2 - I * .9, r = k * .34;
				v.strokeStyle = "rgba(255,255,255,.12)", v.lineWidth = 1, v.beginPath(), v.moveTo(e, n), v.lineTo(e + t, n), v.stroke();
				let a = (e, t) => n - r * (1 - Math.exp(-t * (2.2 + e * 1.1))) * (.7 + e * .12);
				for (let n = 0; n < 3; n++) {
					let r = n === 2 && _ === 0 ? .25 + .75 * m(u, .62, .95) : 1;
					v.beginPath();
					for (let i = 0; i <= 30; i++) {
						let o = i / 30 * r;
						i ? v.lineTo(e + o * t, a(n, o)) : v.moveTo(e, a(n, 0));
					}
					v.strokeStyle = n === 2 ? `rgba(${i},1)` : "rgba(255,255,255,.22)", v.lineWidth = n === 2 ? 2 : 1.25, v.stroke();
				}
			} else {
				let e = d - O / 2 + I, t = f + k / 2 - I * .75;
				[.55, .3].forEach((n, i) => {
					T(e + i * O * .6, t - 2, (O - I * 2) * n, 4, 2), v.fillStyle = `rgba(${r},.07)`, v.fill();
				});
			}
			v.globalAlpha = 1;
		}
	}
	let M = matchMedia("(prefers-reduced-motion: reduce)").matches, N = !1, P = 0, F = 0, I = 0;
	function L() {
		let t = Math.min(devicePixelRatio || 1, 2);
		k = e.clientWidth, A = e.clientHeight, u.width = Math.round(k * t), u.height = Math.round(A * t), v.setTransform(t, 0, 0, t, 0, 0), N && j(M ? d : P);
	}
	function R(e) {
		F = requestAnimationFrame(R), P += Math.min((e - I) / 1e3, .05), I = e, j(P);
	}
	function z() {
		F || M || (I = performance.now(), F = requestAnimationFrame(R));
	}
	function B() {
		cancelAnimationFrame(F), F = 0;
	}
	let V = new ResizeObserver(L);
	V.observe(e);
	let H = null;
	return (document.fonts ? Promise.race([document.fonts.load(`600 11px ${x}`), new Promise((e) => setTimeout(e, 3e3))]) : Promise.resolve()).then(() => {
		N = !0, L(), !M && (H = new IntersectionObserver(([e]) => e.isIntersecting ? z() : B(), { threshold: .3 }), H.observe(e));
	}), { destroy() {
		B(), V.disconnect(), H && H.disconnect(), u.remove(), delete e.dataset.pvReady;
	} };
}
var r, i, a, o, s, c, l, u, d, f, p, m, h, g, _, v = e((() => {
	r = "20,18,56", i = "146,138,205", a = {
		portfolio: "PORTFOLIO OPTIMIZER",
		trial: "TRIAL OPTIMIZER",
		response: "RESPONSE OPTIMIZER",
		clinops: "CLINOPS OPTIMIZER",
		conductor: "AI CONDUCTOR"
	}, o = [
		"portfolio",
		"trial",
		"response",
		"clinops",
		"conductor"
	], s = {
		trial: i,
		portfolio: i,
		response: "120,168,224",
		clinops: "127,232,207",
		conductor: "104,74,158"
	}, c = [
		[1, 0],
		[0, 3],
		[2, 0],
		[0, 4],
		[3, 0],
		[0, 1],
		[4, 0],
		[0, 2]
	], l = 2.6, u = 1.8, d = 3.2300000000000004, f = [
		[.5, .5],
		[.19, .14],
		[.81, .14],
		[.19, .86],
		[.81, .86]
	], p = (e, t = 0, n = 1) => Math.max(t, Math.min(n, e)), m = (e, t, n) => p((e - t) / (n - t)), h = (e) => e < .5 ? 4 * e * e * e : 1 - (-2 * e + 2) ** 3 / 2, g = (e) => 1 + 2.6 * (e - 1) ** 3 + 1.6 * (e - 1) ** 2, _ = (e) => {
		let t = Math.sin(e * 127.1 + 311.7) * 43758.5453;
		return t - Math.floor(t);
	};
}));
//#endregion
export { v as n, n as t };
