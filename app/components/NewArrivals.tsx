"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import SplitText from "../../components/SplitText";

interface Product {
  id: number;
  name: string;
  image: string;
  category: string;
  featured: boolean;
  items_sold: number;
}

const CATEGORIES = ["All", "Men", "Women", "Kids", "Accessories"];

export default function NewArrivals() {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState("All");
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  // Load products from JSON
  useEffect(() => {
    fetch("/data/products.json")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading product data:", err);
        setLoading(false);
      });
  }, []);

  // Toggle wishlist item
  const toggleWishlist = (id: number) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Filter products by category
  const filteredProducts = products.filter((product) => {
    if (activeTab === "All") return true;
    return product.category.toLowerCase() === activeTab.toLowerCase();
  });

  // Limit to maximum of 10 products
  const displayedProducts = filteredProducts.slice(0, 10);

  return (
    <section className="py-16 sm:py-24 px-10 bg-[#FAF9F6] text-black w-full">
      <div className="w-full px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          {/* Left Side Header */}
          <div className="space-y-2">
            <h2 className="font-medium tracking-tight text-zinc-950 font-montserrat" style={{ fontSize: "60px", letterSpacing: "-0.03em", lineHeight: "0.95" }}>
              Browse New <span className="italic" style={{ fontFamily: "Georgia, serif", color: "rgb(185, 28, 28)" }}>Arrivals</span>
            </h2>
          </div>

          {/* Right Side Switcher */}
          <div className="flex flex-wrap gap-2 p-1 bg-stone-100/50 backdrop-blur-md border border-zinc-200/60 rounded-2xl w-fit">
            {CATEGORIES.map((category) => {
              const isActive = activeTab === category;
              return (
                <button
                  key={category}
                  onClick={() => setActiveTab(category)}
                  className="relative px-5 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-colors duration-300 focus:outline-none cursor-pointer"
                >
                  {/* Sliding background indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeFilterBg"
                      className="absolute inset-0 bg-stone-950 rounded-xl"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span
                    className={`relative z-10 transition-colors duration-300 ${isActive ? "text-white" : "text-zinc-500 hover:text-zinc-950"
                      }`}
                  >
                    {category}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 min-h-[400px] items-center justify-center">
            {Array.from({ length: 5 }).map((_, idx) => (
              <div key={idx} className="space-y-4 animate-pulse flex flex-col items-center">
                <div className="bg-zinc-100 rounded-3xl aspect-square w-full" />
                <div className="h-4 bg-zinc-100 rounded-full w-1/3" />
                <div className="h-6 bg-zinc-100 rounded-full w-2/3" />
                <div className="h-4 bg-zinc-100 rounded-full w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4"
          >
            <AnimatePresence mode="popLayout">
              {displayedProducts.map((product) => {
                const isWished = wishlist.includes(product.id);
                return (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="group relative flex flex-col bg-white border border-red-200 rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.015)] hover:shadow-[0_24px_50px_rgba(0,0,0,0.06)] hover:-translate-y-2 transition-all duration-500 ease-out h-full"
                  >
                    {/* Image Container */}
                    <div className="relative aspect-square overflow-hidden bg-zinc-50">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        loading="lazy"
                      />

                      {/* Wishlist Button */}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          toggleWishlist(product.id);
                        }}
                        className="absolute top-3 right-3 w-9 h-9 rounded-xl bg-white/90 backdrop-blur-md border border-zinc-200/40 flex items-center justify-center text-zinc-600 hover:text-red-600 hover:bg-white hover:scale-110 active:scale-95 transition-all duration-300 shadow-sm z-10 cursor-pointer"
                        aria-label="Add to wishlist"
                      >
                        <Heart
                          className={`w-4 h-4 transition-colors duration-300 ${isWished ? "fill-red-600 text-red-600" : "text-zinc-600"
                            }`}
                        />
                      </button>
                    </div>

                    {/* Card Content */}
                    <div className="p-4 sm:p-5 flex flex-col items-center text-center flex-grow justify-between space-y-3 bg-[#FFFFFF]">
                      <div className="space-y-1 flex flex-col items-center w-full">
                        {/* Category */}
                        <span className="block text-[10px] sm:text-xs font-bold tracking-[0.2em] text-zinc-400 uppercase">
                          {product.category}
                        </span>

                        {/* Product Name */}
                        <h3 className="text-sm sm:text-base font-extrabold text-zinc-900 line-clamp-1 group-hover:text-zinc-700 transition-colors duration-300 w-full">
                          {product.name}
                        </h3>
                      </div>

                      {/* Items Sold */}
                      <div className="text-[10px] sm:text-xs text-zinc-600 font-bold pt-1.5 px-3 py-1 bg-stone-100 rounded-lg w-fit">
                        {product.items_sold.toLocaleString()} sold
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
}
