---
name: client-follow-up-automation
description: Creates follow-up sequences for leads, prospects, clients, and dormant opportunities.
version: 1.0.0
author: Agentic OS
tags: [sales, email, follow-up, clients, crm]
---

# Client Follow-Up Automation

## Description
Builds simple follow-up sequences that help turn conversations into booked calls, replies, proposals, or next actions. It can create email, DM, SMS-style, or task-based follow-ups.

## When to Use
- A prospect has not replied
- A client needs next steps
- A lead came in from a form or social channel
- User needs a follow-up campaign

## Input
- Contact context
- Offer or service
- Last interaction
- Desired next action
- Channel
- Tone

## Process
1. Identify relationship stage: cold, warm, proposal sent, active client, dormant client.
2. Define one clear next action.
3. Write a 3-7 message sequence.
4. Add timing between messages.
5. Include personalization fields.
6. Keep messages short, direct, and low-pressure.
7. Create a Kanban follow-up checklist when useful.

## Output
- Follow-up sequence
- Timing plan
- Personalization fields
- Optional Kanban checklist

## Agent Assignment
- Primary: codex
- Fallback: opencode

## Dependencies
- Contact context supplied by user
