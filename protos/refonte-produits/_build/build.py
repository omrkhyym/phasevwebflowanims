"""Génère les protos de la refonte des pages produit : protos/refonte-produits/<page>/phasev-<page>.html
   python protos/refonte-produits/_build/build.py            toutes les pages
   python protos/refonte-produits/_build/build.py clinops    une page
   --refresh retélécharge les pages staging (cache .cache/, non versionné).

   Chaque page = page staging (hero, navbar, footer) + <page>/content.html (les blocs) + le kit (_kit/kit.css, _kit/kit.js).
   Le hero et le bandeau CTA du footer sont réécrits ici, d'après le document client de la page."""
import re, sys, os, urllib.request
D = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(D)
STAGING = 'https://phasev-2026.webflow.io'

def H1(a, b):  # titre du hero : première ligne blanche, seconde en jaune (convention des heros produit)
    return (r'<h1 class="text-size-display text-color-alternate">.*?</h1>',
            f'<h1 class="text-size-display text-color-alternate" data-new>{a} <br/><span class="text-color-yellow">{b}</span></h1>')
def P(start, text):  # paragraphe du hero (le texte actuel commence par `start`)
    return (r'(<div class="text-size-large)(">)' + re.escape(start) + r'.*?</div>', r'\1" data-new\2' + text + '</div>')
def BTN2(label, href):  # second bouton du hero, transparent, après le bouton jaune
    return (r'(<div class="button-group gap-24"><a data-wf--button--variant="yellow" href="[^"]*" class="button w-button">[^<]*</a>)',
            r'\1<a data-wf--button--variant="transparent" href="' + STAGING + href + r'" class="button w-variant-a4343b71-de97-ab07-2e4d-8afb553ce387 w-button" data-new>' + label + '</a>')
def CTA(label, href):  # bouton du bandeau CTA du footer
    return (r'(<div class="footer-band-actions"><a data-wf--button--variant="yellow") href="[^"]*" (class="button w-button")>[^<]*</a>',
            r'\1 href="' + STAGING + href + r'" \2 data-new>' + label + '</a>')

def BTN1(label):  # libellé du bouton jaune du hero
    return (r'(<div class="button-group gap-24"><a data-wf--button--variant="yellow" href="[^"]*" class="button w-button")>[^<]*</a>', r'\1 data-new>' + label + '</a>')
def BAND(label, title, text):  # texte du bandeau CTA du footer
    return (r'<div class="footer-band-copy">.*?</div></div><div class="footer-band-actions">',
            f'<div class="footer-band-copy"><div class="text-size-label is-footer-label" data-new>{label}</div><h2 class="footer-statement is-cta" data-new>{title}</h2><div class="text-size-large text-color-nwhite" data-new>{text}</div></div><div class="footer-band-actions">')

