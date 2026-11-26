# In-process route tests

Tests exercise the router without starting an HTTP server or opening a network
port. They import `Routes` from [`src/server.ts`](../../src/server.ts) and
convert it to a Web-standard handler with `HttpRouter.toWebHandler`.

## Shape of a test file

[`test/hello.test.ts`](../../test/hello.test.ts) shows the pattern:

```ts
const { handler, dispose } = HttpRouter.toWebHandler(Routes, { disableLogger: true })
after(dispose)

test("GET /hello responds with Hello, World!", async () => {
  const response = await handler(new Request("http://localhost/hello"))
  assert.equal(response.status, 200)
})
```

- One handler is created per test file, with request logging disabled, and is
  disposed in an `after` hook so the underlying Effect runtime shuts down.
- Each test builds a standard `Request`, awaits a standard `Response`, and
  asserts on status, `content-type`, and body text.
- The host in the request URL is irrelevant; only method and path are routed.

## Runner

- `npm test` runs `node --import tsx --test test/*.test.ts`: the Node.js
  built-in test runner, with `tsx` loading TypeScript.
- Assertions use `node:assert/strict`; there is no third-party test framework.
- Test files live in `test/` and are named `*.test.ts`. Only files matching that
  glob are run.

The tests need no external services, so they run identically in the Nix dev
shell and in CI-like environments. See
[../tooling/toolchain.md](../tooling/toolchain.md).
