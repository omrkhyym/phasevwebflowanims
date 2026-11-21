/* Resources : bibliothèque (/resources) et article (template CMS /resources/<slug>).
   Comme pour Case Studies (décision de Romain, 2026-11-17) : pages pilotées par le CMS, le style reste dans ce module ;
   le client n'édite que le contenu. CSS repris du proto (protos/refonte-produits/_kit/affine.css, blocs Resources et heros Case Studies).
   Repères posés dans Webflow : data-af-lib sur le container de la liste, data-af-article sur le container du texte de l'article. */

const CSS_ID = 'pv-resources-css';
const CSS = `
html body [data-af-lib] .cs-pill-ind{ position:absolute; z-index:0; top:.3125rem; bottom:.3125rem; left:0; width:0; border-radius:999px; background:#fff; box-shadow:0 0 0 1px rgba(20,18,56,.08);
  transition:transform .45s cubic-bezier(.22,1,.36,1), width .45s cubic-bezier(.22,1,.36,1); pointer-events:none; }
html body .cs-filters .filter-select{ height:auto; padding:.9375rem 2.75rem .9375rem 1.375rem; border:0; border-radius:999px; background:#f1f0f6 no-repeat right 1.25rem center / .625rem;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' fill='none' stroke='%23141238' stroke-width='1.2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  box-shadow:inset 0 0 0 1px rgba(20,18,56,.05); -webkit-appearance:none; appearance:none;
  font-family:var(--af-mono, "Roboto Mono", monospace); font-size:.75rem; letter-spacing:.1em; text-transform:uppercase; color:#141238; cursor:pointer; }
@media (prefers-reduced-motion:reduce){ html body [data-af-lib] .cs-pill-ind{ transition:none; } }
:root{--af-mono:'Roboto Mono',ui-monospace,Consolas,monospace;--af-violet:#684a9e;--af-edge:linear-gradient(150deg,rgba(20,18,56,.18) 0%,rgba(20,18,56,.06) 40%,rgba(20,18,56,.04) 75%,rgba(104,74,158,.2) 100%)}
/* Case Studies, catégories au-dessus du titre (hero et cartes de la bibliothèque) : séparées par une barre verticale fine */
html body .featured-label-div{ display:flex; flex-wrap:wrap; align-items:center; gap:.25rem .75rem; }
html body .featured-label-div > .text-size-label + .text-size-label::before,
html body [data-cs-tags] [data-cs-tag]::before{ content:''; display:inline-block; width:1px; height:.9em; margin-right:.75rem; vertical-align:-.1em; background:currentColor; opacity:.35; }
html body [data-cs-tags], html body [data-cs-tags] [data-cs-tags-list] .w-dyn-items{ gap:.25rem .75rem; }
/* pas de barre avant la toute première catégorie (y compris quand la liste des produits est vide) */
html body [data-cs-tags] > [data-cs-tags-list]:first-child .w-dyn-item:first-child [data-cs-tag]::before,
html body [data-cs-tags] > [data-cs-tags-list]:has(.w-dyn-empty) + [data-cs-tags-list] .w-dyn-item:first-child [data-cs-tag]::before{ display:none; }

/* Header de l'article : header réduit natif, comme la bibliothèque (sans image, retour 2026-11-20) ; mise en forme dans Webflow. */
/* catégories du header (fond sombre) en jaune, y compris les étiquettes CMS (règle des surtitres sur fond sombre) */
html body .featured-label-div .text-size-label,
html body .featured-label-div [data-cs-tag]{ color:var(--_colors---primary--yellow, #e1c721); }
/* décalage de la première catégorie : une liste CMS vide (produits ou aires) restait dans la ligne et ajoutait un écart avant elle */
html body .featured-label-div [data-cs-tags-list]:not(:has([data-cs-tag])){ display:none; }


/* ===================== Resources (bibliothèque et article) =====================
   Mêmes règles que Case Studies. Le header de l'article (header réduit, comme la bibliothèque) reprend déjà
   les règles des heros Case Studies. Les filtres sont ceux de Finsweet (radios + recherche), la liste est la liste CMS. */

/* marges réduites autour des filtres */
html body .padding-section-large:has(> [data-af-lib]){ padding-top:1.5rem; }
html body [data-af-lib] .filter-form-wrapper{ margin-bottom:1.25rem; }
html body [data-af-lib] .filter_form_block{ margin:0; }
html body [data-af-lib] .filter_form{ display:flex; justify-content:space-between; align-items:center; gap:1rem 2rem; flex-wrap:wrap; margin:0; }
html body [data-af-lib] .filter_block{ margin:0; }
@media (max-width:991px){ html body .padding-section-large:has(> [data-af-lib]){ padding-top:1.25rem; } html body [data-af-lib] .filter-form-wrapper{ margin-bottom:1rem; } }

/* catégories : barre segmentée (même habillage que Case Studies), la pastille blanche glisse (affine.js) */
html body [data-af-lib] .filter_block.margin-bottom{ position:relative; isolation:isolate; display:inline-flex; flex-wrap:nowrap; gap:0; max-width:100%; padding:.3125rem; border-radius:999px;
  background:#f1f0f6; box-shadow:inset 0 0 0 1px rgba(20,18,56,.05); overflow-x:auto; scrollbar-width:none; }
html body [data-af-lib] .filter_block.margin-bottom::-webkit-scrollbar{ display:none; }
html body [data-af-lib] .filter_list-wrapper, html body [data-af-lib] .filter_list, html body [data-af-lib] .filter_item{ display:contents; }
html body [data-af-lib] .fs_radio_field{ position:relative; z-index:1; flex:none; display:flex; align-items:center; margin:0; padding:.625rem 1.125rem; border-radius:999px; cursor:pointer;
  font-family:var(--af-mono, "Roboto Mono", monospace); font-size:.75rem; letter-spacing:.1em; text-transform:uppercase; color:#6b6890; background:transparent; transition:color .3s; }
@media (hover:hover){ html body [data-af-lib] .fs_radio_field:hover{ color:#141238; } }
html body [data-af-lib] .fs_radio_button{ display:none; }
html body [data-af-lib] .fs_radio_label{ margin:0; font:inherit; letter-spacing:inherit; color:inherit; cursor:pointer; }
html body [data-af-lib] .fs_radio_field.is-list-active, html body [data-af-lib] .fs_radio_field:has(input:checked){ color:#141238; background:#fff; box-shadow:0 0 0 1px rgba(20,18,56,.08); }
html body [data-af-lib] .has-ind .fs_radio_field.is-list-active, html body [data-af-lib] .has-ind .fs_radio_field:has(input:checked){ background:transparent; box-shadow:none; }
/* recherche : pastille assortie, loupe à gauche */
html body [data-af-lib] .filter_search{ height:auto; width:20rem; max-width:100%; margin:0; padding:.9375rem 1.375rem .9375rem 2.75rem; border:0; border-radius:999px;
  background:#f1f0f6 no-repeat 1.25rem center / .875rem; box-shadow:inset 0 0 0 1px rgba(20,18,56,.05);
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 14 14'%3E%3Ccircle cx='6' cy='6' r='4.5' fill='none' stroke='%23141238' stroke-width='1.2'/%3E%3Cpath d='M9.5 9.5L13 13' stroke='%23141238' stroke-width='1.2' stroke-linecap='round'/%3E%3C/svg%3E");
  font-family:var(--af-mono, "Roboto Mono", monospace); font-size:.75rem; letter-spacing:.1em; text-transform:uppercase; color:#141238; }
html body [data-af-lib] .filter_search::placeholder{ color:#6b6890; }
html body [data-af-lib] .filter_search:focus{ outline:none; box-shadow:inset 0 0 0 1px rgba(20,18,56,.3); }
@media (max-width:767px){ html body [data-af-lib] .filter_search{ width:100%; } }

/* cartes : la carte claire de la bibliothèque Case Studies (section blanche → carte gris clair), image collée en haut, 3 par ligne */
html body [data-af-lib] .resource-list{ display:grid; grid-template-columns:repeat(3, minmax(0,1fr)); gap:3rem; }
@media (max-width:991px){ html body [data-af-lib] .resource-list{ grid-template-columns:repeat(2, minmax(0,1fr)); gap:2.5rem 2rem; } }
@media (max-width:599px){ html body [data-af-lib] .resource-list{ grid-template-columns:1fr; gap:2rem; } }
html body [data-af-lib] .resource-item{ width:auto; max-width:none; }
html body [data-af-lib] .swiper-item{ position:relative; isolation:isolate; display:flex; flex-direction:column; height:100%; padding:0; border-radius:1.25rem; overflow:hidden; border:0; box-shadow:none;
  color:#141238; text-decoration:none; background:linear-gradient(155deg, #f6f6f9 0%, #eeedf4 100%); transition:transform .4s cubic-bezier(.22,1,.36,1); }
html body [data-af-lib] .swiper-item::before{ content:''; position:absolute; inset:0; border-radius:inherit; padding:.5px; pointer-events:none; z-index:2; background:var(--af-edge);
  -webkit-mask:linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0); -webkit-mask-composite:xor; mask-composite:exclude; }
html body [data-af-lib] .swiper-item:hover{ transform:translateY(-4px); }
html body [data-af-lib] .swiper-item .post_image{ display:block; width:100% !important; max-width:none; height:auto; aspect-ratio:16/9; object-fit:cover; margin:0 !important; border-radius:0 !important; }
html body [data-af-lib] .swiper-item .post_body{ display:flex; flex-direction:column; gap:1.25rem; flex:1; padding:2rem 2rem 2.25rem; background:none; }
html body [data-af-lib] .post-data-wrapper{ display:flex; flex-wrap:wrap; align-items:center; gap:.25rem .75rem; }
html body [data-af-lib] .post_date{ font-family:var(--af-mono, "Roboto Mono", monospace); font-size:.6875rem; letter-spacing:.12em; text-transform:uppercase; color:var(--af-violet, #5b4fb0); }
html body [data-af-lib] .post_date + .post_date::before{ content:''; display:inline-block; width:1px; height:.9em; margin-right:.75rem; vertical-align:-.1em; background:currentColor; opacity:.35; }
html body [data-af-lib] .swiper-item h3{ margin:0; font-weight:300; font-size:clamp(1.375rem, 1.15rem + .55vw, 1.625rem); line-height:1.25; letter-spacing:-.015em; color:#141238; }
html body [data-af-lib] .swiper-item .post_description{ font-size:1rem; line-height:1.6; color:#4a4868; }
html body [data-af-lib] .swiper-item .post_description.w-dyn-bind-empty{ display:none; }
@media (max-width:767px){ html body [data-af-lib] .swiper-item .post_body{ padding:1.75rem 1.5rem 2rem; } }
@media (prefers-reduced-motion:reduce){ html body [data-af-lib] .swiper-item{ transition:none; } html body [data-af-lib] .swiper-item:hover{ transform:none; } }

/* article : le corps du texte en style affiné (Roboto, intertitres légers, liens et listes violets, images arrondies) */
html body [data-af-article] .post-rtf{ font-size:var(--_typography---body-l, 1.125rem); line-height:1.6; color:#2b2a48; }
/* tous les paragraphes avec le même sélecteur, la même taille et le même interligne (Webflow fixe sa propre taille sur .post-rtf p) */
html body [data-af-article] .post-rtf p{ margin:0 0 1.25rem; font-size:var(--_typography---body-l, 1.125rem); line-height:1.6; font-weight:400; color:#2b2a48; }   /* interligne 1.6, comme les paragraphes des autres pages */
html body [data-af-article] .post-rtf h2, html body [data-af-article] .post-rtf h3, html body [data-af-article] .post-rtf h4{ margin:2.5rem 0 1rem; font-weight:400; line-height:1.25; letter-spacing:-.01em; color:#141238; }
html body [data-af-article] .post-rtf h2{ font-size:clamp(1.75rem, 1.4rem + 1vw, 2.25rem); font-weight:300; }
html body [data-af-article] .post-rtf h3{ font-size:1.75rem; font-weight:300; }
html body [data-af-article] .post-rtf h4{ font-size:1.5rem; }
html body [data-af-article] .post-rtf h2 strong, html body [data-af-article] .post-rtf h3 strong, html body [data-af-article] .post-rtf h4 strong{ font-weight:inherit; }
html body [data-af-article] .post-rtf > :first-child{ margin-top:0; }
html body [data-af-article] .post-rtf strong{ font-weight:500; color:#141238; }
html body [data-af-article] .post-rtf a{ color:#5b4fb0; text-decoration:underline; text-decoration-thickness:1px; text-underline-offset:.2em; }
html body [data-af-article] .post-rtf ul, html body [data-af-article] .post-rtf ol{ margin:0 0 1.5rem; padding:0; list-style:none; display:flex; flex-direction:column; gap:.75rem; }
html body [data-af-article] .post-rtf ul li{ position:relative; padding-left:1.75rem; }
html body [data-af-article] .post-rtf ul li::before{ content:''; position:absolute; left:0; top:.85em; width:1rem; height:1.5px; background:#928acd; }
html body [data-af-article] .post-rtf ol{ counter-reset:a; }
html body [data-af-article] .post-rtf ol li{ counter-increment:a; position:relative; padding-left:2.75rem; }
html body [data-af-article] .post-rtf ol li::before{ content:counter(a, decimal-leading-zero); position:absolute; left:0; top:.15em; width:2rem; height:2rem; border-radius:50%;
  border:1px solid rgba(146,138,205,.4); display:grid; place-items:center; font-family:var(--af-mono, "Roboto Mono", monospace); font-size:.6875rem; color:#141238; }
html body [data-af-article] .post-rtf blockquote{ margin:2rem 0; padding:0 0 0 1.5rem; border-left:2px solid #928acd; font-weight:300; font-size:1.375rem; line-height:1.5; color:#141238; }
html body [data-af-article] .post-rtf figure{ margin:2.5rem 0; }
html body [data-af-article] .post-rtf img{ border-radius:1.25rem; }
html body [data-af-article] .post-rtf figcaption{ margin-top:.75rem; font-size:.875rem; color:#6b6890; }
@media (max-width:767px){ html body [data-af-article] .post-rtf, html body [data-af-article] .post-rtf p{ font-size:1.0625rem; } html body [data-af-article] .post-rtf h4{ font-size:1.3125rem; } }

/* Resources, filtres (retour de Romain) : catégories à gauche, recherche à droite, comme Case Studies.
   Webflow passe le formulaire en colonne inversée sous 992 px (recherche au-dessus) : on force la ligne. */
html body [data-af-lib] .filter_form{ flex-flow:row wrap; justify-content:space-between; }
html body [data-af-lib] .filter_block{ width:auto; flex:0 1 auto; overflow:visible; }
html body [data-af-lib] .filter_block.margin-bottom{ margin-bottom:0; padding-bottom:.3125rem; overflow-x:auto; }
html body [data-af-lib] .filter_block:not(.margin-bottom){ margin-left:auto; }
html body [data-af-lib] .filter_search{ min-width:0; min-height:0; }
@media (max-width:767px){ html body [data-af-lib] .filter_block:not(.margin-bottom){ margin-left:0; width:100%; } }
/* mobile (recette 2026-11-20) : Webflow passe filter_block en colonne, les catégories s'empilaient.
   Barre sur une ligne qui défile au doigt ; fondu sur le bord où il reste des catégories cachées */
html body [data-af-lib] .filter_block.margin-bottom{ flex-direction:row; }
html body [data-af-lib] .filter_block.margin-bottom.is-more-r{ -webkit-mask-image:linear-gradient(90deg,#000 calc(100% - 3rem),transparent); mask-image:linear-gradient(90deg,#000 calc(100% - 3rem),transparent); }
html body [data-af-lib] .filter_block.margin-bottom.is-more-l{ -webkit-mask-image:linear-gradient(90deg,transparent,#000 3rem); mask-image:linear-gradient(90deg,transparent,#000 3rem); }
html body [data-af-lib] .filter_block.margin-bottom.is-more-l.is-more-r{ -webkit-mask-image:linear-gradient(90deg,transparent,#000 3rem,#000 calc(100% - 3rem),transparent); mask-image:linear-gradient(90deg,transparent,#000 3rem,#000 calc(100% - 3rem),transparent); }

/* Resources, article (retour de Romain : trop centré, trop étroit, pas de variation) : sur le modèle du récit des fiches Case Studies.
   Largeur des autres pages ; intertitres à gauche, numérotés dans un repère rond, alignés sur leur premier paragraphe ;
   texte à droite ; premier paragraphe en chapeau ; images et citations sur toute la largeur. */
html body [data-af-article]{ max-width:min(100%, 90rem); }
html body [data-af-article] .post-rtf{ display:grid; grid-template-columns:minmax(0,4fr) minmax(0,8fr); column-gap:4rem; align-items:start; counter-reset:afh; }
html body [data-af-article] .post-rtf > *{ grid-column:2; max-width:46rem; }
html body [data-af-article] .post-rtf > :is(h2,h3,h4){ grid-column:1; max-width:none; margin:4rem 0 0; padding-top:0;
  font-weight:300; font-size:clamp(1.625rem, 1.3rem + .9vw, 2.125rem); line-height:1.2; letter-spacing:-.015em; color:#141238; }
html body [data-af-article] .post-rtf > :is(h2,h3,h4)::before{ counter-increment:afh; content:counter(afh, decimal-leading-zero); display:grid; place-items:center; width:2.75rem; height:2.75rem;
  margin-bottom:1.25rem; border-radius:50%; border:1px solid rgba(146,138,205,.4); font-family:var(--af-mono, "Roboto Mono", monospace); font-size:.8125rem; letter-spacing:.06em; font-weight:400; color:#141238; }
html body [data-af-article] .post-rtf > :is(h2,h3,h4) + *{ margin-top:4rem; }
html body [data-af-article] .post-rtf > :first-child, html body [data-af-article] .post-rtf > :first-child + *{ margin-top:0; }
html body [data-af-article] .post-rtf > :is(figure, blockquote, .w-richtext-figure-type-image, .w-embed){ grid-column:1 / -1; max-width:none; }
html body [data-af-article] .post-rtf > blockquote{ margin:4rem 0; padding:2.5rem 0; border:0; border-top:1px solid rgba(20,18,56,.1); border-bottom:1px solid rgba(20,18,56,.1);
  font-weight:300; font-size:clamp(1.75rem, 1.3rem + 1.4vw, 2.5rem); line-height:1.25; letter-spacing:-.015em; }
@media (max-width:991px){
  html body [data-af-article] .post-rtf{ display:block; }
  html body [data-af-article] .post-rtf > *{ max-width:none; }
  html body [data-af-article] .post-rtf > :is(h2,h3,h4){ margin:3rem 0 1.25rem; }
  html body [data-af-article] .post-rtf > :is(h2,h3,h4) + *{ margin-top:0; }
}

/* Resources, article : sans numéros devant les intertitres (retour de Romain) */
html body [data-af-article] .post-rtf > :is(h2,h3,h4)::before{ content:none; display:none; }

/* Resources, article, révision (retour de Romain : tailles irrégulières, trous après les phrases courtes) :
   - plus de chapeau : tous les paragraphes à la même taille et la même graisse (seul le gras du texte reste) ;
   - l'intertitre est posé dans la marge de gauche, hors du flux (position absolue), au lieu d'une grille dont la ligne prenait
     la hauteur de l'intertitre et creusait un trou sous un paragraphe court ; même retrait en haut pour les deux, donc alignés. */
html body [data-af-article] .post-rtf{ display:block; position:relative; padding-left:calc(33.333% + 2rem); }
html body [data-af-article] .post-rtf > *{ max-width:46rem; }
html body [data-af-article] .post-rtf > :is(h2,h3,h4){ position:absolute; left:0; width:calc(33.333% - 2rem); margin:0; padding-top:3.5rem; }
html body [data-af-article] .post-rtf > :is(h2,h3,h4) + *{ margin-top:0; padding-top:3.5rem; }
html body [data-af-article] .post-rtf > :first-child, html body [data-af-article] .post-rtf > :first-child + *{ padding-top:0; }
html body [data-af-article] .post-rtf > :is(figure, blockquote, .w-richtext-figure-type-image, .w-embed){ margin-left:calc(-50% - 3rem); max-width:none; }   /* = le retrait de gauche, exprimé en largeur du texte */
@media (max-width:991px){
  html body [data-af-article] .post-rtf{ padding-left:0; }
  html body [data-af-article] .post-rtf > :is(h2,h3,h4){ position:static; width:auto; margin:3rem 0 1.25rem; padding-top:0; }
  html body [data-af-article] .post-rtf > :is(h2,h3,h4) + *{ padding-top:0; }
  html body [data-af-article] .post-rtf > :is(figure, blockquote, .w-richtext-figure-type-image, .w-embed){ margin-left:0; }
}
/* paragraphes vides servant d'espaceurs dans Webflow : masqués par affine.js (classe af-empty) ; un seul espace régulier */
html body [data-af-article] .post-rtf > p.af-empty{ display:none; }
/* images et embeds dans la colonne du texte (retour de Romain, 2026-11-20 : en pleine largeur ils débordaient sur la colonne
   des intertitres et passaient sous eux) ; les citations restent en pleine largeur. Webflow met les figures en display:table. */
html body [data-af-article] .post-rtf > :is(figure, .w-richtext-figure-type-image, .w-embed){ margin-left:0; margin-right:0; width:100%; max-width:46rem; }
html body [data-af-article] .post-rtf > figure.w-richtext-figure-type-image{ display:block; }
html body [data-af-article] .post-rtf > figure.w-richtext-figure-type-image > div{ display:block; max-width:100%; }
html body [data-af-article] .post-rtf > figure img{ display:block; width:100%; height:auto; }

/* Publications & Media (2026-11-20) : la Main Image est un logo blanc sur transparent (logos/build_white_logos.py),
   posé au centre d'un panneau violet foncé à la place de la photo. Le logo tient dans 58 % de la largeur et 34 % de la hauteur
   (padding en % de la largeur : 21 % de chaque côté, 18,6 % en haut et en bas sur un 16:9). Carte repérée par initResourcesLibrary. */
html body [data-af-lib] .swiper-item[data-af-logo] .post_image{ box-sizing:border-box; aspect-ratio:16/9; object-fit:contain; padding:18.6% 21%;
  background:radial-gradient(70% 90% at 15% 0%, rgba(146,138,205,.28) 0%, transparent 60%), radial-gradient(60% 80% at 100% 100%, rgba(104,74,158,.35) 0%, transparent 65%), #1E1846; }

`;

