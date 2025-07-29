# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### CLI Development

```bash
# Install dependencies
npm install

# Development mode with watch
npm run dev

# Build the CLI
npm run build

# Start CLI (after building)
npm run start

# Run with specific app name
npm run test

# Type checking
npm run typecheck
```

### Website Development

```bash
cd www

# Install dependencies
npm install

# Development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linting
npm run lint

# Dependency checking
npm run knip

# Convex development (separate terminal)
npx convex dev
```

## High-Level Architecture

### Project Structure

This is a monorepo containing:

1. **CLI Tool** (`/cli`): The `create-mf2-app` CLI for scaffolding new projects

   - Written in TypeScript, built with tsup
   - Uses commander for CLI interface, clack/prompts for interactions
   - Templates stored in `/cli/templates/`

2. **Landing Page** (`/www`): Marketing website for the MF2 Stack
   - Next.js 15 with App Router and Turbopack
   - Real-time GitHub stats via Convex
   - Tailwind CSS v4, shadcn/ui components

### CLI Architecture

**Key Components:**

- `cli/src/index.ts`: Entry point, sets up commander
- `cli/src/cli.ts`: Main CLI logic and flow
- `cli/src/helpers/`: Core functionality
  - `createProject.ts`: Orchestrates project creation
  - `scaffoldProject.ts`: Copies template files
  - `selectBoilerplate.ts`: Template selection logic
  - `installDependencies.ts`: Package installation

**Templates:**

- `base-frontend`: Landing pages, marketing sites
- `base-fullstack`: Full SaaS apps with Convex, Clerk, Polar

**Build Process:**

- Uses tsup for fast TypeScript compilation
- Outputs to CommonJS format for Node.js compatibility
- Includes shims for Node.js built-ins

### Key Implementation Details

1. **Package Manager Detection**: Automatically detects npm/yarn/pnpm/bun from user environment

2. **Git Integration**: Initializes git repo with proper `.gitignore` handling

3. **Template System**:

   - Templates are complete, working applications
   - Each template has its own `CLAUDE.md` for guidance
   - Frontend template includes comprehensive shadcn/ui components
   - Fullstack template includes authentication, payments, real-time features

4. **Error Handling**: User-friendly error messages with helpful context

5. **Development Workflow**:
   - `npm run dev` watches TypeScript files and auto-runs CLI
   - Tests by running `npm run test` which creates a test app

### Publishing

The CLI is published to npm as `create-mf2-app`. Users can run:

- `npm create mf2-app@latest`
- `yarn create mf2-app`
- `pnpm create mf2-app`
