---
name: laravel-policies
version: 1.0.0
category: backend
priority: recommended
loads_before: []
requires: [clean-architecture, security-baseline]
tags: [laravel, policies, backend]
compatible: [laravel]
---

# Purpose

Centralize record-level authorization rules in Laravel policies.

# When to use

Use when implementing or reviewing Laravel policies concerns.

# Inputs

Provide actor, action, resource, tenant context.

# Outputs

Produce a maintainable Laravel boundary, documented decisions, and verification evidence.

# Rules

authorize before data-changing actions; never trust client ownership fields.

# Checklist

- Is responsibility confined to this Laravel boundary?
- Are authorization, failures, observability, and tests addressed where relevant?
- Is framework behavior kept behind a stable application contract?

# Examples

For policies, choose the smallest Laravel feature that satisfies a verified application need and test its observable contract.

# Anti Patterns

Avoid framework convenience that leaks persistence, transport, secrets, or unbounded work across boundaries.

# Best Practices

Follow Laravel conventions when they improve clarity; document deviations and keep configuration environment-specific.

# Related Skills

form-request, security-baseline, controllers

