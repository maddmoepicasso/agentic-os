---
name: shared-brain-auto-notes
description: Capture meaningful Agent OS decisions, tasks, learnings, and handoffs into the local shared Obsidian vault.
version: 1.0.0
author: Agentic OS
tags: [memory, obsidian, shared-brain, auto-notes]
---

# Shared Brain Auto-Notes

Use the local Agent OS vault configured in `data/settings.json`. Save only durable, useful context: decisions, completed work, open questions, handoffs, and reusable learnings.

## Guardrails

- Write locally through the Agent OS Obsidian save path; never upload vault contents.
- Never save API keys, passwords, tokens, payment data, healthcare records, or private keys.
- Do not record speculative claims as facts; label uncertainty as an open question.
- Keep notes concise and source-linked when possible.
- Do not rewrite or delete existing user notes automatically.

## Capture format

Use one of the configured daily sections: `Decisions`, `Tasks`, `Learnings`, `Handoffs`, or `Weekly Reviews`. Include the date, a short summary, evidence/source paths, and the next action when applicable.

## Loop

1. Read the current task result and identify durable context.
2. Remove secrets and sensitive records.
3. Append a concise note to the appropriate daily section.
4. Re-read the saved note or status endpoint to verify the write.
5. Surface contradictions or approval-needed items to the operator.
