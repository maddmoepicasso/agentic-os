---
name: seo-performance-review
description: Reviews published SEO content performance and turns the results into next actions, reports, and learning notes.
version: 1.0.0
author: Agentic OS
tags: [seo, reporting, analytics, search-console, optimization]
---

# SEO Performance Review

## Description
Reviews published pages after 7, 14, or 30 days and turns the data into a clear action plan.

## When to Use
- A published page needs follow-up
- User has Search Console or analytics data
- User wants to improve rankings, CTR, or conversions
- User asks what SEO work to do next

## Input
- Page URL and target keyword
- Publish date
- Impressions, clicks, CTR, average position
- Indexing status
- Conversion or lead data if available
- Notes from the original article

## Process
1. Compare expected intent against actual queries.
2. Identify CTR problems, ranking problems, indexing problems, and conversion problems.
3. Recommend title/meta updates when CTR is weak.
4. Recommend content depth, internal links, FAQs, or proof additions when position is weak.
5. Recommend indexing or technical follow-up when visibility is missing.
6. Create a plain-English performance summary.
7. Save lessons and next actions to Obsidian when configured.

## Output
- Performance summary
- Diagnosis
- Next actions
- Updated title/meta ideas
- Learning note

## Agent Assignment
- Primary: hermes
- Fallback: codex

## Dependencies
- Optional Search Console or analytics export
