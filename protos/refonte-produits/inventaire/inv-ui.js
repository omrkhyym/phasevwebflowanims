// Inventaire : décisions (garder, fusionner, virer) communes aux deux pages, gardées dans le navigateur et exportables.
const KEY = 'pv-inv-decisions';
export const CHOICES = [['keep', 'Garder'], ['merge', 'Fusionner'], ['apart', 'Laisser séparés'], ['drop', 'Virer'], ['ask', 'À revoir']];
const LABEL = Object.fromEntries(CHOICES);

export function load() { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } }
function save(d) { try { localStorage.setItem(KEY, JSON.stringify(d)); } catch (e) { /* stockage indisponible */ } }

// Boutons de décision et note pour un élément ; `what` décrit l'élément dans l'export.
// `keys` : les choix proposés (par défaut garder, fusionner, virer, à revoir).
export function decisionUI(id, what, onChange, keys = ['keep', 'merge', 'drop', 'ask']) {
  const box = document.createElement('div');
  box.className = 'iv-dec';
  const cur = load()[id] || {};
  const btns = keys.map(k => [k, LABEL[k]]).map(([k, l]) => {
    const b = document.createElement('button');
    b.type = 'button'; b.textContent = l; b.dataset.k = k;
    b.setAttribute('aria-pressed', cur.d === k);
    b.addEventListener('click', () => {
      const all = load(), e = all[id] || {};
      e.d = e.d === k ? undefined : k; e.what = what;
      all[id] = e; save(all);
      btns.forEach(x => x.setAttribute('aria-pressed', x.dataset.k === e.d));
      box.dataset.d = e.d || '';
      onChange && onChange();
    });
    return b;
  });
  const row = document.createElement('div'); row.className = 'iv-dec-row'; row.append(...btns);
  const note = document.createElement('textarea');
  note.rows = 1; note.placeholder = 'Note (avec quel bloc fusionner, pourquoi…)'; note.value = cur.note || '';
  note.addEventListener('input', () => { const all = load(), e = all[id] || {}; e.note = note.value; e.what = what; all[id] = e; save(all); });
  box.dataset.d = cur.d || '';
  box.append(row, note);
  return box;
}

export function exportMd() {
  const all = load(), lines = ['# Décisions inventaire', ''];
  CHOICES.forEach(([k, l]) => {
    const ids = Object.keys(all).filter(id => all[id].d === k).sort();
    if (!ids.length) return;
    lines.push('## ' + l, '');
    ids.forEach(id => lines.push(`- **${id}** ${all[id].what || ''}${all[id].note ? ' : ' + all[id].note : ''}`));
    lines.push('');
  });
  const notes = Object.keys(all).filter(id => !all[id].d && all[id].note);
  if (notes.length) { lines.push('## Notes sans décision', ''); notes.forEach(id => lines.push(`- **${id}** ${all[id].what || ''} : ${all[id].note}`)); }
  return lines.join('\n');
}

export function exportButton(btn) {
  btn.addEventListener('click', async () => {
    const md = exportMd();
    try { await navigator.clipboard.writeText(md); btn.textContent = 'Copié'; }
    catch (e) { const w = window.open('', '_blank'); if (w) { w.document.body.innerText = md; } }
    setTimeout(() => { btn.textContent = 'Copier mes choix'; }, 1600);
  });
}
