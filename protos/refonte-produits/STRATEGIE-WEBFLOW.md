# Stratégie d'intégration Webflow · refonte PhaseV

État au 2026-11-17. Sources : lecture seule par l'API Webflow (site PhaseV `6a7494c19b6df905487ffd7e` : pages, code personnalisé du site et des pages, composants, classes, variables, CMS), site publié sur webflow.io, repo (`src/`, protos, `INTEGRATION.md`). Rien n'a été modifié sur le site.

Ce document dit **comment** passer des protos validés au site Webflow. Le **quoi**, bloc par bloc, est dans `INTEGRATION.md`.

---

## 1. En bref

- Le site actuel est une base Webflow saine (composants, variables, système Client-First), mais encombrée : 1 448 classes dont une centaine héritées du template de départ, 7 composants sans aucune instance, 7 pages de sauvegarde, deux systèmes de footer, du code dupliqué d'une page à l'autre et quelques erreurs en production.
- Les protos ont été faits vite, en CSS et JS injectés. En production, **structure et style passent dans Webflow** (éditables dans le Designer), le **JS ne garde que le comportement et l'animation**.
- L'API permet bien plus que prévu : créer des éléments natifs à partir de HTML et CSS, des classes, des variables, des composants avec propriétés, et même des Interactions. Une grande partie de la construction peut donc être faite par moi, page par page, avec ta validation.
- **Contrainte majeure** : pas de branches sur ce plan (réservées à Enterprise), et toute modification d'une classe, d'une variable ou d'un composant global part avec la prochaine publication. La stratégie repose donc sur **construire à côté, puis basculer** : nouvelles classes, nouveaux composants, copies de pages non référencées, puis une bascule unique.
- **Construction sur place, pas de site dupliqué** : le workspace est en Starter, une copie du site serait limitée à 2 pages et 50 éléments CMS (il en faut une vingtaine et environ 150). Deux filets de sécurité du forfait Premium compensent : **sauvegardes** illimitées et restaurables, et **publication sur le seul webflow.io** pendant tout le chantier (voir § 5).
- Ordre proposé : retours client → nettoyage sans risque → socle (variables, classes de base) → nav et footer → pages → bascule → nettoyage final. Ordre de grandeur : **3 à 4 semaines** de travail effectif.

---

## 2. État des lieux

### 2.1 Pages (34)

| Groupe | Pages | Verdict |
|---|---|---|
| Pages refaites | Home, Company (About), ClinOps, Response, Trial, Portfolio, AI Conductor, BonV, Contact, Case Studies (+ template), Resources (+ template) | à reconstruire selon les protos |
| Sauvegardes | Company save, AI Conductor Save, Trial / Response / Portfolio / Clinops Optimizer Save | publiées et indexables aujourd'hui : à passer en brouillon, puis à supprimer après la bascule |
| Tests et vestiges | Home DEV (module `main.js` en v0.2.0), Static Page, Style Guide (brouillon) | Home DEV et Static Page en brouillon ; Style Guide à garder comme page de référence du nouveau système |
| Ancien système de preuves | Evidence (+ templates Evidences, Evidence Therapeutic Areas, Evidence Project Types) | remplacé par Case Studies : à confirmer, puis retrait (redirection 301 `/evidence` → `/case-studies`) |
| Autres | Privacy Policy, 404, templates Leaderships, Scientific Advisory Boards, Partnerships, Resource Categories, Case Study Products / Therapeutic Areas | à garder ; Privacy et 404 à passer au nouveau style |

### 2.2 Code global du site (head et footer)

| Élément | Rôle | Verdict |
|---|---|---|
| HubSpot (head) | suivi marketing | garder |
| CSS Lenis + `overflow-x: clip` (head) | défilement doux | garder |
| Lenis 1.0.33 (unpkg, ancien paquet `@studio-freight/lenis`) | défilement doux | garder, mettre à jour vers le paquet `lenis` à version fixe, sur jsDelivr |
| Année du © (`data-year`) | footer | garder (ou déplacer dans `site.js`) |
| Loader `site.js` @v0.11.0 | fond flottant, grain, LineField | garder, nouvelle version à la bascule (fond sombre unique, nav, plus de LineField sur les heros) |
| Compteurs GSAP (`.number-span`) | chiffres animés | garder, à déplacer dans `site.js` |
| Script de la navbar (`is-scrolled`, masquage, `--nav-h`, `nav-hidden`) | comportement de la nav | **remplacer** par le module de la nouvelle nav (qui reprend `--nav-h` et `nav-hidden`) |
| Synchro du menu mobile (MutationObserver) | blocage du scroll quand le menu est ouvert | **remplacer** par le module de la nouvelle nav |
| Userback (webflow.io seulement) | retours pendant la recette | garder pendant la recette, retirer ensuite |
| Animation SplitText des boutons | survol des boutons | garder, à déplacer dans `site.js` |

