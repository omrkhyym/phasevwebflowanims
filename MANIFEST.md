# Manifest PhaseV-anims

Journal de tout ce qui a été fait sur le repo et sur le site Webflow PhaseV. Chaque modification future y est ajoutée, en haut du journal, avec sa date.

## État actuel (20 octobre 2026)

### Pages animées

| Page | ID Webflow | Entrée | Tag du loader | Points de montage |
|---|---|---|---|---|
| Home | `6a7494c19b6df905487ffd48` | `main.js` | `v0.4.0` | `hero-homepage` et `gantt` (dans des embeds HTML), `platform-hub` (div), `platform-tabs` (div sans module) |
| Home DEV | `6ac94d28fa53acb3a833343b` | `main.js` | `v0.2.0` | mêmes points que Home ; loader non standard (`const s` global) |
| Company | `6a841e56404f040c0e6bc5cc` | `company.js` | `v0.2.0` | `company-hero` (attribut sur le header du hero), `company-careers` (attribut sur l'embed du bloc Build with us) |
| ClinOps Optimizer | `6a7d9a55a0f59e17da317ab6` | `clinops.js` | `v0.4.0` | `clinops-hero-bg`, `clinops-hero-slot` |
| Response Optimizer | `6a7efdffc7cdcaeee09a8ad5` | `response.js` | `v0.4.0` | `response-hero-bg`, `response-hero-slot` |
| Trial Optimizer | `6a7f24a28679cdce6cd676e7` | `trial.js` | `v0.4.0` | `trial-hero-bg`, `trial-hero-slot` |
| Portfolio Optimizer | `6a7eebc5135141aa80fab3ff` | `portfolio.js` | `v0.4.0` | `portfolio-hero-bg`, `portfolio-hero-slot` |
| AI Conductor | `6a7dcf32f8a4279d35e73b0c` | `conductor.js` | `v0.4.0` | `conductor-hero-bg`, `conductor-hero-slot` |

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

### Socle des heros produit (`src/hero-stage.js`)

- Deux points de montage par page :
  - `<div data-pv="<nom>-hero-bg"></div>`, premier enfant du header du hero : fond plein cadre au-dessus de 991 px ;
  - `<div data-pv="<nom>-hero-slot"></div>`, dernier enfant de la grille `header_content` : bloc 4:3 à 991 px et moins.
- Un seul canvas, déplacé d'un emplacement à l'autre au changement de breakpoint, et une seule boucle.
- CSS injecté et ciblé avec `:has()` : aucune classe Webflow n'est modifiée.
- Sans slot sur la page, l'animation reste en fond à toutes les tailles.
- En mode bloc : pleine opacité, sans parallaxe.
- Sur tablette, la colonne de texte `header_content-left` est réglée en « Order : Last » dans le Designer, donc le bloc s'affiche au-dessus du texte. C'est un réglage d'élément, invisible dans l'API, qu'on retrouve dans le CSS publié.
- Le build produit un chunk partagé `dist/hero-stage-<hash>.mjs`, à commiter avec `dist/`.

### Releases

| Tag | Commit | Contenu |
|---|---|---|
| `v0.1.0` | `e791c4a` | Hero et gantt de la Home |
| `v0.2.0` | `7e8b0a3` | Entrée Company (hero lines, careers), platform-hub sur la Home |
| `v0.3.0` | `107ab12` | Fonds animés des heros ClinOps, Response, Trial, Portfolio |
| `v0.4.0` | `591d543` | Hero AI Conductor, socle `hero-stage`, mode bloc mobile sur les cinq heros produit |

### Modifications Webflow encore en place

- `data-line-field` retiré du header du hero sur Company, ClinOps, Response, Trial, Portfolio et AI Conductor. Il est toujours présent sur la Home.
- Company :
  - ancien bloc About us (`grid-2 gap-1,5 reverse`) masqué, remplacé par `section-top` + `grid-3 gap-1,5` avec trois textes `text-size-quote text-weight-light` ;
  - embed du bloc Build with us : code remplacé par `<!-- pv -->`, l'attribut `data-pv="company-careers"` est posé sur l'embed lui-même.
- Pages produit : le bloc de droite `header_image-wrapper` a été supprimé par Romain sur les cinq pages.
- Home : contenu remplacé par celui de Home DEV (copier-coller fait par Romain, sauvegarde du site faite avant).

## Journal

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
- Brief Conductor : vitesse du glissement en mode bloc (environ 3,5 s).
- Audit : liens morts, contenu provisoire de Contact, SEO, code dupliqué, ménage des classes (voir la page d'audit).
- Footer : refonte en attente de validation.
