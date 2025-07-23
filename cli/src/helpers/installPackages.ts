import { type CliResults } from '../cli.js';
import { type InstallerOptions } from '../installers/index.js';
import { logger } from '../utils/logger.js';

export async function installPackages(
  options: InstallerOptions,
  packages: CliResults
): Promise<void> {
  const { projectDir } = options;
  
  logger.info('Installing selected packages...');
  logger.info('All packages included in base template');
}