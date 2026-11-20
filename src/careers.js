/* Page Careers : offres d'emploi lues en direct sur le tableau public Greenhouse (boards-api, sans clé, CORS ouvert).
   Monté sur <div data-pv="careers" data-board="phasev" ...>. Le header de la page reste dans Webflow ; les textes de
   l'interface sont des attributs du montage, éditables dans le Designer :
   data-all (filtre « tous les bureaux »), data-empty (aucune offre), data-error (échec du chargement),
   data-link (lien vers la page Greenhouse), data-apply (lien de chaque offre).
   Offres groupées par équipe, filtre par bureau, chaque offre ouvre sa page Greenhouse (candidature là-bas). */

const API = board => `https://boards-api.greenhouse.io/v1/boards/${board}`;
// noms courts des bureaux (Greenhouse : « Boston Office », « TLV Office », « No Office »)
const OFFICE = n => { const s = (n || '').replace(/\s*office$/i, '').trim(); return /^tlv$/i.test(s) ? 'Tel Aviv' : /^no$/i.test(s) ? 'Remote' : s; };

const CSS = `
[data-pv="careers"]{display:block}
/* filtres : pastilles, comme ceux de Case Studies */
[data-pv="careers"] .pv-jobs-filters{display:flex;flex-wrap:wrap;gap:.5rem;margin:0 0 3.5rem;padding:0}
[data-pv="careers"] .pv-jobs-filters button{margin:0;font:inherit;font-family:var(--pv-jobs-mono, 'Roboto Mono', ui-monospace, monospace);font-size:.75rem;line-height:1;letter-spacing:.08em;
  text-transform:uppercase;padding:.75rem 1.125rem;border-radius:999px;border:1px solid rgba(20,18,56,.16);background:transparent;color:#141238;cursor:pointer;
  transition:background-color .2s ease, color .2s ease, border-color .2s ease}
[data-pv="careers"] .pv-jobs-filters button:hover{border-color:rgba(20,18,56,.4)}
[data-pv="careers"] .pv-jobs-filters button[aria-pressed="true"]{background:#141238;border-color:#141238;color:#f8f8f8}
[data-pv="careers"] .pv-jobs-filters button:focus-visible{outline:2px solid #141238;outline-offset:2px}
/* une équipe : surtitre mono + nombre d'offres, puis ses offres */
[data-pv="careers"] .pv-jobs-group{margin:0;padding:0}
[data-pv="careers"] .pv-jobs-group + .pv-jobs-group{margin-top:3.5rem}
[data-pv="careers"] .pv-jobs-team{display:flex;align-items:baseline;gap:.75rem;margin:0 0 1rem;padding:0;font-family:var(--pv-jobs-mono, 'Roboto Mono', ui-monospace, monospace);
  font-size:.8125rem;line-height:1.4;font-weight:400;letter-spacing:.12em;text-transform:uppercase;color:#684a9e}
[data-pv="careers"] .pv-jobs-team span{color:rgba(20,18,56,.4)}
[data-pv="careers"] .pv-jobs-list{list-style:none;margin:0;padding:0;border-top:1px solid rgba(20,18,56,.12)}
[data-pv="careers"] .pv-jobs-list li{margin:0;padding:0;border-bottom:1px solid rgba(20,18,56,.12)}
/* une offre : titre | bureau | lien, sur une ligne */
[data-pv="careers"] .pv-job{display:grid;grid-template-columns:minmax(0,1fr) 8rem auto;align-items:center;gap:2rem;padding:1.375rem 1rem;margin:0 -1rem;
  border-radius:.75rem;color:#141238;text-decoration:none;transition:background-color .2s ease}
[data-pv="careers"] .pv-job:hover{background:rgba(20,18,56,.035)}
[data-pv="careers"] .pv-job-title{font-size:clamp(1.0625rem, .95rem + .4vw, 1.3125rem);font-weight:400;line-height:1.35;letter-spacing:-.005em}
[data-pv="careers"] .pv-job-meta{font-family:var(--pv-jobs-mono, 'Roboto Mono', ui-monospace, monospace);font-size:.75rem;letter-spacing:.08em;text-transform:uppercase;color:rgba(20,18,56,.55)}
[data-pv="careers"] .pv-job-go{font-size:.9375rem;white-space:nowrap;transition:transform .3s cubic-bezier(.2,.7,.2,1)}
[data-pv="careers"] .pv-job:hover .pv-job-go{transform:translateX(3px)}
[data-pv="careers"] .pv-job:focus-visible{outline:2px solid #141238;outline-offset:-2px}
[data-pv="careers"] .pv-jobs-note{margin:0;font-size:1.0625rem;line-height:1.6;color:#4a4868}
[data-pv="careers"] .pv-jobs-note a{color:#141238}
/* sur fond sombre (section surface-dark) : texte clair, filets clairs */
[data-pv="careers"].is-dark .pv-jobs-filters button{border-color:rgba(248,248,248,.22);color:#f8f8f8}
[data-pv="careers"].is-dark .pv-jobs-filters button:hover{border-color:rgba(248,248,248,.55)}
[data-pv="careers"].is-dark .pv-jobs-filters button[aria-pressed="true"]{background:#f8f8f8;border-color:#f8f8f8;color:#141238}
[data-pv="careers"].is-dark .pv-jobs-filters button:focus-visible, [data-pv="careers"].is-dark .pv-job:focus-visible{outline-color:rgba(248,248,248,.7)}
[data-pv="careers"].is-dark .pv-jobs-team{color:#c9c4ef}
[data-pv="careers"].is-dark .pv-jobs-team span{color:rgba(248,248,248,.45)}
[data-pv="careers"].is-dark .pv-jobs-list, [data-pv="careers"].is-dark .pv-jobs-list li{border-color:rgba(248,248,248,.14)}
[data-pv="careers"].is-dark .pv-job{color:#f8f8f8}
[data-pv="careers"].is-dark .pv-job:hover{background:rgba(248,248,248,.05)}
[data-pv="careers"].is-dark .pv-job-meta{color:rgba(248,248,248,.6)}
[data-pv="careers"].is-dark .pv-jobs-note{color:rgba(248,248,248,.72)}
[data-pv="careers"].is-dark .pv-jobs-note a{color:#f8f8f8}
/* mobile : titre puis bureau sous le titre, sans le texte du lien */
@media (max-width:767px){
  [data-pv="careers"] .pv-jobs-filters{margin-bottom:2.5rem}
  [data-pv="careers"] .pv-jobs-group + .pv-jobs-group{margin-top:2.5rem}
  [data-pv="careers"] .pv-job{grid-template-columns:minmax(0,1fr) auto;gap:.375rem 1rem;padding:1.125rem .75rem;margin:0 -.75rem}
  [data-pv="careers"] .pv-job-meta{grid-column:1;grid-row:2}
  [data-pv="careers"] .pv-job-go{grid-column:2;grid-row:1 / span 2;font-size:0}
  [data-pv="careers"] .pv-job-go::after{content:'→';font-size:1.125rem}
}
@media (prefers-reduced-motion:reduce){[data-pv="careers"] .pv-job, [data-pv="careers"] .pv-job-go, [data-pv="careers"] .pv-jobs-filters button{transition:none}}`;

