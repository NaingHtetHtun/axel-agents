---
name: clean-code
version: 1.0.0
category: quality
priority: required
loads_before: [testing-strategy, code-review]
requires: [naming]
tags: [clean-code, readability, maintainability]
compatible: [any]
---

# Purpose

Keep code understandable, local in its effects, and inexpensive to change.

# When to use

Use during design, implementation, refactoring, and review.

# Inputs

Provide the behavior, constraints, surrounding abstractions, and test coverage.

# Outputs

Produce cohesive code with clear intent and minimal accidental complexity.

# Rules

Keep functions focused, keep dependencies explicit, and remove dead code. Prefer clarity over cleverness and make side effects visible at boundaries.

# Checklist

- Does each unit have one understandable responsibility?
- Can a reader infer behavior from names and structure?
- Is unnecessary branching or duplication removed?

# Examples

Extract a named `calculateTotal` operation when its business rule is reused or difficult to read inline.

# Anti Patterns

Avoid speculative abstractions, hidden mutation, long mixed-purpose functions, and comments that compensate for unclear code.

# Best Practices

Make small reversible changes and let tests protect behavior while improving structure.

# Related Skills

solid, dry, kiss-yagni, code-review
