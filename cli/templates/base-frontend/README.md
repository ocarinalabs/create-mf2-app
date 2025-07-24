# MF² Stack - Frontend Template

A modern web starter with Next.js, TypeScript, and Tailwind CSS. Build beautiful, fast websites in minutes, not hours.

## Features

- ⚡ **Next.js 15** - Latest React framework with App Router
- 🎨 **Tailwind CSS v4** - Utility-first CSS framework
- 🧩 **shadcn/ui** - Beautiful, accessible UI components
- 🌙 **Dark Mode** - Built-in theme switching with next-themes
- 📱 **Responsive** - Mobile-first design approach
- 🔍 **SEO Ready** - Optimized metadata and Open Graph images
- 📊 **Analytics** - Vercel Analytics integration
- 🚀 **Fast** - Turbopack for lightning-fast HMR
- 🛠️ **TypeScript** - Full type safety
- 📦 **Bundle Analyzer** - Optimize your bundle size

## Getting Started

1. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open [http://localhost:3000](http://localhost:3000)**

## Project Structure

```
├── src/
│   ├── app/              # Next.js app directory
│   │   ├── layout.tsx    # Root layout with providers
│   │   ├── page.tsx      # Homepage
│   │   └── globals.css   # Global styles
│   ├── components/       # React components
│   │   ├── ui/          # shadcn/ui components
│   │   └── ...          # Custom components
│   └── lib/             # Utility functions
├── public/              # Static assets
└── ...                  # Config files
```

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run analyze` - Analyze bundle size

## Customization

### Adding Components

Install new shadcn/ui components:
```bash
npx shadcn@latest add button
```

### Styling

- Edit `src/app/globals.css` for global styles
- Use Tailwind utilities for component styling
- Theme colors are defined as CSS variables

### Metadata

Update metadata in `src/app/layout.tsx` and customize:
- `src/app/icon.tsx` - Favicon
- `src/app/opengraph-image.tsx` - OG image
- `src/app/robots.ts` - Robots.txt
- `src/app/sitemap.ts` - Sitemap

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import to Vercel
3. Deploy

### Other Platforms

Build and export:
```bash
npm run build
```

## License

MIT