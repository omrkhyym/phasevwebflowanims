/* Atelier du hero Home : interface (choix de la scène, barre de temps, réglages, valeurs à copier).
   Les réglages de chaque scène sont gardés dans le navigateur ; « Copier les valeurs » donne le JSON à me transmettre. */
import { createEngine, COMMON } from './engine.js';
import blob from './scenes/blob.js';
import plane from './scenes/plane.js';
import land from './scenes/land.js';
import evap from './scenes/evap.js';
import sequence from './scenes/sequence.js';

// les scènes de la séquence ; celles sans module sont à venir
const SCENES = [
  blob,
  plane,
  land,
  evap,
];

const $ = s => document.querySelector(s);
const canvas = $('#stage'), engine = createEngine(canvas);
const store = {
  get(k) { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* stockage indisponible */ } },
};

let scene = null, values = {}, time = 0, playing = true, loop = true, speed = 1;

// séquence complète : les scènes figées bout à bout ; chacune s'arrête là où la suivante prend le relais
let seqMode = false, SEQ = null;
function buildSequence() {
  const list = SCENES.filter(s => s.glsl && s.inSequence !== false), segs = []; let at = 0;
  list.forEach((sc, i) => {
    const next = list[i + 1], end = next && next.startsAt != null ? next.startsAt : sc.duration;
    segs.push({ sc, at, end, v: defaults(sc) }); at += end;
  });
  return { segs, duration: at };
}

function defaults(sc) {
  const v = {};
  Object.entries(COMMON).forEach(([k, d]) => { v[k] = sc.camera && k in sc.camera ? sc.camera[k] : d.value; });
  Object.entries(sc.params).forEach(([k, d]) => { v[k] = d.value; });
  return v;
}

function selectScene(sc) {
  seqMode = false; document.body.classList.remove('is-seq');
  scene = sc;
  values = Object.assign(defaults(sc), store.get('pv-hero-lab-' + sc.id) || {});
  // une scène qui prend la suite d'une autre hérite de sa caméra de départ : ces réglages sont verrouillés
  (sc.locked || []).forEach(k => { values[k] = defaults(sc)[k]; });
  engine.useScene(sc);
  time = 0;
  $('#time').max = sc.duration;
  document.querySelectorAll('.lab-scene').forEach(b => b.setAttribute('aria-pressed', b.dataset.id === sc.id));
  $('#seq').setAttribute('aria-pressed', false);
  buildControls();
  store.set('pv-hero-lab-current', sc.id);
}

function control(key, d, group) {
  const row = document.createElement('label'); row.className = 'lab-row';
  const head = document.createElement('span'); head.className = 'lab-row-head';
  const name = document.createElement('span'); name.textContent = d.label;
  const out = document.createElement('output');
  const input = document.createElement('input');
  input.type = 'range'; input.min = d.min; input.max = d.max; input.step = d.step; input.value = values[key];
  if ((scene.locked || []).includes(key)) {
    input.disabled = true; row.classList.add('is-locked');
    const note = document.createElement('span'); note.className = 'lab-row-note'; note.textContent = 'reprise de la scène précédente';
    row.append(note);
  }
  const fmt = v => (d.step >= 1 ? Math.round(v).toLocaleString('fr-FR') : (+v).toFixed(d.step < .01 ? 3 : 2));
  out.textContent = fmt(values[key]);
  input.addEventListener('input', () => {
    values[key] = +input.value; out.textContent = fmt(input.value);
    store.set('pv-hero-lab-' + scene.id, values);
    if (!playing) draw();
  });
  head.append(name, out); row.prepend(head); row.insertBefore(input, row.querySelector('.lab-row-note')); group.append(row);
}

function buildControls() {
  const box = $('#controls'); box.textContent = '';
  const add = (title, defs) => {
    const sec = document.createElement('section'); sec.className = 'lab-group';
    const h = document.createElement('h3'); h.textContent = title; sec.append(h);
    Object.entries(defs).forEach(([k, d]) => control(k, d, sec));
    box.append(sec);
  };
  add(scene.name, scene.params);
  add('Caméra et rendu', COMMON);
}

function selectSequence() {
  SEQ = SEQ || buildSequence();
  seqMode = true; document.body.classList.add('is-seq');
  time = 0; $('#time').max = SEQ.duration;
  document.querySelectorAll('.lab-scene').forEach(b => b.setAttribute('aria-pressed', false));
  $('#seq').setAttribute('aria-pressed', true);
  const box = $('#controls'); box.textContent = '';
  const sec = document.createElement('section'); sec.className = 'lab-group';
  const h = document.createElement('h3'); h.textContent = 'Séquence complète (valeurs figées)'; sec.append(h);
  SEQ.segs.forEach(s => {
    const row = document.createElement('p'); row.className = 'lab-seg'; row.dataset.id = s.sc.id;
    row.textContent = s.sc.name + '  ·  ' + s.at.toFixed(2) + ' → ' + (s.at + s.end).toFixed(2) + ' s';
    sec.append(row);
  });
  box.append(sec);
  store.set('pv-hero-lab-current', 'seq');
}

