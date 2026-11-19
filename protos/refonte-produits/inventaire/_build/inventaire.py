"""Inventaire des blocs et des petits éléments du site, pour la repasse d'homogénéisation.
   python protos/refonte-produits/inventaire/_build/inventaire.py            (cache .cache/ réutilisé)
   python protos/refonte-produits/inventaire/_build/inventaire.py --refresh  (retélécharge le staging)

   Produit dans inventaire/ :
   - site-<page>.html  copie locale d'une page staging (scripts de la page chargés depuis Vite, comme ?dev)
   - proto-<page>.html copie d'un proto de la refonte (lancer d'abord _build/build.py de refonte-produits)
   - blocs.json        un bloc = une section (ou le hero) de premier niveau, avec famille, classes, fond
   - elements.html     page des petits éléments, avec le CSS du site
   Chaque copie charge inv.js : ?block=N n'affiche que le bloc N, ?atoms relève les petits éléments rendus."""
import re, os, sys, json, html as H, urllib.request
D = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.dirname(D)
REF = os.path.dirname(OUT)                      # protos/refonte-produits
STAGING = 'https://phasev-2026.webflow.io'

SITE = [  # (clé, libellé, chemin staging, code)
  ('home', 'Home', '/', 'HOM'),
  ('company', 'About', '/company', 'ABO'),
  ('case-studies', 'Case Studies', '/case-studies', 'CSL'),
  ('case-study', 'Fiche case study', '/case-studies/denali-dose-selection-trial-optimizer', 'CSD'),
  ('resources', 'Resources', '/resources', 'RES'),
  ('article', 'Article', '/resources/we-simulated-60-million-trials-heres-what-we-found', 'ART'),
]
PROTOS = [  # (clé, libellé, code)
  ('trial', 'Trial (proto)', 'TRI'), ('response', 'Response (proto)', 'RSP'), ('clinops', 'ClinOps (proto)', 'CLI'),
  ('portfolio', 'Portfolio (proto)', 'POR'), ('conductor', 'AI Conductor (proto)', 'CON'), ('bonv', 'BonV (proto)', 'BON'),
]

def fetch(path, refresh):
    f = os.path.join(D, '.cache', 'site-' + (path.strip('/').replace('/', '--') or 'home') + '.html')
    if refresh or not os.path.exists(f):
        os.makedirs(os.path.dirname(f), exist_ok=True)
        with urllib.request.urlopen(STAGING + path) as r, open(f, 'wb') as o: o.write(r.read())
    return open(f, encoding='utf-8').read()

def clean_site(h):
    # même nettoyage que le build des protos : scripts tiers retirés, liens vers le staging, scripts de page depuis Vite
    h = re.sub(r'<script[^>]*hs-script-loader.*?</script>', '', h, flags=re.S)
    h = re.sub(r'<script async="" src="/v2645[^"]*"[^>]*></script>', '', h)
    h = re.sub(r'<script>\s*if \(window\.location\.hostname\.includes\(\'webflow\.io\'\)\).*?</script>', '', h, flags=re.S)
    h = re.sub(r'<script[^>]*googletagmanager[^>]*></script>', '', h)
    h = re.sub(r'href="/(?!/)', 'href="' + STAGING + '/', h)
    return h.replace("location.search.includes('dev')", 'true')

# le hero de la fiche case study est un div (data-cs-hero) : compté comme un bloc, il se termine au bloc suivant
TAG = re.compile(r'<(/?)(section|header)\b([^>]*)>|<(div)\b([^>]*\bdata-cs-hero\b[^>]*)>', re.I)

def mark_blocks(h):
    """Numérote les header/section de premier niveau (hors footer) : data-inv-block="N". Renvoie le html et les blocs."""
    out, blocks, depth, last, cur = [], [], 0, 0, None
    for m in TAG.finditer(h):
        if m.group(4):   # div hero : bloc de premier niveau, sans profondeur suivie
            if depth == 0:
                n = len(blocks)
                blocks.append(dict(n=n, tag='header', start=m.start(), attrs=m.group(5), hidden=False))
                out.append(h[last:m.start()] + f'<div data-inv-block="{n}"' + m.group(5) + '>')
                last = m.end()
            continue
        closing, name, attrs = m.group(1), m.group(2).lower(), m.group(3)
        if not closing:
            if depth == 0 and 'section_footer' not in attrs:
                n = len(blocks)
                hidden = bool(re.search(r'class="[^"]*\bhide\b', attrs) or 'display:none' in attrs.replace(' ', ''))
                cur = dict(n=n, tag=name, start=m.start(), attrs=attrs, hidden=hidden)
                blocks.append(cur)
                out.append(h[last:m.start()] + f'<{name} data-inv-block="{n}"' + (' data-inv-hidden' if hidden else '') + attrs + '>')
                last = m.end()
            depth += 1
        else:
            depth -= 1
            if depth == 0 and cur is not None:
                cur['html'] = h[cur['start']:m.end()]
                cur = None
    out.append(h[last:])
    for i, b in enumerate(blocks):
        if 'html' not in b: b['html'] = h[b['start']:blocks[i + 1]['start'] if i + 1 < len(blocks) else len(h)]
    return ''.join(out), blocks