PAGES = {
  'trial': dict(path='/trial-optimizer', subs=[
      H1('Design for uncertainty.', 'Decide with clarity.'),
      P('A design that looks strong', 'A design can look strong under one assumed effect size and fail under another. Trial Optimizer helps you find a design that meets your objectives within your constraints. It simulates and optimizes adaptive, fixed, and Bayesian designs, explores trade-offs, and tests performance across the scenarios that matter, including those where your assumptions miss, so you can choose a robust design you can defend.'),
      CTA('Contact us', '/contact'),
  ]),
  'response': dict(path='/response-optimizer', subs=[
      H1('Clarify the treatment signal', 'Understand who benefits'),
      # le paragraphe garde le mot manquant du document (« from to better ») : signalé au client
      P('Response Optimizer isolates', 'Response Optimizer combines prognostic modeling and heterogeneous treatment-effect analysis to strengthen clinical development decisions. It separates predictable outcome variation from <mark data-fix="mot manquant">to</mark> better assess the treatment benefit, so you can sharpen precision, identify who responds, and make a clearer go, redesign, or no-go decision. Use it before unblinding or after an ambiguous readout.'),
      BTN2('Explore case studies', '/case-studies'),
      CTA('Contact us', '/contact'),
  ]),
  'clinops': dict(path='/clinops-optimizer', subs=[
      (r'<div class="text-size-label text-color-yellow">ClinOps optimizer</div>', '<div class="text-size-label text-color-yellow">ClinOps Optimizer</div>'),
      H1('Find the right sites.', 'Forecast your enrollment.'),
      # paragraphe, puis la ligne de preuve du document sous le paragraphe
      P('ClinOps Optimizer combines', 'ClinOps Optimizer is clinical trial site selection and enrollment forecasting software for sponsors and CROs. It shows which sites can reach the right patients for your protocol and how fast you will enroll, before you open a single site.</div><div class="text-size-medium text-color-nwhite" data-new><strong>In a Phase III breast cancer retrospective, sites PhaseV recommended recruited 50%+ faster.</strong>'),
  ]),
  'portfolio': dict(path='/portfolio-optimizer', subs=[
      H1('Prioritize the path.', 'Calibrate the bet.'),
      P('Portfolio Optimizer integrates', 'Portfolio Optimizer is PhaseV’s AI-driven decision engine for drug development. It combines clinical, biological, real-world, and program evidence to compare development paths and estimate an asset’s probability of success, with every assumption, driver, and uncertainty visible, so teams can commit capital with conviction.'),
      BTN2('Explore an example analysis', '#'),   # avant BTN1 : BTN2 s'accroche au bouton jaune d'origine
      BTN1('Discuss an opportunity'),
      BAND('Start with one decision', 'Bring us one asset, one opportunity, or one question', 'Bring us one asset, one opportunity, or one question. PhaseV will build the evidence, quantify the uncertainty, and make the decision logic explorable.'),
      CTA('Explore an example analysis', '#'),
  ]),
  'conductor': dict(path='/ai-conductor', keep_first=True, subs=[
      H1('Clinical development,', 'orchestrated.'),
      P('AI Conductor moves', 'AI Conductor is the AI platform that orchestrates clinical development, from protocol decision to submission-ready package. It connects design, study authoring, statistical programming and submission assets in one governed layer, so teams move faster with traceability and expert approval at every step.'),
  ]),
  'bonv': dict(path='/bonv', keep_first=True, subs=[   # « See BonV in action » (vidéo) reste en tête, comme sur Conductor
      H1('Ask the question.', 'BonV orchestrates the answer.'),
      P('BonV is PhaseV', 'Clinical development tools, data and teams rarely work as one. BonV is the agentic layer on top of the PhaseV platform and your own systems. It turns a plain-language question into the right workflow, with explainable results and your experts approving every step.'),
      (r'(href="#bonv-video" class="button w-variant-a4343b71-de97-ab07-2e4d-8afb553ce387 w-button")>Watch the video</a>', r'\1 data-new>Learn more</a>'),
  ]),
}

# Recherche « style affiné » (inspiré de BonV : Roboto léger, labels mono, verre, traits fins) : nouveau template,
# même contenu que Trial validé, avec une feuille de style en plus. trial/ reste inchangé.
AFFINE_HEAD = ('<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'
               '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@300..700&family=Roboto+Mono:wght@400&display=swap">'
               '<link rel="stylesheet" href="../_kit/affine.css">'
               '<script src="../_kit/affine-bg.js"></script><script type="module" src="../_kit/affine.js"></script>')
PAGES['trial-affine'] = dict(PAGES['trial'], content='trial-affine', head=AFFINE_HEAD)   # contenu : copie de trial + variante sombre
PAGES['response-affine'] = dict(PAGES['response'], content='response-affine', head=AFFINE_HEAD)
PAGES['clinops-affine'] = dict(PAGES['clinops'], content='clinops-affine', head=AFFINE_HEAD)
PAGES['portfolio-affine'] = dict(PAGES['portfolio'], content='portfolio-affine', head=AFFINE_HEAD)
PAGES['conductor-affine'] = dict(PAGES['conductor'], content='conductor-affine', head=AFFINE_HEAD)
PAGES['bonv-affine'] = dict(PAGES['bonv'], content='bonv-affine', head=AFFINE_HEAD,
    subs=PAGES['bonv']['subs'] + [   # bandeau du footer selon le document BonV
      (r'<div class="footer-statement">Better decisions <span class="footer-statement-soft">Connected development</span></div>',
       '<div class="footer-statement" data-new>Better questions <span class="footer-statement-soft">Connected decisions</span></div>')])

