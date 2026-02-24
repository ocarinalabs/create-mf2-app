# mf²

Production-ready SaaS monorepo built with Next.js, Convex, and the Vercel ecosystem.

## Project Structure

This is a Turborepo monorepo managed with **bun** as the package manager.

### Apps

| App | Path | Description |
|-----|------|-------------|
| `app` | `apps/app` | Main SaaS application (authenticated dashboard, core product) |
| `web` | `apps/web` | Marketing website and landing pages |
| `api` | `apps/api` | Public API layer |
| `docs` | `apps/docs` | Documentation site |
| `email` | `apps/email` | Email templates (react.email) |
| `storybook` | `apps/storybook` | Component library viewer |

### Packages

| Package | Path | Description |
|---------|------|-------------|
| `backend` | `packages/backend` | Convex backend -- real-time database, functions, AI agents |
| `convex` | `packages/convex` | Convex client provider (wraps ConvexProviderWithClerk) |
| `ai` | `packages/ai` | AI Gateway -- multi-model AI via Vercel AI SDK |
| `design-system` | `packages/design-system` | Shared UI components (shadcn/ui based) |
| `auth` | `packages/auth` | Authentication (Clerk) |
| `analytics` | `packages/analytics` | Analytics (PostHog) |
| `feature-flags` | `packages/feature-flags` | Feature flags |
| `payments` | `packages/payments` | Payments (Stripe) |
| `observability` | `packages/observability` | Logging and error tracking |
| `notifications` | `packages/notifications` | User notifications |
| `security` | `packages/security` | Security utilities |
| `seo` | `packages/seo` | SEO metadata helpers |
| `storage` | `packages/storage` | File storage |
| `webhooks` | `packages/webhooks` | Webhook handling |
| `email` | `packages/email` | Email sending utilities |
| `cms` | `packages/cms` | Content management |
| `collaboration` | `packages/collaboration` | Real-time collaboration (Liveblocks) |
| `internationalization` | `packages/internationalization` | i18n support |
| `rate-limit` | `packages/rate-limit` | Rate limiting |
| `typescript-config` | `packages/typescript-config` | Shared TypeScript configurations |
| `next-config` | `packages/next-config` | Shared Next.js configuration |

## Backend

**Convex** (`packages/backend`): Real-time database, serverless functions, scheduled jobs, and AI agent orchestration.

## Common Commands

```bash
bun run dev          # Start all apps in development mode
bun run build        # Build all apps and packages
bun run check        # Check code quality (ultracite/biome)
bun run fix          # Auto-fix code quality issues
bun run test         # Run all tests
bun run convex-lint  # Lint Convex functions
bun run clean        # Clean all node_modules
```

## Code Quality

This project uses **ultracite** (powered by Biome) for formatting and linting. Run `bun run fix` before committing. A lefthook pre-commit hook runs automatically.

## Key Conventions

- Use `bun` for all package management (not npm/yarn/pnpm)
- Use `type` keyword for TypeScript type definitions (not `interface`)
- All Convex functions require argument and return validators
- Convex internal functions use `internalQuery`/`internalMutation`/`internalAction`
- Public functions use `query`/`mutation`/`action`
- Prefer `for...of` over `.forEach()`
- Use `const` by default, `let` only when reassignment is needed
