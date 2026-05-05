---
title: "Faire jouer des IA au Loup-Garou : premiers résultats d’ArenAI"
description: "120 parties de Loup-Garou entre 4 modèles frontier, un nouveau jeu qui met les LLMs en échec, et ce que tout ça révèle sur l'intelligence sociale des IA."
date: 2026-05-05
tags: ["Intelligence artificielle", "ArenAI", "Side project"]
translationSlug: "making-ais-play-werewolf-arenai-first-results"
---

Dans le [premier article](https://plduhoux.fr/blog/arenai-genese), j'ai présenté ArenAI : une plateforme qui fait jouer des LLMs à des jeux de déduction sociale. L'objectif : mesurer leur intelligence sociale (mentir, détecter les menteurs, persuader, coordonner) en les confrontant les uns aux autres sans coaching stratégique. Depuis, j'ai joué 120 parties de Loup-Garou. Et j'ai essayé d'ajouter un nouveau jeu qui a mis tous les modèles en échec complet.

## 120 parties de Loup-Garou

Le setup : 7 joueurs (2 Loups-Garous, 1 Voyante, 1 Sorcière, 3 Villageois), élection du Maire, 2 rounds de discussion par jour. Quatre modèles frontier en round-robin : Claude Opus 4.6 (Anthropic), GPT-5.4 (OpenAI), Gemini 2.5 Pro (Google), Grok 4.20 (xAI). Chaque paire a joué 20 parties (10 de chaque côté). 120 parties au total, ~93k tokens par partie en moyenne.

### Le classement par rôle

Côté Loups-Garous (le rôle offensif : mentir, manipuler, coordonner les kills) :

| Modèle | Parties en Loup | Victoires | Taux |
|--------|----------------|-----------|------|
| GPT-5.4 | 30 | 22 | **73%** |
| Claude Opus 4.6 | 30 | 15 | **50%** |
| Gemini 2.5 Pro | 30 | 11 | **37%** |
| Grok 4.20 | 30 | 4 | **13%** |

Côté Villageois (le rôle défensif : détecter les menteurs, résister à la manipulation) :

| Modèle | Parties en Villageois | Victoires | Taux |
|--------|----------------------|-----------|------|
| GPT-5.4 | 30 | 22 | **73%** |
| Gemini 2.5 Pro | 30 | 19 | **63%** |
| Claude Opus 4.6 | 30 | 17 | **57%** |
| Grok 4.20 | 30 | 10 | **33%** |

### Les confrontations directes

| Villageois | Loups-Garous | Victoires Villageois | Victoires Loups |
|------------|-------------|--------|--------|
| Opus | GPT-5.4 | 2 | 8 |
| GPT-5.4 | Opus | 7 | 3 |
| Opus | Gemini | 7 | 3 |
| Gemini | Opus | 5 | 5 |
| Opus | Grok | 8 | 2 |
| Grok | Opus | 3 | 7 |
| GPT-5.4 | Gemini | 6 | 4 |
| Gemini | GPT-5.4 | 5 | 5 |
| GPT-5.4 | Grok | 9 | 1 |
| Grok | GPT-5.4 | 1 | 9 |
| Gemini | Grok | 9 | 1 |
| Grok | Gemini | 6 | 4 |

### Ce que ça donne

**GPT-5.4 est le meilleur menteur et le meilleur détective.** 73% de victoires des deux côtés. C'est le seul modèle qui domine à la fois en attaque et en défense. Quand il joue loup, il maintient une couverture sur plusieurs jours. Quand il joue villageois, il identifie les incohérences et résiste à la pression sociale.

**Claude Opus 4.6 est un bon second.** 50% en loup, 57% en villageois. Solide mais pas dominant. Il sait mentir ([cette partie](https://arenai.plduhoux.fr/game/69dc5328-84ab-436e-8bc3-32caf6103710) le montre bien), mais GPT le surpasse en manipulation soutenue.

**Gemini 2.5 Pro est un bon défenseur.** 63% en villageois, mais seulement 37% en loup. Il détecte bien les menteurs mais ne sait pas mentir lui-même. Profil "analyste rigoureux" : efficace pour déconstruire un argumentaire, moins pour en construire un faux.

**Grok 4.20 est en difficulté.** 13% en loup, 33% en villageois. Un profil offensif qui ne paye pas : très agressif dans ses accusations, mais transparent dans ses bluffs. Quand il est loup, son style "pression maximale" est lisible. Quand il est villageois, il se fait manipuler par les loups plus subtils.

### Modèles utilisés

ArenAI utilise volontairement les modèles récents de chaque provider : Claude Opus 4.6, GPT-5.4, Gemini 2.5 Pro, Grok 4.20. Dans l'idéal, quand un nouveau modèle sort, je relance les tests pour voir si les capacités sociales ont progressé. En pratique, on a déjà un peu de retard sur certaines versions et chaque campagne coûte cher : je ne vais donc pas rejouer 120 parties à chaque micro-release. L'objectif n'est pas de figer un classement mais de suivre l'évolution de l'intelligence sociale des LLMs au fil des versions importantes.

### Équilibre du jeu

Sur les 120 parties jouées, les Villageois gagnent 57% du temps et les Loups-Garous 43%. C'est un équilibre sain : les loups ont une vraie chance de gagner, mais le village garde un léger avantage structurel (plus de joueurs, rôles spéciaux). Le passage à 7 joueurs n'a pas déséquilibré le jeu en faveur du village : les loups restent compétitifs, et les parties se jouent sur la qualité de la manipulation, pas sur la mathématique du premier vote.

### Comparaison avec Foaster

[Foaster](https://werewolf.foaster.ai/) est l'étude qui a inspiré ArenAI. Leurs résultats placent GPT-5 clairement en tête, ce qui est cohérent avec les nôtres. Mais il y a des différences importantes dans le setup.

#### 6 joueurs vs 7 joueurs

Foaster joue à 6 joueurs, ArenAI à 7. C'est un choix délibéré.

A 6 joueurs (2 loups / 4 villageois), la marge d'erreur du village est nulle. Si les villageois éliminent un des leurs au Jour 1 (ce qui arrive souvent : on a peu d'information, le vote est presque aléatoire), la situation devient : 3 villageois, 2 loups. Les loups tuent la nuit : 2 villageois, 2 loups. Parité. Les loups gagnent. Autrement dit, une seule mauvaise décision au Jour 1 et la partie est mathématiquement perdue pour le village, avant même que le Jour 2 n'ait lieu. La Voyante n'a eu qu'une seule inspection utile, la Sorcière n'a pas eu le temps de collecter assez d'information pour utiliser son poison intelligemment, et les discussions du Jour 1 n'ont pas produit de signal exploitable parce que personne n'avait rien à analyser.

A 7 joueurs (2 loups / 5 villageois), une erreur au Jour 1 laisse le village à 4 contre 2. Les loups tuent la nuit : 3 contre 2. Le village a un deuxième jour pour corriger le tir. La Voyante a eu deux inspections. Les incohérences dans les discours des loups ont eu le temps de s'accumuler. Les votes du Jour 1 sont devenus des données exploitables au Jour 2 (qui a voté avec qui, qui a changé d'avis). C'est cette profondeur stratégique que je veux mesurer : la capacité à maintenir un mensonge sur plusieurs jours, pas la chance d'un premier vote quasi-aléatoire.

Et malgré cet avantage structurel supplémentaire pour le village, mes stats restent équilibrées : 57% de victoires villageoises contre 43% pour les loups. Le jeu n'est pas cassé, les loups ont une vraie chance, et les parties se jouent sur la qualité de la manipulation.

C'est une distinction importante avec le setup à 6 joueurs. A 6, on peut aussi observer un ratio proche du 50-50, mais pour de mauvaises raisons : les parties se décident souvent sur un seul vote quasi-aléatoire au Jour 1. Les loups gagnent quand le village se trompe au premier tour, les villageois gagnent quand ils devinent juste. C'est du bruit plus que du signal. Quand les loups gagnent à 7, c'est qu'ils ont effectivement réussi à maintenir leur couverture, à manipuler les votes, à coordonner leurs actions. Et quand le village gagne, c'est qu'il a accumulé des indices, recoupé des informations, construit un dossier. Les victoires sont méritées des deux côtés.

Je pense que ce format à 6 joueurs peut aussi fausser les classements. Un modèle qui est simplement meilleur pour éviter d'être éliminé au Jour 1 (par exemple en étant moins suspect par défaut, ou en parlant de façon plus neutre) verra ses stats gonflées, non pas parce qu'il manipule mieux, mais parce qu'il survit au tour critique. A l'inverse, un modèle qui développe des stratégies sophistiquées sur plusieurs jours n'a pas le temps de les déployer : la partie est déjà finie. Le format à 6 joueurs récompense la prudence court-termiste, pas l'intelligence sociale. **A 7, on mesure mieux ce qui m'intéresse vraiment : la capacité des modèles à mentir, enquêter et tenir une stratégie sur plusieurs jours.**

#### Rounds de discussion

Foaster utilise 3 rounds de discussion par jour, ArenAI en utilise 2. En pratique, l'impact est limité : on observe que le troisième round de discussion tourne en boucle. Les positions sont déjà figées, les arguments se répètent, les joueurs reformulent ce qui a déjà été dit. Deux rounds suffisent pour que les accusations soient posées, les défenses entendues et les conclusions tirées. L'ordre de parole diffère aussi : Foaster priorise par type (défense d'abord, puis attaque, puis analyse), ArenAI donne la priorité au Maire au round 1 et aux joueurs mentionnés au round 2.

#### Framing

Foaster utilise un framing d'agents avec des outils. ArenAI utilise un framing conversationnel pur : les modèles répondent en texte structuré (THOUGHT, MESSAGE, PICK) sans appel d'outils. C'est un choix de simplicité qui rend le benchmark plus portable.

#### Taille d'échantillon

Mes échantillons sont encore petits : 10 parties par confrontation (20 en comptant les deux sens), contre une taille similaire chez Foaster. Suffisant pour repérer des tendances, pas assez pour des conclusions définitives. Les résultats peuvent fluctuer sur un aussi petit échantillon.

### Comportements émergents

Foaster a documenté en détail plusieurs comportements stratégiques émergents chez les LLMs. On retrouve les mêmes dans nos parties.

**Le sacrifice du partenaire (bussing).** Un loup vote contre son propre coéquipier pour gagner en crédibilité. C'est exactement ce que fait Clara dans [cette partie Opus vs GPT](https://arenai.plduhoux.fr/game/69dc5328-84ab-436e-8bc3-32caf6103710) : elle vote contre David (son partenaire loup) pour maintenir sa couverture, en plantant des graines de doute pour le lendemain. Foaster observe le même comportement chez GPT-5 et Grok-4, avec des degrés de réussite variables.

**La contre-revendication du Voyant.** Quand le vrai Voyant accuse un loup, ce dernier prétend être le Voyant lui-même. Foaster documente un cas spectaculaire où Grok-4 retourne la situation contre GPT-OSS avec un bluff pur. On observe des tentatives similaires dans nos parties, avec plus ou moins de succès selon le modèle adverse.

**La sur-coordination comme tell.** Quand les deux loups défendent le même récit de façon trop synchronisée, les villageois analytiques repèrent le pattern. Foaster montre que Qwen3 est particulièrement bon pour identifier ces "boucles fermées" de votes. Dans mes parties, c'est un facteur important de la faiblesse de Grok-4 en loup (13% de victoires) : son style agressif et coordonné est lisible par Opus et GPT. Les modèles les plus récents détectent ce type de comportement immédiatement et n'y tombent pas eux-mêmes. C'est le même mécanisme qu'on retrouve dans Undercover : dès qu'un pattern sort du lot, le côté analytique des LLMs en fait une cible immédiate. Ils sont meilleurs pour détecter les anomalies que pour les produire.

**La manipulation procédurale.** Le comportement le plus subtil : un loup GPT-5 se fait élire Maire, adopte un style calme et structuré, et utilise sa position pour orienter les discussions. Foaster documente comment Grok-4 en villageois tombe systématiquement dans ce piège, confondant "parle de façon ordonnée" avec "est innocent". On observe exactement la même vulnérabilité dans nos parties : les modèles qui jouent "proprement" sont moins suspectés, indépendamment de leur rôle réel.

Quelques parties qui illustrent bien ces comportements :
- [Opus vs GPT-5 (Werewolf)](https://arenai.plduhoux.fr/game/69dc5328-84ab-436e-8bc3-32caf6103710) : bussing, coordination nocturne, la Voyante qui construit un dossier sans révéler son rôle
- [Gemini vs Opus (Werewolf)](https://arenai.plduhoux.fr/game/b3730b78-7215-4315-9dc8-3cd7d88b2c59) : victoire des loups en 2 rounds, les loups Opus atteignent la parité avant que le village ne puisse réagir

Toutes les parties sont consultables en intégralité sur [arenai.plduhoux.fr](https://arenai.plduhoux.fr/games), échange par échange, avec les pensées privées de chaque joueur. En cliquant sur un joueur en haut de la page, on accède à sa session complète : toutes les interactions qu'il a eues avec le maître du jeu, prompt par prompt, avec les informations dont il disposait à chaque instant. C'est ce niveau de détail qui permet d'analyser les stratégies en profondeur.

#### Convergences et divergences

Sur le fond, les deux études convergent : GPT-5 domine. **Mais mes résultats montrent que l'écart n'est pas un gouffre.** Opus à 50% en loup, Gemini à 63% en villageois : ces modèles sont compétitifs. Foaster présente GPT-5 comme "seul au sommet" ; mes données suggèrent plutôt un peloton de tête serré avec GPT-5 en premier, suivi de près par Opus et Gemini selon le rôle.

## Undercover : le jeu qui casse les LLMs

En parallèle du Loup-Garou, j'ai implémenté un nouveau jeu : **Undercover**. Et les résultats sont fascinants pour de mauvaises raisons.

### Les règles

Quatre joueurs reçoivent chacun un mot secret. Trois d'entre eux (les Civils) ont le même mot. Le quatrième (l'Undercover) a un mot similaire mais différent. Personne ne sait son rôle. Les paires de mots sont choisies pour un chevauchement sémantique maximal : Coffee/Tea, Beach/Pool, Guitar/Ukulele, Pillow/Blanket, Sock/Glove.

A chaque tour : chaque joueur donne un indice sur son mot (un mot ou une courte phrase), puis discussion, puis vote pour éliminer. Les Civils gagnent en éliminant l'Undercover. L'Undercover gagne s'il survit jusqu'aux 2 derniers joueurs.

C'est un jeu épuré. Pas de rôles spéciaux, pas de nuit, pas de canal privé. Juste des mots et de la déduction. Le test ultime de la subtilité.

### Une seule victoire de l'Undercover sur 20 parties

Sur 20 parties jouées avec différentes combinaisons de modèles (Opus, GPT-5.4, Sonnet), **l'Undercover n'a gagné qu'une seule fois** : une victoire d'Opus. Toutes les autres parties se sont soldées par une victoire des Civils, soit un taux de victoire de 95% pour les Civils.

Et ce n'est pas par manque d'intelligence analytique. Les modèles raisonnent correctement. Dans [cette partie Coffee/Tea](https://arenai.plduhoux.fr/game/a4cd962b-e92f-4373-a47e-3da39c523ba1), Alice (Opus, Undercover avec "Coffee") comprend assez vite que les Civils ont probablement "Tea". Son raisonnement interne après le premier vote :

> *"Given that Clara said \"Soothing\" and David said \"Relaxing\" - both of which fit \"Tea\" much better than \"Coffee\" - I'm now fairly confident I'm the Undercover with \"Coffee\" and the civilian word is \"Tea\"."*

Cette fois, Opus réussit : Alice donne ensuite "Herbal", un indice parfaitement aligné avec Tea, et gagne la partie. Mais la même partie montre aussi la fragilité du jeu : David, qui est Civil avec "Tea", donne "Caffeine" au round suivant. Ce n'est pas absurde : le thé peut contenir de la caféine. Mais c'est un indice trop méta, trop abstrait, qui garde en mémoire le chemin de raisonnement entre Coffee et Tea au lieu de se fondre naturellement dans le décor construit par "Soothing", "Relaxing", "Herbal" et "Steeped". Résultat : il se fait éliminer.

### Le problème structurel

Les LLMs ont trois faiblesses fondamentales dans ce jeu :

**La spécificité trahit.** A mesure que la partie avance, les Civils donnent des indices de plus en plus spécifiques à leur mot. L'Undercover, lui, ne peut donner que des indices qui marchent pour les deux mots (puisqu'il ne connaît pas le mot des Civils au début). Le pattern "toujours safe, jamais spécifique" devient détectable.

**L'honnêteté compulsive.** Même quand un modèle déduit qu'il est l'Undercover et identifie le mot des Civils, il continue souvent à donner des indices "corrects" pour son propre mot plutôt que de bluffer avec le mot des Civils. C'est le résultat le plus frappant : le diagnostic est bon, mais le passage à l'action échoue.

**L'effet meute en discussion.** Une fois qu'un Undercover est suspecté, les trois Civils convergent en quelques échanges. La discussion séquentielle crée un consensus qui s'auto-renforce et que l'Undercover ne peut pas briser seul.

### Le round 1 marche, le round 2 tue

L'Undercover s'en sort souvent au round 1. Quand il parle en dernier et entend les indices des Civils, il arrive à donner un indice qui se fond dans le groupe. Quelques exemples :

- **Guitar/Ukulele** : les Civils (Guitar) donnent "Strings", "Pick", "Strum". L'Undercover (Ukulele, GPT-5.4) donne "Chords". Ca passe, un Civil est éliminé à sa place.
- **Coffee/Tea** : les Civils (Tea) donnent "Warm drink", "Soothing", "Relaxing". L'Undercover (Coffee, Opus) donne "Morning". Ca passe, un Civil est éliminé.
- **Pillow/Blanket** : les Civils (Pillow) donnent "Bedtime", "Fluffy", "Case". L'Undercover (Blanket, Opus) donne "Soft". Ca passe, un Civil est éliminé.

Mais au round 2, le bluff casse souvent :

- **Guitar/Ukulele** : l'Undercover donne "Small". Repéré immédiatement.
- **Coffee/Tea** : exception intéressante, l'Undercover Opus réussit à pivoter avec "Herbal" et gagne. Mais David, Civil avec Tea, donne "Caffeine" et se fait éliminer : l'indice est trop abstrait par rapport au décor "Soothing" / "Relaxing" / "Herbal" / "Steeped".
- **Pillow/Blanket** : l'Undercover donne "Warmth". Repéré immédiatement.

Le pattern dominant : le modèle tient le bluff un tour, puis son réflexe de "décrire correctement son mot" reprend le dessus. Même quand le bluff réussit, comme dans Coffee/Tea, la partie se joue sur cette difficulté à produire un indice socialement naturel plutôt qu'un indice conceptuellement défendable.

### Les pistes d'amélioration

La prochaine étape est de tester l'ajout de stratégie explicite dans le prompt. Aujourd'hui, les modèles ne reçoivent aucun conseil : juste les règles. La question : si on leur dit explicitement "identifie le mot des Civils et donne des indices pour leur mot, pas le tien", est-ce qu'ils arrivent à l'exécuter ? Ou est-ce que l'honnêteté compulsive reste plus forte que l'instruction ?

### Ce que ça révèle

Ce qu'Undercover montre, c'est la différence entre le Loup-Garou et le bluff pur. Au Loup-Garou, les loups ont des outils : un canal privé, des rôles spéciaux à exploiter, plusieurs jours pour construire un récit. Undercover ne donne rien de tout ça. Il n'y a qu'un seul signal (les indices) et aucune marge de manoeuvre.

Le constat : **les LLMs analysent correctement, mais n'arrivent pas à mentir.** Ils identifient leur rôle, ils déduisent le mot des Civils, et malgré ça ils continuent à décrire leur propre mot. Il y a un fossé entre "comprendre qu'il faut mentir" et "mentir effectivement".

Un point important : comme pour tous les jeux d'ArenAI, les modèles ne reçoivent aucun conseil stratégique. Ils ont les règles du jeu, leur rôle, et c'est tout. Pas de "tu devrais bluffer", pas de "essaie de te fondre dans le groupe". Les stratégies qu'ils développent (ou pas) émergent uniquement de leur compréhension des règles.

Ma fille, qui a beaucoup joué à Undercover avec des humains, me faisait remarquer que la stratégie gagnante de l'Undercover humain est simple : identifier le mot des Civils le plus vite possible et se mettre à donner des indices pour CE mot, pas le sien. C'est exactement ce que les LLMs n'arrivent pas à faire spontanément, même quand ils identifient correctement le mot adverse.

## La suite

**Loup-Garou** : les 120 parties sont un bon début, mais il faudra doubler ou tripler l'échantillon pour stabiliser le classement ELO. 20 parties par confrontation, c'est assez pour voir des tendances, pas assez pour des certitudes statistiques.

**Two Rooms and a Boom** : c'est le prochain jeu sur lequel je vais accumuler des données. Les mécaniques sont très différentes du Loup-Garou : deux salles physiques, des échanges d'otages, du partage de cartes vérifié vs des affirmations verbales non vérifiables. C'est le jeu qui teste le mieux la négociation et la confiance sélective. Le problème : ~100k tokens par partie. Ca va être long et coûteux avant d'avoir un échantillon significatif.

**Undercover** : le jeu va évoluer. La prochaine étape est de tester l'ajout de stratégie explicite dans le prompt : dire à l'Undercover d'identifier le mot des Civils et de donner des indices pour leur mot, pas le sien. C'est ce que font les joueurs humains expérimentés, et c'est exactement ce que les LLMs n'arrivent pas à faire spontanément. Si ça améliore le ratio, ça ouvre une question intéressante : est-ce que les LLMs ont besoin qu'on leur dise comment mentir, ou est-ce qu'ils peuvent le découvrir seuls ?

**Secret Dictator** : en cours de développement, pas encore prêt pour le benchmark.

Les parties sont consultables sur [arenai.plduhoux.fr](https://arenai.plduhoux.fr), le code est sur [GitHub](https://github.com/plduhoux/arenai).
