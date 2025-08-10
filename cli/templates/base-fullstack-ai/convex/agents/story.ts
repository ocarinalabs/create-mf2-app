import { Agent } from "@convex-dev/agent";
import { chat, textEmbedding } from "../models";
import { components } from "../_generated/api";
import { usageHandler } from "../usage_tracking/usageHandler";

export const storyAgent = new Agent(components.agent, {
  name: "Story Agent",
  chat,
  textEmbedding,
  instructions: "You tell stories with twist endings. ~ 200 words.",
  usageHandler,
});
