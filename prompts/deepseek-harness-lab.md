# DeepSeek Harness Lab Prompt

Use this inside DeepSeek Harness after launching `npx @deepseek-ai/dsh web` from the Agent OS workspace.

```text
You are running inside DeepSeek Harness as an experimental Agent OS lab lane.

Read these files first:
- AGENTS.md
- agents/codex/AGENTS.md
- brain/business-brain.md
- brain/constitution.md
- docs/deepseek-harness-agent-os.md

Then do four things:
1. Summarize the business and operating rules in five bullets.
2. Identify one tiny disposable non-production task that can be used for compatibility testing.
3. Explain which model, tools, memory, sandbox, and plugin capabilities the job needs.
4. Produce a one-page compatibility test plan with acceptance criteria, crash notes, permission risks, and rollback notes.

Do not edit files, install plugins, run destructive commands, or handle credentials unless the operator explicitly approves that next step.
```

