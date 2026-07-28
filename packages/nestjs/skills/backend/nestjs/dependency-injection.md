---
name: nestjs-dependency-injection
version: 1.0.0
category: backend
priority: recommended
loads_before: []
requires: [clean-architecture, dependency-injection]
tags: [nestjs, dependency-injection, providers, backend]
compatible: [nestjs]
---

# Purpose

Manage the lifecycle, scoping, and resolution of injectable providers through the NestJS IoC container.

# When to use

Use when designing or reviewing provider registration, custom providers, scoping, or injection patterns in NestJS.

# Inputs

Provide provider definitions, injection tokens, and scope requirements.

# Outputs

Produce explicit provider registrations with clear lifetimes and no hidden dependencies.

# Rules

- Prefer constructor injection; avoid `@Inject()` tokens unless necessary.
- Use `useClass`, `useValue`, `useFactory`, or `useExisting` for custom providers.
- Understand and document provider scope: DEFAULT, REQUEST, or TRANSIENT.
- Register providers in the module that owns them; do not rely on global registration.

# Checklist

- [ ] All dependencies are declared in the module's `providers` array.
- [ ] Provider scope is intentional and documented.
- [ ] No circular dependency chains exist.

# Examples

```typescript
// Simple constructor injection
@Injectable()
export class ArticlesService {
  constructor(private readonly articlesRepository: ArticlesRepository) {}
}

// Custom provider with useFactory
@Module({
  providers: [
    {
      provide: LOGGER,
      useFactory: (config: ConfigService) => new Logger(config.get('LOG_LEVEL')),
      inject: [ConfigService],
    },
  ],
})
export class AppModule {}
```

# Anti Patterns

- Using `@Inject()` for every dependency when constructor injection suffices.
- Registering providers globally when they are only used in one module.
- Creating circular dependencies between modules.

# Best Practices

- Default to constructor injection for simplicity.
- Use custom providers for third-party libraries, configuration values, or testing mocks.
- Document provider scope when using REQUEST or TRANSIENT.

# Related Skills

modules, services, testing
