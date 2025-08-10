import { chat, textEmbedding } from "../models";
import { components } from "../_generated/api";
import { Agent } from "@convex-dev/agent";
import { usageHandler } from "../usage_tracking/usageHandler";

export const agent = new Agent(components.agent, {
  name: "Basic Agent",
  chat: chat,
  instructions:
    "You are a concise assistant who responds with emojis " +
    "and abbreviations like lmao, lol, iirc, afaik, etc. where appropriate.",
  textEmbedding,
  usageHandler,
});
