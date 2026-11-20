"""Logos des posts « Publications & Media » (Resources) en blanc sur transparent.

Usage (depuis n'importe où) :
    python logos/build_white_logos.py              # télécharge puis traite
    python logos/build_white_logos.py --no-download  # retraite ./logos/source/ sans retélécharger

Source des images :
  - WEBFLOW_API_TOKEN défini : API Webflow v2 (site, collection, champs image et catégorie découverts, slugs réels) ;
    WEBFLOW_SITE_ID optionnel pour forcer le site ;
  - sinon : scraping de la page Resources filtrée (pagination comprise), slug déduit du titre du post.

Sorties (toutes dans le dossier du script) :
  source/<slug>.<ext>   images d'origine         source/index.json   post, lien, URL de l'image
  white/<slug>.png      logos blancs normalisés  report.md           écartés et remarques
  preview.html          planche de validation sur fond violet

Rien n'est envoyé à Webflow : lecture seule.

État au 2026-11-20 : les logos blancs sont en ligne dans le CMS (Main Image des 55 posts). source/ garde les originaux,
ne pas le retélécharger (le script s'y refuse sans --force-download). cms-backup.json : anciennes images, pour revenir en arrière.
Nouveau post Publications & Media : poser sa source dans missing/ et une ligne dans missing/map.json, relancer, uploader le PNG de white/.
"""
import argparse
import hashlib
import html
import json
import os
import re
import sys
import unicodedata
import urllib.parse
import urllib.request
from datetime import date
from pathlib import Path

import numpy as np
from PIL import Image

HERE = Path(__file__).resolve().parent
SRC = HERE / 'source'
OUT = HERE / 'white'
MISSING = HERE / 'missing'  # sources de remplacement fournies à la main, reliées aux posts par missing/map.json

PAGE_URL = 'https://phasev-2026.webflow.io/resources?category_equal=Publications+%26+Media'
SITE_HINT = 'phasev-2026'
CATEGORY = 'Publications & Media'
UA = {'User-Agent': 'Mozilla/5.0 (logo-export script)'}

# Réglages du traitement
WHITE_THR = 245      # L au-dessus : transparent
BG_MIN = 230         # fond médian sous ce seuil : fond non blanc, écarté
MIN_CONTRAST = 60    # écart seuil / encre la plus sombre sous ce seuil : clair sur clair, écarté
ALPHA_FLOOR = 8      # alpha résiduel (bruit JPEG) mis à 0
CARTOUCHE = 0.75     # part d'encre dans la boîte du logo au-delà : logo dans un cartouche, écarté
LIGHT_PART = 0.08    # part du tracé presque blanc au-delà : signalé (partie quasi invisible)
MAX_W, MAX_H, PAD = 480, 120, 8
IMG_EXT = ('.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg', '.avif')


# ---------------------------------------------------------------- récupération

def http_get(url, headers=None):
    req = urllib.request.Request(url, headers={**UA, **(headers or {})})
    with urllib.request.urlopen(req, timeout=60) as r:
        return r.read()


def slugify(text):
    """Approximation du slug Webflow à partir du titre (mode scraping seulement)."""
    t = unicodedata.normalize('NFKD', text)
    t = ''.join(c for c in t if not unicodedata.combining(c))
    t = re.sub(r"['’]", '', t.lower())
    return re.sub(r'[^a-z0-9]+', '-', t).strip('-')[:200] or 'post'


