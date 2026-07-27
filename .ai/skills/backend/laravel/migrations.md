---
name: laravel-migrations
version: 1.0.0
category: backend
priority: recommended
loads_before: []
requires: [clean-architecture, security-baseline]
tags: [laravel, migrations, backend]
compatible: [laravel]
---

# Purpose

Evolve relational schema safely through ordered, reversible, production-aware changes.

# When to use

Use when implementing or reviewing Laravel migrations concerns.

# Inputs

Provide schema delta, volume, compatibility requirements.

# Outputs

Produce a maintainable Laravel boundary, documented decisions, and verification evidence.

# Rules

make transitions backward compatible; avoid unsafe locks and destructive immediate changes.

# Checklist

- Is responsibility confined to this Laravel boundary?
- Are authorization, failures, observability, and tests addressed where relevant?
- Is framework behavior kept behind a stable application contract?

# Examples

For migrations, choose the smallest Laravel feature that satisfies a verified application need and test its observable contract.

# Anti Patterns

Avoid framework convenience that leaks persistence, transport, secrets, or unbounded work across boundaries.

# Best Practices

Follow Laravel conventions when they improve clarity; document deviations and keep configuration environment-specific.

# Related Skills

data-modeling, release-safety, testing-strategy

