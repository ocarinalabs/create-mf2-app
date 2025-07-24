// Validates that the project name is a valid npm package name
export function validateAppName(name: string): string | undefined {
  const validation = validateNpmName(name);

  if (validation.valid) {
    return undefined; // No error
  }

  return "Invalid project name: " + validation.problems[0];
}

// Based on npm package name rules
function validateNpmName(name: string): {
  valid: boolean;
  problems: string[];
} {
  const problems: string[] = [];

  // Cannot be empty
  if (!name || name.trim() === "") {
    problems.push("name cannot be empty");
  }

  // Cannot start with . or _
  if (/^[._]/.test(name)) {
    problems.push("name cannot start with a period or underscore");
  }

  // Cannot contain spaces
  if (/\s/.test(name)) {
    problems.push("name cannot contain spaces");
  }

  // Cannot contain uppercase letters
  if (/[A-Z]/.test(name)) {
    problems.push("name must be lowercase");
  }

  // Must be valid characters
  if (!/^[a-z0-9._-]+$/.test(name)) {
    problems.push(
      "name can only contain lowercase letters, numbers, dots, hyphens, and underscores"
    );
  }

  // Cannot be longer than 214 characters
  if (name.length > 214) {
    problems.push("name cannot be longer than 214 characters");
  }

  return {
    valid: problems.length === 0,
    problems,
  };
}
