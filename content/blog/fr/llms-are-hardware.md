---
title: "LLMs Are Hardware"
description: "GPT vs Claude vs Gemini : et si on se trompait de débat ? Les LLMs sont du hardware. La vraie valeur est dans le software qu'on construit dessus."
date: 2025-12-03
tags: ["Intelligence artificielle", "Architecture", "Réflexion"]
translationSlug: "llms-are-hardware"
---

## The wrong debate

GPT vs Claude vs Gemini vs Llama. On compare des benchmarks, on switch de provider tous les trois mois. Et si on se trompait de débat ?

Personne ne choisit son OS en fonction de la marque de son CPU. L'OS s'adapte au hardware. Le hardware est interchangeable. Ce qui compte, c'est ce qu'on fait tourner dessus.

Les LLMs, c'est du **hardware**. La couche d'exécution. Le processeur. Et la vraie valeur n'a jamais été dans le silicium : elle est dans le software.

Pourtant, en 2025, on construit des workflows entiers autour d'un modèle spécifique. On hardcode des prompts optimisés pour Claude. On utilise des features propriétaires de GPT. On crée du lock-in volontaire sur une couche qui va être commoditisée. C'est comme quand en 1995, on écrivait des applications qui ne tournaient que sur un Pentium II.

## Le vrai produit, c'est le software

Prenons un agent IA qui gère un projet de développement. Il a besoin de comprendre une spec, générer du code, le tester, corriger les erreurs, communiquer le résultat.

Aucune de ces tâches n'est spécifique à un modèle. Ce qui est spécifique, ce qui a de la valeur, c'est tout ce qu'on **construit autour** :
- L'orchestration : comment on découpe le travail, on enchaîne les étapes, on gère les erreurs
- Le tooling : les outils qui transforment une requête LLM en quelque chose d'utile
- Les pipelines : comment on connecte l'IA aux systèmes existants
- La vérification : comment on s'assure que le résultat est correct

Tout ça, c'est du software construit sur la base de requêtes à un LLM. Et c'est ça qui est durable.

## Ce que ça change si on y croit

**L'abstraction devient une nécessité, pas un luxe.** Si ton workflow est collé à Claude, tu es otage d'Anthropic. Le jour où un concurrent explose les benchmarks, tu ne peux pas bouger. Un bon framework d'agents devrait pouvoir switcher de modèle comme on switch de base de données. Avec un adapter, pas une réécriture.

**Le moat n'est pas où on croit.** Les boîtes qui construisent de la valeur sur "on utilise GPT-4" n'ont pas de moat. Le moat, il est dans la qualité de l'orchestration, les données propriétaires, l'UX du workflow, l'intégration dans les process métier. Jamais dans le choix du modèle. Et pour ceux qui en doutent : [deathbyclawd.com](https://deathbyclawd.com) propose littéralement d'analyser votre moat et de le remplacer par un fichier `.md`. Votre avantage concurrentiel tient dans un prompt ? Il ne tient pas. (Bon, en pratique, un skill qui simule le fonctionnement de ton app ne *remplace* pas ton app. Mais le fait que ce soit possible devrait suffire à te poser des questions.)

**Le multi-modèle devient naturel.** Un modèle rapide et cheap pour le triage. Un modèle puissant pour le raisonnement complexe. Un modèle spécialisé pour le code. Comme on a un CPU pour le calcul général et un GPU pour le graphique.

## Le risque du monopole silencieux

Si les LLMs sont du hardware, alors la diversité des fournisseurs est vitale.

Google a une force de frappe terrifiante sur les entreprises. G Suite est déjà partout. Gemini s'intègre nativement dans Docs, Sheets, Gmail, Meet. Ils arrivent avec des offres enterprise agressives : zero retention, prix cassés, bundle avec l'infra existante. Pour un DSI, le choix est "évident".

Et c'est exactement comme ça qu'on se retrouve avec un monopole. Pas par la force : par le confort.

Si Google rafle 80% de ce marché avec Gemini, ce n'est pas juste un problème pour les DSI. Les labs concurrents perdent leur source de revenus, réduisent leur R&D, et finissent par mourir ou se faire racheter. Moins de concurrents = moins d'innovation. On a déjà vu ce film avec le search.

## La question de la souveraineté

Pour le code, les modèles qui comptent sont presque tous américains. Claude, Codex, Gemini Code Assist. Côté européen, il y a Mistral. Et c'est à peu près tout.

Chaque ligne de code qu'on envoie à ces modèles traverse l'Atlantique, tourne sur des serveurs soumis au CLOUD Act. Pour une entreprise européenne, c'est un problème stratégique. Ton avantage compétitif, ton code propriétaire, tout ça passe par un tuyau que quelqu'un d'autre contrôle.

L'analogie hardware tient : on a déjà vécu ça avec les semi-conducteurs. L'Europe a compris trop tard qu'elle n'aurait pas dû déléguer la fabrication de ses puces. Ne refaisons pas la même erreur avec les modèles de code.

**Les modèles open source sont l'antidote.** Llama, Mistral, Qwen : ils ne sont pas toujours au niveau des modèles propriétaires. Mais ils garantissent une chose : personne ne peut te couper l'accès.

Une entreprise saine devrait utiliser **au minimum deux providers**, dont un open source. Pas par idéologie. Par hygiène stratégique. Et si ton architecture traite le LLM comme du hardware interchangeable, ce multi-provider ne coûte presque rien.

## Invest in the software layer

"Mais les modèles ne sont PAS interchangeables. Claude est meilleur en code, GPT en créativité, Gemini en contexte long."

Vrai. Aujourd'hui. Comme en 1990, un programme optimisé pour un CPU spécifique tournait mieux que du code portable. Et pourtant, le monde a choisi la portabilité. Parce que le hardware progresse plus vite que le software ne peut s'adapter.

La distance entre les modèles se réduit à chaque release. Les benchmarks convergent. Les forces de l'un deviennent les features de l'autre six mois plus tard. Optimiser pour un modèle spécifique, c'est optimiser pour un avantage qui disparaît.

Investissez dans le software, pas dans le modèle. Construisez des abstractions. Rendez vos workflows model-agnostic. Traitez le LLM comme ce qu'il est : une couche d'exécution remplaçable.

Ceux qui l'ont compris construisent des systèmes durables. Les autres reconstruisent tous les six mois.
