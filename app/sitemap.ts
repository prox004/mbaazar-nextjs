import fs from "fs";
import path from "path";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";

  let blogUrls: any[] = [];
  try {
    const filePath = path.join(process.cwd(), "public/data/blog.json");
    const fileData = fs.readFileSync(filePath, "utf8");
    const posts = JSON.parse(fileData);

    blogUrls = posts
      .filter((post: any) => post.status === "published")
      .map((post: any) => ({
        url: `${serverUrl}/blog/${post.slug}`,
        lastModified: new Date(post.publishedDate),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      }));
  } catch (err) {
    console.error("Failed to generate dynamic sitemap for blog posts:", err);
  }

  // Main website routes
  const routes = ["", "/blog"].map((route) => ({
    url: `${serverUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  return [...routes, ...blogUrls];
}
