---
name: performance-baseline
version: 1.0.0
category: performance
priority: recommended
loads_before: [release-safety]
requires: [observability, data-modeling]
tags: [performance, capacity, efficiency]
compatible: [any]
---

# Purpose

Meet user-facing latency, throughput, and resource goals through measurement-led design.

# When to use

Use when defining non-functional requirements, investigating slowness, or changing hot paths.

# Inputs

Provide workloads, target percentiles, data size, resource limits, and measurements.

# Outputs

Produce performance budgets, bottleneck evidence, and verified improvements.

# Rules

Measure representative workloads before optimizing. Set percentile targets, bound expensive work, and optimize the dominant bottleneck rather than micro-tuning guesses.

# Checklist

- Is the target expressed as a measurable budget?
- Does evidence identify the bottleneck?
- Was behavior re-measured under comparable load?

# Examples

Reduce repeated remote calls by batching only after traces show dependency latency dominates the request.

# Anti Patterns

Avoid premature caching, benchmark-free claims, and optimizing averages while tail latency fails users.

# Best Practices

Budget capacity early and retain regression benchmarks for critical paths.

# Related Skills

observability, data-modeling, debugging-method
