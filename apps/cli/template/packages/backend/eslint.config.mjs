import convexPlugin from "@convex-dev/eslint-plugin";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["convex/_generated/**"] },
  {
    files: ["convex/**/*.ts"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  ...convexPlugin.configs.recommended
);
