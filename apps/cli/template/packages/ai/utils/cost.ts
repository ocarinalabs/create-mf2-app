import { AI_GATEWAY_URL } from "../gateway";

const BACKOFF_MULTIPLIER = 1.5;

type GenerationData = {
  id: string;
  total_cost: number;
  usage: number;
  created_at: string;
  model: string;
  is_byok: boolean;
  provider_name: string;
  streamed: boolean;
  latency: number;
  generation_time: number;
  tokens_prompt: number;
  tokens_completion: number;
  native_tokens_prompt: number;
  native_tokens_completion: number;
  native_tokens_reasoning: number;
  native_tokens_cached: number;
};

type CreditsData = {
  balance: string;
  total_used: string;
};

type BatchCostResult = {
  totalCost: number;
  generations: GenerationData[];
  failed: string[];
};

const fetchGenerationCost = async (
  generationId: string
): Promise<GenerationData | null> => {
  const apiKey = process.env.AI_GATEWAY_API_KEY;
  if (!apiKey) {
    return null;
  }

  try {
    const response = await fetch(
      `${AI_GATEWAY_URL}/generation?id=${encodeURIComponent(generationId)}`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      return null;
    }

    const { data } = (await response.json()) as { data: GenerationData };
    return data;
  } catch {
    return null;
  }
};

const fetchCredits = async (): Promise<CreditsData | null> => {
  const apiKey = process.env.AI_GATEWAY_API_KEY;
  if (!apiKey) {
    return null;
  }

  try {
    const response = await fetch(`${AI_GATEWAY_URL}/credits`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return null;
    }

    return (await response.json()) as CreditsData;
  } catch {
    return null;
  }
};

const fetchAllGenerationCosts = async (
  genIds: string[],
  options?: {
    maxAttempts?: number;
    initialDelayMs?: number;
    maxDelayMs?: number;
  }
): Promise<BatchCostResult> => {
  const {
    maxAttempts = 20,
    initialDelayMs = 5000,
    maxDelayMs = 30_000,
  } = options ?? {};

  const results: GenerationData[] = [];
  const failed: string[] = [];

  for (const id of genIds) {
    let data: GenerationData | null = null;
    let delay = initialDelayMs;

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      data = await fetchGenerationCost(id);
      if (data) {
        break;
      }
      await new Promise((r) => setTimeout(r, delay));
      delay = Math.min(delay * BACKOFF_MULTIPLIER, maxDelayMs);
    }

    if (data) {
      results.push(data);
    } else {
      failed.push(id);
    }
  }

  return {
    totalCost: results.reduce((sum, g) => sum + g.total_cost, 0),
    generations: results,
    failed,
  };
};

const createUsageTracker = () => {
  const generationIds: string[] = [];

  const onStepFinish = ({
    providerMetadata,
  }: {
    providerMetadata?: Record<string, Record<string, unknown>>;
  }) => {
    const genId = providerMetadata?.gateway?.generationId;
    if (typeof genId === "string" && !generationIds.includes(genId)) {
      generationIds.push(genId);
    }
  };

  const getGenerationIds = () => [...generationIds];

  const clear = () => {
    generationIds.length = 0;
  };

  return { onStepFinish, getGenerationIds, clear };
};

export {
  fetchGenerationCost,
  fetchAllGenerationCosts,
  fetchCredits,
  createUsageTracker,
};
export type { GenerationData, CreditsData, BatchCostResult };
