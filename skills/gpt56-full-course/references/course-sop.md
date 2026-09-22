# Full-course operating map

| Step | Agent OS route | Completion evidence |
|---|---|---|
| Model selection | Model policy in this skill | Selected model and effort recorded |
| Social media | `social-post-scheduler` + `content-repurposing-engine` | Draft, review, and authorized publisher result |
| Images | Installed image-generation capability | Saved asset plus visual review |
| Deep research | Deep-research or `research-synthesis` workflow | Cited research artifact |
| Projects | Project instructions and Obsidian vault notes | Current sources, goals, voice, and constraints |
| Reusable assistant | A focused skill or custom GPT | Tested examples and documented boundary |
| Scheduled tasks | Codex automation or Agent OS scheduler | Active schedule and successful test run |
| Connected apps | Plugin registry and configured connector | Connection check without exposing secrets |
| Prompt improvement | `codex-task-library` | Versioned prompt with failure lesson and test |
| Codex execution | Project-scoped Codex task | Backup, smallest change, tests, and handoff |
| Computer use | Computer-use capability | Supervised dry run before external mutation |
| Video | `avatar-video-pipeline`; optional renderer | Script, shot list, render, captions, and QA |
| Publishing | `launch-kit-executor` or publishing skill | Preview, approval, deployment evidence, rollback |

## Gate definitions

- `READY`: installed, configured, and locally verifiable.
- `AVAILABLE`: the capability exists, but this audit did not prove an account connection or successful external run.
- `SETUP_REQUIRED`: a required skill, executable, integration, permission, or credential is absent.
- `BLOCKED`: a safety, authorization, or verification requirement prevents execution.

Never upgrade an external integration from `AVAILABLE` to `READY` solely because a token-shaped setting exists. Verify through the provider without printing sensitive values.

