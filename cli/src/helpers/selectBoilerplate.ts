import { logger } from "../utils/logger.js";

export async function selectBoilerplate(platform: string): Promise<string> {
  logger.info("Selecting boilerplate template...");
  return "mf2-stack";
}

export function getTemplatePath(boilerplate: string): string {
  return "web-mf2";
}
