# v2.0.5 (Tue Feb 24 2026)

## 2.1.7

### Patch Changes

- fd7049c: Relax next peer dependency in feature-flags and skip CMS dev when BASEHUB_TOKEN is not set

## 2.1.6

### Patch Changes

- 7206808: Update docs from mintlify to mint CLI and add as devDependency

## 2.1.5

### Patch Changes

- b7f675d: Fix missing .env.example and .env.local files in scaffolded projects

## 2.1.4

### Patch Changes

- e2416fd: Fix missing .gitignore in scaffolded projects and show progress during git commit

## 2.1.3

### Patch Changes

- 054833b: Prevent initial commit from hanging and add docs link to CLI output

## 2.1.2

### Patch Changes

- 952ffa7: Fix dynamic require error by keeping commander as external dependency

## 2.1.1

### Patch Changes

- 55dad3c: Bundle all dependencies to fix sisteransi resolution error when running via bunx

## 2.1.0

### Minor Changes

- 71689b9: Update CLI branding and fix initial commit hanging due to lefthook pre-commit hook

#### ⚠️ Pushed to `main`

- fix(ci): remove node_modules without reinstall before auto ([@faw01](https://github.com/faw01))
- fix(ci): reinstall deps in cli before auto for git tags ([@faw01](https://github.com/faw01))
- fix(cli): simplify README markup for npm rendering ([@faw01](https://github.com/faw01))
- fix(cli): add repository metadata for npm provenance ([@faw01](https://github.com/faw01))
- fix(ci): require npm 11.5+ for trusted publish ([@faw01](https://github.com/faw01))
- fix(ci): disable auto npm rc token for oidc publish ([@faw01](https://github.com/faw01))
- fix(ci): use npm trusted publishing via oidc ([@faw01](https://github.com/faw01))
- fix(ci): remove bun node_modules before auto shipit ([@faw01](https://github.com/faw01))
- fix(cli): replace workspace protocol with wildcard for npm compat ([@faw01](https://github.com/faw01))
- fix(ci): run auto shipit from cli dir and add write permissions ([@faw01](https://github.com/faw01))
- fix(ci): add autorc to publish cli subpackage to npm ([@faw01](https://github.com/faw01))
- fix(ci): add git identity for auto shipit ([@faw01](https://github.com/faw01))
- fix(ci): replace pnpm with bun in release workflow ([@faw01](https://github.com/faw01))
- fix(turbo): add .next to build outputs for vercel cache ([@faw01](https://github.com/faw01))
- fix(cli): replace exec with spawn to fix install hanging ([@faw01](https://github.com/faw01))
- docs(template): rewrite README for mf² ([@faw01](https://github.com/faw01))
- fix(template): rename heading ([@faw01](https://github.com/faw01))
- refactor(web): replace lucide github icon with custom svg ([@faw01](https://github.com/faw01))
- feat(web): add dashed border lines and github icon to landing page ([@faw01](https://github.com/faw01))
- docs(readme): align with docs, remove community section, fix links ([@faw01](https://github.com/faw01))
- docs(cli): add README and rebrand to Ocarina Labs ([@faw01](https://github.com/faw01))
- feat(docs): update logo to ➤ arrow icon ([@faw01](https://github.com/faw01))
- fix(web): move vercel.json to apps/web ([@faw01](https://github.com/faw01))
- chore(config): add .vercel to gitignore ([@faw01](https://github.com/faw01))
- fix(deploy): fix mintlify docs rewrite to proxy from root ([@faw01](https://github.com/faw01))
- refactor(web): simplify landing page and remove shader ([@faw01](https://github.com/faw01))
- feat(seo): add metadata and json-ld package ([@faw01](https://github.com/faw01))
- feat(web): add landing page with shader splash screen ([@faw01](https://github.com/faw01))
- feat(design-system): add shadcn/ui components and theme ([@faw01](https://github.com/faw01))
- feat(next-config): add shared next.js configuration ([@faw01](https://github.com/faw01))
- feat(typescript-config): add nextjs, react-library, and convex configs ([@faw01](https://github.com/faw01))
- chore(config): add .next to gitignore ([@faw01](https://github.com/faw01))
- docs(docs): add agent workflow note to commands page ([@faw01](https://github.com/faw01))
- docs(docs): add agent context to structure and colocation pages ([@faw01](https://github.com/faw01))
- docs(docs): add agent-first narrative and roadmap page ([@faw01](https://github.com/faw01))
- fix(deploy): update mintlify subdomain to ocarinalabs ([@faw01](https://github.com/faw01))
- docs(readme): update branding and project description ([@faw01](https://github.com/faw01))
- chore(deps): add lockfile ([@faw01](https://github.com/faw01))
- feat(scripts): add story generation script ([@faw01](https://github.com/faw01))
- chore(dx): add editor and mcp configs ([@faw01](https://github.com/faw01))
- ci(github): add release workflow and dependabot ([@faw01](https://github.com/faw01))
- chore(github): add issue and pr templates ([@faw01](https://github.com/faw01))
- chore(github): add community health files ([@faw01](https://github.com/faw01))
- feat(docs): add documentation site ([@faw01](https://github.com/faw01))
- refactor(www): remove old website ([@faw01](https://github.com/faw01))
- feat(cli): add project template package scaffolds ([@faw01](https://github.com/faw01))
- feat(cli): add project template app scaffolds ([@faw01](https://github.com/faw01))
- feat(cli): add project template dx configs ([@faw01](https://github.com/faw01))
- feat(cli): add project template root configs ([@faw01](https://github.com/faw01))
- feat(cli): add cli build and init scripts ([@faw01](https://github.com/faw01))
- feat(cli): add new cli app with build system ([@faw01](https://github.com/faw01))
- refactor(cli): remove old fullstack-ai template ([@faw01](https://github.com/faw01))
- refactor(cli): remove old fullstack template ([@faw01](https://github.com/faw01))
- refactor(cli): remove old frontend template ([@faw01](https://github.com/faw01))
- refactor(cli): remove old cli source and build output ([@faw01](https://github.com/faw01))
- feat(design-system): add shared design system package ([@faw01](https://github.com/faw01))
- feat(next-config): add shared next.js config package ([@faw01](https://github.com/faw01))
- feat(typescript-config): add shared typescript config package ([@faw01](https://github.com/faw01))
- chore(deploy): add vercel deployment config ([@faw01](https://github.com/faw01))
- chore(root): add bun and lefthook configs ([@faw01](https://github.com/faw01))
- chore(root): add biome linting and formatting config ([@faw01](https://github.com/faw01))
- chore(root): add turborepo pipeline config ([@faw01](https://github.com/faw01))
- refactor(root): migrate package.json to turborepo workspaces ([@faw01](https://github.com/faw01))
- chore(root): remove old root tsconfig ([@faw01](https://github.com/faw01))
- docs(project): update project instructions with ultracite standards ([@faw01](https://github.com/faw01))
- chore(license): update copyright to Ocarina Labs ([@faw01](https://github.com/faw01))
- chore: update deps for react2shell, remove oss stats ([@faw01](https://github.com/faw01))
- feat: add signature ([@faw01](https://github.com/faw01))
- fix: build errror ([@faw01](https://github.com/faw01))
- chore: cleanup comments and lint ([@faw01](https://github.com/faw01))
- feat: refactor ai template, made code more modular ([@faw01](https://github.com/faw01))
- feat: update links ([@faw01](https://github.com/faw01))
- feat: update www ([@faw01](https://github.com/faw01))
- feat: cleanup, init docs with cli and add ai template ([@faw01](https://github.com/faw01))
- feat: add half-assed docs ([@faw01](https://github.com/faw01))
- feat: cleanup and finalise frontend template, added back convex for oss ([@faw01](https://github.com/faw01))
- feat: make responsive ([@faw01](https://github.com/faw01))
- feat: rerun init ([@faw01](https://github.com/faw01))
- feat: forgot to update ([@faw01](https://github.com/faw01))
- feat: update footer and website ([@faw01](https://github.com/faw01))
- feat: finish landing ([@faw01](https://github.com/faw01))
- feat: add website and change cli header ([@faw01](https://github.com/faw01))
- feat: cli working, migrate from mf squared to mf2 ([@faw01](https://github.com/faw01))
- feat: prep base-frontend ([@faw01](https://github.com/faw01))
- feat: create claude files ([@faw01](https://github.com/faw01))
- chore: lint and cleanup ([@faw01](https://github.com/faw01))
- feat: split ([@faw01](https://github.com/faw01))
- feat: more updates ([@faw01](https://github.com/faw01))
- init ([@faw01](https://github.com/faw01))

#### Authors: 1

- faw ([@faw01](https://github.com/faw01))

---

# v2.0.4 (Tue Feb 24 2026)

#### ⚠️ Pushed to `main`

- fix(cli): simplify README markup for npm rendering ([@faw01](https://github.com/faw01))
- fix(cli): add repository metadata for npm provenance ([@faw01](https://github.com/faw01))
- fix(ci): require npm 11.5+ for trusted publish ([@faw01](https://github.com/faw01))
- fix(ci): disable auto npm rc token for oidc publish ([@faw01](https://github.com/faw01))
- fix(ci): use npm trusted publishing via oidc ([@faw01](https://github.com/faw01))
- fix(ci): remove bun node_modules before auto shipit ([@faw01](https://github.com/faw01))
- fix(cli): replace workspace protocol with wildcard for npm compat ([@faw01](https://github.com/faw01))
- fix(ci): run auto shipit from cli dir and add write permissions ([@faw01](https://github.com/faw01))
- fix(ci): add autorc to publish cli subpackage to npm ([@faw01](https://github.com/faw01))
- fix(ci): add git identity for auto shipit ([@faw01](https://github.com/faw01))
- fix(ci): replace pnpm with bun in release workflow ([@faw01](https://github.com/faw01))
- fix(turbo): add .next to build outputs for vercel cache ([@faw01](https://github.com/faw01))
- fix(cli): replace exec with spawn to fix install hanging ([@faw01](https://github.com/faw01))
- docs(template): rewrite README for mf² ([@faw01](https://github.com/faw01))
- fix(template): rename heading ([@faw01](https://github.com/faw01))
- refactor(web): replace lucide github icon with custom svg ([@faw01](https://github.com/faw01))
- feat(web): add dashed border lines and github icon to landing page ([@faw01](https://github.com/faw01))
- docs(readme): align with docs, remove community section, fix links ([@faw01](https://github.com/faw01))
- docs(cli): add README and rebrand to Ocarina Labs ([@faw01](https://github.com/faw01))
- feat(docs): update logo to ➤ arrow icon ([@faw01](https://github.com/faw01))
- fix(web): move vercel.json to apps/web ([@faw01](https://github.com/faw01))
- chore(config): add .vercel to gitignore ([@faw01](https://github.com/faw01))
- fix(deploy): fix mintlify docs rewrite to proxy from root ([@faw01](https://github.com/faw01))
- refactor(web): simplify landing page and remove shader ([@faw01](https://github.com/faw01))
- feat(seo): add metadata and json-ld package ([@faw01](https://github.com/faw01))
- feat(web): add landing page with shader splash screen ([@faw01](https://github.com/faw01))
- feat(design-system): add shadcn/ui components and theme ([@faw01](https://github.com/faw01))
- feat(next-config): add shared next.js configuration ([@faw01](https://github.com/faw01))
- feat(typescript-config): add nextjs, react-library, and convex configs ([@faw01](https://github.com/faw01))
- chore(config): add .next to gitignore ([@faw01](https://github.com/faw01))
- docs(docs): add agent workflow note to commands page ([@faw01](https://github.com/faw01))
- docs(docs): add agent context to structure and colocation pages ([@faw01](https://github.com/faw01))
- docs(docs): add agent-first narrative and roadmap page ([@faw01](https://github.com/faw01))
- fix(deploy): update mintlify subdomain to ocarinalabs ([@faw01](https://github.com/faw01))
- docs(readme): update branding and project description ([@faw01](https://github.com/faw01))
- chore(deps): add lockfile ([@faw01](https://github.com/faw01))
- feat(scripts): add story generation script ([@faw01](https://github.com/faw01))
- chore(dx): add editor and mcp configs ([@faw01](https://github.com/faw01))
- ci(github): add release workflow and dependabot ([@faw01](https://github.com/faw01))
- chore(github): add issue and pr templates ([@faw01](https://github.com/faw01))
- chore(github): add community health files ([@faw01](https://github.com/faw01))
- feat(docs): add documentation site ([@faw01](https://github.com/faw01))
- refactor(www): remove old website ([@faw01](https://github.com/faw01))
- feat(cli): add project template package scaffolds ([@faw01](https://github.com/faw01))
- feat(cli): add project template app scaffolds ([@faw01](https://github.com/faw01))
- feat(cli): add project template dx configs ([@faw01](https://github.com/faw01))
- feat(cli): add project template root configs ([@faw01](https://github.com/faw01))
- feat(cli): add cli build and init scripts ([@faw01](https://github.com/faw01))
- feat(cli): add new cli app with build system ([@faw01](https://github.com/faw01))
- refactor(cli): remove old fullstack-ai template ([@faw01](https://github.com/faw01))
- refactor(cli): remove old fullstack template ([@faw01](https://github.com/faw01))
- refactor(cli): remove old frontend template ([@faw01](https://github.com/faw01))
- refactor(cli): remove old cli source and build output ([@faw01](https://github.com/faw01))
- feat(design-system): add shared design system package ([@faw01](https://github.com/faw01))
- feat(next-config): add shared next.js config package ([@faw01](https://github.com/faw01))
- feat(typescript-config): add shared typescript config package ([@faw01](https://github.com/faw01))
- chore(deploy): add vercel deployment config ([@faw01](https://github.com/faw01))
- chore(root): add bun and lefthook configs ([@faw01](https://github.com/faw01))
- chore(root): add biome linting and formatting config ([@faw01](https://github.com/faw01))
- chore(root): add turborepo pipeline config ([@faw01](https://github.com/faw01))
- refactor(root): migrate package.json to turborepo workspaces ([@faw01](https://github.com/faw01))
- chore(root): remove old root tsconfig ([@faw01](https://github.com/faw01))
- docs(project): update project instructions with ultracite standards ([@faw01](https://github.com/faw01))
- chore(license): update copyright to Ocarina Labs ([@faw01](https://github.com/faw01))
- chore: update deps for react2shell, remove oss stats ([@faw01](https://github.com/faw01))
- feat: add signature ([@faw01](https://github.com/faw01))
- fix: build errror ([@faw01](https://github.com/faw01))
- chore: cleanup comments and lint ([@faw01](https://github.com/faw01))
- feat: refactor ai template, made code more modular ([@faw01](https://github.com/faw01))
- feat: update links ([@faw01](https://github.com/faw01))
- feat: update www ([@faw01](https://github.com/faw01))
- feat: cleanup, init docs with cli and add ai template ([@faw01](https://github.com/faw01))
- feat: add half-assed docs ([@faw01](https://github.com/faw01))
- feat: cleanup and finalise frontend template, added back convex for oss ([@faw01](https://github.com/faw01))
- feat: make responsive ([@faw01](https://github.com/faw01))
- feat: rerun init ([@faw01](https://github.com/faw01))
- feat: forgot to update ([@faw01](https://github.com/faw01))
- feat: update footer and website ([@faw01](https://github.com/faw01))
- feat: finish landing ([@faw01](https://github.com/faw01))
- feat: add website and change cli header ([@faw01](https://github.com/faw01))
- feat: cli working, migrate from mf squared to mf2 ([@faw01](https://github.com/faw01))
- feat: prep base-frontend ([@faw01](https://github.com/faw01))
- feat: create claude files ([@faw01](https://github.com/faw01))
- chore: lint and cleanup ([@faw01](https://github.com/faw01))
- feat: split ([@faw01](https://github.com/faw01))
- feat: more updates ([@faw01](https://github.com/faw01))
- init ([@faw01](https://github.com/faw01))

#### Authors: 1

- faw ([@faw01](https://github.com/faw01))

---

# v2.0.3 (Tue Feb 24 2026)

#### ⚠️ Pushed to `main`

- fix(cli): add repository metadata for npm provenance ([@faw01](https://github.com/faw01))
- fix(ci): require npm 11.5+ for trusted publish ([@faw01](https://github.com/faw01))
- fix(ci): disable auto npm rc token for oidc publish ([@faw01](https://github.com/faw01))
- fix(ci): use npm trusted publishing via oidc ([@faw01](https://github.com/faw01))
- fix(ci): remove bun node_modules before auto shipit ([@faw01](https://github.com/faw01))
- fix(cli): replace workspace protocol with wildcard for npm compat ([@faw01](https://github.com/faw01))
- fix(ci): run auto shipit from cli dir and add write permissions ([@faw01](https://github.com/faw01))
- fix(ci): add autorc to publish cli subpackage to npm ([@faw01](https://github.com/faw01))
- fix(ci): add git identity for auto shipit ([@faw01](https://github.com/faw01))
- fix(ci): replace pnpm with bun in release workflow ([@faw01](https://github.com/faw01))
- fix(turbo): add .next to build outputs for vercel cache ([@faw01](https://github.com/faw01))
- fix(cli): replace exec with spawn to fix install hanging ([@faw01](https://github.com/faw01))
- docs(template): rewrite README for mf² ([@faw01](https://github.com/faw01))
- fix(template): rename heading ([@faw01](https://github.com/faw01))
- refactor(web): replace lucide github icon with custom svg ([@faw01](https://github.com/faw01))
- feat(web): add dashed border lines and github icon to landing page ([@faw01](https://github.com/faw01))
- docs(readme): align with docs, remove community section, fix links ([@faw01](https://github.com/faw01))
- docs(cli): add README and rebrand to Ocarina Labs ([@faw01](https://github.com/faw01))
- feat(docs): update logo to ➤ arrow icon ([@faw01](https://github.com/faw01))
- fix(web): move vercel.json to apps/web ([@faw01](https://github.com/faw01))
- chore(config): add .vercel to gitignore ([@faw01](https://github.com/faw01))
- fix(deploy): fix mintlify docs rewrite to proxy from root ([@faw01](https://github.com/faw01))
- refactor(web): simplify landing page and remove shader ([@faw01](https://github.com/faw01))
- feat(seo): add metadata and json-ld package ([@faw01](https://github.com/faw01))
- feat(web): add landing page with shader splash screen ([@faw01](https://github.com/faw01))
- feat(design-system): add shadcn/ui components and theme ([@faw01](https://github.com/faw01))
- feat(next-config): add shared next.js configuration ([@faw01](https://github.com/faw01))
- feat(typescript-config): add nextjs, react-library, and convex configs ([@faw01](https://github.com/faw01))
- chore(config): add .next to gitignore ([@faw01](https://github.com/faw01))
- docs(docs): add agent workflow note to commands page ([@faw01](https://github.com/faw01))
- docs(docs): add agent context to structure and colocation pages ([@faw01](https://github.com/faw01))
- docs(docs): add agent-first narrative and roadmap page ([@faw01](https://github.com/faw01))
- fix(deploy): update mintlify subdomain to ocarinalabs ([@faw01](https://github.com/faw01))
- docs(readme): update branding and project description ([@faw01](https://github.com/faw01))
- chore(deps): add lockfile ([@faw01](https://github.com/faw01))
- feat(scripts): add story generation script ([@faw01](https://github.com/faw01))
- chore(dx): add editor and mcp configs ([@faw01](https://github.com/faw01))
- ci(github): add release workflow and dependabot ([@faw01](https://github.com/faw01))
- chore(github): add issue and pr templates ([@faw01](https://github.com/faw01))
- chore(github): add community health files ([@faw01](https://github.com/faw01))
- feat(docs): add documentation site ([@faw01](https://github.com/faw01))
- refactor(www): remove old website ([@faw01](https://github.com/faw01))
- feat(cli): add project template package scaffolds ([@faw01](https://github.com/faw01))
- feat(cli): add project template app scaffolds ([@faw01](https://github.com/faw01))
- feat(cli): add project template dx configs ([@faw01](https://github.com/faw01))
- feat(cli): add project template root configs ([@faw01](https://github.com/faw01))
- feat(cli): add cli build and init scripts ([@faw01](https://github.com/faw01))
- feat(cli): add new cli app with build system ([@faw01](https://github.com/faw01))
- refactor(cli): remove old fullstack-ai template ([@faw01](https://github.com/faw01))
- refactor(cli): remove old fullstack template ([@faw01](https://github.com/faw01))
- refactor(cli): remove old frontend template ([@faw01](https://github.com/faw01))
- refactor(cli): remove old cli source and build output ([@faw01](https://github.com/faw01))
- feat(design-system): add shared design system package ([@faw01](https://github.com/faw01))
- feat(next-config): add shared next.js config package ([@faw01](https://github.com/faw01))
- feat(typescript-config): add shared typescript config package ([@faw01](https://github.com/faw01))
- chore(deploy): add vercel deployment config ([@faw01](https://github.com/faw01))
- chore(root): add bun and lefthook configs ([@faw01](https://github.com/faw01))
- chore(root): add biome linting and formatting config ([@faw01](https://github.com/faw01))
- chore(root): add turborepo pipeline config ([@faw01](https://github.com/faw01))
- refactor(root): migrate package.json to turborepo workspaces ([@faw01](https://github.com/faw01))
- chore(root): remove old root tsconfig ([@faw01](https://github.com/faw01))
- docs(project): update project instructions with ultracite standards ([@faw01](https://github.com/faw01))
- chore(license): update copyright to Ocarina Labs ([@faw01](https://github.com/faw01))
- chore: update deps for react2shell, remove oss stats ([@faw01](https://github.com/faw01))
- feat: add signature ([@faw01](https://github.com/faw01))
- fix: build errror ([@faw01](https://github.com/faw01))
- chore: cleanup comments and lint ([@faw01](https://github.com/faw01))
- feat: refactor ai template, made code more modular ([@faw01](https://github.com/faw01))
- feat: update links ([@faw01](https://github.com/faw01))
- feat: update www ([@faw01](https://github.com/faw01))
- feat: cleanup, init docs with cli and add ai template ([@faw01](https://github.com/faw01))
- feat: add half-assed docs ([@faw01](https://github.com/faw01))
- feat: cleanup and finalise frontend template, added back convex for oss ([@faw01](https://github.com/faw01))
- feat: make responsive ([@faw01](https://github.com/faw01))
- feat: rerun init ([@faw01](https://github.com/faw01))
- feat: forgot to update ([@faw01](https://github.com/faw01))
- feat: update footer and website ([@faw01](https://github.com/faw01))
- feat: finish landing ([@faw01](https://github.com/faw01))
- feat: add website and change cli header ([@faw01](https://github.com/faw01))
- feat: cli working, migrate from mf squared to mf2 ([@faw01](https://github.com/faw01))
- feat: prep base-frontend ([@faw01](https://github.com/faw01))
- feat: create claude files ([@faw01](https://github.com/faw01))
- chore: lint and cleanup ([@faw01](https://github.com/faw01))
- feat: split ([@faw01](https://github.com/faw01))
- feat: more updates ([@faw01](https://github.com/faw01))
- init ([@faw01](https://github.com/faw01))

#### Authors: 1

- faw ([@faw01](https://github.com/faw01))
