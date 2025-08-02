# MF2 Full Stack Application

This is a production-ready full-stack SaaS application built with the MF2 Stack. It includes authentication, payments, real-time database, email, and analytics - everything you need to launch quickly.

## What's Included

- 🔐 **Authentication** - Clerk with magic links, OAuth, and MFA
- 💳 **Payments** - Polar for subscriptions and billing
- 🗄️ **Database** - Convex for real-time data and serverless functions
- 📧 **Email** - Resend + React Email for transactional emails
- 📊 **Analytics** - Vercel Analytics + PostHog for insights
- 🎨 **UI Components** - shadcn/ui with Tailwind CSS v4
- 📱 **Responsive** - Mobile-first design with dark mode
- 🚀 **Performance** - Next.js 15 with Turbopack
- 🛡️ **Security** - Rate limiting, CSRF protection, secure headers

## Project Structure

- `/src` - Next.js application (pages, components, hooks)
- `/convex` - Real-time backend functions
- `/public` - Static assets

## Getting Started

### Prerequisites

1. Copy `.env.example` to `.env.local`
2. Set up required services and add their API keys:
   - **Convex**: Run `npx convex dev` to get your deployment URL
   - **Clerk**: Authentication ([clerk.com](https://clerk.com))
   - **Polar**: Payments ([polar.sh](https://polar.sh))
   - **Resend**: Email ([resend.com](https://resend.com))

### Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up Convex** (first time only):
   ```bash
   npx convex dev
   ```
   This will prompt you to log in and create a new project.

3. **Configure Clerk with Convex**:
   ```bash
   # Set Clerk webhook secret in Convex
   npx convex env set CLERK_WEBHOOK_SECRET "your_webhook_secret_here"
   ```
   See [CONVEX_AUTH_TROUBLESHOOTING.md](./CONVEX_AUTH_TROUBLESHOOTING.md) if you encounter authentication errors.

4. **Start development servers** in separate terminals:

   Terminal 1 - Next.js:
   ```bash
   npm run dev
   ```

   Terminal 2 - Convex (if not already running):
   ```bash
   npx convex dev
   ```

### Available Scripts

```bash
# Development
npm run dev              # Backend app (port 3001)
npm run dev:frontend     # Frontend marketing site (port 3000)
npx convex dev          # Convex backend (run in separate terminal)

# Production
npm run build            # Build both frontend and backend
npm run start            # Start backend production server

# Other
npm run lint             # Lint both projects
npm run install:all      # Install dependencies for both projects
```

## Architecture

### Frontend (`/www`)
- Landing page with hero, features, pricing, FAQ
- Built with Next.js 15, Tailwind CSS v4, shadcn/ui
- Optimized for marketing and conversion

### Backend (`/`)
- Authenticated SaaS application
- Real-time features with Convex
- Subscription management with Polar
- Email sending with Resend

### Key Features
- 🔐 Authentication with Clerk
- 💳 Subscription payments with Polar
- 📧 Transactional emails with Resend
- 🔄 Real-time data sync with Convex
- 📊 Analytics with PostHog (optional)
- 📚 Documentation with Mintlify

## Testing

Test pages are available in development:
- `/test-login` - Test Clerk authentication
- `/test-polar` - Sync Polar products and test checkout
- `/test-resend` - Test email sending

## Deployment

### Frontend
Deploy the `/www` directory to Vercel or any static hosting.

### Backend
1. Deploy Convex functions: `npx convex deploy`
2. Deploy Next.js app to Vercel
3. Set environment variables in your hosting platform

## Learn More

- [CLAUDE.md](./CLAUDE.md) - AI assistance guidelines
- [POLAR_SETUP_GUIDE.md](./POLAR_SETUP_GUIDE.md) - Payment setup
- [Convex Documentation](https://docs.convex.dev)
- [Next.js Documentation](https://nextjs.org/docs)
