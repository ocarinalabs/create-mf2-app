export function validateAppName(name: string): string | undefined {
  const validation = validateNpmName(name);

  if (validation.valid) {
    return undefined;
  }

  return "Invalid project name: " + validation.problems[0];
}

function validateNpmName(name: string): {
  valid: boolean;
  problems: string[];
} {
  const problems: string[] = [];

  if (!name || name.trim() === "") {
    problems.push("name cannot be empty");
  }

  if (/^[._]/.test(name)) {
    problems.push("name cannot start with a period or underscore");
  }

  if (/\s/.test(name)) {
    problems.push("name cannot contain spaces");
  }

  if (/[A-Z]/.test(name)) {
    problems.push("name must be lowercase");
  }

  if (!/^[a-z0-9._-]+$/.test(name)) {
    problems.push(
      "name can only contain lowercase letters, numbers, dots, hyphens, and underscores"
    );
  }

  if (name.length > 214) {
    problems.push("name cannot be longer than 214 characters");
  }

  return {
    valid: problems.length === 0,
    problems,
  };
}
