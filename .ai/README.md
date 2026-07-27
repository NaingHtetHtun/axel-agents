# AI Skill OS

This directory is a manifest-driven Engineering OS for reusable AI engineering work. It separates decision guidance (skills), role and authority (agents), project-wide constraints (rules), repeatable sequences (workflows), validation gates (checks), end-to-end compositions (playbooks), request entry points (prompts), and project facts (memory).

## Quick Start

1. Copy the `.ai/` directory and the provided `.gitignore` rules into a project.
2. Record verified facts in `memory/stack.md`, `memory/architecture.md`, and `memory/decisions.md`.
3. Select the project stack and enable its pack from `extensions/` (for example, `laravel.yaml`).
4. Start with a command, such as `/new-feature Create User Authentication`.
5. Follow the generated Evidence Report and do not mark work Done without applicable PASS evidence.

Shared memory files (`architecture.md`, `database.md`, `decisions.md`, `api.md`, `known-issues.md`, and `stack.md`) are committed. Secret or machine-local memory is ignored by both root and memory `.gitignore` files.

## Loading model

1. Select the narrowest owning role from `agents/`.
2. Use `docs/skill-loader.md` to load relevant memory and the minimum sufficient skill set.
3. Load its required skills, then begin with `rules/` and `skills/shared/` skills marked `required`.
4. Resolve each selected skill's `requires` entries before using the skill.
5. Honor `loads_before` as an ordering constraint, not an automatic dependency.
6. Load only skills whose `compatible` list covers the project context; `any` is universal.
7. Choose a workflow or playbook, then finish with relevant checks and an Evidence Report.

`docs/manifest-spec.md` defines the front matter contract. `docs/skill-catalog.md` is the human-readable index. Framework extensions live beside core skills: Laravel at `skills/backend/laravel/`, React at `skills/frontend/react/`, and Go at `skills/backend/go/`.

`version.yaml` declares Engineering OS compatibility. `extensions/` is the registry for extension packs; registry entries identify skills but do not bypass the Skill Loader.

## Execution architecture

```text
User task → Command Router → Agent Router → Project Memory
          → Skill Loader → Workflow / Playbook → Quality Gates
          → Evidence Report → optional user-authorized Git commit
```

Start through `commands/` (`/new-feature`, `/fix-bug`, `/review`, `/optimize`, `/deploy`). Hosts may map `hooks/` to their native lifecycle events. Use `docs/skill-governance.md` before adding skills to prevent overlap.

## Boundaries

- Skills describe reusable behavior; they never contain application code or secrets.
- Rules state non-negotiable cross-cutting standards.
- Workflows orchestrate skills and include decision gates.
- Agents define role, required skills, and forbidden actions; they never expand user-granted authority.
- Checks turn expectations such as test, lint, security, and release readiness into evidence-backed gates.
- Playbooks compose agents, skills, workflows, and checks for a complete outcome.
- Memory stores project facts only; it must not silently become a rule source.
