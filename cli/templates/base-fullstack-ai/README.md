# MF2 Full Stack + AI Application

This is a full-stack SaaS application with integrated AI capabilities built with the MF2 Stack. It includes everything from the base fullstack template plus AI agents, RAG, chat interfaces, and AI-powered workflows.

## What's Included

Everything from base fullstack template:
- ✅ Authentication (Clerk)
- ✅ Payments (Polar)
- ✅ Real-time database (Convex)
- ✅ Email (Resend + React Email)
- ✅ Analytics (Vercel + PostHog)

Plus AI features:
- 🤖 AI Agents (support, assistant)
- 📚 RAG/Knowledge Base
- 💬 Chat interfaces with streaming
- 🔄 AI Workflows
- 📊 Usage tracking & rate limiting
- 🎯 Multiple LLM support

## Project Structure

- `/src` - Next.js application (pages, components, hooks)
- `/convex` - Real-time backend functions and AI agents
- `/public` - Static assets

## Getting Started

### Prerequisites

1. Copy `.env.example` to `.env.local`
2. Set up required services and add their API keys:
   - **Convex**: Run `npx convex dev` to get your deployment URL
   - **Clerk**: Authentication ([clerk.com](https://clerk.com))
   - **Polar**: Payments ([polar.sh](https://polar.sh))
   - **Resend**: Email ([resend.com](https://resend.com))
   - **OpenAI**: AI models ([platform.openai.com](https://platform.openai.com))

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

4. **Configure AI services**:
   ```bash
   # Set OpenAI API key in Convex
   npx convex env set OPENAI_API_KEY "your_openai_api_key_here"
   ```

5. **Start development servers** in separate terminals:

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
- Authenticated SaaS application with AI capabilities
- Real-time features with Convex
- AI agents for customer support and assistance
- RAG for knowledge base and document search
- Subscription management with Polar
- Email sending with Resend

### Key Features
- 🤖 **AI Agents** - Pre-configured support and assistant agents
- 🔍 **RAG System** - Document search and knowledge base
- 💬 **Real-time Chat** - Streaming responses with conversation history
- 🔐 **Authentication** - Secure user management with Clerk
- 💳 **Subscriptions** - Payment processing with Polar
- 📧 **Email System** - Transactional emails with Resend
- 🔄 **Real-time Sync** - Live data updates with Convex
- 📊 **Usage Tracking** - Monitor AI token usage and costs
- 🚦 **Rate Limiting** - Protect against abuse and control costs

## AI Features

### Pre-built Components
- **Chat Interface** - Full-featured chat UI with streaming support
- **AI Agents** - Customizable agents for different use cases
- **Knowledge Base** - RAG-powered document search
- **Usage Dashboard** - Track AI usage and costs
- **Rate Limiting** - Per-user and global limits

### Example Use Cases
- Customer support chatbot
- AI-powered search
- Document Q&A system
- Automated workflows
- Content generation

## Testing

Test pages are available in development:
- `/test-login` - Test Clerk authentication
- `/test-polar` - Sync Polar products and test checkout
- `/test-resend` - Test email sending
- `/ai/chat` - Test AI chat interface
- `/ai/playground` - Test and debug agents with the visual playground interface

## Deployment

### Frontend
Deploy the `/www` directory to Vercel or any static hosting.

### Backend
1. Deploy Convex functions: `npx convex deploy`
2. Deploy Next.js app to Vercel
3. Set environment variables in your hosting platform
4. Configure production rate limits and usage tracking

## Learn More

- [AI_SETUP.md](./AI_SETUP.md) - AI configuration and best practices
- [CLAUDE.md](./CLAUDE.md) - AI assistance guidelines
- [POLAR_SETUP_GUIDE.md](./POLAR_SETUP_GUIDE.md) - Payment setup
- [Convex Documentation](https://docs.convex.dev)
- [Next.js Documentation](https://nextjs.org/docs)
- [AI SDK Documentation](https://sdk.vercel.ai/docs)