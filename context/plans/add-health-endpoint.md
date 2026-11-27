# Plan: add-health-endpoint

## Change summary

Add a `GET /health` endpoint to the Effect v4 HTTP server in `src/server.ts`.
The endpoint returns HTTP 200 with the plain-text body `ok`. This extends
existing behavior: the `GET /hello` endpoint stays unchanged.

## Acceptance criteria

- [ ] AC1: `GET /health` returns HTTP 200 with `Content-Type: text/plain` and the body `ok`.
  - Validate: `npm test` passes a test for `/health`; `curl -s -w ' %{http_code}' http://localhost:3000/health` prints `ok 200` while `npm start` runs.
- [ ] AC2: `GET /hello` still returns HTTP 200 with the body `Hello, World!`.
  - Validate: `npm test` passes the existing `/hello` test; `curl -s -w ' %{http_code}' http://localhost:3000/hello` prints `Hello, World! 200` while `npm start` runs.

### Full validation

- `npm run typecheck`
- `npm test`

### Context sync

- `README.md` lists `GET /health` among the server endpoints.

## Task context synchronization lifecycle

- **Task context synchronization:** every task carries `pending | synced | blocked`.
  A completed task must be `synced` before another task can start or the plan can
  finish.
- For `blocked`, record **Blocker**, **Required action**, and **Retry condition**
  beside the status. Never infer `synced` from conversation history; write every
  lifecycle transition to the plan file.

## Constraints and non-goals

- **In scope:** `src/server.ts`, `test/`, `README.md`.
- **Out of scope:** changes to the `/hello` endpoint, Nix flake, package scripts, and dependencies.
- **Constraints:** Use the existing Effect v4 `HttpRouter` and `HttpServerResponse` APIs. Add no new dependencies. Use the Node.js built-in test runner.
- **Non-goal:** Readiness checks, dependency probes, or JSON health payloads.

## Task stack

- [x] T01: `Add a health endpoint` (status:done)
  - Task ID: T01
  - Scope: In — `GET /health` route in `src/server.ts`, a test for `/health` in `test/`. Out — changes to `/hello`, new dependencies, middleware.
  - Dependencies: none
  - Done when: `GET /health` returns HTTP 200 with plain-text body `ok`; `GET /hello` still returns `Hello, World!`; a test covers `/health`; `npm run typecheck` and `npm test` pass.
  - Verify: `npm run typecheck`; `npm test`.
  - Completed: 2026-11-27
  - Files changed: `src/server.ts`, `test/health.test.ts`
  - Result: `Routes` now merges the `/hello` route with a new `GET /health` route returning plain-text `ok`. `test/health.test.ts` covers `GET /health` (200, `text/plain`, `ok`) and `POST /health` (404).
  - Verify: `npm run typecheck` passed; `npm test` passed (3 tests: `/health`, `POST /health`, existing `/hello`).
  - Context impact: minor — `README.md` endpoint table needs a `GET /health` row.
  - Context synchronization: synced

## Open questions

None. The request fully specifies the endpoint, its response, and its checks.
