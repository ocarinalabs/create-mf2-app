import { OssStats } from "@erquhart/convex-oss-stats";
import { components } from "./_generated/api";

export const ossStats = new OssStats(components.ossStats, {
  githubOwners: ["korrect-ai"],
  githubRepos: ["korrect-ai/create-mf2-app"],
});

export const { sync, clearAndSync, getGithubOwner, getGithubRepo } =
  ossStats.api();
