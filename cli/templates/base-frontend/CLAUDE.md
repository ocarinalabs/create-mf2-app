# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Start development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run ESLint
npm run lint

# Analyze bundle size
npm run analyze
```

## Architecture Overview

This is a Next.js 15 frontend template using the App Router pattern with the following key architectural components:

### Core Technologies
- **Next.js 15** with App Router and Turbopack
- **TypeScript** with strict mode enabled
- **Tailwind CSS v4** for styling
- **shadcn/ui** component library
- **React Hook Form** for form handling
- **Vercel Analytics** for analytics

### Project Structure
- `/src/app/` - Next.js App Router pages and layouts
- `/src/components/` - React components (custom and shadcn/ui)
- `/src/components/ui/` - shadcn/ui components (extensive collection)
- `/src/lib/` - Utility functions and shared code
- `/src/hooks/` - Custom React hooks

### Key Patterns
1. **Component Structure**: Uses functional components with TypeScript
2. **Styling**: Tailwind CSS utilities with semantic color variables
3. **Dark Mode**: Built-in theme switching via next-themes
4. **Forms**: React Hook Form with Zod validation
5. **Import Alias**: `@/*` maps to `./src/*`

### Metadata & SEO
The app includes comprehensive SEO setup:
- Dynamic metadata generation in layout.tsx
- Custom Open Graph and Twitter images
- Robots.txt and sitemap generation
- Favicon and Apple icon components

### Important Cursor Rules
The project includes extensive Cursor rules in `.cursor/rules/` covering:
- React best practices
- Tailwind CSS conventions
- TypeScript patterns
- Code quality guidelines
- Architecture understanding
- Error documentation

When developing, follow the mobile-first approach and ensure proper accessibility with semantic HTML and ARIA attributes.