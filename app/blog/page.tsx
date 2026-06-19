import Link from "next/link";
import fs from "fs";
import path from "path";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BackToTop from "../components/BackToTop";
import BlogFilters from "../components/BlogFilters";
import { ArrowLeft, ArrowRight, Calendar, User, BookOpen } from "lucide-react";

type SearchParams = Promise<{
  search?: string;
  category?: string;
  page?: string;
}>;

interface PageProps {
  searchParams: SearchParams;
}

export const metadata = {
  title: "M Baazar Editorial - Latest Fashion Trends & Styling Tips",
  description:
    "Explore the latest fashion trends, runway style analyses, clothing tips, and lookbooks from the M Baazar editorial team.",
};

export default async function BlogPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const searchTerm = resolvedParams.search || "";
  const selectedCategory = resolvedParams.category || "";
  const currentPage = parseInt(resolvedParams.page || "1", 10);
  const limit = 6;

  // 1. Read blog posts from local JSON file
  let allPosts = [];
  try {
    const filePath = path.join(process.cwd(), "public/data/blog.json");
    const fileData = fs.readFileSync(filePath, "utf8");
    allPosts = JSON.parse(fileData);
  } catch (error) {
    console.error("Error loading local blog posts JSON database:", error);
  }

  // 2. Dynamically extract categories from posts
  const uniqueCategoriesMap = new Map();
  allPosts.forEach((post: any) => {
    if (post.category && post.category.slug) {
      uniqueCategoriesMap.set(post.category.slug, post.category);
    }
  });
  const categories = Array.from(uniqueCategoriesMap.values());

  // 3. Filter published posts by category & search query
  let filteredPosts = allPosts.filter((post: any) => post.status === "published");

  if (selectedCategory) {
    filteredPosts = filteredPosts.filter(
      (post: any) => post.category?.slug === selectedCategory
    );
  }

  if (searchTerm) {
    const query = searchTerm.toLowerCase();
    filteredPosts = filteredPosts.filter(
      (post: any) =>
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query)
    );
  }

  // 4. Sort posts by publication date (newest first)
  filteredPosts.sort(
    (a: any, b: any) =>
      new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
  );

  // 5. Paginate results
  const totalPosts = filteredPosts.length;
  const totalPages = Math.ceil(totalPosts / limit);
  const startIndex = (currentPage - 1) * limit;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + limit);

  const hasPrevPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

  // Pagination navigation builder
  const buildPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams();
    if (selectedCategory) params.set("category", selectedCategory);
    if (searchTerm) params.set("search", searchTerm);
    params.set("page", pageNumber.toString());
    return `/blog?${params.toString()}`;
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col pt-24">
      {/* Editorial Header Banner */}
      <section className="py-12 border-b border-zinc-100 bg-zinc-50/50">
        <div className="max-w-5xl mx-auto px-6 text-center space-y-4">
          <span className="text-xs font-bold tracking-widest text-red-700 uppercase">
            M Baazar Editorial
          </span>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-zinc-950 uppercase">
            Runway & Stories
          </h1>
          <p className="text-sm sm:text-base text-zinc-500 max-w-lg mx-auto leading-relaxed">
            Discover style tips, global fashion trends, behind-the-scenes previews, and inspiration from our latest lookbooks.
          </p>
        </div>
      </section>

      {/* Filter and Search Section */}
      <section className="py-10">
        <BlogFilters
          categories={categories}
          activeCategory={selectedCategory}
          activeSearch={searchTerm}
        />

        {/* Article Cards Grid */}
        <div className="max-w-6xl mx-auto px-6">
          {paginatedPosts.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <BookOpen className="w-12 h-12 text-zinc-300 mx-auto" />
              <h3 className="text-lg font-bold text-zinc-800">No articles found</h3>
              <p className="text-sm text-zinc-500 max-w-xs mx-auto">
                We couldn&apos;t find any stories matching your search or filters. Try checking different topics!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedPosts.map((post: any) => {
                const dateString = new Date(post.publishedDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                });

                const imageUrl = post.featuredImage || "/media/placeholder.jpg";
                const altText = post.title;
                const authorName = post.author?.name || "Editorial Staff";
                const categoryTitle = post.category?.title || "Fashion";

                return (
                  <article
                    key={post.id}
                    className="group flex flex-col bg-white border border-zinc-100 rounded-lg overflow-hidden shadow-sm hover:shadow-xl hover:border-zinc-200 transition-all duration-300 ease-out"
                  >
                    {/* Featured Image Wrap */}
                    <Link href={`/blog/${post.slug}`} className="relative aspect-[4/3] block overflow-hidden bg-zinc-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={imageUrl}
                        alt={altText}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        loading="lazy"
                      />
                      <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-[10px] font-bold uppercase tracking-wider text-red-700 px-3 py-1 rounded-full shadow-sm">
                        {categoryTitle}
                      </span>
                    </Link>

                    {/* Meta & Info */}
                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2.5">
                        {/* Title */}
                        <h2 className="text-xl font-bold leading-tight text-zinc-950 group-hover:text-red-700 transition-colors">
                          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                        </h2>

                        {/* Excerpt */}
                        <p className="text-sm text-zinc-500 line-clamp-3 leading-relaxed">
                          {post.excerpt}
                        </p>
                      </div>

                      {/* Footer Metadata */}
                      <div className="flex items-center justify-between pt-4 border-t border-zinc-100 text-[11px] text-zinc-400 font-medium">
                        <div className="flex items-center gap-1">
                          <User className="w-3.5 h-3.5" />
                          <span>{authorName}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{dateString}</span>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 mt-16 pt-8 border-t border-zinc-100">
              {hasPrevPage ? (
                <Link
                  href={buildPageUrl(currentPage - 1)}
                  className="flex items-center gap-2 px-4 py-2 border border-zinc-200 rounded-full text-xs font-semibold text-zinc-700 hover:bg-zinc-50 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Previous
                </Link>
              ) : (
                <button
                  disabled
                  className="flex items-center gap-2 px-4 py-2 border border-zinc-100 rounded-full text-xs font-semibold text-zinc-300 cursor-not-allowed"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Previous
                </button>
              )}

              <span className="text-xs font-semibold text-zinc-500">
                Page {currentPage} of {totalPages}
              </span>

              {hasNextPage ? (
                <Link
                  href={buildPageUrl(currentPage + 1)}
                  className="flex items-center gap-2 px-4 py-2 border border-zinc-200 rounded-full text-xs font-semibold text-zinc-700 hover:bg-zinc-50 transition-colors cursor-pointer"
                >
                  Next
                  <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <button
                  disabled
                  className="flex items-center gap-2 px-4 py-2 border border-zinc-100 rounded-full text-xs font-semibold text-zinc-300 cursor-not-allowed"
                >
                  Next
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Footer Section */}
      <Footer />

      {/* Back to Top */}
      <BackToTop />
    </div>
  );
}
