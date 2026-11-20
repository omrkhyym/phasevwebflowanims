/* Case Studies : bibliothèque (/case-studies) et fiche (template CMS /case-studies/<slug>).
   Le contenu vient du CMS (collection Case Studies) ; le module ne porte que la logique et le style des blocs propres
   à ces pages (filtres, tableau At a glance, accordéon, cartes Why it matters), ciblés par attributs data-cs-*,
   sans classe Webflow créée. Proto validé : protos/case-studies/phasev-case-studies-protos.html. */

const CSS_ID = 'pv-case-studies-css';
const CSS = `
[data-cs-link]{display:block;color:inherit;text-decoration:none}
[data-cs-tags]{display:flex;flex-wrap:wrap;gap:.25rem 1rem}
[data-cs-tags-list] .w-dyn-items,[data-cs-labels] [data-cs-tags-list] .w-dyn-items{display:flex;flex-wrap:wrap;gap:.25rem 1rem}
[data-cs-tags-list] .w-dyn-empty{display:none}
[data-cs-stat]{font-size:1rem;line-height:140%;color:#626262}
[data-cs-stat] b{color:#141238;font-weight:700;margin-right:.375rem}
[data-cs-kpi]{display:flex;align-items:baseline;gap:.875rem 1.125rem;flex-wrap:wrap}
[data-cs-kpi-n]{font-size:3rem;font-weight:600;line-height:.95;letter-spacing:-1px;color:#e1c721;font-variant-numeric:tabular-nums}
[data-cs-kpi-t]{font-size:1.125rem;line-height:140%;color:#f8f8f8;max-width:16rem}
[data-cs-hidden]{display:none!important}

/* bibliothèque : filtres */
[data-pv="case-studies"] [data-cs-source]{display:none}
.cs-filters{display:flex;justify-content:space-between;align-items:center;gap:1rem 2rem;flex-wrap:wrap;margin-bottom:4rem}
.cs-pills{display:flex;flex-wrap:wrap;gap:.25rem}
.cs-pills .fs_radio_field{font:inherit;font-size:1rem;color:#141238;background:transparent;border:0;cursor:pointer}
.cs-pills .fs_radio_field.is-list-active{background:#141238;color:#f8f8f8}
.cs-filters .filter-select{width:20.3125rem;max-width:100%}
.cs-empty{padding:4rem 0;text-align:center;display:flex;flex-direction:column;align-items:center;gap:1rem}
.cs-empty button{font:inherit;color:#141238;background:none;border:0;border-bottom:1px solid #14123866;cursor:pointer;padding:0 0 .125rem}
[data-cs-card].cs-in{animation:csIn .45s cubic-bezier(.2,.7,.2,1) both;animation-delay:calc(var(--i,0)*35ms)}
@keyframes csIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
@media (max-width:991px){.cs-filters{margin-bottom:3rem}.cs-filters .filter-select{width:100%}}
@media (prefers-reduced-motion:reduce){[data-cs-card].cs-in{animation:none}}

/* fiche : At a glance */
[data-cs-glance]{display:grid;grid-template-columns:minmax(0,4fr) minmax(0,8fr);gap:2rem 4rem;align-items:start}
[data-cs-head]{display:flex;flex-direction:column;gap:1.25rem}
[data-cs-glance] [data-cs-head]{position:sticky;top:7rem}
[data-cs-table]{background:#fff;border-radius:1rem;box-shadow:0 15px 44px #120d3514;overflow:hidden;font-size:1rem;line-height:140%}
[data-cs-row]{display:grid;grid-template-columns:repeat(var(--cs-cols,2),minmax(0,1fr))}
[data-cs-row]+[data-cs-row]{border-top:1px solid #e3e1ef}
[data-cs-cell]{padding:1.125rem 1.5rem;color:#141238}
[data-cs-row]:not([data-cs-row="head"]) [data-cs-cell="c1"]{color:#626262}
[data-cs-row="head"] [data-cs-cell]{font-size:.8125rem;letter-spacing:1.15px;text-transform:uppercase;color:#626262;padding-top:1.25rem;padding-bottom:1rem}
[data-cs-cell].cs-em{background:#f4f1f8;font-weight:600}
[data-cs-row="head"] [data-cs-cell].cs-em{color:#5e2670;font-weight:400}
[data-cs-note]{font-size:.875rem;color:#626262;padding:1rem 1.5rem 1.25rem;border-top:1px solid #e3e1ef}
@media (max-width:991px){[data-cs-glance]{grid-template-columns:1fr}[data-cs-glance] [data-cs-head]{position:static}}
@media (max-width:640px){
  [data-cs-cell]{padding:.875rem 1rem}
  [data-cs-table].cs-3 [data-cs-row="head"]{display:none}
  [data-cs-table].cs-3 [data-cs-row]{grid-template-columns:1fr 1fr}
  [data-cs-table].cs-3 [data-cs-cell="c1"]{grid-column:1/-1;padding-bottom:0;font-size:.875rem;letter-spacing:1.15px;text-transform:uppercase}
  [data-cs-table].cs-3 [data-cs-cell][data-h]::before{content:attr(data-h);display:block;font-size:.75rem;letter-spacing:1px;text-transform:uppercase;color:#626262;font-weight:400;margin-bottom:.25rem}
}

/* fiche : récit */
[data-cs-chap]{display:grid;grid-template-columns:minmax(0,4fr) minmax(0,8fr);gap:1.5rem 4rem;padding:3.5rem 0}
[data-cs-chap]+[data-cs-chap]{border-top:1px solid #e3e1ef}
[data-cs-chap]:first-child{padding-top:0}[data-cs-chap]:last-child{padding-bottom:0}
[data-cs-chap-head]{position:sticky;top:7rem;align-self:start;display:flex;align-items:baseline;gap:1rem}
[data-cs-num]{font-size:.875rem;letter-spacing:1.15px;color:#928acd;font-variant-numeric:tabular-nums}
[data-cs-rich]{font-size:1.125rem;line-height:160%;color:#2b2a48;max-width:44rem}
[data-cs-rich]>:first-child{margin-top:0}[data-cs-rich]>:last-child{margin-bottom:0}
[data-cs-rich] p{margin:0 0 1.25rem}
[data-cs-rich] strong{color:#141238;font-weight:600}
[data-cs-rich] ul,[data-cs-rich] ol{margin:0 0 1.25rem;padding:0;list-style:none;display:flex;flex-direction:column;gap:1rem}
[data-cs-rich] ul li{position:relative;padding-left:1.75rem}
[data-cs-rich] ul li::before{content:'';position:absolute;left:.25rem;top:.7em;width:.5rem;height:.5rem;border-radius:50%;background:#928acd}
[data-cs-rich] ol{counter-reset:s;gap:1.5rem}
[data-cs-rich] ol li{counter-increment:s;position:relative;padding-left:3.25rem}
[data-cs-rich] ol li::before{content:counter(s,decimal-leading-zero);position:absolute;left:0;top:.1rem;width:2.25rem;height:2.25rem;border-radius:50%;border:1px solid #14123833;display:grid;place-items:center;font-size:.8125rem;color:#141238;font-variant-numeric:tabular-nums}
[data-cs-rich] ol li strong:first-child{display:block;margin-bottom:.25rem}
[data-cs-rich="results"] ul{gap:0}
[data-cs-rich="results"] ul li{padding:1.125rem 0 1.125rem 2.5rem;border-top:1px solid #e3e1ef;font-size:1.25rem;line-height:145%;color:#141238}
[data-cs-rich="results"] ul li:last-child{border-bottom:1px solid #e3e1ef}
[data-cs-rich="results"] ul li::before{left:0;top:1.5rem;width:1.25rem;height:1.25rem;background:#141238 url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12'%3E%3Cpath d='M3 6.2l2 2L9 4' fill='none' stroke='%23f8f8f8' stroke-width='1.4' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") center/.75rem no-repeat}
@media (max-width:991px){[data-cs-chap]{grid-template-columns:1fr;padding:2.5rem 0}[data-cs-chap-head]{position:static}}
@media (max-width:767px){[data-cs-rich]{font-size:1rem}[data-cs-rich="results"] ul li{font-size:1.0625rem}}

/* fiche : Why it matters */
[data-cs-why-wrap]{display:flex;flex-direction:column;gap:3.5rem}
[data-cs-why-wrap] [data-cs-head]{max-width:40rem}
[data-cs-light]{color:#f8f8f8}
[data-cs-why] ul{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(auto-fit,minmax(15rem,1fr));gap:1.25rem}
[data-cs-why] li{display:flex;flex-direction:column;padding:2.25rem 2rem 2.5rem;border-radius:1rem;background:#ffffff0d;border:1px solid #ffffff1c;color:#ffffffa3;font-size:1rem;line-height:155%;transition:background .3s,border-color .3s}
[data-cs-why] li:hover{background:#ffffff14;border-color:#ffffff33}
[data-cs-why] .cs-ico{width:3.5rem;height:3.5rem;margin-bottom:2.25rem;flex:none}
[data-cs-why] .cs-ico svg{width:100%;height:100%;display:block}
[data-cs-why] li strong{display:block;color:#f8f8f8;font-size:1.25rem;line-height:125%;font-weight:600;margin-bottom:.75rem;padding-top:1.5rem;border-top:1px solid #ffffff1c}
@media (max-width:767px){[data-cs-why] li{padding:1.75rem 1.5rem 2rem}[data-cs-why] .cs-ico{width:3rem;height:3rem;margin-bottom:1.75rem}}
@media (prefers-reduced-motion:reduce){[data-cs-why] li{transition:none}}

/* fiche : FAQ et source */
[data-cs-faq-wrap]{display:grid;grid-template-columns:minmax(0,4fr) minmax(0,8fr);gap:2rem 4rem}
.cs-acc{border-top:1px solid #14123826}
.cs-acc details{border-bottom:1px solid #14123826}
.cs-acc summary{list-style:none;cursor:pointer;display:flex;justify-content:space-between;align-items:center;gap:2rem;padding:1.5rem 0;font-size:1.25rem;font-weight:600;line-height:130%;color:#141238}
.cs-acc summary::-webkit-details-marker{display:none}
.cs-pm{flex:none;position:relative;width:2.5rem;height:2.5rem;border-radius:999px;border:1px solid #14123833;transition:background .2s,border-color .2s}
.cs-pm::before,.cs-pm::after{content:'';position:absolute;left:50%;top:50%;width:.875rem;height:1.5px;background:currentColor;transform:translate(-50%,-50%);transition:transform .3s cubic-bezier(.2,.7,.2,1)}
.cs-pm::after{transform:translate(-50%,-50%) rotate(90deg)}
.cs-acc details[open] .cs-pm{background:#141238;color:#f8f8f8;border-color:#141238}
.cs-acc details[open] .cs-pm::after{transform:translate(-50%,-50%) rotate(0)}
.cs-acc summary:hover .cs-pm{border-color:#141238}
.cs-ans{display:grid;grid-template-rows:0fr;transition:grid-template-rows .35s cubic-bezier(.2,.7,.2,1)}
.cs-acc details[open] .cs-ans{grid-template-rows:1fr}
.cs-ans>div{overflow:hidden}
.cs-ans p{margin:0;padding:0 4rem 1.75rem 0;font-size:1.0625rem;line-height:160%;color:#2b2a48}
[data-cs-source]{display:grid;grid-template-columns:minmax(0,4fr) minmax(0,8fr);gap:1rem 4rem;padding-top:3rem;margin-top:4.5rem;border-top:1px solid #e3e1ef}
[data-cs-source-text]{font-size:.9375rem;line-height:155%;color:#626262;max-width:44rem}
[data-cs-source-text] p{margin:0 0 .75rem}[data-cs-source-text] a{color:#141238}
@media (max-width:991px){[data-cs-faq-wrap],[data-cs-source]{grid-template-columns:1fr}.cs-acc summary{font-size:1.0625rem}.cs-ans p{padding-right:0}[data-cs-source]{margin-top:3rem}}
@media (prefers-reduced-motion:reduce){.cs-ans,.cs-pm::before,.cs-pm::after{transition:none}}

/* fiche : études liées */
[data-cs-related-head]{display:flex;justify-content:space-between;align-items:end;gap:2rem;margin-bottom:3rem;flex-wrap:wrap}
[data-cs-all]{color:#141238;text-decoration:none;border-bottom:1px solid #14123866;padding-bottom:.25rem}
/* ===== refonte (2026-11-17) : style affiné du proto (protos/refonte-produits/_kit/affine.css, bloc Case Studies),
   sections sombres repérées par la classe native .surface-dark ===== */
:root{--af-mono:'Roboto Mono',ui-monospace,Consolas,monospace;--af-violet:#684a9e;--af-glass:linear-gradient(155deg,rgba(255,255,255,.95) 0%,rgba(255,255,255,.7) 55%,rgba(255,255,255,.55) 100%);--af-edge:linear-gradient(150deg,rgba(20,18,56,.18) 0%,rgba(20,18,56,.06) 40%,rgba(20,18,56,.04) 75%,rgba(104,74,158,.2) 100%);--af-glass-dark:radial-gradient(120% 60% at 15% 0%,rgba(255,255,255,.06),rgba(255,255,255,0) 60%),linear-gradient(155deg,rgba(150,110,200,.2) 0%,rgba(90,60,150,.16) 50%,rgba(40,24,80,.34) 100%);--af-glass-rose:radial-gradient(120% 60% at 15% 0%,rgba(255,255,255,.12),rgba(255,255,255,0) 60%),linear-gradient(155deg,rgba(214,160,230,.42) 0%,rgba(160,110,200,.3) 50%,rgba(104,74,158,.36) 100%);--af-edge-dark:linear-gradient(150deg,rgba(248,248,248,.32) 0%,rgba(248,248,248,.07) 40%,rgba(248,248,248,.03) 75%,rgba(214,170,240,.14) 100%)}

/* ===================== Case Studies (bibliothèque et fiche) =====================
   Les blocs CMS du module case-studies.js (attributs data-cs-*), en style affiné, sans nouvelle classe.
   Sélecteurs préfixés « html body » : ils passent devant le CSS que le module injecte après la page. */

/* cartes des études liées (fiche, section sombre) : la carte case study validée, en verre sombre, image 16:9 en tête */
html body .surface-dark [data-cs-card]{ position:relative; isolation:isolate; display:flex; flex-direction:column; height:100%; border-radius:1.5rem; overflow:hidden; border:0;
  color:#f8f8f8; background:var(--af-glass-dark); -webkit-backdrop-filter:blur(40px) saturate(120%); backdrop-filter:blur(40px) saturate(120%);
  transition:transform .4s cubic-bezier(.22,1,.36,1), background .4s cubic-bezier(.22,1,.36,1); }
html body .surface-dark [data-cs-card]::before{ content:''; position:absolute; inset:0; border-radius:inherit; padding:.5px; pointer-events:none; z-index:2; background:var(--af-edge-dark);
  -webkit-mask:linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0); -webkit-mask-composite:xor; mask-composite:exclude; }
html body .surface-dark [data-cs-card]:hover{ transform:translateY(-4px); background:var(--af-glass-rose); }
html body .surface-dark [data-cs-card] .post_image{ display:block; width:100%; height:auto; aspect-ratio:16/9; object-fit:cover; border-radius:0; margin:0; }
html body .surface-dark [data-cs-card] .post_body{ display:flex; flex-direction:column; gap:1.25rem; flex:1; padding:2rem 2.25rem 2.5rem; background:none; }
html body .surface-dark [data-cs-card] [data-cs-tag]{ font-family:var(--af-mono, "Roboto Mono", monospace); font-size:.75rem; letter-spacing:.12em; text-transform:uppercase; color:var(--_colors---primary--yellow, #e1c721); }
html body .surface-dark [data-cs-card] h3{ margin:0; font-weight:300; font-size:clamp(1.375rem, 1.1rem + .7vw, 1.75rem); line-height:1.25; letter-spacing:-.015em; color:#f8f8f8; }
html body .surface-dark [data-cs-card] .post_description{ font-size:1rem; line-height:1.6; color:rgba(248,248,248,.7); }
html body .surface-dark [data-cs-card] [data-cs-stat]{ display:flex; align-items:baseline; gap:.75rem; margin-top:auto; padding-top:1.25rem; border-top:1px solid rgba(248,248,248,.14); font-size:.9375rem; line-height:1.4; color:rgba(248,248,248,.75); }
html body .surface-dark [data-cs-card] [data-cs-stat] b{ margin:0; font-weight:300; font-size:2.5rem; line-height:1; letter-spacing:-.03em; color:#f8f8f8; }

/* bibliothèque (fond blanc) : 4 cartes par ligne ; la carte claire des pages produit (gris léger en dégradé, bord fin), image 16:9 en tête */
html body [data-pv="case-studies"] .resource-list, html body [data-cs-related] .resource-list{ display:grid; grid-template-columns:repeat(4, minmax(0,1fr)); gap:2.5rem 1.5rem; }
/* 4 sur grand écran (1440 px et plus), 3 sur écran moyen, 2 sur petit écran ou tablette, 1 sur téléphone */
@media (max-width:1439px){ html body [data-pv="case-studies"] .resource-list, html body [data-cs-related] .resource-list{ grid-template-columns:repeat(3, minmax(0,1fr)); } }
@media (max-width:991px){ html body [data-pv="case-studies"] .resource-list, html body [data-cs-related] .resource-list{ grid-template-columns:repeat(2, minmax(0,1fr)); } }
@media (max-width:599px){ html body [data-pv="case-studies"] .resource-list, html body [data-cs-related] .resource-list{ grid-template-columns:1fr; } }
html body [data-pv="case-studies"] .resource-item, html body [data-cs-related] .resource-item{ width:auto; max-width:none; }
html body [data-pv="case-studies"] [data-cs-card], html body [data-cs-related] [data-cs-card]{ position:relative; isolation:isolate; display:flex; flex-direction:column; height:100%; border-radius:1.25rem; overflow:hidden; border:0; box-shadow:none;
  background:linear-gradient(155deg, #f6f6f9 0%, #eeedf4 100%); transition:transform .4s cubic-bezier(.22,1,.36,1); }
html body [data-pv="case-studies"] [data-cs-card]::before, html body [data-cs-related] [data-cs-card]::before{ content:''; position:absolute; inset:0; border-radius:inherit; padding:.5px; pointer-events:none; z-index:2; background:var(--af-edge);
  -webkit-mask:linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0); -webkit-mask-composite:xor; mask-composite:exclude; }
html body [data-pv="case-studies"] [data-cs-card]:hover, html body [data-cs-related] [data-cs-card]:hover{ transform:translateY(-4px); }
html body [data-pv="case-studies"] [data-cs-card] .post_image, html body [data-cs-related] [data-cs-card] .post_image{ display:block; width:100%; height:auto; aspect-ratio:16/9; object-fit:cover; border-radius:0; margin:0; }
html body [data-pv="case-studies"] [data-cs-card] .post_body, html body [data-cs-related] [data-cs-card] .post_body{ display:flex; flex-direction:column; gap:1rem; flex:1; padding:1.5rem 1.5rem 1.75rem; background:none; }
html body [data-pv="case-studies"] [data-cs-card] [data-cs-tag], html body [data-cs-related] [data-cs-card] [data-cs-tag]{ font-family:var(--af-mono, "Roboto Mono", monospace); font-size:.6875rem; letter-spacing:.12em; text-transform:uppercase; color:var(--af-violet, #5b4fb0); }
html body [data-pv="case-studies"] [data-cs-card] h3, html body [data-cs-related] [data-cs-card] h3{ margin:0; font-weight:400; font-size:1.25rem; line-height:1.3; letter-spacing:-.01em; color:#141238; }
html body [data-pv="case-studies"] [data-cs-card] .post_description, html body [data-cs-related] [data-cs-card] .post_description{ font-size:.9375rem; line-height:1.55; color:#4a4868; }
html body [data-pv="case-studies"] [data-cs-card] [data-cs-stat], html body [data-cs-related] [data-cs-card] [data-cs-stat]{ display:flex; align-items:baseline; flex-wrap:wrap; gap:.25rem .625rem; margin-top:auto; padding-top:1rem; border-top:1px solid rgba(20,18,56,.1); font-size:.875rem; line-height:1.4; color:#4a4868; }
html body [data-pv="case-studies"] [data-cs-card] [data-cs-stat] b, html body [data-cs-related] [data-cs-card] [data-cs-stat] b{ margin:0; font-weight:300; font-size:2rem; line-height:1; letter-spacing:-.03em; color:#141238; }
@media (prefers-reduced-motion:reduce){ html body [data-cs-card]{ transition:none; } html body [data-cs-card]:hover{ transform:none; } }

/* filtres de la bibliothèque (fond blanc) : barre segmentée. Une seule barre gris clair ; l'active est une pastille blanche
   au bord fin, qui glisse d'une catégorie à l'autre (repère .cs-pill-ind posé par affine.js). Libellés en mono capitales.
   La liste Therapeutic area est une pastille assortie. Sans le repère (JS absent), l'active prend directement le fond blanc. */
html body .cs-filters{ align-items:center; }
html body .cs-pills{ position:relative; isolation:isolate; display:inline-flex; flex-wrap:nowrap; gap:0; max-width:100%; padding:.3125rem; border-radius:999px;
  background:#f1f0f6; box-shadow:inset 0 0 0 1px rgba(20,18,56,.05); overflow-x:auto; scrollbar-width:none; }
html body .cs-pills::-webkit-scrollbar{ display:none; }
html body .cs-pills .fs_radio_field{ position:relative; z-index:1; flex:none; padding:.625rem 1.125rem; border:0; border-radius:999px; background:transparent;
  font-family:var(--af-mono, "Roboto Mono", monospace); font-size:.75rem; letter-spacing:.1em; text-transform:uppercase; color:#6b6890; transition:color .3s; }
html body .cs-pills .fs_radio_field:hover{ color:#141238; }
html body .cs-pills .fs_radio_field.is-list-active{ background:#fff; color:#141238; box-shadow:0 0 0 1px rgba(20,18,56,.08); }
html body .cs-pills.has-ind .fs_radio_field.is-list-active{ background:transparent; box-shadow:none; }
html body .cs-pill-ind{ position:absolute; z-index:0; top:.3125rem; bottom:.3125rem; left:0; width:0; border-radius:999px; background:#fff; box-shadow:0 0 0 1px rgba(20,18,56,.08);
  transition:transform .45s cubic-bezier(.22,1,.36,1), width .45s cubic-bezier(.22,1,.36,1); pointer-events:none; }
html body .cs-filters .filter-select{ height:auto; padding:.9375rem 2.75rem .9375rem 1.375rem; border:0; border-radius:999px; background:#f1f0f6 no-repeat right 1.25rem center / .625rem;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' fill='none' stroke='%23141238' stroke-width='1.2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  box-shadow:inset 0 0 0 1px rgba(20,18,56,.05); -webkit-appearance:none; appearance:none;
  font-family:var(--af-mono, "Roboto Mono", monospace); font-size:.75rem; letter-spacing:.1em; text-transform:uppercase; color:#141238; cursor:pointer; }
@media (prefers-reduced-motion:reduce){ html body .cs-pill-ind{ transition:none; } }

/* chiffre clé des heros (bibliothèque et fiche) : grand, léger, blanc */
html body [data-cs-kpi-n]{ font-weight:300; font-size:clamp(3rem, 2rem + 3vw, 4.5rem); letter-spacing:-.03em; color:#f8f8f8; }
html body [data-cs-kpi-t]{ color:rgba(248,248,248,.7); }

/* At a glance (fond light) : tableau en verre clair, en-têtes en mono, colonne optimisée en mauve léger */
html body [data-cs-table]{ position:relative; isolation:isolate; background:var(--af-glass); box-shadow:none; border-radius:1.5rem; }
html body [data-cs-table]::before{ content:''; position:absolute; inset:0; border-radius:inherit; padding:.5px; pointer-events:none; background:var(--af-edge);
  -webkit-mask:linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0); -webkit-mask-composite:xor; mask-composite:exclude; }
html body [data-cs-row]+[data-cs-row], html body [data-cs-note]{ border-top-color:rgba(20,18,56,.08); }
html body [data-cs-row="head"] [data-cs-cell]{ font-family:var(--af-mono, "Roboto Mono", monospace); font-size:.75rem; letter-spacing:.12em; color:#6b6890; }
html body [data-cs-cell].cs-em{ background:rgba(146,138,205,.1); font-weight:500; }
html body [data-cs-row="head"] [data-cs-cell].cs-em{ color:#5b4fb0; font-weight:400; }
html body [data-cs-note]{ font-size:.8125rem; }

/* récit : numéros de chapitre en repères ronds (anneau doux de 1 px), titres légers, listes au tiret violet */
html body [data-cs-chap-head]{ align-items:center; }
html body [data-cs-num]{ display:grid; place-items:center; flex:none; width:2.75rem; height:2.75rem; border-radius:50%; border:1px solid rgba(146,138,205,.4);
  font-family:var(--af-mono, "Roboto Mono", monospace); font-size:.8125rem; letter-spacing:.06em; color:#141238; }
html body [data-cs-chap-head] h2{ font-weight:400; letter-spacing:-.01em; }
html body [data-cs-rich] strong{ font-weight:500; }
html body [data-cs-rich] ul li::before{ top:.8em; left:0; width:1rem; height:1.5px; border-radius:0; background:#928acd; }
html body [data-cs-rich] ol li::before{ border-color:rgba(146,138,205,.4); font-family:var(--af-mono, "Roboto Mono", monospace); font-size:.75rem; }
html body [data-cs-rich="results"] ul li{ font-weight:300; font-size:1.375rem; }
html body [data-cs-rich="results"] ul li::before{ top:1.55rem; width:1.25rem; height:1.25rem; border-radius:50%; border:1px solid rgba(146,138,205,.5);
  background:transparent url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12'%3E%3Cpath d='M3 6.2l2 2L9 4' fill='none' stroke='%23928acd' stroke-width='1.4' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") center/.75rem no-repeat; }

/* Why it matters (sombre animé) : cartes en verre sombre, bord dégradé fin */
html body [data-cs-why] li{ position:relative; isolation:isolate; border:0; border-radius:1.5rem; background:var(--af-glass-dark); color:rgba(248,248,248,.7);
  -webkit-backdrop-filter:blur(40px) saturate(120%); backdrop-filter:blur(40px) saturate(120%); }
html body [data-cs-why] li::before{ content:''; position:absolute; inset:0; border-radius:inherit; padding:.5px; pointer-events:none; background:var(--af-edge-dark);
  -webkit-mask:linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0); -webkit-mask-composite:xor; mask-composite:exclude; }
html body [data-cs-why] li:hover{ background:var(--af-glass-rose); }
html body [data-cs-why] li strong{ font-weight:400; border-top-color:rgba(248,248,248,.14); }

/* FAQ et source : poids légers, anneau doux */
html body .cs-acc summary{ font-weight:400; letter-spacing:-.005em; }
html body .cs-pm{ border-color:rgba(146,138,205,.4); }
html body .cs-acc, html body .cs-acc details, html body [data-cs-source]{ border-color:rgba(20,18,56,.1); }
html body .cs-ans p{ color:#4a4868; }

/* études liées (sombre animé) : lien « tout voir » en blanc */
html body .surface-dark [data-cs-all]{ color:#f8f8f8; border-bottom-color:rgba(248,248,248,.4); }

/* Case Studies, catégories au-dessus du titre (hero et cartes de la bibliothèque) : séparées par une barre verticale fine */
html body .featured-label-div{ display:flex; flex-wrap:wrap; align-items:center; gap:.25rem .75rem; }
html body .featured-label-div > .text-size-label + .text-size-label::before,
html body [data-cs-tags] [data-cs-tag]::before{ content:''; display:inline-block; width:1px; height:.9em; margin-right:.75rem; vertical-align:-.1em; background:currentColor; opacity:.35; }
html body [data-cs-tags], html body [data-cs-tags] [data-cs-tags-list] .w-dyn-items{ gap:.25rem .75rem; }
/* pas de barre avant la toute première catégorie (y compris quand la liste des produits est vide) */
html body [data-cs-tags] > [data-cs-tags-list]:first-child .w-dyn-item:first-child [data-cs-tag]::before,
html body [data-cs-tags] > [data-cs-tags-list]:has(.w-dyn-empty) + [data-cs-tags-list] .w-dyn-item:first-child [data-cs-tag]::before{ display:none; }

/* Case Studies, bibliothèque : filtres plus près du header réduit et des cartes ; filtres → cartes : 4rem → 1.25rem */
html body .padding-section-large:has(> [data-pv="case-studies"]){ padding-top:1.5rem; }
html body [data-pv="case-studies"] .cs-filters{ margin-bottom:1.25rem; }
@media (max-width:991px){ html body .padding-section-large:has(> [data-pv="case-studies"]){ padding-top:1.25rem; } html body [data-pv="case-studies"] .cs-filters{ margin-bottom:1rem; } }

/* Case Studies, cartes de la bibliothèque : sans le chiffre clé ; image collée aux bords de la carte, en haut (les coins suivent l'arrondi de la carte) */
html body [data-pv="case-studies"] [data-cs-card] [data-cs-stat], html body [data-cs-related] [data-cs-card] [data-cs-stat]{ display:none !important; }
html body [data-pv="case-studies"] [data-cs-card], html body [data-cs-related] [data-cs-card]{ padding:0 !important; }
html body [data-pv="case-studies"] [data-cs-card] [data-cs-link="image"], html body [data-cs-related] [data-cs-card] [data-cs-link="image"]{ display:block; margin:0; padding:0; line-height:0; }
html body [data-pv="case-studies"] [data-cs-card] .post_image, html body [data-cs-related] [data-cs-card] .post_image{ width:100% !important; max-width:none; margin:0 !important; border-radius:0 !important; }

/* Case Studies, bibliothèque (retour de Romain) : 3 cartes par ligne, écart plus large (celui des cartes case study validées), texte moins serré.
   3 sur écran moyen et grand, 2 sur tablette, 1 sur téléphone. */
html body [data-pv="case-studies"] .resource-list, html body [data-cs-related] .resource-list{ grid-template-columns:repeat(3, minmax(0,1fr)); gap:3rem; }
@media (max-width:1439px){ html body [data-pv="case-studies"] .resource-list, html body [data-cs-related] .resource-list{ grid-template-columns:repeat(3, minmax(0,1fr)); } }
@media (max-width:991px){ html body [data-pv="case-studies"] .resource-list, html body [data-cs-related] .resource-list{ grid-template-columns:repeat(2, minmax(0,1fr)); gap:2.5rem 2rem; } }
@media (max-width:599px){ html body [data-pv="case-studies"] .resource-list, html body [data-cs-related] .resource-list{ grid-template-columns:1fr; gap:2rem; } }
html body [data-pv="case-studies"] [data-cs-card] .post_body, html body [data-cs-related] [data-cs-card] .post_body{ gap:1.25rem; padding:2rem 2rem 2.25rem; }
html body [data-pv="case-studies"] [data-cs-card] h3, html body [data-cs-related] [data-cs-card] h3{ font-weight:300; font-size:clamp(1.375rem, 1.15rem + .55vw, 1.625rem); line-height:1.25; letter-spacing:-.015em; }
html body [data-pv="case-studies"] [data-cs-card] .post_description, html body [data-cs-related] [data-cs-card] .post_description{ font-size:1rem; line-height:1.6; }
@media (max-width:767px){ html body [data-pv="case-studies"] [data-cs-card] .post_body, html body [data-cs-related] [data-cs-card] .post_body{ padding:1.75rem 1.5rem 2rem; } }


/* Case Studies, fiche : études liées sur fond light ; le lien « tout voir » en encre */
html body [data-cs-related] [data-cs-all]{ color:#141238; border-bottom-color:rgba(20,18,56,.35); }

/* Règle globale des cartes (comme rp-card) : la carte se détache du fond de sa section.
   Section blanche → carte gris clair ; section light → carte blanche (verre clair) ; section sombre → verre sombre. */
html body .section_layout.is-light [data-cs-card]{ background:var(--af-glass); }

/* Header de la fiche : header réduit natif, comme la bibliothèque (sans image, retour 2026-11-20) ; mise en forme dans Webflow. */
/* catégories du header (fond sombre) en jaune, y compris les étiquettes CMS (règle des surtitres sur fond sombre) */
html body .featured-label-div .text-size-label,
html body .featured-label-div [data-cs-tag]{ color:var(--_colors---primary--yellow, #e1c721); }
/* décalage de la première catégorie : une liste CMS vide (produits ou aires) restait dans la ligne et ajoutait un écart avant elle */
html body .featured-label-div [data-cs-tags-list]:not(:has([data-cs-tag])){ display:none; }

`;

