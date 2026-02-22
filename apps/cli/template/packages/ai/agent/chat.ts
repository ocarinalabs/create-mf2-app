import type { ProviderOptions } from "@ai-sdk/provider-utils";
import type { ToolSet } from "ai";
import { ToolLoopAgent } from "ai";
import { gateway } from "../gateway";
import {
  anthropicThinkingOptions,
  DEFAULT_CHAT_MODEL,
  getModelProviderOptions,
  googleThinkingOptions,
  openaiThinkingOptions,
} from "../models";
import { type PromptParams, SYSTEM_PROMPT } from "../prompts/system";

function getProviderOptions(modelId: string): ProviderOptions {
  const { only, zeroDataRetention } = getModelProviderOptions(modelId);
  const gatewayOptions = { only, zeroDataRetention };

  if (modelId.startsWith("anthropic/")) {
    return { gateway: gatewayOptions, anthropic: anthropicThinkingOptions };
  }
  if (modelId.startsWith("openai/")) {
    return { gateway: gatewayOptions, openai: openaiThinkingOptions };
  }
  if (modelId.startsWith("google/")) {
    return { gateway: gatewayOptions, google: googleThinkingOptions };
  }

  return { gateway: gatewayOptions };
}

export const createChatAgent = (
  context: string | { token: string; orgId?: string },
  tools: ToolSet,
  modelId?: string,
  promptParams?: PromptParams
) => {
  const model = modelId ?? DEFAULT_CHAT_MODEL;
  return new ToolLoopAgent({
    model: gateway(model),
    instructions: SYSTEM_PROMPT(promptParams),
    tools,
    experimental_context: context,
    providerOptions: getProviderOptions(model),
  });
};
