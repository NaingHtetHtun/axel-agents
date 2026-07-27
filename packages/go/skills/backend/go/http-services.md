---
name: go-http-services
version: 1.0.0
category: backend
priority: recommended
loads_before: []
requires: [clean-code, security-baseline, testing-strategy]
tags: [go, http-services]
compatible: [go]
---

# Purpose

Build Go HTTP services with explicit contracts, timeouts, errors, and graceful lifecycle handling.

# When to use

Use when implementing or reviewing go http services work.

# Inputs

Provide user outcomes, system constraints, existing conventions, and relevant contracts.

# Outputs

Produce an implementation boundary, documented trade-offs, and verification evidence.

# Rules

Keep responsibilities explicit, propagate failures safely, and avoid framework or runtime details leaking across unrelated boundaries.

# Checklist

- Is the responsibility cohesive and testable?
- Are performance, security, and error paths addressed?
- Does the design match the project’s required contracts?

# Examples

Choose the smallest go-native pattern that preserves clear ownership and observable behavior.

# Anti Patterns

Avoid hidden global state, unbounded work, and abstractions introduced before a real variation exists.

# Best Practices

Use idiomatic go conventions while preserving the core Skill OS rules.

# Related Skills

clean-code, testing-strategy, security-baseline

