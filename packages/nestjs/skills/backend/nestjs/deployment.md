---
name: nestjs-deployment
version: 1.0.0
category: backend
priority: recommended
loads_before: []
requires: [release-safety, clean-architecture]
tags: [nestjs, deployment, docker, production, backend]
compatible: [nestjs]
---

# Purpose

Package and deploy NestJS applications reliably across development, staging, and production environments.

# When to use

Use when configuring Docker, PM2, health checks, environment management, or production readiness for NestJS.

# Inputs

Provide target environment config, health check endpoints, and deployment platform requirements.

# Outputs

Producible deployment artifacts with verified health checks and graceful shutdown behavior.

# Rules

- Use a multi-stage Docker build for production images.
- Configure health check endpoints (`/health`) for orchestration.
- Handle `SIGTERM` and `SIGINT` for graceful shutdown.
- Never expose source maps or debug ports in production builds.

# Checklist

- [ ] Docker image uses multi-stage build with minimal final layer.
- [ ] Health check endpoint responds with status and dependencies.
- [ ] Graceful shutdown handles in-flight requests.

# Examples

```dockerfile
# Multi-stage Dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
CMD ["node", "dist/main.js"]
```

```typescript
// Graceful shutdown in main.ts
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT || 3000);

  const shutdown = async () => {
    await app.close();
    process.exit(0);
  };
  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
}
bootstrap();
```

# Anti Patterns

- Shipping development dependencies in production images.
- Hard-coding environment-specific values in source code.
- Ignoring graceful shutdown and killing connections abruptly.

# Best Practices

- Use environment variables for all configuration.
- Include a health check endpoint for load balancers.
- Run database migrations as a separate pre-deploy step.

# Related Skills

testing, modules, services
