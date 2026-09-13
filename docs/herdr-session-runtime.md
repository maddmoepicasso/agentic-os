# Herdr Session Runtime

Herdr is the optional multi-agent terminal session layer for Agentic OS. It is not a chat agent and should not replace Codex, Kilo, opencode, Hermes, or agy routing. Use it when several agents or terminal checks need to stay open side by side.

## What it does

- Opens Agentic OS as a persistent multi-pane terminal workspace.
- Keeps coding agents, verification panes, and log watchers organized.
- Lets the operator return to active sessions without rebuilding the terminal layout.

## Dashboard integration

The Herdr Sessions tab checks /api/herdr/status and can launch Herdr through /api/herdr/launch when the herdr command is installed.

## Windows fallback

Run start-herdr-windows.cmd from the Agentic OS folder.

If Herdr is not installed, install it with:

`powershell
powershell -ExecutionPolicy Bypass -c "irm https://herdr.dev/install.ps1 | iex"
`

## Suggested pane layout

| Pane | Purpose | Suggested tool |
| --- | --- | --- |
| Primary | Main implementation | Codex |
| Sidecar | Low-cost coding/refactor passes | Kilo Code |
| Verification | Tests, logs, health checks | opencode or shell |
| Research | Docs, notes, handoff summaries | agy or Codex |