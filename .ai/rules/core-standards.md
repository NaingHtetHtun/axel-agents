# Core Engineering Standards

Apply these rules to every project unless a project-level decision explicitly supersedes one and records why.

| Standard | Rule |
| --- | --- |
| Naming | Use domain language, clear units, and stable conventions per artifact type. |
| Folder structure | Organize by cohesive responsibility and dependency direction; avoid generic dumping folders. |
| Logging | Emit structured, correlated, redacted operational events at meaningful boundaries. |
| Error handling | Return stable safe failures, preserve causes internally, and never silently ignore failure. |
| Code style | Format automatically; optimize for readability and local reasoning. |
| SOLID | Isolate change reasons, use narrow contracts, and invert unstable infrastructure dependencies. |
| DRY | Remove duplicated knowledge, not merely similar syntax. |
| KISS / YAGNI | Build the smallest solution justified by current evidence. |
| Dependency injection | Make required capabilities explicit and wire concrete implementations at the composition boundary. |
| Security | Enforce server-side authorization, validate untrusted input, protect secrets, and minimize data. |
| Performance | Set measurable budgets and optimize only evidence-backed bottlenecks. |
| Documentation | Record durable decisions and contracts with an audience and source of truth. |
| Git convention | Keep commits focused, messages imperative, and shared history safe. |
| Testing convention | Test observable behavior deterministically at the lowest useful level and cover known regressions. |

Use the corresponding skill for detailed decision guidance. Project rules may add stricter conventions but must not weaken security, data-integrity, or verification requirements without an explicit risk acceptance.
