# Obsidian + Agent OS Project Prompt Kit

Use these prompts to turn Obsidian into the durable memory and planning layer for Agent OS. Replace anything in `[BRACKETS]`, then copy the prompt into your preferred agent.

## 1. Create a New Project

```text
Help me turn the following idea into a structured Obsidian project:

[DESCRIBE THE IDEA]

Create a clear objective, problem statement, success criteria, scope, non-goals, requirements, assumptions, constraints, milestones, risks, open questions, and the next three concrete actions.

Format the result as Markdown for an Obsidian Project.md note. Include YAML properties for status, project_type, priority, owner, created, target_date, current_phase, next_review, related_projects, and tags. Use [[Obsidian links]] for concepts that deserve separate notes. Do not invent missing facts; label assumptions clearly.
```

## 2. Convert a Project into an Agent OS Specification

```text
Read the project information below and convert it into an Agent OS-ready specification.

[PASTE OR LINK PROJECT NOTES]

Include the objective, stakeholder, problem statement, context, functional requirements, non-functional requirements, constraints, non-goals, acceptance criteria, deliverables, dependencies, risks, human decisions, verification plan, and definition of done.

Do not invent missing requirements. Put uncertainties under Questions Requiring Human Decisions. Produce clean Markdown that an AI agent can use as the authoritative specification.
```

## 3. Generate Project-Specific Agent Instructions

```text
Create an Agent Instructions.md file for this project.

Project context:
[PASTE PROJECT SUMMARY]

Define the agent's role, objective, sources of truth, files it must read, standards it must follow, actions it may perform autonomously, actions requiring approval, prohibited actions, verification requirements, reporting format, work-log requirements, and stop conditions.

Make the instructions concise, explicit, and difficult to misinterpret. Never place secrets, credentials, private keys, payment data, or sensitive personal records in the note.
```

## 4. Improve an Existing Project

```text
Act as a project strategist and critical reviewer. Review this project note:

[PASTE NOTE]

Identify unclear goals, missing requirements, hidden assumptions, scope creep, weak success criteria, unresolved dependencies, untracked risks, missing decisions, vague tasks, and information an AI agent needs before acting.

Then provide an improved version while preserving confirmed information. Clearly label every inference and open question.
```

## 5. Process Messy Notes

```text
Organize the raw notes below without losing meaningful information:

[PASTE NOTES]

Separate them into projects, tasks, decisions, ideas, questions, reference information, people or organizations, dates, and commitments. Recommend note titles, folders, YAML properties, and meaningful [[internal links]]. End with a short inbox-processing checklist. Do not create links based only on shared words.
```

## 6. Create an Actionable Execution Plan

```text
Using this project specification:

[PASTE SPECIFICATION]

Create an execution plan with phases in dependency order, deliverables, small verifiable tasks, dependencies, approval checkpoints, validation steps, completion criteria, and recommended agent-versus-human ownership.

Every task must begin with a verb and produce an observable result. Flag any task that could delete data, publish externally, spend money, contact someone, change production, or affect a high-risk system as APPROVAL REQUIRED.
```

## 7. Run an Agent OS Preflight Check

```text
Before beginning work, audit this project package:

[PASTE PROJECT FILES OR SUMMARIES]

Check for a clear objective, authoritative source of truth, complete requirements, boundaries, acceptance criteria, required access, verification method, backup or rollback approach, approval boundaries, and definition of done.

Return exactly one verdict: READY, READY WITH ASSUMPTIONS, or BLOCKED. List the precise reason for every assumption or blocker. Do not begin execution.
```

## 8. Capture a Decision Record

```text
Turn this discussion into an Obsidian decision record:

[PASTE DISCUSSION]

Include decision, date, status, context, options considered, benefits, drawbacks, rationale, consequences, risks, follow-up actions, affected projects, and conditions for revisiting the decision. Suggest appropriate [[links]] and YAML properties. Separate confirmed decisions from proposals.
```

## 9. Record an Agent Run in Project Memory

```text
Convert this agent activity into a concise project Work Log entry:

[PASTE AGENT OUTPUT OR ACTIVITY]

Record the date, objective, completed work, files or systems changed, decisions, assumptions, backup created, verification performed, results, problems, remaining tasks, and recommended next action. Separate confirmed facts from interpretations. Do not repeat noisy command output or store secrets.
```

## 10. Run a Weekly Project Review

```text
Review these active-project notes:

[PASTE PROJECT SUMMARIES]

For each project, determine its health, recent progress, bottleneck, overdue commitments, missing decisions, risks, next milestone, single most valuable next action, and whether it should continue, pause, delegate, or archive.

Finish with a prioritized plan for the coming week. Explain priority conflicts and identify anything awaiting human approval.
```

## 11. Discover Connections Across the Vault

```text
Analyze these notes for meaningful relationships:

[PASTE NOTES OR SUMMARIES]

Find shared goals, duplicate work, reusable research, conflicting decisions, common dependencies, potential projects, projects that should be combined, and knowledge that should become a reusable Agent OS standard or instruction.

Recommend specific [[internal links]]. Do not suggest links based merely on shared vocabulary.
```

## 12. Design an Obsidian Project Dashboard

```text
Design an Obsidian project dashboard using consistent Properties and Bases.

I need views for active projects, blocked or at-risk projects, current phase, priority, target date, next action, next review date, unanswered questions, projects awaiting approval, and recently completed projects.

Propose the property schema, allowed values, Base views, filters, grouping, and sorting. Keep the system simple enough to maintain consistently and make all fields readable by Agent OS.
```

## Recommended Agent OS Working Rule

Before acting, read the project's `Project.md`, specification, decisions, and agent instructions. During execution, follow approval boundaries and verify work. After execution, update `Work Log.md`, decisions, tasks, and unresolved questions so Obsidian remains the durable source of truth.
