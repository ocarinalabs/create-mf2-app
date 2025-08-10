import { definePlaygroundAPI } from "@convex-dev/agent-playground";
import { components } from "./_generated/api";
import { weatherAgent } from "./agents/weather";
import { fashionAgent } from "./agents/fashion";
import { storyAgent } from "./agents/story";
import { agent as basicAgent } from "./agents/simple";
import { fileAgent } from "./files/addFile";
import { rateLimitedAgent } from "./rate_limiting/rateLimiting";

export const {
  isApiKeyValid,
  listAgents,
  listUsers,
  listThreads,
  listMessages,
  createThread,
  generateText,
  fetchPromptContext,
} = definePlaygroundAPI(components.agent, {
  agents: async (ctx, { userId, threadId }) => [
    weatherAgent,
    fashionAgent,
    basicAgent,
    storyAgent,
    fileAgent,
    rateLimitedAgent,
  ],
});
