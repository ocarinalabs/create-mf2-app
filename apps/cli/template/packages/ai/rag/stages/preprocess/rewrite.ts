import { generateText, Output } from "ai";
import { z } from "zod";
import { gateway } from "../../../gateway";
import { GEMINI_FLASH } from "../../../models";
import { REWRITE_PROMPT } from "../../../prompts/rag";
import type { RewriteConfig } from "../../config";
import type { PipelineContext, PipelineStage, StageResult } from "../../types";

const rewriteSchema = z.object({
  rewrittenQuery: z.string(),
});

export function createRewriteStage(): PipelineStage<RewriteConfig> {
  return {
    id: "rewrite",
    name: "Query Rewrite",
    category: "preprocess",

    async execute(
      context: PipelineContext,
      config: RewriteConfig
    ): Promise<StageResult> {
      const startTime = performance.now();

      if (!config.enabled) {
        return {
          context,
          skipped: true,
          durationMs: performance.now() - startTime,
        };
      }

      const model = config.model ?? GEMINI_FLASH;

      const { output } = await generateText({
        model: gateway(model),
        output: Output.object({ schema: rewriteSchema }),
        prompt: REWRITE_PROMPT(context.query),
      });

      return {
        context: {
          ...context,
          query: output.rewrittenQuery,
        },
        skipped: false,
        durationMs: performance.now() - startTime,
      };
    },
  };
}
