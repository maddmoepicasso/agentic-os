---
name: workflow-qa-checker
description: Reviews an automation workflow for missing steps, unsafe assumptions, credentials, failure paths, and test cases.
version: 1.0.0
author: Agentic OS
tags: [workflow, qa, testing, safety, automation]
---

# Workflow QA Checker

## Description
Checks a planned or built automation before it is trusted. It looks for missing triggers, unclear inputs, weak outputs, unsafe permissions, credential risks, and absent test cases.

## When to Use
- Before running a new automation
- Before turning a workflow into a reusable skill
- After importing a third-party template
- When a workflow fails or behaves unpredictably

## Input
- Workflow description or skill text
- Tools/services involved
- Expected trigger and output
- Current failure or concern, if any

## Process
1. Identify the workflow trigger, inputs, steps, outputs, and owner.
2. Check for missing credentials, unclear permissions, or unsafe file/network actions.
3. Check for failure paths and retry behavior.
4. Check whether the output is measurable.
5. Create a minimal test plan.
6. Recommend fixes before the workflow is used.

## Output
- QA report
- Risk list
- Missing pieces
- Minimal test plan
- Pass/fail recommendation

## Agent Assignment
- Primary: codex
- Fallback: opencode

## Dependencies
- Workflow text or implementation details
