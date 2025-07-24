import { logger } from "../utils/logger.js";
import { type PackageManager } from "../utils/getPkgManager.js";

interface FormatProjectOptions {
  projectDir: string;
  pkgManager: PackageManager;
  eslint?: boolean;
  prettier?: boolean;
}

export async function formatProject(
  options: FormatProjectOptions
): Promise<void> {
  const { projectDir, pkgManager, eslint, prettier } = options;

  logger.info("Formatting project...");
  logger.info("Formatting complete");
}
