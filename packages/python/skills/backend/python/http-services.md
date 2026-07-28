---
name: python-http-services
version: 1.0.0
category: backend
priority: recommended
loads_before: []
requires: [clean-architecture, security-baseline]
tags: [python, http, fastapi, flask, backend]
compatible: [python]
---

# Purpose

Build HTTP services with Python web frameworks (FastAPI, Flask, Django) while keeping transport concerns at the edge.

# When to use

Use when implementing or reviewing Python HTTP endpoints, API routers, request handling, or response serialization.

# Inputs

Provide framework choice, route definitions, request/response schemas, and authentication requirements.

# Outputs

Produce thin route handlers that delegate to services, with validated inputs and documented outputs.

# Rules

- Keep route handlers thin; delegate business logic to services or use cases.
- Use Pydantic models for request/response validation (FastAPI) or Marshmallow (Flask/Django).
- Document API endpoints with OpenAPI/Swagger when available.
- Return structured JSON responses; never leak internal errors or stack traces.

# Checklist

- [ ] Route handlers contain no business logic beyond input extraction.
- [ ] Request validation is applied via framework middleware or decorators.
- [ ] Responses follow a consistent JSON envelope structure.

# Examples

```python
# FastAPI
from fastapi import APIRouter, Depends
from pydantic import BaseModel

router = APIRouter(prefix="/articles")

class ArticleResponse(BaseModel):
    id: str
    title: str

@router.get("/{article_id}", response_model=ArticleResponse)
async def get_article(article_id: str, service: ArticleService = Depends()):
    return await service.find_by_id(article_id)
```

# Anti Patterns

- Putting database queries directly in route handlers.
- Returning raw strings or HTML from API endpoints.
- Mixing synchronous and asynchronous code without clear boundaries.

# Best Practices

- Use dependency injection for service resolution.
- Group related routes in router modules.
- Validate all inputs at the transport boundary.

# Related Skills

project-structure, data-modeling, testing
