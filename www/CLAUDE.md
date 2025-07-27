# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the landing page and documentation site for create-mf2-app, the official CLI tool for the MF2 Stack (Move F*cking Fast Stack) by Korrect. It's built with Next.js 15, Convex for real-time stats tracking, and includes comprehensive documentation powered by Mintlify.

## Commands

### Development

```bash
# Start Next.js development server with Turbopack
npm run dev

# Start Convex backend (separate terminal)
npx convex dev

# Build for production
npm run build

# Start production server
npm run start

# Run ESLint
npm run lint

# Run knip for unused exports/dependencies
npm run knip
```

### Documentation (Mintlify)

```bash
# Navigate to docs directory
cd docs

# Install Mintlify CLI globally
npm i -g mint

# Start documentation dev server
mint dev

# Validate documentation links
mint broken-links

# Update Mintlify CLI
npm mint update
```

## Architecture

### Project Structure

- **`/src`**: Next.js application source
  - **`/app`**: App Router pages and layouts
    - SEO optimized with metadata, Open Graph images, and sitemap
    - Dark mode support via next-themes
  - **`/components`**: React components
    - **`/ui`**: shadcn/ui components (customized for landing page)
    - Custom components: Hero, CliPreview, TechStack, FAQ, etc.
- **`/convex`**: Backend for tracking GitHub/npm stats
  - Uses @erquhart/convex-oss-stats for tracking metrics
  - Configured to track korrect-ai organization and create-mf2-app repo
- **`/docs`**: Mintlify documentation
  - Guides for getting started, customization, and content writing
  - AI tools documentation (Claude Code, Cursor, Windsurf)
  - API reference examples
- **`/public`**: Static assets including bento grid images and LLM context files

### Key Technologies

- **Frontend**: Next.js 15 with App Router and Turbopack
- **Styling**: Tailwind CSS v4 with PostCSS
- **Backend**: Convex for real-time database
- **Components**: shadcn/ui (customized versions)
- **Documentation**: Mintlify
- **Analytics**: Vercel Analytics
- **Animation**: Framer Motion, React Three Fiber for 3D effects

### Key Features

1. **Landing Page Components**:
   - Animated navigation bar with Framer Motion
   - 3D animated beams background using Three.js
   - CLI preview component showcasing the tool
   - Tech stack showcase with logos
   - FAQ section
   - Community section with Discord/GitHub links

2. **Real-time Stats Tracking**:
   - Tracks GitHub stars, forks, and issues
   - Monitors npm package downloads
   - Updates via Convex real-time sync

3. **Documentation Site**:
   - Comprehensive guides and API docs
   - Custom branding and navigation
   - Code examples and snippets
   - AI tool integration guides

### Development Workflow

1. **Frontend Development**:
   - Run `npm run dev` for hot reload development
   - Components use TypeScript for type safety
   - All UI components are in `/src/components/ui/`

2. **Convex Backend**:
   - Run `npx convex dev` in a separate terminal
   - Stats are synced via the ossStats component
   - HTTP routes configured in `convex/http.ts`

3. **Documentation Updates**:
   - Edit MDX files in `/docs`
   - Use `mint dev` to preview changes locally
   - Documentation structure defined in `docs/docs.json`

### Important Notes

- The site uses client-side rendering for the main page to avoid hydration issues
- All shadcn/ui components are pre-customized for the landing page aesthetic
- The Convex backend tracks both the GitHub organization and specific repository
- Environment variables for Convex should be configured in `.env.local`
- The site is optimized for SEO with proper meta tags, Open Graph images, and sitemap

### Common Tasks

**Update Landing Page Content**:

- Hero text: Edit `/src/components/ui/hero.tsx`
- Tech stack: Modify `/src/components/ui/tech-stack.tsx`
- FAQ: Update `/src/components/ui/faq.tsx`

**Add New Documentation**:

1. Create new MDX file in appropriate `/docs` subdirectory
2. Update navigation in `/docs/docs.json`
3. Preview with `mint dev`

**Modify Stats Tracking**:

- Update organizations/repos in `/convex/stats.ts`
- Configure new metrics in the ossStats setup

**Deploy Updates**:

- Push to main branch for automatic Vercel deployment
- Convex backend updates automatically with `npx convex deploy`