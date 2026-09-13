# Picassomoes Publishing Integrations

Agent OS now has a publishing integration status layer at `/api/publishing/status`.

## What Works Now

- Picassomoes.com site and booking defaults are stored in Settings.
- Cloudflare Worker status is checked through the existing Cloudflare setup.
- Netlify, Google Search Console, Omega Indexer, Reddit, Instagram, LinkedIn, and X all have Settings fields.
- Agent OS marks a service `ready` only when the required destination and key/login marker exist.

## Required Credentials

- Netlify: `NETLIFY_AUTH_TOKEN` or Settings key plus site id/name.
- Google Search Console: property URL plus API key/service credential marker.
- Omega Indexer: API key.
- Reddit: app/token plus `r/HillsboroughTattoos`.
- Instagram: Meta/Instagram access token plus account.
- LinkedIn: access token plus page/profile.
- X: bearer token plus account.

## Safe Publishing Rule

The Picassomoes SEO workflow can always create drafts. It may only claim something was published when the relevant status check is `ready` and the publish action actually succeeds.
