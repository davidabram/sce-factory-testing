import assert from "node:assert/strict"
import { after, test } from "node:test"
import { HttpRouter } from "effect/http"
import { Routes } from "../src/server.ts"

const { handler, dispose } = HttpRouter.toWebHandler(Routes, { disableLogger: true })
after(dispose)

test("GET /health responds with ok", async () => {
  const response = await handler(new Request("http://localhost/health"))

  assert.equal(response.status, 200)
  assert.match(response.headers.get("content-type") ?? "", /^text\/plain/)
  assert.equal(await response.text(), "ok")
})

test("POST /health is not routed", async () => {
  const response = await handler(new Request("http://localhost/health", { method: "POST" }))

  assert.equal(response.status, 404)
})
