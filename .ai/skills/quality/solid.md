---
name: solid
version: 1.0.0
category: quality
priority: recommended
loads_before: [dependency-injection]
requires: [clean-code]
tags: [solid, design, maintainability]
compatible: [any]
---

# Purpose

Use SOLID principles to keep changing concerns isolated and contracts dependable.

# When to use

Use when a component accumulates reasons to change, depends on infrastructure, or exposes a polymorphic contract.

# Inputs

Provide responsibilities, change drivers, callers, and concrete dependencies.

# Outputs

Produce focused boundaries and substitutable contracts.

# Rules

Separate independent change reasons, depend on stable abstractions at boundaries, and keep interfaces no broader than their consumers need.

# Checklist

- Does one component own one policy?
- Can implementations satisfy the contract without surprises?
- Are dependencies injected rather than constructed deep inside?

# Examples

Separate notification policy from message transport so either may change independently.

# Anti Patterns

Do not create an interface for every class or split cohesive behavior merely to satisfy a slogan.

# Best Practices

Apply principles in response to real variation and test contracts at the seam.

# Related Skills

dependency-injection, clean-architecture, service-boundaries