def from_api(token):
    api = 'https://api.webflow.com/v2'
    auth = {'Authorization': f'Bearer {token}', 'accept': 'application/json'}
    get = lambda path: json.loads(http_get(api + path, auth))

    sites = get('/sites')['sites']
    site_id = os.environ.get('WEBFLOW_SITE_ID')
    if not site_id:
        match = [s for s in sites if SITE_HINT in (s.get('shortName') or '')] or sites
        site_id = match[0]['id']
    cols = get(f'/sites/{site_id}/collections')['collections']
    col = next(c for c in cols if c.get('slug') == 'resources'
               or ('resource' in c['displayName'].lower() and 'categor' not in c['displayName'].lower()))
    fields = get(f"/collections/{col['id']}")['fields']

    imgs = [f for f in fields if f['type'] == 'Image']
    img_field = next((f for f in imgs if 'image' in f['slug']), imgs[0] if imgs else None)
    cats = [f for f in fields if f['type'] in ('Reference', 'Option') and 'categor' in (f['slug'] + f['displayName']).lower()]
    cat_field = next((f for f in cats if 'primary' in f['slug']), cats[0] if cats else None)
    link_field = next((f for f in fields if f['type'] == 'Link'), None)
    if not img_field or not cat_field:
        sys.exit('API : champ image ou catégorie introuvable dans la collection Resources.')
    print(f"API : collection « {col['displayName']} », image = {img_field['slug']}, catégorie = {cat_field['slug']}")

    if cat_field['type'] == 'Option':
        cat_id = next(o['id'] for o in cat_field['validations']['options'] if o['name'] == CATEGORY)
    else:
        ref = cat_field['validations']['collectionId']
        cat_id = next(i['id'] for i in get(f'/collections/{ref}/items?limit=100')['items'] if i['fieldData']['name'] == CATEGORY)

    posts, offset = [], 0
    while True:
        page = get(f"/collections/{col['id']}/items?limit=100&offset={offset}")
        for it in page['items']:
            fd = it['fieldData']
            if it.get('isArchived') or it.get('isDraft') or fd.get(cat_field['slug']) != cat_id:
                continue
            img = fd.get(img_field['slug']) or {}
            posts.append({'slug': fd['slug'], 'name': fd.get('name', ''), 'image': img.get('url'),
                          'link': fd.get(link_field['slug']) if link_field else None})
        offset += 100
        if offset >= page['pagination']['total']:
            break
    return posts, 'API Webflow v2 (slugs réels)'


def from_scrape():
    posts, url, seen = [], PAGE_URL, set()
    while url and url not in seen:
        seen.add(url)
        s = http_get(url).decode('utf-8', 'replace')
        for it in s.split('role="listitem"')[1:]:
            cat = re.search(r'fs-list-field="category"[^>]*>([^<]*)<', it)
            if not cat or html.unescape(cat.group(1)).strip() != CATEGORY:
                continue
            name = html.unescape(re.search(r'<h3[^>]*>(.*?)</h3>', it, re.S).group(1)).strip()
            href = html.unescape(re.search(r'href="([^"]*)"', it).group(1))
            src = re.search(r'<img[^>]*?src="([^"]+)"', it)
            m = re.match(r'/resources/([^/?#]+)', href)
            posts.append({'slug': m.group(1) if m else slugify(name), 'name': name,
                          'image': html.unescape(src.group(1)) if src else None, 'link': href})
        nxt = re.search(r'<a[^>]*href="([^"]+)"[^>]*class="[^"]*w-pagination-next', s) \
            or re.search(r'<a[^>]*class="[^"]*w-pagination-next[^"]*"[^>]*href="([^"]+)"', s)
        url = urllib.parse.urljoin(url, html.unescape(nxt.group(1))) if nxt else None
    return posts, 'scraping de la page Resources (slugs déduits des titres)'


def download():
    token = os.environ.get('WEBFLOW_API_TOKEN')
    posts, mode = from_api(token) if token else from_scrape()
    SRC.mkdir(parents=True, exist_ok=True)
    used = {}
    for p in posts:
        base = p['slug']
        used[base] = used.get(base, 0) + 1
        if used[base] > 1:
            p['slug'] = f'{base}-{used[base]}'
        if not p['image']:
            p['file'] = None
            continue
        ext = Path(urllib.parse.urlparse(p['image']).path).suffix.lower()
        ext = ext if ext in IMG_EXT else '.png'
        dest = SRC / f"{p['slug']}{ext}"
        for old in SRC.glob(f"{p['slug']}.*"):
            if old != dest:
                old.unlink()
        dest.write_bytes(http_get(p['image']))
        p['file'] = dest.name
    keep = {p['file'] for p in posts if p.get('file')}
    for old in SRC.iterdir():
        if old.suffix.lower() in IMG_EXT and old.name not in keep:
            old.unlink()  # post retiré ou renommé depuis le dernier passage
    (SRC / 'index.json').write_text(json.dumps({'mode': mode, 'posts': posts}, ensure_ascii=False, indent=2), encoding='utf-8')
    print(f'{len(posts)} posts « {CATEGORY} » ({mode}), images dans {SRC}')
    return posts, mode


