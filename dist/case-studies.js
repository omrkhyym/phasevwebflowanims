import { n as e, t } from "./rolldown-runtime-wf392T_D.mjs";
//#region src/case-studies.js
function n() {
	if (document.getElementById(d)) return;
	let e = document.createElement("style");
	e.id = d, e.textContent = f, document.head.appendChild(e);
}
function r(e) {
	e.querySelectorAll("[data-cs-slug]").forEach((e) => {
		let t = e.getAttribute("data-cs-slug");
		t && e.querySelectorAll("[data-cs-link], a").forEach((e) => e.setAttribute("href", "/case-studies/" + t));
	});
}
function i(e) {
	e.querySelectorAll("[data-cs-stat]").forEach((e) => {
		m(e.querySelector("[data-cs-stat-n]")) && e.setAttribute("data-cs-hidden", "");
	}), e.querySelectorAll("[data-cs-kpi]").forEach((e) => {
		m(e.querySelector("[data-cs-kpi-n]")) && e.setAttribute("data-cs-hidden", "");
	});
}
function a(e) {
	return e.dataset.pvInit || (e.dataset.pvInit = "1", n(), i(e), r(e)), () => {};
}
function o(e) {
	if (e.dataset.pvInit) return () => {};
	e.dataset.pvInit = "1", n(), i(e), r(e);
	let t = (t) => [...e.querySelectorAll(`[data-cs-source="${t}"] [data-cs-name]`)].map(p).filter(Boolean), a = t("product"), o = t("area"), s = [...e.querySelectorAll("[data-cs-list] [data-cs-card]")].map((e) => ({
		el: e.closest(".w-dyn-item") || e,
		card: e,
		p: [...e.querySelectorAll("[data-cs-tags-list=\"product\"] .w-dyn-item")].map(p).filter(Boolean),
		a: [...e.querySelectorAll("[data-cs-tags-list=\"area\"] .w-dyn-item")].map(p).filter(Boolean)
	})), c = e.querySelector("[data-cs-filters]");
	if (!c) return () => {};
	c.className = "cs-filters", c.innerHTML = "<div class=\"cs-pills\" role=\"radiogroup\" aria-label=\"Product\"></div>\n    <select class=\"filter-select\" aria-label=\"Therapeutic area\"></select>";
	let l = c.querySelector(".cs-pills"), u = c.querySelector("select");
	l.innerHTML = ["All", ...a].map((e, t) => `<button type="button" class="fs_radio_field" role="radio" data-p="${t ? h(e) : ""}">${e}</button>`).join(""), u.innerHTML = "<option value=\"\">All therapeutic areas</option>" + o.map((e) => `<option value="${h(e)}">${e}</option>`).join("");
	let d = document.createElement("div");
	d.className = "cs-empty", d.hidden = !0, d.innerHTML = "<h3 class=\"heading-style-h4\">No case study matches these filters yet.</h3><button type=\"button\">Show all case studies</button>", e.querySelector("[data-cs-list]")?.after(d);
	let f = {
		product: "",
		area: ""
	}, m = new URLSearchParams(location.search);
	f.product = m.get("product") || "", f.area = m.get("area") || "";
	function _(e) {
		l.querySelectorAll("[data-p]").forEach((e) => {
			let t = e.dataset.p === f.product;
			e.classList.toggle("is-list-active", t), e.setAttribute("aria-checked", t);
		}), u.value = f.area;
		let t = 0;
		s.forEach((n) => {
			let r = (!f.product || n.p.some((e) => h(e) === f.product)) && (!f.area || n.a.some((e) => h(e) === f.area));
			n.el.toggleAttribute("data-cs-hidden", !r), n.card.classList.remove("cs-in"), r && e && !g() && (n.card.style.setProperty("--i", t), n.card.offsetWidth, n.card.classList.add("cs-in")), r && t++;
		}), d.hidden = t > 0;
		let n = new URLSearchParams(location.search);
		f.product ? n.set("product", f.product) : n.delete("product"), f.area ? n.set("area", f.area) : n.delete("area"), history.replaceState(null, "", location.pathname + (n.toString() ? "?" + n : "") + location.hash);
	}
	let v = (e) => {
		let t = e.target.closest("[data-p]");
		t && (f.product = t.dataset.p, _(!0));
	}, y = () => {
		f.area = u.value, _(!0);
	};
	return l.addEventListener("click", v), u.addEventListener("change", y), d.querySelector("button").addEventListener("click", () => {
		f.product = "", f.area = "", _(!0);
	}), _(!1), function() {
		l.removeEventListener("click", v), u.removeEventListener("change", y), d.remove();
	};
}
function s(e) {
	let t = e.querySelector("[data-cs-table]");
	if (!t) return;
	let n = t.querySelector("[data-cs-row=\"head\"]"), r = !m(n?.querySelector("[data-cs-cell=\"c3\"]")), i = r ? 3 : 2;
	t.style.setProperty("--cs-cols", i), t.classList.toggle("cs-3", r);
	let a = [
		"c1",
		"c2",
		"c3"
	].map((e) => p(n?.querySelector(`[data-cs-cell="${e}"]`)));
	t.querySelectorAll("[data-cs-row]").forEach((e) => {
		e.dataset.csRow !== "head" && m(e.querySelector("[data-cs-cell=\"c1\"]")) ? e.setAttribute("data-cs-hidden", "") : e.querySelectorAll("[data-cs-cell]").forEach((e) => {
			let t = e.dataset.csCell;
			t === "c3" && !r ? e.setAttribute("data-cs-hidden", "") : (t === (r ? "c3" : "c2") && e.classList.add("cs-em"), t !== "c1" && e.setAttribute("data-h", a[t === "c2" ? 1 : 2]));
		});
	});
	let o = t.querySelector("[data-cs-note]");
	m(o) && o?.setAttribute("data-cs-hidden", "");
}
function c(e) {
	e.querySelectorAll("[data-cs-why] li").forEach((e) => {
		let t = e.querySelector("strong");
		if (!t || e.querySelector(".cs-ico")) return;
		t.textContent = t.textContent.replace(/\s*:\s*$/, "");
		let n = _.find(([e]) => e.test(t.textContent)), r = document.createElement("span");
		r.className = "cs-ico", r.setAttribute("aria-hidden", "true"), r.innerHTML = `<svg viewBox="0 0 80 80" fill="none" stroke="#E1C721" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round">${n ? n[1] : v}</svg>`, e.prepend(r);
	});
}
function l(e) {
	let t = e.querySelector("[data-cs-faq]");
	if (!t || t.querySelector(".cs-acc")) return;
	let n = document.createElement("div");
	n.className = "cs-acc";
	let r = null;
	[...t.children].forEach((e) => {
		if (e.tagName === "H3") {
			r = e.textContent.trim();
			return;
		}
		if (!r) return;
		let t = document.createElement("details");
		t.innerHTML = "<summary></summary><div class=\"cs-ans\"><div></div></div>", t.querySelector("summary").textContent = r, t.querySelector("summary").insertAdjacentHTML("beforeend", "<span class=\"cs-pm\" aria-hidden=\"true\"></span>"), t.querySelector(".cs-ans > div").appendChild(e.cloneNode(!0)), n.appendChild(t), r = null;
	}), n.children.length && (t.innerHTML = "", t.appendChild(n));
}
function u(e) {
	if (e.dataset.pvInit) return () => {};
	e.dataset.pvInit = "1", n(), i(e), r(e), s(e), c(e), l(e);
	let t = e.querySelector("[data-cs-source]");
	t && m(t.querySelector("[data-cs-source-text]")) && t.setAttribute("data-cs-hidden", "");
	let a = location.pathname.split("/").filter(Boolean).pop(), o = 0;
	return e.querySelectorAll("[data-cs-related] [data-cs-card]").forEach((e) => {
		let t = e.closest(".w-dyn-item") || e, n = e.getAttribute("data-cs-slug") === a || o >= 3;
		t.toggleAttribute("data-cs-hidden", n), n || o++;
	}), () => {};
}
var d, f, p, m, h, g, _, v, y = e((() => {
	d = "pv-case-studies-css", f = "\n[data-cs-link]{display:block;color:inherit;text-decoration:none}\n[data-cs-tags]{display:flex;flex-wrap:wrap;gap:.25rem 1rem}\n[data-cs-tags-list] .w-dyn-items,[data-cs-labels] [data-cs-tags-list] .w-dyn-items{display:flex;flex-wrap:wrap;gap:.25rem 1rem}\n[data-cs-tags-list] .w-dyn-empty{display:none}\n[data-cs-stat]{font-size:1rem;line-height:140%;color:#626262}\n[data-cs-stat] b{color:#141238;font-weight:700;margin-right:.375rem}\n[data-cs-kpi]{display:flex;align-items:baseline;gap:.875rem 1.125rem;flex-wrap:wrap}\n[data-cs-kpi-n]{font-size:3rem;font-weight:600;line-height:.95;letter-spacing:-1px;color:#e1c721;font-variant-numeric:tabular-nums}\n[data-cs-kpi-t]{font-size:1.125rem;line-height:140%;color:#f8f8f8;max-width:16rem}\n[data-cs-hidden]{display:none!important}\n\n/* bibliothèque : filtres */\n[data-pv=\"case-studies\"] [data-cs-source]{display:none}\n.cs-filters{display:flex;justify-content:space-between;align-items:center;gap:1rem 2rem;flex-wrap:wrap;margin-bottom:4rem}\n.cs-pills{display:flex;flex-wrap:wrap;gap:.25rem}\n.cs-pills .fs_radio_field{font:inherit;font-size:1rem;color:#141238;background:transparent;border:0;cursor:pointer}\n.cs-pills .fs_radio_field.is-list-active{background:#141238;color:#f8f8f8}\n.cs-filters .filter-select{width:20.3125rem;max-width:100%}\n.cs-empty{padding:4rem 0;text-align:center;display:flex;flex-direction:column;align-items:center;gap:1rem}\n.cs-empty button{font:inherit;color:#141238;background:none;border:0;border-bottom:1px solid #14123866;cursor:pointer;padding:0 0 .125rem}\n[data-cs-card].cs-in{animation:csIn .45s cubic-bezier(.2,.7,.2,1) both;animation-delay:calc(var(--i,0)*35ms)}\n@keyframes csIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}\n@media (max-width:991px){.cs-filters{margin-bottom:3rem}.cs-filters .filter-select{width:100%}}\n@media (prefers-reduced-motion:reduce){[data-cs-card].cs-in{animation:none}}\n\n/* fiche : At a glance */\n[data-cs-glance]{display:grid;grid-template-columns:minmax(0,4fr) minmax(0,8fr);gap:2rem 4rem;align-items:start}\n[data-cs-head]{display:flex;flex-direction:column;gap:1.25rem}\n[data-cs-glance] [data-cs-head]{position:sticky;top:7rem}\n[data-cs-table]{background:#fff;border-radius:1rem;box-shadow:0 15px 44px #120d3514;overflow:hidden;font-size:1rem;line-height:140%}\n[data-cs-row]{display:grid;grid-template-columns:repeat(var(--cs-cols,2),minmax(0,1fr))}\n[data-cs-row]+[data-cs-row]{border-top:1px solid #e3e1ef}\n[data-cs-cell]{padding:1.125rem 1.5rem;color:#141238}\n[data-cs-row]:not([data-cs-row=\"head\"]) [data-cs-cell=\"c1\"]{color:#626262}\n[data-cs-row=\"head\"] [data-cs-cell]{font-size:.8125rem;letter-spacing:1.15px;text-transform:uppercase;color:#626262;padding-top:1.25rem;padding-bottom:1rem}\n[data-cs-cell].cs-em{background:#f4f1f8;font-weight:600}\n[data-cs-row=\"head\"] [data-cs-cell].cs-em{color:#5e2670;font-weight:400}\n[data-cs-note]{font-size:.875rem;color:#626262;padding:1rem 1.5rem 1.25rem;border-top:1px solid #e3e1ef}\n@media (max-width:991px){[data-cs-glance]{grid-template-columns:1fr}[data-cs-glance] [data-cs-head]{position:static}}\n@media (max-width:640px){\n  [data-cs-cell]{padding:.875rem 1rem}\n  [data-cs-table].cs-3 [data-cs-row=\"head\"]{display:none}\n  [data-cs-table].cs-3 [data-cs-row]{grid-template-columns:1fr 1fr}\n  [data-cs-table].cs-3 [data-cs-cell=\"c1\"]{grid-column:1/-1;padding-bottom:0;font-size:.875rem;letter-spacing:1.15px;text-transform:uppercase}\n  [data-cs-table].cs-3 [data-cs-cell][data-h]::before{content:attr(data-h);display:block;font-size:.75rem;letter-spacing:1px;text-transform:uppercase;color:#626262;font-weight:400;margin-bottom:.25rem}\n}\n\n/* fiche : récit */\n[data-cs-chap]{display:grid;grid-template-columns:minmax(0,4fr) minmax(0,8fr);gap:1.5rem 4rem;padding:3.5rem 0}\n[data-cs-chap]+[data-cs-chap]{border-top:1px solid #e3e1ef}\n[data-cs-chap]:first-child{padding-top:0}[data-cs-chap]:last-child{padding-bottom:0}\n[data-cs-chap-head]{position:sticky;top:7rem;align-self:start;display:flex;align-items:baseline;gap:1rem}\n[data-cs-num]{font-size:.875rem;letter-spacing:1.15px;color:#928acd;font-variant-numeric:tabular-nums}\n[data-cs-rich]{font-size:1.125rem;line-height:160%;color:#2b2a48;max-width:44rem}\n[data-cs-rich]>:first-child{margin-top:0}[data-cs-rich]>:last-child{margin-bottom:0}\n[data-cs-rich] p{margin:0 0 1.25rem}\n[data-cs-rich] strong{color:#141238;font-weight:600}\n[data-cs-rich] ul,[data-cs-rich] ol{margin:0 0 1.25rem;padding:0;list-style:none;display:flex;flex-direction:column;gap:1rem}\n[data-cs-rich] ul li{position:relative;padding-left:1.75rem}\n[data-cs-rich] ul li::before{content:'';position:absolute;left:.25rem;top:.7em;width:.5rem;height:.5rem;border-radius:50%;background:#928acd}\n[data-cs-rich] ol{counter-reset:s;gap:1.5rem}\n[data-cs-rich] ol li{counter-increment:s;position:relative;padding-left:3.25rem}\n[data-cs-rich] ol li::before{content:counter(s,decimal-leading-zero);position:absolute;left:0;top:.1rem;width:2.25rem;height:2.25rem;border-radius:50%;border:1px solid #14123833;display:grid;place-items:center;font-size:.8125rem;color:#141238;font-variant-numeric:tabular-nums}\n[data-cs-rich] ol li strong:first-child{display:block;margin-bottom:.25rem}\n[data-cs-rich=\"results\"] ul{gap:0}\n[data-cs-rich=\"results\"] ul li{padding:1.125rem 0 1.125rem 2.5rem;border-top:1px solid #e3e1ef;font-size:1.25rem;line-height:145%;color:#141238}\n[data-cs-rich=\"results\"] ul li:last-child{border-bottom:1px solid #e3e1ef}\n[data-cs-rich=\"results\"] ul li::before{left:0;top:1.5rem;width:1.25rem;height:1.25rem;background:#141238 url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12'%3E%3Cpath d='M3 6.2l2 2L9 4' fill='none' stroke='%23f8f8f8' stroke-width='1.4' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\") center/.75rem no-repeat}\n@media (max-width:991px){[data-cs-chap]{grid-template-columns:1fr;padding:2.5rem 0}[data-cs-chap-head]{position:static}}\n@media (max-width:767px){[data-cs-rich]{font-size:1rem}[data-cs-rich=\"results\"] ul li{font-size:1.0625rem}}\n\n/* fiche : Why it matters */\n[data-cs-why-wrap]{display:flex;flex-direction:column;gap:3.5rem}\n[data-cs-why-wrap] [data-cs-head]{max-width:40rem}\n[data-cs-light]{color:#f8f8f8}\n[data-cs-why] ul{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(auto-fit,minmax(15rem,1fr));gap:1.25rem}\n[data-cs-why] li{display:flex;flex-direction:column;padding:2.25rem 2rem 2.5rem;border-radius:1rem;background:#ffffff0d;border:1px solid #ffffff1c;color:#ffffffa3;font-size:1rem;line-height:155%;transition:background .3s,border-color .3s}\n[data-cs-why] li:hover{background:#ffffff14;border-color:#ffffff33}\n[data-cs-why] .cs-ico{width:3.5rem;height:3.5rem;margin-bottom:2.25rem;flex:none}\n[data-cs-why] .cs-ico svg{width:100%;height:100%;display:block}\n[data-cs-why] li strong{display:block;color:#f8f8f8;font-size:1.25rem;line-height:125%;font-weight:600;margin-bottom:.75rem;padding-top:1.5rem;border-top:1px solid #ffffff1c}\n@media (max-width:767px){[data-cs-why] li{padding:1.75rem 1.5rem 2rem}[data-cs-why] .cs-ico{width:3rem;height:3rem;margin-bottom:1.75rem}}\n@media (prefers-reduced-motion:reduce){[data-cs-why] li{transition:none}}\n\n/* fiche : FAQ et source */\n[data-cs-faq-wrap]{display:grid;grid-template-columns:minmax(0,4fr) minmax(0,8fr);gap:2rem 4rem}\n.cs-acc{border-top:1px solid #14123826}\n.cs-acc details{border-bottom:1px solid #14123826}\n.cs-acc summary{list-style:none;cursor:pointer;display:flex;justify-content:space-between;align-items:center;gap:2rem;padding:1.5rem 0;font-size:1.25rem;font-weight:600;line-height:130%;color:#141238}\n.cs-acc summary::-webkit-details-marker{display:none}\n.cs-pm{flex:none;position:relative;width:2.5rem;height:2.5rem;border-radius:999px;border:1px solid #14123833;transition:background .2s,border-color .2s}\n.cs-pm::before,.cs-pm::after{content:'';position:absolute;left:50%;top:50%;width:.875rem;height:1.5px;background:currentColor;transform:translate(-50%,-50%);transition:transform .3s cubic-bezier(.2,.7,.2,1)}\n.cs-pm::after{transform:translate(-50%,-50%) rotate(90deg)}\n.cs-acc details[open] .cs-pm{background:#141238;color:#f8f8f8;border-color:#141238}\n.cs-acc details[open] .cs-pm::after{transform:translate(-50%,-50%) rotate(0)}\n.cs-acc summary:hover .cs-pm{border-color:#141238}\n.cs-ans{display:grid;grid-template-rows:0fr;transition:grid-template-rows .35s cubic-bezier(.2,.7,.2,1)}\n.cs-acc details[open] .cs-ans{grid-template-rows:1fr}\n.cs-ans>div{overflow:hidden}\n.cs-ans p{margin:0;padding:0 4rem 1.75rem 0;font-size:1.0625rem;line-height:160%;color:#2b2a48}\n[data-cs-source]{display:grid;grid-template-columns:minmax(0,4fr) minmax(0,8fr);gap:1rem 4rem;padding-top:3rem;margin-top:4.5rem;border-top:1px solid #e3e1ef}\n[data-cs-source-text]{font-size:.9375rem;line-height:155%;color:#626262;max-width:44rem}\n[data-cs-source-text] p{margin:0 0 .75rem}[data-cs-source-text] a{color:#141238}\n@media (max-width:991px){[data-cs-faq-wrap],[data-cs-source]{grid-template-columns:1fr}.cs-acc summary{font-size:1.0625rem}.cs-ans p{padding-right:0}[data-cs-source]{margin-top:3rem}}\n@media (prefers-reduced-motion:reduce){.cs-ans,.cs-pm::before,.cs-pm::after{transition:none}}\n\n/* fiche : études liées */\n[data-cs-related-head]{display:flex;justify-content:space-between;align-items:end;gap:2rem;margin-bottom:3rem;flex-wrap:wrap}\n[data-cs-all]{color:#141238;text-decoration:none;border-bottom:1px solid #14123866;padding-bottom:.25rem}\n", p = (e) => e ? e.textContent.trim() : "", m = (e) => !e || e.classList.contains("w-dyn-bind-empty") || !p(e), h = (e) => e.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""), g = () => matchMedia("(prefers-reduced-motion: reduce)").matches, _ = [
		[/patient/i, "<circle cx=\"40\" cy=\"24\" r=\"11\"/><path d=\"M17 68c0-13 10.3-22 23-22s23 9 23 22\"/>"],
		[/regulat|governance/i, "<path d=\"M40 10l24 9v18c0 16-10 27-24 33-14-6-24-17-24-33V19z\"/><path d=\"M30 40l7 7 14-14\"/>"],
		[/biostat|analyst/i, "<path d=\"M10 66h60\"/><path d=\"M10 60C21 60 27 20 40 20S59 60 70 60\"/><path d=\"M27 66V50M40 66V36M53 66V50\"/>"],
		[/operation/i, "<path d=\"M28 14h24v9H28z\"/><path d=\"M24 18h-4a4 4 0 0 0-4 4v42a4 4 0 0 0 4 4h40a4 4 0 0 0 4-4V22a4 4 0 0 0-4-4h-4\"/><path d=\"M29 46l8 8 15-15\"/>"],
		[/executive|finance|investor|founder/i, "<path d=\"M12 66h56\"/><path d=\"M20 56V46M34 56V38M48 56V42M62 56V28\"/><path d=\"M18 34l16-12 12 8 18-16\"/><path d=\"M56 14h8v8\"/>"],
		[/r&d|\bbd\b|leader/i, "<circle cx=\"40\" cy=\"40\" r=\"26\"/><circle cx=\"40\" cy=\"40\" r=\"14\"/><circle cx=\"40\" cy=\"40\" r=\"3\"/>"],
		[/scien|medical|development/i, "<path d=\"M31 12h18\"/><path d=\"M35 12v19L18 61a4 4 0 0 0 3.5 6h37a4 4 0 0 0 3.5-6L45 31V12\"/><path d=\"M25 50h30\"/>"]
	], v = "<circle cx=\"40\" cy=\"40\" r=\"26\"/><circle cx=\"40\" cy=\"40\" r=\"14\"/><circle cx=\"40\" cy=\"40\" r=\"3\"/>";
})), b = /* @__PURE__ */ t((() => {
	y(), document.querySelectorAll("[data-swiper=\"feature\"]").forEach(a), document.querySelectorAll("[data-pv=\"case-studies\"]").forEach(o), document.querySelectorAll("[data-pv=\"case-study\"]").forEach(u);
}));
//#endregion
export default b();
