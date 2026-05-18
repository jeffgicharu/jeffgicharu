# Jeff Gicharu

Software Engineer based in Nairobi, Kenya. [LinkedIn](https://www.linkedin.com/in/jeff-gicharu-0924a4217/) · [Email](mailto:jkaharu2970@gmail.com)

I build production software end to end. That means API design, frontend implementation, deployment, and the testing that keeps it all honest. I work across backend (Java with Spring Boot, Node with NestJS, Python with Django), frontend (React, Next.js, TypeScript), and the DevOps glue that ships it to real users.

## Live Portfolio Demos

Three deployed projects you can actually click on, each showing a different side of full-stack work.

### [ContractorOS](https://contractoros.jeffgicharu.com)

Multi-tenant contractor lifecycle SaaS built with Next.js 14 (App Router), NestJS, and PostgreSQL.

[Repo](https://github.com/jeffgicharu/ContractorOS) · Live at https://contractoros.jeffgicharu.com

On the frontend it uses React, Next.js, and Tailwind, with accessible components covered by Vitest, RTL, and axe-core. On the backend it is a NestJS REST API talking to PostgreSQL through Prisma, with JWT auth in HttpOnly SameSite cookies, role-based authorization, and rate limiting. To keep all of that honest I added Testcontainers integration tests, Pact consumer-driven contracts, Stryker mutation testing, a k6 performance suite, OWASP ZAP DAST against the live site, and Playwright E2E across browsers.

### [Wallet Pair: wallet-api and wallet-app](https://wallet.jeffgicharu.com)

An M-Pesa style mobile money platform split across two coordinated repos. Spring Boot REST API on one side, React SPA on the other.

[wallet-api](https://github.com/jeffgicharu/wallet-api) · [wallet-app](https://github.com/jeffgicharu/wallet-app) · Live at https://wallet.jeffgicharu.com

The backend runs on Spring Boot 3.5 with PostgreSQL and Flyway migrations, plus JWT auth, idempotency keys, a transactional transfer engine, daily limit enforcement, login rate limiting, and PIN hashing with lockout. The frontend is React with Vite and TypeScript, MSW for mocks in tests, and optimistic UI on transfers. Around all of that there are roughly 100 JUnit and Testcontainers integration tests, a 15-interaction Pact-JVM cross-repo contract suite, PIT mutation testing hitting 76% kill-rate on the service layer, a 27-test custom security suite (JWT manipulation, cross-user isolation, idempotency abuse, races), Spotbugs, CodeQL, Trivy, ZAP, and Playwright running both locally and against the live deployment.

### [USSD Simulator](https://ussd.jeffgicharu.com)

A stateful M-Pesa style USSD backend with a browser-based phone UI for demos. Spring Boot, Africa's Talking compatible.

[Repo](https://github.com/jeffgicharu/ussd-simulator) · Live at https://ussd.jeffgicharu.com

The backend is a session-driven state machine with transactional balance and transfer flows, PIN lockout (with an injected Clock so the time-sensitive code is actually testable), and daily limits. The frontend is a lightweight browser phone UI that lets you walk through the flows live. It is deployed under nginx and systemd on a 2GB Ubuntu VPS, with tuned JVM flags and a daily reset cron. The test base is 92 tests across unit, integration, contract, and security layers, plus PIT mutation testing, Locust stateful load testing (100 VU sustained at 92ms p95), and a USSD-specific security suite covering session hijacking, PIN brute force, and state-machine fuzzing.

## How I Approach Engineering

A few things I try to do consistently:

**Own the thing end to end.** Each of these projects sits behind a real domain on a real VPS, designed, built, secured, deployed, and monitored by me. Half-finished demos are not on the list.

**Match testing to risk.** Unit tests where the logic is dense, integration tests with Testcontainers or H2 where data flows matter, contract tests across service boundaries, Playwright for the user journey, and security or performance suites where the stakes warrant them. Not every project needs every layer, and I try to be honest about that.

**Treat security as part of "done."** SAST (Spotbugs, CodeQL), dependency scanning (Trivy, Snyk), and DAST (OWASP ZAP) all run in CI. Auth, rate limiting, and cross-user isolation get explicit tests, not just code review.

**Take deployment seriously.** Running on a constrained VPS forces tight JVM tuning, sensible cache headers, and graceful fallbacks. The live demos work because the deployment story is solid, not because they are wrapped in a tarball.

## Tech I Reach For

- **Languages:** TypeScript, JavaScript, Java, Python, SQL
- **Backend:** Spring Boot, NestJS, Django with DRF, FastAPI, Express
- **Frontend:** React, Next.js (App Router), Vite, Tailwind CSS, accessible component patterns
- **Data:** PostgreSQL, MongoDB, Redis, Prisma, Hibernate / JPA, Flyway
- **Testing:** Pytest, JUnit 5 with AssertJ and Testcontainers, Vitest with RTL and axe-core, Playwright, Cypress, Pact, PIT, Stryker, k6, Locust
- **Security:** Spotbugs with find-sec-bugs, CodeQL, Snyk, Trivy, OWASP Dependency Check, OWASP ZAP
- **DevOps:** GitHub Actions, Docker, Ubuntu, Nginx, systemd, Cloudflare

## Contact

[Email](mailto:jkaharu2970@gmail.com) · [LinkedIn](https://www.linkedin.com/in/jeff-gicharu-0924a4217/) · [All public projects](https://github.com/jeffgicharu?tab=repositories)
