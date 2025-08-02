import { RateLimiter, MINUTE, SECOND, DAY } from "@convex-dev/rate-limiter";
import { components } from "../_generated/api";

// Rate limiter configuration for AI features
export const aiRateLimiter = new RateLimiter(components.rateLimiter, {
  // Message rate limiting - prevent spam
  sendMessage: {
    kind: "token bucket",
    period: MINUTE,
    rate: process.env.AI_MESSAGE_RATE_LIMIT ? 
      parseInt(process.env.AI_MESSAGE_RATE_LIMIT) : 10, // 10 messages per minute
    capacity: 20, // Allow burst of 20 messages
  },
  
  // Global message limit - stay under API limits
  globalSendMessage: {
    kind: "token bucket",
    period: MINUTE,
    rate: 1000, // 1000 messages per minute globally
  },
  
  // Token usage per user - control costs
  tokenUsagePerUser: {
    kind: "token bucket",
    period: DAY,
    rate: process.env.AI_TOKEN_DAILY_LIMIT ?
      parseInt(process.env.AI_TOKEN_DAILY_LIMIT) : 50000, // 50k tokens per day
    capacity: 100000, // Allow up to 100k tokens accumulated
  },
  
  // Global token usage - API limits
  globalTokenUsage: {
    kind: "token bucket",
    period: MINUTE,
    rate: 1000000, // 1M tokens per minute globally
  },
  
  // Document uploads for RAG
  documentUpload: {
    kind: "fixed window",
    period: DAY,
    rate: 100, // 100 documents per day per user
    capacity: 150,
  },
  
  // Knowledge base searches
  ragSearch: {
    kind: "token bucket",
    period: MINUTE,
    rate: 30, // 30 searches per minute
    capacity: 60,
  },
});

// Helper to check if user can send message
export async function canSendMessage(
  ctx: any,
  userId: string
): Promise<{ allowed: boolean; retryAfter?: number }> {
  try {
    await aiRateLimiter.limit(ctx, "sendMessage", { 
      key: userId, 
      throws: false 
    });
    return { allowed: true };
  } catch (error: any) {
    return {
      allowed: false,
      retryAfter: error.data?.retryAfter || 60000,
    };
  }
}

// Helper to check token allowance
export async function checkTokenAllowance(
  ctx: any,
  userId: string,
  estimatedTokens: number
): Promise<{ allowed: boolean; retryAfter?: number }> {
  try {
    await aiRateLimiter.check(ctx, "tokenUsagePerUser", {
      key: userId,
      count: estimatedTokens,
      throws: false,
    });
    return { allowed: true };
  } catch (error: any) {
    return {
      allowed: false,
      retryAfter: error.data?.retryAfter || 3600000, // 1 hour
    };
  }
}

// Mark tokens as used after generation
export async function consumeTokens(
  ctx: any,
  userId: string,
  tokens: number
): Promise<void> {
  await aiRateLimiter.limit(ctx, "tokenUsagePerUser", {
    key: userId,
    count: tokens,
    reserve: true, // Allow going negative if estimate was too low
  });
  
  // Also consume from global limit
  await aiRateLimiter.limit(ctx, "globalTokenUsage", {
    count: tokens,
    reserve: true,
  });
}