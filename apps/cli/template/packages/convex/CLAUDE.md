# @repo/convex

Convex client provider package that bridges Clerk authentication with Convex's real-time backend.

## Setup

This package provides `ConvexProviderWithClerk` which authenticates Convex queries/mutations using Clerk's JWT tokens.

## Usage

```tsx
// In a client component
import { useAuth } from "@clerk/nextjs";
import { ConvexClientProvider } from "@repo/convex/provider";

function App({ children }) {
  return (
    <ConvexClientProvider useAuth={useAuth}>
      {children}
    </ConvexClientProvider>
  );
}
```

## Exports

- `@repo/convex/provider` - ConvexClientProvider component
- `@repo/convex/keys` - T3 env validation for NEXT_PUBLIC_CONVEX_URL

## Environment Variables

- `NEXT_PUBLIC_CONVEX_URL` (required) - Your Convex deployment URL
