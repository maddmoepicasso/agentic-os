# MEMORY.md — Hermes Persistent Memory

## Active Context
- Building Agentic OS (May 2026)
- 3-agent system: opencode + Hermes + agy
- Web dashboard on FastAPI
- v0.2.0 released Jun 5, 2026 — 68 features (51 ref + 10 extras + 7 new), 58 endpoints, 20 pages

## v0.2.0 Features
- Kanban Board: 6-column task management via data/kanban/ JSON files
- Goals: Project targets auto-synced to brain/active-projects.md via data/goals.json
- Journal: Daily entries stored as brain/journal/YYYY-MM-DD.md
- Agent Health: Real-time status checks for all 3 agents
- Smart Router: Keyword-based task routing with confidence scoring
- Learning Analytics: Skill evaluation scores and trends
- Session Replay: Browse opencode session logs from dashboard

## Skills Known
- heartbeat: system health monitoring
- devops-audit: GCP/K8s infra audit
- content-draft: content writing
- code-review: PR review
- research-synthesis: web research
- daily-standup: morning briefing
- meeting-minutes: notes processor
- project-planner: implementation plans
- brainstorming: design refinement
- systematic-debug: 4-phase debugging
- memory-consolidation: weekly synthesis
- backup-skill: snapshot creation
- cost-analytics: token tracking
- tdd-cycle: red-green-refactor
- goal-planner: step-by-step plans

## Decisions
- All memory in markdown for cross-agent compatibility
- Git auto-versioning for brain/ and skills/
- Free-tier budget guardian active

## v0.20+ Herald Release Capabilities

Installed check on 2026-09-13 reported Hermes Agent v0.21.1, with an upstream update available.

Use Hermes for these active Agent OS jobs:

- Voice conversations: streaming speech, interruption, wake words, and hands-free stop flow where supported.
- Grounded citations: research and fact-checking with verifiable sources.
- Desktop artifacts: generated HTML/apps can run beside the chat in sandboxed preview.
- Plugin platform: Kanban and future Agent OS plugins should be treated as active work surfaces.
- CLI power commands: `!`, `/init`, `/diff`, `/context`, `/focus`, Ctrl+S stash, and `hermes import-agent`.
- Mid-turn correction: operator can redirect work while Hermes is running instead of restarting.
- Long autonomous work: tool-call limit increased significantly; use for longer scheduled and goal-mode tasks with safety checks.
- Webhooks: Hermes can push signed events to dashboards, CI, or automations.
- A2A v1.0: Hermes can discover and coordinate with other agents.

Operational rule: upgrade with `hermes update` and verify with `hermes doctor` only when the operator approves the update. Do not enter or expose API keys.


## Durable Learning Command (2026-09-14)

- Agent OS chat recognizes /learn followed by a URL, local path, pasted notes, or a description of a completed workflow.
- The canonical recipe is C:\Angels\agentic-os\skills\learn-workflow\SKILL.md.
- Always preview the proposed skill and destination before writing unless Maurice explicitly disables the approval gate.
- Synchronized discovery copies are installed for native Hermes and Codex; the Agent OS copy remains the maintained source.
