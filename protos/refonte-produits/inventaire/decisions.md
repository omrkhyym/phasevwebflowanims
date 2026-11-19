# Inventaire : décisions et liste des composants

Choix de Romain du 2026-11-14 (export de blocs.html et elements.html), puis la liste courte des composants qui en découle.
Les codes CSD ont bougé d'un rang en cours de passe (hero de la fiche ajouté) : les choix ci-dessous sont rattachés aux blocs par leur titre, pas par leur ancien code.

## Liste des composants (v1, à corriger)

| Composant | Blocs | Base | Variantes | Statut |
|---|---|---|---|---|
| Hero produit | TRI-01, RSP-01, CLI-01, POR-01, CON-01, BON-01 | socle hero-stage | animation par page | gardé |
| Hero CMS | CSL-01, RES-01, ART-01, hero de la fiche case study | featured-slider | slider ; fiche seule (article, fiche case study) | gardé, variante fiche seule validée |
| Hero Home, Hero About | HOM-01, ABO-01 | | | gardés, uniques |
| **Cartes** | why-card : HOM-04, RSP-04, RSP-06, POR-02 ; methodology-card : CLI-04, CON-08, BON-07 ; frise : RSP-05, POR-05 ; numérotées : CLI-02, RSP-03, POR-04 ; « What it changes » de la fiche case study | POR-04 (choix de Romain) | repère numéro ou icône ; puces oui / non ; fond clair ou sombre ; liaison frise oui / non ; 2 à 5 cartes | proposé : réponse aux « devrait fusionner » |
| **Chiffres** | ABO-03, CON-03, BON-02, BON-06, chiffres de CON-05 | ABO-03, fond sombre (choix de Romain) | couleurs fond et textes (clair / sombre) ; icône oui / non ; source facultative | fusion validée pour ABO-03 + CON-03, étendue aux autres |
| **Cas** | RSP-07, POR-06 (Evidence), BON-05, cas de CON-05 ; TRI-03 à reprendre dessus | rp-feature | cas côte à côte en dessous oui / non ; visuel ou chiffre clé | proposé |
| Preuve ClinOps | CLI-05 | module clinops-proof (animé) | | à revoir : reste unique ou passe sur Cas |
| FAQ | TRI-05, RSP-08, CLI-07, POR-08, CON-09 + FAQ de la fiche case study | composant FAQ du kit | fond | gardé, fusion case study validée |
| Plateforme connectée | TRI-04, RSP-09, CLI-06, POR-07, CON-07 | cartes | produit courant, fond | gardé |
| Étapes avec média | TRI-02, CLI-03, CON-06, BON-04 | workflow A | fond, 3 ou 4 étapes | gardé |
| Liste CMS | CSL-02, RES-02, CSD-06 | resource-list | filtres oui / non, fond | gardé |
| Bandeau texte, bouton, visuel | ABO-07, CON-02 | | fond clair ou sombre | fusion validée |
| **Slider** | HOM-06, HOM-07, HOM-08, ABO-04, ABO-05 | coque slider-top + swiper + flèches | type de carte (cas, citation, article, personne), fond | fusion validée |
| Onglets avec visuel | RSP-02, POR-03 | | | à revoir |
| Schéma avant / après | CON-04, BON-03 | | | à revoir |
| Blocs de texte | HOM-02, HOM-03, ABO-02, chapitres de la fiche case study, ART-02 | | | gardés, uniques |
| Logos investisseurs | ABO-06 | | | à revoir |
| At a glance de la fiche case study | « Early-Phase Dose Selection » | | | à revoir |

À virer : HOM-05 (Evidence en onglets, déjà masqué), BON-08 (ancien « See BonV in action », remplacé par la nouvelle copy, à confirmer).

## Petits éléments

- Boutons : deux variantes pleines seulement, jaune (E-VW27K) et violette (`purple`). Les variantes à contour sont virées : transparent (E-RG6LW), transparent-on-white (E-13CMF), purple-transparent.
- Gardés : liens de la navbar (E-1IC6F, E-W14NO), liens du menu déroulant de la navbar (E-ME0W4, « virer » était une erreur), lien « is-link » (E-1KTLG).
- Règle : rien de critique ne se supprime (navbar, footer, code global). « Virer » = masquer dans Webflow, jamais supprimer.
- Le reste des petits éléments n'est pas encore tranché.

## Export brut

Garder : ABO-01, ABO-02, ART-01, ART-02, « The challenge » (fiche case study), CSL-01, E-1IC6F, E-1KTLG, E-VW27K, E-W14NO, ETAPES-MEDIA, FAQ, HERO-CMS, HERO-PRODUIT, HOM-01, HOM-02, HOM-03, LISTE-CMS, PLATEFORME, TRI-01.

Fusionner : F-BANDEAU ; F-CARTES-NUM (« on garde la POR-04 ») ; F-CHIFFRES (« on va garder la version 1 (fond sombre) pour la structure et ajouter seulement une variante pour les couleurs fond et fonts ») ; F-FAQ ; RES-01.

Virer : E-13CMF, E-ME0W4, HOM-05.

À revoir : ABO-06, BON-08, CARTES-ICONE (« ça devrait fusionner avec un bloc qu'on a déjà »), CARTES-SOMBRES (idem), CHIFFRES (« à voir si on peut fusionner avec le composant chiffres »), CLI-05, CON-05, « Early-Phase Dose Selection », « What it changes, team by team » (« ça devrait être possible de le fusionner »), E-RG6LW, EVIDENCE, F-CAS, F-SLIDER, FRISE (« ça devrait fusionner avec un bloc qu'on a déjà »), ONGLETS, SCHEMA.

## Style (2026-11-14)

Refonte de style de **tout le site** sur le « style affiné », validé sur `trial-affine/` (`_kit/affine.css`) : Roboto léger et labels mono, fonds animés BonV avec grain, verre, data viz glossy, blanc pur, gaps et paddings sur l'échelle. Typo Roboto à faire valider par le client.
