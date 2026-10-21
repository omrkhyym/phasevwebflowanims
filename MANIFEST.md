# Manifest PhaseV-anims

Journal de tout ce qui a été fait sur le repo et sur le site Webflow PhaseV. Chaque modification future y est ajoutée, en haut du journal, avec sa date.

## État actuel (21 octobre 2026)

### Pages animées

| Page | ID Webflow | Entrée | Tag du loader | Points de montage |
|---|---|---|---|---|
| Home | `6a7494c19b6df905487ffd48` | `main.js` | `v0.4.0` | `hero-homepage` et `gantt` (dans des embeds HTML), `platform-hub` (div), `platform-tabs` (div sans module) |
| Home DEV | `6ac94d28fa53acb3a833343b` | `main.js` | `v0.2.0` | mêmes points que Home ; loader non standard (`const s` global) |
| Company | `6a841e56404f040c0e6bc5cc` | `company.js` | `v0.2.0` | `company-hero` (attribut sur le header du hero), `company-careers` (attribut sur l'embed du bloc Build with us) |
| ClinOps Optimizer | `6a7d9a55a0f59e17da317ab6` | `clinops.js` | `v0.6.0` | `clinops-hero-bg`, `clinops-hero-slot`, `platform-connect` |
| Response Optimizer | `6a7efdffc7cdcaeee09a8ad5` | `response.js` | `v0.6.0` | `response-hero-bg`, `response-hero-slot`, `platform-connect` |
| Trial Optimizer | `6a7f24a28679cdce6cd676e7` | `trial.js` | `v0.6.0` | `trial-hero-bg`, `trial-hero-slot`, `success-design-space` (div dans `.animation-wrapper` du bloc Success story), `platform-connect` |
| Portfolio Optimizer | `6a7eebc5135141aa80fab3ff` | `portfolio.js` | `v0.6.0` | `portfolio-hero-bg`, `portfolio-hero-slot`, `platform-connect` |
| AI Conductor | `6a7dcf32f8a4279d35e73b0c` | `conductor.js` | `v0.6.0` | `conductor-hero-bg`, `conductor-hero-slot`, `platform-connect` (dans un `.animation-wrapper` créé à la place de l'`.entry-grid`) |

### Modules

| Fichier | Rôle |
|---|---|
| `src/hero-homepage.js` | Hero de la Home (WebGL2), CSS injecté via `:has()` |
| `src/gantt.js` | Gantt de la Home |
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
| `v0.6.0` | voir le tag | Bloc « plateforme connectée » (`platform-connect`) sur les cinq pages produit ; chunk partagé renommé `platform-connect-<hash>.mjs` |

### Modifications Webflow encore en place

- `data-line-field` retiré du header du hero sur Company, ClinOps, Response, Trial, Portfolio et AI Conductor. Il est toujours présent sur la Home.
- Company :
  - ancien bloc About us (`grid-2 gap-1,5 reverse`) masqué, remplacé par `section-top` + `grid-3 gap-1,5` avec trois textes `text-size-quote text-weight-light` ;
  - embed du bloc Build with us : code remplacé par `<!-- pv -->`, l'attribut `data-pv="company-careers"` est posé sur l'embed lui-même.
- Pages produit : le bloc de droite `header_image-wrapper` a été supprimé par Romain sur les cinq pages.
- Pages produit, bloc « plateforme connectée » : image placeholder `.animation-2` supprimée sur Trial, ClinOps, Response et Portfolio ; sur AI Conductor, `.entry-grid` et ses six `.conductor-card` supprimées (décision de Romain), remplacées par un `.animation-wrapper` (classes conservées dans le système).
- Trial Optimizer, Success story : image placeholder `.animation-2` supprimée.
- Home : contenu remplacé par celui de Home DEV (copier-coller fait par Romain, sauvegarde du site faite avant).
- Footer : `data-line-field` retiré de `section_footer` ; bloc centré `section-top` masqué dans `section_footer`.
- Footer : composant `footer-bottom` partagé par `section_footer` et `only-footer` ; anciens blocs `footer-bottom` masqués dans `only-footer`, ligne légale en double masquée dans `section_footer` ; 404 sur `only-footer`, footer détaché masqué.

## Journal

### 2026-10-21

- **Pages produit, bloc « plateforme connectée »** (brief `brief-platform-connect.md`) : module partagé `src/platform-connect.js`, portage à l'identique du proto (seed 11, `SPOT`, rayons, chronologie 14,6 s, `EVENTS`, recrutement des flux, parallaxe), monté depuis les cinq entrées produit.
  - Écarts au proto, selon le brief : typo et espacement lus sur la `.text-size-label` du bloc ; fond de section lu et gardé en constante ; particules reconstruites seulement au franchissement de 500 px (1100 / 1800) ; `pointermove` passif, branché au start et retiré au stop ; reduced motion = état à t = 7,2 s sans boucle ni parallaxe ; `aspect-ratio: 1.2/1` sans `min-height` ; noms recalés vers l'intérieur s'ils sortent du canvas ; sélecteur de page et colonne texte du proto non portés.
  - Noms des produits : par défaut dans le JS, surchargeables sur le montage par `data-name-<clé>`. `data-current` manquant ou inconnu : `console.warn`, rien n'est monté.
  - Webflow : div `data-pv="platform-connect" data-current="<clé>"` dans le `.animation-wrapper` `fb9425b9…` de Trial, ClinOps, Response et Portfolio (image `.animation-2` supprimée) ; sur AI Conductor, `.animation-wrapper` créé en second enfant de la grille `d9bf6c2d…` (`grid-2 gap-1,5 bottom`), `.entry-grid` et ses six cartes supprimées.
  - Testé en local (captures headless desktop et 375 px, Trial et Conductor au centre) puis en Preview `?dev` par Romain, alignement sur AI Conductor compris.
  - **Release `v0.6.0`**, loaders des cinq pages produit passés à `v0.6.0`.

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
- Home : `data-line-field` encore présent sur le header du hero, en plus de `hero-homepage`.
- `platform-tabs` : point de montage sans module.
- Brief ClinOps : opacité côté texte, Amériques sous le texte.
- Brief Response : lisibilité de la séparation des deux bras.
- Brief Trial : lisibilité des croisements entre courbes.
- Plateforme connectée : valeur exacte de `.is-lightpurple` et lisibilité du cœur jaune à capturer en ligne ; flux à juger en ligne avant de toucher aux comptes de particules.
- Success story Trial : puissance réelle du design fixe inconnue (posé sur la ligne des 90 % en attendant le client) ; lisibilité du jaune cerclé sur le fond `.is-lightpurple` à confirmer.
- Brief Conductor : vitesse du glissement en mode bloc (environ 3,5 s).
- Audit : liens morts, contenu provisoire de Contact, SEO, code dupliqué, ménage des classes (voir la page d'audit).
- Footer : maquette validée, structure faite (étape 1), bas de footer fait (passe 2a), bandeaux faits (passes 2b et 2c), restent la vérification en Preview et les liens (étape 3). LinkedIn fait ; reste à savoir si les pages Terms et Privacy existent.
- Resources : texte du bouton « Watch recording » à adapter pour les cartes qui ne sont pas des webinars.
- Evidence en brouillon : les fiches `/evidence/<étude>` restent publiées via le template.
