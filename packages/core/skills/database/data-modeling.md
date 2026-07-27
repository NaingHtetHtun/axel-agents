---
name: data-modeling
version: 1.0.0
category: database
priority: required
loads_before: [performance-baseline]
requires: [clean-architecture]
tags: [database, modeling, integrity]
compatible: [any]
---

# Purpose

Model data around business invariants, ownership, integrity, and access patterns.

# When to use

Use when creating entities, relations, migrations, retention policies, or query shapes.

# Inputs

Provide business rules, lifecycle, ownership, privacy classification, and expected queries.

# Outputs

Produce a logical model, integrity constraints, migration strategy, and access assumptions.

# Rules

Make invariants enforceable near the data. Choose identifiers, nullability, relations, indexes, and deletion semantics deliberately. Plan reversible, observable migrations.

# Checklist

- Are ownership and lifecycle clear?
- Which constraints prevent invalid states?
- Do indexes support known reads and writes?

# Examples

Represent a required parent relation as non-null and enforce uniqueness for a business key that must be unique.

# Anti Patterns

Avoid storing unrelated blobs, relying only on application checks for critical invariants, and destructive schema changes without a transition.

# Best Practices

Model first, review realistic queries, and retain an audit trail where required.

# Related Skills

performance-baseline, security-baseline, api-design
