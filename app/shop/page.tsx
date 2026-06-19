"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Grid, List, X, SlidersHorizontal, ArrowUpDown, Flame, Sparkles } from "lucide-react";
import Footer from "../components/Footer";
import BackToTop from "../components/BackToTop";

interface Product {
  id: number;
  name: string;
  image: string;
  category: string;
  featured: boolean;
  items_sold: number;
}

const CATEGORIES = ["All", "Men", "Women", "Kids", "Accessories"];

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "best-selling", label: "Best Selling" },
  { value: "name-asc", label: "Alphabetically, A-Z" },
  { value: "name-desc", label: "Alphabetically, Z-A" },
];

function ShopContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSort, setSelectedSort] = useState("featured");
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Sync category from URL search params on mount/change
  useEffect(() => {
    const catParam = searchParams.get("category");
    if (catParam) {
      const matched = CATEGORIES.find(
        (c) => c.toLowerCase() === catParam.toLowerCase()
      );
      if (matched) {
        setSelectedCategory(matched);
      }
    }
  }, [searchParams]);

  // Load products
  useEffect(() => {
    fetch("/data/products.json")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading products:", err);
        setLoading(false);
      });
  }, []);

  // Update URL parameter when category changes
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setIsFilterOpen(false);
    const params = new URLSearchParams(window.location.search);
    if (category === "All") {
      params.delete("category");
    } else {
      params.set("category", category);
    }
    router.push(`/shop?${params.toString()}`, { scroll: false });
  };

  // Toggle wishlist
  const toggleWishlist = (id: number) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Filter products
  const filteredProducts = products.filter((product) => {
    if (selectedCategory === "All") return true;
    return product.category.toLowerCase() === selectedCategory.toLowerCase();
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (selectedSort === "name-asc") {
      return a.name.localeCompare(b.name);
    }
    if (selectedSort === "name-desc") {
      return b.name.localeCompare(a.name);
    }
    if (selectedSort === "best-selling") {
      return b.items_sold - a.items_sold;
    }
    // "featured" sorting: featured products first, then by items_sold
    if (selectedSort === "featured") {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return b.items_sold - a.items_sold;
    }
    return 0;
  });

  return (
    <div className="flex flex-col min-h-screen bg-white text-black pt-8">
      <div className="flex-1 w-full px-6 md:px-16 py-8">

        {/* Page Title & Breadcrumbs */}
        <div className="text-center mb-12 space-y-3">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-950">
            {selectedCategory === "All" ? "M Baazar" : selectedCategory} <span className="text-red-700">Collection</span>
          </h1>
          <p className="text-zinc-500 text-sm max-w-xl mx-auto">
            Discover the latest trends in our curated {selectedCategory.toLowerCase()} fashion line.
          </p>
        </div>

        {/* Controls Bar */}
        <div className="flex items-center justify-between border-y border-zinc-150 py-4 mb-10 gap-4 flex-wrap">
          {/* Left: Filter Toggle Button */}
          <button
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-zinc-900 text-white rounded-full text-sm font-semibold hover:bg-red-700 transition-colors duration-300 shadow-sm cursor-pointer"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filter Categories
          </button>

          {/* Center: Current active category and count */}
          <div className="text-sm font-medium text-zinc-500 hidden sm:block">
            Showing <span className="text-zinc-950 font-bold">{sortedProducts.length}</span> products in <span className="text-red-700 font-bold">{selectedCategory}</span>
          </div>

          {/* Right: Sort Selection */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider hidden md:inline">Sort By:</span>
            <div className="relative">
              <select
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
                className="appearance-none bg-zinc-50 border border-zinc-200 text-zinc-950 text-sm font-semibold rounded-full px-5 py-2.5 pr-10 focus:outline-none focus:border-red-700 transition-colors cursor-pointer"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <ArrowUpDown className="w-4 h-4 text-zinc-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Filter Drawer / Sidebar (Offcanvas Overlay) */}
        <AnimatePresence>
          {isFilterOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsFilterOpen(false)}
                className="fixed inset-0 bg-black z-50 pointer-events-auto"
              />

              {/* Drawer */}
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed inset-y-0 left-0 w-full max-w-md bg-white z-50 p-8 shadow-2xl flex flex-col justify-between pointer-events-auto border-r border-zinc-100"
              >
                <div>
                  <div className="flex items-center justify-between pb-6 border-b border-zinc-100">
                    <span className="text-xl font-bold tracking-tight text-zinc-950 flex items-center gap-2">
                      <SlidersHorizontal className="w-5 h-5 text-red-700" /> Filter Options
                    </span>
                    <button
                      onClick={() => setIsFilterOpen(false)}
                      className="p-1 hover:text-red-700 transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="mt-8 space-y-6">
                    <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Product Categories</h3>
                    <div className="flex flex-col gap-2">
                      {CATEGORIES.map((cat) => {
                        const isCurrent = selectedCategory === cat;
                        return (
                          <button
                            key={cat}
                            onClick={() => handleCategoryChange(cat)}
                            className={`flex items-center justify-between w-full px-5 py-3.5 rounded-xl text-left font-semibold text-sm transition-all duration-300 ${isCurrent
                                ? "bg-red-50 text-red-700 border border-red-200/50"
                                : "bg-zinc-50 text-zinc-700 hover:bg-zinc-100 border border-transparent"
                              }`}
                          >
                            <span>{cat}</span>
                            {isCurrent && <span className="w-2 h-2 rounded-full bg-red-700" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-zinc-150">
                  <button
                    onClick={() => handleCategoryChange("All")}
                    className="w-full py-4 bg-zinc-900 text-white rounded-xl text-sm font-bold hover:bg-red-700 transition-colors duration-300"
                  >
                    Reset Filters
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 sm:gap-8 min-h-[400px] items-center justify-center">
            {Array.from({ length: 10 }).map((_, idx) => (
              <div key={idx} className="space-y-4 animate-pulse flex flex-col items-center">
                <div className="bg-zinc-100 rounded-lg aspect-square w-full" />
                <div className="h-4 bg-zinc-100 rounded-full w-1/3" />
                <div className="h-6 bg-zinc-100 rounded-full w-2/3" />
                <div className="h-4 bg-zinc-100 rounded-full w-1/2" />
              </div>
            ))}
          </div>
        ) : sortedProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center space-y-4">
            <p className="text-zinc-400 font-medium">No products found in this category.</p>
            <button
              onClick={() => handleCategoryChange("All")}
              className="px-6 py-2.5 bg-zinc-900 text-white rounded-full text-xs font-bold hover:bg-red-700 transition-colors"
            >
              Show All Products
            </button>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 sm:gap-8 mb-16"
          >
            <AnimatePresence mode="popLayout">
              {sortedProducts.map((product) => {
                const isWished = wishlist.includes(product.id);
                return (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    onClick={() => setSelectedProduct(product)}
                    className="group relative flex flex-col bg-white border border-zinc-200 rounded-lg overflow-hidden shadow-sm hover:shadow-[0_20px_50px_rgba(220,38,38,0.04)] hover:-translate-y-1.5 transition-all duration-500 ease-out h-full cursor-pointer"
                  >
                    {/* Image Container */}
                    <div className="relative aspect-square overflow-hidden bg-zinc-50">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                        loading="lazy"
                      />

                      {/* Wishlist Button (Optional fallback decoration) */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(product.id);
                        }}
                        className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md border border-zinc-100/50 flex items-center justify-center text-zinc-600 hover:text-red-700 hover:bg-white hover:scale-110 active:scale-95 transition-all duration-300 shadow-sm z-10 cursor-pointer"
                        aria-label="Add to wishlist"
                      >
                        <Heart
                          className={`w-4 h-4 transition-colors duration-300 ${isWished ? "fill-red-700 text-red-700" : "text-zinc-600"
                            }`}
                        />
                      </button>
                    </div>

                    {/* Card Content */}
                    <div className="p-4 sm:p-5 flex flex-col items-center text-center flex-grow justify-between space-y-3">
                      <div className="space-y-1 flex flex-col items-center w-full">
                        {/* Category */}
                        <span className="block text-[10px] sm:text-xs font-bold tracking-[0.2em] text-red-700 uppercase">
                          {product.category}
                        </span>

                        {/* Product Name */}
                        <h3 className="text-sm sm:text-base font-extrabold text-zinc-950 line-clamp-1 group-hover:text-red-700 transition-colors duration-300 w-full">
                          {product.name}
                        </h3>
                      </div>

                      {/* Items Sold */}
                      <div className="text-[11px] sm:text-xs text-zinc-400 font-medium pt-2 w-full border-t border-zinc-50">
                        {product.items_sold.toLocaleString()} Items Sold
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Product Details Modal */}
        <AnimatePresence>
          {selectedProduct && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProduct(null)}
                className="fixed inset-0 bg-black z-50 pointer-events-auto backdrop-blur-sm"
              />

              {/* Modal Container */}
              <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  transition={{ type: "spring", duration: 0.5 }}
                  className="bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl relative border border-zinc-100 flex flex-col md:flex-row pointer-events-auto"
                >
                  {/* Close button */}
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="absolute top-5 right-5 z-10 bg-white/90 backdrop-blur-md p-2 rounded-full border border-zinc-200 text-zinc-700 hover:text-red-700 shadow-sm transition-all cursor-pointer hover:scale-110 active:scale-95"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  {/* Left Side: Image */}
                  <div className="w-full md:w-1/2 bg-zinc-50 relative aspect-square md:aspect-auto md:min-h-[500px]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Right Side: Product Information */}
                  <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-between space-y-8">
                    <div className="space-y-6">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-700 text-xs font-bold tracking-wide uppercase">
                        {selectedProduct.category}
                      </span>

                      <h2 className="text-2xl md:text-3xl font-black text-zinc-950 leading-tight">
                        {selectedProduct.name}
                      </h2>

                      <div className="flex items-center gap-2 pt-2 text-zinc-500 font-medium">
                        <Flame className="w-5 h-5 text-amber-500" />
                        <span>Highly Demandable Product</span>
                      </div>

                      <p className="text-zinc-600 text-sm leading-relaxed">
                        This is an exclusive selection from our latest premium collection. Crafted with modern tailoring and comfortable fabrics, it delivers exceptional style and durability. Perfect for any lifestyle.
                      </p>
                    </div>

                    <div className="space-y-6 border-t border-zinc-100 pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Item Popularity</p>
                          <p className="text-lg font-black text-zinc-950 mt-1">
                            {selectedProduct.items_sold.toLocaleString()} Sold Out
                          </p>
                        </div>
                        <div className="px-3.5 py-1.5 rounded-xl bg-zinc-100 text-zinc-700 text-xs font-bold flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5 text-yellow-500" /> Best Seller
                        </div>
                      </div>

                      <button
                        onClick={() => setSelectedProduct(null)}
                        className="w-full py-4 bg-red-700 text-white rounded-2xl text-sm font-bold hover:bg-zinc-950 transition-colors duration-300 cursor-pointer shadow-lg shadow-red-700/10 hover:shadow-zinc-950/10"
                      >
                        Close Product Details
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
            </>
          )}
        </AnimatePresence>

      </div>

      <Footer />
      <BackToTop />
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-700" />
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
}
