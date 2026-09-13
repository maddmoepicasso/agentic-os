# Learnings

## 2026-05-17
- Follows Superpowers methodology for code review

## 2026-09-11
- Review the complete working tree, including untracked integration files; isolated backend additions can appear complete while the dashboard client and navigation remain unwired.
- Run the repository's actual unittest suite when pytest is unavailable, and treat expectation drift as a blocking regression.

## 2026-09-11 (Run 8e94f489)
- Agent: codex
- Input: (none)
- Output: ## Code Review — Blocked

No critical issues. Three major issues:

- [dashboard/index.html:41](C:/Angels/agentic-os/dashboard/index.html:41): malformed `<a href=\` markup appears twice, potentially corrupting navigation DOM.
- [media-studio.js:23](C:/Angels/agentic-os/dashboard/pages/media-studio.js:23): calls missing API client methods and has no navigation entry.
- [test_core.py:32](C:/Angels/agentic-os/tests/test_core.py:32): suite fails because Kilo and VS Code are returned but not expected.
