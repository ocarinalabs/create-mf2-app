"use node";

import { openai } from "@ai-sdk/openai";
import { action } from "../_generated/server";

// Default models for different use cases
// Can be overridden with environment variables

export const getChatModel = () => {
  const model = process.env.AI_CHAT_MODEL || "gpt-4o-mini";
  return openai.chat(model);
};

export const getTextEmbeddingModel = () => {
  const model = process.env.AI_EMBEDDING_MODEL || "text-embedding-3-small";
  return openai.embedding(model);
};

// Get embedding dimension based on model
export const getEmbeddingDimension = () => {
  const model = process.env.AI_EMBEDDING_MODEL || "text-embedding-3-small";
  switch (model) {
    case "text-embedding-3-small":
      return 1536;
    case "text-embedding-3-large":
      return 3072;
    case "text-embedding-ada-002":
      return 1536;
    default:
      return 1536;
  }
};

// Test models configuration
export const testModels = action({
  args: {},
  handler: async () => {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY not configured");
    }

    try {
      const chat = getChatModel();
      const embedding = getTextEmbeddingModel();
      
      return {
        success: true,
        chatModel: process.env.AI_CHAT_MODEL || "gpt-4o-mini",
        embeddingModel: process.env.AI_EMBEDDING_MODEL || "text-embedding-3-small",
        embeddingDimension: getEmbeddingDimension(),
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  },
});