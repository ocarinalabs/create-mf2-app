import { perplexitySearch } from "@perplexity-ai/ai-sdk";
import { keys } from "../keys";

let searchTool: ReturnType<typeof perplexitySearch> | null = null;

export function getSearchTool(): ReturnType<typeof perplexitySearch> | null {
  if (!searchTool) {
    const { PERPLEXITY_API_KEY } = keys();
    if (!PERPLEXITY_API_KEY) {
      return null;
    }
    searchTool = perplexitySearch({ apiKey: PERPLEXITY_API_KEY });
  }
  return searchTool;
}
