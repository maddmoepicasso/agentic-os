# Ads Performance (optional)

Ask your local AI assistant: "Help me connect my own Meta ad account to Agent OS Ads Performance. Show me where to create a read-only token, let me enter it myself, and verify the report."

This page reads results from Meta's Marketing API at `graph.facebook.com`. Choose 7, 14, or 30 complete days and filter Facebook, Instagram, or all placements. It shows spend, clicks, leads, purchases, attributed revenue, and return on ad spend. Download the report when connected. Without a connection, the page shows a setup checklist, not sample results.

Required server settings in your own `.env.local`:

```text
META_AD_ACCOUNT_ID=act_YOUR_ACCOUNT_ID
META_ADS_ACCESS_TOKEN=YOUR_PRIVATE_TOKEN
META_GRAPH_API_VERSION=vYOUR_SUPPORTED_VERSION
```

Use the supported API version shown in your Meta developer dashboard. Your token needs `ads_read` access to your ad account. Keep it on your computer and enter it yourself. Restart Agent OS after configuration. Your AI should never enter passwords, cards, or keys for you.

The screen is for reporting; it does not create campaigns or spend money. Meta attribution can change, and reported revenue is not profit. Connecting another business can need additional Meta permissions or review. You can skip this setup and keep using the rest of Agent OS.
