---
name: nestjs-guards
version: 1.0.0
category: backend
priority: recommended
loads_before: []
requires: [clean-architecture, security-baseline]
tags: [nestjs, guards, auth, security, backend]
compatible: [nestjs]
---

# Purpose

Protect routes and handlers by enforcing authentication, authorization, and role-based access control.

# When to use

Use when implementing or reviewing NestJS guards for JWT validation, API key checks, RBAC, or custom access policies.

# Inputs

Provide authentication strategy, role definitions, and resource-level permission rules.

# Outputs

Produce guards that return boolean or throw `ForbiddenException`/`UnauthorizedException` with clear error context.

# Rules

- Implement `CanActivate()` with an explicit boolean return or exception throw.
- Use `@UseGuards()` at controller, method, or global level.
- Guard logic must be transport-independent; use `ExecutionContext` to adapt.
- Never put business logic in guards; they are access control only.

# Checklist

- [ ] Guard returns `true` or throws a specific auth exception.
- [ ] Guard is applied to the correct scope (global, controller, or method).
- [ ] No business logic or side effects beyond access control.

# Examples

```typescript
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!requiredRoles) return true;
    const { user } = context.switchToHttp().getRequest();
    return requiredRoles.some((role) => user.roles?.includes(role));
  }
}

// Usage
@UseGuards(RolesGuard)
@SetMetadata('roles', ['admin'])
@Delete(':id')
async remove(@Param('id') id: string) { ... }
```

# Anti Patterns

- Putting business validation logic in guards.
- Throwing generic `Error` instead of `ForbiddenException` or `UnauthorizedException`.
- Using `any` type for the request object.

# Best Practices

- Compose guards for layered security (auth + RBAC + resource ownership).
- Use `Reflector` for metadata-driven guard logic.
- Keep guards small, testable, and stateless.

# Related Skills

middleware, pipes, interceptors
