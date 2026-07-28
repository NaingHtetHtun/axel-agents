---
name: python-testing
version: 1.0.0
category: backend
priority: recommended
loads_before: []
requires: [testing-strategy]
tags: [python, pytest, testing, backend]
compatible: [python]
---

# Purpose

Write reliable tests for Python applications using pytest and modern testing patterns.

# When to use

Use when implementing or reviewing unit tests, integration tests, or end-to-end tests for Python services.

# Inputs

Provide test framework choice, fixture requirements, and mocking strategy.

# Outputs

Produce isolated, fast, and deterministic tests that verify behavior without real infrastructure.

# Rules

- Use `pytest` as the test framework; leverage fixtures for setup and teardown.
- Mock external dependencies; never call real databases or APIs in unit tests.
- One assertion concern per test; keep tests focused and readable.
- Use `conftest.py` for shared fixtures; keep them organized by scope.

# Checklist

- [ ] Unit tests mock all external dependencies.
- [ ] Integration tests use test containers or in-memory databases.
- [ ] Tests are isolated; no shared mutable state between test cases.

# Examples

```python
import pytest
from unittest.mock import AsyncMock

@pytest.fixture
def article_service():
    repo = AsyncMock(spec=ArticleRepository)
    return ArticleService(repository=repo)

@pytest.mark.asyncio
async def test_find_article_not_found(article_service):
    article_service.repository.find_by_id.return_value = None
    with pytest.raises(ArticleNotFoundError):
        await article_service.find_by_id("unknown")

@pytest.mark.asyncio
async def test_find_article(article_service):
    expected = Article(id="1", title="Test")
    article_service.repository.find_by_id.return_value = expected
    result = await article_service.find_by_id("1")
    assert result.title == "Test"
```

# Anti Patterns

- Testing implementation details instead of behavior.
- Using real database connections in unit tests.
- Sharing mutable fixtures between test cases.

# Best Practices

- Follow Arrange-Act-Assert pattern.
- Use `pytest.mark.parametrize` for data-driven tests.
- Separate unit tests (fast) from integration tests (slow) with markers.

# Related Skills

http-services, data-modeling, project-structure
