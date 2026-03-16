---
title: "Developing an Application with a Dedicated AI Agent: Lessons Learned"
description: "How I integrated an autonomous AI agent into my development workflow, and what it concretely changed on my projects."
date: 2026-02-25
tags: ["Artificial Intelligence", "Development", "Workflow"]
translationSlug: "developper-avec-un-agent-ia"
---

## The setup

The initial idea was simple: give an AI agent its own development environment, isolated, with everything it needs to code, test and deliver. Not a copilot in an editor. A real workstation.

In practice, the agent runs in a Docker container with [OpenClaw](https://openclaw.ai), an AI agent framework. It communicates through private Discord channels, accessible only to team members. Each project has its own dedicated channel.

What it has at its disposal:
- The project's Git repos **cloned locally** in the container
- A **dedicated GitLab account** with a developer role: it can create branches and merge requests, but can't merge itself
- Its own **database** with test data
- Its own **servers**: API, front-end web server, Ionic serve for mobile app testing
- Everything exposed through **Cloudflare tunnels**, allowing immediate testing of each feature from a browser or phone

In practice, within its 6 GB of RAM, the agent runs a Strapi server (API), two Ionic serve instances (for two mobile apps in parallel), a Nuxt server for the back-office and another for the application under development. The PostgreSQL database runs in a dedicated container alongside. It manages the lifecycle of its servers on its own: starting and stopping the right services at the right time to optimize its memory.

Everything exposed through Cloudflare tunnels: when the agent develops a feature, it's accessible within seconds on a public URL.

On the security side, the model is deliberately restrictive. The agent runs in an isolated Docker container. It has no project secrets: no production API keys, no access to real databases, no sensitive credentials. The only secret it holds is a GitLab key giving it a developer role, with no merge permissions. I can kill the container and spin it back up from scratch in minutes. It's a disposable environment by design.

## The daily workflow

The agent receives a request (feature, bug fix, refactoring), develops and tests locally. On our end, we verify functionally through the Cloudflare tunnel that everything works. Once validated, it commits. Periodically, I ask it to open a merge request to integrate the work into the project, and it keeps the MR up to date with new commits. Builds and CI are my responsibility.

**On the API side, I review everything.** Always. There are security concerns: input validation, permission management, data protection. Non-negotiable, and it will stay that way.

**On the front end, I've gradually loosened the reins.** At first, it wasn't smooth. Components reinvented when they already existed, CSS built differently from the rest of the project, labels hardcoded instead of being externalized in i18n. I reviewed every merge request line by line.

Then the agent's skills evolved, the project context was better documented, and the results followed. Today, the code produced respects the architecture: the same component granularity, the same patterns, the same utility classes. It almost never gets it wrong anymore. I skim front-end MRs more than I scrutinize them.

This is probably the most surprising aspect: the agent doesn't just produce code that works. It produces code that *fits in*. Because it has access to the entire project and understands its structure.

## BMAD: starting a new project from scratch

For a new project, we use the BMAD method (a development framework driven by AI agents). The process:

1. **Brainstorm and PRD**: an analyst agent helps formalize the need, identify user stories, define scope
2. **Breakdown** into epics and features, updated regularly as new requirements emerge
3. **Agile development**: the agent implements story by story, with the same Cloudflare tunnel exposure for testing as we go
4. **Code review and iteration**: continuous feedback, corrections, adjustments

The advantage of this approach: it produces a living specification. Architecture documents evolve with the project, not against it.

I'll write a dedicated BMAD retrospective when the project entirely developed with this method is finalized and in production.

## What it unblocked

The most telling case: an application whose development was at a standstill. The project required both front-end and back-end skills, and the team didn't have the bandwidth to move forward.

With the agent, Romain, the project's designer who also plays the PO role, can now contribute directly. He discusses with the agent, describes what he wants, validates the result. The agent translates intentions into code, respecting the technical architecture.

And it changed something fundamental about feedback loops. Before, the process was: Romain provides mockups, we discuss, I implement, it goes live, and then he realizes adjustments are needed. Not necessarily implementation bugs, but user flows poorly thought out beforehand, details that don't work once you actually use them. It happens all the time. Except each round trip between detecting the problem and fixing it took considerable time. The loops piled up and development crawled.

Now, Romain works directly with the agent. Feedback is instant: he sees the result, requests an adjustment, the agent fixes it, it's live in seconds. The delivered feature immediately matches the product vision. Loops that took days now happen in minutes.

Result: development restarted, at a pace we'd never had. Features that had been sitting in the backlog for months were delivered. Long-standing bugs, never prioritized because "no time," were finally fixed. The code produced is clean, secure, tested.

## What it changes about my role

My daily work has evolved:
- **I specify with agents**: I don't write specs alone, I discuss with analyst agents to formalize needs and break down the work
- **I review**: deliverable quality depends on review quality, especially on security
- **I orchestrate**: feature order, priorities, technical trade-offs
- **I debug**: this is a significant part of the role. The agent regularly gets stuck in loops on a bug it can't fix. It's missing part of the problem, a perspective it doesn't have

This last point is crucial. When Romain works with the agent and things get stuck, he's blocked: he doesn't have the technical vision to explain to the agent what it's missing. My job is to identify the missing piece and give it to the agent. It's often quite simple once you understand the problem. But without someone who knows the project's architecture, the situation stays stuck.

After fifteen years of writing code, my role has shifted toward architecture, supervision and unblocking. **My value add is the global technical vision.**

## What I take away

Working with a dedicated AI agent isn't "having an extra developer." It's a different paradigm that demands rigor in specs, discipline in review, and infrastructure designed for agent autonomy.

But when it's in place:
- Development continues even when I'm working on something else
- Non-technical people can contribute directly
- Stalled projects restart
- Feedback loops go from days to minutes
- Code quality stays consistent with the rest of the codebase

Six months ago, the idea of maintaining and evolving a project like this with just two people, each with other activities on the side, seemed unthinkable. Today, it feels possible. We're continuing this way. The agent is now part of the team.
