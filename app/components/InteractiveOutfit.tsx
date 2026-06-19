"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, X } from "lucide-react";

type Category = "tops" | "pants" | "shoes";

interface Hotspot {
  id: string;
  name: string;
  brand: string;
  price: string;
  color?: string;
  image: string;
  top: string; // Percentage value for positioning
  left: string; // Percentage value for positioning
  category: Category;
  cardPosition: "left" | "right";
}

// Configurable Hotspot Data Object
const OUTFIT_HOTSPOTS: Hotspot[] = [
  {
    id: "woman_shirt",
    name: "Classic Chambray Denim Shirt",
    brand: "M Baazar Denim",
    price: "₹1,299",
    color: "Light Blue Wash",
    image: "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&q=80&w=300",
    top: "31%",
    left: "32%",
    category: "tops",
    cardPosition: "left",
  },
  {
    id: "woman_pants",
    name: "Slim Fit Cotton Chinos",
    brand: "M Baazar Casuals",
    price: "₹1,499",
    color: "Mustard Gold",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=300",
    top: "59%",
    left: "30%",
    category: "pants",
    cardPosition: "left",
  },
  {
    id: "woman_shoes",
    name: "Retro Colorblock Oxfords",
    brand: "M Baazar Footwear",
    price: "₹1,899",
    color: "Mustard & Navy",
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=300",
    top: "88%",
    left: "28%",
    category: "shoes",
    cardPosition: "left",
  },
  {
    id: "man_shirt",
    name: "Classic Indigo Denim Shirt",
    brand: "M Baazar Denim",
    price: "₹1,499",
    color: "Classic Indigo",
    image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&q=80&w=300",
    top: "27%",
    left: "62%",
    category: "tops",
    cardPosition: "right",
  },
  {
    id: "man_pants",
    name: "Straight Fit Cotton Chinos",
    brand: "M Baazar Casuals",
    price: "₹1,699",
    color: "Caramel Brown",
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=300",
    top: "58%",
    left: "63%",
    category: "pants",
    cardPosition: "right",
  },
  {
    id: "man_shoes",
    name: "Suede Ankle Sneakers",
    brand: "M Baazar Footwear",
    price: "₹2,499",
    color: "Tan Suede",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=300",
    top: "88%",
    left: "63%",
    category: "shoes",
    cardPosition: "right",
  },
];

