# After Test Hook

1. Record command, environment scope, result, and failures.
2. For failures, hand off to `/fix-bug`; do not mask, skip, or reinterpret the result as success.
3. For passing tests, assess whether required boundaries and acceptance criteria were actually covered.
4. Update the Evidence Report before declaring validation complete.
