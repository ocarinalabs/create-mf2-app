---
"create-mf2-app": minor
---

Align with next-forge v6. Bun-first runtime, graceful degradation for all optional services, Sentry namespace imports, updated dependencies, and zero-env boot support.

- Add `bun --bun` prefix to all Next.js dev/build/start scripts
- Add `bunVersion: "1.x"` to all vercel.json files
- Migrate all @repo deps to `workspace:*`
- Refactor observability to Sentry namespace imports with onRequestError and onRouterTransitionStart exports
- Add graceful degradation to analytics, payments, email, CMS, auth, and feature flags
- Refactor CMS with QueryGenqlSelection and getPostsMeta
- Harden i18n locale negotiation with try-catch and wildcard filter
- Remove env.local from template for zero-env boot
- Bump all dependencies (Next 16.1.6, React 19.2.4, Clerk 7.x, AI SDK 6.x, Tailwind 4.2.1, Sentry 10.43.0)
- Bump shadcn/ui and native components
- Add READMEs for all apps and packages
