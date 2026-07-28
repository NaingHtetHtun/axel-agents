---
name: python-data-modeling
version: 1.0.0
category: backend
priority: recommended
loads_before: []
requires: [clean-architecture, data-modeling]
tags: [python, pydantic, sqlalchemy, data-modeling, backend]
compatible: [python]
---

# Purpose

Design data models using Pydantic for validation, SQLAlchemy for persistence, and Python dataclasses for domain objects.

# When to use

Use when implementing or reviewing Python data models, schema definitions, ORM mappings, or serialization boundaries.

# Inputs

Provide domain requirements, persistence layer choice, and API schema constraints.

# Outputs

Produce explicit data model boundaries with clear ownership between domain, API, and persistence layers.

# Rules

- Separate domain models from API schemas; do not use ORM models directly as API responses.
- Use Pydantic v2 for validation and serialization; use dataclasses for internal domain objects.
- Define database schemas with Alembic migrations; never modify production databases manually.
- Validate all external data at boundaries; trust nothing from the wire.

# Checklist

- [ ] API schemas (Pydantic) are separate from persistence models (SQLAlchemy).
- [ ] Migrations exist for all schema changes.
- [ ] Field types and constraints are explicitly declared.

# Examples

```python
from pydantic import BaseModel
from sqlalchemy import Column, String
from sqlalchemy.orm import declarative_base

# Domain model
class Article:
    def __init__(self, id: str, title: str):
        self.id = id
        self.title = title

# API schema
class ArticleCreate(BaseModel):
    title: str

# Persistence model
Base = declarative_base()
class ArticleRecord(Base):
    __tablename__ = "articles"
    id = Column(String, primary_key=True)
    title = Column(String, nullable=False)
```

# Anti Patterns

- Using SQLAlchemy models directly as API response objects.
- Putting validation logic in route handlers instead of models.
- Defining schemas in multiple places without a single source of truth.

# Best Practices

- Maintain three layers: domain, API schema, persistence model.
- Use Pydantic's `model_validate()` for explicit conversion.
- Version database migrations with timestamps or sequential numbers.

# Related Skills

http-services, project-structure, testing