def text(s):
    return re.sub(r'\s+', ' ', H.unescape(re.sub(r'<[^>]+>', ' ', s))).strip()

# classes de mise en forme : ignorées pour décrire la structure d'un bloc
UTIL = re.compile(r'^(w-|text-|heading-style|padding-|container-|margin-|max-width|is-|hide|gap-|align-|show-|mobile-|section_layout$|section_header$|div-block|swiper-slide$|swiper-wrapper$|full$|_2col$)')

def comps(s):
    seen = {}
    for c in re.findall(r'class="([^"]*)"', s):
        for t in c.split():
            if not UTIL.match(t): seen[t] = seen.get(t, 0) + 1
    for a in re.findall(r'data-(pv|rp|ss|wf|kit)="([^"]*)"', s):
        if a[0] != 'wf' or a[1] in ('A', 'C'): seen[f'[{a[0]}={a[1]}]'] = 1
    return sorted(seen, key=lambda k: -seen[k])

FAMILIES = [  # (famille, motif cherché dans les classes et attributs du bloc) : la première qui correspond
  ('Heros', None),
  ('FAQ', r'\[pv=faq\]|faq'),
  ('Plateforme connectée', r'platform-connect'),
  ('Étapes avec média', r'\[wf=A\]|\[wf=C\]|feature-grid'),
  ('Onglets', r'\[pv=tabs\]|evidence-tabs|platform-tabs|tab_pane|tabs_menu'),
  ('Sliders', r'^swiper$|swiper-div|slider-top'),
  ('Listes et fiches CMS', r'resource-list|featured-slider|featured-card|filter_form'),
  ('Chiffres', r'glance-|rp-stats|rp-stat$'),
  ('Cas et preuves', r'rp-feature|rp-pair|rp-case|rp-trio|proof-|\[ss=|ev-case|\[pv=clinops-proof\]|\[rp=evidence\]'),
  ('Schémas', r'rp-compare'),
  ('Bandeaux CTA', r'^grid-2$'),
  ('Cartes', r'why-card|difference-card|methodology-card|\[rp=tracks\]|\[rp=steps\]|leadership|dm-panel'),
  ('Logos', r'backed-by|logo'),
  ('Texte long', r'post-rtf|w-richtext'),
]
ORDER = [f for f, _ in FAMILIES] + ['Autres']
ORDER.insert(ORDER.index('Bandeaux CTA'), ORDER.pop(ORDER.index('Cartes')))  # cartes avant bandeaux à l'affichage

def family(b, cs):
    if b['tag'] == 'header': return 'Heros'
    for f, pat in FAMILIES[1:]:
        if any(re.search(pat, c) for c in cs): return f
    return 'Autres'

