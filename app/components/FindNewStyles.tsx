"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface StyleItem {
  id: number;
  name: string;
  image: string;
}

// Premium High-Resolution Campaign Images
const MENS_STYLES: StyleItem[] = [
  {
    id: 1,
    name: "TSHIRTS",
    image: "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2026/APRIL/9/kpdKeM26_6e9c57d55faf4889a5c5ab88654a06b8.jpg",
  },
  {
    id: 2,
    name: "KURTAS",
    image: "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/31825450/2025/2/22/fe9d6abb-2d29-4ea1-bd1d-b07f86198cfd1740222415921-Sangria-Men-Kurtas-9521740222415250-1.jpg",
  },
  {
    id: 3,
    name: "JACKETS",
    image: "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/DECEMBER/8/lZzc1I1D_0f56a2edf8c0424bbc1bbabcd35f8dbe.jpg",
  },
  {
    id: 4,
    name: "JEANS",
    image: "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2026/MAY/23/2rBJPdV0_1eff2018dab14ac294247754c4321170.jpg",
  },
  {
    id: 5,
    name: "SPORTSWEAR",
    image: "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2026/JUNE/4/HMylVfbx_eec624bacf20457c9350bc4af94f1b31.jpg",
  },
];

const WOMENS_STYLES: StyleItem[] = [
  {
    id: 1,
    name: "TOPS",
    image: "https://m.media-amazon.com/images/I/A1FJRI9M9yL._AC_UY1100_.jpg",
  },
  {
    id: 2,
    name: "BOTTOMS",
    image: "https://assets.myntassets.com/dpr_1.5,q_30,w_400,c_limit,fl_progressive/assets/images/2026/MAY/30/QcANZZtd_68965277953c48a9aef6d49c8fdb7847.jpg",
  },
  {
    id: 3,
    name: "KURTA SETS",
    image: "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/31825605/2025/3/18/568bb5a4-8381-4644-9520-a0aaa467e65d1742293598536-Sangria-Women-Kurta-Sets-9811742293597868-1.jpg",
  },
  {
    id: 4,
    name: "ATHLEISURE",
    image: "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2024/NOVEMBER/26/3KDmPv0E_776a81a2ba1a4ef9b7089b1397f3562b.jpg",
  },
  {
    id: 5,
    name: "DRESSES",
    image: "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/OCTOBER/2/NZEBitk6_31a15b5473924074bdec2f131ed61779.jpg",
  },
];

const KIDS_STYLES: StyleItem[] = [
  {
    id: 1,
    name: "TSHIRTS",
    image: "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2026/JUNE/9/ujbwNLgy_222f96c9b62444e9bb6cdf156baef695.jpg",
  },
  {
    id: 2,
    name: "DRESSES",
    image: "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2024/OCTOBER/26/t7wLWWK0_7e67afe2f2dc4b54a7640335b062c9b2.jpg",
  },
  {
    id: 3,
    name: "BODYSUITS",
    image: "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/DECEMBER/11/bGh2rYvr_a8ad2414d10f4923b6823f2e4be6a56b.jpg",
  },
  {
    id: 4,
    name: "ETHNIC WEAR",
    image: "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2026/JUNE/12/jq8ROoTi_d23e26d21b5a4c30a964e96f8c41b366.jpg",
  },
  {
    id: 5,
    name: "SHORTS",
    image: "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/SEPTEMBER/4/sS3mVsMt_7cc4a566f7274816a88cb35bcb0fd88d.jpg",
  },
];

