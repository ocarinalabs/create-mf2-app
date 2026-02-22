export function precisionAtK(
  retrievedIds: string[],
  relevantIds: Set<string>,
  k: number
): number {
  if (k <= 0) {
    return 0;
  }
  const topK = retrievedIds.slice(0, k);
  if (topK.length === 0) {
    return 0;
  }

  let relevant = 0;
  for (const id of topK) {
    if (relevantIds.has(id)) {
      relevant++;
    }
  }
  return relevant / topK.length;
}

export function recallAtK(
  retrievedIds: string[],
  relevantIds: Set<string>,
  k: number
): number {
  if (relevantIds.size === 0) {
    return 1;
  }
  if (k <= 0) {
    return 0;
  }

  const topK = retrievedIds.slice(0, k);
  let relevant = 0;
  for (const id of topK) {
    if (relevantIds.has(id)) {
      relevant++;
    }
  }
  return relevant / relevantIds.size;
}

export function reciprocalRank(
  retrievedIds: string[],
  relevantIds: Set<string>
): number {
  for (let i = 0; i < retrievedIds.length; i++) {
    if (relevantIds.has(retrievedIds[i])) {
      return 1 / (i + 1);
    }
  }
  return 0;
}

export function ndcgAtK(
  retrievedIds: string[],
  relevantIds: Set<string>,
  k: number
): number {
  if (relevantIds.size === 0) {
    return 1;
  }
  if (k <= 0) {
    return 0;
  }

  let dcgScore = 0;
  const limit = Math.min(k, retrievedIds.length);
  for (let i = 0; i < limit; i++) {
    const relevance = relevantIds.has(retrievedIds[i]) ? 1 : 0;
    dcgScore += relevance / Math.log2(i + 2);
  }

  let idcgScore = 0;
  const idealLimit = Math.min(k, relevantIds.size);
  for (let i = 0; i < idealLimit; i++) {
    idcgScore += 1 / Math.log2(i + 2);
  }

  if (idcgScore === 0) {
    return 0;
  }
  return dcgScore / idcgScore;
}
