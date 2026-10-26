# PhaseV-anims

Animations du site Webflow de PhaseV (Phase V Trials), une plateforme d'IA pour le développement clinique. Ce repo contient la logique et l'animation, Webflow le contenu et la mise en page.

Tu travailles pour Romain, directeur artistique freelance. Il lit et corrige le code. Réponds en français, court, direct. Pas de tirets cadratins. Toutes les commandes en PowerShell (Windows).

## Règle n°1 : plan d'abord

Avant toute modification (fichier, git, Webflow) : décris en quelques lignes ce que tu vas changer et pourquoi, puis attends le feu vert. Une seule question à la fois, et seulement si la réponse change ce que tu fais. Pas d'initiative hors du périmètre demandé : pas de refacto, pas de renommage, pas de « nettoyage » non demandé.

## Architecture

```
site.js            entrée commune, footer global du site : fond flottant + line field (voir LINE-FIELD.md) → dist/site.js
main.js            entrée de la page Home (et Home DEV)   → dist/main.js
company.js         entrée de la page Company              → dist/company.js
clinops.js         entrée de la page ClinOps Optimizer    → dist/clinops.js
response.js        entrée de la page Response Optimizer   → dist/response.js
trial.js           entrée de la page Trial Optimizer      → dist/trial.js
portfolio.js       entrée de la page Portfolio Optimizer  → dist/portfolio.js
conductor.js       entrée de la page AI Conductor         → dist/conductor.js
src/<bloc>.js      un module par bloc animé
src/hero-stage.js  socle partagé des heros produit        ┐ chunk partagé des 5 pages produit
src/platform-connect.js  bloc « plateforme connectée »    ┘ → dist/platform-connect-<hash>.mjs
protos/            prototypes validés, pour référence (non buildés)
dist/              build, COMMITÉ (servi par jsDelivr)
```

- **Une entrée par page Webflow**, à la racine. Une page ne charge que son entrée. Ne fusionne jamais les modules de pages différentes dans un même bundle.
- Les imports depuis une entrée pointent vers `./src/...`. Vérifie que chaque chemin d'import existe avant de dire que c'est fait.
- Nouvelle page = nouveau fichier `<page>.js` à la racine et nouvelle clé dans `lib.entry`.

### Montage

Chaque bloc se monte sur un div **vide** dans Webflow : `<div data-pv="<nom>"></div>`. L'entrée fait :

```javascript
import { initX } from './src/<bloc>.js';
document.querySelectorAll('[data-pv="<nom>"]').forEach(initX);
```

Contrat de chaque module :
- `export function initX(root)`, qui reçoit l'élément et ne lit rien d'autre dans le DOM Webflow.
- Le module crée lui-même son canvas ou son SVG, et dimensionne son conteneur.
- Il pose une garde (`root.dataset.pvInit`) pour ne pas s'initialiser deux fois.
- Il retourne `destroy()`, qui coupe la boucle rAF, les observers et les listeners.
- **Le texte reste dans Webflow**, éditable par le client (exemple : les composants `dm-panel`). Le JS ne porte que la logique et l'animation, jamais de contenu en dur.

Exceptions en place :
- Un div de montage placé dans un embed HTML doit avoir une largeur : dans un parent flex centré, l'embed fait 0 px. Dans ce cas, pose l'attribut `data-pv` sur l'embed lui-même (c'est le cas de `company-careers`).
- `company-hero` se monte sur le header du hero lui-même, pour que le canvas passe sous le texte.
- Le CSS de positionnement est injecté par le module et ciblé avec `:has([data-pv="…"])`, pour ne modifier aucune classe Webflow.

### Heros produit à deux modes (`src/hero-stage.js`)

Convention des heros ClinOps, Response, Trial, Portfolio et AI Conductor. Toute nouvelle page produit la suit.

- Deux divs vides, sans classe, dans Webflow :
  - `<div data-pv="<nom>-hero-bg"></div>`, premier enfant du header du hero : fond plein cadre au-dessus de 991 px ;
  - `<div data-pv="<nom>-hero-slot"></div>`, dernier enfant de la grille `header_content` : bloc 4:3 à 991 px et moins.