# Témoins en trois parties :
#   'same'  composant existant : blocs strictement identiques, seuls le contenu et le fond changent
#   'merge' fusion possible : blocs différents qui pourraient devenir un seul composant, avec la raison
#   'unique' (calculé) : tout le reste
# item : motif de l'élément répété, pour compter les cartes, étapes, questions…
GENERICS = [
  dict(id='HERO-PRODUIT', type='same', name='Hero produit', family='Heros',
       ids=['TRI-01', 'RSP-01', 'CLI-01', 'POR-01', 'CON-01', 'BON-01'], item=None,
       props='titre sur 2 lignes (la seconde en jaune), texte, boutons ; animation propre à chaque page',
       why='Même socle (hero-stage) sur les 6 pages produit ; seule l’animation change.'),
  dict(id='FAQ', type='same', name='FAQ en accordéon', family='FAQ', ids=['TRI-05', 'RSP-08', 'CLI-07', 'POR-08', 'CON-09'],
       item=r'<details|faq-item', props='label, titre, questions / réponses ; fond'),
  dict(id='PLATEFORME', type='same', name='Plateforme connectée', family='Plateforme connectée',
       ids=['TRI-04', 'RSP-09', 'CLI-06', 'POR-07', 'CON-07'], item=None, props='label, titre, texte, produit courant ; fond'),
  dict(id='ETAPES-MEDIA', type='same', name='Étapes avec média', family='Étapes avec média',
       ids=['TRI-02', 'CLI-03', 'CON-06', 'BON-05'], item=r'class="padding-global is-feature',
       props='en-tête ; par étape : label, titre, texte, puces, vidéo ou image ; fond'),
  dict(id='ONGLETS', type='same', name='Onglets avec visuel', family='Onglets', ids=['RSP-02', 'POR-03'], item=r'data-tab=',
       props='en-tête ; par onglet : nom, question, texte, lignes, type de visuel ; fond'),
  dict(id='CARTES-ICONE', type='same', name='Cartes icône, titre, texte', family='Cartes', ids=['HOM-04', 'RSP-04', 'RSP-06', 'POR-02'],
       item=r'class="why-card', props='en-tête simple ou 2 colonnes ; cartes (icône, titre, texte) ; fond'),
  dict(id='CARTES-SOMBRES', type='same', name='Cartes méthodologie (fond sombre)', family='Cartes', ids=['CLI-04', 'CON-08', 'BON-08'],
       item=r'class="methodology-card', props='en-tête 2 colonnes ; cartes (icône, titre, texte facultatif) ; pastilles facultatives'),
  dict(id='FRISE', type='same', name='Étapes numérotées (frise)', family='Cartes', ids=['RSP-05', 'POR-05'], item=r'class="rp-step[ "]',
       props='en-tête ; étapes (numéro, titre, texte) ; fond'),
  dict(id='SCHEMA', type='same', name='Schéma avant / après', family='Schémas', ids=['CON-04', 'BON-04'], item=None,
       props='en-tête 2 colonnes ; colonne avant, pivot, colonne après, sortie facultative ; fond'),
  dict(id='CHIFFRES', type='same', name='Rangée de chiffres', family='Chiffres', ids=['CON-03', 'BON-03', 'BON-07'],
       item=r'class="rp-stat[ "]', props='en-tête 2 colonnes ; 1 à 4 chiffres (valeur, légende) ; source facultative ; fond'),
  dict(id='EVIDENCE', type='same', name='Evidence : cas mis en avant et cas côte à côte', family='Cas et preuves', ids=['RSP-07', 'POR-06'],
       item=r'class="rp-case[ "]', props='en-tête ; cas mis en avant ; cas côte à côte (labels, titre, texte, lien) ; fond'),
  dict(id='HERO-CMS', type='same', name='Hero de liste CMS', family='Heros', ids=['CSL-01', 'RES-01'], item=r'class="swiper-slide',
       props='slider de fiches mises en avant (catégorie, date, titre, image, bouton)'),
  dict(id='LISTE-CMS', type='same', name='Liste CMS en grille', family='Listes et fiches CMS', ids=['CSL-02', 'RES-02', 'CSD-06'],
       item=r'class="resource-item', props='filtres facultatifs ; cartes ressource ; fond'),

  dict(id='F-FAQ', type='merge', name='FAQ de la fiche case study → composant FAQ', family='FAQ', ids=['CSD-05', 'RSP-08'], item=None,
       props='', why='La fiche case study a sa propre FAQ, en rich text. La passer sur le composant FAQ donnerait le même accordéon partout.'),
  dict(id='F-CARTES-NUM', type='merge', name='Cartes numérotées', family='Cartes', ids=['CLI-02', 'RSP-03', 'POR-04'],
       item=r'class="difference-card|class="rp-card[ "]', props='en-tête ; cartes (numéro, titre, texte, puces facultatives) ; fond',
       why='Trois versions de « cartes numérotées avec titre et texte » ; Two tracks ajoute des puces. Un seul composant, puces facultatives.'),
  dict(id='F-CAS', type='merge', name='Cas mis en avant', family='Cas et preuves', ids=['TRI-03', 'BON-06', 'RSP-07'], item=None,
       props='labels, titre, texte, lignes, chiffre clé en carte violette, visuel ; fond',
       why='Même schéma : texte à gauche, chiffre clé dans une carte violette. La success story Trial en est une version enrichie (lignes, visuel animé).'),
  dict(id='F-SLIDER', type='merge', name='Sliders de cartes', family='Sliders', ids=['HOM-06', 'HOM-07', 'HOM-08', 'ABO-04', 'ABO-05'],
       item=r'class="swiper-slide', props='en-tête et flèches ; type de carte (cas, citation, article, personne) ; fond',
       why='Même coque (en-tête slider-top, swiper, flèches) ; seule la carte change. Un composant Slider, la carte en variante.'),
  dict(id='F-BANDEAU', type='merge', name='Bandeau texte, bouton et visuel', family='Bandeaux CTA', ids=['ABO-07', 'CON-02', 'BON-02'], item=None,
       props='label, titre, texte, bouton, visuel ; fond',
       why='Même mise en page : texte et bouton à gauche, visuel à droite. Un seul composant, fond clair ou sombre.'),
  dict(id='F-CHIFFRES', type='merge', name='Chiffres About → rangée de chiffres', family='Chiffres', ids=['ABO-03', 'CON-03'], item=None,
       props='', why='Deux façons d’afficher une rangée de chiffres : About avec icônes sur fond sombre, pages produit sans icône. Une seule suffirait-elle ?'),
]

