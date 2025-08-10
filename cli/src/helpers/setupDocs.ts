import { execSync } from "child_process";
import { existsSync, rmSync } from "fs";
import { join } from "path";
import { logger } from "../utils/logger.js";

export async function setupDocs(projectDir: string) {
  const docsDir = join(projectDir, "docs");

  // Check if docs directory already exists
  if (existsSync(docsDir)) {
    logger.warn(
      "Docs directory already exists, skipping documentation setup..."
    );
    return false;
  }

  try {
    logger.info("Setting up Mintlify documentation...");

    // Clone Mintlify starter with shallow clone
    execSync(
      `git clone --depth 1 https://github.com/mintlify/starter.git docs`,
      {
        cwd: projectDir,
        stdio: "pipe",
      }
    );

    // Remove .git directory to prevent nested git repos
    rmSync(join(docsDir, ".git"), { recursive: true, force: true });

    logger.success("Documentation setup complete!");
    logger.info("Run 'npm run docs' to start the documentation server");

    return true;
  } catch (error) {
    logger.error("Failed to setup documentation:", error);

    // Clean up on failure
    if (existsSync(docsDir)) {
      rmSync(docsDir, { recursive: true, force: true });
    }

    return false;
  }
}
