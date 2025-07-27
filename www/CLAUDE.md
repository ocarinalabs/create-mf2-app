# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the MF2 (Move F*cking Fast) Stack landing page and documentation website. Built with Next.js 15, TypeScript, Tailwind CSS v4, and shadcn/ui components. Features real-time GitHub stats tracking via Convex, analytics with Vercel Analytics, and uses Motion for animations.

## Commands

### Development

```bash
# Start development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linting
npm run lint

# Run Knip for dependency checking
npm run knip
```

### Convex Development

```bash
# Start Convex dev server (run in separate terminal)
npx convex dev

# Deploy Convex functions
npx convex deploy
```

## Architecture

### Project Structure

- **`/src/app`**: Next.js 15 App Router pages and layouts
- **`/src/components`**: React components
  - **`/ui`**: shadcn/ui components and custom UI components
  - **`convex-provider.tsx`**: Convex client provider wrapper
  - **`theme-provider.tsx`**: next-themes provider for dark mode
- **`/src/lib`**: Utility functions (mainly `utils.ts` for cn helper)
- **`/src/hooks`**: Custom React hooks (e.g., `use-mobile.ts`)
- **`/convex`**: Convex backend functions
  - **`stats.ts`**: GitHub stats tracking using @erquhart/convex-oss-stats
  - **`http.ts`**: HTTP endpoints

### Key Technologies

- **Frontend**: Next.js 15 with App Router and Turbopack
- **Styling**: Tailwind CSS v4 with CSS variables
- **UI Components**: shadcn/ui (New York style, all components included)
- **Backend**: Convex for real-time data and serverless functions
- **Analytics**: Vercel Analytics
- **Animations**: Motion (Framer Motion successor)
- **Type Safety**: TypeScript with strict mode
- **Dark Mode**: next-themes with system preference support

### Important Implementation Details

1. **Client-Side Rendering**: The main page (`src/app/page.tsx`) is a client component to handle hydration and animations properly.

2. **Convex Integration**: 
   - Provider wraps the app conditionally based on NEXT_PUBLIC_CONVEX_URL
   - Stats tracking for GitHub organization and repository metrics
   - HTTP endpoints configured in `convex/http.ts`

3. **Theme Configuration**:
   - Dark mode by default with system preference support
   - Tailwind CSS v4 with CSS variables for theming
   - All color schemes use neutral base color

4. **Performance Optimizations**:
   - Turbopack for faster development builds
   - Font optimization with Geist and Geist Mono
   - Proper image optimization for OG images

### Environment Variables

Required for full functionality:
- `NEXT_PUBLIC_CONVEX_URL`: Convex deployment URL (optional, gracefully handles absence)

### Deployment Notes

- Optimized for Vercel deployment
- Includes proper metadata, OG images, and sitemap configuration
- Analytics automatically enabled when deployed to Vercel