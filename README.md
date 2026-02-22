<p align="center">
  <a href="https://github.com/ocarinalabs/create-mf2-app">
    <h1 align="center">mf²</h1>
  </a>
</p>

<p align="center">
  Production-ready monorepo for SaaS, AI apps, and marketing sites.
</p>

<p align="center">
  <code>npx create-mf2-app@latest</code>
</p>

<div align="center">

[![npm version][npm-image]][npm-url]
[![Downloads][downloads-image]][npm-url]
[![License][license-image]][license-url]
[![GitHub Stars][stars-image]][github-url]

</div>

## Quick Start

```bash
npx create-mf2-app@latest my-app
cd my-app
bun run dev
```

The CLI scaffolds a Turborepo monorepo with six apps and 20+ shared packages. It prompts for a project name and package manager, copies the template, sets up environment files, installs dependencies, and creates an initial git commit.

Fill in your `.env.local` files with API keys and start building.

## What You Get

The scaffolded project splits into independently deployable apps that share typed packages:

```
apps/
  app/            Main application (Next.js 15, App Router)
  web/            Marketing site
  api/            Standalone API layer
  docs/           Documentation (Mintlify)
  email/          Email templates (React Email)
  storybook/      Component playground

packages/
  backend/        Convex database, auth sync, AI agents, workflows
  design-system/  50+ shadcn/ui components with dark mode
  auth/           Clerk authentication and route protection
  payments/       Stripe SDK and @convex-dev/stripe component
  ai/             AI agents, RAG, streaming, usage tracking
  analytics/      PostHog event tracking and sessions
  observability/  Sentry error tracking, BetterStack logging
  security/       Arcjet bot detection, Nosecone secure headers
  rate-limit/     Upstash Redis rate limiting
  storage/        Convex file storage and Vercel Blob
  email/          Resend transactional email
  cms/            BaseHub headless CMS
  seo/            Metadata, JSON-LD, Open Graph images
  notifications/  Knock in-app notification feeds
  collaboration/  Liveblocks cursors and presence
  webhooks/       Svix outbound webhook delivery
  feature-flags/  Vercel feature flags with overrides
  internationalization/ next-intl translations
  convex/         Convex + Clerk React provider
  next-config/    Shared Next.js configuration
  typescript-config/ Shared tsconfig
```

