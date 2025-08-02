import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export function useRateLimit() {
  const status = useQuery(api.ai.chat.getRateLimitStatus);

  const isMessageLimited = status?.messages?.remaining === 0;
  const isTokenLimited = status?.tokens?.remaining === 0;
  const isLimited = isMessageLimited || isTokenLimited;

  const getRetryAfter = () => {
    if (isMessageLimited && status?.messages?.retryAfter) {
      return status.messages.retryAfter;
    }
    if (isTokenLimited && status?.tokens?.retryAfter) {
      return status.tokens.retryAfter;
    }
    return null;
  };

  const formatRetryTime = (ms: number) => {
    const seconds = Math.ceil(ms / 1000);
    if (seconds < 60) return `${seconds} seconds`;

    const minutes = Math.ceil(seconds / 60);
    if (minutes < 60) return `${minutes} minutes`;

    const hours = Math.ceil(minutes / 60);
    return `${hours} hours`;
  };

  return {
    status,
    isLimited,
    isMessageLimited,
    isTokenLimited,
    retryAfter: getRetryAfter(),
    formatRetryTime,
  };
}
