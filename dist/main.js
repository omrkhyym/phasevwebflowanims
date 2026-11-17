import { n as e, t } from "./rolldown-runtime-wf392T_D.mjs";
//#region src/hero-sequence/engine.js
function n(e) {
	let t = e.getContext("webgl2", {
		alpha: !0,
		antialias: !1,
		premultipliedAlpha: !0
	});
	if (!t) throw Error("WebGL2 indisponible");
	let n = new Float32Array(i * 2), r = new Float32Array(i * 4), c = new Uint32Array(i), l = 11, u = () => (l = l * 16807 % 2147483647) / 2147483647;
	for (let e = 0; e < i; e++) c[e] = e;
	for (let e = 131071; e > 0; e--) {
		let t = Math.floor(u() * (e + 1));
		[c[e], c[t]] = [c[t], c[e]];
	}
	for (let e = 0; e < i; e++) {
		let t = c[e], i = t % 512, a = Math.floor(t / 512);
		n[e * 2] = -1 + 2 * i / 511, n[e * 2 + 1] = -1 + 2 * a / 255;
		for (let t = 0; t < 4; t++) r[e * 4 + t] = u();
	}
	let d = t.createVertexArray();
	t.bindVertexArray(d), t.bindBuffer(t.ARRAY_BUFFER, t.createBuffer()), t.bufferData(t.ARRAY_BUFFER, n, t.STATIC_DRAW), t.enableVertexAttribArray(0), t.vertexAttribPointer(0, 2, t.FLOAT, !1, 0, 0), t.bindBuffer(t.ARRAY_BUFFER, t.createBuffer()), t.bufferData(t.ARRAY_BUFFER, r, t.STATIC_DRAW), t.enableVertexAttribArray(1), t.vertexAttribPointer(1, 4, t.FLOAT, !1, 0, 0);
	function f(e, n) {
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
		let r = e.fixed || {}, i = [...Object.keys(e.params), ...Object.keys(r)].map((e) => `uniform float u_${e};`).join("\n"), c = t.createProgram();
		if (t.attachShader(c, f(t.VERTEX_SHADER, a + i + "\n" + e.glsl + o)), t.attachShader(c, f(t.FRAGMENT_SHADER, s)), t.linkProgram(c), !t.getProgramParameter(c, t.LINK_STATUS)) throw Error(t.getProgramInfoLog(c));
		p = c, h = Object.keys(e.params), m = {}, g = r, [
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
			m[e] = t.getUniformLocation(c, "u_" + e);
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
		t.viewport(0, 0, y, b), t.clearColor(0, 0, 0, 0), t.clear(t.COLOR_BUFFER_BIT), p && (t.useProgram(p), t.bindVertexArray(d), t.uniform1f(m.t, e), t.uniform1f(m.scale, Math.min(y, b * 1.6) * .9 * n.zoom), t.uniform1f(m.cam, n.cam), t.uniform1f(m.dpr, x), t.uniform1f(m.dof, n.dof), t.uniform1f(m.focus, n.focus), t.uniform1f(m.size, n.size), t.uniform1f(m.bright, n.bright), t.uniform1f(m.shift, n.shift || 0), t.uniform2f(m.rot, n.yaw, n.pitch), t.uniform2f(m.res, y, b), h.forEach((e) => t.uniform1f(m[e], n[e])), Object.entries(g).forEach(([e, n]) => t.uniform1f(m[e], n)), t.enable(t.BLEND), t.blendFunc(t.ONE, t.ONE), t.drawArrays(t.POINTS, 0, Math.min(i, Math.max(1, Math.round(r)))));
	}
	return {
		useScene: v,
		resize: S,
		render: C
	};
}
var r, i, a, o, s, c = e((() => {
	r = {
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
	}, i = 131072, a = "#version 300 es\nlayout(location=0) in vec2 a_g;   // position sur une grille régulière (pour les scènes de plan)\nlayout(location=1) in vec4 a_r;   // aléas\nuniform float u_t, u_scale, u_cam, u_dpr, u_dof, u_focus, u_size, u_bright, u_shift;   // shift : décalage horizontal de l'image (0 centré)\nuniform vec2 u_rot, u_res;\nout float v_a; out float v_b; out float v_s; out vec2 v_d; out vec3 v_c;\nfloat S_out=0.;   // une scène peut le poser : étire le point en traînée, dans le sens de la fuite depuis le centre\nconst float PI=3.14159265, TAU=6.2831853;\nconst vec3 MAU=vec3(.663,.624,.847), BLU=vec3(.471,.659,.878), TEA=vec3(.498,.910,.812), WHI=vec3(.957);\nfloat ez(float k){ return k<.5?4.*k*k*k:1.-pow(-2.*k+2.,3.)/2.; }\nvec3 rotY(vec3 p, float a){ float c=cos(a), s=sin(a); return vec3(c*p.x+s*p.z, p.y, -s*p.x+c*p.z); }\nvec3 rotX(vec3 p, float a){ float c=cos(a), s=sin(a); return vec3(p.x, c*p.y-s*p.z, s*p.y+c*p.z); }\nvec3 sphereDir(vec4 r){ float ct=r.y*2.-1., sn=sqrt(1.-ct*ct), ph=r.z*TAU; return vec3(sn*cos(ph),ct,sn*sin(ph)); }\n", o = "\nvoid main(){\n  vec3 P; float A; vec3 C;\n  scene(a_g, a_r, u_t, P, A, C);\n  float cy=cos(u_rot.x), sy=sin(u_rot.x); P=vec3(cy*P.x+sy*P.z,P.y,-sy*P.x+cy*P.z);\n  float cp=cos(u_rot.y), sp=sin(u_rot.y); P=vec3(P.x,cp*P.y+sp*P.z,cp*P.z-sp*P.y);\n  float zr=u_cam+P.z, z=max(zr,.3); vec2 s=P.xy/z*u_scale;\n  gl_Position=vec4(s.x/u_res.x*2.+u_shift, s.y/u_res.y*2., 0., 1.);\n  // profondeur de champ : net près du centre de la scène, disques doux devant et derrière (l'énergie du point est conservée)\n  float near=clamp(2.25-z*.62,.08,1.);\n  float base=(1.+2.4*near)*u_size, blur=clamp(abs(P.z)-u_focus,0.,1.6)*u_dof;\n  float sz=min(base+14.*blur*blur,80.);\n  v_b=clamp(blur*1.8,0.,1.);\n  v_s=clamp(S_out,0.,2.); v_d=normalize(s+1e-4);\n  gl_PointSize=u_dpr*sz*(1.+2.*v_s);\n  v_a=A*u_bright*near*pow(base/sz,1.25)*smoothstep(.35,.7,zr);\n  v_c=C;\n}", s = "#version 300 es\nprecision highp float;\nin float v_a; in float v_b; in float v_s; in vec2 v_d; in vec3 v_c; out vec4 o;\nvoid main(){\n  vec2 q=gl_PointCoord-.5; q.y=-q.y;\n  vec2 ql=vec2(dot(q,v_d), dot(q,vec2(-v_d.y,v_d.x))); ql.y*=1.+4.*v_s;\n  float d=length(ql);\n  float sharp=smoothstep(.5,.15,d), bokeh=smoothstep(.5,.38,d)*(.7+.3*smoothstep(.1,.45,d));\n  float a=mix(sharp,bokeh,v_b)*v_a; if(a<.002) discard;\n  o=vec4(v_c*a,a);\n}";
})), l, u = e((() => {
	l = {
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
})), d, f, p, m, h, g, _, v, y = e((() => {
	u(), d = l.duration, f = Object.fromEntries(Object.entries(l.params).map(([e, t]) => [e, t.value])), p = (e) => {
		let t = Number.isInteger(e) ? e.toFixed(1) : String(e);
		return e < 0 ? "(" + t + ")" : t;
	}, m = l.glsl.replace("void scene(", "void blobScene(").replace(/\bu_(\w+)\b/g, (e, t) => t in l.params ? p(l.params[t].value) : e), h = (e) => e < .5 ? 4 * e * e * e : 1 - (-2 * e + 2) ** 3 / 2, g = (e, t, n) => Math.max(0, Math.min(1, (e - t) / (n - t))), _ = (e, t, n) => e + (t - e) * n, v = {
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
		startsAt: d,
		camera: {
			...l.camera,
			...l.cameraAt(d, {
				...l.camera,
				...f
			})
		},
		params: {
			count: {
				label: "Densité (particules)",
				min: 2e3,
				max: 131072,
				step: 1e3,
				value: f.count
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
			let n = h(g(e, t.shedAt, t.shedAt + t.camDur));
			return {
				cam: _(t.cam, t.camTo, n),
				pitch: _(t.pitch, t.pitchTo, n),
				yaw: _(t.yaw, t.yawTo, n)
			};
		},
		glsl: `
${m}
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
  if(t<td){ blobScene(g, r, ${p(d)}+t, Bp, Ba, Bc); P=Bp; A=Ba; C=Bc; return; }
  blobScene(g, r, ${p(d)}+td, Bp, Ba, Bc);   // l'endroit où il s'est détaché
  float u=clamp((t-td)/u_fall,0.,1.), arc=sin(PI*u);
  float kh=1.-pow(1.-u, 2.+u_soft*3.), kv=ez(u);           // s'écarte d'abord à l'horizontale, puis descend et se pose en douceur
  P=vec3(mix(Bp.x,target.x,kh), mix(Bp.y,target.y,kv)+u_lift*arc, mix(Bp.z,target.z,kh));
  P+=u_float*arc*.25*vec3(sin(t*1.3+r.x*TAU), .5*sin(t*1.1+r.y*TAU), cos(t*1.2+r.z*TAU));   // il flotte
  A=mix(Ba,Ta,u); C=mix(Bc,Tc,u);
}`
	};
})), b, x, S, C, w, T, E, D, O = e((() => {
	y(), b = v.duration, x = Object.fromEntries(Object.entries(v.params).map(([e, t]) => [e, t.value])), S = (e) => {
		let t = Number.isInteger(e) ? e.toFixed(1) : String(e);
		return e < 0 ? "(" + t + ")" : t;
	}, C = v.glsl.replace("void scene(", "void planeScene(").replace(/\bu_(\w+)\b/g, (e, t) => t in v.params && t !== "count" ? S(v.params[t].value) : e), w = (e) => e < .5 ? 4 * e * e * e : 1 - (-2 * e + 2) ** 3 / 2, T = (e, t, n) => Math.max(0, Math.min(1, (e - t) / (n - t))), E = (e, t, n) => e + (t - e) * n, D = {
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
		startsAt: b,
		camera: {
			...v.camera,
			cam: x.camTo,
			pitch: x.pitchTo,
			yaw: x.yawTo
		},
		params: {
			count: {
				label: "Densité (particules)",
				min: 2e3,
				max: 131072,
				step: 1e3,
				value: v.params.count.value
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
			let n = w(T(e, t.dzAt, t.dzAt + t.dzDur)), r = t.dzDur, i = (e - t.dzAt) / r, a = i <= 0 ? t.yaw : i >= 1 ? t.yawEnd + t.yawOut * (e - t.dzAt - r) : (2 * i ** 3 - 3 * i ** 2 + 1) * t.yaw + (-2 * i ** 3 + 3 * i ** 2) * t.yawEnd + (i ** 3 - i ** 2) * r * t.yawOut, o = Math.max(0, e - t.dzAt - r), s = Math.min(1, o / t.rampIn), c = s * s * (3 - 2 * s);
			return {
				cam: E(t.cam, t.camEnd, n) + t.camAmp * c * Math.sin(2 * Math.PI * o / t.camPeriod),
				pitch: E(t.pitch, t.pitchEnd, n) + t.pitchAmp * c * Math.sin(2 * Math.PI * o / t.pitchPeriod),
				yaw: a,
				zoom: E(t.zoom, t.zoomEnd, n),
				size: E(t.size, t.sizeEnd, n),
				shift: E(t.shift, t.shiftEnd, n)
			};
		},
		glsl: `
${C}
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
  planeScene(g, r, ${S(b)}+t, Pp, Ap, Cp);
  float e=ez(clamp((t-u_dzAt)/u_dzDur,0.,1.));
  float sc=mix(1., u_landW/${S(x.width)}, e);                       // le plan rétrécit jusqu'à la taille du paysage
  float wv=(Pp.y-${S(x.height)})*mix(1., u_waveKeep, e);           // les vagues s'apaisent
  float H=mountains(g, t);
  float hn=H/max(u_mHeight,.01);
  P=vec3(Pp.x*sc, ${S(x.height)}+wv*sc+H, Pp.z*sc);
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
})), k, A, j, ee, te, ne, re, M, ie, N, ae, oe, P, F, se = e((() => {
	O(), u(), c(), k = (e) => {
		let t = Number.isInteger(e) ? e.toFixed(1) : String(e);
		return e < 0 ? "(" + t + ")" : t;
	}, A = D.glsl.replace("void scene(", "void landScene(").replace(/\bu_(\w+)\b/g, (e, t) => t in D.params && t !== "count" && t !== "seed" ? k(D.params[t].value) : e), j = 5, ee = -.15, te = .45, ne = (e) => ({
		...Object.fromEntries(Object.entries(r).map(([t, n]) => [t, t in e.camera ? e.camera[t] : n.value])),
		...Object.fromEntries(Object.entries(e.params).map(([e, t]) => [e, t.value]))
	}), re = ne(D), M = {
		...re,
		...D.cameraAt(D.duration, re)
	}, ie = ne(l), N = {
		...ie,
		...l.cameraAt(0, ie)
	}, ae = D.params.yawOut.value, oe = (e) => e < .5 ? 4 * e * e * e : 1 - (-2 * e + 2) ** 3 / 2, P = (e, t, n) => e + (t - e) * n, F = {
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
		duration: j,
		startsAt: D.duration,
		fixed: { seed: D.params.seed.value },
		camera: {
			cam: M.cam,
			pitch: M.pitch,
			yaw: M.yaw,
			zoom: M.zoom,
			size: M.size,
			bright: M.bright,
			dof: M.dof,
			focus: M.focus,
			shift: M.shift
		},
		params: {
			count: {
				label: "Densité (particules)",
				min: 2e3,
				max: 131072,
				step: 1e3,
				value: D.params.count.value
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
			let n = t.camAt, r = Math.max(.1, Math.min(t.camDur, j - n));
			if (e < n) return {
				yaw: M.yaw + ae * e,
				shift: M.shift
			};
			let i = Math.min(1, (e - n) / r), a = oe(i);
			return {
				yaw: M.yaw + ae * n + ae * r * (Math.min(i, 1) - Math.min(i, 1) ** 2 / 2),
				pitch: P(M.pitch, N.pitch, a),
				cam: P(M.cam, N.cam, a),
				zoom: P(M.zoom, N.zoom, a),
				size: P(M.size, N.size, a),
				bright: P(M.bright, N.bright, a),
				dof: P(M.dof, N.dof, a),
				focus: P(M.focus, N.focus, a),
				shift: P(M.shift, N.shift, a)
			};
		},
		glsl: `
${A}
// reçoit le paysage déjà calculé (Op, Oa, Oc) : la séquence complète le calcule une seule fois
void evapMix(vec2 g, vec4 r, float t, vec3 Op, float Oa, vec3 Oc, out vec3 P, out float A, out vec3 C){
  // la cible : le blob, qui rejoint pile sa première image à la fin de la scène
  vec3 Bp; float Ba; vec3 Bc;
  blobScene(g, r, t-${k(j)}, Bp, Ba, Bc);
  float hn=clamp((Op.y-(${k(ee)}))/${k(te)},0.,1.);
  float s=mix(fract(r.x*7.7), 1.-hn, u_order);                       // les sommets partent les premiers
  float k=ez(clamp((t-u_start-s*u_stagger)/u_dur,0.,1.));
  k=mix(k, 1., smoothstep(${k(4.75)}, ${k(j)}, t));   // tout est posé à la dernière image
  float arc=sin(PI*k);
  P=mix(Op,Bp,k)+vec3(0.,u_lift*arc,0.);
  P=rotY(P, u_swirl*arc*(.5+r.z));
  A=mix(Oa,Ba,k)*(1.+u_vapor*arc);
  C=mix(Oc,Bc,k); C=mix(C, WHI, clamp(u_vapor*arc*.3,0.,1.));
}
void scene(vec2 g, vec4 r, float t, out vec3 P, out float A, out vec3 C){
  vec3 Op; float Oa; vec3 Oc;
  landScene(g, r, ${k(D.duration)}+t, Op, Oa, Oc);
  evapMix(g, r, t, Op, Oa, Oc, P, A, C);
}`
	};
})), I, ce, le, ue, de, fe, pe, me = e((() => {
	u(), y(), O(), se(), I = (e) => {
		let t = Number.isInteger(e) ? e.toFixed(1) : String(e);
		return e < 0 ? "(" + t + ")" : t;
	}, ce = l.duration, le = ce + v.duration, ue = le + D.duration, de = ue + F.duration, fe = F.glsl.replace("void scene(", "void evapScene(").replace(/\bu_(\w+)\b/g, (e, t) => t in F.params && t !== "count" ? I(F.params[t].value) : e), pe = {
		id: "sequence",
		name: "Séquence (un seul programme)",
		inSequence: !1,
		duration: de,
		camera: { ...l.camera },
		params: { count: {
			label: "Densité (particules)",
			min: 2e3,
			max: 131072,
			step: 1e3,
			value: l.params.count.value
		} },
		fixed: { ...F.fixed },
		glsl: `
${fe}
void scene(vec2 g, vec4 r, float T, out vec3 P, out float A, out vec3 C){
  if(T<${I(ce)}){ blobScene(g, r, T, P, A, C); return; }
  if(T<${I(le)}){ planeScene(g, r, T-${I(ce)}, P, A, C); return; }
  // le paysage : calculé une seule fois, ici, pour la fin des montagnes comme pour le retour au blob
  vec3 Lp; float La; vec3 Lc;
  landScene(g, r, T-${I(le)}, Lp, La, Lc);
  if(T<${I(ue)}){ P=Lp; A=La; C=Lc; return; }
  evapMix(g, r, T-${I(ue)}, Lp, La, Lc, P, A, C);
}`
	};
}));
//#endregion
//#region src/hero-sequence/index.js
function he(e) {
	if (e.dataset.pvReady) return;
	if (e.dataset.pvReady = "1", !document.getElementById("pv-hero-seq-css")) {
		let e = document.createElement("style");
		e.id = "pv-hero-seq-css", e.textContent = ge, document.head.appendChild(e);
	}
	let t = document.createElement("canvas");
	t.setAttribute("aria-hidden", "true"), e.appendChild(t);
	let r;
	try {
		r = n(t), r.useScene(pe);
	} catch {
		t.remove(), delete e.dataset.pvReady;
		return;
	}
	let i = matchMedia("(prefers-reduced-motion: reduce)").matches, a = !1;
	function o(e) {
		let t = R.find((t) => e < t.at + t.end) || R[R.length - 1], n = Math.min(e - t.at, t.end), i = t.sc.cameraAt ? {
			...t.v,
			...t.sc.cameraAt(n, t.v)
		} : t.v, o = a ? {
			...i,
			shift: 0
		} : i;
		r.render(e, o, t.v.count * (a ? .5 : 1));
	}
	function s() {
		a = e.getBoundingClientRect().width < 900, r.resize(), i && o(ye);
	}
	let c = 0, l = 0, u = 0;
	function d(e) {
		c = requestAnimationFrame(d), l += Math.min((e - u) / 1e3, .05), u = e, o(l % ve);
	}
	function f() {
		c || i || (u = performance.now(), c = requestAnimationFrame(d));
	}
	function p() {
		cancelAnimationFrame(c), c = 0;
	}
	t.addEventListener("webglcontextlost", (e) => {
		e.preventDefault(), p();
	});
	let m = new ResizeObserver(s);
	m.observe(e), s();
	let h = null;
	return i || (h = new IntersectionObserver(([e]) => e.isIntersecting ? f() : p()), h.observe(e)), { destroy() {
		p(), m.disconnect(), h && h.disconnect(), t.remove(), delete e.dataset.pvReady;
	} };
}
var L, ge, _e, R, ve, ye, be = e((() => {
	c(), u(), y(), O(), se(), me(), L = "[data-pv=\"hero-sequence\"]", ge = `
.header_image-wrapper:has(${L}){ background:none!important; border:0!important; box-shadow:none!important; position:relative; overflow:visible!important; min-height:30rem; }
.header_component:has(${L}), .header_content:has(${L}){ position:relative; }
.header_content:has(${L}) .header_content-left{ position:relative; z-index:2; }
/* très grand, ancré à droite, passe sous la colonne de texte ; s'estompe côté texte */
${L}{ position:absolute; top:-16%; bottom:-16%; right:-6%; width:95vw; z-index:0; pointer-events:none;
  -webkit-mask-image:linear-gradient(90deg, transparent 2%, rgba(0,0,0,.4) 24%, #000 46%); mask-image:linear-gradient(90deg, transparent 2%, rgba(0,0,0,.4) 24%, #000 46%); }
${L} canvas{ position:absolute; inset:0; width:100%; height:100%; display:block; }
@media (max-width:991px){
  .section_header:has(${L}){ height:auto; min-height:100svh; display:flex; flex-direction:column; justify-content:center; overflow-x:clip; }
  .header_component:has(${L}), .header_component:has(${L}) .header_content{ height:auto; }
  ${L}{ position:relative; top:auto; bottom:auto; right:auto; width:100vw; margin-left:calc(50% - 50vw); aspect-ratio:1/1; margin-top:1rem; -webkit-mask-image:none; mask-image:none; }
}`, _e = (e) => ({
		...Object.fromEntries(Object.entries(r).map(([t, n]) => [t, e.camera && t in e.camera ? e.camera[t] : n.value])),
		...Object.fromEntries(Object.entries(e.params).map(([e, t]) => [e, t.value]))
	}), R = [];
	{
		let e = 0;
		[
			l,
			v,
			D,
			F
		].forEach((t) => {
			R.push({
				sc: t,
				at: e,
				end: t.duration,
				v: _e(t)
			}), e += t.duration;
		});
	}
	ve = pe.duration, ye = R[2].at + 7.5;
}));
//#endregion
//#region src/bonv-draw.js
function xe(e) {
	let t = e | 0;
	return () => {
		t = t + 1831565813 | 0;
		let e = Math.imul(t ^ t >>> 15, 1 | t);
		return e = e + Math.imul(e ^ e >>> 7, 61 | e) ^ e, ((e ^ e >>> 14) >>> 0) / 4294967296;
	};
}
function Se(e) {
	let t = parseInt(e.slice(1), 16);
	return [
		t >> 16 & 255,
		t >> 8 & 255,
		t & 255
	];
}
function z(e, t) {
	let n = Se(e);
	return `rgba(${n[0]},${n[1]},${n[2]},${U(t)})`;
}
function Ce(e, t) {
	if (e.dataset.pvInit) return null;
	e.dataset.pvInit = "1";
	let n = e.closest("section") || document.body, r = (e) => getComputedStyle(n.querySelector(e) || document.body).fontFamily, i = r(".text-size-large"), a = r(".text-size-label");
	e.style.position = "relative";
	let o = document.createElement("canvas");
	o.setAttribute("aria-hidden", "true"), o.style.cssText = "position:absolute;inset:0;width:100%;height:100%;display:block;z-index:1;transition:opacity .5s ease;", e.appendChild(o);
	let s = o.getContext("2d"), c = "letterSpacing" in s, l = {
		x: s,
		W: 0,
		H: 0,
		S: 1
	};
	l.font = (e, t, n) => {
		s.font = `${e} ${t}px ${n ? a : i}`, c && (s.letterSpacing = n ? (t * .12).toFixed(2) + "px" : "0px");
	}, l.text = (e, t, n, r, i, a, o, c = "left", u = !1) => {
		o <= 0 || !e || (l.font(r, i, u), s.textAlign = c, s.textBaseline = "alphabetic", s.fillStyle = z(a, o), s.fillText(e, t, n));
	}, l.tw = (e, t, n, r) => (l.font(t, n, r), s.measureText(e).width), l.wrap = (e, t, n, r, i) => {
		l.font(t, n, i);
		let a = [], o = "";
		for (let t of e.split(" ")) {
			let e = o ? o + " " + t : t;
			s.measureText(e).width > r && o ? (a.push(o), o = t) : o = e;
		}
		return o && a.push(o), a;
	}, l.dot = (e, t, n, r, i) => {
		i <= 0 || n <= 0 || (s.fillStyle = z(r, i), s.beginPath(), s.arc(e, t, n, 0, H), s.fill());
	}, l.line = (e, t, n, r, i, a, o = 1) => {
		a <= 0 || (s.strokeStyle = z(i, a), s.lineWidth = o, s.beginPath(), s.moveTo(e, t), s.lineTo(n, r), s.stroke());
	}, l.poly = (e, t, n, r) => {
		if (!(e.length < 2 || n <= 0)) {
			s.strokeStyle = z(t, n), s.lineWidth = r, s.lineCap = "round", s.lineJoin = "round", s.beginPath(), s.moveTo(e[0][0], e[0][1]);
			for (let t = 1; t < e.length; t++) s.lineTo(e[t][0], e[t][1]);
			s.stroke();
		}
	}, l.qpts = (e, t, n, r, i = 24) => {
		let a = (e[0] + t[0]) / 2, o = (e[1] + t[1]) / 2, s = t[0] - e[0], c = a - (t[1] - e[1]) * n, l = o + s * n, u = [], d = Math.max(2, Math.ceil(i * r));
		for (let n = 0; n <= d; n++) {
			let i = r * n / d, a = 1 - i;
			u.push([a * a * e[0] + 2 * a * i * c + i * i * t[0], a * a * e[1] + 2 * a * i * l + i * i * t[1]]);
		}
		return u;
	}, l.elbow = (e, t, n, r = 1, i = 8 * l.S) => {
		let a = [
			e,
			[n, e[1]],
			[n, t[1]],
			t
		], o = [e];
		for (let e = 1; e < 3; e++) {
			let t = a[e], n = a[e - 1], r = a[e + 1], s = Math.hypot(t[0] - n[0], t[1] - n[1]) || 1, c = Math.hypot(r[0] - t[0], r[1] - t[1]) || 1, l = Math.min(i, s / 2, c / 2), u = [t[0] + (n[0] - t[0]) / s * l, t[1] + (n[1] - t[1]) / s * l], d = [t[0] + (r[0] - t[0]) / c * l, t[1] + (r[1] - t[1]) / c * l];
			o.push(u);
			for (let e = 1; e <= 6; e++) {
				let n = e / 6, r = 1 - n;
				o.push([r * r * u[0] + 2 * r * n * t[0] + n * n * d[0], r * r * u[1] + 2 * r * n * t[1] + n * n * d[1]]);
			}
		}
		o.push(t);
		let s = [0];
		for (let e = 1; e < o.length; e++) s.push(s[e - 1] + Math.hypot(o[e][0] - o[e - 1][0], o[e][1] - o[e - 1][1]));
		let c = s[s.length - 1] * U(r), u = [], d = 1;
		for (let e = 0; e <= 40; e++) {
			let t = c * e / 40;
			for (; d < o.length - 1 && s[d] < t;) d++;
			let n = (t - s[d - 1]) / (s[d] - s[d - 1] || 1);
			u.push([K(o[d - 1][0], o[d][0], n), K(o[d - 1][1], o[d][1], n)]);
		}
		return u;
	}, l.trim = (e, t, n, r) => {
		let i = t[0] - e[0], a = t[1] - e[1], o = Math.hypot(i, a) || 1, s = i / o, c = a / o;
		return [[e[0] + s * n, e[1] + c * n], [t[0] - s * r, t[1] - c * r]];
	}, l.rr = (e, t, n, r, i, a = i) => {
		i = Math.max(0, Math.min(i, n / 2, r / 2)), a = Math.max(0, Math.min(a, n / 2, r / 2)), s.beginPath(), s.moveTo(e + a, t), s.arcTo(e + n, t, e + n, t + r, i), s.arcTo(e + n, t + r, e, t + r, i), s.arcTo(e, t + r, e, t, i), s.arcTo(e, t, e + n, t, a), s.closePath();
	}, l.glass = (e, t, n, r, i, a, o) => {
		if (a <= 0) return;
		s.save(), s.globalAlpha = a, l.rr(e, t, n, r, i, o);
		let c = s.createLinearGradient(e, t, e + n * .9, t + r);
		c.addColorStop(0, "rgba(150,110,200,.18)"), c.addColorStop(.5, "rgba(90,60,150,.15)"), c.addColorStop(1, "rgba(40,24,80,.34)"), s.fillStyle = c, s.fill();
		let u = s.createLinearGradient(e, t, e + n, t + r);
		u.addColorStop(0, "rgba(244,244,244,.3)"), u.addColorStop(.4, "rgba(244,244,244,.07)"), u.addColorStop(.75, "rgba(244,244,244,.03)"), u.addColorStop(1, "rgba(214,170,240,.14)"), s.strokeStyle = u, s.lineWidth = 1, s.stroke(), s.restore();
	}, l.flow = (e, t, n, r, i, a) => {
		if (n <= 0 || e.length < 2) return;
		let o = l.S;
		if (s.save(), s.setLineDash([1, 7 * o]), s.lineDashOffset = -r * 28 * o, l.poly(e, t, n, 2 * o), s.restore(), i <= 0) return;
		let c = e.length - 1, u = (r + a * .53) / 1.5 % 1;
		for (let r = 0; r < 5; r++) {
			let a = u - r * .02;
			if (a < 0 || a > 1) continue;
			let s = e[Math.min(c, Math.floor(G(a) * c))];
			l.dot(s[0], s[1], (3 - r * .5) * o, r ? t : B, i * Math.min(1, n * 1.6) * (1 - r / 5) * Math.min(1, Math.sin(Math.PI * a) * 3));
		}
	}, l.icon = (e, t, n, r, i, a = B) => {
		if (i <= 0) return;
		let o = r / 48;
		s.save(), s.translate(t, n), s.scale(o, o), s.translate(-24, -24), s.lineWidth = 1.5 / o, s.lineCap = "round", s.lineJoin = "round", Me[e].forEach(([e, t]) => {
			s.strokeStyle = z(a, i * t), s.stroke(e);
		}), s.restore();
	}, l.db = (e, t, n, r, i = B) => {
		if (r <= 0) return;
		let a = n / 2, o = n * .18, c = t - n * .42, l = t + n * .42;
		s.strokeStyle = z(i, r), s.lineWidth = 1.2, s.beginPath(), s.ellipse(e, c, a, o, 0, 0, H), s.stroke(), s.beginPath(), s.moveTo(e - a, c), s.lineTo(e - a, l), s.ellipse(e, l, a, o, 0, Math.PI, 0, !0), s.lineTo(e + a, c), s.stroke(), s.beginPath(), s.ellipse(e, t, a, o, 0, 0, Math.PI), s.stroke();
	}, l.vMark = (e, t, n, r, i = 0, a = 0, o = 1, c = !0) => {
		if (!(o <= 0)) {
			if (c) {
				let s = n * 1.47, c = r * .22, u = Math.max(18, Math.round(H * s / Math.max(6, n * .16))), d = Math.max(1, n * .034), f = r * 3.6, p = .55 + .45 * Math.sin(r * 13) * Math.sin(r * 7.3 + 1);
				for (let m = 0; m < u; m++) {
					let h = c + m / u * H, g = ((h - f) % H + Math.PI * 3) % H - Math.PI, _ = Math.exp(-((g / .42) ** 2)) * i, v = .5 + .5 * Math.sin(h * 3 + r * 9) * Math.sin(h * 5 - r * 7 + 1.3), y = a * p * v, b = s + n * (.06 * _ + .18 * y), x = d * (1 + 1.2 * _ + 1.3 * y), S = .72 + .28 * Math.cos(h + Math.PI * .75);
					l.dot(e + Math.cos(h) * b, t + Math.sin(h) * b, x, Te, o * Math.min(1, (.8 + .2 * _ + .2 * y) * S));
				}
			}
			l.dot(e, t, n, Te, o), s.fillStyle = z(B, o), s.beginPath(), Ae.forEach(([r, i], a) => {
				let o = e + r * n, c = t + i * n;
				a ? s.lineTo(o, c) : s.moveTo(o, c);
			}), s.closePath(), s.fill();
		}
	}, l.avatar = (e, t, n, r, i, a) => {
		a <= 0 || (l.dot(e, t, n, r, a), l.text((i || "?").charAt(0).toUpperCase(), e, t + n * .36, 600, Math.round(n * 1.02), Ee, a, "center"));
	}, l.ring = (e, t, n, r, i, a) => {
		a <= 0 || (l.dot(e, t, n, De, .85 * a), s.strokeStyle = z(B, .14 * a), s.lineWidth = 1, s.beginPath(), s.arc(e, t, n, 0, H), s.stroke(), i > 0 && (s.strokeStyle = z(r, a), s.lineWidth = 1.5, s.lineCap = "round", s.beginPath(), s.arc(e, t, n, -Math.PI / 2, -Math.PI / 2 + H * i), s.stroke()));
	}, l.button = (e, t, n, r, i, a, o) => {
		let c = l.tw(e, 500, i) + 32 * l.S;
		if (o <= 0) return c;
		let u = 1 - .05 * a;
		return s.save(), s.translate(t + c / 2, n + r / 2), s.scale(u, u), s.translate(-(t + c / 2), -(n + r / 2)), s.globalAlpha = o, l.rr(t, n, c, r, r / 2), s.fillStyle = B, s.fill(), s.globalAlpha = 1, l.text(e, t + c / 2, n + r / 2 + i * .34, 500, i, Ee, o, "center"), s.restore(), c;
	}, l.approve = (e, t, n, r, i) => {
		if (i <= 0 || (r < 1 && (s.save(), s.setLineDash([1, 4 * l.S]), s.lineCap = "round", s.strokeStyle = z(we, .8 * i * (1 - r)), s.lineWidth = 1.5, s.beginPath(), s.arc(e, t, n, 0, H), s.stroke(), s.restore()), r <= 0)) return;
		s.strokeStyle = z(Te, i), s.lineWidth = 1.5, s.lineCap = "round", s.beginPath(), s.arc(e, t, n, -Math.PI / 2, -Math.PI / 2 + H * ke(r)), s.stroke();
		let a = W(r, .5, 1);
		if (a > 0) {
			let r = [
				[e - n * .42, t + n * .02],
				[e - n * .1, t + n * .32],
				[e + n * .45, t - n * .3]
			], o = a < .4 ? [r[0], [K(r[0][0], r[1][0], a / .4), K(r[0][1], r[1][1], a / .4)]] : [
				r[0],
				r[1],
				[K(r[1][0], r[2][0], (a - .4) / .6), K(r[1][1], r[2][1], (a - .4) / .6)]
			];
			l.poly(o, Te, i, 1.5);
		}
	}, l.chip = (e, t, n, r, i, a, o, c, u = 0, d) => {
		if (o <= 0) return;
		let f = l.S, p = t - r / 2, m = n - i / 2;
		l.glass(p, m, r, i, Math.min(12 * f, i / 2), o), c && u > 0 && (l.rr(p, m, r, i, Math.min(12 * f, i / 2)), s.strokeStyle = z(c, o * u), s.lineWidth = 1.5, s.stroke());
		let h = Math.min(i * .55, 20 * f);
		a === "db" ? l.db(p + 10 * f + h / 2, n, h * .7, .85 * o) : a && l.icon(a, p + 10 * f + h / 2, n, h, .85 * o), l.text(e, p + (a ? 16 * f + h : 12 * f), n + (d || Math.max(8, 9 * f)) * .36, 400, d || Math.max(8, 9 * f), B, o, "left", !0);
	}, l.typing = (e, t, n, r) => {
		for (let i = 0; i < 3; i++) l.dot(e + i * 8 * l.S, t, 2.2 * l.S, B, n * (.35 + .65 * Math.max(0, Math.sin(r * 7 - i * .7))));
	};
	let u = matchMedia("(prefers-reduced-motion: reduce)").matches, d = !1, f = !1, p = 0, m = 0, h = 0, g = 0;
	function _() {
		let n = e.clientWidth;
		if (!n) return;
		l.W = n, l.H = Math.round(n * t.aspect(n)), e.style.height = l.H + "px";
		let r = Math.min(devicePixelRatio || 1, 2);
		o.width = Math.round(n * r), o.height = Math.round(l.H * r), s.setTransform(r, 0, 0, r, 0, 0), t.layout(l), f = !0, d && v(u ? t.still : p);
	}
	function v(e) {
		f && (s.clearRect(0, 0, l.W, l.H), t.draw(l, e));
	}
	function y(e) {
		m = requestAnimationFrame(y), p += Math.min((e - h) / 1e3, .05), h = e, p > t.loop && (p = 0), o.style.opacity = p > t.fade ? 0 : 1, v(p);
	}
	function b() {
		m || u || (p = 0, o.style.opacity = 1, h = performance.now(), m = requestAnimationFrame(y));
	}
	function x() {
		cancelAnimationFrame(m), m = 0;
	}
	let S = new ResizeObserver(() => {
		e.clientWidth !== g && (g = e.clientWidth, _());
	});
	S.observe(e);
	let C = null;
	return (document.fonts ? Promise.race([Promise.all([document.fonts.load(`400 12px ${i}`), document.fonts.load(`400 12px ${a}`)]), new Promise((e) => setTimeout(e, 3e3))]) : Promise.resolve()).then(() => {
		d = !0, _(), !u && (C = new IntersectionObserver(([e]) => e.isIntersecting ? b() : x(), { threshold: .3 }), C.observe(e));
	}), { destroy() {
		x(), S.disconnect(), C && C.disconnect(), o.remove(), e.style.height = "", delete e.dataset.pvInit;
	} };
}
var B, we, Te, Ee, De, Oe, V, H, U, W, ke, G, K, Ae, je, Me, Ne = e((() => {
	B = "#F4F4F4", we = "#8C86B0", Te = "#E2C70A", Ee = "#17103A", De = "#0D0926", Oe = "#7FE8CF", V = [
		"#86C6D0",
		"#A99FD8",
		"#D6A394",
		"#92CBAE",
		"#C9C4EF",
		"#78A8E0"
	], H = Math.PI * 2, U = (e, t = 0, n = 1) => Math.max(t, Math.min(n, e)), W = (e, t, n) => U((e - t) / (n - t)), ke = (e) => 1 - (1 - e) ** 5, G = (e) => e < .5 ? 16 * e ** 5 : 1 - (-2 * e + 2) ** 5 / 2, K = (e, t, n) => e + (t - e) * n, Ae = [
		[.2749, -.4797],
		[-4e-4, .1548],
		[-.2181, -.3639],
		[-.271, -.4797],
		[-.5574, -.4797],
		[-.017, .6489],
		[.0186, .6489],
		[.5574, -.4797]
	], je = {
		km: [["M7 9 V41 H43", .4], ["M7 12 H15 V20 H24 V27 H33 V33 H43", 1]],
		app: [[[
			10,
			21,
			32
		].flatMap((e) => [
			10,
			21,
			32
		].map((t) => `M${t} ${e} h9 v9 h-9 Z`)).join(""), .75]],
		doc: [
			["M13 7 H29 L35 14 V41 H13 Z", 1],
			["M29 7 V14 H35", .55],
			["M19 22 H30 M19 28 H30 M19 34 H26", .7]
		],
		trend: [["M7 7 V41 H43", .4], ["M11 34 L19 25 L25 29 L32 16 L39 20", 1]],
		net: [["M24 24 L12 13 M24 24 L38 15 M24 24 L14 36 M24 24 L36 35", .5], ["M27.4 24a3.4 3.4 0 1 0-6.8 0a3.4 3.4 0 1 0 6.8 0M14.4 13a2.4 2.4 0 1 0-4.8 0a2.4 2.4 0 1 0 4.8 0M40.4 15a2.4 2.4 0 1 0-4.8 0a2.4 2.4 0 1 0 4.8 0M16.4 36a2.4 2.4 0 1 0-4.8 0a2.4 2.4 0 1 0 4.8 0M38.4 35a2.4 2.4 0 1 0-4.8 0a2.4 2.4 0 1 0 4.8 0", 1]]
	}, Me = {};
	for (let e in je) Me[e] = je[e].map(([e, t]) => [new Path2D(e), t]);
}));
//#endregion
//#region src/gantt-glossy.js
function Pe(e) {
	if (e.dataset.pvReady) return;
	e.dataset.pvReady = "1";
	let t = document.createElement("canvas");
	t.style.cssText = "display:block;width:100%;", t.setAttribute("role", "img"), t.setAttribute("aria-label", "Study timeline: one eligibility change pushes submission back by 18 weeks as each tool recalculates on its own schedule."), e.appendChild(t);
	let n = t.getContext("2d"), r = e.closest("section") || document.body, i = (e) => getComputedStyle(r.querySelector(e) || document.body).fontFamily, a = i(".text-size-large"), o = i(".text-size-label"), s = "letterSpacing" in n;
	function c(e, t, r) {
		n.font = `${e} ${t}px ${r ? o : a}`, s && (n.letterSpacing = r ? (t * .12).toFixed(2) + "px" : "0px");
	}
	function l(e, t, r, i, a, o, s = 1, l = "left", u = !1) {
		s <= 0 || (c(i, a, u), n.textAlign = l, n.globalAlpha = s, n.fillStyle = o, n.fillText(e, t, r), n.globalAlpha = 1, n.textAlign = "left");
	}
	function u(e, t, r, i) {
		return c(t, r, i), n.measureText(e).width;
	}
	function d(e, t, r, i, a) {
		n.beginPath(), n.roundRect ? n.roundRect(e, t, r, i, Math.min(a, r / 2, i / 2)) : n.rect(e, t, r, i);
	}
	function f(e, t, r, i, a, o, s = 1) {
		n.globalAlpha = o, n.strokeStyle = a, n.lineWidth = s, n.beginPath(), n.moveTo(e, t), n.lineTo(r, i), n.stroke(), n.globalAlpha = 1;
	}
	let p = 0, m = 0, h = 1, g = !1;
	function _() {
		g = p < 640, h = U(p / 1100, .7, 1.15);
		let e = 64 * h, t = (g ? 40 : 54) * h, n = g ? 118 * h : 230 * h, r = 24 * h;
		return {
			top: e,
			rowH: t,
			padL: n,
			padR: r,
			w: p - n - r,
			BH: (g ? 12 : 16) * h,
			gridTop: e + 14 * h,
			bottom: e + 14 * h + t * Re.length
		};
	}
	function v() {
		let e = _();
		return Math.round(e.bottom + 92 * h);
	}
	function y(e) {
		n.clearRect(0, 0, p, m);
		let { top: t, rowH: r, padL: i, w: a, BH: o, gridTop: s, bottom: c } = _(), v = q.slip / Ie, y = (e) => i + e * a, b = Math.max(12, (g ? 12 : 15) * h), x = Math.max(8.5, 10 * h);
		for (let e = 0; e <= 8; e++) {
			let n = e / 8, r = Math.round(Ie * n), i = y(n);
			f(i, s - 6 * h, i, c, J, e === 0 ? .18 : .07), (!g || e % 2 == 0) && l("W" + r, i, t - 6 * h, 400, x, Fe, 1, e === 0 ? "left" : e === 8 ? "right" : "center", !0);
		}
		l("STUDY TIMELINE", 0, t - 6 * h, 400, x, Fe, 1, "left", !0);
		let S = Ve(W(e, .7, 1.7)), C = !1;
		Re.forEach((t, i) => {
			let c = s + i * r + r / 2, u = t.tool * q.lag, p = i === 0 ? S : Ve(W(e, 1.6 + u, 2.6 + u));
			i > 0 && p < 1 && S >= 1 && (C = !0);
			let m = t.a * X + (i === 0 ? 0 : v * p), _ = t.b * X + v * (i === 0 ? S : p);
			if (i && f(0, c - r / 2, y(1), c - r / 2, J, .06), l(t.n, 0, c + (g ? 4 : -1) * h, 400, b, p > 0 || i === 0 ? J : Fe), g || l(Le[t.tool].n, 0, c + 15 * h, 400, x * .9, Le[t.tool].c, .85, "left", !0), n.save(), n.setLineDash([2, 3]), d(y(t.a * X) + .5, c - o / 2 + .5, (t.b - t.a) * X * a - 1, o - 1, o / 2), n.strokeStyle = "rgba(244,244,244,.28)", n.lineWidth = 1, n.stroke(), n.restore(), i > 0 && S >= 1 && p < 1) {
				let e = y(t.a * X + v), r = y(m);
				n.save(), n.setLineDash([3, 3]), d(r, c - o / 2 - 3 * h, e - r + (_ - m) * a, o + 6 * h, (o + 6 * h) / 2), n.strokeStyle = Y, n.globalAlpha = .8, n.lineWidth = 1, n.stroke(), n.restore(), n.globalAlpha = 1, l("STALE", y(_) + 10 * h, c + x * .36, 400, x, Y, .9, "left", !0);
			}
			d(y(m), c - o / 2, (_ - m) * a, o, o / 2), n.globalAlpha = .92, n.fillStyle = Le[t.tool].c, n.fill(), n.globalAlpha = 1;
		});
		let w = Re[Re.length - 1], T = Ve(W(e, 1.6 + w.tool * q.lag, 2.6 + w.tool * q.lag)), E = y(w.b * X), D = y(w.b * X + v * T), O = s - 6 * h, k = c + 8 * h;
		if (n.save(), n.setLineDash([3, 4]), f(E, O, E, k, J, .5), n.restore(), l("PLANNED", E, k + 18 * h, 400, x, Fe, 1, "center", !0), T > .03) {
			n.save(), n.beginPath(), n.rect(E, O, D - E, k - O), n.clip();
			for (let e = E - 80; e < D + 80; e += 7 * h) f(e, O, e - 70 * h, k, Y, .14);
			n.restore(), f(D, O, D, k, Y, 1, 1.5);
			let e = "SUBMISSION  +" + Math.round(q.slip * T) + " WEEKS", t = u(e, 500, x * 1.05, !0) + 22 * h, r = 24 * h, i = Math.min(D + 10 * h, p - t - 2), a = k + 6 * h;
			n.globalAlpha = T, d(i, a, t, r, r / 2), n.fillStyle = "rgba(214,163,148,.16)", n.fill(), n.strokeStyle = Y, n.lineWidth = 1, n.stroke(), n.globalAlpha = 1, l(e, i + 11 * h, a + r / 2 + x * .38, 500, x * 1.05, Y, T, "left", !0);
		}
		let A = S < 1 ? "ONE ELIGIBILITY CRITERION CHANGES" : C ? "THREE TOOLS HAVE NOT RECALCULATED YET" : "EVERY DOWNSTREAM DATE HAS MOVED", j = S < 1 ? J : C ? Y : J, ee = k + 58 * h;
		n.globalAlpha = 1, n.fillStyle = j, n.beginPath(), n.arc(5 * h, ee - x * .35, 3.5 * h, 0, Math.PI * 2), n.fill(), l(A, 18 * h, ee, 400, x, j, .9, "left", !0);
	}
	let b = matchMedia("(prefers-reduced-motion: reduce)").matches, x = 0, S = 0, C = 0, w = !1, T = 0;
	function E() {
		if (p = t.clientWidth, !p) return;
		m = v(), t.style.height = m + "px";
		let e = Math.min(devicePixelRatio || 1, 2);
		t.width = Math.round(p * e), t.height = Math.round(m * e), n.setTransform(e, 0, 0, e, 0, 0), w && y(b ? ze : C);
	}
	function D(e) {
		x = requestAnimationFrame(D), C += Math.min((e - S) / 1e3, .05), S = e, C > Be && (C = 0), y(C);
	}
	function O() {
		x || b || (C = 0, S = performance.now(), x = requestAnimationFrame(D));
	}
	function k() {
		cancelAnimationFrame(x), x = 0;
	}
	let A = new ResizeObserver(() => {
		t.clientWidth !== T && (T = t.clientWidth, E());
	});
	A.observe(e);
	let j = null;
	return (document.fonts ? Promise.race([Promise.all([document.fonts.load(`400 12px ${a}`), document.fonts.load(`400 12px ${o}`)]), new Promise((e) => setTimeout(e, 3e3))]) : Promise.resolve()).then(() => {
		w = !0, E(), !b && (j = new IntersectionObserver(([e]) => e.isIntersecting ? O() : k(), { threshold: .25 }), j.observe(e));
	}), { destroy() {
		k(), A.disconnect(), j && j.disconnect(), t.remove(), delete e.dataset.pvReady;
	} };
}
var q, J, Fe, Y, Ie, X, Le, Re, ze, Be, Ve, He = e((() => {
	Ne(), q = {
		slip: 18,
		lag: 1.15,
		hold: 2.8
	}, J = "#F4F4F4", Fe = "rgba(244,244,244,.42)", Y = "#D6A394", Ie = 104, X = .72, Le = [
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
	], Re = [
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
	], ze = 2.6 + Le.length * q.lag, Be = ze + q.hold, Ve = (e) => e < .5 ? 4 * e * e * e : 1 - (-2 * e + 2) ** 3 / 2;
}));
//#endregion
//#region src/mini-scene.js
function Ue(e) {
	let t = qe[e.dataset.scene] || qe.rank, n = We[(+e.dataset.col || 0) % We.length];
	return Ce(e, {
		aspect: () => .62,
		loop: Z.loop,
		fade: Z.fade,
		still: Z.p1 + .5,
		layout: (e) => {
			e.S = U(e.W / 400, .7, 1.2);
		},
		draw: (e, r) => {
			e.x.lineCap = "round", e.x.lineJoin = "round", t(e, e.W, e.H, W(r, Z.p0, Z.p1), n);
		}
	});
}
var We, Z, Q, Ge, Ke, $, qe, Je = e((() => {
	Ne(), We = [
		V[0],
		V[1],
		V[2],
		V[3],
		V[5]
	], Z = {
		p0: .4,
		p1: 4.4,
		fade: 6.4,
		loop: 7
	}, Q = xe(7), Ge = Array.from({ length: 40 }, (e, t) => ({
		x: t % 8 / 7 - .5 + (Q() - .5) * .06,
		y: Math.floor(t / 8) / 4 - .5 + (Q() - .5) * .08,
		rec: Q() < .38,
		d: Q()
	})), Ke = Array.from({ length: 46 }, () => ({
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
	], qe = {
		rank(e, t, n, r, i) {
			let a = $.map((e, t) => t).sort((e, t) => $[t] - $[e]), o = G(W(r, .2, .65)), s = n / 6.2, c = t * .14;
			$.forEach((l, u) => {
				let d = K(u, a.indexOf(u), o), f = a.indexOf(u) === 0 && o > .95, p = n * .2 + d * s;
				e.line(c, p, t * .86, p, B, .1, 4 * e.S), e.line(c, p, c + t * .72 * l * ke(W(r, 0, .25)), p, f ? i : B, f ? 1 : .6, 5.5 * e.S), f && e.dot(c + t * .72 * l, p, 6 * e.S, i, 1);
			});
		},
		curve(e, t, n, r, i) {
			let a = t * .14, o = t * .88, s = n * .2, c = n * .8;
			e.line(a, c, o, c, B, .3, 1.5 * e.S), e.line(a, s, a, c, B, .3, 1.5 * e.S);
			let l = G(W(r, 0, .5)), u = (e) => [K(a, o, e), c - (c - s) * (.06 + .86 * (1 - (1 - e) ** 2.4))], d = [];
			for (let e = 0; e <= Math.ceil(36 * l); e++) d.push(u(Math.min(e / 36, l)));
			e.poly(d, B, .95, 3.2 * e.S);
			let f = G(W(r, .55, .9));
			if (f > 0) {
				let t = u(K(.15, .5, f));
				e.x.save(), e.x.setLineDash([3 * e.S, 4 * e.S]), e.line(t[0], t[1], t[0], c, B, .45, 1.5 * e.S), e.line(a, t[1], t[0], t[1], B, .45, 1.5 * e.S), e.x.restore(), e.dot(t[0], t[1], 5.5 * e.S, i, 1), e.x.strokeStyle = i, e.x.globalAlpha = .7, e.x.lineWidth = 2 * e.S, e.x.beginPath(), e.x.arc(t[0], t[1], 11 * e.S, 0, H), e.x.stroke(), e.x.globalAlpha = 1;
			}
		},
		sites(e, t, n, r, i) {
			Ge.forEach((a) => {
				let o = a.rec ? ke(W(r, .1 + a.d * .55, .25 + a.d * .55)) : 0;
				e.dot(t / 2 + a.x * t * .74, n / 2 + a.y * n * .62, (3 + 2.2 * o) * e.S, o > 0 ? i : B, o > 0 ? .5 + .5 * o : .32);
			});
		},
		split(e, t, n, r, i) {
			let a = G(W(r, .15, .7));
			a > .6 && e.line(t / 2, n * .16, t / 2, n * .84, B, .32 * W(a, .6, 1), 1.5 * e.S), Ke.forEach((r) => {
				let o = (r.resp ? -.2 : .2) + r.x * .32, s = K(r.x * .8, o, a);
				e.dot(t / 2 + s * t * .8, n / 2 + r.y * n * .7, 3.6 * e.S, r.resp && a > .3 ? i : B, r.resp ? .5 + .5 * a : .36);
			});
		},
		doc(e, t, n, r, i) {
			let a = t * .16, o = n / 8.5;
			for (let s = 0; s < 6; s++) {
				let c = n * .22 + s * o, l = ke(W(r, .04 + s * .07, .2 + s * .07)), u = t * (s === 0 ? .4 : s % 3 == 2 ? .46 : .58);
				e.line(a, c, a + u * l, c, B, s === 0 ? .9 : .5, (s === 0 ? 5.5 : 3.5) * e.S);
				let d = W(r, .55 + s * .06, .66 + s * .06);
				if (d > 0) {
					let n = t * .84;
					e.poly([
						[n - 6 * e.S, c],
						[n - 2 * e.S, c + 4 * e.S],
						[n + 6 * e.S, c - 5 * e.S]
					].slice(0, d > .5 ? 3 : 2), s === 5 ? i : Oe, d, 2.6 * e.S);
				}
			}
		}
	};
}));
//#endregion
//#region src/testimonials.js
function Ye(e) {
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
		s = requestAnimationFrame(m), !c || l ? o = e - u * Xe : (u = Math.min(1, (e - o) / Xe), f(a, u), u >= 1 && p(a + 1));
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
		c = e.isIntersecting, c && !s ? (o = performance.now() - u * Xe, s = requestAnimationFrame(m)) : c || (cancelAnimationFrame(s), s = 0);
	}, { threshold: .4 }), y.observe(e)), function() {
		cancelAnimationFrame(s), y && y.disconnect(), d.removeEventListener("click", h), d.removeEventListener("keydown", g), e.removeEventListener("pointerenter", _), e.removeEventListener("pointerleave", v), e.removeEventListener("focusin", _), e.removeEventListener("focusout", v), delete e.dataset.pvInit;
	};
}
var Xe, Ze = e((() => {
	Xe = 8e3;
})), Qe = /* @__PURE__ */ t((() => {
	be(), He(), Je(), Ze(), document.querySelectorAll("[data-pv=\"hero-sequence\"]").forEach(he), document.querySelectorAll("[data-pv=\"gantt-glossy\"]").forEach(Pe), document.querySelectorAll("[data-pv=\"mini-scene\"]").forEach(Ue), document.querySelectorAll("[data-pv=\"testimonials\"]").forEach(Ye);
}));
//#endregion
export default Qe();
