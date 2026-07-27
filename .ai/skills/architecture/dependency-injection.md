---
name: dependency-injection
version: 1.0.0
category: architecture
priority: recommended
loads_before: [testing-strategy]
requires: [solid]
tags: [dependency-injection, composition, testability]
compatible: [any]
---

# Purpose

Make dependencies visible, replaceable, and composed at application boundaries.

# When to use

Use when behavior depends on time, IO, configuration, infrastructure, or collaborators.

# Inputs

Provide required capabilities, lifetimes, configuration, and test seams.

# Outputs

Produce explicit dependency contracts and a composition root.

# Rules

Inject required collaborators; construct concrete infrastructure near startup. Do not use service locators or hidden global state as a shortcut.

# Checklist

- Are dependencies visible from the public constructor or function signature?
- Is object lifetime intentional?
- Can tests substitute only the necessary boundary?

# Examples

Pass a clock capability to expiry logic instead of reading ambient system time directly.

# Anti Patterns

Avoid injecting every helper, mutable global singletons, and containers accessed throughout business code.

# Best Practices

Keep contracts narrow and place wiring in one composition root.

# Related Skills

solid, clean-architecture, testing-strategy
