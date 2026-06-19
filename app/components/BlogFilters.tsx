"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { Search } from "lucide-react";

interface Category {
  id: string;
  title: string;
  slug: string;
}

interface BlogFiltersProps {
  categories: Category[];
  activeCategory: string;
  activeSearch: string;
}

export default function BlogFilters({ categories, activeCategory, activeSearch }: BlogFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [search, setSearch] = useState(activeSearch);

  const updateFilters = (newCategory: string, newSearch: string) => {
    const params = new URLSearchParams(searchParams.toString());

    // Set or delete category
    if (newCategory) {
      params.set("category", newCategory);
    } else {
      params.delete("category");
    }

    // Set or delete search
    if (newSearch) {
      params.set("search", newSearch);
    } else {
      params.delete("search");
    }

    // Reset to page 1 on filter change
    params.delete("page");

    startTransition(() => {
      router.push(`/blog?${params.toString()}`);
    });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters(activeCategory, search);
  };

  return (
    <div className="space-y-6 w-full max-w-4xl mx-auto mb-10 px-4">
      {/* Search Input */}
      <form onSubmit={handleSearchSubmit} className="relative w-full">
        <input
          type="text"
          placeholder="Search articles, fashion news..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-full border border-zinc-200 focus:outline-none focus:border-red-700 focus:ring-1 focus:ring-red-700 transition-all text-sm text-zinc-800 bg-white shadow-sm placeholder-zinc-400"
        />
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400">
          <Search className="w-5 h-5" />
        </div>
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-zinc-950 text-white px-5 py-1.5 rounded-full text-xs font-semibold hover:bg-red-700 transition-colors"
        >
          {isPending ? "Searching..." : "Search"}
        </button>
      </form>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 justify-center items-center">
        <button
          onClick={() => updateFilters("", search)}
          className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all border cursor-pointer ${!activeCategory
              ? "bg-red-700 border-red-700 text-white shadow-md shadow-red-700/10"
              : "bg-white border-zinc-200 text-zinc-700 hover:border-zinc-300 hover:text-zinc-950"
            }`}
        >
          All Stories
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => updateFilters(cat.slug, search)}
            className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all border cursor-pointer ${activeCategory === cat.slug
                ? "bg-red-700 border-red-700 text-white shadow-md shadow-red-700/10"
                : "bg-white border-zinc-200 text-zinc-700 hover:border-zinc-300 hover:text-zinc-950"
              }`}
          >
            {cat.title}
          </button>
        ))}
      </div>
    </div>
  );
}
