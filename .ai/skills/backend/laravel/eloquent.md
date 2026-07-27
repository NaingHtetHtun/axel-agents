---
name: laravel-eloquent
version: 1.0.0
category: backend
priority: recommended
loads_before: []
requires: [clean-architecture, security-baseline]
tags: [laravel, eloquent, backend]
compatible: [laravel]
---

# Purpose

Use Laravel ORM deliberately while protecting query efficiency and domain invariants.

# When to use

Use when implementing or reviewing Laravel eloquent concerns.

# Inputs

Provide relationships, read/write patterns, lifecycle rules.

# Outputs

Produce a maintainable Laravel boundary, documented decisions, and verification evidence.

# Rules

select required columns, eager-load known relations, keep complex policy outside models.

# Checklist

- Is responsibility confined to this Laravel boundary?
- Are authorization, failures, observability, and tests addressed where relevant?
- Is framework behavior kept behind a stable application contract?

# Examples

For eloquent, choose the smallest Laravel feature that satisfies a verified application need and test its observable contract.

# Anti Patterns

Avoid framework convenience that leaks persistence, transport, secrets, or unbounded work across boundaries.

# Best Practices

Follow Laravel conventions when they improve clarity; document deviations and keep configuration environment-specific.

# Related Skills

repositories, performance-baseline, migrations

