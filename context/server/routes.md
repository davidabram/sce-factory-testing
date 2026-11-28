# HTTP routes

The server's routes live in one exported value, `Routes`, in
[`src/server.ts`](../../src/server.ts). `Routes` is built with Effect v4's
`HttpRouter.add` from `effect/http`, and responses are built with
`HttpServerResponse`.

## Endpoints

| Method | Path     | Status | Content type | Body            |
| ------ | -------- | ------ | ------------ | --------------- |
| GET    | `/hello`  | `200`  | `text/plain` | `Hello, World!` |
| GET    | `/health` | `200`  | `text/plain` | `ok`            |

`/health` is a liveness check only. It runs no readiness check or dependency
probe, and it returns no JSON payload.

`/hello` and `/health` are the only routes. Requests to any other method or path
fall through to the router's default not-found handling. This includes
`POST /health`. The repository defines no custom fallback, middleware, or error
handler.

## Adding a route

A new route joins the `Routes` value, so that both the running server and the
in-process tests pick it up. `Routes` merges one `HttpRouter.add` layer per
route with `Layer.mergeAll`. `HttpServerResponse.text(...)` produces a
`text/plain` response with status `200`:

```ts
export const Routes = Layer.mergeAll(
  HttpRouter.add("GET", "/hello", HttpServerResponse.text("Hello, World!")),
  HttpRouter.add("GET", "/health", HttpServerResponse.text("ok"))
)
```

`Routes` is a router layer, not a running server. Serving it is covered in
[runtime.md](runtime.md); exercising it without a server is covered in
[../testing/in-process-handler.md](../testing/in-process-handler.md).
