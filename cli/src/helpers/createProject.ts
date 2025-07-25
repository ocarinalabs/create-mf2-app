import fs from "fs/promises";
import path from "path";
import { logger } from "../utils/logger.js";
import ora from "ora";

interface CreateProjectOptions {
  projectName: string;
  platform: string;
  needsBackend: boolean;
}

export async function createProject(
  options: CreateProjectOptions
): Promise<string> {
  const { projectName, needsBackend } = options;
  const projectDir = path.join(process.cwd(), projectName);

  const spinner = ora("Creating project directory...").start();

  try {
    // Check if directory already exists
    try {
      await fs.access(projectDir);
      spinner.fail(`Directory ${projectName} already exists`);
      throw new Error(`Directory ${projectName} already exists`);
    } catch {
      // Directory doesn't exist, which is what we want
    }

    // Create project directory
    await fs.mkdir(projectDir, { recursive: true });

    // Copy template files
    spinner.text = "Copying template files...";
    const templateName = needsBackend ? "base-fullstack" : "base-frontend";
    // Use Node.js __dirname which is available in CommonJS
    // When bundled by tsup, this will be cli/dist/, so we go up one level
    const templateDir = path.join(__dirname, "..", "templates", templateName);

    // Copy all files from template to project directory
    await copyTemplate(templateDir, projectDir);

    // Update package.json with project name
    await updatePackageJson(projectDir, projectName);

    spinner.succeed("Project created successfully");

    return projectDir;
  } catch (error) {
    spinner.fail("Failed to create project");
    throw error;
  }
}

async function copyTemplate(templateDir: string, projectDir: string) {
  const files = await fs.readdir(templateDir, { withFileTypes: true });

  for (const file of files) {
    const srcPath = path.join(templateDir, file.name);
    const destPath = path.join(projectDir, file.name);

    if (file.isDirectory()) {
      await fs.mkdir(destPath, { recursive: true });
      await copyTemplate(srcPath, destPath); // Recursively copy subdirectories
    } else {
      // Skip .DS_Store and other system files
      if (
        file.name.startsWith(".") &&
        file.name !== ".env.example" &&
        file.name !== ".gitignore"
      ) {
        continue;
      }
      await fs.copyFile(srcPath, destPath);
    }
  }
}

async function updatePackageJson(projectDir: string, projectName: string) {
  const packageJsonPath = path.join(projectDir, "package.json");
  const packageJson = JSON.parse(await fs.readFile(packageJsonPath, "utf-8"));

  packageJson.name = projectName;

  await fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));
}
