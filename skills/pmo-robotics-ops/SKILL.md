---
name: pmo-robotics-ops
description: Operate PMO Robotics as a private Cloudflare Access-protected project.
version: 1.0.0
author: Codex
tags: [pmo-robotics, cloudflare-access, private]
---

# pmo-robotics-ops

## Description
Operate PMO Robotics as a private Cloudflare Access-protected project.

## When to Use
- PMO Robotics site, access, or privacy questions

## Input
- Project, brand, URL, folder, or task details relevant to the business/project.
- Desired output, urgency, and whether changes should be made or only audited.

## Process
1. Treat PMO Robotics as private by default.
2. Verify Cloudflare Access before sharing URLs.
3. Preserve only explicitly required public webhook bypasses.
4. Report any publicly reachable route as urgent.

## Output
- Access status, private route checks, and fix list.

## Agent Assignment
- Primary: codex
- Fallback: opencode

## Dependencies
- Agentic OS brain, prompt library, and project-specific context.