- Le module d'animation ne fournit que son dessin et appelle `mountHeroStage(root, { name, draw, still, onResize })`. Le socle gère le canvas unique, son déplacement entre les deux emplacements, la boucle unique, les observers, la parallaxe (coupée en mode bloc), l'atténuation côté texte (1 en mode bloc), le reduced motion et le CSS.
- Sur tablette, la colonne de texte `header_content-left` est en « Order : Last » dans le Designer, donc le bloc passe au-dessus du texte. Ce réglage n'est pas lisible par l'API : vérifie-le dans le CSS publié (`#w-node-…{order:9999}`).
- Retire `data-line-field` du header du hero : sinon le LineField global dessine par-dessus l'animation.
- Les helpers communs (`seg`, `ease`, `smooth`, `rng`, `rgba`, `TAU`) s'importent depuis `hero-stage.js`.

### Config Vite (mode lib, ES)

```javascript
build: {
  lib: {
    entry: {
      main: 'main.js', company: 'company.js',
      clinops: 'clinops.js', response: 'response.js', trial: 'trial.js',
      portfolio: 'portfolio.js', conductor: 'conductor.js',
    },
    formats: ['es'],
    fileName: (format, name) => `${name}.js`,
  },
}
```

Les noms de sortie doivent rester stables : Webflow pointe dessus. Si un module est partagé, Vite produit un chunk hashé dans `dist/`, qui doit être commité lui aussi.

## Release

1. `npm run build`, sans erreur.
2. Commit des sources **et de tout `dist/`**.
3. Tag semver (`v0.2.0`, `v0.2.1`…), puis push du commit et du tag.
4. **Vérifie que l'URL jsDelivr répond** avant de toucher à Webflow :
   `Invoke-WebRequest https://cdn.jsdelivr.net/gh/omrkhyym/phasevwebflowanims@<tag>/dist/<page>.js -Method Head`
5. Seulement ensuite, mets à jour le tag dans le loader de la page concernée.

Interdits : `@main` ou `@latest` dans une URL (le cache jsDelivr est long), réutiliser ou déplacer un tag existant, changer le tag d'une page qu'on ne t'a pas demandé de toucher (chaque page a son propre tag, voir le tableau Webflow et `MANIFEST.md`). Si le build produit un chunk partagé, vérifie aussi son URL jsDelivr.

## Webflow

Site : **PhaseV**, `6a7494c19b6df905487ffd7e` (le site client, plan premium). Ne touche jamais au sandbox « PhaseV SANDBOX ROMAIN ». Il n'y a pas de branches de page sur ce plan : chaque modification se fait sur la vraie page.


| Page | ID | Entrée | Tag |
|---|---|---|---|
| Home | `6a7494c19b6df905487ffd48` | `main.js` | `v0.10.0` |
| Home DEV | `6ac94d28fa53acb3a833343b` | `main.js` | `v0.2.0` (page de test) |
| Company | `6a841e56404f040c0e6bc5cc` | `company.js` | `v0.11.0` |
| ClinOps Optimizer | `6a7d9a55a0f59e17da317ab6` | `clinops.js` | `v0.8.0` |
| Response Optimizer | `6a7efdffc7cdcaeee09a8ad5` | `response.js` | `v0.6.0` |
| Trial Optimizer | `6a7f24a28679cdce6cd676e7` | `trial.js` | `v0.6.0` |
| Portfolio Optimizer | `6a7eebc5135141aa80fab3ff` | `portfolio.js` | `v0.6.0` |
| AI Conductor | `6a7dcf32f8a4279d35e73b0c` | `conductor.js` | `v0.6.0` |

Les tags changent à chaque release : `MANIFEST.md` fait foi pour l'état courant.

Loader standard, dans le **footer** de la page (pas le head) :

```html
<script>
  (function () {
    const s = document.createElement('script');
    s.type = 'module';
    s.src = location.search.includes('dev')
      ? 'http://localhost:5173/<page>.js'
      : 'https://cdn.jsdelivr.net/gh/omrkhyym/phasevwebflowanims@<tag>/dist/<page>.js';
    document.body.appendChild(s);
  })();
</script>
```