export default function FindNewStyles() {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 75,
    damping: 28,
    restDelta: 0.001
  });

  // Calculate the horizontal translate value. Adjust percentage to fit the row length
  const x = useTransform(smoothProgress, [0.1, 0.9], ["0%", "-76%"]);

  return (
    <section
      ref={sectionRef}
      className="relative h-[450vh] bg-white text-black w-full overflow-visible border-t border-zinc-200/60"
    >
      {/* Sticky Content Wrapper */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden">

        {/* Centered Editorial Section Header */}
        <div className="text-center mb-8 px-4 flex-shrink-0">
          <h2
            className="font-medium tracking-tight text-zinc-950 font-montserrat text-center text-4xl sm:text-5xl md:text-[65px]"
            style={{ letterSpacing: "-0.03em", lineHeight: "0.95" }}
          >
            Find New <span className="italic text-red-600" style={{ fontFamily: "Georgia, serif" }}>Trending Styles</span>
          </h2>
          <div className="w-16 h-[2px] bg-red-600 mx-auto mt-4" />
        </div>

        {/* Horizontal Scrolling Track */}
        <div className="relative w-full flex items-center">
          <motion.div
            style={{ x }}
            className="flex items-stretch gap-8 px-12 md:px-24 py-4 cursor-grab active:cursor-grabbing w-max"
          >

            {/* ==================== SECTION 1: MEN'S INTRO & STYLES ==================== */}
            <div className="w-[300px] sm:w-[350px] shrink-0 rounded-3xl bg-zinc-950 text-white p-8 flex flex-col justify-between border border-zinc-900 shadow-md">
              <span className="text-[10px] font-bold tracking-[0.25em] text-red-500 uppercase">
                Section 01
              </span>
              <div>
                <h3 className="text-4xl font-extrabold tracking-tight font-montserrat leading-none">
                  MEN'S
                  <br />
                  <span className="italic text-red-500" style={{ fontFamily: "Georgia, serif" }}>Style Edit</span>
                </h3>
                <p className="text-xs text-zinc-400 mt-4 leading-relaxed font-light">
                  Explore tailored kurtas, casual tees, denim wear, and active sets curated for the modern man.
                </p>
              </div>
              <div className="w-10 h-px bg-zinc-800" />
            </div>

            {MENS_STYLES.map((item) => (
              <div
                key={`men-${item.id}`}
                className="w-[280px] sm:w-[300px] shrink-0 relative aspect-[3/4.2] rounded-[24px] overflow-hidden group shadow-sm bg-zinc-100 border border-zinc-200/40"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 z-10">
                  <h4 className="text-white text-base sm:text-lg font-bold tracking-[0.2em] uppercase font-montserrat">
                    {item.name}
                  </h4>
                </div>
              </div>
            ))}

            {/* ==================== SECTION 2: STANDALONE WOMEN'S CARD ==================== */}
            <div className="w-[340px] sm:w-[380px] shrink-0 rounded-3xl bg-red-700 text-white p-8 flex flex-col justify-between border border-red-600 shadow-md">
              <span className="text-[10px] font-bold tracking-[0.25em] text-zinc-200 uppercase">
                Featured Spotlight
              </span>
              <div>
                <h3 className="text-4xl font-extrabold tracking-tight font-montserrat leading-none">
                  WOMEN'S
                  <br />
                  <span className="italic text-zinc-100" style={{ fontFamily: "Georgia, serif" }}>Trending</span>
                </h3>
                <p className="text-xs text-zinc-200 mt-4 leading-relaxed font-light">
                  Contemporary silhouettes, ethnic kurta sets, and premium tops designed for every mood and occasion.
                </p>
              </div>
              <div className="w-10 h-px bg-red-600" />
            </div>

            {/* ==================== SECTION 3: WOMEN'S STYLES ==================== */}
            {WOMENS_STYLES.map((item) => (
              <div
                key={`women-${item.id}`}
                className="w-[280px] sm:w-[300px] shrink-0 relative aspect-[3/4.2] rounded-[24px] overflow-hidden group shadow-sm bg-zinc-100 border border-zinc-200/40"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 z-10">
                  <h4 className="text-white text-base sm:text-lg font-bold tracking-[0.2em] uppercase font-montserrat">
                    {item.name}
                  </h4>
                </div>
              </div>
            ))}

            {/* ==================== SECTION 4: STANDALONE KIDS' CARD ==================== */}
            <div className="w-[340px] sm:w-[380px] shrink-0 rounded-3xl bg-zinc-900 text-white p-8 flex flex-col justify-between border border-zinc-800 shadow-md">
              <span className="text-[10px] font-bold tracking-[0.25em] text-red-500 uppercase">
                Featured Spotlight
              </span>
              <div>
                <h3 className="text-4xl font-extrabold tracking-tight font-montserrat leading-none">
                  KIDSWEAR
                  <br />
                  <span className="italic text-red-500" style={{ fontFamily: "Georgia, serif" }}>Joyful Styles</span>
                </h3>
                <p className="text-xs text-zinc-400 mt-4 leading-relaxed font-light">
                  Comfy playwear, charming ethnic fits, and cute active pieces crafted with love and softest fabrics.
                </p>
              </div>
              <div className="w-10 h-px bg-zinc-800" />
            </div>

            {/* ==================== SECTION 5: KIDS' STYLES ==================== */}
            {KIDS_STYLES.map((item) => (
              <div
                key={`kids-${item.id}`}
                className="w-[280px] sm:w-[300px] shrink-0 relative aspect-[3/4.2] rounded-[24px] overflow-hidden group shadow-sm bg-zinc-100 border border-zinc-200/40"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 z-10">
                  <h4 className="text-white text-base sm:text-lg font-bold tracking-[0.2em] uppercase font-montserrat">
                    {item.name}
                  </h4>
                </div>
              </div>
            ))}

          </motion.div>
        </div>
      </div>
    </section>
  );
}