function injectCSS() {
  if (document.getElementById('pv-jobs-css')) return;
  const s = document.createElement('style'); s.id = 'pv-jobs-css'; s.textContent = CSS; document.head.appendChild(s);
}

export function initCareers(root) {
  if (!root || root.dataset.pvInit) return null;
  root.dataset.pvInit = '1';
  injectCSS();
  const board = root.dataset.board || 'phasev';
  const T = {
    all: root.dataset.all || 'All locations',
    empty: root.dataset.empty || 'There are no open positions right now.',
    error: root.dataset.error || 'The open positions could not be loaded.',
    link: root.dataset.link || 'See all openings on Greenhouse',
    apply: root.dataset.apply || 'View role',
  };
  const boardUrl = `https://job-boards.greenhouse.io/${board}`;
  const label = (root.closest('main') || document).querySelector('.text-size-label');
  if (label) root.style.setProperty('--pv-jobs-mono', getComputedStyle(label).fontFamily);
  root.classList.toggle('is-dark', !!root.closest('[data-af-bg="dark"], .surface-dark'));

  const ctrl = new AbortController();
  const el = (tag, cls, text) => { const n = document.createElement(tag); if (cls) n.className = cls; if (text != null) n.textContent = text; return n; };
  const note = msg => {
    root.replaceChildren();
    const p = el('p', 'pv-jobs-note', msg + ' ');
    const a = el('a', null, T.link); a.href = boardUrl; a.target = '_blank'; a.rel = 'noopener';
    p.appendChild(a); root.appendChild(p);
  };

  Promise.all([
    fetch(API(board) + '/departments', { signal: ctrl.signal }).then(r => { if (!r.ok) throw new Error(r.status); return r.json(); }),
    fetch(API(board) + '/offices', { signal: ctrl.signal }).then(r => r.ok ? r.json() : { offices: [] }).catch(() => ({ offices: [] })),
  ]).then(([dep, off]) => {
    // bureau de chaque offre, d'après l'arbre bureaux > équipes > offres
    const officeOf = new Map();
    (off.offices || []).forEach(o => (o.departments || []).forEach(d => (d.jobs || []).forEach(j => { if (!officeOf.has(j.id)) officeOf.set(j.id, OFFICE(o.name)); })));
    const groups = (dep.departments || [])
      .map(d => ({ name: d.name, jobs: (d.jobs || []).map(j => ({ id: j.id, title: j.title, url: j.absolute_url, office: officeOf.get(j.id) || '' }))
        .sort((a, b) => a.title.localeCompare(b.title)) }))
      .filter(g => g.jobs.length)
      .sort((a, b) => a.name.localeCompare(b.name));
    if (!groups.length) { note(T.empty); return; }
    render(groups);
  }).catch(e => { if (e.name !== 'AbortError') note(T.error); });

  function render(groups) {
    root.replaceChildren();
    const offices = [...new Set(groups.flatMap(g => g.jobs.map(j => j.office)).filter(Boolean))].sort();
    let current = '';
    const bar = el('div', 'pv-jobs-filters'); bar.setAttribute('role', 'group');
    const list = el('div', 'pv-jobs');
    if (offices.length > 1) {
      ['', ...offices].forEach(o => {
        const b = el('button', null, o || T.all); b.type = 'button'; b.setAttribute('aria-pressed', o === current);
        b.addEventListener('click', () => { current = o; bar.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', x === b)); draw(); });
        bar.appendChild(b);
      });
      root.appendChild(bar);
    }
    root.appendChild(list);
    function draw() {
      list.replaceChildren();
      groups.forEach(g => {
        const jobs = g.jobs.filter(j => !current || j.office === current);
        if (!jobs.length) return;
        const sec = el('section', 'pv-jobs-group');
        const h = el('h2', 'pv-jobs-team', g.name); h.appendChild(el('span', null, String(jobs.length)));
        const ul = el('ul', 'pv-jobs-list');
        jobs.forEach(j => {
          const li = el('li'), a = el('a', 'pv-job');
          a.href = j.url; a.target = '_blank'; a.rel = 'noopener';
          a.appendChild(el('span', 'pv-job-title', j.title));
          a.appendChild(el('span', 'pv-job-meta', j.office));   // toujours présent : garde les colonnes alignées
          a.appendChild(el('span', 'pv-job-go', T.apply + ' →'));
          li.appendChild(a); ul.appendChild(li);
        });
        sec.append(h, ul); list.appendChild(sec);
      });
    }
    draw();
  }

  return { destroy() { ctrl.abort(); root.replaceChildren(); root.classList.remove('is-dark'); delete root.dataset.pvInit; } };
}
