export const REWRITE_PROMPT = (
  query: string
) => `Rewrite this search query to improve retrieval results.

Your rewrite should:
- Expand abbreviations and acronyms
- Add synonyms for key terms
- Fix typos and spelling errors
- Make implicit context explicit

Original query: "${query}"

Return the best rewritten query that would find the most relevant results.`;

export const STEP_BACK_PROMPT = (
  query: string
) => `Given this specific search query, generate a more general "step-back" question.

The step-back question should:
- Abstract away from specific details
- Ask about the broader concept or principle
- Help retrieve foundational context

Original query: "${query}"

Example:
- Original: "How to fix the login button not working on mobile Safari?"
- Step-back: "What causes JavaScript interaction issues on mobile browsers?"

Generate one step-back question.`;

export const DECOMPOSE_PROMPT = (
  query: string,
  maxSubQueries: number
) => `Break down this complex search query into simpler sub-queries.

Each sub-query should:
- Focus on a single aspect of the original question
- Be self-contained and searchable
- Together cover all aspects of the original query

Original query: "${query}"

Generate up to ${maxSubQueries} sub-queries. Only decompose if the query is complex enough to benefit.
If the query is already simple, return just the original query.`;
