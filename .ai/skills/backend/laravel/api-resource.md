---
name: laravel-api-resource
version: 1.0.0
category: backend
priority: recommended
loads_before: []
requires: [clean-architecture, security-baseline]
tags: [laravel, api-resource, backend]
compatible: [laravel]
---

# Purpose

Transform application output into stable public API representations.

# When to use

Use when implementing or reviewing Laravel api resource concerns.

# Inputs

Provide consumer contract, resource data, compatibility policy.

# Outputs

Produce a maintainable Laravel boundary, documented decisions, and verification evidence.

# Rules

avoid exposing Eloquent models directly; include only authorized, documented fields.

# Checklist

- Is responsibility confined to this Laravel boundary?
- Are authorization, failures, observability, and tests addressed where relevant?
- Is framework behavior kept behind a stable application contract?

# Examples

For api resource, choose the smallest Laravel feature that satisfies a verified application need and test its observable contract.

# Anti Patterns

Avoid framework convenience that leaks persistence, transport, secrets, or unbounded work across boundaries.

# Best Practices

Follow Laravel conventions when they improve clarity; document deviations and keep configuration environment-specific.

# Related Skills

api-design, controllers, eloquent

