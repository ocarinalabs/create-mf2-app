# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Install dependencies
npm install

# Start development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linting
npm run lint
```

## High-Level Architecture

This is a Next.js 15 application template for landing pages and marketing sites, built with:

- **Next.js 15** with App Router and Turbopack
- **TypeScript** for type safety
- **Tailwind CSS v4** with PostCSS for styling
- **shadcn/ui** components library (pre-configured)
- **Vercel Analytics** for tracking
- **Dark mode** support with next-themes

### Project Structure

```
src/
├── app/                 # Next.js App Router pages and layouts
│   ├── layout.tsx      # Root layout with theme provider
│   ├── page.tsx        # Home page
│   └── globals.css     # Global styles and Tailwind imports
├── components/
│   ├── ui/             # shadcn/ui components (40+ pre-built)
│   ├── icons/          # Icon components
│   ├── logo.tsx        # Logo component
│   └── theme-provider.tsx
├── hooks/              # Custom React hooks
└── lib/                # Utility functions
```

### Key Implementation Details

1. **Component Library**: All shadcn/ui components are pre-installed and configured in `src/components/ui/`. These include:

   - Layout components (Card, Dialog, Sheet, Tabs)
   - Form components (Button, Input, Select, etc.)
   - Marketing components (Hero, Pricing, FAQ, Waitlist)
   - Animation components (BlurFade, Confetti, Marquee)

2. **Styling**: Uses Tailwind CSS v4 with CSS variables for theming. The `tw-animate-css` package provides additional animations.

3. **Path Aliases**: TypeScript configured with `@/*` alias pointing to `src/*`

4. **Font Setup**: Uses Geist and Geist Mono fonts from Google Fonts

5. **Theme**: Dark mode enabled by default with system preference support

### Development Workflow

- Components follow shadcn/ui patterns with `cn()` utility for className merging
- All components are server components by default unless they use hooks or browser APIs
- Marketing-focused components like Hero, Pricing, and FAQ are ready to customize
