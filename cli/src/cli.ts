import { Command } from "commander";
import { validateAppName } from "./utils/validateAppName.js";

export interface CliResults {
  projectName: string;
  platform: "web" | "mobile" | "desktop" | "extension";
  needsBackend: boolean;
  git: boolean;
  install: boolean;
}

export async function runCli(): Promise<CliResults> {
  const p = await import("@clack/prompts");
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

  let platform: "web" | "mobile" | "desktop" | "extension";
  while (true) {
    const selectedPlatform = await p.select({
      message: "Platform?",
      options: [
        { value: "web", label: "Web" },
        { value: "mobile", label: "Mobile (Coming Soon)" },
        { value: "desktop", label: "Desktop (Coming Soon)" },
        { value: "extension", label: "Extension (Coming Soon)" },
      ],
      initialValue: "web",
    });

    if (p.isCancel(selectedPlatform)) {
      p.cancel("Operation cancelled");
      process.exit(0);
    }

    if (
      selectedPlatform === "mobile" ||
      selectedPlatform === "desktop" ||
      selectedPlatform === "extension"
    ) {
      p.log.warn(
        `${
          selectedPlatform === "mobile"
            ? "Mobile"
            : selectedPlatform === "desktop"
            ? "Desktop"
            : "Extension"
        } coming soon.`
      );
      continue;
    }

    platform = selectedPlatform as "web";
    break;
  }

  const needsBackend = await p.select({
    message: "Building?",
    options: [
      { value: true, label: "Full Stack" },
      { value: false, label: "Frontend" },
    ],
    initialValue: true,
  });

  if (p.isCancel(needsBackend)) {
    p.cancel("Operation cancelled");
    process.exit(0);
  }

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

  const install = await p.select({
    message: "Install dependencies?",
    options: [
      { value: true, label: "Yes" },
      { value: false, label: "No" },
    ],
    initialValue: true,
  });

  if (p.isCancel(install)) {
    p.cancel("Operation cancelled");
    process.exit(0);
  }

  return {
    projectName: projectName as string,
    platform,
    needsBackend: needsBackend as boolean,
    git: git as boolean,
    install: install as boolean,
  };
}
