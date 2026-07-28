---
name: nestjs-pipes
version: 1.0.0
category: backend
priority: recommended
loads_before: []
requires: [clean-architecture, input-validation]
tags: [nestjs, pipes, validation, backend]
compatible: [nestjs]
---

# Purpose

Validate and transform incoming data at the transport layer before it reaches business logic.

# When to use

Use when implementing or reviewing NestJS pipes for DTO validation, type transformation, or custom validation logic.

# Inputs

Provide DTO class definitions, validation decorators, and transformation rules.

# Outputs

Produce pipes that enforce data integrity with clear error messages and consistent rejection behavior.

# Rules

- Implement `PipeTransform<T>` with a `transform(value, metadata)` method.
- Use `class-validator` and `class-transformer` for DTO validation.
- Apply pipes globally via `app.useGlobalPipes()` or per-parameter with `@UsePipes()`.
- Throw `BadRequestException` with descriptive validation error messages.

# Checklist

- [ ] All incoming DTOs have `class-validator` decorators.
- [ ] Global pipes are configured in `main.ts` or the module.
- [ ] Validation errors return structured, actionable messages.

# Examples

```typescript
export class CreateArticleDto {
  @IsString()
  @MinLength(1)
  title: string;

  @IsOptional()
  @IsEnum(ArticleStatus)
  status?: ArticleStatus;
}

// Global setup in main.ts
app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
```

# Anti Patterns

- Writing manual validation logic in controllers instead of using pipes.
- Returning generic "Invalid input" without field-level details.
- Transforming data in pipes that belongs in services.

# Best Practices

- Enable `whitelist: true` to strip unknown properties.
- Use `transform: true` for automatic type coercion.
- Define validation DTOs as the source of truth for input contracts.

# Related Skills

guards, interceptors, controllers
