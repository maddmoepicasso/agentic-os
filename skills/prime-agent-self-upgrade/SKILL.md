---
name: prime-agent-self-upgrade
description: Run the Prime Agent self-upgrade loop inside Agentic OS with memory hygiene, saved lessons, quality gates, and weekly notebook review.
---

# Prime Agent Self-Upgrade

Use this skill when installing, testing, refining, or operationalizing Prime
Agent inside Agentic OS.

## Inputs

- `workspace`: the low-stakes project or workflow being tested.
- `objective`: the current Prime Agent goal.
- `corrections`: mistakes, user preferences, or workflow rules to preserve.
- `quality_gates`: checks that must pass before the work is accepted.
- `risk_level`: `low`, `medium`, or `high`.

## Procedure

1. Confirm the target is low-stakes or reversible before starting.
2. Keep the active context small: summarize stale context and retain only files,
   goals, constraints, and open decisions needed for the run.
3. Run or supervise the Prime Agent task with explicit budgets for time, turns,
   and tokens.
4. When the user corrects the agent, save the durable lesson with `/refine` and
   mirror the lesson into the relevant Agent OS memory file or skill
   `learnings.md`.
5. Convert repeated workflows into Agent OS skills only after a successful dry
   run and a clear quality gate.
6. Record outcomes in `score-history.json` when the workflow has measurable
   pass/fail or quality scores.
7. Review the notebook weekly and remove stale, harmful, or accidental lessons.

## Safety Gates

- Do not use live business systems on day one.
- Do not allow autonomous mode to deploy, publish, trade, email, delete, or
  modify production data unless project policy explicitly allows it.
- Treat benchmark claims as unverified unless independently checked.
- Escalate to the operator when a saved lesson optimizes for cheating,
  bypassing policy, or passing tests without fulfilling intent.

## Outputs

- Updated Prime Agent notebook or Agent OS learning entry.
- A short run summary with objective, correction, persisted lesson, and next
  quality gate.
- Optional promoted skill with `SKILL.md`, `learnings.md`, `eval.json`, and
  `score-history.json`.

## Definition of Done

- The correction is saved in the right durable memory location.
- The next run can use the lesson without relying on chat history.
- Any autonomous run has explicit budgets and quality gates.
- The weekly audit queue includes this run if new lessons were saved.
