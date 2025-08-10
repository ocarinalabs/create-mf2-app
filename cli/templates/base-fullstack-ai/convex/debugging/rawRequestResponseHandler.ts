import { RawRequestResponseHandler } from "@convex-dev/agent";

export const rawRequestResponseHandler: RawRequestResponseHandler = async (
  ctx,
  { request, response, agentName, threadId, userId }
) => {
  console.log({
    name: "rawRequestResponseHandler event",
    agentName,
    threadId,
    userId,
    request,
    response,
  });
};
