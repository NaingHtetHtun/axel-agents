# Agent Router

Route a task to the narrowest accountable agent, then sequence supporting agents only when a handoff adds independent expertise or verification.

| Task signal | Primary agent | Typical supporting route |
| --- | --- | --- |
| New cross-boundary feature | architect | backend-engineer or frontend-engineer → tester → reviewer |
| Backend/API/database work | backend-engineer | database-engineer or security-engineer → tester → reviewer |
| UI/client behavior | frontend-engineer | tester → reviewer |
| Defect or regression | owning engineer | tester → reviewer; security-engineer for security impact |
| Security concern | security-engineer | owning engineer → tester → reviewer |
| Schema/query work | database-engineer | backend-engineer → tester → reviewer |
| Release/operations | devops | owning engineer → reviewer |
| Code review only | reviewer | security-engineer for high-risk boundaries |

## Handoff contract

Every handoff includes task scope, selected skills, memory facts used, changed artifacts or findings, commands run, exact results, and remaining risk. A later agent must verify evidence rather than assume it.

## Constraints

Routing assigns responsibility, not permission. One primary agent owns the final report. Do not invoke an agent merely because its name resembles a technology; use the task boundary and risk.
