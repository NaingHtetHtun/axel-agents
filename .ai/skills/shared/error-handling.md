---
name: error-handling
version: 1.0.0
category: shared
priority: required
loads_before: [testing-strategy, code-review]
requires: [naming]
tags: [errors, resilience, contracts]
compatible: [any]
---

# Purpose

Make failures explicit, actionable, safe, and consistent across boundaries.

# When to use

Use when defining failure contracts, retries, exceptions, fallbacks, or user-facing error responses.

# Inputs

Provide the boundary, expected failures, caller expectations, and recovery options.

# Outputs

Produce a typed or documented error contract, recovery behavior, and safe diagnostics.

# Rules

Classify failures as validation, business, dependency, or unexpected. Preserve cause internally, expose stable safe messages externally, and retry only idempotent transient operations.

# Checklist

- Is the failure actionable for its caller?
- Are sensitive internals excluded from external responses?
- Are retry, timeout, and fallback semantics explicit?

# Examples

Return a stable `conflict` outcome for an already-completed action; log the underlying storage detail with a correlation ID.

# Anti Patterns

Never swallow errors, return success after a failed write, or expose stack traces to untrusted clients.

# Best Practices

Test unhappy paths and make expected errors part of the API contract.

# Related Skills

logging, security-baseline, testing-strategy
