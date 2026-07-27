---
name: laravel-caching
version: 1.0.0
category: backend
priority: recommended
loads_before: []
requires: [clean-architecture, security-baseline]
tags: [laravel, caching, backend]
compatible: [laravel]
---

# Purpose

Use cache only with explicit ownership, invalidation, freshness, and failure behavior.

# When to use

Use when implementing or reviewing Laravel caching concerns.

# Inputs

Provide read pattern, source of truth, TTL, invalidation trigger.

# Outputs

Produce a maintainable Laravel boundary, documented decisions, and verification evidence.

# Rules

measure first; key safely; prevent stale authorization or tenant data leakage.

# Checklist

- Is responsibility confined to this Laravel boundary?
- Are authorization, failures, observability, and tests addressed where relevant?
- Is framework behavior kept behind a stable application contract?

# Examples

For caching, choose the smallest Laravel feature that satisfies a verified application need and test its observable contract.

# Anti Patterns

Avoid framework convenience that leaks persistence, transport, secrets, or unbounded work across boundaries.

# Best Practices

Follow Laravel conventions when they improve clarity; document deviations and keep configuration environment-specific.

# Related Skills

performance-baseline, observability, security-baseline

