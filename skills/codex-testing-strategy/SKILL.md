---
name: codex-testing-strategy
description: Choose and run tests proportional to risk, from smoke checks to broader regression coverage.
version: 1.0.0
author: Codex
tags: [testing, qa, verification]
---

# codex-testing-strategy

## Description
Choose and run tests proportional to risk, from smoke checks to broader regression coverage.

## When to Use
- Deciding how to test a feature, repair, deployment, bot, site, or data workflow

## Input
- Change summary, risk level, available test commands, and user-facing surfaces

## Process
1. Identify the behavior that must not break.
2. Run focused tests for the changed area.
3. Add broader checks when shared code, security, auth, payments, or deployment routes are affected.
4. For frontends, verify important viewports and links.
5. Report what was tested and what was not.

## Output
- Test plan or executed test summary
- Remaining risks and next checks

## Dependencies
- Test commands, browser, or local app runner

## Agent Assignment
- Primary: opencode
- Fallback: agy
