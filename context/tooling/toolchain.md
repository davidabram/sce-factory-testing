# Toolchain and environment

## Dev environment

[`flake.nix`](../../flake.nix) defines a default Nix dev shell for
`x86_64-linux`, `aarch64-linux`, `x86_64-darwin`, and `aarch64-darwin` that
provides Node.js 24, Git, and curl (npm ships with Node.js). `.envrc` contains
`use flake`, so direnv enters the shell automatically. The flake also exposes
`nixfmt` as its formatter. `flake.lock` pins nixpkgs.

## Packages

[`package.json`](../../package.json) declares an ES module package
(`"type": "module"`) requiring Node.js `>=24`. All versions are exact and
`package-lock.json` pins the tree; installs use `npm ci`.

| Package                 | Role                                         |
| ----------------------- | -------------------------------------------- |
| `effect`                | Effect v4 runtime, `Config`, `Layer`, and `effect/http` |
| `@effect/platform-node` | Node HTTP server layer and `NodeRuntime`     |
| `tsx`                   | Runs TypeScript directly for start, dev, and tests |
| `typescript`            | Type checking only                           |
| `@types/node`           | Node.js type definitions                     |

## Scripts

| Script      | Command                                  |
| ----------- | ---------------------------------------- |
| `dev`       | `tsx watch src/server.ts`                |
| `start`     | `tsx src/server.ts`                      |
| `typecheck` | `tsc --noEmit`                           |
| `test`      | `node --import tsx --test test/*.test.ts` |

## TypeScript settings

[`tsconfig.json`](../../tsconfig.json) covers `src` and `test`, targets
`ES2024` with `NodeNext` module resolution, and never emits output. Beyond
`strict`, it enables `exactOptionalPropertyTypes`, `noUncheckedIndexedAccess`,
`noImplicitOverride`, and `verbatimModuleSyntax`. `allowImportingTsExtensions`
lets imports name `.ts` files directly, as tests do with
`../src/server.ts`. Type-only imports must use `import type` under
`verbatimModuleSyntax`.

The repository is a fixture for SCE Factory end-to-end runs, not a production
application; it has no build artifact, deployment configuration, or CI
definition.
