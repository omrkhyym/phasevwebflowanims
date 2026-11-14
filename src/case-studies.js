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

/* ---------- header de la bibliothèque : chiffre clé et lien des cas mis en avant ---------- */
export function initCaseStudiesFeatured(root) {
  if (root.dataset.pvInit) return () => {};
  root.dataset.pvInit = '1';
  injectCSS();
  hideEmptyStats(root);
  fixLinks(root);   // le bouton « Read the case » : le slug est porté par son conteneur
  return () => {};
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
