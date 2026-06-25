# Guide de rédaction — Un pas après l'autre

Bienvenue ! Ce guide t'explique **comment rédiger un article** pour le blog et le
mettre en forme correctement. Pas besoin d'être développeuse : tu écris ton texte
dans un simple fichier `.md` (Markdown), tu prépares tes photos, puis tu me
transmets le tout. Je m'occupe ensuite de la mise en ligne.

> En résumé : **tu rédiges → tu me transmets le fichier + les photos → je publie.**

---

## 1. Le principe en 3 minutes

Un article = **un seul fichier texte** qui se termine par `.md`.

Ce fichier contient deux parties :

1. **La « fiche d'identité »** de l'article tout en haut (titre, date, etc.),
   encadrée par deux lignes `---`. On appelle ça le *frontmatter*.
2. **Le texte de l'article** en dessous, écrit en **Markdown** (une façon simple
   de mettre en forme du texte avec quelques symboles).

Tu peux écrire tout ça dans n'importe quel éditeur de texte. Les plus pratiques
et gratuits :

- **Obsidian**, le meilleur choix ;
- **VS Code**, plus pour les devs, mais fonctionne très bien ;
- ou même le **Bloc-notes** / **TextEdit** en mode « texte brut ».

> ⚠️ N'utilise **pas** Word : il ajoute des mises en forme invisibles qui cassent
> le fichier. Il faut du **texte brut**.

---

## 2. La fiche d'identité (frontmatter)

C'est le bloc tout en haut du fichier, **toujours** encadré par `---`. Recopie ce
modèle et remplis les valeurs :

```markdown
---
title: "Traversée de Madère en autonomie : notre itinéraire en 7 étapes"
date: 2026-06-15
tags: [trek, itinéraire, bivouac]
country: Portugal
region: Madère
coverImage: /content/images/cover-itineraire-madeira.jpg
slug: madere-autonomie-7-etapes
author: Lulu
excerpt: "Récit de notre traversée intégrale de Madère en totale autonomie : étapes, lieux de campement et conseils."
---
```

Voici à quoi sert chaque ligne :

