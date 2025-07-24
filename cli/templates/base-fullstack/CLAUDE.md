# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

### Essential Commands
```bash
# Install dependencies
npm install

# Run development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Bundle analysis
npm run analyze

# Convex development
npx convex dev

# Deploy Convex functions
npx convex deploy

# Documentation server
npm run docs
```

### Testing and Validation
```bash
# Type checking (Next.js includes TypeScript checking in build)
npm run build

# Run ESLint
npm run lint

# Test pages (accessible in development)
/test-login    # Test Clerk authentication
/test-polar    # Test Polar payment integration
/test-resend   # Test Resend email service
```

## High-Level Architecture

### Stack Overview
This is a **Next.js 15** full-stack application with:
- **Frontend**: React 19, Tailwind CSS v4, shadcn/ui components
- **Backend**: Convex (real-time database and serverless functions)
- **Authentication**: Clerk (with Convex integration)
- **Payments**: Polar (subscription management)
- **Email**: Resend (transactional emails)
- **Analytics**: PostHog (optional)
- **Documentation**: Mintlify

### Project Structure
```
/
├── src/                    # Next.js application
│   ├── app/               # App Router pages and API routes
│   ├── components/        # React components
│   ├── hooks/            # Custom React hooks
│   └── lib/              # Utilities and configuration
├── convex/                # Backend functions and schema
│   ├── _generated/       # Auto-generated Convex files
│   ├── schema.ts         # Database schema
│   ├── auth.config.ts    # Clerk authentication setup
│   └── *.ts              # Convex functions
├── docs/                  # Mintlify documentation
└── public/               # Static assets
```

### Key Architectural Decisions

1. **Convex Backend**: All backend logic lives in the `convex/` directory. Functions are automatically deployed and accessible through type-safe APIs.

2. **Authentication Flow**: 
   - Clerk handles user authentication
   - Convex syncs with Clerk via webhooks
   - User data stored in `users` table with `clerkUser` field

3. **Payment Integration**:
   - Polar manages subscriptions
   - Products must be subscription-based with fixed pricing
   - Sync products using `/test-polar` page
   - Webhooks handle subscription updates

4. **Real-time Features**: Convex provides real-time subscriptions out of the box for all queries.

### Path Aliases
- `@/*` → `./src/*`
- `@/convex/*` → `./convex/*`

## Convex Guidelines

### Function Types
- **Public functions**: Use `query`, `mutation`, `action`
- **Internal functions**: Use `internalQuery`, `internalMutation`, `internalAction`
- **Always include validators**: Both `args` and `returns` validators are required

### Database Operations
- Use indexes instead of filters for queries
- Index naming: "by_field1_and_field2" for composite indexes
- System fields: `_id`, `_creationTime` are auto-added

### Best Practices
- Import `api` from `./_generated/api` for public functions
- Import `internal` from `./_generated/api` for internal functions
- Use `v.null()` for null returns, not `undefined`
- Add `"use node"` at file top for Node.js-specific actions

## Environment Configuration

Required environment variables (see `.env.example`):
- **Convex**: `CONVEX_DEPLOYMENT`, `NEXT_PUBLIC_CONVEX_URL`
- **Clerk**: Authentication keys and webhook secrets
- **Polar**: API tokens, webhook secrets, product IDs
- **Resend**: API key and verified sender email
- **PostHog**: (Optional) Analytics configuration

## Development Workflow

1. **Start Development**:
   ```bash
   npx convex dev    # In one terminal
   npm run dev       # In another terminal
   ```

2. **Before Committing**:
   - Run `npm run lint` to check for linting errors
   - Run `npm run build` to ensure TypeScript compilation succeeds
   - Test critical user flows through the UI

3. **Deployment**:
   - Convex functions deploy automatically with `npx convex dev`
   - Next.js app typically deployed to Vercel
   - Set production environment variables in deployment platform

## Common Patterns

### Adding a New Convex Function
1. Create function in `convex/` directory
2. Use appropriate function type (query/mutation/action)
3. Define validators for args and returns
4. Import from `@/convex/_generated/api` in React components

### Creating UI Components
1. Use shadcn/ui components from `src/components/ui/`
2. Follow existing patterns for styling (Tailwind classes)
3. Components use CSS variables for theming

### Working with Authentication
- Check authentication state with Clerk hooks
- User data synced to Convex `users` table
- Protected routes handled by Clerk middleware

### Implementing Payments
- Products must be created in Polar dashboard first
- Use subscription products with fixed pricing only
- Sync products using the `/test-polar` page
- Handle subscription webhooks in `convex/polar.ts`