GSAP, ScrollTrigger et SplitText ne sont chargés nulle part dans le code personnalisé : ils viennent de l'intégration GSAP native de Webflow (à vérifier dans les réglages du site, et à garder activée).

### 2.3 Code des pages

| Page | Contenu | Problèmes |
|---|---|---|
| Home | Swiper (CSS + JS), carte de décision (SVG chargé depuis un CDN tiers `wunderdogs.b-cdn.net` + script + CSS `dm-*`), loader `main.js` @v0.12.1 | la carte de décision disparaît avec la refonte (remplacée par le chemin de décision en onglets) ; SVG hébergé hors du site et hors du repo |
| Company | Swiper « news », loader `company.js` @v0.11.0 | Swiper chargé page par page |
| ClinOps, Trial, BonV | loader seul | aucun |
| Response, Portfolio, AI Conductor | script d'onglets GSAP **recopié à l'identique sur les 3 pages** + son CSS, loader | à remplacer par un seul module d'onglets |
| Contact | CSS de « version B » ; Swiper 11 (head) **et** Swiper 12 (footer) alors que la page n'a pas de slider ; script jQuery | **CSS écrit dans une balise `<script>` : erreur JavaScript à chaque chargement** ; tout ce code part à la refonte |
| Case Studies | Swiper « feature » + loader `case-studies.js` @v0.14.1 | Swiper chargé page par page |
| Resources | Swiper 11 (head) **et** Swiper 12 (footer), Finsweet Attributes (filtres) | deux versions de Swiper sur la même page |
| Evidence | script Finsweet maison | part avec la page |
| Privacy Policy | CSS de typographie du texte légal | à remplacer par la classe d'article de Resources |
| Partout | `console.log` laissés en production | à retirer |

### 2.4 Composants (28)