function injectCSS() {
  if (document.getElementById(CSS_ID)) return;
  const s = document.createElement('style');
  s.id = CSS_ID;
  s.textContent = CSS;
  document.head.appendChild(s);
}

const txt = el => (el ? el.textContent.trim() : '');
const isEmpty = el => !el || el.classList.contains('w-dyn-bind-empty') || !txt(el);
const slugify = s => s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const reduce = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Liens des cartes : l'API Webflow ne sait pas faire pointer un lien vers la fiche CMS en cours (il sort
   « detail_case-studies »). Chaque carte porte son slug en attribut ; le module écrit le vrai lien. */
function fixLinks(scope) {
  scope.querySelectorAll('[data-cs-slug]').forEach(holder => {
    const slug = holder.getAttribute('data-cs-slug');
    if (!slug) return;
    holder.querySelectorAll('[data-cs-link], a').forEach(a => a.setAttribute('href', '/case-studies/' + slug));
  });
}

/* masque les blocs « chiffre clé » sans valeur */
function hideEmptyStats(scope) {
  scope.querySelectorAll('[data-cs-stat]').forEach(el => { if (isEmpty(el.querySelector('[data-cs-stat-n]'))) el.setAttribute('data-cs-hidden', ''); });
  scope.querySelectorAll('[data-cs-kpi]').forEach(el => { if (isEmpty(el.querySelector('[data-cs-kpi-n]'))) el.setAttribute('data-cs-hidden', ''); });
}

