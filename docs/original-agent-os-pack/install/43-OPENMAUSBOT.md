# 43 · OpenMausBot — Your AI Bot Team, in a Chat App (Optional)

> 🛑 **Already built.** This tab ships working — don't ask an AI to build it. Missing? Update your pack (`Update Agent OS.command`).

The **OpenMausBot** tab connects the OS to [OpenMausBot](https://github.com/milind-soni/OpenMausBot) — an open-source Mac chat app where you build a **team of AI bots** (each with its own name, personality and job) that run on the `claude`, `codex` and `grok` CLIs already installed on your Mac. Your subscriptions, no extra API keys.

What the OS adds: **shared memory**. Turn on the tab's memory switch and every bot reads + writes the same Obsidian vault as Hermes, Claude and the rest of your agents — one brain across the whole OS. Anything a bot builds lands in a per-bot workspace you can preview in the tab.

## Setup (5 minutes)
1. **Install the OpenMausBot app** — download the signed macOS .dmg: <https://github.com/milind-soni/openmausbot-releases/releases/latest> (Apple silicon). Open it once and create a bot.
2. **That's it for the OS side** — with the app running (it serves a local harness on `127.0.0.1:8799`), open the **OpenMausBot** tab: your bot roster and threads appear, and you can chat from either place. Same state, always.
3. **Optional — shared memory:** flip the tab's memory toggle so bots use your Obsidian vault (`11-MEMORY-OBSIDIAN.md` to connect the vault first).

> 🟢 Easiest: open any AI agent in the folder and say *"install OpenMausBot from its GitHub releases and check the Agent OS tab connects."*

## Good to know
- **Runs on your existing CLIs** — bots use the `claude` / `codex` / `grok` logins you already have (`7-AGENT-CLIS.md`). No new keys, no new costs.
- **Local + private** — the harness lives at `127.0.0.1:8799` on your Mac (override with `OPENMAUSBOT_URL` if you run it elsewhere); bot state lives in `~/.openmausbot`.
- **Tab says "harness offline"?** Open the OpenMausBot app — the tab lights up as soon as the app is running.
