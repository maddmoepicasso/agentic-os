---
name: codex-cloudflare
description: Plan, inspect, and operate Cloudflare Workers, Pages, DNS, storage, tunnels, and infrastructure safely.
version: 1.0.0
author: Codex
tags: [cloudflare, workers, pages, dns, infra]
---

# codex-cloudflare

## Description
Plan, inspect, and operate Cloudflare Workers, Pages, DNS, storage, tunnels, and infrastructure safely.

## When to Use
- Cloudflare Workers, Pages, DNS, KV, D1, R2, tunnels, routing, or deployment tasks
- Cloudflare debugging, audits, and configuration reviews

## Input
- Target domain, Worker/Page name, repository path, or Cloudflare dashboard context
- Desired change or symptom

## Process
1. Read project config first: `wrangler.toml`, `wrangler.jsonc`, `.openai/hosting.json`, package files, and deployment notes.
2. Make a backup or git checkpoint before changing files or config.
3. Prefer official Cloudflare config and CLI paths over ad hoc dashboard changes.
4. Separate public routes from protected/private routes.
5. Verify with direct URL checks and deployment logs after every material change.
6. Record what changed, what was verified, and what remains blocked.

## Output
- A concise Cloudflare action summary
- Verified URLs, deployment names, and remaining owner-only steps

## Dependencies
- Cloudflare account/session or Wrangler credentials
- Project config files

## Agent Assignment
- Primary: opencode
- Fallback: agy
