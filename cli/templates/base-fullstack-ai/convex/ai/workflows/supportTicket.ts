import { WorkflowManager } from "@convex-dev/workflow";
import { v } from "convex/values";
import { action } from "../../_generated/server";
import { components, internal } from "../../_generated/api";
import { supportAgent } from "../agents/support";
import { assistantAgent } from "../agents/assistant";
import { z } from "zod";

const workflow = new WorkflowManager(components.workflow);

// Support ticket workflow - analyze issue, search knowledge base, generate response
export const supportTicketWorkflow = workflow.define({
  args: {
    userId: v.string(),
    issue: v.string(),
    threadId: v.string(),
  },
  handler: async (step, { userId, issue, threadId }): Promise<{
    category: string;
    solution: string;
    requiresHuman: boolean;
  }> => {
    // Step 1: Analyze the issue
    const analysis = await step.runAction(
      internal.ai.workflows.supportTicket.analyzeIssue,
      { issue, threadId }
    );
    
    // Step 2: Search knowledge base for solutions
    const knowledgeSearch = await step.runAction(
      internal.ai.workflows.supportTicket.searchForSolution,
      { 
        category: analysis.category,
        keywords: analysis.keywords,
        userId,
      }
    );
    
    // Step 3: Generate comprehensive response
    const response = await step.runAction(
      internal.ai.workflows.supportTicket.generateResponse,
      {
        issue,
        analysis,
        knowledgeContext: knowledgeSearch,
        threadId,
      }
    );
    
    return response;
  },
});

// Analyze issue to categorize and extract keywords
export const analyzeIssue = assistantAgent.asObjectAction({
  schema: z.object({
    category: z.enum(["billing", "technical", "account", "feature", "other"]),
    keywords: z.array(z.string()).describe("Key terms for searching"),
    severity: z.enum(["low", "medium", "high"]),
    summary: z.string().describe("Brief summary of the issue"),
  }),
});

// Search for solutions in knowledge base
export const searchForSolution = action({
  args: {
    category: v.string(),
    keywords: v.array(v.string()),
    userId: v.string(),
  },
  handler: async (ctx, { category, keywords, userId }) => {
    const { rag } = await import("../knowledge");
    
    // Build search query from keywords
    const query = `${category} ${keywords.join(" ")}`;
    
    try {
      const results = await rag.search(ctx, {
        namespace: userId,
        query,
        limit: 5,
      });
      
      return results.text || "No relevant documentation found.";
    } catch (error) {
      console.error("Knowledge search failed:", error);
      return "Unable to search knowledge base.";
    }
  },
});

// Generate final response
export const generateResponse = supportAgent.asObjectAction({
  schema: z.object({
    solution: z.string().describe("Detailed solution to the issue"),
    requiresHuman: z.boolean().describe("Whether human intervention is needed"),
    category: z.string(),
  }),
});