function drawSequence() {
  const s = SEQ.segs.find(x => time < x.at + x.end) || SEQ.segs[SEQ.segs.length - 1];
  const t = Math.min(time - s.at, s.end);
  // un seul programme pour toute la séquence (aucun raccord entre programmes) ; la caméra suit la scène en cours
  engine.useScene(sequence);
  const v = s.sc.cameraAt ? { ...s.v, ...s.sc.cameraAt(t, s.v) } : s.v;
  engine.render(time, v, s.v.count ?? 60000);
  document.querySelectorAll('.lab-seg').forEach(r => r.classList.toggle('is-on', r.dataset.id === s.sc.id));
  $('#time').value = time;
  $('#clock').textContent = time.toFixed(2) + ' s';
}

function draw() {
  if (seqMode) { drawSequence(); return; }
  engine.useScene(scene);
  // une scène peut faire bouger la caméra au fil du temps (zoom…)
  const v = scene.cameraAt ? { ...values, ...scene.cameraAt(time, values) } : values;
  engine.render(time, v, values.count ?? 60000);
  $('#time').value = time;
  $('#clock').textContent = time.toFixed(2) + ' s';
}

let last = performance.now();
function frame(now) {
  requestAnimationFrame(frame);
  const dt = Math.min((now - last) / 1000, .05); last = now;
  if (playing && scene) {
    const dur = seqMode ? SEQ.duration : scene.duration;
    time += dt * speed;
    if (time > dur) { if (loop) time = 0; else { time = dur; setPlaying(false); } }
  }
  if (scene) draw();
}

function setPlaying(p) { playing = p; $('#play').textContent = p ? 'Pause' : 'Lecture'; $('#play').setAttribute('aria-pressed', p); }

// toutes les scènes sont préparées au chargement : aucun gel au premier passage d'une scène à l'autre
[...SCENES.filter(s => s.glsl), sequence].forEach(s => { try { engine.useScene(s); } catch (e) { console.error(s.id, e); } });

// la séquence complète, puis la liste des scènes
{
  const b = document.createElement('button');
  b.type = 'button'; b.className = 'lab-scene lab-seq'; b.id = 'seq'; b.textContent = 'Séquence complète';
  b.addEventListener('click', selectSequence);
  $('#scenes').append(b);
}
SCENES.forEach(sc => {
  const b = document.createElement('button');
  b.type = 'button'; b.className = 'lab-scene'; b.dataset.id = sc.id; b.textContent = sc.name;
  if (!sc.glsl) { b.disabled = true; b.title = 'À venir'; }
  else b.addEventListener('click', () => selectScene(sc));
  $('#scenes').append(b);
});

$('#play').addEventListener('click', () => setPlaying(!playing));
$('#loop').addEventListener('change', e => { loop = e.target.checked; });
$('#speed').addEventListener('change', e => { speed = +e.target.value; });
$('#time').addEventListener('input', e => { time = +e.target.value; setPlaying(false); draw(); });
$('#reset').addEventListener('click', () => { values = defaults(scene); store.set('pv-hero-lab-' + scene.id, null); buildControls(); draw(); });
$('#copy').addEventListener('click', async () => {
  const txt = JSON.stringify({ scene: scene.id, values }, (k, v) => typeof v === 'number' ? +v.toFixed(3) : v, 2);
  try { await navigator.clipboard.writeText(txt); $('#copy').textContent = 'Copié'; }
  catch (e) { $('#dump').hidden = false; $('#dump').value = txt; }
  setTimeout(() => { $('#copy').textContent = 'Copier les valeurs'; }, 1500);
});
$('#text').addEventListener('change', e => { document.body.classList.toggle('show-text', e.target.checked); });
addEventListener('keydown', e => { if (e.code === 'Space' && e.target === document.body) { e.preventDefault(); setPlaying(!playing); } });

// si la carte graphique décroche (densité trop forte), on le dit au lieu d'afficher un cadre vide
canvas.addEventListener('webglcontextlost', e => {
  e.preventDefault();
  const m = document.createElement('p'); m.className = 'lab-lost';
  m.textContent = 'Le rendu WebGL a décroché. Baisse la densité, puis recharge la page.';
  canvas.after(m);
});

new ResizeObserver(() => { engine.resize(); if (!playing && scene) draw(); }).observe(canvas);
engine.resize();
const current = store.get('pv-hero-lab-current');
selectScene(SCENES.find(s => s.id === current && s.glsl) || blob);
if (current === 'seq') selectSequence();
setPlaying(true);
requestAnimationFrame(frame);
