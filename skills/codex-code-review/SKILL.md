---
name: codex-code-review
description: Review code for correctness, security, regressions, and missing tests.
version: 1.0.0
author: Codex
tags: [code-review, security, quality]
---

# codex-code-review

## Description
Review code for correctness, security, regressions, and missing tests.

## When to Use
- Reviewing a diff, PR, deployment candidate, or risky code change

## Input
- Diff, PR link, changed files, or branch

## Process
1. Read the diff and surrounding code.
2. Prioritize findings by severity.
3. Look for correctness, security, data loss, performance, and compatibility risks.
4. Check tests and identify missing coverage.
5. Avoid style-only comments unless they hide real risk.

## Output
- Findings first, ordered by severity
- File/line references
- Open questions and test gaps

## Dependencies
- Git diff or code access

## Agent Assignment
- Primary: opencode
- Fallback: agy
