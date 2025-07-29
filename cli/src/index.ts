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

  const { projectName, platform, needsBackend, git, install } = await runCli();

  const projectDir = await createProject({
    projectName,
    platform,
    needsBackend,
  });

  const pkgManager = getPkgManager();

  if (install) {
    await installDependencies({ projectDir, pkgManager });
  }

  if (git) {
    await initializeGit(projectDir);
  }

  logger.success(`\nDone!\n`);

  logger.info(`cd ${projectName}`);

  if (!install) {
    logger.info(`${pkgManager} install`);
  }

  if (needsBackend) {
    logger.info(`cp .env.example .env.local`);
    logger.info(`${pkgManager} run dev`);
    logger.info(`npx convex dev`);
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
