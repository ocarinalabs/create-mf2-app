export function rrfScore(rank: number, k = 60): number {
  return 1 / (k + rank);
}

export type RankedItem = {
  id: string;
  [key: string]: unknown;
};

export type FusionWeights = {
  semantic: number;
  keyword: number;
};

export type FusionOptions = {
  weights?: FusionWeights;
  k?: number;
};

export type FusionSource = "semantic" | "keyword";

export type FusedResult = {
  score: number;
  sources: FusionSource[];
};

export function fuseResults<T extends RankedItem>(
  semanticResults: T[],
  keywordResults: T[],
  options: FusionOptions = {}
): Array<T & FusedResult> {
  const { weights = { semantic: 0.6, keyword: 0.4 }, k = 60 } = options;

  const scoreMap = new Map<
    string,
    { item: T; score: number; sources: FusionSource[] }
  >();

  for (const [rank, item] of semanticResults.entries()) {
    scoreMap.set(item.id, {
      item,
      score: weights.semantic * rrfScore(rank, k),
      sources: ["semantic"],
    });
  }

  for (const [rank, item] of keywordResults.entries()) {
    const existing = scoreMap.get(item.id);

    if (existing) {
      existing.score += weights.keyword * rrfScore(rank, k);
      existing.sources.push("keyword");
    } else {
      scoreMap.set(item.id, {
        item,
        score: weights.keyword * rrfScore(rank, k),
        sources: ["keyword"],
      });
    }
  }

  return Array.from(scoreMap.values())
    .sort((a, b) => b.score - a.score)
    .map(({ item, score, sources }) => ({ ...item, score, sources }));
}

export function takeTop<T>(results: T[], limit: number): T[] {
  return results.slice(0, limit);
}