/* ---------- bibliothèque : filtres Product + Therapeutic area ---------- */
export function initCaseStudiesLibrary(root) {
  if (root.dataset.pvInit) return () => {};
  root.dataset.pvInit = '1';
  injectCSS();
  hideEmptyStats(root);
  fixLinks(root);

  const names = kind => [...root.querySelectorAll(`[data-cs-source="${kind}"] [data-cs-name]`)].map(txt).filter(Boolean);
  const products = names('product');
  const areas = names('area');
  const cards = [...root.querySelectorAll('[data-cs-list] [data-cs-card]')].map(card => ({
    el: card.closest('.w-dyn-item') || card,
    card,
    p: [...card.querySelectorAll('[data-cs-tags-list="product"] .w-dyn-item')].map(txt).filter(Boolean),
    a: [...card.querySelectorAll('[data-cs-tags-list="area"] .w-dyn-item')].map(txt).filter(Boolean),
  }));

  const mount = root.querySelector('[data-cs-filters]');
  if (!mount) return () => {};
  mount.className = 'cs-filters';
  mount.innerHTML = `<div class="cs-pills" role="radiogroup" aria-label="Product"></div>
    <select class="filter-select" aria-label="Therapeutic area"></select>`;
  const pills = mount.querySelector('.cs-pills');
  const select = mount.querySelector('select');
  pills.innerHTML = ['All', ...products].map((n, i) =>
    `<button type="button" class="fs_radio_field" role="radio" data-p="${i ? slugify(n) : ''}">${n}</button>`).join('');
  // pastille blanche qui glisse d'une catégorie à l'autre (refonte)
  const ind = document.createElement('span');
  ind.className = 'cs-pill-ind'; ind.setAttribute('aria-hidden', 'true');
  pills.prepend(ind); pills.classList.add('has-ind');
  const placeInd = () => {
    const on = pills.querySelector('.fs_radio_field.is-list-active');
    if (!on) { ind.style.width = '0'; return; }
    ind.style.transform = `translateX(${on.offsetLeft}px)`; ind.style.width = on.offsetWidth + 'px';
  };
  const roInd = new ResizeObserver(placeInd); roInd.observe(pills);
  select.innerHTML = `<option value="">All therapeutic areas</option>` + areas.map(n => `<option value="${slugify(n)}">${n}</option>`).join('');

  const empty = document.createElement('div');
  empty.className = 'cs-empty';
  empty.hidden = true;
  empty.innerHTML = `<h3 class="heading-style-h4">No case study matches these filters yet.</h3><button type="button">Show all case studies</button>`;
  root.querySelector('[data-cs-list]')?.after(empty);

  const state = { product: '', area: '' };
  const u = new URLSearchParams(location.search);
  state.product = u.get('product') || '';
  state.area = u.get('area') || '';

  function render(animate) {
    pills.querySelectorAll('[data-p]').forEach(b => {
      const on = b.dataset.p === state.product;
      b.classList.toggle('is-list-active', on);
      b.setAttribute('aria-checked', on);
    });
    placeInd();
    select.value = state.area;
    let shown = 0;
    cards.forEach(c => {
      const ok = (!state.product || c.p.some(n => slugify(n) === state.product)) && (!state.area || c.a.some(n => slugify(n) === state.area));
      c.el.toggleAttribute('data-cs-hidden', !ok);
      c.card.classList.remove('cs-in');
      if (ok && animate && !reduce()) { c.card.style.setProperty('--i', shown); void c.card.offsetWidth; c.card.classList.add('cs-in'); }
      if (ok) shown++;
    });
    empty.hidden = shown > 0;
    const q = new URLSearchParams(location.search);
    state.product ? q.set('product', state.product) : q.delete('product');
    state.area ? q.set('area', state.area) : q.delete('area');
    history.replaceState(null, '', location.pathname + (q.toString() ? '?' + q : '') + location.hash);
  }

  const onPill = e => { const b = e.target.closest('[data-p]'); if (!b) return; state.product = b.dataset.p; render(true); };
  const onSelect = () => { state.area = select.value; render(true); };
  const onReset = () => { state.product = ''; state.area = ''; render(true); };
  pills.addEventListener('click', onPill);
  select.addEventListener('change', onSelect);
  empty.querySelector('button').addEventListener('click', onReset);
  render(false);

  return function destroy() {
    pills.removeEventListener('click', onPill);
    roInd.disconnect(); ind.remove();
    select.removeEventListener('change', onSelect);
    empty.remove();
  };
}