# Pages hors produit, en page complète (full) : toute la page staging, avec le style affiné ; les blocs repris passent par subs
# ou, plus tard, par un content.html qui remplace des sections précises.
E = re.escape
DARK = '<section data-bg="purple-gradient" class="section_layout is-gradient" data-af-bg="bonv" data-af-dark>'   # section sombre du style affiné
HOME_CS = open(os.path.join(ROOT, 'home-affine', 'cs-cards.html'), encoding='utf-8').read()   # cartes case studies (composant des pages produit)
PAGES['home-affine'] = dict(path='/', full=True, head=AFFINE_HEAD, subs=[
    # hero : la séquence validée dans l'atelier hero-lab (hero-sequence.js, WebGL, un seul programme), très grand, sous le texte ;
    # hero-pulse.js, hero-landscape.js, hero-morph.js, hero-decision.js et hero-homepage-glossy.js restent de côté
    (re.escape('<div data-pv="hero-homepage"></div>'), '<div data-pv="hero-sequence"></div>'),
    # The problem : en-tête centré, texte sous le titre, grand panneau dessous avec le Gantt d'origine restylé ; fichier home-affine/problem.html
    (r'<section class="section_layout is-white"><div class="padding-global padding-section-main"><div class="container-large"><div class="section-top"><div class="text-size-label">The problem</div>.*?</section>', lambda m: open(os.path.join(ROOT, 'home-affine', 'problem.html'), encoding='utf-8').read()),
    # The PhaseV platform : section refaite (chemin de décision), fichier home-affine/platform.html
    (r'<section id="phasev-platform".*?</section>', lambda m: open(os.path.join(ROOT, 'home-affine', 'platform.html'), encoding='utf-8').read()),
    # Why PhaseV : en-tête sur une colonne (cartes déjà unifiées)
    (re.escape('<div class="section-top align-center max-width-large"><div class="text-size-label">Why PhaseV</div><h2 class="text-size-display text-align-center">Built differently for clinical development</h2><div class="text-size-large text-align-center">'),
     '<div class="section-top left-align"><div class="text-size-label">Why PhaseV</div><h2 class="text-size-display">Built differently for clinical development</h2><div class="text-size-large">'),
    # Evidence : slider retiré, titre + intro + cartes case studies ; fichier home-affine/evidence.html
    (r'<section data-line-field="forest" data-bg="purple-gradient" class="section_layout is-gradient">.*?</section>', lambda m: open(os.path.join(ROOT, 'home-affine', 'evidence.html'), encoding='utf-8').read()),
    # Testimonials : section refaite (une citation à la une, partenaires en onglets), fichier home-affine/testimonials.html
    (r'<section class="section_layout is-lightpurple">.*?</section>', lambda m: open(os.path.join(ROOT, 'home-affine', 'testimonials.html'), encoding='utf-8').read()),
])
ARROW_SVG = ('<svg width="100%" height="100%" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="44" height="44" rx="22" fill="currentcolor"/>'
             '<path d="M17.3286 18.3403H17.9966C17.6509 19.0317 17.3901 19.5181 17.2144 19.7993C17.0444 20.0747 16.7339 20.4937 16.2827 21.0562H30.3013V21.9438H16.2827C16.8921 22.5767 17.4722 23.4819 18.0229 24.6597H17.3374C16.5815 23.8159 15.9312 23.1772 15.3862 22.7437C14.8413 22.3042 14.2788 21.9438 13.6987 21.6626V21.2671C14.2085 21.0503 14.7476 20.7192 15.3159 20.2739C15.8843 19.8286 16.5552 19.1841 17.3286 18.3403Z" fill="#F8F8F8"/></svg>')
