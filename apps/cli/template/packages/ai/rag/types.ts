import type { FusionSource } from "./retrieval/rrf";

export type PipelineChunk = {
  id: string;
  content: string;
  score: number;
  sources?: FusionSource[];
  metadata?: Record<string, unknown>;
};

export type PipelineContext = {
  originalQuery: string;
  query: string;
  subQueries?: string[];
  stepBackQuery?: string;
  chunks: PipelineChunk[];
  timing: Map<string, number>;
};

export type StageResult = {
  context: PipelineContext;
  skipped: boolean;
  durationMs: number;
};

export type PipelineStage<TConfig = unknown> = {
  id: string;
  name: string;
  category: "preprocess" | "retrieval" | "postprocess";
  execute: (context: PipelineContext, config: TConfig) => Promise<StageResult>;
};

export type Retriever = {
  semanticSearch: (query: string, limit: number) => Promise<PipelineChunk[]>;
  keywordSearch: (query: string, limit: number) => Promise<PipelineChunk[]>;
};

export type PipelineResult = {
  chunks: PipelineChunk[];
  originalQuery: string;
  queriesUsed: string[];
  totalDurationMs: number;
  stageTiming: Record<string, number>;
  stageStatus: Record<string, "executed" | "skipped" | "disabled">;
};
