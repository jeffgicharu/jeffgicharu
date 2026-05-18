# Jeff Gicharu

**Software Engineer** · Nairobi, Kenya · [LinkedIn](https://www.linkedin.com/in/jeff-gicharu-0924a4217/) · [Email](mailto:jkaharu2970@gmail.com)

I build production software end-to-end — from API design and frontend implementation to deployment, observability, and the testing that keeps it all honest. Comfortable across backend (Java / Spring Boot, Node / NestJS, Python / Django), frontend (React, Next.js, TypeScript), and the DevOps glue that ships it to real users.

## Live Portfolio Demos

Three deployed projects, each clickable, each demonstrating a different facet of full-stack engineering:

### [ContractorOS](https://contractoros.jeffgicharu.com)

Multi-tenant contractor lifecycle SaaS — Next.js 14 (App Router) + NestJS + PostgreSQL

[Repo](https://github.com/jeffgicharu/ContractorOS) · **Live**: https://contractoros.jeffgicharu.com

Frontend: React + Next.js + Tailwind, accessible components, Vitest + RTL + axe-core. Backend: NestJS REST API, Prisma + PostgreSQL, JWT auth with HttpOnly + SameSite cookies, role-based authorization, rate limiting. Engineering depth: Testcontainers integration tests, Pact consumer-driven contracts, Stryker mutation testing, k6 performance suite, OWASP ZAP DAST against live, Playwright E2E across browsers.

### [Wallet Pair — wallet-api + wallet-app](https://wallet.jeffgicharu.com)

M-Pesa-style mobile money platform — Spring Boot REST API + React SPA across two coordinated repos

[wallet-api](https://github.com/jeffgicharu/wallet-api) · [wallet-app](https://github.com/jeffgicharu/wallet-app) · **Live**: https://wallet.jeffgicharu.com

Backend: Spring Boot 3.5 + PostgreSQL + Flyway, JWT auth, idempotency keys, transactional transfer engine, daily-limit enforcement, login rate limiting, PIN hashing with lockout. Frontend: React + Vite + TypeScript, MSW-mocked tests, optimistic UI on transfers. Engineering depth: ~100 JUnit + Testcontainers integration tests, 15-interaction Pact-JVM cross-repo contracts, PIT mutation testing 76% kill-rate on the service layer, custom 27-test security suite (JWT, cross-user isolation, idempotency, races), Spotbugs + CodeQL + Trivy + ZAP, Playwright E2E (local + live).

### [USSD Simulator](https://ussd.jeffgicharu.com)

Stateful M-Pesa-style USSD backend with browser phone UI — Spring Boot + Africa's Talking-compatible

[Repo](https://github.com/jeffgicharu/ussd-simulator) · **Live**: https://ussd.jeffgicharu.com

Backend: stateful session-driven state machine, transactional balance + transfer flows, PIN-lockout with Clock-injection for testability, daily limit enforcement. Frontend: lightweight browser phone UI for live demos. Deployed under nginx + systemd on a 2GB Ubuntu VPS with tuned JVM and daily-reset cron. Engineering depth: 92 tests across unit / integration / contract / security layers, PIT mutation testing, Locust stateful load testing (100 VU @ 92ms p95), USSD-specific security suite (session hijacking, PIN brute force, state-machine fuzzing).

## Engineering Approach

- **End-to-end ownership.** Each project ships behind a real domain on a real VPS — designed, built, secured, deployed, and monitored end-to-end.
- **Testing matched to risk.** Unit tests where logic is dense; integration tests with Testcontainers / H2 for data flows; contract tests across service boundaries; Playwright for the user journey; security and performance suites where the stakes warrant it.
- **Security is part of "done."** SAST (Spotbugs / CodeQL), dependency scanning (Trivy / Snyk), and DAST (OWASP ZAP) wired into CI; auth, rate limiting, and cross-user isolation verified by explicit tests.
- **Deployment as a first-class concern.** systemd + nginx + Cloudflare on a constrained VPS forces tight JVM tuning, sensible cache headers, and graceful fallbacks. The live demos work because the deployment does.

## Tech

- **Languages**: TypeScript, JavaScript, Java, Python, SQL
- **Backend**: Spring Boot, NestJS, Django + DRF, FastAPI, Express
- **Frontend**: React, Next.js (App Router), Vite, Tailwind CSS, accessible component patterns
- **Data**: PostgreSQL, MongoDB, Redis, Prisma, Hibernate / JPA, Flyway
- **Testing**: Pytest, JUnit 5 + AssertJ + Testcontainers, Vitest + RTL + axe-core, Playwright, Cypress, Pact, PIT, Stryker, k6, Locust
- **Security**: Spotbugs + find-sec-bugs, CodeQL, Snyk, Trivy, OWASP Dependency Check, OWASP ZAP
- **DevOps**: GitHub Actions, Docker, Ubuntu / Nginx / systemd, Cloudflare

## Contact

[Email](mailto:jkaharu2970@gmail.com) · [LinkedIn](https://www.linkedin.com/in/jeff-gicharu-0924a4217/) · [All public projects](https://github.com/jeffgicharu?tab=repositories)
