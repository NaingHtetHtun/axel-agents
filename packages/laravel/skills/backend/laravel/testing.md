---
name: laravel-testing
version: 1.0.0
category: backend
priority: recommended
loads_before: []
requires: [clean-architecture, security-baseline]
tags: [laravel, testing, backend]
compatible: [laravel]
---

# Purpose

Test Laravel behavior at appropriate unit, feature, integration, and contract boundaries.

# When to use

Use when implementing or reviewing Laravel testing concerns.

# Inputs

Provide behavior, risk, database and external dependency choices.

# Outputs

Produce a maintainable Laravel boundary, documented decisions, and verification evidence.

# Rules

use deterministic factories and isolated state; test authorization, validation, jobs, and events as behavior.

# Checklist

- Is responsibility confined to this Laravel boundary?
- Are authorization, failures, observability, and tests addressed where relevant?
- Is framework behavior kept behind a stable application contract?

# Examples

For testing, choose the smallest Laravel feature that satisfies a verified application need and test its observable contract.

# Anti Patterns

Avoid framework convenience that leaks persistence, transport, secrets, or unbounded work across boundaries.

# Best Practices

Follow Laravel conventions when they improve clarity; document deviations and keep configuration environment-specific.

# Related Skills

testing-strategy, form-request, api-resource

