---
name: python-project-structure
version: 1.0.0
category: backend
priority: recommended
loads_before: []
requires: [clean-architecture]
tags: [python, project-structure, backend]
compatible: [python]
---

# Purpose

Organize Python projects with clear module boundaries, package layout, and dependency management.

# When to use

Use when designing or reviewing Python project structure, package organization, module boundaries, or dependency configuration.

# Inputs

Provide project scope, framework choice, and deployment target.

# Outputs

Producible project layout with explicit module ownership and dependency declarations.

# Rules

- Use `src/` layout or flat layout consistently; do not mix conventions within one project.
- Declare dependencies in `pyproject.toml` (PEP 621); avoid bare `requirements.txt` for libraries.
- Separate application code from configuration and scripts.
- Use `__init__.py` to control public API; keep internal modules private with leading underscore.

# Checklist

- [ ] Project has a single `pyproject.toml` or `requirements.txt` for dependency management.
- [ ] Module boundaries are clear; no circular imports exist.
- [ ] Entry points are documented (CLI scripts, API servers).

# Examples

```
myproject/
  src/
    myproject/
      __init__.py
      models.py
      services/
        __init__.py
        billing.py
      api/
        __init__.py
        routes.py
  tests/
    conftest.py
    test_services.py
  pyproject.toml
  README.md
```

# Anti Patterns

- Putting all code in a single `main.py` file.
- Importing from `src.` directly instead of using package-relative imports.
- Committing `__pycache__/` or `.pyc` files.

# Best Practices

- Follow PEP 8 naming: `snake_case` for modules and functions, `PascalCase` for classes.
- Use `pyproject.toml` as the single source of truth for build and dependency config.
- Keep `tests/` outside the package but importable via `conftest.py`.

# Related Skills

http-services, data-modeling, testing
