# Before Commit Quality Gate

Required evidence for a code change:

- [ ] Formatting and lint commands passed, or are explicitly unavailable.
- [ ] Static analysis/type checking passed when configured.
- [ ] Relevant automated tests passed; new behavior and regressions are covered.
- [ ] Security review completed for trust, identity, data, dependency, or public API changes.
- [ ] Performance impact considered for critical paths, data access, and unbounded work.
- [ ] Documentation, migration, configuration, and release notes are updated when applicable.
- [ ] Evidence Report records exact commands and results.

Do not commit when a required applicable item fails. Escalate a skipped required check as an explicit risk acceptance; do not label the task Done.
