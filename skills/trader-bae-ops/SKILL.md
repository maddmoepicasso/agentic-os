---
name: trader-bae-ops
description: Run Trader Bae site repair, deployment checks, image/profile QA, and Cloudflare publishing tasks.
version: 1.0.0
author: Codex
tags: [trader-bae, website, cloudflare, deploy]
---

# trader-bae-ops

## Description
Run Trader Bae site repair, deployment checks, image/profile QA, and Cloudflare publishing tasks.

## When to Use
- Trader Bae website, mobile layout, profile image, or deployment tasks

## Input
- Project, brand, URL, folder, or task details relevant to the business/project.
- Desired output, urgency, and whether changes should be made or only audited.

## Process
1. Back up before edits.
2. Test desktop and mobile widths.
3. Verify profile images, cards, and overflow.
4. Deploy only when authorized and verify live URL after.

## Output
- Repair status, test results, deployment status, and blockers.

## Agent Assignment
- Primary: codex
- Fallback: opencode

## Dependencies
- Agentic OS brain, prompt library, and project-specific context.
