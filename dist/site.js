import { n as e, t } from "./rolldown-runtime-wf392T_D.mjs";
import { d as n, l as r, n as i, v as a } from "./bonv-draw-Db5acgQk.mjs";
import { n as o, t as s } from "./mini-scene-BypIfqjG.mjs";
//#region src/line-field/css.js
function c() {
	if (document.getElementById("pv-layers-css")) return;
	let e = document.createElement("style");
	e.id = "pv-layers-css", e.textContent = l, document.head.appendChild(e);
}
var l, u = e((() => {
	l = "\n[data-line-field]{ isolation:isolate; }\n.pv-layer.pv-layer.pv-layer{ position:absolute; inset:0; pointer-events:none; }\n.pv-lf.pv-layer.pv-layer{ z-index:-2; width:100%; height:100%; display:block; }\n.pv-bg.pv-layer.pv-layer{ z-index:-3; overflow:hidden; }\n.pv-grain.pv-layer.pv-layer{ z-index:-1; background-image:var(--pv-grain); background-size:180px 180px;\n  mix-blend-mode:soft-light; opacity:.18; }\n\n/* JS actif : le fond devient les nappes injectées ; le fallback (pseudo-éléments de l'embed global) est coupé */\n.pv-live[data-bg='purple-gradient']{ position:relative; isolation:isolate; background:#141238; }\n.pv-live[data-bg='purple-gradient']::before, .pv-live[data-bg='purple-gradient']::after{ display:none; }\n\n/* Gradient flottant : les deux radiaux de la charte deviennent des nappes qui dérivent, tournent et respirent.\n   Transform uniquement : composité GPU, aucun repaint. La troisième nappe, mauve très faible, casse la symétrie. */\n.pv-blob{ position:absolute; display:block; border-radius:50%; will-change:transform; }\n.pv-b1{ width:95%; height:120%; left:42%; top:-48%;\n  background:radial-gradient(closest-side, rgba(126,91,178,.50), rgba(126,91,178,.18) 55%, rgba(126,91,178,0));\n  animation:pv-f1 46s ease-in-out infinite; }\n.pv-b2{ width:100%; height:115%; left:-36%; top:38%;\n  background:radial-gradient(closest-side, rgba(65,34,125,.58), rgba(65,34,125,.2) 55%, rgba(65,34,125,0));\n  animation:pv-f2 58s ease-in-out infinite; }\n.pv-b3{ width:60%; height:70%; left:18%; top:10%;\n  background:radial-gradient(closest-side, rgba(146,138,205,.12), rgba(146,138,205,0));\n  animation:pv-f3 39s ease-in-out infinite; }\n@keyframes pv-f1{ 0%,100%{ transform:translate(0,0) rotate(0) scale(1,1); }\n  33%{ transform:translate(-9%,7%) rotate(14deg) scale(1.12,.9); }\n  66%{ transform:translate(5%,12%) rotate(-8deg) scale(.92,1.08); } }\n@keyframes pv-f2{ 0%,100%{ transform:translate(0,0) rotate(0) scale(1,1); }\n  40%{ transform:translate(11%,-8%) rotate(-12deg) scale(.9,1.12); }\n  75%{ transform:translate(4%,-14%) rotate(9deg) scale(1.1,.94); } }\n@keyframes pv-f3{ 0%,100%{ transform:translate(0,0) scale(1); }\n  50%{ transform:translate(22%,18%) scale(1.25); } }\n@media (prefers-reduced-motion:reduce){ .pv-blob{ animation:none; } }\n";
}));
//#endregion
//#region src/floating-bg.js
function d() {
	let e = document.createElement("canvas");
	e.width = e.height = 180;
	let t = e.getContext("2d"), n = t.createImageData(180, 180);
	for (let e = 0; e < n.data.length; e += 4) {
		let t = 128 + (Math.random() - .5) * 110 | 0;
		n.data[e] = n.data[e + 1] = n.data[e + 2] = t, n.data[e + 3] = 255;
	}
	return t.putImageData(n, 0, 0), e.toDataURL();
}
function f(e = document) {
	let t = [...e.querySelectorAll("[data-bg='purple-gradient']")].filter((e) => !e.dataset.pvBg);
	return t.length ? (c(), document.documentElement.style.getPropertyValue("--pv-grain") || document.documentElement.style.setProperty("--pv-grain", "url(" + d() + ")"), t.map((e, t) => {
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
var p = e((() => {
	u();
}));
//#endregion
//#region src/dark-bg.js
function m(e) {
	let t = (e) => {
		let t = parseInt(e.slice(1), 16);
		return [
			t >> 16 & 255,
			t >> 8 & 255,
			t & 255
		].map((e) => e.toFixed(1)).join(",");
	};
	return v.replace("%INK0%", t(e.ink0)).replace("%INK2%", t(e.ink2)).replace("%INDIGO%", t(e.indigo)).replace("%BLUE%", t(e.blue)).replace("%VIOLET%", t(e.violet)).replace("%SOFT%", t(e.soft));
}
function h(e, t) {
	t = Object.assign({
		speed: 1,
		scrollParallax: !0,
		grain: .07,
		blur: 1 / 12,
		palette: y.bonv
	}, t || {});
	let n = m(t.palette), r = !e;
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
			if (s.attachShader(t, e(s.VERTEX_SHADER, _)), s.attachShader(t, e(s.FRAGMENT_SHADER, n)), s.linkProgram(t), !s.getProgramParameter(t, s.LINK_STATUS)) throw Error(s.getProgramInfoLog(t));
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
	if (!s) return a.remove(), i.style.background = b, { destroy() {
		i.remove();
	} };
	function d() {
		let e = i.clientWidth || innerWidth, n = i.clientHeight || innerHeight, r = Math.max(8, Math.round(e / 16)), o = Math.max(8, Math.round(n / 16));
		(a.width !== r || a.height !== o) && (a.width = r, a.height = o);
		let s = Math.round(e * t.blur), c = s * 2;
		a.style.cssText = `position:absolute;left:${-c}px;top:${-c}px;width:${e + 2 * c}px;height:${n + 2 * c}px;filter:blur(${s}px);`;
	}
	d(), addEventListener("resize", d);
	let f = matchMedia("(prefers-reduced-motion: reduce)"), p = 0, h = performance.now(), g = 0;
	function v(e) {
		let n = (e - h) / 1e3 * t.speed + 20, r = t.scrollParallax ? Math.min(1, scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight)) : 0;
		s.viewport(0, 0, a.width, a.height), s.uniform2f(c, a.width, a.height), s.uniform1f(l, n), s.uniform2f(u, 0, r * .35), s.drawArrays(s.TRIANGLES, 0, 3);
	}
	function x(e) {
		p = requestAnimationFrame(x), !(e - g < 33) && (g = e, v(e));
	}
	let S = !0, C = null;
	function w() {
		cancelAnimationFrame(p), f.matches || document.hidden || !S ? v(performance.now()) : p = requestAnimationFrame(x);
	}
	return document.addEventListener("visibilitychange", w), f.addEventListener && f.addEventListener("change", w), t.scrollParallax && f.matches && addEventListener("scroll", () => v(performance.now()), { passive: !0 }), !r && "IntersectionObserver" in window && (C = new IntersectionObserver(([e]) => {
		S = e.isIntersecting, w();
	}), C.observe(e)), w(), { destroy() {
		cancelAnimationFrame(p), C && C.disconnect(), i.remove();
	} };
}
function g(e) {
	if (!e || e.dataset.pvBg) return null;
	e.dataset.pvBg = "1";
	let t = h(e, {
		palette: y.mid,
		scrollParallax: !1
	}), n = e.firstElementChild;
	return n && (n.style.zIndex = "-1", n.style.opacity = ".6", n.classList.add("pv-dark-layer")), e.style.isolation = "isolate", function() {
		t && t.destroy(), delete e.dataset.pvBg;
	};
}
var _, v, y, b, x = e((() => {
	_ = "attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}", v = "precision highp float;\nuniform vec2 uRes;uniform float uT;uniform vec2 uOff;\nvec3 mod289(vec3 x){return x-floor(x*(1./289.))*289.;}\nvec2 mod289(vec2 x){return x-floor(x*(1./289.))*289.;}\nvec3 permute(vec3 x){return mod289(((x*34.)+1.)*x);}\nfloat snoise(vec2 v){const vec4 C=vec4(.211324865405187,.366025403784439,-.577350269189626,.024390243902439);\nvec2 i=floor(v+dot(v,C.yy));vec2 x0=v-i+dot(i,C.xx);vec2 i1=(x0.x>x0.y)?vec2(1.,0.):vec2(0.,1.);\nvec4 x12=x0.xyxy+C.xxzz;x12.xy-=i1;i=mod289(i);\nvec3 p=permute(permute(i.y+vec3(0.,i1.y,1.))+i.x+vec3(0.,i1.x,1.));\nvec3 m=max(.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.);m=m*m;m=m*m;\nvec3 x=2.*fract(p*C.www)-1.;vec3 h=abs(x)-.5;vec3 ox=floor(x+.5);vec3 a0=x-ox;\nm*=1.79284291400159-.85373472095314*(a0*a0+h*h);\nvec3 g;g.x=a0.x*x0.x+h.x*x0.y;g.yz=a0.yz*x12.xz+h.yz*x12.yw;return 130.*dot(m,g);}\nfloat fbm(vec2 p){float a=.5,s=0.;for(int i=0;i<2;i++){s+=a*snoise(p);p=p*1.8+vec2(1.7,9.2);a*=.4;}return s;}\nvec3 hex(float r,float g,float b){return vec3(r,g,b)/255.;}\nvoid main(){\nvec2 uv=gl_FragCoord.xy/uRes;uv.y=1.-uv.y;\nfloat asp=uRes.x/uRes.y;\nvec2 p=uv*vec2(asp,1.)*.32+uOff;\nfloat t=uT*.07;\nvec2 q=vec2(fbm(p*1.05+vec2(0.,t)),fbm(p*1.05+vec2(5.2,1.3)-t*.8));\nvec2 r=vec2(fbm(p*1.1+1.3*q+vec2(1.7,9.2)+t*.6),fbm(p*1.1+1.3*q+vec2(8.3,2.8)-t*.5));\nfloat n=fbm(p+1.4*r);\nvec3 ink0=hex(%INK0%),ink2=hex(%INK2%),indigo=hex(%INDIGO%),blue=hex(%BLUE%),violet=hex(%VIOLET%),soft=hex(%SOFT%);\nvec3 col=mix(ink0,ink2,smoothstep(-.45,.45,n));\ncol=mix(col,indigo,smoothstep(.0,.7,r.x+.2*n)*.45);\ncol=mix(col,violet,smoothstep(.05,.6,q.y+.25*r.y)*.38*(1.-.55*uv.x));\nvec2 L=vec2(.86+.05*sin(t*2.3),.1+.06*cos(t*1.7))-uOff*vec2(1.2,.9);\nfloat lr=length((uv-L)*vec2(asp,1.))+.35*n;\ncol=mix(col,blue,smoothstep(1.05,.1,lr)*.55);\ncol+=soft*smoothstep(.45,.0,lr)*.16;\nfloat v=length((uv-vec2(.55,.46))*vec2(1.25,1.));\ncol*=mix(1.,.3,smoothstep(.38,1.05,v));\ngl_FragColor=vec4(col,1.);\n}", y = {
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
	}, b = "radial-gradient(60% 55% at 88% 6%, rgba(61,91,224,.45), rgba(61,91,224,0) 70%),radial-gradient(55% 60% at 22% 70%, rgba(91,68,184,.22), rgba(91,68,184,0) 70%),radial-gradient(80% 80% at 55% 46%, #17103A, #06041A 85%)";
}));
//#endregion
//#region src/faq.js
function S(e) {
	if (!e || e.dataset.pvInit) return null;
	if (e.dataset.pvInit = "1", !document.getElementById("pv-faq-css")) {
		let e = document.createElement("style");
		e.id = "pv-faq-css", e.textContent = C, document.head.appendChild(e);
	}
	let t = [...e.querySelectorAll(".faq-item")], n = [], r = (e, t) => {
		e.classList.toggle("is-open", t), e._q.setAttribute("aria-expanded", t ? "true" : "false"), e._a.inert = !t;
	};
	return t.forEach((e) => {
		let i = e.querySelector(".faq-q"), a = e.querySelector(".faq-a");
		if (!i || !a) return;
		let o = "pv-faq-" + ++w;
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
var C, w, T = e((() => {
	C = "\n[data-pv=\"faq\"].pv-faq-on .faq-a{display:grid;grid-template-rows:0fr;transition:grid-template-rows .35s cubic-bezier(.2,.7,.2,1)}\n[data-pv=\"faq\"].pv-faq-on .faq-a > .pv-faq-in{min-height:0;overflow:hidden}\n[data-pv=\"faq\"].pv-faq-on .faq-item.is-open .faq-a{grid-template-rows:1fr}\n[data-pv=\"faq\"] .faq-q{display:flex;justify-content:space-between;align-items:center;gap:1.5rem}\n[data-pv=\"faq\"] .faq-q:focus-visible{outline:2px solid #141238;outline-offset:4px;border-radius:4px}\n.pv-faq-pm{flex:none;position:relative;width:2.5rem;height:2.5rem;border-radius:999px;border:1px solid rgba(20,18,56,.2);transition:background-color .2s,border-color .2s,color .2s}\n.pv-faq-pm::before,.pv-faq-pm::after{content:'';position:absolute;left:50%;top:50%;width:.875rem;height:1.5px;background:currentColor;transform:translate(-50%,-50%);transition:transform .3s}\n.pv-faq-pm::after{transform:translate(-50%,-50%) rotate(90deg)}\n[data-pv=\"faq\"] .faq-q:hover .pv-faq-pm{border-color:#141238}\n[data-pv=\"faq\"] .faq-item.is-open .pv-faq-pm{background:#141238;color:#f8f8f8;border-color:#141238}\n[data-pv=\"faq\"] .faq-item.is-open .pv-faq-pm::after{transform:translate(-50%,-50%) rotate(0)}\n@media (prefers-reduced-motion:reduce){[data-pv=\"faq\"] .faq-a,.pv-faq-pm,.pv-faq-pm::before,.pv-faq-pm::after{transition:none}}", w = 0;
}));
//#endregion
//#region src/nav.js
function E() {
	if (document.getElementById("pv-nav-css")) return;
	let e = document.createElement("style");
	e.id = "pv-nav-css", e.textContent = M, document.head.appendChild(e);
}
function D(e) {
	return r(e, {
		aspect: () => .62,
		loop: 1e6,
		fade: Infinity,
		still: 1.2,
		layout(e) {
			e.S = Math.max(.7, Math.min(1.2, e.W / 400));
		},
		draw(e, t) {
			e.vMark(e.W / 2, e.H / 2, e.H * .15, t, Math.sin(Math.PI * a(t % 3, .3, 1.9)), 0, 1, !0);
		}
	});
}
function O(e) {
	e && (e.removeAttribute("type"), e.removeAttribute("href"), e.setAttribute("role", "button"), e.tabIndex = 0, e.addEventListener("keydown", (t) => {
		(t.key === "Enter" || t.key === " ") && (t.preventDefault(), e.click());
	}));
}
function k(e) {
	if (!e || e.dataset.pvInit) return null;
	e.dataset.pvInit = "1", E();
	let t = matchMedia("(max-width: 991px)"), n = e.querySelector(".pvn-in"), r = e.querySelector(".pvn-links"), i = e.querySelector(".pvn-hl"), a = e.querySelector(".pvn-toggle"), o = e.querySelector(".pvn-burger"), c = [...e.querySelectorAll(".pvn-item")], l = e.querySelector(".pvn-stage"), u = e.querySelector(".pvn-prev"), d = e.querySelector(".pvn-prev-n"), f = e.querySelector(".pvn-s"), p = [], m = (e, t, n, r) => {
		e && (e.addEventListener(t, n, r), p.push(() => e.removeEventListener(t, n, r)));
	};
	O(a), O(o), a && a.setAttribute("aria-expanded", "false");
	let h = (e) => e.dataset.col !== void 0 && e.dataset.col !== "" ? A[+e.dataset.col % A.length] : "#F4F4F4";
	if (c.forEach((e) => {
		e.style.setProperty("--c", h(e)), N(e) && e.setAttribute("aria-current", "page");
	}), e.querySelectorAll(".pvn-links a.pvn-link").forEach((e) => {
		e !== a && e.hasAttribute("href") && N(e) && e.setAttribute("aria-current", "page");
	}), a && c.some((e) => e.getAttribute("aria-current") === "page") && a.classList.add("is-current"), f && !f.children.length) {
		let t = document.createElement("div");
		t.className = "pvn-s-label", t.textContent = (a ? a.textContent : "Platform").trim(), f.appendChild(t);
		let n = null;
		c.forEach((e) => {
			if (n !== null && e.dataset.group !== n) {
				let e = document.createElement("div");
				e.className = "pvn-s-sep", f.appendChild(e);
			}
			n = e.dataset.group;
			let t = e.cloneNode(!0);
			t.className = "pvn-s-prod", t.querySelector(".pvn-item-q")?.remove(), f.appendChild(t);
		});
		let r = document.createElement("div");
		r.className = "pvn-s-sep", f.appendChild(r), e.querySelectorAll(".pvn-links a.pvn-link").forEach((e) => {
			let t = e.cloneNode(!0);
			t.className = "pvn-s-link", f.appendChild(t);
		});
		let i = e.querySelector(".pvn-cta .button");
		if (i) {
			let e = document.createElement("div");
			e.className = "pvn-s-cta", e.appendChild(i.cloneNode(!0)), f.appendChild(e);
		}
		[...f.children].forEach((e, t) => e.style.setProperty("--i", t));
	}
	let g = e.querySelector(".pvn-bar"), _ = () => {
		let t = document.querySelector(".main-wrapper .padding-global"), r = document.querySelector(".main-wrapper .container-large");
		if (t && g) {
			let e = getComputedStyle(t).paddingLeft;
			g.style.paddingLeft = e, g.style.paddingRight = e;
		}
		if (r && n) {
			let e = getComputedStyle(r).maxWidth;
			e && e !== "none" && (n.style.maxWidth = e);
		}
		if (f && t) {
			let n = e.querySelector(".pvn-sheet");
			if (n) {
				let e = getComputedStyle(t).paddingLeft;
				n.style.paddingLeft = e, n.style.paddingRight = e;
			}
		}
	};
	_(), m(window, "resize", _, { passive: !0 });
	let v = !1, y = !1, b = !1, x = (e) => {
		if (!i || !r) return;
		let t = e.getBoundingClientRect(), n = r.getBoundingClientRect();
		v || (i.style.transition = "none"), i.style.width = t.width + "px", i.style.transform = `translate(${t.left - n.left}px,-50%)`, v || (i.offsetWidth, i.style.transition = ""), i.style.opacity = 1, v = !0;
	}, S = () => {
		i && (i.style.opacity = 0), v = !1;
	}, C = () => {
		b && a ? x(a) : !y && !(r && r.contains(document.activeElement)) && S();
	};
	r && (r.querySelectorAll(".pvn-link").forEach((e) => {
		m(e, "pointerenter", () => {
			x(e), e !== a && z(!1);
		}, { passive: !0 }), m(e, "focus", () => x(e)), m(e, "blur", () => setTimeout(C, 0));
	}), m(r, "pointerenter", () => {
		y = !0;
	}, { passive: !0 }), m(r, "pointerleave", () => {
		y = !1, C();
	}, { passive: !0 }));
	let w = -1, T = null, k = null, j = (e) => {
		let t = c[e];
		if (e === w || !t || !l) return;
		w = e, c.forEach((t, n) => t.classList.toggle("is-active", n === e)), u && (u.href = t.href), d && (d.textContent = (t.querySelector(".pvn-item-n") || t).textContent.trim());
		let n = document.createElement("div");
		n.className = "pvn-scene", t.dataset.scene && (n.dataset.scene = t.dataset.scene, n.dataset.col = t.dataset.col), l.appendChild(n);
		let r = t.dataset.scene ? s(n) : D(n);
		requestAnimationFrame(() => n.classList.add("is-on"));
		let i = k, a = T;
		i && (i.classList.remove("is-on"), setTimeout(() => {
			a && a.destroy(), i.remove();
		}, 450)), k = n, T = r;
	}, M = () => {
		T && T.destroy(), k && k.remove(), T = k = null, w = -1, c.forEach((e) => e.classList.remove("is-active"));
	}, P = 0, F = 0, I = 0, L = 0, R = () => Math.max(0, c.findIndex((e) => e.getAttribute("aria-current") === "page"));
	function z(t, n) {
		clearTimeout(P), clearTimeout(F), !a || b === t ? t && n && c[w] && c[w].focus() : (b = t, e.classList.toggle("is-open", t), a.setAttribute("aria-expanded", t), clearTimeout(I), t ? (L = performance.now(), j(w < 0 ? R() : w), x(a), n && c[w] && c[w].focus()) : (I = setTimeout(M, 450), C()));
	}
	a && (m(a, "pointerenter", (e) => {
		e.pointerType === "mouse" && (clearTimeout(F), P = setTimeout(() => z(!0), 80));
	}, { passive: !0 }), m(a, "pointerleave", () => clearTimeout(P), { passive: !0 }), m(a, "click", (e) => {
		e.detail === 0 ? z(!b, !0) : b ? performance.now() - L > 450 && z(!1) : z(!0);
	}), m(a, "keydown", (e) => {
		e.key === "ArrowDown" && (e.preventDefault(), z(!0, !0));
	}), m(n, "pointerleave", (e) => {
		e.pointerType === "mouse" && (F = setTimeout(() => z(!1), 200));
	}, { passive: !0 }), m(n, "pointerenter", () => clearTimeout(F), { passive: !0 }), c.forEach((e, t) => {
		m(e, "pointerenter", () => j(t), { passive: !0 }), m(e, "focus", () => j(t)), m(e, "keydown", (e) => {
			(e.key === "ArrowDown" || e.key === "ArrowUp") && (e.preventDefault(), c[(t + (e.key === "ArrowDown" ? 1 : c.length - 1)) % c.length].focus());
		});
	}), m(e, "focusout", (e) => {
		b && !n.contains(e.relatedTarget) && z(!1);
	}), m(document, "pointerdown", (e) => {
		b && !n.contains(e.target) && z(!1);
	}, { passive: !0 }));
	let B = !1;
	function V(t) {
		B !== t && o && (B = t, e.classList.toggle("is-sheet", t), o.setAttribute("aria-expanded", t), document.documentElement.classList.toggle("pvn-lock", t), window.lenis && (t ? window.lenis.stop() : window.lenis.start()), t && q(!1));
	}
	m(o, "click", () => V(!B)), f && f.querySelectorAll("a").forEach((e) => m(e, "click", () => V(!1))), m(t, "change", () => {
		z(!1), V(!1), _();
	}), m(document, "keydown", (e) => {
		e.key === "Escape" && (b && (z(!1), a.focus()), B && (V(!1), o.focus()));
	});
	let H = window.scrollY, U = 0, W = !1, G = !1, K = () => document.documentElement.style.setProperty("--nav-h", (W || !n ? 0 : Math.round(n.getBoundingClientRect().bottom)) + "px");
	function q(t) {
		W !== t && (W = t, e.classList.toggle("is-hidden", t), document.documentElement.classList.toggle("nav-hidden", t), K(), t && (z(!1), S()));
	}
	K(), m(window, "resize", K, { passive: !0 });
	let J = () => {
		let t = window.scrollY;
		!G && t > 24 ? (G = !0, e.classList.add("is-float")) : G && t < 8 && (G = !1, e.classList.remove("is-float"));
		let n = t - H;
		H = t, n && (U = Math.sign(n) === Math.sign(U) ? U + n : n, U > 48 && t > 240 && !b && !B ? q(!0) : (U < -24 || t < 120) && q(!1));
	};
	return m(window, "scroll", J, { passive: !0 }), J(), function() {
		p.forEach((e) => e()), clearTimeout(P), clearTimeout(F), clearTimeout(I), M(), V(!1), e.classList.remove("is-open", "is-float", "is-hidden", "is-sheet"), a && a.classList.remove("is-current"), delete e.dataset.pvInit;
	};
}
var A, j, M, N, P = e((() => {
	n(), o(), A = [
		i[0],
		i[1],
		i[2],
		i[3],
		i[5]
	], j = "cubic-bezier(.2,.7,.2,1)", M = `
html.pvn-lock, html.pvn-lock body{overflow:hidden}
.pvn{transition:transform .7s ${j}, opacity .5s ease}
.pvn.is-hidden{transform:translateY(-110%);opacity:0;transition:transform .5s cubic-bezier(.45,0,.2,1), opacity .35s ease .1s}
.pvn-bg{transform:scale(.985);transition:opacity .45s ease, transform .8s ${j}}
.pvn-bg::before{content:'';position:absolute;inset:0;border-radius:inherit;padding:.5px;pointer-events:none;
  background:linear-gradient(180deg, rgba(255,255,255,.14) 0%, rgba(255,255,255,.03) 50%, rgba(255,255,255,0) 100%);
  -webkit-mask:linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude}
.pvn.is-float .pvn-bg{opacity:1;transform:none}
.pvn-logo svg{display:block;width:100%;height:100%}
.pvn-link{font:inherit;transition:color .25s ease}
.pvn-link:focus-visible, .pvn.is-open .pvn-toggle, .pvn-link[aria-current="page"], .pvn-toggle.is-current{color:#f8f8f8}
/* page en cours : pastille sombre fixe, même forme que la pastille de survol (qui passe dessous) */
.pvn-link[aria-current="page"], .pvn-toggle.is-current{background-color:rgba(10,8,30,.55);box-shadow:inset 0 0 0 .5px rgba(248,248,248,.12)}
.pvn :focus-visible{outline:2px solid rgba(248,248,248,.6);outline-offset:2px}
.pvn-chev{transition:transform .4s ${j}}
.pvn.is-open .pvn-chev{transform:rotate(180deg)}
.pvn-hl{transform:translate(0,-50%);transition:transform .4s ${j}, width .4s ${j}, opacity .25s ease}
.pvn-cta .button{white-space:nowrap}
.pvn-panel{transform:translate(-50%,-4px);transition:opacity .2s ease, transform .3s ${j}, visibility 0s linear .3s}
.pvn-panel::before{content:'';position:absolute;left:0;right:0;top:-1rem;height:1rem}
.pvn.is-open .pvn-panel{opacity:1;visibility:visible;pointer-events:auto;transform:translate(-50%,0);transition:opacity .3s ease, transform .5s ${j}, visibility 0s}
.pvn-panel-in{isolation:isolate}
.pvn-panel-in::after{content:'';position:absolute;inset:0;border-radius:inherit;padding:.5px;pointer-events:none;
  background:linear-gradient(150deg, rgba(248,248,248,.34) 0%, rgba(248,248,248,.08) 40%, rgba(248,248,248,.04) 75%, rgba(214,170,240,.18) 100%);
  -webkit-mask:linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;}
.pvn-item{transition:background-color .25s ease}
.pvn-dot{box-shadow:inset 0 0 0 1.5px var(--c, #f4f4f4);transition:background-color .25s ease}
.pvn-item.is-active{background:rgba(255,255,255,.06)}
.pvn-item.is-active .pvn-dot, .pvn-item[aria-current="page"] .pvn-dot{background:var(--c, #f4f4f4)}
.pvn-scene{position:absolute !important;left:0;top:50%;width:100%;transform:translateY(-50%);opacity:0;transition:opacity .4s ease}
.pvn-scene.is-on{opacity:1}
.pvn-prev-go{transition:transform .4s ${j}}
.pvn-prev:hover .pvn-prev-go{transform:translateX(3px)}
.pvn-sheet{transition:opacity .35s ease, visibility 0s linear .35s}
.pvn.is-sheet .pvn-sheet{opacity:1;visibility:visible;pointer-events:auto;transition:opacity .4s ease, visibility 0s}
.pvn-s > *{opacity:0;transform:translateY(10px);transition:opacity .3s ease, transform .5s ${j};transition-delay:0s}
.pvn.is-sheet .pvn-s > *{opacity:1;transform:none;transition:opacity .45s ease, transform .7s ${j};transition-delay:calc(var(--i) * 30ms + 100ms)}
.pvn-s-label{margin:0 0 .5rem;font-family:var(--af-mono, 'Roboto Mono', monospace);font-size:.75rem;letter-spacing:.12em;text-transform:uppercase;color:#e2c70a}
.pvn-s-prod{display:grid;grid-template-columns:auto minmax(0,1fr);align-items:center;column-gap:.875rem;padding:.625rem 0;color:#f8f8f8;text-decoration:none}
.pvn-s-prod .pvn-item-n{font-size:1.125rem}
.pvn-s-sep{height:1px;margin:1rem 0;background:rgba(248,248,248,.14)}
.pvn-s-link{display:flex;align-items:center;gap:.625rem;padding:.5rem 0;font-size:1.75rem;font-weight:300;line-height:1.2;letter-spacing:-.01em;color:#f8f8f8;text-decoration:none}
.pvn-s-link .pvn-ext{width:.875rem;height:.875rem}
.pvn-s-cta{margin-top:auto;padding-top:2rem}
.pvn-s-cta .button{width:100%}
.pvn-burger-line{transition:transform .5s ${j}}
@media (max-width:991px){
  .pvn.is-sheet .pvn-burger-line:first-child{transform:translateY(3.25px) rotate(45deg)}
  .pvn.is-sheet .pvn-burger-line:last-child{transform:translateY(-3.25px) rotate(-45deg)}
  .pvn.is-sheet .pvn-bg{opacity:0}
}
@media (min-width:992px){ .pvn-sheet{display:none} }
@media (prefers-reduced-motion:reduce){ .pvn, .pvn *, .pvn *::before, .pvn *::after{transition-duration:.01ms !important;transition-delay:0s !important} }`, N = (e) => {
		try {
			let t = new URL(e.href, location.href);
			return t.origin === location.origin && t.pathname.replace(/\/$/, "") === location.pathname.replace(/\/$/, "");
		} catch {
			return !1;
		}
	};
}));
//#endregion
//#region src/sliders.js
function F() {
	if (document.getElementById("pv-sliders-css")) return;
	let e = document.createElement("style");
	e.id = "pv-sliders-css", e.textContent = H, document.head.appendChild(e);
}
function I() {
	if (!U) {
		if (!document.querySelector("link[data-pv-swiper]")) {
			let e = document.createElement("link");
			e.rel = "stylesheet", e.href = `${z}/swiper-bundle.min.css`, e.dataset.pvSwiper = "", document.head.appendChild(e);
		}
		U = import(
			/* @vite-ignore */
			`${z}/swiper-bundle.min.mjs`
).then((e) => e.default || e.Swiper);
	}
	return U;
}
function L(e, t) {
	let n = e.getAttribute("data-swiper-id");
	if (n) {
		let e = [...document.querySelectorAll(`[data-swiper-${t}="${n}"]`)];
		if (e.length) return e;
	}
	for (let n = e; n && n !== document.body; n = n.parentElement) {
		let e = n.querySelectorAll(`[data-swiper-${t}]`);
		if (e.length) return [...e];
	}
	return [];
}
function R(e) {
	if (!e || e.dataset.pvInit) return null;
	let t = V[e.getAttribute("data-swiper")], n = e.querySelector(".swiper");
	if (!t || !n) return null;
	e.dataset.pvInit = "1", F();
	let r = null, i = !1, a = [];
	return I().then((o) => {
		if (i || !o) return;
		n.swiper && !n.swiper.destroyed && n.swiper.destroy(!0, !0);
		let s = {
			grabCursor: !0,
			watchOverflow: !0,
			...t
		};
		B() && (s.speed = 0), r = new o(n, s);
		let c = L(e, "prev"), l = L(e, "next"), u = () => r.slidePrev(), d = () => r.slideNext();
		c.forEach((e) => {
			e.addEventListener("click", u), a.push(() => e.removeEventListener("click", u));
		}), l.forEach((e) => {
			e.addEventListener("click", d), a.push(() => e.removeEventListener("click", d));
		});
		let f = [...new Set([...c, ...l].map((e) => e.closest(".slider-arrows-wrapper") || e))], p = () => {
			c.forEach((e) => e.classList.toggle("is-disabled", r.isBeginning)), l.forEach((e) => e.classList.toggle("is-disabled", r.isEnd)), f.forEach((e) => {
				e.style.display = r.isLocked ? "none" : "";
			});
		};
		r.on("slideChange reachBeginning reachEnd fromEdge resize lock unlock", p), p();
	}).catch(() => {}), function() {
		i = !0, a.forEach((e) => e()), r && !r.destroyed && r.destroy(!0, !0), delete e.dataset.pvInit;
	};
}
var z, B, V, H, U, W = e((() => {
	z = "https://cdn.jsdelivr.net/npm/swiper@11.2.10", B = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches, V = {
		news: {
			slidesPerView: "auto",
			spaceBetween: 20,
			breakpoints: { 768: { spaceBetween: 40 } }
		},
		feature: {
			slidesPerView: 1,
			spaceBetween: 24,
			speed: 600,
			autoHeight: !0,
			observer: !0,
			observeParents: !0
		}
	}, H = ":is([data-swiper-prev],[data-swiper-next]).is-disabled{opacity:.1;pointer-events:none;cursor:default}", U = null;
}));
//#endregion
//#region src/back-to-top.js
function G() {
	let e = document.body, t = e.hasAttribute("tabindex");
	t || e.setAttribute("tabindex", "-1"), e.focus({ preventScroll: !0 }), t || e.addEventListener("blur", () => e.removeAttribute("tabindex"), { once: !0 });
}
function K(e) {
	if (!e || e.dataset.pvInit) return null;
	e.dataset.pvInit = "1";
	let t = 0, n = (e) => {
		e.preventDefault();
		let n = window.scrollY || document.documentElement.scrollTop;
		if (n <= 0) return G();
		if (J()) return window.lenis ? window.lenis.scrollTo(0, {
			immediate: !0,
			force: !0
		}) : window.scrollTo(0, 0), G();
		let r = Math.min(1.8, Math.max(.8, n / 3e3));
		if (window.lenis && typeof window.lenis.scrollTo == "function") {
			window.lenis.scrollTo(0, {
				duration: r,
				easing: q,
				force: !0,
				onComplete: G
			});
			return;
		}
		cancelAnimationFrame(t);
		let i = performance.now(), a = (e) => {
			let o = Math.min(1, (e - i) / (r * 1e3));
			window.scrollTo(0, n * (1 - q(o))), o < 1 ? t = requestAnimationFrame(a) : G();
		};
		t = requestAnimationFrame(a);
	};
	return e.addEventListener("click", n), function() {
		cancelAnimationFrame(t), e.removeEventListener("click", n), delete e.dataset.pvInit;
	};
}
var q, J, Y = e((() => {
	q = (e) => e < .5 ? 16 * e ** 5 : 1 - (-2 * e + 2) ** 5 / 2, J = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
})), X = /* @__PURE__ */ t((() => {
	p(), x(), T(), P(), W(), Y(), f(), document.querySelectorAll("header.section_header, [data-af-bg], .feature-grid > .video-animation").forEach(g), document.querySelectorAll("[data-pv=\"faq\"]").forEach(S), document.querySelectorAll("[data-pv=\"nav\"]").forEach(k), document.querySelectorAll("[data-swiper]").forEach(R), document.querySelectorAll("[data-pv=\"back-to-top\"]").forEach(K);
}));
//#endregion
export default X();
