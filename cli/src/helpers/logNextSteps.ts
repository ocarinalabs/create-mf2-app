import { logger } from '../utils/logger.js';
import { type PackageManager } from '../utils/getPkgManager.js';

interface NextStepsOptions {
  projectName: string;
  pkgManager: PackageManager;
}

export function logNextSteps(options: NextStepsOptions): void {
  const { projectName, pkgManager } = options;
  
  logger.info('\nNext steps:');
  logger.info(`  cd ${projectName}`);
  logger.info(`  ${pkgManager}${pkgManager === 'npm' ? ' run' : ''} dev`);
}