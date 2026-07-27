---
name: api-design
version: 1.0.0
category: architecture
priority: required
loads_before: [input-validation, testing-strategy]
requires: [naming, error-handling]
tags: [api, contracts, compatibility]
compatible: [any]
---

# Purpose

Define stable, discoverable interfaces that express consumer needs and evolve safely.

# When to use

Use when creating or changing an HTTP, RPC, event, CLI, or library interface.

# Inputs

Provide consumers, use cases, data ownership, failure modes, and compatibility constraints.

# Outputs

Produce a documented contract, validation rules, examples, and versioning plan.

# Rules

Model resources and actions in domain language. Make pagination, idempotency, errors, authorization, and compatibility explicit. Prefer additive changes.

# Checklist

- Is the contract consumer-oriented and unambiguous?
- Are success and failure shapes stable and documented?
- Is breaking change handling explicit?

# Examples

Represent a list response with items and pagination metadata; use a dedicated idempotency key for a retryable create action.

# Anti Patterns

Avoid exposing persistence schemas, overloaded response meanings, and silent breaking renames.

# Best Practices

Review contracts with consumers and test compatibility at the boundary.

# Related Skills

input-validation, error-handling, documentation-standard
