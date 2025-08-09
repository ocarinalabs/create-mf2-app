# Site Configuration Plan for Base-Frontend Template

## Goal
Transform the base-frontend template into a truly plug-and-play marketing site template by centralizing all configuration and content into a single `site.config.ts` file.

## Implementation Plan

### 1. Create Central Configuration File
**File:** `src/lib/site-config.ts`

This file will contain:
- **Metadata**: Site name, description, URL, author
- **SEO**: OpenGraph images, Twitter cards, keywords
- **Content**: Hero text, feature lists, FAQ items
- **Social Links**: Twitter, GitHub, LinkedIn, etc.
- **Navigation**: Menu items and links
- **Company Info**: For footer and legal pages

```typescript
export const siteConfig = {
  // Basic metadata
  name: "Your App Name",
  shortName: "YourApp",
  description: "One-line description for SEO and social shares",
  longDescription: "Longer description for hero section",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://example.com",
  
  // SEO
  keywords: ["saas", "startup", "nextjs"],
  author: {
    name: "Your Name",
    twitter: "@yourusername",
    email: "hello@example.com"
  },
  
  // Social links
  links: {
    twitter: "https://twitter.com/yourusername",
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/company/yourcompany",
  },
  
  // Hero section
  hero: {
    badge: "Eyebrow text for context",
    headline: "Your Headline Should Focus on Transformation",
    description: "Expand on your promise here...",
    primaryCTA: { text: "Try Free", href: "#waitlist" },
    secondaryCTA: { text: "Watch Demo", href: "#demo" }
  },
  
  // Features, pricing, FAQ content...
}
```

### 2. Update Metadata Files to Use Config

#### `src/app/layout.tsx`
- Import siteConfig
- Replace hardcoded metadata with config values
- Generate full metadata object from config

#### `src/app/sitemap.ts`
- Use `siteConfig.url` instead of hardcoded "example.com"
- Could potentially auto-generate from navigation config

#### `src/app/robots.ts`
- Use `siteConfig.url` for sitemap URL
- Add crawl delay and other settings from config if needed

#### `src/app/manifest.ts`
- Use siteConfig name, shortName, description
- Theme colors from config
- Categories from config

#### `src/app/opengraph-image.tsx` & `twitter-image.tsx`
- Generate with site name and tagline from config
- Use brand colors from config

### 3. Update Components to Use Config

#### `src/app/page.tsx`
- Import content from siteConfig
- Pass hero content from config instead of hardcoding
- Use feature list from config for BentoFeatures
- Use FAQ items from config

#### `src/components/ui/hero.tsx`
- Remove hardcoded badge text
- Accept all content as props from config

#### `src/components/ui/footer.tsx`
- Use company info from config
- Use social links from config
- Generate footer links from navigation config

### 4. Create Type-Safe Configuration

Add TypeScript interfaces for all config sections:
```typescript
interface SiteConfig {
  name: string;
  description: string;
  url: string;
  // ... etc
}
```

This ensures users get autocomplete and type checking when editing config.

### 5. Add Configuration Documentation

Create a `CONFIG.md` file explaining:
- Each configuration option
- How to update content
- How to add new sections
- Examples of common customizations

### 6. Optional Enhancements

#### Content Collections (if needed)
For larger content like blog posts or case studies:
```typescript
export const features = [
  { icon: "zap", title: "Fast", description: "..." },
  { icon: "shield", title: "Secure", description: "..." },
]

export const faqs = [
  { question: "...", answer: "..." },
]
```

#### Environment Variable Support
```typescript
url: process.env.NEXT_PUBLIC_SITE_URL || "https://example.com"
```

#### Theme Configuration
```typescript
theme: {
  colors: {
    primary: "blue",
    accent: "purple"
  }
}
```

## Benefits After Implementation

1. **One-Stop Configuration**: Users update ONE file for all site metadata
2. **Type Safety**: TypeScript ensures no missing required fields
3. **Clear Separation**: Config (what to show) vs Components (how to show)
4. **Quick Setup**: Clone → Edit config → Deploy in minutes
5. **Maintainable**: Easy to find and update any piece of content
6. **Extensible**: Easy to add new config options as needed

## Migration Path for Existing Users

Since this is a template, no migration needed. But we should:
1. Update the template README with new instructions
2. Add clear comments in site.config.ts
3. Provide example configurations for common use cases

## Success Metrics

After implementation, a new user should be able to:
- [ ] Clone the template
- [ ] Update site.config.ts with their info (5 minutes)
- [ ] See all metadata updated across the site
- [ ] Deploy to Vercel without touching any other files
- [ ] Have a fully functional marketing site with correct SEO

## Files to Be Modified

1. **Create New:**
   - `src/lib/site-config.ts`
   - `CONFIG.md` (documentation)

2. **Update Existing:**
   - `src/app/layout.tsx`
   - `src/app/sitemap.ts`
   - `src/app/robots.ts`
   - `src/app/manifest.ts`
   - `src/app/opengraph-image.tsx`
   - `src/app/twitter-image.tsx`
   - `src/app/page.tsx`
   - `src/components/ui/hero.tsx`
   - `src/components/ui/footer.tsx`
   - `README.md` (update with new instructions)

## Next Steps

1. Create the site-config.ts file with all necessary fields
2. Update each metadata file to use the config
3. Update components to pull from config
4. Test that changing config updates entire site
5. Document the configuration options
6. Update README with new "Quick Start" instructions