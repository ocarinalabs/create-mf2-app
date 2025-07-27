# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the **base-frontend** template for create-mf2-app, a CLI tool that creates startup-ready web applications using the MF2 Stack (Move F\*cking Fast Stack) by Korrect. This template provides a production-ready landing page with modern web technologies.

## Commands

### Development

```bash
# Install dependencies
npm install

# Development server with Turbopack (fast refresh)
npm run dev

# Production build
npm run build

# Start production server
npm start

# Run ESLint
npm run lint

# Bundle analyzer (requires ANALYZE=true)
npm run analyze
```

## Architecture

### Tech Stack

This frontend template includes:

- **Next.js 15**: React framework with App Router
- **TypeScript**: Type safety throughout
- **Tailwind CSS v4**: Utility-first styling
- **shadcn/ui**: Complete component library (all components pre-installed)
- **Dark mode**: Theme support with next-themes
- **SEO**: Built-in metadata helpers
- **Analytics**: Vercel Analytics ready
- **Motion**: Framer Motion for animations

### Project Structure

```
/src
├── app/                  # Next.js App Router
│   ├── layout.tsx       # Root layout with providers
│   ├── page.tsx         # Homepage
│   ├── globals.css      # Global styles and Tailwind
│   ├── manifest.ts      # PWA manifest
│   └── (metadata files) # Icons, OG images, sitemap
├── components/
│   ├── ui/              # All shadcn/ui components
│   ├── icons/           # Icon components
│   ├── logo.tsx         # Brand logo
│   └── (features)       # Landing page components
├── hooks/               # Custom React hooks
└── lib/                 # Utilities
```

### Key Files

- **`components.json`**: shadcn/ui configuration
- **`next.config.ts`**: Next.js configuration
- **`tailwind.config.ts`**: Tailwind CSS configuration
- **`postcss.config.mjs`**: PostCSS for Tailwind v4

## Development Workflow

### Working with Components

All shadcn/ui components are pre-installed in `/src/components/ui/`. The template includes:

- Form components (form, input, button, etc.)
- Layout components (card, dialog, sheet, etc.)
- Data display (table, accordion, tabs, etc.)
- Feedback (alert, toast via sonner, etc.)
- Navigation (dropdown, navigation menu, etc.)

### Adding New Features

1. **Pages**: Add new routes in `/src/app/`
2. **Components**: Create in `/src/components/`
3. **Styles**: Use Tailwind classes, theme colors use CSS variables
4. **Icons**: Import from `lucide-react` or add to `/src/components/icons/`

### Theme System

- Colors defined via CSS variables in `globals.css`
- Light/dark mode toggle via `mode-toggle.tsx`
- Theme provider wraps the app in `layout.tsx`

### SEO & Metadata

- Dynamic metadata using Next.js metadata API
- Helper functions in `/src/lib/` for consistent metadata
- Automatic sitemap generation at `/sitemap.ts`
- Open Graph images configured

## Important Patterns

### Using Tailwind CSS v4

This template uses Tailwind CSS v4 with:

- PostCSS configuration for processing
- `@tailwind` imports in globals.css
- `cn()` utility for conditional classes

### Component Patterns

```typescript
// Using cn() for conditional classes
import { cn } from "@/lib/utils";

<div className={cn("base-classes", condition && "conditional-classes")} />;
```

### Form Handling

Forms use react-hook-form with zod validation:

```typescript
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
```

## Template-Specific Features

This frontend template includes pre-built landing page components:

- Hero section with animations
- Bento grid feature showcase
- Pricing section with tabs
- FAQ accordion
- Waitlist form with confetti
- Footer with links
- Background patterns

All components are fully customizable and use the established design system.

## Performance Considerations

- Turbopack enabled for faster development
- Image optimization with Next.js Image
- Font optimization with next/font
- Bundle analyzer available for production builds

## Deployment

This template is optimized for Vercel deployment but works with any Node.js hosting:

- Environment variables in `.env.local`
- Automatic preview deployments
- Edge runtime compatible

## Notes for Future Claude Instances

1. This is a template file that gets copied when users run `create-mf2-app`
2. All UI components are pre-installed - no need to add individual shadcn components
3. The template is intentionally opinionated to enable fast shipping
4. When suggesting changes, maintain consistency with existing patterns
5. The MF2 philosophy prioritizes shipping speed over perfection
