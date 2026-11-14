# Protos

Un dossier par page du site. Ce fichier est l'index : une ligne par proto, mise à jour à chaque création ou décision.

- `_shared/` : assets et icônes utilisés par les protos (sources des assets uploadés dans Webflow).
- `_archive/` : sauvegardes de code remplacé (`legacy/`) et protos abandonnés.
- Ouvrir via Vite (`npm run dev`, puis `http://localhost:5173/protos/<page>/<fichier>`) : plusieurs protos importent `/src/...` ou chargent `/site.js`.

Statuts : **en cours**, **validé** (choix fait, pas encore intégré), **intégré** (dans Webflow ou dans une release), **abandonné**.

| Proto | Page | Créé | Statut | Retenu | Intégration |
|---|---|---|---|---|---|
| [site/phasev-line-textures-proto7.html](site/phasev-line-textures-proto7.html) | Global | 2026-10-23 | intégré | proto 7 | `site.js` (line field v2, fond flottant), `v0.11.0` |
| [site/phasev-platform-particles-proto.html](site/phasev-platform-particles-proto.html) | Pages produit | 2026-10-21 | intégré | | `src/platform-connect.js`, `v0.6.0` |
| [home/phasev-home-header-proto.html](home/phasev-home-header-proto.html) | Home | 2026-10-28 | intégré | | hero Home, `v0.12.1` |
| [home/phasev-home-evidence-proto.html](home/phasev-home-evidence-proto.html) | Home | 2026-10-23 | intégré | V1 | bloc Evidence (Webflow) |
| [home/phasev-home-quotes-proto.html](home/phasev-home-quotes-proto.html) | Home | 2026-10-23 | intégré | C | slider de citations (Webflow) |
| [company/phasev-company-glance-protos.html](company/phasev-company-glance-protos.html) | Company | 2026-10-22 | intégré | | « PhaseV at a glance » (Webflow) |
| [company/phasev-company-investors-proto.html](company/phasev-company-investors-proto.html) | Company | 2026-10-23 | intégré | | bloc Investors (Webflow) |
| [company/phasev-company-sab-protos.html](company/phasev-company-sab-protos.html) | Company | 2026-10-23 | intégré | | Scientific Advisory Board (Webflow) |
| [clinops/phasev-clinops-proof-proto.html](clinops/phasev-clinops-proof-proto.html) | ClinOps | 2026-10-21 | intégré | | `src/clinops-proof.js`, `v0.7.0` |
| [clinops/phasev-clinops-workflow-proto.html](clinops/phasev-clinops-workflow-proto.html) | ClinOps | 2026-10-21 | intégré | | `src/clinops-workflow.js`, `v0.8.0` |
| [trial/phasev-success-story-protos.html](trial/phasev-success-story-protos.html) | Trial | 2026-10-21 | intégré | proto 1 | `src/success-design-space.js`, `v0.5.0` |
| [trial/phasev-trial-protos.html](trial/phasev-trial-protos.html) | Trial | 2026-11-13 | en cours | | exploration : workflow A / C, success story A / C / D, FAQ, fonds alternés gris |
| [trial/phasev-trial-v2.html](trial/phasev-trial-v2.html) | Trial | 2026-11-13 | en cours | workflow A, success story C | version figée sur les choix ; success story à retravailler ; sources des deux pages dans `trial/_build/` |
| [trial/phasev-platform-connect-protos.html](trial/phasev-platform-connect-protos.html) | Pages produit | 2026-11-13 | validé | cartes, icônes = motifs des heros | refonte visuelle du bloc « Standalone or connected » ; module prêt : `trial/platform-connect-cards.js` (même contrat que `src/platform-connect.js`), branché dans la v2 Trial ; orbites, grille écartées ; ronde vintage archivée (`_archive/phasev-platform-connect-vintage.html`) ; v2 particules (`trial/platform-connect-v2.js`) rejetée |
| [conductor/phasev-conductor-site-cta-protos.html](conductor/phasev-conductor-site-cta-protos.html) | AI Conductor | 2026-10-26 | intégré | A | bloc site produit (Webflow) |
| [bonv/phasev-bonv-header-proto.html](bonv/phasev-bonv-header-proto.html) | BonV | 2026-11-02 | intégré | | header BonV, `v0.13.0` |
| [bonv/phasev-bonv-hero-proto.html](bonv/phasev-bonv-hero-proto.html) | BonV | 2026-11-02 | intégré | B streaming v3 | `src/bonv-hero-bg.js`, `v0.13.0` |
| [case-studies/phasev-case-studies-protos.html](case-studies/phasev-case-studies-protos.html) | Case Studies | 2026-11-13 | intégré | header A | `src/case-studies.js`, `v0.14.1` |
| [contact/phasev-contact-protos.html](contact/phasev-contact-protos.html) | Contact | 2026-10-25 | intégré | B | mise en page Contact (Webflow) |