function injectCSS() {
  if (document.getElementById(CSS_ID)) return;
  const s = document.createElement('style');
  s.id = CSS_ID;
  s.textContent = CSS;
  document.head.appendChild(s);
}

/* catégories (radios Finsweet) : la pastille blanche glisse d'une catégorie à l'autre */
function segmented(bar) {
  if (bar.dataset.pvSeg) return () => {};
  bar.dataset.pvSeg = '1';
  const ind = document.createElement('span');
  ind.className = 'cs-pill-ind'; ind.setAttribute('aria-hidden', 'true');
  bar.prepend(ind); bar.classList.add('has-ind');
  const place = () => {
    const on = bar.querySelector('.fs_radio_field.is-list-active') || [...bar.querySelectorAll('.fs_radio_field')].find(l => l.querySelector('input:checked'));
    if (!on) { ind.style.width = '0'; return; }
    ind.style.transform = `translateX(${on.offsetLeft}px)`; ind.style.width = on.offsetWidth + 'px';
  };
  // barre plus large que l'écran (mobile) : fondu côté caché, catégorie choisie recentrée
  const edges = () => {
    const max = bar.scrollWidth - bar.clientWidth;
    bar.classList.toggle('is-more-l', max > 1 && bar.scrollLeft > 1);
    bar.classList.toggle('is-more-r', max > 1 && bar.scrollLeft < max - 1);
  };
  const reveal = e => {
    place();
    // la catégorie touchée : la classe active de Finsweet n'est pas encore à jour à ce moment
    const on = e.target.closest && e.target.closest('.fs_radio_field');
    if (on && bar.scrollWidth > bar.clientWidth) bar.scrollTo({ left: on.offsetLeft - (bar.clientWidth - on.offsetWidth) / 2, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  };
  const mo = new MutationObserver(place); mo.observe(bar, { subtree: true, attributes: true, attributeFilter: ['class'] });
  const onResize = () => { place(); edges(); };
  const ro = new ResizeObserver(onResize); ro.observe(bar);
  bar.addEventListener('change', reveal);
  bar.addEventListener('scroll', edges, { passive: true });
  place(); edges();
  document.fonts?.ready.then(onResize);   // la largeur des libellés change quand Roboto Mono arrive
  return () => { mo.disconnect(); ro.disconnect(); bar.removeEventListener('change', reveal); bar.removeEventListener('scroll', edges); ind.remove(); bar.classList.remove('has-ind', 'is-more-l', 'is-more-r'); delete bar.dataset.pvSeg; };
}

export function initResourcesLibrary(root) {
  if (!root || root.dataset.pvInit) return () => {};
  root.dataset.pvInit = '1';
  injectCSS();
  const offs = [...root.querySelectorAll('.filter_block.margin-bottom')].map(segmented);
  // cartes dont l'image est un logo blanc : catégorie réglable par l'attribut data-af-logo-cat du conteneur
  const logoCat = (root.dataset.afLogoCat || 'Publications & Media').trim();
  const logos = [...root.querySelectorAll('.swiper-item')].filter(a => {
    const c = a.querySelector('[fs-list-field="category"]');
    return c && c.textContent.trim() === logoCat;
  });
  logos.forEach(a => { a.dataset.afLogo = ''; });
  return function destroy() { offs.forEach(f => f()); logos.forEach(a => delete a.dataset.afLogo); delete root.dataset.pvInit; };
}

export function initResourcesArticle(root) {
  if (!root || root.dataset.pvInit) return () => {};
  root.dataset.pvInit = '1';
  injectCSS();
  // paragraphes vides (espaceurs ajoutés dans l'éditeur Webflow) masqués : un seul espace régulier entre les paragraphes
  root.querySelectorAll('.post-rtf > p').forEach(p => {
    if (!p.textContent.replace(/[\s​‌‍﻿]/g, '') && !p.querySelector('img, iframe, video')) p.classList.add('af-empty');
  });
  return function destroy() { delete root.dataset.pvInit; };
}
