/* FAQ des pages de la refonte : accordéon sur la structure native de Webflow.
   Montage : [data-pv="faq"] contenant des .faq-item, chacun avec une question .faq-q et une réponse .faq-a.
   Le texte reste dans Webflow (questions et réponses éditables) ; le module ne fait que le comportement :
   la question devient un bouton accessible, l'anneau +/− est ajouté, une seule réponse ouverte à la fois.
   Dans le Designer (pas de JS), toutes les réponses restent visibles pour l'édition.
   Reduced motion : ouverture sans transition. Retourne destroy(). */

const CSS = `
[data-pv="faq"].pv-faq-on .faq-a{display:grid;grid-template-rows:0fr;transition:grid-template-rows .35s cubic-bezier(.2,.7,.2,1)}
[data-pv="faq"].pv-faq-on .faq-a > .pv-faq-in{min-height:0;overflow:hidden}
[data-pv="faq"].pv-faq-on .faq-item.is-open .faq-a{grid-template-rows:1fr}
[data-pv="faq"] .faq-q{display:flex;justify-content:space-between;align-items:center;gap:1.5rem}
[data-pv="faq"] .faq-q:focus-visible{outline:2px solid #141238;outline-offset:4px;border-radius:4px}
.pv-faq-pm{flex:none;position:relative;width:2.5rem;height:2.5rem;border-radius:999px;border:1px solid rgba(20,18,56,.2);transition:background-color .2s,border-color .2s,color .2s}
.pv-faq-pm::before,.pv-faq-pm::after{content:'';position:absolute;left:50%;top:50%;width:.875rem;height:1.5px;background:currentColor;transform:translate(-50%,-50%);transition:transform .3s}
.pv-faq-pm::after{transform:translate(-50%,-50%) rotate(90deg)}
[data-pv="faq"] .faq-q:hover .pv-faq-pm{border-color:#141238}
[data-pv="faq"] .faq-item.is-open .pv-faq-pm{background:#141238;color:#f8f8f8;border-color:#141238}
[data-pv="faq"] .faq-item.is-open .pv-faq-pm::after{transform:translate(-50%,-50%) rotate(0)}
@media (prefers-reduced-motion:reduce){[data-pv="faq"] .faq-a,.pv-faq-pm,.pv-faq-pm::before,.pv-faq-pm::after{transition:none}}`;

let uid = 0;

export function initFaq(root) {
  if (!root || root.dataset.pvInit) return null;
  root.dataset.pvInit = '1';
  if (!document.getElementById('pv-faq-css')) {
    const st = document.createElement('style'); st.id = 'pv-faq-css'; st.textContent = CSS; document.head.appendChild(st);
  }
  const items = [...root.querySelectorAll('.faq-item')];
  const off = [];
  const set = (item, open) => {
    item.classList.toggle('is-open', open);
    item._q.setAttribute('aria-expanded', open ? 'true' : 'false');
    item._a.inert = !open;
  };
  items.forEach(item => {
    const q = item.querySelector('.faq-q'), a = item.querySelector('.faq-a');
    if (!q || !a) return;
    const id = 'pv-faq-' + (++uid);
    item._q = q; item._a = a;
    // la question (un titre) garde son niveau ; elle reçoit le rôle de bouton
    q.setAttribute('role', 'button'); q.tabIndex = 0; q.setAttribute('aria-controls', id);
    a.id = id; a.setAttribute('role', 'region');
    // enveloppe sans padding : c'est elle qui se replie à 0 (le padding de la réponse resterait visible sinon)
    const inner = document.createElement('div'); inner.className = 'pv-faq-in';
    while (a.firstChild) inner.appendChild(a.firstChild);
    a.appendChild(inner);
    const pm = document.createElement('span'); pm.className = 'pv-faq-pm'; pm.setAttribute('aria-hidden', 'true');
    q.appendChild(pm);
    const toggle = () => {
      const open = !item.classList.contains('is-open');
      if (open) items.forEach(o => o !== item && o._q && set(o, false));
      set(item, open);
    };
    const onKey = e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } };
    q.addEventListener('click', toggle); q.addEventListener('keydown', onKey);
    off.push(() => {
      q.removeEventListener('click', toggle); q.removeEventListener('keydown', onKey); pm.remove();
      while (inner.firstChild) a.appendChild(inner.firstChild);
      inner.remove();
    });
    set(item, false);
  });
  root.classList.add('pv-faq-on');
  return function destroy() {
    off.forEach(f => f());
    items.forEach(i => { i.classList.remove('is-open'); if (i._a) i._a.inert = false; });
    root.classList.remove('pv-faq-on'); delete root.dataset.pvInit;
  };
}
