---
name: git-conventions
version: 1.0.0
category: git
priority: required
loads_before: [code-review, release-safety]
requires: [documentation-standard]
tags: [git, commits, collaboration]
compatible: [any]
---

# Purpose

Keep history reviewable, traceable, and safe for collaboration.

# When to use

Use before committing, opening a change request, merging, reverting, or releasing.

# Inputs

Provide the change intent, issue reference, repository policy, and current branch state.

# Outputs

Produce focused commits, clear change descriptions, and safe integration decisions.

# Rules

Keep commits cohesive and buildable. Write imperative summaries that state intent. Do not rewrite shared history without explicit agreement; never commit secrets or generated noise.

# Checklist

- Does each commit contain one logical change?
- Is the message understandable without diff archaeology?
- Are tests and review notes attached to the change?

# Examples

Use `Add validation for expired invitations` rather than `fix stuff`.

# Anti Patterns

Avoid unrelated formatting with behavior changes, force-pushing shared branches, and vague merge descriptions.

# Best Practices

Prefer small reviewable changes and document rollback considerations for risky releases.

# Related Skills

code-review, release-safety, documentation-standard
