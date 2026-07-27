---
name: service-boundaries
version: 1.0.0
category: backend
priority: recommended
loads_before: [data-modeling]
requires: [clean-architecture]
tags: [backend, services, boundaries]
compatible: [any]
---

# Purpose

Define cohesive backend services and the contracts between them.

# When to use

Use when deciding whether to split a module, service, worker, or integration.

# Inputs

Provide business capabilities, ownership, data lifecycle, scaling needs, and failure modes.

# Outputs

Produce service ownership, interaction contracts, and consistency decisions.

# Rules

Split by business capability and ownership, not technology. Keep synchronous dependencies few; define timeouts, retries, and data authority for every remote interaction.

# Checklist

- Does one owner control each capability and its data?
- Is a distributed boundary justified by independent change or scaling?
- Are consistency and failure behaviors explicit?

# Examples

Keep billing policy and ledger ownership together; publish a stable event for another capability rather than sharing its tables.

# Anti Patterns

Avoid distributed monoliths, chatty call chains, and shared databases as an integration contract.

# Best Practices

Start modular before extracting a service, then measure operational need.

# Related Skills

clean-architecture, api-design, observability
