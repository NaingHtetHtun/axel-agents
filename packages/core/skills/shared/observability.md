---
name: observability
version: 1.0.0
category: shared
priority: recommended
loads_before: [release-safety]
requires: [logging]
tags: [metrics, tracing, operations]
compatible: [any]
---

# Purpose

Make system behavior measurable through logs, metrics, traces, and actionable alerts.

# When to use

Use when defining service health, SLOs, dashboards, or production diagnostics.

# Inputs

Provide critical user journeys, reliability targets, dependencies, and operational owners.

# Outputs

Produce service indicators, trace boundaries, dashboards, and alert conditions.

# Rules

Measure latency, traffic, errors, and saturation at meaningful boundaries. Alert on user impact and sustained budget burn, not every anomalous event.

# Checklist

- Are critical journeys covered end-to-end?
- Can metrics be segmented safely by relevant dimensions?
- Does every alert identify an owner and response?

# Examples

Track successful checkout completion rate and its dependency latency, rather than only process uptime.

# Anti Patterns

Do not use high-cardinality identifiers as metric labels or alert on non-actionable noise.

# Best Practices

Link dashboards, runbooks, logs, and traces using the same correlation fields.

# Related Skills

logging, performance-baseline, release-safety
