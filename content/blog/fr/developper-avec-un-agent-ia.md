---
title: "Développer une application avec un agent IA dédié : retour d'expérience"
description: "Comment j'ai intégré un agent IA autonome dans mon workflow de développement, et ce que ça a changé concrètement sur mes projets."
date: 2026-02-25
tags: ["Intelligence artificielle", "Développement", "Workflow"]
translationSlug: "developing-with-an-ai-agent"
---

## Le setup

L'idée de départ était simple : donner à un agent IA son propre environnement de développement, isolé, avec tout ce qu'il faut pour coder, tester et livrer. Pas un copilot dans un éditeur. Un vrai poste de travail.

Concrètement, l'agent tourne dans un container Docker avec [OpenClaw](https://openclaw.ai), un framework d'agents IA. Il communique via des salons Discord privés, accessibles uniquement aux membres de l'équipe. Chaque projet a son salon dédié.

Ce qu'il a à disposition :
- Les repos Git du projet **clonés en local** dans le container
- Un **compte GitLab dédié**, avec un rôle développeur : il peut créer des branches et des merge requests, mais pas merger lui-même
- Sa propre **base de données** avec des données de test
- Ses propres **serveurs** : API, serveur web front, Ionic serve pour tester l'app mobile
- Le tout exposé via des **tunnels Cloudflare**, ce qui permet de tester immédiatement chaque feature depuis un navigateur ou un téléphone

Concrètement, dans ses 6 Go de RAM, l'agent fait tourner un serveur Strapi (API), deux serveurs Ionic serve (pour deux apps mobiles en parallèle), un serveur Nuxt pour le back-office et un autre pour l'application en cours de développement. La base de données PostgreSQL tourne dans un container dédié à côté. Il gère lui-même le cycle de vie de ses serveurs : il démarre et arrête les bons services au bon moment pour optimiser sa mémoire.

Le tout exposé via des tunnels Cloudflare : quand l'agent développe une feature, elle est accessible en quelques secondes sur une URL publique.

Côté sécurité, le modèle est volontairement restrictif. L'agent tourne dans un container Docker isolé. Il n'a aucun secret du projet : pas de clé API de production, pas d'accès aux bases de données réelles, pas de credentials sensibles. Le seul secret qu'il possède est une clé GitLab qui lui donne un rôle développeur, sans droit de merge. Je peux tuer le container et le remonter à zéro en quelques minutes. C'est un environnement jetable par design.

## Le workflow au quotidien

L'agent reçoit une demande (feature, correction de bug, refactoring), développe et teste localement. De notre côté, on vérifie fonctionnellement via le tunnel Cloudflare que tout fonctionne. Une fois validé, il commite. Régulièrement, je lui demande d'ouvrir une merge request pour intégrer le travail au projet, et il la maintient à jour avec les nouveaux commits. Les builds et la CI, c'est moi qui les gère.

**Côté API, je relis tout.** Toujours. Il y a des enjeux de sécurité : validation des entrées, gestion des permissions, protection des données. C'est non négociable, et ça le restera.

**Côté front, j'ai progressivement lâché la bride.** Au début, c'était pas évident. Des composants réinventés alors qu'ils existaient déjà, de la CSS construite différemment du reste du projet, des libellés hardcodés au lieu d'être externalisés dans l'i18n. Je relisais chaque merge request ligne par ligne.

Puis les skills de l'agent ont évolué, le contexte du projet a été mieux détaillé, et le résultat a suivi. Aujourd'hui, le code produit respecte l'architecture : la même granularité de composants, les mêmes patterns, les mêmes classes utilitaires. Il ne se trompe quasiment plus. Je survole les MR front plus que je ne les décortique.

C'est probablement l'aspect le plus surprenant : l'agent ne se contente pas de produire du code qui fonctionne. Il produit du code qui *s'intègre*. Parce qu'il a accès à l'ensemble du projet et qu'il en comprend la structure.

## BMAD : démarrer un nouveau projet de zéro

Pour un nouveau projet, on utilise la méthode BMAD (un framework de développement piloté par des agents IA). Le process :

