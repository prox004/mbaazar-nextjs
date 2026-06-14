"use client";

import React, { useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Calendar, User, BookOpen } from "lucide-react";
import blogData from "@/public/data/blog.json";

export default function BlogShowcase() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // Autoplay functionality using setInterval
  useEffect(() => {
    if (!emblaApi) return;

    const autoplay = setInterval(() => {
      emblaApi.scrollNext();
    }, 4500);

    return () => clearInterval(autoplay);
  }, [emblaApi]);

  // Filter published posts
  const publishedPosts = blogData.filter((post: any) => post.status === "published");

  return (
    <section className="py-20 overflow-hidden w-full">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-zinc-950">
              Latest from the <span className="text-red-600">Blog</span>
            </h2>
            <p className="text-zinc-500 text-sm sm:text-base mt-3 leading-relaxed">
              Explore style tips, global fashion trends, behind-the-scenes previews, and inspiration from our latest collections.
            </p>
          </div>

          {/* Carousel Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={scrollPrev}
              className="p-3 rounded-full border border-zinc-200 bg-white text-zinc-700 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-300 shadow-sm"
              aria-label="Previous slide"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollNext}
              className="p-3 rounded-full border border-zinc-200 bg-white text-zinc-700 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-300 shadow-sm"
              aria-label="Next slide"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Embla Viewport */}
        <div className="embla overflow-hidden" ref={emblaRef}>
          <div className="embla__container flex gap-6">
            {publishedPosts.map((post: any) => {
              const dateString = new Date(post.publishedDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              });

              const categoryTitle = post.category?.title || "Fashion";
              const authorName = post.author?.name || "Editorial Staff";

              return (
                <div
                  key={post.id}
                  className="embla__slide flex-none w-full sm:w-[50%] lg:w-[33.33%] min-w-0"
                >
                  <article className="group h-full flex flex-col bg-white border border-zinc-200/60 rounded-2xl overflow-hidden shadow-xs hover:shadow-lg hover:border-red-200 transition-all duration-300">

                    {/* Featured Image */}
                    <Link
                      href={`/blog/${post.slug}`}
                      className="relative aspect-[16/10] block overflow-hidden bg-zinc-100"
                    >
                      <img
                        src={post.featuredImage || "/media/placeholder.jpg"}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                        loading="lazy"
                      />
                      <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-[10px] font-bold uppercase tracking-wider text-red-600 px-3 py-1 rounded-full shadow-sm">
                        {categoryTitle}
                      </span>
                    </Link>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col justify-between gap-6">
                      <div className="space-y-3">
                        {/* Title */}
                        <h3 className="text-xl font-bold leading-snug text-zinc-950 group-hover:text-red-600 transition-colors line-clamp-2">
                          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                        </h3>

                        {/* Excerpt */}
                        <p className="text-sm text-zinc-500 leading-relaxed line-clamp-3">
                          {post.excerpt.replace(/Continue reading.*/g, "").trim()}
                        </p>
                      </div>

                      {/* Footer Metadata */}
                      <div className="flex items-center justify-between pt-4 border-t border-zinc-100 text-[11px] text-zinc-400 font-medium">
                        <div className="flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-zinc-400" />
                          <span>{authorName}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                          <span>{dateString}</span>
                        </div>
                      </div>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>
        </div>

        {/* View All Button */}
        <div className="mt-12 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-red-600 hover:text-red-700 transition-colors uppercase tracking-wider"
          >
            View All Editorial Posts
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
