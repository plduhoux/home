---
title: "LLMs Are Hardware"
description: "GPT vs Claude vs Gemini: what if we're having the wrong debate? LLMs are hardware. The real value is in the software you build on top."
date: 2025-12-03
tags: ["Artificial Intelligence", "Architecture", "Reflection"]
translationSlug: "llms-are-hardware"
---

## The wrong debate

GPT vs Claude vs Gemini vs Llama. We compare benchmarks, switch providers every three months. What if we're having the wrong debate?

Nobody picks their OS based on their CPU brand. The OS adapts to the hardware. The hardware is interchangeable. What matters is what runs on top.

LLMs are **hardware**. The execution layer. The processor. And the real value has never been in the silicon: it's in the software.

Yet in 2025, we build entire workflows around a specific model. We hardcode prompts optimized for Claude. We use proprietary GPT features. We create voluntary lock-in on a layer that's going to be commoditized. It's like writing applications in 1995 that only ran on a Pentium II.

## The real product is the software

Take an AI agent managing a development project. It needs to understand a spec, generate code, test it, fix errors, communicate the result.

None of these tasks are model-specific. What's specific, what has value, is everything you **build around it**:
- Orchestration: how you break down work, chain steps, handle errors
- Tooling: the tools that turn an LLM request into something useful
- Pipelines: how you connect AI to existing systems
- Verification: how you ensure the result is correct

All of this is software built on top of LLM requests. And that's what's durable.

## What changes if you believe this

**Abstraction becomes a necessity, not a luxury.** If your workflow is glued to Claude, you're hostage to Anthropic. The day a competitor blows up the benchmarks, you can't move. A good agent framework should be able to switch models like you switch databases. With an adapter, not a rewrite.

**The moat isn't where you think.** Companies building value on "we use GPT-4" have no moat. The moat is in orchestration quality, proprietary data, workflow UX, business process integration. Never in model choice. And for those who doubt it: [deathbyclawd.com](https://deathbyclawd.com) literally offers to analyze your moat and replace it with an `.md` file. Your competitive advantage fits in a prompt? It doesn't hold. (Granted, a skill that simulates how your app works doesn't actually *replace* your app. But the fact that it's possible should be enough to make you think.)

**Multi-model becomes natural.** A fast, cheap model for triage. A powerful one for complex reasoning. A specialized one for code. Just like we have a CPU for general compute and a GPU for graphics.

## The silent monopoly risk

If LLMs are hardware, then supplier diversity is vital.

Google's enterprise firepower is terrifying. G Suite is already everywhere. Gemini integrates natively into Docs, Sheets, Gmail, Meet. They show up with aggressive enterprise offers: zero retention, slashed prices, bundled with existing infrastructure. For a CIO, the choice is "obvious."

And that's exactly how you end up with a monopoly. Not by force: by comfort.

If Google captures 80% of this market with Gemini, it's not just a problem for CIOs. Competing labs lose their revenue stream, cut R&D, and end up dying or getting acquired. Fewer competitors = less innovation. We've already seen this movie with search.

## The sovereignty question

For code, the models that matter are almost all American. Claude, Codex, Gemini Code Assist. On the European side, there's Mistral. And that's about it.

Every line of code sent to these models crosses the Atlantic, runs on servers subject to the CLOUD Act. For a European company, this is a strategic problem. Your competitive advantage, your proprietary code, all of it flows through a pipe someone else controls.

The hardware analogy holds: we've already lived this with semiconductors. Europe realized too late it shouldn't have outsourced chip manufacturing. Let's not make the same mistake with code models.

**Open source models are the antidote.** Llama, Mistral, Qwen: they're not always on par with proprietary models. But they guarantee one thing: nobody can cut your access.

A healthy company should use **at minimum two providers**, including one open source. Not out of ideology. Out of strategic hygiene. And if your architecture treats the LLM as interchangeable hardware, this multi-provider approach costs almost nothing.

## Invest in the software layer

"But models are NOT interchangeable. Claude is better at code, GPT at creativity, Gemini at long context."

True. Today. Just like in 1990, software optimized for a specific CPU ran better than portable code. And yet the world chose portability. Because hardware progresses faster than software can adapt.

The gap between models shrinks with every release. Benchmarks converge. One model's strengths become another's features six months later. Optimizing for a specific model means optimizing for an advantage that's disappearing.

Invest in the software, not the model. Build abstractions. Make your workflows model-agnostic. Treat the LLM for what it is: a replaceable execution layer.

Those who get it build durable systems. The rest rebuild every six months.
