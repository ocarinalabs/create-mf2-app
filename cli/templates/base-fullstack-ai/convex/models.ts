// import { openrouter } from "@openrouter/ai-sdk-provider";
import type { EmbeddingModel } from "ai";
import { LanguageModelV1 } from "ai";
import { openai } from "@ai-sdk/openai";
// import { groq } from "@ai-sdk/groq";

let chat: LanguageModelV1;
let textEmbedding: EmbeddingModel<string>;

// Support multiple LLM providers with fallback
if (process.env.OPENAI_API_KEY) {
  // Use environment variables for model configuration with defaults
  const chatModel = process.env.AI_CHAT_MODEL || "gpt-4o-mini";
  const embeddingModel = process.env.AI_EMBEDDING_MODEL || "text-embedding-3-small";
  
  chat = openai.chat(chatModel);
  textEmbedding = openai.textEmbeddingModel(embeddingModel);
// } else if (process.env.GROQ_API_KEY) {
//   chat = groq.languageModel("llama-3.1-70b-versatile");
//   // Note: Groq doesn't provide embedding models, so we need OpenAI for embeddings
//   if (!process.env.OPENAI_API_KEY) {
//     throw new Error(
//       "When using GROQ_API_KEY, you also need OPENAI_API_KEY for embeddings. Run `npx convex env set OPENAI_API_KEY=<your-api-key>` to set it.",
//     );
//   }
//   textEmbedding = openai.textEmbeddingModel("text-embedding-3-small");
// } else if (process.env.OPENROUTER_API_KEY) {
//   chat = openrouter.chat("openai/gpt-4o-mini");
//   // Note: OpenRouter doesn't provide embedding models, so we need OpenAI for embeddings
//   if (!process.env.OPENAI_API_KEY) {
//     throw new Error(
//       "When using OPENROUTER_API_KEY, you also need OPENAI_API_KEY for embeddings. Run `npx convex env set OPENAI_API_KEY=<your-api-key>` to set it.",
//     );
//   }
//   textEmbedding = openai.textEmbeddingModel("text-embedding-3-small");
} else {
  throw new Error(
    "No API key found. Run the following command to set an API key:\n" +
    "  `npx convex env set OPENAI_API_KEY=<your-api-key>`",
    // "  `npx convex env set GROQ_API_KEY=<your-api-key>` (also requires OPENAI_API_KEY for embeddings)\n" +
    // "  `npx convex env set OPENROUTER_API_KEY=<your-api-key>` (also requires OPENAI_API_KEY for embeddings)",
  );
}

// Export configured models
export { chat, textEmbedding };