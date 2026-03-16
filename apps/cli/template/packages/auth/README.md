# @repo/auth

User authentication and route protection with Clerk.

## Usage

```ts
import { auth } from "@repo/auth/server";
```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `CLERK_SECRET_KEY` | No | Clerk secret key (gracefully degrades if not set) |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | No | Clerk publishable key |
| `CLERK_WEBHOOK_SECRET` | No | Clerk webhook signing secret |

## Docs

[mf2.dev/docs/packages/auth](https://mf2.dev/docs/packages/auth)
