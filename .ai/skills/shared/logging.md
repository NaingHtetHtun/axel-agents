---
name: logging
version: 1.0.0
category: shared
priority: required
loads_before: [debugging-method]
requires: [naming, error-handling]
tags: [logging, diagnostics, privacy]
compatible: [any]
---

# Purpose

Provide useful, structured operational evidence without leaking sensitive information.

# When to use

Use when adding logs, defining event fields, or reviewing diagnostics.

# Inputs

Provide the event, severity, correlation context, audience, and data classification.

# Outputs

Produce structured events with stable names and safe contextual fields.

# Rules

Log events at boundaries and state transitions. Include timestamp, severity, operation, outcome, and correlation ID. Redact secrets, tokens, and personal data by default.

# Checklist

- Can an operator trace the request without reading source code?
- Is each field structured and safe to retain?
- Does severity match required action?

# Examples

Emit `order.submission.failed` with `orderId`, `reasonCode`, and `traceId`, not a serialized request body.

# Anti Patterns

Avoid log spam, string-only unsearchable messages, credentials, and duplicate logging at every layer.

# Best Practices

Use sampled debug detail, centralized redaction, and documented event names.

# Related Skills

observability, debugging-method, security-baseline
