---
name: code-review
version: 1.0.0
category: review
priority: required
loads_before: [release-safety]
requires: [clean-code, security-baseline, testing-strategy, git-conventions]
tags: [review, quality, collaboration]
compatible: [any]
---

# Purpose

Evaluate changes for correctness, safety, maintainability, and fit with the intended outcome.

# When to use

Use before merging any non-trivial change or after a risk-sensitive incident fix.

# Inputs

Provide intent, acceptance criteria, diff, tests, architecture context, and risk notes.

# Outputs

Produce prioritized findings, approval status, and any follow-up actions.

# Rules

Review the requirement before style. Classify findings by impact, explain the evidence, and distinguish blocking defects from optional suggestions.

# Checklist

- Does the change meet its stated outcome without regression?
- Are security, data, error, and concurrency boundaries addressed?
- Are tests proportionate to risk and behavior?

# Examples

Flag a missing ownership check as blocking; suggest a local rename as non-blocking when it improves clarity.

# Anti Patterns

Avoid nit-only reviews, vague criticism, approval without reading behavior, and expanding scope into unrelated redesign.

# Best Practices

Keep feedback kind, specific, and actionable; verify resolved findings against the code.

# Related Skills

testing-strategy, security-baseline, git-conventions
