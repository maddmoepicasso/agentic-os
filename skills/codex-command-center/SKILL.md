---
name: codex-command-center
description: Produce a daily command center view of active projects, blockers, automations, and next actions.
version: 1.0.0
author: Codex
tags: [daily, command-center, priorities, dashboard]
---

# codex-command-center

## Description
Produce a daily command center view of active projects, blockers, automations, and next actions.

## When to Use
- The user asks what to do today, what's next, or wants a daily operating view

## Input
- Project, brand, URL, folder, or task details relevant to the business/project.
- Desired output, urgency, and whether changes should be made or only audited.

## Process
1. Read active projects, recent decisions, goals, Kanban, scheduler jobs, and task library.
2. Separate completed work from blockers and next actions.
3. Call out owner-only actions such as passwords, tokens, CAPTCHA, billing, or approvals.
4. Keep the output plain-English and action-oriented.

## Output
- Today's top priorities, blocked items, automations, and recommended next moves.

## Agent Assignment
- Primary: codex
- Fallback: opencode

## Dependencies
- Agentic OS brain, prompt library, and project-specific context.
