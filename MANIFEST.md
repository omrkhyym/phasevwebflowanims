# Manifest PhaseV-anims

Journal de tout ce qui a été fait sur le repo et sur le site Webflow PhaseV. Chaque modification future y est ajoutée, en haut du journal, avec sa date.

## État actuel (22 octobre 2026)

### Pages animées

| Page | ID Webflow | Entrée | Tag du loader | Points de montage |
|---|---|---|---|---|
| Home | `6a7494c19b6df905487ffd48` | `main.js` | `v0.10.0` | `hero-homepage` et `gantt` (dans des embeds HTML), `platform-hub` (div), `platform-tabs` (div sans module), `evidence-bars` (bloc des barres de la carte `ev-case`) |
| Home DEV | `6ac94d28fa53acb3a833343b` | `main.js` | `v0.2.0` | mêmes points que Home ; loader non standard (`const s` global) |
| Company | `6a841e56404f040c0e6bc5cc` | `company.js` | `v0.11.0` | `company-hero` (attribut sur le header du hero), `company-careers` (attribut sur l'embed du bloc Build with us) |
| ClinOps Optimizer | `6a7d9a55a0f59e17da317ab6` | `clinops.js` | `v0.8.0` | `clinops-hero-bg`, `clinops-hero-slot`, `platform-connect`, `clinops-proof` (div dans le `.animation-wrapper` `1cf29878…` du bloc Proof), `clinops-workflow` (div `margin-top margin-large` dans le `container-large` du bloc « The ClinOps workflow ») |
| Response Optimizer | `6a7efdffc7cdcaeee09a8ad5` | `response.js` | `v0.6.0` | `response-hero-bg`, `response-hero-slot`, `platform-connect` |
| Trial Optimizer | `6a7f24a28679cdce6cd676e7` | `trial.js` | `v0.6.0` | `trial-hero-bg`, `trial-hero-slot`, `success-design-space` (div dans `.animation-wrapper` du bloc Success story), `platform-connect` |
| Portfolio Optimizer | `6a7eebc5135141aa80fab3ff` | `portfolio.js` | `v0.6.0` | `portfolio-hero-bg`, `portfolio-hero-slot`, `platform-connect` |
| AI Conductor | `6a7dcf32f8a4279d35e73b0c` | `conductor.js` | `v0.6.0` | `conductor-hero-bg`, `conductor-hero-slot`, `platform-connect` (dans un `.animation-wrapper` créé à la place de l'`.entry-grid`) |

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
| `src/platform-connect.js` | Bloc « plateforme connectée » des cinq pages produit : particules, cinq amas, flux entre produits (proto `protos/phasev-platform-particles-proto.html`). Produit central via `data-current`, noms surchargeables par `data-name-<clé>` |
| `src/clinops-workflow.js` | Bande « The ClinOps workflow » : une population de particules, patients puis sites puis plan d'enrôlement, quatre étapes et reforecast (proto `protos/phasev-clinops-workflow-proto.html`) |
| `src/clinops-proof.js` | Bloc Proof de ClinOps : levée d'aveugle, 357 sites, moyennes 0.43 / 0.28, accolade +53 % (proto `protos/phasev-clinops-proof-proto.html`). Chiffres en attributs : `data-sites`, `data-rec`, `data-other`, `data-gain` |
| `src/success-design-space.js` | Success story Trial Optimizer : nuage de designs simulés, cible 90 %, design retenu N 574 (proto 1 de `protos/phasev-success-story-protos.html`) |

### Socle des heros produit (`src/hero-stage.js`)

- Deux points de montage par page :
  - `<div data-pv="<nom>-hero-bg"></div>`, premier enfant du header du hero : fond plein cadre au-dessus de 991 px ;
  - `<div data-pv="<nom>-hero-slot"></div>`, dernier enfant de la grille `header_content` : bloc 4:3 à 991 px et moins.
- Un seul canvas, déplacé d'un emplacement à l'autre au changement de breakpoint, et une seule boucle.
- CSS injecté et ciblé avec `:has()` : aucune classe Webflow n'est modifiée.
- Sans slot sur la page, l'animation reste en fond à toutes les tailles.
- En mode bloc : pleine opacité, sans parallaxe.
- Sur tablette, la colonne de texte `header_content-left` est réglée en « Order : Last » dans le Designer, donc le bloc s'affiche au-dessus du texte. C'est un réglage d'élément, invisible dans l'API, qu'on retrouve dans le CSS publié.
- Le build produit un chunk partagé, à commiter avec `dist/`. Depuis `v0.6.0`, `hero-stage` et `platform-connect` servent aux cinq mêmes entrées et Vite les réunit dans `dist/platform-connect-<hash>.mjs` (avant : `dist/hero-stage-<hash>.mjs`).

### Releases

| Tag | Commit | Contenu |
|---|---|---|
| `v0.1.0` | `e791c4a` | Hero et gantt de la Home |
| `v0.2.0` | `7e8b0a3` | Entrée Company (hero lines, careers), platform-hub sur la Home |
| `v0.3.0` | `107ab12` | Fonds animés des heros ClinOps, Response, Trial, Portfolio |
| `v0.4.0` | `591d543` | Hero AI Conductor, socle `hero-stage`, mode bloc mobile sur les cinq heros produit |
| `v0.5.0` | `fc6e0a4` | Success story Trial Optimizer (`success-design-space`) ; seul `dist/trial.js` change |
| `v0.11.0` | `7a7e2ab` | `site.js` (line field v2 + fond flottant) ; `company.js` sans hero |
| `v0.10.0` | `eb2f795` | Gantt de la Home : libellé « FINAL PROTOCOL » ; seul `dist/main.js` change |
| `v0.9.0` | `ad90520` | Barres du cas Evidence de la Home (`evidence-bars`) ; seul `dist/main.js` change |
| `v0.8.0` | `9f43e3b` | Bande « The ClinOps workflow » (`clinops-workflow`) ; seul `dist/clinops.js` change |
| `v0.7.0` | `3767f0e` | Bloc Proof de ClinOps (`clinops-proof`) ; seul `dist/clinops.js` change |
| `v0.6.0` | `2bc93ac` | Bloc « plateforme connectée » (`platform-connect`) sur les cinq pages produit ; chunk partagé renommé `platform-connect-<hash>.mjs` |

### Modifications Webflow encore en place

- `data-line-field` retiré du header du hero sur Company, ClinOps, Response, Trial, Portfolio et AI Conductor. Il est toujours présent sur la Home.
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

### 2026-10-28

- **Home, header : copie locale pour la refonte** (`protos/phasev-home-header-proto.html`). Header de la Home publiée copié tel quel (section `section_header`, sans navbar, à la demande de Romain), avec le CSS Webflow publié en lien et l'embed global styles recopié. Le proto importe les vrais modules (`/site.js`, `/src/hero-homepage.js`) : à ouvrir via `npm run dev` sur `http://localhost:5173/protos/phasev-home-header-proto.html`. Rien de changé en ligne.
- Constat à la copie : le header publié n'a plus `data-line-field` (seulement `data-bg="purple-gradient"`), et le div `hero-homepage` est dans un embed frère de `header_content`, pas dans `header_image-wrapper`. Pas de boutons dans le hero.
- **Home, hero (`src/hero-homepage.js`, local, non releasé)** : chiffres remplacés par des particules (disques antialiasés) et effet TV supprimé (passe 2 : courbure, aberration chromatique, halo, scanlines, bruit, scintillement), à la demande de Romain. Retirés avec : atlas de chiffres, tirage `DIG`, police du `h1`, framebuffer intermédiaire. Les particules se dessinent directement sur le canvas transparent. Formes, morphing, parallaxe et profondeur inchangés. Puis particules réduites et plus nombreuses : `rMul` 2.6 → .6, tous les points dessinés (avant : un sur deux), et facteur de densité `D = 3` dans `buildStates` (4200 points ; nombres de points multipliés par `D`, pas d'empilement divisés par `D` pour garder les proportions de chaque forme).
- **Home, hero mobile (≤ 991 px, local, non releasé)** : l'anim était posée sur le texte (bloc en absolu, CSS prévu pour `header_image-wrapper` qui n'existe plus). Elle passe dans le flux, en bloc 4:3 pleine largeur sous le texte (`margin-top:2rem`), sans débordement horizontal (fin des 112vw / 124vw). Le CSS publié fixe `section_header` à `100svh` et la grille à `100%` : via `:has()`, sous 991 px, la section passe en `height:auto; min-height:100svh` centrée en flex colonne, `header_component` et `header_content` en `height:auto`. Desktop inchangé. Règles `header_image-wrapper` mortes laissées en place.

### 2026-10-26

- **Archive du site en ligne** : clone statique de https://www.phasevtrials.com dans `OLD_SITE/` (55 pages, 354 fichiers, 53 Mo), exclu de git via `.gitignore`. Sert à garder le contenu au cas où le site disparaît. Seuls le domaine et ses fichiers sur le CDN Webflow sont téléchargés ; les sites externes et https://ai-conductor.phasevtrials.com/ sont exclus (liens laissés en absolu). Rapport dans `OLD_SITE/_clone-report.txt`. HTML nettoyé pour une ouverture en `file://` : attributs `integrity` et `crossorigin` retirés (ils bloquaient CSS et JS), script traceur Webflow retiré, URL `//…` passées en `https://`.
- **AI Conductor, bloc site produit** : passé en fond blanc (`section_layout is-white`, `data-bg` retiré), textes en couleurs par défaut (label gris, h2 navy, intro `text-size-large`).
- **AI Conductor, bloc site produit (version A du proto `protos/phasev-conductor-site-cta-protos.html`)** : nouvelle section après le hero (la page n'avait que le hero et le footer). `section_layout is-gradient` + `data-bg`, `padding-section-main`, `container-large`, `grid-2 gap-8,5` (2 colonnes, 1 sous 767 px). Gauche : label « Explore the product », h2 `text-size-display text-color-alternate` « See AI Conductor in action », intro `text-size-large text-color-alternate`, composant `button` (variante Yellow) « Visit the AI Conductor site » → https://ai-conductor.phasevtrials.com/ (nouvel onglet, `noopener`). Droite : image `ai-conductor-site-browser.webp` (capture du header du site produit dans une fenêtre navigateur composée, coins arrondis transparents), source dans `protos/assets/`. Aucune classe créée.

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

- **Contact, nouvelle mise en page (version B du proto `protos/phasev-contact-protos.html`)** : section `is-white` → `is-gradient` + `data-bg="purple-gradient"` ; `contact-form-div` en 2 colonnes (1fr / 1.15fr, gap 5rem, 1 colonne sous 991 px) ; combo `form-wrapper is-contact` en carte blanche (radius 1.5rem, padding 3rem, ombre) ; `form_text-field is-contact` en filets `#e3e1ef`, radius .75rem ; label « Contact » ajouté ; bouton « Submit » → « Send message ». CSS ajouté à la fin du head de la page (code existant conservé) : intro en blanc, colonne collante en desktop, cases produits en pastilles. Formulaire et noms de champs inchangés (Webflow natif, submissions vérifiées).

### 2026-10-23

- **Home, rythme vertical** : `padding-global padding-section-main` sur les 7 sections de contenu (à la place de `custom1` et `large`, section masquée `hide` comprise). Hero inchangé (`padding-section-home_header`).

- **Company, rythme vertical** : nouvelle classe combo `padding-global padding-section-main` (7.5rem haut et bas, 5rem en tablette, 4rem en mobile), validée par Romain. Posée sur les 6 sections de contenu (About us, At a glance, Leadership, SAB, Investors, Build with us) à la place de `xxlarge`, `medium` et `large`. Hero inchangé (`padding-section-company-hero`). Test sur Company seulement.

- **Company, Build with us** : texture du line field `waterfall` → `matrix` (choix de Romain), registre `LINE-FIELD.md` à jour.

- **Company, Investors** (ex « Enrollment Simulation ») : bloc investisseurs comme sur l'ancien site /about, proto `protos/phasev-company-investors-proto.html`. Six logos (Accel, Insight Partners, Exor Ventures, Viola Ventures, LionBird, Getty) repris de l'ancien site, rognés et passés en navy `#141238` (texte d'Exor évidé), uploadés en assets `investor-*.png`. CMS Partnerships : les 3 « Backed by » provisoires remplacés par Accel, Insight, Exor, 3 entrées créées. En-tête sur le modèle « at a glance » (`section-top 2col is-bottom`, label « Investors », h2 « Backed by leading investors » en `heading-style-h2`, intro à droite). Classes existantes modifiées : `backed-by-grid` 6 colonnes (3 en tablette, 2 en mobile), `partnership-logo` en `contain` avec padding. `collaborators-wrapper` masqué (7 logos provisoires).

- **Line field v2 + fond flottant** (brief `brief-line-field-v2.md`, proto `protos/phasev-line-textures-proto7.html`) : nouvelle entrée `site.js` (fond flottant sur chaque `[data-bg]`, line field à 6 textures portées à l'identique) ; registre `LINE-FIELD.md`. **Release `v0.11.0`** (`7a7e2ab`).
  - Webflow : script `window.LineField` du footer global remplacé par le loader `site.js` (`v0.11.0`, `?dev`) ; sauvegarde dans `protos/legacy/`. Attributs posés selon `LINE-FIELD.md`, tous les `data-line-seed` retirés. Hero Company : `data-pv="company-hero"` retiré, `swimmer` ; `company.js` ne monte plus `company-hero-lines` (fichier gardé), loader Company `v0.2.0` → `v0.11.0`. Footers : `swimmer` sur `footer-band` des deux composants, composant `footer-lanes` masqué.
  - Écarts au brief : pas de seed (décision de Romain) ; les couches injectées passent devant la règle de `hero-stage` (sélecteur renforcé) ; fallback CSS prêt dans `webflow/global-styles-data-bg.css` avec `overflow:clip` seulement sans `.pv-live` (sinon le hero Home serait rogné), **non collé** dans l'embed `global styles` : le JS remplace déjà l'ancien dégradé, l'ancienne règle reste le fallback.
  - Tests locaux (pages publiées + nouveau code) : fonds sans bord, hero ClinOps au-dessus du fond, fallback sans JS propre, reduced motion figé, mobile OK, calm zones vérifiées par bloc, textures dessinées (mesure pixels). Rendu animé fin (waterfall, km), perfs et fuites à vérifier par Romain dans un vrai navigateur.

- **Home, « The Problem » (gantt)** : libellé « PROTOCOL FINAL » → « FINAL PROTOCOL » dans `src/gantt.js` (texte en dur dans `TASKS`), à la demande de Romain. **Release `v0.10.0`**, loader de la Home passé de `v0.9.0` à `v0.10.0`.
- **Home, « The PhaseV Platform »** : ordre des questions changé, à la demande de Romain : Portfolio → Trial → ClinOps → Response → AI Conductor (avant : Portfolio, Response, ClinOps, Trial, AI Conductor). Fait dans Webflow en réordonnant les instances `dm-panel` de `#dm-panels` : `platform-hub` construit les onglets dans l'ordre du DOM, aucune release. Chaque panneau garde son `target`, donc sa forme de nuage. Home DEV non touchée.
- **Home, bloc Evidence** refait (proto V1 de `protos/phasev-home-evidence-proto.html` : une carte, deux moitiés égales ; le proto simule aussi 3 cas pour le futur slider). Décision de Romain : un seul cas au lancement, Swiper gardé pour la suite.
  - En-tête : nouveau `section-top _2col is-bottom` (label + h2 à gauche ; intro + flèches `slider-arrows` sombres déplacées à droite) ; ancien `slider-top` masqué.
  - Cas : nouvelle slide `swiper-slide full` > `ev-case` (moitié récit : produit, type, titre « Recommended sites recruited 53% faster. », texte, lien « Read the case » masqué tant qu'Evidence est en brouillon ; moitié données : +53 %, barres 0.43 / 0.28, paire 349 ≈ 357). Ancienne slide sortie du `swiper-wrapper` et masquée (une slide masquée compterait encore pour Swiper).
  - Classes créées (préfixe `ev-case`, les `evidence-*` existent déjà pour la page Evidence) : `ev-case`, `ev-case_half` (+ combo `is-data`), `ev-case_meta`, `ev-case_small`, `ev-case_title`, `ev-case_link`, `ev-case_kpi`, `ev-case_kpi-n`, `ev-case_kpi-t`, `ev-case_bars`, `ev-case_bars-head`, `ev-case_bar` (+ `is-main`), `ev-case_track`, `ev-case_fill` (+ `is-main`), `ev-case_pair`, `ev-case_pair-n`, `ev-case_op`.
  - Repo : module `src/evidence-bars.js` monté depuis `main.js` sur `[data-pv="evidence-bars"]` (le bloc des barres) ; chaque remplissage porte `data-value` / `data-max`, le module fixe la largeur et anime l'entrée à l'écran (décalage 0,12 s, reduced motion = état final).
  - Script Swiper de la Home : les flèches sont masquées quand le slider est verrouillé (`isLocked`, événements `lock` / `unlock`) ; vaut pour tous les sliders de la page.
  - Espace entre l'en-tête et la carte : `margin-top` sur le combo `swiper-div evidence` (2.6875rem, 2rem sous 991 px, 0 sous 479 px où le combo a déjà 2rem de padding), valeurs de l'ancien `slider-top`.
  - Testé en `?dev` par Romain. **Release `v0.9.0`** (seul `dist/main.js` change), loader de la Home passé de `v0.4.0` à `v0.9.0`.

- **Home, citations** : l'accordéon épinglé (ScrollTrigger + GSAP, 3 citations identiques de remplissage) remplacé par un slider Swiper de cartes, décision de Romain (proto C de `protos/phasev-home-quotes-proto.html`). Textes : les 9 témoignages de la section « What our partners are saying » de phasevtrials.com, repris en entier ; logos Enlivex, EMD Serono, NeuroSense, Oramed, Alimentiv, iOMEDICO uploadés en assets (`logo-*.svg|avif`), guillemet en asset `quote-mark.svg` (source `protos/icons/`).
  - Structure : `slider-top` (label « Testimonials », h2 `text-size-display` « What our partners are saying », composant `slider-arrows` base) + `swiper-div` `data-swiper="news"` (`swiper` > `swiper-wrapper` > 9 × `swiper-slide is-quote` > `quote-card`) + `slider-top_right mobile-only` avec un second `slider-arrows`, comme Latest news. Slides statiques, éditables dans le Designer. Aucun nouveau JS : le script Swiper existant de la Home (type `news`) pilote le slider.
  - Classes créées (accord de Romain) : combo `swiper-slide is-quote` (hauteur auto, 36rem / 30rem / 85 %), `quote-card`, `quote-card_mark`, `quote-card_text`, `quote-card_foot`, `quote-card_logo` (silhouette navy). Textes en classes existantes (`quote-head`, `heading-style-h5 text-color-navy`, `text-size-medium text-color-gray`, `text-size-medium text-color-lpurple`).
  - Section : attributs `data-quotes` et `data-quotes-pin` retirés ; classes ramenées à `section_layout is-lightpurple` (sans `is-padding`, qui centrait en flex) et `padding-global padding-section-custom1` (sans `is-pin`, 100vh) ; ancien `quotes-wrapper` masqué.
  - Code de page de la Home : script d'accordéon retiré du footer, correctifs CSS mobile `[data-quote]` retirés du head ; loader `v0.4.0`, carte de décision et script Swiper inchangés. Home DEV non touchée.

- **Company, Scientific Advisory Board** : contenu remplacé selon `medias/people/SAB-content.md` (non versionné). Bloc gardé tel quel (slider Swiper, composant `leadership-card` variante « dark ») : décision de Romain, on n'affiche que le nom avec titres et le poste actuel. Proto de référence `protos/phasev-company-sab-protos.html` (deux dispositions, nom + poste seulement).
  - CMS « Scientific Advisory Boards » : Klaus Beck, MD, PhD, PhD (deux doctorats, confirmé par Romain), William F. Doyle, Avi Kulkarni, PhD créés ; Howard Trachtman, Murray Urowitz, Sofia Villar mis à jour (portrait et poste actuel dans `position`, qui valait « Scientific Advisory Board ») ; ordre 1 à 6 selon le fichier ; David Perry, Jennifer Hill, Marcia Levenstein, Melanie Ivarsson, Jerald Schindler archivés (pas supprimés).
  - Six portraits 928 × 1152 uploadés en assets (`sab-<nom>.jpeg`).
  - `leadership-image` : `aspect-ratio` 1/1 → 4/5, à la demande de Romain, pour toutes les cartes (Leadership, son slider mobile, SAB). Les photos de Leadership sont en 551 × 803, recadrage sans perte de visage.
  - Les trois nouveaux membres n'ont pas de lien LinkedIn (champ vide, non affiché par la carte).
  - Écart entre les photos doublé partout, à la demande de Romain : `spaceBetween` 20 → 40 dans le script Swiper du code de page de Company (sliders SAB et Leadership mobile ; le reste du bloc inchangé, loader `v0.2.0` compris) ; `leadership-grid` column-gap 1.25rem → 2.5rem.

### 2026-10-22

- **Company, bloc « PhaseV at a glance »** refait, décision de Romain : on ne garde que les chiffres. Proto `protos/phasev-company-glance-protos.html` (grille 3 × 2, filet light-purple, icône sur la ligne du chiffre), construit sur les tokens du site (Aspekta, display, `number-span is-company`, `company-subtitle`). Les premiers essais (schéma données → couche → usages, palette des animations, Roboto) ont été écartés : hors charte UI.
  - Webflow : h2 « Trusted across clinical development. » (`text-size-display text-color-alternate`) ajouté dans `section-top_left` ; `section-top_right` + texte (`text-size-large text-color-alternate`) ajoutés ; grille `glance-grid` insérée après l'ancien contenu ; `grid-company` (`8b40…ff1a`) et `grid-company-s` (`ff1c72b9…`) masqués.
  - Classes créées (accord de Romain) : `glance-grid` (3 colonnes, 2 sous 767 px), `glance-stat` (filet 0.5px `#684a9e`, colonne), `glance-stat_head` (icône + chiffre en ligne), `glance-icon` (3rem, 2.5rem sous 767 px).
  - Six icônes SVG dessinées dans le style des icônes du site (grille 80, trait 3.2, jaune `#E1C721`), sources dans `protos/icons/`, uploadées en assets : `glance-sponsors`, `glance-top20`, `glance-trials`, `glance-records`, `glance-models`, `glance-papers`.
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
- Home, header : refonte en cours dans `protos/phasev-home-header-proto.html`, à reporter en ligne une fois validée.
- `platform-tabs` : point de montage sans module.
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
