import { generateText, Output } from "ai";
import { z } from "zod";
import { gateway } from "../../../gateway";
import { GEMINI_FLASH } from "../../../models";
import { STEP_BACK_PROMPT } from "../../../prompts/rag";
import type { StepBackConfig } from "../../config";
import type { PipelineContext, PipelineStage, StageResult } from "../../types";

const stepBackSchema = z.object({
  stepBackQuery: z.string(),
});

export function createStepBackStage(): PipelineStage<StepBackConfig> {
  return {
    id: "stepBack",
    name: "Step-Back Prompting",
    category: "preprocess",

    async execute(
      context: PipelineContext,
      config: StepBackConfig
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
        output: Output.object({ schema: stepBackSchema }),
        prompt: STEP_BACK_PROMPT(context.query),
      });

      return {
        context: {
          ...context,
          stepBackQuery: output.stepBackQuery,
        },
        skipped: false,
        durationMs: performance.now() - startTime,
      };
    },
  };
}
