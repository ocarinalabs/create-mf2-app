import { cohere } from "@ai-sdk/cohere";
import { rerank } from "ai";
import { COHERE_RERANK } from "../../models";

export type RerankableItem = {
  id: string;
  content: string;
  score?: number;
};
export type RerankOptions = {
  topK?: number;
  model?: string;
};

export async function rerankItems<T extends RerankableItem>(
  query: string,
  items: T[],
  options: RerankOptions = {}
): Promise<Array<T & { rerankScore: number }>> {
  const { topK = 5, model = COHERE_RERANK } = options;

  if (items.length === 0) {
    return [];
  }

  if (items.length <= topK) {
    return items.map((item, i) => ({
      ...item,
      rerankScore: item.score ?? 1 - (i / items.length) * 0.5,
    }));
  }

  const { ranking } = await rerank({
    model: cohere.reranking(model),
    documents: items.map((item) => item.content),
    query,
    topN: topK,
  });

  return ranking.map((r) => ({
    ...items[r.originalIndex],
    rerankScore: r.score,
  }));
}
