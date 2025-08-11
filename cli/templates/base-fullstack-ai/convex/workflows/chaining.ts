import { WorkflowId, WorkflowManager } from "@convex-dev/workflow";
import { createThread } from "@convex-dev/agent";
import { components, internal } from "../_generated/api";
import { action, mutation, internalMutation } from "../_generated/server";
import { v } from "convex/values";
import { z } from "zod";
import { weatherAgent } from "../agents/weather";
import { fashionAgent } from "../agents/fashion";
import { getAuthUserIdAsString } from "../utils";

export const getAdvice = action({
  args: { location: v.string(), threadId: v.string() },
  handler: async (ctx, { location, threadId }) => {
    const userId = await getAuthUserIdAsString(ctx);

    await weatherAgent.generateText(
      ctx,
      { threadId, userId },
      { prompt: `What is the weather in ${location}?` }
    );

    await fashionAgent.generateText(
      ctx,
      { threadId, userId },
      { prompt: `What should I wear based on the weather?` }
    );
  },
});

const workflow = new WorkflowManager(components.workflow);

export const saveMessageInternal = internalMutation({
  args: {
    threadId: v.string(),
    prompt: v.string(),
    userId: v.optional(v.id("users")),
  },
  handler: async (ctx, { threadId, prompt, userId }) => {
    const result = await weatherAgent.saveMessage(ctx, {
      threadId,
      userId,
      prompt,
    });
    return result;
  },
});

export const weatherAgentWorkflow = workflow.define({
  args: { location: v.string(), threadId: v.string() },
  handler: async (step, { location, threadId }): Promise<void> => {
    const weatherQ = await step.runMutation(
      internal.workflows.chaining.saveMessageInternal,
      {
        threadId,
        prompt: `What is the weather in ${location}?`,
      }
    );
    const forecast = await step.runAction(
      internal.workflows.chaining.getForecast,
      { promptMessageId: weatherQ.messageId, threadId },
      { retry: true }
    );
    const fashionQ = await step.runMutation(
      internal.workflows.chaining.saveMessageInternal,
      {
        threadId,
        prompt: `What should I wear based on the weather?`,
      }
    );
    const fashion = await step.runAction(
      internal.workflows.chaining.getFashionAdvice,
      { promptMessageId: fashionQ.messageId, threadId },
      {
        retry: { maxAttempts: 5, initialBackoffMs: 1000, base: 2 },
      }
    );
    console.log("Weather forecast:", forecast);
    console.log("Fashion advice:", fashion.object);
  },
});

export const startWorkflow = mutation({
  args: { location: v.string() },
  handler: async (
    ctx,
    { location }
  ): Promise<{ threadId: string; workflowId: WorkflowId }> => {
    const userId = await getAuthUserIdAsString(ctx);
    const threadId = await createThread(ctx, components.agent, {
      userId,
      title: `Weather in ${location}`,
    });
    const workflowId = await workflow.start(
      ctx,
      internal.workflows.chaining.weatherAgentWorkflow,
      { location, threadId }
    );
    return { threadId, workflowId };
  },
});

export const getForecast = weatherAgent.asTextAction({
  maxSteps: 3,
});
export const getFashionAdvice = fashionAgent.asObjectAction({
  schema: z.object({
    hat: z.string(),
    tops: z.string(),
    bottoms: z.string(),
    shoes: z.string(),
  }),
});