def load_index():
    f = SRC / 'index.json'
    if not f.exists():
        sys.exit('Pas de source/index.json : lancer sans --no-download.')
    d = json.loads(f.read_text(encoding='utf-8'))
    return d['posts'], d['mode']


# ---------------------------------------------------------------- traitement

def whiten(path, allow_invert=False):
    """Retourne (image RGBA | None, raison d'écart | None, remarques).
    allow_invert : un logo clair sur fond sombre uni est inversé au lieu d'être écarté (sources de missing/)."""
    notes = []
    if path.suffix.lower() == '.svg':
        return None, 'SVG : format vectoriel non géré par le script, à traiter à la main', notes
    im = Image.open(path)
    im.load()
    rgba = np.asarray(im.convert('RGBA')).astype(np.float32)
    a_src = rgba[..., 3] / 255.0
    lum = np.array([0.299, 0.587, 0.114], dtype=np.float32)

    if a_src.min() < 0.98:  # source avec transparence
        a_max = float(a_src.max())
        if a_max < 0.02:
            return None, 'image entièrement transparente', notes
        if a_max < 0.95:
            notes.append(f'source à {a_max:.0%} d\'opacité, ramenée à 100 %')
            a_src = a_src / a_max
        l_op = float(np.median((rgba[..., :3] @ lum)[a_src > 0.5]))
        if l_op > 200:
            notes.append(f'source déjà claire sur transparent (L médian {l_op:.0f}) : alpha d\'origine repris')
            return finish(a_src * 255.0, notes)
        notes.append('source avec transparence, posée sur blanc avant conversion')

    # niveaux de gris de l'image posée sur blanc
    comp = rgba[..., :3] * a_src[..., None] + 255.0 * (1 - a_src[..., None])
    L = comp @ lum

    # fond : bord de l'image
    h, w = L.shape
    b = max(2, round(min(h, w) * 0.02))
    ring = np.concatenate([L[:b].ravel(), L[-b:].ravel(), L[:, :b].ravel(), L[:, -b:].ravel()])
    bg = float(np.median(ring))
    if bg < BG_MIN and allow_invert and float(np.percentile(L, 99.5)) > bg + MIN_CONTRAST:
        # logo clair sur fond sombre : le fond devient blanc, le logo sombre, puis traitement normal
        notes.append(f'fond sombre (L {bg:.0f}) inversé')
        L = 255.0 - np.clip((L - bg) / (255.0 - bg), 0, 1) * 255.0
        comp = np.repeat(L[..., None], 3, -1)
        ring = np.concatenate([L[:b].ravel(), L[-b:].ravel(), L[:, :b].ravel(), L[:, -b:].ravel()])
        bg = float(np.median(ring))
    if bg < BG_MIN:
        return None, f'fond non blanc (L médian du bord {bg:.0f} / 255)', notes
    # seuil du blanc : 245, abaissé sous le bruit du fond (compression, blanc cassé)
    thr = min(WHITE_THR, float(np.percentile(ring, 5)) - 2)
    if thr < WHITE_THR - 20:
        thr = WHITE_THR - 20
    if thr < WHITE_THR - 1:
        notes.append(f'fond blanc cassé ou bruité (L {bg:.0f}) : seuil du blanc abaissé à {thr:.0f}')

    ink = L < thr
    if ink.mean() < 0.0005:
        return None, 'aucun tracé détecté sous le seuil de blanc (clair sur clair ou image vide)', notes
    # logo posé dans un cartouche : le fond de la boîte englobante est lui-même de l'encre
    ys, xs = np.nonzero(ink)
    fill = float(ink[ys.min():ys.max() + 1, xs.min():xs.max() + 1].mean())
    if fill > CARTOUCHE:
        return None, f'logo dans un cartouche de couleur ({fill:.0%} de sa boîte est du fond non blanc) : le blanc donnerait un rectangle plein', notes

    # tons du logo mesurés à l'intérieur des formes (hors bords anti-aliasés)
    solid_mask = L < thr - 25
    interior = morph(solid_mask, 1, np.logical_and)
    # partie très claire (au-delà de l'anti-aliasing d'un tracé sombre) : elle sortira quasi invisible
    light = ink & ~solid_mask & ~morph(L < thr - 35, 2, np.logical_or)
    light_share = light.sum() / max(1, ink.sum())
    if light_share > LIGHT_PART:
        notes.append(f'partie très claire dans la source ({light_share:.0%} du tracé, presque blanc sur blanc) : elle sort quasi invisible, logo officiel en blanc à demander')
    tones = L[interior] if interior.sum() >= 50 else L[ink]
    dark = float(np.percentile(tones, 2))
    if thr - dark < MIN_CONTRAST:
        return None, f'clair sur clair : encre la plus sombre L {dark:.0f} pour un fond à {bg:.0f}', notes
    # chaque ton du logo devient blanc plein ; seule la rampe vers le fond garde l'anti-aliasing
    solid = min(float(np.percentile(tones, 95)), thr - 40)
    if solid - dark > 60:
        notes.append(f'plusieurs tons (L {dark:.0f} à {solid:.0f}) ramenés au même blanc plein')
    alpha = np.clip((thr - L) / (thr - solid), 0, 1)
    sat = comp.max(-1) - comp.min(-1)
    if float(np.median(sat[interior] if interior.any() else sat[ink])) > 60:
        notes.append('logo en couleur, ramené au blanc')
    return finish(alpha * 255.0, notes)


