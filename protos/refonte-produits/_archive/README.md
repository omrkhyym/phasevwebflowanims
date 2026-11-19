# Archive de la refonte (2026-11-16)

Fichiers qui ne servent plus aux pages en cours, **déplacés ici plutôt que supprimés** (la plupart ne sont pas dans git).
Pour restaurer : remettre le fichier ou le dossier à son ancien chemin (indiqué ci-dessous) et, pour un module du kit, rajouter son montage dans `_kit/affine.js`.

| Ici | Ancien chemin | Pourquoi |
|---|---|---|
| `kit/hero-pulse.js`, `hero-morph.js`, `hero-decision.js`, `hero-landscape.js`, `hero-homepage-glossy.js` | `_kit/` | essais de hero Home, remplacés par `_kit/hero-sequence.js` (atelier `hero-lab`) |
| `kit/decision-path.js`, `problem-chain.js`, `stat-rings.js` | `_kit/` | essais rejetés (chemin de décision, chaîne du problème, chiffres en anneaux) |
| `kit/platform-bonv.js`, `hte-glossy.js` | `_kit/` | plus montés sur aucune page affinée |
| `hero-lab-scenes/boom.js`, `orbit.js` | `hero-lab/scenes/` | explosion retirée (remplacée par le délitement) ; orbite réunie dans la scène 3 |
| `pages-v1/trial`, `response`, `clinops`, `portfolio`, `conductor`, `bonv` | racine de `refonte-produits/` | premières versions des pages produit, remplacées par les pages `*-affine` |
| `systeme/` | racine de `refonte-produits/` | page système de la première version |
| `contact-a/phasev-contact-affine.html` | `contact-affine/` | Contact, version A (texte à gauche, formulaire à droite), remplacée le 2026-11-17 par la version en une colonne centrée ; page générée, ses réglages ne sont plus dans `build.py` (le CSS « Contact » d'`affine.css` reste la base de la nouvelle version) |

À savoir :
- `_build/build.py` garde les réglages des premières versions (`PAGES['trial']`…) : ils servent de base aux pages affinées. Ils sont marqués `archived` et ne sont plus construits.
- `inventaire/_build/inventaire.py` relit les premières versions (`<page>/phasev-<page>.html`) et écrit `systeme/`. Pour le relancer : restaurer `pages-v1/*` et `systeme/`, ou le faire pointer sur les pages `*-affine`. Ses résultats (`inventaire/*.html`) sont gardés tels quels.