/* ---------- fiche ---------- */
/* Why it matters : icône choisie d'après l'intitulé du profil (style des icônes « glance » de Company).
   L'ordre compte : « Biostatisticians and clinical scientists » doit tomber sur les stats avant les sciences. */
const TEAM_ICONS = [
  [/patient/i, '<circle cx="40" cy="24" r="11"/><path d="M17 68c0-13 10.3-22 23-22s23 9 23 22"/>'],
  [/regulat|governance/i, '<path d="M40 10l24 9v18c0 16-10 27-24 33-14-6-24-17-24-33V19z"/><path d="M30 40l7 7 14-14"/>'],
  [/biostat|analyst/i, '<path d="M10 66h60"/><path d="M10 60C21 60 27 20 40 20S59 60 70 60"/><path d="M27 66V50M40 66V36M53 66V50"/>'],
  [/operation/i, '<path d="M28 14h24v9H28z"/><path d="M24 18h-4a4 4 0 0 0-4 4v42a4 4 0 0 0 4 4h40a4 4 0 0 0 4-4V22a4 4 0 0 0-4-4h-4"/><path d="M29 46l8 8 15-15"/>'],
  [/executive|finance|investor|founder/i, '<path d="M12 66h56"/><path d="M20 56V46M34 56V38M48 56V42M62 56V28"/><path d="M18 34l16-12 12 8 18-16"/><path d="M56 14h8v8"/>'],
  [/r&d|\bbd\b|leader/i, '<circle cx="40" cy="40" r="26"/><circle cx="40" cy="40" r="14"/><circle cx="40" cy="40" r="3"/>'],
  [/scien|medical|development/i, '<path d="M31 12h18"/><path d="M35 12v19L18 61a4 4 0 0 0 3.5 6h37a4 4 0 0 0 3.5-6L45 31V12"/><path d="M25 50h30"/>'],
];
const ICON_DEFAULT = '<circle cx="40" cy="40" r="26"/><circle cx="40" cy="40" r="14"/><circle cx="40" cy="40" r="3"/>';

