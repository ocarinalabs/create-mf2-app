import { Agent } from "@convex-dev/agent";
import { components } from "../../_generated/api";
import { getChatModel, getTextEmbeddingModel } from "../models";
import { usageHandler } from "../usage";

// General purpose assistant agent
export const assistantAgent = new Agent(components.agent, {
  name: "Assistant",
  chat: getChatModel(),
  textEmbedding: getTextEmbeddingModel(),
  instructions: `You are a helpful AI assistant. You can help with a wide variety of tasks.

Capabilities:
- Answer questions on various topics
- Help with analysis and research
- Assist with writing and editing
- Provide explanations and tutorials
- Generate creative content

Always be helpful, accurate, and concise in your responses.`,
  
  // Track usage for billing
  usageHandler,
  
  // Enable automatic tool calls
  maxSteps: 5,
  
  // Retry failed operations
  maxRetries: 2,
  
  // Context configuration for better responses
  contextOptions: {
    recentMessages: 50,
    searchOptions: {
      limit: 10,
      textSearch: true,
      vectorSearch: true,
    },
  },
});