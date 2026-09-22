# Learnings

## 2026-05-17
- Run weekly to keep memory files under 600 words
- Archive decisions older than 30 days
- Check for contradictions across skills

## 2026-09-14 (Run 7c3f16f1)
- Agent: codex
- Input: Triggered by cron.
- Output: 2026-09-14T10:00:00.252190Z  WARN codex_models_manager::model_info: Unknown model auto is used. This will use fallback model metadata.
2026-09-14T10:00:00.337298Z  WARN codex_skills::interface: ignoring interface.icon_small: icon path with '..' must resolve under plugin assets/
2026-09-14T10:00:00.337321Z  WARN codex_skills::interface: ignoring interface.icon_large: icon path with '..' must resolve under plugin assets/
2026-09-14T10:00:00.352211Z  WARN codex_core::shell_snapshot: Failed to creat

## 2026-09-21 (Run 401ca1fd)
- Agent: codex
- Input: Triggered by cron.
- Output: I’m using the memory-consolidation skill. I’ll try to inspect its instructions and memory files; the current read-only workspace prevents saving backups, archives, or consolidated updates.
{
  "skill": "memory-consolidation",
  "status": "blocked",
  "reason": "The file inspection command was rejected by execution policy. The read-only workspace also prevents backups and updates.",
  "files_modified": false,
  "decisions_archived": 0,
  "histories_pruned": 0,
  "contradictions": "Unverified; sou
