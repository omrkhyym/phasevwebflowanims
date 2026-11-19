"""Génère protos/response/phasev-response-protos.html à partir de la page staging et des morceaux de ce dossier.
   python protos/response/_build/build.py
   La page staging est mise en cache dans .cache/ (non versionné) ; --refresh la retélécharge."""
import re, sys, os, urllib.request
D = os.path.dirname(os.path.abspath(__file__))
URL = 'https://phasev-2026.webflow.io/response-optimizer'
SITE = os.path.join(D, '.cache', 'live-response-optimizer.html')
args = [a for a in sys.argv[1:] if not a.startswith('--')]
OUT = args[0] if args else os.path.join(D, '..', 'phasev-response-protos.html')
if '--refresh' in sys.argv or not os.path.exists(SITE):
    os.makedirs(os.path.dirname(SITE), exist_ok=True)
    with urllib.request.urlopen(URL) as r, open(SITE, 'wb') as f: f.write(r.read())
h = open(SITE, encoding='utf-8').read()
main = open(os.path.join(D, 'main.html'), encoding='utf-8').read()
extra = open(os.path.join(D, 'extra.html'), encoding='utf-8').read()

def sub(pat, rep, s, count=1, flags=re.S):
    out, k = re.subn(pat, rep, s, count=count, flags=flags)
    if k == 0: raise SystemExit('pattern not found: ' + pat[:80])
    return out

# scripts tiers inutiles en local (HubSpot, analytics, widget de bot, Userback) ; tolérant s'ils manquent
h = re.sub(r'<script[^>]*hs-script-loader.*?</script>', '', h, flags=re.S)
h = re.sub(r'<script async="" src="/v2645[^"]*"[^>]*></script>', '', h)
h = re.sub(r'<script>\s*if \(window\.location\.hostname\.includes\(\'webflow\.io\'\)\).*?</script>', '', h, flags=re.S)
h = re.sub(r'<script[^>]*googletagmanager[^>]*></script>', '', h)

# liens internes vers le staging, pour que la navigation fonctionne depuis localhost
h = re.sub(r'href="/(?!/)', 'href="https://phasev-2026.webflow.io/', h)

# loaders : toujours le serveur Vite local (site.js et response.js)
h = h.replace("location.search.includes('dev')", 'true')

# hero : nouvelle copy (le paragraphe garde le mot manquant du document : « from to better », à signaler au client)
h = sub(r'<h1 class="text-size-display text-color-alternate">.*?</h1>',
        '<h1 class="text-size-display text-color-alternate" data-new>Clarify the treatment signal <br/><span class="text-color-yellow">Understand who benefits</span></h1>', h)
h = sub(r'(<div class="text-size-large)(">)Response Optimizer isolates.*?</div>',
        r'\1" data-new\2Response Optimizer combines prognostic modeling and heterogeneous treatment-effect analysis to strengthen clinical development decisions. It separates predictable outcome variation from to better assess the treatment benefit, so you can sharpen precision, identify who responds, and make a clearer go, redesign, or no-go decision. Use it before unblinding or after an ambiguous readout.</div>', h)
h = sub(r'(<div class="button-group gap-24"><a data-wf--button--variant="yellow" href="[^"]*" class="button w-button">Request a demo</a>)',
        r'\1<a data-wf--button--variant="transparent" href="https://phasev-2026.webflow.io/case-studies" class="button w-variant-a4343b71-de97-ab07-2e4d-8afb553ce387 w-button" data-new>Explore case studies</a>', h)

# contenu : nouveaux blocs entre le hero et le footer
h = sub(r'</header></main>', '</header>' + main + '</main>', h)

# bandeau CTA du footer : bouton « Contact us »
h = sub(r'(<div class="footer-band-actions"><a data-wf--button--variant="yellow") href="[^"]*" (class="button w-button")>[^<]*</a>',
        r'\1 href="https://phasev-2026.webflow.io/contact" \2 data-new>Contact us</a>', h)

# titres (h1, h2) sans point final, y compris en fin de ligne avant un <br> ou une balise fermante
def nodot(m):
    return re.sub(r'\.(\s*(?:<br\s*/?>|</span>|</h[12]>))', r'\1', m.group(0))
h = re.sub(r'<h[12]\b[^>]*>.*?</h[12]>', nodot, h, flags=re.S)

h = h.replace('<title>', '<title>PROTO · ', 1)
h = sub(r'</body>', extra + '</body>', h)
open(OUT, 'w', encoding='utf-8').write(h)
print('ok', len(h))
