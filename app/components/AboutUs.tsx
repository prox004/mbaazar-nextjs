"use client";

import React, { useRef } from "react";
import { useScroll } from "framer-motion";
import { StickyCard_001 } from "@/components/ui/skiper-ui/skiper16";
import SplitText from "../../components/SplitText";
import {
  CalendarDays,
  MapPinned,
  Store,
  Users,
} from "lucide-react";

interface FeatureCard {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export default function AboutUs() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const features = [
    {
      id: 1,
      label: "Our Journey",
      number: "01",
      title: "18+",
      description:
        "Years of retail excellence delivering trusted fashion across generations.",
      icon: <CalendarDays className="w-7 h-7" />,
    },
    {
      id: 2,
      label: "Our Presence",
      number: "02",
      title: "120+",
      description:
        "Cities and towns connected through our growing retail footprint.",
      icon: <MapPinned className="w-7 h-7" />,
    },
    {
      id: 3,
      label: "Our Stores",
      number: "03",
      title: "225+",
      description:
        "Stores across India bringing affordable fashion closer to every customer.",
      icon: <Store className="w-7 h-7" />,
    },
    {
      id: 4,
      label: "Our Customers",
      number: "04",
      title: "5Cr+",
      description:
        "Happy customers who trust M Baazar for style, value, and quality.",
      icon: <Users className="w-7 h-7" />,
    },
  ];
  return (
    <section
      ref={containerRef}
      id="about"
      className="relative py-20 px-10 sm:py-28 text-white w-full min-h-[120vh]"
    >
      {/* Grayscale Background Image */}
      <div
        className="absolute inset-0 bg-fixed bg-cover bg-center grayscale pointer-events-none z-0"
        style={{ backgroundImage: `url("/images/store.webp")` }}
      />
      {/* Black Overlay */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-[2px] z-0 pointer-events-none" />

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12">
        {/* 50-50 Desktop Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">

          {/* Left Column (50%): Sticky Pinned Brand Message */}
          <div className="flex flex-col justify-center space-y-6 lg:sticky lg:top-[28vh] h-fit">
            <h2 className="font-medium tracking-tight text-white flex flex-col items-start" style={{ fontSize: "80px", letterSpacing: "-0.03em", lineHeight: "1.1" }}>
              <span>Redefining</span>
              <span className="italic" style={{ fontSize: "110px", fontFamily: "Georgia, serif", color: "rgba(255, 42, 42, 1)" }}>Fast Fashion</span>
            </h2>
            <p className="text-[14px] font-inter text-zinc-300 leading-relaxed font-light max-w-2xl">
              A beloved name in Indian fashion, M Baazar has been a constant companion shaping the shopping sensibility of millions across the nation. Over the years, it has built a strong bond with customers by offering a wide range of products that cater to everyday needs as well as special occasions. From trendy clothing and accessories to toys and home essentials, M Baazar has established itself as a trusted one-stop shopping destination for families across India.
            </p>
          </div>

          {/* Right Column (50%): Sticky ScrollStack Container */}
          <div className="relative w-full flex flex-col items-center pb-[35vh]">
            {features.map((feature, i) => {
              const targetScale = Math.max(0.88, 1 - (features.length - i - 1) * 0.04);

              // Pure Red Card Styling
              const cardShade = "bg-red-700 border border-red-700 shadow-xl";

              return (
                <StickyCard_001
                  key={feature.id}
                  i={i}
                  progress={scrollYProgress}
                  range={[i * 0.2, 1]}
                  targetScale={targetScale}
                  className="
    h-[360px]
    w-full
    max-w-[560px]
    relative
    overflow-hidden
    border border-red-300
    bg-gradient-to-br
    from-red-500/[0.08]
    via-red-500/[0.04]
    to-red-500/0
    backdrop-blur-3xl
    p-10
  "
                >
                  {/* Massive Number */}
                  <div className="absolute right-6 top-4 text-[180px] leading-none font-black text-white/[0.04] pointer-events-none">
                    {feature.number}
                  </div>

                  {/* Gradient Glow */}
                  <div
                    className="
      absolute
      -right-24
      -top-24
      h-64
      w-64
      rounded-full
      bg-red-500/10
      blur-3xl
    "
                  />

                  {/* Header */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="text-[11px] uppercase tracking-[0.35em] text-white/50">
                      {feature.label}
                    </span>

                    <div className="text-red-500">
                      {feature.icon}
                    </div>
                  </div>

                  {/* Main Content */}
                  <div className="relative z-10">
                    <h3
                      className="
        text-[100px]
        font-bold
        text-white
      "
                    >
                      {feature.title}
                    </h3>

                    <div className="mt-3 w-16 h-px bg-gradient-to-r from-red-500 to-transparent" />

                    <p
                      className="
        mt-8
        max-w-sm
        text-white/70
        leading-8
        text-[15px]
      "
                    >
                      {feature.description}
                    </p>
                  </div>

                </StickyCard_001>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}