// See the docs at https://docs.convex.dev/agents/playground
import { definePlaygroundAPI } from "@convex-dev/agent-playground";
import { components } from "./_generated/api";
import { assistantAgent } from "./ai/agents/assistant";
import { supportAgent } from "./ai/agents/support";

/**
 * Here we expose the API so the frontend can access it.
 * Authorization is handled by passing up an apiKey that can be generated
 * on the dashboard or via CLI via:
 * ```
 * npx convex run --component agent apiKeys:issue
 * ```
 */
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  agents: async (ctx, { userId, threadId }) => [
    assistantAgent,
    supportAgent,
  ],
});