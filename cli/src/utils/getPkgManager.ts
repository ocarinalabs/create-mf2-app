export type PackageManager = "npm" | "yarn" | "pnpm" | "bun";

export function getPkgManager(): PackageManager {
  // Check npm_config_user_agent to detect which package manager is being used
  const userAgent = process.env.npm_config_user_agent;

  if (userAgent) {
    if (userAgent.startsWith("yarn")) {
      return "yarn";
    } else if (userAgent.startsWith("pnpm")) {
      return "pnpm";
    } else if (userAgent.startsWith("bun")) {
      return "bun";
    }
  }

  // Default to npm
  return "npm";
}