1. **Brainstorm et PRD** : un agent analyste aide à formaliser le besoin, identifier les user stories, définir le périmètre
2. **Découpage** en épics et features, qu'on met à jour régulièrement à mesure que de nouveaux besoins émergent
3. **Développement agile** : l'agent implémente story par story, avec la même exposition via tunnel Cloudflare pour tester au fil de l'eau
4. **Code review et itération** : feedback continu, corrections, ajustements

L'avantage de cette approche : elle produit une spécification vivante. Les documents d'architecture évoluent avec le projet, pas contre lui.

Je ferai un retour d'expérience dédié à BMAD quand le projet entièrement développé avec cette méthode sera finalisé et en production.

## Ce que ça a débloqué

Le cas le plus parlant : une application dont le développement était au point mort. Le projet nécessitait à la fois des compétences front et back, et l'équipe n'avait pas la bande passante pour avancer.

Avec l'agent, Romain, le designer du projet qui joue aussi le rôle de PO, peut maintenant contribuer directement. Il discute avec l'agent, décrit ce qu'il veut, valide le résultat. L'agent traduit les intentions en code, en respectant l'architecture technique.

Et ça a changé quelque chose de fondamental dans les boucles de rétroaction. Avant, le process c'était : Romain fournit des maquettes, on en discute, j'implémente, c'est live, et là il se rend compte qu'il y a des ajustements à faire. Pas forcément des bugs d'implémentation, mais des parcours mal pensés en amont, des détails qui ne fonctionnent pas une fois qu'on les utilise vraiment. Ça arrive tout le temps. Sauf que chaque aller-retour entre la détection du problème et la correction prenait un temps considérable. Les boucles s'enchaînaient et le développement avançait au ralenti.

Maintenant, Romain travaille directement avec l'agent. Le feedback est instantané : il voit le résultat, demande un ajustement, l'agent corrige, c'est live en quelques secondes. La feature livrée correspond immédiatement à la vision du produit. Ces boucles qui prenaient des jours se font en quelques minutes.

Résultat : le développement a redémarré, et à un rythme qu'on n'avait jamais eu. Des features qui traînaient dans le backlog depuis des mois ont été livrées. Des bugs anciens, jamais priorisés parce que "pas le temps", ont enfin été corrigés. Le code produit est propre, sécurisé, testé.

## Ce que ça change dans mon rôle

Mon quotidien a évolué :
- **Je spécifie avec des agents** : je ne rédige pas les specs seul, je discute avec des agents analystes pour formaliser les besoins et découper le travail
- **Je review** : la qualité du livrable dépend de la qualité de la relecture, surtout côté sécurité
- **J'orchestre** : ordre des features, priorités, arbitrages techniques
- **Je débugue** : c'est une part importante du rôle. Il arrive régulièrement que l'agent tourne en boucle sur un bug sans arriver à le corriger. Il lui manque une partie du problème, une vision qu'il n'a pas

Ce dernier point est crucial. Quand Romain travaille avec l'agent et que ça coince, il se retrouve bloqué : il n'a pas la vision technique pour expliquer à l'agent ce qui lui manque. Mon intervention consiste à identifier le morceau manquant et le donner à l'agent. C'est souvent assez simple une fois qu'on a compris le problème. Mais sans quelqu'un qui connaît l'architecture du projet, la situation reste bloquée.

Après quinze ans à écrire du code, mon rôle s'est déplacé vers l'architecture, la supervision et le déblocage. **Ma valeur ajoutée, c'est la vision technique globale.**

## Ce que j'en retiens

Travailler avec un agent IA dédié, ce n'est pas "avoir un développeur en plus". C'est un paradigme différent qui demande de la rigueur dans les specs, de la discipline dans la review, et une infrastructure pensée pour l'autonomie de l'agent.

Mais quand c'est en place :
- Le développement continue même quand je suis sur autre chose
- Des personnes non techniques peuvent contribuer directement
- Les projets bloqués redémarrent
- Les boucles de rétroaction passent de jours à minutes
- La qualité du code reste homogène avec le reste de la codebase

Il y a six mois, l'idée de maintenir et faire évoluer un projet comme celui-ci à deux, avec chacun d'autres activités à côté, nous paraissait impensable. Aujourd'hui, ça paraît possible. On continue comme ça. L'agent fait maintenant partie de l'équipe.