function buildGlance(root) {
  const table = root.querySelector('[data-cs-table]');
  if (!table) return;
  const head = table.querySelector('[data-cs-row="head"]');
  const c3 = !isEmpty(head?.querySelector('[data-cs-cell="c3"]'));   // colonne 3 vide : tableau à 2 colonnes
  const cols = c3 ? 3 : 2;
  table.style.setProperty('--cs-cols', cols);
  table.classList.toggle('cs-3', c3);
  const heads = ['c1', 'c2', 'c3'].map(k => txt(head?.querySelector(`[data-cs-cell="${k}"]`)));
  table.querySelectorAll('[data-cs-row]').forEach(row => {
    if (row.dataset.csRow !== 'head' && isEmpty(row.querySelector('[data-cs-cell="c1"]'))) { row.setAttribute('data-cs-hidden', ''); return; }
    row.querySelectorAll('[data-cs-cell]').forEach(cell => {
      const k = cell.dataset.csCell;
      if (k === 'c3' && !c3) { cell.setAttribute('data-cs-hidden', ''); return; }
      if (k === (c3 ? 'c3' : 'c2')) cell.classList.add('cs-em');   // la dernière colonne porte le résultat
      if (k !== 'c1') cell.setAttribute('data-h', heads[k === 'c2' ? 1 : 2]);
    });
  });
  const note = table.querySelector('[data-cs-note]');
  if (isEmpty(note)) note?.setAttribute('data-cs-hidden', '');
}

