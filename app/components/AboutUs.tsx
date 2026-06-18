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
      className="relative py-20 px-10 sm:py-28 text-white w-full min-h-[120vh] bg-fixed bg-cover bg-center"
      style={{ backgroundImage: `url("/images/store.webp")` }}
    >
      {/* Black Overlay */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-[2px] z-0 pointer-events-none" />

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12">
        {/* 50-50 Desktop Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">

          {/* Left Column (50%): Sticky Pinned Brand Message */}
          <div className="flex flex-col justify-center space-y-6 lg:sticky lg:top-[28vh] h-fit">
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight flex flex-col items-start gap-y-2">
              <SplitText text="Redefining" tag="span" textAlign="left" />
              <SplitText text="Fast Fashion" tag="span" className="text-red-600 text-4xl sm:text-8xl whitespace-nowrap" textAlign="left" />
            </h2>
            <p className="text-sm sm:text-base text-zinc-100 leading-relaxed font-normal max-w-2xl">
              A beloved name in Indian fashion, M Baazar has been a constant companion shaping the shopping sensibility of millions across the nation. Over the years, it has built a strong bond with customers by offering a wide range of products that cater to everyday needs as well as special occasions. From trendy clothing and accessories to toys and home essentials, M Baazar has established itself as a trusted one-stop shopping destination for families across India.
            </p>
          </div>

          {/* Right Column (50%): Sticky ScrollStack Container */}
          <div className="relative w-full flex flex-col items-center pb-[35vh]">
            {features.map((feature, i) => {
              const targetScale = Math.max(0.88, 1 - (features.length - i - 1) * 0.04);

              // Pure Red Card Styling
              const cardShade = "bg-red-600 border border-red-700 shadow-xl";

              return (
                <StickyCard_001
                  key={feature.id}
                  i={i}
                  progress={scrollYProgress}
                  range={[i * 0.2, 1]}
                  targetScale={targetScale}
                  className={`h-[320px] w-full max-w-[520px] ${cardShade}
  group relative overflow-hidden
  flex flex-col justify-between
  p-8 sm:p-10`}
                >

                  {/* Top Label */}
                  <div className="relative z-10">
                    <span className="text-[11px] uppercase tracking-[0.35em] font-semibold text-white/80">
                      {feature.label}
                    </span>
                  </div>

                  {/* Main Content */}
                  <div className="relative z-10 space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white group-hover:bg-white group-hover:text-red-600 transition-all duration-300">
                        {feature.icon}
                      </div>

                      <h3 className="text-5xl font-black tracking-tight text-white">
                        {feature.title}
                      </h3>
                    </div>

                    <p className="max-w-[280px] text-sm leading-7 text-white/95">
                      {feature.description}
                    </p>
                  </div>

                  {/* Accent Line */}
                  <div className="relative z-10 w-16 h-[2px] bg-white" />
                </StickyCard_001>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}