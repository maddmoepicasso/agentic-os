---
name: codex-pmo-bot-ops
description: Operate PMO Bot safely with paper-trading guardrails, broker checks, and deployment health verification.
version: 1.0.0
author: Codex
tags: [pmo-bot, trading, safety, operations]
---

# codex-pmo-bot-ops

## Description
Operate PMO Bot safely with paper-trading guardrails, broker checks, and deployment health verification.

## When to Use
- PMO Bot health checks, paper-trading readiness, deployment repair, broker sync, or route audits

## Input
- PMO Bot project path
- Desired mode: diagnostic, paper readiness, deployment repair, or audit

## Process
1. Confirm trading mode before running anything that can affect orders.
2. Back up code, env samples, scheduler settings, and logs before edits.
3. Verify broker identity, account mode, and live-trading lock state.
4. Run focused safety tests and route audits.
5. Keep paper mode strict unless the owner explicitly authorizes live trading changes.
6. Report owner-only blockers such as secrets, SMTP passwords, or token rotation.

## Output
- Health/readiness summary
- Tests passed/failed
- Remaining user-only blockers

## Dependencies
- PMO Bot files
- Local credentials kept out of chat

## Agent Assignment
- Primary: opencode
- Fallback: agy
