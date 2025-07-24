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
  
  // Get user choices
  const {
    projectName,
    platform,
    needsBackend
  } = await runCli();
  
  // Show what we're creating
  logger.info('\n📦 Creating your project with:');
  logger.info('✓ Next.js 15 (App Router)');
  logger.info('✓ TypeScript');
  logger.info('✓ Tailwind CSS + shadcn/ui');
  
  if (needsBackend) {
    logger.info('✓ Convex (Real-time database)');
    logger.info('✓ Clerk (Authentication)');
    logger.info('✓ Polar (Payments)');
    logger.info('✓ Resend (Email)');
  } else {
    logger.info('✓ SEO-ready metadata');
    logger.info('✓ Dark mode support');
    logger.info('✓ Vercel Analytics');
  }
  
  logger.info('\n');
  
  // Create project
  const projectDir = await createProject({ 
    projectName,
    platform,
    needsBackend
  });
  
  // Install dependencies
  const pkgManager = getPkgManager();
  await installDependencies({ projectDir, pkgManager });
  
  // Initialize git
  await initializeGit(projectDir);
  
  // Success message
  logger.success(`\n✅ Your MF² project is ready!\n`);
  logger.info(`📁 Project: ${projectName}`);
  
  if (needsBackend) {
    logger.info(`🚀 Stack: Next.js + Convex + Clerk + Polar\n`);
    logger.info('Next steps:');
    logger.info(`1. cd ${projectName}`);
    logger.info('2. Copy .env.example to .env.local');
    logger.info('3. Add your environment variables');
    logger.info('4. npm run dev');
    logger.info('5. npx convex dev (in another terminal)');
  } else {
    logger.info(`🚀 Stack: Next.js + TypeScript + Tailwind CSS\n`);
    logger.info('Next steps:');
    logger.info(`1. cd ${projectName}`);
    logger.info('2. npm run dev');
  }
  
  logger.info('\n💫 Ship fast, learn faster!\n');
  
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