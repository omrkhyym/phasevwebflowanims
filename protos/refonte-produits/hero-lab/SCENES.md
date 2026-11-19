# Hero Home : fiche des scènes

Atelier : `hero-lab/index.html` (http://localhost:5173/protos/refonte-produits/hero-lab/).
Séquence complète : bouton en tête de liste dans l'atelier ; enchaîne les scènes figées, chacune s'arrête là où la suivante prend le relais.
Décalage à droite : 0.3 sur toute la séquence (blob compris, ajout du 2026-11-16). Il se règle dans la scène 1 et passe aux suivantes.
Rythme (révision du 2026-11-16, séquence ≈ 26.75 s) : blob 4.5 s, délitement et plan 8 s, dézoom 5.25 s, orbite 4 s, retour 5 s.
- Blob : part à 60 % de sa taille, grandit et se déforme en 3 s ; caméra 2.6 → 1.9 en 4.5 s.
- L'explosion est retirée de la séquence (« ça fait cheap ») ; remplacée par le délitement, en réglage : le blob perd ses particules une à une, elles flottent et descendent composer le plan, du centre vers les bords. L'onde d'impact disparaît ; les vagues gardent leurs valeurs.
- Dézoom → orbite : même sens de rotation, sans arrêt (vitesse 0.165 passée à l'orbite). Retour au blob : même sens, ralentit jusqu'à l'arrêt ; caméra 1 s + 4 s.
- Saut dézoom → orbite : la cause était le tirage des montagnes, passé en constante dans l'orbite (le compilateur recalcule alors le hasard autrement et les sommets bougent). Correctif : dézoom et orbite réunis en une seule scène (« 3. Dézoom, montagnes, orbite », mêmes valeurs, sans la respiration des montagnes) ; le retour au blob reprend la scène 3 avec le tirage en variable.
- Blob, en réglage : le noyau, sphère parfaite au centre qui ne se déforme jamais (taille 0.2 du blob, 10 % des particules, contour 0.03, luminosité 1.8, rotation propre 0.15). Au délitement, il se délite comme le reste.
- Saut à 21.75 (montagnes → retour) : même cause. Correctif définitif : la séquence complète tourne dans UN SEUL programme (scenes/sequence.js) ; le paysage y est calculé une seule fois pour la fin des montagnes et le retour au blob. Les scènes séparées restent pour les réglages.
- Atelier : toutes les scènes sont préparées au chargement (le « saut » bref entre dézoom et orbite était un gel de préparation au premier passage).
Validée le 2026-11-16 avec la Home : le délitement et le noyau tournent avec leurs valeurs de départ (voir scenes/plane.js et scenes/blob.js), figées en l'état.
Méthode : une scène à la fois. Une scène validée est **figée** : ses valeurs sont notées ici et on n'y touche plus. Les transitions viennent ensuite, une par une. La Home ne reçoit la séquence qu'à la fin.

| # | Scène | Intention | Référence | État |
|---|---|---|---|---|
| 1 | Blob | Une masse de particules organique, qui bouge et se déforme sur elle-même. Rien de mécanique, rien qui imite un cœur. | réglée dans l'atelier | **figée** (2026-11-16) |
| 2 | Explosion | Le blob explose, les particules sortent par les bords et les coins du cadre, à pleine intensité. | réglée dans l'atelier | **figée** (2026-11-16) |
| 3 | Plan | Les particules reviennent former un plan qui couvre presque tout l'écran ; onde d'impact depuis le centre, puis vagues fluides. | réglée dans l'atelier | **figée** (2026-11-16) |
| 4 | Dézoom, montagnes | La caméra recule, le plan rétrécit, 4 ou 5 montagnes au relief marqué se forment. Le paysage finit décalé vers la droite. | réglée dans l'atelier | **figée** (2026-11-16) |
| 5 | Orbite | La caméra tourne doucement autour du paysage. | réglée dans l'atelier | **figée** (2026-11-16) |
| 6 | Retour au blob | Les sommets s'évaporent vers le haut et se rassemblent en blob ; la caméra revient à la vue du blob ; la boucle repart. | réglée dans l'atelier | **figée** (2026-11-16) |

## Valeurs validées

### 1. Blob (figée le 2026-11-16)

| Réglage | Valeur | Réglage | Valeur |
|---|---|---|---|
| Distance caméra | 2.3 | Densité | 50 000 |
| Inclinaison | -0.1 | Rayon | 0.36 |
| Rotation | 0 | Déformation | 0.27 |
| Échelle | 1 | Finesse des bosses | 0.48 |
| Taille des points | 0.89 | Torsion organique | 0 |
| Luminosité | 1 | Vitesse de déformation | 1.01 |
| Flou de profondeur | 0.88 | Rotation sur lui-même | -0.74 |
| Zone nette | 0.41 | Volume | 0.49 |
| | | Épaisseur du bord | 0.02 |
| | | Opacité par particule | 0.059 |
| | | Teinte | 0.41 |
| | | Part de bleu | 0.11 |

Ajout figé : le blob part lisse, la déformation monte en 6 s ; la caméra avance de 2.3 à 1.9 en 12 s (courbe douce). Durée de la scène : 12 s.

### 2. Explosion (figée le 2026-11-16)

Durée de la scène : 5 s. Part du blob figé, repris 1,5 s avant la fin de sa scène. Caméra identique au blob à la fin de son zoom (distance 1.9, inclinaison -0.1, taille 0.89, flou 0.88, zone nette 0.41).

| Réglage | Valeur | Réglage | Valeur |
|---|---|---|---|
| Moment de l'explosion | 0.65 s | Vers les coins | 0 |
| Contraction avant | 0.07 | Écart des vitesses | 0.65 |
| Durée de la contraction | 0.4 s | Traînée | 0 |
| Puissance | 2.35 | Tourbillon | 0 |
| Accélération | 0.4 | Part qui passe devant la caméra | 0.6 |
| Densité | 50 000 | Opacité en vol | 0.74 |

### 3. Plan (figée le 2026-11-16)

Durée de la scène : 9 s. Reprend l'explosion figée 1 s avant la fin de sa scène. Caméra de départ identique à la fin de l'explosion (distance 1.9, rotation 0 ; les valeurs 1.83 et 0.48 collées étaient une erreur de manipulation). Dans l'atelier, la caméra de départ des scènes enchaînées est désormais verrouillée.

| Réglage | Valeur | Réglage | Valeur |
|---|---|---|---|
| Retour : début | 0.3 s | Onde : moment | 1.85 s |
| Retour : durée | 1.8 s | Onde : amplitude | 0.035 |
| Retour : étalement | 0.85 s | Onde : vitesse | 1.1 |
| Retour : ordre | 1 (du centre vers les bords) | Onde : longueur d'onde | 0.57 |
| Retour : distance d'origine | 6.2 | Onde : amortissement | 0.25 |
| Plan : largeur | 2.2 | Vagues : amplitude | 0.035 |
| Plan : profondeur / largeur | 0.8 | Vagues : longueur d'onde | 1.4 |
| Plan : hauteur | -0.15 | Vagues : vitesse | 1.1 |
| Plan : semis / grille | 0 (semis) | Vagues : direction | 1.33 |
| Caméra d'arrivée : distance | 2.33 | Opacité par particule | 0.35 |
| Caméra d'arrivée : inclinaison | 0.29 | Crêtes plus lumineuses | 1 |
| Caméra d'arrivée : rotation | 0.41 | Turquoise sur les crêtes | 0.5 |
| Caméra : durée du passage | 2.5 s | Densité | 50 000 |

### 4. Dézoom, montagnes (figée le 2026-11-16)

Durée de la scène : 8 s. Reprend le plan figé à la fin de sa scène. Caméra et rendu de départ hérités du plan ; échelle 1 → 1.15 et taille des points 0.89 → 0.92 atteintes pendant le dézoom (sinon saut entre les scènes 3 et 4).

| Réglage | Valeur | Réglage | Valeur |
|---|---|---|---|
| Dézoom : début | 1.85 s | Montagnes : nombre | 5 |
| Dézoom : durée | 3.4 s | Montagnes : hauteur | 0.45 |
| Taille finale du paysage | 0.89 | Montagnes : forme | 0 (arrondies) |
| Caméra de fin : distance | 2.86 | Montagnes : largeur | 0.18 |
| Caméra de fin : inclinaison | 0.39 | Montagnes : écartement | 1.14 |
| Caméra de fin : rotation | 2.52 | Montagnes : tirage | 12 |
| Fin : échelle | 1.15 | Montée : début | 1.4 s |
| Fin : taille des points | 0.92 | Montée : durée | 2.7 s |
| Fin : décalage vers la droite | 0.3 | Montée : ordre | 0.42 |
| Vagues gardées | 0 | Sommets plus lumineux | 0.5 |
| Densité | 50 000 | Turquoise et blanc sur les crêtes | 0.37 |

Variété des montagnes, à la Guilin : écart des tailles 0.7, raideur des flancs 0.5, petits pics secondaires 6 (hauteur 0.35).

### 5. Orbite (figée le 2026-11-16)

Durée de la scène : 6 s (raccourcie le 2026-11-16). Reprend le paysage dès la fin du dézoom de la scène 4 (5.25 s) : les derniers pics montent encore quand la rotation part. Caméra et rendu hérités, décalage à droite 0.3. La rotation part de l'arrêt.

| Réglage | Valeur | Réglage | Valeur |
|---|---|---|---|
| Rotation : vitesse | -0.165 | Montagnes qui respirent | 0.17 |
| Rotation : mise en route | 2.4 s | Respiration des montagnes : vitesse | 0.9 |
| Balancement d'inclinaison | 0.01 | Reflet : intensité | 1.45 |
| Balancement : période | 11 s | Reflet : durée du passage | 10.5 s |
| Respiration de la distance | 0.05 | Reflet : largeur | 0.29 |
| Respiration : période | 12.5 s | Reflet : direction | 0.6 |

### 6. Retour au blob (figée le 2026-11-16)

Durée de la scène : 6 s. Reprend l'orbite à la fin de sa scène ; la dernière image est la première image du blob (la boucle repart sans saut). La caméra continue de tourner à la vitesse de l'orbite, puis revient à la vue du blob ; le retour est raccourci à 4.2 s pour être posé à la fin (1.8 + 4.5 dépasserait les 6 s).

| Réglage | Valeur | Réglage | Valeur |
|---|---|---|---|
| Évaporation : début | 0.3 s | Montée en arc | 0.34 |
| Évaporation : étalement | 1.9 s | Tourbillon | 2.17 |
| Évaporation : durée par particule | 2.5 s | Éclat pendant le trajet | 0.4 |
| Ordre (sommets d'abord) | 0.61 | Caméra : début du retour | 1.8 s |
| Densité | 50 000 | Caméra : durée du retour | 4.5 s (4.2 s appliquées) |
