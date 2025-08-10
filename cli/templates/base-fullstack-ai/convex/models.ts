import type { EmbeddingModel } from "ai";
import { LanguageModelV1 } from "ai";
import { openai } from "@ai-sdk/openai";

let chat: LanguageModelV1;
let textEmbedding: EmbeddingModel<string>;

if (process.env.OPENAI_API_KEY) {
  const chatModel = process.env.AI_CHAT_MODEL || "gpt-4o-mini";
  const embeddingModel =
    process.env.AI_EMBEDDING_MODEL || "text-embedding-3-small";

  chat = openai.chat(chatModel);
  textEmbedding = openai.textEmbeddingModel(embeddingModel);
} else {
  throw new Error(
    "No API key found. Run the following command to set an API key:\n" +
      "  `npx convex env set OPENAI_API_KEY=<your-api-key>`"
  );
}

export { chat, textEmbedding };
