import { NodeHttpServer, NodeRuntime } from "@effect/platform-node"
import { Config, Effect, Layer } from "effect"
import { HttpRouter, HttpServerResponse } from "effect/http"
import { createServer } from "node:http"

export const Routes = Layer.mergeAll(
  HttpRouter.add("GET", "/hello", HttpServerResponse.text("Hello, World!")),
  HttpRouter.add("GET", "/health", HttpServerResponse.text("ok"))
)

const HttpServerLive = Layer.unwrap(
  Effect.gen(function* () {
    const port = yield* Config.Port("PORT").pipe(Config.withDefault(3000))
    return NodeHttpServer.layer(createServer, { port })
  })
)

if (import.meta.main) {
  HttpRouter.serve(Routes).pipe(Layer.provide(HttpServerLive), Layer.launch, NodeRuntime.runMain)
}
