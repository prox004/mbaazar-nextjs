"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

interface Slide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
}

const originalSlides: Slide[] = [
  {
    id: 1,
    image: "/images/hero_1.jpg",
    title: "Urban Streetwear",
    subtitle: "Minimalist aesthetic designed for the modern lifestyle",
    ctaText: "Explore Collection",
    ctaLink: "#menswear",
  },
  {
    id: 2,
    image: "/images/hero_2.jpeg",
    title: "The Editorial Edit",
    subtitle: "Chic ladieswear with premium fabric and silhouette cuts",
    ctaText: "Shop Women",
    ctaLink: "#ladieswear",
  },
  {
    id: 3,
    image: "/images/hero_3.jpeg",
    title: "Playful Denim",
    subtitle: "Vibrant kids outerwear collection made for play",
    ctaText: "Discover Kids",
    ctaLink: "#kidswear",
  },
];

// For infinite center-peeking loop: duplicate [Last 2 slides, ...originalSlides, First 2 slides]
const slides: Slide[] = [
  originalSlides[originalSlides.length - 2],
  originalSlides[originalSlides.length - 1],
  ...originalSlides,
  originalSlides[0],
  originalSlides[1],
];

const INITIAL_INDEX = 2; // Corresponds to originalSlides[0] (Slide 1)

// Configure Slide Speed & Timers here
const TRANSITION_DURATION = 700; // Slide transition duration in milliseconds
const AUTOPLAY_INTERVAL = 2500;  // Autoplay delay in milliseconds

interface HeroProps {
  showText?: boolean;
}

