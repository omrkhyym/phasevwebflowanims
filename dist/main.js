import { n as e, t } from "./rolldown-runtime-wf392T_D.mjs";
import { d as n, u as r, v as i } from "./bonv-draw-Db5acgQk.mjs";
import { n as a, t as o } from "./mini-scene-BypIfqjG.mjs";
//#region src/hero-sequence/engine.js
function s(e) {
	let t = e.getContext("webgl2", {
		alpha: !0,
		antialias: !1,
		premultipliedAlpha: !0
	});
	if (!t) throw Error("WebGL2 indisponible");
	let n = new Float32Array(l * 2), r = new Float32Array(l * 4), i = new Uint32Array(l), a = 11, o = () => (a = a * 16807 % 2147483647) / 2147483647;
	for (let e = 0; e < l; e++) i[e] = e;
	for (let e = 131071; e > 0; e--) {
		let t = Math.floor(o() * (e + 1));
		[i[e], i[t]] = [i[t], i[e]];
	}
	for (let e = 0; e < l; e++) {
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
	let p = null, m = {}, h = [], g = {}, _ = /* @__PURE__ */ new Map();
	function v(e) {
		let n = _.get(e.id);
		if (n) {
			({prog: p, loc: m, sceneKeys: h, fixedVals: g} = n);
			return;
		}
		let r = e.fixed || {}, i = [...Object.keys(e.params), ...Object.keys(r)].map((e) => `uniform float u_${e};`).join("\n"), a = t.createProgram();
		if (t.attachShader(a, c(t.VERTEX_SHADER, u + i + "\n" + e.glsl + d)), t.attachShader(a, c(t.FRAGMENT_SHADER, f)), t.linkProgram(a), !t.getProgramParameter(a, t.LINK_STATUS)) throw Error(t.getProgramInfoLog(a));
		p = a, h = Object.keys(e.params), m = {}, g = r, [
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
			...h,
			...Object.keys(r)
		].forEach((e) => {
			m[e] = t.getUniformLocation(a, "u_" + e);
		}), _.set(e.id, {
			prog: p,
			loc: m,
			sceneKeys: h,
			fixedVals: g
		});
	}
	let y = 1, b = 1, x = 1;
	function S() {
		x = Math.min(devicePixelRatio || 1, 2), y = Math.max(1, Math.round(e.clientWidth * x)), b = Math.max(1, Math.round(e.clientHeight * x)), e.width = y, e.height = b;
	}
	function C(e, n, r) {
		t.viewport(0, 0, y, b), t.clearColor(0, 0, 0, 0), t.clear(t.COLOR_BUFFER_BIT), p && (t.useProgram(p), t.bindVertexArray(s), t.uniform1f(m.t, e), t.uniform1f(m.scale, Math.min(y, b * 1.6) * .9 * n.zoom), t.uniform1f(m.cam, n.cam), t.uniform1f(m.dpr, x), t.uniform1f(m.dof, n.dof), t.uniform1f(m.focus, n.focus), t.uniform1f(m.size, n.size), t.uniform1f(m.bright, n.bright), t.uniform1f(m.shift, n.shift || 0), t.uniform2f(m.rot, n.yaw, n.pitch), t.uniform2f(m.res, y, b), h.forEach((e) => t.uniform1f(m[e], n[e])), Object.entries(g).forEach(([e, n]) => t.uniform1f(m[e], n)), t.enable(t.BLEND), t.blendFunc(t.ONE, t.ONE), t.drawArrays(t.POINTS, 0, Math.min(l, Math.max(1, Math.round(r)))));
	}
	return {
		useScene: v,
		resize: S,
		render: C
	};
}
var c, l, u, d, f, p = e((() => {
	c = {
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
	}, l = 131072, u = "#version 300 es\nlayout(location=0) in vec2 a_g;   // position sur une grille régulière (pour les scènes de plan)\nlayout(location=1) in vec4 a_r;   // aléas\nuniform float u_t, u_scale, u_cam, u_dpr, u_dof, u_focus, u_size, u_bright, u_shift;   // shift : décalage horizontal de l'image (0 centré)\nuniform vec2 u_rot, u_res;\nout float v_a; out float v_b; out float v_s; out vec2 v_d; out vec3 v_c;\nfloat S_out=0.;   // une scène peut le poser : étire le point en traînée, dans le sens de la fuite depuis le centre\nconst float PI=3.14159265, TAU=6.2831853;\nconst vec3 MAU=vec3(.663,.624,.847), BLU=vec3(.471,.659,.878), TEA=vec3(.498,.910,.812), WHI=vec3(.957);\nfloat ez(float k){ return k<.5?4.*k*k*k:1.-pow(-2.*k+2.,3.)/2.; }\nvec3 rotY(vec3 p, float a){ float c=cos(a), s=sin(a); return vec3(c*p.x+s*p.z, p.y, -s*p.x+c*p.z); }\nvec3 rotX(vec3 p, float a){ float c=cos(a), s=sin(a); return vec3(p.x, c*p.y-s*p.z, s*p.y+c*p.z); }\nvec3 sphereDir(vec4 r){ float ct=r.y*2.-1., sn=sqrt(1.-ct*ct), ph=r.z*TAU; return vec3(sn*cos(ph),ct,sn*sin(ph)); }\n", d = "\nvoid main(){\n  vec3 P; float A; vec3 C;\n  scene(a_g, a_r, u_t, P, A, C);\n  float cy=cos(u_rot.x), sy=sin(u_rot.x); P=vec3(cy*P.x+sy*P.z,P.y,-sy*P.x+cy*P.z);\n  float cp=cos(u_rot.y), sp=sin(u_rot.y); P=vec3(P.x,cp*P.y+sp*P.z,cp*P.z-sp*P.y);\n  float zr=u_cam+P.z, z=max(zr,.3); vec2 s=P.xy/z*u_scale;\n  gl_Position=vec4(s.x/u_res.x*2.+u_shift, s.y/u_res.y*2., 0., 1.);\n  // profondeur de champ : net près du centre de la scène, disques doux devant et derrière (l'énergie du point est conservée)\n  float near=clamp(2.25-z*.62,.08,1.);\n  float base=(1.+2.4*near)*u_size, blur=clamp(abs(P.z)-u_focus,0.,1.6)*u_dof;\n  float sz=min(base+14.*blur*blur,80.);\n  v_b=clamp(blur*1.8,0.,1.);\n  v_s=clamp(S_out,0.,2.); v_d=normalize(s+1e-4);\n  gl_PointSize=u_dpr*sz*(1.+2.*v_s);\n  v_a=A*u_bright*near*pow(base/sz,1.25)*smoothstep(.35,.7,zr);\n  v_c=C;\n}", f = "#version 300 es\nprecision highp float;\nin float v_a; in float v_b; in float v_s; in vec2 v_d; in vec3 v_c; out vec4 o;\nvoid main(){\n  vec2 q=gl_PointCoord-.5; q.y=-q.y;\n  vec2 ql=vec2(dot(q,v_d), dot(q,vec2(-v_d.y,v_d.x))); ql.y*=1.+4.*v_s;\n  float d=length(ql);\n  float sharp=smoothstep(.5,.15,d), bokeh=smoothstep(.5,.38,d)*(.7+.3*smoothstep(.1,.45,d));\n  float a=mix(sharp,bokeh,v_b)*v_a; if(a<.002) discard;\n  o=vec4(v_c*a,a);\n}";
})), m, h = e((() => {
	m = {
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
})), g, _, v, y, b, x, S, C, w = e((() => {
	h(), g = m.duration, _ = Object.fromEntries(Object.entries(m.params).map(([e, t]) => [e, t.value])), v = (e) => {
		let t = Number.isInteger(e) ? e.toFixed(1) : String(e);
		return e < 0 ? "(" + t + ")" : t;
	}, y = m.glsl.replace("void scene(", "void blobScene(").replace(/\bu_(\w+)\b/g, (e, t) => t in m.params ? v(m.params[t].value) : e), b = (e) => e < .5 ? 4 * e * e * e : 1 - (-2 * e + 2) ** 3 / 2, x = (e, t, n) => Math.max(0, Math.min(1, (e - t) / (n - t))), S = (e, t, n) => e + (t - e) * n, C = {
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
		startsAt: g,
		camera: {
			...m.camera,
			...m.cameraAt(g, {
				...m.camera,
				..._
			})
		},
		params: {
			count: {
				label: "Densité (particules)",
				min: 2e3,
				max: 131072,
				step: 1e3,
				value: _.count
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
			let n = b(x(e, t.shedAt, t.shedAt + t.camDur));
			return {
				cam: S(t.cam, t.camTo, n),
				pitch: S(t.pitch, t.pitchTo, n),
				yaw: S(t.yaw, t.yawTo, n)
			};
		},
		glsl: `
${y}
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
  if(t<td){ blobScene(g, r, ${v(g)}+t, Bp, Ba, Bc); P=Bp; A=Ba; C=Bc; return; }
  blobScene(g, r, ${v(g)}+td, Bp, Ba, Bc);   // l'endroit où il s'est détaché
  float u=clamp((t-td)/u_fall,0.,1.), arc=sin(PI*u);
  float kh=1.-pow(1.-u, 2.+u_soft*3.), kv=ez(u);           // s'écarte d'abord à l'horizontale, puis descend et se pose en douceur
  P=vec3(mix(Bp.x,target.x,kh), mix(Bp.y,target.y,kv)+u_lift*arc, mix(Bp.z,target.z,kh));
  P+=u_float*arc*.25*vec3(sin(t*1.3+r.x*TAU), .5*sin(t*1.1+r.y*TAU), cos(t*1.2+r.z*TAU));   // il flotte
  A=mix(Ba,Ta,u); C=mix(Bc,Tc,u);
}`
	};
})), T, E, D, O, k, A, j, M, N = e((() => {
	w(), T = C.duration, E = Object.fromEntries(Object.entries(C.params).map(([e, t]) => [e, t.value])), D = (e) => {
		let t = Number.isInteger(e) ? e.toFixed(1) : String(e);
		return e < 0 ? "(" + t + ")" : t;
	}, O = C.glsl.replace("void scene(", "void planeScene(").replace(/\bu_(\w+)\b/g, (e, t) => t in C.params && t !== "count" ? D(C.params[t].value) : e), k = (e) => e < .5 ? 4 * e * e * e : 1 - (-2 * e + 2) ** 3 / 2, A = (e, t, n) => Math.max(0, Math.min(1, (e - t) / (n - t))), j = (e, t, n) => e + (t - e) * n, M = {
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
		startsAt: T,
		camera: {
			...C.camera,
			cam: E.camTo,
			pitch: E.pitchTo,
			yaw: E.yawTo
		},
		params: {
			count: {
				label: "Densité (particules)",
				min: 2e3,
				max: 131072,
				step: 1e3,
				value: C.params.count.value
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
			let n = k(A(e, t.dzAt, t.dzAt + t.dzDur)), r = t.dzDur, i = (e - t.dzAt) / r, a = i <= 0 ? t.yaw : i >= 1 ? t.yawEnd + t.yawOut * (e - t.dzAt - r) : (2 * i ** 3 - 3 * i ** 2 + 1) * t.yaw + (-2 * i ** 3 + 3 * i ** 2) * t.yawEnd + (i ** 3 - i ** 2) * r * t.yawOut, o = Math.max(0, e - t.dzAt - r), s = Math.min(1, o / t.rampIn), c = s * s * (3 - 2 * s);
			return {
				cam: j(t.cam, t.camEnd, n) + t.camAmp * c * Math.sin(2 * Math.PI * o / t.camPeriod),
				pitch: j(t.pitch, t.pitchEnd, n) + t.pitchAmp * c * Math.sin(2 * Math.PI * o / t.pitchPeriod),
				yaw: a,
				zoom: j(t.zoom, t.zoomEnd, n),
				size: j(t.size, t.sizeEnd, n),
				shift: j(t.shift, t.shiftEnd, n)
			};
		},
		glsl: `
${O}
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
  planeScene(g, r, ${D(T)}+t, Pp, Ap, Cp);
  float e=ez(clamp((t-u_dzAt)/u_dzDur,0.,1.));
  float sc=mix(1., u_landW/${D(E.width)}, e);                       // le plan rétrécit jusqu'à la taille du paysage
  float wv=(Pp.y-${D(E.height)})*mix(1., u_waveKeep, e);           // les vagues s'apaisent
  float H=mountains(g, t);
  float hn=H/max(u_mHeight,.01);
  P=vec3(Pp.x*sc, ${D(E.height)}+wv*sc+H, Pp.z*sc);
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
})), P, ee, F, te, ne, re, ie, I, ae, L, R, oe, z, B, se = e((() => {
	N(), h(), p(), P = (e) => {
		let t = Number.isInteger(e) ? e.toFixed(1) : String(e);
		return e < 0 ? "(" + t + ")" : t;
	}, ee = M.glsl.replace("void scene(", "void landScene(").replace(/\bu_(\w+)\b/g, (e, t) => t in M.params && t !== "count" && t !== "seed" ? P(M.params[t].value) : e), F = 5, te = -.15, ne = .45, re = (e) => ({
		...Object.fromEntries(Object.entries(c).map(([t, n]) => [t, t in e.camera ? e.camera[t] : n.value])),
		...Object.fromEntries(Object.entries(e.params).map(([e, t]) => [e, t.value]))
	}), ie = re(M), I = {
		...ie,
		...M.cameraAt(M.duration, ie)
	}, ae = re(m), L = {
		...ae,
		...m.cameraAt(0, ae)
	}, R = M.params.yawOut.value, oe = (e) => e < .5 ? 4 * e * e * e : 1 - (-2 * e + 2) ** 3 / 2, z = (e, t, n) => e + (t - e) * n, B = {
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
		duration: F,
		startsAt: M.duration,
		fixed: { seed: M.params.seed.value },
		camera: {
			cam: I.cam,
			pitch: I.pitch,
			yaw: I.yaw,
			zoom: I.zoom,
			size: I.size,
			bright: I.bright,
			dof: I.dof,
			focus: I.focus,
			shift: I.shift
		},
		params: {
			count: {
				label: "Densité (particules)",
				min: 2e3,
				max: 131072,
				step: 1e3,
				value: M.params.count.value
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
			let n = t.camAt, r = Math.max(.1, Math.min(t.camDur, F - n));
			if (e < n) return {
				yaw: I.yaw + R * e,
				shift: I.shift
			};
			let i = Math.min(1, (e - n) / r), a = oe(i);
			return {
				yaw: I.yaw + R * n + R * r * (Math.min(i, 1) - Math.min(i, 1) ** 2 / 2),
				pitch: z(I.pitch, L.pitch, a),
				cam: z(I.cam, L.cam, a),
				zoom: z(I.zoom, L.zoom, a),
				size: z(I.size, L.size, a),
				bright: z(I.bright, L.bright, a),
				dof: z(I.dof, L.dof, a),
				focus: z(I.focus, L.focus, a),
				shift: z(I.shift, L.shift, a)
			};
		},
		glsl: `
${ee}
// reçoit le paysage déjà calculé (Op, Oa, Oc) : la séquence complète le calcule une seule fois
void evapMix(vec2 g, vec4 r, float t, vec3 Op, float Oa, vec3 Oc, out vec3 P, out float A, out vec3 C){
  // la cible : le blob, qui rejoint pile sa première image à la fin de la scène
  vec3 Bp; float Ba; vec3 Bc;
  blobScene(g, r, t-${P(F)}, Bp, Ba, Bc);
  float hn=clamp((Op.y-(${P(te)}))/${P(ne)},0.,1.);
  float s=mix(fract(r.x*7.7), 1.-hn, u_order);                       // les sommets partent les premiers
  float k=ez(clamp((t-u_start-s*u_stagger)/u_dur,0.,1.));
  k=mix(k, 1., smoothstep(${P(4.75)}, ${P(F)}, t));   // tout est posé à la dernière image
  float arc=sin(PI*k);
  P=mix(Op,Bp,k)+vec3(0.,u_lift*arc,0.);
  P=rotY(P, u_swirl*arc*(.5+r.z));
  A=mix(Oa,Ba,k)*(1.+u_vapor*arc);
  C=mix(Oc,Bc,k); C=mix(C, WHI, clamp(u_vapor*arc*.3,0.,1.));
}
void scene(vec2 g, vec4 r, float t, out vec3 P, out float A, out vec3 C){
  vec3 Op; float Oa; vec3 Oc;
  landScene(g, r, ${P(M.duration)}+t, Op, Oa, Oc);
  evapMix(g, r, t, Op, Oa, Oc, P, A, C);
}`
	};
})), V, H, U, W, ce, le, ue, de = e((() => {
	h(), w(), N(), se(), V = (e) => {
		let t = Number.isInteger(e) ? e.toFixed(1) : String(e);
		return e < 0 ? "(" + t + ")" : t;
	}, H = m.duration, U = H + C.duration, W = U + M.duration, ce = W + B.duration, le = B.glsl.replace("void scene(", "void evapScene(").replace(/\bu_(\w+)\b/g, (e, t) => t in B.params && t !== "count" ? V(B.params[t].value) : e), ue = {
		id: "sequence",
		name: "Séquence (un seul programme)",
		inSequence: !1,
		duration: ce,
		camera: { ...m.camera },
		params: { count: {
			label: "Densité (particules)",
			min: 2e3,
			max: 131072,
			step: 1e3,
			value: m.params.count.value
		} },
		fixed: { ...B.fixed },
		glsl: `
${le}
void scene(vec2 g, vec4 r, float T, out vec3 P, out float A, out vec3 C){
  if(T<${V(H)}){ blobScene(g, r, T, P, A, C); return; }
  if(T<${V(U)}){ planeScene(g, r, T-${V(H)}, P, A, C); return; }
  // le paysage : calculé une seule fois, ici, pour la fin des montagnes comme pour le retour au blob
  vec3 Lp; float La; vec3 Lc;
  landScene(g, r, T-${V(U)}, Lp, La, Lc);
  if(T<${V(W)}){ P=Lp; A=La; C=Lc; return; }
  evapMix(g, r, T-${V(W)}, Lp, La, Lc, P, A, C);
}`
	};
}));
//#endregion
//#region src/hero-sequence/index.js
function fe(e) {
	if (e.dataset.pvReady) return;
	if (e.dataset.pvReady = "1", !document.getElementById("pv-hero-seq-css")) {
		let e = document.createElement("style");
		e.id = "pv-hero-seq-css", e.textContent = pe, document.head.appendChild(e);
	}
	let t = document.createElement("canvas");
	t.setAttribute("aria-hidden", "true"), e.appendChild(t);
	let n;
	try {
		n = s(t), n.useScene(ue);
	} catch {
		t.remove(), delete e.dataset.pvReady;
		return;
	}
	let r = matchMedia("(prefers-reduced-motion: reduce)").matches, i = !1;
	function a(e) {
		let t = K.find((t) => e < t.at + t.end) || K[K.length - 1], r = Math.min(e - t.at, t.end), a = t.sc.cameraAt ? {
			...t.v,
			...t.sc.cameraAt(r, t.v)
		} : t.v, o = i ? {
			...a,
			shift: 0,
			zoom: a.zoom * ge
		} : a;
		n.render(e, o, t.v.count * (i ? .5 : 1));
	}
	function o() {
		i = e.getBoundingClientRect().width < 900, n.resize(), r && a(_e);
	}
	let c = 0, l = 0, u = 0;
	function d(e) {
		c = requestAnimationFrame(d), l += Math.min((e - u) / 1e3, .05), u = e, a(l % he);
	}
	function f() {
		c || r || (u = performance.now(), c = requestAnimationFrame(d));
	}
	function p() {
		cancelAnimationFrame(c), c = 0;
	}
	t.addEventListener("webglcontextlost", (e) => {
		e.preventDefault(), p();
	});
	let m = new ResizeObserver(o);
	m.observe(e), o();
	let h = null;
	return r || (h = new IntersectionObserver(([e]) => e.isIntersecting ? f() : p()), h.observe(e)), { destroy() {
		p(), m.disconnect(), h && h.disconnect(), t.remove(), delete e.dataset.pvReady;
	} };
}
var G, pe, me, K, he, ge, _e, ve = e((() => {
	p(), h(), w(), N(), se(), de(), G = "[data-pv=\"hero-sequence\"]", pe = `
.header_image-wrapper:has(${G}){ background:none!important; border:0!important; box-shadow:none!important; position:relative; overflow:visible!important; min-height:30rem; }
.header_component:has(${G}), .header_content:has(${G}){ position:relative; }
.header_content:has(${G}) .header_content-left{ position:relative; z-index:2; }
/* très grand, ancré à droite, passe sous la colonne de texte ; s'estompe côté texte */
${G}{ position:absolute; top:-16%; bottom:-16%; right:-6%; width:95vw; z-index:0; pointer-events:none;
  -webkit-mask-image:linear-gradient(90deg, transparent 2%, rgba(0,0,0,.4) 24%, #000 46%); mask-image:linear-gradient(90deg, transparent 2%, rgba(0,0,0,.4) 24%, #000 46%); }
${G} canvas{ position:absolute; inset:0; width:100%; height:100%; display:block; }
@media (max-width:991px){
  .section_header:has(${G}){ height:auto; min-height:100svh; display:flex; flex-direction:column; justify-content:center; overflow-x:clip; }
  .header_component:has(${G}), .header_component:has(${G}) .header_content{ height:auto; }
  ${G}{ position:relative; top:auto; bottom:auto; right:auto; width:100vw; margin-left:calc(50% - 50vw); aspect-ratio:1/1; margin-top:1rem; -webkit-mask-image:none; mask-image:none; }
  /* l'animation descend jusqu'au bas de l'écran : elle prend toute la hauteur laissée par le texte, sans marge dessous */
  .section_header:has(${G}){ justify-content:flex-start; }
  .section_header:has(${G}) > .padding-global{ flex:1 0 auto; display:flex; flex-direction:column; padding-bottom:0; }
  .section_header:has(${G}) > .padding-global > .container-large{ flex:1 0 auto; display:flex; flex-direction:column; width:100%; }
  .header_component:has(${G}){ flex:1 0 auto; display:flex; flex-direction:column; }
  ${G}{ flex:1 0 auto; aspect-ratio:auto; min-height:100vw; }
}`, me = (e) => ({
		...Object.fromEntries(Object.entries(c).map(([t, n]) => [t, e.camera && t in e.camera ? e.camera[t] : n.value])),
		...Object.fromEntries(Object.entries(e.params).map(([e, t]) => [e, t.value]))
	}), K = [];
	{
		let e = 0;
		[
			m,
			C,
			M,
			B
		].forEach((t) => {
			K.push({
				sc: t,
				at: e,
				end: t.duration,
				v: me(t)
			}), e += t.duration;
		});
	}
	he = ue.duration, ge = 1.5, _e = K[2].at + 7.5;
}));
//#endregion
//#region src/gantt-glossy.js
function ye(e) {
	if (e.dataset.pvReady) return;
	e.dataset.pvReady = "1";
	let t = document.createElement("canvas");
	t.style.cssText = "display:block;width:100%;", t.setAttribute("role", "img"), t.setAttribute("aria-label", "Study timeline: one eligibility change pushes submission back by 18 weeks as each tool recalculates on its own schedule."), e.appendChild(t);
	let n = t.getContext("2d"), a = e.closest("section") || document.body, o = (e) => getComputedStyle(a.querySelector(e) || document.body).fontFamily, s = o(".text-size-large"), c = o(".text-size-label"), l = "letterSpacing" in n;
	function u(e, t, r) {
		n.font = `${e} ${t}px ${r ? c : s}`, l && (n.letterSpacing = r ? (t * .12).toFixed(2) + "px" : "0px");
	}
	function d(e, t, r, i, a, o, s = 1, c = "left", l = !1) {
		s <= 0 || (u(i, a, l), n.textAlign = c, n.globalAlpha = s, n.fillStyle = o, n.fillText(e, t, r), n.globalAlpha = 1, n.textAlign = "left");
	}
	function f(e, t, r, i) {
		return u(t, r, i), n.measureText(e).width;
	}
	function p(e, t, r, i, a) {
		n.beginPath(), n.roundRect ? n.roundRect(e, t, r, i, Math.min(a, r / 2, i / 2)) : n.rect(e, t, r, i);
	}
	function m(e, t, r, i, a, o, s = 1) {
		n.globalAlpha = o, n.strokeStyle = a, n.lineWidth = s, n.beginPath(), n.moveTo(e, t), n.lineTo(r, i), n.stroke(), n.globalAlpha = 1;
	}
	let h = 0, g = 0, _ = 1, v = !1;
	function y() {
		v = h < 640, _ = r(h / 1100, .7, 1.15);
		let e = 64 * _, t = (v ? 40 : 54) * _, n = v ? 118 * _ : 230 * _, i = 24 * _;
		return {
			top: e,
			rowH: t,
			padL: n,
			padR: i,
			w: h - n - i,
			BH: (v ? 12 : 16) * _,
			gridTop: e + 14 * _,
			bottom: e + 14 * _ + t * $.length
		};
	}
	function b() {
		let e = y();
		return Math.round(e.bottom + 92 * _);
	}
	function x(e) {
		n.clearRect(0, 0, h, g);
		let { top: t, rowH: r, padL: a, w: o, BH: s, gridTop: c, bottom: l } = y(), u = q.slip / be, b = (e) => a + e * o, x = Math.max(12, (v ? 12 : 15) * _), S = Math.max(8.5, 10 * _);
		for (let e = 0; e <= 8; e++) {
			let n = e / 8, r = Math.round(be * n), i = b(n);
			m(i, c - 6 * _, i, l, J, e === 0 ? .18 : .07), (!v || e % 2 == 0) && d("W" + r, i, t - 6 * _, 400, S, Y, 1, e === 0 ? "left" : e === 8 ? "right" : "center", !0);
		}
		d("STUDY TIMELINE", 0, t - 6 * _, 400, S, Y, 1, "left", !0);
		let C = Ce(i(e, .7, 1.7)), w = !1;
		$.forEach((t, a) => {
			let l = c + a * r + r / 2, f = t.tool * q.lag, h = a === 0 ? C : Ce(i(e, 1.6 + f, 2.6 + f));
			a > 0 && h < 1 && C >= 1 && (w = !0);
			let g = t.a * Z + (a === 0 ? 0 : u * h), y = t.b * Z + u * (a === 0 ? C : h);
			if (a && m(0, l - r / 2, b(1), l - r / 2, J, .06), d(t.n, 0, l + (v ? 4 : -1) * _, 400, x, h > 0 || a === 0 ? J : Y), v || d(Q[t.tool].n, 0, l + 15 * _, 400, S * .9, Q[t.tool].c, .85, "left", !0), n.save(), n.setLineDash([2, 3]), p(b(t.a * Z) + .5, l - s / 2 + .5, (t.b - t.a) * Z * o - 1, s - 1, s / 2), n.strokeStyle = "rgba(244,244,244,.28)", n.lineWidth = 1, n.stroke(), n.restore(), a > 0 && C >= 1 && h < 1) {
				let e = b(t.a * Z + u), r = b(g);
				n.save(), n.setLineDash([3, 3]), p(r, l - s / 2 - 3 * _, e - r + (y - g) * o, s + 6 * _, (s + 6 * _) / 2), n.strokeStyle = X, n.globalAlpha = .8, n.lineWidth = 1, n.stroke(), n.restore(), n.globalAlpha = 1, d("STALE", b(y) + 10 * _, l + S * .36, 400, S, X, .9, "left", !0);
			}
			p(b(g), l - s / 2, (y - g) * o, s, s / 2), n.globalAlpha = .92, n.fillStyle = Q[t.tool].c, n.fill(), n.globalAlpha = 1;
		});
		let T = $[$.length - 1], E = Ce(i(e, 1.6 + T.tool * q.lag, 2.6 + T.tool * q.lag)), D = b(T.b * Z), O = b(T.b * Z + u * E), k = c - 6 * _, A = l + 8 * _;
		if (n.save(), n.setLineDash([3, 4]), m(D, k, D, A, J, .5), n.restore(), d("PLANNED", D, A + 18 * _, 400, S, Y, 1, "center", !0), E > .03) {
			n.save(), n.beginPath(), n.rect(D, k, O - D, A - k), n.clip();
			for (let e = D - 80; e < O + 80; e += 7 * _) m(e, k, e - 70 * _, A, X, .14);
			n.restore(), m(O, k, O, A, X, 1, 1.5);
			let e = "SUBMISSION  +" + Math.round(q.slip * E) + " WEEKS", t = f(e, 500, S * 1.05, !0) + 22 * _, r = 24 * _, i = Math.min(O + 10 * _, h - t - 2), a = A + 6 * _;
			n.globalAlpha = E, p(i, a, t, r, r / 2), n.fillStyle = "rgba(214,163,148,.16)", n.fill(), n.strokeStyle = X, n.lineWidth = 1, n.stroke(), n.globalAlpha = 1, d(e, i + 11 * _, a + r / 2 + S * .38, 500, S * 1.05, X, E, "left", !0);
		}
		let j = C < 1 ? "ONE ELIGIBILITY CRITERION CHANGES" : w ? "THREE TOOLS HAVE NOT RECALCULATED YET" : "EVERY DOWNSTREAM DATE HAS MOVED", M = C < 1 ? J : w ? X : J, N = A + 58 * _;
		n.globalAlpha = 1, n.fillStyle = M, n.beginPath(), n.arc(5 * _, N - S * .35, 3.5 * _, 0, Math.PI * 2), n.fill(), d(j, 18 * _, N, 400, S, M, .9, "left", !0);
	}
	let S = matchMedia("(prefers-reduced-motion: reduce)").matches, C = 0, w = 0, T = 0, E = !1, D = 0;
	function O() {
		if (h = t.clientWidth, !h) return;
		g = b(), t.style.height = g + "px";
		let e = Math.min(devicePixelRatio || 1, 2);
		t.width = Math.round(h * e), t.height = Math.round(g * e), n.setTransform(e, 0, 0, e, 0, 0), E && x(S ? xe : T);
	}
	function k(e) {
		C = requestAnimationFrame(k), T += Math.min((e - w) / 1e3, .05), w = e, T > Se && (T = 0), x(T);
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
	return (document.fonts ? Promise.race([Promise.all([document.fonts.load(`400 12px ${s}`), document.fonts.load(`400 12px ${c}`)]), new Promise((e) => setTimeout(e, 3e3))]) : Promise.resolve()).then(() => {
		E = !0, O(), !S && (N = new IntersectionObserver(([e]) => e.isIntersecting ? A() : j(), { threshold: .25 }), N.observe(e));
	}), { destroy() {
		j(), M.disconnect(), N && N.disconnect(), t.remove(), delete e.dataset.pvReady;
	} };
}
var q, J, Y, X, be, Z, Q, $, xe, Se, Ce, we = e((() => {
	n(), q = {
		slip: 18,
		lag: 1.15,
		hold: 2.8
	}, J = "#F4F4F4", Y = "rgba(244,244,244,.42)", X = "#D6A394", be = 104, Z = .72, Q = [
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
	], $ = [
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
	], xe = 2.6 + Q.length * q.lag, Se = xe + q.hold, Ce = (e) => e < .5 ? 4 * e * e * e : 1 - (-2 * e + 2) ** 3 / 2;
}));
//#endregion
//#region src/testimonials.js
function Te(e) {
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
		s = requestAnimationFrame(m), !c || l ? o = e - u * Ee : (u = Math.min(1, (e - o) / Ee), f(a, u), u >= 1 && p(a + 1));
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
		c = e.isIntersecting, c && !s ? (o = performance.now() - u * Ee, s = requestAnimationFrame(m)) : c || (cancelAnimationFrame(s), s = 0);
	}, { threshold: .4 }), y.observe(e)), function() {
		cancelAnimationFrame(s), y && y.disconnect(), d.removeEventListener("click", h), d.removeEventListener("keydown", g), e.removeEventListener("pointerenter", _), e.removeEventListener("pointerleave", v), e.removeEventListener("focusin", _), e.removeEventListener("focusout", v), delete e.dataset.pvInit;
	};
}
var Ee, De = e((() => {
	Ee = 8e3;
}));
//#endregion
//#region src/news-cards.js
function Oe() {
	if (document.getElementById(ke) || !document.querySelector(".swiper-item")) return;
	let e = document.createElement("style");
	e.id = ke, e.textContent = Ae, document.head.appendChild(e);
}
var ke, Ae, je = e((() => {
	ke = "pv-news-cards-css", Ae = "\n:root{--af-mono:'Roboto Mono',ui-monospace,Consolas,monospace;--af-edge:linear-gradient(150deg,rgba(20,18,56,.18) 0%,rgba(20,18,56,.06) 40%,rgba(20,18,56,.04) 75%,rgba(104,74,158,.2) 100%)}\n/* Latest news : carte d'article au style des cartes case studies (verre clair, image arrondie, label mono) */\n.section_layout .swiper-item{ position:relative; isolation:isolate; display:flex; flex-direction:column; gap:1.25rem; height:100%; padding:1rem 1rem 1.5rem; border-radius:1.5rem; background:linear-gradient(155deg, #f6f6f9 0%, #eeedf4 100%); }\n.section_layout .swiper-item::before{ content:''; position:absolute; inset:0; border-radius:inherit; padding:.5px; pointer-events:none; z-index:1; background:var(--af-edge);\n  -webkit-mask:linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0); -webkit-mask-composite:xor; mask-composite:exclude; }\n.section_layout .swiper-item img{ border-radius:1rem; }\n.section_layout .swiper-item .post_body{ padding:0 .5rem; }\n.section_layout .swiper-item .post_date{ font-family:var(--af-mono); font-size:.75rem; letter-spacing:.12em; text-transform:uppercase; }\n/* Latest news (et tout slider d'articles) : cartes moins larges, toutes de la même hauteur ; image 2:1, titre plus petit, 3 lignes max */\n.section_layout .swiper-slide:has(> .swiper-item){ max-width:24rem; height:auto; }\n.section_layout .swiper-item .post_image{ aspect-ratio:2 / 1; margin-bottom:0; }\n.section_layout .swiper-item .heading-style-h4{ font-size:clamp(1.375rem, 1.15rem + .55vw, 1.625rem); line-height:1.25; letter-spacing:-.015em; font-weight:400; display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical; overflow:hidden; }\n";
})), Me = /* @__PURE__ */ t((() => {
	ve(), we(), a(), De(), je(), document.querySelectorAll("[data-pv=\"hero-sequence\"]").forEach(fe), document.querySelectorAll("[data-pv=\"gantt-glossy\"]").forEach(ye), document.querySelectorAll("[data-pv=\"mini-scene\"]").forEach(o), document.querySelectorAll("[data-pv=\"testimonials\"]").forEach(Te), Oe();
}));
//#endregion
export default Me();
