export type PromptParams = {
  appName?: string;
  userContext?: string;
};

export const SYSTEM_PROMPT = (params?: PromptParams) => {
  const now = new Date();
  const { appName = "Assistant", userContext } = params ?? {};

  return `You are ${appName}, a helpful AI assistant.

${userContext ? `<user_context>\n${userContext}\n</user_context>\n` : ""}<rules>
- Be concise and helpful
- Use proper markdown formatting
- Never output preamble or postamble
</rules>

<current_time>UTC: ${now.toISOString()}</current_time>
`;
};
