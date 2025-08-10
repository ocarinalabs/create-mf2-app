import { Command } from "commander";
import { validateAppName } from "./utils/validateAppName.js";

export interface CliResults {
  projectName: string;
  platform: "web" | "mobile" | "desktop" | "extension";
  template: "frontend" | "fullstack" | "fullstack-ai";
  git: boolean;
  install: boolean;
  docs: boolean;
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
    message: "What will your project be called?",
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
      message: "Which platform are you building for?",
      options: [
        {
          value: "web",
          label: "Web",
        },
        {
          value: "mobile",
          label: "Mobile",
          hint: "coming soon",
        },
        {
          value: "desktop",
          label: "Desktop",
          hint: "coming soon",
        },
        {
          value: "extension",
          label: "Extension",
          hint: "coming soon",
        },
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

  const template = await p.select({
    message: "What are you building?",
    options: [
      {
        value: "fullstack",
        label: "Full Stack",
        hint: "database, auth, payments, emails",
      },
      {
        value: "fullstack-ai",
        label: "Full Stack + AI",
        hint: "agents, RAG, chat interface",
      },
      {
        value: "frontend",
        label: "Frontend",
        hint: "landing pages, marketing sites",
      },
    ],
    initialValue: "fullstack",
  });

  if (p.isCancel(template)) {
    p.cancel("Operation cancelled");
    process.exit(0);
  }

  const docs = await p.select({
    message: "Would you like to include documentation?",
    options: [
      {
        value: true,
        label: "Yes",
        hint: "powered by Mintlify",
      },
      {
        value: false,
        label: "No",
      },
    ],
    initialValue: true,
  });

  if (p.isCancel(docs)) {
    p.cancel("Operation cancelled");
    process.exit(0);
  }

  const git = await p.select({
    message: "Should we initialize a Git repository?",
    options: [
      {
        value: true,
        label: "Yes",
      },
      {
        value: false,
        label: "No",
      },
    ],
    initialValue: true,
  });

  if (p.isCancel(git)) {
    p.cancel("Operation cancelled");
    process.exit(0);
  }

  const install = await p.select({
    message: "Should we install dependencies?",
    options: [
      {
        value: true,
        label: "Yes",
      },
      {
        value: false,
        label: "No",
      },
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
    template: template as "frontend" | "fullstack" | "fullstack-ai",
    git: git as boolean,
    install: install as boolean,
    docs: docs as boolean,
  };
}
