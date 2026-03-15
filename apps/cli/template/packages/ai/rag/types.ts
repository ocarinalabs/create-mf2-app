import type { FusionSource } from "./retrieval/rrf";

export type PipelineChunk = {
  content: string;
  id: string;
  metadata?: Record<string, unknown>;
  score: number;
  sources?: FusionSource[];
};

export type PipelineContext = {
  chunks: PipelineChunk[];
  originalQuery: string;
  query: string;
  stepBackQuery?: string;
  subQueries?: string[];
  timing: Map<string, number>;
};

export type StageResult = {
  context: PipelineContext;
  durationMs: number;
  skipped: boolean;
};

export type PipelineStage<TConfig = unknown> = {
  category: "preprocess" | "retrieval" | "postprocess";
  execute: (context: PipelineContext, config: TConfig) => Promise<StageResult>;
  id: string;
  name: string;
};

export type Retriever = {
  keywordSearch: (query: string, limit: number) => Promise<PipelineChunk[]>;
  semanticSearch: (query: string, limit: number) => Promise<PipelineChunk[]>;
};

export type PipelineResult = {
  chunks: PipelineChunk[];
  originalQuery: string;
  queriesUsed: string[];
  stageStatus: Record<string, "executed" | "skipped" | "disabled">;
  stageTiming: Record<string, number>;
  totalDurationMs: number;
};
