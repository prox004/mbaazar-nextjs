export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  publishedDate: string;
  category: {
    id: string;
    title: string;
    slug: string;
  };
  author: {
    name: string;
  };
  tags: string[];
  status: "published" | "draft";
}

function decodeHtmlEntities(str: string): string {
  if (!str) return "";
  return str
    .replace(/&#038;/g, "&")
    .replace(/&amp;/g, "&")
    .replace(/&#8211;/g, "–")
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const res = await fetch("https://mbaazar.in/wp-json/wp/v2/posts", {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });
    
    if (!res.ok) {
      throw new Error(`Failed to fetch posts: ${res.statusText}`);
    }
    
    const wpPosts = await res.json();
    
    return wpPosts.map((wpPost: any) => {
      // Extract category from CSS class list
      let categorySlug = "fashion";
      let categoryTitle = "Fashion";
      if (wpPost.class_list && Array.isArray(wpPost.class_list)) {
        const catClass = wpPost.class_list.find(
          (cls: string) => cls.startsWith("category-") && cls !== "category-uncategorized"
        );
        if (catClass) {
          categorySlug = catClass.replace("category-", "");
          categoryTitle = categorySlug
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
        }
      }

      // Extract tags
      const tags: string[] = [];
      if (wpPost.class_list && Array.isArray(wpPost.class_list)) {
        wpPost.class_list.forEach((cls: string) => {
          if (cls.startsWith("tag-")) {
            tags.push(cls.replace("tag-", ""));
          }
        });
      }

      const cleanExcerpt = decodeHtmlEntities(
        wpPost.excerpt?.rendered
          ? wpPost.excerpt.rendered.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim()
          : ""
      );

      return {
        id: wpPost.id.toString(),
        title: decodeHtmlEntities(wpPost.title?.rendered || "Untitled Post"),
        slug: wpPost.slug,
        excerpt: cleanExcerpt,
        content: wpPost.content?.rendered || "",
        featuredImage: wpPost.yoast_head_json?.og_image?.[0]?.url || "/media/placeholder.jpg",
        publishedDate: wpPost.date || new Date().toISOString(),
        category: {
          id: categorySlug,
          title: categoryTitle,
          slug: categorySlug,
        },
        author: {
          name: wpPost.yoast_head_json?.author === "admin" ? "M Baazar Staff" : (wpPost.yoast_head_json?.author || "M Baazar Staff"),
        },
        tags: tags,
        status: wpPost.status === "publish" ? "published" : "draft",
      };
    });
  } catch (error) {
    console.error("Error fetching WordPress blog posts:", error);
    return [];
  }
}
