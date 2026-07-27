---
name: laravel-service-layer
version: 1.0.0
category: backend
priority: recommended
loads_before: []
requires: [clean-architecture, security-baseline]
tags: [laravel, service-layer, backend]
compatible: [laravel]
---

# Purpose

Coordinate application use cases and transactional business workflows.

# When to use

Use when implementing or reviewing Laravel service layer concerns.

# Inputs

Provide use-case inputs, dependencies, transaction needs.

# Outputs

Produce a maintainable Laravel boundary, documented decisions, and verification evidence.

# Rules

orchestrate policy and persistence through clear contracts; keep transport independent.

# Checklist

- Is responsibility confined to this Laravel boundary?
- Are authorization, failures, observability, and tests addressed where relevant?
- Is framework behavior kept behind a stable application contract?

# Examples

For service layer, choose the smallest Laravel feature that satisfies a verified application need and test its observable contract.

# Anti Patterns

Avoid framework convenience that leaks persistence, transport, secrets, or unbounded work across boundaries.

# Best Practices

Follow Laravel conventions when they improve clarity; document deviations and keep configuration environment-specific.

# Related Skills

repositories, eloquent, queues

