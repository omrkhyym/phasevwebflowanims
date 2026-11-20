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
.pv-jobs-filters{display:flex;flex-wrap:wrap;gap:.5rem;margin:0 0 3rem}
.pv-jobs-filters button{font:inherit;font-family:var(--pv-jobs-mono, 'Roboto Mono', ui-monospace, monospace);font-size:.75rem;letter-spacing:.08em;text-transform:uppercase;
  padding:.625rem 1rem;border-radius:999px;border:1px solid rgba(20,18,56,.16);background:transparent;color:#141238;cursor:pointer;transition:background-color .2s ease, color .2s ease, border-color .2s ease}
.pv-jobs-filters button:hover{border-color:rgba(20,18,56,.4)}
.pv-jobs-filters button[aria-pressed="true"]{background:#141238;border-color:#141238;color:#f8f8f8}
.pv-jobs-filters button:focus-visible{outline:2px solid #141238;outline-offset:2px}
.pv-jobs-group{display:grid;grid-template-columns:minmax(0,4fr) minmax(0,8fr);gap:1rem 3rem;padding:2.5rem 0;border-top:1px solid rgba(20,18,56,.12)}
.pv-jobs-group:last-of-type{border-bottom:1px solid rgba(20,18,56,.12)}
.pv-jobs-team{margin:0;font-family:var(--pv-jobs-mono, 'Roboto Mono', ui-monospace, monospace);font-size:.8125rem;font-weight:400;letter-spacing:.12em;text-transform:uppercase;color:#684a9e;padding-top:.375rem}
.pv-jobs-team span{margin-left:.5rem;color:rgba(20,18,56,.45)}
.pv-jobs-list{list-style:none;margin:0;padding:0}
.pv-jobs-list li + li{border-top:1px solid rgba(20,18,56,.08)}
.pv-job{display:grid;grid-template-columns:minmax(0,1fr) auto;align-items:center;gap:.5rem 2rem;padding:1.125rem 0;color:#141238;text-decoration:none}
.pv-job:first-child{padding-top:0}
.pv-job-title{font-size:clamp(1.125rem, 1rem + .4vw, 1.375rem);font-weight:300;line-height:1.3;letter-spacing:-.01em}
.pv-job-meta{grid-column:1;font-size:.875rem;color:rgba(20,18,56,.6)}
.pv-job-go{grid-column:2;grid-row:1 / span 2;font-size:.9375rem;white-space:nowrap;transition:transform .3s cubic-bezier(.2,.7,.2,1)}
.pv-job:hover .pv-job-title{text-decoration:underline;text-underline-offset:.2em;text-decoration-thickness:1px}
.pv-job:hover .pv-job-go{transform:translateX(3px)}
.pv-job:focus-visible{outline:2px solid #141238;outline-offset:4px;border-radius:4px}
.pv-jobs-note{margin:0;font-size:1.0625rem;line-height:1.6;color:#4a4868}
.pv-jobs-note a{color:#141238}
@media (max-width:767px){.pv-jobs-group{grid-template-columns:1fr;gap:1rem;padding:2rem 0}.pv-job-go{display:none}}
@media (prefers-reduced-motion:reduce){.pv-job-go,.pv-jobs-filters button{transition:none}}`;

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
          if (j.office) a.appendChild(el('span', 'pv-job-meta', j.office));
          a.appendChild(el('span', 'pv-job-go', T.apply + ' →'));
          li.appendChild(a); ul.appendChild(li);
        });
        sec.append(h, ul); list.appendChild(sec);
      });
    }
    draw();
  }

  return { destroy() { ctrl.abort(); root.replaceChildren(); delete root.dataset.pvInit; } };
}
