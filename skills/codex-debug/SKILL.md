---
name: codex-debug
description: Reproduce, isolate, fix, and verify software failures with a disciplined debugging loop.
version: 1.0.0
author: Codex
tags: [debugging, repair, tests]
---

# codex-debug

## Description
Reproduce, isolate, fix, and verify software failures with a disciplined debugging loop.

## When to Use
- Something is broken, failing, slow, incorrect, or different from expected

## Input
- Error message, failing behavior, logs, test output, or user report

## Process
1. Reproduce or observe the failure.
2. Inspect the narrowest relevant files and config.
3. Form a concrete cause hypothesis.
4. Make the smallest safe fix.
5. Run focused verification.
6. Summarize cause, fix, and residual risk.

## Output
- Root cause
- Fix summary
- Verification results

## Dependencies
- Logs, tests, or runnable reproduction path

## Agent Assignment
- Primary: opencode
- Fallback: agy
