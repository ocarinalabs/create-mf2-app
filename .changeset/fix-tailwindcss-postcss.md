---
"create-mf2-app": patch
---

Add `@tailwindcss/postcss` as a devDependency to `apps/app` and `apps/web` in the template. With Bun's isolated linker, Next.js Turbopack could not resolve the PostCSS plugin from the design-system package scope, causing build failures on scaffolded projects.
