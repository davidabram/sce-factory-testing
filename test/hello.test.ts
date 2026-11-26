import assert from "node:assert/strict"
import { after, test } from "node:test"
import { HttpRouter } from "effect/http"
import { Routes } from "../src/server.ts"

const { handler, dispose } = HttpRouter.toWebHandler(Routes, { disableLogger: true })
after(dispose)

test("GET /hello responds with Hello, World!", async () => {
  const response = await handler(new Request("http://localhost/hello"))

  assert.equal(response.status, 200)
  assert.match(response.headers.get("content-type") ?? "", /^text\/plain/)
  assert.equal(await response.text(), "Hello, World!")
})
