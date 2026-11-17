<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AGENTS.md

## Project state

- Next.js 16.4.6 App Router client (`src/app`), React 19.3, Tailwind CSS v4, shadcn/ui `base-nova`.
- Fresh scaffold: `src/app/page.tsx` is still the create-next-app placeholder. No API client, auth, state management, or tests exist yet.
- A separate Express/Mongo backend lives at `../assignment-nine-server` but is not wired into this app.

## Commands

- `npm run dev` — dev server on port 3000 (Turbopack).
- `npm run build` — production build; it also runs TypeScript, so it doubles as typecheck.
- `npx tsc --noEmit` — standalone typecheck (passes today).
- `npm run lint` — ESLint flat config; currently exits 1 (see below).
- There is no test script or test framework. Verify changes with `npx tsc --noEmit` / `npm run build` and by exercising the page; do not claim tests pass.
- Use npm only. `package-lock.json` is the lockfile; the README's yarn/pnpm/bun alternatives are boilerplate.

## Lint baseline (pre-existing)

`npm run lint` fails on two vendored shadcn files:

- `src/components/ui/carousel.tsx:98`
- `src/hooks/use-mobile.ts:14`

Both are `react-hooks/set-state-in-effect` errors. This is the starting state, not caused by your change. Do not rewrite unrelated vendored components; ensure your own edits add no new lint errors.

## UI conventions

- The UI primitives are shadcn `base-nova`, built on **Base UI** (`@base-ui/react`), not Radix.
- Compose with Base UI's `render={<Component />}` prop. There is no Radix-style `asChild`.
- Base UI state attributes are `data-open`, `data-closed`, `data-pressed`, `data-selected`, etc. — not Radix's `data-state="open"`. Check existing `data-*` variants before adding styles.
- Add/update primitives through the shadcn CLI (`npx shadcn@latest add <component>`) or mirror existing files in `src/components/ui`. Search that directory before creating a new primitive.
- Use `cn` from the `"cn"` package in `src/components/ui/*` files, matching existing components. `@/lib/utils` only re-exports the same `cn`.
- Import alias: `@/*` → `src/*`.
- Tailwind v4 is CSS-first: theme tokens and variants live in `src/app/globals.css` (`@theme inline`, `@custom-variant dark`). There is no `tailwind.config.*`.
- Shiki languages are not auto-detected: `src/lib/highlighter.tsx` has an explicit `languages` map and `aliases`. Add a language there before passing it to `useHighlightedCode`/`highlightCode`.

## Next.js 16 specifics

- Read the bundled docs in `node_modules/next/dist/docs/01-app/` before using an unfamiliar API; this version differs from older Next.js.
- `next.config.ts` enables `cacheComponents`, `partialPrefetching`, `reactCompiler`, and Turbopack CSS loaders. Do not add `experimental.ppr`, `dynamic`, `revalidate`, or `fetchCache` configs; they conflict with Cache Components.
- With Cache Components, cache data with `"use cache"` plus `cacheLife`/`cacheTag`, or wrap dynamic data in `<Suspense>`. Blocking-prerender issues surface in the dev overlay.
- Synchronous IO during prerender (`new Date()`, `Date.now()`, `Math.random()`, `crypto.randomUUID()`) fails the build even with `instant = false`; move it into a Client Component or behind `connection()` + `<Suspense>`.
- Cache Components requires the Node.js runtime; do not export `runtime` from route segments.
- Base UI component docs are vendored at `node_modules/@base-ui/react/docs/`.
