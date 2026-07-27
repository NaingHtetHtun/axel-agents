---
name: laravel-scheduler
version: 1.0.0
category: backend
priority: recommended
loads_before: []
requires: [clean-architecture, security-baseline]
tags: [laravel, scheduler, backend]
compatible: [laravel]
---

# Purpose

Run scheduled Laravel work predictably, idempotently, and observably.

# When to use

Use when implementing or reviewing Laravel scheduler concerns.

# Inputs

Provide schedule, timezone, overlap rules, failure action.

# Outputs

Produce a maintainable Laravel boundary, documented decisions, and verification evidence.

# Rules

prevent unintended overlap, define locking, and alert on missed or failed critical work.

# Checklist

- Is responsibility confined to this Laravel boundary?
- Are authorization, failures, observability, and tests addressed where relevant?
- Is framework behavior kept behind a stable application contract?

# Examples

For scheduler, choose the smallest Laravel feature that satisfies a verified application need and test its observable contract.

# Anti Patterns

Avoid framework convenience that leaks persistence, transport, secrets, or unbounded work across boundaries.

# Best Practices

Follow Laravel conventions when they improve clarity; document deviations and keep configuration environment-specific.

# Related Skills

queues, logging, release-safety

