"""Génère protos/trial/phasev-trial-protos.html à partir de la page staging et des morceaux de ce dossier.
   python protos/trial/_build/build.py          (puis build_v2.py pour la version figée)
   La page staging est mise en cache dans .cache/ (non versionné) ; --refresh la retélécharge."""
import re, sys, os, urllib.request
D = os.path.dirname(os.path.abspath(__file__))
URL = 'https://phasev-2026.webflow.io/trial-optimizer'
SITE = os.path.join(D, '.cache', 'live-trial-optimizer.html')
args = [a for a in sys.argv[1:] if not a.startswith('--')]
OUT = args[0] if args else os.path.join(D, '..', 'phasev-trial-protos.html')
if '--refresh' in sys.argv or not os.path.exists(SITE):
    os.makedirs(os.path.dirname(SITE), exist_ok=True)
    with urllib.request.urlopen(URL) as r, open(SITE, 'wb') as f: f.write(r.read())
h = open(SITE, encoding='utf-8').read()
main = open(os.path.join(D, 'main.html'), encoding='utf-8').read()
extra = open(os.path.join(D, 'extra.html'), encoding='utf-8').read()
success = open(os.path.join(D, 'success.html'), encoding='utf-8').read()
extra += open(os.path.join(D, 'workflow.html'), encoding='utf-8').read()

def sub(pat, rep, s, count=1, flags=re.S):
    out, k = re.subn(pat, rep, s, count=count, flags=flags)
    if k == 0: raise SystemExit('pattern not found: ' + pat[:80])
    return out

main = sub(r'<section class="section_layout is-lightpurple"><div class="padding-global padding-section-custom4">.*?</section>', lambda m: success, main)

# scripts tiers inutiles en local (HubSpot, analytics, widget de bot, Userback)
h = sub(r'<script[^>]*hs-script-loader.*?</script>', '', h)
h = sub(r'<script async="" src="/v2645[^"]*"[^>]*></script>', '', h)
h = sub(r'<script>\s*if \(window\.location\.hostname\.includes\(\'webflow\.io\'\)\).*?</script>', '', h)
h = re.sub(r'<script[^>]*googletagmanager[^>]*></script>', '', h)

# liens internes vers le staging, pour que la navigation fonctionne depuis localhost
h = re.sub(r'href="/(?!/)', 'href="https://phasev-2026.webflow.io/', h)

# loaders : toujours le serveur Vite local (site.js et trial.js)
h = h.replace("location.search.includes('dev')", 'true')

# hero : nouvelle copy
h = sub(r'<h1 class="text-size-display text-color-alternate">.*?</h1>',
        '<h1 class="text-size-display text-color-alternate" data-new>Design for uncertainty. <br/><span class="text-color-yellow">Decide with clarity.</span></h1>', h)
h = sub(r'(<div class="text-size-large)(">)A design that looks strong.*?</div>',
        r'\1" data-new\2A design can look strong under one assumed effect size and fail under another. Trial Optimizer helps you find a design that meets your objectives within your constraints. It simulates and optimizes adaptive, fixed, and Bayesian designs, explores trade-offs, and tests performance across the scenarios that matter, including those where your assumptions miss, so you can choose a robust design you can defend.</div>', h)

# contenu : nouveaux blocs entre le hero et le footer
h = sub(r'</header></main>', '</header>' + main + '</main>', h)

# bandeau CTA du footer
h = sub(r'(<h2 class="footer-statement is-cta")>Bring us a protocol draft, a design question, or a set of assumptions</h2>',
        r'\1 data-new>Bring us a protocol draft, a design question, or a set of assumptions.</h2>', h)
h = sub(r'(<div class="footer-band-actions"><a [^>]*class="button w-button")>Schedule a demo</a>', r'\1 data-new>Contact us</a>', h)

# titres (h1, h2) sans point final, y compris en fin de ligne avant un <br> ou une balise fermante
def nodot(m):
    return re.sub(r'\.(\s*(?:<br\s*/?>|</span>|</h[12]>))', r'\1', m.group(0))
h = re.sub(r'<h[12]\b[^>]*>.*?</h[12]>', nodot, h, flags=re.S)

h = h.replace('<title>', '<title>PROTO · ', 1)
h = sub(r'</body>', extra + '</body>', h)
open(OUT, 'w', encoding='utf-8').write(h)
print('ok', len(h))