def head_variant(h):
    if re.search(r'class="section-top[^"]*\b_2col\b', h): return 'en-tête 2 colonnes'
    if 'class="section-top' in h: return 'en-tête simple'
    return 'sans en-tête'

def components(blocks):
    by = {b['id']: b for b in blocks}
    out, used = [], set()
    for g in GENERICS:
        mem = [i for i in g['ids'] if i in by]
        if not mem: continue
        if g['type'] == 'same': used.update(mem)
        for i in mem:
            b = by[i]
            n = len(re.findall(g['item'], b['_html'])) if g['item'] else 0
            b.setdefault('variants', {})[g['id']] = ', '.join(x for x in (BGL.get(b['bg'], b['bg']), b['_head'], f'{n} élément' + ('s' if n > 1 else '') if n else '') if x)
        out.append(dict(id=g['id'], type=g['type'], name=g['name'], family=g['family'], props=g['props'], why=g.get('why', ''), members=mem))
    for b in blocks:   # blocs uniques : un témoin chacun (un bloc proposé en fusion reste aussi listé ici)
        b['variant'] = ', '.join(x for x in (BGL.get(b['bg'], b['bg']), b['_head']) if x)
        if b['id'] in used: continue
        out.append(dict(id=b['id'], type='unique', name=b['title'] or b['family'], family=b['family'], props='', why='', members=[b['id']]))
    return out

BGL = {'hero': 'hero', 'is-white': 'fond blanc', 'is-light': 'fond gris', 'is-lightpurple': 'fond lightpurple', 'is-gradient': 'fond sombre', 'is-grey': 'fond grey'}

def bg(b):
    if b['tag'] == 'header': return 'hero'
    m = re.search(r'class="[^"]*\b(is-white|is-light|is-lightpurple|is-gradient|is-grey|is-purple)\b', b['attrs'])
    return m.group(1) if m else '?'

def describe(b, page, label, code, kind, url):
    cs = comps(b['html'])
    lab = re.search(r'class="[^"]*text-size-label[^"]*"[^>]*>(.*?)</', b['html'], re.S)
    tit = re.search(r'<h[12][^>]*>(.*?)</h[12]>', b['html'], re.S) or lab or re.search(r'<h[34][^>]*>(.*?)</h[34]>', b['html'], re.S)
    return dict(id=f"{code}-{b['n'] + 1:02d}", page=page, pageLabel=label, kind=kind, n=b['n'],
                url=f"{url}?block={b['n']}", open=url, family=family(b, cs), bg=bg(b), hidden=b['hidden'],
                label=text(lab.group(1))[:60] if lab else '', title=text(tit.group(1))[:110] if tit else '',
                comps=cs, tag=b['tag'], _html=b['html'], _head=head_variant(b['html']) if b['tag'] != 'header' else '')

