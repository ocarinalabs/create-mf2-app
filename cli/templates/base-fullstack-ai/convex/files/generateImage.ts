import { createThread, saveMessage } from "@convex-dev/agent";
import { components } from "../_generated/api";
import { internalAction } from "../_generated/server";
import { v } from "convex/values";
import OpenAI from "openai";
import { getAuthUserIdAsString } from "../utils";

export const replyWithImage = internalAction({
  args: {
    prompt: v.string(),
  },
  handler: async (ctx, { prompt }) => {
    const userId = await getAuthUserIdAsString(ctx);
    const threadId = await createThread(ctx, components.agent, {
      userId,
      title: "Image for: " + prompt,
    });
    await saveMessage(ctx, components.agent, { threadId, prompt });

    const provider = "openai";
    const model = "dall-e-2";
    const imgResponse = await new OpenAI().images.generate({
      model,
      prompt,
      size: "256x256",
      response_format: "url",
    });
    const url = imgResponse.data?.[0].url;
    if (!url) {
      throw new Error(
        "No image URL found. Response: " + JSON.stringify(imgResponse)
      );
    }
    console.debug("short-lived url:", url);
    const image = await fetch(url);
    if (!image.ok) {
      throw new Error("Failed to fetch image. " + JSON.stringify(image));
    }
    const mimeType = image.headers.get("content-type")!;
    if (!mimeType) {
      throw new Error(
        "No MIME type found. Response: " + JSON.stringify(image.headers)
      );
    }

    const { message } = await saveMessage(ctx, components.agent, {
      threadId,
      message: {
        role: "assistant",
        content: [
          {
            type: "file",
            data: await image.arrayBuffer(),
            mimeType: image.headers.get("content-type")!,
          },
        ],
      },
      metadata: {
        text: imgResponse.data?.[0].revised_prompt || undefined,
        model,
        provider,
      },
    });
    return { threadId, assistantMessage: message };
  },
});