PAGES['company-affine'] = dict(path='/company', full=True, head=AFFINE_HEAD, subs=[
    # hero : sans LineField (comme les autres heros), animation « Orbites » (_kit/about-orbits.js) en premier enfant du header
    (E('<header data-line-field="swimmer" data-bg="purple-gradient" class="section_header is-company">'),
     '<header data-bg="purple-gradient" class="section_header is-company"><div data-pv="about-orbits"></div>'),
    # About us : vrai titre (label PhaseV, titre About us), en-tête centré (premier bloc) ; les trois textes en colonnes sous un filet
    (E('<div class="section-top"><div class="text-size-label">About us</div>'),
     '<div class="section-top align-center af-head-center"><div class="text-size-label" data-proposed>PhaseV</div><h2 class="text-size-display text-align-center" data-proposed>About us</h2></div><div>'),
    # At a glance : fond light (Leadership passe en sombre), en-tête sur une colonne, chiffres en cartes blanches (variante carte : glance-stat + why-card)
    (E('<section data-line-field="volcano" data-bg="purple-gradient" class="section_layout is-gradient">'), '<section class="section_layout is-light" data-af-glance>'),
    (r'<div class="glance-grid">.*?</section>', lambda m: m.group(0).replace('class="glance-stat"', 'class="glance-stat why-card"')),
    (E('<div class="section-top _2col is-bottom"><div class="section-top_left"><div class="text-size-label text-color-yellow">PhaseV at a glance</div><h2 class="text-size-display text-color-alternate">Trusted across clinical development</h2></div></div>'),
     '<div class="section-top left-align"><div class="text-size-label">PhaseV at a glance</div><h2 class="text-size-display">Trusted across clinical development</h2></div>'),
    # Leadership : sombre animé, pour mettre les dirigeants en avant (cartes personne en verre sombre, CSS)
    (E('<section class="section_layout is-lightpurple">'), DARK),
    # flèches du slider mobile : variante sombre du composant flèche, comme sur la Home
    (E('<div data-swiper-prev="1" class="arrow is-left w-embed">'), '<div data-swiper-prev="1" class="arrow is-left w-variant-8d42f08a-cd86-49e8-facc-a95f158034bb w-embed">'),
    (E('<div data-swiper-next="1" class="arrow is-right w-embed">'), '<div data-swiper-next="1" class="arrow is-right w-variant-8d42f08a-cd86-49e8-facc-a95f158034bb w-embed">'),
    # Scientific Advisory Board : fond light (cartes personne blanches), titre en encre (le jaune reste au moment de décision)
    (E('<section data-line-field="km" data-bg="purple-gradient" class="section_layout is-gradient">'), '<section class="section_layout is-light" data-af-sab>'),
    (E('<h2 class="text-size-display text-color-yellow">Scientific Advisory Board</h2>'), '<h2 class="text-size-display">Scientific Advisory Board</h2>'),
    # flèches du slider : le composant flèche du site (variante de base, fond clair), comme sur la Home, à la place de arrow-new
    (r'<div class="slider-arrows-wrapper is-new"><div data-swiper-prev="2" class="arrow-new is-left w-embed">.*?</div><div data-swiper-next="2" class="arrow-new is-right w-embed">.*?</div></div>',
     lambda m: '<div class="slider-arrows-wrapper"><div data-swiper-prev="2" class="arrow is-left w-embed">' + ARROW_SVG + '</div><div data-swiper-next="2" class="arrow is-right w-embed">' + ARROW_SVG + '</div></div>'),
    # Investors : en-tête sur une colonne (tuiles de logos en verre, CSS)
    (E('<div class="section-top _2col is-bottom"><div class="section-top_left"><div class="text-size-label">Investors</div><h2 class="text-size-display">Backed by leading investors</h2></div><div class="section-top_right"><div class="text-size-large">PhaseV is supported by investors in technology, life sciences, and healthcare.</div></div></div>'),
     '<div class="section-top left-align"><div class="text-size-label">Investors</div><h2 class="text-size-display">Backed by leading investors</h2><div class="text-size-large">PhaseV is supported by investors in technology, life sciences, and healthcare.</div></div>'),
    # Build with us : fond light (la page finit sur du clair avant le footer sombre), animation dans un panneau sombre arrondi (CSS)
    (E('<section data-line-field="matrix" data-bg="purple-gradient" class="section_layout is-gradient">'), '<section class="section_layout is-light" data-af-careers>'),
    (E('<div class="text-size-large text-color-alternate max-width-555">PhaseV brings together'), '<div class="text-size-large max-width-555">PhaseV brings together'),
    # animation carrières dans le style BonV (_kit/careers.js) : autre nom de montage, pour que le module de production ne s'y accroche pas
    (E('<div data-pv="company-careers" class="w-embed">'), '<div data-pv="careers-affine" class="w-embed">'),
    (E('<div class="text-size-label text-color-yellow">Build with us</div><h2 class="text-size-display text-color-alternate">'), '<div class="text-size-label">Build with us</div><h2 class="text-size-display">'),
])