# Plan des pages : ce que devient chaque bloc, d'après decisions.md (choix de Romain du 2026-11-14).
# statut : garde (gardé tel quel ou composant gardé), fusion (devient un composant fusionné), masque, revoir
COMP_PLAN = {
  'HERO-PRODUIT': ('garde', 'Composant Hero produit'),
  'HERO-CMS': ('garde', 'Composant Hero CMS, variante slider'),
  'FAQ': ('garde', 'Composant FAQ'),
  'PLATEFORME': ('garde', 'Composant Plateforme connectée'),
  'ETAPES-MEDIA': ('garde', 'Composant Étapes avec média'),
  'LISTE-CMS': ('garde', 'Composant Liste CMS'),
  'ONGLETS': ('revoir', 'Composant Onglets avec visuel : à revoir'),
  'SCHEMA': ('revoir', 'Composant Schéma avant / après : à revoir'),
  'CARTES-ICONE': ('fusion', 'Devient le composant Cartes (base POR-04), repère icône'),
  'CARTES-SOMBRES': ('fusion', 'Devient le composant Cartes (base POR-04), repère icône, fond sombre'),
  'FRISE': ('fusion', 'Devient le composant Cartes (base POR-04), repère numéro, liaison en frise'),
  'CHIFFRES': ('fusion', 'Devient le composant Chiffres (base ABO-03), variante claire'),
  'EVIDENCE': ('fusion', 'Devient le composant Cas (cas mis en avant et cas côte à côte)'),
}
BLOCK_PLAN = {
  'HOM-01': ('garde', 'Hero Home, bloc unique'), 'ABO-01': ('garde', 'Hero About, bloc unique'),
  'ART-01': ('garde', 'Composant Hero CMS, variante fiche seule'), 'CSD-01': ('garde', 'Composant Hero CMS, variante fiche seule'),
  'HOM-02': ('garde', 'Bloc unique'), 'HOM-03': ('garde', 'Bloc unique (onglets plateforme)'), 'ABO-02': ('garde', 'Bloc unique'),
  'ART-02': ('garde', 'Texte long, bloc unique'), 'CSD-03': ('garde', 'Chapitres de la fiche, bloc unique'),
  'HOM-05': ('masque', 'Déjà masqué sur le site : viré'),
  'CSD-05': ('fusion', 'Passe sur le composant FAQ'),
  'CSD-04': ('fusion', 'Devient le composant Cartes, repère icône, fond sombre'),
  'POR-04': ('fusion', 'Base du composant Cartes (repère numéro, puces)'),
  'CLI-02': ('fusion', 'Devient le composant Cartes (base POR-04), repère numéro'),
  'RSP-03': ('fusion', 'Devient le composant Cartes (base POR-04), repère numéro, puces'),
  'ABO-03': ('fusion', 'Base du composant Chiffres (fond sombre)'),
  'CON-05': ('fusion', 'Chiffres → composant Chiffres ; cas → composant Cas'),
  'TRI-03': ('fusion', 'Success story à refaire sur le composant Cas'),
  'BON-06': ('fusion', 'Devient le composant Cas'),
  'ABO-07': ('fusion', 'Composant Bandeau texte, bouton, visuel (fond sombre)'),
  'CON-02': ('fusion', 'Bloc existant conservé ; composant Bandeau texte, bouton, visuel'),
  'BON-02': ('fusion', 'Bloc existant conservé (vidéo) ; composant Bandeau texte, bouton, visuel'),
  'HOM-06': ('fusion', 'Devient le composant Slider (carte en variante)'), 'HOM-07': ('fusion', 'Devient le composant Slider (carte en variante)'),
  'HOM-08': ('fusion', 'Devient le composant Slider (carte en variante)'), 'ABO-04': ('fusion', 'Devient le composant Slider (carte en variante)'),
  'ABO-05': ('fusion', 'Devient le composant Slider (carte en variante)'),
  'CLI-05': ('revoir', 'Preuve ClinOps : bloc unique ou composant Cas ? à revoir'),
  'ABO-06': ('revoir', 'Logos investisseurs : à revoir'),
  'CSD-02': ('revoir', 'At a glance de la fiche : à revoir'),
}

def plan(blocks, comps_out):
    same = {m: c['id'] for c in comps_out if c['type'] == 'same' for m in c['members']}
    for b in blocks:
        p = BLOCK_PLAN.get(b['id']) or COMP_PLAN.get(same.get(b['id'], '')) or ('revoir', 'Pas encore tranché')
        b['plan'] = list(p)

INJECT = '<script src="inv.js"></script>\n</body>'

