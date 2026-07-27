---
name: laravel-deployment
version: 1.0.0
category: backend
priority: recommended
loads_before: []
requires: [clean-architecture, security-baseline]
tags: [laravel, deployment, backend]
compatible: [laravel]
---

# Purpose

Deploy Laravel applications with configuration discipline, safe migrations, queues, and observability.

# When to use

Use when implementing or reviewing Laravel deployment concerns.

# Inputs

Provide environment config, artifact, migration and rollback plans.

# Outputs

Produce a maintainable Laravel boundary, documented decisions, and verification evidence.

# Rules

never ship secrets; manage workers and cache explicitly; verify health after release.

# Checklist

- Is responsibility confined to this Laravel boundary?
- Are authorization, failures, observability, and tests addressed where relevant?
- Is framework behavior kept behind a stable application contract?

# Examples

For deployment, choose the smallest Laravel feature that satisfies a verified application need and test its observable contract.

# Anti Patterns

Avoid framework convenience that leaks persistence, transport, secrets, or unbounded work across boundaries.

# Best Practices

Follow Laravel conventions when they improve clarity; document deviations and keep configuration environment-specific.

# Related Skills

release-safety, migrations, queues

