---
name: laravel-events
version: 1.0.0
category: backend
priority: recommended
loads_before: []
requires: [clean-architecture, security-baseline]
tags: [laravel, events, backend]
compatible: [laravel]
---

# Purpose

Decouple completed domain facts from downstream side effects.

# When to use

Use when implementing or reviewing Laravel events concerns.

# Inputs

Provide event fact, owner, consumers, delivery guarantees.

# Outputs

Produce a maintainable Laravel boundary, documented decisions, and verification evidence.

# Rules

publish past-tense facts; keep listeners independent and make delivery expectations explicit.

# Checklist

- Is responsibility confined to this Laravel boundary?
- Are authorization, failures, observability, and tests addressed where relevant?
- Is framework behavior kept behind a stable application contract?

# Examples

For events, choose the smallest Laravel feature that satisfies a verified application need and test its observable contract.

# Anti Patterns

Avoid framework convenience that leaks persistence, transport, secrets, or unbounded work across boundaries.

# Best Practices

Follow Laravel conventions when they improve clarity; document deviations and keep configuration environment-specific.

# Related Skills

queues, listeners, observability

