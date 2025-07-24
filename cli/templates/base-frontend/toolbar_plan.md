# Vercel Toolbar Integration Plan

## Overview
The Vercel Toolbar provides powerful development and collaboration features including comments, feature flags, layout shift detection, accessibility audits, and more.

## Installation Steps

### 1. Install the Vercel Toolbar package
```bash
npm install @vercel/toolbar
```

### 2. Update next.config.ts
```typescript
import type { NextConfig } from "next";

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const withVercelToolbar = require('@vercel/toolbar/plugins/next')();

const nextConfig: NextConfig = {
  /* config options here */
};

// Chain the plugins - order matters
export default withBundleAnalyzer(
  withVercelToolbar(nextConfig)
);
```

### 3. Add VercelToolbar to layout.tsx
```typescript
import { VercelToolbar } from '@vercel/toolbar/next';

// Inside RootLayout, after </ThemeProvider> and before <Analytics />
{process.env.NODE_ENV === 'development' && <VercelToolbar />}
```

### 4. Update .env.example
```env
# Vercel
FLAGS_SECRET=your_flags_secret_here
```

### 5. Optional: Create Staff Toolbar for Production
Create `/src/components/staff-toolbar.tsx`:
```typescript
'use client';
import { VercelToolbar } from '@vercel/toolbar/next';

export function StaffToolbar() {
  // Add your auth logic here
  const isStaff = false; // Replace with actual auth check
  return isStaff ? <VercelToolbar /> : null;
}
```

## Features Enabled

### Development Environment
- **Comments**: Leave feedback on any page
- **Feature Flags**: Override flags for testing
- **Layout Shifts**: Detect elements causing layout shifts
- **Accessibility**: Automatic WCAG 2.0 A/AA audit
- **Interaction Timing**: Monitor Core Web Vitals (INP)
- **Share**: Generate shareable deployment URLs

### Preview Deployments
- All features automatically enabled
- Team collaboration through comments
- No additional setup required

### Production (Optional)
- Use browser extension for team members
- Or implement conditional rendering with StaffToolbar
- Requires authentication logic

## User Setup Instructions

1. **Link to Vercel**: Run `vercel link` in project root
2. **Set FLAGS_SECRET**: Add to `.env.local` for feature flags
3. **For Production**: Install browser extension or use StaffToolbar pattern

## Benefits
- Zero-config on preview deployments
- Improved collaboration with comments
- Performance monitoring built-in
- Accessibility testing automated
- Feature flag testing simplified