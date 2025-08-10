import fs from "fs/promises";
import path from "path";

interface CreateProjectOptions {
  projectName: string;
  platform: string;
  template: string;
}

export async function createProject(
  options: CreateProjectOptions
): Promise<string> {
  const { projectName, template } = options;
  const isCurrentDir = projectName === ".";
  const projectDir = isCurrentDir
    ? process.cwd()
    : path.join(process.cwd(), projectName);
  const actualProjectName = isCurrentDir
    ? path.basename(process.cwd())
    : projectName;

  const ora = (await import("ora")).default;
  const spinner = ora(
    isCurrentDir
      ? "Setting up in current directory..."
      : "Creating project directory..."
  ).start();

  try {
    if (isCurrentDir) {
      // Check if current directory is empty (allow .git and common hidden files)
      const files = await fs.readdir(projectDir);
      const nonHiddenFiles = files.filter(
        (file) =>
          !file.startsWith(".") &&
          file !== "node_modules" &&
          file !== ".DS_Store"
      );

      if (nonHiddenFiles.length > 0) {
        spinner.fail("Current directory is not empty");
        throw new Error(
          "Current directory is not empty. Please run this command in an empty directory."
        );
      }
    } else {
      // Check if directory already exists
      try {
        await fs.access(projectDir);
        spinner.fail(`Directory ${projectName} already exists`);
        throw new Error(`Directory ${projectName} already exists`);
      } catch {}

      await fs.mkdir(projectDir, { recursive: true });
    }

    spinner.text = "Copying template files...";
    const templateName =
      template === "frontend"
        ? "base-frontend"
        : template === "fullstack"
        ? "base-fullstack"
        : "base-fullstack-ai";
    const templateDir = path.join(__dirname, "..", "templates", templateName);

    await copyTemplate(templateDir, projectDir);

    await updatePackageJson(projectDir, actualProjectName);

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

  const npmName = projectName
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-._]/g, "")
    .replace(/^[._]/, "")
    .replace(/^-+/, "")
    .replace(/-+$/, "");

  packageJson.name = npmName || "my-app";

  await fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));
}
