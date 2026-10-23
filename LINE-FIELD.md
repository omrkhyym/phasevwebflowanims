# Line field : registre

Source de vérité pour l'attribution des textures. Toute modification d'attribution passe par ce fichier.
Code : `site.js` (chargé depuis le footer de code global du site) → `src/line-field/` et `src/floating-bg.js`.
Référence visuelle : `protos/phasev-line-textures-proto7.html`.

## Attributs

- `data-line-field="<texture>"` : monte la texture sur l'élément (section, header ou bloc).
  Vide, `random` ou nom inconnu : tirage stable d'après la position du bloc sur la page (avertissement en console si nom inconnu). À éviter en production.
- `data-line-calm="<sélecteur>"` sur l'élément : remplace le sélecteur par défaut des zones de calme
  (titres, paragraphes, boutons, `text-size-*`, `section-top*`, `*card*`, `ev-case*`, `glance-stat*` ; seuls les plus englobants comptent).
- `data-line-calm-item` sur un élément : le force en zone de calme.
- Pas de seed : le déphasage du fond se calcule d'après la position de la section.

Fond flottant : automatique sur toute section `[data-bg='purple-gradient']`, avec ou sans line field.

## Textures

| Nom | Description |
|---|---|
| `swimmer` | Swimmer plot sur trois plans de profondeur, ticks d'événements, parallaxe |
| `matrix` | Matrice patients × visites, visites qui se remplissent, ligne et colonne au survol |
| `km` | Strates Kaplan-Meier, courbes en escalier, ticks de censure, halo souris |
| `forest` | Forest plot en panneaux, estimations et IC qui se réactualisent une à une |
| `waterfall` | Waterfall plot trié, seuils RECIST +20 / −30 % |
| `volcano` | Volcano plot, fold change × significativité, réanalyse lente |

## Attribution

| Page | Bloc | Element id | Texture |
|---|---|---|---|
| Home | Hero | `023caa4c…a832` | aucune (hero WebGL) |
| Home | The PhaseV platform | `023caa4c…a857` | aucune (nuage du hub) |
| Home | Evidence | `023caa4c…a97e` | `forest` |
| Company | Hero | `e7b68fd5…450d` | `swimmer` |
| Company | At a glance | `8b40e18b…ff0d` | `volcano` |
| Company | Scientific Advisory Board | `fea454fc…6dd3` | `km` |
| Company | Careers intro | `84e23397…27ee` | `waterfall` |
| Resources | Header | `e7b68fd5…450d` | `matrix` |
| Resources (template) | Header | `8c9af07a…5433` | `matrix` |
| Evidence | Header | `e7b68fd5…450d` | `forest` |
| Evidence (template) | Header | `2c891e27…cfa9` | `forest` |
| 404 | Header | `afdf6e94…fda3` | `volcano` |
| Footers (`section_footer`, `only-footer`) | `footer-band` | dans les composants | `swimmer` |

Heros produit (ClinOps, Response, Trial, Portfolio, AI Conductor) : fond flottant seulement, pas de line field.
