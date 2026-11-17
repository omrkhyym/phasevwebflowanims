# Manifest PhaseV-anims

Journal de tout ce qui a été fait sur le repo et sur le site Webflow PhaseV. Chaque modification future y est ajoutée, en haut du journal, avec sa date.

## État actuel (22 octobre 2026)

### Pages animées

| Page | ID Webflow | Entrée | Tag du loader | Points de montage |
|---|---|---|---|---|
| Home | `6a7494c19b6df905487ffd48` | `main.js` | `v0.12.1` | `hero-homepage` et `gantt` (dans des embeds HTML), `platform-hub` (div), `platform-tabs` (div sans module), `evidence-bars` (bloc des barres de la carte `ev-case`) |
| Home DEV | `6ac94d28fa53acb3a833343b` | `main.js` | `v0.2.0` | mêmes points que Home ; loader non standard (`const s` global) |
| Company | `6a841e56404f040c0e6bc5cc` | `company.js` | `v0.11.0` | `company-hero` (attribut sur le header du hero), `company-careers` (attribut sur l'embed du bloc Build with us) |
| ClinOps Optimizer | `6a7d9a55a0f59e17da317ab6` | `clinops.js` | `v0.17.0` | `clinops-hero-bg`, `clinops-hero-slot` ; refonte : `clinops-proof-glossy` (dans `.ss-anim` du bloc Proof, chiffres en attributs `data-sites`, `data-rec`, `data-other`, `data-gain`), `platform-connect-v2`, `faq` |
| Response Optimizer | `6a7efdffc7cdcaeee09a8ad5` | `response.js` | `v0.16.0` | `response-hero-bg`, `response-hero-slot` ; refonte : `viz` (deux `.rp-viz` dans les panneaux vidéo, `data-mode` precision et split), `platform-connect-v2`, `faq` |
| Trial Optimizer | `6a7f24a28679cdce6cd676e7` | `trial.js` | `v0.15.1` | `trial-hero-bg`, `trial-hero-slot` ; refonte : `design-space-glossy` (dans `.ss-anim` de la success story), `platform-connect-v2` (dans `.animation-wrapper` du bloc plateforme), `faq` (sur `.faq-wrap`) |
| Toutes (code global) | site | `site.js` | `v0.15.1` | fond flottant, line field ; refonte : fond sombre animé sur `header.section_header`, `[data-af-bg]`, `.feature-grid > .video-animation` ; FAQ sur `[data-pv="faq"]` |
| Portfolio Optimizer | `6a7eebc5135141aa80fab3ff` | `portfolio.js` | `v0.6.0` | `portfolio-hero-bg`, `portfolio-hero-slot`, `platform-connect` |
| AI Conductor | `6a7dcf32f8a4279d35e73b0c` | `conductor.js` | `v0.6.0` | `conductor-hero-bg`, `conductor-hero-slot`, `platform-connect` (dans un `.animation-wrapper` créé à la place de l'`.entry-grid`) |
| BonV | `6ae8c9c3671fb0d99ba262dc` | `bonv.js` | `v0.13.0` | `bonv-hero-bg` (premier enfant du header), `bonv-hero-slot` (dernier enfant de la grille) |
| Case Studies (`/case-studies`, hors menu) | `6af79c8af6cee4c14dd8916a` | `case-studies.js` | `v0.14.1` | `case-studies` (attribut sur le `container-large` de la section des cartes), slider `[data-swiper="feature"]` du header |
| Case Studies Template | `6af799a98b87e257e4ed1db0` | `case-studies.js` | `v0.14.1` | `case-study` (attribut sur `main-wrapper`) |

### Modules

| Fichier | Rôle |
|---|---|
| `src/hero-homepage.js` | Hero de la Home (WebGL2), CSS injecté via `:has()` |
| `src/gantt.js` | Gantt de la Home |
| `src/evidence-bars.js` | Barres du cas Evidence de la Home : largeur depuis `data-value` / `data-max`, entrée animée à l'écran |
| `src/platform-hub.js` | Hub plateforme de la Home |
| `src/company-hero-lines.js` | Line field du hero Company (pistes façon swimmer plot, loupe au pointeur) |
| `src/company-careers.js` | Populations qui fusionnent, bloc Build with us de Company |
| `src/hero-stage.js` | Socle partagé des heros produit à deux modes (voir plus bas) |
| `src/clinops-hero-bg.js` | Carte du monde en points, sites qui s'allument |
| `src/response-hero-bg.js` | Nuage de patients trié par score pronostique |
| `src/trial-hero-bg.js` | Courbes de puissance avec balayage |
| `src/portfolio-hero-bg.js` | Diagramme en tornade |
| `src/conductor-hero-bg.js` | Chaîne documentaire de six pages |
| `src/bonv-hero-bg.js` | Réponse écrite en streaming sur six lignes de points, dernier mot en jaune à la décision |
| `src/platform-connect.js` | Bloc « plateforme connectée » des cinq pages produit : particules, cinq amas, flux entre produits (proto `protos/site/phasev-platform-particles-proto.html`). Produit central via `data-current`, noms surchargeables par `data-name-<clé>` |
| `src/clinops-workflow.js` | Bande « The ClinOps workflow » : une population de particules, patients puis sites puis plan d'enrôlement, quatre étapes et reforecast (proto `protos/clinops/phasev-clinops-workflow-proto.html`) |
| `src/clinops-proof.js` | Bloc Proof de ClinOps : levée d'aveugle, 357 sites, moyennes 0.43 / 0.28, accolade +53 % (proto `protos/clinops/phasev-clinops-proof-proto.html`). Chiffres en attributs : `data-sites`, `data-rec`, `data-other`, `data-gain` |
| `src/clinops-proof-glossy.js` | Refonte : bloc Proof de ClinOps sur fond sombre (copie du kit `protos/refonte-produits/_kit/clinops-proof-glossy.js`), mêmes attributs que `clinops-proof`. `clinops.js` ne monte plus `clinops-proof`, `clinops-workflow` ni `platform-connect` v1 (blocs absents de la page) |
| `src/case-studies.js` | Case Studies : filtres Product et Therapeutic area (pilules `fs_radio_field`, liste `filter-select`, paramètres d'URL `?product=` et `?area=`), lien et chiffre clé des cas mis en avant, tableau At a glance (lignes et colonne 3 vides masquées), récit, cartes Why it matters avec icône, FAQ en accordéon, source facultative, 3 études liées sans l'étude en cours. CSS injecté, ciblé par attributs `data-cs-*` (proto `protos/case-studies/phasev-case-studies-protos.html`) |
| `src/success-design-space.js` | Success story Trial Optimizer : nuage de designs simulés, cible 90 %, design retenu N 574 (proto 1 de `protos/trial/phasev-success-story-protos.html`) |

### Socle des heros produit (`src/hero-stage.js`)

- Deux points de montage par page :
  - `<div data-pv="<nom>-hero-bg"></div>`, premier enfant du header du hero : fond plein cadre au-dessus de 991 px ;
  - `<div data-pv="<nom>-hero-slot"></div>`, dernier enfant de la grille `header_content` : bloc 4:3 à 991 px et moins.
- Un seul canvas, déplacé d'un emplacement à l'autre au changement de breakpoint, et une seule boucle.
- CSS injecté et ciblé avec `:has()` : aucune classe Webflow n'est modifiée.
- Sans slot sur la page, l'animation reste en fond à toutes les tailles.
- En mode bloc : pleine opacité, sans parallaxe.
- Sur tablette, la colonne de texte `header_content-left` est réglée en « Order : Last » dans le Designer, donc le bloc s'affiche au-dessus du texte. C'est un réglage d'élément, invisible dans l'API, qu'on retrouve dans le CSS publié.
- Le build produit des chunks partagés, à commiter avec `dist/`. Depuis `v0.13.0`, `hero-stage` sert aux six pages produit et `platform-connect` aux cinq premières (pas BonV) : Vite produit `dist/hero-stage-<hash>.mjs` et `dist/platform-connect-<hash>.mjs`. De `v0.6.0` à `v0.12.1`, les deux étaient réunis dans `dist/platform-connect-<hash>.mjs`. Les pages restent sur leur tag : un redécoupage ne les touche qu'à leur prochaine release.

### Releases

| Tag | Commit | Contenu |
|---|---|---|
| `v0.1.0` | `e791c4a` | Hero et gantt de la Home |
| `v0.2.0` | `7e8b0a3` | Entrée Company (hero lines, careers), platform-hub sur la Home |
| `v0.3.0` | `107ab12` | Fonds animés des heros ClinOps, Response, Trial, Portfolio |
| `v0.4.0` | `591d543` | Hero AI Conductor, socle `hero-stage`, mode bloc mobile sur les cinq heros produit |
| `v0.5.0` | `fc6e0a4` | Success story Trial Optimizer (`success-design-space`) ; seul `dist/trial.js` change |
| `v0.17.0` | (voir journal) | Refonte, ClinOps : `clinops.js` monte `clinops-proof-glossy` et le bloc plateforme en cartes, ne monte plus les anciens blocs ; `dist/response.js` et `dist/trial.js` régénérés (ordre des imports seulement, pages non concernées) |
| `v0.16.0` | (voir journal) | Refonte, Response : `response.js` ajoute les graphes animés (`src/viz.js`, `data-pv="viz"` + `data-mode`) et le bloc plateforme en cartes ; nouveau chunk partagé `platform-connect-cards-C5Y4IjAO.mjs` (Trial et Response) ; `dist/trial.js` l'importe désormais (sans effet en ligne tant que Trial reste en `v0.15.1`) |
| `v0.15.1` | (voir journal) | Refonte, pilote Trial : `site.js` charge le fond sombre animé (`src/dark-bg.js`, palette « mid » à 60 %, sur `header.section_header`, `[data-af-bg]` et `.feature-grid > .video-animation`) et la FAQ native (`src/faq.js`, sur `[data-pv="faq"]`) ; `trial.js` ajoute la success story sombre (`src/design-space-glossy.js`, `data-pv="design-space-glossy"`) et le bloc plateforme en cartes (`src/platform-connect-cards.js`, `data-pv="platform-connect-v2"`) ; seuls `dist/site.js` et `dist/trial.js` changent |
| `v0.15.0` | `c14b7be` | **Tag créé par erreur, à ne pas utiliser** : pointe sur le commit des protos, `dist/` identique à `v0.14.1` |
| `v0.14.1` | `acf42af` | Case Studies : liens des cartes écrits depuis l'attribut `data-cs-slug` ; seul `dist/case-studies.js` change |
| `v0.14.0` | `81a81d0` | Entrée Case Studies (`case-studies.js`, `src/case-studies.js`) ; seul `dist/case-studies.js` est ajouté, aucun autre bundle ne change |
| `v0.13.0` | `3311425` | Entrée BonV (`bonv.js`, `bonv-hero-bg`) ; chunks redécoupés en `hero-stage-DpBC6yvy.mjs` et `platform-connect-Dh9cewVn.mjs`, imports des cinq autres pages produit mis à jour (sans effet en ligne tant que leur tag ne change pas) |
| `v0.12.1` | `49d49a2` | Hero de la Home : formes harmonisées (cloche, forest, amas agrandis), mobile pleine largeur, bloc carré, cadre mobile à 99,5 % ; seul `dist/main.js` change |
| `v0.12.0` | `01cd4ff` | Hero de la Home : particules au lieu des chiffres, sans effet TV, bloc 4:3 sous le texte sous 991 px ; seul `dist/main.js` change |
| `v0.11.0` | `7a7e2ab` | `site.js` (line field v2 + fond flottant) ; `company.js` sans hero |
| `v0.10.0` | `eb2f795` | Gantt de la Home : libellé « FINAL PROTOCOL » ; seul `dist/main.js` change |
| `v0.9.0` | `ad90520` | Barres du cas Evidence de la Home (`evidence-bars`) ; seul `dist/main.js` change |
| `v0.8.0` | `9f43e3b` | Bande « The ClinOps workflow » (`clinops-workflow`) ; seul `dist/clinops.js` change |
| `v0.7.0` | `3767f0e` | Bloc Proof de ClinOps (`clinops-proof`) ; seul `dist/clinops.js` change |
| `v0.6.0` | `2bc93ac` | Bloc « plateforme connectée » (`platform-connect`) sur les cinq pages produit ; chunk partagé renommé `platform-connect-<hash>.mjs` |

### Modifications Webflow encore en place

- `data-line-field` retiré du header du hero sur Company, ClinOps, Response, Trial, Portfolio et AI Conductor. Il n'est plus sur la Home non plus (constat du 28/10).
- Classe `section_header`, tablette (≤ 991 px) : `height: auto`, `min-height: 100svh`, flex colonne centré. Desktop : `height: 100svh` d'origine.
- Combo `section_header.is-company`, tablette : `min-height: 100svh` (avant : `auto`).
- Navbar, bouton menu, tablette : traits `menu-icon_line-*` à `.1rem` (avant `.2rem`), marges du trait du milieu à `.4rem` (avant `.375rem`).
- Company :
  - ancien bloc About us (`grid-2 gap-1,5 reverse`) masqué, remplacé par `section-top` + `grid-3 gap-1,5` avec trois textes `text-size-quote text-weight-light` ;
  - embed du bloc Build with us : code remplacé par `<!-- pv -->`, l'attribut `data-pv="company-careers"` est posé sur l'embed lui-même.
- Pages produit : le bloc de droite `header_image-wrapper` a été supprimé par Romain sur les cinq pages.
- Pages produit, bloc « plateforme connectée » : image placeholder `.animation-2` supprimée sur Trial, ClinOps, Response et Portfolio ; sur AI Conductor, `.entry-grid` et ses six `.conductor-card` supprimées (décision de Romain), remplacées par un `.animation-wrapper` (classes conservées dans le système).
- Trial Optimizer, Success story : image placeholder `.animation-2` supprimée.
- ClinOps, bloc « The ClinOps workflow » : div `data-pv="clinops-workflow"` ajouté dans `container-large` `3a4f72bf…cdd`, après `section-top` ; combo `margin-top margin-large` créé (48 / 40 / 24 px).
- Home, Evidence : ancien `slider-top` et ancienne slide masqués ; nouvel en-tête `section-top _2col is-bottom` et slide `ev-case` ; barres pilotées par `data-pv="evidence-bars"`.
- Home, citations : slider Swiper de 9 cartes (`data-swiper="news"`) ; ancien `quotes-wrapper` masqué ; section sans `is-padding` / `is-pin` ni attributs `data-quotes` ; script d'accordéon et CSS `[data-quote]` retirés du code de page.
- Company, Scientific Advisory Board : 6 membres (3 créés, 3 mis à jour, 5 archivés) ; `leadership-image` en 4/5 ; écart entre photos doublé (Swiper `spaceBetween: 40`, `leadership-grid` column-gap 2.5rem).
- Company, « PhaseV at a glance » : `grid-company` et `grid-company-s` masqués, remplacés par `glance-grid` (6 chiffres avec icônes) ; h2 et texte ajoutés dans le `section-top`.
- Cinq pages produit : instance du composant `inner-nav` (navigation secondaire sticky) supprimée de la section des blocs `is-feature` ; ces blocs sont en `container-large` (au lieu de `container-medium`), le premier en `is-feature is-white` (au lieu de `_1st`).
- ClinOps, bloc Proof : image placeholder `.animation-2` `99086e1f…` supprimée, div `data-pv="clinops-proof"` dans le wrapper `1cf29878…`.
- Home : contenu remplacé par celui de Home DEV (copier-coller fait par Romain, sauvegarde du site faite avant).
- Contact : nav détachée masquée, composant `nav` partagé à sa place.
- Footer : `data-line-field` retiré de `section_footer` ; bloc centré `section-top` masqué dans `section_footer`.
- Footer : composant `footer-bottom` partagé par `section_footer` et `only-footer` ; anciens blocs `footer-bottom` masqués dans `only-footer`, ligne légale en double masquée dans `section_footer` ; 404 sur `only-footer`, footer détaché masqué.

## Journal

### 2026-11-17
- **ClinOps Optimizer refait en natif** (page trouvée vide dans le Designer et sur webflow.io, hero et footer seuls ; reconstruite d'après le proto `clinops-affine`) :
  - Hero : label « ClinOps Optimizer », titre « Find the right sites. / Forecast your enrollment. », paragraphe du document, ligne de preuve (`text-size-medium text-color-nwhite`) ; combos `is-hero`.
  - Why ClinOps (fond light, en-tête centré, 5 cartes) : classe existante `difference-card` restylée en verre blanc (rayon 1.5rem, padding 2rem / 1.5rem en mobile), nouvelle classe `difference-num` (pastille, police `font-mono`).
  - How it works : 4 étapes avec vidéos, structure de Trial, numéros 01 à 04 ajoutés (comme Trial et Response). How the forecast works : 3 `why-card` « On light », icônes d'origine jaunes recolorées en mauve `#684A9E` (assets `clinops-data.svg`, `clinops-modeling.svg`, `clinops-transparency.svg`, sources dans `protos/_shared/icons/`).
  - Proof : success story sombre (classes `ss-*`), animation `clinops-proof-glossy`, sans bouton View details (cas non publié) ; 3 cartes case studies statiques (`cs-*`) dans `cs-wrap is-more` (nouveau combo, marge 7.5 / 5 / 4rem) avec titre `cs-more-title` (nouvelle classe), bouton violet vers `/case-studies?product=clinops-optimizer`. FAQ (6) puis plateforme (`data-current="clinops"`).
  - Release `v0.17.0`, loader de ClinOps passé de `v0.8.0` à `v0.17.0`.
- **Intégration de la refonte, pilote sur Trial Optimizer** (méthode : `protos/refonte-produits/STRATEGIE-WEBFLOW.md` ; sauvegarde « avant refonte » faite par Romain ; publication sur le seul webflow.io jusqu'à la mise en ligne).
  - Polices Roboto et Roboto Mono (variables, 100 à 900 / 700) téléversées sur le site ; variable `font-primary` → Roboto (deux modes), nouvelle variable `font-mono`.
  - Socle, classes existantes modifiées pour tout le site : `text-size-label` (mono, .75rem, .12em), `text-size-display` (300, clamp 2.5 → 3.75rem), `heading-style-h1` (300, clamp 2 → 2.875rem), `heading-style-h4` (500, 1.375rem), `text-size-large` et `text-size-medium` (interligne 1.6), `button` (500), `section_layout.is-white` et `is-feature.is-white` / `is-purple` en blanc pur, `section_layout.is-lightpurple` en `#ececec` ; combos `text-size-display.is-hero` et `text-size-large.is-hero` (heros produit) ; nouvelles classes `surface-dark` (fond sombre unique), `ss-*` (success story), `faq-*`, `step-num`, `video-screen`, combo `section_layout.is-light`.
  - Trial : sections recréées en éléments natifs après le hero (workflow 4 étapes avec vidéos et numéros, success story sombre, FAQ 9 questions, bloc plateforme) ; texte du hero mis à jour ; `feature-grid` 50/50, `video-animation` en panneau sombre.
  - Loaders passés en `v0.15.1` : `site.js` dans le footer global (avant `v0.11.0`, seul le tag change) et `trial.js` sur la page Trial (avant `v0.6.0`). URLs jsDelivr vérifiées (`site.js`, `trial.js` et les trois chunks `.mjs`).
  - Release `v0.15.1` (voir tableau des releases).
- **Response Optimizer refait en natif** : hero (titre « Clarify the treatment signal / Understand who benefits », paragraphe du document client, phrase incomplète « from to better » laissée telle quelle et signalée ; second bouton « Explore case studies » en violet plein) ; sept sections : deux approches (étapes 01-02, graphes `viz`), résultats (3 `why-card` en variante « On light »), frise sombre en 4 étapes (`rp-step*`, dernière en verre rosé), Built for scrutiny (3 `why-card` de base), études de cas sombres (3 cartes statiques `cs-*`, pas encore la collection CMS ; bouton composant Purple vers `/case-studies?product=response-optimizer`), FAQ (6 questions ; doublon « timeline » corrigé), plateforme. Composant `why-card` : style de base (carte grise, icône en disque blanc), nouvelle variante « On light » (carte blanche, disque gris). Six icônes téléversées en assets. `rp-step-k` et `ss-anim-label` reliés à la variable `font-mono`. Loader `response.js` passé en `v0.16.0`. Le tag `v0.15.0` a été créé par erreur sur `c14b7be` (commit des protos, sans les nouveaux modules, `dist/` identique à `v0.14.1`) et poussé : il n'est pas déplacé (règle des tags) et ne doit pas être utilisé.

### 2026-11-15
- **ClinOps affiné** (`refonte-produits/clinops-affine/`, en cours, bloc par bloc) : Why ClinOps en-tête centré sur fond light ; How it works sur fond blanc, titre centré ; How the forecast works sur fond light, intro sous le titre ; Proof refait au format success story (structure de Trial, fichier Trial non modifié) sur fond sombre animé, visuel en variante sombre (`_kit/clinops-proof-glossy.js`, copie adaptée de `src/clinops-proof.js`, non modifié) ; cartes NSCLC et CRO retirées (la NSCLC reviendra dans le bloc case studies) ; FAQ avant la plateforme ; cartes des autres cas ClinOps en ligne (NSCLC, BPCO, drépanocytose) sous la success story, dans la même section sombre, puis bouton vers la bibliothèque filtrée. Page terminée.
- **Style affiné, règles communes** : une seule carte pour `why-card`, `difference-card` et `methodology-card` (verre gris sur blanc, blanc sur light, sombre sur les sections animées ; numéro ou icône dans un anneau mauve) ; surtitres en jaune sur les sections sombres, sur toutes les pages ; légende du visuel de la success story réglable en HTML (`data-cap`) ; ordre de fin de page FAQ puis plateforme sur toutes les pages produit ; chiffre clé de la success story en Roboto 600 (Roboto chargé en variable, 300 à 700).
- **Response affiné, deux approches** : passées sur le composant des étapes vidéo (`data-wf="A"`), graphe animé à la place de la vidéo ; bloc `af-duo` et son CSS supprimés. Labels numérotés 01 / 02 comme les étapes, gardés pour l'instant.
- **Portfolio affiné** (`refonte-produits/portfolio-affine/`, validé, fait en une passe à la demande de Romain) : The challenge centré sur fond light ; Build conviction sur le composant des étapes (graphes classement et PoTS) ; How we approach it en carte unique avec puces ; frise sur fond blanc (plus de fond animé sur la dernière étape, nulle part) ; Evidence en success story sombre (acquisition métabolique, lien vers le cas) avec 3 autres cas en cartes. Retirés : cas atézolizumab (hors bibliothèque), démo PoTS 48 %.
- **AI Conductor affiné** (`refonte-produits/conductor-affine/`) : **en attente, non validé** (Romain pas convaincu, à reprendre plus tard). Fait : mise en style des blocs, chiffres sur le composant glance de Company, bloc « See it in your workflow » ajouté sans formulaire.
- **Intégration Webflow** : document vivant `protos/refonte-produits/INTEGRATION.md` (fondations, composants, modules JS à créer, décisions ouvertes), tenu à jour à chaque bloc validé.
- **Style affiné, décision** (Romain, client d'accord pour Roboto) : refonte de style pour tout le site, inspirée de BonV sans la copier. Roboto léger (300 titres, 500 hero h1 et h4), labels Roboto Mono, panneaux en verre (clair, sombre, rosé), anneaux autour des icônes, data viz glossy, fond animé BonV avec grain sur le hero, les sections sombres et les scènes vidéo. Fichiers : `protos/refonte-produits/_kit/affine.css`, `affine.js`, `affine-bg.js` (fond animé, pause hors écran), `design-space-glossy.js`. L'exploration « tout BonV » (`protos/refonte-bonv-style/`) est rejetée.
- **Trial affiné** (`refonte-produits/trial-affine/`) : workflow A en 50/50 sur fond animé (vidéo sous le texte en mobile), success story sombre avec graphe glossy, FAQ allégée, cartes plateforme d'origine ; blancs en `#fff`, paddings et gaps alignés sur l'échelle du site (3rem colonnes, 1.5rem section-top, 7.5 / 5 / 4rem sections, 4.5rem titre → contenu).
- **Response affiné validé** (`refonte-produits/response-affine/`), travaillé bloc par bloc : en-tête centré et deux lignes 50/50 « Prognostic modeling » / « Predictive modeling » avec visuels animés (remplacent les onglets et les cartes Two tracks, jugés redondants) ; « What you can do with the results » en clair ; « How an engagement looks » en sombre ; Methodology en clair ; nouveau bloc case studies sombre (3 cas Response en ligne, lien vers la bibliothèque filtrée) ; icônes en cercle sur fond transparent. `kit.js` : couleurs des visuels réglables en CSS (`--viz-ink`, `--viz-mau`, `--viz-tea`), sans effet sur les autres protos.

### 2026-11-13
- **Protos réorganisés par page** (demande de Romain) : `protos/<page>/` (site, home, company, clinops, trial, conductor, bonv, case-studies, contact), `protos/_shared/` (ex `assets/` et `icons/`), `protos/_archive/legacy/` (ex `legacy/`). Déplacements en `git mv`, noms de fichiers inchangés. Index et statuts dans `protos/README.md`, à tenir à jour. Chemins mis à jour dans ce manifest, CLAUDE.md, LINE-FIELD.md, les commentaires de `src/` et `webflow/global-styles-data-bg.css` ; liens relatifs des protos corrigés (`../../medias/`, `../_shared/assets/`). Aucun impact sur le build ni sur Webflow.
- **Trial Optimizer, proto de refonte** (`protos/trial/phasev-trial-protos.html`) : page Trial publiée copiée, blocs de la nouvelle copy (document « Trial Optimizer Product Page Content », Latest Copy) : hero, workflow 4 étapes (vidéos existantes), success story (chiffres du document : $6M+, 630 → 575, 6 mois, 90%+), Standalone or connected, FAQ en accordéon (9 questions, préfigure un module `src/faq.js`), CTA « Contact us ».
- **Trial, itérations du proto** (retours de Romain) :
  - titres h1 / h2 sans point final ; titre du workflow sur deux lignes, regroupé avec les 4 étapes dans une seule section ;
  - violet clair `#f4f1f8` remplacé par un gris neutre `#ececec` ; fonds alternés : workflow blanc du site (`--neutral-white` = `#f8f8f8`), success story gris, Standalone blanc, FAQ gris (en Webflow : échange de classes `is-white` / `is-lightpurple` existantes ; la couleur de `.is-lightpurple` est globale, appliquer le gris partout ou seulement sur Trial reste à décider) ;
  - success story sur fond gris, titre réduit, $6M+ dans une carte violette `#7e5bb2` texte blanc ; variantes A, C, D (B abandonnée), **C retenue pour l'instant, à retravailler** ;
  - workflow : variantes A « Stage » (numéros d'étape, vidéo sur une scène grise) et C « Scroll » (textes qui défilent, vidéo collante, desktop seulement) ; **A retenue** ;
  - FAQ : une seule question ouverte à la fois.
- **Trial, proto v2** (`protos/trial/phasev-trial-v2.html`) : version figée sur les choix (workflow A, success story C), avec le nouveau bloc plateforme.
- **Plateforme connectée, refonte visuelle** (`protos/trial/phasev-platform-connect-protos.html`) : particules agrandies (v2, rejetée), puis pistes cartes, orbites, grille, puis ronde vintage (surimpression, planche technique ; archivée dans `protos/_archive/phasev-platform-connect-vintage.html`). **Cartes retenues** : produit de la page en carte navy au centre, 4 cartes blanches reliées par des fils, un échange à la fois (paquets lumineux, carte qui se soulève, onde d'arrivée), chaque carte porte la miniature du motif de son hero produit (éventail, tornade, nuage séparé, carte des sites, chaîne de documents), rejouée pendant l'échange. Module prêt : `protos/trial/platform-connect-cards.js`, même contrat que `src/platform-connect.js` (qu'il remplacera, release à part car elle touche les 5 pages produit).
- **Sources des protos Trial versionnées** : `protos/trial/_build/` (`build.py` régénère `phasev-trial-protos.html` depuis la page staging mise en cache dans `.cache/`, non versionné ; `build_v2.py` produit la v2). Même modèle prévu pour les pages suivantes.

- **Case Studies, corrections après première publication** (retour de Romain : les cartes ne mènent nulle part, les filtres ne marchent pas) :
  - liens : le mode `collectionPage` posé par l'API sort `href="detail_case-studies"`. Le slug est maintenant lié en attribut `data-cs-slug` sur la carte de la bibliothèque (déjà présent sur les études liées et le bouton du slider) et le module écrit `/case-studies/<slug>` (release `v0.14.1`, loaders des deux pages passés de `v0.14.0` à `v0.14.1`, URL jsDelivr vérifiée) ;
  - filtres : Romain avait relié les deux listes de tags des cartes, mais leurs éléments étaient vides. Text Block `post_date` ajouté et lié à Name (Products, Therapeutic Areas). Les listes de tags du header du template ne sont pas encore reliées (non bloquant : pas de tags produit et aire dans le header des fiches) ;
  - slider : filtre Featured et tri Order perdus (21 slides en ligne), remis ; liaison de l'image `featured-image` perdue elle aussi (placeholder Webflow en ligne), reliée de nouveau à Main Image. Les réglages du slider posés juste après le changement de source n'ont pas tenu : à revérifier si on retouche cette liste ; produits des filtres triés par nom (ClinOps, Portfolio, Response, Trial).

- **Case Studies, pages (Webflow, étape 2)** : rien publié, aucun lien dans les menus.
  - Page `Case Studies` créée à `/case-studies` (non brouillon) en dupliquant Resources. Header : slider rebranché sur Case Studies (filtre Featured, tri Order), labels Project Type et Short Name, titre, description, chiffre clé, bouton `button` variante transparente « Read the case » (lien posé par le module depuis l'attribut `data-cs-slug` du conteneur : une prop de composant ne peut pas viser une fiche CMS). Section des cartes : formulaire Finsweet et liste Resources de la copie supprimés ; nouvelle liste Case Studies (classes `resource-list-wrapper`, `resource-list`, `resource-item`, carte `swiper-item` avec `post_image`, `post_body`, `post-data-wrapper`, `heading-style-h4`, `post_description`), liens image et titre vers la fiche ; listes sources Products et Therapeutic Areas pour les filtres ; footer « Want results like these? ». Code de page : Swiper 11 et son initialisation (repris de Resources), loader `case-studies.js@v0.14.0`.
  - Template `Case Studies Template` construit sur le modèle du template d'article Resources : composants `global styles`, `nav`, `section_footer` (bouton « Request a demo » vers `/contact`) ; header `section_header is-resources` (`featured-card`, labels, H1, intro, chiffre clé, image) ; At a glance (`is-lightpurple`, 22 cellules liées) ; récit (`is-white`, trois `post-rtf`) ; Why it matters (`is-gradient`, `data-bg="purple-gradient"`) ; FAQ et source (`is-white`) ; études liées (`is-lightpurple`, 4 éléments, l'étude en cours retirée par le module). Loader `case-studies.js@v0.14.0` dans le footer.
  - Limite de l'API : une liste imbriquée ne peut pas être reliée à un champ Multi-reference (source acceptée : `{ collectionId }` seulement, et rien ne peut être ajouté dans une liste sans source). Les quatre listes de tags (cartes de la bibliothèque, header du template) sont posées vides, nommées « Tags Products / Tags Areas (source à relier) » dans le Navigator, à relier dans le Designer. Les filtres lisent ces tags : sans eux, seul « All » affiche des cartes.
- **Release `v0.14.0`** (commit `81a81d0`) : entrée `case-studies.js`, URL jsDelivr vérifiée (200). Commit limité aux fichiers Case Studies et à `vite.config.js` ; `.gitignore` et `protos/conductor/phasev-conductor-site-cta-protos.html`, modifiés avant la session, laissés hors commit.

- **Case Studies, cadrage** : lecture de `medias/DOCS/PAGES` (nouvelle copy des 6 pages produit, en attente de validation client) et de `medias/DOCS/CASE STUDIES` (bibliothèque de 21 études, 21 images 16:9 dans `case-study-images/`). Rien de modifié dans Webflow.
- **Case Studies, décisions de Romain** :
  - deux filtres, Product et Therapeutic area, chacun dans sa propre collection CMS (champs Reference), pour que le client ajoute ou renomme une catégorie depuis l'Editor ;
  - Neuroscience fusionné dans Neurology (Trial #3 Denali, seule étude concernée) ; Rare Disease gardé tel que donné par le client ; Trial #6 (« Multiple ») sans aire thérapeutique en attendant que le client donne les aires ; ClinOps #1 rattaché à ClinOps et à Trial Optimizer ;
  - collection CMS neuve Case Studies (URL `/case-studies/<slug>` du document client) plutôt que la structure Evidence existante (page `/evidence`, collections Evidences, Evidence Therapeutic Areas et Evidence Project Types, remplies de fiches de démo), qui sera masquée, pas supprimée.
- **Case Studies, proto** (`protos/case-studies/phasev-case-studies-protos.html`) : bibliothèque et template de fiche, avec la copy exacte du document (lignes proposées marquées `data-proposed`). Calé sur le site publié après une première version jugée pas raccord par Romain :
  - header de la bibliothèque comme Resources (option A retenue) : cas mis en avant dans un slider, labels blancs, titre, description, chiffre clé, bouton « Read the case », image à droite, flèches Light ;
  - filtres comme Resources : pilules Product (`fs_radio_field`), liste Therapeutic area au style `.filter-select` ; cartes comme Resources (image, labels violets, titre en h4, description) avec le chiffre clé en une ligne ;
  - fiche : header comme les articles Resources ; tableau At a glance (groupe de champs fixes : Column 1-3, Row 1-6 avec Label / Value / Value 2, Note ; ligne vide masquée, colonne 3 vide = 2 colonnes ; dernière colonne mise en avant, empilé en mobile ; choisi par Romain plutôt qu'une syntaxe à `|`, trop fragile pour le client) ; Challenge, What we did, Results ; Why it matters en cartes avec icône choisie d'après l'intitulé du profil (style des icônes « glance » de Company) ; FAQ en accordéon (H3 du rich text) ; source facultative ; trois études liées ; CTA.
  - 5 fiches complètes pour couvrir les variantes : NSCLC (deux produits), drépanocytose (tableau 3 colonnes), vitiligo (sans chiffre clé), Denali (sponsor nommé, note, source liée), Seamless 2/3 (sans aire).
  - What We Did : numéros pour des étapes successives, puces pour des points parallèles, comme dans le document client (décision de Romain : garder la distinction).
- **Case Studies, CMS (Webflow, étape 1)** : rien publié, aucun lien dans les menus (décision de Romain : page visible par URL pour validation client, hors menu).
  - Collections créées : Case Study Products `6af799a819859e6bbe893fde` (4 items), Case Study Therapeutic Areas `6af799a88b87e257e4ed1d74` (9 items), Case Studies `6af799a98b87e257e4ed1da8` (slug `case-studies`, template `6af799a98b87e257e4ed1db0`).
  - Champs de Case Studies, avec aide en anglais, rangés en 4 groupes (Card and filters, Case page, At a glance, SEO) : Products et Therapeutic Areas (Multi-reference), Project Type, Research Phase, Short Name, Card Description, Stat Number, Stat Text, Main Image, Featured, Order, Intro, Challenge, What We Did, Results, Why It Matters, FAQ, Source (rich text), Glance Column 1-3, Glance Row 1-6 Label / Value / Value 2, Glance Note, SEO Title, Meta Description.
  - 21 études créées « prêtes à publier » (pas en brouillon, pour qu'elles sortent à la publication), texte exact du document, slugs du document, Order 1 à 21 dans l'ordre du document, Featured sur NSCLC, drépanocytose et Denali. Lien « Related reading » de Denali vers l'article Resources existant.
  - Trial #2 (rhumatisme) : tableau du document en 4 colonnes (None / Medium / High), transposé en 3 colonnes (niveau d'hétérogénéité / puissance du design fixe / puissance avec enrichissement), données identiques, phrase de synthèse en Glance Note.
  - Images : 21 assets `cs-*.jpg` uploadés dans la bibliothèque (dossier `medias/` hors dépôt, pas d'URL publique). Le champ Image du CMS les réimporte sous un autre identifiant : les 21 assets de bibliothèque sont donc des doublons, à supprimer avec l'accord de Romain.

### 2026-11-03

- **Liens vers BonV dans les menus** (toutes les pages, à la demande de Romain). Header : nouvelle instance du composant `nav-dropdown_link` en fin de liste du composant `nav-dropdown` (menu Platform), après AI Conductor, texte « BonV », lien en URL `/bonv` (l'outil ne permet pas un lien de type page sur une prop ; les autres liens du menu sont en type page) ; variante `base`, sans liaison à une variante du `nav-dropdown` comme ses voisins. Footer : lien texte `footer-item_link` « BonV » → page BonV, après AI Conductor, dans le composant `footer-bottom` (liste visible, partagée par `section_footer` et `only-footer`). Un second lien identique a d'abord été ajouté dans `only-footer`, mais il est dans l'ancien bloc `footer-bottom` masqué de ce composant : invisible, laissé en place. Non publié.
- **BonV, vidéo** : l'élément Vidéo de la section `#bonv-video` passe de `aPE9RgDkfF8` à `https://www.youtube.com/watch?v=LB_df-lTUXU` (titre « BonV by PhaseV » gardé). 4K par défaut demandé : impossible, YouTube ignore les paramètres de qualité forcée (`vq`) et choisit selon l'écran et la connexion. Après publication, la vidéo ne s'affichait pas (déjà le cas avec l'ancienne) : l'URL d'un élément Video écrite par l'API ne génère pas le lecteur (Webflow le crée seulement quand on colle le lien dans le Designer), l'élément publié restait vide. Romain a supprimé l'élément et l'a recréé dans le Designer : la vidéo fonctionne. Leçon : ne pas régler un élément Video par l'API, le faire dans le Designer.

### 2026-11-02

- **Navbar globale, bouton menu (≤ 991 px)** : traits jugés trop épais et croix décalée à l'ouverture. Cause : traits à `.2rem` (environ 3 px sur iPhone, la taille racine est en vw) et écart réel entre traits de `.575rem` (marge `.375rem` + trait `.2rem`), alors que l'interaction « Navbar 2 menu [Open] » (a-13) déplace le haut et le bas de `.5rem` : les traits se croisaient avec environ 2 px de décalage. Classes `menu-icon_line-top`, `menu-icon_line-middle`, `menu-icon_line-bottom`, breakpoint tablette : hauteur `.2rem` → `.1rem` ; `menu-icon_line-middle` : marges haut et bas `.375rem` → `.4rem`, pour un écart de `.5rem` pile. Interaction, largeur et couleur inchangées. Toutes les pages ; Contact a sa propre interaction (a-120, 8 px), écart résiduel d'environ 0,5 px. Validé par Romain. Non publié.
- **BonV, release `v0.13.0`** (commit `3311425`) : loader standard posé dans le footer de la page BonV (vide avant), `@v0.13.0`. URL jsDelivr de `bonv.js` et du chunk `hero-stage-DpBC6yvy.mjs` vérifiées (200). `CLAUDE.md` mis à jour (architecture, config Vite, tableau des pages, Home en `v0.12.1`). Non publié.
- **BonV, module du hero** : `src/bonv-hero-bg.js` sur le socle `hero-stage`, en Canvas 2D comme les cinq autres pages produit (décision de Romain : alignement sur les pages produit, pas sur le WebGL de la Home). Rendu du proto validé : disques antialiasés en cache par couleur quantifiée, dessinés avec `drawImage`. Densité réduite à la demande de Romain (`DENS` 55 points par unité, environ 3 500 points au lieu de 7 000). Nouvelle entrée `bonv.js` et clé `bonv` dans `vite.config.js`. Page de test : `protos/bonv/phasev-bonv-header-proto.html` (header publié + `/bonv.js` via Vite).
- **BonV, proto du hero** (`protos/bonv/phasev-bonv-hero-proto.html`) : idée « B streaming v3 » de Romain (réponse écrite en streaming sur six lignes de particules, dernier mot en jaune), refaite dans la technique et le style du site : WebGL2 et disques antialiasés comme le hero de la Home, couleurs du site (mauve, bleu), jaune seulement à la décision (le dernier mot passe au jaune après l'écriture, le reste s'efface un peu), curseur clair au lieu de jaune. Deux modes des heros produit (fond à droite au-dessus de 991 px, bloc 4:3 en dessous), header BonV publié recopié. Page BonV : `6ae8c9c3671fb0d99ba262dc`, montages `bonv-hero-bg` et `bonv-hero-slot` déjà posés, colonne texte en « Order : Last » en tablette, pas encore de loader. Intégration à décider (le socle `hero-stage` est en Canvas 2D).

### 2026-10-28

- **Company, combo `section_header.is-company`, tablette** : `min-height` passé de `auto` à `100svh`, à la demande de Romain, pour que le header de Company fasse au moins un écran en tablette et mobile (après le passage de `section_header` en `height: auto`). Desktop inchangé.
- **Classe `section_header`, breakpoint tablette (≤ 991 px, vaut aussi en mobile)** : `height: auto`, `min-height: 100svh`, `display: flex`, `flex-direction: column`, `justify-content: center` (desktop inchangé : `height: 100svh`). Validé par Romain. Pourquoi : headers coupés sur iPhone, surtout sur les pages produit où le bloc 4:3 de `hero-stage` passe sous le texte et où le header est en `overflow:hidden`. Le flex remplace le centrage vertical, qui reposait sur les `height: 100%` des enfants. Pages touchées : Home, ClinOps, Response, Trial, Portfolio, AI Conductor, Company (`is-company`) et Resources (`is-resources`) ; sur Resources, la combo remet `min-height: auto` en tablette, donc le header y prend la hauteur de son contenu (Company corrigée ensuite, voir au-dessus).
- **Home, release `v0.12.1`** (commit `49d49a2`) : harmonisation des formes et hero mobile agrandi (entrées ci-dessous). Loader du footer de la Home passé de `v0.12.0` à `v0.12.1`, reste du code de page inchangé. Non publié : à publier par Romain. Fichier de test `protos/_tmp-states.html`, créé par une commande interrompue, supprimé (jamais commité).
- **Home, hero mobile encore agrandi (≤ 991 px)** : le cadre commun était 43 % plus large que les courbes à cause du pied gauche clairsemé de la courbe en escalier. En mode bloc seulement, cadre calculé sur 99,5 % des points de chaque état (`FIT_WM` / `FIT_HM`) et bloc carré (1:1 au lieu de 4:3) : +37 % sur toutes les formes. Points coupés au bord du bloc, validé par Romain : 18 sur 4200 (pied de l’escalier), 20 (extrémités de l’axe du forest), 13 (bouts des courbes), 0 pour la cloche et l’amas. Desktop inchangé.
- **Home, hero : tailles des formes harmonisées**, desktop et mobile. Agrandissement uniforme (même facteur en largeur et en hauteur, via `HSCALE` / `WSCALE`) : cloche ×1.2, forest ×1.33 (son maximum), amas ×1.3. Courbes, courbe en escalier et cadre commun inchangés (cadre vérifié identique à `v0.12.0`). Taille rapportée aux courbes : cloche 51 → 74 %, forest 39 → 68 %, amas 43 → 72 %, escalier 89 %. Un premier essai (cadre recalculé, cloche et forest étirés, amas écarté) a été annulé : il déformait les formes et agrandissait les courbes.
- **Home, hero mobile plus grand (≤ 991 px)** : le bloc passe en pleine largeur d’écran (`width:100vw; margin-left:calc(50% - 50vw)`), la section rogne le débordement horizontal (`overflow-x:clip`, sinon la barre de scroll verticale crée un scroll horizontal en navigateur desktop étroit), et le cadrage se resserre (`FIT_PAD_M = 1` au lieu de `.92`). Environ +20 % à 390 px. Desktop inchangé.
- **Home, release `v0.12.0`** (commit `01cd4ff`) : hero en particules, sans effet TV, bloc sous le texte en mobile (voir les entrées ci-dessous). Loader du footer de la Home passé de `v0.10.0` à `v0.12.0`, reste du code de page inchangé (carte de décision, Swiper). Non publié : à publier et vérifier par Romain. Home DEV non touchée.
- **Home, header : copie locale pour la refonte** (`protos/home/phasev-home-header-proto.html`). Header de la Home publiée copié tel quel (section `section_header`, sans navbar, à la demande de Romain), avec le CSS Webflow publié en lien et l'embed global styles recopié. Le proto importe les vrais modules (`/site.js`, `/src/hero-homepage.js`) : à ouvrir via `npm run dev` sur `http://localhost:5173/protos/home/phasev-home-header-proto.html`. Rien de changé en ligne.
- Constat à la copie : le header publié n'a plus `data-line-field` (seulement `data-bg="purple-gradient"`), et le div `hero-homepage` est dans un embed frère de `header_content`, pas dans `header_image-wrapper`. Pas de boutons dans le hero.
- **Home, hero (`src/hero-homepage.js`)** : chiffres remplacés par des particules (disques antialiasés) et effet TV supprimé (passe 2 : courbure, aberration chromatique, halo, scanlines, bruit, scintillement), à la demande de Romain. Retirés avec : atlas de chiffres, tirage `DIG`, police du `h1`, framebuffer intermédiaire. Les particules se dessinent directement sur le canvas transparent. Formes, morphing, parallaxe et profondeur inchangés. Puis particules réduites et plus nombreuses : `rMul` 2.6 → .6, tous les points dessinés (avant : un sur deux), et facteur de densité `D = 3` dans `buildStates` (4200 points ; nombres de points multipliés par `D`, pas d'empilement divisés par `D` pour garder les proportions de chaque forme).
- **Home, hero mobile (≤ 991 px)** : l'anim était posée sur le texte (bloc en absolu, CSS prévu pour `header_image-wrapper` qui n'existe plus). Elle passe dans le flux, en bloc 4:3 pleine largeur sous le texte (`margin-top:2rem`), sans débordement horizontal (fin des 112vw / 124vw). Le CSS publié fixe `section_header` à `100svh` et la grille à `100%` : via `:has()`, sous 991 px, la section passe en `height:auto; min-height:100svh` centrée en flex colonne, `header_component` et `header_content` en `height:auto`. Desktop inchangé. Règles `header_image-wrapper` mortes laissées en place.

### 2026-10-26

- **Archive du site en ligne** : clone statique de https://www.phasevtrials.com dans `OLD_SITE/` (55 pages, 354 fichiers, 53 Mo), exclu de git via `.gitignore`. Sert à garder le contenu au cas où le site disparaît. Seuls le domaine et ses fichiers sur le CDN Webflow sont téléchargés ; les sites externes et https://ai-conductor.phasevtrials.com/ sont exclus (liens laissés en absolu). Rapport dans `OLD_SITE/_clone-report.txt`. HTML nettoyé pour une ouverture en `file://` : attributs `integrity` et `crossorigin` retirés (ils bloquaient CSS et JS), script traceur Webflow retiré, URL `//…` passées en `https://`.
- **AI Conductor, bloc site produit** : passé en fond blanc (`section_layout is-white`, `data-bg` retiré), textes en couleurs par défaut (label gris, h2 navy, intro `text-size-large`).
- **AI Conductor, bloc site produit (version A du proto `protos/conductor/phasev-conductor-site-cta-protos.html`)** : nouvelle section après le hero (la page n'avait que le hero et le footer). `section_layout is-gradient` + `data-bg`, `padding-section-main`, `container-large`, `grid-2 gap-8,5` (2 colonnes, 1 sous 767 px). Gauche : label « Explore the product », h2 `text-size-display text-color-alternate` « See AI Conductor in action », intro `text-size-large text-color-alternate`, composant `button` (variante Yellow) « Visit the AI Conductor site » → https://ai-conductor.phasevtrials.com/ (nouvel onglet, `noopener`). Droite : image `ai-conductor-site-browser.webp` (capture du header du site produit dans une fenêtre navigateur composée, coins arrondis transparents), source dans `protos/_shared/assets/`. Aucune classe créée.

### 2026-10-25

- **Composant `slider-arrows`, variante « Light » (fonds sombres)** : rond en blanc translucide (`color: rgba(255,255,255,.14)`, le rond du SVG est en `currentColor`), survol à `.3` au lieu du jaune ; flèche blanche du SVG inchangée. Variante de base (fonds blancs) intacte. Touche Resources (header) et Home (Evidence).

- **Resources, slider du header** : flèches remplacées par le composant `slider-arrows` variante « Light » (celle du bloc Evidence de la Home), insérée dans `featured-slider` ; anciennes flèches (`slider-arrows-wrapper is-new`, embeds `arrow-new`) masquées. Script Swiper du footer de la page : les flèches sont cherchées dans le slider (`root.querySelectorAll('[data-swiper-prev]')`) au lieu de `[data-swiper-prev="feature"]`, reste inchangé.
- **Footer** : `footer-band-copy` max-width 58ch → 45rem ; `footer-statement-soft` en `display:block` (saut de ligne avant « Connected development. »).

- **Nouvelle page Privacy Policy** (`/privacy-policy`, id `6adeca19d6b537b34d376d47`) : dupliquée de Contact (navbar, `only-footer` avec bandeau CTA remis par défaut), formulaire retiré. En-tête sombre (label « Legal », h1 « Privacy Policy », date), puis section blanche `padding-section-main` > `container-large` > `max-width-large` avec le texte intégral de phasevtrials.com/privacy-policy (16 sections, copié tel quel) en éléments natifs dans 3 blocs `post-rtf`. Lien « Privacy Policy » du composant `footer-bottom` relié à la page. Head de la page (vide à la duplication) : CSS de typographie légale limité à cette page (h2 1.5rem, paragraphes et listes espacés, liens soulignés).
- **`footer-bottom`** : « Back to top » pointe vers `#top` (au lieu de `#`, neutralisé par Webflow).

- **Composant `footer-bottom`, ligne légale** (© / Terms / Privacy / Back to top) : passée en taille small via une combo `text-size-small` posée sur les 4 éléments (`text-size-medium text-color-neutralw [is-link] text-size-small`, font-size = variable de `text-size-small`). Une combo existante vide remplie, une créée. Partagé par tous les footers.

- **Combo `section-top 2col is-bottom`** : en desktop, `display:block` (titre et intro collés) remplacé par une colonne flex avec 2rem d'écart, comme en tablette. Touche Investors et At a glance sur Company, et toute autre section qui utilise cette combo.

- **Company, titres de section** : Leadership, Scientific Advisory Board et Investors passent de `heading-style-h2` à `text-size-display`, comme At a glance et Build with us. SAB garde le jaune via une nouvelle combo `text-size-display text-color-yellow`.

- **Composant `only-footer`** : nouvelle prop booléenne « Show CTA band » (vrai par défaut) liée à la visibilité de `footer-band` (bandeau Better decisions / Request a demo). Désactivée sur Contact, puisque le CTA renvoie vers cette page. Autres instances inchangées.

- **Contact, nouvelle mise en page (version B du proto `protos/contact/phasev-contact-protos.html`)** : section `is-white` → `is-gradient` + `data-bg="purple-gradient"` ; `contact-form-div` en 2 colonnes (1fr / 1.15fr, gap 5rem, 1 colonne sous 991 px) ; combo `form-wrapper is-contact` en carte blanche (radius 1.5rem, padding 3rem, ombre) ; `form_text-field is-contact` en filets `#e3e1ef`, radius .75rem ; label « Contact » ajouté ; bouton « Submit » → « Send message ». CSS ajouté à la fin du head de la page (code existant conservé) : intro en blanc, colonne collante en desktop, cases produits en pastilles. Formulaire et noms de champs inchangés (Webflow natif, submissions vérifiées).

### 2026-10-23

- **Home, rythme vertical** : `padding-global padding-section-main` sur les 7 sections de contenu (à la place de `custom1` et `large`, section masquée `hide` comprise). Hero inchangé (`padding-section-home_header`).

- **Company, rythme vertical** : nouvelle classe combo `padding-global padding-section-main` (7.5rem haut et bas, 5rem en tablette, 4rem en mobile), validée par Romain. Posée sur les 6 sections de contenu (About us, At a glance, Leadership, SAB, Investors, Build with us) à la place de `xxlarge`, `medium` et `large`. Hero inchangé (`padding-section-company-hero`). Test sur Company seulement.

- **Company, Build with us** : texture du line field `waterfall` → `matrix` (choix de Romain), registre `LINE-FIELD.md` à jour.

- **Company, Investors** (ex « Enrollment Simulation ») : bloc investisseurs comme sur l'ancien site /about, proto `protos/company/phasev-company-investors-proto.html`. Six logos (Accel, Insight Partners, Exor Ventures, Viola Ventures, LionBird, Getty) repris de l'ancien site, rognés et passés en navy `#141238` (texte d'Exor évidé), uploadés en assets `investor-*.png`. CMS Partnerships : les 3 « Backed by » provisoires remplacés par Accel, Insight, Exor, 3 entrées créées. En-tête sur le modèle « at a glance » (`section-top 2col is-bottom`, label « Investors », h2 « Backed by leading investors » en `heading-style-h2`, intro à droite). Classes existantes modifiées : `backed-by-grid` 6 colonnes (3 en tablette, 2 en mobile), `partnership-logo` en `contain` avec padding. `collaborators-wrapper` masqué (7 logos provisoires).

- **Line field v2 + fond flottant** (brief `brief-line-field-v2.md`, proto `protos/site/phasev-line-textures-proto7.html`) : nouvelle entrée `site.js` (fond flottant sur chaque `[data-bg]`, line field à 6 textures portées à l'identique) ; registre `LINE-FIELD.md`. **Release `v0.11.0`** (`7a7e2ab`).
  - Webflow : script `window.LineField` du footer global remplacé par le loader `site.js` (`v0.11.0`, `?dev`) ; sauvegarde dans `protos/_archive/legacy/`. Attributs posés selon `LINE-FIELD.md`, tous les `data-line-seed` retirés. Hero Company : `data-pv="company-hero"` retiré, `swimmer` ; `company.js` ne monte plus `company-hero-lines` (fichier gardé), loader Company `v0.2.0` → `v0.11.0`. Footers : `swimmer` sur `footer-band` des deux composants, composant `footer-lanes` masqué.
  - Écarts au brief : pas de seed (décision de Romain) ; les couches injectées passent devant la règle de `hero-stage` (sélecteur renforcé) ; fallback CSS prêt dans `webflow/global-styles-data-bg.css` avec `overflow:clip` seulement sans `.pv-live` (sinon le hero Home serait rogné), **non collé** dans l'embed `global styles` : le JS remplace déjà l'ancien dégradé, l'ancienne règle reste le fallback.
  - Tests locaux (pages publiées + nouveau code) : fonds sans bord, hero ClinOps au-dessus du fond, fallback sans JS propre, reduced motion figé, mobile OK, calm zones vérifiées par bloc, textures dessinées (mesure pixels). Rendu animé fin (waterfall, km), perfs et fuites à vérifier par Romain dans un vrai navigateur.

- **Home, « The Problem » (gantt)** : libellé « PROTOCOL FINAL » → « FINAL PROTOCOL » dans `src/gantt.js` (texte en dur dans `TASKS`), à la demande de Romain. **Release `v0.10.0`**, loader de la Home passé de `v0.9.0` à `v0.10.0`.
- **Home, « The PhaseV Platform »** : ordre des questions changé, à la demande de Romain : Portfolio → Trial → ClinOps → Response → AI Conductor (avant : Portfolio, Response, ClinOps, Trial, AI Conductor). Fait dans Webflow en réordonnant les instances `dm-panel` de `#dm-panels` : `platform-hub` construit les onglets dans l'ordre du DOM, aucune release. Chaque panneau garde son `target`, donc sa forme de nuage. Home DEV non touchée.
- **Home, bloc Evidence** refait (proto V1 de `protos/home/phasev-home-evidence-proto.html` : une carte, deux moitiés égales ; le proto simule aussi 3 cas pour le futur slider). Décision de Romain : un seul cas au lancement, Swiper gardé pour la suite.
  - En-tête : nouveau `section-top _2col is-bottom` (label + h2 à gauche ; intro + flèches `slider-arrows` sombres déplacées à droite) ; ancien `slider-top` masqué.
  - Cas : nouvelle slide `swiper-slide full` > `ev-case` (moitié récit : produit, type, titre « Recommended sites recruited 53% faster. », texte, lien « Read the case » masqué tant qu'Evidence est en brouillon ; moitié données : +53 %, barres 0.43 / 0.28, paire 349 ≈ 357). Ancienne slide sortie du `swiper-wrapper` et masquée (une slide masquée compterait encore pour Swiper).
  - Classes créées (préfixe `ev-case`, les `evidence-*` existent déjà pour la page Evidence) : `ev-case`, `ev-case_half` (+ combo `is-data`), `ev-case_meta`, `ev-case_small`, `ev-case_title`, `ev-case_link`, `ev-case_kpi`, `ev-case_kpi-n`, `ev-case_kpi-t`, `ev-case_bars`, `ev-case_bars-head`, `ev-case_bar` (+ `is-main`), `ev-case_track`, `ev-case_fill` (+ `is-main`), `ev-case_pair`, `ev-case_pair-n`, `ev-case_op`.
  - Repo : module `src/evidence-bars.js` monté depuis `main.js` sur `[data-pv="evidence-bars"]` (le bloc des barres) ; chaque remplissage porte `data-value` / `data-max`, le module fixe la largeur et anime l'entrée à l'écran (décalage 0,12 s, reduced motion = état final).
  - Script Swiper de la Home : les flèches sont masquées quand le slider est verrouillé (`isLocked`, événements `lock` / `unlock`) ; vaut pour tous les sliders de la page.
  - Espace entre l'en-tête et la carte : `margin-top` sur le combo `swiper-div evidence` (2.6875rem, 2rem sous 991 px, 0 sous 479 px où le combo a déjà 2rem de padding), valeurs de l'ancien `slider-top`.
  - Testé en `?dev` par Romain. **Release `v0.9.0`** (seul `dist/main.js` change), loader de la Home passé de `v0.4.0` à `v0.9.0`.

- **Home, citations** : l'accordéon épinglé (ScrollTrigger + GSAP, 3 citations identiques de remplissage) remplacé par un slider Swiper de cartes, décision de Romain (proto C de `protos/home/phasev-home-quotes-proto.html`). Textes : les 9 témoignages de la section « What our partners are saying » de phasevtrials.com, repris en entier ; logos Enlivex, EMD Serono, NeuroSense, Oramed, Alimentiv, iOMEDICO uploadés en assets (`logo-*.svg|avif`), guillemet en asset `quote-mark.svg` (source `protos/_shared/icons/`).
  - Structure : `slider-top` (label « Testimonials », h2 `text-size-display` « What our partners are saying », composant `slider-arrows` base) + `swiper-div` `data-swiper="news"` (`swiper` > `swiper-wrapper` > 9 × `swiper-slide is-quote` > `quote-card`) + `slider-top_right mobile-only` avec un second `slider-arrows`, comme Latest news. Slides statiques, éditables dans le Designer. Aucun nouveau JS : le script Swiper existant de la Home (type `news`) pilote le slider.
  - Classes créées (accord de Romain) : combo `swiper-slide is-quote` (hauteur auto, 36rem / 30rem / 85 %), `quote-card`, `quote-card_mark`, `quote-card_text`, `quote-card_foot`, `quote-card_logo` (silhouette navy). Textes en classes existantes (`quote-head`, `heading-style-h5 text-color-navy`, `text-size-medium text-color-gray`, `text-size-medium text-color-lpurple`).
  - Section : attributs `data-quotes` et `data-quotes-pin` retirés ; classes ramenées à `section_layout is-lightpurple` (sans `is-padding`, qui centrait en flex) et `padding-global padding-section-custom1` (sans `is-pin`, 100vh) ; ancien `quotes-wrapper` masqué.
  - Code de page de la Home : script d'accordéon retiré du footer, correctifs CSS mobile `[data-quote]` retirés du head ; loader `v0.4.0`, carte de décision et script Swiper inchangés. Home DEV non touchée.

- **Company, Scientific Advisory Board** : contenu remplacé selon `medias/people/SAB-content.md` (non versionné). Bloc gardé tel quel (slider Swiper, composant `leadership-card` variante « dark ») : décision de Romain, on n'affiche que le nom avec titres et le poste actuel. Proto de référence `protos/company/phasev-company-sab-protos.html` (deux dispositions, nom + poste seulement).
  - CMS « Scientific Advisory Boards » : Klaus Beck, MD, PhD, PhD (deux doctorats, confirmé par Romain), William F. Doyle, Avi Kulkarni, PhD créés ; Howard Trachtman, Murray Urowitz, Sofia Villar mis à jour (portrait et poste actuel dans `position`, qui valait « Scientific Advisory Board ») ; ordre 1 à 6 selon le fichier ; David Perry, Jennifer Hill, Marcia Levenstein, Melanie Ivarsson, Jerald Schindler archivés (pas supprimés).
  - Six portraits 928 × 1152 uploadés en assets (`sab-<nom>.jpeg`).
  - `leadership-image` : `aspect-ratio` 1/1 → 4/5, à la demande de Romain, pour toutes les cartes (Leadership, son slider mobile, SAB). Les photos de Leadership sont en 551 × 803, recadrage sans perte de visage.
  - Les trois nouveaux membres n'ont pas de lien LinkedIn (champ vide, non affiché par la carte).
  - Écart entre les photos doublé partout, à la demande de Romain : `spaceBetween` 20 → 40 dans le script Swiper du code de page de Company (sliders SAB et Leadership mobile ; le reste du bloc inchangé, loader `v0.2.0` compris) ; `leadership-grid` column-gap 1.25rem → 2.5rem.

### 2026-10-22

- **Company, bloc « PhaseV at a glance »** refait, décision de Romain : on ne garde que les chiffres. Proto `protos/company/phasev-company-glance-protos.html` (grille 3 × 2, filet light-purple, icône sur la ligne du chiffre), construit sur les tokens du site (Aspekta, display, `number-span is-company`, `company-subtitle`). Les premiers essais (schéma données → couche → usages, palette des animations, Roboto) ont été écartés : hors charte UI.
  - Webflow : h2 « Trusted across clinical development. » (`text-size-display text-color-alternate`) ajouté dans `section-top_left` ; `section-top_right` + texte (`text-size-large text-color-alternate`) ajoutés ; grille `glance-grid` insérée après l'ancien contenu ; `grid-company` (`8b40…ff1a`) et `grid-company-s` (`ff1c72b9…`) masqués.
  - Classes créées (accord de Romain) : `glance-grid` (3 colonnes, 2 sous 767 px), `glance-stat` (filet 0.5px `#684a9e`, colonne), `glance-stat_head` (icône + chiffre en ligne), `glance-icon` (3rem, 2.5rem sous 767 px).
  - Six icônes SVG dessinées dans le style des icônes du site (grille 80, trait 3.2, jaune `#E1C721`), sources dans `protos/_shared/icons/`, uploadées en assets : `glance-sponsors`, `glance-top20`, `glance-trials`, `glance-records`, `glance-models`, `glance-papers`.
  - Pas de module JS : les chiffres gardent `number-span`, animé par le compteur du script global du site.
- **Response, Trial, Portfolio, AI Conductor, navigation secondaire** : même traitement que ClinOps, à la demande de Romain. Instance `inner-nav` supprimée ; premier bloc feature passé de `is-feature _1st` à `is-feature is-white` ; tous les blocs feature passés de `container-medium` à `container-large`. Structure identique sur les quatre pages (mêmes ids d'éléments que ClinOps, page dupliquée).
  - Pour recréer les barres : variante base (3 liens) sur Response, Portfolio et AI Conductor, variante 4 sur Trial ; liens vers `ff611726…`, `acfb0bb0…`, `0679ea4c…` (et `4a881a5c…` sur Trial). Textes : Response « Sharpen the Readout », « Reveal Differential Benefit », « Act on the Evidence » ; Trial « Set Up », « Explore », « Simulate », « Optimize » ; Portfolio « Translate to Value », « Quantify Probability », « Translate to Value » (doublon d'origine) ; AI Conductor « Study Backbone », « Interactive Protocol », « Analysis & Reporting ».
  - Le composant `inner-nav` n'a plus aucune instance sur le site ; il reste dans la bibliothèque, comme ses classes et le CSS `data-sticky-nav-offset` de `global styles`.
- **ClinOps, navigation secondaire** : instance `inner-nav` (`8b4ce4b2…48`) supprimée, décision de Romain (la bande « The ClinOps workflow » annonce déjà les quatre étapes). Le masquage était impossible : l'API refuse `set_visibility` sur une instance de composant.
  - Fonctionnement relevé : composant `inner-nav` (groupe navigation, 5 instances, variantes 3 à 6 selon le nombre de liens), racine `.container-large.is-sticky` avec `data-sticky-nav-offset`, slot `inner-nav-wrapper` rempli d'instances `inner-nav_link` (ancres « page section »). Aucun JS propre : CSS sticky dans l'embed `global styles` (`top: var(--nav-h)`, `top: 0` sous `html.nav-hidden`), classe `nav-hidden` posée par le script navbar du site. Déjà en `display: none` à 991 px et moins.
  - Pour la recréer : variante 4 (`14b8fa72…`), liens Feasibility → `ff611726…`, Site Strategy → `acfb0bb0…`, ENROLLMENt → `0679ea4c…`, Reforecasting → `07dbbd09…`.
  - Composant et classes inchangés, les quatre autres pages produit gardent la barre.
  - Bloc Feasibility : classes changées par Romain dans le Designer (`_1st` remplacé par `is-white`, 80 px en haut et en bas, 48 px sous 991 px).
  - Les quatre blocs `is-feature` passent de `container-medium` (73rem) à `container-large` (90rem) : le texte était décalé vers la droite par rapport aux sections précédentes au-dessus d'environ 1250 px.

### 2026-10-21

- **ClinOps, « The ClinOps workflow »** (brief `brief-clinops-workflow.md`) : module `src/clinops-workflow.js`, portage du proto (seed 17, tirage par rejet, exclusions 22 / 18 / 15 %, 14 sites dont 9 retenus, 12 courbes, chronologie de 18 s), monté depuis `clinops.js`.
  - Écarts au proto, selon le brief : typo lue sur la `.text-size-label` du bloc ; fond de section gardé en constante ; taille par CSS injecté (`aspect-ratio` 16/5.4, 4/3.4 sous 700 px) ; reconstruction seulement au franchissement de 500 px (2600 / 1500 particules) ; reduced motion = état à t = 16 s ; boucle relancée à t = 0 à chaque entrée.
  - Mobile (375 px) : noms d'étapes répartis à espaces égaux (« SITE STRATEGY » et « ENROLLMENT » se touchaient) ; « UPDATED FORECAST » placé sous la courbe quand il croise « PLAN » (chevauchement présent dans le proto). Données inchangées.
  - Performance : mesure en temps réel dans Edge headless, pire cas 2,2 ms par frame (≈ 8,8 ms en ×4, au-dessus du seuil de 8 ms). Particules regroupées par couleur et opacité arrondie au 1/20, un `fillStyle` par groupe : pire cas 1,1 ms (≈ 4,4 ms en ×4). Un essai avec un seul tracé par groupe (`rect` + `fill`) était plus lent (3,9 ms), abandonné. Nombre de particules inchangé.
  - Webflow : div `data-pv="clinops-workflow"` ajouté ; l'API n'a pas créé seule la combinaison `margin-top margin-large`, créée explicitement avec les valeurs de `margin-large`.
  - Testé en local (captures desktop et 375 px, t = 2, 6,5 et 16 s) puis en Preview `?dev` par Romain.
  - **Release `v0.8.0`**, loader de ClinOps passé de `v0.7.0` à `v0.8.0`.

- **ClinOps, bloc Proof** (brief `brief-clinops-proof.md`) : module `src/clinops-proof.js`, portage à l'identique du proto (seed 9, part de recommandés 0,4, dispersion 0,55, colonnes 27 % / 75 %, chronologie 12 s), monté depuis `clinops.js`.
  - Écarts au proto, selon le brief : typo lue sur la première `.text-size-label` de la page (repli : police du body) ; vert lu sur `.text-color-green` (repli `#087f6a`) ; pastilles de la couleur de section ; chiffres en attributs (`data-sites` 357, `data-rec` 0.43, `data-other` 0.28), grille de 21 colonnes et `ceil(sites / 21)` lignes ; reduced motion = état à t = 9 s ; `aspect-ratio: 1/1` sans `min-height` ; boucle relancée à t = 0 à chaque entrée.
  - Écart au brief, validé par Romain : l'accolade affiche `data-gain` (53 par défaut) au lieu d'un calcul, car 0.43 / 0.28 donne +54 % alors que le chiffre officiel est 53 %.
  - Webflow : image `.animation-2` supprimée, div `data-pv="clinops-proof"` ajouté (deux délais dépassés de l'API pendant la création ; un seul div au final, vérifié).
  - Testé en local (captures headless desktop et 375 px) puis en Preview `?dev` par Romain.
  - **Release `v0.7.0`**, loader de ClinOps passé de `v0.6.0` à `v0.7.0`.

- **Resources, images Publications & Media** : les 40 visuels refaits par Romain (`medias/new/`, 1280×720, 17 à 123 Ko) remplacent les anciens bandeaux de logo sur les 56 articles.
  - Envoi : 40 assets créés par l'API (`pm-<média>.png`), fichiers envoyés vers S3 (201), puis champ « Main Image » mis à jour article par article (le lot groupé est refusé : « Missing fields »). Le champ image exige `fileId`, `url` et `alt`.
  - Webflow réimporte l'image dans le CMS sous un nouvel identifiant : les 40 assets `pm-*` de la bibliothèque étaient des doublons. Vérifié avant suppression : aucune référence dans l'export complet de Resources, aucune page modifiée après leur création. Supprimés avec l'accord de Romain ; les 40 images CMS des articles répondent toujours en 200. Les anciens visuels étaient des fichiers internes au CMS, absents de la bibliothèque : rien à nettoyer côté assets (82 → 42).
  - Non publié : à publier par Romain.

- **Home, Latest news** : la liste CMS du slider (`023caa4c…aa7f`, collection Resources) chargeait les 82 ressources sans tri. Réglée sur 6 éléments, filtre Category Primary = Blog Posts, tri Date décroissant. Le bouton « All insights » existant (vers Resources) sert d'accès aux autres. Carte : l'instance du composant `swiper-item` (lien jamais branché) a été remplacée par Romain, dans le Designer, par une copie de la carte de la page Resources (même classe, lien conditionnel External Link / page de l'article). Le site a donc deux cartes de ressources : le composant `swiper-item` (plus utilisé sur la Home) et la carte détachée de Resources, maintenant présente sur les deux pages.

- **Contact, nav** : la page utilisait une copie détachée de la nav (`navbar_component is-dark`, liens en variante Dark, lien Evidence, bouton « Discuss your program », sans Careers). Composant `nav` partagé inséré à sa place, copie détachée masquée.
  - Variante « Dark » créée sur le composant `nav` (id `cfe61ff1-0b4b-351f-495c-fb82092ccbe4`) : seule différence avec la base, fond de barre `#141238` ; logo, liens et icône de menu restent clairs comme sur les autres pages. Instance de Contact réglée sur « Dark ». Les 13 autres pages restent sur la base.
- **Contact, texte** : lorem ipsum remplacé (version A validée) : titre « Bring us the decision in front of your team. », paragraphe « Tell us about your study, your portfolio or the question you need to answer. A member of the PhaseV team will follow up to understand your context and set up a tailored conversation or demo. » Titre passé de `h2` à `h1` (la page n'avait pas de `h1`).

- **Pages produit, bloc « plateforme connectée »** (brief `brief-platform-connect.md`) : module partagé `src/platform-connect.js`, portage à l'identique du proto (seed 11, `SPOT`, rayons, chronologie 14,6 s, `EVENTS`, recrutement des flux, parallaxe), monté depuis les cinq entrées produit.
  - Écarts au proto, selon le brief : typo et espacement lus sur la `.text-size-label` du bloc ; fond de section lu et gardé en constante ; particules reconstruites seulement au franchissement de 500 px (1100 / 1800) ; `pointermove` passif, branché au start et retiré au stop ; reduced motion = état à t = 7,2 s sans boucle ni parallaxe ; `aspect-ratio: 1.2/1` sans `min-height` ; noms recalés vers l'intérieur s'ils sortent du canvas ; sélecteur de page et colonne texte du proto non portés.
  - Noms des produits : par défaut dans le JS, surchargeables sur le montage par `data-name-<clé>`. `data-current` manquant ou inconnu : `console.warn`, rien n'est monté.
  - Webflow : div `data-pv="platform-connect" data-current="<clé>"` dans le `.animation-wrapper` `fb9425b9…` de Trial, ClinOps, Response et Portfolio (image `.animation-2` supprimée) ; sur AI Conductor, `.animation-wrapper` créé en second enfant de la grille `d9bf6c2d…` (`grid-2 gap-1,5 bottom`), `.entry-grid` et ses six cartes supprimées.
  - Testé en local (captures headless desktop et 375 px, Trial et Conductor au centre) puis en Preview `?dev` par Romain, alignement sur AI Conductor compris.
  - **Release `v0.6.0`** (`2bc93ac`), URL jsDelivr vérifiées (cinq entrées, chunk `platform-connect-Bf2sdhRo.mjs`, runtime). Loaders des cinq pages produit passés à `v0.6.0` (Trial depuis `v0.5.0`, les autres depuis `v0.4.0`) ; scripts d'onglets GSAP conservés sur Response, Portfolio et AI Conductor.

- **Trial Optimizer, Success story** : animation « design space » (proto 1, brief `brief-success-design-space.md`), module `src/success-design-space.js` monté depuis `trial.js`.
  - Image placeholder `.animation-2` supprimée (accord de Romain), div `data-pv="success-design-space"` ajouté dans `.animation-wrapper`.
  - Écarts au proto, selon le brief : typo et espacement lus sur la `.text-size-label` du bloc ; fond des pastilles lu sur la section (ou le premier parent opaque) ; lecture à 45 % de visibilité, état final tenu, relance à t = 0 après une sortie complète, aucune RAF au repos ; reduced motion = état final direct ; sous 600 px, étiquettes en 9 px et 1000 points.
  - Écart au brief : la hauteur est calculée en JS (largeur / 1.15, 320 px minimum) au lieu de `aspect-ratio` + `min-height`, qui imposait 368 px de large et débordait à 375 px. Garde-fou : la note « TYPE I ERROR » et le titre d'axe s'écartent verticalement s'ils se croisent (sous 375 px).
  - Testé en local (captures headless desktop, 375 et 320 px) puis en Preview `?dev` par Romain.
  - **Release `v0.5.0`** (`fc6e0a4`), URL jsDelivr vérifiée (trial.js et chunks), loader de Trial passé de `v0.4.0` à `v0.5.0`. Incident : un premier commit raté a laissé le tag poussé sur `b4df313` ; avec l'accord de Romain, le tag a été supprimé puis recréé sur `fc6e0a4` avant toute requête jsDelivr. Les commits passent désormais leur message par fichier (`git commit -F`).

- **Repo** : dossier `medias/` ajouté au `.gitignore`. Il contient les 40 images uniques des 56 articles Publications & Media (`medias/original/`), `correspondance.csv` et `correspondance.json` (fichier → asset Webflow → articles), et `medias/new/` pour les visuels refaits par Romain, à remplacer ensuite par l'API (upload d'asset puis mise à jour de « Main Image »).

- **Resources, Publications & Media** : les 56 articles n'avaient aucun lien externe (corps vide). URL récupérées sur l'ancien site (`/insights/media-mentions` pour 49, `/insights/publications` pour 7), appariées par date et titre :
  - champ `webinar-link` renommé « External Link » (slug inchangé, la condition existante des webinars continue de marcher) et rempli pour les 56 items, non publiés ;
  - URL nettoyées : Axios (sortie du lien de sécurité urldefense), BioWorld (`?v=preview`), Yahoo (`guccounter`), Citybiz (`?abkw`), Accel (nouvelle adresse `/news/`), Scrip (tronquée `[…]` sur l'ancien site, reconstruite et vérifiée) ;
  - 31 URL répondent en 200 ; les autres bloquent les requêtes automatiques (403), non concluant ;
  - lien conditionnel de la carte `swiper-item` (page Resources) réglé par Romain : « External Link is set → External Link, sinon URL Path » (la condition sur « Name = Publications & Media » ne marchait pas, sans doute à cause du `&`) ; vérifié sur le site publié : 56 Publications & Media et 3 Webinars en externe, Blog Posts et Case Studies vers leur page ;
  - reste : le texte du bouton « Watch recording » pour cette catégorie.

- **Footer, retouches** : lettres du logo du bandeau passées en blanc (`color: #fff` sur `footer-band-copy`, le SVG est en `currentColor`) ; lien LinkedIn posé dans `footer-bottom` (https://www.linkedin.com/company/phasevtrials, nouvel onglet). Lien « Back to top » vérifié (`#`). Étiquettes (titres des colonnes, étiquette du bandeau de `section_footer`) passées sur le mauve de la maquette `#928acd` : combo `text-size-label is-footer-label` créé, à la place de `text-color-purple` (le combo existant `text-size-label text-color-purple` sert ailleurs, on n'y touche pas). Fond : `data-bg="purple-gradient"` ajouté sur la racine d'`only-footer`, qui ne l'avait pas (même fond que `section_footer`, géré par l'embed global styles).
- **Footer, passe 2c (bandeau de `section_footer`)** :
  - Romain a créé le composant `footer-lanes` (groupe global) à partir de l'embed des pistes d'`only-footer` ; une instance est placée en tête du nouveau `footer-band` de `section_footer` ;
  - étiquette, titre, texte et zone de boutons (slot) déplacés dans le bandeau, liaisons aux propriétés conservées (Tag, Title, Text, Paragraph Visibility) ; étiquette en `text-size-label text-color-purple`, titre en `footer-statement is-cta`, texte en `text-size-large text-color-nwhite`, slot en `footer-band-actions` ;
  - ancien bloc centré `section-top` masqué (vide) ;
  - `data-line-field` et `data-line-seed` retirés de `section_footer` (le LineField dessinait par-dessus les pistes) ;
  - classes : combo `footer-statement is-cta` créé, `max-width: 58ch` ajouté à `footer-band-copy`.
- **Footer, passe 2b (bandeau d'`only-footer`)** : bandeau ajouté en tête du `container-large` d'`only-footer` :
  - pistes en SVG statique dans un embed `footer-lanes` (même tirage que la maquette, graine 7, généré par un script) ; pas de composant `footer-lanes` (l'API ne crée pas de composant à partir d'un élément d'un autre composant), l'embed sera copié dans `section_footer` en 2c ;
  - logo du site (copie de l'embed `logo-embed` de la nav), phrase « Better decisions. Connected development. » (seconde partie en `footer-statement-soft`), composant `button` jaune « Request a demo » vers `/contact` ;
  - classes créées : `footer-band`, `footer-band-copy`, `footer-statement`, `footer-statement-soft`, `footer-band-actions`, `footer-lanes`.
- **Footer, passe 2a (bas de footer, composant `footer-bottom`)** :
  - colonnes Platform, Company, Contact, Offices ; titres en `text-size-label text-color-purple` (étiquette mauve de la maquette) ; liens en `footer-item_link` ; « Company » renommé « About » ; Instagram et Evidence masqués ; colonne Offices créée (Boston, USA ; Tel Aviv, Israel) ; `is-padded` retiré de la colonne Platform ;
  - ligne légale : « © <année> PhaseV. All rights reserved. » (span `data-year` conservé), liens regroupés dans `footer-legal-links`, « Back to top ↑ » ajouté (lien `#`) ;
  - classes modifiées : `footer-grid4` (flex, espaces égaux de 2,25 rem ; 2 colonnes en small), `footer-legal` (filet en haut, alignée aux deux bords ; colonne en tiny) ;
  - classes créées : `footer-legal-links`, combo `footer-col is-contact` (order 1 en small, Contact après Offices).
- **Footer, étape 1 (structure)** : nouveau composant `footer-bottom` (groupe global), créé par Romain depuis `section_footer`, et placé aussi dans `only-footer` (ancien bloc masqué). 14 instances : une seule source pour les colonnes et la ligne légale. Ligne de copyright en double sous `section_footer` masquée. Page 404 : footer détaché (liens vides) masqué, remplacé par `only-footer`. Aucun changement visuel voulu.
- **Footer, maquette validée** (direction B, https://claude.ai/artifact/La9Eb3dv6HnMeYdjFX6EYV) :
  - bandeau avec pistes façon swimmer plot en SVG statique ;
  - pages sans appel à l'action (`only-footer`) : logo du site, phrase « Better decisions. Connected development. », bouton « Request a demo » ;
  - pages avec appel à l'action (`section_footer`) : même bandeau, avec l'étiquette (en mauve au lieu du jaune), le titre, le texte et les boutons propres à chaque page, sans logo ; deux boutons côte à côte sur desktop, empilés en pleine largeur en mobile ;
  - colonnes Platform (5 produits, sans description), Company (Company, Resources, Contact), Contact (e-mail, LinkedIn), Offices (Boston, Tel Aviv), séparées par des espaces égaux ; en mobile, deux colonnes et Contact après Offices ;
  - ligne légale : copyright, Terms, Privacy, Back to top ;
  - pas d'Instagram (l'entreprise n'a pas de compte), pas de lien Evidence (page en brouillon).
- **Evidence** : page passée en brouillon par Romain. Liens restants à traiter : lien Evidence des deux footers, nav détachée de Contact, bouton du footer de Response.

### 2026-10-20

- **Documentation** : création de `MANIFEST.md`. `CLAUDE.md` mis à jour : règle du manifest, architecture (sept entrées, socle `hero-stage`), convention des heros produit à deux modes, exceptions au montage, tableau des pages avec leurs tags.
- **Home** : contenu de Home DEV reporté dans la vraie Home (option retenue pour garder l'ID de page, l'URL `/` et les liens). Loader standard ajouté en tête du footer, `main.js` en `v0.4.0`. Les scripts existants (carte de décision, quotes, Swiper) sont conservés.
- **Release `v0.4.0`** : loaders de ClinOps, Response, Trial et Portfolio passés de `v0.3.0` à `v0.4.0`, scripts d'onglets conservés.
- **Socle `hero-stage`** : mode bloc mobile appliqué aux cinq heros produit, page par page (ClinOps, Response, Trial, Portfolio, puis Conductor branché sur le socle). Slots ajoutés en dernier enfant de la grille `header_content`. En mode bloc : carte ClinOps calée sur la largeur, axe de la tornade Portfolio centré à 50 %.
- **ClinOps** : Romain a réglé la colonne de texte en « Order : Last » sur tablette, comme sur les autres pages produit.
- **AI Conductor** : hero à deux modes (fond desktop, bloc 4:3 en mobile). Premier slot placé dans `header_image-wrapper`, puis déplacé en dernier enfant de la grille après la suppression du bloc de droite par Romain.

### 2026-10-19

- **ClinOps, Response, Trial, Portfolio** : fonds animés des heros, un module et une entrée par page, div de montage en premier enfant du header, image placeholder masquée puis bloc supprimé. Réglages ClinOps : carte centrée, pleine hauteur, descendue de 5 %.
- **Release `v0.3.0`**.

### 2026-10-17

- **Home DEV** : loader passé de `v0.1.0` à `v0.2.0` (active platform-hub).
- **Footer** : maquette de refonte en page privée, non appliquée : https://claude.ai/artifact/La9Eb3dv6HnMeYdjFX6EYV

### 2026-10-16

- **Company, hero** : line field du proto validé, intégré en module (`company-hero-lines`). Le header passe de `data-line-field` à `data-pv="company-hero"`.
- **Release `v0.2.0`**.
- **Audit complet** du site (structure, code custom, classes), en page privée : https://claude.ai/artifact/PzjNVzteKJNHLb798ggTpd

### 2026-10-15

- **Company, Build with us** : le bloc ne s'affichait pas. Cause : le div de montage était dans un embed qui faisait 0 px de large (flex centré). Correctif : le montage passe sur l'embed lui-même.
- **Company, About us** : image retirée, trois colonnes de texte (voir plus haut).

## Points ouverts

- Home : pas de titre SEO ni de meta description.
- Home DEV : à passer en brouillon pour qu'elle ne soit plus publiée à `/home-dev`.
- Menus : lien BonV du menu Platform en URL `/bonv` (pas en type page), à repasser en lien de page dans le Designer si on veut qu'il suive un changement de slug ; pas d'état actif sur la page BonV.
- BonV, hero `v0.13.0` : à publier, puis vérifier la fluidité (Canvas 2D, environ 3 500 points) et le mode bloc sur mobile.
- `section_header` tablette (height auto + min-height 100svh) : à publier, puis vérifier sur iPhone les pages produit, Company (au moins un écran) et Resources (hauteur du contenu).
- Home, hero `v0.12.1` : à publier, puis vérifier sur un vrai mobile (bloc carré sous le texte, espacement 2rem, points coupés aux bords) et les cinq formes.
- `platform-tabs` : point de montage sans module.
- Nettoyage de fin de refonte (code des pages) : ancien script d'onglets GSAP et son CSS encore dans le footer de Response (plus d'onglets sur la page depuis la refonte), même copie sur Portfolio et AI Conductor, à retirer quand ces pages sont refaites ; ancien point de montage `response-hero-bg` et `platform-connect` v1 à vérifier dans `response.js`.
- Brief ClinOps : opacité côté texte, Amériques sous le texte.
- Brief Response : lisibilité de la séparation des deux bras.
- Brief Trial : lisibilité des croisements entre courbes.
- ClinOps workflow : l'étape Feasibility est la moins lisible en capture fixe, à juger en ligne ; chiffres illustratifs (aucune valeur affichée).
- ClinOps Proof : la part de sites recommandés (40 %) et la dispersion de chaque groupe sont des hypothèses ; seuls les 357 sites et les deux moyennes sont réels, à faire confirmer par PhaseV.
- Plateforme connectée : valeur exacte de `.is-lightpurple` et lisibilité du cœur jaune à capturer en ligne ; flux à juger en ligne avant de toucher aux comptes de particules.
- Success story Trial : puissance réelle du design fixe inconnue (posé sur la ligne des 90 % en attendant le client) ; lisibilité du jaune cerclé sur le fond `.is-lightpurple` à confirmer.
- Brief Conductor : vitesse du glissement en mode bloc (environ 3,5 s).
- Audit : liens morts, contenu provisoire de Contact, SEO, code dupliqué, ménage des classes (voir la page d'audit).
- Footer : maquette validée, structure faite (étape 1), bas de footer fait (passe 2a), bandeaux faits (passes 2b et 2c), restent la vérification en Preview et les liens (étape 3). LinkedIn fait ; reste à savoir si les pages Terms et Privacy existent.
- Resources : texte du bouton « Watch recording » à adapter pour les cartes qui ne sont pas des webinars.
- Pages produit sans `inner-nav` : à valider en Preview sur les cinq pages (largeur de `feature-grid` avec les vidéos en `container-large`). Ensuite, décider du sort du composant `inner-nav` (plus aucune instance), de `._1st` et du CSS `data-sticky-nav-offset`.
- ClinOps, rythme vertical : padding-bottom irréguliers (40 px sous The PhaseV difference, 145 px sous le workflow, 80 px sous les blocs feature) ; `padding-section-custom2` ne se réduit qu'en mobile.
- Company, « PhaseV at a glance » : h2 et texte d'intro proposés par Claude, à valider ; chiffres à confirmer par PhaseV (l'ancien site disait 45+ clients) ; vérifier en Preview le compteur et l'alignement icône / chiffre ; supprimer l'ancien contenu masqué après validation.
- Company, SAB : vérifier en Preview le cadrage 4:5 des portraits (Leadership et SAB) ; les entrées CMS seront en ligne à la publication du site.
- Home, citations : vérifier en Preview (cartes, flèches desktop et mobile, logos) ; NeuroSense sans auteur nommé ; citations tronquées en « … » dans l'original (NeuroSense, Alimentiv, iOMEDICO) ; supprimer l'ancien `quotes-wrapper` et peut-être le composant `quote` après validation.
- Home, Evidence : +53 % (brief ClinOps) contre 0.43 / 0.28 = +54 %, à faire trancher par PhaseV ; titre du cas proposé par Claude ; lien « Read the case » à réactiver avec la page Evidence.
- Line field v2 : vérifier en navigateur (rendu des textures fines, perfs, fuites) ; coller ou non le fallback animé dans l'embed `global styles` ; display names Navigator non posés.
- Company, Investors : vérifier en Preview (taille des logos dans les cartes, tablette et mobile) ; intro proposée par Claude ; « Selected collaborators and partners » masqué en attendant de vrais logos, les 7 entrées CMS provisoires restent.
- Rythme vertical : `padding-section-main` validé sur Company (règle dans `CLAUDE.md`), posé sur la Home (à vérifier en Preview) ; autres pages à migrer à leur refonte.
- Evidence en brouillon : les fiches `/evidence/<étude>` restent publiées via le template.
- Case Studies, Webflow : pages et template construits, `v0.14.0` en place ; à faire dans le Designer : relier les 4 listes de tags (« Tags Products » → champ Products, « Tags Areas » → champ Therapeutic Areas, puis un Text Block lié à Name, classe `post_date` sur les cartes, `text-size-label text-color-neutralw` dans le header du template), lier le SEO du template (SEO Title, Meta Description, image Open Graph) ; publier puis vérifier `/case-studies` et quelques fiches (NSCLC, drépanocytose, Denali, Seamless) en desktop et mobile ; templates des collections Case Study Products et Case Study Therapeutic Areas générés par Webflow et publiables (pages vides `/case-study-product/...`), à désactiver ou masquer ; 21 assets `cs-*.jpg` en doublon dans la bibliothèque, à supprimer avec accord ; 4 anciennes case studies dans Resources (Oramed, SLE, Phase III, Phase II) qui doublonnent en partie la bibliothèque, sort à décider ; structure Evidence à masquer ; choisir les études mises en avant (header) ; valider la copy proposée (titres « What it changes, team by team. », « Questions, answered. », « More … case studies », état vide) ; trancher le jaune du chiffre clé (repris du bloc Evidence de la Home, alors que la charte le réserve au moment de décision) ; labels de la fiche (4 aujourd'hui, peut-être 2 comme les articles).
- Case Studies, contenu client : aires de Trial #6 à fournir ; chiffres divergents entre bibliothèque et pages produit (Trial #1 : 629 → 574 et $6.05M contre 630 → 575 et $6M+) ; Oramed et Denali nommés dans les études mais anonymes sur les pages produit ; cas cités sur les pages produit absents de la bibliothèque (cancer du sein et CRO bid-defense pour ClinOps, neurologie p = 0.008 et MDD pour Response).
- Trial, refonte : success story C à retravailler ; chiffres du document (630 → 575, $6M+, 90%+) contre l'animation et la bibliothèque (629 → 574, $6.05M, 90.3 %) à faire trancher par le client ; intégration Webflow (page `6a7f24a28679cdce6cd676e7`), module `src/faq.js`, CSS de la success story et du workflow A, release et loader `trial.js` ; gris de `.is-lightpurple` global ou local.
- Plateforme connectée cartes : remplacer `src/platform-connect.js` par `protos/trial/platform-connect-cards.js` (5 pages produit), à valider sur chaque page (couleur et motif de chaque produit au centre).
- Style affiné : porter le style sur les autres pages produit et la page système ; plan d'intégration Webflow à écrire (Roboto et variables, verre dans l'embed global styles, module fond animé dans `site.js`, thème sombre des graphes) ; fichiers inutilisés à trier avec accord (`_kit/platform-bonv.js`, `_kit/hte-glossy.js`, CSS `af-win` / `af-ev`).
- Nouvelle copy des pages produit (`medias/DOCS/PAGES`) : placeholders restants (BonV `[XX%]` et vidéos, Portfolio, Response) et coquilles (Response : mot manquant dans le hero, « timeline » en double) à signaler au client.
