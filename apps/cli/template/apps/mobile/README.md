# Mobile

React Native + Expo mobile app with shared packages.

## Development

```bash
turbo dev:mobile
# or
cd apps/mobile && bunx expo start
```

## Key Features

- Clerk authentication (sign-in, sign-up, OAuth)
- Convex real-time data
- NativeWind styling (Tailwind for React Native)
- Push notifications via Expo + Knock
- RevenueCat in-app purchases
- Sentry error tracking
- PostHog analytics

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY` | Yes | Clerk publishable key |
| `EXPO_PUBLIC_CONVEX_URL` | Yes | Convex deployment URL |
| `EXPO_PUBLIC_SENTRY_DSN` | No | Sentry DSN |
| `EXPO_PUBLIC_POSTHOG_KEY` | No | PostHog project key |
| `EXPO_PUBLIC_POSTHOG_HOST` | No | PostHog host |
| `EXPO_PUBLIC_REVENUECAT_APPLE_KEY` | No | RevenueCat Apple API key |
| `EXPO_PUBLIC_REVENUECAT_GOOGLE_KEY` | No | RevenueCat Google API key |
