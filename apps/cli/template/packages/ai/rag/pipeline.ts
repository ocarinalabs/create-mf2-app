import {
  type PipelineConfig,
  pipelineConfigSchema,
  type RerankConfig,
  type RrfConfig,
} from "./config";
import { rerankItems } from "./retrieval/rerank";
import { fuseResults, takeTop } from "./retrieval/rrf";
import { createDecomposeStage } from "./stages/preprocess/decompose";
import { createRewriteStage } from "./stages/preprocess/rewrite";
import { createStepBackStage } from "./stages/preprocess/stepback";
import type {
  PipelineChunk,
  PipelineContext,
  PipelineResult,
  PipelineStage,
  Retriever,
} from "./types";

export type CreatePipelineOptions = {
  config?: Partial<PipelineConfig>;
  retriever: Retriever;
};

type StageStatus = Record<string, "executed" | "skipped" | "disabled">;

function collectQueriesUsed(context: PipelineContext): string[] {
  const queries = [context.originalQuery];
  if (context.query !== context.originalQuery) {
    queries.push(context.query);
  }
  if (context.subQueries) {
    queries.push(...context.subQueries);
  }
  if (context.stepBackQuery) {
    queries.push(context.stepBackQuery);
  }
  return [...new Set(queries)];
}

function deduplicateChunks(chunks: PipelineChunk[]): PipelineChunk[] {
  const chunkMap = new Map<string, PipelineChunk>();
  for (const chunk of chunks) {
    const existing = chunkMap.get(chunk.id);
    if (!existing || chunk.score > existing.score) {
      chunkMap.set(chunk.id, chunk);
    }
  }
  return Array.from(chunkMap.values()).sort((a, b) => b.score - a.score);
}

async function runRetrieval(
  context: PipelineContext,
  retriever: Retriever,
  rrfConfig: RrfConfig,
  limit: number
): Promise<PipelineChunk[]> {
  const fetchLimit = limit * rrfConfig.overFetch;

  const queriesToSearch = [context.query];
  if (context.stepBackQuery) {
    queriesToSearch.push(context.stepBackQuery);
  }
  if (context.subQueries) {
    queriesToSearch.push(...context.subQueries);
  }

  const allChunks: PipelineChunk[] = [];

  for (const q of queriesToSearch) {
    const [semantic, keyword] = await Promise.all([
      retriever.semanticSearch(q, fetchLimit),
      retriever.keywordSearch(q, fetchLimit),
    ]);

    const fused = fuseResults(semantic, keyword, {
      weights: {
        semantic: rrfConfig.semanticWeight,
        keyword: rrfConfig.keywordWeight,
      },
      k: rrfConfig.k,
    });

    allChunks.push(...fused);
  }

  return deduplicateChunks(allChunks);
}

async function runRerank(
  context: PipelineContext,
  rerankConfig: RerankConfig
): Promise<PipelineChunk[]> {
  const reranked = await rerankItems(
    context.originalQuery,
    context.chunks.map((c) => ({
      id: c.id,
      content: c.content,
      score: c.score,
    })),
    {
      topK: rerankConfig.topK,
      model: rerankConfig.model,
    }
  );

  return reranked.map((r) => ({
    id: r.id,
    content: r.content,
    score: r.rerankScore,
    sources: context.chunks.find((c) => c.id === r.id)?.sources,
  }));
}

export function createPipeline(options: CreatePipelineOptions) {
  const config = pipelineConfigSchema.parse(options.config ?? {});
  const { retriever } = options;

  type PreprocessConfig = RewriteConfig | StepBackConfig | DecomposeConfig;

  const preprocessStages: Array<{
    stage: PipelineStage<PreprocessConfig>;
    config: PreprocessConfig;
  }> = [
    { stage: createRewriteStage(), config: config.preprocess.rewrite },
    { stage: createStepBackStage(), config: config.preprocess.stepBack },
    { stage: createDecomposeStage(), config: config.preprocess.decompose },
  ];

  async function execute(query: string): Promise<PipelineResult> {
    const startTime = performance.now();
    const stageStatus: StageStatus = {};

    let context: PipelineContext = {
      originalQuery: query,
      query,
      chunks: [],
      timing: new Map(),
    };

    for (const entry of preprocessStages) {
      if (!entry.config.enabled) {
        stageStatus[entry.stage.id] = "disabled";
        continue;
      }

      const result = await entry.stage.execute(context, entry.config);
      context = result.context;
      context.timing.set(entry.stage.id, result.durationMs);
      stageStatus[entry.stage.id] = result.skipped ? "skipped" : "executed";
    }

    const rrfConfig = config.retrieval.rrf;
    if (rrfConfig.enabled) {
      const retrievalStart = performance.now();
      context.chunks = await runRetrieval(
        context,
        retriever,
        rrfConfig,
        config.limit
      );
      context.timing.set("rrf", performance.now() - retrievalStart);
      stageStatus.rrf = "executed";
    } else {
      stageStatus.rrf = "disabled";
    }

    const rerankConfig = config.retrieval.rerank;
    if (rerankConfig.enabled && context.chunks.length > 0) {
      const rerankStart = performance.now();
      context.chunks = await runRerank(context, rerankConfig);
      context.timing.set("rerank", performance.now() - rerankStart);
      stageStatus.rerank = "executed";
    } else {
      stageStatus.rerank = rerankConfig.enabled ? "skipped" : "disabled";
    }

    return {
      chunks: takeTop(context.chunks, config.limit),
      originalQuery: context.originalQuery,
      queriesUsed: collectQueriesUsed(context),
      totalDurationMs: performance.now() - startTime,
      stageTiming: Object.fromEntries(context.timing),
      stageStatus,
    };
  }

  return { execute, config };
}