# Case Studies, bibliothèque : section des cartes sur fond blanc, cartes claires, 4 par ligne (CSS « Case Studies » d'affine.css)
PAGES['cs-affine'] = dict(path='/case-studies', full=True, head=AFFINE_HEAD, subs=[
    # hero : sans LineField, comme les heros produit (fond animé BonV posé par affine.js)
    (E('<header data-line-field="matrix" data-bg="purple-gradient" class="section_header is-resources">'), '<header data-bg="purple-gradient" class="section_header is-resources">'),
])
# Case Studies, fiche (modèle de toutes les études ; ici Denali) : At a glance en light, Why it matters en sombre animé (fond éclairci), études liées en light ;
# les libellés de section, non liés dans le template Webflow (texte par défaut), remplacés par des propositions
PAGES['cs-study-affine'] = dict(path='/case-studies/denali-dose-selection-trial-optimizer', full=True, head=AFFINE_HEAD, subs=[
    # hero : sans LineField, comme les heros produit (fond animé BonV posé par affine.js)
    (E('data-cs-hero="" data-bg="purple-gradient" data-line-field="matrix"'), 'data-cs-hero="" data-bg="purple-gradient"'),
    (E('<section class="section_layout is-lightpurple">'), '<section class="section_layout is-light">'),
    (E('<div class="text-size-label text-color-purple">This is some text inside of a div block.</div>'), '<div class="text-size-label" data-proposed>At a glance</div>'),
    (E('<section data-bg="purple-gradient" class="section_layout is-gradient">'), DARK),
    (E('<div class="text-size-label text-color-yellow">This is some text inside of a div block.</div>'), '<div class="text-size-label" data-proposed>Why it matters</div>'),
    (E('<div class="text-size-label text-color-purple">This is some text inside of a div block.</div>'), '<div class="text-size-label" data-proposed>FAQ</div>'),
    (E('<div class="text-size-label">This is some text inside of a div block.</div>'), '<div class="text-size-label" data-proposed>Source</div>'),
    (E('<section class="section_layout is-lightpurple">'), '<section class="section_layout is-light">'),   # études liées : fond light, cartes de la bibliothèque
])

# Resources, bibliothèque : mêmes règles que Case Studies (hero aligné, filtres en barre segmentée, cartes claires 3 par ligne sur blanc) ;
# data-af-lib repère le conteneur de la liste (filtres Finsweet + liste CMS), pour le CSS « Resources » d'affine.css
PAGES['res-affine'] = dict(path='/resources', full=True, head=AFFINE_HEAD, subs=[
    (E('<header data-line-field="matrix" data-bg="purple-gradient" class="section_header is-resources">'), '<header data-bg="purple-gradient" class="section_header is-resources">'),
    (E('<div class="container-large"><div class="filter-form-wrapper">'), '<div class="container-large" data-af-lib><div class="filter-form-wrapper">'),
])
# Resources, article (modèle de tous les articles ; ici « We simulated 60 million trials ») : hero aligné, texte de l'article en style affiné ;
# data-af-article repère le corps de l'article
PAGES['res-article-affine'] = dict(path='/resources/we-simulated-60-million-trials-heres-what-we-found', full=True, head=AFFINE_HEAD, subs=[
    (E('<header data-line-field="matrix" data-bg="purple-gradient" class="section_header is-resources">'), '<header data-bg="purple-gradient" class="section_header is-resources">'),
    (E('<div class="container-small"><div class="post-rtf w-richtext">'), '<div class="container-small" data-af-article><div class="post-rtf w-richtext">'),
])

