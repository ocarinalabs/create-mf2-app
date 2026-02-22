/**
 * Hello World Tool
 *
 * A simple example tool demonstrating the tool creation pattern.
 * Use this as a reference when creating your own tools.
 *
 * Tool Pattern:
 * 1. Import `tool` from "ai" and `z` from "zod"
 * 2. Define input schema with Zod
 * 3. Implement execute function
 * 4. Access state via experimental_context if needed
 */

type BaseState = { step?: number };

import { tool } from "ai";
import { z } from "zod";

/**
 * Demonstrates:
 * - Basic tool structure
 * - Zod input validation
 * - Accessing state via experimental_context
 * - Returning structured output
 */
const helloTool = tool({
  description:
    "A simple hello world tool. Use this to greet someone and see the current simulation step.",
  inputSchema: z.object({
    name: z.string().describe("The name to greet"),
    enthusiastic: z
      .boolean()
      .optional()
      .default(false)
      .describe("Add extra enthusiasm to the greeting"),
  }),
  strict: true,
  execute: ({ name, enthusiastic }, { experimental_context }) => {
    const state = experimental_context as BaseState | undefined;
    const currentStep = state?.step ?? "unknown";

    const greeting = enthusiastic
      ? `Hello, ${name}! Great to meet you!`
      : `Hello, ${name}.`;

    return {
      message: greeting,
      step: currentStep,
      timestamp: new Date().toISOString(),
    };
  },
});

export { helloTool };
