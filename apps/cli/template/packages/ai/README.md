# @repo/ai

Multi-model AI package using the Vercel AI Gateway.

## Architecture

```
packages/ai/
  gateway/         # AI Gateway wrapper (createGateway, lazy env)
  models/          # Model constants, thinking options, presets
  agent/           # ToolLoopAgent factory (createChatAgent)
  prompts/         # System prompts, title generation, RAG prompts
  rag/             # RAG pipeline (config, stages, retrieval, metrics)
  tools/           # AI tools (Perplexity search, hello example)
  utils/           # Cost tracking via gateway API
  keys.ts          # T3 env validation for AI keys
```

## Exports

Import via subpath exports:

```typescript
import { gateway } from "@repo/ai/gateway";
import { CLAUDE_SONNET, DEFAULT_CHAT_MODEL } from "@repo/ai/models";
import { createChatAgent } from "@repo/ai/agent";
import { SYSTEM_PROMPT } from "@repo/ai/prompts";
import { createPipeline } from "@repo/ai/rag";
```

## Adding a New Model

1. Add the model constant in `models/index.ts`
2. Add an entry to the `CHAT_MODELS` array with its gateway preset
3. The gateway handles routing to the correct provider

## RAG Pipeline

The RAG pipeline is provider-agnostic. Implement the `Retriever` interface:

```typescript
import { createPipeline, type Retriever } from "@repo/ai/rag";

const retriever: Retriever = {
  semanticSearch: async (query, limit) => { /* ... */ },
  keywordSearch: async (query, limit) => { /* ... */ },
};

const pipeline = createPipeline({ retriever, config: presets.baseline });
const results = await pipeline.execute("search query");
```

## Environment Variables

- `AI_GATEWAY_API_KEY` (required) - Vercel AI Gateway key
- `AI_GATEWAY_URL` (optional) - Gateway URL, defaults to https://ai-gateway.vercel.sh/v3
- `COHERE_API_KEY` (optional) - For reranking
- `PERPLEXITY_API_KEY` (optional) - For web search tool
