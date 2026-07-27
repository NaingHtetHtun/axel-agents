---
name: laravel-sanctum
version: 1.0.0
category: backend
priority: recommended
loads_before: []
requires: [clean-architecture, security-baseline]
tags: [laravel, sanctum, backend]
compatible: [laravel]
---

# Purpose

Apply Laravel Sanctum authentication with least privilege and explicit token lifecycle.

# When to use

Use when implementing or reviewing Laravel sanctum concerns.

# Inputs

Provide client type, abilities, expiry, revocation rules.

# Outputs

Produce a maintainable Laravel boundary, documented decisions, and verification evidence.

# Rules

use narrow abilities, protect token storage, and distinguish authentication from authorization.

# Checklist

- Is responsibility confined to this Laravel boundary?
- Are authorization, failures, observability, and tests addressed where relevant?
- Is framework behavior kept behind a stable application contract?

# Examples

For sanctum, choose the smallest Laravel feature that satisfies a verified application need and test its observable contract.

# Anti Patterns

Avoid framework convenience that leaks persistence, transport, secrets, or unbounded work across boundaries.

# Best Practices

Follow Laravel conventions when they improve clarity; document deviations and keep configuration environment-specific.

# Related Skills

policies, security-baseline, rate-limiting

