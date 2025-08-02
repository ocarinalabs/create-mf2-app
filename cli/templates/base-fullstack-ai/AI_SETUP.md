# AI Setup Guide

This guide covers everything you need to know about setting up and using the AI features in this template.

## Quick Start

### 1. Get API Keys

You'll need at least one AI provider API key:

- **OpenAI** (recommended): [platform.openai.com](https://platform.openai.com)
- **Anthropic** (optional): [console.anthropic.com](https://console.anthropic.com)
- **Google AI** (optional): [makersuite.google.com](https://makersuite.google.com)

### 2. Configure Environment

Set your API keys in Convex:

```bash
# Required
npx convex env set OPENAI_API_KEY "sk-..."

# Optional - for different models
npx convex env set AI_CHAT_MODEL "gpt-4o-mini"
npx convex env set AI_EMBEDDING_MODEL "text-embedding-3-small"

# Optional - rate limits (defaults shown)
npx convex env set AI_MESSAGE_RATE_LIMIT "10"      # per minute
npx convex env set AI_TOKEN_DAILY_LIMIT "50000"    # per day
```

### 3. Test Your Setup

```bash
# Test models configuration
npx convex run ai:models:testModels

# Test AI chat
# Visit http://localhost:3000/ai/chat
```

## Features Overview

### AI Agents

Two pre-configured agents are included:

1. **Assistant Agent** (`/ai/chat`)
   - General purpose AI assistant
   - Helpful for various tasks
   - Access to knowledge base search

2. **Support Agent** (`/ai/support`)
   - Customer support focused
   - Professional tone
   - Escalation to human support

### Rate Limiting

Protects against abuse and controls costs:

- **Message limits**: 10 messages/minute per user
- **Token limits**: 50k tokens/day per user
- **Document uploads**: 100/day per user
- **Knowledge searches**: 30/minute per user

Customize in `convex/ai/rateLimiting.ts`.

### Usage Tracking

All AI usage is tracked for billing:

- Token usage per model
- Cost estimation
- Monthly billing periods
- Per-user attribution

View usage at `/ai/usage` (admin only).

### Knowledge Base (RAG)

Upload documents for AI to reference:

- User-specific namespaces
- Vector search with embeddings
- Automatic chunking
- Category filtering

## Cost Management

### Model Selection

Default models are optimized for cost:

| Use Case | Model | Cost/1K tokens |
|----------|-------|----------------|
| Chat | gpt-4o-mini | $0.00015 |
| Embeddings | text-embedding-3-small | $0.00002 |

### Cost Control Tips

1. **Use cheaper models in development**
   ```bash
   npx convex env set AI_CHAT_MODEL "gpt-3.5-turbo"
   ```

2. **Set aggressive rate limits**
   ```bash
   npx convex env set AI_TOKEN_DAILY_LIMIT "10000"
   ```

3. **Monitor usage regularly**
   - Check `/ai/usage` dashboard
   - Set up billing alerts
   - Review monthly invoices

4. **Implement prepaid credits**
   - Users purchase token credits
   - Deduct from balance on usage
   - Block when balance is zero

## Advanced Configuration

### Custom Agents

Create new agents in `convex/ai/agents/`:

```typescript
export const customAgent = new Agent(components.agent, {
  name: "Custom Agent",
  chat: getChatModel(),
  instructions: "Your custom instructions",
  tools: {
    // Add custom tools
  },
  maxSteps: 5,
  contextOptions: {
    recentMessages: 100,
  },
});
```

### Custom Tools

Add tools in `convex/ai/tools/`:

```typescript
export const customTool = createTool({
  description: "Tool description",
  args: z.object({
    param: z.string(),
  }),
  handler: async (ctx, args) => {
    // Tool logic
    return "Result";
  },
});
```

### Workflows

Complex multi-step operations in `convex/ai/workflows/`:

```typescript
export const customWorkflow = workflow.define({
  args: { /* ... */ },
  handler: async (step, args) => {
    // Step 1
    const result1 = await step.runAction(/* ... */);
    
    // Step 2
    const result2 = await step.runAction(/* ... */);
    
    return { result1, result2 };
  },
});
```

## Security Considerations

### API Key Security

- Never commit API keys to version control
- Use environment variables only
- Rotate keys regularly
- Use separate keys for dev/prod

### User Data

- Messages are stored in Convex database
- User-specific namespaces for RAG
- No data sent to AI providers beyond prompts
- Consider data retention policies

### Rate Limiting

- Prevents abuse and DoS attacks
- Controls costs from malicious users
- Implement IP-based limits if needed
- Monitor for unusual patterns

## Troubleshooting

### Common Issues

1. **"Rate limit exceeded" errors**
   - Wait for limit to reset
   - Increase limits if needed
   - Check usage dashboard

2. **"Not authenticated" errors**
   - Ensure user is logged in
   - Check Clerk configuration
   - Verify auth middleware

3. **High costs**
   - Switch to cheaper models
   - Reduce rate limits
   - Implement prepaid system
   - Monitor usage patterns

### Debug Mode

Enable debug logging:

```typescript
// In convex/ai/agents/assistant.ts
export const assistantAgent = new Agent(components.agent, {
  // ... other config
  rawRequestResponseHandler: async (ctx, { request, response }) => {
    console.log("AI Request:", request);
    console.log("AI Response:", response);
  },
});
```

## Best Practices

### Prompt Engineering

1. **Be specific in agent instructions**
2. **Use system prompts effectively**
3. **Provide examples when possible**
4. **Test with different models**

### Context Management

1. **Limit context window size**
2. **Use RAG for large knowledge bases**
3. **Implement message pruning**
4. **Cache frequently used context**

### Error Handling

1. **Graceful degradation**
2. **User-friendly error messages**
3. **Retry with exponential backoff**
4. **Fallback to simpler models**

## Deployment

### Production Checklist

- [ ] Set production API keys
- [ ] Configure appropriate rate limits
- [ ] Enable usage tracking
- [ ] Set up monitoring alerts
- [ ] Test failover strategies
- [ ] Document support procedures
- [ ] Train support team on AI features

### Monitoring

Monitor these metrics:

- Token usage per user
- Error rates by model
- Response times
- Rate limit hits
- Cost per user
- User satisfaction

## Agent Playground

The Agent Playground provides a visual interface for testing and debugging your AI agents without writing code.

### Features

- **Thread Management**: Browse and manage conversation threads
- **Message Analysis**: Inspect message details and tool calls
- **Context Testing**: Experiment with different context options
- **Real-time Updates**: See changes as they happen

### Setup

1. **Generate an API Key**:
   ```bash
   npx convex run --component agent apiKeys:issue '{"name":"playground"}'
   ```

2. **Access the Playground**:
   
   **Option A: Hosted Version**
   - Visit https://get-convex.github.io/agent/play
   - Enter your deployment URL (from `.env.local`)
   - Enter your API key
   
   **Option B: Local Version**
   ```bash
   npx @convex-dev/agent-playground
   ```

3. **Start Testing**:
   - Select a user to view their threads
   - Browse messages and tool calls
   - Send test messages to threads
   - Adjust context options

### API Key Management

- Generate multiple keys with different names
- Revoke a key by reissuing with the same name
- Keep keys secure - they provide full access to the playground API

### In-App Access

Visit `/ai/playground` in your app for detailed setup instructions and quick access to the playground.

## Next Steps

1. **Customize agents** for your use case
2. **Build domain-specific tools**
3. **Upload knowledge base content**
4. **Set up billing integration**
5. **Create custom workflows**
6. **Train support team**

For more information, see:
- [Convex Agent Docs](https://docs.convex.dev/agents)
- [AI SDK Documentation](https://sdk.vercel.ai/docs)
- [OpenAI Best Practices](https://platform.openai.com/docs/guides/best-practices)