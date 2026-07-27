---
name: feature-planning
version: 1.0.0
category: planning
priority: required
loads_before: [testing-strategy, code-review]
requires: [kiss-yagni, documentation-standard]
tags: [planning, features, delivery]
compatible: [any]
---

# Purpose

Turn an outcome into a small, testable, risk-aware delivery plan.

# When to use

Use before implementing a feature, significant change, or uncertain enhancement.

# Inputs

Provide user outcome, acceptance criteria, constraints, stakeholders, and existing system context.

# Outputs

Produce scope, assumptions, alternatives, delivery slices, risks, and verification plan.

# Rules

Start from user value and acceptance criteria. Separate facts from assumptions, identify non-goals, and sequence work into independently verifiable slices.

# Checklist

- Is the outcome measurable?
- Are scope, non-goals, and assumptions explicit?
- Does each slice have a verification method and rollback consideration?

# Examples

Plan an import feature as validate, preview, commit, and report rather than one untestable bulk change.

# Anti Patterns

Avoid implementation-first plans, hidden assumptions, and tasks without acceptance criteria.

# Best Practices

Resolve high-risk unknowns early and revise the plan when evidence changes.

# Related Skills

kiss-yagni, testing-strategy, feature-development