def build_systeme(home, home_blocks, html_by_id):
    """Page du système de blocs (refonte-produits/systeme/phasev-systeme.html) : navbar, footer et scripts de la Home,
       contenu de systeme/content.html, où chaque marqueur BLOCK:ID reçoit le bloc réel (copie du site ou proto)."""
    sdir = os.path.join(REF, 'systeme')
    content = open(os.path.join(sdir, 'content.html'), encoding='utf-8').read()
    def blk(m):
        if m.group(1) not in html_by_id: raise SystemExit('bloc absent du système : ' + m.group(1))
        return html_by_id[m.group(1)]
    content = re.sub(r'<!--BLOCK:([A-Z]{3}-\d\d)-->', blk, content)
    h = home
    for b in reversed(home_blocks):   # sections de la Home retirées, navbar et footer gardés
        h = h[:b['start']] + h[b['start'] + len(b['html']):]
    foot = '<section data-bg="purple-gradient" class="section_footer'
    if foot not in h: raise SystemExit('footer introuvable dans la Home')
    h = h.replace(foot, content + foot, 1)
    h = re.sub(r'<title>[^<]*</title>', '<title>PROTO · Système de blocs</title>', h, count=1)
    h = h.replace('</head>', '<link rel="stylesheet" href="../_kit/kit.css">\n<link rel="stylesheet" href="systeme.css">\n</head>', 1)
    h = h.replace('</body>', '<script type="module" src="../_kit/kit.js"></script>\n</body>', 1)
    open(os.path.join(sdir, 'phasev-systeme.html'), 'w', encoding='utf-8').write(h)
    print('systeme', len(h))

def main(refresh):
    blocks, heads = [], None
    for key, label, path, code in SITE:
        h = clean_site(fetch(path, refresh))
        if key == 'home': home_raw = h
        h, bl = mark_blocks(h)
        if key == 'home': home_blocks = bl
        h = h.replace('<title>', '<title>COPIE · ', 1).replace('</body>', INJECT, 1)
        open(os.path.join(OUT, f'site-{key}.html'), 'w', encoding='utf-8').write(h)
        blocks += [describe(b, key, label, code, 'site', f'site-{key}.html') for b in bl]
        if key == 'home': heads = h
        print('site ', key, len(bl), 'blocs')
    for key, label, code in PROTOS:
        src = os.path.join(REF, key, f'phasev-{key}.html')
        if not os.path.exists(src): raise SystemExit('proto absent, lancer refonte-produits/_build/build.py : ' + src)
        h, bl = mark_blocks(open(src, encoding='utf-8').read())
        h = h.replace('</body>', INJECT, 1)
        open(os.path.join(OUT, f'proto-{key}.html'), 'w', encoding='utf-8').write(h)
        blocks += [describe(b, key, label, code, 'proto', f'proto-{key}.html') for b in bl]
        print('proto', key, len(bl), 'blocs')

    # blocs proches : mêmes classes de structure (indice de Jaccard), sur d'autres blocs
    for a in blocks:
        sa, sims = set(a['comps']), []
        for b in blocks:
            if b is a or not sa: continue
            sb = set(b['comps'])
            j = len(sa & sb) / len(sa | sb) if sb else 0
            if j >= .5: sims.append((j, b['id']))
        a['similar'] = [i for _, i in sorted(sims, reverse=True)[:4]]
    comps_out = components(blocks)
    plan(blocks, comps_out)
    build_systeme(home_raw, home_blocks, {b['id']: b['_html'] for b in blocks})
    for b in blocks:
        b['comps'] = b['comps'][:12]
        del b['_html'], b['_head']
    blocks.sort(key=lambda b: ORDER.index(b['family']))
    PART = {'same': 0, 'merge': 1, 'unique': 2}
    comps_out.sort(key=lambda c: (PART[c['type']], ORDER.index(c['family']), -len(c['members'])))
    json.dump(dict(families=ORDER, components=comps_out, pages=[dict(key=k, label=l, kind='site', file=f'site-{k}.html') for k, l, _, _ in SITE]
                   + [dict(key=k, label=l, kind='proto', file=f'proto-{k}.html') for k, l, _ in PROTOS], blocks=blocks),
              open(os.path.join(OUT, 'blocs.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)

    # page des éléments : feuilles de style du site (head + embed « global styles ») et du kit
    head = ''.join(re.findall(r'<link[^>]*rel="stylesheet"[^>]*>|<style[^>]*>.*?</style>', heads.split('</head>')[0], re.S))
    gs = re.search(r'<div class="global-styles[^"]*">(.*?)</div>', heads, re.S)
    if gs: head += ''.join(re.findall(r'<style[^>]*>.*?</style>', gs.group(1), re.S))
    tpl = open(os.path.join(D, 'elements.tpl.html'), encoding='utf-8').read()
    open(os.path.join(OUT, 'elements.html'), 'w', encoding='utf-8').write(tpl.replace('<!--SITE-HEAD-->', head))
    print('ok', len(blocks), 'blocs')

if __name__ == '__main__':
    main('--refresh' in sys.argv)
