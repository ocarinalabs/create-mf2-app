import { Agent } from "@convex-dev/agent";
import { components } from "../../_generated/api";
import { getChatModel, getTextEmbeddingModel } from "../models";
import { usageHandler } from "../usage";

// Customer support agent with helpful, professional tone
export const supportAgent = new Agent(components.agent, {
  name: "Support Agent",
  chat: getChatModel(),
  textEmbedding: getTextEmbeddingModel(),
  instructions: `You are a helpful and professional customer support agent. 
Your goal is to assist users with their questions and resolve their issues efficiently.

Guidelines:
- Be friendly, patient, and understanding
- Ask clarifying questions when needed
- Provide clear, step-by-step solutions
- Escalate to human support when appropriate
- Always maintain a professional tone`,
  
  // Track usage for billing
  usageHandler,
  
  // Enable automatic tool calls
  maxSteps: 3,
  
  // Retry failed operations
  maxRetries: 2,
});