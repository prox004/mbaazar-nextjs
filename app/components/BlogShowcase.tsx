"use client";
import React, { useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface DummyPost {
  id: number;
  title: string;
  image: string;
  category: string;
  readTime: string;
  slug: string;
}

const DUMMY_POSTS: DummyPost[] = [
  {
    id: 1,
    title: "Top Saree Trends Every Woman Should Know in 2026",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=800",
    category: "SAREE TRENDS",
    readTime: "5 MIN",
    slug: "top-saree-trends-2026",
  },
  {
    id: 2,
    title: "How To Choose The Perfect Outfit For Durga Puja",
    image: "https://i.pinimg.com/564x/96/84/99/9684998a5dbf6c29eb604f4726187aa1.jpg",
    category: "FESTIVE FASHION",
    readTime: "6 MIN",
    slug: "perfect-outfit-for-durga-puja",
  },
  {
    id: 3,
    title: "Wedding Season Essentials: Ethnic Styles That Never Fail",
    image: "https://thumbs.dreamstime.com/b/portrait-very-beautiful-young-indian-bride-luxurious-bridal-costume-makeup-heavy-jewellery-studio-lighting-206370642.jpg",
    category: "WEDDING STYLE",
    readTime: "7 MIN",
    slug: "wedding-season-ethnic-styles",
  },
  {
    id: 4,
    title: "Kurti Styling Guide: From Office Wear To Festive Looks",
    image: "https://m.media-amazon.com/images/I/81nX7XsVmeL._AC_UY1100_.jpg",
    category: "STYLE GUIDE",
    readTime: "5 MIN",
    slug: "kurti-styling-guide",
  },
  {
    id: 5,
    title: "The Ultimate Guide To Building An Ethnic Wardrobe",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSh72n-YV9chGBSdPx0Dfp_vA2GnHYdYjexnYkTV52xtvKkF5zh_K2mrGI&s=10",
    category: "FASHION GUIDE",
    readTime: "8 MIN",
    slug: "ultimate-ethnic-wardrobe-guide",
  },
];


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

  // Autoplay functionality
  useEffect(() => {
    if (!emblaApi) return;

    const autoplay = setInterval(() => {
      emblaApi.scrollNext();
    }, 4500);

    return () => clearInterval(autoplay);
  }, [emblaApi]);

  // Triple posts array internally so that loop: true has enough slides to loop continuously
  const cycledPosts = [...DUMMY_POSTS, ...DUMMY_POSTS, ...DUMMY_POSTS].map((post, idx) => ({
    ...post,
    uniqueId: `${post.id}-${idx}`,
  }));

  return (
    <section className="py-20 overflow-hidden w-full bg-[#FFFFFF]">
      <div className="container max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="mb-12 items-center">
          <h2
            className="font-medium tracking-tight text-zinc-950 font-montserrat mb-4 md:whitespace-nowrap text-3xl sm:text-5xl md:text-[60px]"
            style={{ letterSpacing: "-0.03em", lineHeight: "0.95" }}
          >
            Latest from the <span className="italic" style={{ fontFamily: "Georgia, serif", color: "rgb(185, 28, 28)" }}>editorial blog.</span>
          </h2>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <p className="text-zinc-500 text-sm sm:text-base leading-relaxed max-w-2xl">
              Explore style tips, global fashion trends, behind-the-scenes previews, and inspiration from our latest collections.
            </p>
            {/* Carousel Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={scrollPrev}
                className="p-3 rounded-full border border-zinc-200 bg-[#FFFFFF] text-zinc-700 hover:bg-red-700 hover:text-white hover:border-red-700 transition-all duration-300 shadow-sm cursor-pointer"
                aria-label="Previous slide"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button
                onClick={scrollNext}
                className="p-3 rounded-full border border-zinc-200 bg-[#FFFFFF] text-zinc-700 hover:bg-red-700 hover:text-white hover:border-red-700 transition-all duration-300 shadow-sm cursor-pointer"
                aria-label="Next slide"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Embla Viewport */}
        <div className="embla overflow-hidden" ref={emblaRef}>
          <div className="embla__container flex -ml-6">
            {cycledPosts.map((post) => (
              <div
                key={post.uniqueId}
                className="embla__slide flex-none pl-6 w-full sm:w-1/2 lg:w-1/4 min-w-0"
              >
                <Link href="/blog" className="group block h-full">
                  {/* Aspect ratio container matching target image (vertical aspect-[3/4]) */}
                  <div className="relative aspect-[3/4] rounded-[24px] overflow-hidden bg-zinc-100 shadow-sm transition-all duration-500 group-hover:shadow-md">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* White badge overlay at top-right */}
                    <div className="absolute top-4 right-4 bg-white text-zinc-950 text-[10px] font-extrabold tracking-widest uppercase px-3.5 py-1.5 rounded-full shadow-sm">
                      {post.category} • {post.readTime}
                    </div>
                  </div>

                  {/* Clean Borderless Typography Below Image */}
                  <div className="mt-4">
                    <h3 className="text-zinc-950 font-medium font-poppins text-lg leading-snug group-hover:text-red-700 transition-colors">
                      {post.title}
                    </h3>
                    <div className="text-zinc-400 font-bold uppercase tracking-wider text-[11px] flex items-center gap-1 mt-2.5 transition-colors group-hover:text-red-700">
                      Read Story <span className="text-xs">↗</span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="mt-16 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-bold text-red-700 hover:text-red-700 transition-colors uppercase tracking-wider"
          >
            View All Editorial Posts
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
