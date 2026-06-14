import fs from "fs";
import path from "path";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import BackToTop from "../../components/BackToTop";
import { notFound } from "next/navigation";
import { ChevronRight, Calendar, User, ArrowLeft, Tag } from "lucide-react";
import type { Metadata } from "next";

type Params = Promise<{
  slug: string;
}>;

interface PageProps {
  params: Params;
}

// 1. Dynamic SEO Metadata Generation
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  let allPosts = [];
  try {
    const filePath = path.join(process.cwd(), "public/data/blog.json");
    const fileData = fs.readFileSync(filePath, "utf8");
    allPosts = JSON.parse(fileData);
  } catch (error) {
    console.error("Error loading blog posts for metadata:", error);
  }

  const post = allPosts.find((p: any) => p.slug === slug && p.status === "published");

  if (!post) {
    return {
      title: "Article Not Found",
    };
  }

  const title = post.title;
  const description = post.excerpt;
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";
  const postUrl = `${serverUrl}/blog/${post.slug}`;
  const imageUrl = post.featuredImage || "";

  return {
    title: `${title} | M Baazar Editorial`,
    description,
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      title: `${title} | M Baazar Editorial`,
      description,
      url: postUrl,
      type: "article",
      publishedTime: post.publishedDate,
      images: imageUrl ? [{ url: imageUrl, alt: title }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | M Baazar Editorial`,
      description,
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;

  // 1. Fetch Post Detail from JSON
  let allPosts = [];
  try {
    const filePath = path.join(process.cwd(), "public/data/blog.json");
    const fileData = fs.readFileSync(filePath, "utf8");
    allPosts = JSON.parse(fileData);
  } catch (error) {
    console.error("Error loading blog posts for detail page:", error);
  }

  const post = allPosts.find((p: any) => p.slug === slug && p.status === "published");

  if (!post) {
    notFound();
  }

  const dateString = new Date(post.publishedDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const category = post.category;
  const author = post.author;
  const imageUrl = post.featuredImage || "/media/placeholder.jpg";
  const imageAlt = post.title;

  // 2. Fetch Related Posts (same category, excluding this post)
  const relatedPosts = allPosts
    .filter(
      (p: any) =>
        p.status === "published" &&
        p.category?.id === category?.id &&
        p.id !== post.id
    )
    .slice(0, 3);

  // 3. Structured JSON-LD Article Data for Google Rich Snippets
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "image": imageUrl.startsWith("http") ? imageUrl : `${serverUrl}${imageUrl}`,
    "datePublished": post.publishedDate,
    "author": {
      "@type": "Person",
      "name": author?.name || "M Baazar Staff",
    },
    "publisher": {
      "@type": "Organization",
      "name": "M Baazar",
      "url": serverUrl,
      "logo": {
        "@type": "ImageObject",
        "url": `${serverUrl}/favicon.ico`,
      },
    },
    "description": post.excerpt,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${serverUrl}/blog/${post.slug}`,
    },
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col pt-5">
      {/* Inject JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-6xl mx-auto px-6 w-full py-8 flex-1">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-xs text-zinc-400 font-medium mb-8 overflow-x-auto whitespace-nowrap py-1">
          <Link href="/" className="hover:text-red-600 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          <Link href="/blog" className="hover:text-red-600 transition-colors">
            Blog
          </Link>
          <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          {category && (
            <>
              <Link
                href={`/blog?category=${category.slug}`}
                className="hover:text-red-600 transition-colors"
              >
                {category.title}
              </Link>
              <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            </>
          )}
          <span className="text-zinc-600 font-semibold truncate max-w-[200px]">
            {post.title}
          </span>
        </nav>

        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-500 hover:text-red-600 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to all stories
        </Link>

        {/* Grid layout for Content & Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Main Article Column */}
          <main className="lg:col-span-8">
            {/* Article Header */}
            <header className="space-y-6 mb-10">
              {category && (
                <span className="inline-block bg-red-50 text-red-600 text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full">
                  {category.title}
                </span>
              )}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-zinc-950 leading-tight uppercase">
                {post.title}
              </h1>

              <p className="text-lg text-zinc-500 italic font-medium leading-relaxed">
                {post.excerpt}
              </p>

              {/* Author & Date Card */}
              <div className="flex flex-wrap gap-4 items-center justify-between py-4 border-y border-zinc-100 text-xs text-zinc-500 font-medium">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-zinc-100 flex items-center justify-center font-bold text-zinc-800 text-[10px] uppercase">
                    {author?.name?.slice(0, 2) || "ED"}
                  </div>
                  <div>
                    <span className="block text-zinc-800 font-semibold">{author?.name || "Editorial Staff"}</span>
                    <span className="text-[10px] text-zinc-400">Contributor</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {dateString}
                  </span>
                </div>
              </div>
            </header>

            {/* Featured Image */}
            <div className="aspect-[16/9] w-full rounded-3xl overflow-hidden bg-zinc-100 border border-zinc-100 shadow-sm mb-12">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageUrl}
                alt={imageAlt}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Local HTML Content rendering safely */}
            <article
              className="prose max-w-none mb-16 pb-12 border-b border-zinc-100 text-zinc-800 leading-relaxed space-y-6"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Article Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mb-16">
                <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5" /> Tagged In
                </h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag: string, idx: number) => (
                    <span
                      key={idx}
                      className="bg-zinc-50 border border-zinc-100 text-zinc-600 text-xs px-3 py-1.5 rounded-full font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </main>

          {/* Right Sidebar */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-8">
            <div className="border border-zinc-100 rounded-3xl p-6 bg-zinc-50/50">
              <h3 className="text-sm font-black uppercase tracking-wider text-zinc-900 mb-6 pb-3 border-b border-zinc-100">
                Recent <span className="text-red-600">Stories</span>
              </h3>
              <div className="space-y-6">
                {allPosts
                  .filter((p: any) => p.status === "published" && p.id !== post.id)
                  .slice(0, 5)
                  .map((recentPost: any) => {
                    const recentImg = recentPost.featuredImage || "/media/placeholder.jpg";
                    const recentDate = new Date(recentPost.publishedDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    });
                    return (
                      <div key={recentPost.id} className="flex gap-4 group items-start">
                        <Link
                          href={`/blog/${recentPost.slug}`}
                          className="relative w-16 h-16 shrink-0 rounded-xl overflow-hidden bg-zinc-100 border border-zinc-100 block"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={recentImg}
                            alt={recentPost.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </Link>
                        <div className="space-y-1 min-w-0">
                          <span className="text-[9px] font-bold uppercase tracking-wider text-red-600 block">
                            {recentPost.category?.title || "Fashion"}
                          </span>
                          <h4 className="text-xs font-bold text-zinc-900 group-hover:text-red-600 transition-colors line-clamp-2 leading-snug">
                            <Link href={`/blog/${recentPost.slug}`}>{recentPost.title}</Link>
                          </h4>
                          <span className="text-[10px] text-zinc-400 block font-medium">
                            {recentDate}
                          </span>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </aside>
        </div>

        {/* Related Posts Section */}
        {relatedPosts.length > 0 && (
          <section className="py-12 border-t border-zinc-100 mt-12">
            <h2 className="text-2xl font-black uppercase tracking-tight text-zinc-950 mb-8">
              Related <span className="text-red-600">Stories</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relPost: any) => {
                const relImageUrl = relPost.featuredImage || "/media/placeholder.jpg";
                const relImageAlt = relPost.title;
                const relDateString = new Date(relPost.publishedDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                });

                return (
                  <div
                    key={relPost.id}
                    className="group flex flex-col bg-white border border-zinc-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-zinc-200 transition-all duration-300"
                  >
                    <Link
                      href={`/blog/${relPost.slug}`}
                      className="relative aspect-[4/3] block overflow-hidden bg-zinc-100"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={relImageUrl}
                        alt={relImageAlt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </Link>
                    <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <span className="text-[9px] font-bold uppercase tracking-wider text-red-600 block mb-1">
                          {relPost.category?.title || "Fashion"}
                        </span>
                        <h3 className="text-sm font-bold text-zinc-900 group-hover:text-red-600 transition-colors line-clamp-2 leading-snug">
                          <Link href={`/blog/${relPost.slug}`}>{relPost.title}</Link>
                        </h3>
                      </div>
                      <span className="text-[10px] text-zinc-400 font-medium block">
                        {relDateString}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </div>

      <Footer />
      <BackToTop />
    </div>
  );
}
