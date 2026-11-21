/* Latest news (Home) : cartes d'article au style des cartes case studies (verre clair, image arrondie, label mono).
   CSS repris du proto (_kit/affine.css). La classe swiper-item est partagée avec Resources : la bibliothèque Resources
   (data-af-lib) a ses propres règles, plus fortes, dans src/resources.js. */
const CSS_ID = 'pv-news-cards-css';
const CSS = `
:root{--af-mono:'Roboto Mono',ui-monospace,Consolas,monospace;--af-edge:linear-gradient(150deg,rgba(20,18,56,.18) 0%,rgba(20,18,56,.06) 40%,rgba(20,18,56,.04) 75%,rgba(104,74,158,.2) 100%)}
/* Latest news : carte d'article au style des cartes case studies (verre clair, image arrondie, label mono) */
.section_layout .swiper-item{ position:relative; isolation:isolate; display:flex; flex-direction:column; gap:1.25rem; height:100%; padding:1rem 1rem 1.5rem; border-radius:1.5rem; background:linear-gradient(155deg, #f6f6f9 0%, #eeedf4 100%); }
.section_layout .swiper-item::before{ content:''; position:absolute; inset:0; border-radius:inherit; padding:.5px; pointer-events:none; z-index:1; background:var(--af-edge);
  -webkit-mask:linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0); -webkit-mask-composite:xor; mask-composite:exclude; }
.section_layout .swiper-item img{ border-radius:1rem; }
.section_layout .swiper-item .post_body{ padding:0 .5rem; }
.section_layout .swiper-item .post_date{ font-family:var(--af-mono); font-size:.75rem; letter-spacing:.12em; text-transform:uppercase; }
/* Latest news (et tout slider d'articles) : cartes moins larges, toutes de la même hauteur ; image 2:1, titre plus petit, 3 lignes max */
.section_layout .swiper-slide:has(> .swiper-item){ max-width:24rem; height:auto; }
.section_layout .swiper-item .post_image{ aspect-ratio:2 / 1; margin-bottom:0; }
.section_layout .swiper-item .heading-style-h4{ font-size:clamp(1.375rem, 1.15rem + .55vw, 1.625rem); line-height:1.25; letter-spacing:-.015em; font-weight:400; display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical; overflow:hidden; }
`;
export function initNewsCards() {
  if (document.getElementById(CSS_ID) || !document.querySelector('.swiper-item')) return;
  const s = document.createElement('style'); s.id = CSS_ID; s.textContent = CSS; document.head.appendChild(s);
}
