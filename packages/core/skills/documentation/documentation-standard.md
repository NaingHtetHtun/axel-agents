---
name: documentation-standard
version: 1.0.0
category: documentation
priority: required
loads_before: [git-conventions, code-review]
requires: [naming]
tags: [documentation, decisions, maintainability]
compatible: [any]
---

# Purpose

Document durable decisions, contracts, and operational knowledge close to their users.

# When to use

Use when a decision, interface, workflow, setup, or operation cannot be safely inferred from code alone.

# Inputs

Provide the audience, task, source of truth, assumptions, and change owner.

# Outputs

Produce concise, current documentation with examples and ownership.

# Rules

Document why and how to use an interface, not a restatement of obvious code. Keep one source of truth and update documentation in the same change as behavior.

# Checklist

- Is the target reader and action clear?
- Are assumptions, limits, and examples current?
- Is ownership or a source of truth identified?

# Examples

Document an API's idempotency behavior and error outcomes instead of describing internal class names.

# Anti Patterns

Avoid stale copy-paste guides, undocumented breaking changes, and large narrative without a task path.

# Best Practices

Use short runnable examples and date volatile operational decisions.

# Related Skills

api-design, git-conventions, feature-planning
