# Intégration Webflow du style affiné

Document vivant. Il se remplit à chaque bloc validé, pendant la refonte des pages produit, pour que le passage dans Webflow à la fin soit mécanique. Le plan des releases se fige quand toutes les pages sont faites.

Pages de référence : `trial-affine`, `response-affine`, `clinops-affine`, `portfolio-affine` (protos dans ce dossier). Restent : AI Conductor, BonV, puis Home, Company, Case Studies et articles.

## Principes

- **Un composant Webflow par bloc**, les mêmes sur toutes les pages. Le contenu passe en propriétés ou en slot, la mise en page en variante.
- **Le rendu suit le fond de la section.** Une carte, une frise ou une success story posée dans une section sombre prend le verre sombre d'elle-même, sans combo class à choisir. C'est le CSS de contexte (`[data-af-dark] …`, `.is-light …`), qui ne peut pas vivre dans le Designer : il va dans l'embed du composant « global styles », à côté de `data-bg` et des boutons.
- **Le JS ne porte que l'animation** (contrat habituel : `data-pv`, garde, `destroy()`), le texte reste dans Webflow.
- **Pas de nouvelle classe sans accord de Romain.** Les classes `af-*` et `ss-*` du proto sont listées plus bas, à valider une par une.

## Fondations

| Élément | Proto | Webflow |
|---|---|---|
| Police | Roboto variable 300 à 700, Roboto Mono 400 (Google Fonts) | Site settings, Fonts : Roboto (300, 400, 500, 600, 700) et Roboto Mono (400) ; variable `--_typography---font-primary` sur Roboto |
| Graisses | titres display 300, h1 hero 500, h4 500, chiffre clé de success story 600 | styles des classes de texte existantes |
| Labels | Roboto Mono, .75rem, interlettrage .12em, capitales | classe `text-size-label` |
| Jaune des surtitres en sombre | `[data-af-dark] .text-size-label` | CSS de contexte (embed) |
| Blanc des fonds | `#ffffff` sur `is-white` (au lieu de `#f8f8f8`) | fond de `.is-white` seulement ; ne pas toucher `--neutral-white`, qui sert aussi aux textes |
| Verre | variables `--af-glass`, `--af-glass-dark`, `--af-glass-rose`, `--af-edge`, `--af-edge-dark` | variables CSS dans l'embed (les dégradés ne passent pas en variables Webflow) |
| Bord en verre | pseudo-élément masqué (`mask-composite: exclude`) | embed uniquement, le Designer ne gère pas ces pseudo-éléments |
| Fond animé BonV + grain | `_kit/affine-bg.js`, monté par `affine.js` sur le hero, les sections `data-af-bg` et les scènes vidéo | module dans `site.js` (global), monté sur un attribut ; le grain vient déjà du fond flottant de `site.js` |
| Rythme | sections 7.5 / 5 / 4rem, colonnes 3rem, en-tête → contenu 4.5rem | `padding-section-main` (règle CLAUDE.md), gaps des grilles |

## Composants

Statut : **validé** (rendu arrêté sur au moins une page), **à confirmer**.

