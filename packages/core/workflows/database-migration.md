# Database Migration Workflow

Load `data-modeling`, `release-safety`, `testing-strategy`, and `performance-baseline`.

1. State the invariant and affected read/write paths.
2. Design a backward-compatible transition and data backfill if required.
3. Estimate lock, volume, and rollback risk with production-like evidence.
4. Deploy schema safely, monitor, then activate dependent behavior.
5. Verify integrity and performance before removing transitional paths.
