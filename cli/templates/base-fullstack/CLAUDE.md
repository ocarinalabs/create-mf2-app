# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
npm run dev              # Next.js with Turbopack (port 3000)
npx convex dev          # Convex backend (separate terminal)

# Production
npm run build           # Build Next.js application
npm run start           # Start production server

# Other
npm run lint            # ESLint validation
npm run analyze         # Bundle analyzer
npm run email:dev       # Email template development
```

## High-Level Architecture

This is a full-stack SaaS template built with:

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS v4, shadcn/ui
- **Backend**: Convex (real-time database), Clerk (auth), Polar (payments), Resend (email)
- **Analytics**: Vercel Analytics, PostHog (optional), Arcjet (security)

### Route Structure

```
src/app/
├── (marketing)/     # Public pages (landing, pricing, waitlist)
├── (app)/          # Auth-protected pages
│   ├── dashboard/  # Main app interface
│   └── account/    # User settings
└── api/            # Webhooks and external APIs
```

### Key Integration Points

1. **Authentication (Clerk)**
   - Middleware protects `/dashboard`, `/account`, `/admin` routes
   - User data synced to Convex via webhooks
   - Welcome email on signup

2. **Payments (Polar)**
   - Custom sync logic in `/test-polar` for existing products
   - Subscription products only (no one-time or custom pricing)
   - Customer portal at `/account`

3. **Database (Convex)**
   - Schema in `convex/schema.ts`
   - Real-time subscriptions
   - Server functions in `convex/` directory

4. **Email (Resend + React Email)**
   - Templates in `email/templates/`
   - Triggered from Convex actions
   - Welcome, verification, and transactional emails

### Environment Setup

Critical environment variables (see `.env.example`):
- Convex deployment URLs
- Clerk publishable/secret keys and webhook secret
- Polar organization token, webhook secret, and product IDs
- Resend API key and from email
- Optional: PostHog key, Arcjet key

### Development Workflow

1. Start Convex backend: `npx convex dev`
2. Start Next.js frontend: `npm run dev`
3. Test pages available in development:
   - `/test-login` - Clerk authentication
   - `/test-polar` - Polar product sync
   - `/test-resend` - Email sending

### Component Architecture

- Base components from shadcn/ui (New York style)
- Custom UI components in `src/components/ui/`
- Shared hooks in `src/hooks/`
- Utilities in `src/lib/`

### Important Patterns

1. **Server Components by Default**: Use `"use client"` only when needed
2. **Convex Queries/Mutations**: Import from `convex/_generated/`
3. **Type Safety**: Convex generates types automatically
4. **Error Handling**: Graceful fallbacks for optional services
5. **Protected Routes**: Use route groups with middleware