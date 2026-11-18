/* Sliders du site : un seul système pour tous les [data-swiper] (remplace les scripts Swiper collés dans les pages
   Home, Company, Resources et Case Studies).
   Structure Webflow inchangée : [data-swiper="<type>"] contient un .swiper (liste CMS) ; flèches du composant
   slider-arrows, repérées par [data-swiper-prev] / [data-swiper-next].
   Types :
   - news : cartes qui dépassent (slidesPerView auto), Latest news, cartes produit de la Home, Leadership, SAB ;
   - feature : une carte pleine largeur, hauteur qui suit la carte (mises en avant de Resources et Case Studies).
   Flèches : par identifiant si le slider porte data-swiper-id (flèches [data-swiper-prev="<id>"] ailleurs dans la page),
   sinon les plus proches en remontant depuis le slider. Elles sont grisées au bout (is-disabled) et cachées quand il n'y a
   rien à faire défiler. Swiper n'est chargé que si la page a un slider. Reduced motion : défilement sans animation. */

const VERSION = '11.2.10';
const BASE_URL = `https://cdn.jsdelivr.net/npm/swiper@${VERSION}`;

const reduce = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const CONFIGS = {
  news: {
    slidesPerView: 'auto',
    spaceBetween: 20,
    breakpoints: { 768: { spaceBetween: 40 } },
  },
  feature: {
    slidesPerView: 1,
    spaceBetween: 24,
    speed: 600,
    autoHeight: true,
    observer: true,
    observeParents: true,
  },
};

// flèche au bout du slider : presque transparente et inactive (repris de .arrow.is-left/right.is-disabled de Webflow,
// classe posée seulement par ce module, donc supprimée par le Clean up des classes)
const CSS = `:is([data-swiper-prev],[data-swiper-next]).is-disabled{opacity:.1;pointer-events:none;cursor:default}`;

function injectCss() {
  if (document.getElementById('pv-sliders-css')) return;
  const st = document.createElement('style'); st.id = 'pv-sliders-css'; st.textContent = CSS; document.head.appendChild(st);
}

let loading = null;
function loadSwiper() {
  if (!loading) {
    if (!document.querySelector('link[data-pv-swiper]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = `${BASE_URL}/swiper-bundle.min.css`;
      link.dataset.pvSwiper = '';
      document.head.appendChild(link);
    }
    loading = import(/* @vite-ignore */ `${BASE_URL}/swiper-bundle.min.mjs`).then(m => m.default || m.Swiper);
  }
  return loading;
}

// flèches : par identifiant, sinon les plus proches en remontant depuis le slider
function findArrows(root, kind) {
  const id = root.getAttribute('data-swiper-id');
  if (id) {
    const byId = [...document.querySelectorAll(`[data-swiper-${kind}="${id}"]`)];
    if (byId.length) return byId;
  }
  for (let node = root; node && node !== document.body; node = node.parentElement) {
    const found = node.querySelectorAll(`[data-swiper-${kind}]`);
    if (found.length) return [...found];
  }
  return [];
}

export function initSlider(root) {
  if (!root || root.dataset.pvInit) return null;
  const config = CONFIGS[root.getAttribute('data-swiper')];
  const el = root.querySelector('.swiper');
  if (!config || !el) return null;
  root.dataset.pvInit = '1';
  injectCss();

  let swiper = null;
  let dead = false;
  const off = [];

  loadSwiper().then(Swiper => {
    if (dead || !Swiper) return;
    // un ancien script de page a pu initialiser ce slider avant : on repart de zéro
    if (el.swiper && !el.swiper.destroyed) el.swiper.destroy(true, true);

    const opts = { grabCursor: true, watchOverflow: true, ...config };
    if (reduce()) opts.speed = 0;
    swiper = new Swiper(el, opts);

    const prev = findArrows(root, 'prev');
    const next = findArrows(root, 'next');
    const goPrev = () => swiper.slidePrev();
    const goNext = () => swiper.slideNext();
    prev.forEach(b => { b.addEventListener('click', goPrev); off.push(() => b.removeEventListener('click', goPrev)); });
    next.forEach(b => { b.addEventListener('click', goNext); off.push(() => b.removeEventListener('click', goNext)); });

    const wraps = [...new Set([...prev, ...next].map(b => b.closest('.slider-arrows-wrapper') || b))];
    const sync = () => {
      prev.forEach(b => b.classList.toggle('is-disabled', swiper.isBeginning));
      next.forEach(b => b.classList.toggle('is-disabled', swiper.isEnd));
      wraps.forEach(w => { w.style.display = swiper.isLocked ? 'none' : ''; });
    };
    swiper.on('slideChange reachBeginning reachEnd fromEdge resize lock unlock', sync);
    sync();
  }).catch(() => { /* librairie injoignable : la liste reste lisible telle quelle */ });

  return function destroy() {
    dead = true;
    off.forEach(fn => fn());
    if (swiper && !swiper.destroyed) swiper.destroy(true, true);
    delete root.dataset.pvInit;
  };
}
