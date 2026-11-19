// Inventaire : script chargé par les copies de pages (site-*.html, proto-*.html).
// ?block=N  n'affiche que le bloc N (data-inv-block) et envoie sa hauteur à la page parente.
// ?atoms    relève les petits éléments de la page rendue et les envoie à la page parente.
(function () {
  const q = new URLSearchParams(location.search);
  const block = q.get('block');

  if (block !== null) {
    const st = document.createElement('style');
    st.textContent =
      '.navbar_component,.nav-backdrop,.section_footer,.pv-proto{display:none!important}' +
      '[data-inv-block]:not([data-inv-block="' + block + '"]){display:none!important}' +
      '[data-inv-block="' + block + '"][data-inv-hidden]{display:block!important}' +
      'html,body{overflow:hidden!important}';
    document.head.appendChild(st);
    const t = document.querySelector('[data-inv-block="' + block + '"]');
    if (!t) return;
    // tout ce qui n'est pas le bloc est masqué, quelle que soit sa balise (frères du bloc et de ses parents, jusqu'au wrapper de page)
    for (let e = t; e.parentElement && e.parentElement !== document.body; e = e.parentElement)
      [...e.parentElement.children].forEach(s => {
        if (s !== e && !/^(SCRIPT|STYLE|LINK)$/.test(s.tagName)) s.style.setProperty('display', 'none', 'important');
      });
    let last = 0;
    const send = () => {
      const h = Math.ceil(t.getBoundingClientRect().bottom + scrollY);
      if (h && h !== last) { last = h; parent.postMessage({ inv: 'h', block: +block, h }, '*'); }
    };
    new ResizeObserver(send).observe(t);
    addEventListener('load', () => { send(); setTimeout(send, 1500); });
    return;
  }

  if (q.has('plan')) { addEventListener('load', planMode); return; }
  if (!q.has('atoms')) return;

  const OUTSIDE = '.navbar_component,.nav-backdrop,.section_footer,.pv-proto,.global-styles';
  const global = q.get('atoms') === 'global';   // navbar et footer : relevés une seule fois, depuis la Home
  const CATS = [
    ['boutons', '.button,.w-button,[data-wf--button--variant]'],
    ['liens', 'a[class*="link"]:not(.button),a.is-link,a.arrow,.rp-link,.ss-link'],
    ['labels', '[class*="text-size-label"],[class*="-label"]:not(label):not(input)'],
    ['titres', 'h1,h2,h3,h4,h5,h6,.text-size-display,[class*="heading-style"]'],
    ['cartes', '[class$="card"],[class*="card "],[class*="-card "],.rp-stat,.glance-stat,.resource-item,.dm-panel,.ev-case,.featured-card'],
    ['icones', 'img[class*="icon"],svg[class*="icon"],[class*="icon"]>img,.glance-icon,.methodology-icon'],
    ['textes', '[class*="text-size-"]:not([class*="text-size-label"]):not(.text-size-display),p'],
  ];

  const clsOf = el => [...el.classList].filter(c => !/^w-node|^w-variant|^w--/.test(c)).sort();
  const sig = el => {
    const c = clsOf(el), v = el.getAttribute('data-wf--button--variant');
    let s = el.tagName.toLowerCase() + (c.length ? '.' + c.join('.') : '');
    if (!c.length && el.parentElement) s = (clsOf(el.parentElement)[0] || el.parentElement.tagName.toLowerCase()) + ' > ' + s;
    return s + (v ? ' [' + v + ']' : '');
  };
  // fond réel derrière l'élément : couleur, sinon première couleur d'un dégradé ; image ou fond flottant du site = navy
  const clear = c => !c || /rgba\(0, 0, 0, 0\)|transparent/.test(c);
  const bgOf = el => {
    for (let e = el; e && e !== document.documentElement; e = e.parentElement) {
      const c = getComputedStyle(e);
      if (c.backgroundImage && c.backgroundImage !== 'none') {
        const first = (c.backgroundImage.match(/rgba?\([^)]*\)/) || [])[0];
        if (first && !clear(first)) return first;
        if (/url\(/.test(c.backgroundImage)) return '#141238';
      }
      if (!clear(c.backgroundColor)) return c.backgroundColor;
      if (e.matches('[data-bg="purple-gradient"],.is-gradient,.section_header,.section_footer')) return '#141238';
    }
    return '#f8f8f8';
  };
  const ctxOf = el => {
    const s = el.closest('[data-inv-block],.section_footer,.navbar_component');
    const zone = el.closest('.navbar_component') ? 'navbar' : el.closest('.section_footer') ? 'footer' : '';
    // la navbar est fixe : pas de classe de contexte pour elle
    return s ? { cls: zone === 'navbar' ? '' : s.className, bg: s.getAttribute('data-bg') || '', block: s.dataset.invBlock != null ? +s.dataset.invBlock : null, zone }
      : { cls: '', bg: '', block: null, zone };
  };
  const styleOf = el => {
    const c = getComputedStyle(el);
    return {
      font: c.fontFamily.split(',')[0].replace(/"/g, ''), size: c.fontSize, weight: c.fontWeight, lh: c.lineHeight,
      ls: c.letterSpacing, tt: c.textTransform, color: c.color, bg: c.backgroundColor,
      radius: c.borderRadius, border: c.borderTopWidth !== '0px' ? c.borderTopWidth + ' ' + c.borderTopColor : '', pad: c.padding,
      w: Math.round(el.getBoundingClientRect().width),
    };
  };
  const cleanHtml = el => {
    const k = el.cloneNode(true);
    [k, ...k.querySelectorAll('*')].forEach(n => {
      n.removeAttribute('data-w-id');
      if (n.style) { n.style.removeProperty('opacity'); n.style.removeProperty('transform'); n.style.removeProperty('visibility'); }
      if (n.tagName === 'VIDEO') { n.removeAttribute('autoplay'); n.preload = 'metadata'; }
    });
    let h = k.outerHTML;
    return h.length > 6000 ? h.slice(0, 6000) : h;
  };
  const inScope = el => global ? !!el.closest('.navbar_component,.section_footer') : !el.closest(OUTSIDE);
  const visible = el => el.getClientRects().length > 0;

  function collect() {
    const items = new Map(), taken = new Set();
    const add = (cat, el) => {
      if (taken.has(el) || !inScope(el)) return;
      taken.add(el);
      const s = cat + '|' + sig(el);
      const it = items.get(s);
      if (it) { it.count++; return; }
      items.set(s, { cat, sig: sig(el), count: 1, html: cleanHtml(el), text: (el.innerText || '').trim().slice(0, 80),
        ctx: ctxOf(el), tileBg: bgOf(el.parentElement || el), style: styleOf(el), shown: visible(el) });
    };
    CATS.forEach(([cat, sel]) => document.querySelectorAll(sel).forEach(el => {
      if (cat === 'cartes' && el.parentElement && el.parentElement.closest('[class*="card"]')) return;   // carte dans une carte
      if (cat === 'textes' && el.tagName === 'P' && el.classList.length === 0 && el.closest('.w-richtext')) { add('textes', el.closest('.w-richtext')); return; }
      add(cat, el);
    }));
    // pastilles : petits éléments de texte avec fond ou contour et coins arrondis, quelle que soit leur classe
    document.querySelectorAll('body *').forEach(el => {
      if (taken.has(el) || !inScope(el) || el.children.length > 2 || !visible(el)) return;
      const t = (el.innerText || '').trim();
      if (!t || t.length > 40) return;
      const c = getComputedStyle(el), r = el.getBoundingClientRect();
      const filled = !/rgba\(0, 0, 0, 0\)|transparent/.test(c.backgroundColor) || parseFloat(c.borderTopWidth) > 0;
      if (filled && parseFloat(c.borderTopLeftRadius) >= 4 && r.height >= 14 && r.height <= 48 && r.width < 320) add('pastilles', el);
    });
    // espacements : gap réel de chaque conteneur flex ou grid, avec son rôle
    //   rangee : éléments assez grands côte à côte (cartes, colonnes) ; pile : grands éléments empilés ; texte : le reste
    const rem = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
    const px = v => (v === 'normal' || !v ? 0 : parseFloat(v));
    document.querySelectorAll('body *').forEach(el => {
      if (!inScope(el) || !visible(el)) return;
      const c = getComputedStyle(el);
      if (!/flex|grid/.test(c.display)) return;
      const kids = [...el.children].filter(k => k.getClientRects().length && getComputedStyle(k).position !== 'absolute');
      if (kids.length < 2) return;
      const r = kids.map(k => k.getBoundingClientRect());
      const side = r.some((a, i) => i && Math.abs(a.top - r[0].top) < 4 && a.left > r[0].left + 4);
      const big = r.every(a => a.width >= 140 && a.height >= 80);
      const role = big ? (side ? 'rangee' : 'pile') : 'texte';
      const rg = Math.round(px(c.rowGap) / rem * 1000) / 1000, cg = Math.round(px(c.columnGap) / rem * 1000) / 1000;
      const s = sig(el), k = 'gaps|' + s + '|' + role + '|' + rg + '|' + cg;
      const it = items.get(k);
      if (it) { it.count++; return; }
      items.set(k, { cat: 'gaps', sig: s, role, rg, cg, dir: c.display.includes('grid') ? 'grid' : c.flexDirection, kids: kids.length,
        count: 1, ctx: ctxOf(el), text: '', html: '', style: {}, shown: true });
    });
    parent.postMessage({ inv: 'atoms', page: q.get('page') || location.pathname, items: [...items.values()] }, '*');
    // &dump : résultats écrits dans la page, pour une lecture sans navigateur (analyse)
    if (q.has('dump')) {
      const pre = document.createElement('pre'); pre.id = 'inv-dump';
      pre.textContent = JSON.stringify([...items.values()].filter(it => it.cat === 'gaps' || q.get('dump') === 'all').map(({ html, ...r }) => r));
      document.body.append(pre);
    }
  }
  addEventListener('load', () => setTimeout(collect, 3000));

  // ?plan : page entière, chaque bloc porte une étiquette avec ce qu'il devient (blocs.json, champ plan)
  async function planMode() {
    const COL = { garde: ['#2f8f5b', '#fff', 'Gardé'], fusion: ['#78a8e0', '#141238', 'Fusionné'], masque: ['#c0392b', '#fff', 'Masqué'], revoir: ['#e2c70a', '#141238', 'À revoir'] };
    const file = location.pathname.split('/').pop();
    const data = await (await fetch('blocs.json', { cache: 'no-store' })).json();
    const mine = data.blocks.filter(b => b.open === file).sort((a, b) => a.n - b.n);
    const st = document.createElement('style');
    st.textContent =
      '[data-inv-plan]{position:relative!important}' +
      '.inv-tag{position:absolute;z-index:60;left:1rem;top:1rem;max-width:min(36rem,calc(100% - 2rem));padding:.55rem .8rem;border-radius:.6rem;font:600 13px/1.35 Aspekta,Inter,Arial,sans-serif;box-shadow:0 6px 20px #0003;pointer-events:none;letter-spacing:0;text-transform:none}' +
      '.inv-tag b{font-family:ui-monospace,Consolas,monospace;margin-right:.4rem}' +
      '[data-inv-plan="masque"]{display:block!important;opacity:.45}' +
      '.inv-panel{position:fixed;z-index:9999;right:1rem;bottom:1rem;width:19rem;max-height:70vh;overflow:auto;background:#fff;color:#141238;border-radius:.9rem;box-shadow:0 12px 40px #0004;font:400 13px/1.4 Aspekta,Inter,Arial,sans-serif;padding:.9rem}' +
      '.inv-panel h4{margin:0 0 .25rem;font-size:15px;font-weight:700;line-height:1.2}' +
      '.inv-panel a{color:inherit}' +
      '.inv-panel ol{list-style:none;margin:.6rem 0 0;padding:0;display:flex;flex-direction:column;gap:.3rem}' +
      '.inv-panel li{display:flex;gap:.5rem;align-items:flex-start;cursor:pointer;padding:.25rem .35rem;border-radius:.4rem}' +
      '.inv-panel li:hover{background:#f1f0f7}' +
      '.inv-panel i{flex:none;width:.7rem;height:.7rem;border-radius:50%;margin-top:.25rem}' +
      '.inv-panel .x{float:right;cursor:pointer;border:0;background:none;font-size:16px;line-height:1;color:#626262}';
    document.head.appendChild(st);
    mine.forEach(b => {
      const el = document.querySelector('[data-inv-block="' + b.n + '"]');
      if (!el) return;
      const [s, txt] = b.plan, c = COL[s];
      el.dataset.invPlan = b.hidden && s !== 'masque' ? 'masque' : s;
      el.style.outline = '4px solid ' + c[0]; el.style.outlineOffset = '-4px';
      const t = document.createElement('div'); t.className = 'inv-tag';
      t.style.background = c[0]; t.style.color = c[1];
      t.innerHTML = '<b>' + b.id + '</b>' + c[2] + ' · ' + txt + (b.hidden ? ' (masqué sur le site)' : '');
      el.prepend(t);
    });
    const panel = document.createElement('div'); panel.className = 'inv-panel'; panel.setAttribute('data-lenis-prevent', '');
    const page = data.pages.find(p => p.file === file);
    const count = s => mine.filter(b => b.plan[0] === s).length;
    panel.innerHTML = '<button class="x" type="button" aria-label="Replier">–</button><h4>' + (page ? page.label : file) + '</h4>' +
      '<div>' + Object.keys(COL).filter(count).map(s => count(s) + ' ' + COL[s][2].toLowerCase()).join(' · ') + '</div>' +
      '<div style="margin-top:.35rem"><a href="plan.html">← toutes les pages</a></div>' +
      '<ol>' + mine.map(b => '<li data-n="' + b.n + '"><i style="background:' + COL[b.plan[0]][0] + '"></i><span><b>' + b.id + '</b> ' + b.plan[1] + '</span></li>').join('') + '</ol>';
    document.body.appendChild(panel);
    panel.querySelector('.x').addEventListener('click', () => { const ol = panel.querySelector('ol'); ol.hidden = !ol.hidden; });
    panel.querySelectorAll('li').forEach(li => li.addEventListener('click', () => {
      const el = document.querySelector('[data-inv-block="' + li.dataset.n + '"]');
      if (!el) return;
      if (window.lenis && window.lenis.scrollTo) window.lenis.scrollTo(el, { offset: -80 }); else el.scrollIntoView({ behavior: 'smooth' });
    }));
  }
})();
