import { copyFile, mkdir, rm } from "node:fs/promises";
import { join } from "node:path";
import {
  cancel,
  intro,
  isCancel,
  log,
  outro,
  select,
  spinner,
  text,
} from "@clack/prompts";
import {
  addWorkspacesField,
  convertAllWorkspaceDeps,
  copyDirectory,
  devOnlyFiles,
  envFiles,
  getTemplatePath,
  run,
  supportedPackageManagers,
  updatePackageJson,
  updatePackageManager,
} from "./utils.js";

const getName = async (): Promise<string> => {
  const value = await text({
    message: "What is your project named?",
    placeholder: "my-app",
    validate(value) {
      if (!value || value.length === 0) {
        return "Please enter a project name.";
      }
    },
  });

  if (isCancel(value)) {
    cancel("Operation cancelled.");
    process.exit(0);
  }

  return value.toString();
};

const getPackageManager = async (): Promise<string> => {
  const value = await select({
    message: "Which package manager would you like to use?",
    options: supportedPackageManagers.map((choice) => ({
      value: choice,
      label: choice,
    })),
    initialValue: "bun",
  });

  if (isCancel(value)) {
    cancel("Operation cancelled.");
    process.exit(0);
  }

  return value.toString();
};

const setupEnvironmentVariables = async (projectDir: string): Promise<void> => {
  for (const { source, target } of envFiles) {
    const examplePath = join(projectDir, source, ".env.example");
    const targetPath = join(projectDir, source, target);

    try {
      await copyFile(examplePath, targetPath);
    } catch {
      // .env.example doesn't exist for this path, skip
    }
  }
};

const stripDevOnlyFiles = async (projectDir: string): Promise<void> => {
  for (const file of devOnlyFiles) {
    await rm(join(projectDir, file), { recursive: true, force: true });
  }
};

const installDependencies = async (packageManager: string): Promise<void> => {
  const args = packageManager === "npm" ? " install --force" : " install";
  await run(`${packageManager}${args}`, { stdio: "inherit" });
};

const setupConvex = async (packageManager: string): Promise<void> => {
  try {
    const filterCommand = packageManager === "npm" ? "--workspace" : "--filter";
    const command = [
      packageManager,
      "run",
      "build",
      filterCommand,
      "@repo/backend",
    ].join(" ");

    await run(command);
  } catch {
    // Convex codegen may fail if not configured yet, that's OK
  }
};

const initGitRepo = async (): Promise<void> => {
  await run("git init");
};

const commitGitRepo = async (): Promise<void> => {
  await run("git add .");
  await run('LEFTHOOK=0 git commit -m "feat(create-mf2-app): init"');
};

export const initialize = async (options: {
  name?: string;
  packageManager?: string;
  disableGit?: boolean;
}): Promise<void> => {
  try {
    intro("Let's move fawking fast");

    const cwd = process.cwd();
    const name = options.name ?? (await getName());
    const packageManager =
      options.packageManager ?? (await getPackageManager());

    if (!supportedPackageManagers.includes(packageManager)) {
      throw new Error(
        `Invalid package manager: ${packageManager}. Supported: ${supportedPackageManagers.join(", ")}`
      );
    }

    const projectDir = join(cwd, name);
    const templatePath = getTemplatePath();
    const s = spinner();

    s.start("Copying template...");
    await mkdir(projectDir, { recursive: true });
    await copyDirectory(templatePath, projectDir);

    s.message("Configuring project...");
    await updatePackageJson(projectDir, name);

    process.chdir(projectDir);

    if (packageManager !== "bun") {
      s.message("Updating package manager configuration...");
      await updatePackageManager(projectDir, packageManager);
      await convertAllWorkspaceDeps(projectDir);

      if (packageManager !== "pnpm") {
        await addWorkspacesField(projectDir);
      }

      // Remove bun-specific files
      await rm(join(projectDir, "bunfig.toml"), { force: true });
    }

    // Remove pnpm files if not using pnpm
    if (packageManager !== "pnpm") {
      await rm(join(projectDir, "pnpm-lock.yaml"), { force: true });
      await rm(join(projectDir, "pnpm-workspace.yaml"), { force: true });
    }

    s.message("Setting up environment variables...");
    await setupEnvironmentVariables(projectDir);

    s.message("Removing dev-only files...");
    await stripDevOnlyFiles(projectDir);

    // Git init before install so lefthook's prepare script works
    s.message("Initializing Git repository...");
    await initGitRepo();

    s.stop("Configuration complete!");
    log.step("Installing dependencies...");
    await installDependencies(packageManager);

    s.start("Setting up Convex...");
    await setupConvex(packageManager);

    if (options.disableGit) {
      // Remove git repo if user doesn't want it
      await rm(join(projectDir, ".git"), { recursive: true, force: true });
    } else {
      s.message("Creating initial commit...");
      await commitGitRepo();
    }

    s.stop("Project created successfully!");

    const pm = packageManager === "bun" ? "bun" : packageManager;
    log.info(`Next steps:
  cd ${name}
  Fill in your .env.local files with your API keys
  ${pm} run dev

When ready to deploy:
  Fill in .env.production files with production keys
  ${pm} run env:push`);

    outro("Go forth and conquer");
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : `Failed to create project: ${error}`;

    log.error(message);
    process.exit(1);
  }
};
