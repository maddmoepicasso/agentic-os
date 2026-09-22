---
name: gpt56-full-course
description: Turns an idea into a safe, reusable GPT 5.6 workflow across research, content, images, projects, automations, video, and publishing; use for building or auditing the full-course SOP.
metadata:
  version: 1.0.0
  author: Agent OS
---

# GPT 5.6 Full Course

Build one reviewable workflow around an outcome, not a collection of disconnected tools.

## Operating method

1. Define the problem, audience, deliverable, evidence, and stopping condition.
2. Select the least costly model that can reliably do the work: Luna for narrow high-volume tasks, Terra for balanced work, and Sol for complex professional work. Preserve an explicitly chosen model.
3. Reuse project instructions and source material. Treat them as context, not model training.
4. Research current claims only when web access is available; retain sources and distinguish facts from inference.
5. Create content, image, or video assets through the matching installed skill. Keep drafts reviewable before publishing.
6. Turn repeated work into a prompt or skill, then test it manually before scheduling it.
7. Run `workflow-qa-checker` before enabling an automation or external mutation.
8. Publish, send, deploy, spend, or alter an external account only with current authorization and a configured integration.
9. Record the result, failure evidence, and next improvement without storing secrets.

## Readiness

Run `scripts/audit_readiness.py` to produce a local capability report. The audit reports `READY`, `AVAILABLE`, or `SETUP_REQUIRED`; availability is never presented as completed configuration.

Read [references/course-sop.md](references/course-sop.md) when implementing or auditing the complete thirteen-part workflow.

## Safety boundaries

- Never claim that a project "trains" a model; it supplies reusable context.
- Do not promise a particular research source count.
- Do not install software, connect accounts, publish, deploy, or spend money merely because a workflow mentions those actions.
- For PMO Bot or trading work, default to research and paper trading. Live financial action always requires explicit current authorization.
- Back up every existing target file before changing it.
