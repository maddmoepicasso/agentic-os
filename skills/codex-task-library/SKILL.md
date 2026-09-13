---
name: codex-task-library
description: Build and maintain a personal Codex playbook of reusable high-performing task prompts.
version: 1.0.0
author: Codex
tags: [codex, prompts, playbook, productivity, task-library]
---

# codex-task-library

## Description
Builds a personal Codex playbook from tasks that work well, then turns them into reusable prompts, checklists, and repeatable workflows.

## When to Use
- The user says "save this prompt", "make this repeatable", "add this to the playbook", or "build a task library"
- A Codex task worked especially well and should become reusable
- The user wants a weekly brief, client reply, KPI summary, audit, SEO post, deployment checklist, or business workflow prompt

## Input
- A successful task or workflow
- The desired reuse case
- Optional project, business, audience, cadence, and output format

## Process
1. Capture the task name in plain language.
2. Record the exact reusable prompt or template.
3. Add when to use it, what inputs it needs, and what output it should produce.
4. Store business-specific prompts separately when useful.
5. Keep prompts honest, non-spammy, and specific to the user's real systems.
6. Update the playbook after real runs with what worked, what failed, and better wording.

## Output
- A reusable prompt entry
- A categorized task-library note
- Optional scheduler/automation suggestion when the task is recurring

## Agent Assignment
- Primary: codex
- Fallback: opencode

## Dependencies
- `brain/codex-task-library.md`
- `prompts/*.md`
