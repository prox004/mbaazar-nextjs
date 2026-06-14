"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [isTickerVisible, setIsTickerVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("Home");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsTickerVisible(false);
      } else {
        setIsTickerVisible(true);
      }
    };

    // Run once on mount to capture initial load scroll position
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { name: "Products", isDropdown: true, categories: ["Menswear", "Ladieswear", "Kidswear", "Accessories"] },
    { name: "Outlets", href: "/#outlets" },
    { name: "Blogs", href: "/blog" },
  ];

  const rightMenuItems = [
    { name: "About Us", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Contact Us", href: "/contact" },
  ];

  const handleShare = (platform: string) => {
    let url = "";
    const pageUrl = typeof window !== "undefined" ? window.location.href : "";
    const text = "Check out M Baazar - Premium Fast Fashion!";

    switch (platform) {
      case "facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`;
        break;
      case "instagram":
        url = "https://instagram.com";
        break;
      case "youtube":
        url = "https://youtube.com";
        break;
      case "linkedin":
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`;
        break;
      case "twitter":
        url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(text)}`;
        break;
    }
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  };

  // Duplicate ticker items 4 times to ensure continuous, seamless scrolling on large screens
  const tickerPhrases = [
    "M Baazar - The Fashion Store",
    "Celebrating 225+ Stores All Across India",
    "Exclusive Summer Styles Arrived"
  ];
  const duplicatedTickerPhrases = [...tickerPhrases, ...tickerPhrases, ...tickerPhrases, ...tickerPhrases];

  return (
    <header className="sticky top-0 left-0 right-0 z-50 w-full bg-white border-b border-zinc-200">
      {/* Announcement Ticker */}
      <div
        className={`bg-red-600 text-white px-4 text-xs tracking-wider font-regular overflow-hidden transition-all duration-300 ease-in-out flex items-center ${isTickerVisible ? "h-8 py-2 opacity-100" : "h-0 py-0 opacity-0 pointer-events-none"
          }`}
      >
        <div className="flex whitespace-nowrap animate-marquee">
          {duplicatedTickerPhrases.map((phrase, index) => (
            <span key={index} className="mx-12 flex-shrink-0">
              {phrase}
            </span>
          ))}
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="bg-white text-black h-20 px-6 md:px-12 flex items-center justify-between">

        {/* Desktop Left Navigation */}
        <div className="hidden md:flex items-center gap-8 w-1/3">
          {menuItems.map((item) => (
            <div key={item.name} className="relative group py-2">
              {item.isDropdown ? (
                <>
                  <Link href="/shop" className="flex items-center gap-1 text-sm font-medium tracking-wide transition-colors hover:text-red-600 cursor-pointer">
                    {item.name}
                    <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </Link>
                  {/* Dropdown Menu */}
                  <div className="absolute left-0 mt-2 w-48 bg-white border border-zinc-150 rounded-sm py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50">
                    {item.categories?.map((cat) => {
                      const categoryMapping: { [key: string]: string } = {
                        Menswear: "Men",
                        Ladieswear: "Women",
                        Kidswear: "Kids",
                        Accessories: "Accessories",
                      };
                      const paramVal = categoryMapping[cat] || cat;
                      return (
                        <Link
                          key={cat}
                          href={`/shop?category=${paramVal}`}
                          className="block px-4 py-2.5 text-xs tracking-wide text-zinc-700 hover:bg-zinc-50 hover:text-red-600 transition-colors"
                        >
                          {cat}
                        </Link>
                      );
                    })}
                  </div>
                </>
              ) : (
                <Link
                  href={item.href || "#"}
                  onClick={() => setActiveItem(item.name)}
                  className={`text-sm font-medium tracking-wide transition-colors hover:text-red-600 relative py-1`}
                >
                  {item.name}
                  {activeItem === item.name && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-red-600 transform scale-x-100 transition-transform" />
                  )}
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsMenuOpen(true)}
          className="md:hidden p-2 -ml-2 text-black hover:text-red-600 transition-colors"
          aria-label="Open Navigation Menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div className="flex-1 flex justify-center md:w-1/3">
          <Link href="/" className="flex items-center justify-center">
            <Image
              src="/logo_red.png"
              alt="M Baazar Logo"
              width={140}
              height={42}
              priority
              className="h-9 w-auto object-contain"
            />
          </Link>
        </div>

        {/* Desktop Right Navigation */}
        <div className="hidden md:flex items-center justify-end gap-8 w-1/3">
          {rightMenuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setActiveItem(item.name)}
              className="text-sm font-medium tracking-wide transition-colors hover:text-red-600 relative py-1"
            >
              {item.name}
              {activeItem === item.name && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-red-600 transform scale-x-100 transition-transform" />
              )}
            </Link>
          ))}
        </div>

        {/* Mobile Share Button */}
        <button
          onClick={() => setIsShareOpen(true)}
          className="md:hidden p-2 -mr-2 text-black hover:text-red-600 transition-colors"
          aria-label="Share Page"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8m-4-6l-4-4m0 0L8 6m4-4v12" />
          </svg>
        </button>
      </nav>

      {/* Sibling viewport-fixed elements (NOT affected by the wrapper transform) */}

      {/* Mobile Navigation Drawer Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 pointer-events-auto ${isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile Navigation Drawer Panel (Left-to-Right Slide-in) */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-4/5 max-w-sm bg-white p-6 shadow-2xl border-r border-zinc-100 transition-transform duration-300 ease-out flex flex-col justify-between pointer-events-auto ${isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-zinc-100">
            <span className="text-xl font-black tracking-tight font-sans text-black">M Baazar</span>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-1 text-black hover:text-red-600 transition-colors"
              aria-label="Close menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Menu Links */}
          <div className="mt-8 space-y-6">
            {/* Products Section with Sub-categories */}
            <div className="space-y-3">
              <Link
                href="/shop"
                onClick={() => setIsMenuOpen(false)}
                className="block text-xs font-bold tracking-wide text-zinc-400 hover:text-red-600 transition-colors mb-2"
              >
                Products
              </Link>
              <div className="pl-4 space-y-3 border-l-2 border-zinc-100">
                {menuItems[0].categories?.map((cat) => {
                  const categoryMapping: { [key: string]: string } = {
                    Menswear: "Men",
                    Ladieswear: "Women",
                    Kidswear: "Kids",
                    Accessories: "Accessories",
                  };
                  const paramVal = categoryMapping[cat] || cat;
                  return (
                    <Link
                      key={cat}
                      href={`/shop?category=${paramVal}`}
                      onClick={() => setIsMenuOpen(false)}
                      className="block text-sm font-semibold tracking-wide text-zinc-800 hover:text-red-600 transition-colors"
                    >
                      {cat}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Other Navigation Links */}
            <div className="space-y-4 pt-4 border-t border-zinc-100">
              {menuItems.slice(1).map((item) => (
                <Link
                  key={item.name}
                  href={item.href || "#"}
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-sm font-bold tracking-wide text-zinc-900 hover:text-red-600 transition-colors"
                >
                  {item.name}
                </Link>
              ))}
              {rightMenuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-sm font-bold tracking-wide text-zinc-900 hover:text-red-600 transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="text-[10px] tracking-wide text-zinc-400 text-center border-t border-zinc-100 pt-4" suppressHydrationWarning>
          © {mounted ? new Date().getFullYear() : 2026} M Baazar
        </div>
      </div>

      {/* Mobile Share Drawer Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 pointer-events-auto ${isShareOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        onClick={() => setIsShareOpen(false)}
      />

      {/* Mobile Share Drawer Panel (Right-to-Left Slide-in) */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-4/5 max-w-sm bg-white p-6 shadow-2xl border-l border-zinc-100 transition-transform duration-300 ease-out flex flex-col justify-between pointer-events-auto ${isShareOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-zinc-100">
            <span className="text-sm font-bold tracking-wide text-zinc-400">Share This Page</span>
            <button
              onClick={() => setIsShareOpen(false)}
              className="p-1 text-black hover:text-red-600 transition-colors"
              aria-label="Close share panel"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Social Share Grid */}
          <div className="mt-8 space-y-4">
            <button
              onClick={() => handleShare("facebook")}
              className="w-full flex items-center justify-between p-4 border border-zinc-100 rounded-lg hover:border-red-600 hover:bg-zinc-50 transition-all text-black"
            >
              <span className="text-sm font-semibold tracking-wide">Facebook</span>
              <svg className="w-5 h-5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </button>

            <button
              onClick={() => handleShare("instagram")}
              className="w-full flex items-center justify-between p-4 border border-zinc-100 rounded-lg hover:border-red-600 hover:bg-zinc-50 transition-all text-black"
            >
              <span className="text-sm font-semibold tracking-wide">Instagram</span>
              <svg className="w-5 h-5 text-[#E4405F]" fill="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zM17.5 6.5h.01" />
              </svg>
            </button>

            <button
              onClick={() => handleShare("youtube")}
              className="w-full flex items-center justify-between p-4 border border-zinc-100 rounded-lg hover:border-red-600 hover:bg-zinc-50 transition-all text-black"
            >
              <span className="text-sm font-semibold tracking-wide">YouTube</span>
              <svg className="w-5 h-5 text-[#FF0000]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 00-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 002.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.002 3.002 0 002.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </button>

            <button
              onClick={() => handleShare("linkedin")}
              className="w-full flex items-center justify-between p-4 border border-zinc-100 rounded-lg hover:border-red-600 hover:bg-zinc-50 transition-all text-black"
            >
              <span className="text-sm font-semibold tracking-wide">LinkedIn</span>
              <svg className="w-5 h-5 text-[#0A66C2]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </button>

            <button
              onClick={() => handleShare("twitter")}
              className="w-full flex items-center justify-between p-4 border border-zinc-100 rounded-lg hover:border-red-600 hover:bg-zinc-50 transition-all text-black"
            >
              <span className="text-sm font-semibold tracking-wide">X / Twitter</span>
              <svg className="w-5 h-5 text-current" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
