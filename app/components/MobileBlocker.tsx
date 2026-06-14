"use client";

import React, { useEffect, useState } from "react";

export default function MobileBlocker() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      // 1. Check viewport width (matches standard mobile/tablet breakpoints)
      const isSmallScreen = window.innerWidth < 1024;

      // 2. Check User Agent (detects mobile device even if "Desktop Mode" is requested)
      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
      const isMobileUA = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
        userAgent.toLowerCase()
      );

      // 3. Check touch points for mobile/tablet devices
      const isTouchDevice =
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        (navigator as any).msMaxTouchPoints > 0;

      // If it has a small screen, mobile user agent, or is a touch-based device with a restricted viewport
      if (isSmallScreen || isMobileUA || (isTouchDevice && window.innerWidth < 1366)) {
        setIsMobile(true);
        // Prevent scrolling on the body when blocker is active
        document.body.style.overflow = "hidden";
      } else {
        setIsMobile(false);
        document.body.style.overflow = "";
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
      document.body.style.overflow = "";
    };
  }, []);

  if (!isMobile) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center p-6 text-center">
      <div className="flex flex-col items-center max-w-sm gap-8">
        {/* Logo */}
        <img
          src="/logo_red.png"
          alt="M Baazar Logo"
          className="h-14 w-auto object-contain"
        />

        {/* Divider Line */}
        <div className="w-16 h-1 bg-red-600 rounded-full" />

        {/* Warning Text */}
        <div className="space-y-4">
          <h1 className="text-xl font-black text-zinc-900 tracking-tight uppercase">
            Mobile View Not Included in Demo
          </h1>
          <p className="text-sm text-zinc-500 leading-relaxed font-semibold">
            Please view this project using a <br></br>PC / Desktop screen.
          </p>
        </div>
      </div>
    </div>
  );
}
