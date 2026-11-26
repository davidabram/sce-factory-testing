# HTTP routes

The server's routes live in one exported value, `Routes`, in
[`src/server.ts`](../../src/server.ts). `Routes` is built with Effect v4's
`HttpRouter.add` from `effect/http`, and responses are built with
`HttpServerResponse`.

## Endpoints

| Method | Path     | Status | Content type | Body            |
| ------ | -------- | ------ | ------------ | --------------- |
| GET    | `/hello` | `200`  | `text/plain` | `Hello, World!` |

`/hello` is the only route. Requests to any other method or path fall through to
the router's default not-found handling; the repository defines no custom
fallback, middleware, or error handler.

## Adding a route

A new route extends the same `Routes` value so that both the running server and
the in-process tests pick it up. `HttpServerResponse.text(...)` produces a
`text/plain` response with status `200`:

```ts
export const Routes = HttpRouter.add("GET", "/hello", HttpServerResponse.text("Hello, World!"))
```

`Routes` is a router layer, not a running server. Serving it is covered in
[runtime.md](runtime.md); exercising it without a server is covered in
[../testing/in-process-handler.md](../testing/in-process-handler.md).
