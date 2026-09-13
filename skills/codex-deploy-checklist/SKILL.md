---
name: codex-deploy-checklist
description: Pre-deployment and post-deployment checklist for safer releases.
version: 1.0.0
author: Codex
tags: [deployment, release, checklist]
---

# codex-deploy-checklist

## Description
Pre-deployment and post-deployment checklist for safer releases.

## When to Use
- Preparing to deploy or deciding whether a change is safe to ship

## Input
- Project path, change summary, target environment, and rollback expectations

## Process
1. Back up or checkpoint current state.
2. Check git status and identify unrelated changes.
3. Run build, tests, lint, or smoke checks proportional to risk.
4. Confirm secrets, routes, migrations, and access controls.
5. Deploy to the intended environment only.
6. Verify live behavior and note rollback path.

## Output
- Go/no-go status
- Checks performed
- Deployment and rollback notes

## Dependencies
- Project test/build commands
- Deployment credentials

## Agent Assignment
- Primary: opencode
- Fallback: agy
