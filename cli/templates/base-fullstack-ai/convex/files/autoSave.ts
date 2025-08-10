import { v } from "convex/values";
import { action } from "../_generated/server";
import { agent } from "../agents/simple";

export const askAboutImage = action({
  args: {
    prompt: v.string(),
    image: v.bytes(),
    mimeType: v.string(),
  },
  handler: async (ctx, { prompt, image, mimeType }) => {
    const { thread, threadId } = await agent.createThread(ctx, {});
    const result = await thread.generateText({
      prompt,
      messages: [
        {
          role: "user",
          content: [
            { type: "image", image, mimeType },
            { type: "text", text: prompt },
          ],
        },
      ],
    });
    return { threadId, result: result.text };
  },
});
