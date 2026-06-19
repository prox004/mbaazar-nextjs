import React from "react";
import {
  Marquee,
  MarqueeContent,
  MarqueeFade,
  MarqueeItem,
} from "@/components/kibo-ui/marquee";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Store, ShieldCheck, HeartHandshake, Award } from "lucide-react";

interface aboutProps {
  className?: string;
  title: string;
  description?: string;
  mainImage: {
    src: string;
    alt: string;
  };
  secondaryImage: {
    src: string;
    alt: string;
  };
  breakout: {
    src?: string;
    alt?: string;
    title: string;
    description: string;
    buttonText?: string;
    buttonUrl?: string;
  };
  companies?: Array<{
    src: string;
    alt: string;
  }> | null;
  achievementsTitle?: string;
  achievementsDescription?: string;
  achievements?: Array<{
    label: string;
    value: string;
  }>;
  contentSections?: Array<{
    title: string;
    content: string;
  }>;
}

const about = ({
  className,
  title = "About Us",
  description,
  mainImage,
  secondaryImage,
  breakout,
  companies,
  achievementsTitle,
  achievementsDescription,
  achievements = [],
  contentSections = [],
}: aboutProps) => {
  // Map icons for values
  const icons = [
    <ShieldCheck key="value-1" className="w-8 h-8 text-red-700" />,
    <Store key="value-2" className="w-8 h-8 text-red-700" />,
    <HeartHandshake key="value-3" className="w-8 h-8 text-red-700" />,
    <Award key="value-4" className="w-8 h-8 text-red-700" />,
  ];

  return (
    <section className={cn("py-16 sm:py-24 bg-white text-zinc-900 w-full overflow-hidden", className)}>
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Hero Header Section */}
        <div className="mb-16 flex flex-col items-center text-center gap-6 max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-zinc-950 leading-tight">
            {title}
          </h1>
          <p className="text-lg text-zinc-600 leading-relaxed font-normal">
            {description}
          </p>
        </div>

        {/* Images and Highlight Banner */}
        <div className="grid gap-8 lg:grid-cols-3 mb-24">
          <div className="lg:col-span-2 overflow-hidden rounded-2xl border border-zinc-100 shadow-sm">
            <img
              src={mainImage.src}
              alt={mainImage.alt}
              className="size-full min-h-[350px] max-h-[500px] object-cover hover:scale-102 transition-transform duration-500"
            />
          </div>
          <div className="flex flex-col gap-8 md:flex-row lg:flex-col">
            {/* Spotlight / Breakout Card */}
            <div className="flex flex-col justify-between gap-6 rounded-3xl bg-white border border-red-200 p-8 md:w-1/2 lg:w-auto shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
              <div className="flex items-center gap-4">
                {breakout.src && (
                  <img
                    src={breakout.src}
                    alt={breakout.alt}
                    className="h-10 w-auto object-contain"
                  />
                )}
              </div>
              <div>
                <p className="mb-2 text-xl font-extrabold text-zinc-900 tracking-tight">
                  {breakout.title}
                </p>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  {breakout.description}
                </p>
              </div>
              {breakout.buttonText && (
                <Button variant="default" className="mr-auto bg-red-700 hover:bg-zinc-950 text-white rounded-xl px-6 py-2.5 font-medium tracking-wide transition-all duration-300" asChild>
                  <a href={breakout.buttonUrl}>
                    {breakout.buttonText}
                  </a>
                </Button>
              )}
            </div>
            <div className="grow basis-0 overflow-hidden rounded-3xl border border-zinc-200/80 shadow-sm md:w-1/2 lg:min-h-0 lg:w-auto">
              <img
                src={secondaryImage.src}
                alt={secondaryImage.alt}
                className="size-full min-h-[200px] object-cover hover:scale-102 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
 
        {/* Marquee Banner */}
 
        {/* Achievements / Statistics Section */}
        <div className="relative overflow-hidden rounded-3xl bg-zinc-950 text-white p-8 md:p-16 shadow-xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-700/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-12">
            <div className="flex flex-col gap-4 max-w-xl">
              <span className="text-[11px] uppercase tracking-[0.35em] font-semibold text-red-700">
                Key Indicators
              </span>
              <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl text-white">
                {achievementsTitle}
              </h2>
              <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
                {achievementsDescription}
              </p>
            </div>
 
            <div className="grid grid-cols-2 gap-x-12 gap-y-8 lg:w-auto">
              {achievements.map((item, idx) => (
                <div
                  className="flex flex-col gap-1"
                  key={item.label + idx}
                >
                  <span className="font-black text-4xl sm:text-5xl text-red-700 tracking-tight">
                    {item.value}
                  </span>
                  <p className="text-xs uppercase tracking-widest text-zinc-400 font-semibold">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
 
        {/* Main Editorial Content Sections */}
        {contentSections && contentSections.length > 0 && (() => {
          const overview = contentSections.find(s => s.title.toLowerCase().includes("overview")) || contentSections[0];
          const values = contentSections.find(s => s.title.toLowerCase().includes("value")) || contentSections[1];
          const management = contentSections.find(s => s.title.toLowerCase().includes("desk") || s.title.toLowerCase().includes("management")) || contentSections[2];
 
          return (
            <div className="my-24 flex flex-col gap-8">
              {/* Overview and Our Values - Two Columns */}
              <div className="grid gap-8 lg:grid-cols-2 items-stretch">
                {overview && (
                  <div className="flex flex-col gap-6 p-8 sm:p-10 rounded-[2rem] bg-white border border-zinc-200 shadow-sm hover:shadow-md hover:border-red-700/30 hover:-translate-y-0.5 transition-all duration-500 justify-between">
                    <div>
                      <h2 className="text-3xl font-black text-zinc-950 tracking-tight flex items-center gap-3 mb-6">
                        <span className="w-1.5 h-6 bg-red-700 rounded-full inline-block" />
                        {overview.title}
                      </h2>
                      <p className="text-zinc-600 leading-relaxed whitespace-pre-line text-sm sm:text-base">
                        {overview.content}
                      </p>
                    </div>
                  </div>
                )}
 
                {values && (
                  <div className="flex flex-col gap-6 p-8 sm:p-10 rounded-[2rem] bg-white border border-zinc-200 shadow-sm hover:shadow-md hover:border-red-700/30 hover:-translate-y-0.5 transition-all duration-500 justify-between">
                    <div>
                      <h2 className="text-3xl font-black text-zinc-950 tracking-tight flex items-center gap-3 mb-6">
                        <span className="w-1.5 h-6 bg-red-700 rounded-full inline-block" />
                        {values.title}
                      </h2>
                      <div className="flex flex-col gap-6">
                        {values.content.split("\n\n").map((valText, valIdx) => {
                          const parts = valText.split(":");
                          const titlePart = parts[0]?.trim();
                          const descPart = parts.slice(1).join(":")?.trim();
                          return (
                            <div key={valIdx} className="flex gap-4 items-start">
                              <div className="mt-1 p-2 bg-[#FAF6F0] rounded-xl border border-red-200 flex-shrink-0 shadow-sm">
                                {icons[valIdx % icons.length]}
                              </div>
                              <div>
                                <p className="font-bold text-zinc-900">{titlePart}</p>
                                {descPart && <p className="text-sm text-zinc-600 mt-1 leading-relaxed">{descPart}</p>}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
 
              {/* Management Desk - Full Width Row */}
              {management && (
                <div className="flex flex-col md:flex-row gap-8 items-center md:items-stretch bg-white border border-zinc-200 rounded-[2rem] p-8 sm:p-10 shadow-sm hover:shadow-md hover:border-red-700/30 hover:-translate-y-0.5 transition-all duration-500">
                  <div className="w-full md:w-[25%] max-w-[320px] flex-shrink-0 overflow-hidden rounded-2xl border border-zinc-200 shadow-sm bg-white">
                    <img
                      src="https://www.mbaazar.in/wp-content/uploads/2021/01/Sanjay-Saraf-1.jpg"
                      alt="Mr. Sanjay Saraf - CMD & Founder"
                      className="w-full h-full object-cover aspect-[3/4]"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-center gap-6">
                    <h2 className="text-3xl font-black text-zinc-950 tracking-tight flex items-center gap-3">
                      <span className="w-1.5 h-6 bg-red-700 rounded-full inline-block" />
                      {management.title}
                    </h2>
                    <p className="text-zinc-600 leading-relaxed whitespace-pre-line text-sm sm:text-base">
                      {management.content}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })()}



      </div>
    </section>
  );
};

export { about };
