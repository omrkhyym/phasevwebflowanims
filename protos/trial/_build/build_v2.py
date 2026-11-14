import re, sys, os
# v2 = proto complet figé sur les choix : workflow A, success story C (sans bascules)
# python protos/trial/_build/build_v2.py   (lit phasev-trial-protos.html, écrit phasev-trial-v2.html)
D = os.path.dirname(os.path.abspath(__file__))
SRC = sys.argv[1] if len(sys.argv) > 1 else os.path.join(D, '..', 'phasev-trial-protos.html')
OUT = sys.argv[2] if len(sys.argv) > 2 else os.path.join(D, '..', 'phasev-trial-v2.html')
h = open(SRC, encoding='utf-8').read()

def sub(pat, rep, s, count=1, flags=re.S):
    out, k = re.subn(pat, rep, s, count=count, flags=flags)
    if k != count: raise SystemExit('pattern count %d != %d: %s' % (k, count, pat[:80]))
    return out

# success story : on ne garde que C
h = sub(r'<!-- ===== Variante A ===== -->.*?</section>\s*', '', h)
h = sub(r'<!-- ===== Variante D : trois colonnes ===== -->.*?</section>\s*', '', h)
h = sub(r'<button type="button" id="ssSwitch">[^<]*</button>', '', h)
h = sub(r"const btn = document.getElementById\('ssSwitch'\)", "const btn = document.getElementById('ssSwitch'); if (!btn) return; const _ = btn", h)

# workflow : A fixe, plus de bouton
h = sub(r"const order = \['A', 'C'\]", "const order = ['A']", h)
h = sub(r"document.querySelector\('.pv-proto'\).append\(btn\);", '', h)

# standalone : animation plateforme version cartes (module de proto, celui de prod ne bouge pas)
h = sub(r'<div data-current="trial" data-pv="platform-connect">', '<div data-current="trial" data-pv="platform-connect-v2">', h)
h = sub(r'</body>', '<script type="module">import { initPlatformConnect } from "./platform-connect-cards.js";\n'
        'document.querySelectorAll(\'[data-pv="platform-connect-v2"]\').forEach(el => initPlatformConnect(el));</script>\n</body>', h)

h = h.replace('<title>PROTO · ', '<title>PROTO v2 · ', 1)
h = h.replace('<b>Proto Trial</b>', '<b>Proto Trial v2</b>', 1)
open(OUT, 'w', encoding='utf-8').write(h)
print('ok', len(h))
