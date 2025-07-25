#!/usr/bin/env node
import { runCli } from "./cli.js";
import { createProject } from "./helpers/createProject.js";
import { installDependencies } from "./helpers/installDependencies.js";
import { initializeGit } from "./helpers/git.js";
import { logger } from "./utils/logger.js";
import { renderTitle } from "./utils/renderTitle.js";
import { getPkgManager } from "./utils/getPkgManager.js";

async function main() {
  renderTitle();

  // Get user choices
  const { projectName, platform, needsBackend, git } = await runCli();

  // Start creating immediately

  // Create project
  const projectDir = await createProject({
    projectName,
    platform,
    needsBackend,
  });

  // Install dependencies
  const pkgManager = getPkgManager();
  await installDependencies({ projectDir, pkgManager });

  // Initialize git if requested
  if (git) {
    await initializeGit(projectDir);
  }

  // Success message
  logger.success(`\nDone!\n`);

  logger.info(`cd ${projectName}`);
  if (needsBackend) {
    logger.info(`cp .env.example .env.local`);
    logger.info(`npm run dev`);
    logger.info(`npx convex dev`);
  } else {
    logger.info(`npm run dev`);
  }

  logger.info("\nShip fast.");

  process.exit(0);
}

main().catch((err) => {
  logger.error("\nAborting installation...");
  if (err instanceof Error) {
    logger.error(err.message);
  } else {
    logger.error("An unknown error occurred");
    console.error(err);
  }
  process.exit(1);
});
