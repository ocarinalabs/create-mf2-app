# @repo/backend

Real-time database and serverless functions using Convex.

## Usage

Schema at `convex/schema.ts`, functions at `convex/<module>/api/`.

```ts
import { mustGetCurrentUser } from "../auth/users";

export const myFunction = mutation({
  args: {},
  returns: v.null(),
  handler: async (ctx, args) => {
    const user = await mustGetCurrentUser(ctx);
    // user is guaranteed to exist
  },
});
```

## Environment Variables

Set in Convex dashboard:

| Variable | Required | Description |
|----------|----------|-------------|
| `CLERK_JWT_ISSUER_DOMAIN` | Yes | Clerk issuer URL |
| `CLERK_SECRET_KEY` | Yes | Clerk secret key |
| `CLERK_WEBHOOK_SECRET` | Yes | Clerk webhook signing secret |
| `RESEND_API_KEY` | No | Resend email API key |
| `AI_GATEWAY_API_KEY` | No | Vercel AI Gateway key |
| `AI_GATEWAY_URL` | No | Gateway URL |
| `SITE_URL` | No | App URL for Stripe redirects |

## Docs

[mf2.dev/docs/packages/backend](https://mf2.dev/docs/packages/backend)
