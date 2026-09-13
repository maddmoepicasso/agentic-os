---
name: codex-cloudflare-access
description: Configure and audit Cloudflare Access and Zero Trust protection for private apps and API routes.
version: 1.0.0
author: Codex
tags: [cloudflare, access, zero-trust, security]
---

# codex-cloudflare-access

## Description
Configure and audit Cloudflare Access and Zero Trust protection for private apps and API routes.

## When to Use
- A site, API, dashboard, health endpoint, or tool should not be publicly reachable
- Cloudflare Access, Zero Trust, identity policies, or bypass rules are involved

## Input
- Protected hostname/path
- Allowed user emails or groups
- Any public bypasses that must remain available, such as Stripe webhooks

## Process
1. Confirm which routes must be private and which must stay public.
2. Back up existing Access app and policy details before editing.
3. Create or update Access apps with the narrowest matching hostname/path.
4. Add explicit allow policies for the owner/team.
5. Preserve necessary public bypasses only when required.
6. Verify private routes return the Access redirect/login flow and public bypasses still work.

## Output
- Protected route list
- Access app/policy names or IDs
- Verification result for each route

## Dependencies
- Cloudflare Zero Trust access
- Owner email or identity provider policy

## Agent Assignment
- Primary: opencode
- Fallback: agy
