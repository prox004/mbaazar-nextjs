import { getPayload } from "payload";
import config from "../payload.config";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";

  // Main website routes
  const routes = ["", "/blog"].map((route) => ({
    url: `${serverUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  try {
    // Fetch all published blog posts
    const payload = await getPayload({ config });
    const postsData = await payload.find({
      collection: "posts",
      where: {
        status: {
          equals: "published",
        },
      },
      limit: 1000,
      depth: 0,
    });

    const blogUrls = postsData.docs.map((post: any) => ({
      url: `${serverUrl}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt || post.publishedDate),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

    return [...routes, ...blogUrls];
  } catch (err) {
    console.warn("Failed to fetch dynamic blog sitemap posts during build time:", err);
    return routes;
  }
}
