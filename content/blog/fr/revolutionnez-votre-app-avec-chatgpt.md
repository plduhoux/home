---
title: "Révolutionnez votre App avec ChatGPT - Guide des Interactions IA"
description: "Comment interfacer votre application avec ChatGPT de façon efficace, utiliser les fonctions et récupérer des décisions déclenchables dans votre app."
date: 2024-05-20
tags: ["OpenAI", "Intelligence artificielle", "Blue"]
translationSlug: "revolutionize-your-app-with-chatgpt"
---

## Interagir avec un LLM

Il y a deux ans, ChatGPT a démocratisé l'utilisation de l'IA pour le grand public. En 2024, il est devenu courant pour les utilisateurs d'applications de s'attendre à trouver une IA intégrée dans leurs logiciels préférés, y compris le vôtre. Ces nouvelles IA qui répondent directement à toutes vos questions sont des LLMs (Large Language Model), ils prédisent une réponse cohérente à une question.

De nombreux sites ont commencé à intégrer ce type de solutions, cependant, peu de sites exploitent pleinement le potentiel des outils qu'ils utilisent. Beaucoup se contentent d'alimenter un modèle de langage avec leur documentation pour répondre aux utilisateurs et intègrent directement ChatGPT ou un autre LLM sans prompt système restrictif, le chat de votre concession automobile, conçu pour vous conseiller sur les véhicules, peut donc également vous aider à résoudre des problèmes de mécanique des fluides.

<figure>
  <img src="/blog/car-physics.webp" alt="Le chatbot d'une agence Chevrolet écrit un script Python pour résoudre les équations de Navier-Stokes" />
  <figcaption>Le chatbot d'une agence Chevrolet écrit un script Python pour résoudre les équations de Navier-Stokes</figcaption>
</figure>

Les LLMs sont conçus pour écrire du texte, ainsi si un logiciel veut utiliser la réponse fournie, il doit tenter de la parser pour récupérer les informations qui l'intéressent. Une approche naïve peut être :

- Demander de structurer la réponse dans le prompt système, par exemple : "En réponse à l'utilisateur, fournis un titre court sur une ligne puis saute une ligne et donne la réponse.". Le logiciel tente ensuite de découper la réponse en titre / réponse
- Faire plusieurs requêtes avec la demande utilisateur pour obtenir le titre puis la réponse
- Demander au modèle de produire du JSON

