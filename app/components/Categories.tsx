"use client";

import React from "react";
import Link from "next/link";
import TiltedCard from "../../components/TiltedCard";
import SplitText from "../../components/SplitText";

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
      imgSrc: "https://www.urbanofashion.com/cdn/shop/articles/jakt-denimball-lblue_ee2db409-75a8-4d43-a1d4-d13ea19bcea3.webp?v=1774848754",
      alt: "Menswear",
      href: "/shop?category=men",
    },
    {
      id: "womens",
      title: "Womenswear",
      imgSrc: "https://www.lakshita.com/cdn/shop/articles/IMG_4716_1.jpg?v=1693373074",
      alt: "Womenswear",
      href: "/shop?category=women",
    },
    {
      id: "kidswear",
      title: "Kidswear",
      imgSrc: "https://img-cdn.publive.online/filters:format(webp)/established/media/post_attachments/theestablished/2022-10/e92175c1-88de-4ca8-8eb7-241a9efa5428/13_02_22_TORANI9962.jpg",
      alt: "Kidswear",
      href: "/shop?category=kids",
    },
    {
      id: "accessories",
      title: "Accessories",
      imgSrc: "https://assets.myntassets.com/w_412,q_50,,dpr_3,fl_progressive,f_webp/assets/images/2025/AUGUST/12/j7s2SLJN_01292f0475054056b998ec000fd06d58.jpg",
      alt: "Accessories",
      href: "/shop?category=accessories",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#FAF6F0] text-black w-full overflow-hidden">
      <div className="w-full px-4 sm:px-6 lg:px-12">
        {/* Centered Header Section */}
        <div className="mb-14 text-center">
          <h2 className="font-medium tracking-tight text-zinc-950 font-montserrat text-center text-4xl sm:text-6xl md:text-[72px]" style={{ letterSpacing: "-0.03em", lineHeight: "0.95" }}>
            Browse by <span className="italic" style={{ fontFamily: "Georgia, serif", color: "rgb(185, 28, 28)" }}>Category</span>
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
              className="group relative rounded-2xl bg-zinc-50 aspect-[3/4] shrink-0 w-[78vw] sm:w-[45vw] snap-center lg:w-auto lg:snap-align-none"
            >
              <TiltedCard
                imageSrc={category.imgSrc}
                altText={category.alt}
                captionText={category.title}
                containerHeight="100%"
                containerWidth="100%"
                imageHeight="100%"
                imageWidth="100%"
                scaleOnHover={1.03}
                rotateAmplitude={8}
                showMobileWarning={false}
                showTooltip={false}
                displayOverlayContent={true}
                overlayContent={
                  <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 w-[85%] max-w-[200px] z-10">
                    <Link
                      href={category.href}
                      className="flex items-center justify-between bg-white text-zinc-900 rounded-xl px-5 py-3 shadow-md hover:shadow-lg transition-all duration-300 group-hover:bg-zinc-950 group-hover:text-white border border-zinc-250/20 hover:scale-[1.03]"
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
                }
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
