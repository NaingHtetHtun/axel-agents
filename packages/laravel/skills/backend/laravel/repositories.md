---
name: laravel-repositories
version: 1.0.0
category: backend
priority: recommended
loads_before: []
requires: [clean-architecture, security-baseline]
tags: [laravel, repositories, backend]
compatible: [laravel]
---

# Purpose

Isolate persistence queries behind domain-focused data access contracts.

# When to use

Use when implementing or reviewing Laravel repositories concerns.

# Inputs

Provide query needs, aggregates, consistency needs.

# Outputs

Produce a maintainable Laravel boundary, documented decisions, and verification evidence.

# Rules

return domain-oriented results; do not create generic CRUD repositories.

# Checklist

- Is responsibility confined to this Laravel boundary?
- Are authorization, failures, observability, and tests addressed where relevant?
- Is framework behavior kept behind a stable application contract?

# Examples

For repositories, choose the smallest Laravel feature that satisfies a verified application need and test its observable contract.

# Anti Patterns

Avoid framework convenience that leaks persistence, transport, secrets, or unbounded work across boundaries.

# Best Practices

Follow Laravel conventions when they improve clarity; document deviations and keep configuration environment-specific.

# Related Skills

eloquent, migrations, service-layer

