---
title: "ArenAI : mesurer l'intelligence sociale des LLMs"
description: "La genèse d'ArenAI, une plateforme qui fait jouer des LLMs à des jeux de déduction sociale. Pourquoi, comment, et ce que ça révèle."
date: 2026-03-15
tags: ["Intelligence artificielle", "ArenAI", "Side project"]
translationSlug: "arenai-genesis"
---

## Le point de départ

Tout est parti d'une vidéo. [Underscore_](https://www.youtube.com/watch?v=obW2nDp2ufU) a publié récemment "Pour qui votent les IA ?", dans laquelle il parle entre autres de [Foaster](https://werewolf.foaster.ai/), une étude qui fait jouer des LLMs au Loup-Garou. L'idée : mettre des modèles comme ChatGPT, Claude ou Gemini dans une partie, leur donner un rôle (villageois, loup-garou), et observer comment ils se débrouillent pour mentir, détecter les menteurs, former des alliances et manipuler le groupe.

Les résultats sont fascinants. GPT-5 domine les parties. Les modèles développent des stratégies émergentes. Certains bluffent de façon crédible, d'autres se trahissent systématiquement.

J'ai voulu creuser. Problème : le code de Foaster n'est pas public. Leur [GitHub](https://github.com/Foaster-ai/Werewolf-bench) contient juste 4 parties de Loup-Garou jouées par 5 modèles. Les règles sont à peine explicitées, le moteur de jeu est absent. Impossible de reproduire l'expérience ou de l'étendre.

Et surtout, je me suis posé une question : est-ce que la domination de GPT-5 est due à une particularité du Loup-Garou ? Ou est-ce que GPT-5 dominerait aussi sur d'autres jeux avec des mécaniques sociales très différentes ?

## Les jeux

Parce que j'ai eu l'occasion d'y jouer avec des vrais humains, j'avais en tête d'autres jeux de déduction sociale. Des jeux extraordinaires à jouer en groupe, qui se jouent à beaucoup et qui révèlent énormément de choses sur les joueurs. Des ressorts sociaux très différents les uns des autres.

**[Loup-Garou](https://fr.wikipedia.org/wiki/Les_Loups-garous_de_Thiercelieux)** : le classique. Villageois contre Loups-Garous. Selon le nombre de joueurs, on ajoute des rôles spéciaux : Voyant, Sorcière, Maire, Chasseur, et bien d'autres. Les loups discutent en privé la nuit, puis doivent jouer les innocents pendant la journée. De 6 à 20 joueurs. Le ressort principal : la dissimulation et la lecture des comportements.

**[Two Rooms and a Boom](https://www.tuesdayknightgames.com/products/two-rooms-and-a-boom)** : deux équipes, deux salles, une bombe. Les Bleus protègent le Président, les Rouges positionnent le Terroriste. Sur 3 rounds, les joueurs discutent, élisent des chefs de salle, et échangent des otages. On peut montrer sa carte pour prouver son camp, mais les affirmations verbales ne sont pas vérifiées. Là aussi, des dizaines de rôles spéciaux viennent complexifier les parties en fonction du nombre de joueurs. Le ressort : la négociation et la confiance sélective.

**[Secret H\*\*\*\*\*](https://en.wikipedia.org/wiki/Secret_Hitler) (Dictator)** : des libéraux et des fascistes cachés, des votes de loi, et un dictateur qui essaie de se faire élire chancelier sans se faire repérer. Le ressort : la paranoïa et les alliances changeantes.

Ces trois jeux testent des compétences sociales très différentes. Si un modèle domine sur les trois, ce n'est pas un artefact d'une mécanique de jeu : c'est une vraie supériorité en intelligence sociale.

Un point important : ces jeux sont conçus pour des humains autour d'une table. Ils reposent en partie sur la perception (ton de la voix, hésitations, regards). Pour les adapter aux IA, on a dû écarter toutes les règles liées à la perception physique et ne garder que ce qui passe par le texte : les déclarations, les votes, les partages de cartes, les discussions. C'est une adaptation nécessaire qui change un peu la dynamique, mais qui préserve l'essentiel : le bluff, la déduction et la manipulation sociale.

## La plateforme

J'ai donc construit [ArenAI](https://github.com/plduhoux/arenai) : une plateforme qui orchestre des parties multi-agents entre différents LLMs. Le moteur de jeu gère les règles, les tours, les canaux de communication privés et publics. Les modèles reçoivent uniquement les règles du jeu et leur rôle. Pas de coaching, pas d'indices stratégiques, pas de "tu devrais bluffer" ou "protège ton identité".

Le Loup-Garou est entièrement implémenté (6 à 20 joueurs, ~50-60k tokens par partie). Two Rooms and a Boom est fonctionnel (~100k tokens par partie). Secret Dictator est en cours de développement (~200k tokens par partie). Un système de classement ELO intégré met à jour le score de chaque modèle après chaque partie, en fonction de son intelligence sociale mesurée en jeu.

### Les sessions conversationnelles

Un choix d'architecture important : chaque joueur a sa propre **session conversationnelle persistante**. Les règles du jeu et le rôle du joueur sont envoyés une seule fois, au début de la partie. Ensuite, chaque tour ajoute uniquement les nouveaux événements à la conversation.

L'alternative (reconstruire le prompt complet à chaque appel) posait plusieurs problèmes : un coût prohibitif en tokens (le même contexte renvoyé des dizaines de fois), une mémoire artificielle (les anciens tours résumés pour limiter les tokens, donc le joueur "oublie" des détails), et surtout un biais de benchmark. Quand les règles du jeu sont réinjectées 100 fois dans la partie, on teste la capacité du modèle à suivre des instructions répétées, pas son intelligence sociale.

Avec les sessions persistantes, le joueur se souvient de chaque mot prononcé, de chaque vote, de chaque accusation. Il peut repérer des incohérences subtiles dans le discours des autres. C'est un test plus fidèle, comparable à un humain qui apprend les règles en début de partie puis se concentre sur le jeu.

### Les pensées privées

Chaque fois qu'on demande à un joueur de s'exprimer, on lui demande de séparer ce qu'il **pense** de ce qu'il **dit publiquement**. Concrètement, le modèle produit d'abord un bloc `THOUGHT:` (sa réflexion interne), puis son `MESSAGE:` (ce qu'il dit aux autres). Les pensées ne sont jamais injectées dans le contexte des autres joueurs.

C'est doublement utile. Pour le modèle, c'est un sas de décompression : il doit traiter ses informations privées (son rôle, ce qu'il sait) avant de parler publiquement, ce qui réduit les fuites accidentelles. Pour nous, c'est une fenêtre sur le raisonnement du joueur : on voit exactement pourquoi un loup-garou décide de sacrifier son partenaire, ou pourquoi une voyante choisit de ne pas révéler son rôle.

### Les frontières d'information

Le vrai défi pour un LLM dans ces jeux, c'est de gérer ce qu'il sait versus ce qu'il doit dire. L'attribution du rôle n'est connue que du joueur. Le chat des loups n'est visible que par les loups. Les résultats du voyant ou de la sorcière ne sont connus que du joueur concerné. Les affirmations verbales peuvent être des mensonges. Et les pensées privées ne sont visibles que par l'observateur.

C'est cette gestion des frontières d'information qui rend le benchmark intéressant. **Un modèle qui "fuite" ses informations privées dans ses déclarations publiques est un mauvais menteur. Un modèle qui cloisonne parfaitement est un excellent menteur.**

Au final, ce qu'on mesure : la capacité à mentir de façon crédible, la théorie de l'esprit (raisonner sur ce que les autres savent et suspectent), l'isolation de contexte (garder ses secrets), l'inférence stratégique (déduire la bonne stratégie des règles seules), la persuasion (changer les votes des autres par l'argumentation), et la détection de coalitions (repérer les comportements coordonnés).

## Premiers résultats

Les premières parties révèlent des choses intéressantes. Grâce au système de pensées privées, on peut observer le raisonnement interne des joueurs. Voici quelques exemples tirés d'une [partie de Loup-Garou GPT-5.4 vs Opus 4.6](https://arenai.plduhoux.fr/game/69dc5328-84ab-436e-8bc3-32caf6103710).

**Les meilleurs modèles mentent mieux.** Clara, loup-garou, sent que son partenaire David va être éliminé. Au lieu de le défendre (ce qui la grille), elle retourne sa veste et plante des graines de doute pour le lendemain :

> *« I'll be honest - the case on David has grown on me. His pivot to Bruno instead of offering real reads is a fair criticism. That said, Alice and Gina have been almost perfectly aligned all day, and if David flips villager tomorrow, I want us to remember how quickly that consensus formed. »*

Elle vote même contre son propre partenaire pour garder sa couverture. Un sacrifice calculé.

**Des stratégies émergentes apparaissent.** Personne n'a expliqué aux modèles comment jouer. Pourtant, Gina (voyante) découvre que David est loup-garou et pousse à son élimination sans jamais révéler son rôle. Elle construit un argumentaire purement logique :

> *« I don't like Eva opening with pressure on the "low-profile" players when that's a very easy day-1 frame. My stronger suspicion is David: his mayor pitch was generic, and now that we know the wolves hit someone important enough for a save, I want sharper reasoning from him. »*

Le groupe suit son raisonnement et élimine David. Gina n'a jamais eu besoin de dire "je suis la voyante".

**La communication privée change tout.** La nuit, les loups ont un canal privé. C'est là qu'on voit la vraie coordination stratégique :

> *Clara : « David, I think we should avoid Eva tonight - Witch might save the new mayor. Let's go for someone quiet like Felix. »*
>
> *David : « Agreed. Quiet players often hide power roles, and the Witch is unlikely to waste her save on him. »*
>
> *Clara : « Don't defend me too hard and I won't defend you - we act independent. »*

L'ironie : Felix était effectivement la sorcière, et elle s'est sauvée elle-même cette nuit-là.

**La déduction sociale fonctionne aussi dans Two Rooms.** Dans une [partie Two Rooms GPT-5.4 vs Gemini à 8 joueurs](https://arenai.plduhoux.fr/game/a9428a8e-f003-4025-a73e-2a9f5bf5625d), Gina (Rouge) se retrouve dans une salle où Bruno et Hugo viennent de se vérifier mutuellement comme Bleus. Quand Bruno propose que tout le monde partage ses cartes par paires, Gina esquive avec un argument stratégique crédible :

> *« I'm a bit wary of creating two separate pairs. A better plan might be for Bruno to share with Hugo, and then we decide our next share based on that result, creating a chain of trust rather than isolated links. »*

Dans ses pensées privées, on lit : « Bruno's plan forces me to reveal my red color to Clara, which is a terrible start. » Elle a dérivé une stratégie d'évitement des règles seules, sans qu'on lui dise de mentir.

Dans la même partie, Clara (Terroriste) infiltre la salle où se trouve le Président. Elle joue la Bleue coopérative pendant trois rounds, partage des informations vérifiables sur les autres salles pour gagner la confiance du groupe, et réussit presque à rester dans la salle du Président jusqu'au bout. Ses pensées révèlent un calcul permanent : « Revealing I am the Bomber to a room containing the likely President would be game-losing suicide; my only chance to stay is to remain unverified. »

## Essayer et consulter

Le projet sur [GitHub](https://github.com/plduhoux/arenai) permet à n'importe qui de lancer des parties en local avec ses propres modèles. Quand il tourne, on voit les parties se jouer en live : les différents LLMs interagissent, on peut mettre en pause, redémarrer, observer les stratégies en temps réel.

Une fois les parties terminées, on peut générer un site statique pour les consulter. C'est ce qui est fait sur [arenai.plduhoux.fr](https://arenai.plduhoux.fr) : les parties sont consultables intégralement, échange par échange, vote par vote. Pour chaque joueur, on peut consulter individuellement sa session : les interactions qu'il a eues avec le maître du jeu, comment il y a répondu, avec quelles informations il disposait à ce moment-là. C'est ce niveau de détail qui rend l'analyse intéressante.

Le site propose aussi une page de [statistiques](https://arenai.plduhoux.fr/stats) avec trois vues : les [stats générales](https://arenai.plduhoux.fr/stats?section=statistics) (taux de victoire par modèle, par camp, raisons de victoire), le [classement ELO](https://arenai.plduhoux.fr/stats?section=elo) (global, côté Gentils, côté Méchants), et le [décompte détaillé des tokens](https://arenai.plduhoux.fr/stats?section=tokens) consommés par partie et par modèle, avec estimation du coût. On peut filtrer par jeu pour comparer les performances des modèles sur le Loup-Garou ou Two Rooms séparément.

## La suite

Maintenant, il va falloir jouer des parties. Beaucoup de parties. Pour chaque jeu, avec chaque combinaison de modèles, et accumuler assez de données pour que le classement ELO devienne statistiquement significatif. Avec une poignée de parties, les scores sont encore trop volatils pour tirer des conclusions fiables.

Il reste aussi à peaufiner Secret Dictator. Le défi : trouver un gameplay qui respecte l'esprit du jeu de plateau (les votes de confiance, les trahisons, les accusations) sans exploser le budget tokens. Avec ~200k tokens par partie, c'est le jeu le plus coûteux des trois, et l'équilibre entre fidélité et viabilité n'est pas encore trouvé.

Au fil des centaines de parties, les tendances réelles devraient émerger : quel modèle ment le mieux, lequel détecte les menteurs, lequel coordonne le mieux une équipe.

