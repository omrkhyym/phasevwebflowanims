import { n as e } from "./rolldown-runtime-wf392T_D.mjs";
//#region src/cond-roles.js
function t() {
	if (document.getElementById("pv-cond-roles")) return;
	let e = document.createElement("style");
	e.id = "pv-cond-roles", e.textContent = n, document.head.appendChild(e);
}
var n, r = e((() => {
	n = ":is([data-pv^=\"cond-\"], [data-pv^=\"bonv-\"]) > [data-role]{position:absolute;width:1px;height:1px;margin:0;padding:0;overflow:hidden;clip-path:inset(50%);white-space:nowrap}\n.feature-grid > .video-animation:has(> :is([data-pv^=\"cond-\"], [data-pv^=\"bonv-\"])){width:100%;align-self:stretch}";
}));
//#endregion
export { t as n, r as t };
