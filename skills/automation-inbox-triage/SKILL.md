---
name: automation-inbox-triage
description: Sorts incoming automation ideas, pasted guides, and workflow requests into priorities and next actions.
version: 1.0.0
author: Agentic OS
tags: [automation, triage, inbox, prioritization]
---

# Automation Inbox Triage

## Description
Reviews a messy list of ideas, pasted guides, saved links, or business tasks and decides what should become a skill, prompt, Kanban task, checklist, or archive note.

## When to Use
- User pastes several automation ideas
- User asks what to do next
- New launch kits or guides need sorting
- The Kanban board is full and needs prioritization

## Input
- Raw pasted notes, links, or tasks
- User goal
- Urgency or deadline when known
- Existing board context when available

## Process
1. Extract every distinct idea or requested action.
2. Classify each item: skill, prompt, task, reference, or ignore.
3. Score each item by impact, effort, urgency, and dependency.
4. Pick the top 3 next actions.
5. Recommend what to create or update in Angelic OS.
6. Flag anything that requires credentials, paid tools, or user choice.

## Output
- Prioritized list
- Top 3 next actions
- Recommended Angelic OS destination for each item
- Credential/tool warnings

## Agent Assignment
- Primary: codex
- Fallback: opencode

## Dependencies
- Angelic OS Kanban when updating tasks
