# sce-factory-testing

A minimal TypeScript repository used as the fixture for SCE Factory end-to-end
integration tests. It is not a production application.

It contains a small HTTP server built with [Effect](https://effect.website) v4
(`effect/http` `HttpRouter` + `@effect/platform-node`) and one unfinished
[SCE](https://github.com/crocoder-dev/shared-context-engineering) plan for the
factory to execute.

## Endpoints

| Method | Path     | Response                              |
| ------ | -------- | ------------------------------------- |
| GET    | `/hello` | `200`, `text/plain`, `Hello, World!`  |
| GET    | `/health` | `200`, `text/plain`, `ok`            |

The server listens on port `3000`, or on the port in the `PORT` environment
variable.

## Setup

Requirements: Nix with flakes enabled. Optionally direnv.

With direnv:

```sh
direnv allow
npm ci
```

Without direnv:

```sh
nix develop
npm ci
```

The dev shell provides Node.js 24, npm, Git, and curl. `flake.lock` and
`package-lock.json` pin all inputs and dependencies.

## Development

```sh
npm run dev        # start the server in watch mode
npm start          # start the server
PORT=8080 npm start
curl -i http://localhost:3000/hello
```

## Testing

```sh
npm run typecheck  # strict TypeScript check
npm test           # Node.js built-in test runner
```

Tests call the Effect router in-process through `HttpRouter.toWebHandler`, so
they open no network ports and need no external services.

## SCE plan

`context/plans/add-health-endpoint.md` holds one unfinished task:

- **T01 — Add a health endpoint** (`GET /health` → `200 ok`), status `todo`,
  context synchronization `pending`.

The task is intentionally not implemented. During an E2E run, SCE Factory
checks out `main`, runs `sce setup`, executes the plan with `/next-task` and
`/validate`, and publishes a branch. The expected state of that branch is:

```
GET /hello  -> 200 "Hello, World!"
GET /health -> 200 "ok"
```