| Composant | Instances | Verdict |
|---|---|---|
| `global styles` (embed) | 22 | devient **l'embed de styles unique** de la refonte (son contenu est réécrit) |
| `nav`, `nav_link`, `nav-dropdown`, `nav-dropdown_link` | 22 / 72 / 24 / 144 | remplacés par un **nouveau composant nav** (structure native de l'île, menu Platform avec aperçus) |
| `only-footer` | 9 | **base du footer unique** : il a déjà la propriété « Show CTA band » (à désactiver sur Contact) |
| `section_footer`, `footer-bottom`, `footer-lanes` | 13 / 22 / 22 | remplacés par `only-footer` refait ; `footer-lanes` (LineField) disparaît |
| `button` (5 variantes) | 112 | garder ; ne garder que les variantes pleines (Yellow, Purple) : les variantes transparentes sont déjà remplacées dans les protos |
| `slider-arrows` | 12 | garder (flèches validées sur Home et About) |
| `why-card`, `leadership-card` | 9 / 6 | garder, restyler (règle des cartes : fond selon la section) |
| `transparent-card`, `fit-card`, `fragmented-card`, `study-card`, `quote`, `text-quote-wrapper`, `spacer`, `swiper-item` | 8 / 2 / 3 / 4 / 6 / 21 / 5 / 1 | à revoir page par page : la plupart se fondent dans la carte unique et les blocs du kit |
| `dm-panel`, `dm-panel_list-item` | 10 / 68 | `dm-panel` part avec la carte de décision ; `dm-panel_list-item` sert encore aux pastilles de Build with us (About) |
| `difference-card`, `methodology-card`, `proof-card`, `tagline-green`, `tag-purple`, `inner-nav`, `inner-nav_link` | **0** | à supprimer |

### 2.5 Classes (1 448)

- Aucune classe de bibliothèque partagée : tout est modifiable.
- Environ 105 classes du template de départ (`navbar10_`, `navbar18_`, `footer1_`, `footer5_`, `cta48_`, `header78_`, `menu-icon4_`…), sans doute inutilisées.
- Des familles par page (`about2_`, `home1_`, `blog_`, `evidence_`, `ev_`) et beaucoup de combos `is-…` (173).
- La commande native du Designer « Clean up » (Style Manager) retire en une fois les classes inutilisées : à faire **après** la bascule, quand les anciennes pages sont retirées.

### 2.6 Variables

| Collection | Contenu | À faire |
|---|---|---|
| Colors (8) | Navy `#1a1a34`, Dark Navy `#141238`, Yellow `#e1c721`, White, Gray, Black, Light Purple `#684a9e`, Dark Purple `#5e2670` | ajouter les secondaires de la charte (mauve `#928ACD`, bleu `#78A8E0`, turquoise `#7FE8CF`) et les couleurs du fond sombre unique ; **le jaune de la variable (`#e1c721`) diffère de celui de la charte (`#E2C70A`)** : à trancher |
| Typography (14 + mode Mobile) | police **Aspekta**, tailles Display à Button | la refonte est en **Roboto / Roboto Mono** : nouvelle variable de police mono, tailles revues (titres plus fins, labels mono) |
| Base (2) | blanc, gris d'accessibilité | à fusionner dans Colors |

Le fond sombre unique (`--af-dark-bg`) est un dégradé : une variable Webflow ne peut pas le porter. Il devient **une classe** (`surface-dark`, par exemple) dont le dégradé est construit sur des variables de couleur.

### 2.7 CMS (11 collections)

- **À garder** : Resources + Resource Categories, Case Studies + Case Study Products + Case Study Therapeutic Areas, Leaderships, Scientific Advisory Boards.
- **Partnerships** (13 éléments) : à garder, elle porte les logos des investisseurs d'About.
- **À confirmer** : Evidences, Evidence Therapeutic Areas, Evidence Project Types (remplacées par Case Studies).
- Volumes au 2026-11-17 : Resources 84, Resource Categories 4, Case Studies 21, Case Study Products 4, Case Study Therapeutic Areas 9, Leaderships 3, Scientific Advisory Boards 11, Partnerships 13, Evidences 10.
- À ajouter éventuellement : un champ texte « question » si les questions des produits (nav, cartes plateforme) doivent être éditables en un seul endroit.

### 2.8 Repo

- Production : 9 entrées par page + `site.js`, 19 modules dans `src/`.
- Protos : 24 fichiers dans `_kit/`, dont `affine.css` (123 Ko) et `kit.css` (32 Ko) qui deviennent pour l'essentiel des classes Webflow, et une quinzaine de modules d'animation qui deviennent des modules `src/` (liste détaillée dans `INTEGRATION.md`, « Modules JS à créer »).

---

## 3. Principes

1. **La structure et le texte vivent dans Webflow** : éléments natifs, composants avec propriétés, CMS. Tout ce qui se voit s'édite dans le Designer.
2. **Le style vit dans les classes et les variables Webflow**, dans le système Client-First existant (nouvelles classes autorisées pour la refonte, documentées). Ce que le Designer ne sait pas faire (bords en dégradé par masque, `:has()`, certains sélecteurs) va dans **un seul embed de styles**, commenté.
3. **Le JS ne porte que le comportement et l'animation** : canvas, états de la nav, onglets automatiques, sliders. Les modules s'accrochent à des attributs `data-pv` et ne fabriquent plus de structure, sauf leur canvas.
4. **Une règle = une définition** : fond sombre, cartes, labels, boutons existent une fois (classe ou variable) et servent partout.
5. **Rien ne casse le site en ligne** : on construit à côté, on bascule une fois, on nettoie après.

---

## 4. Ce que l'API permet (et ses limites)

| Je peux, par l'API | Limites |
|---|---|
| Lire tout le site (pages, éléments, classes, variables, composants, CMS, code) | — |
| Créer des éléments natifs à partir de HTML + CSS (« WHTML builder ») | pas de `@keyframes`, et seulement les points de rupture Webflow (991 / 767 / 479 px) : les protos utilisent aussi 599 et 1280 px, à ramener aux points Webflow |
| Créer et modifier classes, combos, pseudo-éléments `::before` / `::after`, variables et leurs modes | les masques (`mask-composite`) et `:has()` restent dans l'embed |
| Créer des composants, leurs propriétés et variantes, insérer des instances | l'app **MCP Bridge** doit être ouverte dans le Designer pour l'arbre des éléments |
| Créer des Interactions (IX3) | une interaction acceptée peut ne pas s'animer : vérification en Preview obligatoire ; on garde le JS pour les comportements fiables |
| Dupliquer des pages, les passer en brouillon, changer les slugs | pas de branches sur ce plan |
| Lire et écrire le code personnalisé du site et des pages | `set_page_freeform_code` remplace tout le bloc : toujours lire avant |
| — | **je ne publie jamais** : chaque publication est faite par toi |

---

## 5. Phasage

### Mode de travail pendant tout le chantier

Option écartée le 2026-11-17 : dupliquer le site, reconstruire dans la copie, puis lui transférer le forfait Premium. Le transfert de forfait existe, mais le workspace est en **Starter** : la copie, sans forfait de site, serait bloquée à 2 pages statiques et 50 éléments CMS. Elle redeviendrait possible si le workspace passait en Core (ou plus) le temps du chantier.

On construit donc **dans le site actuel**, avec trois règles :

1. **Une sauvegarde nommée avant chaque étape** (Designer : Ctrl + Maj + S, une fois « Changes saved » affiché). Le forfait Premium garde toutes les sauvegardes et permet d'en restaurer n'importe laquelle (Site settings > Backups ; l'état courant est sauvegardé avant la restauration). À savoir : une restauration repasse en « Queue to publish » les éléments CMS programmés.
2. **Publication sur le seul webflow.io** pendant le chantier : dans la fenêtre de publication, cocher `phasev-2026.webflow.io` et décocher `phasevtrials.com` et `www`. Le webflow.io sert de site de recette ; le domaine du client n'est publié qu'à la bascule.
3. **Si le client doit publier sur son domaine pendant le chantier** (un article, une étude), la publication emporte tout l'état du site : nos pages restent donc en `v2-…`, non liées, protégées par mot de passe et en `noindex`, et nos classes, variables et composants sont nommés à part, sans toucher à l'existant avant la bascule.

### Phase 0 · Retours client (avant toute construction)
- Export statique des protos pour la preview client (déjà prévu), retours, gel du design.
- Décisions à obtenir (voir § 7) : police, jaune, About, bandeaux produit supprimés, Evidence.

### Phase 1 · Nettoyage sans risque (site en ligne inchangé à l'œil)
- Passer en brouillon les 7 pages de sauvegarde, Home DEV et Static Page.
- Corriger l'erreur de Contact (CSS dans `<script>`), retirer les doublons Swiper 11/12, les `console.log`.
- Supprimer les 7 composants sans instance.
- Chaque point te sera présenté avant d'être fait ; rien n'est supprimé sans ton accord.

### Phase 2 · Socle
- **Variables** : couleurs de la charte complètes, couleurs du fond sombre, police Roboto et Roboto Mono **en nouvelles variables** (l'ancienne Aspekta reste active sur le site en ligne jusqu'à la bascule).
- **Classes de base**, nommées à part pour ne rien toucher à l'existant : surfaces (blanc, light, sombre unique), titres et labels mono, textes, carte unique et ses trois fonds, pastilles, panneaux, grille de section.
- **Embed de styles unique** : ce qui ne passe pas en classes, dans un nouveau composant d'embed posé seulement sur les nouvelles pages.
- **Page Style Guide** refaite avec ces éléments : elle sert de référence et de test.

### Phase 3 · Nav et footer
- Nouveau composant **nav** (structure de l'île, menu Platform en panneau, aperçus `data-pv`, menu mobile), plus son module (états au scroll, pastille glissante, aperçus chargés à la première ouverture, `--nav-h` et `nav-hidden` conservés).
- **Footer** : nouveau composant à partir d'`only-footer` (propriété « Show CTA band »), un seul pour tout le site.
- Posés uniquement sur les nouvelles pages jusqu'à la bascule.

### Phase 4 · Pages
- Chaque page est **dupliquée** en copie non référencée (slug `v2-…`, `noindex`, protégée par mot de passe si tu veux la montrer), puis reconstruite section par section à partir de son proto et de `INTEGRATION.md`.
- Ordre : **Trial** (gabarit des pages produit) → Response, ClinOps, Portfolio → **Home** → About → Case Studies (page et template CMS) → Resources (page et template) → Contact → Privacy et 404 → BonV et AI Conductor (après le retour client).
- **JS** : nouvelles versions des entrées par page (animations seulement) et de `site.js` (nav, fond sombre animé, onglets, sliders, compteurs, boutons) ; tag semver propre à chaque page, URL jsDelivr vérifiée avant chaque loader.
- Vérification de chaque page en Preview et sur webflow.io, en desktop et à 390 px.

### Phase 5 · Bascule (une seule fois, préparée)
- Anciennes pages : slug `…-old` et brouillon ; nouvelles pages : slug définitif.
- Variables de police et de couleurs basculées, code global mis à jour (nouveau `site.js`, ancien script de navbar retiré).
- Redirections 301 (Evidence, anciennes URL si besoin).
- Publication par toi, puis vérification de toutes les pages en ligne.

### Phase 6 · Nettoyage final
- Suppression des anciennes pages, composants (`nav` d'origine, `section_footer`, `footer-lanes`, `dm-panel`…), modules `src/` remplacés, puis « Clean up » des classes inutilisées.
- `MANIFEST.md`, `INTEGRATION.md` et `CLAUDE.md` mis à jour ; release du repo en v1.0.0.

### Ordre de grandeur (travail effectif)

| Phase | Durée |
|---|---|
| 1 · Nettoyage | ½ à 1 jour |
| 2 · Socle | 2 à 3 jours |
| 3 · Nav et footer | 2 jours |
| 4 · Pages | 9 à 12 jours (Home 2 j, Trial 1,5 j, autres produits 1 j chacune, About 1 j, Case Studies 1,5 j, Resources 1 j, Contact ½ j, BonV et AI Conductor 2 j) |
| 5 · Bascule | ½ à 1 jour |
| 6 · Nettoyage final | ½ jour |
| **Total** | **15 à 20 jours** |

---

## 6. Architecture JS cible

| Fichier | Contenu |
|---|---|
| `site.js` (toutes les pages) | fond sombre animé (palette unique), grain, nav, onglets (un seul module à la place des 3 copies), sliders (une seule configuration Swiper, une seule version), compteurs, animation des boutons, année du ©, réglage de Lenis |
| `<page>.js` | uniquement les animations propres à la page (heros, scènes, graphes) |
| chunks partagés | socle `bonv-draw`, mini-scènes (chargées à la demande par la nav), `hero-stage`, `platform-connect` |

Règles inchangées : un tag semver par release, jamais `@main` ni `@latest`, URL jsDelivr vérifiée avant de toucher au loader, reduced motion, pause hors écran, `destroy()`.

---

## 7. Décisions à prendre

1. **Police** : passage d'Aspekta à Roboto / Roboto Mono sur tout le site (les protos sont validés ainsi) : à confirmer avec le client.
2. **Jaune** : `#e1c721` (variable actuelle) ou `#E2C70A` (charte) ?
3. **Evidence** : retrait de la page et des 3 collections au profit de Case Studies ?
4. **Workspace** : le passer en Core le temps du chantier, pour travailler dans une copie du site (plus propre, voir § 5) ? Sinon, construction sur place.
5. **Textes** : renommage Company → About (nav), bandeaux propres aux pages produit supprimés (liste dans `INTEGRATION.md`), propositions de copy marquées dans les protos.
6. **Formulaire de contact** : formulaire Webflow (actuel, avec Turnstile) ou formulaire HubSpot ? (HubSpot est déjà sur le site.)
7. **Questions des produits** (nav et cartes plateforme) : attributs sur les liens, ou un champ CMS éditable en un seul endroit ?
8. **Copies de travail** : pages `v2-…` protégées par mot de passe pour les montrer au client avant la bascule ?

---

## 8. Prochaine étape

Phase 0 : la preview client. En parallèle, si tu veux avancer sans risque, la phase 1 peut commencer dès que tu valides la liste (je te la présente point par point).
