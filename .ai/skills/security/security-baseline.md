---
name: security-baseline
version: 1.0.0
category: security
priority: required
loads_before: [release-safety, code-review]
requires: [error-handling, logging]
tags: [security, privacy, threat-modeling]
compatible: [any]
---

# Purpose

Build secure defaults through threat-aware design, least privilege, and safe handling of data.

# When to use

Use for every feature that processes data, identity, permissions, dependencies, or external input.

# Inputs

Provide assets, actors, trust boundaries, data classification, and deployment context.

# Outputs

Produce threats, mitigations, authorization rules, and verification evidence.

# Rules

Authenticate before authorizing, enforce least privilege server-side, validate at trust boundaries, manage secrets outside source, and minimize retained data.

# Checklist

- Are assets, trust boundaries, and abuse cases identified?
- Is authorization checked for every protected operation?
- Are secrets and sensitive fields protected in storage, transit, and logs?

# Examples

Authorize access to a record using the caller and record context; never trust a client-supplied owner identifier.

# Anti Patterns

Avoid security by obscurity, client-only authorization, hard-coded secrets, and broad administrative defaults.

# Best Practices

Use defense in depth, dependency updates, and security-focused tests for critical flows.

# Related Skills

input-validation, logging, code-review
