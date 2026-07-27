---
name: naming
version: 1.0.0
category: shared
priority: required
loads_before: [clean-code, documentation-standard]
requires: []
tags: [naming, readability, consistency]
compatible: [any]
---

# Purpose

Create names that communicate intent, scope, and units without requiring comments.

# When to use

Use when naming or renaming public APIs, files, modules, data fields, variables, or tests.

# Inputs

Provide the domain vocabulary, audience, scope, and existing naming conventions.

# Outputs

Produce consistent names and any documented glossary additions.

# Rules

Prefer domain terms, pronounceable words, and one convention per artifact type. Encode units and booleans clearly. Avoid abbreviations, implementation leaks, and misleading generic names.

# Checklist

- Does the name reveal intent and scope?
- Is it consistent with adjacent code and the domain glossary?
- Does it avoid redundant type or implementation detail?

# Examples

Use `retryDelayMs` rather than `delay`; use `isArchived` rather than `archived` for a predicate.

# Anti Patterns

Do not use `data`, `manager`, `util`, or one-letter names outside a tiny local scope; they conceal responsibility.

# Best Practices

Treat renaming as design work and update documentation, logs, and tests together.

# Related Skills

clean-code, documentation-standard, api-design
