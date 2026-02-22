import { generateText, Output } from "ai";
import { z } from "zod";
import { gateway } from "../../../gateway";
import { GEMINI_FLASH } from "../../../models";
import { DECOMPOSE_PROMPT } from "../../../prompts/rag";
import type { DecomposeConfig } from "../../config";
import type { PipelineContext, PipelineStage, StageResult } from "../../types";

const createDecomposeSchema = (maxSubQueries: number) =>
  z.object({
    subQueries: z.array(z.string()).min(1).max(maxSubQueries),
    shouldDecompose: z.boolean(),
  });

export function createDecomposeStage(): PipelineStage<DecomposeConfig> {
  return {
    id: "decompose",
    name: "Sub-Query Decomposition",
    category: "preprocess",

    async execute(
      context: PipelineContext,
      config: DecomposeConfig
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
        output: Output.object({
          schema: createDecomposeSchema(config.maxSubQueries),
        }),
        prompt: DECOMPOSE_PROMPT(context.query, config.maxSubQueries),
      });

      if (!output.shouldDecompose || output.subQueries.length <= 1) {
        return {
          context,
          skipped: true,
          durationMs: performance.now() - startTime,
        };
      }

      return {
        context: {
          ...context,
          subQueries: output.subQueries,
        },
        skipped: false,
        durationMs: performance.now() - startTime,
      };
    },
  };
}
