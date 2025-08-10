import { Agent, createTool } from "@convex-dev/agent";
import { components } from "../_generated/api";
import { z } from "zod";
import { usageHandler } from "../usage_tracking/usageHandler";
import { chat, textEmbedding } from "../models";

export const fashionAgent = new Agent(components.agent, {
  name: "Fashion Agent",
  chat,
  instructions:
    "You give fashion advice for a place a user is visiting, based on the weather.",
  tools: {
    getUserPreferences: createTool({
      description: "Get clothing preferences for a user",
      args: z.object({
        search: z.string().describe("Which preferences are requested"),
      }),
      handler: async (ctx, args) => {
        console.log("getting user preferences", args);
        return {
          userId: ctx.userId,
          threadId: ctx.threadId,
          search: args.search,
          information: `The user likes to look stylish`,
        };
      },
    }),
  },
  maxSteps: 5,
  textEmbedding,
  usageHandler,
});
