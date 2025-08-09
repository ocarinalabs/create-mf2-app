# Base-Fullstack Template Setup Notes

## Quick Start
```bash
npm install
cp .env.example .env.local
# Fill in your API keys in .env.local
npx convex dev  # In one terminal
npm run dev     # In another terminal
```

## What's Pre-Built vs What Needs Configuration

### ✅ Ready Out of the Box
- **Convex Database**: Schema, real-time subscriptions, all components configured
- **UI Components**: 40+ shadcn/ui components, dark mode, responsive layouts
- **App Structure**: Protected routes, dashboard, account pages, marketing pages
- **Code Integrations**: All integration code is written and ready

### 🔧 Needs Your API Keys (Code is Ready)

#### 1. **Clerk Authentication**
- **What's ready**: UserButton, middleware, webhook handler, auto user creation
- **You need to add**:
  - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
  - `CLERK_SECRET_KEY`
  - `CLERK_WEBHOOK_SECRET`
- **Setup**: Create Clerk app → Add webhook endpoint: `https://your-domain.com/api/webhooks/clerk`

#### 2. **Resend Email**
- **What's ready**: Welcome emails, waitlist confirmation, email templates
- **You need to add**:
  - `RESEND_API_KEY`
  - `RESEND_FROM_EMAIL` (must be verified domain)
- **Setup**: Resend account → Verify domain → Add API key

#### 3. **Polar Payments**
- **What's ready**: Checkout components, customer portal, subscription management
- **You need to add**:
  - `POLAR_ORGANIZATION_TOKEN`
  - `NEXT_PUBLIC_POLAR_STARTER_PRODUCT_ID`
  - `NEXT_PUBLIC_POLAR_PRO_PRODUCT_ID`
- **Setup**: 
  1. Create products in Polar dashboard (must be recurring/subscription products)
  2. Add product IDs to env
  3. Run product sync: `npx convex run payments:polar:syncProducts`

### 📁 Folder Structure
```
convex/
├── auth/          # Clerk integration
├── email/         # Resend email actions
├── payments/      # Polar subscription logic
├── messages.ts    # Demo chat functionality
├── waitlist.ts    # Waitlist signup
└── schema.ts      # Database schema
```

### 🎯 Integration Status
- **Clerk Auth**: 100% coded, needs API keys
- **Resend Email**: 100% coded, needs API key + verified domain
- **Polar Payments**: 100% coded, needs products created + synced
- **Convex Database**: 100% ready, auto-configures on `npx convex dev`

### 📝 Optional Services
- **PostHog Analytics**: Add `NEXT_PUBLIC_POSTHOG_KEY` to enable
- **Arcjet Security**: Add `ARCJET_KEY` for rate limiting
- **Vercel Toolbar**: Add `FLAGS_SECRET` for feature flags

### 🚀 First Steps After Setup
1. Sign up to test Clerk authentication
2. Check welcome email was sent (if Resend configured)
3. Visit `/account` to see user data
4. Test subscription checkout from pricing page (if Polar configured)

### ⚠️ Common Issues
- **Polar products not showing**: Make sure products are recurring (not one-time) and run sync
- **Emails not sending**: Check Resend from email is verified
- **Auth not working**: Ensure Clerk webhook secret matches dashboard setting