# Retours généraux sur le site (2026-11-19)

Liste des commentaires de Romain, traitée du plus simple au plus complexe. Statuts : à faire, en discussion, en attente, fait (à vérifier), validé.

## Rapides

| # | Point | Précisions | Statut |
|---|---|---|---|
| 13 | BonV : virer le bloc Flexible Entry Point | Suppression demandée explicitement (pas un simple masquage) | fait, à vérifier |
| 12 | BonV : cacher le bloc case studies | | fait, à vérifier |
| 11 | BonV : premier bloc sur fond light | Le bloc juste après le hero | fait, à vérifier |
| 17 | Contact : éclaircir le fond des champs | 1re passe trop timide (10 %), 2e passe à 20 % | fait, à vérifier |
| 14 | BonV : intégrer une FAQ | Lorem Ipsum en attendant le vrai contenu | fait, à vérifier |
| 5 | Case studies : surtitre « Evidence » remplacé par « Case studies », gros chiffres retirés du bas des cartes | Home et toutes les autres pages. « Evidence » n'existe plus comme section. Anciens surtitres et chiffres supprimés, pas masqués | fait, à vérifier |
| 6 | Slider du bas (All insights) : plus de bouton en contour seul | Home et toutes les autres pages, heros compris. Fait : Home (2 « All insights ») et heros AI Conductor et BonV (« Learn more ») passés en Purple. Sliders des headers Resources et Case Studies supprimés (point 18). Variantes en contour du composant button supprimées (Transparent, Transparent on White, Purple Transparent), ainsi que les composants inutilisés dm-panel et transparent-card | fait, à vérifier |

## Moyens

| # | Point | Précisions | Statut |
|---|---|---|---|
| 4 | Graisse des titres | Les headers sont en gras, les autres titres non : harmoniser en non gras. Fait : heros produit, Company et Contact passés de 500 à 300 (comme les titres de section). Validé par Romain pour les pages faites. Heros des fiches Resources et Case Studies passés en 300 avec la release v0.27.0 | fait, à vérifier |
| 18 | Resources et Case Studies : header réduit | Slider du header retiré, header comme Privacy Policy, titre et intro en Lorem Ipsum, surtitre jaune comme sur tous les headers (nom de la page). Fait, release v0.27.0 | validé |
| 2 | Liens qui ne mènent nulle part | Scanner toutes les pages, lister tous les liens morts (pas seulement le header Portfolio). Relevé fait le 2026-11-19, voir plus bas. Tout est corrigé sauf les cartes case studies en 404, réglées par le point 8 | en cours |
| 7 | Footer : titre et texte éditables par page | Le footer actuel devient celui par défaut si rien n'est rempli. Reprendre les textes des anciennes pages de phasevtrials.com, sauf le défaut de l'époque (titre seul « Better decisions / Connected development ») | à faire |
| 8 | Case studies des pages produit dynamiques | Collection List CMS filtrée par produit : une étude supprimée ne s'affiche plus. Pages concernées : Portfolio, Response, ClinOps (Trial n'a pas de cartes). Portfolio fait (Romain, Designer). Response et ClinOps : grilles statiques supprimées, liste à coller depuis Portfolio et filtre produit à changer. Trial (décision de Romain) : ajouter le bloc complet copié de ClinOps sous la success story, filtre Trial Optimizer ; titre et bouton ajustés ensuite par Claude | en cours |

## À discuter d'abord

| # | Point | Précisions | Statut |
|---|---|---|---|
| 1 | Navigation : style du lien de la page courante | À décider ensemble | en discussion |
| 9 | Flexible Entry Point : animation | Bloc de bas de page des produits (complémentarité des produits). Le client aime le concept, pas le style : brainstorm | en discussion |
| 10 | BonV : vidéo hors YouTube | Réencoder proprement le dégradé, player vidéo maison. En parler avant | en discussion |
| 16 | Careers : offres Greenhouse | Page qui récupère les offres de Greenhouse. Méthode à voir ensemble | en discussion |

## En attente de Romain

| # | Point | Précisions | Statut |
|---|---|---|---|
| 3 | Retours à la ligne | Romain indique lesquels | en attente |
| 15 | Company : fond des portraits | Romain fournit les images | en attente |

## Relevé des liens morts (point 2, 2026-11-19)

Exploration du site publié (`phasev-2026.webflow.io`, publication du 2026-11-19 à 21:33) : 40 pages, chaque lien testé.

**Boutons sans destination (`#`)**
- Portfolio : « Explore an example analysis » (header). **Fait** : bouton supprimé.
- AI Conductor et BonV : « Watch a Demo Video » (See it in your workflow). **Fait** : section entière masquée sur les deux pages, en attendant le lien de la vidéo.

**Cartes case studies vers des fiches archivées (404)**
- Portfolio : « How causal simulation tests new drug combinations… » (`pd-l1-combination-mechanism-causal-model`) et « How a causal model gave a pharma partner clearer go… » (`mash-indication-expansion-probability-of-success`).
- ClinOps : « How causal site selection hit a sickle cell trial… » (`phase-3-sickle-cell-disease-site-identification`).
- Réglé pour de bon par le point 8 (cartes en liste CMS).

**Liens dans le texte des articles Resources**
- « Learning more from less… » : deux liens vers l'ancien site (`phasevtrials.com/post/…`, 404) ; les articles existent sous `/resources/adaptive-trial-designs-will-increase-clinical-trial-speed-safety-and-effectiveness` et `/resources/causal-models-can-extend-what-we-learn-from-trials`.
- « Adaptive trial designs will increase… » : lien « estimated in 2013 » vers un PDF HubSpot (Tufts) qui n'existe plus (404).
- **Fait** : les deux liens repointés sur les articles du nouveau site, le lien du PDF retiré (texte gardé).

**Slider Publications & Media (Resources)**
- « New ML-Powered Solution… » (pharmaceuticalmanufacturer.media, 7 mars 2024) : article supprimé chez l'éditeur (404). **Fait** : entrée archivée dans le CMS.

**Sans problème (pour mémoire)**
- Menu (Platform, burger) et « Back to top » : `#` voulu, le comportement est en JS.
- Cartes des fiches Case Studies (`detail_case-studies`) : lien réécrit en JS par le module, fonctionne dans le navigateur.
- 15 liens externes (Fierce Biotech, Axios, BMJ…) refusent les robots (403) et 4 liens FDA ou Clinical Trials Arena n'ont pas répondu au test : à ouvrir à la main si besoin, ce sont des articles de presse et de la FDA.
