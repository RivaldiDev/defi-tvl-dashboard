"use client";

import { cn } from "@/lib/utils";
import { Category, CATEGORIES } from "@/lib/types";

interface CategoryTabsProps {
  selected: Category;
  onSelect: (cat: Category) => void;
}

export function CategoryTabs({ selected, onSelect }: CategoryTabsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={cn(
            "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200",
            selected === cat
              ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25"
              : "glass text-muted-foreground hover:text-foreground hover:border-purple-500/30"
          )}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
