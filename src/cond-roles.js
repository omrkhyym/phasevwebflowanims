/* Scènes d'AI Conductor (cond-*.js) et de BonV (bonv-*.js) : le texte des scènes est saisi dans Webflow, dans les enfants
   [data-role] du montage (listes et paragraphes), lus par les modules. Ces enfants restent lisibles par les lecteurs d'écran
   mais sont masqués à l'œil : le canvas les dessine. En tablette et mobile, le panneau sombre des étapes prend toute la largeur. */
const CSS = `:is([data-pv^="cond-"], [data-pv^="bonv-"]) > [data-role]{position:absolute;width:1px;height:1px;margin:0;padding:0;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
.feature-grid > .video-animation:has(> :is([data-pv^="cond-"], [data-pv^="bonv-"])){width:100%;align-self:stretch}`;

export function injectCondRoles() {
  if (document.getElementById('pv-cond-roles')) return;
  const s = document.createElement('style'); s.id = 'pv-cond-roles'; s.textContent = CSS; document.head.appendChild(s);
}
