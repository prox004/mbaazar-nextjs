"use client";

import React from "react";
import Link from "next/link";

interface CategoryItem {
  id: string;
  title: string;
  imgSrc: string;
  alt: string;
  href: string;
}

export default function Categories() {
  const categories: CategoryItem[] = [
    {
      id: "mens",
      title: "Menswear",
      imgSrc: "images/collections/mens.jpg",
      alt: "Menswear",
      href: "/shop?category=men",
    },
    {
      id: "womens",
      title: "Womenswear",
      imgSrc: "images/collections/womens.jpg",
      alt: "Womenswear",
      href: "/shop?category=women",
    },
    {
      id: "kidswear",
      title: "Kidswear",
      imgSrc: "images/collections/kids.jpg",
      alt: "Kidswear",
      href: "/shop?category=kids",
    },
    {
      id: "accessories",
      title: "Accessories",
      imgSrc: "images/collections/accessories.jpg",
      alt: "Accessories",
      href: "/shop?category=accessories",
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-white text-black w-full overflow-hidden">
      <div className="w-full px-4 sm:px-6 lg:px-12">
        {/* Centered Header Section */}
        <div className="mb-10 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950">
            Browse By <span className="text-red-600">Category</span>
          </h2>
        </div>

        {/* Categories container: Flex/Scroll on mobile, grid on desktop */}
        <div
          className="flex overflow-x-auto snap-x snap-mandatory gap-4 sm:gap-6 pb-6 lg:pb-0 lg:grid lg:grid-cols-4 lg:gap-8 lg:overflow-x-visible lg:snap-none"
          style={{
            scrollbarWidth: "none", // Hide scrollbar in Firefox
            msOverflowStyle: "none", // Hide scrollbar in IE/Edge
          }}
        >
          {/* Hide scrollbar for Webkit browsers */}
          <style jsx global>{`
            .flex::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          {categories.map((category) => (
            <div
              key={category.id}
              className="group relative rounded-2xl overflow-hidden bg-zinc-50 border border-zinc-100 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-zinc-200 aspect-[3/4] shrink-0 w-[78vw] sm:w-[45vw] snap-center lg:w-auto lg:snap-align-none"
            >
              {/* Image Container with Zoom effect */}
              <Link href={category.href} className="block w-full h-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  src={category.imgSrc}
                  alt={category.alt}
                  onError={(e) => {
                    // Fallback placeholder
                    (e.target as HTMLImageElement).src = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="400" viewBox="0 0 300 400"><rect width="300" height="400" fill="%23f4f4f5"/><circle cx="150" cy="200" r="15" fill="%23d4d4d8"/></svg>`;
                  }}
                />
              </Link>

              {/* Overlay Content: Pill Button */}
              <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 w-[85%] max-w-[200px] z-10">
                <Link
                  href={category.href}
                  className="flex items-center justify-between bg-white text-zinc-900 rounded-full px-5 py-2.5 sm:py-3 shadow-md hover:shadow-lg transition-all duration-300 group-hover:bg-zinc-950 group-hover:text-white border border-zinc-100/50 hover:scale-[1.03]"
                >
                  <span className="text-xs sm:text-sm font-semibold tracking-wide">
                    {category.title}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    className="w-4 h-4 transform transition-transform duration-300 group-hover:rotate-45"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
