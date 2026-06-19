"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

/* ---------------------------------------------------
   Brand Platforms config using Flaticon CDN URLs
--------------------------------------------------- */
const PLATFORMS = [
  {
    name: "Instagram",
    color: "#E1306C",
    glow: "rgba(225,48,108,0.3)",
    iconUrl: "https://cdn-icons-png.flaticon.com/512/174/174855.png",
  },
  {
    name: "Facebook",
    color: "#1877F2",
    glow: "rgba(24,119,242,0.3)",
    iconUrl: "https://cdn-icons-png.flaticon.com/512/733/733547.png",
  },
  {
    name: "YouTube",
    color: "#FF0033",
    glow: "rgba(255,0,51,0.3)",
    iconUrl: "https://cdn-icons-png.flaticon.com/512/1384/1384060.png",
  },
  {
    name: "Pinterest",
    color: "#E60023",
    glow: "rgba(230,0,35,0.3)",
    iconUrl: "https://cdn-icons-png.flaticon.com/512/145/145808.png",
  },
  {
    name: "WhatsApp",
    color: "#25D366",
    glow: "rgba(37,211,102,0.3)",
    iconUrl: "https://cdn-icons-png.flaticon.com/512/733/733585.png",
  },
];

/* ---------------------------------------------------
   A single platform "card" that flies in from its
   off-screen position into the assembled row.
--------------------------------------------------- */
function PlatformCard({
  platform,
  index,
  centerIndex,
  progress,
}: {
  platform: (typeof PLATFORMS)[number];
  index: number;
  centerIndex: number;
  progress: any;
}) {
  const distance = index - centerIndex;

  // Assemble early in the scroll progress (from 0.1 to 0.4)
  const ASSEMBLE_START = 0.1;
  const ASSEMBLE_END = 0.4;

  const rawX = useTransform(progress, [ASSEMBLE_START, ASSEMBLE_END], [distance * 260, 0], { clamp: true });
  const rawY = useTransform(
    progress,
    [ASSEMBLE_START, ASSEMBLE_END],
    [220 + Math.abs(distance) * 40, 0],
    { clamp: true }
  );
  const rawRotate = useTransform(progress, [ASSEMBLE_START, ASSEMBLE_END], [distance * 22, 0], { clamp: true });
  const rawScale = useTransform(progress, [ASSEMBLE_START, ASSEMBLE_END], [0.4, 1], { clamp: true });

  const x = useSpring(rawX, { stiffness: 220, damping: 30, mass: 0.6 });
  const y = useSpring(rawY, { stiffness: 220, damping: 28, mass: 0.6 });
  const rotate = useSpring(rawRotate, { stiffness: 220, damping: 30, mass: 0.6 });
  const scale = useSpring(rawScale, { stiffness: 220, damping: 26, mass: 0.6 });

  return (
    <motion.div
      style={{ x, y, rotate, scale }}
      className="relative w-14 h-14 md:w-18 md:h-18 shrink-0"
    >
      <div
        className="
          absolute inset-0 rounded-full
          bg-white
          border border-zinc-200
          flex items-center justify-center
          transition-transform hover:scale-105 duration-300 cursor-pointer
        "
        style={{
          boxShadow: `0 18px 40px -8px ${platform.glow}`,
        }}
      >
        <img
          src={platform.iconUrl}
          alt={platform.name}
          className="w-9 h-9 md:w-10 md:h-10 object-contain"
        />
      </div>
    </motion.div>
  );
}

export default function StayConnected() {
  const targetRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end end"],
  });

  const centerIndex = (PLATFORMS.length - 1) / 2;

  // Adjusted ranges to animate between 10% and 35% of the scroll sequence
  const headingY = useTransform(scrollYProgress, [0.12, 0.3], [28, 0], { clamp: true });

  const bgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1], { clamp: true });
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.3, 1], [0.6, 0.88, 0.95], { clamp: true });

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-black">
      {/* Sticky container for background, overlay, and content */}
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
        {/* Background image with slow parallax scale */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center grayscale opacity-45 pointer-events-none z-0"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1600')",
            scale: bgScale,
          }}
        />

        {/* Overlay deepens as the sequence progresses */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/85 to-[#09090B] pointer-events-none z-0"
          style={{ opacity: overlayOpacity }}
        />


        {/* Heading */}
        <motion.div
          style={{ y: headingY }}
          className="relative z-10 text-center mt-20 mb-12 md:mb-14 max-w-4xl"
        >
          <h2
            className="text-[#fafaf8] font-medium tracking-[-0.04em] text-4xl sm:text-5xl md:text-[60px] leading-tight md:leading-[80px]"
          >
            Stay Connected<br />
            <span
              className="italic text-red-600 text-5xl sm:text-8xl md:text-[100px]"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              With M Baazar
            </span>
          </h2>

          <p className="mt-6 text-white/55 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            Festive collections, styling edits, and the stories behind
            the racks — from India's family fashion destination.
          </p>
        </motion.div>

        {/* Icon row */}
        <div className="relative z-10 flex items-center justify-center gap-3 md:gap-5">
          {PLATFORMS.map((platform, index) => (
            <PlatformCard
              key={platform.name}
              platform={platform}
              index={index}
              centerIndex={centerIndex}
              progress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}