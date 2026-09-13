---
name: codex-wrangler-deploy
description: Use Wrangler safely for Cloudflare Worker and asset deployments.
version: 1.0.0
author: Codex
tags: [wrangler, deploy, workers, cloudflare]
---

# codex-wrangler-deploy

## Description
Use Wrangler safely for Cloudflare Worker and asset deployments.

## When to Use
- Deploying, previewing, listing, or debugging Cloudflare Workers with Wrangler

## Input
- Project folder and deployment goal
- Existing deployment or route details

## Process
1. Read Wrangler config and package scripts before running deploy commands.
2. Check current git status and create a backup or commit checkpoint.
3. Run local build/tests first when available.
4. Avoid leaking or relying on stale API tokens. Prefer a verified OAuth/session when available.
5. Deploy only the intended project and environment.
6. Verify live URL, routes, and logs after deployment.

## Output
- Build result
- Deployment ID/version when available
- Live URL checks

## Dependencies
- Wrangler installed
- Valid Cloudflare auth

## Agent Assignment
- Primary: opencode
- Fallback: agy
