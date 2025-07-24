# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Startdown is a CLI tool for creating startup-ready web applications using the MF² Stack (Move F***ing Fast Stack). It provides opinionated, production-ready templates for rapid SaaS development.

## Commands

### Development
```bash
# Development mode with hot reload
npm run dev

# Build the CLI
npm run build

# Type checking
npm run typecheck

# Test the CLI locally
npm run test
```

### Using the CLI
```bash
# Run the built CLI
npm run start

# Test with a project name
npm run start my-test-app

# Direct execution
node cli/dist/index.js
```

### Template Development
For working on templates, navigate to the specific template directory:

```bash
# Frontend template
cd cli/templates/base-frontend
npm run dev           # Next.js dev server with Turbopack
npm run build         # Production build
npm run lint          # Run ESLint
npm run analyze       # Bundle analyzer

# Fullstack template  
cd cli/templates/base-fullstack
npm run dev           # Next.js dev server
npx convex dev        # Convex backend (separate terminal)
npm run build         # Production build
npm run lint          # Run ESLint
npm run docs          # Mintlify docs dev server
```

## Architecture

### Project Structure
- **Root**: NPM package configuration and build scripts
- **`/cli`**: CLI source code and templates
  - **`/src`**: TypeScript source files
    - **`index.ts`**: Entry point with shebang
    - **`cli.ts`**: User prompts and input collection
    - **`/helpers`**: Core functionality (createProject, installDependencies, git init)
    - **`/utils`**: Utilities (logger, validation, package manager detection)
  - **`/templates`**: Project templates
    - **`base-frontend`**: Landing page template (Next.js + TypeScript + Tailwind + shadcn/ui)
    - **`base-fullstack`**: SaaS template (adds Convex + Clerk + Polar + Resend + PostHog)

### Key Technologies

#### CLI Stack
- **Build Tool**: tsup (ESM output)
- **CLI Framework**: Commander + @clack/prompts
- **Package Manager Detection**: Supports npm, yarn, pnpm, bun

#### Template Stacks

**Frontend Template**:
- Next.js 15 (App Router, Turbopack)
- TypeScript
- Tailwind CSS v4
- shadcn/ui (all components included)
- Dark mode support
- SEO metadata helpers
- Vercel Analytics

**Fullstack Template** (includes everything above plus):
- **Backend**: Convex (real-time database)
- **Auth**: Clerk
- **Payments**: Polar
- **Email**: Resend  
- **Analytics**: PostHog
- **Docs**: Mintlify
- **Monitoring**: Better Stack (referenced in PLAN.md)

### Development Workflow

1. **CLI Development**:
   - Make changes in `/cli/src`
   - Run `npm run dev` for watch mode
   - Test with `npm run start test-app`

2. **Template Updates**:
   - Edit files directly in `/cli/templates/base-frontend` or `/cli/templates/base-fullstack`
   - Test templates by running their respective dev commands
   - Templates are copied as-is during project creation

3. **Adding New Features**:
   - For CLI features: Update relevant helpers in `/cli/src/helpers`
   - For template features: Add to appropriate template directory
   - Many helper functions are placeholders for future functionality

### Important Design Decisions

1. **Two Templates Instead of Modular**: Unlike T3 Stack's complex permutation system, Startdown uses two distinct templates (frontend vs fullstack) for simplicity and maintainability.

2. **Opinionated Choices**: No configuration options for core stack choices - users get a pre-configured, production-ready setup.

3. **Complete UI Components**: All shadcn/ui components are included out-of-the-box rather than requiring separate installation.

4. **Environment Variables**: Fullstack template includes `.env.example` with all required keys documented.

### Testing Approach

Currently, there are no automated tests. Testing is done manually:
- Build the CLI: `npm run build`
- Create test projects: `npm run test`
- Verify template functionality by running the created projects

### Common Tasks

**Update Dependencies in Templates**:
1. Navigate to template directory
2. Update package.json
3. Test thoroughly as templates are copied directly

**Add New shadcn/ui Component**:
- Components are already included in both templates under `/src/components/ui/`

**Modify Project Creation Flow**:
1. Update prompts in `/cli/src/cli.ts`
2. Modify project creation logic in `/cli/src/helpers/createProject.ts`
3. Update success messages in `/cli/src/index.ts`

**Debug CLI Issues**:
- Check `/cli/src/utils/logger.ts` for logging utilities
- Package manager detection in `/cli/src/utils/getPkgManager.ts`
- Validation logic in `/cli/src/utils/validateAppName.ts`