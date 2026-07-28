---
name: python-deployment
version: 1.0.0
category: backend
priority: recommended
loads_before: []
requires: [release-safety]
tags: [python, deployment, docker, uvicorn, backend]
compatible: [python]
---

# Purpose

Package and deploy Python applications reliably using Docker, ASGI servers, and production configuration.

# When to use

Use when configuring Docker, uvicorn/gunicorn, health checks, environment management, or production readiness for Python services.

# Inputs

Provide target environment config, ASGI/WSGI server choice, and deployment platform requirements.

# Outputs

Producible deployment artifacts with verified health checks and graceful shutdown behavior.

# Rules

- Use a multi-stage Docker build with Python slim images.
- Run with an ASGI server (uvicorn) or WSGI server (gunicorn) in production; never use development servers.
- Configure health check endpoints for orchestration.
- Handle `SIGTERM` for graceful shutdown and in-flight request draining.

# Checklist

- [ ] Docker image uses multi-stage build with minimal final layer.
- [ ] Health check endpoint responds with status and dependencies.
- [ ] Graceful shutdown handles in-flight requests.

# Examples

```dockerfile
# Multi-stage Dockerfile
FROM python:3.12-slim AS builder
WORKDIR /app
COPY pyproject.toml ./
RUN pip install --no-cache-dir .
COPY . .

FROM python:3.12-slim AS runner
WORKDIR /app
COPY --from=builder /usr/local/lib/python3.12/site-packages /usr/local/lib/python3.12/site-packages
COPY --from=builder /app .
EXPOSE 8000
CMD ["uvicorn", "src.myproject.api:create_app", "--host", "0.0.0.0", "--port", "8000"]
```

```python
# Graceful shutdown
import signal
import uvicorn

server = uvicorn.Server(config)
signal.signal(signal.SIGTERM, lambda s, f: server.should_exit = True)
server.run()
```

# Anti Patterns

- Shipping development dependencies in production images.
- Using `pip install` without pinning versions.
- Hard-coding environment-specific values in source code.

# Best Practices

- Use `pyproject.toml` for dependency management.
- Pin Python version in Dockerfile for reproducible builds.
- Run database migrations as a separate pre-deploy step.

# Related Skills

testing, project-structure, http-services