# Contact (version B validée ; la version A en deux colonnes est archivée) : la page tient en une section, traitée comme un hero
# (fond sombre animé) ; une colonne centrée : en-tête, formulaire en carte de verre sombre, ligne de coordonnées reprises du footer.
# CSS « Contact » (base : carte, champs, cases) et « Contact B » (colonne centrée, espacements) d'affine.css
CONTACT_INFO = ('<div data-af-contact-info><a href="mailto:info@phasevtrials.com" class="text-size-label">info@phasevtrials.com</a>'
                '<a href="https://www.linkedin.com/company/phasevtrials" target="_blank" class="text-size-label">LinkedIn</a>'
                '<span class="text-size-label">Boston, USA</span><span class="text-size-label">Tel Aviv, Israel</span></div>')
PAGES['contact-affine'] = dict(path='/contact', full=True, head=AFFINE_HEAD, subs=[
    (E('<section data-bg="purple-gradient" class="section_layout is-gradient">'), DARK.replace('data-af-dark>', 'data-af-dark data-af-contact data-af-contact-b>')),
    (E('submitting the form.</div></div></div></div>'), lambda m: m.group(0) + CONTACT_INFO),
    # intro : retour à la ligne après la première phrase (saut de ligne dans le texte Webflow)
    (E('portfolio, or question. We’ll follow up'), 'portfolio, or question.<br/>We’ll follow up'),
])

# premières versions archivées (_archive/pages-v1/) : elles restent la base des pages affinées (chemin, hero, sous-titres),
# mais ne sont plus construites
for _k in ('trial', 'response', 'clinops', 'portfolio', 'conductor', 'bonv'):
    PAGES[_k]['archived'] = True

# Navigation (proto « île », _kit/nav-island.js, pages affinées) : produits du menu Platform dans l'ordre du parcours, avec la question
# de leur carte plateforme (Home) et leur mini-scène ; Case Studies ajouté ; Company renommé About (copy proposée) et placé avant Careers.
# Webflow : attributs personnalisés data-af-q, data-af-scene, data-af-col, data-af-group sur les liens du menu Platform.
NAV_PRODUCTS = {   # nom : (question, mini-scène, couleur, groupe)
    'Portfolio Optimizer': ('What should we pursue?', 'rank', '0', '1'),
    'Trial Optimizer': ('How should we design it?', 'curve', '1', '1'),
    'ClinOps Optimizer': ('Where should we run it?', 'sites', '2', '1'),
    'Response Optimizer': ('Who benefits?', 'split', '3', '1'),
    'AI Conductor': ('How do we carry decisions into execution?', 'doc', '4', '2'),
    'BonV': ('Ask the question.', '', '', '2'),
}
def nav_island(h):
    m = re.search(r'(<div class="navbar_dropdown-list">)(.*?)(</div></nav>)', h, re.S)
    if m:
        by = {re.search(r'>([^<]*)</a>$', a).group(1).strip(): a for a in re.findall(r'<a [^>]*>[^<]*</a>', m.group(2))}
        out = [by.pop(n).replace('<a ', f'<a data-af-q="{q}" data-af-scene="{sc}" data-af-col="{c}" data-af-group="{g}" ', 1)
               for n, (q, sc, c, g) in NAV_PRODUCTS.items() if n in by]
        h = h[:m.start(2)] + ''.join(out) + ''.join(by.values()) + h[m.end(2):]
    comp = re.search(r'<a href="[^"]*/company"[^>]*class="navbar_link[^"]*"[^>]*>Company</a>', h)
    if comp:
        h = h.replace(comp.group(0), '', 1)
        about = comp.group(0).replace('>Company</a>', ' data-proposed>About</a>')
        h = re.sub(r'<a href="https://job-boards\.greenhouse\.io/phasev"[^>]*class="navbar_link', lambda k: about + k.group(0), h, count=1)
        cs = f'<a href="{STAGING}/case-studies" data-wf--nav_link--variant="base" class="navbar_link w-nav-link" data-new>Case Studies</a>'
        h = re.sub(r'<a href="[^"]*/resources"[^>]*class="navbar_link', lambda k: cs + k.group(0), h, count=1)
    return h

