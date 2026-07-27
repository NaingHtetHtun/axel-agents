---
name: laravel-queues
version: 1.0.0
category: backend
priority: recommended
loads_before: []
requires: [clean-architecture, security-baseline]
tags: [laravel, queues, backend]
compatible: [laravel]
---

# Purpose

Move suitable asynchronous work to reliable, observable background processing.

# When to use

Use when implementing or reviewing Laravel queues concerns.

# Inputs

Provide job payload, idempotency, retry policy.

# Outputs

Produce a maintainable Laravel boundary, documented decisions, and verification evidence.

# Rules

make jobs idempotent, bounded, serialized safely, and observable.

# Checklist

- Is responsibility confined to this Laravel boundary?
- Are authorization, failures, observability, and tests addressed where relevant?
- Is framework behavior kept behind a stable application contract?

# Examples

For queues, choose the smallest Laravel feature that satisfies a verified application need and test its observable contract.

# Anti Patterns

Avoid framework convenience that leaks persistence, transport, secrets, or unbounded work across boundaries.

# Best Practices

Follow Laravel conventions when they improve clarity; document deviations and keep configuration environment-specific.

# Related Skills

events, logging, error-handling

