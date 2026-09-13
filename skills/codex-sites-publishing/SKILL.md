---
name: codex-sites-publishing
description: Build and publish Sites-hosted websites while preserving project IDs and private/public audience settings.
version: 1.0.0
author: Codex
tags: [sites, website, publishing, hosting]
---

# codex-sites-publishing

## Description
Build and publish Sites-hosted websites while preserving project IDs and private/public audience settings.

## When to Use
- Creating or updating a Sites website, landing page, portal, dashboard, or private staging site

## Input
- Site source folder
- Desired public/private audience
- Existing `.openai/hosting.json` when present

## Process
1. Read `.openai/hosting.json` and reuse its project ID.
2. Back up the source state before editing.
3. Build the actual user-facing experience, not only a marketing placeholder.
4. Verify responsive layout and important links locally.
5. Save a version from the exact source state that was built.
6. Deploy the saved version and preserve current audience unless the user requests a change.

## Output
- Published URL
- Version/deployment ID
- What was changed and verified

## Dependencies
- Sites hosting tools
- Build toolchain for the project

## Agent Assignment
- Primary: opencode
- Fallback: agy
