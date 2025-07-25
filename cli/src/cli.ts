import * as p from "@clack/prompts";
import { Command } from "commander";
import { validateAppName } from "./utils/validateAppName.js";

export interface CliResults {
  projectName: string;
  platform: "web" | "mobile" | "desktop";
  needsBackend: boolean;
  git: boolean;
}

export async function runCli(): Promise<CliResults> {
  const program = new Command()
    .name("create-mf2-app")
    .description("Create a new MF2 Stack application")
    .argument("[project-name]")
    .option("--use-npm", "Use npm as package manager")
    .option("--use-yarn", "Use yarn as package manager")
    .option("--use-pnpm", "Use pnpm as package manager")
    .option("--use-bun", "Use bun as package manager")
    .parse(process.argv);

  const providedName = program.args[0];

  // Get project name first
  const projectName = await p.text({
    message: providedName ? "Project name" : "Project name?",
    initialValue: providedName,
    placeholder: providedName ? undefined : "my-startup",
    validate: validateAppName,
  });

  if (p.isCancel(projectName)) {
    p.cancel("Operation cancelled");
    process.exit(0);
  }

  // Platform selection with validation loop
  let platform: "web" | "mobile" | "desktop";
  while (true) {
    const selectedPlatform = await p.select({
      message: "Platform?",
      options: [
        { value: "web", label: "Web" },
        { value: "mobile", label: "Mobile (Coming Soon)" },
        { value: "desktop", label: "Desktop (Coming Soon)" },
      ],
      initialValue: "web",
    });

    if (p.isCancel(selectedPlatform)) {
      p.cancel("Operation cancelled");
      process.exit(0);
    }

    if (selectedPlatform === "mobile" || selectedPlatform === "desktop") {
      p.log.warn(
        `${selectedPlatform === "mobile" ? "Mobile" : "Desktop"} coming soon.`
      );
      continue;
    }

    platform = selectedPlatform as "web";
    break;
  }

  // Backend selection
  const needsBackend = await p.select({
    message: "Building?",
    options: [
      { value: false, label: "Landing Page" },
      { value: true, label: "SaaS" },
    ],
    initialValue: false,
  });

  if (p.isCancel(needsBackend)) {
    p.cancel("Operation cancelled");
    process.exit(0);
  }

  // Git initialization
  const git = await p.select({
    message: "Git repo?",
    options: [
      { value: true, label: "Yes" },
      { value: false, label: "No" },
    ],
    initialValue: true,
  });

  if (p.isCancel(git)) {
    p.cancel("Operation cancelled");
    process.exit(0);
  }

  return {
    projectName: projectName as string,
    platform,
    needsBackend: needsBackend as boolean,
    git: git as boolean,
  };
}