`?dev` dans l'URL de la page charge le serveur Vite local : on teste toujours comme ça avant un build.

Règles :
- **Ne publie jamais.** C'est Romain qui publie.
- `set_page_freeform_code` **remplace tout le bloc** : lis le code existant d'abord, ajoute le tien sans rien perdre (scripts Swiper, carte de décision, quotes…).
- Ne supprime aucun élément : masque-le (`set_visibility false`), pour qu'on puisse revenir en arrière.
- Ne crée pas de classes, ne modifie pas le système de classes ni les composants. Le remodelage du site n'est pas dans le périmètre.
- Le code global du site (Lenis, LineField, navbar, boutons SplitText, compteurs) n'est pas à toi : n'y touche pas sans qu'on te le demande.
- Les scripts d'embed ne tournent pas dans le canvas du Designer : la vérification se fait en Preview ou sur `webflow.io`.
- Rythme vertical (référence : Company) : toute section de contenu prend `padding-global padding-section-main` (7.5rem, 5rem en tablette, 4rem en mobile) ; seul le hero garde sa propre classe. Les autres pages migrent au moment de leur refonte, pas avant.
- Une partie du style est dans l’embed du composant global styles (data-bg, .build-card, .animation-2, la navbar, les boutons) : vérifie là avant de conclure qu’un style n’existe pas.

## Charte

- Fond `#141238` avec deux gradients radiaux violets. Le canvas est **transparent**, composé sur la section : pas de fond opaque, pas de vignette, pas de masque rectangulaire.
- Jaune `#E2C70A` **réservé au moment de décision**, jamais décoratif.
- Secondaires : mauve `#928ACD`, bleu `#78A8E0`, turquoise `#7FE8CF`.
- Rouge hors charte (connoté sécurité patient), à faire valider.
- La charte est flat : pas de grain, de texture ou de rétro sans validation. Exception validée : fond flottant et grain de `site.js` (line field v2).

## Standards de code

- La technique la plus simple qui tient le rendu : Canvas 2D ou SVG pour l'explicatif, WebGL seulement pour le hero et les effets lourds, GSAP 3 avec ScrollTrigger pour le scroll.
- Toujours : `prefers-reduced-motion` (un état final statique), `ResizeObserver`, DPR plafonné à 2, pause hors écran avec `IntersectionObserver`, listeners `passive`, aucune fuite mémoire.
- Pas de taille fixe ni de `scale()` sur un canvas. Le scroll utilise Lenis (`window.lenis`), ScrollTrigger doit rester synchronisé avec lui.
- Patterns GSAP de ce client : `invalidateOnRefresh` avec des valeurs fonctionnelles, `immediateRender:false` sur les `fromTo` scrubés, le transform scrubé séparé des boucles autonomes, des couches d'opacité par état plutôt qu'une interpolation de couleur.
- Particules : les états sont normalisés (scale uniforme, bornes aux quantiles 1 et 99, recentrés), les points sont triés avant interpolation, l'easing est cubique en entrée-sortie.
- Commentaires en français, seulement là où l'intention ne se lit pas dans le code.
- Quand tu livres un fichier, il est complet et fonctionnel, jamais des fragments.

## Manifest

`MANIFEST.md` garde la trace de tout ce qui a été fait, sur le repo comme sur Webflow. Lis-le en début de session pour connaître l'état actuel (pages, tags, points de montage, modifications Webflow, points ouverts).

Après chaque modification validée, mets-le à jour dans la même passe :
- ajoute une entrée datée en haut du journal : ce qui a changé, sur quelle page, et pourquoi ;
- mets à jour les tableaux d'état si une page, un module, un tag ou un point de montage change ;
- mets à jour la liste des points ouverts.

## Quand tu as fini

Dis ce que tu as changé, ce qui reste ouvert, et ce qu'il faut regarder en priorité. Ne dis pas que c'est fait si tu ne l'as pas vérifié (build, chemin d'import, URL jsDelivr, Preview).
