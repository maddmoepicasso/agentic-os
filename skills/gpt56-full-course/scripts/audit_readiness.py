"""Read-only readiness audit for the GPT 5.6 full-course Agent OS workflow."""

from __future__ import annotations

import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[3]
SKILLS = ROOT / "skills"
PROMPTS = ROOT / "prompts"


def exists(*parts: str) -> bool:
    return (ROOT.joinpath(*parts)).exists()


def skill(name: str) -> bool:
    return (SKILLS / name / "SKILL.md").exists()


def main() -> int:
    checks = {
        "model_policy": skill("gpt56-full-course"),
        "social_workflow": skill("social-post-scheduler") and skill("content-repurposing-engine"),
        "image_generation_hook": "image generation" in (ROOT / "server.py").read_text(encoding="utf-8", errors="ignore").lower(),
        "research_workflow": skill("research-synthesis"),
        "project_memory": exists("brain", "active-projects.md"),
        "reusable_skill_system": exists("skills", "_template", "SKILL.md"),
        "scheduler": exists("scheduler", "scheduler.py"),
        "plugin_registry": exists("registry", "plugins.json"),
        "prompt_library": skill("codex-task-library") and PROMPTS.exists(),
        "workflow_qa": skill("workflow-qa-checker"),
        "computer_use_route": skill("workflow-qa-checker"),
        "video_planning": skill("avatar-video-pipeline"),
        "publishing_workflow": skill("launch-kit-executor") or skill("codex-sites-publishing"),
    }
    payload = {
        "status": "READY" if all(checks.values()) else "SETUP_REQUIRED",
        "scope": "local Agent OS capabilities only; external accounts require separate verification",
        "checks": checks,
    }
    print(json.dumps(payload, indent=2, sort_keys=True))
    return 0 if all(checks.values()) else 1


if __name__ == "__main__":
    raise SystemExit(main())
