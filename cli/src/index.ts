#!/usr/bin/env node
import { runCli } from './cli.js';
import { createProject } from './helpers/createProject.js';
import { installDependencies } from './helpers/installDependencies.js';
import { initializeGit } from './helpers/git.js';
import { logger } from './utils/logger.js';
import { renderTitle } from './utils/renderTitle.js';
import { getPkgManager } from './utils/getPkgManager.js';

async function main() {
  renderTitle();
  
  // Get all user choices (even if we ignore some for MVP)
  const {
    projectName,
    platform,
    backend,
    payments,
    typescript,
    styling
  } = await runCli();
  
  // For MVP, we always use the same stack
  logger.info('\n📦 Creating your startup with:');
  logger.info('✓ Next.js 14 (App Router)');
  logger.info('✓ Supabase (Database + Auth)');
  logger.info('✓ Stripe (Payments)');
  logger.info('✓ Tailwind CSS');
  logger.info('✓ TypeScript\n');
  
  // Create project
  const projectDir = await createProject({ 
    projectName,
    // Pass choices for future use
    platform,
    backend,
    payments 
  });
  
  // Install dependencies
  const pkgManager = getPkgManager();
  await installDependencies({ projectDir, pkgManager });
  
  // Initialize git
  await initializeGit(projectDir);
  
  // Success message
  logger.success(`\n✅ Your MF² startup is ready!\n`);
  logger.info(`📁 Project: ${projectName}`);
  logger.info(`🚀 Stack: Next.js + Supabase + Stripe\n`);
  logger.info('Next steps:');
  logger.info(`1. cd ${projectName}`);
  logger.info('2. npm run dev');
  logger.info('3. Ship fast, learn faster!\n');
  
  process.exit(0);
}

main().catch((err) => {
  logger.error('\nAborting installation...');
  if (err instanceof Error) {
    logger.error(err.message);
  } else {
    logger.error('An unknown error occurred');
    console.error(err);
  }
  process.exit(1);
});