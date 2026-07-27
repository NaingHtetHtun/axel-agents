---
name: laravel-form-request
version: 1.0.0
category: backend
priority: recommended
loads_before: []
requires: [clean-architecture, security-baseline]
tags: [laravel, form-request, backend]
compatible: [laravel]
---

# Purpose

Validate and authorize inbound HTTP input before it reaches application logic.

# When to use

Use when implementing or reviewing Laravel form request concerns.

# Inputs

Provide request contract, caller, field constraints.

# Outputs

Produce a maintainable Laravel boundary, documented decisions, and verification evidence.

# Rules

authorize server-side, normalize safe input, return stable validation failures.

# Checklist

- Is responsibility confined to this Laravel boundary?
- Are authorization, failures, observability, and tests addressed where relevant?
- Is framework behavior kept behind a stable application contract?

# Examples

For form request, choose the smallest Laravel feature that satisfies a verified application need and test its observable contract.

# Anti Patterns

Avoid framework convenience that leaks persistence, transport, secrets, or unbounded work across boundaries.

# Best Practices

Follow Laravel conventions when they improve clarity; document deviations and keep configuration environment-specific.

# Related Skills

controllers, api-resource, security-baseline

