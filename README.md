# Jeff Gicharu

**Software Engineer** · Nairobi, Kenya · [LinkedIn](https://www.linkedin.com/in/jeff-gicharu-0924a4217/) · [Email](mailto:jkaharu2970@gmail.com)

I design systems, evaluate trade-offs, and ship software with full quality engineering coverage — integration testing, contract testing, mutation testing, performance testing, security testing, and live end-to-end verification.

## Live Portfolio Demos

Three production-grade portfolio projects, each deployed and clickable, each with a complete quality engineering arc (test pyramids, security scanning, mutation testing, performance budgets, dependency hygiene, and live verification against the deployed URL):

### [ContractorOS](https://contractoros.jeffgicharu.com)

Multi-tenant contractor lifecycle SaaS — Next.js + NestJS + PostgreSQL

[Repo](https://github.com/jeffgicharu/ContractorOS) · **Live**: https://contractoros.jeffgicharu.com

Testcontainers integration tests, Pact consumer-driven contracts, Stryker mutation testing, k6 performance suite, OWASP ZAP DAST against live, Vitest + RTL + axe-core component tests, Playwright E2E (local + live). Found and closed 10 production bugs: SameSite cookie hardening, JWT-for-deactivated-user rejection, X-Powered-By leak, engagement validation gap, duplicate-invoice 500→422 mapping, pg connection pool tuning, rate limiter for graceful degradation, N+1 query fix on contractor detail, 26 dependency CVEs cleared.

### [Wallet Pair (wallet-api + wallet-app)](https://wallet.jeffgicharu.com)

M-Pesa-style mobile money platform — Spring Boot + React across two coordinated repos

[wallet-api](https://github.com/jeffgicharu/wallet-api) · [wallet-app](https://github.com/jeffgicharu/wallet-app) · **Live**: https://wallet.jeffgicharu.com

97-test JUnit + Testcontainers integration suite, 15-interaction Pact-JVM cross-repo contract verification (consumer in wallet-app, provider in wallet-api), PIT mutation testing 76% kill-rate on the service layer, Vitest + RTL + Stryker on the SPA, k6 performance suite, full security stack (Spotbugs + find-sec-bugs, CodeQL, Trivy, OWASP ZAP baseline against live, 27-test custom security suite covering JWT manipulation, cross-user data isolation, idempotency abuse, race conditions). Found and closed 20 production bugs across both repos including HIGH-severity AdminController role-check gap, cross-user transaction lookup vulnerability, PIN-lockout transaction-rollback race, and login rate limiting; 22 dependency CVEs cleared via Spring Boot 3.2 → 3.5.14 upgrade; SPA UX bugs (fee display, daily limit hint, transaction navigation).

### [ussd-simulator](https://ussd.jeffgicharu.com)

Stateful M-Pesa-style USSD backend with browser phone UI — Spring Boot + Africa's Talking-compatible

[Repo](https://github.com/jeffgicharu/ussd-simulator) · **Live**: https://ussd.jeffgicharu.com

92 tests across unit, integration, contract, and security layers; PIT mutation testing with a behaviour-preserving Clock-injection refactor that made time-sensitive code testable; Locust stateful load testing (100 VU sustained at 92ms p95 latency); USSD-specific security suite (session hijacking, PIN brute force, state-machine fuzzing). Found and closed HIGH-severity bugs: session hijacking via shared sessionId, log injection (CWE-117) with PIN-in-logs (CWE-532), 17 dependency CVEs (Spring Boot 3.5.14 upgrade), missing daily transfer limit, broken change-PIN flow (verification + persistence), unhandled session-cap exception, and a browser-UI accessibility critical.

## Quality Engineering Approach

Across the three live projects, systematically found and closed **40+ real production bugs** through layered testing:

- **Integration testing** with Testcontainers / H2 surfaces logic bugs that unit tests miss
- **Contract testing** with Pact catches cross-repo API breakages before deploy
- **Mutation testing** with PIT (Java) and Stryker (TS) reveals weak assertions and untested behavior
- **Performance testing** with k6 and Locust exposes connection-pool exhaustion, GC pauses, and saturation points
- **Security testing** with Spotbugs + CodeQL + Trivy + ZAP + custom suites finds real vulnerabilities (session hijacking, IDOR, log injection, CVEs)
- **Live-URL E2E verification** with Playwright and curl proves the deployed system actually works for real users

When a test surfaces a bug, the bug gets fixed inline with a regression test that prevents recurrence — not just filed and forgotten.

## Tech Stack

- **Backend**: Java + Spring Boot, Python + Django + DRF + FastAPI, Node.js + NestJS
- **Frontend**: React + Next.js + TypeScript + Tailwind CSS
- **Data**: PostgreSQL, MongoDB, Redis, Hibernate / JPA, Flyway
- **Quality (testing)**: Pytest, JUnit 5 + AssertJ + Testcontainers, Vitest + RTL + axe-core, Cypress, Playwright, Pact + Pact-JVM, PIT, Stryker, k6, Locust, JMeter
- **Quality (security)**: Spotbugs + find-sec-bugs, GitHub CodeQL, Snyk, Trivy, OWASP Dependency Check, OWASP ZAP
- **DevOps**: GitHub Actions CI/CD, Docker, Linux (Ubuntu), Nginx, systemd, Cloudflare

## Contact

[Email](mailto:jkaharu2970@gmail.com) · [LinkedIn](https://www.linkedin.com/in/jeff-gicharu-0924a4217/) · [All public projects](https://github.com/jeffgicharu?tab=repositories)
