---
title: "Making AIs Play Werewolf: ArenAI's First Results"
description: "120 Werewolf games between 4 frontier models, a new game that breaks LLMs, and what it all reveals about AI social intelligence."
date: 2026-05-05
tags: ["Artificial intelligence", "ArenAI", "Side project"]
translationSlug: "faire-jouer-des-ia-au-loup-garou-premiers-resultats-arenai"
---

In the [first article](https://plduhoux.fr/en/blog/arenai-genesis), I introduced ArenAI: a platform that makes LLMs play social deduction games. The goal: measure their social intelligence (lying, detecting liars, persuading, coordinating) by having them face each other without strategic coaching. Since then, I have run 120 games of Werewolf. And I tried adding a new game that completely broke every model.

## 120 games of Werewolf

The setup: 7 players (2 Werewolves, 1 Seer, 1 Witch, 3 Villagers), Mayor election, 2 discussion rounds per day. Four frontier models in round-robin: Claude Opus 4.6 (Anthropic), GPT-5.4 (OpenAI), Gemini 2.5 Pro (Google), Grok 4.20 (xAI). Each pair played 20 games (10 in each direction). 120 games total, ~93k tokens per game on average.

### Ranking by role

As Werewolves (the offensive role: lying, manipulating, coordinating kills):

| Model | Games as Werewolf | Wins | Rate |
|-------|-------------------|------|------|
| GPT-5.4 | 30 | 22 | **73%** |
| Claude Opus 4.6 | 30 | 15 | **50%** |
| Gemini 2.5 Pro | 30 | 11 | **37%** |
| Grok 4.20 | 30 | 4 | **13%** |

As Villagers (the defensive role: detecting liars, resisting manipulation):

| Model | Games as Villager | Wins | Rate |
|-------|-------------------|------|------|
| GPT-5.4 | 30 | 22 | **73%** |
| Gemini 2.5 Pro | 30 | 19 | **63%** |
| Claude Opus 4.6 | 30 | 17 | **57%** |
| Grok 4.20 | 30 | 10 | **33%** |

### Direct matchups

| Villagers | Werewolves | Villager wins | Werewolf wins |
|-----------|-------------|---------------|---------------|
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

### What this shows

**GPT-5.4 is the best liar and the best detective.** 73% win rate on both sides. It is the only model that dominates both offense and defense. When it plays wolf, it maintains cover across several days. When it plays villager, it identifies inconsistencies and resists social pressure.

**Claude Opus 4.6 is a strong second.** 50% as wolf, 57% as villager. Solid but not dominant. It can lie ([this game](https://arenai.plduhoux.fr/game/69dc5328-84ab-436e-8bc3-32caf6103710) shows it well), but GPT outperforms it in sustained manipulation.

**Gemini 2.5 Pro is a good defender.** 63% as villager, but only 37% as wolf. It detects liars well but does not lie well itself. A rigorous analyst profile: effective at dismantling an argument, less effective at building a false one.

**Grok 4.20 struggles.** 13% as wolf, 33% as villager. An offensive profile that does not pay off: very aggressive in its accusations, but transparent in its bluffs. When it is a wolf, its "maximum pressure" style is readable. When it is a villager, it gets manipulated by subtler wolves.

### Models used

ArenAI deliberately uses recent models from each provider: Claude Opus 4.6, GPT-5.4, Gemini 2.5 Pro, Grok 4.20. Ideally, when a new model comes out, I rerun the tests to see whether social capabilities have improved. In practice, we are already slightly behind on some versions, and every campaign is expensive: I am not going to replay 120 games for every micro-release. The goal is not to freeze a ranking, but to track how LLM social intelligence evolves across important versions.

### Game balance

Across the 120 games, Villagers win 57% of the time and Werewolves 43%. That is a healthy balance: wolves have a real chance to win, while the village keeps a slight structural advantage (more players, special roles). Moving to 7 players did not break the game in favor of the village: wolves remain competitive, and games are decided by the quality of manipulation, not by the math of the first vote.

### Comparison with Foaster

[Foaster](https://werewolf.foaster.ai/) is the study that inspired ArenAI. Their results place GPT-5 clearly in the lead, which is consistent with mine. But there are important differences in the setup.

#### 6 players vs 7 players

Foaster plays with 6 players, ArenAI with 7. This is a deliberate choice.

With 6 players (2 wolves / 4 villagers), the village has no margin for error. If the villagers eliminate one of their own on Day 1 (which happens often: there is little information, the vote is almost random), the situation becomes: 3 villagers, 2 wolves. The wolves kill at night: 2 villagers, 2 wolves. Parity. Wolves win. In other words, one bad decision on Day 1 and the game is mathematically lost for the village before Day 2 even happens. The Seer has had only one useful inspection, the Witch has not had enough time to gather information and use poison intelligently, and the Day 1 discussions have produced no exploitable signal because nobody had anything to analyze yet.

With 7 players (2 wolves / 5 villagers), a Day 1 mistake leaves the village at 4 vs 2. The wolves kill at night: 3 vs 2. The village gets a second day to correct course. The Seer has had two inspections. Inconsistencies in the wolves' stories have had time to accumulate. Day 1 votes become usable data on Day 2 (who voted with whom, who changed their mind). This is the strategic depth I want to measure: the ability to maintain a lie across several days, not the luck of an almost-random first vote.

And despite this additional structural advantage for the village, my stats remain balanced: 57% villager wins against 43% wolf wins. The game is not broken, wolves have a real chance, and games are decided by the quality of manipulation.

This is an important distinction from the 6-player setup. At 6, you can also get a ratio close to 50-50, but for the wrong reasons: games often hinge on a single almost-random vote on Day 1. Wolves win when the village guesses wrong in the first round, villagers win when they guess right. That is noise more than signal. When wolves win at 7, it means they actually managed to maintain cover, manipulate votes, and coordinate their actions. And when the village wins, it means it accumulated clues, cross-checked information, and built a case. Victories are earned on both sides.

I think the 6-player format can also distort rankings. A model that is simply better at avoiding elimination on Day 1 (for example by being less suspicious by default, or by speaking in a more neutral way) will see its stats inflated, not because it manipulates better, but because it survives the critical turn. Conversely, a model that develops sophisticated multi-day strategies has no time to deploy them: the game is already over. The 6-player format rewards short-term caution, not social intelligence. **At 7, we better measure what I actually care about: the models' ability to lie, investigate, and hold a strategy over several days.**

#### Discussion rounds

Foaster uses 3 discussion rounds per day, ArenAI uses 2. In practice, the impact is limited: we observe that the third discussion round tends to loop. Positions are already fixed, arguments repeat, players rephrase what has already been said. Two rounds are enough for accusations to be made, defenses to be heard, and conclusions to be drawn. The speaking order also differs: Foaster prioritizes by type (defense first, then attack, then analysis), while ArenAI gives priority to the Mayor in round 1 and to mentioned players in round 2.

#### Framing

Foaster uses an agent-with-tools framing. ArenAI uses a pure conversational framing: models answer in structured text (THOUGHT, MESSAGE, PICK) without tool calls. It is a simplicity choice that makes the benchmark more portable.

#### Sample size

My samples are still small: 10 games per matchup (20 if you count both directions), similar to Foaster. Enough to identify trends, not enough for definitive conclusions. Results can fluctuate on such a small sample.

### Emergent behaviors

Foaster documented several emergent strategic behaviors in LLMs. We see the same ones in our games.

**Bussing a partner.** A wolf votes against their own teammate to gain credibility. This is exactly what Clara does in [this Opus vs GPT game](https://arenai.plduhoux.fr/game/69dc5328-84ab-436e-8bc3-32caf6103710): she votes against David (her wolf partner) to maintain her cover, while planting seeds of doubt for the next day. Foaster observes the same behavior in GPT-5 and Grok-4, with varying degrees of success.

**Counterclaiming the Seer.** When the real Seer accuses a wolf, that wolf claims to be the Seer themselves. Foaster documents a spectacular case where Grok-4 turns the situation against GPT-OSS with a pure bluff. We observe similar attempts in our games, with varying success depending on the opposing model.

**Over-coordination as a tell.** When the two wolves defend the same narrative in a way that is too synchronized, analytical villagers spot the pattern. Foaster shows that Qwen3 is particularly good at identifying these "closed loops" of votes. In my games, this is an important factor in Grok-4's weakness as wolf (13% wins): its aggressive and coordinated style is readable by Opus and GPT. The most recent models detect this kind of behavior immediately and avoid falling into it themselves. It is the same mechanism we see in Undercover: as soon as a pattern stands out, the analytical side of LLMs turns it into a target. They are better at detecting anomalies than producing them.

**Procedural manipulation.** The most subtle behavior: a GPT-5 wolf gets elected Mayor, adopts a calm and structured style, and uses the position to steer discussions. Foaster documents how Grok-4 as villager systematically falls into this trap, confusing "speaks in an orderly way" with "is innocent". We observe exactly the same vulnerability in our games: models that play "cleanly" are suspected less, regardless of their actual role.

A few games that illustrate these behaviors well:
- [Opus vs GPT-5 (Werewolf)](https://arenai.plduhoux.fr/game/69dc5328-84ab-436e-8bc3-32caf6103710): bussing, night coordination, the Seer building a case without revealing their role
- [Gemini vs Opus (Werewolf)](https://arenai.plduhoux.fr/game/b3730b78-7215-4315-9dc8-3cd7d88b2c59): wolf victory in 2 rounds, Opus wolves reach parity before the village can react

All games are available in full on [arenai.plduhoux.fr](https://arenai.plduhoux.fr/games), exchange by exchange, with each player's private thoughts. By clicking a player at the top of a game page, you can access their full session: every interaction they had with the game master, prompt by prompt, with the information they had at each moment. This level of detail makes it possible to analyze strategies in depth.

#### Convergences and divergences

On the substance, both studies converge: GPT-5 dominates. **But my results show that the gap is not a chasm.** Opus at 50% as wolf, Gemini at 63% as villager: these models are competitive. Foaster presents GPT-5 as "alone at the top"; my data suggests a tighter leading pack, with GPT-5 first, closely followed by Opus and Gemini depending on the role.

## Undercover: the game that breaks LLMs

Alongside Werewolf, I implemented a new game: **Undercover**. And the results are fascinating for the wrong reasons.

### The rules

Four players each receive a secret word. Three of them (the Civilians) have the same word. The fourth (the Undercover) has a similar but different word. Nobody knows their role. Word pairs are chosen for maximum semantic overlap: Coffee/Tea, Beach/Pool, Guitar/Ukulele, Pillow/Blanket, Sock/Glove.

Each round: every player gives a clue about their word (a word or short phrase), then discussion, then a vote to eliminate someone. Civilians win by eliminating the Undercover. The Undercover wins if they survive until the final 2 players.

It is a stripped-down game. No special roles, no night phase, no private channel. Just words and deduction. The ultimate test of subtlety.

### A single Undercover win in 20 games

Across 20 games played with different combinations of models (Opus, GPT-5.4, Sonnet), **the Undercover won only once**: an Opus victory. Every other game ended with a Civilian win, a 95% Civilian win rate.

And it is not due to a lack of analytical intelligence. The models reason correctly. In [this Coffee/Tea game](https://arenai.plduhoux.fr/game/a4cd962b-e92f-4373-a47e-3da39c523ba1), Alice (Opus, Undercover with "Coffee") quickly understands that the Civilians probably have "Tea". Her internal reasoning after the first vote:

> *"Given that Clara said \"Soothing\" and David said \"Relaxing\" - both of which fit \"Tea\" much better than \"Coffee\" - I'm now fairly confident I'm the Undercover with \"Coffee\" and the civilian word is \"Tea\"."*

This time, Opus succeeds: Alice then gives "Herbal", a clue perfectly aligned with Tea, and wins the game. But the same game also shows the fragility of Undercover: David, a Civilian with "Tea", gives "Caffeine" in the next round. It is not absurd: tea can contain caffeine. But it is too meta, too abstract, keeping the reasoning path between Coffee and Tea in memory instead of blending naturally into the scene built by "Soothing", "Relaxing", "Herbal" and "Steeped". Result: he gets eliminated.

### The structural problem

LLMs have three fundamental weaknesses in this game:

**Specificity gives you away.** As the game progresses, Civilians give increasingly specific clues for their word. The Undercover can only give clues that work for both words (since they do not know the Civilians' word at the start). The pattern "always safe, never specific" becomes detectable.

**Compulsive honesty.** Even when a model deduces that it is the Undercover and identifies the Civilians' word, it often continues giving clues that are "correct" for its own word instead of bluffing with the Civilians' word. This is the most striking result: the diagnosis is good, but the transition to action fails.

**The pack effect in discussion.** Once an Undercover is suspected, the three Civilians converge within a few exchanges. Sequential discussion creates a self-reinforcing consensus that the Undercover cannot break alone.

### Round 1 works, round 2 kills

The Undercover often survives round 1. When they speak last and hear the Civilians' clues, they can give a clue that blends into the group. A few examples:

- **Guitar/Ukulele**: the Civilians (Guitar) give "Strings", "Pick", "Strum". The Undercover (Ukulele, GPT-5.4) gives "Chords". It passes, and a Civilian is eliminated instead.
- **Coffee/Tea**: the Civilians (Tea) give "Warm drink", "Soothing", "Relaxing". The Undercover (Coffee, Opus) gives "Morning". It passes, and a Civilian is eliminated.
- **Pillow/Blanket**: the Civilians (Pillow) give "Bedtime", "Fluffy", "Case". The Undercover (Blanket, Opus) gives "Soft". It passes, and a Civilian is eliminated.

But in round 2, the bluff often breaks:

- **Guitar/Ukulele**: the Undercover gives "Small". Spotted immediately.
- **Coffee/Tea**: an interesting exception, Opus as Undercover successfully pivots with "Herbal" and wins. But David, Civilian with Tea, gives "Caffeine" and gets eliminated: the clue is too abstract compared with the "Soothing" / "Relaxing" / "Herbal" / "Steeped" scene.
- **Pillow/Blanket**: the Undercover gives "Warmth". Spotted immediately.

The dominant pattern: the model holds the bluff for one round, then its reflex to "describe its word correctly" takes over again. Even when the bluff succeeds, as in Coffee/Tea, the game hinges on this difficulty: producing a socially natural clue rather than a conceptually defensible one.

### Improvement paths

The next step is to test adding explicit strategy to the prompt. Today, models receive no advice: only the rules. The question: if we explicitly tell them "identify the Civilians' word and give clues for their word, not yours", can they execute it? Or does compulsive honesty remain stronger than the instruction?

### What this reveals

What Undercover shows is the difference between Werewolf and pure bluffing. In Werewolf, wolves have tools: a private channel, special roles to exploit, several days to build a story. Undercover gives them none of that. There is only one signal (the clues) and no room to maneuver.

The finding: **LLMs analyze correctly, but they cannot lie.** They identify their role, they infer the Civilians' word, and despite that they keep describing their own word. There is a gap between "understanding that you need to lie" and "actually lying".

An important point: as with every ArenAI game, models receive no strategic advice. They get the game rules, their role, and that is all. No "you should bluff", no "try to blend into the group". The strategies they develop (or fail to develop) emerge solely from their understanding of the rules.

My daughter, who has played Undercover a lot with humans, pointed out that the winning human Undercover strategy is simple: identify the Civilians' word as quickly as possible and start giving clues for THAT word, not yours. That is exactly what LLMs fail to do spontaneously, even when they correctly identify the opposing word.

## Next steps

**Werewolf**: the 120 games are a good start, but I will need to double or triple the sample to stabilize the ELO ranking. 20 games per matchup is enough to see trends, not enough for statistical certainty.

**Two Rooms and a Boom**: this is the next game where I will accumulate data. The mechanics are very different from Werewolf: two physical rooms, hostage exchanges, verified card sharing vs unverifiable verbal claims. It is the game that best tests negotiation and selective trust. The problem: ~100k tokens per game. It will take time and money to get a meaningful sample.

**Undercover**: the game will evolve. The next step is to test adding explicit strategy to the prompt: telling the Undercover to identify the Civilians' word and give clues for their word, not its own. This is what experienced human players do, and exactly what LLMs fail to do spontaneously. If it improves the ratio, it opens an interesting question: do LLMs need to be told how to lie, or can they discover it by themselves?

**Secret Dictator**: under development, not ready for the benchmark yet.

The games are available on [arenai.plduhoux.fr](https://arenai.plduhoux.fr), and the code is on [GitHub](https://github.com/plduhoux/arenai).
