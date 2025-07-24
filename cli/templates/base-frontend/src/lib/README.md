# Lib Utilities

## Metadata Helper

The `createMetadata` function provides a consistent way to generate metadata for your pages while maintaining SEO best practices.

### Basic Usage

```tsx
// app/about/page.tsx
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "About Us",
  description: "Learn more about our mission and team",
});
```

### With Custom Image

```tsx
// app/blog/[slug]/page.tsx
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "My Blog Post",
  description: "An interesting article about...",
  image: "/blog/my-post-cover.jpg",
  pathname: "/blog/my-post",
});
```

### No-Index Pages

```tsx
// app/admin/page.tsx
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Admin Dashboard",
  noIndex: true, // Prevents search engines from indexing this page
});
```

### API

- `title`: Override the page title
- `description`: Override the page description
- `image`: Custom OG/Twitter image URL
- `keywords`: Additional keywords to append to defaults
- `noIndex`: Set to true to prevent indexing
- `pathname`: Page pathname for proper OG URL

The function deep merges your custom metadata with sensible defaults, ensuring consistency across your application.
