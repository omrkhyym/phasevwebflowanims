/* Utilitaires partagés par les textures du line field (repris du proto 7). */

export const cl = (v, a, b) => Math.max(a, Math.min(b, v));
export const rnd = (a, b) => a + (b - a) * Math.random();
export const sq = v => v * v;
export const outExpo = v => v >= 1 ? 1 : 1 - Math.pow(2, -10 * v);
export const gauss = () => Math.sqrt(-2 * Math.log(Math.random() + 1e-9)) * Math.cos(6.2832 * Math.random());

/* Pas de jaune dans les textures : il reste réservé au moment de décision. */
export const COL = { mau: '146,138,205', blu: '120,168,224', tea: '127,232,207' };