def morph(mask, r, op):
    """Érosion (op = logical_and) ou dilatation (op = logical_or) d'un masque, voisinage carré de rayon r."""
    h, w = mask.shape
    p = np.pad(mask, r, constant_values=op is np.logical_and)
    out = mask.copy()
    for dy in range(-r, r + 1):
        for dx in range(-r, r + 1):
            out = op(out, p[r + dy:h + r + dy, r + dx:w + r + dx])
    return out


def finish(alpha, notes):
    a = np.where(alpha < ALPHA_FLOOR, 0, alpha).round().astype(np.uint8)
    mask = Image.fromarray(a, 'L')
    box = mask.point(lambda v: 255 if v > ALPHA_FLOOR else 0).getbbox()
    if not box:
        return None, 'rien à garder après rognage', notes
    mask = mask.crop(box)
    w, h = mask.size
    scale = min((MAX_W - 2 * PAD) / w, (MAX_H - 2 * PAD) / h)
    if scale > 1.5:
        notes.append(f'source petite ({w}×{h} px une fois rognée) : agrandie ×{scale:.1f}, netteté à vérifier')
    nw, nh = max(1, round(w * scale)), max(1, round(h * scale))
    mask = mask.resize((nw, nh), Image.LANCZOS)
    alpha_full = Image.new('L', (nw + 2 * PAD, nh + 2 * PAD), 0)
    alpha_full.paste(mask, (PAD, PAD))
    white = Image.new('L', alpha_full.size, 255)
    return Image.merge('RGBA', (white, white, white, alpha_full)), None, notes


# ---------------------------------------------------------------- sorties

