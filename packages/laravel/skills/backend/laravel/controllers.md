---
name: laravel-controllers
version: 1.0.0
category: backend
priority: recommended
loads_before: []
requires: [clean-architecture, security-baseline]
tags: [laravel, controllers, backend]
compatible: [laravel]
---

# Purpose

Translate transport requests into application use cases; keep HTTP concerns at the edge.

# When to use

Use when implementing or reviewing Laravel controllers concerns.

# Inputs

Provide routing, request mapping, responses.

# Outputs

Produce a maintainable Laravel boundary, documented decisions, and verification evidence.

# Rules

delegate to one use case; never place business rules or persistence queries in controllers.

# Checklist

- Is responsibility confined to this Laravel boundary?
- Are authorization, failures, observability, and tests addressed where relevant?
- Is framework behavior kept behind a stable application contract?

# Examples

For controllers, choose the smallest Laravel feature that satisfies a verified application need and test its observable contract.

# Anti Patterns

Avoid framework convenience that leaks persistence, transport, secrets, or unbounded work across boundaries.

# Best Practices

Follow Laravel conventions when they improve clarity; document deviations and keep configuration environment-specific.

# Related Skills

form-request, api-resource, service-layer