Ces approches posent de multiples problèmes. En fonction du prompt utilisateur (la partie qui est laissée libre à l'utilisateur) le modèle peut être influencé et modifier la structure de la réponse ou il peut décider seul de ne pas respecter cela à la lettre, ajoute des "Bien sûr, je peux ...." et des "J'espère que la réponse vous satisfera" au début ou à la fin.

Le JSON, qui parait être une solution idéale, pose lui aussi des problèmes, les modèles ont tendance à générer du JSON qui ne se parse pas. Une fois récupérée la première accolade ouvrante et la dernière fermante, `JSON.parse(...)` génère une erreur une fois sur deux. Ce taux augmente avec la taille du JSON demandé. Généralement, il manque une virgule, un deux points ou une accolade quelque part. Souvent le JSON généré n'est pas minifié et contient une grande quantité de sauts de lignes, de blancs ce qui augmente grandement la taille de la réponse et donc le nombre de tokens consommés. Un LLM est entrainé sur des données textuelles à destination des humains, il n'est pas du tout familier avec du JSON minifié.

Les meilleurs modèles pour générer du JSON sont (en mai 2024 et selon mon expérience) ceux d'OpenAI et de Mistral.

Les APIs fournies par les entreprises proposant des LLMs vont souvent beaucoup plus loin que la simple complétion de Chat. OpenAI propose depuis juin 2023 via son API de fournir des **outils** au modèle, parmi ces outils, il est possible de définir des **fonctions** et les arguments typés de la fonction. Ce qui permet de résoudre tous les problèmes ci-dessus.

**Le projet** : Afin de découvrir les fonctions, nous allons développer une petite API pour Blue, mon application de gestion d'aquarium récifal, permettant d'interagir avec un utilisateur. L'utilisateur peut poser une question, et en fonction de la nature de la question, le modèle peut soit répondre de façon textuelle, soit déclencher des actions dans l'application.

## La mise en place de l'environnement

Si vous utilisez les APIs d'OpenAI, une fois votre compte créé, une clé d'API vous est fournie. Il va sans dire que cette clé est sensible, vous payez l'utilisation de l'API par token, si votre clé se retrouve exposée, elle peut être utilisée par un autre sur votre budget. Elle ne doit donc apparaitre nulle part, que ce soit dans le code de votre application compilée ou dans votre repo git.

Nous allons créer un petit serveur express qui traite les demandes de l'application. Je vous recommande donc de commencer par créer un fichier `.env` à la racine du projet.

```bash
# Clé d'api OpenAI
OPENAI_API_KEY=sk-XXXXXXX
```

Ce fichier ne devant pas être commité, ajoutez un fichier `.gitignore` à la racine du projet contenant :

```text
.env
```

Une fois votre clé sécurisée, créez votre serveur express.

```javascript
// Load configuration from .env if the file exists
const dotenv = require("dotenv");
dotenv.config();

// Create the express server
const express = require("express");
const app = express();

// Load OpenAI api
const OpenAI = require("openai");
const openai = new OpenAI();

// Get a random number route
app.use("/request", async function (req, res) {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "user",
        content: "Pick a number between 1 and 1000",
      },
    ],
    model: "gpt-4o",
  });
  let message = completion.choices[0].message;
  res.send(message);
});

// Start listening
app.set("port", process.env.PORT || 3000);
app.listen(app.get("port"), function () {
  console.log("Listening to Port", app.get("port"));
});
```

On lance le serveur, et on appelle la route `/request`, voici la réponse :

```json
{
  "role": "assistant",
  "content": "Sure, let's go with the number 387."
}
```

Deuxième essai :

```json
{
  "role": "assistant",
  "content": "Sure! How about 427?"
}
```

On pourrait récupérer le nombre avec une regexp, mais nous allons utiliser une fonction.

## Utilisation d'une fonction

Les fonctions sont disponibles dans les modèles gpt-4o, gpt-4-turbo et gpt-3.5-turbo. Pour déclarer une fonction, il faut utiliser l'attribut `tools` de l'API de complétion. Pour le moment, `tools` ne supporte que les fonctions.

Nous modifions l'appel à l'API d'OpenAI de la façon suivante :

```javascript
const completion = await openai.chat.completions.create({
  messages: [
    {
      role: "system",
      content: "To give a number to the user, use the sendNumber function",
    },
    {
      role: "user",
      content: "Pick a number between 1 and 1000",
    },
  ],
  model: "gpt-4o",
  tools: [
    {
      type: "function",
      function: {
        name: "sendNumber",
        description: "send a number to the user",
        parameters: {
          type: "object",
          properties: {
            randomNumber: {
              type: "number",
            },
          },
        },
      },
    },
  ],
});
let message = completion.choices[0].message;
res.send(message);
```

Réponse reçue :

```json
{
  "role": "assistant",
  "content": null,
  "tool_calls": [
    {
      "id": "call_NkR3eNRohcWiYWCZBWhVem3a",
      "type": "function",
      "function": {
        "name": "sendNumber",
        "arguments": "{\"randomNumber\":354}"
      }
    }
  ]
}
```

Nous avons modifié deux choses :

- Nous avons déclaré une **fonction** lors de l'appel utilisable par le modèle. Cette fonction a un nom, peut avoir une description (ce qui aide le modèle à choisir la fonction dans certains cas), et des paramètres. Le type du paramètre est toujours `object` et contient des attributs, ici `randomNumber` de type `number`
- Nous avons ajouté un **prompt système** indiquant au modèle d'utiliser la fonction `sendNumber` lorsqu'il a besoin d'envoyer un nombre à l'utilisateur.

Dans la réponse, l'attribut `content` est `null`, et nous avons un appel de fonction fait par le modèle qui indique quelle fonction appeler et avec quels arguments. On peut récupérer cela :

```javascript
let message = completion.choices[0].message;
if (message.tool_calls) {
  let fcall = message.tool_calls.find(
    (tc) => tc.type === "function" && tc.function.name === "sendNumber"
  );
  let json = JSON.parse(fcall.function.arguments);
  res.send({ n: json.randomNumber });
}
```

Ainsi nous récupérons bien le nombre attendu et nous pouvons l'utiliser dans notre application.

## Amusons-nous un peu

Modifions le code précédent pour demander maintenant à ChatGPT de donner des caractéristiques intéressantes du nombre qu'il a choisi :

```javascript
app.use("/number", async function (req, res) {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "To give a number to the user, use the sendNumber function",
      },
      {
        role: "user",
        content:
          "Give me a random number between 1 and 1000 and explain why it's special",
      },
    ],
    model: "gpt-4o",
    tools: [
      {
        type: "function",
        function: {
          name: "sendNumber",
          description: "send a number to the user",
          parameters: {
            type: "object",
            properties: {
              randomNumber: {
                type: "number",
              },
              reason: {
                type: "string",
              },
            },
          },
        },
      },
    ],
  });
  let message = completion.choices[0].message;
  if (message.tool_calls) {
    let fcall = message.tool_calls.find(
      (tc) => tc.type === "function" && tc.function.name === "sendNumber"
    );
    let json = JSON.parse(fcall.function.arguments);
    res.send(json);
  } else {
    res.send({ error: "no function call" });
  }
});
```

La fonction que le modèle va appeler a maintenant deux paramètres, le nombre et une chaine de caractères dans l'attribut `reason`. Le prompt a été modifié pour demander au modèle d'expliquer pourquoi le nombre choisi est spécial.

Voici quelques réponses fournies :

```json
[
  {
    "randomNumber": 622,
    "reason": "622 could be considered special because it is the number of resolutions (effective resolutions) passed by the United Nations General Assembly as of the end of 2020."
  },
  {
    "randomNumber": 729,
    "reason": "It's the smallest number that can be expressed as the seventh power of another integer, specifically, 3^6."
  },
  {
    "randomNumber": 317,
    "reason": "The number 317 is special because it's a prime number, which means it is greater than 1 and only divisible by 1 and itself."
  }
]
```

On pourrait utiliser ces informations pour avoir des fun facts sur un nombre aléatoire dans une application.

## Revenons à notre projet

L'application Blue permet de faciliter la gestion quotidienne d'un aquarium et propose entre autres :

- Une fonction de **prise de mesures** permettant d'enregistrer au jour le jour la température de l'eau, le pH, le taux de calcium, de magnésium, de phosphates...
- Une fonction de **changement d'eau** permettant de calculer la quantité de sel à ajouter à l'eau que l'on prépare pour remplacer une partie de l'eau de l'aquarium
- Une fonction d'**ajout de produit** permettant de calculer la quantité d'un produit à ajouter pour augmenter la concentration de calcium par exemple
- Une fonction de **gestion de tâches** ponctuelles ou récurrentes

Et bien d'autres possibilités, mais on va se concentrer sur celles-là pour le moment.

Je souhaite que pour chaque besoin que l'application peut remplir, le modèle ait accès à une ou plusieurs fonctions lui permettant d'effectuer des actions.

### La prise de mesure automatique

Voici la fonction définie pour la prise de mesure :

```json
{
  "name": "takeMeasure",
  "description": "Enregistre une mesure prise",
  "parameters": {
    "type": "object",
    "properties": {
      "element": {
        "type": "string",
        "enum": [
          "calcium", "ph", "temperature",
          "magnesium", "alkalinity", "phosphates"
        ]
      },
      "value": { "type": "number" },
      "unit": {
        "type": "string",
        "enum": ["mg/l", "ppm", "", "celcius", "farenheit", "dkh", "μg/l"]
      }
    }
  }
}
```

Je modifie le code pour indiquer que la question utilisateur est envoyée dans la requête, ce qui me permet de faire les tests plus simplement. La requête devient une requête POST avec un body :

```javascript
app.use("/blue", async function (req, res) {
  let body = req.body;
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "Tu as accès à certaines fonctionnalités d'une application mobile de gestion d'aquarium récifal. Utilise les fonctions fournies pour répondre et interagir avec l'utilisateur. L'aquarium de l'utilisateur fait 700L",
      },
      {
        role: "user",
        content: body.question,
      },
    ],
    model: "gpt-4o",
    tools: [
      {
        type: "function",
        function: {
          // la fonction takeMeasure
        },
      },
    ],
  });
});
```

Lorsque l'utilisateur envoie "Mon thermomètre indique 24", le modèle répond :

```json
{
  "name": "takeMeasure",
  "arguments": {
    "element": "temperature",
    "value": 24,
    "unit": "celcius"
  }
}
```

Ce qui permet d'enregistrer automatiquement la dernière température de l'aquarium. L'application contrôle l'unité et l'enregistre afin de pouvoir faire les conversions.

L'utilisateur dit maintenant "Le calcium est à 410", le modèle répond :

```json
{
  "name": "takeMeasure",
  "arguments": {
    "element": "calcium",
    "value": 410,
    "unit": "ppm"
  }
}
```

### Les changements d'eau

Ajoutons maintenant une fonction permettant au modèle de demander à l'application de lancer un changement d'eau :

```json
{
  "name": "calcWaterChange",
  "description": "Lance le calcul d'un changement d'eau si tu ne sais pas quel volume d'eau utiliser, calcule 15% du volume de l'aquarium",
  "parameters": {
    "type": "object",
    "properties": {
      "volume": {
        "type": "number",
        "description": "Volume d'eau à changer"
      }
    }
  }
}
```

L'utilisateur indique "Lance un changement d'eau de 10%", le modèle répond :

```json
{
  "name": "calcWaterChange",
  "arguments": {
    "volume": 70
  }
}
```

Nous avons indiqué dans le prompt système des informations sur l'aquarium de l'utilisateur (*L'aquarium de l'utilisateur fait 700L*). Ainsi quand l'utilisateur demande de changer 10% de son volume d'eau, le modèle calcule la quantité d'eau à changer et appelle la fonction.

Si l'utilisateur dit simplement "Lance un changement d'eau", le modèle répond :

```json
{
  "name": "calcWaterChange",
  "arguments": {
    "volume": 105
  }
}
```

Car nous avons indiqué dans la description de la fonction que s'il n'y a pas d'indication de volume fourni par l'utilisateur, il doit calculer 15% du volume de l'aquarium de l'utilisateur.

## Pour la suite

Voici d'autres fonctions que je fournis pour répondre aux besoins des fonctionnalités présentées :

```json
{
  "name": "calcAddition",
  "description": "Lance le calcul d'un ajout de produit",
  "parameters": {
    "type": "object",
    "properties": {
      "element": {
        "type": "string",
        "enum": [
          "calcium", "ph", "temperature",
          "magnesium", "alkalinity", "phosphates"
        ]
      }
    }
  }
}
```

```json
{
  "name": "getMeasure",
  "description": "Récupère la valeur de la dernière mesure prise pour un élément. Utilise cette fonction pour connaitre une valeur",
  "parameters": {
    "type": "object",
    "properties": {
      "element": {
        "type": "string",
        "enum": [
          "calcium", "ph", "temperature",
          "magnesium", "alkalinity", "phosphates"
        ]
      }
    }
  }
}
```

Ainsi le modèle peut décider d'appeler la fonction `getMeasure` s'il a besoin d'avoir une information pour répondre à l'utilisateur. Si celui-ci lui demande si son calcium est trop haut, le modèle peut choisir d'appeler la fonction `getMeasure`.

Dans mon code, j'ai deux types de fonctions : celles qui **déclenchent un évènement** (enregistrer une mesure, lancer un calcul de changement d'eau, d'ajout), et celles qui **vont chercher une information** pour le modèle. Dans ce second cas, le modèle est rappelé avec le contexte précédent (l'historique des messages échangés et l'information du résultat de la fonction).

Les interactions plus complexes avec le modèle feront l'objet d'un autre post.

L'utilisateur peut également poser des questions sur son aquarium, sur des espèces de poisson, savoir si elles seraient adaptées, le modèle dans ce cas n'utilise pas de fonction et la réponse est proposée à l'utilisateur.

Ce type d'interaction est vraiment puissant, a une vraie valeur ajoutée pour l'utilisateur et produit un effet spectaculaire. Cependant pour que les interactions soient fluides, il est nécessaire de ne pas les faire de façon textuelle mais bien avec la voix. L'application étant vraiment ergonomique, les fonctionnalités sont à portée de doigts et l'interaction avec un modèle n'est pas nécessaire pour déclencher des actions. En revanche, l'interaction avec la voix, en particulier pour la prise de mesure, permet d'utiliser l'application en main libre ce qui est un vrai avantage pour l'utilisateur lorsqu'il a les mains dans l'eau.
