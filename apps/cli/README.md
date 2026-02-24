# mf²

The startup-in-a-command monorepo built for the agent era.

```
bunx create-mf2-app
```

[![npm version][npm-image]][npm-url]
[![Downloads][downloads-image]][npm-url]
[![License][license-image]][license-url]
[![GitHub Stars][stars-image]][github-url]

## Quick Start

```bash
bunx create-mf2-app my-app
cd my-app
bun run dev
```

The CLI scaffolds a Turborepo monorepo with six apps and 20+ shared packages. It prompts for a project name and package manager, copies the template, sets up environment files, installs dependencies, and creates an initial git commit.

Fill in your `.env.local` files with API keys and start building.

## What You Get

Six independently deployable apps that share typed packages:

```
apps/
  app/            Main SaaS application (Next.js 15, App Router)
  web/            Marketing website
  api/            Webhooks, cron jobs, external integrations
  docs/           Documentation (Mintlify)
  email/          Email templates (React Email)
  storybook/      Component workshop

packages/
  backend/        Convex database, auth sync, AI agents, workflows
  design-system/  50+ shadcn/ui components with dark mode
  auth/           Clerk authentication and route protection
  payments/       Stripe via @convex-dev/stripe
  ai/             Vercel AI SDK, multi-model routing, RAG
  analytics/      PostHog event tracking and sessions
  observability/  Sentry error tracking, BetterStack logging
  security/       Arcjet bot detection, Nosecone secure headers
  rate-limit/     Upstash Redis rate limiting
  storage/        Convex file storage and Vercel Blob
  email/          Resend transactional email
  cms/            BaseHub headless CMS
  seo/            Metadata, JSON-LD, Open Graph
  notifications/  Knock in-app notification feeds
  collaboration/  Liveblocks cursors and presence
  webhooks/       Svix outbound webhook delivery
  feature-flags/  Vercel feature flags with overrides
  internationalization/ next-intl translations
  convex/         Convex + Clerk React provider
  next-config/    Shared Next.js configuration
  typescript-config/ Shared tsconfig
```

Each app imports only the packages it needs. The main app uses auth, payments, backend, and AI. The marketing site uses CMS, SEO, and analytics. The API layer uses auth, rate-limit, and security.

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Next.js 15](https://nextjs.org) with App Router |
| Language | TypeScript end-to-end |
| Database | [Convex](https://convex.dev) — real-time, reactive, serverless |
| Auth | [Clerk](https://clerk.com) — 80+ OAuth providers, webhook sync to Convex |
| Payments | [Stripe](https://stripe.com) via [`@convex-dev/stripe`](https://www.convex.dev/components/stripe) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com) |
| AI | [Vercel AI SDK](https://sdk.vercel.ai) — multi-model routing, RAG, streaming |
| Email | [Resend](https://resend.com) + [React Email](https://react.email) |
| Analytics | [PostHog](https://posthog.com) — events, sessions, feature flags |
| Error Tracking | [Sentry](https://sentry.io) + [BetterStack](https://betterstack.com) |
| Security | [Arcjet](https://arcjet.com) — bot detection, rate limiting, DDoS protection |
| Monorepo | [Turborepo](https://turbo.build) + [Bun](https://bun.sh) |
| Deployment | [Vercel](https://vercel.com) |
| Code Quality | [Biome](https://biomejs.dev) via [Ultracite](https://docs.ultracite.ai) |

## Convex Components

Five [Convex Components](https://www.convex.dev/components) ship pre-installed — sandboxed TypeScript modules that manage their own tables and functions inside your Convex backend.

| Component | Package | Purpose |
|-----------|---------|---------|
| Stripe | `@convex-dev/stripe` | Checkout sessions, subscriptions, customer management, webhook sync |
| Resend | `@convex-dev/resend` | Transactional email delivery with event tracking |
| Workflow | `@convex-dev/workflow` | Durable, long-running flows with retries and delays |
| Action Retrier | `@convex-dev/action-retrier` | Automatic retry with backoff for unreliable external calls |
| Migrations | `@convex-dev/migrations` | Schema migrations for live data without downtime |

Install more from the [component directory](https://www.convex.dev/components):

```bash
bun add @convex-dev/rate-limiter
```

Then register in `packages/backend/convex/convex.config.ts`:

```ts
import rateLimiter from "@convex-dev/rate-limiter/convex.config.js";
app.use(rateLimiter);
```

## Commands

All commands run from the project root.

### Development

```bash
bun run dev              # Start all apps
turbo dev --filter=app   # Start a single app
bunx convex dev          # Start Convex backend
```

### Code Quality

```bash
bun run check            # Lint and format check (Biome)
bun run fix              # Auto-fix issues
bun run convex-lint      # Lint Convex functions (ESLint)
```

### Build and Test

```bash
bun run build            # Build all apps
bun run test             # Run tests (Vitest)
turbo build --filter=app # Build a single app
```

### Environment Variables

```bash
bun run env:init         # Create .env.local + .env.production from .env.example
bun run env:check        # Validate all env files
bun run env:push         # Sync env vars to Vercel and Convex
```

### Upgrading

```bash
bun run bump-deps        # Update all npm dependencies
bun run bump-ui          # Update all shadcn/ui components
bun run clean            # Remove all node_modules
```

## CLI

Pass flags to skip interactive prompts:

```bash
bunx create-mf2-app --name my-app --package-manager bun
bunx create-mf2-app --name my-app --disable-git
```

| Flag | Effect |
|------|--------|
| `--name <name>` | Set project name |
| `--package-manager <manager>` | bun (default), npm, yarn, or pnpm |
| `--disable-git` | Skip git initialization |

For npm, yarn, or pnpm, the CLI converts `workspace:*` dependencies and adjusts configuration files.

## Deploy

Each app deploys as a separate Vercel project:

1. Import your repo at [vercel.com/new](https://vercel.com/new)
2. Set the root directory (`apps/app`, `apps/web`, or `apps/api`)
3. Add environment variables from `.env.production`
4. Push to `main` — Vercel rebuilds only affected apps

Documentation (`apps/docs`) deploys via [Mintlify](https://mintlify.com), not Vercel.

## Documentation

Full docs at [mf2.dev/docs](https://mf2.dev/docs).

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit with [conventional commits](https://www.conventionalcommits.org/)
4. Open a pull request

## License

MIT — [Ocarina Labs](https://ocarinalabs.ai)

[npm-image]: https://img.shields.io/npm/v/create-mf2-app?color=0b7285&logoColor=0b7285
[npm-url]: https://www.npmjs.com/package/create-mf2-app
[downloads-image]: https://img.shields.io/npm/dm/create-mf2-app?color=364fc7&logoColor=364fc7
[license-image]: https://img.shields.io/npm/l/create-mf2-app
[license-url]: https://github.com/ocarinalabs/create-mf2-app/blob/main/LICENSE
[stars-image]: https://img.shields.io/github/stars/ocarinalabs/create-mf2-app?style=social
[github-url]: https://github.com/ocarinalabs/create-mf2-app
