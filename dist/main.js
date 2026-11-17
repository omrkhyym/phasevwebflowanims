import { n as e, t } from "./rolldown-runtime-wf392T_D.mjs";
import { c as n, d as r, i, l as a, m as o, n as s, o as c, p as l, r as u, s as d, t as f, u as p } from "./bonv-draw-D7G52O51.mjs";
//#region src/hero-sequence/engine.js
function m(e) {
	let t = e.getContext("webgl2", {
		alpha: !0,
		antialias: !1,
		premultipliedAlpha: !0
	});
	if (!t) throw Error("WebGL2 indisponible");
	let n = new Float32Array(g * 2), r = new Float32Array(g * 4), i = new Uint32Array(g), a = 11, o = () => (a = a * 16807 % 2147483647) / 2147483647;
	for (let e = 0; e < g; e++) i[e] = e;
	for (let e = 131071; e > 0; e--) {
		let t = Math.floor(o() * (e + 1));
		[i[e], i[t]] = [i[t], i[e]];
	}
	for (let e = 0; e < g; e++) {
		let t = i[e], a = t % 512, s = Math.floor(t / 512);
		n[e * 2] = -1 + 2 * a / 511, n[e * 2 + 1] = -1 + 2 * s / 255;
		for (let t = 0; t < 4; t++) r[e * 4 + t] = o();
	}
	let s = t.createVertexArray();
	t.bindVertexArray(s), t.bindBuffer(t.ARRAY_BUFFER, t.createBuffer()), t.bufferData(t.ARRAY_BUFFER, n, t.STATIC_DRAW), t.enableVertexAttribArray(0), t.vertexAttribPointer(0, 2, t.FLOAT, !1, 0, 0), t.bindBuffer(t.ARRAY_BUFFER, t.createBuffer()), t.bufferData(t.ARRAY_BUFFER, r, t.STATIC_DRAW), t.enableVertexAttribArray(1), t.vertexAttribPointer(1, 4, t.FLOAT, !1, 0, 0);
	function c(e, n) {
		let r = t.createShader(e);
		if (t.shaderSource(r, n), t.compileShader(r), !t.getShaderParameter(r, t.COMPILE_STATUS)) throw Error(t.getShaderInfoLog(r));
		return r;
	}
	let l = null, u = {}, d = [], f = {}, p = /* @__PURE__ */ new Map();
	function m(e) {
		let n = p.get(e.id);
		if (n) {
			({prog: l, loc: u, sceneKeys: d, fixedVals: f} = n);
			return;
		}
		let r = e.fixed || {}, i = [...Object.keys(e.params), ...Object.keys(r)].map((e) => `uniform float u_${e};`).join("\n"), a = t.createProgram();
		if (t.attachShader(a, c(t.VERTEX_SHADER, _ + i + "\n" + e.glsl + v)), t.attachShader(a, c(t.FRAGMENT_SHADER, y)), t.linkProgram(a), !t.getProgramParameter(a, t.LINK_STATUS)) throw Error(t.getProgramInfoLog(a));
		l = a, d = Object.keys(e.params), u = {}, f = r, [
			"t",
			"scale",
			"cam",
			"dpr",
			"dof",
			"focus",
			"size",
			"bright",
			"shift",
			"rot",
			"res",
			...d,
			...Object.keys(r)
		].forEach((e) => {
			u[e] = t.getUniformLocation(a, "u_" + e);
		}), p.set(e.id, {
			prog: l,
			loc: u,
			sceneKeys: d,
			fixedVals: f
		});
	}
	let h = 1, b = 1, x = 1;
	function S() {
		x = Math.min(devicePixelRatio || 1, 2), h = Math.max(1, Math.round(e.clientWidth * x)), b = Math.max(1, Math.round(e.clientHeight * x)), e.width = h, e.height = b;
	}
	function C(e, n, r) {
		t.viewport(0, 0, h, b), t.clearColor(0, 0, 0, 0), t.clear(t.COLOR_BUFFER_BIT), l && (t.useProgram(l), t.bindVertexArray(s), t.uniform1f(u.t, e), t.uniform1f(u.scale, Math.min(h, b * 1.6) * .9 * n.zoom), t.uniform1f(u.cam, n.cam), t.uniform1f(u.dpr, x), t.uniform1f(u.dof, n.dof), t.uniform1f(u.focus, n.focus), t.uniform1f(u.size, n.size), t.uniform1f(u.bright, n.bright), t.uniform1f(u.shift, n.shift || 0), t.uniform2f(u.rot, n.yaw, n.pitch), t.uniform2f(u.res, h, b), d.forEach((e) => t.uniform1f(u[e], n[e])), Object.entries(f).forEach(([e, n]) => t.uniform1f(u[e], n)), t.enable(t.BLEND), t.blendFunc(t.ONE, t.ONE), t.drawArrays(t.POINTS, 0, Math.min(g, Math.max(1, Math.round(r)))));
	}
	return {
		useScene: m,
		resize: S,
		render: C
	};
}
var h, g, _, v, y, b = e((() => {
	h = {
		cam: {
			label: "Distance caméra",
			min: 1.2,
			max: 5,
			step: .01,
			value: 2.6
		},
		pitch: {
			label: "Inclinaison",
			min: -.6,
			max: 1.4,
			step: .01,
			value: .06
		},
		yaw: {
			label: "Rotation",
			min: -3.14,
			max: 3.14,
			step: .01,
			value: 0
		},
		zoom: {
			label: "Échelle",
			min: .3,
			max: 2,
			step: .01,
			value: 1
		},
		size: {
			label: "Taille des points",
			min: .3,
			max: 4,
			step: .01,
			value: 1
		},
		bright: {
			label: "Luminosité",
			min: .05,
			max: 4,
			step: .01,
			value: 1
		},
		dof: {
			label: "Flou de profondeur",
			min: 0,
			max: 2,
			step: .01,
			value: 1
		},
		focus: {
			label: "Zone nette (largeur)",
			min: 0,
			max: 1.5,
			step: .01,
			value: .35
		},
		shift: {
			label: "Décalage vers la droite",
			min: -.8,
			max: .8,
			step: .01,
			value: 0
		}
	}, g = 131072, _ = "#version 300 es\nlayout(location=0) in vec2 a_g;   // position sur une grille régulière (pour les scènes de plan)\nlayout(location=1) in vec4 a_r;   // aléas\nuniform float u_t, u_scale, u_cam, u_dpr, u_dof, u_focus, u_size, u_bright, u_shift;   // shift : décalage horizontal de l'image (0 centré)\nuniform vec2 u_rot, u_res;\nout float v_a; out float v_b; out float v_s; out vec2 v_d; out vec3 v_c;\nfloat S_out=0.;   // une scène peut le poser : étire le point en traînée, dans le sens de la fuite depuis le centre\nconst float PI=3.14159265, TAU=6.2831853;\nconst vec3 MAU=vec3(.663,.624,.847), BLU=vec3(.471,.659,.878), TEA=vec3(.498,.910,.812), WHI=vec3(.957);\nfloat ez(float k){ return k<.5?4.*k*k*k:1.-pow(-2.*k+2.,3.)/2.; }\nvec3 rotY(vec3 p, float a){ float c=cos(a), s=sin(a); return vec3(c*p.x+s*p.z, p.y, -s*p.x+c*p.z); }\nvec3 rotX(vec3 p, float a){ float c=cos(a), s=sin(a); return vec3(p.x, c*p.y-s*p.z, s*p.y+c*p.z); }\nvec3 sphereDir(vec4 r){ float ct=r.y*2.-1., sn=sqrt(1.-ct*ct), ph=r.z*TAU; return vec3(sn*cos(ph),ct,sn*sin(ph)); }\n", v = "\nvoid main(){\n  vec3 P; float A; vec3 C;\n  scene(a_g, a_r, u_t, P, A, C);\n  float cy=cos(u_rot.x), sy=sin(u_rot.x); P=vec3(cy*P.x+sy*P.z,P.y,-sy*P.x+cy*P.z);\n  float cp=cos(u_rot.y), sp=sin(u_rot.y); P=vec3(P.x,cp*P.y+sp*P.z,cp*P.z-sp*P.y);\n  float zr=u_cam+P.z, z=max(zr,.3); vec2 s=P.xy/z*u_scale;\n  gl_Position=vec4(s.x/u_res.x*2.+u_shift, s.y/u_res.y*2., 0., 1.);\n  // profondeur de champ : net près du centre de la scène, disques doux devant et derrière (l'énergie du point est conservée)\n  float near=clamp(2.25-z*.62,.08,1.);\n  float base=(1.+2.4*near)*u_size, blur=clamp(abs(P.z)-u_focus,0.,1.6)*u_dof;\n  float sz=min(base+14.*blur*blur,80.);\n  v_b=clamp(blur*1.8,0.,1.);\n  v_s=clamp(S_out,0.,2.); v_d=normalize(s+1e-4);\n  gl_PointSize=u_dpr*sz*(1.+2.*v_s);\n  v_a=A*u_bright*near*pow(base/sz,1.25)*smoothstep(.35,.7,zr);\n  v_c=C;\n}", y = "#version 300 es\nprecision highp float;\nin float v_a; in float v_b; in float v_s; in vec2 v_d; in vec3 v_c; out vec4 o;\nvoid main(){\n  vec2 q=gl_PointCoord-.5; q.y=-q.y;\n  vec2 ql=vec2(dot(q,v_d), dot(q,vec2(-v_d.y,v_d.x))); ql.y*=1.+4.*v_s;\n  float d=length(ql);\n  float sharp=smoothstep(.5,.15,d), bokeh=smoothstep(.5,.38,d)*(.7+.3*smoothstep(.1,.45,d));\n  float a=mix(sharp,bokeh,v_b)*v_a; if(a<.002) discard;\n  o=vec4(v_c*a,a);\n}";
})), x, S = e((() => {
	x = {
		id: "blob",
		frozen: !0,
		name: "1. Blob",
		duration: 4.5,
		camera: {
			cam: 2.6,
			pitch: -.1,
			yaw: 0,
			zoom: 1,
			size: .89,
			bright: 1,
			dof: .88,
			focus: .41,
			shift: .3
		},
		params: {
			count: {
				label: "Densité (particules)",
				min: 2e3,
				max: 131072,
				step: 1e3,
				value: 5e4
			},
			radius: {
				label: "Rayon",
				min: .05,
				max: 1.2,
				step: .01,
				value: .36
			},
			deform: {
				label: "Déformation",
				min: 0,
				max: 1.2,
				step: .01,
				value: .27
			},
			freq: {
				label: "Finesse des bosses",
				min: .2,
				max: 4,
				step: .01,
				value: .48
			},
			warp: {
				label: "Torsion organique",
				min: 0,
				max: 1,
				step: .01,
				value: 0
			},
			speed: {
				label: "Vitesse de déformation",
				min: 0,
				max: 3,
				step: .01,
				value: 1.01
			},
			spin: {
				label: "Rotation sur lui-même",
				min: -1.5,
				max: 1.5,
				step: .01,
				value: -.74
			},
			volume: {
				label: "Volume (0 plein, 1 surface)",
				min: 0,
				max: 1,
				step: .01,
				value: .49
			},
			shell: {
				label: "Épaisseur du bord",
				min: 0,
				max: .5,
				step: .01,
				value: .02
			},
			alpha: {
				label: "Opacité par particule",
				min: .005,
				max: .4,
				step: .001,
				value: .059
			},
			tint: {
				label: "Teinte (blanc → mauve au bord)",
				min: 0,
				max: 1,
				step: .01,
				value: .41
			},
			blue: {
				label: "Part de bleu",
				min: 0,
				max: 1,
				step: .01,
				value: .11
			},
			ramp: {
				label: "Montée de la déformation et de la taille (s)",
				min: .1,
				max: 12,
				step: .1,
				value: 3
			},
			r0: {
				label: "Taille au départ (part de la taille finale)",
				min: .2,
				max: 1,
				step: .01,
				value: .6
			},
			camEnd: {
				label: "Zoom : distance caméra à la fin",
				min: 1.2,
				max: 5,
				step: .01,
				value: 1.9
			},
			zoomDur: {
				label: "Durée du zoom (s)",
				min: 1,
				max: 12,
				step: .1,
				value: 4.5
			},
			coreR: {
				label: "Noyau : taille (part du blob)",
				min: .1,
				max: .8,
				step: .01,
				value: .2
			},
			coreShare: {
				label: "Noyau : part des particules",
				min: 0,
				max: .4,
				step: .005,
				value: .1
			},
			coreThick: {
				label: "Noyau : épaisseur du contour (0 net)",
				min: 0,
				max: .5,
				step: .01,
				value: .03
			},
			coreBright: {
				label: "Noyau : luminosité",
				min: .2,
				max: 5,
				step: .05,
				value: 1.8
			},
			coreSpin: {
				label: "Noyau : rotation propre",
				min: -1.5,
				max: 1.5,
				step: .01,
				value: .15
			}
		},
		cameraAt(e, t) {
			let n = Math.min(1, e / t.zoomDur), r = n < .5 ? 4 * n * n * n : 1 - (-2 * n + 2) ** 3 / 2;
			return { cam: t.cam + (t.camEnd - t.cam) * r };
		},
		glsl: "\nfloat bn(vec3 p, float t){\n  return .5*sin(dot(p,vec3(1.7,2.3,-1.1))*1.9+t*.9)+.35*sin(dot(p,vec3(-2.6,.9,1.8))*2.3-t*1.2)\n        +.25*sin(dot(p,vec3(1.2,-3.1,2.4))*2.9+t*1.6)+.15*sin(dot(p,vec3(3.7,1.4,-2.9))*3.7-t*2.1);\n}\n// le noyau : une part fixe des particules (même tirage dans toutes les scènes qui reprennent le blob)\nbool isCore(vec4 r){ return fract(r.y*17.3+r.z*7.1) < u_coreShare; }\nvoid scene(vec2 g, vec4 r, float t, out vec3 P, out float A, out vec3 C){\n  vec3 dir=sphereDir(r);\n  float ts=t*u_speed;\n  vec3 wd=dir+u_warp*vec3(sin(ts*.7+dir.y*3.),sin(ts*.6+dir.z*3.),sin(ts*.8+dir.x*3.));\n  // répartition dans le volume : 1 - volume = exposant (0 → plein, 1 → tout en surface) ; l'épaisseur du bord ajoute un aléa\n  float k=pow(fract(r.w*5.13), max(1.-u_volume, .02));\n  k=mix(k, 1.-u_shell*fract(r.x*9.7), step(.001,u_shell));\n  float grow=ez(clamp(t/u_ramp,0.,1.));\n  // le noyau : une sphère parfaite, jamais déformée ; elle grandit avec le blob au départ, puis reste ronde\n  if(isCore(r)){\n    float rc=u_radius*u_coreR*mix(u_r0,1.,grow)*(1.-u_coreThick*fract(r.x*5.7));\n    P=rotY(dir*rc, t*u_coreSpin);\n    A=u_alpha*u_coreBright; C=WHI;\n    return;\n  }\n  float rad=u_radius*mix(u_r0,1.,grow)*(1.+u_deform*grow*bn(wd*u_freq,ts))*k;   // petit et lisse au départ, puis il grandit et se déforme\n  P=rotX(rotY(dir*rad, t*u_spin), .3*sin(t*.13));\n  A=u_alpha;\n  vec3 c=mix(WHI, MAU, smoothstep(.3,1.2,rad/u_radius)*u_tint);\n  C=mix(c, BLU, u_blue*fract(r.z*3.3));\n}"
	};
})), C, w, T, E, D, O, k, A, j = e((() => {
	S(), C = x.duration, w = Object.fromEntries(Object.entries(x.params).map(([e, t]) => [e, t.value])), T = (e) => {
		let t = Number.isInteger(e) ? e.toFixed(1) : String(e);
		return e < 0 ? "(" + t + ")" : t;
	}, E = x.glsl.replace("void scene(", "void blobScene(").replace(/\bu_(\w+)\b/g, (e, t) => t in x.params ? T(x.params[t].value) : e), D = (e) => e < .5 ? 4 * e * e * e : 1 - (-2 * e + 2) ** 3 / 2, O = (e, t, n) => Math.max(0, Math.min(1, (e - t) / (n - t))), k = (e, t, n) => e + (t - e) * n, A = {
		id: "plane",
		name: "2. Délitement, plan",
		locked: [
			"cam",
			"pitch",
			"yaw",
			"zoom",
			"size",
			"bright",
			"dof",
			"focus",
			"shift"
		],
		duration: 8,
		startsAt: C,
		camera: {
			...x.camera,
			...x.cameraAt(C, {
				...x.camera,
				...w
			})
		},
		params: {
			count: {
				label: "Densité (particules)",
				min: 2e3,
				max: 131072,
				step: 1e3,
				value: w.count
			},
			shedAt: {
				label: "Délitement : début (s)",
				min: 0,
				max: 3,
				step: .05,
				value: .2
			},
			shedDur: {
				label: "Délitement : durée (s)",
				min: .5,
				max: 6,
				step: .05,
				value: 3
			},
			order: {
				label: "Le plan se compose : au hasard (0) ou du centre vers les bords (1)",
				min: 0,
				max: 1,
				step: .01,
				value: .8
			},
			fall: {
				label: "Descente : durée par particule (s)",
				min: .5,
				max: 5,
				step: .05,
				value: 2.4
			},
			float: {
				label: "Flottement (turbulence)",
				min: 0,
				max: 1.5,
				step: .01,
				value: .5
			},
			lift: {
				label: "Petite montée avant de descendre",
				min: 0,
				max: .5,
				step: .01,
				value: .1
			},
			soft: {
				label: "S'écarte avant de descendre",
				min: 0,
				max: 1,
				step: .01,
				value: .6
			},
			width: {
				label: "Plan : largeur",
				min: .5,
				max: 4,
				step: .01,
				value: 2.2
			},
			ratio: {
				label: "Plan : profondeur / largeur",
				min: .2,
				max: 1.5,
				step: .01,
				value: .8
			},
			height: {
				label: "Plan : hauteur dans l'image",
				min: -1,
				max: .6,
				step: .01,
				value: -.15
			},
			grid: {
				label: "Plan : semis (0) ou grille (1)",
				min: 0,
				max: 1,
				step: 1,
				value: 0
			},
			waveAt: {
				label: "Vagues : début (s)",
				min: 0,
				max: 6,
				step: .05,
				value: 1.85
			},
			waveAmp: {
				label: "Vagues : amplitude",
				min: 0,
				max: .4,
				step: .005,
				value: .035
			},
			waveLen: {
				label: "Vagues : longueur d'onde",
				min: .3,
				max: 6,
				step: .05,
				value: 1.4
			},
			waveSpeed: {
				label: "Vagues : vitesse",
				min: 0,
				max: 4,
				step: .05,
				value: 1.1
			},
			waveDir: {
				label: "Vagues : direction",
				min: -3.14,
				max: 3.14,
				step: .01,
				value: 1.33
			},
			camTo: {
				label: "Caméra d'arrivée : distance",
				min: 1.2,
				max: 5,
				step: .01,
				value: 2.33
			},
			pitchTo: {
				label: "Caméra d'arrivée : inclinaison",
				min: -.6,
				max: 1.4,
				step: .01,
				value: .29
			},
			yawTo: {
				label: "Caméra d'arrivée : rotation",
				min: -3.14,
				max: 3.14,
				step: .01,
				value: .41
			},
			camDur: {
				label: "Caméra : durée du passage (s)",
				min: .3,
				max: 6,
				step: .05,
				value: 2.5
			},
			planeAlpha: {
				label: "Plan : opacité par particule",
				min: .02,
				max: 1,
				step: .01,
				value: .35
			},
			crest: {
				label: "Plan : crêtes plus lumineuses",
				min: 0,
				max: 3,
				step: .05,
				value: 1
			},
			teal: {
				label: "Plan : turquoise sur les crêtes",
				min: 0,
				max: 1,
				step: .01,
				value: .5
			}
		},
		cameraAt(e, t) {
			let n = D(O(e, t.shedAt, t.shedAt + t.camDur));
			return {
				cam: k(t.cam, t.camTo, n),
				pitch: k(t.pitch, t.pitchTo, n),
				yaw: k(t.yaw, t.yawTo, n)
			};
		},
		glsl: `
${E}
void scene(vec2 g, vec4 r, float t, out vec3 P, out float A, out vec3 C){
  // la place du point sur le plan : grille régulière (selon son rang) ou semis (sa position aléatoire)
  float n=max(u_count,4.), cols=floor(sqrt(n/u_ratio)), rows=max(floor(n/cols),2.);
  float id=float(gl_VertexID);
  vec2 gp=vec2(mod(id,cols)/(cols-1.), floor(id/cols)/(rows-1.))*2.-1.;
  vec2 q=mix(g, gp, u_grid);
  vec2 pg=vec2(q.x*u_width, q.y*u_width*u_ratio);
  float edge=smoothstep(1.,.82,abs(q.x))*smoothstep(1.,.82,abs(q.y));   // bords fondus, pas de rectangle net

  // vagues
  float ra=t-u_waveAt;
  vec2 dw=vec2(cos(u_waveDir),sin(u_waveDir));
  float ph=dot(pg,dw)*TAU/u_waveLen-t*u_waveSpeed;
  float sw=sin(ph+.8*sin(dot(pg,vec2(-dw.y,dw.x))*TAU/(u_waveLen*1.7)+t*.4))*.7+.3*sin(ph*2.1+1.3+t*.3);
  float wv=u_waveAmp*ez(clamp(ra/2.,0.,1.))*sw;
  vec3 target=vec3(pg.x, u_height+wv, pg.y);
  float Ta=u_planeAlpha*edge*max(.15, 1.+u_crest*wv*8.);
  vec3 Tc=mix(MAU,BLU,clamp(.5+wv*6.,0.,1.)); Tc=mix(Tc,TEA,u_teal*smoothstep(.03,.12,wv));

  // le délitement : chaque point quitte le blob à son moment ; le plan se compose du centre vers les bords
  float s=mix(fract(r.y*3.1), clamp(length(q)/1.41,0.,1.), u_order);
  float td=u_shedAt+s*u_shedDur;
  vec3 Bp; float Ba; vec3 Bc;
  if(t<td){ blobScene(g, r, ${T(C)}+t, Bp, Ba, Bc); P=Bp; A=Ba; C=Bc; return; }
  blobScene(g, r, ${T(C)}+td, Bp, Ba, Bc);   // l'endroit où il s'est détaché
  float u=clamp((t-td)/u_fall,0.,1.), arc=sin(PI*u);
  float kh=1.-pow(1.-u, 2.+u_soft*3.), kv=ez(u);           // s'écarte d'abord à l'horizontale, puis descend et se pose en douceur
  P=vec3(mix(Bp.x,target.x,kh), mix(Bp.y,target.y,kv)+u_lift*arc, mix(Bp.z,target.z,kh));
  P+=u_float*arc*.25*vec3(sin(t*1.3+r.x*TAU), .5*sin(t*1.1+r.y*TAU), cos(t*1.2+r.z*TAU));   // il flotte
  A=mix(Ba,Ta,u); C=mix(Bc,Tc,u);
}`
	};
})), M, N, P, ee, te, ne, F, I, re = e((() => {
	j(), M = A.duration, N = Object.fromEntries(Object.entries(A.params).map(([e, t]) => [e, t.value])), P = (e) => {
		let t = Number.isInteger(e) ? e.toFixed(1) : String(e);
		return e < 0 ? "(" + t + ")" : t;
	}, ee = A.glsl.replace("void scene(", "void planeScene(").replace(/\bu_(\w+)\b/g, (e, t) => t in A.params && t !== "count" ? P(A.params[t].value) : e), te = (e) => e < .5 ? 4 * e * e * e : 1 - (-2 * e + 2) ** 3 / 2, ne = (e, t, n) => Math.max(0, Math.min(1, (e - t) / (n - t))), F = (e, t, n) => e + (t - e) * n, I = {
		id: "land",
		frozen: !0,
		name: "3. Dézoom, montagnes, orbite",
		locked: [
			"cam",
			"pitch",
			"yaw",
			"zoom",
			"size",
			"bright",
			"dof",
			"focus",
			"shift"
		],
		duration: 9.25,
		startsAt: M,
		camera: {
			...A.camera,
			cam: N.camTo,
			pitch: N.pitchTo,
			yaw: N.yawTo
		},
		params: {
			count: {
				label: "Densité (particules)",
				min: 2e3,
				max: 131072,
				step: 1e3,
				value: A.params.count.value
			},
			dzAt: {
				label: "Dézoom : début (s)",
				min: 0,
				max: 4,
				step: .05,
				value: 1.85
			},
			dzDur: {
				label: "Dézoom : durée (s)",
				min: .5,
				max: 6,
				step: .05,
				value: 3.4
			},
			landW: {
				label: "Taille finale du paysage",
				min: .4,
				max: 2.2,
				step: .01,
				value: .89
			},
			camEnd: {
				label: "Caméra de fin : distance",
				min: 1.2,
				max: 6,
				step: .01,
				value: 2.86
			},
			pitchEnd: {
				label: "Caméra de fin : inclinaison",
				min: -.6,
				max: 1.4,
				step: .01,
				value: .39
			},
			yawOut: {
				label: "Vitesse de rotation passée à l'orbite",
				min: 0,
				max: .6,
				step: .005,
				value: .165
			},
			yawEnd: {
				label: "Caméra de fin : rotation",
				min: -3.14,
				max: 3.14,
				step: .01,
				value: 2.52
			},
			zoomEnd: {
				label: "Fin : échelle",
				min: .3,
				max: 2,
				step: .01,
				value: 1.15
			},
			sizeEnd: {
				label: "Fin : taille des points",
				min: .3,
				max: 4,
				step: .01,
				value: .92
			},
			shiftEnd: {
				label: "Fin : décalage vers la droite",
				min: -.8,
				max: .8,
				step: .01,
				value: .3
			},
			mCount: {
				label: "Montagnes : nombre",
				min: 4,
				max: 5,
				step: 1,
				value: 5
			},
			mHeight: {
				label: "Montagnes : hauteur",
				min: .05,
				max: 1.2,
				step: .01,
				value: .45
			},
			sharp: {
				label: "Montagnes : arrondies (0) ou pointues (1)",
				min: 0,
				max: 1,
				step: .01,
				value: 0
			},
			mWidth: {
				label: "Montagnes : largeur",
				min: .05,
				max: .6,
				step: .01,
				value: .18
			},
			spread: {
				label: "Montagnes : écartement",
				min: .3,
				max: 1.5,
				step: .01,
				value: 1.14
			},
			seed: {
				label: "Montagnes : tirage (disposition)",
				min: 0,
				max: 30,
				step: 1,
				value: 12
			},
			vary: {
				label: "Montagnes : écart des tailles",
				min: 0,
				max: 1,
				step: .01,
				value: .7
			},
			steep: {
				label: "Montagnes : raideur des flancs (pain de sucre)",
				min: 0,
				max: 1,
				step: .01,
				value: .5
			},
			small: {
				label: "Petits pics secondaires : nombre",
				min: 0,
				max: 14,
				step: 1,
				value: 6
			},
			smallH: {
				label: "Petits pics secondaires : hauteur",
				min: 0,
				max: 1,
				step: .01,
				value: .35
			},
			riseAt: {
				label: "Montée : début (s)",
				min: 0,
				max: 5,
				step: .05,
				value: 1.4
			},
			riseDur: {
				label: "Montée : durée (s)",
				min: .3,
				max: 5,
				step: .05,
				value: 2.7
			},
			order: {
				label: "Montée : ensemble (0) ou une par une (1)",
				min: 0,
				max: 1,
				step: .01,
				value: .42
			},
			waveKeep: {
				label: "Vagues gardées sur le paysage",
				min: 0,
				max: 1,
				step: .01,
				value: 0
			},
			peakGlow: {
				label: "Sommets plus lumineux",
				min: 0,
				max: 3,
				step: .05,
				value: .5
			},
			crestCol: {
				label: "Turquoise et blanc sur les crêtes",
				min: 0,
				max: 1,
				step: .01,
				value: .37
			},
			rampIn: {
				label: "Orbite : mise en route du balancement et du reflet (s)",
				min: .1,
				max: 6,
				step: .1,
				value: 2.4
			},
			pitchAmp: {
				label: "Orbite : balancement d'inclinaison",
				min: 0,
				max: .3,
				step: .005,
				value: .01
			},
			pitchPeriod: {
				label: "Orbite : période du balancement (s)",
				min: 2,
				max: 30,
				step: .5,
				value: 11
			},
			camAmp: {
				label: "Orbite : respiration de la distance",
				min: 0,
				max: .6,
				step: .01,
				value: .05
			},
			camPeriod: {
				label: "Orbite : période de la respiration (s)",
				min: 2,
				max: 30,
				step: .5,
				value: 12.5
			},
			glint: {
				label: "Reflet sur les crêtes : intensité",
				min: 0,
				max: 3,
				step: .05,
				value: 1.45
			},
			glintPeriod: {
				label: "Reflet : durée du passage (s)",
				min: 2,
				max: 20,
				step: .5,
				value: 10.5
			},
			glintWidth: {
				label: "Reflet : largeur",
				min: .03,
				max: .6,
				step: .01,
				value: .29
			},
			glintDir: {
				label: "Reflet : direction",
				min: -3.14,
				max: 3.14,
				step: .01,
				value: .6
			}
		},
		cameraAt(e, t) {
			let n = te(ne(e, t.dzAt, t.dzAt + t.dzDur)), r = t.dzDur, i = (e - t.dzAt) / r, a = i <= 0 ? t.yaw : i >= 1 ? t.yawEnd + t.yawOut * (e - t.dzAt - r) : (2 * i ** 3 - 3 * i ** 2 + 1) * t.yaw + (-2 * i ** 3 + 3 * i ** 2) * t.yawEnd + (i ** 3 - i ** 2) * r * t.yawOut, o = Math.max(0, e - t.dzAt - r), s = Math.min(1, o / t.rampIn), c = s * s * (3 - 2 * s);
			return {
				cam: F(t.cam, t.camEnd, n) + t.camAmp * c * Math.sin(2 * Math.PI * o / t.camPeriod),
				pitch: F(t.pitch, t.pitchEnd, n) + t.pitchAmp * c * Math.sin(2 * Math.PI * o / t.pitchPeriod),
				yaw: a,
				zoom: F(t.zoom, t.zoomEnd, n),
				size: F(t.size, t.sizeEnd, n),
				shift: F(t.shift, t.shiftEnd, n)
			};
		},
		glsl: `
${ee}
float hs(float n){ return fract(sin(n*127.1+u_seed*311.7)*43758.5453); }
// les montagnes, dans les coordonnées du plan (-1..1) ; chacune a sa hauteur, sa largeur, son allongement et sa montée
float peak(vec2 d, float sig, float p){ return exp(-pow(length(d)/sig, p)); }
float mountains(vec2 q, float t){
  vec2 slot[5]=vec2[5](vec2(-.62,-.18), vec2(-.22,.34), vec2(.12,-.28), vec2(.48,.26), vec2(.74,-.32));
  // profil : arrondi (2) ou pointu (0.9) ; la raideur relève l'exposant : flancs raides, sommet arrondi
  float p=mix(mix(2.,.9,u_sharp), 3.6, u_steep);
  float H=0., big=mod(u_seed,u_mCount);
  for(int i=0;i<5;i++){
    float fi=float(i);
    if(fi>=u_mCount) break;
    vec2 c=(slot[i]+(vec2(hs(fi*5.+1.),hs(fi*5.+2.))-.5)*.3)*u_spread;
    // tailles : avec l'écart, une montagne domine, les autres vont de petites à moyennes
    float f=hs(fi*5.+3.);
    float sz=mix(.5+.5*f, fi==big ? 1. : .18+.7*pow(f,1.4), u_vary);
    float hgt=u_mHeight*sz;
    float sig=u_mWidth*(.7+.6*hs(fi*5.+4.))*mix(1., .5+.6*sz, u_vary);
    float a=hs(fi*5.+5.)*PI, el=1.+1.4*hs(fi*5.+6.)*(1.-.6*u_steep);
    vec2 d=q-c; d=vec2(cos(a)*d.x+sin(a)*d.y, -sin(a)*d.x+cos(a)*d.y); d.x/=el;
    float t0=u_riseAt+u_order*fi*u_riseDur*.45;
    H+=hgt*peak(d,sig,p)*ez(clamp((t-t0)/u_riseDur,0.,1.));
  }
  // petits pics secondaires, posés entre les grands, qui se lèvent après eux
  for(int i=0;i<14;i++){
    float fi=float(i)+20.;
    if(float(i)>=u_small) break;
    vec2 c=vec2(hs(fi*3.+1.)*1.7-.85, hs(fi*3.+2.)*1.3-.65)*u_spread;
    float hgt=u_mHeight*u_smallH*(.4+.6*hs(fi*3.+3.));
    float sig=u_mWidth*(.35+.3*hs(fi*3.+4.));
    float t0=u_riseAt+u_riseDur*(.3+.6*hs(fi*3.+5.));
    H+=hgt*peak(q-c,sig,p)*ez(clamp((t-t0)/u_riseDur,0.,1.));
  }
  return H;
}
void scene(vec2 g, vec4 r, float t, out vec3 P, out float A, out vec3 C){
  vec3 Pp; float Ap; vec3 Cp;
  planeScene(g, r, ${P(M)}+t, Pp, Ap, Cp);
  float e=ez(clamp((t-u_dzAt)/u_dzDur,0.,1.));
  float sc=mix(1., u_landW/${P(N.width)}, e);                       // le plan rétrécit jusqu'à la taille du paysage
  float wv=(Pp.y-${P(N.height)})*mix(1., u_waveKeep, e);           // les vagues s'apaisent
  float H=mountains(g, t);
  float hn=H/max(u_mHeight,.01);
  P=vec3(Pp.x*sc, ${P(N.height)}+wv*sc+H, Pp.z*sc);
  A=Ap*(1.+u_peakGlow*hn);
  C=mix(Cp, TEA, u_crestCol*smoothstep(.25,.6,hn)); C=mix(C, WHI, u_crestCol*.7*smoothstep(.65,1.,hn));
  // orbite : un reflet fin traverse le paysage et allume les crêtes ; il monte depuis zéro après le dézoom
  float to=max(t-u_dzAt-u_dzDur,0.), ko=smoothstep(0.,u_rampIn,to);
  vec2 dg=vec2(cos(u_glintDir), sin(u_glintDir));
  float pos=-1.6+3.2*fract(to/u_glintPeriod);
  float glw=exp(-pow((dot(P.xz,dg)-pos)/u_glintWidth,2.))*clamp(hn,0.,1.)*u_glint*ko;
  A*=1.+glw; C=mix(C, WHI, clamp(glw*.6,0.,1.));
}`
	};
})), L, ie, R, ae, oe, se, ce, z, le, B, ue, de, V, H, fe = e((() => {
	re(), S(), b(), L = (e) => {
		let t = Number.isInteger(e) ? e.toFixed(1) : String(e);
		return e < 0 ? "(" + t + ")" : t;
	}, ie = I.glsl.replace("void scene(", "void landScene(").replace(/\bu_(\w+)\b/g, (e, t) => t in I.params && t !== "count" && t !== "seed" ? L(I.params[t].value) : e), R = 5, ae = -.15, oe = .45, se = (e) => ({
		...Object.fromEntries(Object.entries(h).map(([t, n]) => [t, t in e.camera ? e.camera[t] : n.value])),
		...Object.fromEntries(Object.entries(e.params).map(([e, t]) => [e, t.value]))
	}), ce = se(I), z = {
		...ce,
		...I.cameraAt(I.duration, ce)
	}, le = se(x), B = {
		...le,
		...x.cameraAt(0, le)
	}, ue = I.params.yawOut.value, de = (e) => e < .5 ? 4 * e * e * e : 1 - (-2 * e + 2) ** 3 / 2, V = (e, t, n) => e + (t - e) * n, H = {
		id: "evap",
		frozen: !0,
		name: "4. Retour au blob",
		locked: [
			"cam",
			"pitch",
			"yaw",
			"zoom",
			"size",
			"bright",
			"dof",
			"focus",
			"shift"
		],
		duration: R,
		startsAt: I.duration,
		fixed: { seed: I.params.seed.value },
		camera: {
			cam: z.cam,
			pitch: z.pitch,
			yaw: z.yaw,
			zoom: z.zoom,
			size: z.size,
			bright: z.bright,
			dof: z.dof,
			focus: z.focus,
			shift: z.shift
		},
		params: {
			count: {
				label: "Densité (particules)",
				min: 2e3,
				max: 131072,
				step: 1e3,
				value: I.params.count.value
			},
			start: {
				label: "Évaporation : début (s)",
				min: 0,
				max: 2,
				step: .05,
				value: .3
			},
			stagger: {
				label: "Évaporation : étalement (s)",
				min: 0,
				max: 3,
				step: .05,
				value: 1.9
			},
			dur: {
				label: "Évaporation : durée par particule (s)",
				min: .3,
				max: 3,
				step: .05,
				value: 2.5
			},
			order: {
				label: "Ordre : hasard (0) ou sommets d’abord (1)",
				min: 0,
				max: 1,
				step: .01,
				value: .61
			},
			lift: {
				label: "Montée en arc (hauteur)",
				min: 0,
				max: 1.5,
				step: .01,
				value: .34
			},
			swirl: {
				label: "Tourbillon",
				min: 0,
				max: 3,
				step: .01,
				value: 2.17
			},
			vapor: {
				label: "Éclat pendant le trajet",
				min: 0,
				max: 3,
				step: .05,
				value: .4
			},
			camAt: {
				label: "Caméra : début du retour (s)",
				min: 0,
				max: 3,
				step: .05,
				value: 1
			},
			camDur: {
				label: "Caméra : durée du retour (s)",
				min: .5,
				max: 5.5,
				step: .05,
				value: 4
			}
		},
		cameraAt(e, t) {
			let n = t.camAt, r = Math.max(.1, Math.min(t.camDur, R - n));
			if (e < n) return {
				yaw: z.yaw + ue * e,
				shift: z.shift
			};
			let i = Math.min(1, (e - n) / r), a = de(i);
			return {
				yaw: z.yaw + ue * n + ue * r * (Math.min(i, 1) - Math.min(i, 1) ** 2 / 2),
				pitch: V(z.pitch, B.pitch, a),
				cam: V(z.cam, B.cam, a),
				zoom: V(z.zoom, B.zoom, a),
				size: V(z.size, B.size, a),
				bright: V(z.bright, B.bright, a),
				dof: V(z.dof, B.dof, a),
				focus: V(z.focus, B.focus, a),
				shift: V(z.shift, B.shift, a)
			};
		},
		glsl: `
${ie}
// reçoit le paysage déjà calculé (Op, Oa, Oc) : la séquence complète le calcule une seule fois
void evapMix(vec2 g, vec4 r, float t, vec3 Op, float Oa, vec3 Oc, out vec3 P, out float A, out vec3 C){
  // la cible : le blob, qui rejoint pile sa première image à la fin de la scène
  vec3 Bp; float Ba; vec3 Bc;
  blobScene(g, r, t-${L(R)}, Bp, Ba, Bc);
  float hn=clamp((Op.y-(${L(ae)}))/${L(oe)},0.,1.);
  float s=mix(fract(r.x*7.7), 1.-hn, u_order);                       // les sommets partent les premiers
  float k=ez(clamp((t-u_start-s*u_stagger)/u_dur,0.,1.));
  k=mix(k, 1., smoothstep(${L(4.75)}, ${L(R)}, t));   // tout est posé à la dernière image
  float arc=sin(PI*k);
  P=mix(Op,Bp,k)+vec3(0.,u_lift*arc,0.);
  P=rotY(P, u_swirl*arc*(.5+r.z));
  A=mix(Oa,Ba,k)*(1.+u_vapor*arc);
  C=mix(Oc,Bc,k); C=mix(C, WHI, clamp(u_vapor*arc*.3,0.,1.));
}
void scene(vec2 g, vec4 r, float t, out vec3 P, out float A, out vec3 C){
  vec3 Op; float Oa; vec3 Oc;
  landScene(g, r, ${L(I.duration)}+t, Op, Oa, Oc);
  evapMix(g, r, t, Op, Oa, Oc, P, A, C);
}`
	};
})), U, pe, me, he, ge, _e, ve, ye = e((() => {
	S(), j(), re(), fe(), U = (e) => {
		let t = Number.isInteger(e) ? e.toFixed(1) : String(e);
		return e < 0 ? "(" + t + ")" : t;
	}, pe = x.duration, me = pe + A.duration, he = me + I.duration, ge = he + H.duration, _e = H.glsl.replace("void scene(", "void evapScene(").replace(/\bu_(\w+)\b/g, (e, t) => t in H.params && t !== "count" ? U(H.params[t].value) : e), ve = {
		id: "sequence",
		name: "Séquence (un seul programme)",
		inSequence: !1,
		duration: ge,
		camera: { ...x.camera },
		params: { count: {
			label: "Densité (particules)",
			min: 2e3,
			max: 131072,
			step: 1e3,
			value: x.params.count.value
		} },
		fixed: { ...H.fixed },
		glsl: `
${_e}
void scene(vec2 g, vec4 r, float T, out vec3 P, out float A, out vec3 C){
  if(T<${U(pe)}){ blobScene(g, r, T, P, A, C); return; }
  if(T<${U(me)}){ planeScene(g, r, T-${U(pe)}, P, A, C); return; }
  // le paysage : calculé une seule fois, ici, pour la fin des montagnes comme pour le retour au blob
  vec3 Lp; float La; vec3 Lc;
  landScene(g, r, T-${U(me)}, Lp, La, Lc);
  if(T<${U(he)}){ P=Lp; A=La; C=Lc; return; }
  evapMix(g, r, T-${U(he)}, Lp, La, Lc, P, A, C);
}`
	};
}));
//#endregion
//#region src/hero-sequence/index.js
function be(e) {
	if (e.dataset.pvReady) return;
	if (e.dataset.pvReady = "1", !document.getElementById("pv-hero-seq-css")) {
		let e = document.createElement("style");
		e.id = "pv-hero-seq-css", e.textContent = xe, document.head.appendChild(e);
	}
	let t = document.createElement("canvas");
	t.setAttribute("aria-hidden", "true"), e.appendChild(t);
	let n;
	try {
		n = m(t), n.useScene(ve);
	} catch {
		t.remove(), delete e.dataset.pvReady;
		return;
	}
	let r = matchMedia("(prefers-reduced-motion: reduce)").matches, i = !1;
	function a(e) {
		let t = G.find((t) => e < t.at + t.end) || G[G.length - 1], r = Math.min(e - t.at, t.end), a = t.sc.cameraAt ? {
			...t.v,
			...t.sc.cameraAt(r, t.v)
		} : t.v, o = i ? {
			...a,
			shift: 0
		} : a;
		n.render(e, o, t.v.count * (i ? .5 : 1));
	}
	function o() {
		i = e.getBoundingClientRect().width < 900, n.resize(), r && a(we);
	}
	let s = 0, c = 0, l = 0;
	function u(e) {
		s = requestAnimationFrame(u), c += Math.min((e - l) / 1e3, .05), l = e, a(c % Ce);
	}
	function d() {
		s || r || (l = performance.now(), s = requestAnimationFrame(u));
	}
	function f() {
		cancelAnimationFrame(s), s = 0;
	}
	t.addEventListener("webglcontextlost", (e) => {
		e.preventDefault(), f();
	});
	let p = new ResizeObserver(o);
	p.observe(e), o();
	let h = null;
	return r || (h = new IntersectionObserver(([e]) => e.isIntersecting ? d() : f()), h.observe(e)), { destroy() {
		f(), p.disconnect(), h && h.disconnect(), t.remove(), delete e.dataset.pvReady;
	} };
}
var W, xe, Se, G, Ce, we, Te = e((() => {
	b(), S(), j(), re(), fe(), ye(), W = "[data-pv=\"hero-sequence\"]", xe = `
.header_image-wrapper:has(${W}){ background:none!important; border:0!important; box-shadow:none!important; position:relative; overflow:visible!important; min-height:30rem; }
.header_component:has(${W}), .header_content:has(${W}){ position:relative; }
.header_content:has(${W}) .header_content-left{ position:relative; z-index:2; }
/* très grand, ancré à droite, passe sous la colonne de texte ; s'estompe côté texte */
${W}{ position:absolute; top:-16%; bottom:-16%; right:-6%; width:95vw; z-index:0; pointer-events:none;
  -webkit-mask-image:linear-gradient(90deg, transparent 2%, rgba(0,0,0,.4) 24%, #000 46%); mask-image:linear-gradient(90deg, transparent 2%, rgba(0,0,0,.4) 24%, #000 46%); }
${W} canvas{ position:absolute; inset:0; width:100%; height:100%; display:block; }
@media (max-width:991px){
  .section_header:has(${W}){ height:auto; min-height:100svh; display:flex; flex-direction:column; justify-content:center; overflow-x:clip; }
  .header_component:has(${W}), .header_component:has(${W}) .header_content{ height:auto; }
  ${W}{ position:relative; top:auto; bottom:auto; right:auto; width:100vw; margin-left:calc(50% - 50vw); aspect-ratio:1/1; margin-top:1rem; -webkit-mask-image:none; mask-image:none; }
}`, Se = (e) => ({
		...Object.fromEntries(Object.entries(h).map(([t, n]) => [t, e.camera && t in e.camera ? e.camera[t] : n.value])),
		...Object.fromEntries(Object.entries(e.params).map(([e, t]) => [e, t.value]))
	}), G = [];
	{
		let e = 0;
		[
			x,
			A,
			I,
			H
		].forEach((t) => {
			G.push({
				sc: t,
				at: e,
				end: t.duration,
				v: Se(t)
			}), e += t.duration;
		});
	}
	Ce = ve.duration, we = G[2].at + 7.5;
}));
//#endregion
//#region src/gantt-glossy.js
function Ee(e) {
	if (e.dataset.pvReady) return;
	e.dataset.pvReady = "1";
	let t = document.createElement("canvas");
	t.style.cssText = "display:block;width:100%;", t.setAttribute("role", "img"), t.setAttribute("aria-label", "Study timeline: one eligibility change pushes submission back by 18 weeks as each tool recalculates on its own schedule."), e.appendChild(t);
	let n = t.getContext("2d"), r = e.closest("section") || document.body, i = (e) => getComputedStyle(r.querySelector(e) || document.body).fontFamily, a = i(".text-size-large"), s = i(".text-size-label"), c = "letterSpacing" in n;
	function l(e, t, r) {
		n.font = `${e} ${t}px ${r ? s : a}`, c && (n.letterSpacing = r ? (t * .12).toFixed(2) + "px" : "0px");
	}
	function u(e, t, r, i, a, o, s = 1, c = "left", u = !1) {
		s <= 0 || (l(i, a, u), n.textAlign = c, n.globalAlpha = s, n.fillStyle = o, n.fillText(e, t, r), n.globalAlpha = 1, n.textAlign = "left");
	}
	function f(e, t, r, i) {
		return l(t, r, i), n.measureText(e).width;
	}
	function p(e, t, r, i, a) {
		n.beginPath(), n.roundRect ? n.roundRect(e, t, r, i, Math.min(a, r / 2, i / 2)) : n.rect(e, t, r, i);
	}
	function m(e, t, r, i, a, o, s = 1) {
		n.globalAlpha = o, n.strokeStyle = a, n.lineWidth = s, n.beginPath(), n.moveTo(e, t), n.lineTo(r, i), n.stroke(), n.globalAlpha = 1;
	}
	let h = 0, g = 0, _ = 1, v = !1;
	function y() {
		v = h < 640, _ = d(h / 1100, .7, 1.15);
		let e = 64 * _, t = (v ? 40 : 54) * _, n = v ? 118 * _ : 230 * _, r = 24 * _;
		return {
			top: e,
			rowH: t,
			padL: n,
			padR: r,
			w: h - n - r,
			BH: (v ? 12 : 16) * _,
			gridTop: e + 14 * _,
			bottom: e + 14 * _ + t * ke.length
		};
	}
	function b() {
		let e = y();
		return Math.round(e.bottom + 92 * _);
	}
	function x(e) {
		n.clearRect(0, 0, h, g);
		let { top: t, rowH: r, padL: i, w: a, BH: s, gridTop: c, bottom: l } = y(), d = K.slip / De, b = (e) => i + e * a, x = Math.max(12, (v ? 12 : 15) * _), S = Math.max(8.5, 10 * _);
		for (let e = 0; e <= 8; e++) {
			let n = e / 8, r = Math.round(De * n), i = b(n);
			m(i, c - 6 * _, i, l, q, e === 0 ? .18 : .07), (!v || e % 2 == 0) && u("W" + r, i, t - 6 * _, 400, S, J, 1, e === 0 ? "left" : e === 8 ? "right" : "center", !0);
		}
		u("STUDY TIMELINE", 0, t - 6 * _, 400, S, J, 1, "left", !0);
		let C = Me(o(e, .7, 1.7)), w = !1;
		ke.forEach((t, i) => {
			let l = c + i * r + r / 2, f = t.tool * K.lag, h = i === 0 ? C : Me(o(e, 1.6 + f, 2.6 + f));
			i > 0 && h < 1 && C >= 1 && (w = !0);
			let g = t.a * X + (i === 0 ? 0 : d * h), y = t.b * X + d * (i === 0 ? C : h);
			if (i && m(0, l - r / 2, b(1), l - r / 2, q, .06), u(t.n, 0, l + (v ? 4 : -1) * _, 400, x, h > 0 || i === 0 ? q : J), v || u(Oe[t.tool].n, 0, l + 15 * _, 400, S * .9, Oe[t.tool].c, .85, "left", !0), n.save(), n.setLineDash([2, 3]), p(b(t.a * X) + .5, l - s / 2 + .5, (t.b - t.a) * X * a - 1, s - 1, s / 2), n.strokeStyle = "rgba(244,244,244,.28)", n.lineWidth = 1, n.stroke(), n.restore(), i > 0 && C >= 1 && h < 1) {
				let e = b(t.a * X + d), r = b(g);
				n.save(), n.setLineDash([3, 3]), p(r, l - s / 2 - 3 * _, e - r + (y - g) * a, s + 6 * _, (s + 6 * _) / 2), n.strokeStyle = Y, n.globalAlpha = .8, n.lineWidth = 1, n.stroke(), n.restore(), n.globalAlpha = 1, u("STALE", b(y) + 10 * _, l + S * .36, 400, S, Y, .9, "left", !0);
			}
			p(b(g), l - s / 2, (y - g) * a, s, s / 2), n.globalAlpha = .92, n.fillStyle = Oe[t.tool].c, n.fill(), n.globalAlpha = 1;
		});
		let T = ke[ke.length - 1], E = Me(o(e, 1.6 + T.tool * K.lag, 2.6 + T.tool * K.lag)), D = b(T.b * X), O = b(T.b * X + d * E), k = c - 6 * _, A = l + 8 * _;
		if (n.save(), n.setLineDash([3, 4]), m(D, k, D, A, q, .5), n.restore(), u("PLANNED", D, A + 18 * _, 400, S, J, 1, "center", !0), E > .03) {
			n.save(), n.beginPath(), n.rect(D, k, O - D, A - k), n.clip();
			for (let e = D - 80; e < O + 80; e += 7 * _) m(e, k, e - 70 * _, A, Y, .14);
			n.restore(), m(O, k, O, A, Y, 1, 1.5);
			let e = "SUBMISSION  +" + Math.round(K.slip * E) + " WEEKS", t = f(e, 500, S * 1.05, !0) + 22 * _, r = 24 * _, i = Math.min(O + 10 * _, h - t - 2), a = A + 6 * _;
			n.globalAlpha = E, p(i, a, t, r, r / 2), n.fillStyle = "rgba(214,163,148,.16)", n.fill(), n.strokeStyle = Y, n.lineWidth = 1, n.stroke(), n.globalAlpha = 1, u(e, i + 11 * _, a + r / 2 + S * .38, 500, S * 1.05, Y, E, "left", !0);
		}
		let j = C < 1 ? "ONE ELIGIBILITY CRITERION CHANGES" : w ? "THREE TOOLS HAVE NOT RECALCULATED YET" : "EVERY DOWNSTREAM DATE HAS MOVED", M = C < 1 ? q : w ? Y : q, N = A + 58 * _;
		n.globalAlpha = 1, n.fillStyle = M, n.beginPath(), n.arc(5 * _, N - S * .35, 3.5 * _, 0, Math.PI * 2), n.fill(), u(j, 18 * _, N, 400, S, M, .9, "left", !0);
	}
	let S = matchMedia("(prefers-reduced-motion: reduce)").matches, C = 0, w = 0, T = 0, E = !1, D = 0;
	function O() {
		if (h = t.clientWidth, !h) return;
		g = b(), t.style.height = g + "px";
		let e = Math.min(devicePixelRatio || 1, 2);
		t.width = Math.round(h * e), t.height = Math.round(g * e), n.setTransform(e, 0, 0, e, 0, 0), E && x(S ? Ae : T);
	}
	function k(e) {
		C = requestAnimationFrame(k), T += Math.min((e - w) / 1e3, .05), w = e, T > je && (T = 0), x(T);
	}
	function A() {
		C || S || (T = 0, w = performance.now(), C = requestAnimationFrame(k));
	}
	function j() {
		cancelAnimationFrame(C), C = 0;
	}
	let M = new ResizeObserver(() => {
		t.clientWidth !== D && (D = t.clientWidth, O());
	});
	M.observe(e);
	let N = null;
	return (document.fonts ? Promise.race([Promise.all([document.fonts.load(`400 12px ${a}`), document.fonts.load(`400 12px ${s}`)]), new Promise((e) => setTimeout(e, 3e3))]) : Promise.resolve()).then(() => {
		E = !0, O(), !S && (N = new IntersectionObserver(([e]) => e.isIntersecting ? A() : j(), { threshold: .25 }), N.observe(e));
	}), { destroy() {
		j(), M.disconnect(), N && N.disconnect(), t.remove(), delete e.dataset.pvReady;
	} };
}
var K, q, J, Y, De, X, Oe, ke, Ae, je, Me, Ne = e((() => {
	n(), K = {
		slip: 18,
		lag: 1.15,
		hold: 2.8
	}, q = "#F4F4F4", J = "rgba(244,244,244,.42)", Y = "#D6A394", De = 104, X = .72, Oe = [
		{
			n: "PROTOCOL",
			c: "#C9C4EF"
		},
		{
			n: "CTMS",
			c: "#A99FD8"
		},
		{
			n: "EDC",
			c: "#78A8E0"
		},
		{
			n: "eTMF",
			c: "#7FE8CF"
		}
	], ke = [
		{
			n: "Final protocol",
			a: 0,
			b: .13,
			tool: 0
		},
		{
			n: "Site activation",
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
			n: "Data cleaning",
			a: .57,
			b: .73,
			tool: 2
		},
		{
			n: "Database lock",
			a: .71,
			b: .78,
			tool: 2
		},
		{
			n: "CSR & submission",
			a: .76,
			b: .95,
			tool: 3
		}
	], Ae = 2.6 + Oe.length * K.lag, je = Ae + K.hold, Me = (e) => e < .5 ? 4 * e * e * e : 1 - (-2 * e + 2) ** 3 / 2;
}));
//#endregion
//#region src/mini-scene.js
function Pe(e) {
	let t = Re[e.dataset.scene] || Re.rank, n = Fe[(+e.dataset.col || 0) % Fe.length];
	return c(e, {
		aspect: () => .62,
		loop: Z.loop,
		fade: Z.fade,
		still: Z.p1 + .5,
		layout: (e) => {
			e.S = d(e.W / 400, .7, 1.2);
		},
		draw: (e, r) => {
			e.x.lineCap = "round", e.x.lineJoin = "round", t(e, e.W, e.H, o(r, Z.p0, Z.p1), n);
		}
	});
}
var Fe, Z, Q, Ie, Le, $, Re, ze = e((() => {
	n(), Fe = [
		f[0],
		f[1],
		f[2],
		f[3],
		f[5]
	], Z = {
		p0: .4,
		p1: 4.4,
		fade: 6.4,
		loop: 7
	}, Q = l(7), Ie = Array.from({ length: 40 }, (e, t) => ({
		x: t % 8 / 7 - .5 + (Q() - .5) * .06,
		y: Math.floor(t / 8) / 4 - .5 + (Q() - .5) * .08,
		rec: Q() < .38,
		d: Q()
	})), Le = Array.from({ length: 46 }, () => ({
		x: Q() - .5,
		y: (Q() - .5) * .8,
		resp: Q() < .42,
		d: Q()
	})), $ = [
		.48,
		.86,
		.32,
		.7,
		.58
	], Re = {
		rank(e, t, n, s, c) {
			let l = $.map((e, t) => t).sort((e, t) => $[t] - $[e]), u = a(o(s, .2, .65)), d = n / 6.2, f = t * .14;
			$.forEach((a, m) => {
				let h = p(m, l.indexOf(m), u), g = l.indexOf(m) === 0 && u > .95, _ = n * .2 + h * d;
				e.line(f, _, t * .86, _, i, .1, 4 * e.S), e.line(f, _, f + t * .72 * a * r(o(s, 0, .25)), _, g ? c : i, g ? 1 : .6, 5.5 * e.S), g && e.dot(f + t * .72 * a, _, 6 * e.S, c, 1);
			});
		},
		curve(e, t, n, r, c) {
			let l = t * .14, u = t * .88, d = n * .2, f = n * .8;
			e.line(l, f, u, f, i, .3, 1.5 * e.S), e.line(l, d, l, f, i, .3, 1.5 * e.S);
			let m = a(o(r, 0, .5)), h = (e) => [p(l, u, e), f - (f - d) * (.06 + .86 * (1 - (1 - e) ** 2.4))], g = [];
			for (let e = 0; e <= Math.ceil(36 * m); e++) g.push(h(Math.min(e / 36, m)));
			e.poly(g, i, .95, 3.2 * e.S);
			let _ = a(o(r, .55, .9));
			if (_ > 0) {
				let t = h(p(.15, .5, _));
				e.x.save(), e.x.setLineDash([3 * e.S, 4 * e.S]), e.line(t[0], t[1], t[0], f, i, .45, 1.5 * e.S), e.line(l, t[1], t[0], t[1], i, .45, 1.5 * e.S), e.x.restore(), e.dot(t[0], t[1], 5.5 * e.S, c, 1), e.x.strokeStyle = c, e.x.globalAlpha = .7, e.x.lineWidth = 2 * e.S, e.x.beginPath(), e.x.arc(t[0], t[1], 11 * e.S, 0, s), e.x.stroke(), e.x.globalAlpha = 1;
			}
		},
		sites(e, t, n, a, s) {
			Ie.forEach((c) => {
				let l = c.rec ? r(o(a, .1 + c.d * .55, .25 + c.d * .55)) : 0;
				e.dot(t / 2 + c.x * t * .74, n / 2 + c.y * n * .62, (3 + 2.2 * l) * e.S, l > 0 ? s : i, l > 0 ? .5 + .5 * l : .32);
			});
		},
		split(e, t, n, r, s) {
			let c = a(o(r, .15, .7));
			c > .6 && e.line(t / 2, n * .16, t / 2, n * .84, i, .32 * o(c, .6, 1), 1.5 * e.S), Le.forEach((r) => {
				let a = (r.resp ? -.2 : .2) + r.x * .32, o = p(r.x * .8, a, c);
				e.dot(t / 2 + o * t * .8, n / 2 + r.y * n * .7, 3.6 * e.S, r.resp && c > .3 ? s : i, r.resp ? .5 + .5 * c : .36);
			});
		},
		doc(e, t, n, a, s) {
			let c = t * .16, l = n / 8.5;
			for (let d = 0; d < 6; d++) {
				let f = n * .22 + d * l, p = r(o(a, .04 + d * .07, .2 + d * .07)), m = t * (d === 0 ? .4 : d % 3 == 2 ? .46 : .58);
				e.line(c, f, c + m * p, f, i, d === 0 ? .9 : .5, (d === 0 ? 5.5 : 3.5) * e.S);
				let h = o(a, .55 + d * .06, .66 + d * .06);
				if (h > 0) {
					let n = t * .84;
					e.poly([
						[n - 6 * e.S, f],
						[n - 2 * e.S, f + 4 * e.S],
						[n + 6 * e.S, f - 5 * e.S]
					].slice(0, h > .5 ? 3 : 2), d === 5 ? s : u, h, 2.6 * e.S);
				}
			}
		}
	};
}));
//#endregion
//#region src/testimonials.js
function Be(e) {
	if (!e || e.dataset.pvInit) return null;
	e.dataset.pvInit = "1";
	let t = [...e.querySelectorAll(".tm-tab")], n = [...e.querySelectorAll(".tm-quote")];
	if (!t.length || t.length !== n.length) return delete e.dataset.pvInit, null;
	let r = t.map((e) => e.querySelector(".tm-bar")), i = matchMedia("(prefers-reduced-motion: reduce)").matches, a = 0, o = 0, s = 0, c = !1, l = !1, u = 0, d = t[0].parentElement;
	d.setAttribute("role", "tablist"), t.forEach((e, t) => {
		e.setAttribute("role", "tab"), e.tabIndex = 0, e.id = e.id || `tm-tab-${t}`, n[t].id = n[t].id || `tm-quote-${t}`, e.setAttribute("aria-controls", n[t].id), n[t].setAttribute("role", "tabpanel"), n[t].setAttribute("aria-labelledby", e.id);
	});
	let f = (e, t) => {
		r[e] && (r[e].style.transform = `scaleX(${t})`);
	};
	function p(e) {
		a = (e + t.length) % t.length, o = performance.now(), u = 0, t.forEach((e, t) => {
			let n = t === a;
			e.classList.toggle("is-active", n), e.setAttribute("aria-selected", n ? "true" : "false"), f(t, n && i ? 1 : 0);
		}), n.forEach((e, t) => {
			let n = t === a;
			e.classList.toggle("is-active", n), e.setAttribute("aria-hidden", n ? "false" : "true");
		});
	}
	function m(e) {
		s = requestAnimationFrame(m), !c || l ? o = e - u * Ve : (u = Math.min(1, (e - o) / Ve), f(a, u), u >= 1 && p(a + 1));
	}
	let h = (e) => {
		let n = t.indexOf(e.target.closest(".tm-tab"));
		n >= 0 && p(n);
	}, g = (e) => {
		let n = t.indexOf(e.target.closest(".tm-tab"));
		if (n < 0) return;
		let r = null;
		e.key === "ArrowRight" ? r = n + 1 : e.key === "ArrowLeft" ? r = n - 1 : (e.key === "Enter" || e.key === " ") && (r = n), r !== null && (e.preventDefault(), p(r), t[a].focus());
	}, _ = () => {
		l = !0;
	}, v = () => {
		l = !1;
	};
	d.addEventListener("click", h), d.addEventListener("keydown", g), e.addEventListener("pointerenter", _, { passive: !0 }), e.addEventListener("pointerleave", v, { passive: !0 }), e.addEventListener("focusin", _), e.addEventListener("focusout", v), p(0);
	let y = null;
	return i || (y = new IntersectionObserver(([e]) => {
		c = e.isIntersecting, c && !s ? (o = performance.now() - u * Ve, s = requestAnimationFrame(m)) : c || (cancelAnimationFrame(s), s = 0);
	}, { threshold: .4 }), y.observe(e)), function() {
		cancelAnimationFrame(s), y && y.disconnect(), d.removeEventListener("click", h), d.removeEventListener("keydown", g), e.removeEventListener("pointerenter", _), e.removeEventListener("pointerleave", v), e.removeEventListener("focusin", _), e.removeEventListener("focusout", v), delete e.dataset.pvInit;
	};
}
var Ve, He = e((() => {
	Ve = 8e3;
}));
//#endregion
//#region src/news-cards.js
function Ue() {
	if (document.getElementById(We) || !document.querySelector(".swiper-item")) return;
	let e = document.createElement("style");
	e.id = We, e.textContent = Ge, document.head.appendChild(e);
}
var We, Ge, Ke = e((() => {
	We = "pv-news-cards-css", Ge = "\n:root{--af-mono:'Roboto Mono',ui-monospace,Consolas,monospace;--af-edge:linear-gradient(150deg,rgba(20,18,56,.18) 0%,rgba(20,18,56,.06) 40%,rgba(20,18,56,.04) 75%,rgba(104,74,158,.2) 100%)}\n/* Latest news : carte d'article au style des cartes case studies (verre clair, image arrondie, label mono) */\n.section_layout .swiper-item{ position:relative; isolation:isolate; display:flex; flex-direction:column; gap:1.25rem; height:100%; padding:1rem 1rem 1.5rem; border-radius:1.5rem; background:linear-gradient(155deg, #f6f6f9 0%, #eeedf4 100%); }\n.section_layout .swiper-item::before{ content:''; position:absolute; inset:0; border-radius:inherit; padding:.5px; pointer-events:none; z-index:1; background:var(--af-edge);\n  -webkit-mask:linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0); -webkit-mask-composite:xor; mask-composite:exclude; }\n.section_layout .swiper-item img{ border-radius:1rem; }\n.section_layout .swiper-item .post_body{ padding:0 .5rem; }\n.section_layout .swiper-item .post_date{ font-family:var(--af-mono); font-size:.75rem; letter-spacing:.12em; text-transform:uppercase; }\n/* Latest news (et tout slider d'articles) : cartes moins larges, toutes de la même hauteur ; image 2:1, titre plus petit, 3 lignes max */\n.section_layout .swiper-slide:has(> .swiper-item){ max-width:24rem; height:auto; }\n.section_layout .swiper-item .post_image{ aspect-ratio:2 / 1; margin-bottom:0; }\n.section_layout .swiper-item .heading-style-h4{ font-size:1.25rem; line-height:1.35; font-weight:500; display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical; overflow:hidden; }\n";
})), qe = /* @__PURE__ */ t((() => {
	Te(), Ne(), ze(), He(), Ke(), document.querySelectorAll("[data-pv=\"hero-sequence\"]").forEach(be), document.querySelectorAll("[data-pv=\"gantt-glossy\"]").forEach(Ee), document.querySelectorAll("[data-pv=\"mini-scene\"]").forEach(Pe), document.querySelectorAll("[data-pv=\"testimonials\"]").forEach(Be), Ue();
}));
//#endregion
export default qe();
