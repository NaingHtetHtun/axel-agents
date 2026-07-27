# Skill Loader

The Skill Loader selects the minimum sufficient skill set for a task. It prevents context waste: do not load every skill, and do not infer a framework extension without evidence.

## Inputs

- Task statement and requested outcome
- Repository and project memory facts
- Available agent, playbook, and skill manifests

## Resolution algorithm

1. Extract task signals: domain, framework/runtime, action, boundary, and risk (for example: `backend`, `laravel`, `authentication`, `api`).
2. Select the command and primary agent through `docs/agent-router.md`.
3. Load project memory files relevant to those signals.
4. Add the selected agent's Required Skills.
5. Match compatible skills by manifest tags and category; prefer a specific extension skill over a broad duplicate.
6. Add every transitive `requires` dependency. Apply `loads_before` when two selected skills have no dependency ordering.
7. Remove duplicate responsibilities, optional skills without a task signal, and incompatible skills.
8. Emit a Skill Load Plan before editing: selected skills, reason, dependency source, and omitted near-matches.

## Selection policy

Load all `required` shared rules only when they are applicable to the task boundary. Security, error handling, and testing are mandatory for code changes that cross trust, persistence, public-contract, or production boundaries. A request for analysis-only work must not load implementation-only skills.

## Example: Create User Login API

Signals: `backend`, `laravel`, `authentication`, `api`, `security`, `testing`.

Load: `clean-code`, `api-design`, `security-baseline`, `input-validation`, `error-handling`, `testing-strategy`, `laravel-controllers`, `laravel-form-request`, `laravel-policies`, `laravel-sanctum`, `laravel-api-resource`, and their transitive dependencies. Do not load queues, migrations, caching, or unrelated frontend skills unless the requirement introduces them.

## Failure behavior

If signals are ambiguous, load only universal safeguards and ask for the smallest decision that changes routing. If a required dependency is missing or incompatible, stop before edits and report the unresolved manifest edge.
