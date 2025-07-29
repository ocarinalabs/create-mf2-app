import fs from "fs/promises";
import path from "path";

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

  const ora = (await import("ora")).default;
  const spinner = ora("Creating project directory...").start();

  try {
    try {
      await fs.access(projectDir);
      spinner.fail(`Directory ${projectName} already exists`);
      throw new Error(`Directory ${projectName} already exists`);
    } catch {}

    await fs.mkdir(projectDir, { recursive: true });

    spinner.text = "Copying template files...";
    const templateName = needsBackend ? "base-fullstack" : "base-frontend";
    // Use Node.js __dirname which is available in CommonJS
    // When bundled by tsup, this will be cli/dist/, so we go up one level
    const templateDir = path.join(__dirname, "..", "templates", templateName);

    await copyTemplate(templateDir, projectDir);

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

    // Skip node_modules directory
    if (file.name === "node_modules") {
      continue;
    }

    if (file.isDirectory()) {
      await fs.mkdir(destPath, { recursive: true });
      await copyTemplate(srcPath, destPath);
    } else {
      // Skip .DS_Store, package-lock.json and other system files
      if (
        (file.name.startsWith(".") &&
          file.name !== ".env.example" &&
          file.name !== ".gitignore") ||
        file.name === "package-lock.json"
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
