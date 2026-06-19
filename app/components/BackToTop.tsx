"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Monitor scroll height to toggle visibility
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 z-50 p-3.5 rounded-full bg-red-700 text-white shadow-lg border border-red-700/20 transition-all duration-300 transform cursor-pointer ${isVisible
        ? "opacity-100 translate-y-0 scale-100 hover:bg-red-700 hover:scale-105 active:scale-95"
        : "opacity-0 translate-y-4 scale-75 pointer-events-none"
        }`}
      aria-label="Back to top"
    >
      <ArrowUp className="w-5 h-5 stroke-[2.5]" />
    </button>
  );
}
