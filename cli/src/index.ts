#!/usr/bin/env node
import { runCli } from "./cli.js";
import { createProject } from "./helpers/createProject.js";
import { installDependencies } from "./helpers/installDependencies.js";
import { initializeGit } from "./helpers/git.js";
import { setupDocs } from "./helpers/setupDocs.js";
import { logger } from "./utils/logger.js";
import { renderTitle } from "./utils/renderTitle.js";
import { getPkgManager } from "./utils/getPkgManager.js";

async function main() {
  renderTitle();

  const { projectName, platform, template, git, install, docs } = await runCli();

  const projectDir = await createProject({
    projectName,
    platform,
    template,
  });

  const pkgManager = getPkgManager();

  if (install) {
    await installDependencies({ projectDir, pkgManager });
  }

  if (git) {
    await initializeGit(projectDir);
  }

  if (docs) {
    await setupDocs(projectDir);
  }

  logger.success(`\nDone!\n`);

  if (projectName !== ".") {
    logger.info(`cd ${projectName}`);
  }

  const isBackendTemplate = template === "fullstack" || template === "fullstack-ai";

  if (!install) {
    if (isBackendTemplate) {
      logger.info(`${pkgManager} run install:all`);
    } else {
      logger.info(`${pkgManager} install`);
    }
  }

  if (isBackendTemplate) {
    logger.info(`cp .env.example .env.local`);
    
    if (template === "fullstack-ai") {
      logger.info(`\nSet up AI features:`);
      logger.info(`npx convex env set OPENAI_API_KEY "your-api-key"`);
      logger.info(`See AI_SETUP.md for detailed configuration`);
    }
    
    logger.info(`\nRun in separate terminals:`);
    logger.info(`1. ${pkgManager} run dev`);
    logger.info(`2. npx convex dev`);
  } else {
    logger.info(`${pkgManager} run dev`);
  }

  logger.info("\nMove F*cking Fast.");

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
