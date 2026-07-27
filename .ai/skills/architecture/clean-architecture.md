---
name: clean-architecture
version: 1.0.0
category: architecture
priority: required
loads_before: [service-boundaries, data-modeling]
requires: [clean-code, solid]
tags: [architecture, boundaries, dependencies]
compatible: [any]
---

# Purpose

Organize software so core policies remain independent of delivery mechanisms and infrastructure.

# When to use

Use when defining module boundaries, dependency direction, or integration seams.

# Inputs

Provide business policies, external systems, delivery channels, and change risks.

# Outputs

Produce dependency rules, boundary contracts, and ownership of policies.

# Rules

Dependencies point toward stable business policy. Keep transport, persistence, and frameworks at outer boundaries. Translate external models at the boundary.

# Checklist

- Can core policy be understood without framework details?
- Are external concerns accessed through boundary contracts?
- Does each boundary own its translation and error mapping?

# Examples

Keep an order-placement policy independent from HTTP handlers and database query syntax.

# Anti Patterns

Do not force every tiny module into layers or leak request and storage models into core policy.

# Best Practices

Create boundaries around change rates and business language, then keep them tested.

# Related Skills

dependency-injection, service-boundaries, api-design
