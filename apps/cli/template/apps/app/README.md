# App

The main user-facing SaaS application. Runs on port 3000.

## Development

```bash
turbo dev --filter=app
```

## Key Features

- Authentication with Clerk (sign-in, sign-up, organizations)
- Real-time backend with Convex
- Payments with Stripe subscriptions
- Collaboration with Liveblocks (live cursors, presence)
- AI chat with multi-model routing
- 50+ shadcn/ui components with dark mode

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Yes | Clerk publishable key |
| `CLERK_SECRET_KEY` | Yes | Clerk secret key |
| `NEXT_PUBLIC_CONVEX_URL` | Yes | Convex deployment URL |
| `STRIPE_SECRET_KEY` | No | Stripe secret key |
| `LIVEBLOCKS_SECRET` | No | Liveblocks secret key |

See full list at [mf2.dev/docs/setup/env](https://mf2.dev/docs/setup/env).

## Docs

[mf2.dev/docs/apps/app](https://mf2.dev/docs/apps/app)
