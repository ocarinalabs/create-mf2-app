# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with the AI-powered SaaS application.

## Common Development Commands

### Essential Commands
```bash
# Install dependencies
npm install

# Development servers (run in separate terminals)
npm run dev           # Next.js dev server
npx convex dev        # Convex dev server

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Bundle analysis
npm run analyze

# Email template development
npm run email-dev    # View and test email templates
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

# AI test pages
/ai/chat       # Test AI chat interface
/ai/support    # Test support agent
/ai/knowledge  # Test RAG knowledge base
/ai/playground # Visual agent testing and debugging

# Test AI configuration
npx convex run ai:models:testModels

# Generate API key for playground
npx convex run --component agent apiKeys:issue '{"name":"dev"}'
```

## High-Level Architecture

### Stack Overview
This is a **Next.js 15** full-stack AI application with:
- **Frontend**: React 19, Tailwind CSS v4, shadcn/ui components
- **Backend**: Convex (real-time database and serverless functions)
- **AI Framework**: Convex Agent, RAG, Workflows
- **LLM Provider**: OpenAI (default), supports Anthropic, Google
- **Authentication**: Clerk (with Convex integration)
- **Payments**: Polar (subscription management)
- **Email**: Resend (transactional emails)
- **Analytics**: PostHog + AI usage tracking
- **Documentation**: Mintlify

### Project Structure
```
/
├── src/                    # Next.js application
│   ├── app/               # App Router pages and API routes
│   ├── components/        # React components
│   │   └── ai/           # AI-specific components
│   ├── hooks/            # Custom React hooks
│   │   └── ai/           # AI-specific hooks
│   └── lib/              # Utilities and configuration
├── convex/                # Backend functions and schema
│   ├── _generated/       # Auto-generated Convex files
│   ├── ai/               # AI functionality
│   │   ├── agents/       # AI agent definitions
│   │   ├── tools/        # Custom AI tools
│   │   ├── workflows/    # Multi-step AI workflows
│   │   ├── chat.ts       # Chat endpoints
│   │   ├── knowledge.ts  # RAG implementation
│   │   ├── rateLimiting.ts # AI rate limits
│   │   └── usage.ts      # Usage tracking
│   ├── schema.ts         # Database schema
│   ├── auth.config.ts    # Clerk authentication setup
│   └── *.ts              # Other Convex functions
├── docs/                  # Mintlify documentation
└── public/               # Static assets
```

### Key Architectural Decisions

1. **Convex Backend**: All backend logic lives in the `convex/` directory. Functions are automatically deployed and accessible through type-safe APIs.

2. **AI Architecture**:
   - Agents defined with specific purposes (support, assistant)
   - RAG for knowledge base with user-specific namespaces
   - Workflows for complex multi-step operations
   - Rate limiting to control costs and prevent abuse
   - Usage tracking for billing and analytics

3. **Authentication Flow**: 
   - Clerk handles user authentication
   - Convex syncs with Clerk via webhooks
   - User data stored in `users` table with `clerkUser` field
   - AI features require authentication

4. **Payment Integration**:
   - Polar manages subscriptions
   - Products must be subscription-based with fixed pricing
   - Sync products using `/test-polar` page
   - Webhooks handle subscription updates
   - Consider AI usage in pricing tiers

5. **Real-time Features**: 
   - Convex provides real-time subscriptions for all queries
   - AI responses stream in real-time
   - Message history updates live across all clients

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
- **OpenAI**: `OPENAI_API_KEY` (required for AI features)

Optional AI configuration:
- `AI_CHAT_MODEL`: Override default chat model (default: gpt-4o-mini)
- `AI_EMBEDDING_MODEL`: Override embedding model (default: text-embedding-3-small)
- `AI_MESSAGE_RATE_LIMIT`: Messages per minute (default: 10)
- `AI_TOKEN_DAILY_LIMIT`: Tokens per day per user (default: 50000)

## Development Workflow

1. **Initial Setup**:
   ```bash
   # Link to Vercel (for Vercel Toolbar)
   vercel link
   ```

2. **Start Development** (in separate terminals):
   ```bash
   # Terminal 1
   npm run dev           # Next.js dev server
   
   # Terminal 2
   npx convex dev       # Convex dev server
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

### Adding a New AI Agent
1. Create agent file in `convex/ai/agents/`
2. Define agent with specific instructions and tools
3. Configure model, embedding, and usage tracking
4. Export for use in chat endpoints

Example:
```typescript
export const customAgent = new Agent(components.agent, {
  name: "Custom Agent",
  chat: getChatModel(),
  instructions: "Specific instructions...",
  tools: { /* custom tools */ },
  usageHandler,
});
```

### Creating AI Tools
1. Create tool in `convex/ai/tools/`
2. Use `createTool` for Convex context access
3. Define clear descriptions and argument schemas
4. Handle errors gracefully

### Implementing AI Chat
1. Create thread with agent type
2. Send messages with rate limit checks
3. Handle streaming responses
4. Display with `useThreadMessages` hook

### Adding to Knowledge Base
1. Upload documents via `ai.knowledge.addDocument`
2. Documents are chunked and embedded automatically
3. Search with `ai.knowledge.search`
4. User-specific namespaces for isolation

### Working with Authentication
- Check authentication state with Clerk hooks
- User data synced to Convex `users` table
- Protected routes handled by Clerk middleware
- AI features require authenticated users

### Implementing Payments
- Products must be created in Polar dashboard first
- Use subscription products with fixed pricing only
- Sync products using the `/test-polar` page
- Handle subscription webhooks in `convex/polar.ts`
- Consider AI usage limits per pricing tier