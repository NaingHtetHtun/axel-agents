---
name: debugging-method
version: 1.0.0
category: debugging
priority: recommended
loads_before: [testing-strategy]
requires: [logging, error-handling]
tags: [debugging, diagnosis, incidents]
compatible: [any]
---

# Purpose

Find the true cause of a defect with reproducible evidence before changing code.

# When to use

Use for failures, regressions, production incidents, and unexplained behavior.

# Inputs

Provide expected versus actual behavior, reproduction steps, scope, logs, traces, and recent changes.

# Outputs

Produce a verified root cause, minimal corrective change, regression test, and follow-up actions.

# Rules

Reproduce first, narrow the smallest failing boundary, state a falsifiable hypothesis, then verify the fix against the original failure and adjacent risk.

# Checklist

- Is the issue reproducible or bounded by evidence?
- Does the proposed cause explain all observed symptoms?
- Is a regression test or durable verification added?

# Examples

Compare a failing request trace with a successful one to isolate the first divergent state transition.

# Anti Patterns

Avoid random edits, treating a symptom as the cause, and closing an incident without verification.

# Best Practices

Record timeline, blast radius, root cause, and prevention separately.

# Related Skills

logging, testing-strategy, performance-baseline
