---
name: lead-capture-router
description: Turns inbound leads into scored opportunities, follow-up tasks, and recommended next actions.
version: 1.0.0
author: Agentic OS
tags: [leads, crm, sales, routing, automation]
---

# Lead Capture Router

## Description
Processes lead information, scores intent, classifies the opportunity, and creates a recommended next action. It can be used manually or as the logic behind a future form/email automation.

## When to Use
- A new lead arrives
- User pastes a form submission, email, DM, or call note
- User wants to prioritize prospects
- Leads need to become tasks

## Input
- Lead name or company
- Message or request
- Source
- Budget/timeline if known
- Service interest

## Process
1. Extract lead details and requested outcome.
2. Score intent: low, medium, high.
3. Score fit: poor, okay, strong.
4. Classify service category.
5. Recommend next action.
6. Draft a reply.
7. Create a follow-up task if requested.

## Output
- Lead summary
- Intent/fit score
- Recommended next action
- Reply draft
- Optional task checklist

## Agent Assignment
- Primary: codex
- Fallback: opencode

## Dependencies
- Lead context supplied by user