# Footer (proto, pages affinées) : bandeau en panneau arrondi sombre éclairci (sans LineField), liens Platform dans l'ordre du parcours
# (comme la nav), Company complété (Case Studies, Careers), logotype PhaseV en grand tout en bas, coupé par le bord.
# HTML et CSS seulement (CSS « Footer » d'affine.css, repère data-af-foot) ; le fond animé du panneau est posé par affine.js.
# Un seul footer pour tout le site (décision de Romain, 2026-11-17) : le bandeau de la Home partout ; Contact sans bandeau
# (Webflow : un composant, une propriété « afficher le bandeau »). Les bandeaux propres aux pages produit disparaissent.
FOOT_PLATFORM = ['portfolio-optimizer', 'trial-optimizer', 'clinops-optimizer', 'response-optimizer', 'ai-conductor', 'bonv']
FOOT_BAND = ('<div class="footer-band"><div class="footer-band-copy"><h2 class="footer-statement is-cta">Bring us the question in front of your team</h2>'
             '<div class="text-size-large text-color-nwhite">An asset, an ambiguous readout, a protocol, a site plan, or a workflow. We will help identify '
             'where PhaseV can create the most immediate value and where a connected path may matter next.</div></div><div class="footer-band-actions">'
             f'<a data-wf--button--variant="yellow" href="{STAGING}/contact" class="button w-button">Discuss your program</a></div></div>')
def footer_affine(h, band=True):
    i = h.find('<section data-bg="purple-gradient" class="section_footer is-gradient">')
    if i < 0: return h
    head, foot = h[:i], h[i:]
    foot = foot.replace('class="section_footer is-gradient">', 'class="section_footer is-gradient" data-af-foot>', 1)
    foot = foot.replace('padding-section-footer-single', 'padding-section-footer', 1)
    # bandeau unique (ou aucun), à la place des variantes par page
    foot = re.sub(r'<div[^>]*class="footer-band">.*?(?=<div class="footer-bottom">)', '', foot, count=1, flags=re.S)
    if band: foot = foot.replace('<div class="footer-bottom">', FOOT_BAND + '<div class="footer-bottom">', 1)
    # Platform : ordre du parcours
    m = re.search(r'(<div class="text-size-label is-footer-label">Platform</div><div class="footer-links">)(.*?)(</div>)', foot, re.S)
    if m:
        links = re.findall(r'<a [^>]*>[^<]*</a>', m.group(2))
        key = lambda a: next((k for k, s in enumerate(FOOT_PLATFORM) if re.search(r'href="[^"]*/' + s + '"', a)), 99)
        foot = foot[:m.start(2)] + ''.join(sorted(links, key=key)) + foot[m.end(2):]
    # Company : About, Case Studies, Resources, Careers, Contact (les deux ajouts sont marqués data-new)
    m = re.search(r'(<div class="text-size-label is-footer-label">Company</div><div class="footer-links">)(.*?)(</div>)', foot, re.S)
    if m:
        by = {re.search(r'>([^<]*)</a>$', a).group(1): a for a in re.findall(r'<a [^>]*>[^<]*</a>', m.group(2))}
        new = lambda href, label, ext='': f'<a href="{href}"{ext} class="footer-item_link" data-new>{label}</a>'
        out = [by.get('About', ''), new(STAGING + '/case-studies', 'Case Studies'), by.get('Resources', ''),
               new('https://job-boards.greenhouse.io/phasev', 'Careers', ' target="_blank"'), by.get('Contact', '')]
        foot = foot[:m.start(2)] + ''.join(out) + foot[m.end(2):]
    # logotype en grand, sous la ligne légale (même tracé que le logo de la nav)
    logo = re.search(r'<div class="logo-embed w-embed">(<svg.*?</svg>)', head, re.S)
    if logo:
        foot = foot.replace('Back to top ↑</a></div></div>', 'Back to top ↑</a></div></div><div class="af-foot-mark" aria-hidden="true">' + logo.group(1) + '</div>', 1)
    return head + foot

def sub(pat, rep, s, count=1, flags=re.S):
    out, k = re.subn(pat, rep, s, count=count, flags=flags)
    if k == 0: raise SystemExit('pattern not found: ' + pat[:90])
    return out

def staging(page, refresh):
    f = os.path.join(D, '.cache', 'live-' + PAGES[page]['path'].strip('/') + '.html')
    if refresh or not os.path.exists(f):
        os.makedirs(os.path.dirname(f), exist_ok=True)
        with urllib.request.urlopen(STAGING + PAGES[page]['path']) as r, open(f, 'wb') as o: o.write(r.read())
    return open(f, encoding='utf-8').read()

