---
name: nestjs-controllers
version: 1.0.0
category: backend
priority: recommended
loads_before: []
requires: [clean-architecture, security-baseline]
tags: [nestjs, controllers, backend]
compatible: [nestjs]
---

# Purpose

Translate HTTP transport requests into application use cases; keep HTTP concerns at the edge of the system.

# When to use

Use when implementing or reviewing NestJS controllers, route handlers, request/response mapping, or HTTP decorator usage.

# Inputs

Provide routing definitions, request DTOs, response types, and authentication context.

# Outputs

Produce a maintainable controller boundary with documented decisions and verification evidence.

# Rules

- Delegate to a single use case via service injection; never place business logic or persistence queries in controllers.
- Use `@Controller()` for resource routing; use `@HttpCode()` explicitly for non-standard status codes.
- Validate input with `@UsePipes()` or class-validator decorators at the controller level.
- Return DTOs or domain objects; never leak raw entity or database structures.

# Checklist

- [ ] Controller has a single responsibility (one resource or sub-resource).
- [ ] Input validation is applied via pipes or DTOs.
- [ ] No business logic exists in the controller method body.

# Examples

```typescript
@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<ArticleDto> {
    return this.articlesService.findById(id);
  }
}
```

# Anti Patterns

- Putting database queries directly in controller methods.
- Returning raw `any` types without DTOs.
- Mixing multiple unrelated resources in one controller.

# Best Practices

- Keep controllers thin; they are transport adapters.
- Use `@UseGuards()` and `@UseInterceptors()` for cross-cutting concerns.
- Group related routes with module-scoped controllers.

# Related Skills

modules, services, guards, pipes
