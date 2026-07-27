---
name: release-safety
version: 1.0.0
category: deployment
priority: required
loads_before: []
requires: [testing-strategy, observability, security-baseline]
tags: [deployment, release, rollback]
compatible: [any]
---

# Purpose

Release changes predictably with verification, monitoring, and a tested recovery path.

# When to use

Use for deployment planning, configuration changes, migrations, and production releases.

# Inputs

Provide change scope, risk, rollout environment, dependencies, dashboards, and rollback options.

# Outputs

Produce a release plan, verification criteria, monitoring window, and rollback plan.

# Rules

Automate repeatable deployment steps. Separate deployment from activation when risk is high. Ensure backward compatibility during transitions and decide rollback before release.

# Checklist

- Are prerequisites and configuration changes verified?
- Are success measures and owners defined?
- Is rollback safe for code and data?

# Examples

Deploy a backward-compatible data change, observe it, then activate dependent behavior in a later controlled step.

# Anti Patterns

Avoid irreversible releases without recovery, unobserved changes, and manual undocumented production edits.

# Best Practices

Use progressive delivery for risky changes and capture release evidence.

# Related Skills

testing-strategy, observability, data-modeling
