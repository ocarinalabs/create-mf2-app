import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["scripts/index.ts"],
  outDir: "dist",
  sourcemap: false,
  minify: true,
  dts: false,
  format: ["esm"],
  banner: { js: "#!/usr/bin/env node" },
  noExternal: ["@clack/prompts", "@clack/core", "sisteransi", "picocolors"],
});
