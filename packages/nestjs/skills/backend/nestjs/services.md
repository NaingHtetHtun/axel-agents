---
name: nestjs-services
version: 1.0.0
category: backend
priority: recommended
loads_before: []
requires: [clean-architecture, security-baseline]
tags: [nestjs, services, providers, backend]
compatible: [nestjs]
---

# Purpose

Encapsulate business logic and application use cases in injectable providers with clear boundaries.

# When to use

Use when implementing or reviewing NestJS services, providers, or business logic orchestration.

# Inputs

Provide domain requirements, repository or ORM access, and external service dependencies.

# Outputs

Produce testable, well-scoped services with explicit contracts and no transport leakage.

# Rules

- Services own business logic; controllers and modules delegate to them.
- Use `@Injectable()` and declare providers in the owning module.
- Inject dependencies via constructor injection; never use `new` to create service instances.
- Keep services focused on a single bounded responsibility.

# Checklist

- [ ] Service is declared as a provider in its module.
- [ ] Business logic is independent of HTTP transport.
- [ ] Dependencies are injected, not manually instantiated.

# Examples

```typescript
@Injectable()
export class ArticlesService {
  constructor(
    private readonly articlesRepository: ArticlesRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async findById(id: string): Promise<Article> {
    const article = await this.articlesRepository.findOne(id);
    if (!article) throw new NotFoundException('Article not found');
    return article;
  }
}
```

# Anti Patterns

- Putting HTTP-specific logic (req/res handling) in services.
- Creating services that orchestrate too many unrelated concerns.
- Hard-coding dependencies instead of using injection.

# Best Practices

- Write services as pure business logic adapters.
- Use interfaces for service contracts to enable testing and swapping.
- Emit domain events from services, not controllers.

# Related Skills

modules, dependency-injection, controllers
