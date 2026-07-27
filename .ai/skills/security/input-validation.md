---
name: input-validation
version: 1.0.0
category: security
priority: required
loads_before: [api-design]
requires: [security-baseline, error-handling]
tags: [validation, input, security]
compatible: [any]
---

# Purpose

Accept only well-formed, authorized input at every untrusted boundary.

# When to use

Use for requests, files, events, configuration, imports, and third-party responses.

# Inputs

Provide the contract, trust level, allowed values, size limits, and downstream use.

# Outputs

Produce normalized validated data and a safe rejection contract.

# Rules

Use allowlists, type and range checks, length limits, canonicalization, and context-aware encoding. Validate again when trust changes.

# Checklist

- Is every field validated before use?
- Are size, format, and cardinality bounded?
- Is output encoded for its destination context?

# Examples

Accept an identifier only after validating its format and ownership; reject unknown enum values explicitly.

# Anti Patterns

Do not rely on blocklists, client validation alone, or validation that occurs after dangerous parsing.

# Best Practices

Centralize reusable policies while keeping boundary-specific constraints visible.

# Related Skills

security-baseline, api-design, testing-strategy