export default function InteractiveOutfit() {
  const [activeCategory, setActiveCategory] = useState<Category>("tops");
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);
  const [isAutoCycle, setIsAutoCycle] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Detect mobile view & handle outside clicks to close popup
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setSelectedHotspot(null);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Auto cycling logic for left column: tops -> pants -> shoes
  useEffect(() => {
    if (!isAutoCycle) return;
    const categories: Category[] = ["tops", "pants", "shoes"];
    const interval = setInterval(() => {
      setActiveCategory((prev) => {
        const index = categories.indexOf(prev);
        return categories[(index + 1) % categories.length];
      });
    }, 4500);

    return () => clearInterval(interval);
  }, [isAutoCycle]);

  const handleCategoryClick = (cat: Category) => {
    setActiveCategory(cat);
    setIsAutoCycle(false); // Pause auto-cycling when user manually switches category
  };

  const handlePinClick = (hotspot: Hotspot) => {
    // Tapping on image pins works completely separately from the left category cycle
    if (selectedHotspot?.id === hotspot.id) {
      setSelectedHotspot(null);
    } else {
      setSelectedHotspot(hotspot);
    }
  };

  // Filter products for the active category on the left side
  const activeHotspots = OUTFIT_HOTSPOTS.filter(
    (h) => h.category === activeCategory
  );

  return (
    <section
      ref={containerRef}
      className="relative py-20 bg-[#FFFFFF] w-full flex items-center justify-center border-t border-zinc-200/60 overflow-hidden"
    >
      <div className="w-full max-w-7xl px-8 md:px-16 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">

        {/* Left Column: Heading and Product Cards Cycle */}
        <div className="md:col-span-6 flex flex-col space-y-8 text-left justify-center py-6">
          <div className="space-y-4">
            <h2 className="text-4xl sm:text-5xl font-medium font-montserrat text-zinc-950 leading-tight">
              Style Like<br />
              <span className="text-5xl sm:text-7xl md:text-8xl" style={{ fontFamily: "Georgia, serif", fontWeight: 600, color: "rgb(185, 28, 28)" }}>A Celebrity</span>
            </h2>
            <p className="text-zinc-600 text-sm max-w-md leading-relaxed">
              Explore our coordinated denim and chinos collection. Select a category below to cycle the showcase, or tap the pins directly on the models to inspect individual items.
            </p>
          </div>

          {/* Category Navigation Tabs */}
          <div className="flex gap-2 p-1.5 bg-zinc-200/50 backdrop-blur-md border border-zinc-300/40 rounded-2xl w-fit">
            {(["tops", "pants", "shoes"] as Category[]).map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryClick(cat)}
                  className="relative px-5 py-2 text-xs font-bold rounded-xl transition-all duration-300 cursor-pointer uppercase tracking-wider focus:outline-none"
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeLookbookCategory"
                      className="absolute inset-0 bg-zinc-700 rounded-xl"
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    />
                  )}
                  <span className={`relative z-10 transition-colors duration-300 ${isActive ? "text-white" : "text-zinc-500 hover:text-zinc-900"}`}>
                    {cat}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Product Cards Cycle - 2 Max in View */}
          <div className="relative min-h-[160px] w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <AnimatePresence mode="wait">
                {activeHotspots.map((hotspot) => (
                  <motion.div
                    key={hotspot.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    className="relative bg-zinc-950/95 backdrop-blur-md border border-zinc-800/80 p-4 rounded-2xl shadow-md hover:shadow-xl hover:border-red-900/50 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <div className="w-[70px] h-[90px] shrink-0 rounded-lg overflow-hidden bg-zinc-900 border border-zinc-800/50">
                        <img src={hotspot.image} alt={hotspot.name} className="w-full h-full object-cover" />
                      </div>

                      {/* Content */}
                      <div className="flex flex-col justify-start text-left space-y-1">

                        <h4 className="font-bold text-xs text-white font-montserrat line-clamp-2 leading-tight">
                          {hotspot.name}
                        </h4>
                        {hotspot.color && (
                          <p className="text-[10px] text-zinc-400 mt-4 font-medium font-sans">
                            Color: {hotspot.color}
                          </p>
                        )}
                        <p className="font-black text-xs text-red-500">
                          {hotspot.price}
                        </p>
                      </div>
                    </div>

                    <a
                      href="/shop"
                      className="mt-3.5 inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-red-700 text-white rounded-lg hover:bg-white hover:text-black transition-all font-bold text-[9px] uppercase tracking-wider shadow-sm"
                    >
                      <ShoppingBag className="w-2.5 h-2.5" />
                      View Product
                    </a>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Right Column: Model Image with interactive hotspots */}
        <div className="md:col-span-6 flex items-center justify-center">
          <div className="relative w-full max-w-[405px] aspect-[2/3] max-h-[630px] flex items-center justify-center p-4 overflow-visible">
            {/* Full-Body Transparent Model Image */}
            <img
              src="/images/model.png"
              alt="Featured outfit model"
              className="h-full w-auto object-contain select-none pointer-events-none  z-0"
            />

            {/* Hotspot Pins */}
            {OUTFIT_HOTSPOTS.map((hotspot) => {
              const isSelected = selectedHotspot?.id === hotspot.id;
              const isSameCategory = activeCategory === hotspot.category;
              return (
                <div
                  key={hotspot.id}
                  className="absolute z-20"
                  style={{ top: hotspot.top, left: hotspot.left }}
                >
                  {/* Pulsing Pin Wrapper */}
                  <button
                    onClick={() => handlePinClick(hotspot)}
                    className="relative flex items-center justify-center w-8 h-8 focus:outline-none group cursor-pointer"
                    aria-label={`View details for ${hotspot.name}`}
                  >
                    {/* Ping Pulse Rings */}
                    <span className={`absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping ${isSameCategory ? "bg-red-600/60 scale-125" : "bg-red-600/30"
                      }`} />
                    <span className={`absolute inline-flex h-5 w-5 rounded-full group-hover:scale-125 transition-transform duration-300 ${isSameCategory ? "bg-red-600/40" : "bg-red-600/20"
                      }`} />

                    {/* Core Pin Center */}
                    <div
                      className={`w-3.5 h-3.5 rounded-full shadow-md transition-all duration-300 ${isSelected ? "bg-zinc-950 scale-110" : "bg-red-700 group-hover:bg-zinc-950"
                        }`}
                    />
                  </button>

                  {/* Desktop Product Card beside Pin (Standalone) */}
                  <AnimatePresence>
                    {!isMobile && isSelected && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9, x: hotspot.cardPosition === "left" ? -40 : 40 }}
                        animate={{ opacity: 1, scale: 1, x: hotspot.cardPosition === "left" ? -16 : 16 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className={`absolute top-1/2 -translate-y-1/2 w-[280px] bg-zinc-950/95 backdrop-blur-xl border border-zinc-800/80 p-4 rounded-2xl shadow-xl flex gap-4 z-30 ${hotspot.cardPosition === "left" ? "right-full mr-2" : "left-full ml-2"
                          }`}
                      >
                        {/* Connector line (Desktop only) */}
                        <div
                          className={`absolute top-1/2 -translate-y-1/2 h-[1px] w-4 border-t border-dashed border-red-500 ${hotspot.cardPosition === "left" ? "left-full" : "right-full"
                            }`}
                        />

                        {/* Image */}
                        <div className="w-[80px] h-[100px] shrink-0 rounded-lg overflow-hidden bg-zinc-900 border border-zinc-800/50">
                          <img src={hotspot.image} alt={hotspot.name} className="w-full h-full object-cover" />
                        </div>

                        {/* Content */}
                        <div className="flex flex-col justify-between items-start flex-1 text-left">
                          <div className="space-y-1 w-full">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedHotspot(null);
                              }}
                              className="absolute right-3 top-3 p-1 text-zinc-400 hover:text-white"
                            >
                              <X className="w-3 h-3" />
                            </button>
                            <span className="text-[9px] font-bold tracking-widest text-zinc-400 uppercase leading-none block">
                              {hotspot.brand}
                            </span>
                            <h4 className="font-bold text-xs text-white font-montserrat line-clamp-2 leading-tight pr-4">
                              {hotspot.name}
                            </h4>
                            {hotspot.color && (
                              <p className="text-[10px] text-zinc-400 font-medium font-sans">
                                Color: {hotspot.color}
                              </p>
                            )}
                            <p className="font-black text-xs text-red-500 mt-1">
                              {hotspot.price}
                            </p>
                          </div>

                          <a
                            href="/shop"
                            className="mt-2.5 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-red-700 text-white rounded-lg hover:bg-white hover:text-black transition-all font-bold text-[9px] uppercase tracking-wider shadow-sm"
                          >
                            <ShoppingBag className="w-2.5 h-2.5" />
                            View Product
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Mobile Experience - Bottom Sheet (for standalone Pin interaction) */}
      <AnimatePresence>
        {isMobile && selectedHotspot && (
          <>
            {/* Backdrop Dim */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedHotspot(null)}
              className="fixed inset-0 bg-black z-40 md:hidden"
            />

            {/* Bottom Sheet Card */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              drag="y"
              dragConstraints={{ top: 0 }}
              dragElastic={0.2}
              onDragEnd={(_, info) => {
                if (info.offset.y > 100) {
                  setSelectedHotspot(null);
                }
              }}
              className="fixed bottom-0 inset-x-0 bg-zinc-950/95 backdrop-blur-xl rounded-t-[2.5rem] border-t border-zinc-800/80 p-6 pb-10 shadow-2xl z-50 md:hidden flex flex-col items-center gap-5 text-white"
            >
              {/* Drag Handle Indicator */}
              <div className="w-12 h-1 bg-zinc-700 rounded-full cursor-pointer flex-shrink-0" />

              <div className="flex gap-5 w-full items-start">
                {/* Product Image */}
                <div className="w-[100px] h-[130px] rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800/50 flex-shrink-0">
                  <img src={selectedHotspot.image} alt={selectedHotspot.name} className="w-full h-full object-cover" />
                </div>

                {/* Details */}
                <div className="flex flex-col justify-between h-[130px] flex-1 text-left py-1">
                  <div className="space-y-1 relative">
                    <button
                      onClick={() => setSelectedHotspot(null)}
                      className="absolute right-0 top-0 p-1 text-zinc-400 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <span className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase block">
                      {selectedHotspot.brand}
                    </span>
                    <h4 className="font-extrabold text-sm text-white font-montserrat leading-snug pr-6">
                      {selectedHotspot.name}
                    </h4>
                    {selectedHotspot.color && (
                      <p className="text-xs text-zinc-400 font-medium">
                        Variant: {selectedHotspot.color}
                      </p>
                    )}
                    <p className="font-black text-sm text-red-500 pt-1">
                      {selectedHotspot.price}
                    </p>
                  </div>

                  <a
                    href="/shop"
                    className="inline-flex items-center justify-center gap-2 w-full py-2.5 bg-red-700 text-white rounded-xl hover:bg-white hover:text-black transition-all font-bold text-xs uppercase tracking-wider shadow-sm"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    View Product Details
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
