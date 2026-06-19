"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import reelsData from "@/public/data/reels.json";
import SplitText from "../../components/SplitText";

interface Reel {
  id: number;
  shortcode: string;
  instagram_url: string;
}

// Extend Window interface for YouTube iframe API
declare global {
  interface Window {
    YT?: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

interface ReelsShowcaseProps {
  autoGotoNextSlide?: boolean;
}

export default function ReelsShowcase({ autoGotoNextSlide = true }: ReelsShowcaseProps) {
  const [reels, setReels] = useState<Reel[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [apiReady, setApiReady] = useState(false);
  const [isSectionInView, setIsSectionInView] = useState(false);
  const [activeVideoReady, setActiveVideoReady] = useState(false);
  const originalCountRef = useRef(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    skipSnaps: false,
    containScroll: false,
    startIndex: originalCountRef.current,
  });

  const playerRef = useRef<any>(null);

  // Intersection Observer for viewport detection
  useEffect(() => {
    if (loading) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSectionInView(entry.isIntersecting);
      },
      {
        threshold: 0.1,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [loading]);

  // Detect Mobile Viewport
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Load YouTube Player API Script
  useEffect(() => {
    if (window.YT && window.YT.Player) {
      setApiReady(true);
      return;
    }

    window.onYouTubeIframeAPIReady = () => {
      setApiReady(true);
    };

    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
  }, []);

  // Fetch Reels Data
  useEffect(() => {
    try {
      const data = reelsData as Reel[];
      originalCountRef.current = data.length;
      // Double array to create enough slides for Embla's loop buffer and map unique IDs
      const doubled = [...data, ...data].map((item: Reel, idx: number) => ({ ...item, id: idx + 1 }));
      setReels(doubled);
      setSelectedIndex(data.length); // start at the second copy so loop has buffer on both sides
      setLoading(false);
    } catch (err) {
      console.error("Error loading reels:", err);
      setLoading(false);
    }
  }, []);

  // Embla Select Callback
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    const index = emblaApi.selectedScrollSnap();
    setSelectedIndex(index);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  // Center the carousel once data is loaded
  useEffect(() => {
    if (!emblaApi || reels.length === 0 || originalCountRef.current === 0) return;
    emblaApi.scrollTo(originalCountRef.current, true);
  }, [emblaApi, reels.length]);

  // YouTube Player Instance creation on active slide change
  useEffect(() => {
    // Reset video ready state when slide or view state changes
    setActiveVideoReady(false);

    if (loading || reels.length === 0 || !apiReady || !isSectionInView) {
      // Destroy active player if section is not in view
      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch (e) { }
        playerRef.current = null;
      }
      return;
    }

    const activeCode = reels[selectedIndex]?.shortcode;
    if (!activeCode) return;

    // Destroy existing active player
    if (playerRef.current) {
      try {
        playerRef.current.destroy();
      } catch (e) { }
      playerRef.current = null;
    }

    // Wait a brief moment for active container div to render
    const timer = setTimeout(() => {
      const iframeId = `yt-player-${activeCode}`;
      const containerElement = document.getElementById(iframeId);
      if (!containerElement) return;

      playerRef.current = new window.YT.Player(iframeId, {
        videoId: activeCode,
        playerVars: {
          autoplay: 1,
          mute: 0,
          loop: 0,
          playlist: activeCode,
          controls: 0,
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
          enablejsapi: 1,
        },
        events: {
          onStateChange: (event: any) => {
            if (event.data === 1) {
              setActiveVideoReady(true);
            }
            // YT.PlayerState.ENDED is 0
            if (event.data === 0 && emblaApi && autoGotoNextSlide) {
              emblaApi.scrollNext();
            }
          },
          onReady: (event: any) => {
            // Unmute and auto play with full audio on ready
            event.target.unMute();
            event.target.playVideo();
            setActiveVideoReady(true);
          },
        },
      });
    }, 200);

    return () => {
      clearTimeout(timer);
      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch (e) { }
        playerRef.current = null;
      }
    };
  }, [selectedIndex, emblaApi, loading, reels, apiReady, autoGotoNextSlide, isSectionInView]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!emblaApi) return;
      if (e.key === "ArrowLeft") {
        emblaApi.scrollPrev();
      } else if (e.key === "ArrowRight") {
        emblaApi.scrollNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [emblaApi]);

  // Dynamic 3D Stack styling based on index distance
  const getSlideStyles = (idx: number) => {
    const len = reels.length;
    if (len === 0) return {};

    // Calculate shortest cyclic distance
    let diff = idx - selectedIndex;
    if (diff < -len / 2) diff += len;
    if (diff > len / 2) diff -= len;

    let scale = 0.5;
    let translateX = 0;
    let zIndex = 0;
    let opacity = 0;
    let blur = "5px";
    let pointerEvents: "none" | "auto" = "none";

    if (diff === 0) {
      scale = 1.06;
      translateX = 0;
      zIndex = 40;
      opacity = 1;
      blur = "0px";
      pointerEvents = "auto" as const;
    } else if (diff === 1 || diff === -1) {
      scale = 0.88;
      // Spread outwards: right card moves right (positive), left card moves left (negative)
      translateX = diff === 1 ? (isMobile ? 10 : 60) : (isMobile ? -10 : -60);
      zIndex = 30;
      opacity = 1;
      blur = "1px";
      pointerEvents = "auto" as const;
    } else if (diff === 2 || diff === -2) {
      scale = 0.74;
      // Spread outwards
      translateX = diff === 2 ? (isMobile ? 20 : 120) : (isMobile ? -20 : -120);
      zIndex = 20;
      opacity = 1;
      blur = "2px";
      pointerEvents = "auto" as const;
    } else if (diff === 3 || diff === -3) {
      scale = 0.62;
      // Spread outwards
      translateX = diff === 3 ? (isMobile ? 30 : 180) : (isMobile ? -30 : -180);
      zIndex = 10;
      opacity = 1;
      blur = "3.5px";
      pointerEvents = "auto" as const;
    }

    return {
      transform: `scale(${scale}) translateX(${translateX}px)`,
      zIndex,
      opacity,
      filter: `blur(${blur})`,
      pointerEvents,
    };
  };

  if (loading) {
    return (
      <section className="py-5 sm:py-24 bg-gradient-to-b from-red-50 to-white text-black w-full overflow-hidden">
        <div className="w-full px-4 sm:px-6 lg:px-12 text-center">
          <div className="max-w-xl mx-auto mb-10 space-y-2">
            <div className="h-8 bg-zinc-100 rounded-full w-2/3 mx-auto animate-pulse" />
            <div className="h-4 bg-zinc-100 rounded-full w-1/2 mx-auto animate-pulse" />
          </div>
          <div className="flex gap-6 justify-center items-center h-[500px]">
            {Array.from({ length: 5 }).map((_, idx) => (
              <div
                key={idx}
                className={`w-[240px] aspect-[9/16] rounded-3xl bg-zinc-100 animate-pulse ${idx === 2 ? "scale-105 shadow-md" : "scale-90 opacity-40"
                  }`}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (reels.length === 0) {
    return null;
  }

  return (
    <section ref={sectionRef} className="px-10 mb-10 py-20 sm:py-24 bg-gradient-to-b from-red-100 to-white text-black w-full overflow-hidden">
      <div className="w-full px-4 sm:px-6 lg:px-12">
        {/* Header Section */}
        <div className="text-center mb-12 mt-10 space-y-3">
          <h2 className="font-medium tracking-tight text-zinc-950 font-montserrat text-center text-4xl sm:text-6xl md:text-[72px]" style={{ letterSpacing: "-0.03em", lineHeight: "0.95" }}>
            From our stores <span className="italic" style={{ fontFamily: "Georgia, serif", color: "rgb(185, 28, 28)" }}>to your feed.</span>
          </h2>
          <p className="text-sm sm:text-base text-zinc-500 max-w-lg mx-auto font-regular">
            Get styling tips, fashion lookbooks, and the latest trends directly from our social media.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative w-full max-w-6xl mx-auto flex items-center justify-center">
          {/* Navigation Arrows */}
          <button
            onClick={() => emblaApi?.scrollPrev()}
            className="absolute left-0 md:left-4 z-40 w-11 h-11 rounded-full bg-white/95 border border-zinc-100 flex items-center justify-center text-zinc-800 hover:text-red-700 hover:scale-105 active:scale-95 transition-all duration-300 shadow-md cursor-pointer"
            aria-label="Previous Reel"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={() => emblaApi?.scrollNext()}
            className="absolute right-0 md:right-4 z-40 w-11 h-11 rounded-full bg-white/95 border border-zinc-100 flex items-center justify-center text-zinc-800 hover:text-red-700 hover:scale-105 active:scale-95 transition-all duration-300 shadow-md cursor-pointer"
            aria-label="Next Reel"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Embla Viewport */}
          <div ref={emblaRef} className="overflow-visible w-[85%] md:w-full py-6">
            <div className="flex select-none">
              {reels.map((reel, idx) => {
                const isActive = idx === selectedIndex;
                const slideStyles = getSlideStyles(idx);
                const code = reel.shortcode;

                return (
                  <div
                    key={reel.id}
                    className="flex-[0_0_65%] sm:flex-[0_0_42%] lg:flex-[0_0_24%] min-w-0 mx-[-5px] sm:mx-[-15px] lg:mx-[-75px] relative"
                    style={{
                      zIndex: slideStyles.zIndex,
                    }}
                  >
                    {/* Inner wrapper container to isolate custom transforms from Embla outer loop wraps */}
                    <div
                      className="w-full h-full transition-all duration-500 ease-out origin-center"
                      style={{
                        transform: slideStyles.transform,
                        opacity: slideStyles.opacity,
                        filter: slideStyles.filter,
                        pointerEvents: slideStyles.pointerEvents,
                        perspective: "1000px",
                      }}
                    >
                      {/* Reel Wrapper */}
                      <div
                        className={`relative aspect-[9/16] rounded-3xl overflow-hidden bg-zinc-950 border border-zinc-100/50 shadow-lg`}
                        style={{
                          transformStyle: "preserve-3d",
                        }}
                      >
                        {/* Active iframe video player or thumbnail fallback */}
                        {isActive ? (
                          <div className="w-full h-full relative overflow-hidden z-20">
                            {/* Wrapper div managed by React */}
                            <div className={`w-full h-full transition-opacity duration-500 ${activeVideoReady ? "opacity-100" : "opacity-0"
                              }`}>
                              <div
                                id={`yt-player-${code}`}
                                className="w-full h-full border-0 absolute inset-0 scale-[1] origin-center"
                              />
                            </div>
                            {!activeVideoReady && (
                              <div className="absolute inset-0 z-10 flex items-center justify-center bg-zinc-950 pointer-events-none">
                                <img
                                  src={`https://img.youtube.com/vi/${code}/hqdefault.jpg`}
                                  alt=""
                                  className="absolute inset-0 w-full h-full object-cover opacity-60"
                                />
                                <div className="relative z-20 flex flex-col items-center gap-3">
                                  <div className="w-8 h-8 rounded-full border-2 border-red-700 border-t-transparent animate-spin" />
                                  <span className="text-[10px] text-zinc-300 font-bold uppercase tracking-wider">
                                    Loading Video
                                  </span>
                                </div>
                              </div>
                            )}
                          </div>
                        ) : (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={`https://img.youtube.com/vi/${code}/hqdefault.jpg`}
                            alt=""
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