export default function Hero({ showText = false }: HeroProps) {
  const [currentIndex, setCurrentIndex] = useState(INITIAL_INDEX);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const dragStartX = useRef(0);
  const sliderTrackRef = useRef<HTMLDivElement>(null);
  const autoplayTimer = useRef<NodeJS.Timeout | null>(null);
  const isDraggingRef = useRef(false);

  // Autoplay functionality
  const startAutoplay = () => {
    stopAutoplay();
    autoplayTimer.current = setInterval(() => {
      handleNext();
    }, AUTOPLAY_INTERVAL);
  };

  const stopAutoplay = () => {
    if (autoplayTimer.current) {
      clearInterval(autoplayTimer.current);
    }
  };

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, [currentIndex]);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);

    // Safety fallback to release animation lock even if onTransitionEnd does not fire (e.g. background tab)
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, TRANSITION_DURATION + 200);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);

    // Safety fallback to release animation lock
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, TRANSITION_DURATION + 200);
  };

  // Instantly jump to virtual counterpart when completing transitions at bounds
  const handleTransitionEnd = (e: React.TransitionEvent) => {
    // Only handle transition end of the track container itself, ignore bubbling events from children
    if (e.target !== e.currentTarget) return;

    if (currentIndex === 1) {
      setIsTransitioning(false);
      setCurrentIndex(4);
    } else if (currentIndex === 5) {
      setIsTransitioning(false);
      setCurrentIndex(2);
    } else {
      setIsAnimating(false);
    }
  };

  // Turn transitions back on after jumping
  useEffect(() => {
    if (!isTransitioning) {
      // Force repaint, then re-enable transition and release animation lock
      const timer = setTimeout(() => {
        setIsTransitioning(true);
        setIsAnimating(false);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  // Touch and Drag Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    stopAutoplay();
    isDraggingRef.current = true;
    dragStartX.current = e.touches[0].clientX;
    setIsDragging(true);
    setIsAnimating(false); // Allow swiping to override/cancel current animation lock
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current) return;
    const delta = e.touches[0].clientX - dragStartX.current;
    setDragOffset(delta);
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
    setIsDragging(false);
    triggerSlideChange();
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    stopAutoplay();
    isDraggingRef.current = true;
    dragStartX.current = e.clientX;
    setIsDragging(true);
    setIsAnimating(false); // Allow swiping to override/cancel current animation lock
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const delta = e.clientX - dragStartX.current;
    setDragOffset(delta);
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
    setIsDragging(false);
    triggerSlideChange();
  };

  const triggerSlideChange = () => {
    const threshold = 80; // pixels to drag before sliding
    if (dragOffset < -threshold) {
      handleNext();
    } else if (dragOffset > threshold) {
      handlePrev();
    } else {
      // Snap back smoothly
      setIsTransitioning(true);
      setDragOffset(0);
    }
    setDragOffset(0);
    startAutoplay();
  };

  // Get active slide index relative to the original array (0, 1, 2)
  const getActiveIndicatorIndex = () => {
    // slides list is [S2, S3, S1, S2, S3, S1, S2]
    const relativeIndices = [1, 2, 0, 1, 2, 0, 1];
    return relativeIndices[currentIndex] ?? 0;
  };

  const activeIndicatorIndex = getActiveIndicatorIndex();

  // Slide Layout Constants (Exactly 10% peeking visible on left and right)
  const slideWidthPercent = 80;
  const peekPercent = 10;

  // Base translation based on index + dynamic drag offset
  const baseTranslate = peekPercent - currentIndex * slideWidthPercent;
  const dragTranslateOffset = sliderTrackRef.current
    ? (dragOffset / sliderTrackRef.current.clientWidth) * 100
    : 0;

  const finalTranslate = baseTranslate + dragTranslateOffset;

  return (
    <section className="relative w-full overflow-hidden bg-white py-4 flex flex-col items-center justify-between select-none">

      {/* Infinite Slider Wrapper (Taller height for PC/Mobile) */}
      <div
        ref={sliderTrackRef}
        className="w-full relative h-[60vh] sm:h-[68vh] md:h-[75vh] flex items-center overflow-hidden cursor-grab active:cursor-grabbing"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div
          className="flex w-full h-full items-center"
          style={{
            transform: `translateX(${finalTranslate}%)`,
            transition: isTransitioning && !isDragging ? `transform ${TRANSITION_DURATION}ms ease-out` : "none",
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {slides.map((slide, idx) => {
            const isActive = idx === currentIndex;
            const isLeft = idx === currentIndex - 1;
            const isRight = idx === currentIndex + 1;
            return (
              <div
                key={`${slide.id}-${idx}`}
                className="h-full flex-shrink-0 flex items-center justify-center px-1"
                style={{
                  width: `${slideWidthPercent}%`,
                  transition: isTransitioning && !isDragging ? `all ${TRANSITION_DURATION}ms ease-out` : "none",
                }}
              >
                {/* Individual Slide Box */}
                <div
                  className={`w-full h-full relative rounded-2xl md:rounded-3xl overflow-hidden shadow-lg bg-zinc-50 flex flex-col justify-end ${isActive
                    ? "scale-100 opacity-100 translate-x-0"
                    : isLeft
                      ? "scale-90 opacity-70 md:scale-85 translate-x-4 md:translate-x-10"
                      : isRight
                        ? "scale-90 opacity-70 md:scale-85 -translate-x-4 md:-translate-x-10"
                        : "scale-90 opacity-70 md:scale-85 translate-x-0"
                    }`}
                  style={{
                    transition: isTransitioning && !isDragging ? `all ${TRANSITION_DURATION}ms ease-out` : "none",
                  }}
                >
                  {/* Campaign Image */}
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    priority={idx === INITIAL_INDEX}
                    className="object-cover pointer-events-none select-none"
                    sizes="(max-width: 768px) 100vw, 80vw"
                  />

                  {/* Soft Red Overlay for Inactive Slides */}
                  <div
                    className={`absolute inset-0 bg-red-600/80 pointer-events-none ${isActive ? "opacity-0" : "opacity-100"}`}
                    style={{
                      transition: isTransitioning && !isDragging ? `opacity ${TRANSITION_DURATION}ms ease-out` : "none",
                    }}
                  />

                  {/* Slide Content Overlay */}
                  {showText && (
                    <div
                      className={`absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent p-6 sm:p-12 flex flex-col justify-end text-white ${isActive ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                      style={{
                        transition: isTransitioning && !isDragging ? `opacity ${Math.round(TRANSITION_DURATION * 0.7)}ms ease-out` : "none",
                      }}
                    >
                      <div className="max-w-xl space-y-2 sm:space-y-4">
                        <h2 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight leading-tight">
                          {slide.title}
                        </h2>
                        <p className="text-xs sm:text-sm md:text-base text-zinc-200 font-light max-w-md">
                          {slide.subtitle}
                        </p>
                        <div className="pt-2 sm:pt-4">
                          <Link
                            href={slide.ctaLink}
                            className="inline-block px-5 py-2.5 sm:px-8 sm:py-3.5 bg-white text-black font-semibold text-xs tracking-wider uppercase hover:bg-red-600 hover:text-white transition-colors duration-300 rounded-sm"
                          >
                            {slide.ctaText}
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>


        {/* Desktop Arrow Navigation (Smaller premium circular design) */}
        <button
          onClick={(e) => { e.stopPropagation(); handlePrev(); }}
          className="hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/95 shadow-md border border-zinc-100 text-black hover:bg-red-600 hover:text-white items-center justify-center transition-all duration-300 z-10"
          aria-label="Previous Slide"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={(e) => { e.stopPropagation(); handleNext(); }}
          className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/95 shadow-md border border-zinc-100 text-black hover:bg-red-600 hover:text-white items-center justify-center transition-all duration-300 z-10"
          aria-label="Next Slide"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Gooey Navigation Indicators */}
      <div className="mt-3 flex flex-col items-center">
        {/* SVG Gooey Filter definition */}
        <svg className="hidden">
          <defs>
            <filter id="gooey-filter">
              <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
              <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="gooey" />
              <feBlend in="SourceGraphic" in2="gooey" />
            </filter>
          </defs>
        </svg>

        {/* Gooey indicators track (Smaller indicators layout) */}
        <div className="gooey-filter relative flex items-center h-6 bg-white px-2">
          {/* Static Inactive Track Dots */}
          <div className="flex gap-3">
            {originalSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (isAnimating) return;
                  setIsAnimating(true);
                  setIsTransitioning(true);
                  setCurrentIndex(index + 2);
                  setTimeout(() => {
                    setIsAnimating(false);
                  }, 900);
                }}
                className="w-2 h-2 bg-zinc-200 rounded-full focus:outline-none transition-colors duration-300"
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Active Gooey Fluid dot */}
          <div
            className="absolute w-2.5 h-2.5 bg-red-600 rounded-full transition-all duration-500 ease-out pointer-events-none"
            style={{
              left: `${7 + activeIndicatorIndex * 20}px`,
            }}
          />
        </div>
      </div>
    </section>
  );
}
