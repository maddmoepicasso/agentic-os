# Prime Agent Self-Upgrade Loop for Agentic OS

Prime Agent should be treated as an optional self-improving agent lane inside
Agentic OS, not as an unchecked replacement for the control plane.

## Operating Model

The loop has three parts:

1. Clean memory: keep only useful working context in the active session.
2. Saved lessons: write durable corrections, preferences, and failure modes to
   the relevant skill `learnings.md` or project memory.
3. Compounding results: review those lessons, turn repeated workflows into
   skills, and measure whether the skill gets better over time.

Agentic OS maps those parts to existing primitives:

- `brain/` and SQLite memory search hold durable system memory.
- `skills/*/learnings.md` stores skill-specific corrections.
- `skills/*/eval.json` and `score-history.json` track quality.
- `scheduler/jobs/*.json` runs heartbeats and recurring reviews.
- `/api/skills/generate` packages repeated workflows as new skills.

## Setup SOP

1. Install Prime Agent only on a low-stakes workspace first.
2. Log in with an existing supported AI subscription or a local model provider.
3. Run one small task in plain English.
4. When it misses, correct the behavior and run `/refine`.
5. Close and reopen a session to verify the lesson persisted.
6. Record the useful lesson in Agent OS memory or the matching skill notebook.
7. Promote repeated workflows into Agent OS skills only after a clean dry run.

Windows users should run Prime Agent through WSL unless native support is
verified for the installed version.

## Commands to Standardize

- `/refine`: capture a correction as a durable lesson.
- `/go`: create an objective that survives across sessions.
- Heartbeat: schedule recurring checks or research runs.
- Autonomous mode: run within explicit time, token, and quality-gate budgets.
- Skill creator: convert repeated workflows into executable skills.

## Safety Rules

1. Review notebooks weekly and delete wrong or harmful lessons.
2. Assume Prime Agent runs with real user permissions. Do not point it at live
   business systems until it has passed low-stakes tests.
3. Treat benchmark claims as directional until independently verified.
4. Never let an autonomous run ship, deploy, trade, email, delete, or publish
   without explicit project policy allowing that action.

## 30-Day Adoption Roadmap

### Week 1: Install and First Win

- Day 1: Install and authenticate.
- Day 2: Run one small task such as organizing files or summarizing docs.
- Day 3: Correct the first miss and run `/refine`.
- Day 4: Start a fresh session and confirm it remembered.
- Day 5: Read the notebook and inspect what was saved.
- Day 6: Give it one weekly repetitive task.
- Day 7: Review lessons and delete anything wrong.

### Week 2: First Skill

- Day 8: Pick the most repeated business task.
- Day 9: Walk through it once in plain English.
- Day 10: Correct every miss and persist useful corrections.
- Day 11: Package the workflow as an Agent OS skill.
- Day 12: Run the skill fresh and fix gaps.
- Day 13: Add a second candidate skill.
- Day 14: Review the notebook.

### Week 3: Hands-Off Tests

- Day 15: Set the first `/go` objective.
- Day 16: Test autonomous mode with a small token budget.
- Day 17: Add quality gates that must pass before completion.
- Day 18: Test recovery after closing and reconnecting.
- Day 19: Add a heartbeat schedule for a low-risk recurring run.
- Day 20: Give it a morning goal and review at night.
- Day 21: Audit lessons and roll back anything that reduced quality.

### Week 4: Scale and Compound

- Day 22: Spawn a parallel sub-agent for a bounded task.
- Day 23: Add conditional workflow routing.
- Day 24: Move one real but reversible business workflow onto it.
- Day 25: Save client preferences and writing rules to the right memory file.
- Day 26: Compare token usage against the prior workflow.
- Day 27: Add skill candidates three and four.
- Day 28: Run a full notebook audit.
- Day 29: Document the setup so it can be rebuilt quickly.
- Day 30: Set next-month objectives.

## Weekly Audit Checklist

- Remove lessons that encourage shortcuts, policy bypasses, or stale facts.
- Confirm every promoted skill has a clear owner, scope, input, output, and
  quality gate.
- Check `score-history.json` for real improvement rather than repeated passing
  on easy cases.
- Capture one new reusable lesson from the week, or explicitly record that no
  new lesson was worth saving.
