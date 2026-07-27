---
name: react-testing
version: 1.0.0
category: frontend
priority: recommended
loads_before: []
requires: [clean-code, security-baseline, testing-strategy]
tags: [react, testing]
compatible: [react]
---

# Purpose

Verify React behavior through accessible user interactions and deterministic state.

# When to use

Use when implementing or reviewing react testing work.

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

Choose the smallest react-native pattern that preserves clear ownership and observable behavior.

# Anti Patterns

Avoid hidden global state, unbounded work, and abstractions introduced before a real variation exists.

# Best Practices

Use idiomatic react conventions while preserving the core Skill OS rules.

# Related Skills

clean-code, testing-strategy, security-baseline