| Composant | Variantes | Propriétés / slots | Classes Webflow | Pages | Statut |
|---|---|---|---|---|---|
| Section | fond `is-white`, `is-light`, sombre (`is-gradient` + `data-bg="purple-gradient"` + `data-af-bg` + `data-af-dark`) | slot contenu | existantes + 2 attributs | toutes | validé |
| En-tête de section | centré (premier bloc, étapes) ; à gauche sur une colonne (le reste) | label, titre, intro | `section-top`, `align-center` / `left-align` ; centré : combo `af-head-center` (marge 4.5rem, intro 52rem) **à créer** | toutes | validé |
| Carte | repère icône ou numéro ; liste à puces en option | icône, numéro, label, titre, texte, puces | `why-card`, `difference-card`, `methodology-card` → **à fusionner en un seul composant** | Response, ClinOps, Portfolio | validé |
| Ligne 50/50 (étapes) | normale ou inversée ; média vidéo, image ou graphe | label (numéroté 01, 02…), titre, texte, puces (une ou deux listes titrées, `af-list-label`), note, média | `padding-global is-feature`, `feature-grid` (+ `reverse`), `video-animation` ; section `data-wf="A"` | Trial, ClinOps, Response, Portfolio | validé |
| Frise | clair (dernière étape navy) ou sombre (dernière étape en verre rosé) | 4 étapes : clé, titre, texte | `rp-step`, `rp-step-k` (kit) **à créer** | Response, Portfolio | validé |
| Success story | avec ou sans visuel (sans : une colonne, texte d'intro `ss-body`, note) ; le fond de section décide du rendu | label, contexte, titre, chiffre clé, 1 à 3 lignes, bouton, légende du visuel (`data-cap`), visuel | `ss-*` **à créer** | Trial, ClinOps, Portfolio | validé |
| Cartes case studies | sous une success story ou en bloc seul | titre de groupe, cartes (catégorie, titre, résumé, chiffre), bouton bibliothèque filtrée | `af-cs-*` **à créer** ; liste CMS Case Studies | Response, ClinOps, Portfolio | validé |
| Chiffres | clair ou sombre ; icône oui / non ; source facultative ; 1 chiffre en demi-largeur, 2 ou 4 chiffres sur 2 colonnes, sinon 3 | chiffre, légende, icône | existant : `glance-grid`, `glance-stat`, `number-span is-company`, `company-subtitle` (Company, ABO-03, base validée dans l'inventaire) | Company, AI Conductor | validé (structure) |
| Avant / après | barré (avant / après) ou schéma (entrée non barrée, sortie en pastille) | points avant, nom au centre, points après, sortie facultative | `rp-compare`, `rp-pivot` (kit) **à créer** | AI Conductor | à confirmer |
| FAQ | aucune | questions / réponses | composant existant (`data-pv="faq"`) | toutes | validé |
| Plateforme connectée | aucune | produit courant | composant existant (`platform-connect-v2`) | toutes | validé |

Ordre de fin de page, sur toutes les pages produit : FAQ, puis plateforme.

## Modules JS à créer (release)

| Visuel | Proto | Module cible | Notes |
|---|---|---|---|
| Fond animé BonV | `_kit/affine-bg.js` + `affine.js` | `src/affine-bg.js`, importé par `site.js` | pause hors écran déjà en place ; reduced motion à vérifier |
| Graphes du kit (classement, distribution PoTS, précision, séparation) | `_kit/kit.js`, `.rp-viz[data-mode]` | `src/viz.js`, monté sur `data-pv="viz"` + `data-mode` | couleurs par variables CSS `--viz-ink`, `--viz-mau`, `--viz-tea` |
| Schéma BonV « The PhaseV answer » | `_kit/bonv-answer.js`, monté par `affine.js` (fond animé + scène) | `src/bonv-answer.js` sur `data-pv="bonv-answer"` | d'après la scène Orchestrates du film de lancement ; texte dans les enfants `[data-role]` du montage (ask-label, question, hub, targets, result, approve), masqués à l'écran ; le module fixe la hauteur (en ligne ≥ 760 px, empilé dessous) ; CSS du panneau (verre sombre, bord masqué) dans l'embed |
| Scènes BonV des étapes (Ask, Collaborate, Orchestrate) | `_kit/bonv-ask.js`, `bonv-collab.js`, `bonv-orch.js` sur le socle `_kit/bonv-draw.js` | `src/bonv-draw.js` (socle, chunk partagé) + un module par scène sur `data-pv="bonv-ask"`, `bonv-collab`, `bonv-orch` | posées dans la scène sombre des étapes ; texte dans les enfants `[data-role]` ; `bonv-answer.js` pourra passer sur le même socle |
| Design space glossy (Trial) | `_kit/design-space-glossy.js` | remplace ou complète `src/success-design-space.js` | |
| Proof glossy (ClinOps) | `_kit/clinops-proof-glossy.js` | remplace ou complète `src/clinops-proof.js` | même attributs `data-sites`, `data-rec`, `data-other`, `data-gain` |
| Hero Home (séquence de particules) | `_kit/hero-sequence.js` + `hero-lab/engine.js`, `hero-lab/scenes/*.js` (programme unique `sequence.js`) | `src/hero-home.js` sur `data-pv="hero-sequence"`, à la place de `hero-homepage` | WebGL2, ~50 000 points ; un seul programme pour toute la boucle (26,75 s), sinon les montagnes sautent aux raccords ; valeurs dans `hero-lab/SCENES.md` ; moitié des particules sous 900 px ; image fixe en reduced motion |
| Mini-scènes des cartes plateforme (Home) | `_kit/mini-scene.js` sur le socle `_kit/bonv-draw.js` | `src/mini-scene.js` sur `data-pv="mini-scene"` + `data-scene`, `data-col` | traits épaissis (essai du 2026-11-16, gardé) |
| Gantt « The problem » (Home) | `_kit/gantt-glossy.js` | remplace ou complète `src/gantt.js` | dans le grand panneau `.af-stage-wide`, fond animé à 60 % |
| Case Studies (bibliothèque et fiche) | CSS « Case Studies » d'`_kit/affine.css` (attributs `data-cs-*`) + barre segmentée des filtres (`pvSegmented` dans `_kit/affine.js`) | CSS à porter dans l'embed des deux pages (ou dans `src/case-studies.js`, qui injecte déjà son CSS) ; la pastille qui glisse dans `src/case-studies.js` | préfixe `html body` : passe devant le CSS injecté par le module ; aucune classe nouvelle |
| Animation carrières (About, Build with us) | `_kit/careers.js` sur le socle `_kit/bonv-draw.js`, monté par `affine.js` sur `data-pv="careers-affine"` (fond animé posé sur le panneau) | remplace `src/company-careers.js` (même point de montage `company-careers`, sur l'embed) | trois groupes en disques de verre fin (voile blanc à peine visible, lumière sur la tranche seulement, double filet), liés par un cercle en pointillés, qui fusionnent ; à la fusion, anneau en pointillés **jaunes** autour du groupe uni (on rejoint PhaseV, seul jaune de la section) ; points nets, sans flou ; carré au-dessus de 991 px, 4:3 dessous (le module fixe la hauteur) ; panneau : sombre éclairci (dégradé de Why it matters + fond animé BonV à 60 %), grain des sections sombres à pleine force, bord fin ; le verre est sur les disques de l'animation, pas sur le panneau |
| Navigation en « île » (toutes les pages) | `_kit/nav-island.js`, monté par `affine.js` sur `.navbar_component` ; ordre des produits et attributs posés par `nav_island()` dans `_build/build.py` | `src/nav-island.js`, chargé par `site.js` ; **remplace le script global de la navbar** (classe `is-scrolled`, masquage GSAP) : à valider avant de toucher au code global | lit la nav Webflow (logo, menu Platform, liens, bouton) et masque l'originale ; dans le composant nav : attributs `data-af-q` (question), `data-af-scene`, `data-af-col`, `data-af-group` sur les liens du menu Platform, produits dans l'ordre du parcours, lien Case Studies ajouté, Company renommé About (proposé) et placé avant Careers ; aperçus : mini-scènes de la Home (`mini-scene.js`), V de BonV (`bonv-draw.js`) |
| Footer (toutes les pages) | `footer_affine()` dans `_build/build.py` (structure), CSS « Footer » d'`_kit/affine.css` (repère `data-af-foot`) | **un seul composant footer**, avec une propriété « afficher le bandeau » (masqué sur Contact) ; remplace les trois variantes actuelles | bandeau unique (texte de la Home) sans encart : titre et bouton sur le fond du footer, filet fin dessous, sans LineField (panneau arrondi rejeté) ; liens Platform dans l'ordre du parcours, Company : About, Case Studies, Resources, Careers, Contact ; liens gris clair → blanc au survol (plus de jaune) ; nouvel élément `af-foot-mark` (logotype en grand, blanc 5 %, coupé par le bas) ; les bandeaux propres aux pages produit disparaissent |
| Contact | CSS « Contact » (base) et « Contact B » (mise en page) d'`_kit/affine.css` ; repères `data-af-contact` et `data-af-contact-b` sur la section | CSS dans l'embed de la page, **à la place** de l'embed « version B » actuel du site (pastilles sur le texte des cases, label gris, colonne collante) ; poser les deux repères et le fond sombre animé sur la section ; ajouter sous la carte la ligne de coordonnées (`data-af-contact-info` : e-mail, LinkedIn, Boston, Tel Aviv, en `text-size-label`) ; saut de ligne après « question. » dans l'intro | une colonne centrée de 54rem : en-tête centré, carte en verre sombre, champs fins et aérés, focus en bord blanc ; produits en cases compactes (case dessinée en `::before` du texte, case native transparente par-dessus) sur 4 / 3 / 2 / 1 colonnes ; bouton pleine largeur ; label en jaune ; aucune classe nouvelle |
| Hero About « Orbites » | `_kit/about-orbits.js`, monté par `affine.js` sur `data-pv="about-orbits"` (premier enfant du header) ; CSS « About hero » d'`_kit/affine.css` | `src/about-orbits.js`, remplace `src/company-hero.js` ; le module injecte son CSS (plein cadre, sous le texte) | anneaux fins décentrés à droite, points des capacités qui tournent, V du logo en plexus (115 points) ; vague concentrique toutes les 6,5 s et ondulation légère ; parallaxe au pointeur (coupée en reduced motion et en tactile) ; côté texte, fondu ; texte aligné à gauche comme les heros produit (CSS ciblé sur `.section_header.is-company`, aucune classe nouvelle) ; **retirer `data-line-field` du header** |
| Resources (bibliothèque et article) | CSS « Resources » d'`_kit/affine.css` ; barre segmentée (`pvSegmented`, étendue aux radios Finsweet) et masquage des paragraphes vides de l'article dans `_kit/affine.js` | CSS dans l'embed des deux pages (ou un module `src/resources.js`) ; attributs à poser dans Webflow : `data-af-lib` sur le `container-large` des filtres et de la liste, `data-af-article` sur le `container-small` de l'article | aucune classe nouvelle ; retirer `data-line-field` des deux heros |

## Décisions ouvertes

- **Couleur des textes en sombre** : par le contexte (proto) ou par combo classes `text-color-*` (site actuel). Recommandé : le contexte, une carte s'adapte d'elle-même.
- **Liste CMS des case studies par produit** : une propriété de composant ne règle pas le filtre d'une liste CMS. Soit une liste par page, soit un filtre posé par un module à partir d'un attribut produit.
- **Classes à créer** : `af-head-center`, `af-cs-*`, `ss-*`, et le composant carte unique. À valider avec Romain avant d'y toucher.
- **Fichiers du proto à ne pas porter** : tout `_archive/` (essais et premières versions, archivés le 2026-11-16) ; CSS `af-win`, `af-ev-*`, onglets (`[data-v="C"]`) s'ils ne servent plus après les dernières pages.

## Journal

- **2026-11-17** : **fond sombre unique** validé et appliqué à toutes les pages : heros, sections sombres, panneaux (Gantt, Why it matters, Build with us), nav. « Entre-deux » du bleu BonV et du violet d'origine du site (celui du footer). Défini une seule fois : `--af-dark-bg` et `--af-dark-panel` dans `affine.css`, palette `mid` du fond animé (`affine-bg.js`) à 60 % via `.af-dark-layer`. Webflow : une classe (ou une variable) unique pour ce fond, au lieu des copies par bloc.
- **2026-11-17** : **footer unique** (même footer partout, Contact sans bandeau) : bandeau sans encart, liens dans l'ordre du parcours, Company complété, logotype en contour fin en bas. **Nav en « île »** en proto (à valider, puis à reconstruire en natif Webflow).

- **2026-11-17** : Contact **validé**, en version une colonne centrée (la version A, texte à gauche et formulaire à droite, est archivée dans `_archive/contact-a/`). Section unique traitée en hero (fond sombre animé, label jaune), en-tête centré, formulaire aéré en carte de verre sombre, produits en cases compactes, ligne de coordonnées sous la carte. L'embed « version B » de la page est à remplacer.
- **2026-11-17** : BonV et AI Conductor **en suspens** : toutes les pages sont soumises au client, repasse sur ces deux pages selon son retour. Étape suivante : navigation du haut et footer (toutes les pages).

- **2026-11-17** : About (Company) **validé**. Hero « Orbites » (voir Modules JS : texte à gauche, anneaux et V en plexus à droite, vague et parallaxe). Animation carrières : verre plus fin (plus de reflet rond ni de teinte violette, lumière sur la tranche), anneau de fusion en jaune.

- **2026-11-17** : About (Company) **contenu validé** ; hero encore sans animation propre, à traiter :
  - fonds alternés : About us blanc, At a glance light, Leadership sombre animé, Scientific Advisory Board light, Investors blanc, Build with us light (la page finit sur du clair avant le footer) ;
  - At a glance : chiffres en cartes blanches (variante carte : ajouter `why-card` aux 6 `glance-stat`), icônes passées en encre dans un disque gris (le jaune y était décoratif), 3 / 2 / 1 par ligne ; repère `data-af-glance` ;
  - flèches des sliders : composant flèche du site, comme sur la Home ; SAB : remplacer les `arrow-new` par le composant (variante de base) ; Leadership : variante sombre (`w-variant-8d42…`) ;
  - Build with us : texte en encre, pastilles blanches en mono, animation dans un panneau en verre sombre éclairci (voir Modules JS) ; repères `data-af-sab`, `data-af-careers` ;
  - règles notées : un fond sombre prend le traitement de Why it matters (jamais le fond animé BonV seul, trop sombre) ; animations explicatives nettes, sans flou ni halo.

- **2026-11-17** : Resources **validé** (bibliothèque et article), sur les règles de Case Studies :
  - bibliothèque : hero aligné ; filtres Finsweet habillés en barre segmentée (pastille blanche qui glisse) à gauche, recherche en pastille à droite (Webflow empilait le formulaire sous 992 px : ligne forcée) ; cartes claires sur fond blanc, image collée en haut, catégorie et date séparées par une barre, 3 par ligne ;
  - article : largeur des autres pages ; intertitres légers dans la marge de gauche, alignés sur le début de leur partie (position absolue : pas de trou sous un paragraphe court) ; tous les paragraphes avec une seule règle, interligne 1,6 comme le reste du site ; paragraphes vides (espaceurs de l'éditeur) masqués ; sans numéros ni chapeau.

- **2026-11-17** : Case Studies **validé** (bibliothèque et fiche) :
  - heros alignés sur les heros produit (titre medium, texte léger, fond animé BonV, sans LineField, image arrondie au bord fin), catégories en jaune séparées par une barre verticale ; slider de la bibliothèque sans chiffre clé, description sur 3 lignes ;
  - bibliothèque : filtres en barre segmentée (pastille blanche qui glisse, mono capitales), marges réduites autour ; cartes claires sur fond blanc, image collée en haut, sans chiffre clé, 3 par ligne (2 en tablette, 1 en téléphone) ;
  - fiche : At a glance en verre clair, récit avec repères ronds et listes au tiret violet, Why it matters en sombre éclairci (comme le grand panneau de la Home), FAQ allégée, études liées en cartes blanches sur fond light ;
  - **à corriger dans Webflow** : les libellés au-dessus des titres de section du template de fiche ne sont liés à rien (« This is some text inside of a div block. ») ; proposés : At a glance, Why it matters, FAQ, Source. Retirer `data-line-field` des deux heros.

- **2026-11-17** : règle globale rappelée (toutes cartes, toutes pages) : le fond de la carte se détache de celui de la section. Section blanche → carte gris clair (dégradé `#f6f6f9 → #eeedf4`) ; section light → carte blanche (verre clair `--af-glass`) ; section sombre → verre sombre. Appliquée aux cartes Case Studies (bibliothèque sur blanc, études liées sur light).

- **2026-11-16** : nettoyage : premières versions des pages produit, page système, essais de hero et visuels écartés déplacés dans `_archive/` (liste et restauration dans `_archive/README.md`) ; index de la refonte refait (pages et état, outils, archives).

- **2026-11-16** : Home **validée** (« on va laisser ça comme ça pour le moment ») : hero en séquence de particules (atelier `hero-lab`, blob avec noyau, délitement et plan, montagnes et orbite, retour au blob, un seul programme), The problem (Gantt restylé dans le grand panneau), plateforme en slider de cartes avec mini-scènes aux traits épaissis, Why PhaseV, Evidence (slider retiré, cartes case studies), testimonials en citation centrée.

- **2026-11-16** : règle des repères de carte (icône, numéro) : le disque prend la couleur du fond de la section, différente de la carte (blanc → disque blanc, light → gris light, sombre → disque sombre) ; disque et anneau dessinés par la carte (::after), CSS de contexte dans l'embed.

- **2026-11-16** : règles globales (tous composants, toutes pages) : anneaux de repère (icônes, numéros, frise, contexte de success story, pivot) en **1 px doux** (mauve à 40 % en clair, blanc à 25 % en sombre) ; bords en dégradé masqués (cartes, panneaux, scènes, success story, case studies) à **0,5 px**.

- **2026-11-16** : règles globales (toutes les pages) : listes des étapes en **un seul bloc** (tiret violet conservé, un point par ligne avec `<br>`), au lieu d'un bloc par point.

- **2026-11-16** : BonV, scènes des étapes Ask, Collaborate, Orchestrate **validées** (socle `bonv-draw.js`). Décision : même démarche sur AI Conductor (placeholders et visuels actuels remplacés par des scènes dans ce style).

- **2026-11-16** : BonV, The PhaseV answer **validé** : le schéma avant / après est remplacé par une scène animée (module `bonv-answer.js`), sur le modèle du film de lancement. Principe retenu pour BonV : là où le document prévoit un visuel, une scène dans ce style, qui illustre le texte.

- **2026-11-15** : BonV, première passe (à valider) : mêmes composants qu'AI Conductor ; Chiffres à 4 et à 1 ; avant / après en variante schéma ; bloc « See it in your workflow » sans formulaire ; bandeau du footer « Better questions. Connected decisions. » (texte du bandeau propre à chaque page, à prévoir dans le composant footer).

- **2026-11-15** : AI Conductor mis en style, **en attente, non validé** ; nouveaux composants à confirmer : avant / après. Les chiffres reprennent le composant existant de Company (glance), comme décidé dans l'inventaire. Bloc « See it in your workflow » ajouté (en-tête + lien vidéo) ; son formulaire retiré à la demande de Romain. Success story : variante sans visuel. Étapes : listes titrées.

- **2026-11-15** : document ouvert. Trial, Response, ClinOps et Portfolio affinés validés ; composants ci-dessus arrêtés.
