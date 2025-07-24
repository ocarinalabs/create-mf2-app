import type { MetadataRoute } from "next";
import { readdirSync, statSync } from "fs";
import { join } from "path";

function getAppRoutes(): string[] {
  const routes: string[] = [];
  const appDir = join(process.cwd(), "src", "app");

  function scanDirectory(dir: string, basePath: string = "") {
    try {
      const items = readdirSync(dir);

      for (const item of items) {
        // Skip special Next.js directories and files
        if (
          item.startsWith("_") ||
          item.startsWith("(") ||
          item === "api" ||
          item.includes(".")
        ) {
          continue;
        }

        const fullPath = join(dir, item);
        const stat = statSync(fullPath);

        if (stat.isDirectory()) {
          const routePath = basePath ? `${basePath}/${item}` : item;

          // Check if this directory has a page.tsx
          try {
            statSync(join(fullPath, "page.tsx"));
            routes.push(routePath);
          } catch {}

          // Recursively scan subdirectories
          scanDirectory(fullPath, routePath);
        }
      }
    } catch (error) {
      console.error("Error scanning directory:", error);
    }
  }

  scanDirectory(appDir);
  return routes;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://mf2stack.dev";

  // Always include the root
  const entries: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];

  // Get all app routes dynamically
  const appRoutes = getAppRoutes();

  for (const route of appRoutes) {
    // Assign priority based on route depth
    const depth = route.split("/").length;
    const priority = Math.max(0.4, 0.8 - (depth - 1) * 0.1);

    entries.push({
      url: `${baseUrl}/${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority,
    });
  }

  // TODO: Add dynamic content here
  // For example, if you have blog posts from a CMS:
  // const posts = await getPosts();
  // for (const post of posts) {
  //   entries.push({
  //     url: `${baseUrl}/blog/${post.slug}`,
  //     lastModified: new Date(post.updatedAt),
  //     changeFrequency: 'weekly',
  //     priority: 0.6,
  //   });
  // }

  return entries;
}