function buildWhy(root) {
  root.querySelectorAll('[data-cs-why] li').forEach(li => {
    const s = li.querySelector('strong');
    if (!s || li.querySelector('.cs-ico')) return;
    s.textContent = s.textContent.replace(/\s*:\s*$/, '');
    const hit = TEAM_ICONS.find(([re]) => re.test(s.textContent));
    const ico = document.createElement('span');
    ico.className = 'cs-ico';
    ico.setAttribute('aria-hidden', 'true');
    ico.innerHTML = `<svg viewBox="0 0 80 80" fill="none" stroke="#E1C721" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round">${hit ? hit[1] : ICON_DEFAULT}</svg>`;
    li.prepend(ico);
  });
}

/* la FAQ arrive en rich text (H3 + paragraphe) ; elle devient un accordéon */
function buildFaq(root) {
  const rt = root.querySelector('[data-cs-faq]');
  if (!rt || rt.querySelector('.cs-acc')) return;
  const acc = document.createElement('div');
  acc.className = 'cs-acc';
  let q = null;
  [...rt.children].forEach(el => {
    if (el.tagName === 'H3') { q = el.textContent.trim(); return; }
    if (!q) return;
    const d = document.createElement('details');
    d.innerHTML = `<summary></summary><div class="cs-ans"><div></div></div>`;
    d.querySelector('summary').textContent = q;
    d.querySelector('summary').insertAdjacentHTML('beforeend', '<span class="cs-pm" aria-hidden="true"></span>');
    d.querySelector('.cs-ans > div').appendChild(el.cloneNode(true));
    acc.appendChild(d);
    q = null;
  });
  if (acc.children.length) { rt.innerHTML = ''; rt.appendChild(acc); }
}

export function initCaseStudy(root) {
  if (root.dataset.pvInit) return () => {};
  root.dataset.pvInit = '1';
  injectCSS();
  hideEmptyStats(root);
  fixLinks(root);
  buildGlance(root);
  buildWhy(root);
  buildFaq(root);

  const src = root.querySelector('[data-cs-source]');
  if (src && isEmpty(src.querySelector('[data-cs-source-text]'))) src.setAttribute('data-cs-hidden', '');

  // études liées : la liste en charge 4 dans l'ordre ; on retire l'étude en cours et on en garde 3
  const here = location.pathname.split('/').filter(Boolean).pop();
  let kept = 0;
  root.querySelectorAll('[data-cs-related] [data-cs-card]').forEach(card => {
    const item = card.closest('.w-dyn-item') || card;
    const drop = card.getAttribute('data-cs-slug') === here || kept >= 3;
    item.toggleAttribute('data-cs-hidden', drop);
    if (!drop) kept++;
  });

  return () => {};
}