def write_outputs(posts, mode):
    OUT.mkdir(parents=True, exist_ok=True)
    for old in OUT.glob('*.png'):
        old.unlink()
    overrides = {}
    if (MISSING / 'map.json').exists():
        m = json.loads((MISSING / 'map.json').read_text(encoding='utf-8'))
        # valeur : un slug, ou une liste de slugs quand plusieurs posts partagent le logo
        overrides = {slug: MISSING / f for f, v in m.items() if not f.startswith('_') and (MISSING / f).exists()
                     for slug in (v if isinstance(v, list) else [v])}
    done, skipped, remarks, groups = [], [], [], {}
    for p in posts:
        p['src'] = None
        if p['slug'] in overrides:
            p['src'] = f"missing/{overrides[p['slug']].name}"
            img, reason, notes = whiten(overrides[p['slug']], allow_invert=True)
            notes = [f"source remplacée par {p['src']}"] + notes
        elif not p.get('file'):
            skipped.append((p, 'pas d\'image dans le CMS'))
            continue
        else:
            p['src'] = f"source/{p['file']}"
            img, reason, notes = whiten(SRC / p['file'])
        if img is None:
            skipped.append((p, reason))
            continue
        out = OUT / f"{p['slug']}.png"
        img.save(out, optimize=True)
        p['white'] = out.name
        done.append(p)
        if notes:
            remarks.append((p, notes))
        key = hashlib.sha1(img.tobytes() + str(img.size).encode()).hexdigest()
        groups.setdefault(key, []).append(p)

    # report.md
    r = [f'# Logos Publications & Media : rapport', '',
         f'{date.today().isoformat()} · source : {mode}', '',
         f'- Posts : {len(posts)}',
         f'- Traités : {len(done)} fichiers, {len(groups)} logos distincts (plusieurs posts partagent le même logo)',
         f'- Écartés : {len(skipped)}', '']
    if mode.startswith('scraping'):
        r += ['> Slugs déduits des titres (pas de WEBFLOW_API_TOKEN) : quelques-uns peuvent différer du CMS '
              '(doubles tirets, suffixe -2 ajouté par Webflow). `source/index.json` donne le titre et le lien de chaque fichier.', '']
    r += ['## Écartés (non traités)', '']
    r += ['| Fichier | Post | Raison |', '|---|---|---|'] + \
         [f"| `{p.get('file') or '-'}` | {p['name']} | {why} |" for p, why in skipped] if skipped else ['Aucun.']
    r += ['', '## Traités avec remarque (à regarder dans la preview)', '']
    r += ['| Fichier | Remarques |', '|---|---|'] + \
         [f"| `{p['white']}` | {' ; '.join(n)} |" for p, n in remarks] if remarks else ['Aucune.']
    r += ['', '## Logos partagés', '']
    shared = [g for g in groups.values() if len(g) > 1]
    r += [f"- {len(g)} posts : " + ', '.join(f"`{p['white']}`" for p in g) for g in shared] or ['Aucun.']
    (HERE / 'report.md').write_text('\n'.join(r) + '\n', encoding='utf-8')

    # preview.html
    rem = {p['slug']: n for p, n in remarks}
    cards = []
    for g in sorted(groups.values(), key=lambda g: g[0]['white']):
        first = g[0]
        names = ''.join(f'<li>{html.escape(p["white"])}</li>' for p in g)
        flag = ''.join(f'<p class="note">{html.escape(n)}</p>' for p in g for n in rem.get(p['slug'], [])[:1])
        cards.append(
            f'<figure class="card"><div class="logo"><img src="white/{urllib.parse.quote(first["white"])}" alt=""></div>'
            f'<div class="src"><img src="{urllib.parse.quote(first["src"])}" alt=""></div>'
            f'<figcaption><ul>{names}</ul>{flag}</figcaption></figure>')
    skip_cards = [
        f'<figure class="card skip"><div class="src on"><img src="{urllib.parse.quote(p["src"])}" alt=""></div>'
        f'<figcaption><ul><li>{html.escape(p["src"])}</li></ul><p class="note">{html.escape(why)}</p></figcaption></figure>'
        for p, why in skipped if p.get('src')]
    page = PREVIEW.format(n=len(done), u=len(groups), s=len(skipped), cards='\n'.join(cards),
                          skips='\n'.join(skip_cards) or '<p class="empty">Aucun logo écarté.</p>')
    (HERE / 'preview.html').write_text(page, encoding='utf-8')
    return done, skipped, groups


