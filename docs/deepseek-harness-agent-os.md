# DeepSeek Harness Lab Notes

Source request: https://www.youtube.com/watch?v=uag_fnGyh10&t=192s

Status: implementation brief created from the user's supplied guide, then checked against DeepSeek's official Harness page, quickstart docs, and GitHub README on 2026-09-13. The raw YouTube caption track could not be fetched from this environment, so this is not a verbatim transcript.

## What It Is

DeepSeek Harness is an open-source agent harness, not just a model. It provides the body around an AI model: workspace access, tools, session handling, memory surfaces, sandbox policy, plugins, runtime modes, and UI.

The Agent OS framing is:

- Model: the brain that generates the next action.
- Harness: the operating body that lets the brain inspect files, call tools, use memory, keep logs, and complete work.
- Agent OS: the control plane that decides where Harness belongs beside Codex, Hermes, Kilo, opencode, and other lanes.

## Verified Claims

- Launch command: `npx @deepseek-ai/dsh web`.
- Default local Web UI: `http://127.0.0.1:3080`.
- Install prerequisite: Node.js.
- Architecture: everything is a plugin, including models, tools, skills, sessions, sandboxes, storage, loops, scheduling, and UI.
- Runtime traceability: Harness records system prompts, tool calls/results, subagent scheduling, context injection, and related session events in an append-only session log used by Trajectory view.
- Runtime modes include Standard, Code, Minimal, and Creator.
- Project state: developer preview, compatibility-breaking changes expected.
- License: MIT.

## Agent OS Positioning

DeepSeek Harness should enter Agent OS as an experimental lab lane, not as a replacement for Codex or Hermes.

Use it when:

- Testing an open, local-first agent runtime.
- Comparing models on the same task under a visible tool loop.
- Reviewing plugin architecture or building Harness-specific plugins.
- Running one tiny disposable test with explicit review.

Avoid it for:

- Business-critical automations, supervised or unsupervised.
- Unreviewed remote plugins.
- Workspaces without a fresh backup.
- Secret-heavy tasks until local credential handling is verified.

## Lab Checklist

### S - Setup

1. Confirm Node.js is installed.
2. From the intended workspace, run:

   ```powershell
   npx @deepseek-ai/dsh web
   ```

3. Open `http://127.0.0.1:3080`.
4. Treat first launch as an experiment. Do not use production credentials or irreplaceable files.

### W - Wire

1. Choose the Agent OS workspace in the Harness UI.
2. Add or reference the relevant instruction files:
   - `AGENTS.md`
   - `agents/codex/AGENTS.md`
   - `brain/business-brain.md`
   - `brain/constitution.md`
3. Configure a model provider in Harness settings. Store keys in Harness/provider settings or local secret storage, not in source.
4. Run: "Summarize this workspace and list the operating rules you found."

### A - Assign

Start with one small job:

- Weekly competitor watch.
- Draft outline generator.
- Research digest.
- SOP cleanup.
- Plugin discovery and review.

Acceptance criteria:

- It cites the files or URLs it inspected.
- It leaves a readable summary.
- It records enough Trajectory history for review.
- It does not modify business-critical files unless explicitly approved.

### P - Pause And Review

1. Review new plugins as separate candidates.
2. Test each plugin in a disposable session.
3. Record what changed in `brain/recent-decisions.md`.
4. Promote only after the plugin has a clear job, safe permissions, and a rollback path.

## 30-Day Rollout

Week 1: install, launch, inspect settings, run daily small tests, and read Trajectory logs.

Week 2: wire Agent OS context and compare the same prompt across Codex, Hermes, Kilo, opencode, and Harness.

Week 3: assign one disposable non-production task and measure usefulness, crashes, failures, cost, and review burden.

Week 4: decide whether it remains lab-only. Promote nothing until stability, permissions, memory behavior, and rollback are proven.

## Transcript-Backed Working Notes

The user's supplied guide says the key mental model is "model equals brain, harness equals body." It argues that the business value is not collecting many AI tools, but running a modular system that can absorb new tools. The proposed SWAP framing is useful as a checklist, but Agent OS now treats it as lab-only because the preview may change or crash. The guide also warns that version 0.1 is a developer preview and should be tested as a new board tile rather than trusted with the whole business.

## First Agent OS Prompt

```text
Read AGENTS.md, agents/codex/AGENTS.md, brain/business-brain.md, and brain/constitution.md. Summarize this Agent OS in five bullets, then propose one low-risk job DeepSeek Harness can take over for a week. Do not edit files yet.
```

## Links

- Official Harness page: https://deepseek.com/harness/en/
- Quickstart docs: https://deepseek-harness.github.io/deepseek-harness/en/guide/quickstart
- GitHub README: https://github.com/deepseek-ai/deepseek-harness

