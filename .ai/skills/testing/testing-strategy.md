---
name: testing-strategy
version: 1.0.0
category: testing
priority: required
loads_before: [code-review, release-safety]
requires: [clean-code, error-handling]
tags: [testing, quality, verification]
compatible: [any]
---

# Purpose

Provide fast, trustworthy evidence that behavior and critical contracts are correct.

# When to use

Use when planning, implementing, fixing, refactoring, or releasing a change.

# Inputs

Provide requirements, risks, boundaries, historical failures, and available test environments.

# Outputs

Produce a proportionate test plan, automated tests, and documented residual risk.

# Rules

Test behavior at the lowest useful level. Use unit tests for rules, integration tests for boundaries, and end-to-end tests for critical journeys. Make tests deterministic and independent.

# Checklist

- Are happy path, edge cases, and failure paths covered?
- Is each test focused on observable behavior?
- Do test doubles preserve the contract they replace?

# Examples

Test a pricing rule directly and verify the storage adapter separately; reserve full-journey tests for checkout completion.

# Anti Patterns

Avoid asserting implementation details, flaky shared state, and relying only on manual testing.

# Best Practices

Prioritize risk, add regression tests for defects, and run the smallest relevant suite locally.

# Related Skills

debugging-method, code-review, api-design
