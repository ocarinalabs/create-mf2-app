# @repo/rate-limit

Application-layer rate limiting with Upstash Redis.

## Usage

```ts
import { createRateLimiter, slidingWindow } from "@repo/rate-limit";
```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `UPSTASH_REDIS_REST_URL` | No | Upstash Redis REST URL |
| `UPSTASH_REDIS_REST_TOKEN` | No | Upstash Redis REST token |

## Docs

[mf2.dev/docs/packages/rate-limit](https://mf2.dev/docs/packages/rate-limit)
