# @repo/ai

Multi-model AI gateway, agents, and RAG pipelines with the Vercel AI SDK.

## Usage

```ts
import { gateway } from "@repo/ai/gateway";
import { CLAUDE_SONNET, DEFAULT_CHAT_MODEL } from "@repo/ai/models";
import { createChatAgent } from "@repo/ai/agent";
import { SYSTEM_PROMPT } from "@repo/ai/prompts";
import { createPipeline } from "@repo/ai/rag";
```

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

## RAG Pipeline

The RAG pipeline is provider-agnostic. Implement the `Retriever` interface:

```ts
import { createPipeline, type Retriever } from "@repo/ai/rag";

const retriever: Retriever = {
  semanticSearch: async (query, limit) => { /* ... */ },
  keywordSearch: async (query, limit) => { /* ... */ },
};

const pipeline = createPipeline({ retriever, config: presets.baseline });
const results = await pipeline.execute("search query");
```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `AI_GATEWAY_API_KEY` | Yes | Vercel AI Gateway key |
| `AI_GATEWAY_URL` | No | Gateway URL, defaults to https://ai-gateway.vercel.sh/v3 |
| `COHERE_API_KEY` | No | For reranking |
| `PERPLEXITY_API_KEY` | No | For web search tool |

## Docs

[mf2.dev/docs/packages/ai](https://mf2.dev/docs/packages/ai)
