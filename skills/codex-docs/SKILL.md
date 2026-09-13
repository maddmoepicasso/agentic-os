---
name: codex-docs
description: Write concise technical docs, runbooks, handoffs, and setup notes.
version: 1.0.0
author: Codex
tags: [documentation, runbook, handoff]
---

# codex-docs

## Description
Write concise technical docs, runbooks, handoffs, and setup notes.

## When to Use
- Creating or updating README files, runbooks, setup guides, API docs, or project handoffs

## Input
- Project context, target audience, and desired document type

## Process
1. Read existing docs first.
2. Match the project voice and structure.
3. Write for the next person who has to operate or change the system.
4. Include exact commands and paths only when they are stable and useful.
5. Keep secrets out of docs.
6. Verify links, commands, and file references when practical.

## Output
- Updated documentation
- Short summary of changed sections

## Dependencies
- Existing docs and project files

## Agent Assignment
- Primary: opencode
- Fallback: agy
