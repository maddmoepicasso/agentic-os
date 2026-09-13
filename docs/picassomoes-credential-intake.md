# Picassomoes Credential Intake

Use this checklist to finish the live publishing connections in Agent OS Settings.

## Already Ready

- Picassomoes.com: `https://picassomoes.com`
- Booking: `https://picassomoescom.simplybook.me`
- Cloudflare Worker: `https://angelic-os-agent-harness.maddmoepicasso.workers.dev`

## Paste Into Agent OS Settings

Open Agent OS Settings, then scroll to **Publishing & SEO Integrations**.

### Google Search Console

- Property URL: `https://picassomoes.com/`
- Needed: Search Console credential or service account/API credential marker
- Purpose: indexing checks, impressions, clicks, CTR, and ranking follow-up

### Omega Indexer

- Needed: Omega Indexer API key
- Purpose: submit newly published URLs to the indexing workflow

### Reddit

- Subreddit: `r/HillsboroughTattoos`
- Profile: `u/Picassomoes`
- Needed: Reddit app/token or connected posting method
- Purpose: publish approved local SEO posts

### Instagram / Meta

- Needed: Meta or Instagram access token and account name
- Purpose: publish captions/carousels from the daily content pack

### LinkedIn

- Needed: LinkedIn token and page/profile
- Purpose: publish educational business posts

### X

- Needed: X/Twitter bearer token and account
- Purpose: publish short educational posts

### Netlify

- Only needed if Picassomoes.com is actually hosted on Netlify.
- Needed: Netlify auth token plus site id/name.

## Rule

Agent OS should keep outputs as drafts until the relevant status check says `ready` and the publish action succeeds.
