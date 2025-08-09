// See the docs at https://docs.convex.dev/agents/debugging
import { RawRequestResponseHandler } from "@convex-dev/agent";

export const rawRequestResponseHandler: RawRequestResponseHandler = async (
  ctx,
  { request, response, agentName, threadId, userId },
) => {
  // Logging it here, to look up in the logs.
  // Note: really long requests & responses may end up truncated.
  console.log({
    name: "rawRequestResponseHandler event",
    agentName,
    threadId,
    userId,
    request,
    response,
  });
};
