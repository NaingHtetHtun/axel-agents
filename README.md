# Axel Agents

Axel Agents distributes a portable, manifest-driven AI Engineering OS. The npm package installs a project-local `.ai/` directory containing agents, skills, workflows, quality gates, memory templates, commands, hooks, and evidence reporting.

## Install

```sh
npx axel-agents init laravel-api
```

Other project types are `react-app` and `go-service`. To select packs directly, use:

```sh
npx axel-agents init --stack laravel,react
npx axel-agents add laravel
npx axel-agents update
npx axel-agents doctor
npx axel-agents new-feature "Create User Profile API"
```

`init` refuses to overwrite an existing `.ai/` directory. Use `--force` only after backing up project-specific memory. `update` preserves `.ai/memory/` and re-installs the configured extensions.

## Package layout

```text
packages/cli/      # publishable @axel-agents/cli command package
packages/core/     # publishable @axel-agents/core universal assets
packages/laravel/  # Laravel skills
packages/react/    # React skills
packages/go/       # Go skills
packages/adapters/ # OpenCode, Claude Code, Cursor, and Codex placement adapters
registry.yaml       # package sources and dependency graph
```

`init` optionally accepts `--adapter opencode|claude-code|cursor|codex`. The adapter selects the installed root (`.ai/`, `.claude/axel-agents/`, `.cursor/rules/axel-agents/`, or `.codex/axel-agents/`).

After installation, start with `npx axel-agents new-feature "…"`, `fix-bug`, `review`, `optimize`, or `deploy`. Each command reads the installed command contract before routing to agents and skills. The installed README explains selective loading, quality gates, and Evidence Reports.

## Safety

Shared architectural memory is committed; local memory such as `secrets.md`, `credentials.md`, and `env.md` is ignored. An agent may only claim completion with the applicable PASS evidence recorded in its Evidence Report.
