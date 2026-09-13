---
name: seo-publishing-checklist
description: Creates a publish, index, and verification checklist for SEO pages across Netlify, Cloudflare, static sites, or manual hosting.
version: 1.0.0
author: Agentic OS
tags: [seo, publishing, netlify, cloudflare, indexer, deployment]
---

# SEO Publishing Checklist

## Description
Creates a safe publishing runbook for SEO content. It covers pre-publish review, deployment, indexing, and follow-up tracking without pretending private tools are connected until credentials are configured.

## When to Use
- An article or page is ready to publish
- User mentions Netlify, Cloudflare, Omega Indexer, Google Search Console, or indexing
- User wants a page deployed and tracked
- User needs a pre-publish SEO QA pass

## Input
- Page title and target keyword
- Draft or page URL
- Hosting target
- Indexing tool available
- Internal links and sitemap location

## Process
1. Check title, H1, slug, meta description, headings, images, alt text, CTA, and internal links.
2. Confirm canonical URL and sitemap expectations.
3. Create deployment steps for the selected host.
4. Create manual verification steps for the live page.
5. Create indexing steps for Search Console, Omega Indexer, or the selected workflow.
6. Add a 7-day follow-up check for impressions, clicks, indexing status, and ranking movement.
7. Save the publish note to Obsidian when configured.

## Output
- Pre-publish QA checklist
- Deployment checklist
- Indexing checklist
- Follow-up review task
- Obsidian publish note

## Agent Assignment
- Primary: codex
- Fallback: hermes

## Dependencies
- Hosting credentials are required before automated deployment
- Indexing credentials are required before automated submission
