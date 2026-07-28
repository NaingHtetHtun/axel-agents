---
name: nestjs-modules
version: 1.0.0
category: backend
priority: recommended
loads_before: []
requires: [clean-architecture, dependency-injection]
tags: [nestjs, modules, backend]
compatible: [nestjs]
---

# Purpose

Organize application boundaries using modules that encapsulate related providers, controllers, and imports.

# When to use

Use when designing or reviewing NestJS module structure, feature modules, dynamic modules, or module dependency graphs.

# Inputs

Provide module declarations, provider registrations, controller bindings, and import/export relationships.

# Outputs

Produce a well-bounded module graph with clear dependency directions and no circular imports.

# Rules

- Each module must have a single responsibility; create feature modules for bounded contexts.
- Export only what downstream modules need; keep internal providers private.
- Use dynamic modules for configurable, reusable infrastructure (database, cache, auth).
- Avoid circular dependencies; restructure with shared modules or forwardRef as a last resort.

# Checklist

- [ ] Each feature has its own module with co-located controllers and services.
- [ ] Exports are minimal and intentional.
- [ ] No circular dependency chains exist in the module graph.

# Examples

```typescript
@Module({
  imports: [TypeOrmModule.forFeature([Article])],
  controllers: [ArticlesController],
  providers: [ArticlesService, ArticlesRepository],
  exports: [ArticlesService],
})
export class ArticlesModule {}
```

# Anti Patterns

- Placing all controllers and services in a single root module.
- Exporting every provider from every module.
- Using `forwardRef()` as a band-aid for architectural violations.

# Best Practices

- One feature module per bounded domain concept.
- Keep module files small and declarative.
- Use shared modules for cross-cutting concerns (logging, config, auth).

# Related Skills

services, dependency-injection, controllers
