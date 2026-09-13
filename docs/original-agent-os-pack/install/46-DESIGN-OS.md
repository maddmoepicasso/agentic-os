# 46 · Design OS (Optional)

> Already built. Open Design OS in the sidebar. If it is missing, update Agent OS; do not ask an AI to rebuild the tab.

## The easy way
Ask Claude Code, Codex or your usual coding agent: “Set up the existing Design OS tab. Check Codex login and the local design skill paths, then verify a small website build.”

The Studio lets you choose a direction and write a brief. Projects holds your generated sites and build notes. The design library has three working examples: The Sunday Studio, Ember Atelier and Frame / Studio. Preview these without an API key.

## Building your own site
1. Install and sign in to Codex using the Agent CLIs guide (`7-AGENT-CLIS.md`). Model usage follows your account plan.
2. Open Design OS, give the project a name, select a direction and describe the site.
3. Start the build. Review the preview and build notes before sharing it. A failed build stays marked failed; try a new version after fixing its setup.

Your projects are saved in `~/Design OS/projects`. They belong to you and are not included in another member's export.

## Local design files
The current builder reads optional reference sites from `~/Documents/ChatGPT/Web Design` and skills from your `.agents/skills` and `.codex/skills` folders: frontend-design, hallmark, ai-profit-boardroom-brand, guide-page-builder and web-design-guidelines. These machine-local installations are not automatically installed by this ZIP. A missing skill shows Unavailable. Ask your setup agent to install or connect your own design library before relying on those references. The three bundled examples still open without that library.

This is separate from the Open Design tab. Skipping setup leaves the rest of Agent OS working.
