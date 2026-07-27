# Skill Manifest Specification

Every skill is one Markdown file with YAML front matter followed by the canonical sections in `templates/skill.md`.

## Required fields

```yaml
name: kebab-case-identifier
version: 1.0.0
category: one-of-the-skill-directories
priority: required | recommended | optional
loads_before: []
requires: []
tags: []
compatible: [any]
```

`name` is globally unique. `requires` means the referenced skill must be loaded first. `loads_before` communicates a preferred ordering when both skills are selected. `compatible` accepts `any` or extension names such as `laravel`, `react`, `node`, `go`, and `python`; a core skill should normally use `any`.

## Resolution rules

Resolve dependencies transitively, reject a cycle, deduplicate by `name`, and load higher-priority skills first where dependencies do not determine the order. A resolver must report missing or incompatible dependencies instead of guessing. Manifests are metadata, not executable instructions.

## Versioning

Use semantic versioning. Increment PATCH for clarifications, MINOR for backwards-compatible additions, and MAJOR for renamed sections or incompatible behavioral changes.
