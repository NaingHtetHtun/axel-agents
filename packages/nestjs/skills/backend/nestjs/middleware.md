---
name: nestjs-middleware
version: 1.0.0
category: backend
priority: recommended
loads_before: []
requires: [clean-architecture]
tags: [nestjs, middleware, backend]
compatible: [nestjs]
---

# Purpose

Intercept and transform requests and responses at the HTTP transport layer before they reach route handlers.

# When to use

Use when implementing or reviewing NestJS middleware for cross-cutting HTTP concerns like logging, CORS, or request parsing.

# Inputs

Provide request/response transformation rules, filtering criteria, and module scope.

# Outputs

Produce middleware that applies consistently to targeted routes without leaking into business logic.

# Rules

- Implement `NestMiddleware` with a `use(req, res, next)` method.
- Register middleware via `configure()` in the module class, not via decorators.
- Keep middleware focused on transport-level concerns only.
- Call `next()` to pass control; do not short-circuit the pipeline without explicit error handling.

# Checklist

- [ ] Middleware is scoped to specific routes via `forRoutes()`.
- [ ] No business logic lives in the middleware.
- [ ] `next()` is always called or an error is explicitly thrown.

# Examples

```typescript
export class LoggingMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(`${req.method} ${req.path}`);
    next();
  }
}

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('api');
  }
}
```

# Anti Patterns

- Putting authentication or authorization logic in middleware (use guards instead).
- Modifying request body data in middleware.
- Applying middleware globally without route scoping.

# Best Practices

- Use middleware for logging, compression, CORS, and request ID propagation.
- Keep middleware stateless and idempotent.
- Document which routes each middleware applies to.

# Related Skills

guards, interceptors, controllers
