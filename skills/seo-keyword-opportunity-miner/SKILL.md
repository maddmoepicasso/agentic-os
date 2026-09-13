---
name: seo-keyword-opportunity-miner
description: Finds and prioritizes SEO keyword opportunities from autocomplete ideas, Search Console data, competitor pages, and business offers.
version: 1.0.0
author: Agentic OS
tags: [seo, keywords, research, search-console, content]
---

# SEO Keyword Opportunity Miner

## Description
Builds a practical keyword queue by sorting ideas into intent, difficulty, proof available, business value, and publishing priority.

## When to Use
- User has raw keyword ideas
- User pasted Google autocomplete suggestions
- User has Search Console exports
- User wants a keyword queue for weekly publishing
- User needs topic clusters around a service, product, or local niche

## Input
- Niche, site, or offer
- Seed keywords
- Optional Search Console impressions, clicks, CTR, and position
- Optional competitor URLs or notes
- Business priority or product/service focus

## Process
1. Normalize keywords and remove obvious duplicates.
2. Classify search intent: informational, commercial, local, transactional, comparison, or support.
3. Identify quick wins: high impressions with low clicks, rankings near page one, and clear buyer intent.
4. Identify emerging terms: new phrases, long-tail questions, and underserved local terms.
5. Group keywords into topic clusters.
6. Pick the best page type for each keyword: blog, landing page, FAQ, case study, glossary, or comparison.
7. Score each term by relevance, intent, proof available, expected effort, and business value.
8. Return a prioritized queue with the top next actions.

## Output
- Prioritized keyword queue
- Topic clusters
- Recommended page type
- Proof or case study needs
- First 5 articles to create

## Agent Assignment
- Primary: hermes
- Fallback: codex

## Dependencies
- Optional Search Console export
- Optional competitor research notes
