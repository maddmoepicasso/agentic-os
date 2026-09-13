# Codex Task Library

This is the personal Codex playbook. Add prompts here when a task works well and should become repeatable.

## How To Add A Task

Use this format:

- Name:
- Best for:
- Prompt:
- Inputs needed:
- Output expected:
- Notes from real runs:

## Starter Library

### Weekly Brief Prompt

Best for: A weekly overview of active projects, blockers, and next actions.

Prompt:
Review my recent tasks, active projects, and current blockers. Give me a weekly brief with: completed work, still-open work, urgent blockers, owner-only actions, and the best next three moves. Keep it practical and plain-English.

Inputs needed:
- Recent tasks or project folder
- Any known deadlines
- Whether to include archived conversations

Output expected:
- Weekly summary
- Next actions
- Blockers

### Client Email Reply Prompt

Best for: Turning a messy client message into a clear reply.

Prompt:
Draft a warm, professional reply to this client message. Keep my tone friendly and direct. Answer their questions, confirm next steps, and avoid overpromising. Include a short subject line if this is an email.

Inputs needed:
- Client message
- Desired outcome
- Any dates/prices/details to include

Output expected:
- Ready-to-send reply

### KPI Summary Prompt

Best for: Turning metrics into a clear business update.

Prompt:
Summarize these KPIs in plain English. Tell me what improved, what got worse, what looks weird, and what I should do next. Keep the first section short enough to read fast.

Inputs needed:
- KPI table, CSV, screenshot, or notes
- Time period
- Business/project name

Output expected:
- Executive summary
- Wins
- Risks
- Next actions

### Picassomoes Reddit SEO Prompt

Best for: Daily helpful posts for `r/HillsboroughTattoos`.

Prompt:
Create a useful Reddit post for `r/HillsboroughTattoos` that helps people searching for tattoo advice near Hillsborough, NC. Make it practical, local, and non-spammy. Include one natural Picassomoes link only if it helps the reader.

Inputs needed:
- Topic or keyword
- Link to use, usually `https://picassomoes.com`

Output expected:
- Reddit title
- Reddit post body
- Optional follow-up blog/Instagram caption

### Cloudflare Access Audit Prompt

Best for: Checking whether private sites and API routes are protected.

Prompt:
Audit these Cloudflare URLs and tell me which are public, which are protected by Cloudflare Access, and which should change. Preserve public webhook bypasses only when required.

Inputs needed:
- URL list
- Which routes should be private
- Owner/team emails allowed

Output expected:
- Protected/public status
- Risks
- Fix list

### PMO Bot Health Prompt

Best for: Daily PMO Bot paper-trading and safety checks.

Prompt:
Check PMO Bot health in paper mode. Confirm broker identity, route health, scheduler status, tunnel/API health, safety locks, and failed tests. Do not change live-trading settings.

Inputs needed:
- PMO Bot project path
- Any latest error or concern

Output expected:
- Health status
- Passed checks
- Blockers
- Owner-only actions

### Website Launch Checklist Prompt

Best for: Before deploying or publishing a site.

Prompt:
Run a launch checklist for this website. Check build status, homepage, important links, mobile layout, SEO basics, access controls, and rollback notes. Tell me if it is ready to publish.

Inputs needed:
- Site folder or URL
- Intended audience: public or private

Output expected:
- Go/no-go
- Issues found
- Verification summary

### Conversation Audit Prompt

Best for: Finding unfinished work across tasks.

Prompt:
Review recent and archived tasks for unfinished work. Make one master list grouped by project, with done items, open items, blockers, links, and recommended next actions.

Inputs needed:
- Task/conversation access
- Projects to prioritize

Output expected:
- Master task list
- Valid links
- Blockers
