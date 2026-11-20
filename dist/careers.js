import { n as e, t } from "./rolldown-runtime-wf392T_D.mjs";
//#region src/careers.js
function n() {
	if (document.getElementById("pv-jobs-css")) return;
	let e = document.createElement("style");
	e.id = "pv-jobs-css", e.textContent = o, document.head.appendChild(e);
}
function r(e) {
	if (!e || e.dataset.pvInit) return null;
	e.dataset.pvInit = "1", n();
	let t = e.dataset.board || "phasev", r = {
		all: e.dataset.all || "All locations",
		empty: e.dataset.empty || "There are no open positions right now.",
		error: e.dataset.error || "The open positions could not be loaded.",
		link: e.dataset.link || "See all openings on Greenhouse",
		apply: e.dataset.apply || "View role"
	}, o = `https://job-boards.greenhouse.io/${t}`, s = (e.closest("main") || document).querySelector(".text-size-label");
	s && e.style.setProperty("--pv-jobs-mono", getComputedStyle(s).fontFamily), e.classList.toggle("is-dark", !!e.closest("[data-af-bg=\"dark\"], .surface-dark"));
	let c = new AbortController(), l = (e, t, n) => {
		let r = document.createElement(e);
		return t && (r.className = t), n != null && (r.textContent = n), r;
	}, u = (t) => {
		e.replaceChildren();
		let n = l("p", "pv-jobs-note", t + " "), i = l("a", null, r.link);
		i.href = o, i.target = "_blank", i.rel = "noopener", n.appendChild(i), e.appendChild(n);
	};
	Promise.all([fetch(i(t) + "/departments", { signal: c.signal }).then((e) => {
		if (!e.ok) throw Error(e.status);
		return e.json();
	}), fetch(i(t) + "/offices", { signal: c.signal }).then((e) => e.ok ? e.json() : { offices: [] }).catch(() => ({ offices: [] }))]).then(([e, t]) => {
		let n = /* @__PURE__ */ new Map();
		(t.offices || []).forEach((e) => (e.departments || []).forEach((t) => (t.jobs || []).forEach((t) => {
			n.has(t.id) || n.set(t.id, a(e.name));
		})));
		let i = (e.departments || []).map((e) => ({
			name: e.name,
			jobs: (e.jobs || []).map((e) => ({
				id: e.id,
				title: e.title,
				url: e.absolute_url,
				office: n.get(e.id) || ""
			})).sort((e, t) => e.title.localeCompare(t.title))
		})).filter((e) => e.jobs.length).sort((e, t) => e.name.localeCompare(t.name));
		i.length ? d(i) : u(r.empty);
	}).catch((e) => {
		e.name !== "AbortError" && u(r.error);
	});
	function d(t) {
		e.replaceChildren();
		let n = [...new Set(t.flatMap((e) => e.jobs.map((e) => e.office)).filter(Boolean))].sort(), i = "", a = l("div", "pv-jobs-filters");
		a.setAttribute("role", "group");
		let o = l("div", "pv-jobs");
		n.length > 1 && (["", ...n].forEach((e) => {
			let t = l("button", null, e || r.all);
			t.type = "button", t.setAttribute("aria-pressed", e === i), t.addEventListener("click", () => {
				i = e, a.querySelectorAll("button").forEach((e) => e.setAttribute("aria-pressed", e === t)), s();
			}), a.appendChild(t);
		}), e.appendChild(a)), e.appendChild(o);
		function s() {
			o.replaceChildren(), t.forEach((e) => {
				let t = e.jobs.filter((e) => !i || e.office === i);
				if (!t.length) return;
				let n = l("section", "pv-jobs-group"), a = l("h2", "pv-jobs-team", e.name);
				a.appendChild(l("span", null, String(t.length)));
				let s = l("ul", "pv-jobs-list");
				t.forEach((e) => {
					let t = l("li"), n = l("a", "pv-job");
					n.href = e.url, n.target = "_blank", n.rel = "noopener", n.appendChild(l("span", "pv-job-title", e.title)), n.appendChild(l("span", "pv-job-meta", e.office)), n.appendChild(l("span", "pv-job-go", r.apply + " →")), t.appendChild(n), s.appendChild(t);
				}), n.append(a, s), o.appendChild(n);
			});
		}
		s();
	}
	return { destroy() {
		c.abort(), e.replaceChildren(), e.classList.remove("is-dark"), delete e.dataset.pvInit;
	} };
}
var i, a, o, s = e((() => {
	i = (e) => `https://boards-api.greenhouse.io/v1/boards/${e}`, a = (e) => {
		let t = (e || "").replace(/\s*office$/i, "").trim();
		return /^tlv$/i.test(t) ? "Tel Aviv" : /^no$/i.test(t) ? "Remote" : t;
	}, o = "\n[data-pv=\"careers\"]{display:block}\n/* filtres : pastilles, comme ceux de Case Studies */\n[data-pv=\"careers\"] .pv-jobs-filters{display:flex;flex-wrap:wrap;gap:.5rem;margin:0 0 3.5rem;padding:0}\n[data-pv=\"careers\"] .pv-jobs-filters button{margin:0;font:inherit;font-family:var(--pv-jobs-mono, 'Roboto Mono', ui-monospace, monospace);font-size:.75rem;line-height:1;letter-spacing:.08em;\n  text-transform:uppercase;padding:.75rem 1.125rem;border-radius:999px;border:1px solid rgba(20,18,56,.16);background:transparent;color:#141238;cursor:pointer;\n  transition:background-color .2s ease, color .2s ease, border-color .2s ease}\n[data-pv=\"careers\"] .pv-jobs-filters button:hover{border-color:rgba(20,18,56,.4)}\n[data-pv=\"careers\"] .pv-jobs-filters button[aria-pressed=\"true\"]{background:#141238;border-color:#141238;color:#f8f8f8}\n[data-pv=\"careers\"] .pv-jobs-filters button:focus-visible{outline:2px solid #141238;outline-offset:2px}\n/* une équipe : surtitre mono + nombre d'offres, puis ses offres */\n[data-pv=\"careers\"] .pv-jobs-group{margin:0;padding:0}\n[data-pv=\"careers\"] .pv-jobs-group + .pv-jobs-group{margin-top:3.5rem}\n[data-pv=\"careers\"] .pv-jobs-team{display:flex;align-items:baseline;gap:.75rem;margin:0 0 1rem;padding:0;font-family:var(--pv-jobs-mono, 'Roboto Mono', ui-monospace, monospace);\n  font-size:.8125rem;line-height:1.4;font-weight:400;letter-spacing:.12em;text-transform:uppercase;color:#684a9e}\n[data-pv=\"careers\"] .pv-jobs-team span{color:rgba(20,18,56,.4)}\n[data-pv=\"careers\"] .pv-jobs-list{list-style:none;margin:0;padding:0;border-top:1px solid rgba(20,18,56,.12)}\n[data-pv=\"careers\"] .pv-jobs-list li{margin:0;padding:0;border-bottom:1px solid rgba(20,18,56,.12)}\n/* une offre : titre | bureau | lien, sur une ligne */\n[data-pv=\"careers\"] .pv-job{display:grid;grid-template-columns:minmax(0,1fr) 8rem auto;align-items:center;gap:2rem;padding:1.375rem 1rem;margin:0 -1rem;\n  border-radius:.75rem;color:#141238;text-decoration:none;transition:background-color .2s ease}\n[data-pv=\"careers\"] .pv-job:hover{background:rgba(20,18,56,.035)}\n[data-pv=\"careers\"] .pv-job-title{font-size:clamp(1.0625rem, .95rem + .4vw, 1.3125rem);font-weight:400;line-height:1.35;letter-spacing:-.005em}\n[data-pv=\"careers\"] .pv-job-meta{font-family:var(--pv-jobs-mono, 'Roboto Mono', ui-monospace, monospace);font-size:.75rem;letter-spacing:.08em;text-transform:uppercase;color:rgba(20,18,56,.55)}\n[data-pv=\"careers\"] .pv-job-go{font-size:.9375rem;white-space:nowrap;transition:transform .3s cubic-bezier(.2,.7,.2,1)}\n[data-pv=\"careers\"] .pv-job:hover .pv-job-go{transform:translateX(3px)}\n[data-pv=\"careers\"] .pv-job:focus-visible{outline:2px solid #141238;outline-offset:-2px}\n[data-pv=\"careers\"] .pv-jobs-note{margin:0;font-size:1.0625rem;line-height:1.6;color:#4a4868}\n[data-pv=\"careers\"] .pv-jobs-note a{color:#141238}\n/* sur fond sombre (section surface-dark) : texte clair, filets clairs */\n[data-pv=\"careers\"].is-dark .pv-jobs-filters button{border-color:rgba(248,248,248,.22);color:#f8f8f8}\n[data-pv=\"careers\"].is-dark .pv-jobs-filters button:hover{border-color:rgba(248,248,248,.55)}\n[data-pv=\"careers\"].is-dark .pv-jobs-filters button[aria-pressed=\"true\"]{background:#f8f8f8;border-color:#f8f8f8;color:#141238}\n[data-pv=\"careers\"].is-dark .pv-jobs-filters button:focus-visible, [data-pv=\"careers\"].is-dark .pv-job:focus-visible{outline-color:rgba(248,248,248,.7)}\n[data-pv=\"careers\"].is-dark .pv-jobs-team{color:#c9c4ef}\n[data-pv=\"careers\"].is-dark .pv-jobs-team span{color:rgba(248,248,248,.45)}\n[data-pv=\"careers\"].is-dark .pv-jobs-list, [data-pv=\"careers\"].is-dark .pv-jobs-list li{border-color:rgba(248,248,248,.14)}\n[data-pv=\"careers\"].is-dark .pv-job{color:#f8f8f8}\n[data-pv=\"careers\"].is-dark .pv-job:hover{background:rgba(248,248,248,.05)}\n[data-pv=\"careers\"].is-dark .pv-job-meta{color:rgba(248,248,248,.6)}\n[data-pv=\"careers\"].is-dark .pv-jobs-note{color:rgba(248,248,248,.72)}\n[data-pv=\"careers\"].is-dark .pv-jobs-note a{color:#f8f8f8}\n/* mobile : titre puis bureau sous le titre, sans le texte du lien */\n@media (max-width:767px){\n  [data-pv=\"careers\"] .pv-jobs-filters{margin-bottom:2.5rem}\n  [data-pv=\"careers\"] .pv-jobs-group + .pv-jobs-group{margin-top:2.5rem}\n  [data-pv=\"careers\"] .pv-job{grid-template-columns:minmax(0,1fr) auto;gap:.375rem 1rem;padding:1.125rem .75rem;margin:0 -.75rem}\n  [data-pv=\"careers\"] .pv-job-meta{grid-column:1;grid-row:2}\n  [data-pv=\"careers\"] .pv-job-go{grid-column:2;grid-row:1 / span 2;font-size:0}\n  [data-pv=\"careers\"] .pv-job-go::after{content:'→';font-size:1.125rem}\n}\n@media (prefers-reduced-motion:reduce){[data-pv=\"careers\"] .pv-job, [data-pv=\"careers\"] .pv-job-go, [data-pv=\"careers\"] .pv-jobs-filters button{transition:none}}";
})), c = /* @__PURE__ */ t((() => {
	s(), document.querySelectorAll("[data-pv=\"careers\"]").forEach(r);
}));
//#endregion
export default c();
