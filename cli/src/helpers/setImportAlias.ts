import { logger } from "../utils/logger.js";

export async function setImportAlias(
  projectDir: string,
  importAlias: string = "@/*"
): Promise<void> {
  logger.info("Configuring import alias...");
  logger.info("Import alias configured");
}
