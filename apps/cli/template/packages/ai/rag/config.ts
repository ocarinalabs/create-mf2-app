import { z } from "zod";

export const rewriteConfigSchema = z.object({
  enabled: z.boolean().default(false),
  model: z.string().optional(),
});

export const stepBackConfigSchema = z.object({
  enabled: z.boolean().default(false),
  model: z.string().optional(),
});

export const decomposeConfigSchema = z.object({
  enabled: z.boolean().default(false),
  model: z.string().optional(),
  maxSubQueries: z.number().min(2).max(6).default(3),
});

export const rrfConfigSchema = z.object({
  enabled: z.boolean().default(true),
  semanticWeight: z.number().min(0).max(1).default(0.6),
  keywordWeight: z.number().min(0).max(1).default(0.4),
  k: z.number().min(1).default(60),
  overFetch: z.number().min(1).default(2),
});

export const rerankConfigSchema = z.object({
  enabled: z.boolean().default(false),
  model: z.string().optional(),
  topK: z.number().min(1).default(10),
});

export const pipelineConfigSchema = z.object({
  limit: z.number().min(1).default(10),
  preprocess: z
    .object({
      rewrite: rewriteConfigSchema,
      stepBack: stepBackConfigSchema,
      decompose: decomposeConfigSchema,
    })
    .default({
      rewrite: { enabled: false },
      stepBack: { enabled: false },
      decompose: { enabled: false, maxSubQueries: 3 },
    }),
  retrieval: z
    .object({
      rrf: rrfConfigSchema,
      rerank: rerankConfigSchema,
    })
    .default({
      rrf: {
        enabled: true,
        semanticWeight: 0.6,
        keywordWeight: 0.4,
        k: 60,
        overFetch: 2,
      },
      rerank: { enabled: false, topK: 10 },
    }),
});

export type PipelineConfig = z.infer<typeof pipelineConfigSchema>;
export type RewriteConfig = z.infer<typeof rewriteConfigSchema>;
export type StepBackConfig = z.infer<typeof stepBackConfigSchema>;
export type DecomposeConfig = z.infer<typeof decomposeConfigSchema>;
export type RrfConfig = z.infer<typeof rrfConfigSchema>;
export type RerankConfig = z.infer<typeof rerankConfigSchema>;

const defaultRrf = {
  enabled: true,
  semanticWeight: 0.6,
  keywordWeight: 0.4,
  k: 60,
  overFetch: 2,
};

const defaultRerank = { enabled: false, topK: 10 };
const defaultDecompose = { enabled: false, maxSubQueries: 3 };

export const presets = {
  baseline: {
    preprocess: {
      rewrite: { enabled: false },
      stepBack: { enabled: false },
      decompose: { ...defaultDecompose, enabled: false },
    },
    retrieval: {
      rrf: { ...defaultRrf, enabled: true },
      rerank: { ...defaultRerank, enabled: false },
    },
  },
  withRewrite: {
    preprocess: {
      rewrite: { enabled: true },
      stepBack: { enabled: false },
      decompose: { ...defaultDecompose, enabled: false },
    },
    retrieval: {
      rrf: { ...defaultRrf, enabled: true },
      rerank: { ...defaultRerank, enabled: false },
    },
  },
  withStepBack: {
    preprocess: {
      rewrite: { enabled: false },
      stepBack: { enabled: true },
      decompose: { ...defaultDecompose, enabled: false },
    },
    retrieval: {
      rrf: { ...defaultRrf, enabled: true },
      rerank: { ...defaultRerank, enabled: false },
    },
  },
  withDecompose: {
    preprocess: {
      rewrite: { enabled: false },
      stepBack: { enabled: false },
      decompose: { ...defaultDecompose, enabled: true },
    },
    retrieval: {
      rrf: { ...defaultRrf, enabled: true },
      rerank: { ...defaultRerank, enabled: false },
    },
  },
  full: {
    preprocess: {
      rewrite: { enabled: true },
      stepBack: { enabled: true },
      decompose: { ...defaultDecompose, enabled: false },
    },
    retrieval: {
      rrf: { ...defaultRrf, enabled: true },
      rerank: { ...defaultRerank, enabled: true },
    },
  },
} satisfies Record<string, Partial<PipelineConfig>>;