Each app imports only the packages it needs. The main app (`apps/app`) uses auth, payments, backend, and AI. The marketing site (`apps/web`) uses CMS, SEO, and analytics. The API layer (`apps/api`) uses auth, rate-limit, and security. This keeps bundles small and concerns separated.

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Next.js 15](https://nextjs.org) with App Router |
| Language | TypeScript (end-to-end, database to UI) |
| Database | [Convex](https://convex.dev) (real-time, reactive, serverless) |
| Auth | [Clerk](https://clerk.com) (80+ OAuth providers, webhook sync to Convex) |
| Payments | [Stripe](https://stripe.com) via [`@convex-dev/stripe`](https://www.convex.dev/components/stripe) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com) |
| AI | Convex AI agents, RAG with vector search, persistent text streaming |
| Email | [Resend](https://resend.com) + [React Email](https://react.email) |
| Analytics | [PostHog](https://posthog.com) (events, sessions, feature flags) |
| Error Tracking | [Sentry](https://sentry.io) + [BetterStack](https://betterstack.com) |
| Security | [Arcjet](https://arcjet.com) (bot detection, rate limiting, DDoS protection) |
| Monorepo | [Turborepo](https://turbo.build) + [Bun](https://bun.sh) |
| Deployment | [Vercel](https://vercel.com) |
| Code Quality | [Biome](https://biomejs.dev) via [Ultracite](https://docs.ultracite.ai) |

## Convex Components

Five [Convex Components](https://www.convex.dev/components) ship pre-installed. Components are sandboxed TypeScript modules that manage their own tables and functions inside your Convex backend.

| Component | Package | What it does |
|-----------|---------|-------------|
| Stripe | `@convex-dev/stripe` | Checkout sessions, subscriptions, customer management, webhook sync |
| Resend | `@convex-dev/resend` | Transactional email delivery with event tracking |
| Workflow | `@convex-dev/workflow` | Durable, long-running code flows with retries and delays |
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
bun run dev              # Start all apps in parallel
turbo dev --filter=app   # Start a single app
bunx convex dev          # Start Convex backend separately
```

### Code Quality

```bash
bun run check            # Lint and format check (Biome)
bun run fix              # Auto-fix linting and formatting
bun run convex-lint      # Lint Convex functions (ESLint)
```

Biome handles TypeScript, React, and CSS. Convex functions use a separate ESLint plugin (`@convex-dev/eslint-plugin`) for Convex-specific rules (argument validators, explicit table IDs, runtime imports). A Lefthook pre-commit hook runs `ultracite fix` on staged files.

### Build and Test

```bash
bun run build            # Build all apps
bun run test             # Run tests
turbo build --filter=app # Build a single app
turbo codegen            # Generate TypeScript types from Convex schema
```

### Environment Variables

```bash
bun run env:init         # Create .env.local + .env.production from .env.example
bun run env:check        # Validate all env files have required keys
bun run env:push         # Sync env vars to Vercel and Convex
```

`env:push` reads `.env.local` for development/preview and `.env.production` for production. It filters automatically: `NEXT_PUBLIC_*` skips Convex, platform-managed vars (`CONVEX_DEPLOYMENT`, `VERCEL_*`) are ignored, and empty or localhost values are skipped.

### Upgrading

```bash
bun run bump-deps        # Update all npm dependencies
bun run bump-ui          # Update all shadcn/ui components
bun run clean            # Remove all node_modules directories
```

`bump-ui` replaces every component in `packages/design-system` with the latest from shadcn/ui. This overrides customizations — review the diff before committing.

## CLI

The CLI prompts interactively for project name and package manager. Pass flags to skip prompts:

```bash
npx create-mf2-app@latest --name my-app --package-manager bun
npx create-mf2-app@latest --name my-app --disable-git
```

| Flag | Effect |
|------|--------|
| `--name <name>` | Set project name (skips prompt) |
| `--package-manager <manager>` | Set package manager: bun, npm, yarn, pnpm (skips prompt) |
| `--disable-git` | Skip git initialization and initial commit |

Supported package managers: **bun** (default), npm, yarn, pnpm. When using npm, yarn, or pnpm, the CLI converts `workspace:*` dependencies and adjusts configuration files automatically.

## Deploy

Each app deploys as a separate Vercel project:

1. Import your repo in the [Vercel dashboard](https://vercel.com/new)
2. Set the root directory (`apps/app`, `apps/web`, or `apps/api`)
3. Add environment variables from `.env.production`
4. Push to `main` — Vercel rebuilds only the affected apps

The [Clerk integration](https://vercel.com/integrations) and [Convex integration](https://vercel.com/integrations) auto-sync their keys to your Vercel projects. Documentation (`apps/docs`) deploys via [Mintlify](https://mintlify.com), not Vercel.

## Documentation

Full docs at [docs.mf2.dev](https://docs.mf2.dev) cover setup, architecture, every package, and deployment.

## Community

- [Discord](https://discord.gg/mf2stack) — Help and project sharing
- [GitHub Issues](https://github.com/ocarinalabs/create-mf2-app/issues) — Bug reports
- [Twitter](https://twitter.com/korrect) — Updates

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit with [conventional commits](https://www.conventionalcommits.org/)
4. Open a pull request

## License

MIT — [Korrect](https://korrect.ai)

[npm-image]: https://img.shields.io/npm/v/create-mf2-app?color=0b7285&logoColor=0b7285
[npm-url]: https://www.npmjs.com/package/create-mf2-app
[downloads-image]: https://img.shields.io/npm/dm/create-mf2-app?color=364fc7&logoColor=364fc7
[license-image]: https://img.shields.io/npm/l/create-mf2-app
[license-url]: https://github.com/ocarinalabs/create-mf2-app/blob/main/LICENSE
[stars-image]: https://img.shields.io/github/stars/ocarinalabs/create-mf2-app?style=social
[github-url]: https://github.com/ocarinalabs/create-mf2-app
