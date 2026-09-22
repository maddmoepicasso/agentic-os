---
name: hermes-muse-restoke
description: Re-stoke Hermes Muse by refreshing the furnace cache and producing the daily ranked content idea board.
version: 1.0.0
author: Agent OS
tags: [hermes, muse, content, scheduler]
---

# Hermes Muse Restoke

Refreshes the Hermes Muse furnace board.

## What It Does

- Reads Hermes Muse settings.
- Refreshes the local furnace cache at `~/.agentic-os/furnace/latest.json`.
- Produces winners and forged ideas using the current Heat Score contract.
- Logs the run to Agent OS audit history and learnings.

## Current Boundary

This skill is directly handled by the Agent OS backend. It currently uses the local starter-board generator until the live YouTube public-page parser is verified.