PREVIEW = """<!doctype html>
<html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Logos blancs</title>
<style>
:root{{--bg:#1E1846;--ink:#f8f8f8;--muted:rgba(248,248,248,.6);--line:rgba(248,248,248,.12)}}
*{{box-sizing:border-box}}
body{{margin:0;min-height:100vh;color:var(--ink);font:14px/1.45 system-ui,sans-serif;
  background:radial-gradient(60% 50% at 15% 0%,#3a2f86 0%,transparent 70%),radial-gradient(50% 50% at 100% 100%,#2c2370 0%,transparent 70%),var(--bg);background-attachment:fixed}}
header{{padding:32px 16px 8px;max-width:1280px;margin:0 auto}}
h1{{font-weight:300;font-size:28px;margin:0 0 4px}} h2{{font-weight:300;font-size:20px;margin:40px 0 12px}}
.meta{{color:var(--muted);margin:0 0 16px}}
label{{display:inline-flex;gap:8px;align-items:center;cursor:pointer;color:var(--muted)}}
main{{max-width:1280px;margin:0 auto;padding:0 16px 64px}}
.grid{{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:16px}}
.card{{margin:0;border:1px solid var(--line);border-radius:12px;padding:16px;display:flex;flex-direction:column;gap:12px;min-width:0}}
.logo{{min-height:136px;display:grid;place-items:center}}
.logo img{{max-width:100%;height:auto}}
.src{{display:none;background:#fff;border-radius:8px;padding:8px;place-items:center}}
.src img{{max-width:100%;max-height:120px}}
body.compare .src,.src.on{{display:grid}}
figcaption ul{{list-style:none;margin:0;padding:0;font:12px/1.5 ui-monospace,Consolas,monospace;color:var(--muted);overflow-wrap:anywhere}}
figcaption li:first-child{{color:var(--ink)}}
.note{{margin:6px 0 0;font-size:12px;color:#E2C70A}}
.empty{{color:var(--muted)}}
</style></head>
<body>
<header><h1>Logos Publications &amp; Media en blanc</h1>
<p class="meta">{n} fichiers traités, {u} logos distincts, {s} écartés. Un logo partagé par plusieurs posts n'apparaît qu'une fois, avec tous ses fichiers.</p>
<label><input type="checkbox" onchange="document.body.classList.toggle('compare',this.checked)"> Comparer avec la source</label></header>
<main><div class="grid">
{cards}
</div>
<h2>Écartés (voir report.md)</h2><div class="grid">
{skips}
</div></main>
</body></html>
"""


def main():
    sys.stdout.reconfigure(encoding='utf-8')  # console Windows en gbk / cp1252
    ap =argparse.ArgumentParser(description=__doc__.split('\n')[0])
    ap.add_argument('--no-download', action='store_true', help='retraite les images déjà dans source/')
    ap.add_argument('--force-download', action='store_true', help='retélécharge même si source/ existe déjà')
    args = ap.parse_args()
    # depuis le 2026-11-20, le CMS porte les logos blancs : retélécharger écraserait les originaux de source/
    if (SRC / 'index.json').exists() and not args.force_download and not args.no_download:
        print('source/ existe déjà : retraitement sans téléchargement (--force-download pour retélécharger).')
        args.no_download = True
    posts, mode = load_index() if args.no_download else download()
    done, skipped, groups = write_outputs(posts, mode)
    print(f'Traités : {len(done)} ({len(groups)} logos distincts) · écartés : {len(skipped)}')
    for p, why in skipped:
        print(f"  écarté  {p.get('file') or p['slug']} : {why}")
    print(f'Preview : {HERE / "preview.html"}')


if __name__ == '__main__':
    main()
