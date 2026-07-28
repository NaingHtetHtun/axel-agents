---
name: nestjs-testing
version: 1.0.0
category: backend
priority: recommended
loads_before: []
requires: [testing-strategy, clean-architecture]
tags: [nestjs, testing, backend]
compatible: [nestjs]
---

# Purpose

Write reliable unit and end-to-end tests for NestJS applications using the framework's testing utilities.

# When to use

Use when implementing or reviewing unit tests, integration tests, or e2e tests for NestJS modules, controllers, or services.

# Inputs

Provide module definitions, provider mocks, and test environment configuration.

# Outputs

Produce isolated, fast, and deterministic tests that verify behavior without real infrastructure.

# Rules

- Use `Test.createTestingModule()` to build isolated test modules.
- Mock external dependencies; never call real databases or APIs in unit tests.
- E2e tests use `INestApplication` with `supertest` for HTTP-level verification.
- One assertion concern per test; keep tests focused and readable.

# Checklist

- [ ] Unit tests mock all external dependencies.
- [ ] E2e tests boot a full application instance.
- [ ] Tests are isolated; no shared state between test cases.

# Examples

```typescript
// Unit test
describe('ArticlesService', () => {
  let service: ArticlesService;
  let repository: MockType<ArticlesRepository>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ArticlesService,
        { provide: ArticlesRepository, useFactory: repositoryMockFactory },
      ],
    }).compile();

    service = module.get(ArticlesService);
    repository = module.get(ArticlesRepository);
  });

  it('should throw NotFoundException for unknown id', async () => {
    repository.findOne.mockResolvedValue(null);
    await expect(service.findById('unknown')).rejects.toThrow(NotFoundException);
  });
});

// E2e test
describe('Articles (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = module.createNestApplication();
    await app.init();
  });

  afterAll(() => app.close());

  it('/GET articles/:id', () => {
    return request(app.getHttpServer())
      .get('/articles/1')
      .expect(200);
  });
});
```

# Anti Patterns

- Testing implementation details instead of behavior.
- Using real database connections in unit tests.
- Sharing mutable state between test cases.

# Best Practices

- Follow the Arrange-Act-Assert pattern.
- Use mock factories for consistent provider mocking.
- Separate unit tests (fast, isolated) from e2e tests (full stack).

# Related Skills

services, controllers, modules
