---
name: launch-kit-executor
description: Turns an imported launch kit into an actionable checklist, priority plan, and first execution task.
version: 1.0.0
author: Agentic OS
tags: [launch-kit, execution, planning, kanban]
---

# Launch Kit Executor

## Description
Takes one of the imported launch kit tasks and turns it into a concrete execution plan. It extracts what the kit appears to be for, what assets are needed, what to build first, and how to track progress.

## When to Use
- User picks a launch kit from the Kanban board
- User asks "do this launch kit"
- User wants to prioritize the imported launch kits
- A launch kit link needs to become an implementation plan

## Input
- Launch kit name
- Link or notes
- Desired business outcome
- Time available
- Tools available

## Process
1. Summarize the launch kit goal from its name and notes.
2. Ask for the kit contents if the link is not accessible.
3. Identify the first valuable deliverable.
4. Break implementation into checklist tasks.
5. Recommend which Angelic OS skills to use.
6. Create a simple timeline.
7. Define done criteria.

## Output
- Launch kit execution plan
- First three tasks
- Required assets
- Suggested skills
- Done criteria

## Agent Assignment
- Primary: codex
- Fallback: opencode

## Dependencies
- Launch kit content or link
