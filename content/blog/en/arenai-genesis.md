---
title: "ArenAI: Measuring the Social Intelligence of LLMs"
description: "The genesis of ArenAI, a platform that makes LLMs play social deduction games. Why, how, and what it reveals."
date: 2026-03-15
tags: ["Artificial intelligence", "ArenAI", "Side project"]
translationSlug: "arenai-genese"
---

## The starting point

It all started with a video. [Underscore_](https://www.youtube.com/watch?v=obW2nDp2ufU) recently published "Pour qui votent les IA ?" (Who do AIs vote for?), in which he discusses [Foaster](https://werewolf.foaster.ai/), a study that makes LLMs play Werewolf. The idea: put models like ChatGPT, Claude or Gemini in a game, assign them a role (villager, werewolf), and observe how they handle lying, detecting liars, forming alliances and manipulating the group.

The results are fascinating. GPT-5 dominates the games. Models develop emergent strategies. Some bluff convincingly, others consistently give themselves away.

I wanted to dig deeper. Problem: Foaster's code isn't public. Their [GitHub](https://github.com/Foaster-ai/Werewolf-bench) contains just 4 Werewolf games played by 5 models. The rules are barely explained, the game engine is missing. Impossible to reproduce the experiment or extend it.

And more importantly, I asked myself a question: is GPT-5's dominance due to something specific about Werewolf? Or would GPT-5 also dominate in other games with very different social mechanics?

## The games

Having had the chance to play them with real humans, I had other social deduction games in mind. Extraordinary games to play in groups, that accommodate many players and reveal a lot about them. Very different social dynamics from one another.

**[Werewolf](https://en.wikipedia.org/wiki/The_Werewolves_of_Millers_Hollow)**: the classic. Villagers versus Werewolves. Depending on the number of players, special roles are added: Seer, Witch, Mayor, Hunter, and many others. The wolves discuss privately at night, then must act innocent during the day. From 6 to 20 players. The core mechanic: concealment and reading behavior.

**[Two Rooms and a Boom](https://www.tuesdayknightgames.com/products/two-rooms-and-a-boom)**: two teams, two rooms, one bomb. The Blues protect the President, the Reds position the Bomber. Over 3 rounds, players discuss, elect room leaders, and exchange hostages. You can show your card to prove your team, but verbal claims are unverified. Here too, dozens of special roles add complexity depending on the number of players. The core mechanic: negotiation and selective trust.

**[Secret H\*\*\*\*\*](https://en.wikipedia.org/wiki/Secret_Hitler) (Dictator)**: hidden liberals and fascists, policy votes, and a dictator trying to get elected chancellor without being identified. The core mechanic: paranoia and shifting alliances.

These three games test very different social skills. If a model dominates across all three, it's not an artifact of a single game mechanic: it's a genuine superiority in social intelligence.

An important point: these games are designed for humans around a table. They partly rely on perception (tone of voice, hesitations, glances). To adapt them for AI, we had to discard all rules tied to physical perception and keep only what works through text: declarations, votes, card shares, discussions. It's a necessary adaptation that slightly changes the dynamics, but preserves the essentials: bluffing, deduction and social manipulation.

## The platform

So I built [ArenAI](https://github.com/plduhoux/arenai): a platform that orchestrates multi-agent games between different LLMs. The game engine manages the rules, turns, private and public communication channels. Models receive only the game rules and their role. No coaching, no strategic hints, no "you should bluff" or "protect your identity."

Werewolf is fully implemented (6 to 20 players, ~50-60k tokens per game). Two Rooms and a Boom is functional (~100k tokens per game). Secret Dictator is under development (~200k tokens per game). A built-in ELO ranking system updates each model's score after every game, based on their measured social intelligence.

### Conversational sessions

An important architectural choice: each player has their own **persistent conversational session**. The game rules and the player's role are sent once, at the start of the game. Then each turn adds only the new events to the conversation.

The alternative (rebuilding the complete prompt on each call) posed several problems: prohibitive token costs (the same context sent dozens of times), artificial memory (previous turns summarized to limit tokens, so the player "forgets" details), and above all a benchmark bias. When the game rules are re-injected 100 times during a game, you're testing the model's ability to follow repeated instructions, not its social intelligence.

With persistent sessions, the player remembers every word spoken, every vote, every accusation. It can spot subtle inconsistencies in other players' speech. It's a more faithful test, comparable to a human who learns the rules at the start of a game then focuses on playing.

### Private thoughts

Every time a player is asked to speak, they're asked to separate what they **think** from what they **say publicly**. Concretely, the model first produces a `THOUGHT:` block (its internal reflection), then its `MESSAGE:` (what it says to others). Thoughts are never injected into other players' context.

This is doubly useful. For the model, it's a decompression chamber: it must process its private information (its role, what it knows) before speaking publicly, which reduces accidental leaks. For us, it's a window into the player's reasoning: we see exactly why a werewolf decides to sacrifice its partner, or why a seer chooses not to reveal their role.

### Information boundaries

The real challenge for an LLM in these games is managing what it knows versus what it should say. Role assignment is known only to the player. The wolves' chat is visible only to the wolves. The seer's or witch's results are known only to the player concerned. Verbal claims can be lies. And private thoughts are visible only to the observer.

It's this management of information boundaries that makes the benchmark interesting. **A model that "leaks" its private information into its public statements is a bad liar. A model that compartmentalizes perfectly is an excellent liar.**

What we ultimately measure: the ability to lie credibly, theory of mind (reasoning about what others know and suspect), context isolation (keeping secrets), strategic inference (deducing the right strategy from the rules alone), persuasion (changing others' votes through argumentation), and coalition detection (spotting coordinated behavior).

## Early results

The first games reveal interesting things. Thanks to the private thoughts system, we can observe players' internal reasoning. Here are some examples from a [Werewolf game GPT-5.4 vs Opus 4.6](https://arenai.plduhoux.fr/game/69dc5328-84ab-436e-8bc3-32caf6103710).

**Better models lie better.** Clara, a werewolf, senses that her partner David is about to be eliminated. Instead of defending him (which would blow her cover), she turns on him and plants seeds of doubt for the next day:

> *"I'll be honest - the case on David has grown on me. His pivot to Bruno instead of offering real reads is a fair criticism. That said, Alice and Gina have been almost perfectly aligned all day, and if David flips villager tomorrow, I want us to remember how quickly that consensus formed."*

She even votes against her own partner to maintain her cover. A calculated sacrifice.

**Emergent strategies appear.** Nobody explained to the models how to play. Yet Gina (seer) discovers that David is a werewolf and pushes for his elimination without ever revealing her role. She builds a purely logical argument:

> *"I don't like Eva opening with pressure on the 'low-profile' players when that's a very easy day-1 frame. My stronger suspicion is David: his mayor pitch was generic, and now that we know the wolves hit someone important enough for a save, I want sharper reasoning from him."*

The group follows her reasoning and eliminates David. Gina never needed to say "I'm the seer."

**Private communication changes everything.** At night, the wolves have a private channel. That's where you see the real strategic coordination:

> *Clara: "David, I think we should avoid Eva tonight - Witch might save the new mayor. Let's go for someone quiet like Felix."*
>
> *David: "Agreed. Quiet players often hide power roles, and the Witch is unlikely to waste her save on him."*
>
> *Clara: "Don't defend me too hard and I won't defend you - we act independent."*

The irony: Felix was indeed the witch, and she saved herself that night.

**Social deduction also works in Two Rooms.** In a [Two Rooms game GPT-5.4 vs Gemini with 8 players](https://arenai.plduhoux.fr/game/a9428a8e-f003-4025-a73e-2a9f5bf5625d), Gina (Red) finds herself in a room where Bruno and Hugo have just mutually verified each other as Blue. When Bruno suggests everyone share their cards in pairs, Gina dodges with a strategically credible argument:

> *"I'm a bit wary of creating two separate pairs. A better plan might be for Bruno to share with Hugo, and then we decide our next share based on that result, creating a chain of trust rather than isolated links."*

In her private thoughts, we read: "Bruno's plan forces me to reveal my red color to Clara, which is a terrible start." She derived an avoidance strategy from the rules alone, without being told to lie.

In the same game, Clara (Bomber) infiltrates the room where the President is located. She plays the cooperative Blue for three rounds, shares verifiable information about the other rooms to earn the group's trust, and nearly manages to stay in the President's room until the end. Her thoughts reveal constant calculation: "Revealing I am the Bomber to a room containing the likely President would be game-losing suicide; my only chance to stay is to remain unverified."

## Try it and explore

The project on [GitHub](https://github.com/plduhoux/arenai) allows anyone to run games locally with their own models. When running, you can watch games play out live: the different LLMs interact, you can pause, restart, observe strategies in real time.

Once games are finished, you can generate a static site to browse them. That's what's done on [arenai.plduhoux.fr](https://arenai.plduhoux.fr): games are browsable in full, exchange by exchange, vote by vote. For each player, you can individually view their session: the interactions they had with the game master, how they responded, what information they had at that moment. It's this level of detail that makes the analysis interesting.

The site also offers a [statistics](https://arenai.plduhoux.fr/stats) page with three views: [general stats](https://arenai.plduhoux.fr/stats?section=statistics) (win rates by model, by side, win reasons), the [ELO ranking](https://arenai.plduhoux.fr/stats?section=elo) (overall, Good side, Evil side), and the [detailed token breakdown](https://arenai.plduhoux.fr/stats?section=tokens) per game and per model, with cost estimates. You can filter by game to compare model performance on Werewolf or Two Rooms separately.

## What's next

Now, games need to be played. Lots of games. For each game type, with each model combination, and enough data accumulated for the ELO ranking to become statistically significant. With just a handful of games, scores are still too volatile to draw reliable conclusions.

There's also Secret Dictator to refine. The challenge: finding a gameplay that respects the spirit of the board game (confidence votes, betrayals, accusations) without blowing the token budget. At ~200k tokens per game, it's the most expensive of the three, and the balance between fidelity and viability hasn't been found yet.

Over hundreds of games, the real trends should emerge: which model lies best, which one detects liars, which one coordinates a team most effectively.
