---
name: nestjs-interceptors
version: 1.0.0
category: backend
priority: recommended
loads_before: []
requires: [clean-architecture]
tags: [nestjs, interceptors, backend]
compatible: [nestjs]
---

# Purpose

Wrap request/response handling with cross-cutting concerns like logging, caching, mapping, and timeout management.

# When to use

Use when implementing or reviewing NestJS interceptors for response transformation, logging, error mapping, or caching.

# Inputs

Provide transformation rules, cache strategies, or logging schemas.

# Outputs

Produce interceptors that apply consistently without altering core business logic.

# Rules

- Implement `CallHandler` with `handle().pipe(map(...))` for response transformation.
- Use `@UseInterceptors()` at controller, method, or global level.
- Keep interceptors focused on a single cross-cutting concern.
- Do not put business logic in interceptors; they are infrastructure wrappers.

# Checklist

- [ ] Interceptor handles both success and error paths via `catchError` or `throwError`.
- [ ] Response mapping is consistent with the API contract.
- [ ] No business logic or domain decisions exist in the interceptor.

# Examples

```typescript
@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => ({
        data,
        timestamp: new Date().toISOString(),
        statusCode: context.switchToHttp().getResponse().statusCode,
      })),
    );
  }
}

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    return next.handle().pipe(
      tap(() => console.log(`Handler took ${Date.now() - now}ms`)),
    );
  }
}
```

# Anti Patterns

- Putting authentication logic in interceptors (use guards).
- Modifying request bodies in interceptors.
- Creating interceptors that depend on business domain state.

# Best Practices

- Use interceptors for response envelope wrapping, timing, and logging.
- Apply caching interceptors at the controller level for predictable responses.
- Compose multiple interceptors; keep each single-purpose.

# Related Skills

middleware, guards, pipes
