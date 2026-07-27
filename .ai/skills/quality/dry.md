---
name: dry
version: 1.0.0
category: quality
priority: recommended
loads_before: [code-review]
requires: [clean-code]
tags: [dry, duplication, knowledge]
compatible: [any]
---

# Purpose

Ensure each business fact and policy has a single authoritative representation.

# When to use

Use when similar logic, validation, configuration, or documentation changes together.

# Inputs

Provide duplicate candidates, their reasons for change, and their contexts.

# Outputs

Produce a shared source of truth or an explicit decision to retain independent copies.

# Rules

Remove duplicated knowledge, not merely similar syntax. Keep independently changing code separate even when it currently looks alike.

# Checklist

- Would the copies always change for the same reason?
- Is the shared abstraction simpler than the duplication?
- Is one source now authoritative?

# Examples

Centralize one validation policy used by multiple entry points; retain two similarly shaped flows with different business owners.

# Anti Patterns

Avoid premature generic helpers and cross-layer utilities that couple unrelated contexts.

# Best Practices

Wait for evidence of shared knowledge, then name the shared concept precisely.

# Related Skills

kiss-yagni, clean-code, data-modeling