| Champ         | Obligatoire ? | À quoi ça sert                                                                                   |
| ------------- | :-----------: | ----------------------------------------------------------------------------------------------- |
| `title`       |      Oui      | Le titre affiché en haut de l'article et dans Google. **Entre guillemets.**                     |
| `date`        |      Oui      | Date de publication, au format `AAAA-MM-JJ` (ex. `2026-06-15`).                                  |
| `tags`        |   Conseillé   | Mots-clés entre crochets, séparés par des virgules. Ex. `[trek, alimentation, bivouac]`.        |
| `coverImage`  |   Conseillé   | La photo de couverture (voir la section Photos). Commence toujours par `/content/images/`.      |
| `country`     |   Optionnel   | Le pays, si l'article parle d'une destination.                                                   |
| `region`      |   Optionnel   | La région ou l'île.                                                                              |
| `slug`        |   Conseillé   | L'adresse de l'article dans le navigateur (que des minuscules, des tirets, pas d'accent).       |
| `author`      |      Oui      | Ton prénom (`Lulu` ou `Tim`).                                                                    |
| `excerpt`     |   Conseillé   | Un résumé de 1 à 2 phrases affiché dans la liste des articles et sur Google. **Entre guillemets.** |

### Quelques règles à respecter

- Les `---` du début et de fin sont **indispensables**.
- Garde bien le format `champ: valeur` (un espace après les deux-points).
- Pour `title` et `excerpt`, mets toujours le texte **entre guillemets droits**
  `"..."`.
- Le `slug` ne doit contenir **que** des lettres minuscules, des chiffres et des
  tirets. Pas d'espace, pas d'accent, pas de majuscule.
  Exemple : `traversee-corse-gr20` ✅ — `Traversée Corse !` ❌
- Pas besoin de remplir le « temps de lecture » : il est calculé automatiquement.

---

## 3. Écrire le texte (Markdown)

En dessous du dernier `---`, tu écris ton article. Voici tout ce dont tu as
besoin :

### Les titres

Le nombre de `#` indique le niveau du titre (comme des sous-parties) :

```markdown
# Grand titre principal
## Titre de section
### Sous-titre
#### Petit sous-titre
```

> Garde une logique claire : `##` pour les grandes parties, `###` pour les
> sous-parties à l'intérieur. Ces titres alimentent automatiquement le **sommaire**
> de l'article.

### Le texte

Écris simplement tes paragraphes. **Laisse une ligne vide entre deux paragraphes**
pour bien les séparer :

```markdown
Premier paragraphe de mon récit.

Deuxième paragraphe, après une ligne vide.
```

### Mettre en forme

```markdown
**texte en gras**
*texte en italique*
[un lien vers un site](https://exemple.com)
```

### Les listes

```markdown
- premier élément
- deuxième élément
- troisième élément
```

Ou une liste numérotée :

```markdown
1. première étape
2. deuxième étape
3. troisième étape
```

### Les tableaux

Très utile pour les récapitulatifs d'étape. Les `:` indiquent l'alignement
(centré ici) :

```markdown
| **Critère**      | **Valeur**              |
|:----------------:|:-----------------------:|
| Départ           | Phare de Ponta do Pargo |
| Arrivée          | Fonte do Bispo          |
| Distance         | 11,1 km                 |
| Dénivelé positif | ~1000 m                 |
```

### Une citation

```markdown
> Le texte mis en avant, comme une citation.
```

---

## 4. Les blocs spéciaux du blog

Le blog a trois « blocs » maison pour enrichir tes articles. Ils s'écrivent tous
entre deux lignes de trois accents graves ```` ``` ````. **Recopie exactement la
forme ci-dessous** (le mot juste après les accents est important).

### 🗺️ Une carte avec trace GPX

Affiche une carte interactive + le profil de dénivelé + un bouton de
téléchargement. Donne-moi le fichier `.gpx` et indique son nom :

````markdown
```gpx
src: /content/tracks/madeira_1.gpx
title: Étape 1 — Ponta do Pargo › Fonte do Bispo
```
````

- `src` : le chemin du fichier GPX (commence toujours par `/content/tracks/`).
- `title` : la légende affichée au-dessus de la carte (optionnel).

> Transmets-moi simplement tes fichiers `.gpx` avec le reste, je les range au bon
> endroit.

### 📸 Une galerie de photos

Affiche plusieurs photos joliment disposées :

````markdown
```photos
layout: 3
- /content/images/madeira_001.jpg | Vue depuis le phare de Ponta do Pargo
- /content/images/madeira_002.jpg | Landes avec vue sur la mer
- /content/images/madeira_003.jpg | Un bivouac en bonne compagnie
```
````

- `layout` : le nombre de photos par ligne — `1`, `2` ou `3`.
- Chaque photo est une ligne qui commence par `- `, suivie du chemin de l'image,
  puis (optionnel) d'une **barre verticale `|` et de la légende**.
- Tu peux ajouter `maxHeight: 500px` sous `layout` pour limiter la hauteur des
  photos (pratique pour une seule grande photo) :

````markdown
```photos
layout: 1
maxHeight: 500px
- /content/images/madeira_006.jpg | Arrivée sur les hauteurs de Ribeira da Janela
```
````

### 💡 Un encadré « astuce »

Pour mettre en avant un conseil pratique :

````markdown
```tip
title: Pensez à votre frontale
Plusieurs tunnels jalonnent l'itinéraire : une lampe frontale est indispensable.
```
````

- `title` : le titre de l'encadré (optionnel).
- En dessous, ton texte. Tu peux utiliser des puces avec `•` ou `-`.

---

## 5. Les photos : ce que je dois recevoir

Les photos ne se collent pas dans le fichier `.md`. Tu me les transmets **à part**,
et dans le texte tu écris seulement leur **chemin**, qui commence toujours par
`/content/images/`.

### Comment nommer tes photos

Pour que je m'y retrouve, utilise un nom simple et logique, par exemple :

```
madere_001.jpg
madere_002.jpg
madere_003.jpg
```

ou bien lié au thème de l'article :

```
gr20-etape-1.jpg
gr20-bivouac.jpg
```

### Règles pour les photos

- Format **`.jpg`** de préférence (ou `.png` pour la couverture si besoin).
- Que des **minuscules**, des chiffres, des tirets ou underscores : **pas
  d'espace ni d'accent** dans le nom de fichier.
- Pense à les **redimensionner** si elles sont énormes (une largeur de
  ~2000 px est largement suffisante pour le web ; ça accélère le chargement).
- Prévois une **photo de couverture** (`coverImage`) au format paysage.

Dans le texte, tu y fais référence ainsi (le nom doit correspondre **exactement**
au fichier que tu m'envoies) :

```markdown
/content/images/madere_001.jpg
```

---

## 6. Modèle prêt à l'emploi

Crée un nouveau fichier `.md`, copie-colle ce squelette, puis remplis-le :

````markdown
---
title: "Le titre de mon article"
date: 2026-07-01
tags: [trek, itinéraire]
country: France
region: Corse
coverImage: /content/images/cover-mon-article.jpg
slug: mon-article
author: Lulu
excerpt: "Un résumé court et accrocheur en une ou deux phrases."
---

# Le titre de mon article

Quelques phrases d'introduction pour donner envie de lire la suite.

## Introduction

Le contexte, le pourquoi de l'aventure…

## Étape 1 : de X à Y

### Trace GPX

```gpx
src: /content/tracks/mon-fichier.gpx
title: Étape 1 — X › Y
```

### Récit de l'étape

Ton récit ici, en plusieurs paragraphes séparés par des lignes vides.

```photos
layout: 2
- /content/images/mon-article_001.jpg | Une légende
- /content/images/mon-article_002.jpg | Une autre légende
```

```tip
title: Bon à savoir
Un conseil pratique pour les futurs randonneurs.
```

### Informations pratiques

| **Critère**      | **Valeur** |
|:----------------:|:----------:|
| Départ           | X          |
| Arrivée          | Y          |
| Distance         | 12 km      |
| Dénivelé positif | ~800 m     |

## Conclusion

Le mot de la fin.
````

---

## 7. Quand tu as fini : me transmettre l'article

Pour que je puisse publier, envoie-moi **dans un même dossier ou une archive** :

1. **Le fichier `.md`** de ton article.
2. **Toutes les photos** citées dedans (avec les noms exacts).
3. Les éventuels **fichiers `.gpx`** des traces.

Je m'occupe de tout déposer au bon endroit et de mettre l'article en ligne. Le
site se met à jour automatiquement après la publication. 🎉

---

## Aide-mémoire express

| Je veux…                     | J'écris…                                                            |
| ---------------------------- | ------------------------------------------------------------------ |
| Un titre de section          | `## Mon titre`                                                      |
| Mettre en gras               | `**mon texte**`                                                     |
| Mettre en italique           | `*mon texte*`                                                       |
| Une liste                    | `- élément` (un par ligne)                                          |
| Un lien                      | `[texte du lien](https://...)`                                     |
| Une carte GPX                | bloc ```` ```gpx ```` avec `src: /content/tracks/...`             |
| Une galerie photo            | bloc ```` ```photos ```` avec `layout:` et des lignes `- ...`     |
| Un encadré conseil           | bloc ```` ```tip ````                                              |

Bonne rédaction ! En cas de doute, inspire-toi des articles déjà publiés dans le
dossier `content/articles/`. 🥾