BAR = '''
<div class="pv-proto" data-lenis-prevent>
  <b>Proto {name}</b>
  <a class="pv-proto-home" href="../index.html">Toutes les pages</a>
  <button type="button" data-cls="show-new" aria-pressed="false">Copy nouvelle</button>
  <button type="button" data-cls="show-proposed" aria-pressed="false">Copy proposée</button>
  <button type="button" data-cls="show-fix" aria-pressed="false">À corriger (client)</button>
</div>
'''

def build(page, refresh=False):
    h = staging(page, refresh)
    cf = os.path.join(ROOT, PAGES[page].get('content', page), 'content.html')
    content = open(cf, encoding='utf-8').read() if os.path.exists(cf) else ''
    # scripts tiers inutiles en local (HubSpot, analytics, widget de bot, Userback)
    h = re.sub(r'<script[^>]*hs-script-loader.*?</script>', '', h, flags=re.S)
    h = re.sub(r'<script async="" src="/v2645[^"]*"[^>]*></script>', '', h)
    h = re.sub(r'<script>\s*if \(window\.location\.hostname\.includes\(\'webflow\.io\'\)\).*?</script>', '', h, flags=re.S)
    h = re.sub(r'<script[^>]*googletagmanager[^>]*></script>', '', h)
    # liens internes vers le staging ; loaders vers le serveur Vite local (site.js et l'entrée de la page)
    h = re.sub(r'href="/(?!/)', 'href="' + STAGING + '/', h)
    h = h.replace("location.search.includes('dev')", 'true')
    for pat, rep in PAGES[page]['subs']:
        h = sub(pat, rep, h)
    if PAGES[page].get('head') == AFFINE_HEAD:
        h = nav_island(h)
        h = footer_affine(h, band=PAGES[page]['path'] != '/contact')
    # contenu juste après le hero ; keep_first : la première section staging après le hero reste en tête
    # (Conductor : bloc « See AI Conductor in action » vers le site produit en sous-domaine)
    if PAGES[page].get('full'):
        pass   # page complète : rien à insérer
    elif PAGES[page].get('keep_first'):
        h = sub(r'(</header><section[ >].*?</section>)', lambda m: m.group(1) + content, h)
    else:
        h = sub(r'</header>', lambda m: '</header>' + content, h)
    # boutons toujours pleins (décision de Romain) : les variantes à contour passent en violet plein, du hero au footer (navbar et footer exclus)
    PURPLE = 'data-wf--button--variant="purple" class="button w-variant-58c08a06-063e-0511-57f6-d9ffdefdef79 w-button"'
    def solid(m):
        return re.sub(r'data-wf--button--variant="(?:transparent|transparent-on-white|purple-transparent)"((?:\s+(?!class=)[\w-]+="[^"]*")*)\s+class="button [^"]*"',
                      lambda b: PURPLE.replace(' class=', b.group(1) + ' class='), m.group(0))
    h = re.sub(r'<header[ >].*?(?=<section data-bg="purple-gradient" class="section_footer)', solid, h, count=1, flags=re.S)  # du hero au footer
    # titres (h1, h2) sans point final, y compris avant un <br> ou une balise fermante
    h = re.sub(r'<h[12]\b[^>]*>.*?</h[12]>', lambda m: re.sub(r'\.(\s*(?:<br\s*/?>|</span>|</h[12]>))', r'\1', m.group(0)), h, flags=re.S)
    h = h.replace('<title>', '<title>PROTO · ', 1)
    h = sub(r'</head>', '<link rel="stylesheet" href="../_kit/kit.css">\n' + PAGES[page].get('head', '') + '\n</head>', h)
    h = sub(r'</body>', BAR.replace('{name}', page.capitalize()) + '<script type="module" src="../_kit/kit.js"></script>\n</body>', h)
    out = os.path.join(ROOT, page, f'phasev-{page}.html')
    open(out, 'w', encoding='utf-8').write(h)
    print('ok', page, len(h))

if __name__ == '__main__':
    args = [a for a in sys.argv[1:] if not a.startswith('--')]
    for p in (args or [k for k in PAGES if not PAGES[k].get('archived')]):
        build(p, '--refresh' in sys.argv)
