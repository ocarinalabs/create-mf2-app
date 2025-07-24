import { execa } from "execa";
import ora from "ora";
import { type PackageManager } from "../utils/getPkgManager.js";

interface InstallDependenciesOptions {
  projectDir: string;
  pkgManager: PackageManager;
}

export async function installDependencies(
  options: InstallDependenciesOptions
): Promise<void> {
  const { projectDir, pkgManager } = options;

  const spinner = ora("Installing dependencies...").start();

  try {
    // Get the install command for the package manager
    const installCommand = getInstallCommand(pkgManager);

    // Run the install command
    await execa(pkgManager, installCommand, {
      cwd: projectDir,
      stdio: "ignore",
    });

    spinner.succeed("Dependencies installed successfully");
  } catch (error) {
    spinner.fail("Failed to install dependencies");
    throw error;
  }
}

function getInstallCommand(pkgManager: PackageManager): string[] {
  switch (pkgManager) {
    case "yarn":
      return [];
    case "pnpm":
      return ["install"];
    case "bun":
      return ["install"];
    case "npm":
    default:
      return ["install"];
  }
}
