---
name: kiss-yagni
version: 1.0.0
category: quality
priority: required
loads_before: [feature-planning]
requires: []
tags: [kiss, yagni, simplicity]
compatible: [any]
---

# Purpose

Deliver the smallest design that safely satisfies the current, evidenced need.

# When to use

Use when choosing abstractions, options, extensibility points, or scope.

# Inputs

Provide confirmed requirements, constraints, risks, and likely near-term changes.

# Outputs

Produce a minimal design and explicit deferred assumptions.

# Rules

Do not build for hypothetical features. Prefer a simple reversible implementation until variation is real and costly to defer.

# Checklist

- Is every part justified by a present requirement or risk?
- Can future change be isolated later?
- Have optional features been deferred explicitly?

# Examples

Use one clear strategy for one provider; introduce a provider abstraction only when multiple providers are required.

# Anti Patterns

Avoid configuration for a single fixed behavior and elaborate inheritance trees for imagined extensions.

# Best Practices

Record deliberate deferrals so future work can revisit evidence rather than assumptions.

# Related Skills

feature-planning, dry, clean-code
